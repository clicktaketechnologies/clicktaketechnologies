import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/site/pages/blog-post-page";
import { JsonLd, buildBreadcrumbJsonLd, buildArticleJsonLd } from "@/components/site/json-ld";
import { BLOG_POSTS, type BlogPost } from "@/lib/site-data";
import { prisma } from "@/lib/db";
import { ensureCmsBlogsTable } from "@/lib/ensure-blog-table";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
export const revalidate = 300; // 5-min ISR — picks up DB edits

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  // Include both static BLOG_POSTS slugs + any DB-published slugs at build time.
  let dbSlugs: { slug: string }[] = [];
  try {
    await ensureCmsBlogsTable();
    dbSlugs = await prisma.cmsBlog.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
  } catch {
    // ignore — static fallback still works
  }
  const staticSlugs = BLOG_POSTS.map((p) => ({ slug: p.slug }));
  const seen = new Set<string>();
  const all = [...staticSlugs, ...dbSlugs].filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
  return all;
}

async function resolvePost(slug: string): Promise<BlogPost | null> {
  // DB first (admin can override static content with same slug)
  try {
    await ensureCmsBlogsTable();
    const row = await prisma.cmsBlog.findFirst({
      where: { slug, isPublished: true },
    });
    if (row) {
      let tags: string[] = [];
      try {
        tags = JSON.parse(row.tags || "[]");
      } catch {
        tags = [];
      }
      return {
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt || "",
        category: (row.category || "General") as BlogPost["category"],
        author: row.authorId || "ClickTake Team",
        publishedAt: (row.publishedAt || row.createdAt).toISOString(),
        readTime: `${Math.max(2, Math.round((row.content || "").length / 1200))} min read`,
        tags,
        body: row.content || "",
      };
    }
  } catch {
    // ignore — fall back to static
  }
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return { title: "Article not found" };

  const title = `${post.title} | ClickTake Blog`;
  const description = post.excerpt;
  const url = `https://clicktaketech.com/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],title,
      description: post.excerpt,
      url,
      type: "article",
      locale: "en_GB",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    keywords: [post.title, post.category, ...post.tags],
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const article = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: post.author,
    publishedAt: post.publishedAt,
    category: post.category,
    tags: post.tags,
  });

  return (
    <>
      <JsonLd data={[breadcrumb, article]} />
      <BlogPostPage post={post} />
    </>
  );
}
