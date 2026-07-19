"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/site/theme-toggle";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, perm: "viewDashboard" },
  { href: "/admin/cms", label: "CMS — Pages", icon: FileText, perm: "readCMS" },
  { href: "/admin/services", label: "Services & Packages", icon: Package, perm: "readCMS" },
  { href: "/admin/team-careers", label: "Team & Careers", icon: Briefcase, perm: "readCMS" },
  { href: "/admin/typography", label: "Typography Engine", icon: Type, perm: "readCMS" },
  { href: "/admin/theme", label: "Theme Engine", icon: Palette, perm: "readCMS" },
  { href: "/admin/crm", label: "Lead CRM", icon: Users, perm: "readLeads" },
  { href: "/admin/roles", label: "User Roles (RBAC)", icon: Shield, perm: "manageRBAC" },
  { href: "/admin/email", label: "Email Center", icon: Mail, perm: "readLeads" },
  { href: "/admin/providers", label: "Storage & Email Providers", icon: Server, perm: "manageSettings" },
  { href: "/admin/seo", label: "SEO & Analytics", icon: Globe, perm: "readCMS" },
  { href: "/admin/settings", label: "Config Settings", icon: Settings, perm: "manageSettings" },
  { href: "/admin/security", label: "Security & Logs", icon: ShieldAlert, perm: "manageRBAC" },
] as const;

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md p-2 hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-pink text-white shadow-lg shadow-brand-blue/30">
            <Sparkles className="size-4" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-none">ClickTake Admin</div>
            <div className="text-[10px] text-muted-foreground">Control Center</div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden rounded-md border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:block"
          >
            View site ↗
          </Link>
          <button className="rounded-md p-2 hover:bg-muted" aria-label="Notifications">
            <Bell className="size-4" />
          </button>
          <ThemeToggle />
          {user && (
            <div className="flex items-center gap-2 border-l border-border/60 pl-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-semibold text-brand-blue">
                {user.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium leading-none">{user.name}</div>
                <div className="text-[10px] text-muted-foreground">{user.roleName || "—"}</div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-md p-2 hover:bg-muted"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 top-16 z-30 w-64 transform border-r border-border/60 bg-background/95 transition-transform duration-200 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
            {NAV_ITEMS.filter((item) => canSee(item.perm)).map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-gradient-to-r from-brand-blue/15 to-brand-pink/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className={`size-4 ${active ? "text-brand-blue" : ""}`} />
                  <span>{item.label}</span>
                  {active && <span className="ml-auto size-1.5 rounded-full bg-brand-pink" />}
                </Link>
              );
            })}
          </nav>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 top-16 z-20 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
