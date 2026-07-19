import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { CrmClient } from "./crm-client";

export const dynamic = "force-dynamic";

const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Converted", "Closed"];

export default async function CrmPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/crm");
  if (!hasPermission(session.user, "readLeads")) redirect("/admin");

  const [leads, statusCounts] = await Promise.all([
    prisma.lead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.lead.groupBy({
      by: ["status"],
      where: { deletedAt: null },
      _count: true,
    }),
  ]);

  return (
    <CrmClient
      leads={leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone,
        serviceInterest: l.serviceInterest,
        message: l.message,
        status: l.status,
        source: l.source,
        sourcePage: l.sourcePage,
        notes: l.notes,
        internalNotes: l.internalNotes,
        assignedTo: l.assignedTo,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      }))}
      statusCounts={statusCounts.reduce((acc, s) => ({ ...acc, [s.status]: s._count }), {} as Record<string, number>)}
      statuses={STATUSES}
      canWrite={hasPermission(session.user, "writeLeads")}
    />
  );
}
