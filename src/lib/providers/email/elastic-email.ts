/**
 * Elastic Email Adapter — REST API.
 * Free tier: 100/day (~3k/mo).
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

export class ElasticEmailAdapter implements EmailProvider {
  readonly id = "elastic-email";
  readonly displayName = "Elastic Email";
  readonly supportedFeatures: EmailFeature[] = ["transactional", "marketing", "attachments", "tracking"];
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["fromName", "fromEmail"];

  private apiKey: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.apiKey) throw new Error("Elastic Email: missing apiKey");
    this.apiKey = credentials.apiKey;
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const body = {
      from: params.from,
      to: Array.isArray(params.to) ? params.to.join(";") : params.to,
      subject: params.subject,
      bodyHtml: params.html,
      bodyText: params.text,
      replyTo: params.replyTo,
      channel: params.tags?.[0],
    };
    const res = await fetch("https://api.elasticemail.com/v4/emails/transactional", {
      method: "POST",
      headers: {
        "X-ElasticEmail-ApiKey": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Elastic Email send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.messageid, ms: Date.now() - start }, "[elastic-email] sent");
    return { messageId: json.messageid, providerId: this.id, accepted: true };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://api.elasticemail.com/v4/clients/load", {
        headers: { "X-ElasticEmail-ApiKey": this.apiKey },
      });
      return { ok: res.ok, message: res.ok ? "Connected" : `HTTP ${res.status}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 100, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: Date.now() - start, message: r.message };
  }
}
