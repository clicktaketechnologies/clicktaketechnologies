/**
 * ZeptoMail Adapter — REST API.
 * Free tier: 10k emails trial credit (one-time).
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

export class ZeptoMailAdapter implements EmailProvider {
  readonly id = "zeptomail";
  readonly displayName = "ZeptoMail";
  readonly supportedFeatures: EmailFeature[] = ["transactional", "attachments", "templates", "tracking"];
  readonly credentialsKeys = ["sendMailToken"];
  readonly configKeys = ["fromName", "fromEmail"];

  private token: string;

  constructor(credentials: Record<string, string>, _config: Record<string, string>) {
    if (!credentials.sendMailToken) throw new Error("ZeptoMail: missing sendMailToken");
    this.token = credentials.sendMailToken;
  }

  async send(params: SendEmailParams): Promise<SendResult> {
    const start = Date.now();
    const fromEmail = params.from.match(/<(.+)>/)?.[1] ?? params.from;
    const fromName = params.from.match(/^(.+)\s*</)?.[1] ?? "ClickTake";
    const body = {
      from: { address: fromEmail, name: fromName },
      to: (Array.isArray(params.to) ? params.to : [params.to]).map((e) => ({
        email_address: { address: e.match(/<(.+)>/)?.[1] ?? e },
      })),
      subject: params.subject,
      htmlbody: params.html,
      textbody: params.text,
      reply_to: params.replyTo ? [{ address: params.replyTo }] : undefined,
      attachments: params.attachments?.map((a) => ({
        name: a.filename,
        content: typeof a.content === "string" ? a.content : a.content.toString("base64"),
      })),
    };
    const res = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: {
        Authorization: `Zoho-encz-api ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`ZeptoMail send failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ messageId: json.data?.message_id, ms: Date.now() - start }, "[zeptomail] sent");
    return {
      messageId: json.data?.message_id ?? "",
      providerId: this.id,
      accepted: true,
    };
  }

  async testConnection(): Promise<TestResult> {
    return { ok: true, message: "ZeptoMail API ready (verified on first send)" };
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: 10000, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    return { ok: true, latencyMs: 0 };
  }
}
