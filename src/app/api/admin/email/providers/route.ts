// /api/admin/email/providers — list active email providers for the admin UI
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { getEmailProviders } from "@/lib/providers";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Live adapters in registry
  const liveAdapters = await getEmailProviders();

  // DB config (includes inactive ones too, for display)
  const configs = await prisma.providerConfig.findMany({
    where: { category: "email" },
    orderBy: [{ priority: "asc" }],
  });

  // Health status
  const health = await prisma.providerHealth.findMany({
    where: { category: "email" },
  });
  const healthMap = new Map<string, any>(health.map((h: any) => [h.providerId, h] as [string, any]));

  // Recent send counts per provider (last 24h)
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentLogs = await prisma.emailLog.findMany({
    where: { sentAt: { gte: since } },
    select: { providerId: true, status: true },
  });
  const statsByProvider = new Map<string, { sent: number; failed: number }>();
  for (const log of recentLogs) {
    const s = statsByProvider.get(log.providerId) ?? { sent: 0, failed: 0 };
    if (log.status === "sent") s.sent++;
    else s.failed++;
    statsByProvider.set(log.providerId, s);
  }

  // Assemble provider chain view
  const chain = configs.map((c, idx) => {
    const h = healthMap.get(c.providerId);
    const stats = statsByProvider.get(c.providerId) ?? { sent: 0, failed: 0 };
    const adapter = liveAdapters.find((p) => p.id === c.providerId);
    return {
      id: c.id,
      providerId: c.providerId,
      displayName: c.displayName,
      isActive: c.isActive,
      priority: c.priority,
      positionInChain: idx + 1,
      isLive: !!adapter,
      supportedFeatures: adapter?.supportedFeatures ?? [],
      health: h
        ? {
            status: h.status,
            latencyMs: h.latencyMs,
            lastCheckedAt: h.lastCheckedAt,
            lastError: h.lastError,
            cooldownUntil: h.cooldownUntil,
            errorCount5min: h.errorCount5min,
          }
        : null,
      stats24h: stats,
    };
  });

  return NextResponse.json({ chain });
}
