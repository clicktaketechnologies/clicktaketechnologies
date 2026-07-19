/**
 * Email helper — uses Resend if RESEND_API_KEY is set, otherwise logs to console.
 * Faithful port of the original Mailer.ts used by the Vite project.
 */

interface SendMailArgs { to: string; subject: string; html: string; }

export async function sendMail({ to, subject, html }: SendMailArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev mode — just log
    console.log("[mailer:dev] Would send email:", { to, subject, htmlPreview: html.slice(0, 200) });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "ClickTake <noreply@clicktaketech.com>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed: ${res.status} ${text}`);
  }
}

export function inquiryThankYouEmail(name: string) {
  return {
    subject: "We received your inquiry — ClickTake Technologies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #136DFF;">Thanks for reaching out, ${name}!</h2>
        <p>We've received your project inquiry and a senior member of our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to browse our <a href="https://www.clicktaketech.com/services" style="color: #136DFF;">services</a> or <a href="https://www.clicktaketech.com/portfolio" style="color: #136DFF;">portfolio</a>.</p>
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
