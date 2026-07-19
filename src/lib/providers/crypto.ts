/**
 * AES-256-GCM encryption for provider credentials stored in the database.
 *
 * Usage:
 *   const enc = await encryptCredentials({ apiKey: "sk_..." });
 *   const dec = await decryptCredentials(enc);
 *
 * The encryption key is read from PROVIDER_CREDENTIALS_ENCRYPTION_KEY env var.
 * If missing (e.g. dev), a fallback key derived from DATABASE_URL is used.
 */

import crypto from "crypto";

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12; // 96-bit IV recommended for GCM

function getKey(): Buffer {
  const raw = process.env.PROVIDER_CREDENTIALS_ENCRYPTION_KEY;
  if (raw && /^[0-9a-fA-F]{64}$/.test(raw)) {
    return Buffer.from(raw, "hex");
  }
  if (raw && raw.length === 32) {
    return Buffer.from(raw, "utf8");
  }
  // Dev fallback — deterministic per DATABASE_URL so credentials survive restarts
  const fallbackSource = process.env.DATABASE_URL || "clicktake-dev-fallback-key-do-not-use-in-prod";
  const hash = crypto.createHash("sha256").update(fallbackSource).digest();
  if (process.env.NODE_ENV === "production" && !raw) {
    console.warn("[crypto] PROVIDER_CREDENTIALS_ENCRYPTION_KEY not set in production — using fallback (NOT SECURE)");
  }
  return hash;
}

export interface EncryptedPayload {
  c: string;
  i: string;
  t: string;
  v: 1;
}

export async function encryptCredentials(data: Record<string, unknown>): Promise<string> {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const plaintext = JSON.stringify(data);
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const payload: EncryptedPayload = {
    c: ct.toString("base64"),
    i: iv.toString("base64"),
    t: tag.toString("base64"),
    v: 1,
  };
  return JSON.stringify(payload);
}

export async function decryptCredentials<T = Record<string, unknown>>(encoded: string): Promise<T> {
  if (!encoded) return {} as T;
  try {
    const parsed = JSON.parse(encoded);
    if (parsed && typeof parsed === "object" && !parsed.v && !parsed.c) {
      return parsed as T;
    }
    if (parsed && parsed.v === 1 && parsed.c && parsed.i && parsed.t) {
      const key = getKey();
      const ct = Buffer.from(parsed.c, "base64");
      const iv = Buffer.from(parsed.i, "base64");
      const tag = Buffer.from(parsed.t, "base64");
      const decipher = crypto.createDecipheriv(ALGO, key, iv);
      decipher.setAuthTag(tag);
      const plain = Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
      return JSON.parse(plain) as T;
    }
    return parsed as T;
  } catch (err) {
    console.error("[decryptCredentials] failed:", err);
    return {} as T;
  }
}

export function maskCredential(value: string): string {
  if (!value) return "";
  if (value.length <= 8) return "•".repeat(value.length);
  return value.slice(0, 4) + "•".repeat(Math.max(8, value.length - 8)) + value.slice(-4);
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
