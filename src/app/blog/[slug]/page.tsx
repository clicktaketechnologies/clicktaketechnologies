import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/site/pages/blog-post-page";
import { JsonLd, buildBreadcrumbJsonLd, buildArticleJsonLd } from "@/components/site/json-ld";
import { BLOG_POSTS } from "@/lib/site-data";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };

  const title = `${post.title} | ClickTake Blog`;
  const description = post.excerpt;
  const url = `https://clicktaketech.com/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
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
  const post = BLOG_POSTS.find((p) => p.slug === slug);
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
