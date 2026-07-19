import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { AdminDashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin");

  // Fetch KPIs in parallel
  const [
    leadsCount,
    newLeadsCount,
    convertedLeadsCount,
    pagesCount,
    servicesCount,
    publishedPages,
    emailSentCount,
    teamCount,
    recentLeads,
    recentAudit,
    dailyLeads,
  ] = await Promise.all([
    prisma.lead.count({ where: { deletedAt: null } }),
    prisma.lead.count({ where: { deletedAt: null, status: "New" } }),
    prisma.lead.count({ where: { deletedAt: null, status: "Converted" } }),
    prisma.page.count(),
    prisma.service.count(),
    prisma.page.count({ where: { isPublished: true } }),
    prisma.smtpLog.count({ where: { status: "sent" } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.lead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.lead.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      select: { createdAt: true, status: true },
    }),
  ]);

  // Build last-14-days chart data
  const days: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const count = dailyLeads.filter(
      (l) => l.createdAt >= d && l.createdAt < next
    ).length;
    days.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count,
    });
  }

  // Status distribution
  const statusCounts: Record<string, number> = {};
  dailyLeads.forEach((l) => {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
  });

  const stats = {
    leadsCount,
    newLeadsCount,
    convertedLeadsCount,
    pagesCount,
    publishedPages,
    servicesCount,
    emailSentCount,
    teamCount,
  };

  return (
    <AdminDashboardClient
      stats={stats}
      recentLeads={recentLeads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        service: l.serviceInterest || "—",
        status: l.status,
        createdAt: l.createdAt.toISOString(),
      }))}
      recentAudit={recentAudit.map((a) => ({
        id: a.id,
        userName: a.userName || "System",
        action: a.action,
        entity: a.entity,
        createdAt: a.createdAt.toISOString(),
      }))}
      chartData={days}
      statusCounts={Object.entries(statusCounts).map(([name, value]) => ({ name, value }))}
    />
  );
}
