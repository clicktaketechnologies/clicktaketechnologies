/**
 * Email Registry — high-level entry points with failover chain.
 *
 * sendEmail() tries each configured provider in priority order until one succeeds.
 * Logs every attempt (success + failure) to EmailLog table.
 * Marks providers as "down" after 5 errors in 5 min — 10 min cooldown.
 */

import { prisma } from "@/lib/db";
import { getEmailProviders } from "../registry";
import { logger } from "../logger";
import type { EmailProvider, SendEmailParams, SendResult } from "./types";

const ERROR_WINDOW_MS = 5 * 60 * 1000;
const ERROR_THRESHOLD = 5;
const COOLDOWN_MS = 10 * 60 * 1000;

/** Main entry point — sends an email via the configured failover chain. */
export async function sendEmail(params: SendEmailParams): Promise<SendResult> {
  return sendEmailWithFailover(params);
}

export async function sendEmailWithFailover(params: SendEmailParams): Promise<SendResult> {
  const providers = await getEmailProviders();
  if (providers.length === 0) {
    // Dev fallback — log to console
    console.log("[email:dev] No providers configured. Would send:", {
      to: params.to,
      subject: params.subject,
    });
    return {
      messageId: `dev-${Date.now()}`,
      providerId: "console",
      accepted: true,
    };
  }

  const errors: { providerId: string; error: string }[] = [];

  for (const provider of providers) {
    // Skip providers in cooldown
    if (await isProviderInCooldown(provider.id)) {
      logger.warn({ provider: provider.id }, "[email] provider in cooldown, skipping");
      continue;
    }

    try {
      // 10s timeout per provider attempt
      const result = await Promise.race([
        provider.send(params),
        new Promise<SendResult>((_, reject) =>
          setTimeout(() => reject(new Error("timeout 10s")), 10000),
        ),
      ]);

      // Success — reset error counter, log success
      await markProviderHealthy(provider.id);
      await logEmailSend({
        providerId: provider.id,
        to: params.to,
        subject: params.subject,
        status: "sent",
        messageId: result.messageId,
      });
      return result;
    } catch (err: any) {
      const errorMsg = String(err.message || err);
      errors.push({ providerId: provider.id, error: errorMsg });
      await recordProviderError(provider.id, errorMsg);
      await logEmailSend({
        providerId: provider.id,
        to: params.to,
        subject: params.subject,
        status: "failed",
        errorMessage: errorMsg,
      });
      logger.warn({ provider: provider.id, err: errorMsg }, "[email] send failed, trying next");
      continue;
    }
  }

  // All providers failed
  logger.error({ errors }, "[email] all providers failed");
  throw new Error(`Email delivery failed across all providers: ${JSON.stringify(errors)}`);
}

/** Test a single provider by ID (used by admin panel "Test Connection" button). */
export async function testEmailProvider(providerId: string): Promise<{
  ok: boolean;
  message?: string;
  details?: Record<string, unknown>;
}> {
  const providers = await getEmailProviders();
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) {
    return { ok: false, message: `Provider ${providerId} not configured` };
  }
  const result = await provider.testConnection();
  return result;
}

// ─── Internal helpers ───────────────────────────────────────────────────────

async function isProviderInCooldown(providerId: string): Promise<boolean> {
  const health = await prisma.providerHealth.findFirst({
    where: { providerId },
    orderBy: { lastCheckedAt: "desc" },
  });
  if (!health?.cooldownUntil) return false;
  return health.cooldownUntil > new Date();
}

async function markProviderHealthy(providerId: string): Promise<void> {
  await prisma.providerHealth.upsert({
    where: { providerId },
    create: {
      providerId,
      category: "email",
      status: "healthy",
      errorCount5min: 0,
      cooldownUntil: null,
      lastCheckedAt: new Date(),
    },
    update: {
      status: "healthy",
      errorCount5min: 0,
      cooldownUntil: null,
      lastCheckedAt: new Date(),
      lastError: null,
    },
  });
}

async function recordProviderError(providerId: string, errorMsg: string): Promise<void> {
  const existing = await prisma.providerHealth.findFirst({
    where: { providerId },
    orderBy: { lastCheckedAt: "desc" },
  });

  const newCount = (existing?.errorCount5min ?? 0) + 1;
  const shouldCooldown = newCount >= ERROR_THRESHOLD;

  await prisma.providerHealth.upsert({
    where: { providerId },
    create: {
      providerId,
      category: "email",
      status: shouldCooldown ? "down" : "degraded",
      errorCount5min: newCount,
      lastError: errorMsg,
      lastCheckedAt: new Date(),
      cooldownUntil: shouldCooldown ? new Date(Date.now() + COOLDOWN_MS) : null,
    },
    update: {
      status: shouldCooldown ? "down" : "degraded",
      errorCount5min: newCount,
      lastError: errorMsg,
      lastCheckedAt: new Date(),
      cooldownUntil: shouldCooldown ? new Date(Date.now() + COOLDOWN_MS) : existing?.cooldownUntil ?? null,
    },
  });
}

async function logEmailSend(args: {
  providerId: string;
  to: string | string[];
  subject: string;
  status: "sent" | "failed";
  messageId?: string;
  errorMessage?: string;
}): Promise<void> {
  try {
    await prisma.emailLog.create({
      data: {
        providerId: args.providerId,
        messageId: args.messageId,
        toAddress: Array.isArray(args.to) ? args.to.join(",") : args.to,
        subject: args.subject,
        status: args.status,
        errorMessage: args.errorMessage,
        sentAt: new Date(),
      },
    });
  } catch (err) {
    logger.warn({ err }, "[email] failed to log send");
  }
}
