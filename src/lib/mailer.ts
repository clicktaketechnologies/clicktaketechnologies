/**
 * Email helper — backward-compatible wrapper around the multi-provider system.
 *
 * Phase 2: now routes through src/lib/providers/email which tries each
 * configured provider in priority order with automatic failover.
 *
 * Public API preserved:
 *   - sendMail({ to, subject, html }) — primary send function
 *   - inquiryThankYouEmail(name) — template helper
 *   - bookingThankYouEmail(name, date, time) — template helper
 *
 * New optional API:
 *   - sendMail({ to, subject, html, from, replyTo, attachments, tags, metadata })
 *   - sendMailViaProvider(providerId, { ... }) — force a specific provider
 */

import { sendEmail, testEmailProvider, getEmailProviders } from "@/lib/providers";

export interface SendMailArgs {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
  tags?: string[];
  metadata?: Record<string, string>;
}

/** Default "from" address — can be overridden per-call via args.from or env MAIL_FROM */
function defaultFrom(): string {
  return (
    process.env.MAIL_FROM ||
    process.env.SMTP_FROM ||
    "ClickTake <noreply@clicktaketech.com>"
  );
}

/**
 * Send an email using the configured multi-provider chain.
 * Tries each active provider in priority order until one succeeds.
 * Falls back to console.log if no providers configured (dev mode).
 */
export async function sendMail(args: SendMailArgs): Promise<void> {
  const from = args.from || defaultFrom();
  await sendEmail({
    to: args.to,
    from,
    subject: args.subject,
    html: args.html,
    text: args.text,
    replyTo: args.replyTo,
    attachments: args.attachments,
    tags: args.tags,
    metadata: args.metadata,
  });
}

/**
 * Force-send via a specific provider (for admin "test send" UI).
 * Returns the provider's message ID + status.
 */
export async function sendMailViaProvider(providerId: string, args: SendMailArgs) {
  const providers = await getEmailProviders();
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) {
    throw new Error(`Provider "${providerId}" is not active or not configured`);
  }
  const from = args.from || defaultFrom();
  return provider.send({
    to: args.to,
    from,
    subject: args.subject,
    html: args.html,
    text: args.text,
    replyTo: args.replyTo,
    attachments: args.attachments,
    tags: args.tags,
    metadata: args.metadata,
  });
}

/**
 * Run a connection test against a specific provider.
 * Used by admin "Test Connection" button.
 */
export async function testProvider(providerId: string) {
  return testEmailProvider(providerId);
}

// ─── Email templates (unchanged from original) ──────────────────────────────

export function inquiryThankYouEmail(name: string) {
  return {
    subject: "We received your inquiry — ClickTake Technologies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #136DFF;">Thanks for reaching out, ${name}!</h2>
        <p>We've received your project inquiry and a senior member of our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to browse our <a href="https://clicktaketech.com/services" style="color: #136DFF;">services</a> or <a href="https://clicktaketech.com/portfolio" style="color: #136DFF;">portfolio</a>.</p>
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
        <p style="font-size: 12px; color: #6B7280;">Best regards,<br><strong>ClickTake Technologies</strong></p>
      </div>
    `,
  };
}

export function bookingThankYouEmail(name: string, date: string, time: string) {
  return {
    subject: "Your Discovery Call is Booked — ClickTake Technologies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #136DFF;">Booking Confirmed: Discovery Call</h2>
        <p>Hi ${name},</p>
        <p>Thank you for booking a discovery session with <strong>ClickTake Technologies</strong>!</p>
        <div style="background-color: #F9FAFB; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 0; font-size: 16px;"><strong>Time:</strong> ${time}</p>
        </div>
        <p>We look forward to speaking with you. If anything changes, just reply to this email.</p>
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
        <p style="font-size: 12px; color: #6B7280;">Best regards,<br><strong>The ClickTake Team</strong></p>
      </div>
    `,
  };
}

// ─── Lead notification template (used by contact form) ──────────────────────

export function leadNotificationEmail(args: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  date?: string;
  time?: string;
  kind: "inquiry" | "booking";
}) {
  const isBooking = args.kind === "booking";
  return {
    subject: isBooking
      ? `New Booking: ${args.name} — ${args.date} ${args.time}`
      : `New Inquiry: ${args.service} — ${args.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #136DFF;">${isBooking ? "New discovery call booked" : "New project inquiry"}</h2>
        <p><strong>Name:</strong> ${args.name}</p>
        <p><strong>Email:</strong> ${args.email}</p>
        ${args.company ? `<p><strong>Company:</strong> ${args.company}</p>` : ""}
        ${args.service ? `<p><strong>Service:</strong> ${args.service}</p>` : ""}
        ${args.budget ? `<p><strong>Budget:</strong> ${args.budget}</p>` : ""}
        ${args.date ? `<p><strong>Date:</strong> ${args.date}</p>` : ""}
        ${args.time ? `<p><strong>Time:</strong> ${args.time}</p>` : ""}
        ${args.message ? `<p><strong>Message:</strong></p><blockquote>${args.message}</blockquote>` : ""}
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
        <p style="font-size: 12px; color: #6B7280;">This lead was saved to the CRM. View it in the admin portal.</p>
      </div>
    `,
  };
}
