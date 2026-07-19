// /api/admin/typography
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

const ELEMENTS = [
  "heading_h1", "heading_h2", "heading_h3",
  "body", "nav", "button", "quote", "code", "pricing_number",
];

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [typography, presets] = await Promise.all([
    prisma.cmsTypography.findMany(),
    prisma.cmsFontPreset.findMany({ orderBy: { name: "asc" } }),
  ]);
  return NextResponse.json({
    typography,
    presets,
    elements: ELEMENTS,
  });
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
    element, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing,
    fontSource, fontFileUrl, fontFileFormat,
  } = body;

  if (!element || !fontFamily) {
    return NextResponse.json({ error: "Element and fontFamily required" }, { status: 400 });
  }

  const existing = await prisma.cmsTypography.findUnique({ where: { element } });
  let t;
  if (existing) {
    t = await prisma.cmsTypography.update({
      where: { element },
      data: { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, fontSource, fontFileUrl, fontFileFormat },
    });
  } else {
    t = await prisma.cmsTypography.create({
      data: { element, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, fontSource, fontFileUrl, fontFileFormat },
    });
  }

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "typography.update",
    entity: "CmsTypography",
    entityId: t.id,
    details: { element, fontFamily },
  });

  return NextResponse.json({ id: t.id });
}
