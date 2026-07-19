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

  return NextResponse.json({ error: "Unknown submission kind" }, { status: 400 });
}
