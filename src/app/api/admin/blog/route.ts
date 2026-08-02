// /api/admin/blog — CRUD for CMS blog posts (CmsBlog model)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ensureCmsBlogsTable } from "@/lib/ensure-blog-table";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "readCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();

  const posts = await prisma.cmsBlog.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      isPublished: true,
      publishedAt: true,
      coverImage: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    posts: posts.map((p) => ({
      ...p,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      updatedAt: p.updatedAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category,
    tags,
    author,
    isPublished,
    publishedAt,
  } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const existing = await prisma.cmsBlog.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const post = await prisma.cmsBlog.create({
    data: {
      title,
      slug,
      excerpt: excerpt || "",
      content: content || "",
      coverImage: coverImage || null,
      category: category || "General",
      tags: Array.isArray(tags) ? JSON.stringify(tags) : typeof tags === "string" ? tags : "[]",
      authorId: author || null,
      isPublished: isPublished || false,
      publishedAt: isPublished ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "blog.create",
    entity: "CmsBlog",
    entityId: post.id,
    details: { title, slug, source: body.source || "manual" },
  });

  return NextResponse.json({ id: post.id, slug: post.slug });
}
