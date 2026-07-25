import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { AbTestsClient } from "./ab-tests-client";

export const dynamic = "force-dynamic";

export default async function AbTestsPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/ab-tests");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  // Fetch initial experiments list (the client will refetch on actions)
  const experiments = await prisma.abExperiment.findMany({
    orderBy: { createdAt: "desc" },
    include: { variants: { orderBy: { key: "asc" } } },
  });

  // Aggregate assignment counts per variant for the list view
  const expIds = experiments.map((e: any) => e.id);
  const assignments = expIds.length
    ? await prisma.abAssignment.findMany({
        where: { experimentId: { in: expIds } },
        select: { experimentId: true, variantId: true, convertedAt: true },
      })
    : [];

  const counts: Record<string, Record<string, { exposures: number; conversions: number }>> = {};
  for (const a of assignments) {
    const exp = (counts[a.experimentId] ||= {});
    const v = (exp[a.variantId] ||= { exposures: 0, conversions: 0 });
    v.exposures += 1;
    if (a.convertedAt) v.conversions += 1;
  }

  const initialExperiments = experiments.map((e: any) => ({
    id: e.id,
    key: e.key,
    name: e.name,
    hypothesis: e.hypothesis,
    pagePattern: e.pagePattern,
    status: e.status,
    primaryMetric: e.primaryMetric,
    startDate: e.startDate,
    endDate: e.endDate,
    createdAt: e.createdAt,
    variants: e.variants.map((v: any) => ({
      id: v.id,
      key: v.key,
      label: v.label,
      weight: v.weight,
      isControl: v.isControl,
      exposures: counts[e.id]?.[v.id]?.exposures || 0,
      conversions: counts[e.id]?.[v.id]?.conversions || 0,
    })),
  }));

  return (
    <AbTestsClient
      initialExperiments={initialExperiments}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
