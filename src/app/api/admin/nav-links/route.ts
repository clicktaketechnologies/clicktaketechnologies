// /api/admin/nav-links
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const links = await prisma.cmsNavLink.findMany({ orderBy: { displayOrder: "asc" } });
  return NextResponse.json({ links });
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

  const { label, href, isPage, mega, displayOrder, isActive } = body;
  if (!label || !href) return NextResponse.json({ error: "Label and href required" }, { status: 400 });

  const link = await prisma.cmsNavLink.create({
    data: {
      label,
      href,
      isPage: isPage || false,
      mega: mega || false,
      displayOrder: displayOrder || 0,
      isActive: isActive !== false,
    },
  });

  return NextResponse.json({ id: link.id });
}
