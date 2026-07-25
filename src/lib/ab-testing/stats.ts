// ─────────────────────────────────────────────────────────────────────────────
// Statistical analysis for A/B test results.
//
// Implements a two-proportion Z-test — the standard frequentist test for
// comparing conversion rates between a control and treatment variant.
// Returns: per-variant conversion rate, lift vs control, Z-score,
// two-tailed p-value, 95% confidence interval on the lift, and a
// significance classification (not_enough_data / inconclusive / significant).
//
// Why two-proportion Z-test (and not a t-test or chi-square):
//   - Conversion is a binary outcome (0/1) → proportions, not means.
//   - We're comparing exactly two variants → Z-test is the right tool.
//   - Chi-square would give the same p-value for 2×2 tables but doesn't
//     naturally yield a direction or confidence interval.
//
// Assumptions:
//   - Each variant has ≥30 exposures (Central Limit Theorem kicks in).
//   - Independent observations (one visitor = one assignment per experiment,
//     enforced by the unique index on ab_assignments).
//   - Pooled-variance estimate under the null hypothesis (standard for
//     two-proportion tests).
//
// All math is done with plain JS numbers. No external stats library
// needed — the formulas are textbook and the precision is more than
// sufficient for marketing A/B tests where effect sizes are typically
// in the 5–30% range.
// ─────────────────────────────────────────────────────────────────────────────

export type VariantStats = {
  variantKey: string;
  exposures: number;
  conversions: number;
  conversionRate: number; // 0..1
  isControl: boolean;
};

export type ComparisonResult = {
  variantKey: string;
  exposures: number;
  conversions: number;
  conversionRate: number;          // 0..1
  liftAbsolute: number | null;     // p_variant - p_control (null for control itself)
  liftPercent: number | null;      // (p_variant - p_control) / p_control × 100
  zScore: number | null;           // signed Z
  pValue: number | null;           // two-tailed
  confidenceInterval: { low: number; high: number } | null; // 95% CI on liftAbsolute
  significant: boolean;            // p < 0.05 AND exposures ≥ 30 in both arms
  classification: 'control' | 'not_enough_data' | 'inconclusive' | 'winner' | 'loser';
};

// ─── Standard normal CDF (Abramowitz & Stegun 26.2.17 approximation) ─────────
// Max error: 7.5e-8. Good enough for any practical A/B test.
function normalCdf(z: number): number {
  // For |z| > 8 the approximation loses precision; clamp to 0/1.
  if (z < -8) return 0;
  if (z > 8) return 1;

  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-0.5 * z * z); // φ(z)
  const p =
    d *
    t *
    (0.319381530 +
      t * (-0.356563782 +
        t * (1.781477937 +
          t * (-1.821255978 +
            t * 1.330274429))));

  return z > 0 ? 1 - p : p;
}

// Inverse normal CDF for confidence interval bounds (95% → z* = 1.95996).
// Hardcoded for 95% to keep the surface area small. If we later want 99%
// or 90%, swap this for a proper inverse-Φ implementation.
const Z_95 = 1.959963984540054;

/**
 * Compare each non-control variant against the control variant.
 *
 * @param stats Array of per-variant aggregated stats. Must include exactly
 *              one variant with `isControl: true`.
 * @returns     One ComparisonResult per variant. Control gets a sentinel
 *              result with `classification: 'control'`.
 */
export function compareVariants(stats: VariantStats[]): ComparisonResult[] {
  const control = stats.find((s) => s.isControl);
  if (!control) {
    // No control declared — every variant gets not_enough_data so the
    // admin UI surfaces the misconfiguration instead of showing fake p-values.
    return stats.map((s) => ({
      variantKey: s.variantKey,
      exposures: s.exposures,
      conversions: s.conversions,
      conversionRate: s.conversionRate,
      liftAbsolute: null,
      liftPercent: null,
      zScore: null,
      pValue: null,
      confidenceInterval: null,
      significant: false,
      classification: 'not_enough_data' as const,
    }));
  }

  const p0 = control.conversionRate;
  const n0 = control.exposures;
  const c0 = control.conversions;

  return stats.map((s) => {
    if (s.isControl) {
      return {
        variantKey: s.variantKey,
        exposures: s.exposures,
        conversions: s.conversions,
        conversionRate: s.conversionRate,
        liftAbsolute: null,
        liftPercent: null,
        zScore: null,
        pValue: null,
        confidenceInterval: null,
        significant: false,
        classification: 'control' as const,
      };
    }

    const p1 = s.conversionRate;
    const n1 = s.exposures;
    const c1 = s.conversions;

    // Need minimum sample size in both arms to compute a meaningful Z.
    const minSample = 30;
    if (n0 < minSample || n1 < minSample) {
      return {
        variantKey: s.variantKey,
        exposures: n1,
        conversions: c1,
        conversionRate: p1,
        liftAbsolute: p1 - p0,
        liftPercent: p0 > 0 ? ((p1 - p0) / p0) * 100 : null,
        zScore: null,
        pValue: null,
        confidenceInterval: null,
        significant: false,
        classification: 'not_enough_data' as const,
      };
    }

    // Pooled proportion under H0: p1 == p0.
    const pooled = (c0 + c1) / (n0 + n1);
    // Guard against pooled=0 or pooled=1 (degenerate — both vars have 0%
    // or 100% conversion, SE collapses). Treat as inconclusive.
    if (pooled === 0 || pooled === 1) {
      return {
        variantKey: s.variantKey,
        exposures: n1,
        conversions: c1,
        conversionRate: p1,
        liftAbsolute: p1 - p0,
        liftPercent: p0 > 0 ? ((p1 - p0) / p0) * 100 : null,
        zScore: null,
        pValue: null,
        confidenceInterval: null,
        significant: false,
        classification: 'inconclusive' as const,
      };
    }

    const se = Math.sqrt(pooled * (1 - pooled) * (1 / n0 + 1 / n1));
    const z = se > 0 ? (p1 - p0) / se : 0;
    const pValue = 2 * (1 - normalCdf(Math.abs(z)));

    // 95% CI on the absolute lift (p1 - p0) — uses unpooled SE here, which
    // is the correct standard for the CI (vs pooled SE for the test stat).
    const seUnpooled = Math.sqrt(
      (p0 * (1 - p0)) / Math.max(n0, 1) + (p1 * (1 - p1)) / Math.max(n1, 1),
    );
    const ciLow = (p1 - p0) - Z_95 * seUnpooled;
    const ciHigh = (p1 - p0) + Z_95 * seUnpooled;

    const significant = pValue < 0.05;
    let classification: ComparisonResult['classification'];
    if (!significant) {
      classification = 'inconclusive';
    } else if (p1 > p0) {
      classification = 'winner';
    } else {
      classification = 'loser';
    }

    return {
      variantKey: s.variantKey,
      exposures: n1,
      conversions: c1,
      conversionRate: p1,
      liftAbsolute: p1 - p0,
      liftPercent: p0 > 0 ? ((p1 - p0) / p0) * 100 : null,
      zScore: z,
      pValue,
      confidenceInterval: { low: ciLow, high: ciHigh },
      significant,
      classification,
    };
  });
}

/**
 * Format a p-value for display: < 0.001 collapses to "p < 0.001",
 * otherwise show 3 decimal places. Keeps the admin UI tidy.
 */
export function formatPValue(p: number | null): string {
  if (p === null) return '—';
  if (p < 0.001) return 'p < 0.001';
  return `p = ${p.toFixed(3)}`;
}

/**
 * Format a conversion rate as a percentage with 2 decimal places.
 * e.g. 0.1234 → "12.34%"
 */
export function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

/**
 * Format a lift percentage. Handles the null control case.
 * e.g. 0.05 → "+5.00%", -0.03 → "-3.00%"
 */
export function formatLiftPercent(lift: number | null): string {
  if (lift === null) return '—';
  const sign = lift >= 0 ? '+' : '';
  return `${sign}${lift.toFixed(2)}%`;
}
