import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { CmsClient } from "./cms-client";

export const dynamic = "force-dynamic";

export default async function CmsPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/cms");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

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

  return (
    <CmsClient
      pages={pages.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        isPublished: p.isPublished,
        metaTitle: p.metaTitle,
        updatedAt: p.updatedAt.toISOString(),
        createdAt: p.createdAt.toISOString(),
      }))}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
