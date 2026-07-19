// /api/admin/seo — per-page meta + sitemap/robots config
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [metas, sitemap, robots] = await Promise.all([
    prisma.seoPageMeta.findMany({ orderBy: { path: "asc" } }),
    prisma.seoSitemapConfig.findFirst(),
    prisma.seoRobotsConfig.findFirst(),
  ]);

  return NextResponse.json({
    metas: metas.map((m) => ({ ...m, keywords: JSON.parse(m.keywords || "[]") })),
    sitemap,
    robots,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { action } = body;

  if (action === "upsert_meta") {
    const { path, title, description, canonicalUrl, ogImageUrl, ogTitle, ogDescription, twitterCard, keywords, noindex } = body;
    if (!path) return NextResponse.json({ error: "Path required" }, { status: 400 });

    const existing = await prisma.seoPageMeta.findUnique({ where: { path } });
    const data = {
      title, description, canonicalUrl, ogImageUrl, ogTitle, ogDescription,
      twitterCard: twitterCard || "summary_large_image",
      keywords: JSON.stringify(keywords || []),
      noindex: noindex || false,
    };
    let meta;
    if (existing) {
      meta = await prisma.seoPageMeta.update({ where: { path }, data });
    } else {
      meta = await prisma.seoPageMeta.create({ data: { path, ...data } });
    }
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "seo.update", entity: "SeoPageMeta", entityId: meta.id, details: { path } });
    return NextResponse.json({ id: meta.id });
  }

  if (action === "delete_meta") {
    const { path } = body;
    await prisma.seoPageMeta.deleteMany({ where: { path } });
    return NextResponse.json({ success: true });
  }

  if (action === "update_sitemap") {
    const { baseUrl, includePages, includeServices, includeBlogs, includePortfolio, changefreq, priority } = body;
    const existing = await prisma.seoSitemapConfig.findFirst();
    const data = { baseUrl, includePages, includeServices, includeBlogs, includePortfolio, changefreq, priority };
    if (existing) {
      await prisma.seoSitemapConfig.update({ where: { id: existing.id }, data });
    } else {
      await prisma.seoSitemapConfig.create({ data });
    }
    return NextResponse.json({ success: true });
  }

  if (action === "update_robots") {
    const { userAgent, allowAll, disallowPaths, sitemapUrl, crawlDelay } = body;
    const existing = await prisma.seoRobotsConfig.findFirst();
    const data = { userAgent, allowAll, disallowPaths, sitemapUrl, crawlDelay };
    if (existing) {
      await prisma.seoRobotsConfig.update({ where: { id: existing.id }, data });
    } else {
      await prisma.seoRobotsConfig.create({ data });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
