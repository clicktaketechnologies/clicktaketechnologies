// /api/admin/providers — list all provider configs (with masked credentials)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { maskCredential, refreshRegistry } from "@/lib/providers";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const configs = await prisma.providerConfig.findMany({
    orderBy: [{ category: "asc" }, { priority: "asc" }],
  });

  // Mask credentials for safe display in admin UI
  const masked = configs.map((c) => {
    let cred: Record<string, string> = {};
    try {
      cred = JSON.parse(c.credentials || "{}");
    } catch {}
    const maskedCred: Record<string, string> = {};
    for (const [k, v] of Object.entries(cred)) {
      maskedCred[k] = maskCredential(String(v));
    }
    let cfg: Record<string, string> = {};
    try {
      cfg = JSON.parse(c.config || "{}");
    } catch {}
    return {
      id: c.id,
      category: c.category,
      providerId: c.providerId,
      displayName: c.displayName,
      isActive: c.isActive,
      priority: c.priority,
      config: cfg,
      credentials: maskedCred,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  });

  // Attach latest health status
  const health = await prisma.providerHealth.findMany();
  const healthMap = new Map(health.map((h) => [h.providerId, h]));
  const withHealth = masked.map((m) => ({
    ...m,
    health: healthMap.get(m.providerId)
      ? {
          status: healthMap.get(m.providerId)!.status,
          latencyMs: healthMap.get(m.providerId)!.latencyMs,
          lastCheckedAt: healthMap.get(m.providerId)!.lastCheckedAt,
          lastError: healthMap.get(m.providerId)!.lastError,
          cooldownUntil: healthMap.get(m.providerId)!.cooldownUntil,
        }
      : null,
  }));

  return NextResponse.json({ providers: withHealth });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { category, providerId, displayName, isActive, priority, credentials, config } = body;
  if (!category || !providerId) {
    return NextResponse.json({ error: "category and providerId required" }, { status: 400 });
  }

  const { encryptCredentials } = await import("@/lib/providers");
  const encCreds = credentials ? await encryptCredentials(credentials) : "{}";
  const cfgStr = config ? JSON.stringify(config) : "{}";

  const existing = await prisma.providerConfig.findUnique({
    where: { category_providerId: { category, providerId } },
  });

  let record;
  if (existing) {
    record = await prisma.providerConfig.update({
      where: { id: existing.id },
      data: {
        displayName: displayName || existing.displayName,
        isActive: isActive ?? existing.isActive,
        priority: priority ?? existing.priority,
        credentials: encCreds,
        config: cfgStr,
      },
    });
  } else {
    record = await prisma.providerConfig.create({
      data: {
        category,
        providerId,
        displayName: displayName || providerId,
        isActive: isActive ?? false,
        priority: priority ?? 0,
        credentials: encCreds,
        config: cfgStr,
      },
    });
  }

  // Refresh registry so the new/updated provider is loaded
  await refreshRegistry();

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: existing ? "provider.update" : "provider.create",
    entity: "ProviderConfig",
    entityId: record.id,
    details: { category, providerId },
  });

  return NextResponse.json({ ok: true, provider: record });
}
