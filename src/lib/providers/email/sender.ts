/**
 * Sender Adapter — REST API.
 * Free tier: 2500 subscribers, 15k emails/mo.
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

export class SenderAdapter implements EmailProvider {
  readonly id = "sender";
  readonly displayName = "Sender";
  readonly supportedFeatures: EmailFeature[] = ["marketing", "templates", "tracking"];
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["fromName", "fromEmail"];

  private apiKey: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.apiKey) throw new Error("Sender: missing apiKey");
    this.apiKey = credentials.apiKey;
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const toEmail = Array.isArray(params.to) ? params.to[0] : params.to;
    const body = {
      email: toEmail,
      subject: params.subject,
      html: params.html,
      from: params.from,
    };
    const res = await fetch("https://api.sender.net/v1/transactional-emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Sender send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.data?.id, ms: Date.now() - start }, "[sender] sent");
    return {
      messageId: String(json.data?.id ?? ""),
      providerId: this.id,
      accepted: true,
    };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://api.sender.net/v1/lists?limit=1", {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return { ok: res.ok, message: res.ok ? "Connected" : `HTTP ${res.status}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 15000, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: Date.now() - start, message: r.message };
  }
}
