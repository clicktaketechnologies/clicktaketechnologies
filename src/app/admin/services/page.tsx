import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { ServicesClient } from "./services-client";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/services");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const services = await prisma.service.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <ServicesClient
      services={services.map((s) => ({
        id: s.id,
        slug: s.slug,
        category: s.category,
        title: s.title,
        description: s.description,
        iconName: s.iconName,
        isPublished: s.isPublished,
        displayOrder: s.displayOrder,
        updatedAt: s.updatedAt.toISOString(),
      }))}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
