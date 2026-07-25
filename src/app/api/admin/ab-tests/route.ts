// /api/admin/ab-tests — list + create experiments
// ─────────────────────────────────────────────────────────────────────────────
// GET    → list all experiments (with variants + counts)
// POST   → create a new experiment (with variants)
//
// Auth: readCMS for GET, writeCMS for POST.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── GET — list all experiments ──────────────────────────────────────────────
export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "readCMS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const experiments = await prisma.abExperiment.findMany({
      orderBy: { createdAt: "desc" },
      include: { variants: true },
    });

    // Aggregate assignment counts in one query per experiment (could be
    // one combined query with groupBy, but with N<20 experiments this is
    // fine and keeps the code readable).
    const expIds = experiments.map((e: any) => e.id);
    const allAssignments = expIds.length
      ? await prisma.abAssignment.findMany({
          where: { experimentId: { in: expIds } },
          select: {
            experimentId: true,
            variantId: true,
            convertedAt: true,
          },
        })
      : [];

    // Build a lookup: { expId → { variantId → { exposures, conversions } } }
    const countsByExp: Record<string, Record<string, { exposures: number; conversions: number }>> = {};
    for (const a of allAssignments) {
      const exp = (countsByExp[a.experimentId] ||= {});
      const v = (exp[a.variantId] ||= { exposures: 0, conversions: 0 });
      v.exposures += 1;
      if (a.convertedAt) v.conversions += 1;
    }

    const result = experiments.map((e: any) => {
      const counts = countsByExp[e.id] || {};
      return {
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
        updatedAt: e.updatedAt,
        variants: e.variants.map((v: any) => ({
          id: v.id,
          key: v.key,
          label: v.label,
          weight: v.weight,
          isControl: v.isControl,
          payloadJson: v.payloadJson,
          exposures: counts[v.id]?.exposures || 0,
          conversions: counts[v.id]?.conversions || 0,
        })),
      };
    });

    return NextResponse.json({ experiments: result });
  } catch (err) {
    console.error("[admin/ab-tests] GET failed:", err);
    return NextResponse.json({ error: "Failed to fetch experiments" }, { status: 500 });
  }
}

// ─── POST — create experiment + variants ─────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { key, name, hypothesis, pagePattern, primaryMetric, variants } = body || {};

  // ─── Validate ──────────────────────────────────────────────────────────────
  if (!key || typeof key !== "string" || !/^[a-z0-9-]{3,64}$/.test(key)) {
    return NextResponse.json({
      error: "Key must be 3-64 chars, lowercase, digits, and hyphens only",
    }, { status: 400 });
  }
  if (!name || typeof name !== "string" || name.trim().length < 3) {
    return NextResponse.json({ error: "Name required (min 3 chars)" }, { status: 400 });
  }
  if (!Array.isArray(variants) || variants.length < 2) {
    return NextResponse.json({ error: "At least 2 variants required" }, { status: 400 });
  }
  // Must have exactly one control
  const controls = variants.filter((v: any) => v.isControl);
  if (controls.length !== 1) {
    return NextResponse.json({ error: "Exactly one variant must be marked as control" }, { status: 400 });
  }
  // Variant keys must be unique and short (1-10 chars, A-Z or 0-9)
  const keys = variants.map((v: any) => v.key);
  if (new Set(keys).size !== keys.length) {
    return NextResponse.json({ error: "Variant keys must be unique" }, { status: 400 });
  }
  for (const k of keys) {
    if (!/^[A-Z0-9]{1,10}$/.test(k)) {
      return NextResponse.json({
        error: `Variant key "${k}" must be 1-10 uppercase alphanumeric chars`,
      }, { status: 400 });
    }
  }
  // Weights must be non-negative integers
  for (const v of variants) {
    if (typeof v.weight !== "number" || v.weight < 0 || !Number.isInteger(v.weight)) {
      return NextResponse.json({ error: `Variant "${v.key}" weight must be a non-negative integer` }, { status: 400 });
    }
  }
  // At least one weight must be > 0
  if (variants.every((v: any) => v.weight <= 0)) {
    return NextResponse.json({ error: "At least one variant must have weight > 0" }, { status: 400 });
  }

  // ─── Check key uniqueness ──────────────────────────────────────────────────
  const existing = await prisma.abExperiment.findUnique({ where: { key } });
  if (existing) {
    return NextResponse.json({ error: `Experiment key "${key}" already exists` }, { status: 409 });
  }

  // ─── Create ────────────────────────────────────────────────────────────────
  try {
    const experiment = await prisma.abExperiment.create({
      data: {
        key,
        name: name.trim(),
        hypothesis: hypothesis || null,
        pagePattern: pagePattern || "/",
        primaryMetric: primaryMetric || "lead_submit",
        status: "draft",
        variants: {
          create: variants.map((v: any) => ({
            key: v.key,
            label: v.label || null,
            weight: v.weight,
            isControl: !!v.isControl,
            payloadJson: JSON.stringify(v.payload || {}),
          })),
        },
      },
      include: { variants: true },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "ab_test.create",
      entity: "AbExperiment",
      entityId: experiment.id,
      details: { key, name, variantCount: variants.length },
    });

    return NextResponse.json({ experiment }, { status: 201 });
  } catch (err) {
    console.error("[admin/ab-tests] POST failed:", err);
    return NextResponse.json({ error: "Failed to create experiment" }, { status: 500 });
  }
}
