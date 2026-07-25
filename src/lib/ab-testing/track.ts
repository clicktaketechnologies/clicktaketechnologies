// ─────────────────────────────────────────────────────────────────────────────
// Server-side exposure + conversion tracking for A/B tests.
//
// Two public functions:
//
//   recordExposure({ experimentId, variantId, visitorId, path })
//     Called when an <AbTest> component renders on the client. Inserts a
//     row into ab_assignments if none exists for this (visitor, experiment)
//     pair. Repeated calls are no-ops (idempotent via the unique index).
//     Fire-and-forget — the user does not wait for this to complete.
//
//   recordConversion({ visitorId, event, valueCents? })
//     Called from /api/contact (or any other conversion endpoint) after a
//     lead is persisted. Updates the convertedAt / conversionEvent /
//     conversionValueCents columns on every assignment row that matches
//     the visitor and has NOT already converted. The "not already converted"
//     guard is important: a visitor might be in multiple experiments, and
//     we want to attribute the conversion to ALL of them (one conversion
//     can credit multiple experiments), but only ONCE per experiment.
//
// Both functions swallow errors. A/B tracking is best-effort — if the DB
// is down or the schema isn't migrated yet, the marketing site must still
// function. Errors are logged to console.error so we can debug.
//
// All queries go through the prisma shim (src/lib/db.ts) which translates
// to Drizzle under the hood. The shim supports the subset of Prisma's API
// we use here: findFirst, upsert, updateMany.
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/db";

export type ExposureInput = {
  experimentId: string;
  variantId: string;
  visitorId: string;
  path?: string;
};

export type ConversionInput = {
  visitorId: string;
  event: string; // 'lead_submit' | 'consultation_booked' | 'signup'
  valueCents?: number;
};

/**
 * Record an exposure (visitor saw a variant of an experiment).
 *
 * Idempotent: if an assignment row already exists for this
 * (visitorId, experimentId) pair, no-op. Otherwise insert.
 *
 * We do NOT use prisma.abAssignment.upsert() because the prisma shim
 * (src/lib/db.ts) does not support Prisma's compound-unique-key
 * `where: { visitor_id_experiment_id: { ... } }` syntax. Instead we
 * do an explicit findFirst + create, which is functionally equivalent
 * (the unique index on (visitor_id, experiment_id) is the safety net
 * in case of a race — a duplicate-key error from the DB will be caught
 * and silently swallowed below).
 *
 * Does NOT throw — logs and returns. The client gets a 200 either way
 * (the exposure was either recorded or already existed).
 */
export async function recordExposure(input: ExposureInput): Promise<void> {
  try {
    // Look up existing assignment for this (visitor, experiment) pair.
    // Note: prisma-shim maps visitorId → visitor_id column via the
    // camelCase → snake_case conversion in the model's column defs.
    const existing = await prisma.abAssignment.findFirst({
      where: {
        visitorId: input.visitorId,
        experimentId: input.experimentId,
      },
      select: { id: true },
    });
    if (existing) {
      // Already exposed — first exposure "sticks". We do NOT update
      // exposedAt or variantId (the variant is deterministic anyway).
      return;
    }

    await prisma.abAssignment.create({
      data: {
        experimentId: input.experimentId,
        variantId: input.variantId,
        visitorId: input.visitorId,
        path: input.path || null,
        exposedAt: new Date(),
      },
    });
  } catch (err) {
    // Most likely cause: unique-index violation from a concurrent insert.
    // That's fine — the row exists, exposure is recorded.
    console.error("[ab-testing] recordExposure failed:", err);
  }
}

/**
 * Record a conversion event for a visitor. Credits ALL active experiments
 * the visitor was exposed to (and hasn't already converted on).
 *
 * Called from /api/contact/route.ts after a lead is successfully saved.
 *
 * Returns the number of assignment rows updated (useful for logging).
 */
export async function recordConversion(input: ConversionInput): Promise<number> {
  try {
    // Update all unconverted assignments for this visitor. We deliberately
    // do NOT filter by conversionEvent=null because:
    //   - A visitor could convert on event 'lead_submit' first, then later
    //     on 'consultation_booked'. We want the latest conversion to win.
    //   - The conversionEvent column stores the LAST event type.
    // However we DO filter out already-converted rows — we don't want a
    // duplicate form submission to overwrite the original conversion.
    const result = await prisma.abAssignment.updateMany({
      where: {
        visitorId: input.visitorId,
        convertedAt: null,
      },
      data: {
        convertedAt: new Date(),
        conversionEvent: input.event,
        conversionValueCents: input.valueCents || 0,
      },
    });
    return result?.count || 0;
  } catch (err) {
    console.error("[ab-testing] recordConversion failed:", err);
    return 0;
  }
}

/**
 * Fetch all RUNNING experiments with their variants. Used by:
 *   - The <AbTest> client component's bootstrap endpoint to know which
 *     experiments are live and what the variants look like.
 *   - The /api/contact route to know whether a conversion needs to be
 *     attributed (we only credit experiments that were running at the
 *     time of conversion — paused/draft experiments are skipped).
 *
 * Returns experiments where status='running' (and optionally, the date
 * window is current — but for simplicity we rely on the admin to set
 * status='paused' when they want to stop the test).
 */
export async function getRunningExperiments() {
  try {
    const experiments = await prisma.abExperiment.findMany({
      where: { status: "running" },
      include: { variants: true },
    });
    return experiments;
  } catch (err) {
    console.error("[ab-testing] getRunningExperiments failed:", err);
    return [];
  }
}
