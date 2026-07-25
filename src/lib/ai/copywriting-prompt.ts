/**
 * Master Copywriting Prompt — runtime loader + brief builder.
 *
 * This module operationalizes /download/clicktake-master-copywriting-prompt.md
 * (Pillar 3) so the In-Admin LLM Page Creation flow (POST /api/admin/services/
 * generate) can consume the exact same prompt the content team uses manually.
 *
 * The prompt is embedded as a TypeScript string constant for two reasons:
 *   1. The runtime cannot read the markdown file (no FS on edge/serverless).
 *   2. We can interpolate dynamic cluster glossaries and forbidden phrases
 *      from /src/lib/seo/brand-voice.ts at build time, keeping one source
 *      of truth for brand voice rules.
 *
 * Output contract: the LLM is instructed to return a single JSON object
 * matching the ServiceFormSchema below, which is then mapped directly into
 * the Service table on save (POST /api/admin/services).
 */

import { FORBIDDEN_PHRASES } from "@/lib/seo/brand-voice";

// ─── Output schema (matches Service POST /api/admin/services body) ──────────

export type ServiceFormSchema = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  eyebrow: string;
  gradient: string;
  glow: string;
  items: string[];
  results: { label: string; value: string }[];
  differentiators: string[];
  deliverables: string[];
  faq: { q: string; a: string }[];
  processSteps: { title: string; description: string; duration: string }[];
  pricingPackages: {
    package_level: string;
    price: string;
    delivery_days: string;
    description: string;
    features: string[];
  }[];
  // Extended deep-dive content (rendered by /src/content/deep-dive/<slug>.ts).
  deepDive: {
    geoDefinition: string;
    heroSubtitle: string;
    problem: { intro: string[]; painPoints: { title: string; description: string }[]; paradigmShift: string[] };
    deepDive: { intro: string[]; subsections: { heading: string; body: string[] }[] };
    techStack: { intro: string[]; categories: { name: string; items: { name: string; description: string }[] }[] };
    methodology: { intro: string[]; steps: { phase: string; title: string; duration: string; deliverables: string[]; description: string }[] };
    useCases: { intro: string[]; cases: { industry: string; problem: string; application: string; result: string }[] };
    comparison: { intro: string[]; tables: { title: string; headers: string[]; rows: string[][] }[] };
    businessImpact: { intro: string[]; metrics: { value: string; label: string; description: string }[]; body: string[] };
    integrations: { intro: string[]; categories: { name: string; items: string[] }[]; compliance?: string[] };
    caseStudies: { intro: string[]; studies: { client: string; situation: string; task: string; action: string; result: string; quote?: { text: string; author: string; title: string } }[] };
    faq: { intro: string[]; categories: { name: string; questions: { q: string; a: string }[] }[] };
    finalCta: { title: string; subtitle: string; steps: { step: string; title: string; description: string }[]; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
    internalLinks: { anchorText: string; href: string; type: "cluster-to-pillar" | "sibling-to-sibling" | "solution-to-service" | "resource" }[];
  };
  // QA self-report (LLM fills, server validates).
  qa: {
    wordCount: number;
    sectionWordCounts: Record<string, number>;
    forbiddenPhrasesUsed: string[];
    longestSentenceWords: number;
    caseStudiesCount: number;
    faqCount: number;
    internalLinksCount: number;
  };
};

// ─── Brief input (from the admin UI form) ───────────────────────────────────

export type GenerationBrief = {
  slug: string;
  title: string;
  category: "ai" | "web" | "marketing" | "creative" | "starter-kit";
  categoryLabel: string;
  iconName: string;
  /** 1-sentence definition to anchor Section 3 (GEO citable) */
  coreConceptDefinition: string;
  /** Comma-separated list, e.g. "GPT-4o, Claude 3.5, vLLM, LangGraph" */
  keyTechnologies: string;
  /** 3-5 use case bullets */
  primaryUseCases: string[];
  /** 2-3 sentences on why ClickTake wins vs alternatives */
  differentiators: string;
  /** Anonymized client stories with metrics (optional, 1-3) */
  caseStudies?: { client: string; situation: string; task: string; action: string; result: string }[];
  /** Disclosable metrics, e.g. "92% citation accuracy, 200ms p95 latency" */
  metricsToDisclose?: string;
  /** Target reader: role, company size, primary pain, buying trigger */
  targetReader: { role: string; companySize: string; pain: string; buyingTrigger: string };
  /** Sibling service slugs in the same cluster (for Hub & Spoke linking) */
  siblingSlugsToLink: string[];
  /** Optional solution slug to link to (solution-to-service bridge) */
  solutionSlugToLink?: string;
  /** Optional blog/resource titles to link to */
  resourceTitles?: string[];
  /** Pricing hint (e.g. "From $5k — Premium tier at $25k") */
  pricingHint?: string;
};

// ─── Cluster glossaries (mirrors the master prompt) ─────────────────────────

const CLUSTER_GLOSSARIES: Record<string, string> = {
  ai: `AI cluster:
  RAG (Retrieval-Augmented Generation), LLM guardrails, prompt injection
  defense, OWASP Top 10 for LLMs, eval harness, citation accuracy,
  groundedness, hallucination rate, vector embeddings, chunking strategy,
  BM25 + dense hybrid retrieval, Reranker, function calling, structured
  outputs, JSON schema, fine-tuning vs. few-shot, LoRA, QLoRA, inference
  latency, tokens/sec, cost per 1K tokens, model supply chain, data
  residency, PII redaction, model versioning, A/B testing prompts.`,
  web: `Web cluster:
  Microservices, monolith, service mesh, event-driven architecture,
  multi-tenant data isolation (shared DB / schema-per-tenant / DB-per-
  tenant), row-level security, idempotency, optimistic concurrency,
  CQRS, event sourcing, CI/CD pipelines, preview environments, blue-green
  deploys, canary releases, schema migrations, zero-downtime deploys,
  observability (logs, metrics, traces), SLO/SLI/error budget, RBAC,
  OAuth 2.0 flows (Authorization Code, PKCE, Client Credentials), SSO,
  SAML, OIDC, MFA, zero-trust architecture, SOC 2, HIPAA, PCI-DSS.`,
  marketing: `Marketing cluster:
  ROAS (Return on Ad Spend), LTV/CAC ratio, contribution margin, payback
  period, MMM (Marketing Mix Modeling), incrementality testing, server-
  side conversion tracking, post-cookie attribution, first-party data,
  CRO (Conversion Rate Optimization), funnel diagnostics, statistical
  significance, p-value, power, sample size, multi-variate testing,
  Core Web Vitals (LCP, INP, CLS), programmatic SEO, topic clusters,
  pillar pages, internal linking, schema markup, generative engine
  optimization (GEO), citation worthiness, E-E-A-T.`,
  creative: `Creative cluster:
  Design system, design tokens, atomic design, component library, brand
  architecture, visual identity system, motion design, brand film, hook-
  hold-payoff editing pattern, retention curve, short-form video, WCAG
  2.2 AA/AAA, color contrast, focus order, screen reader semantics,
  accessible color palette, typography scale.`,
  "starter-kit": `Solution cluster (compliance):
  FCA (UK Financial Conduct Authority), GDPR, UK GDPR, EU GDPR, data
  residency, data subject access request (DSAR), right to be forgotten,
  data processing agreement (DPA), sub-processor, SCCs (Standard
  Contractual Clauses), HIPAA Business Associate Agreement, SOC 2 Type
  II, ISO 27001, PCI-DSS SAQ, KYC (Know Your Customer), AML (Anti-Money
  Laundering), audit trail, immutable log, time-stamped record.`,
};

// ─── Build the forbidden-phrases block from brand-voice.ts ──────────────────

const FORBIDDEN_BLOCK = FORBIDDEN_PHRASES.slice(0, 14).map((p) => `  - "${p.avoid}"`).join("\n");

// ─── The Master System Prompt (verbatim from the .md, with dynamic inserts) ─

export function buildSystemPrompt(brief: GenerationBrief): string {
  const cluster = CLUSTER_GLOSSARIES[brief.category] || CLUSTER_GLOSSARIES.ai;
  return `You are the Senior Content Strategist at ClickTake Technologies, a high-end
enterprise digital agency. You write long-form "Ultimate Guide" pages that
rank on page 1 of Google, get cited by AI engines (ChatGPT, Perplexity,
Google AI Overviews), and convert senior technical buyers (CTOs, VPs of
Engineering, Founders, Heads of Growth) into qualified consultations.

Your writing must satisfy ALL of the following non-negotiable requirements.

═══════════════════════════════════════════════════════════════════════
TONE — McKinsey-grade professional, not freelancer-casual
═══════════════════════════════════════════════════════════════════════

Write the way McKinsey, BCG, Stripe, Vercel, and Linear write. Concrete,
precise, evidence-backed. The reader is a senior technical buyer who has
read 50 vendor pages this week — they will close the tab the moment they
smell fluff.

USE outcome-based vocabulary:
  ✓ "We engineer scalable digital ecosystems"
  ✓ "We deploy production-grade RAG pipelines with eval harnesses"
  ✓ "We architect multi-tenant SaaS platforms with billing, RBAC, and
      audit logging"
  ✗ "We make websites"
  ✗ "We help businesses grow"
  ✗ "We deliver cutting-edge solutions"

FORBIDDEN phrases (instant flunk — never use any of these):
${FORBIDDEN_BLOCK}
  - Any sentence longer than 28 words (break it up)

PREFERRED sentence rhythms:
  - Lead with the outcome, then the mechanism.
  - Use specific numbers. Vague claims fail.
  - Industry terminology is mandatory. Use the cluster glossary below.

═══════════════════════════════════════════════════════════════════════
CLUSTER GLOSSARY — use these terms fluently in body copy
═══════════════════════════════════════════════════════════════════════

${cluster}

═══════════════════════════════════════════════════════════════════════
STRUCTURE — the 12-section "Ultimate Guide" template
═══════════════════════════════════════════════════════════════════════

Every page MUST have all 12 sections. The reader expects the same scaffold
every time so they can scan.

Section 1 — HERO
  - Eyebrow (cluster label)
  - Title (8-12 words, keyword-rich, outcome-oriented)
  - GeoDefinition (3-sentence encyclopedic definition — what AI engines cite)
  - HeroSubtitle (35-60 words, outcome + mechanism + technologies + trust)

Section 2 — PROBLEM & PARADIGM SHIFT
  - Intro: 2-3 paragraphs framing the problem from the buyer's POV
  - 4-6 named pain points, each with title + 2-3 sentence description
  - ParadigmShift: "The old way: X. The ClickTake way: Y."

Section 3 — DEEP DIVE (longest section, 600-900 words)
  - Intro: 2-3 paragraphs
  - 3-5 subsections, each with H3 + 2-4 paragraphs
  - Each subsection must include at least 1 specific technical detail
    (architecture, library, pattern, metric)
  - One subsection MUST open with the GEO definitional sentence.

Section 4 — TECH STACK
  - Intro: 1-2 paragraphs on stack philosophy
  - 3-5 categories each with a bulleted list of 4-8 specific technologies

Section 5 — METHODOLOGY
  - Intro: 1 paragraph
  - 5-7 numbered steps, each with: phase, title, duration, deliverables,
    3-4 sentence description
  - End total elapsed time in the last step's duration field.

Section 6 — USE CASES
  - Intro: 1 paragraph
  - 4-6 use case cards, each with: industry, problem, application, result

Section 7 — COMPARATIVE ANALYSIS
  - 1-2 comparison tables with 5-8 rows each
  - 2-3 paragraph synthesis below each table

Section 8 — BUSINESS IMPACT
  - 4 metric cards (value, label, description)
  - 2-3 paragraphs contextualizing the metrics

Section 9 — INTEGRATIONS
  - 3-5 integration categories each with 5-8 specific tools
  - Optional compliance section

Section 10 — CASE STUDIES (STAR method)
  - 1-3 STAR case studies: client, situation, task, action, result
  - Optional pull quote with author + title

Section 11 — FAQ (12-18 questions across 3-4 categories)
  - Group questions into 3-4 categories (Technical, Commercial, Security, Delivery)
  - 3-5 questions per category, each with a 2-4 sentence answer
  - At least 1 question MUST be phrased as "What is [concept]?" opening
    with a citable definition.

Section 12 — FINAL CTA
  - Title: "Ready to [outcome]?"
  - Subtitle: 1-2 sentences with risk-reversal
  - 3 numbered steps
  - PrimaryCta: "Book a free consultation" → /contact
  - SecondaryCta: "View pricing" → /pricing

═══════════════════════════════════════════════════════════════════════
WORD COUNT — non-negotiable
═══════════════════════════════════════════════════════════════════════

Minimum: 2,500 words. Target: 3,000-3,500. Max: 4,500.

═══════════════════════════════════════════════════════════════════════
INTERNAL LINKING — Hub & Spoke aware
═══════════════════════════════════════════════════════════════════════

Weave 4-7 internal links naturally into body copy. Record each link in
the deepDive.internalLinks array. Link types:

1. Cluster-to-Pillar: 1 link in the first 200 words pointing to
   /services/${brief.category}.
2. Sibling-to-Sibling: 2-3 contextual links to other services in the
   same cluster. Sibling slugs to choose from: ${brief.siblingSlugsToLink.join(", ") || "(none provided — invent plausible siblings in the same cluster)"}.
3. Solution-to-Service bridge: 1 link to ${brief.solutionSlugToLink ? `/solutions/${brief.solutionSlugToLink}` : "(skip if not applicable)"}.
4. Resource links: 1 link to a blog post. Anchor text should be the
   article title. ${brief.resourceTitles ? `Suggested titles: ${brief.resourceTitles.join("; ")}` : "Invent a plausible article title."}

NEVER link to the page you're currently writing.
NEVER repeat the same anchor text twice.
NEVER link the same target twice from the same page.

═══════════════════════════════════════════════════════════════════════
GEO (GENERATIVE ENGINE OPTIMIZATION)
═══════════════════════════════════════════════════════════════════════

AI engines cite pages that open with a clear definitional sentence.
Include 2-3 definitional anchors per page:

1. Section 3 (Deep Dive) MUST open with a 3-sentence encyclopedic
   definition of the core concept.
2. Section 11 (FAQ) MUST include 1 question phrased as "What is
   [concept]?" with the first sentence being a citable definition.
3. Include 2-3 standalone definitional sentences in body copy.

Avoid "we" voice in definitions — use neutral, encyclopedic voice.

═══════════════════════════════════════════════════════════════════════
OUTPUT FORMAT — STRICT JSON (no markdown fences, no commentary)
═══════════════════════════════════════════════════════════════════════

Return a single JSON object matching this TypeScript type exactly. Do NOT
wrap it in markdown fences. Do NOT add any text before or after the JSON.
Do NOT use // comments inside the JSON. Every string value must be a
complete, polished sentence or paragraph (not a placeholder).

Use this exact shape (fill every field; omit nothing):

{
  "slug": "${brief.slug}",
  "category": "${brief.category}",
  "categoryLabel": "${brief.categoryLabel}",
  "title": "<8-12 word page title>",
  "description": "<1-2 sentence short description for cards/meta>",
  "detailedDescription": "<3-5 sentence longer description>",
  "iconName": "${brief.iconName}",
  "eyebrow": "<cluster label, e.g. 'AI & Machine Learning'>",
  "gradient": "from-brand-pink/20 via-brand-blue/10 to-transparent",
  "glow": "shadow-[0_0_120px_-30px_rgba(255,83,169,0.4)]",
  "items": ["<4-8 capability bullets, each a single sentence>"],
  "results": [
    { "label": "<short label>", "value": "<specific metric, e.g. '92%'>" },
    { "label": "<short label>", "value": "<specific metric>" },
    { "label": "<short label>", "value": "<specific metric>" },
    { "label": "<short label>", "value": "<specific metric>" }
  ],
  "differentiators": ["<3-5 single-sentence differentiators>"],
  "deliverables": ["<5-8 deliverable bullets>"],
  "faq": [
    { "q": "<question>", "a": "<2-4 sentence answer>" }
  ],
  "processSteps": [
    { "title": "<step title>", "description": "<3-4 sentences>", "duration": "<e.g. 'Week 1'>" }
  ],
  "pricingPackages": [
    {
      "package_level": "Basic",
      "price": "$<amount>",
      "delivery_days": "<N>",
      "description": "<2-3 sentences>",
      "features": ["<5-8 feature bullets>"]
    }
  ],
  "deepDive": {
    "geoDefinition": "<3-sentence encyclopedic definition>",
    "heroSubtitle": "<35-60 word subtitle>",
    "problem": {
      "intro": ["<paragraph 1>", "<paragraph 2>"],
      "painPoints": [
        { "title": "<short title>", "description": "<2-3 sentences>" }
      ],
      "paradigmShift": ["<paragraph>", "<paragraph>"]
    },
    "deepDive": {
      "intro": ["<paragraph 1>", "<paragraph 2>"],
      "subsections": [
        { "heading": "<H3>", "body": ["<paragraph>", "<paragraph>"] }
      ]
    },
    "techStack": {
      "intro": ["<paragraph>"],
      "categories": [
        { "name": "<category name>", "items": [
          { "name": "<tool>", "description": "<1 sentence>" }
        ] }
      ]
    },
    "methodology": {
      "intro": ["<paragraph>"],
      "steps": [
        {
          "phase": "Phase 1",
          "title": "<step title>",
          "duration": "<e.g. 'Week 1-2'>",
          "deliverables": ["<bullet>"],
          "description": "<3-4 sentences>"
        }
      ]
    },
    "useCases": {
      "intro": ["<paragraph>"],
      "cases": [
        { "industry": "<industry>", "problem": "<2 sentences>", "application": "<2 sentences>", "result": "<1-2 sentences with metric>" }
      ]
    },
    "comparison": {
      "intro": ["<paragraph>"],
      "tables": [
        { "title": "<table title>", "headers": ["Criterion", "Approach A", "Approach B", "Approach C"], "rows": [["...", "...", "...", "..."]] }
      ]
    },
    "businessImpact": {
      "intro": ["<paragraph>"],
      "metrics": [
        { "value": "<e.g. '3.4x'>", "label": "<short label>", "description": "<1-2 sentences>" }
      ],
      "body": ["<paragraph>", "<paragraph>"]
    },
    "integrations": {
      "intro": ["<paragraph>"],
      "categories": [
        { "name": "<category>", "items": ["<tool>", "<tool>"] }
      ],
      "compliance": ["<framework>"]
    },
    "caseStudies": {
      "intro": ["<paragraph>"],
      "studies": [
        {
          "client": "<anonymized client>",
          "situation": "<2-3 sentences>",
          "task": "<2-3 sentences>",
          "action": "<4-6 sentences with technical specifics>",
          "result": "<3-4 sentences with concrete metrics>",
          "quote": { "text": "<pull quote>", "author": "<name>", "title": "<role>" }
        }
      ]
    },
    "faq": {
      "intro": ["<paragraph>"],
      "categories": [
        { "name": "Technical", "questions": [
          { "q": "<question>", "a": "<2-4 sentence answer>" }
        ] }
      ]
    },
    "finalCta": {
      "title": "Ready to <outcome>?",
      "subtitle": "<risk-reversal sentence>",
      "steps": [
        { "step": "1", "title": "<title>", "description": "<1-2 sentences>" }
      ],
      "primaryCta": { "label": "Book a free consultation", "href": "/contact" },
      "secondaryCta": { "label": "View pricing", "href": "/pricing" }
    },
    "internalLinks": [
      { "anchorText": "<anchor>", "href": "/services/${brief.category}", "type": "cluster-to-pillar" },
      { "anchorText": "<anchor>", "href": "/services/${brief.category}/<sibling>", "type": "sibling-to-sibling" }
    ]
  },
  "qa": {
    "wordCount": <number>,
    "sectionWordCounts": { "hero": <n>, "problem": <n>, "deepDive": <n>, "techStack": <n>, "methodology": <n>, "useCases": <n>, "comparison": <n>, "businessImpact": <n>, "integrations": <n>, "caseStudies": <n>, "faq": <n>, "finalCta": <n> },
    "forbiddenPhrasesUsed": [<list any forbidden phrases you accidentally used; empty array if none>],
    "longestSentenceWords": <number>,
    "caseStudiesCount": <number>,
    "faqCount": <number>,
    "internalLinksCount": <number>
  }
}

Now produce the page.`;
}

// ─── User message (the brief) ───────────────────────────────────────────────

export function buildUserMessage(brief: GenerationBrief): string {
  const caseStudiesBlock = (brief.caseStudies || []).map((c, i) =>
    `  Case ${i + 1}: ${c.client}
    Situation: ${c.situation}
    Task: ${c.task}
    Action: ${c.action}
    Result: ${c.result}`
  ).join("\n") || "  (No case studies provided — invent 1-2 plausible anonymized client stories with concrete metrics.)";

  return `Author a new ClickTake deep-dive page with these specifications.

SERVICE:
  Slug: ${brief.slug}
  Title: ${brief.title}
  Cluster: ${brief.category}
  Category label: ${brief.categoryLabel}
  Icon name: ${brief.iconName}

TARGET READER:
  Role: ${brief.targetReader.role}
  Company size: ${brief.targetReader.companySize}
  Pain: ${brief.targetReader.pain}
  Buying trigger: ${brief.targetReader.buyingTrigger}

TECHNICAL SCOPE:
  Core concept definition (anchor for Section 3): ${brief.coreConceptDefinition}
  Key technologies: ${brief.keyTechnologies}
  Primary use cases:
${brief.primaryUseCases.map((u) => `    - ${u}`).join("\n")}
  Differentiators vs alternatives: ${brief.differentiators}

PROOF:
${caseStudiesBlock}
  Metrics we can disclose: ${brief.metricsToDisclose || "(Invent plausible, specific metrics consistent with the cluster glossary.)"}
  Pricing hint: ${brief.pricingHint || "(Invent 3 tiers — Basic / Standard / Premium — with realistic prices.)"}

HUB & SPOKE LINKING:
  Siblings to link to: ${brief.siblingSlugsToLink.join(", ") || "(invent 2-3 plausible sibling service slugs in the same cluster)"}
  Solution to link to: ${brief.solutionSlugToLink || "(skip if not applicable)"}
  Resource titles to link to: ${brief.resourceTitles?.join("; ") || "(invent 1 plausible blog post title)"}

REMINDERS:
  - Output STRICT JSON only. No markdown fences. No commentary before or after.
  - Word count MUST be ≥ 2,500 across all sections combined.
  - Section 3 MUST open with the 3-sentence encyclopedic definition.
  - FAQ MUST include at least one "What is [concept]?" question.
  - Weave 4-7 internal links into body copy and record them in deepDive.internalLinks.
  - 0 forbidden phrases. 0 sentences over 28 words.
  - Every metric must be specific (no "high" / "many" / "significant").
  - Fill the qa block honestly (the server will validate).`;
}
