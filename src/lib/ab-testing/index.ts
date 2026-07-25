// Barrel export for the A/B testing library.
// Import from "@/lib/ab-testing" — keeps call sites short.

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

export {
  recordExposure,
  recordConversion,
  getRunningExperiments,
  type ExposureInput,
  type ConversionInput,
} from "./track";
