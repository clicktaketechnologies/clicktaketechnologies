/**
 * Mailtrap Adapter — uses Mailtrap's REST API.
 * Free tier: 1000 emails/mo. Sandbox mode for dev/staging.
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

export class MailtrapAdapter implements EmailProvider {
  readonly id = "mailtrap";
  readonly displayName = "Mailtrap";
  readonly supportedFeatures: EmailFeature[] = ["transactional", "attachments", "templates", "tracking"];
  readonly credentialsKeys = ["apiToken"];
  readonly configKeys = ["accountId", "inboxId", "sandbox"];

  private apiToken: string;
  private accountId?: string;
  private inboxId?: string;
  private sandbox: boolean;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!credentials.apiToken) throw new Error("Mailtrap: missing apiToken");
    this.apiToken = credentials.apiToken;
    this.accountId = config.accountId;
    this.inboxId = config.inboxId;
    this.sandbox = config.sandbox !== "false";
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    if (!this.accountId || !this.inboxId) {
      throw new Error("Mailtrap: accountId and inboxId required for send");
    }
    const start = Date.now();
    const url = this.sandbox
      ? `https://send.api.mailtrap.io/api/send/${this.accountId}/inbox/${this.inboxId}`
      : "https://send.api.mailtrap.io/api/send";
    const body: any = {
      from: { email: params.from.match(/<(.+)>/)?.[1] ?? params.from, name: params.from.match(/^(.+)\s*</)?.[1] },
      to: (Array.isArray(params.to) ? params.to : [params.to]).map((e) => ({ email: e.match(/<(.+)>/)?.[1] ?? e })),
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: params.attachments?.map((a) => ({
        filename: a.filename,
        content: typeof a.content === "string" ? a.content : a.content.toString("base64"),
        type: a.contentType,
        disposition: "attachment",
      })),
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Mailtrap send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.message_ids, ms: Date.now() - start }, "[mailtrap] sent");
    return {
      messageId: String(json.message_ids ?? ""),
      providerId: this.id,
      accepted: true,
    };
  }

  async testConnection(): Promise<TestResult> {
    try {
      const res = await fetch("https://api.mailtrap.io/api/accounts", {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });
      return { ok: res.ok, message: res.ok ? "Connected" : `HTTP ${res.status}` };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 1000, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: Date.now() - start, message: r.message };
  }
}
