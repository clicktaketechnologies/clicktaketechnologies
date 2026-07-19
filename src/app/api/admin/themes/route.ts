// /api/admin/themes
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [themes, presets] = await Promise.all([
    prisma.cmsTheme.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.cmsThemePreset.findMany({ orderBy: { name: "asc" } }),
  ]);
  return NextResponse.json({ themes, presets });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, mode, primary, accent, background, foreground, muted, border, card, config, isActive } = body;
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  // If activating, deactivate all others
  if (isActive) {
    await prisma.cmsTheme.updateMany({ data: { isActive: false } });
  }

  const theme = await prisma.cmsTheme.create({
    data: {
      name,
      mode: mode || "dark",
      primary: primary || "#136DFF",
      accent: accent || "#FF53A9",
      background,
      foreground,
      muted,
      border,
      card,
      config: config ? JSON.stringify(config) : "{}",
      isActive: isActive || false,
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "theme.update",
    entity: "CmsTheme",
    entityId: theme.id,
    details: { name },
  });

  return NextResponse.json({ id: theme.id });
}
