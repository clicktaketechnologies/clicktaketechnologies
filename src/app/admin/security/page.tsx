import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { SecurityClient } from "./security-client";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/security");
  if (!hasPermission(session.user, "manageRBAC")) redirect("/admin");

  const [blockedIps, logs] = await Promise.all([
    prisma.blockedIp.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.securityLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <SecurityClient
      blockedIps={blockedIps.map((b) => ({ id: b.id, ipAddress: b.ipAddress, reason: b.reason, blockedBy: b.blockedBy || "", expiresAt: b.expiresAt?.toISOString() || null, createdAt: b.createdAt.toISOString() }))}
      logs={logs.map((l) => ({ id: l.id, type: l.type, event: l.event, userId: l.userId || "", ipAddress: l.ipAddress || "", metadata: JSON.parse(l.metadata || "{}"), createdAt: l.createdAt.toISOString() }))}
    />
  );
}
