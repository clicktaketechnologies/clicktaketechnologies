// /api/admin/blog/[id] — GET / PATCH / DELETE for a single blog post
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ensureCmsBlogsTable } from "@/lib/ensure-blog-table";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "readCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();
  const { id } = await params;
  const post = await prisma.cmsBlog.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let tags: string[] = [];
  try {
    tags = JSON.parse(post.tags || "[]");
  } catch {
    tags = [];
  }

  return NextResponse.json({
    ...post,
    tags,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
    createdAt: post.createdAt.toISOString(),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();
  const { id } = await params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.cmsBlog.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: any = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.slug !== undefined) {
    if (body.slug !== existing.slug) {
      const conflict = await prisma.cmsBlog.findUnique({ where: { slug: body.slug } });
      if (conflict) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    data.slug = body.slug;
  }
  if (body.excerpt !== undefined) data.excerpt = body.excerpt;
  if (body.content !== undefined) data.content = body.content;
  if (body.coverImage !== undefined) data.coverImage = body.coverImage;
  if (body.category !== undefined) data.category = body.category;
  if (body.tags !== undefined) {
    data.tags = Array.isArray(body.tags)
      ? JSON.stringify(body.tags)
      : typeof body.tags === "string"
        ? body.tags
        : "[]";
  }
  if (body.author !== undefined) data.authorId = body.author;
  if (body.isPublished !== undefined) {
    data.isPublished = body.isPublished;
    if (body.isPublished && !existing.publishedAt) {
      data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : new Date();
    } else if (!body.isPublished) {
      // keep publishedAt — once published, we preserve the original date
    } else if (body.publishedAt) {
      data.publishedAt = new Date(body.publishedAt);
    }
  } else if (body.publishedAt !== undefined) {
    data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
  }

  const updated = await prisma.cmsBlog.update({ where: { id }, data });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "blog.update",
    entity: "CmsBlog",
    entityId: id,
    details: { title: updated.title, slug: updated.slug, changes: Object.keys(data) },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();
  const { id } = await params;
  const existing = await prisma.cmsBlog.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.cmsBlog.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "blog.delete",
    entity: "CmsBlog",
    entityId: id,
    details: { title: existing.title, slug: existing.slug },
  });

  return NextResponse.json({ success: true });
}
