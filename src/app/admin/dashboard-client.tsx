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
  Activity,
  Zap,
} from "lucide-react";

/* Admin Dashboard — AWIAP-inspired dark dashboard with ClickTake brand colors.
 *
 * Layout:
 *  - Stat grid (4 cards)
 *  - System flow diagram + AI performance formula (2-col grid)
 *  - Pending actions + workforce breakdown + quick actions (3-col grid)
 *  - Recent leads + activity log (2-col grid)
 *
 * Uses .ct-admin-* classes from admin-globals.css. Brand colors:
 *   Pink #FF53A9 primary, Blue #136DFF + Purple #9B3DFF secondaries
 */

// ─── Inline SVG chart helpers (zero-dep) ─────────────────────────────────

function MiniLineChart({ data, height = 220 }: { data: { date: string; count: number }[]; height?: number }) {
  if (data.length === 0) {
    return <div className="ct-admin-empty"><div className="ct-admin-empty-icon">📊</div>No data yet</div>;
  }
  const width = 600;
  const padX = 32;
  const padY = 16;
  const max = Math.max(1, ...data.map((d) => d.count));
  const stepX = (width - padX * 2) / Math.max(1, data.length - 1);
  const points = data.map((d, i) => {
    const x = padX + i * stepX;
    const y = padY + (height - padY * 2) * (1 - d.count / max);
    return { x, y, ...d };
  });
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height - padY} L ${points[0].x.toFixed(1)} ${height - padY} Z`;
  const yTicks = [0, Math.ceil(max / 2), max];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF53A9" stopOpacity="0.4" />
          <stop offset="95%" stopColor="#9B3DFF" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {yTicks.map((t, i) => {
        const y = padY + (height - padY * 2) * (1 - t / max);
        return (
          <g key={i}>
            <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <text x={padX - 8} y={y + 3} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.4)">{t}</text>
          </g>
        );
      })}
      {/* Area + line */}
      <path d={areaD} fill="url(#leadGradient)" />
      <path d={pathD} fill="none" stroke="#FF53A9" strokeWidth="2" />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#136DFF" />
      ))}
      {/* X labels */}
      {[0, Math.floor(data.length / 2), data.length - 1].map((idx, i) => {
        const p = points[idx];
        if (!p) return null;
        return (
          <text key={i} x={p.x} y={height - 4} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">
            {p.date.slice(5)}
          </text>
        );
      })}
    </svg>
  );
}

function MiniDonutChart({ data, size = 160 }: { data: { name: string; value: number }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) {
    return <div className="ct-admin-empty"><div className="ct-admin-empty-icon">○</div>No leads yet</div>;
  }
  const radius = 60;
  const inner = 38;
  const cx = size / 2;
  const cy = size / 2;
  let angle = -Math.PI / 2;
  const segments = data.map((d) => {
    const slice = (d.value / total) * Math.PI * 2;
    const a0 = angle;
    const a1 = angle + slice;
    angle = a1;
    const x0 = cx + radius * Math.cos(a0);
    const y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1);
    const y1 = cy + radius * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a1);
    const yi0 = cy + inner * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a0);
    const yi1 = cy + inner * Math.sin(a0);
    const large = slice > Math.PI ? 1 : 0;
    const path = `M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1} L ${xi0} ${yi0} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    return { path, color: STATUS_COLORS[d.name] || "#7A6B95", name: d.name, value: d.value };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      {segments.map((s, i) => (
        <path key={i} d={s.path} fill={s.color}>
          <title>{`${s.name}: ${s.value}`}</title>
        </path>
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#F0EBF8">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="rgba(240,235,248,0.5)">total</text>
    </svg>
  );
}

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
  Qualified: "#22c55e",
  Proposal: "#f59e0b",
  Converted: "#9B3DFF",
  Closed: "#7A6B95",
};

export function AdminDashboardClient({
  stats,
  recentLeads,
  recentAudit,
  chartData,
  statusCounts,
}: Props) {
  return (
    <div>
      {/* Page header */}
      <div className="ct-admin-page-header">
        <div>
          <h1 className="ct-admin-page-title">Dashboard Overview</h1>
          <div className="ct-admin-page-sub">
            Welcome back — here&apos;s what&apos;s happening across ClickTake.
          </div>
        </div>
        <Link href="/admin/cms?new=1" className="ct-admin-btn ct-admin-btn-primary">
          <Sparkles className="h-3.5 w-3.5" /> New Page
        </Link>
      </div>

      {/* Stat grid */}
      <div className="ct-admin-stat-grid">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Link href="/admin/crm">
            <div className="ct-admin-stat">
              <div className="ct-admin-stat-label">Total Leads</div>
              <div className="ct-admin-stat-val">{stats.leadsCount}</div>
              <div className="ct-admin-stat-sub up">
                <TrendingUp className="inline h-3 w-3" /> {stats.newLeadsCount > 0 ? `+${stats.newLeadsCount} new` : "—"}
              </div>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Link href="/admin/cms">
            <div className="ct-admin-stat">
              <div className="ct-admin-stat-label">Published Pages</div>
              <div className="ct-admin-stat-val">{stats.publishedPages}</div>
              <div className="ct-admin-stat-sub info">
                <FileText className="inline h-3 w-3" /> {stats.pagesCount} total
              </div>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/admin/services">
            <div className="ct-admin-stat">
              <div className="ct-admin-stat-label">Services</div>
              <div className="ct-admin-stat-val">{stats.servicesCount}</div>
              <div className="ct-admin-stat-sub">
                <Package className="inline h-3 w-3" /> Active catalog
              </div>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Link href="/admin/email">
            <div className="ct-admin-stat">
              <div className="ct-admin-stat-label">Emails Sent</div>
              <div className="ct-admin-stat-val">{stats.emailSentCount}</div>
              <div className="ct-admin-stat-sub">
                <Mail className="inline h-3 w-3" /> All time
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Charts row — system flow + leads chart */}
      <div className="ct-admin-grid2">
        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div>
              <div className="ct-admin-card-title">Leads — Last 14 Days</div>
              <div className="ct-admin-card-sub">Daily lead volume trend</div>
            </div>
            <Link href="/admin/crm" className="ct-admin-btn ct-admin-btn-sm">
              View CRM <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="ct-admin-card-body">
            <div className="h-64">
              <MiniLineChart data={chartData} />
            </div>
          </div>
        </div>

        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div>
              <div className="ct-admin-card-title">Lead Status</div>
              <div className="ct-admin-card-sub">Pipeline distribution</div>
            </div>
          </div>
          <div className="ct-admin-card-body">
            <div className="h-48">
              <MiniDonutChart data={statusCounts} />
            </div>
            <div className="mt-3 space-y-1">
              {statusCounts.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2" style={{ color: "var(--cta-muted2)" }}>
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[s.name] || "#7A6B95" }}
                    />
                    {s.name}
                  </span>
                  <span style={{ color: "var(--cta-text)", fontFamily: "var(--cta-font-mono)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System flow diagram — end-to-end ClickTake pipeline */}
      <div className="ct-admin-card">
        <div className="ct-admin-card-head">
          <div>
            <div className="ct-admin-card-title">System Flow</div>
            <div className="ct-admin-card-sub">End-to-end lead → delivery pipeline</div>
          </div>
        </div>
        <div className="ct-admin-card-body" style={{ overflowX: "auto" }}>
          <div className="ct-admin-flow-row">
            <div className="ct-admin-flow-box">
              <div className="ct-admin-flow-name">Visit</div>
              <div className="ct-admin-flow-sub">Site / SEO</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box" style={{ borderColor: "rgba(19, 109, 255, 0.35)" }}>
              <div className="ct-admin-flow-name">Contact</div>
              <div className="ct-admin-flow-sub">Form / Chat</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box">
              <div className="ct-admin-flow-name">CRM</div>
              <div className="ct-admin-flow-sub">Lead captured</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box" style={{ borderColor: "rgba(255, 83, 169, 0.35)" }}>
              <div className="ct-admin-flow-name">Qualify</div>
              <div className="ct-admin-flow-sub">Score + tag</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box">
              <div className="ct-admin-flow-name">Proposal</div>
              <div className="ct-admin-flow-sub">Scope + quote</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box" style={{ borderColor: "rgba(155, 61, 255, 0.35)" }}>
              <div className="ct-admin-flow-name">Deliver</div>
              <div className="ct-admin-flow-sub">Build / ship</div>
            </div>
            <div className="ct-admin-flow-arrow">→</div>
            <div className="ct-admin-flow-box" style={{ borderColor: "rgba(34, 197, 94, 0.35)" }}>
              <div className="ct-admin-flow-name">Launch</div>
              <div className="ct-admin-flow-sub">+ Retain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Three-column row — pending actions, lead breakdown, quick actions */}
      <div className="ct-admin-grid3">
        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div className="ct-admin-card-title">Pending Actions</div>
          </div>
          <div className="ct-admin-card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--cta-muted)" }}>New Leads</span>
              <span className="ct-admin-badge b-blue">{stats.newLeadsCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--cta-muted)" }}>Draft Pages</span>
              <span className="ct-admin-badge b-amber">{Math.max(0, stats.pagesCount - stats.publishedPages)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--cta-muted)" }}>Services Live</span>
              <span className="ct-admin-badge b-green">{stats.servicesCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--cta-muted)" }}>Converted</span>
              <span className="ct-admin-badge b-purple">{stats.convertedLeadsCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--cta-muted)" }}>Team Members</span>
              <span className="ct-admin-badge b-pink">{stats.teamCount}</span>
            </div>
          </div>
        </div>

        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div className="ct-admin-card-title">Lead Breakdown</div>
          </div>
          <div className="ct-admin-card-body">
            {statusCounts.length === 0 ? (
              <div className="ct-admin-empty">
                <div className="ct-admin-empty-icon">○</div>
                No leads yet
              </div>
            ) : (
              statusCounts.map((s) => {
                const total = statusCounts.reduce((sum, x) => sum + x.value, 0) || 1;
                const pct = (s.value / total) * 100;
                return (
                  <div key={s.name} className="ct-admin-ana-row">
                    <div className="ct-admin-ana-label">{s.name}</div>
                    <div className="ct-admin-ana-track">
                      <div
                        className="ct-admin-ana-fill"
                        style={{
                          width: `${pct}%`,
                          background: STATUS_COLORS[s.name] || "#7A6B95",
                        }}
                      />
                    </div>
                    <div className="ct-admin-ana-val">{s.value}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div className="ct-admin-card-title">Quick Actions</div>
          </div>
          <div className="ct-admin-card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/admin/cms?new=1" className="ct-admin-btn" style={{ justifyContent: "flex-start" }}>
              <FileText className="h-3.5 w-3.5" /> New Page
            </Link>
            <Link href="/admin/services?new=1" className="ct-admin-btn" style={{ justifyContent: "flex-start" }}>
              <Package className="h-3.5 w-3.5" /> Add Service
            </Link>
            <Link href="/admin/crm" className="ct-admin-btn" style={{ justifyContent: "flex-start" }}>
              <Users className="h-3.5 w-3.5" /> View Leads
            </Link>
            <Link href="/admin/email" className="ct-admin-btn ct-admin-btn-primary" style={{ justifyContent: "flex-start" }}>
              <Mail className="h-3.5 w-3.5" /> Send Email
            </Link>
          </div>
        </div>
      </div>

      {/* Recent activity — recent leads + audit log */}
      <div className="ct-admin-grid2">
        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div className="ct-admin-card-title">Recent Leads</div>
            <Link href="/admin/crm" className="ct-admin-btn ct-admin-btn-sm">
              View all
            </Link>
          </div>
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {recentLeads.length === 0 ? (
              <div className="ct-admin-empty">
                <div className="ct-admin-empty-icon">📭</div>
                No leads yet. They&apos;ll show up here when the contact form is used.
              </div>
            ) : (
              recentLeads.map((l, i) => {
                const avatarClass = `av${(i % 6) + 1}`;
                const statusClass =
                  l.status === "New" ? "b-blue" :
                  l.status === "Contacted" ? "b-pink" :
                  l.status === "Qualified" ? "b-green" :
                  l.status === "Proposal" ? "b-amber" :
                  l.status === "Converted" ? "b-purple" : "b-gray";
                return (
                  <Link
                    key={l.id}
                    href={`/admin/crm?lead=${l.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      transition: "background 0.15s",
                    }}
                    className="ct-admin-hover-row"
                  >
                    <div className={`ct-admin-avatar-sm ${avatarClass}`}>
                      {l.name[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--cta-text)" }}>{l.name}</div>
                      <div style={{ fontSize: 10, color: "var(--cta-muted)", fontFamily: "var(--cta-font-mono)" }}>{l.email}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className={`ct-admin-badge ${statusClass}`}>{l.status}</span>
                      <div style={{ fontSize: 10, color: "var(--cta-muted)", marginTop: 4, fontFamily: "var(--cta-font-mono)" }}>
                        {new Date(l.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="ct-admin-card">
          <div className="ct-admin-card-head">
            <div className="ct-admin-card-title">Activity Log</div>
          </div>
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {recentAudit.length === 0 ? (
              <div className="ct-admin-empty">
                <div className="ct-admin-empty-icon">📋</div>
                No activity yet.
              </div>
            ) : (
              recentAudit.map((a, i) => {
                const alertClass = i % 4 === 0 ? "a-pink" : i % 4 === 1 ? "a-blue" : i % 4 === 2 ? "a-amber" : "a-red";
                return (
                  <div key={a.id} className={`ct-admin-alert ${alertClass}`}>
                    <Activity className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--cta-accent)" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ct-admin-alert-title">{a.action}</div>
                      <div className="ct-admin-alert-desc">
                        {a.userName} {a.entity && `· ${a.entity}`}
                      </div>
                    </div>
                    <div className="ct-admin-alert-time">
                      {new Date(a.createdAt).toLocaleString()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Inline hover style for rows */}
      <style>{`
        .ct-admin-hover-row:hover {
          background: var(--cta-bg3);
        }
      `}</style>
    </div>
  );
}
