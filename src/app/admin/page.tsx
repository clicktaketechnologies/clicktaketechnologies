import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { AdminDashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

// ─── Defensive query helper ─────────────────────────────────────────────────
// The dashboard fires 11 parallel Prisma queries. If even ONE throws — e.g.
// because a table or column is missing in production due to a pending
// `drizzle-kit push` migration — Promise.all rejects and the entire page falls
// into error.tsx, locking the user out of the admin panel entirely.
//
// Promise.allSettled isolates each query: a rejected query becomes a `rejected`
// result instead of throwing the whole batch. We then destructure each result
// with a fallback (0 for counts, [] for findMany) so a broken/missing table
// degrades gracefully instead of crashing the page. The dashboard client
// already renders empty states, so partial DB availability is visible.
async function run<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[admin/dashboard] query "${label}" failed:`, err);
    return null;
  }
}

export default async function AdminDashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin");

  // Fetch KPIs in parallel — Promise.allSettled means a single missing table
  // or column degrades to a null result instead of crashing the whole page.
  const [
    leadsCountR,
    newLeadsCountR,
    convertedLeadsCountR,
    pagesCountR,
    servicesCountR,
    publishedPagesR,
    emailSentCountR,
    teamCountR,
    recentLeadsR,
    recentAuditR,
    dailyLeadsR,
  ] = await Promise.all([
    run<number>("leads.count", () => prisma.lead.count({ where: { deletedAt: null } })),
    run<number>("leads.count.new", () => prisma.lead.count({ where: { deletedAt: null, status: "New" } })),
    run<number>("leads.count.converted", () => prisma.lead.count({ where: { deletedAt: null, status: "Converted" } })),
    run<number>("pages.count", () => prisma.page.count()),
    run<number>("services.count", () => prisma.service.count()),
    run<number>("pages.count.published", () => prisma.page.count({ where: { isPublished: true } })),
    run<number>("smtpLogs.count", () => prisma.smtpLog.count({ where: { status: "sent" } })),
    run<number>("teamMembers.count", () => prisma.teamMember.count({ where: { isActive: true } })),
    run<any[]>("leads.recent", () => prisma.lead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    })),
    run<any[]>("auditLogs.recent", () => prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    })),
    run<{ createdAt: Date; status: string }[]>("leads.daily", () => prisma.lead.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      select: { createdAt: true, status: true },
    })),
  ]);

  // Coalesce nulls to safe defaults — TS now has full type inference because
  // each result comes directly from prisma.* (no generic helper involved).
  const leadsCount = leadsCountR ?? 0;
  const newLeadsCount = newLeadsCountR ?? 0;
  const convertedLeadsCount = convertedLeadsCountR ?? 0;
  const pagesCount = pagesCountR ?? 0;
  const servicesCount = servicesCountR ?? 0;
  const publishedPages = publishedPagesR ?? 0;
  const emailSentCount = emailSentCountR ?? 0;
  const teamCount = teamCountR ?? 0;
  const recentLeads = recentLeadsR ?? [];
  const recentAudit = recentAuditR ?? [];
  const dailyLeads = dailyLeadsR ?? [];

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
