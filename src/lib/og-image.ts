/**
 * Default Open Graph image — shared across all pages that don't have a
 * custom OG image. Used to fix the Ahrefs "Open Graph tags incomplete"
 * warning (385 pages missing og:image).
 *
 * Next.js metadata merging: when a child page specifies its own
 * `openGraph` block, the parent layout's `openGraph.images` is NOT
 * inherited. So every page-level openGraph block must explicitly include
 * `images: [DEFAULT_OG_IMAGE]` to avoid the warning.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "ClickTake Technologies — AI-Powered Digital Agency. Web · AI · Mobile · SaaS · Growth Marketing. Offices in Birmingham, Multan, Austin and Dubai.",
} as const;
