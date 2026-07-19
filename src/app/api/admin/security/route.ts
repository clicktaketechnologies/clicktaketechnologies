// /api/admin/security — blocked IPs + security logs + settings
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit, logSecurityEvent } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [blockedIps, logs, settings] = await Promise.all([
    prisma.blockedIp.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.securityLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.securitySetting.findMany(),
  ]);

  return NextResponse.json({
    blockedIps: blockedIps.map((b) => ({ ...b, expiresAt: b.expiresAt?.toISOString() || null, createdAt: b.createdAt.toISOString() })),
    logs: logs.map((l) => ({ ...l, createdAt: l.createdAt.toISOString(), metadata: JSON.parse(l.metadata || "{}") })),
    settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { action } = body;

  if (action === "block_ip") {
    const { ipAddress, reason, expiresAt } = body;
    if (!ipAddress) return NextResponse.json({ error: "IP address required" }, { status: 400 });
    const existing = await prisma.blockedIp.findUnique({ where: { ipAddress } });
    if (existing) return NextResponse.json({ error: "IP already blocked" }, { status: 409 });
    const blocked = await prisma.blockedIp.create({ data: { ipAddress, reason: reason || "", blockedBy: session.user.name || undefined, expiresAt: expiresAt ? new Date(expiresAt) : null } });
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "security.block_ip", entity: "BlockedIp", entityId: blocked.id, details: { ipAddress, reason } });
    await logSecurityEvent({ type: "warning", event: "ip_blocked", userId: session.user.id, metadata: { ipAddress, reason } });
    return NextResponse.json({ id: blocked.id });
  }
  if (action === "unblock_ip") {
    const { id } = body;
    const ip = await prisma.blockedIp.findUnique({ where: { id } });
    if (ip) {
      await prisma.blockedIp.delete({ where: { id } });
      await logAudit({ userId: session.user.id, userName: session.user.name, action: "security.unblock_ip", entity: "BlockedIp", entityId: id, details: { ipAddress: ip.ipAddress } });
    }
    return NextResponse.json({ success: true });
  }
  if (action === "update_setting") {
    const { key, value } = body;
    const existing = await prisma.securitySetting.findUnique({ where: { key } });
    if (existing) {
      await prisma.securitySetting.update({ where: { key }, data: { value } });
    } else {
      await prisma.securitySetting.create({ data: { key, value } });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
