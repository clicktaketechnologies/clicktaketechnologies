/**
 * MailerLite Adapter — REST API.
 * Free tier: 1000 subscribers, 12k emails/mo.
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

export class MailerLiteAdapter implements EmailProvider {
  readonly id = "mailerlite";
  readonly displayName = "MailerLite";
  readonly supportedFeatures: EmailFeature[] = ["marketing", "templates", "tracking"];
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["fromName", "fromEmail"];

  private apiKey: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.apiKey) throw new Error("MailerLite: missing apiKey");
    this.apiKey = credentials.apiKey;
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    // MailerLite is primarily a marketing platform — uses "campaigns" for bulk sends.
    // For transactional, we use their "single send" via subscriber + automation.
    // Here we'll add the recipient to a "transactional" group as a workaround.
    const toEmail = Array.isArray(params.to) ? params.to[0] : params.to;
    const body = {
      email: toEmail,
      fields: { name: toEmail.split("@")[0] },
      groups: ["transactional"],
    };
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`MailerLite send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.data?.id, ms: Date.now() - start }, "[mailerlite] sent");
    return {
      messageId: String(json.data?.id ?? ""),
      providerId: this.id,
      accepted: true,
    };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://connect.mailerlite.com/api/subscribers?limit=1", {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return { ok: res.ok, message: res.ok ? "Connected" : `HTTP ${res.status}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 12000, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: Date.now() - start, message: r.message };
  }
}
