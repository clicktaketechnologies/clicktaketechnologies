import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { ThemeClient } from "./theme-client";

export const dynamic = "force-dynamic";

export default async function ThemePage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/theme");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const themes = await prisma.cmsTheme.findMany({ orderBy: { createdAt: "desc" } });

  return (
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
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
