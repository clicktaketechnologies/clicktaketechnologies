/**
 * Mailgun Adapter — uses REST API.
 * Free tier: 100/day on trial, then pay-as-you-go.
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

export class MailgunAdapter implements EmailProvider {
  readonly id = "mailgun";
  readonly displayName = "Mailgun";
  readonly supportedFeatures: EmailFeature[] = [
    "transactional",
    "attachments",
    "templates",
    "tracking",
  ];
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["domain", "region"];

  private apiKey: string;
  private domain: string;
  private baseUrl: string;

  constructor(_credentials: Record<string, string>, config: Record<string, string>) {
    if (!_credentials.apiKey) throw new Error("Mailgun: missing apiKey");
    if (!config.domain) throw new Error("Mailgun: missing domain");
    this.apiKey = _credentials.apiKey;
    this.domain = config.domain;
    this.baseUrl = config.region === "eu"
      ? "https://api.eu.mailgun.net/v3"
      : "https://api.mailgun.net/v3";
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const form = new FormData();
    form.append("from", params.from);
    form.append("to", Array.isArray(params.to) ? params.to.join(",") : params.to);
    if (params.cc) form.append("cc", params.cc.join(","));
    if (params.bcc) form.append("bcc", params.bcc.join(","));
    form.append("subject", params.subject);
    form.append("html", params.html);
    if (params.text) form.append("text", params.text);
    if (params.replyTo) form.append("h:Reply-To", params.replyTo);
    if (params.tags) form.append("o:tag", params.tags.join(","));

    for (const att of params.attachments ?? []) {
      const buf = typeof att.content === "string" ? Buffer.from(att.content, "base64") : att.content;
      form.append("attachment", new Blob([new Uint8Array(buf)], { type: att.contentType }), att.filename);
    }

    const auth = Buffer.from(`api:${this.apiKey}`).toString("base64");
    const res = await fetch(`${this.baseUrl}/${this.domain}/messages`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
      body: form,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Mailgun send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.id, ms: Date.now() - start }, "[mailgun] sent");
    return { messageId: json.id, providerId: this.id, accepted: true };
  }

  async testConnection(): Promise<TestResult> {
    const start = Date.now();
    try {
      const auth = Buffer.from(`api:${this.apiKey}`).toString("base64");
      const res = await fetch(`${this.baseUrl}/${this.domain}/stats?limit=1`, {
        headers: { Authorization: `Basic ${auth}` },
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
    const r = await this.testConnection();
    return { ok: r.ok, latencyMs: 0, message: r.message };
  }
}
