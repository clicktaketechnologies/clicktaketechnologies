// ─────────────────────────────────────────────────────────────────────────────
// Bucketing — deterministic variant assignment for A/B tests.
//
// Given a (visitorId, experimentId) pair and a list of weighted variants,
// returns the variant key the visitor is assigned to. The assignment is
// DETERMINISTIC: same visitor + same experiment → same variant, forever.
// This means:
//
//   - A returning visitor always sees the same CTA copy.
//   - Server-side and client-side agree (no flash of wrong variant).
//   - We can record exposures idempotently (unique index on visitor+exp).
//
// Implementation: FNV-1a 32-bit hash, then modulo by total weight. FNV-1a
// is fast, has good distribution for short inputs, and is well within
// the "good enough for A/B testing" bucket — it is NOT cryptographically
// secure and does not need to be (we're not protecting secrets with it).
//
// Performance: <1µs per assignment on modern hardware. No allocations
// beyond the input string iteration.
// ─────────────────────────────────────────────────────────────────────────────

export type WeightedVariant = {
  key: string;
  weight: number;
};

/**
 * 32-bit FNV-1a hash. Returns an unsigned 32-bit integer.
 */
export function hashStr(s: string): number {
  let h = 0x811c9dc5; // FNV offset basis (2166136261)
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    // FNV prime (16777619) — Math.imul avoids 53-bit float precision loss
    h = Math.imul(h, 0x01000193);
  }
  // Coerce to unsigned 32-bit
  return h >>> 0;
}

/**
 * Deterministic variant assignment.
 *
 * @param visitorId    The ct_visitor cookie value (cuid).
 * @param experimentId The experiment's database id (cuid).
 * @param variants     Array of { key, weight } for the experiment.
 *                     Weights are relative (e.g. [50, 50] == [1, 1] == [9, 1]).
 * @returns            The selected variant's `key`.
 */
export function getVariantForVisitor(
  visitorId: string,
  experimentId: string,
  variants: WeightedVariant[],
): string {
  if (variants.length === 0) {
    throw new Error("Cannot assign variant — empty variants array");
  }

  // Filter out zero-weight variants (they should never be picked).
  const active = variants.filter((v) => v.weight > 0);
  if (active.length === 0) {
    // All weights are zero — fall back to first variant (treats it as 100%).
    return variants[0].key;
  }

  const total = active.reduce((sum, v) => sum + v.weight, 0);
  if (total <= 0) {
    return active[0].key;
  }

  // Hash the visitor + experiment pair, then take modulo of the total weight.
  // This produces a uniform bucket in [0, total), and each variant occupies
  // a contiguous slice proportional to its weight.
  const bucket = hashStr(`${visitorId}::${experimentId}`) % total;

  let acc = 0;
  for (const v of active) {
    acc += v.weight;
    if (bucket < acc) {
      return v.key;
    }
  }

  // Defensive fallback (should be unreachable given the math above).
  return active[active.length - 1].key;
}

/**
 * Sanity-check helper used by the admin UI to preview bucket distribution.
 * Runs the assignment for a range of synthetic visitor ids and returns
 * the percentage that landed in each variant.
 *
 * Not used in production runtime — purely for the admin "preview split"
 * panel so marketers can verify their weights produce the expected
 * traffic distribution before going live.
 */
export function previewBucketDistribution(
  experimentId: string,
  variants: WeightedVariant[],
  sampleSize = 10000,
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const v of variants) counts[v.key] = 0;

  for (let i = 0; i < sampleSize; i++) {
    // Synthesize a visitor id that looks like a cuid (any string works
    // for the hash — we just want a deterministic, varied input).
    const visitorId = `preview_visitor_${i}`;
    const key = getVariantForVisitor(visitorId, experimentId, variants);
    counts[key] = (counts[key] || 0) + 1;
  }

  const result: Record<string, number> = {};
  for (const v of variants) {
    result[v.key] = Math.round((counts[v.key] / sampleSize) * 1000) / 10; // 1 decimal place
  }
  return result;
}
