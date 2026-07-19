import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { EmailClient } from "./email-client";

export const dynamic = "force-dynamic";

export default async function EmailPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/email");
  if (!hasPermission(session.user, "readLeads")) redirect("/admin");

  const [templates, logs] = await Promise.all([
    prisma.emailTemplate.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.smtpLog.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
  ]);

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
    />
  );
}
