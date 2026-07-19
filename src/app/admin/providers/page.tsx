import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProvidersClient } from "./providers-client";

export default async function AdminProvidersPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login");

  const configs = await prisma.providerConfig.findMany({
    orderBy: [{ category: "asc" }, { priority: "asc" }],
  });
  const health = await prisma.providerHealth.findMany();
  const emailLogs = await prisma.emailLog.findMany({
    orderBy: { sentAt: "desc" },
    take: 20,
  });
  const storageObjects = await prisma.storageObject.count();

  return (
    <ProvidersClient
      initialProviders={configs.map((c) => ({
        id: c.id,
        category: c.category as "media" | "storage" | "email",
        providerId: c.providerId,
        displayName: c.displayName,
        isActive: c.isActive,
        priority: c.priority,
        config: JSON.parse(c.config || "{}"),
        credentials: {}, // never send raw creds to client
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }))}
      health={health.map((h) => ({
        providerId: h.providerId,
        category: h.category as "media" | "storage" | "email",
        status: h.status,
        latencyMs: h.latencyMs,
        lastCheckedAt: h.lastCheckedAt,
        lastError: h.lastError,
        cooldownUntil: h.cooldownUntil,
      }))}
      emailLogs={emailLogs.map((l) => ({
        id: l.id,
        providerId: l.providerId,
        toAddress: l.toAddress,
        subject: l.subject,
        status: l.status,
        errorMessage: l.errorMessage,
        sentAt: l.sentAt,
      }))}
      storageObjectCount={storageObjects}
    />
  );
}
