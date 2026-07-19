/**
 * Brevo (Sendinblue) Adapter — uses REST API.
 * Free tier: 300 emails/day (~9k/mo).
 */

import type {
  EmailProvider,
  SendEmailParams,
  SendResult,
  TestResult,
  EmailQuota,
  EmailFeature,
} from "./types";
import { logger } from "../logger";

export class BrevoAdapter implements EmailProvider {
  readonly id = "brevo";
  readonly displayName = "Brevo";
  readonly supportedFeatures: EmailFeature[] = [
    "transactional",
    "marketing",
    "attachments",
    "templates",
    "tracking",
  ];
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["fromName", "fromEmail"];

  private apiKey: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.apiKey) throw new Error("Brevo: missing apiKey");
    this.apiKey = credentials.apiKey;
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const body: any = {
      sender: { email: params.from },
      to: Array.isArray(params.to) ? params.to.map((e) => ({ email: e })) : [{ email: params.to }],
      subject: params.subject,
      htmlContent: params.html,
      textContent: params.text,
      replyTo: params.replyTo ? { email: params.replyTo } : undefined,
      attachment: params.attachments?.map((a) => ({
        name: a.filename,
        content: typeof a.content === "string" ? a.content : a.content.toString("base64"),
      })),
      tags: params.tags,
    };
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": this.apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Brevo send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.messageId, ms: Date.now() - start }, "[brevo] sent");
    return { messageId: json.messageId, providerId: this.id, accepted: true };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": this.apiKey },
      });
      if (!res.ok) return { ok: false, message: `HTTP ${res.status}` };
      const json: any = await res.json();
      return { ok: true, message: `Connected to ${json.email}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts/lists?limit=1", {
        headers: { "api-key": this.apiKey },
      });
      // Brevo doesn't expose daily quota directly — return unknown
      return { used: 0, limit: 300, unit: "emails" };
    } catch {
      return { used: 0, limit: 300, unit: "emails" };
    }
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      const res = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": this.apiKey },
      });
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }
}
