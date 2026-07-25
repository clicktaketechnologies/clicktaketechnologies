"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  ShieldAlert,
  Settings,
  Shield,
  Menu,
  Bell,
  Globe,
  X,
  LogOut,
  Type,
  Palette,
  Package,
  Briefcase,
  Sparkles,
  Server,
  Clock,
  FlaskConical,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import "./admin-globals.css";

/* Admin layout — AWIAP-inspired dark dashboard with ClickTake brand colors.
 *
 * Layout:
 *  - Fixed 240px left sidebar (grouped nav sections)
 *  - Sticky 56px topbar (page title + breadcrumb + live clock + role switcher + avatar)
 *  - Main content area with 24px padding
 *
 * Brand:
 *  - Pink #FF53A9 primary (replaces AWIAP cyan)
 *  - Blue #136DFF + Purple #9B3DFF secondaries
 *  - Dark backgrounds: #03000D / #070018 / #0D0025 / #1E1640
 *  - Fonts: Syne (head) + JetBrains Mono (data)
 */

const NAV_GROUPS: { label: string; items: { href: string; label: string; icon: any; perm: string; badge?: string; badgeColor?: string; live?: boolean }[] }[] = [
  {
    label: "Core",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, perm: "viewDashboard" },
      { href: "/admin/cms", label: "CMS — Pages", icon: FileText, perm: "readCMS" },
      { href: "/admin/services", label: "Services & Packages", icon: Package, perm: "readCMS" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/team-careers", label: "Team & Careers", icon: Briefcase, perm: "readCMS" },
      { href: "/admin/typography", label: "Typography Engine", icon: Type, perm: "readCMS" },
      { href: "/admin/theme", label: "Theme Engine", icon: Palette, perm: "readCMS" },
    ],
  },
  {
    label: "Leads",
    items: [
      { href: "/admin/crm", label: "Lead CRM", icon: Users, perm: "readLeads", badge: "New" },
      { href: "/admin/email", label: "Email Center", icon: Mail, perm: "readLeads" },
      { href: "/admin/ab-tests", label: "A/B Experiments", icon: FlaskConical, perm: "readCMS", live: true },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/providers", label: "Storage & Email Providers", icon: Server, perm: "manageSettings" },
      { href: "/admin/seo", label: "SEO & Analytics", icon: Globe, perm: "readCMS" },
      { href: "/admin/settings", label: "Config Settings", icon: Settings, perm: "manageSettings" },
    ],
  },
  {
    label: "Security",
    items: [
      { href: "/admin/roles", label: "User Roles (RBAC)", icon: Shield, perm: "manageRBAC" },
      { href: "/admin/security", label: "Security & Logs", icon: ShieldAlert, perm: "manageRBAC", live: true },
    ],
  },
];

// Map route → page title + breadcrumb
function getPageMeta(pathname: string): { title: string; bc: string } {
  if (pathname === "/admin") return { title: "Dashboard", bc: "ClickTake / Dashboard" };
  const parts = pathname.replace("/admin/", "").split("/");
  const titleMap: Record<string, string> = {
    cms: "CMS — Pages",
    services: "Services & Packages",
    "team-careers": "Team & Careers",
    typography: "Typography Engine",
    theme: "Theme Engine",
    crm: "Lead CRM",
    email: "Email Center",
    "ab-tests": "A/B Experiments",
    providers: "Storage & Email Providers",
    seo: "SEO & Analytics",
    settings: "Config Settings",
    roles: "User Roles (RBAC)",
    security: "Security & Logs",
  };
  const key = parts[0];
  const title = titleMap[key] || "Admin";
  return { title, bc: `ClickTake / ${title}` };
}

function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user as any;
  const userPerms: string[] = user?.permissions || [];
  const isSuperAdmin = user?.roleName === "Super Admin" || userPerms.includes("manageRBAC");

  const canSee = (perm: string) => isSuperAdmin || userPerms.includes(perm);

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/create-admin" ||
    pathname === "/admin/forgot-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Signed out");
    router.push("/admin/login");
  };

  const { title, bc } = getPageMeta(pathname);

  return (
    <div className="ct-admin">
      {/* ─── SIDEBAR ─── */}
      <aside className={`ct-admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="ct-admin-brand">
          <div className="ct-admin-brand-row">
            <div className="ct-admin-logo">CT</div>
            <div>
              <div className="ct-admin-name">ClickTake</div>
              <div className="ct-admin-version">v2.0 · Admin</div>
            </div>
          </div>
        </div>

        {NAV_GROUPS.map((group) => {
          const visible = group.items.filter((item) => canSee(item.perm));
          if (visible.length === 0) return null;
          return (
            <div key={group.label} className="ct-admin-nav-section">
              <div className="ct-admin-nav-label">{group.label}</div>
              {visible.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`ct-admin-nav-item ${active ? "active" : ""}`}
                  >
                    <span className="ct-admin-nav-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`ct-admin-nav-badge ${item.badgeColor || ""}`}>{item.badge}</span>
                    )}
                    {item.live && <span className="ct-admin-nav-dot" />}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─── MAIN ─── */}
      <div className="ct-admin-main">
        {/* TOPBAR */}
        <header className="ct-admin-topbar">
          <div className="ct-admin-tb-left">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="ct-admin-btn ct-admin-btn-sm md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div>
              <div className="ct-admin-tb-title">{title}</div>
              <div className="ct-admin-tb-breadcrumb">{bc}</div>
            </div>
          </div>
          <div className="ct-admin-tb-right">
            {/* Live clock */}
            <div className="ct-admin-live-badge">
              <div className="ct-admin-live-dot" />
              <LiveClock />
            </div>
            {/* View site link */}
            <Link
              href="/"
              target="_blank"
              className="ct-admin-btn ct-admin-btn-sm"
              title="Open public site"
            >
              <Globe className="h-3.5 w-3.5" /> Site ↗
            </Link>
            {/* Notifications */}
            <div className="ct-admin-rel">
              <button className="ct-admin-btn ct-admin-btn-sm" aria-label="Notifications">
                <Bell className="h-3.5 w-3.5" />
              </button>
              <span className="ct-admin-notif-dot" />
            </div>
            {/* User avatar + logout */}
            {user && (
              <div className="flex items-center gap-2 pl-2 ml-1 border-l border-white/10">
                <div className="ct-admin-avatar" title={user.name || "Admin"}>
                  {user.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold leading-none text-[var(--cta-text)]">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[var(--cta-muted)] mt-0.5">
                    {user.roleName || "—"}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ct-admin-btn ct-admin-btn-sm"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <main className="ct-admin-content">{children}</main>
      </div>
    </div>
  );
}
