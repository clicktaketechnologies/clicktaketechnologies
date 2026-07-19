/**
 * Cloudflare Email Routing Adapter — INBOUND ONLY (no outbound sending).
 * Forwards inbound emails (info@, support@) to admin's primary mailbox.
 * Free, unlimited forwards.
 */

import type {
  EmailProvider,
  SendEmailParams,
  SendResult,
  TestResult,
  EmailQuota,
  EmailFeature,
} from "./types";

export class CloudflareRoutingAdapter implements EmailProvider {
  readonly id = "cloudflare-routing";
  readonly displayName = "Cloudflare Email Routing (Inbound)";
  readonly supportedFeatures: EmailFeature[] = ["inbound-forwarding"];
  readonly credentialsKeys = ["apiToken"];
  readonly configKeys = ["zoneId", "forwardTo"];

  private apiToken?: string;
  private zoneId?: string;
  private forwardTo: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    this.apiToken = credentials.apiToken;
    this.zoneId = config.zoneId;
    this.forwardTo = config.forwardTo || "";
    if (!this.forwardTo) {
      throw new Error("Cloudflare Email Routing: forwardTo is required");
    }
  }

  async send(_params: SendEmailParams): Promise<SendResult> {
    throw new Error(
      "Cloudflare Email Routing is inbound-only — use a different provider for outbound (Brevo/Mailgun/SMTP/etc.)",
    );
  }

  async testConnection(): Promise<TestResult> {
    if (!this.apiToken || !this.zoneId) {
      return {
        ok: false,
        message: "API token and Zone ID required to query CF Email Routing status.",
      };
    }
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${this.zoneId}/email/routing/rules`,
        { headers: { Authorization: `Bearer ${this.apiToken}` } },
      );
      if (!res.ok) return { ok: false, message: `HTTP ${res.status}` };
      const json: any = await res.json();
      const rules = json.result ?? [];
      return {
        ok: true,
        message: `${rules.length} forwarding rule(s) configured; inbound → ${this.forwardTo}`,
      };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  async getQuota(): Promise<EmailQuota> {
    return { used: 0, limit: null, unit: "emails" };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    return { ok: true, latencyMs: 0, message: "Passive (inbound-only)" };
  }
}
