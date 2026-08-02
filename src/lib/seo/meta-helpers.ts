/**
 * SEO meta description helpers.
 *
 * Used by template routes to bound generated `metaDescription` strings so
 * they stay within Ahrefs' recommended length window (70–160 chars).
 * Without these, the city-service template (`/cities/<city>/<service>`)
 * concatenates service title + city + description + price + delivery
 * notes + CTA, producing 170–250 char descriptions on ~280 pages —
 * which Ahrefs flags as "Meta description too long" (356 warnings).
 *
 * Goal: keep descriptions ≤155 chars (Google's typical truncation point
 * in SERPs is ~155–160 chars on desktop, ~120 on mobile).
 */

/** Maximum recommended meta description length (chars). */
export const META_DESC_MAX = 155;

/** Minimum recommended meta description length (chars). */
export const META_DESC_MIN = 70;

/**
 * Truncate a meta description to `max` chars on a word boundary.
 *
 * - If the input is already ≤ `max` chars, returns it unchanged.
 * - Otherwise cuts at the last whitespace at-or-before `max` and appends
 *   an ellipsis ("…"). If the first word itself exceeds `max`, hard-cuts
 *   at `max - 1` and appends "…".
 *
 * Never throws — if input is null/undefined/non-string, returns an empty
 * string. Safe to use directly in `description:` fields of Next.js
 * `Metadata` objects.
 *
 * @example
 * truncateMeta("Short enough")  // "Short enough"
 * truncateMeta("A very long description that exceeds the limit", 20)
 *   // "A very long…"
 */
export function truncateMeta(input: string | null | undefined, max: number = META_DESC_MAX): string {
  if (!input || typeof input !== "string") return "";
  const s = input.trim().replace(/\s+/g, " ");
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  // If we found a word boundary, cut there. Otherwise hard-cut.
  const cut = lastSpace > 0 ? lastSpace : max - 1;
  return s.slice(0, cut).trimEnd() + "…";
}
