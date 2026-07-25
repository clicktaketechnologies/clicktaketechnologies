// Client-safe barrel for A/B testing — NO server-only imports.
// Import from "@/lib/ab-testing/client" in client components.
//
// Why this exists: the main index.ts barrel re-exports track.ts which
// imports prisma (Node-only). If a client component imports the barrel,
// Next.js tries to bundle pg → tls → util/types (Node built-ins) into
// the browser bundle, which fails. This client barrel only re-exports
// the pure-JS modules (bucketing, stats, cookie) that have no DB deps.

export {
  hashStr,
  getVariantForVisitor,
  previewBucketDistribution,
  type WeightedVariant,
} from "./bucketing";

export {
  compareVariants,
  formatPValue,
  formatRate,
  formatLiftPercent,
  type VariantStats,
  type ComparisonResult,
} from "./stats";

export {
  VISITOR_COOKIE_NAME,
  VISITOR_COOKIE_MAX_AGE,
  generateVisitorId,
  serializeVisitorCookie,
  parseVisitorCookie,
  getVisitorIdFromBrowser,
} from "./cookie";
