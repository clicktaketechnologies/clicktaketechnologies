// /api/admin/backgrounds — section background config
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bgs = await prisma.cmsBackground.findMany({ orderBy: { section: "asc" } });
  return NextResponse.json({ backgrounds: bgs });
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

  const {
    section,
    bgType,
    gradient,
    imageUrl,
    videoDesktop,
    videoTablet,
    videoMobile,
    overlayColor,
    overlayOpacity,
    overlayBlendMode,
    isActive,
  } = body;

  if (!section) return NextResponse.json({ error: "Section is required" }, { status: 400 });

  const existing = await prisma.cmsBackground.findUnique({ where: { section } });
  let bg;
  if (existing) {
    bg = await prisma.cmsBackground.update({
      where: { section },
      data: {
        bgType, gradient, imageUrl, videoDesktop, videoTablet, videoMobile,
        overlayColor, overlayOpacity, overlayBlendMode, isActive,
      },
    });
  } else {
    bg = await prisma.cmsBackground.create({
      data: {
        section, bgType, gradient, imageUrl, videoDesktop, videoTablet, videoMobile,
        overlayColor, overlayOpacity, overlayBlendMode, isActive,
      },
    });
  }

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "settings.update",
    entity: "CmsBackground",
    entityId: bg.id,
    details: { section },
  });

  return NextResponse.json({ id: bg.id });
}
