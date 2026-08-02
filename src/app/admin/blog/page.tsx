import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { BlogClient } from "./blog-client";
import { BLOG_CATEGORIES } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/blog");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

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
      updatedAt: true,
      createdAt: true,
    },
  });

  return (
    <BlogClient
      posts={posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        category: p.category,
        isPublished: p.isPublished,
        publishedAt: p.publishedAt?.toISOString() ?? null,
        updatedAt: p.updatedAt.toISOString(),
        createdAt: p.createdAt.toISOString(),
      }))}
      categories={[...BLOG_CATEGORIES, "General"]}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
