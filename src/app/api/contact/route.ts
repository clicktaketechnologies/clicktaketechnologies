import { NextRequest, NextResponse } from "next/server";
import { inquirySchema, bookingSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendMail, inquiryThankYouEmail, bookingThankYouEmail } from "@/lib/mailer";

// ─── POST /api/contact ───────────────────────────────────────────────────
// Body: { kind: "inquiry" | "booking", ...payload }
// Ported from original -contactFunction.ts (Supabase insert removed; mail kept)

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

    // 1. Verify Turnstile
    const verify = await verifyTurnstileToken(parsed.data.turnstileToken);
    if (!verify.success) {
      return NextResponse.json({ error: verify.error || "CAPTCHA failed" }, { status: 400 });
    }

    // 2. Send thank-you email (best-effort)
    try {
      const ec = inquiryThankYouEmail(parsed.data.name);
      await sendMail({ to: parsed.data.email, subject: ec.subject, html: ec.html });
    } catch (e) {
      console.error("[contact/inquiry] email failed:", e);
    }

    // 3. Notify internal team
    try {
      await sendMail({
        to: process.env.LEADS_EMAIL || "Info@clicktaketech.com",
        subject: `New Inquiry: ${parsed.data.service} — ${parsed.data.name}`,
        html: `
          <h2>New project inquiry</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Company:</strong> ${parsed.data.company || "—"}</p>
          <p><strong>Service:</strong> ${parsed.data.service}</p>
          <p><strong>Budget:</strong> ${parsed.data.budget}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${parsed.data.message}</blockquote>
        `,
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

    // 1. Verify Turnstile
    const verify = await verifyTurnstileToken(parsed.data.turnstileToken);
    if (!verify.success) {
      return NextResponse.json({ error: verify.error || "CAPTCHA failed" }, { status: 400 });
    }

    // 2. Send thank-you email
    try {
      const ec = bookingThankYouEmail(parsed.data.name, parsed.data.date, parsed.data.time);
      await sendMail({ to: parsed.data.email, subject: ec.subject, html: ec.html });
    } catch (e) {
      console.error("[contact/booking] email failed:", e);
    }

    // 3. Notify internal team
    try {
      await sendMail({
        to: process.env.LEADS_EMAIL || "Info@clicktaketech.com",
        subject: `New Booking: ${parsed.data.name} — ${parsed.data.date} ${parsed.data.time}`,
        html: `
          <h2>New discovery call booked</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Date:</strong> ${parsed.data.date}</p>
          <p><strong>Time:</strong> ${parsed.data.time}</p>
        `,
      });
    } catch (e) {
      console.error("[contact/booking] internal notify failed:", e);
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown submission kind" }, { status: 400 });
}
