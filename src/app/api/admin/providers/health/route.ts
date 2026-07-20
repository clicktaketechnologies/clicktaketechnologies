/**
 * GET /api/admin/providers/health
 *
 * Returns the latest persisted health state for every provider
 * (populated by the /api/cron/provider-health cron job).
 *
 * No body required. Requires admin session.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.providerHealth.findMany({
    orderBy: [{ category: "asc" }, { providerId: "asc" }],
  });

  const byCategory = {
    media: rows.filter((r) => r.category === "media"),
    storage: rows.filter((r) => r.category === "storage"),
    email: rows.filter((r) => r.category === "email"),
  };

  const summary = {
    total: rows.length,
    healthy: rows.filter((r) => r.status === "healthy").length,
    degraded: rows.filter((r) => r.status === "degraded").length,
    down: rows.filter((r) => r.status === "down").length,
    inCooldown: rows.filter(
      (r) => r.cooldownUntil && r.cooldownUntil > new Date(),
    ).length,
  };

  return NextResponse.json({
    summary,
    byCategory,
    lastUpdated: rows.length
      ? rows.reduce(
          (max, r) => (r.lastCheckedAt > max ? r.lastCheckedAt : max),
          rows[0].lastCheckedAt,
        )
      : null,
  });
}
