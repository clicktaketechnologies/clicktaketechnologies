import { NextRequest, NextResponse } from "next/server";
import { inquirySchema, bookingSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendMail, inquiryThankYouEmail, bookingThankYouEmail, leadNotificationEmail } from "@/lib/mailer";
import { prisma } from "@/lib/db";

// ─── POST /api/contact ───────────────────────────────────────────────────
// Body: { kind: "inquiry" | "booking", ...payload }
// Saves lead to DB + sends emails via multi-provider chain (Phase 2).

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const kind = body?.kind;
  const payload = body?.data || body;

  if (kind === "inquiry") {
    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    // 1. Verify Turnstile (skip in dev if no secret configured)
    const verify = await verifyTurnstileToken(parsed.data.turnstileToken);
    if (!verify.success) {
      return NextResponse.json({ error: verify.error || "CAPTCHA failed" }, { status: 400 });
    }

    // 2. Persist lead to DB (so CRM can pick it up)
    try {
      await prisma.lead.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.company || "", // no separate phone field in schema
          serviceInterest: parsed.data.service,
          message: parsed.data.message,
          status: "New",
          source: "Contact Form",
          sourcePage: "/contact",
        },
      });
    } catch (e) {
      console.error("[contact/inquiry] DB save failed:", e);
      // Continue — email still works
    }

    // 3. Send thank-you email (best-effort) via multi-provider chain
    try {
      const ec = inquiryThankYouEmail(parsed.data.name);
      await sendMail({
        to: parsed.data.email,
        subject: ec.subject,
        html: ec.html,
        tags: ["inquiry", "thank-you"],
        metadata: { leadName: parsed.data.name, kind: "inquiry" },
      });
    } catch (e) {
      console.error("[contact/inquiry] thank-you email failed:", e);
    }

    // 4. Notify internal team — use shared lead notification template
    try {
      const ec = leadNotificationEmail({
        kind: "inquiry",
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        service: parsed.data.service,
        budget: parsed.data.budget,
        message: parsed.data.message,
      });
      await sendMail({
        to: process.env.LEADS_EMAIL || "Info@clicktaketech.com",
        subject: ec.subject,
        html: ec.html,
        tags: ["inquiry", "internal", "lead-notification"],
        metadata: { leadName: parsed.data.name, kind: "inquiry", internal: "true" },
      });
    } catch (e) {
      console.error("[contact/inquiry] internal notify failed:", e);
    }

    return NextResponse.json({ success: true });
  }

  if (kind === "booking") {
    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const verify = await verifyTurnstileToken(parsed.data.turnstileToken);
    if (!verify.success) {
      return NextResponse.json({ error: verify.error || "CAPTCHA failed" }, { status: 400 });
    }

    // Persist as a lead with booking context
    try {
      await prisma.lead.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          message: `Discovery call booked for ${parsed.data.date} at ${parsed.data.time}`,
          status: "New",
          source: "Contact Form",
          sourcePage: "/contact",
        },
      });
    } catch (e) {
      console.error("[contact/booking] DB save failed:", e);
    }

    try {
      const ec = bookingThankYouEmail(parsed.data.name, parsed.data.date, parsed.data.time);
      await sendMail({
        to: parsed.data.email,
        subject: ec.subject,
        html: ec.html,
        tags: ["booking", "thank-you"],
        metadata: { leadName: parsed.data.name, kind: "booking" },
      });
    } catch (e) {
      console.error("[contact/booking] email failed:", e);
    }

    try {
      const ec = leadNotificationEmail({
        kind: "booking",
        name: parsed.data.name,
        email: parsed.data.email,
        date: parsed.data.date,
        time: parsed.data.time,
      });
      await sendMail({
        to: process.env.LEADS_EMAIL || "Info@clicktaketech.com",
        subject: ec.subject,
        html: ec.html,
        tags: ["booking", "internal", "lead-notification"],
        metadata: { leadName: parsed.data.name, kind: "booking", internal: "true" },
      });
    } catch (e) {
      console.error("[contact/booking] internal notify failed:", e);
    }

    return NextResponse.json({ success: true });
  }

  // ─── Career application ──────────────────────────────────────────────────
  if (kind === "career") {
    const data = payload || {};
    // Minimal validation — the careers form already validates on the client.
    if (!data?.name || !data?.email || !data?.role) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, role)" },
        { status: 400 }
      );
    }

    // Persist as a lead with source=Careers so CRM can route it.
    try {
      await prisma.lead.create({
        data: {
          name: String(data.name),
          email: String(data.email),
          phone: String(data.phone || ""),
          serviceInterest: `Career: ${String(data.role)}`,
          message: JSON.stringify({
            role: data.role,
            location: data.location || "",
            portfolio: data.portfolio || "",
            experience: data.experience || "",
            why: data.why || "",
            resumeUrl: data.resumeUrl || "",
          }, null, 2),
          status: "New",
          source: "Careers Form",
          sourcePage: "/careers",
        },
      });
    } catch (e) {
      console.error("[contact/career] DB save failed:", e);
      // Continue — email still works
    }

    // Notify the careers inbox.
    try {
      const subject = `[Careers] Application from ${data.name} — ${data.role}`;
      const html = `
        <h2>New career application</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> ${data.phone || "—"}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Location:</strong> ${data.location || "—"}</p>
        <p><strong>Portfolio:</strong> ${data.portfolio ? `<a href="${data.portfolio}">${data.portfolio}</a>` : "—"}</p>
        <p><strong>Resume:</strong> ${data.resumeUrl ? `<a href="${data.resumeUrl}">${data.resumeUrl}</a>` : "—"}</p>
        <h3>Experience</h3>
        <p>${(data.experience || "").replace(/\n/g, "<br>")}</p>
        <h3>Why ClickTake?</h3>
        <p>${(data.why || "").replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Source: /careers form</p>
      `;
      await sendMail({
        to: process.env.CAREERS_EMAIL || "careers@clicktaketech.com",
        subject,
        html,
        tags: ["career", "internal"],
        metadata: { applicantName: String(data.name), kind: "career", internal: "true" },
      });
    } catch (e) {
      console.error("[contact/career] internal notify failed:", e);
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown submission kind" }, { status: 400 });
}
