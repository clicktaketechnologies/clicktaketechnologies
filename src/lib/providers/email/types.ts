/**
 * Email provider interface — implemented by 11 adapters.
 * Supports transactional + marketing email + inbound forwarding (CF Routing).
 */

export type EmailFeature =
  | "transactional"
  | "marketing"
  | "attachments"
  | "templates"
  | "tracking"
  | "inbound-forwarding";

export interface EmailProvider {
  readonly id: string;
  readonly displayName: string;
  readonly supportedFeatures: EmailFeature[];
  readonly credentialsKeys: string[];
  readonly configKeys: string[];

  send(params: SendEmailParams): Promise<SendResult>;
  testConnection(): Promise<TestResult>;
  getQuota(): Promise<EmailQuota>;
  healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }>;
}

export interface SendEmailParams {
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
  tags?: string[];
  metadata?: Record<string, string>;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string; // Buffer or base64 string
  contentType?: string;
}

export interface SendResult {
  messageId: string;
  providerId: string;
  accepted: boolean;
  rejected?: string[];
}

export interface TestResult {
  ok: boolean;
  message?: string;
  details?: Record<string, unknown>;
}

export interface EmailQuota {
  used: number;
  limit: number | null; // null = unlimited or unknown
  resetAt?: Date;
  unit: "emails" | "requests";
}
