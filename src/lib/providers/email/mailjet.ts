/**
 * Mailjet Adapter — REST API.
 * Free tier: 200/day (~6k/mo).
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

export class MailjetAdapter implements EmailProvider {
  readonly id = "mailjet";
  readonly displayName = "Mailjet";
  readonly supportedFeatures: EmailFeature[] = ["transactional", "marketing", "attachments", "templates", "tracking"];
  readonly credentialsKeys = ["apiKey", "apiSecret"];
  readonly configKeys = ["fromName", "fromEmail"];

  private auth: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.apiKey || !credentials.apiSecret) {
      throw new Error("Mailjet: missing apiKey or apiSecret");
    }
    this.auth = Buffer.from(`${credentials.apiKey}:${credentials.apiSecret}`).toString("base64");
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const fromEmail = params.from.match(/<(.+)>/)?.[1] ?? params.from;
    const fromName = params.from.match(/^(.+)\s*</)?.[1] ?? "ClickTake";
    const body = {
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: (Array.isArray(params.to) ? params.to : [params.to]).map((e) => ({
            Email: e.match(/<(.+)>/)?.[1] ?? e,
          })),
          Subject: params.subject,
          HTMLPart: params.html,
          TextPart: params.text,
          Headers: params.replyTo ? { "Reply-To": params.replyTo } : undefined,
          Attachments: params.attachments?.map((a) => ({
            ContentType: a.contentType || "application/octet-stream",
            Filename: a.filename,
            Base64Content: typeof a.content === "string" ? a.content : a.content.toString("base64"),
          })),
        },
      ],
    };
    const res = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Mailjet send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    const msg = json.Messages?.[0];
    logger.info({ messageId: msg?.MessageID, ms: Date.now() - start }, "[mailjet] sent");
    return {
      messageId: String(msg?.MessageID ?? ""),
      providerId: this.id,
      accepted: msg?.Status === "success",
    };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://api.mailjet.com/v3/REST/user", {
        headers: { Authorization: `Basic ${this.auth}` },
      });
      return { ok: res.ok, message: res.ok ? "Connected" : `HTTP ${res.status}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 200, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: Date.now() - start, message: r.message };
  }
}
