// /api/admin/ab-tests/[id] — single experiment CRUD
// ─────────────────────────────────────────────────────────────────────────────
// GET    → fetch one experiment (with variants)
// PUT    → update experiment fields + variant weights/labels + status changes
// DELETE → delete experiment (cascade-deletes variants + assignments)
//
// Auth: readCMS for GET, writeCMS for PUT/DELETE.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// ─── GET ─────────────────────────────────────────────────────────────────────
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
    return NextResponse.json({ experiment });
  } catch (err) {
    console.error("[admin/ab-tests/[id]] GET failed:", err);
    return NextResponse.json({ error: "Failed to fetch experiment" }, { status: 500 });
  }
}

// ─── PUT ─────────────────────────────────────────────────────────────────────
// Supports two modes via the `action` field:
//   action: "update"  → update name/hypothesis/pagePattern/primaryMetric + variants
//   action: "status"  → change status (draft → running → paused → completed)
//
// We split status changes into their own action because they have stricter
// rules (e.g. can't go from completed back to running without resetting
// assignments — we block that transition entirely).
export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Verify experiment exists
  const existing = await prisma.abExperiment.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const action = body.action || "update";

  // ─── Status change ──────────────────────────────────────────────────────
  if (action === "status") {
    const newStatus = body.status;
    const allowedStatuses = ["draft", "running", "paused", "completed"];
    if (!allowedStatuses.includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    // Block transition: completed → running (would corrupt historical data)
    if (existing.status === "completed" && newStatus === "running") {
      return NextResponse.json({
        error: "Cannot restart a completed experiment — create a new one instead",
      }, { status: 400 });
    }
    // When transitioning draft → running, set startDate if not already
    const patch: any = { status: newStatus, updatedAt: new Date() };
    if (newStatus === "running" && !existing.startDate) {
      patch.startDate = new Date();
    }
    if (newStatus === "completed" && !existing.endDate) {
      patch.endDate = new Date();
    }

    const updated = await prisma.abExperiment.update({
      where: { id },
      data: patch,
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "ab_test.status_change",
      entity: "AbExperiment",
      entityId: id,
      details: { from: existing.status, to: newStatus },
    });

    return NextResponse.json({ experiment: updated });
  }

  // ─── Update fields + variants ───────────────────────────────────────────
  if (action === "update") {
    const { name, hypothesis, pagePattern, primaryMetric, variants } = body;

    // Block edits to a running/completed experiment's variants — once a test
    // is live, changing weights mid-flight would invalidate the statistical
    // validity (the control group's exposure count is contaminated).
    // The admin can edit fields like name/hypothesis freely.
    const isLive = existing.status === "running" || existing.status === "completed";

    const expPatch: any = { updatedAt: new Date() };
    if (typeof name === "string" && name.trim().length >= 3) expPatch.name = name.trim();
    if (hypothesis !== undefined) expPatch.hypothesis = hypothesis || null;
    if (typeof pagePattern === "string") expPatch.pagePattern = pagePattern;
    if (typeof primaryMetric === "string") expPatch.primaryMetric = primaryMetric;

    if (isLive && Array.isArray(variants) && variants.length > 0) {
      return NextResponse.json({
        error: "Cannot edit variants of a running or completed experiment. Pause it first to make variant changes.",
      }, { status: 400 });
    }

    // Update variants one-by-one (only when not live)
    if (!isLive && Array.isArray(variants)) {
      for (const v of variants) {
        if (!v.id) continue;
        await prisma.abVariant.update({
          where: { id: v.id },
          data: {
            label: v.label ?? null,
            weight: typeof v.weight === "number" ? v.weight : undefined,
            payloadJson: v.payload ? JSON.stringify(v.payload) : undefined,
          },
        });
      }
    }

    const updated = await prisma.abExperiment.update({
      where: { id },
      data: expPatch,
      include: { variants: { orderBy: { key: "asc" } } },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "ab_test.update",
      entity: "AbExperiment",
      entityId: id,
      details: { name: expPatch.name, hypothesisUpdated: hypothesis !== undefined },
    });

    return NextResponse.json({ experiment: updated });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

// ─── DELETE ──────────────────────────────────────────────────────────────────
// Cascade-deletes variants and assignments via the schema's onDelete: cascade.
// We deliberately allow deletion of experiments with assignments — the admin
// might want to clean up a misconfigured test. Audit log retains the record.
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;

  try {
    // Snapshot for audit log
    const exp = await prisma.abExperiment.findUnique({
      where: { id },
      select: { key: true, name: true, status: true },
    });
    if (!exp) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Drizzle cascade: deleting the experiment cascade-deletes variants + assignments.
    // We need to delete children explicitly because the prisma shim may not
    // honor ON DELETE CASCADE reliably across all DB configurations.
    await prisma.abAssignment.deleteMany({ where: { experimentId: id } });
    await prisma.abVariant.deleteMany({ where: { experimentId: id } });
    await prisma.abExperiment.delete({ where: { id } });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "ab_test.delete",
      entity: "AbExperiment",
      entityId: id,
      details: { key: exp.key, name: exp.name, status: exp.status },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/ab-tests/[id]] DELETE failed:", err);
    return NextResponse.json({ error: "Failed to delete experiment" }, { status: 500 });
  }
}
