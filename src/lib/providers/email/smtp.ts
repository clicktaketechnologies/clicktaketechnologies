/**
 * Generic SMTP Adapter — works for Mailtrap, Zoho, Brevo (SMTP),
 * Elastic Email (SMTP), Mailjet (SMTP), and any custom SMTP server.
 */

import nodemailer, { Transporter } from "nodemailer";
import type {
  EmailProvider,
  SendEmailParams,
  SendResult,
  TestResult,
  EmailQuota,
  EmailFeature,
} from "./types";
import { logger } from "../logger";

export class SMTPAdapter implements EmailProvider {
  readonly id: string;
  readonly displayName: string;
  readonly supportedFeatures: EmailFeature[] = [
    "transactional",
    "attachments",
    "tracking",
  ];
  readonly credentialsKeys = ["user", "password"];
  readonly configKeys = ["host", "port", "secure", "fromName", "fromEmail"];

  private transporter: Transporter;

  constructor(
    providerId: string,
    credentials: Record<string, string>,
    config: Record<string, string>,
  ) {
    this.id = providerId;
    this.displayName =
      providerId === "mailtrap" ? "Mailtrap (SMTP)" :
      providerId === "zoho" ? "Zoho Mail (SMTP)" :
      providerId === "brevo" ? "Brevo (SMTP)" :
      "SMTP Custom";

    const port = parseInt(config.port || "587", 10);
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port,
      secure: config.secure === "true" || port === 465,
      auth: credentials.user ? { user: credentials.user, pass: credentials.password } : undefined,
    });
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const info = await this.transporter.sendMail({
      from: params.from,
      to: Array.isArray(params.to) ? params.to.join(",") : params.to,
      cc: params.cc?.join(","),
      bcc: params.bcc?.join(","),
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: params.attachments?.map((a) => ({
        filename: a.filename,
        content: typeof a.content === "string" ? Buffer.from(a.content, "base64") : a.content,
        contentType: a.contentType,
      })),
    });
    logger.info({ providerId: this.id, messageId: info.messageId, ms: Date.now() - start }, "[smtp] sent");
    return {
      messageId: info.messageId,
      providerId: this.id,
      accepted: true,
    };
  }

  async testConnection(): Promise<TestResult> {
    try {
      await this.transporter.verify();
      return { ok: true, message: "SMTP connection verified" };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: null, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      await this.transporter.verify();
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }
}
