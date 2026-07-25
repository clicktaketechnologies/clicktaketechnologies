/**
 * Service-to-Character Map — picks the most appropriate 3D character
 * variant for each deep-dive page based on its cluster + topic.
 *
 * PROBLEM: All 24 service pages currently use `character: "service-detail"`
 * (a gear), and all 6 solution pages use `character: "solution-detail"`
 * (a lightbulb). The design brief Pillar 1 calls for "unique 3D
 * character/object per service page" — at minimum, distinct characters
 * per cluster so the visual language differentiates AI from Web from
 * Marketing from Creative.
 *
 * SOLUTION: This map overrides the generic `service-detail` and
 * `solution-detail` variants at the layout level (no content file
 * changes needed). Each cluster gets a distinct visual identity:
 *
 *   AI cluster          → "ai-cube"      (rotating cube with code glyph — represents compute/data)
 *   Web cluster         → "service-detail" (existing gear — represents engineering)
 *   Marketing cluster   → "case-studies"  (existing trophy/chart — represents growth + ROI)
 *   Creative cluster    → "blog"          (existing book — represents design + content)
 *   Solution cluster    → "solution-detail" (existing lightbulb — represents ideas)
 *   Company cluster     → per-page (about="about", team="team")
 *
 * For flagship services within each cluster, we override further to
 * create visual differentiation:
 *   - ai/llm             → "services" (different cube variant)
 *   - ai/automation      → "default"  (clean cube — agentic motion)
 *   - web/saas           → "default"
 *   - digital-marketing/paid-advertising → "pricing" (price tag — ROAS)
 *   - creative/video-production → "case-studies" (trophy — film awards)
 *
 * The override ONLY kicks in when the content's `character` field is
 * the generic "service-detail" or "solution-detail". If a content file
 * explicitly sets a specific character, that wins.
 */

type CharacterVariant =
  | 'about' | 'services' | 'solutions' | 'careers' | 'case-studies'
  | 'blog' | 'contact' | 'pricing' | 'portfolio' | 'team'
  | 'resources' | 'legal' | 'service-detail' | 'solution-detail'
  | 'blog-post' | 'default'

/**
 * Per-slug overrides. Keyed by the same slug used in HUB_SPOKE_MAP.
 * If a slug isn't in this map, the cluster default is used.
 */
const SERVICE_CHARACTER_MAP: Record<string, CharacterVariant> = {
  /* ─── AI cluster — primary: "services" (cube with code glyph) ────────── */
  "ai/llm": "services",                          // flagship — distinctive
  "ai/chatbots": "contact",                      // chat bubble — conversational
  "ai/prompt-engineering": "blog",               // book — prompts are written
  "ai/cv-nlp": "case-studies",                   // trophy — vision wins
  "ai/automation": "default",                    // clean cube — agentic motion

  /* ─── Web cluster — primary: "service-detail" (gear) ─────────────────── */
  "web/full-stack": "service-detail",            // flagship — gear
  "web/saas": "default",                         // clean cube — platform
  "web/auth": "legal",                           // shield — security
  "web/python-backend": "services",              // cube — compute
  "web/wordpress": "blog",                       // book — content
  "web/ecommerce": "pricing",                    // price tag — commerce
  "web/custom-software": "service-detail",       // gear — engineering
  "web/maintenance": "resources",                // cube stack — ops
  "web/redesign": "portfolio",                   // frame — visual
  "web/domain-hosting": "default",               // cube — infra

  /* ─── Marketing cluster — primary: "case-studies" (trophy/chart) ─────── */
  "digital-marketing/paid-advertising": "pricing",       // price tag — ROAS
  "digital-marketing/content-strategy": "blog",          // book — content
  "digital-marketing/cro": "case-studies",               // trophy — wins
  "seo": "services",                                     // cube — technical SEO
  "digital-marketing/social-media": "contact",           // chat — social

  /* ─── Creative cluster — primary: "blog" (book) ──────────────────────── */
  "creative/graphic-design": "portfolio",                // frame — visual
  "creative/web-design": "portfolio",                    // frame — visual
  "creative/video-production": "case-studies",           // trophy — film awards

  /* ─── Solution cluster — primary: "solution-detail" (lightbulb) ──────── */
  "startups": "careers",                          // rocket — startup growth
  "local-businesses": "contact",                  // chat — local
  "ecommerce-brands": "pricing",                  // price tag — commerce
  "repair-shops": "service-detail",               // gear — repair
  "uk-businesses": "legal",                       // shield — compliance
  "agencies": "team",                             // people hex — partnership

  /* ─── Company cluster ────────────────────────────────────────────────── */
  "starter-kit": "careers",                       // rocket — MVP launch
  "about": "about",                               // hex shield
  "team": "team",                                 // people hex
}

/**
 * Cluster-default character. Used when a slug isn't in the override map
 * but its cluster is known.
 */
const CLUSTER_DEFAULT: Record<string, CharacterVariant> = {
  ai: "services",
  web: "service-detail",
  marketing: "case-studies",
  creative: "blog",
  solution: "solution-detail",
  company: "default",
}

/**
 * Resolve the best character variant for a given slug + cluster.
 *
 * Resolution order:
 *   1. Per-slug override in SERVICE_CHARACTER_MAP
 *   2. Cluster default in CLUSTER_DEFAULT
 *   3. "default" (generic cube)
 *
 * @param slug - The page slug (e.g. "ai/llm", "startups", "about")
 * @param cluster - The cluster (e.g. "ai", "solution", "company")
 */
export function resolveCharacter(
  slug: string,
  cluster?: string,
): CharacterVariant {
  if (SERVICE_CHARACTER_MAP[slug]) {
    return SERVICE_CHARACTER_MAP[slug]
  }
  if (cluster && CLUSTER_DEFAULT[cluster]) {
    return CLUSTER_DEFAULT[cluster]
  }
  return "default"
}

/**
 * Decide whether to override the content's `character` field.
 *
 * The override ONLY kicks in when the content file used the generic
 * "service-detail" or "solution-detail" — those are the placeholders
 * that triggered the "all services look the same" problem. If a content
 * file explicitly picked a specific character (e.g. "about" for the
 * about page), we respect that choice.
 */
export function shouldOverrideCharacter(
  contentCharacter: string | undefined,
): boolean {
  return (
    contentCharacter === "service-detail" ||
    contentCharacter === "solution-detail" ||
    !contentCharacter
  )
}

export type { CharacterVariant }
