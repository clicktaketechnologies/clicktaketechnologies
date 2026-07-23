/**
 * Cron: /api/cron/provider-health
 *
 * Triggered every 5 minutes by Cloudflare Worker Cron (see wrangler.toml).
 * Probes every active provider in the registry, persists health to
 * ProviderHealth table, and sends an alert email if any provider transitions
 * to degraded/down state.
 *
 * Auth: bearer token via CRON_SECRET env var (set in wrangler secrets).
 * Cloudflare Cron automatically injects `X-Cf-Cron: 1` header.
 *
 * Response shape (always 200 unless fatal):
 *   { checked: number, healthy: number, degraded: number, down: number,
 *     alerts: [{providerId, prevStatus, newStatus, latencyMs}], ts: number }
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  refreshRegistry,
  getMediaProviders,
  getStorageProviders,
  getEmailProviders,
  sendEmail,
} from "@/lib/providers";
import { logger } from "@/lib/providers/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;
const ALERT_TO = process.env.PROVIDER_ALERT_TO || process.env.SUPERADMIN_EMAIL || "";
const ALERT_FROM =
  process.env.MAIL_FROM || "ClickTake Alerts <alerts@clicktaketech.com>";

interface ProviderLike {
  id: string;
  healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }>;
}

async function probe(
  provider: ProviderLike,
  category: "media" | "storage" | "email",
): Promise<{
  providerId: string;
  category: string;
  ok: boolean;
  latencyMs: number;
  message?: string;
  prevStatus: string;
  newStatus: "healthy" | "degraded" | "down";
}> {
  const prior = await prisma.providerHealth.findUnique({
    where: { providerId: provider.id },
  });
  const prevStatus = prior?.status ?? "healthy";

  let ok = false;
  let latencyMs = 0;
  let message: string | undefined;

  try {
    const start = Date.now();
    const result = await Promise.race([
      provider.healthCheck(),
      new Promise<{ ok: boolean; latencyMs: number; message?: string }>((_, reject) =>
        setTimeout(() => reject(new Error("healthcheck timeout 15s")), 15000),
      ),
    ]);
    latencyMs = result.latencyMs || Date.now() - start;
    ok = result.ok;
    message = result.message;
  } catch (err: any) {
    message = err.message || String(err);
  }

  const newStatus: "healthy" | "degraded" | "down" = ok
    ? "healthy"
    : prevStatus === "healthy"
      ? "degraded"
      : "down";

  await prisma.providerHealth.upsert({
    where: { providerId: provider.id },
    create: {
      providerId: provider.id,
      category,
      status: newStatus,
      lastError: ok ? null : message ?? null,
      lastCheckedAt: new Date(),
      latencyMs: latencyMs,
      errorCount5min: ok ? 0 : (prior?.errorCount5min ?? 0) + 1,
      cooldownUntil: null,
    },
    update: {
      category,
      status: newStatus,
      lastError: ok ? null : message ?? null,
      lastCheckedAt: new Date(),
      latencyMs: latencyMs,
      errorCount5min: ok ? 0 : (prior?.errorCount5min ?? 0) + 1,
    },
  });

  return {
    providerId: provider.id,
    category,
    ok,
    latencyMs,
    message,
    prevStatus,
    newStatus,
  };
}

function buildAlertHtml(
  transitions: Array<{ providerId: string; category: string; prevStatus: string; newStatus: string; message?: string; latencyMs: number }>,
): string {
  const rows = transitions
    .map(
      (t) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">${t.providerId}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-transform:capitalize;">${t.category}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${t.prevStatus}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:${t.newStatus === "down" ? "#dc2626" : "#d97706"};font-weight:600;">${t.newStatus}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-family:monospace;font-size:11px;">${t.message ? t.message.replace(/</g, "&lt;") : "—"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${t.latencyMs}ms</td>
      </tr>`,
    )
    .join("");

  return `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:680px;margin:0 auto;color:#0f172a;">
      <div style="background:linear-gradient(135deg,#136DFF,#FF53A9);padding:24px;border-radius:12px 12px 0 0;color:white;">
        <h1 style="margin:0;font-size:20px;font-weight:700;">Provider Health Alert</h1>
        <p style="margin:4px 0 0;opacity:0.9;font-size:13px;">ClickTake Technologies · ${new Date().toUTCString()}</p>
      </div>
      <div style="padding:20px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 12px;font-size:14px;">
          ${transitions.length} provider(s) changed status during the latest scheduled health check.
          Review and take action if any are <strong style="color:#dc2626;">down</strong>.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Provider</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Category</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Previous</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Now</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Error</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Latency</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#6b7280;">
          Manage providers at <a href="https://clicktaketech.com/admin/providers" style="color:#136DFF;">/admin/providers</a>.
          Alert sent to ${ALERT_TO || "(no recipient configured)"}.
        </p>
      </div>
    </div>`;
}

async function sendAlertEmail(
  transitions: Array<{ providerId: string; category: string; prevStatus: string; newStatus: string; message?: string; latencyMs: number }>,
): Promise<void> {
  if (!ALERT_TO) {
    logger.warn(
      { reason: "no-alert-recipient" },
      "[provider-health] PROVIDER_ALERT_TO / SUPERADMIN_EMAIL not set — skipping alert email",
    );
    return;
  }
  const downOrDegraded = transitions.filter(
    (t) => t.newStatus === "down" || t.newStatus === "degraded",
  );
  if (downOrDegraded.length === 0) return;

  const summary = downOrDegraded
    .map((t) => `${t.providerId} (${t.category}): ${t.prevStatus}->${t.newStatus}`)
    .join(", ");

  try {
    await sendEmail({
      to: ALERT_TO,
      from: ALERT_FROM,
      subject: `[ClickTake Alert] ${downOrDegraded.length} provider(s) degraded: ${summary}`.slice(0, 200),
      html: buildAlertHtml(downOrDegraded),
      tags: ["provider-health-alert"],
      metadata: { triggeredBy: "cron", alertCount: String(downOrDegraded.length) },
    });
    logger.info({ to: ALERT_TO, count: downOrDegraded.length }, "[provider-health] alert sent");
  } catch (err) {
    logger.error({ err: String(err) }, "[provider-health] failed to send alert email");
  }
}

export async function GET(req: NextRequest) {
  return run(req);
}

export async function POST(req: NextRequest) {
  return run(req);
}

async function run(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization") || "";
  const cfCron = req.headers.get("x-cf-cron");
  // Vercel Cron doesn't allow custom headers — accept token as ?token= query param too
  const queryToken = req.nextUrl.searchParams.get("token") || "";
  if (CRON_SECRET) {
    const bearer = authHeader.replace(/^Bearer\s+/i, "");
    if (bearer !== CRON_SECRET && cfCron !== "1" && queryToken !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    await refreshRegistry();
    const [mediaProviders, storageProviders, emailProviders] = await Promise.all([
      getMediaProviders(),
      getStorageProviders(),
      getEmailProviders(),
    ]);

    const probes: Promise<any>[] = [
      ...mediaProviders.map((p) => probe(p as ProviderLike, "media")),
      ...storageProviders.map((p) => probe(p as ProviderLike, "storage")),
      ...emailProviders.map((p) => probe(p as ProviderLike, "email")),
    ];

    const results = await Promise.allSettled(probes);
    const settled = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map((r) => r.value);

    const transitions = settled.filter(
      (r) =>
        r.prevStatus !== r.newStatus &&
        (r.newStatus === "degraded" || r.newStatus === "down"),
    );

    await sendAlertEmail(transitions);

    const counts = {
      checked: settled.length,
      healthy: settled.filter((r) => r.newStatus === "healthy").length,
      degraded: settled.filter((r) => r.newStatus === "degraded").length,
      down: settled.filter((r) => r.newStatus === "down").length,
      alerts: transitions,
      ts: Date.now(),
    };

    return NextResponse.json(counts);
  } catch (err: any) {
    logger.error({ err: String(err) }, "[provider-health] cron failed");
    return NextResponse.json(
      { error: err.message || "Provider health cron failed" },
      { status: 500 },
    );
  }
}
