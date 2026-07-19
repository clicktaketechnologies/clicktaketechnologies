// /api/admin/pages — CRUD for CMS pages
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      metaTitle: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ pages });
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

  const { title, slug, content, blocks, isPublished, metaTitle, metaDescription, canonicalUrl, ogImageUrl } = body;
  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const page = await prisma.page.create({
    data: {
      title,
      slug,
      content: content || "",
      blocks: blocks ? JSON.stringify(blocks) : "[]",
      isPublished: isPublished || false,
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImageUrl,
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "page.create",
    entity: "Page",
    entityId: page.id,
    details: { title, slug },
  });

  return NextResponse.json({ id: page.id, slug: page.slug });
}
