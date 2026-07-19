import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { SeoClient } from "./seo-client";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/seo");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const [metas, sitemap, robots] = await Promise.all([
    prisma.seoPageMeta.findMany({ orderBy: { path: "asc" } }),
    prisma.seoSitemapConfig.findFirst(),
    prisma.seoRobotsConfig.findFirst(),
  ]);

  return (
    <SeoClient
      metas={metas.map((m) => ({
        id: m.id,
        path: m.path,
        title: m.title,
        description: m.description,
        canonicalUrl: m.canonicalUrl,
        ogImageUrl: m.ogImageUrl,
        keywords: JSON.parse(m.keywords || "[]"),
        noindex: m.noindex,
      }))}
      sitemap={sitemap ? {
        baseUrl: sitemap.baseUrl,
        includePages: sitemap.includePages,
        includeServices: sitemap.includeServices,
        includeBlogs: sitemap.includeBlogs,
        includePortfolio: sitemap.includePortfolio,
        changefreq: sitemap.changefreq,
        priority: sitemap.priority,
      } : null}
      robots={robots ? {
        userAgent: robots.userAgent,
        allowAll: robots.allowAll,
        disallowPaths: robots.disallowPaths,
        sitemapUrl: robots.sitemapUrl,
        crawlDelay: robots.crawlDelay,
      } : null}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
