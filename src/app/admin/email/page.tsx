import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { getEmailProviders } from "@/lib/providers";
import { EmailClient } from "./email-client";

export const dynamic = "force-dynamic";

export default async function EmailPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/email");
  if (!hasPermission(session.user, "readLeads")) redirect("/admin");

  const [templates, logs, providerConfigs, health, emailLogs] = await Promise.all([
    prisma.emailTemplate.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.smtpLog.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.providerConfig.findMany({
      where: { category: "email" },
      orderBy: [{ priority: "asc" }],
    }),
    prisma.providerHealth.findMany({ where: { category: "email" } }),
    prisma.emailLog.findMany({ orderBy: { sentAt: "desc" }, take: 50 }),
  ]);

  const liveAdapters = await getEmailProviders();

  return (
    <EmailClient
      templates={templates.map((t) => ({
        id: t.id,
        name: t.name,
        subject: t.subject,
        htmlContent: t.htmlContent,
        category: t.category,
        variables: JSON.parse(t.variables || "[]"),
        updatedAt: t.updatedAt.toISOString(),
      }))}
      logs={logs.map((l) => ({
        id: l.id,
        type: l.type,
        toEmail: l.toEmail,
        subject: l.subject,
        status: l.status,
        error: l.error,
        createdAt: l.createdAt.toISOString(),
      }))}
      canWrite={hasPermission(session.user, "writeLeads")}
      providers={providerConfigs.map((c) => {
        const h = health.find((hh) => hh.providerId === c.providerId);
        const adapter = liveAdapters.find((p) => p.id === c.providerId);
        return {
          id: c.id,
          providerId: c.providerId,
          displayName: c.displayName,
          isActive: c.isActive,
          priority: c.priority,
          supportedFeatures: adapter?.supportedFeatures ?? [],
          isLive: !!adapter,
          health: h
            ? {
                status: h.status,
                latencyMs: h.latencyMs,
                lastCheckedAt: h.lastCheckedAt.toISOString(),
                lastError: h.lastError,
                cooldownUntil: h.cooldownUntil?.toISOString() ?? null,
              }
            : null,
        };
      })}
      emailLogs={emailLogs.map((l) => ({
        id: l.id,
        providerId: l.providerId,
        messageId: l.messageId,
        toAddress: l.toAddress,
        subject: l.subject,
        status: l.status,
        errorMessage: l.errorMessage,
        sentAt: l.sentAt.toISOString(),
      }))}
    />
  );
}
