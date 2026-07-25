/**
 * Brand Voice Guide — outcome-based vocabulary swap map.
 *
 * This is the canonical reference for "freelancer → enterprise" language
 * upgrades across all ClickTake copy. Used by:
 *   - Content authors when writing new pages
 *   - The Master AI Copywriting prompt (download/clicktake-master-
 *     copywriting-prompt.md) which embeds these rules
 *   - Future lint tooling (TODO) to flag fluff phrases in PRs
 *
 * See /download/clicktake-enterprise-design-brief.pdf §Pillar 3.
 */

export type VoiceSwap = {
  /** The freelancer-fluff phrase to avoid */
  avoid: string;
  /** The enterprise-outcome replacement to use */
  use: string;
  /** Why the swap matters (for content team education) */
  rationale: string;
};

/* ─── Global forbidden phrases (apply to every page) ─────────────────── */
export const FORBIDDEN_PHRASES: VoiceSwap[] = [
  {
    avoid: "cutting-edge",
    use: "production-grade / battle-tested / [specific tech + version]",
    rationale: "Vague. Buyers have heard 'cutting-edge' from 50 vendors this week. Name the actual technology stack instead.",
  },
  {
    avoid: "revolutionary",
    use: "[specific outcome + metric, e.g. '3.4x ROAS in 90 days']",
    rationale: "Hyperbolic. 'Revolutionary' is a claim; metrics are evidence.",
  },
  {
    avoid: "world-class",
    use: "[specific credentials, e.g. '12 senior engineers, 4 ex-FAANG']",
    rationale: "Unfalsifiable. Credentials are verifiable.",
  },
  {
    avoid: "best-in-class",
    use: "[specific differentiator + comparison, e.g. '200ms p95 vs. industry avg 800ms']",
    rationale: "Best-in-class requires a class. Name the class and the comparison.",
  },
  {
    avoid: "leverage (as verb for 'use')",
    use: "use / deploy / integrate / build on",
    rationale: "Corporate jargon. 'Use' is clearer.",
  },
  {
    avoid: "utilize",
    use: "use",
    rationale: "Longer synonym of 'use' that adds nothing.",
  },
  {
    avoid: "synergize",
    use: "[specific verb describing the integration]",
    rationale: "Meaningless buzzword.",
  },
  {
    avoid: "in today's fast-paced digital world",
    use: "[delete entirely — open with the outcome instead]",
    rationale: "Cliché. The reader already knows what world they live in.",
  },
  {
    avoid: "unleash the power of",
    use: "[specific outcome + mechanism]",
    rationale: "Hyperbolic. Vague.",
  },
  {
    avoid: "harness the potential of",
    use: "[specific outcome + mechanism]",
    rationale: "Hyperbolic. Vague.",
  },
  {
    avoid: "we're passionate about",
    use: "[describe what you've shipped instead]",
    rationale: "Passion is not a credential. Shipped work is.",
  },
  {
    avoid: "we believe that",
    use: "[state the fact directly, with evidence]",
    rationale: "Beliefs are not facts. Cite the evidence.",
  },
  {
    avoid: "trusted by leading brands",
    use: "trusted by [name 3+ specific brands]",
    rationale: "If you can't name them, the claim is hollow.",
  },
  {
    avoid: "boost your ROI",
    use: "[specific metric, e.g. '3.4x ROAS in 90 days, measured server-side']",
    rationale: "Vague. Define the metric, the timeline, and the measurement method.",
  },
  {
    avoid: "state-of-the-art",
    use: "[name the specific tech + version]",
    rationale: "Vague. 'State-of-the-art' changes weekly — name the actual stack.",
  },
  {
    avoid: "next-generation",
    use: "[name the specific capability]",
    rationale: "Vague. Everything is next-generation until it ships.",
  },
  {
    avoid: "future-proof",
    use: "[name the specific architectural decision that enables evolution]",
    rationale: "Vague. Future-proofing is a claim; architecture is evidence.",
  },
  {
    avoid: "unlock",
    use: "[specific verb: enable / activate / deploy / measure]",
    rationale: "Overused. 'Unlock' has lost meaning.",
  },
  {
    avoid: "empower",
    use: "[specific verb describing what the user can now do]",
    rationale: "Paternalistic. Describe the capability, not the empowerment.",
  },
  {
    avoid: "transform (without specifics)",
    use: "[specific before/after metrics]",
    rationale: "Transformation is a claim. Before/after metrics are evidence.",
  },
];

/* ─── Vocabulary swaps by cluster ────────────────────────────────────── */

export const AI_CLUSTER_VOCAB: VoiceSwap[] = [
  {
    avoid: "we make AI",
    use: "we engineer production-grade LLM systems with retrieval-augmented generation, eval harnesses, and EU data residency",
    rationale: "Outcome + mechanism + tech + compliance.",
  },
  {
    avoid: "AI chatbot",
    use: "retrieval-augmented conversational assistant with citation grounding",
    rationale: "'Chatbot' implies a toy. 'Assistant with citation grounding' implies a production system.",
  },
  {
    avoid: "smart AI",
    use: "[specific model + eval score, e.g. 'GPT-4o with 92% citation accuracy on the eval set']",
    rationale: "Smart is vague. Eval scores are evidence.",
  },
  {
    avoid: "powerful AI",
    use: "[specific inference metric, e.g. '200ms p95 latency, 50 tokens/sec']",
    rationale: "Powerful is vague. Performance metrics are evidence.",
  },
];

export const WEB_CLUSTER_VOCAB: VoiceSwap[] = [
  {
    avoid: "we make websites",
    use: "we architect scalable digital ecosystems — multi-tenant SaaS platforms, headless commerce, and bespoke line-of-business applications",
    rationale: "'Websites' implies a freelancer. 'Digital ecosystems' implies an enterprise partner.",
  },
  {
    avoid: "fast website",
    use: "[specific Core Web Vitals target, e.g. '<1.2s LCP, <100ms INP, 0 CLS']",
    rationale: "Fast is vague. Core Web Vitals are measurable.",
  },
  {
    avoid: "secure website",
    use: "[specific compliance + control, e.g. 'SOC 2 Type II audit, RBAC, audit logging, zero-trust architecture']",
    rationale: "Secure is a claim. Compliance + controls are evidence.",
  },
  {
    avoid: "modern tech stack",
    use: "[name the stack: 'Next.js 16 + Prisma + Postgres + Redis + Vercel']",
    rationale: "Modern is subjective. Name the actual versions.",
  },
  {
    avoid: "responsive design",
    use: "mobile-first design with break-point testing across 12 device profiles",
    rationale: "Responsive is table stakes. Show the testing rigor.",
  },
];

export const MARKETING_CLUSTER_VOCAB: VoiceSwap[] = [
  {
    avoid: "we do marketing",
    use: "we engineer growth — paid acquisition, conversion optimization, and content engines with server-side attribution and incrementality testing",
    rationale: "Marketing is a category. Engineering growth is an outcome.",
  },
  {
    avoid: "more traffic",
    use: "[specific: '+312% organic traffic in 11 months, measured via GA4 + GSC']",
    rationale: "More is vague. Specifics are evidence.",
  },
  {
    avoid: "better leads",
    use: "[specific: 'SQL rate up 28%, MQL→SQL conversion up 19 points']",
    rationale: "Better is vague. Funnel metrics are evidence.",
  },
  {
    avoid: "higher rankings",
    use: "[specific: 'page-1 rankings for 47 commercial keywords in 6 months']",
    rationale: "Higher is vague. SERP positions are measurable.",
  },
  {
    avoid: "viral content",
    use: "[specific: '2.3M organic impressions, 14% save rate, 8.2% CTR to landing page']",
    rationale: "Viral is luck. Distribution metrics are evidence.",
  },
];

export const CREATIVE_CLUSTER_VOCAB: VoiceSwap[] = [
  {
    avoid: "beautiful design",
    use: "[specific: 'WCAG 2.2 AA compliant, 8pt grid system, design tokens propagated to code']",
    rationale: "Beautiful is subjective. Systematic design is measurable.",
  },
  {
    avoid: "modern brand",
    use: "[specific: 'visual identity system with 6 logo lockups, 4-color palette, 3-typeface scale, motion design spec']",
    rationale: "Modern is vague. Brand systems are evidence.",
  },
  {
    avoid: "professional video",
    use: "[specific: '4K production, hook-hold-payoff edit, retention curve optimized for first 1.5s']",
    rationale: "Professional is table stakes. Production specs are evidence.",
  },
];

export const SOLUTION_CLUSTER_VOCAB: VoiceSwap[] = [
  {
    avoid: "we help startups",
    use: "we partner with founders from pre-seed MVP through Series A — fixed-scope starter kit, then retainer engineering as you scale",
    rationale: "Help is vague. Partnership model is specific.",
  },
  {
    avoid: "compliant solutions",
    use: "[specific: 'FCA-aware builds with audit logging, GDPR data subject access request flows, KYC/AML integration']",
    rationale: "Compliant is a claim. Specific frameworks + controls are evidence.",
  },
  {
    avoid: "custom solutions",
    use: "[specific: 'bespoke line-of-business applications built on Next.js + Postgres, with 6-week MVP, 12-week v1, ongoing SLA']",
    rationale: "Custom is table stakes. Specifics on tech + timeline are evidence.",
  },
];

/* ─── Aggregate: all cluster vocab maps ──────────────────────────────── */
export const CLUSTER_VOCAB_MAP = {
  ai: AI_CLUSTER_VOCAB,
  web: WEB_CLUSTER_VOCAB,
  marketing: MARKETING_CLUSTER_VOCAB,
  creative: CREATIVE_CLUSTER_VOCAB,
  solution: SOLUTION_CLUSTER_VOCAB,
  company: [], // company pages use global forbidden phrases only
} as const;

/* ─── Helper: scan a string for forbidden phrases ──────────────────────
 * Returns an array of { phrase, suggestion } pairs for any forbidden
 * phrase found in the input text. Useful for content lint scripts.
 */
export function scanForForbiddenPhrases(
  text: string,
  cluster?: keyof typeof CLUSTER_VOCAB_MAP,
): { phrase: string; suggestion: string; rationale: string }[] {
  const results: { phrase: string; suggestion: string; rationale: string }[] = [];
  const lower = text.toLowerCase();

  const check = (swap: VoiceSwap) => {
    if (lower.includes(swap.avoid.toLowerCase())) {
      results.push({
        phrase: swap.avoid,
        suggestion: swap.use,
        rationale: swap.rationale,
      });
    }
  };

  FORBIDDEN_PHRASES.forEach(check);
  if (cluster) {
    CLUSTER_VOCAB_MAP[cluster].forEach(check);
  }

  return results;
}
