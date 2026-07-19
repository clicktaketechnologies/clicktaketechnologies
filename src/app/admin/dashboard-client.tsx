"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileText,
  Package,
  Mail,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";

type Stats = {
  leadsCount: number;
  newLeadsCount: number;
  convertedLeadsCount: number;
  pagesCount: number;
  publishedPages: number;
  servicesCount: number;
  emailSentCount: number;
  teamCount: number;
};

type Props = {
  stats: Stats;
  recentLeads: { id: string; name: string; email: string; service: string; status: string; createdAt: string }[];
  recentAudit: { id: string; userName: string; action: string; entity: string | null; createdAt: string }[];
  chartData: { date: string; count: number }[];
  statusCounts: { name: string; value: number }[];
};

const STATUS_COLORS: Record<string, string> = {
  New: "#136DFF",
  Contacted: "#FF53A9",
  Qualified: "#10B981",
  Proposal: "#F59E0B",
  Converted: "#8B5CF6",
  Closed: "#6B7280",
};

export function AdminDashboardClient({
  stats,
  recentLeads,
  recentAudit,
  chartData,
  statusCounts,
}: Props) {
  const cards = [
    {
      label: "Total Leads",
      value: stats.leadsCount,
      delta: stats.newLeadsCount > 0 ? `+${stats.newLeadsCount} new` : "—",
      trend: "up" as const,
      icon: Users,
      href: "/admin/crm",
      color: "from-brand-blue to-brand-pink",
    },
    {
      label: "Published Pages",
      value: stats.publishedPages,
      delta: `${stats.pagesCount} total`,
      trend: "up" as const,
      icon: FileText,
      href: "/admin/cms",
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Services",
      value: stats.servicesCount,
      delta: "Active catalog",
      trend: "up" as const,
      icon: Package,
      href: "/admin/services",
      color: "from-amber-400 to-orange-500",
    },
    {
      label: "Emails Sent",
      value: stats.emailSentCount,
      delta: "All time",
      trend: "up" as const,
      icon: Mail,
      href: "/admin/email",
      color: "from-brand-magenta to-brand-pink",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back — here&apos;s what&apos;s happening across ClickTake.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={c.href}>
                <Card className="group relative overflow-hidden p-5 transition-shadow hover:shadow-lg">
                  <div
                    className={`absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br ${c.color} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
                  />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="mt-2 text-3xl font-bold">{c.value}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        {c.trend === "up" ? (
                          <TrendingUp className="size-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="size-3 text-red-500" />
                        )}
                        {c.delta}
                      </div>
                    </div>
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-white shadow-lg`}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Leads — Last 14 days</h3>
              <p className="text-xs text-muted-foreground">Daily lead volume trend</p>
            </div>
            <Link
              href="/admin/crm"
              className="flex items-center gap-1 text-xs text-brand-blue hover:underline"
            >
              View CRM <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#136DFF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF53A9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} allowDecimals={false} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: "rgba(20,20,30,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#136DFF"
                  strokeWidth={2}
                  dot={{ fill: "#FF53A9", r: 3 }}
                  activeDot={{ r: 5 }}
                  fill="url(#leadGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold">Lead Status</h3>
          <p className="text-xs text-muted-foreground">Pipeline distribution</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {statusCounts.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#6B7280"}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: "rgba(20,20,30,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1">
            {statusCounts.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[s.name] || "#6B7280" }}
                  />
                  {s.name}
                </span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Leads</h3>
            <Link href="/admin/crm" className="text-xs text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No leads yet. They&apos;ll show up here when the contact form is used.
              </div>
            ) : (
              recentLeads.map((l) => (
                <Link
                  key={l.id}
                  href={`/admin/crm?lead=${l.id}`}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-semibold text-brand-blue">
                    {l.name[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{l.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{l.email}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: (STATUS_COLORS[l.status] || "#6B7280") + "20",
                        color: STATUS_COLORS[l.status] || "#6B7280",
                      }}
                    >
                      {l.status}
                    </div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Activity Log</h3>
          <div className="space-y-2">
            {recentAudit.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No activity yet.
              </div>
            ) : (
              recentAudit.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 rounded-md p-2 text-xs hover:bg-muted"
                >
                  <div className="mt-1 size-2 rounded-full bg-brand-pink" />
                  <div className="flex-1">
                    <div className="font-medium">{a.action}</div>
                    <div className="text-muted-foreground">
                      {a.userName} {a.entity && `· ${a.entity}`} ·{" "}
                      {new Date(a.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-4 text-brand-pink" />
          <h3 className="text-sm font-semibold">Quick Actions</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "New Page", href: "/admin/cms?new=1", icon: FileText },
            { label: "Add Service", href: "/admin/services?new=1", icon: Package },
            { label: "View Leads", href: "/admin/crm", icon: Users },
            { label: "Send Email", href: "/admin/email", icon: Mail },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                className="group flex items-center justify-between rounded-md border border-border/60 p-3 text-sm transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/5"
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-brand-blue" />
                  {a.label}
                </span>
                <ArrowUpRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
