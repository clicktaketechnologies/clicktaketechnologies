// /api/admin/providers/[id] — get/update/delete single provider
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { encryptCredentials, refreshRegistry } from "@/lib/providers";
import { logAudit } from "@/lib/log-audit";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const cfg = await prisma.providerConfig.findUnique({ where: { id } });
  if (!cfg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ provider: cfg });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.providerConfig.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const { displayName, isActive, priority, credentials, config } = body;

  const encCreds = credentials ? await encryptCredentials(credentials) : existing.credentials;
  const cfgStr = config ? JSON.stringify(config) : existing.config;

  const updated = await prisma.providerConfig.update({
    where: { id },
    data: {
      displayName: displayName ?? existing.displayName,
      isActive: isActive ?? existing.isActive,
      priority: priority ?? existing.priority,
      credentials: encCreds,
      config: cfgStr,
    },
  });

  await refreshRegistry();
  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "provider.update",
    entity: "ProviderConfig",
    entityId: id,
    details: { providerId: existing.providerId, category: existing.category },
  });

  return NextResponse.json({ ok: true, provider: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.providerConfig.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.providerConfig.delete({ where: { id } });
  await prisma.providerHealth.deleteMany({ where: { providerId: existing.providerId } });

  await refreshRegistry();
  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "provider.delete",
    entity: "ProviderConfig",
    entityId: id,
    details: { providerId: existing.providerId, category: existing.category },
  });

  return NextResponse.json({ ok: true });
}
