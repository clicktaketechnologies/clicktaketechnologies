// /api/admin/ab-tests/[id]/results — aggregated stats + significance
// ─────────────────────────────────────────────────────────────────────────────
// Returns per-variant: exposures, conversions, conversion rate, lift vs
// control, Z-score, p-value, 95% CI, significance classification.
//
// Also returns experiment-level summary: total exposures, days running,
// recommended action (keep / kill / inconclusive), and time-series buckets
// for the chart (daily exposures + conversions per variant).
//
// Auth: readCMS.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import {
  compareVariants,
  formatLiftPercent,
  formatPValue,
  formatRate,
  type VariantStats,
} from "@/lib/ab-testing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "readCMS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;

  try {
    const experiment = await prisma.abExperiment.findUnique({
      where: { id },
      include: { variants: { orderBy: { key: "asc" } } },
    });
    if (!experiment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // ─── Aggregate assignments per variant ─────────────────────────────────
    const assignments = await prisma.abAssignment.findMany({
      where: { experimentId: id },
      select: {
        variantId: true,
        exposedAt: true,
        convertedAt: true,
        conversionEvent: true,
      },
    });

    // Build per-variant aggregate
    const byVariant: Record<string, { exposures: number; conversions: number }> = {};
    for (const v of experiment.variants) {
      byVariant[v.id] = { exposures: 0, conversions: 0 };
    }
    // Also bucket by day for the time-series chart
    // Key: `${variantId}::${YYYY-MM-DD}` → { exposures, conversions }
    const byDay: Record<string, { exposures: number; conversions: number }> = {};

    for (const a of assignments) {
      const agg = byVariant[a.variantId];
      if (!agg) continue; // variant was deleted somehow — skip
      agg.exposures += 1;
      if (a.convertedAt) agg.conversions += 1;

      // Day bucket (UTC — keep consistent regardless of admin's tz)
      const day = new Date(a.exposedAt).toISOString().slice(0, 10);
      const dayKey = `${a.variantId}::${day}`;
      const dayAgg = (byDay[dayKey] ||= { exposures: 0, conversions: 0 });
      dayAgg.exposures += 1;
      if (a.convertedAt) dayAgg.conversions += 1;
    }

    // ─── Build VariantStats[] for the stats engine ────────────────────────
    const variantStats: VariantStats[] = experiment.variants.map((v: any) => {
      const agg = byVariant[v.id] || { exposures: 0, conversions: 0 };
      return {
        variantKey: v.key,
        exposures: agg.exposures,
        conversions: agg.conversions,
        conversionRate: agg.exposures > 0 ? agg.conversions / agg.exposures : 0,
        isControl: !!v.isControl,
      };
    });

    const comparisons = compareVariants(variantStats);

    // ─── Experiment-level summary ──────────────────────────────────────────
    const totalExposures = variantStats.reduce((s, v) => s + v.exposures, 0);
    const totalConversions = variantStats.reduce((s, v) => s + v.conversions, 0);
    const startDate = experiment.startDate;
    const daysRunning = startDate
      ? Math.max(1, Math.ceil((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

    // Recommendation logic
    let recommendation: string;
    let recommendationTone: "info" | "positive" | "negative" | "warning";
    const significantWinner = comparisons.find((c) => c.classification === "winner");
    const significantLoser = comparisons.find((c) => c.classification === "loser");
    const hasEnoughData = variantStats.every((v) => v.exposures >= 30);

    if (!hasEnoughData) {
      recommendation = `Need more data — at least 30 exposures per variant. Currently: ${variantStats.map((v) => `${v.variantKey}=${v.exposures}`).join(", ")}.`;
      recommendationTone = "info";
    } else if (significantWinner) {
      recommendation = `Significant winner found: variant ${significantWinner.variantKey} (${formatLiftPercent(significantWinner.liftPercent)} lift, ${formatPValue(significantWinner.pValue)}). Promote it as the new control.`;
      recommendationTone = "positive";
    } else if (significantLoser) {
      recommendation = `Variant ${significantLoser.variantKey} is significantly worse (${formatLiftPercent(significantLoser.liftPercent)} lift). Kill it and try a new hypothesis.`;
      recommendationTone = "negative";
    } else {
      recommendation = `Inconclusive so far (${formatPValue(comparisons.find((c) => c.classification === "inconclusive")?.pValue ?? null)}). Either keep running to gather more data, or pause and try a more differentiated variant.`;
      recommendationTone = "warning";
    }

    // ─── Time-series buckets (for chart) ───────────────────────────────────
    // Output: { days: string[], series: { variantKey, exposures: number[], conversions: number[] }[] }
    const allDays = Array.from(
      new Set(Object.keys(byDay).map((k) => k.split("::")[1])),
    ).sort();
    const series = experiment.variants.map((v: any) => {
      const exposures = allDays.map((d) => byDay[`${v.id}::${d}`]?.exposures || 0);
      const conversions = allDays.map((d) => byDay[`${v.id}::${d}`]?.conversions || 0);
      return {
        variantKey: v.key,
        isControl: !!v.isControl,
        exposures,
        conversions,
      };
    });

    // ─── Per-variant display rows ──────────────────────────────────────────
    const variantRows = experiment.variants.map((v: any) => {
      const stats = variantStats.find((s) => s.variantKey === v.key)!;
      const comp = comparisons.find((c) => c.variantKey === v.key)!;
      return {
        id: v.id,
        key: v.key,
        label: v.label,
        isControl: !!v.isControl,
        weight: v.weight,
        payloadJson: v.payloadJson,
        exposures: stats.exposures,
        conversions: stats.conversions,
        conversionRate: stats.conversionRate,
        conversionRateFormatted: formatRate(stats.conversionRate),
        liftAbsolute: comp.liftAbsolute,
        liftPercent: comp.liftPercent,
        liftPercentFormatted: formatLiftPercent(comp.liftPercent),
        zScore: comp.zScore,
        pValue: comp.pValue,
        pValueFormatted: formatPValue(comp.pValue),
        confidenceInterval: comp.confidenceInterval,
        significant: comp.significant,
        classification: comp.classification,
      };
    });

    return NextResponse.json({
      experiment: {
        id: experiment.id,
        key: experiment.key,
        name: experiment.name,
        hypothesis: experiment.hypothesis,
        status: experiment.status,
        primaryMetric: experiment.primaryMetric,
        startDate: experiment.startDate,
        endDate: experiment.endDate,
        createdAt: experiment.createdAt,
      },
      summary: {
        totalExposures,
        totalConversions,
        overallConversionRate: totalExposures > 0 ? totalConversions / totalExposures : 0,
        overallConversionRateFormatted: formatRate(
          totalExposures > 0 ? totalConversions / totalExposures : 0,
        ),
        daysRunning,
        recommendation,
        recommendationTone,
      },
      variants: variantRows,
      timeseries: {
        days: allDays,
        series,
      },
    });
  } catch (err) {
    console.error("[admin/ab-tests/[id]/results] GET failed:", err);
    return NextResponse.json({ error: "Failed to compute results" }, { status: 500 });
  }
}
