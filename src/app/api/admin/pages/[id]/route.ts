// /api/admin/pages/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...page,
    blocks: JSON.parse(page.blocks || "[]"),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.page.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: any = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.slug !== undefined) {
    if (body.slug !== existing.slug) {
      const conflict = await prisma.page.findUnique({ where: { slug: body.slug } });
      if (conflict) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    data.slug = body.slug;
  }
  if (body.content !== undefined) data.content = body.content;
  if (body.blocks !== undefined) data.blocks = JSON.stringify(body.blocks);
  if (body.isPublished !== undefined) data.isPublished = body.isPublished;
  if (body.metaTitle !== undefined) data.metaTitle = body.metaTitle;
  if (body.metaDescription !== undefined) data.metaDescription = body.metaDescription;
  if (body.canonicalUrl !== undefined) data.canonicalUrl = body.canonicalUrl;
  if (body.ogImageUrl !== undefined) data.ogImageUrl = body.ogImageUrl;

  const updated = await prisma.page.update({ where: { id }, data });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "page.update",
    entity: "Page",
    entityId: id,
    details: { title: updated.title, changes: Object.keys(data) },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.page.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.page.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "page.delete",
    entity: "Page",
    entityId: id,
    details: { title: existing.title, slug: existing.slug },
  });

  return NextResponse.json({ success: true });
}
