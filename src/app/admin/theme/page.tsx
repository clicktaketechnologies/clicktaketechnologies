import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { ThemeClient } from "./theme-client";
import { NxDesignClient } from "./nx-design-client";
import { ThemeTabs } from "./theme-tabs";

export const dynamic = "force-dynamic";

export default async function ThemePage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/theme");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const themes = await prisma.cmsTheme.findMany({ orderBy: { createdAt: "desc" } });

  const canWrite = hasPermission(session.user, "writeCMS");

  // Both panels are rendered server-side; the client-side ThemeTabs component
  // toggles visibility based on the active tab (default: "nx").
  return (
    <ThemeTabs defaultTab="nx">
      {/* Tab 1: NX Design System (new competitor-inspired design) */}
      <div data-tab="nx">
        <NxDesignClient canWrite={canWrite} />
      </div>

      {/* Tab 2: Legacy themes (old design system, kept for backward compat) */}
      <div data-tab="legacy" className="hidden">
        <ThemeClient
          themes={themes.map((t) => ({
            id: t.id,
            name: t.name,
            mode: t.mode,
            primary: t.primary,
            accent: t.accent,
            background: t.background || "",
            foreground: t.foreground || "",
            muted: t.muted || "",
            border: t.border || "",
            card: t.card || "",
            isActive: t.isActive,
          }))}
          canWrite={canWrite}
        />
      </div>
    </ThemeTabs>
  );
}
