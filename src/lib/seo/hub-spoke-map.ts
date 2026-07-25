/**
 * Hub & Spoke SEO Architecture — Cluster ↔ Pillar ↔ Sibling linking map.
 *
 * This is the single source of truth for the ClickTake SEO silo structure.
 * Every DeepDive page consumes this map to auto-render:
 *
 *   1. **Cluster-to-Pillar link** (within first 200 words) — `pillar` field.
 *      Injected by <PillarContextBanner /> immediately after the hero so
 *      search engines and AI engines see the parent topic link early.
 *
 *   2. **Sibling-to-Sibling cross-links** — `siblings` field. Injected by
 *      <RelatedResources /> in the page footer as "Related Services".
 *
 *   3. **Solution-to-Service bridge** — `bridgeTo` field on solution pages
 *      lists service slugs that the solution naturally links to. Anchor
 *      text is derived from the service title.
 *
 *   4. **Related Resources footer** — `resources` field. Mandatory on
 *      every page per the design brief. Categories: Blogs & Guides,
 *      Case Studies, Pricing & Resources.
 *
 * Adding a new deep-dive page:
 *   1. Author content in /src/content/deep-dive/<slug>.ts
 *   2. Register it in the appropriate page.tsx DEEP_DIVE_CONTENT map
 *   3. Add an entry to HUB_SPOKE_MAP below with cluster/pillar/siblings
 *
 * See /download/clicktake-enterprise-design-brief.pdf §Pillar 2 for the
 * full Hub & Spoke specification.
 */

export type ContentCluster =
  | "ai"
  | "web"
  | "marketing"
  | "creative"
  | "solution"
  | "company";

export type ResourceLink = {
  /** Display label (anchor text — keep descriptive, keyword-rich) */
  label: string;
  /** Internal path or external URL */
  href: string;
  /** Optional 1-line description shown beneath the label */
  blurb?: string;
};

export type HubSpokeEntry = {
  /** Slug matching the key in DEEP_DIVE_CONTENT (e.g. "ai/llm", "startups") */
  slug: string;
  /** Cluster this page belongs to */
  cluster: ContentCluster;
  /**
   * Pillar page — the cluster's hub. Injected as Cluster-to-Pillar link
   * within the first 200 words. For services, pillar = the cluster
   * landing page (/services/ai, /services/web, etc). For solutions, the
   * pillar is /solutions itself.
   */
  pillar: { label: string; href: string };
  /**
   * Sibling pages — other services/solutions in the same cluster.
   * Used for Sibling-to-Sibling cross-linking in Related Resources.
   * Limit to 4 most-relevant siblings to keep the UI clean.
   */
  siblings: ResourceLink[];
  /**
   * Solution-to-Service bridge — only populated on solution pages.
   * Lists service slugs whose pages should be linked as natural next
   * steps. Anchor text comes from the service title.
   */
  bridgeTo?: string[];
  /**
   * Related Resources — blogs, case studies, pricing, calculators.
   * Mandatory on every page per the design brief.
   */
  resources: {
    blogs?: ResourceLink[];
    caseStudies?: ResourceLink[];
    pricing?: ResourceLink[];
  };
};

/* ─── Cluster pillar pages ────────────────────────────────────────────── */
const PILLARS = {
  ai: { label: "AI & Machine Learning Services", href: "/services/ai" },
  web: { label: "Web & Software Development", href: "/services/web" },
  marketing: {
    label: "Digital Marketing & Growth",
    href: "/services/digital-marketing",
  },
  creative: { label: "Creative & Brand Design", href: "/services/creative" },
  solution: { label: "Industry Solutions", href: "/solutions" },
  company: { label: "About ClickTake Technologies", href: "/about" },
} as const;

/* ─── Shared resource links (used across multiple pages) ──────────────── */
const SHARED_RESOURCES = {
  pricing: {
    label: "View Pricing & Packages",
    href: "/pricing",
    blurb: "Transparent retainer + project pricing for every engagement size.",
  },
  contact: {
    label: "Book a Free 30-min Consultation",
    href: "/contact",
    blurb: "Talk to a senior strategist — no sales pitch, no commitment.",
  },
  portfolio: {
    label: "Explore Client Work",
    href: "/portfolio",
    blurb: "Case studies, before/after redesigns, and measurable outcomes.",
  },
  about: {
    label: "About ClickTake Technologies",
    href: "/about",
    blurb: "How we engineer scalable digital ecosystems for global clients.",
  },
} as const;

/* ─── The Map ─────────────────────────────────────────────────────────── */
export const HUB_SPOKE_MAP: Record<string, HubSpokeEntry> = {
  /* ═════════════════════════════ AI CLUSTER ═════════════════════════════ */
  "ai/llm": {
    slug: "ai/llm",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Conversational agents that resolve 70%+ of tier-1 support tickets." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Production-grade prompt libraries with eval harnesses." },
      { label: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Vision models for OCR, defect detection, and document intelligence." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Multi-step agentic workflows that eliminate manual ops." },
    ],
    resources: {
      blogs: [
        { label: "RAG Architecture: A Production Guide", href: "/blog/rag-architecture-guide", blurb: "Chunking strategies, embedding models, and retrieval evaluation." },
        { label: "LLM Guardrails: OWASP Top 10 for LLMs", href: "/blog/llm-guardrails-owasp", blurb: "Prompt injection, data leakage, and model supply-chain risk." },
      ],
      caseStudies: [
        { label: "FinTech RAG Assistant — 92% Citation Accuracy", href: "/case-studies/fintech-rag-assistant", blurb: "Retrieval-augmented assistant for a UK wealth-management platform." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "ai/chatbots": {
    slug: "ai/chatbots",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Production LLM hosting, fine-tuning, and inference optimization." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Eval-driven prompt libraries with regression testing." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Connect chatbots to CRM, ticketing, and knowledge bases." },
      { label: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Voice + text multi-modal assistants." },
    ],
    resources: {
      blogs: [
        { label: "Designing Conversational AI That Doesn't Hallucinate", href: "/blog/conversational-ai-hallucination-control", blurb: "Grounding, retrieval, and confidence-threshold patterns." },
        { label: "Measuring Chatbot ROI: 7 KPIs That Matter", href: "/blog/chatbot-roi-kpis", blurb: "CSAT, FCR, deflection rate, and time-to-resolution benchmarks." },
      ],
      caseStudies: [
        { label: "E-commerce Support Bot — 68% Ticket Deflection", href: "/case-studies/ecommerce-support-bot", blurb: "Replaced tier-1 Zendesk queue with a GPT-4o assistant." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "ai/prompt-engineering": {
    slug: "ai/prompt-engineering",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Foundation models behind production prompt systems." },
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Prompt-driven conversational agents." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Prompt chains and agentic orchestration." },
      { label: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Structured-output prompts for document extraction." },
    ],
    resources: {
      blogs: [
        { label: "The Prompt Evaluation Playbook", href: "/blog/prompt-evaluation-playbook", blurb: "Build regression suites that catch prompt regressions before prod." },
        { label: "Structured Outputs with JSON Schema + OpenAI", href: "/blog/structured-outputs-json-schema", blurb: "Reliable function calling for downstream automation." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "ai/cv-nlp": {
    slug: "ai/cv-nlp",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Text generation backbone for NLP pipelines." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Chain CV/NLP models into automated document flows." },
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Multi-modal assistants with vision input." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Structured-output prompts for extraction tasks." },
    ],
    resources: {
      blogs: [
        { label: "OCR vs Vision LLMs: When to Use Each", href: "/blog/ocr-vs-vision-llms", blurb: "Accuracy, cost, and latency tradeoffs for document processing." },
        { label: "Building a Production Document Intelligence Pipeline", href: "/blog/document-intelligence-pipeline", blurb: "Ingest, classify, extract, validate, route." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "ai/automation": {
    slug: "ai/automation",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Conversation-driven workflow triggers." },
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Inference layer for agentic decisioning." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Chain-of-thought prompts for multi-step tasks." },
      { label: "Web & Software Development", href: "/services/web/full-stack", blurb: "Custom workflow orchestration platforms." },
    ],
    resources: {
      blogs: [
        { label: "Agentic Workflows: A Practical Architecture", href: "/blog/agentic-workflows-architecture", blurb: "Planner-executor patterns, tool use, and human-in-the-loop." },
        { label: "Integrating AI with Make, n8n, and Zapier", href: "/blog/ai-automation-make-n8n-zapier", blurb: "When to use a no-code tool vs a custom orchestration layer." },
      ],
      caseStudies: [
        { label: "Insurance Claims Automation — 84% Time Savings", href: "/case-studies/insurance-claims-automation", blurb: "Agentic pipeline that triages, extracts, and routes claims." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },

  /* ═══════════════════════════ WEB CLUSTER ═════════════════════════════ */
  "web/full-stack": {
    slug: "web/full-stack",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "SaaS Platform Development", href: "/services/web/saas", blurb: "Multi-tenant SaaS with billing, RBAC, and analytics." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Bespoke line-of-business applications." },
      { label: "Python Backend Development", href: "/services/web/python-backend", blurb: "FastAPI, Django, and async Python services." },
      { label: "Authentication & Security", href: "/services/web/auth", blurb: "OAuth, SSO, MFA, and zero-trust architectures." },
    ],
    resources: {
      blogs: [
        { label: "Microservices vs Monolith: A 2026 Decision Framework", href: "/blog/microservices-vs-monolith", blurb: "When the operational tax of microservices is worth paying." },
        { label: "CI/CD Pipelines for Next.js + Prisma Stack", href: "/blog/cicd-nextjs-prisma", blurb: "Preview environments, schema migrations, zero-downtime deploys." },
      ],
      caseStudies: [
        { label: "Healthcare SaaS — HIPAA-compliant Multi-tenant Platform", href: "/case-studies/healthcare-saas-platform", blurb: "Built on Next.js, Postgres, and a SOC 2 control surface." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/saas": {
    slug: "web/saas",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "The engineering backbone for SaaS products." },
      { label: "Authentication & Security", href: "/services/web/auth", blurb: "Multi-tenant auth, RBAC, and audit logging." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "SaaS extensions and integrations." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "SLA-backed ongoing engineering." },
    ],
    resources: {
      blogs: [
        { label: "Multi-tenant Data Architectures: A Comparative Guide", href: "/blog/multi-tenant-data-architectures", blurb: "Shared DB, schema-per-tenant, or DB-per-tenant — tradeoffs." },
        { label: "SaaS Pricing Page Design That Converts", href: "/blog/saas-pricing-page-design", blurb: "Anchoring, tier naming, and feature gating." },
      ],
      caseStudies: [
        { label: "B2B SaaS — 0 → 1,200 Paying Customers in 14 Months", href: "/case-studies/b2b-saas-growth", blurb: "Full-stack build + iterative pricing optimization." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/auth": {
    slug: "web/auth",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Auth integrated into Next.js + tRPC apps." },
      { label: "SaaS Platform Development", href: "/services/web/saas", blurb: "Multi-tenant auth for SaaS products." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Enterprise SSO and directory sync." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Quarterly security audits and patch management." },
    ],
    resources: {
      blogs: [
        { label: "OAuth 2.0 Flows: Which One Should You Use?", href: "/blog/oauth-2-flows-explained", blurb: "Authorization Code, PKCE, Client Credentials, Device Code." },
        { label: "Zero Trust for Web Apps: A Practical Implementation", href: "/blog/zero-trust-web-apps", blurb: "Identity-aware proxies, mTLS, and short-lived tokens." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/python-backend": {
    slug: "web/python-backend",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Python backends paired with Next.js frontends." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Python orchestration for agentic pipelines." },
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "FastAPI inference servers for LLMs." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Heavy-compute backend services." },
    ],
    resources: {
      blogs: [
        { label: "FastAPI vs Django vs Flask in 2026", href: "/blog/fastapi-vs-django-vs-flask", blurb: "Performance, ecosystem, and team-skill tradeoffs." },
        { label: "Async Python at Scale: asyncio + uvicorn", href: "/blog/async-python-at-scale", blurb: "Event-loop pitfalls, backpressure, and observability." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/wordpress": {
    slug: "web/wordpress",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Modernize legacy WordPress sites with Next.js headless." },
      { label: "E-commerce Development", href: "/services/web/ecommerce", blurb: "WooCommerce → Shopify → headless commerce migrations." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "WordPress core, plugin, and security updates." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Headless WordPress + Next.js frontends." },
    ],
    resources: {
      blogs: [
        { label: "Headless WordPress: When It's Worth the Migration", href: "/blog/headless-wordpress-migration", blurb: "Performance, editor experience, and total cost of ownership." },
        { label: "WordPress Security Hardening Checklist", href: "/blog/wordpress-security-checklist", blurb: "12 controls every WP site should enforce." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/ecommerce": {
    slug: "web/ecommerce",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Conversion-focused storefront redesigns." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Custom commerce backends and headless storefronts." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Funnel diagnostics and A/B testing programs." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "PCI-DSS scans and uptime monitoring." },
    ],
    resources: {
      blogs: [
        { label: "Shopify vs Headless Commerce: 2026 TCO Analysis", href: "/blog/shopify-vs-headless-commerce", blurb: "Total cost of ownership across 3 years." },
        { label: "E-commerce Site Speed: A Revenue Equation", href: "/blog/ecommerce-site-speed-revenue", blurb: "Every 100ms of LCP improvement equals measurable revenue lift." },
      ],
      caseStudies: [
        { label: "DTC Fashion Brand — 41% Revenue Lift from Headless Replatform", href: "/case-studies/dtc-fashion-headless-replatform", blurb: "Next.js + Shopify Hydrogen + Algolia." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/custom-software": {
    slug: "web/custom-software",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Bespoke web applications." },
      { label: "SaaS Platform Development", href: "/services/web/saas", blurb: "Productize custom software as SaaS." },
      { label: "Python Backend Development", href: "/services/web/python-backend", blurb: "Heavy-data backend services." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Long-term stewardship of custom builds." },
    ],
    resources: {
      blogs: [
        { label: "Build vs Buy vs Open-Source: A Decision Matrix", href: "/blog/build-vs-buy-decision-matrix", blurb: "Total cost of ownership, lock-in, and team capability." },
        { label: "Designing for Extensibility: Plugin Architectures 101", href: "/blog/plugin-architectures-101", blurb: "Webhooks, events, and SDK patterns." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/maintenance": {
    slug: "web/maintenance",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "When maintenance isn't enough — modernize." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Handover from build to ongoing care." },
      { label: "Web Domain & Hosting", href: "/services/web/domain-hosting", blurb: "Managed infrastructure underpinning SLAs." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Legacy system stewardship." },
    ],
    resources: {
      blogs: [
        { label: "The True Cost of Downtime: A Calculator", href: "/blog/cost-of-downtime-calculator", blurb: "Revenue, reputation, and recovery cost models." },
        { label: "SLA Templates for Web Application Support", href: "/blog/sla-templates-web-apps", blurb: "Response times, escalation paths, and credit structures." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/redesign": {
    slug: "web/redesign",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "UX-led design before rebuild." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Engineering execution of redesigns." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Pre-redesign CRO audit prevents costly mistakes." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Post-launch iteration." },
    ],
    resources: {
      blogs: [
        { label: "The Website Redesign Playbook (Without Killing SEO)", href: "/blog/website-redesign-playbook", blurb: "301 maps, content audits, and redirect testing." },
        { label: "When to Redesign vs When to Iterate", href: "/blog/redesign-vs-iterate", blurb: "Decision criteria beyond 'it looks dated'." },
      ],
      caseStudies: [
        { label: "B2B SaaS Redesign — 28% Lift in Demo Conversions", href: "/case-studies/b2b-saas-redesign", blurb: "Full rebrand + Next.js rebuild + IA overhaul." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "web/domain-hosting": {
    slug: "web/domain-hosting",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Infrastructure + application support bundle." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Greenfield deployments." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Private cloud environments." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Migrations as part of redesign." },
    ],
    resources: {
      blogs: [
        { label: "Vercel vs AWS vs Self-Hosted: 2026 Hosting Guide", href: "/blog/vercel-vs-aws-vs-self-hosted", blurb: "Latency, cost, and operational overhead compared." },
        { label: "Domain DNS Best Practices for SaaS", href: "/blog/domain-dns-best-practices", blurb: "CNAME flattening, SPF/DKIM/DMARC, and DNSSEC." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },

  /* ════════════════════════ MARKETING CLUSTER ══════════════════════════ */
  "digital-marketing/paid-advertising": {
    slug: "digital-marketing/paid-advertising",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Land more of the traffic you pay for." },
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Organic moat to reduce paid dependency." },
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Long-term compounding traffic." },
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Paid social + organic synergy." },
    ],
    resources: {
      blogs: [
        { label: "ROAS vs LTV/CAC: The Metric That Actually Matters", href: "/blog/roas-vs-ltv-cac", blurb: "Why ROAS alone misleads growth-stage brands." },
        { label: "Attribution in a Post-Cookie World", href: "/blog/attribution-post-cookie", blurb: "Server-side tracking, MMM, and incrementality testing." },
      ],
      caseStudies: [
        { label: "DTC Brand — 4.2x ROAS at 8-figure Scale", href: "/case-studies/dtc-paid-advertising-roas", blurb: "Meta + Google + TikTok with server-side conversions." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "digital-marketing/content-strategy": {
    slug: "digital-marketing/content-strategy",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Technical + on-page SEO foundation." },
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "Content-first design systems." },
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Distribute content across channels." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Amplify hero content." },
    ],
    resources: {
      blogs: [
        { label: "The Content Pillar Strategy: A 2026 Implementation Guide", href: "/blog/content-pillar-strategy", blurb: "Topic clusters, internal linking, and editorial calendars." },
        { label: "Generative Engine Optimization (GEO) for AI Search", href: "/blog/generative-engine-optimization", blurb: "How to get cited in ChatGPT, Perplexity, and Google AI Overviews." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "digital-marketing/cro": {
    slug: "digital-marketing/cro",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Send qualified traffic to optimized funnels." },
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "UX improvements that compound CRO gains." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "When CRO hits diminishing returns." },
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Pre-qualification via intent-matched SEO." },
    ],
    resources: {
      blogs: [
        { label: "The CRO Experimentation Hierarchy", href: "/blog/cro-experimentation-hierarchy", blurb: "From heuristic audits to multi-variate tests." },
        { label: "Statistical Significance for A/B Tests Without the Math", href: "/blog/ab-test-statistical-significance", blurb: "Practical p-values, power, and sample size." },
      ],
      caseStudies: [
        { label: "SaaS Trial Funnel — 19% → 34% Activation in 90 Days", href: "/case-studies/saas-trial-funnel-cro", blurb: "Funnel diagnostics + 14 shipped experiments." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "seo": {
    slug: "seo",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Editorial engine that powers SEO." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Convert organic traffic into pipeline." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Core Web Vitals + IA alignment." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Technical SEO infrastructure." },
    ],
    resources: {
      blogs: [
        { label: "Programmatic SEO: Scaling to 10,000+ Pages", href: "/blog/programmatic-seo", blurb: "Page templates, data sources, and indexation strategy." },
        { label: "Core Web Vitals 2026: INP, LCP, and CLS Targets", href: "/blog/core-web-vitals-2026", blurb: "What Google measures now and how to fix common failures." },
      ],
      caseStudies: [
        { label: "Local Services Brand — 312% Organic Growth in 11 Months", href: "/case-studies/local-services-organic-growth", blurb: "Technical SEO + content sprint + local link building." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "digital-marketing/social-media": {
    slug: "digital-marketing/social-media",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Editorial backbone for social distribution." },
      { label: "Creative Video Production", href: "/services/creative/video-production", blurb: "Short-form video for social platforms." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Paid social amplification." },
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Social templates and brand systems." },
    ],
    resources: {
      blogs: [
        { label: "Organic Social Reach Is Dead. Here's What Replaced It.", href: "/blog/organic-social-reach-dead", blurb: "Why owned audience + paid amplification wins in 2026." },
        { label: "Short-Form Video Production at Scale", href: "/blog/short-form-video-at-scale", blurb: "Batch production, templating, and creator networks." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },

  /* ════════════════════════ CREATIVE CLUSTER ═══════════════════════════ */
  "creative/graphic-design": {
    slug: "creative/graphic-design",
    cluster: "creative",
    pillar: PILLARS.creative,
    siblings: [
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "Design systems for digital products." },
      { label: "Creative Video Production", href: "/services/creative/video-production", blurb: "Motion design and brand films." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Brand refresh rolled into a rebuild." },
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Visual language for content distribution." },
    ],
    resources: {
      blogs: [
        { label: "Brand Systems: From Logo to Design Tokens", href: "/blog/brand-systems-design-tokens", blurb: "Operationalize brand across Figma, code, and docs." },
        { label: "Color Contrast for Brand Designers", href: "/blog/color-contrast-brand-designers", blurb: "WCAG AA/AAA without sacrificing aesthetic." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "creative/web-design": {
    slug: "creative/web-design",
    cluster: "creative",
    pillar: PILLARS.creative,
    siblings: [
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Visual identity that informs UX." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Engineering execution of designs." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Design-led rebuilds." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "UX patterns that convert." },
    ],
    resources: {
      blogs: [
        { label: "Design Systems: A 2026 Maturity Model", href: "/blog/design-systems-maturity-model", blurb: "From style guide to design ops." },
        { label: "Accessibility-First Design: A Practical Workflow", href: "/blog/accessibility-first-design", blurb: "Inclusive design without compromise." },
      ],
      caseStudies: [
        { label: "Fintech App — WCAG 2.2 AAA + 22% Activation Lift", href: "/case-studies/fintech-accessibility-redesign", blurb: "Inclusive design that also grew conversions." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "creative/video-production": {
    slug: "creative/video-production",
    cluster: "creative",
    pillar: PILLARS.creative,
    siblings: [
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Distribution for short-form video." },
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Thumbnails, lower-thirds, motion graphics." },
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Video as a content pillar." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Video creative for paid social." },
    ],
    resources: {
      blogs: [
        { label: "The Video Production Brief Template", href: "/blog/video-production-brief-template", blurb: "Briefs that prevent expensive reshoots." },
        { label: "Editing for Short-Form: Hook, Hold, Payoff", href: "/blog/short-form-video-editing", blurb: "First 1.5 seconds, retention curves, payoff patterns." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },

  /* ════════════════════════ SOLUTION CLUSTER ═══════════════════════════ */
  startups: {
    slug: "startups",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Pre-seed to Series B commerce." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "White-label engineering capacity." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "FCA-aware builds for UK founders." },
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Bootstrapped local commerce." },
    ],
    bridgeTo: [
      "web/full-stack",
      "web/saas",
      "ai/automation",
      "digital-marketing/paid-advertising",
      "creative/web-design",
    ],
    resources: {
      blogs: [
        { label: "MVP Scope: What to Build First, What to Cut", href: "/blog/mvp-scoping", blurb: "The ruthless prioritization framework." },
        { label: "Pre-Seed Tech Due Diligence Checklist", href: "/blog/tech-due-diligence-checklist", blurb: "What investors actually ask about your stack." },
      ],
      caseStudies: [
        { label: "Pre-seed → Series A: 14-month Engineering Sprint", href: "/case-studies/startup-series-a-sprint", blurb: "0 → 12k MAU with a 3-engineer team." },
      ],
      pricing: [
        { label: "Starter Kit for Founders", href: "/services/starter-kit", blurb: "Fixed-scope MVP package." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact,
      ],
    },
  },
  "local-businesses": {
    slug: "local-businesses",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Repair Shops", href: "/solutions/repair-shops", blurb: "Booking + POS + inventory." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "Local SEO + UK compliance." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Local-to-global growth." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Local fulfillment + online sales." },
    ],
    bridgeTo: [
      "seo",
      "web/wordpress",
      "web/ecommerce",
      "creative/web-design",
      "digital-marketing/social-media",
    ],
    resources: {
      blogs: [
        { label: "Local SEO: Google Business Profile Optimization", href: "/blog/local-seo-gbp-optimization", blurb: "Rank in the local pack without paid ads." },
        { label: "Online Booking Systems for Service Businesses", href: "/blog/online-booking-systems", blurb: "Calendly vs Cal.com vs custom." },
      ],
      pricing: [
        { label: "Starter Kit for Local Businesses", href: "/services/starter-kit", blurb: "Get online in 2 weeks." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact,
      ],
    },
  },
  "ecommerce-brands": {
    slug: "ecommerce-brands",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "DTC brand launches." },
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local + online commerce." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "GDPR-compliant commerce." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "White-label commerce builds." },
    ],
    bridgeTo: [
      "web/ecommerce",
      "digital-marketing/paid-advertising",
      "digital-marketing/cro",
      "creative/video-production",
      "web/maintenance",
    ],
    resources: {
      blogs: [
        { label: "DTC Unit Economics: The 30/30/30 Rule", href: "/blog/dtc-unit-economics", blurb: "COGS, CAC, and contribution margin." },
        { label: "Subscription Commerce: Build vs Buy", href: "/blog/subscription-commerce-build-vs-buy", blurb: "Recharge, Ordergroove, or custom?" },
      ],
      caseStudies: [
        { label: "DTC Skincare — $0 → $4M ARR in 18 Months", href: "/case-studies/dtc-skincare-growth", blurb: "Headless commerce + paid social + CRO." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  "repair-shops": {
    slug: "repair-shops",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Broader local-business playbook." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "UK repair shop compliance." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Tech-enabled repair networks." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Sell parts online." },
    ],
    bridgeTo: [
      "web/wordpress",
      "web/custom-software",
      "seo",
      "digital-marketing/social-media",
    ],
    resources: {
      blogs: [
        { label: "POS Integration Patterns for Repair Shops", href: "/blog/pos-integration-repair-shops", blurb: "Square, Shopify POS, or custom?" },
        { label: "Inventory Management for High-SKU Service Businesses", href: "/blog/inventory-management-high-sku", blurb: "Reorder points, ABC analysis, and dead stock." },
      ],
      pricing: [
        { label: "Starter Kit for Repair Shops", href: "/services/starter-kit", blurb: "Booking + inventory + POS in one package." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact,
      ],
    },
  },
  "uk-businesses": {
    slug: "uk-businesses",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local SEO across UK regions." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "UK-based founder playbook." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "UK commerce compliance." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "UK white-label partner." },
    ],
    bridgeTo: [
      "web/full-stack",
      "web/auth",
      "seo",
      "digital-marketing/content-strategy",
    ],
    resources: {
      blogs: [
        { label: "UK GDPR vs EU GDPR: What's Different in 2026", href: "/blog/uk-gdpr-vs-eu-gdpr", blurb: "Practical implications for UK SaaS." },
        { label: "FCA Compliance for Fintech Websites", href: "/blog/fca-compliance-fintech", blurb: "Regulatory disclosures, KYC, and audit trails." },
      ],
      caseStudies: [
        { label: "UK WealthTech — FCA-compliant Client Portal", href: "/case-studies/uk-wealthtech-fca-portal", blurb: "Built on Next.js + Postgres + audit logging." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  agencies: {
    slug: "agencies",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Founders who need an engineering partner." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Commerce builds for agency clients." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "UK-specific compliance layer." },
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local SEO capacity." },
    ],
    bridgeTo: [
      "web/full-stack",
      "web/wordpress",
      "creative/web-design",
      "digital-marketing/content-strategy",
      "ai/automation",
    ],
    resources: {
      blogs: [
        { label: "White-Label Engineering Partnership Models", href: "/blog/white-label-engineering-models", blurb: "Retainer, project, or staff augmentation." },
        { label: "How to Brief an External Engineering Team", href: "/blog/briefing-external-engineering-team", blurb: "PRDs, acceptance criteria, and async rituals." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },

  /* ════════════════════════ COMPANY CLUSTER ════════════════════════════ */
  "starter-kit": {
    slug: "starter-kit",
    cluster: "company",
    pillar: PILLARS.company,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Beyond the starter kit." },
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "Design system foundation." },
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Day-1 SEO setup." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Broader founder playbook." },
    ],
    resources: {
      blogs: [
        { label: "MVP in 2 Weeks: Realistic or Hype?", href: "/blog/mvp-in-2-weeks", blurb: "What's possible, what isn't, and what to do instead." },
        { label: "The Founder's Tech Stack Decision Tree", href: "/blog/founder-tech-stack-decision-tree", blurb: "Next.js, Webflow, WordPress, Shopify, or custom?" },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  },
  about: {
    slug: "about",
    cluster: "company",
    pillar: PILLARS.company,
    siblings: [
      { label: "Our Team", href: "/team", blurb: "The senior engineers and designers behind the work." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "How we partner with founders." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "Our white-label partnership model." },
      { label: "Starter Kit", href: "/services/starter-kit", blurb: "A low-risk way to start working together." },
    ],
    resources: {
      blogs: [
        { label: "How We Hire Engineers", href: "/blog/how-we-hire-engineers", blurb: "Our 5-stage technical interview process." },
        { label: "The ClickTake Engineering Principles", href: "/blog/engineering-principles", blurb: "The 7 rules we hold ourselves to." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact, SHARED_RESOURCES.portfolio],
    },
  },
  team: {
    slug: "team",
    cluster: "company",
    pillar: PILLARS.company,
    siblings: [
      { label: "About ClickTake Technologies", href: "/about", blurb: "Our story and engineering principles." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Founders we've partnered with." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "Our white-label partnerships." },
      { label: "Starter Kit", href: "/services/starter-kit", blurb: "Work with our team — low commitment." },
    ],
    resources: {
      blogs: [
        { label: "Careers at ClickTake", href: "/careers", blurb: "Open engineering, design, and PM roles." },
        { label: "Our Engineering Ladder", href: "/blog/engineering-ladder", blurb: "L3 → L6 expectations and progression." },
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact, SHARED_RESOURCES.portfolio],
    },
  },
};

/**
 * Resolve a Hub & Spoke entry by slug. Returns `undefined` for slugs not
 * yet in the map (e.g. legacy pages still on ServiceDetailPage). The
 * DeepDiveLayout gracefully handles a missing entry — Related Resources
 * and Pillar Banner simply don't render.
 */
export function getHubSpokeEntry(slug: string): HubSpokeEntry | undefined {
  return HUB_SPOKE_MAP[slug];
}

/**
 * Build a fallback entry for a slug that's in DEEP_DIVE_CONTENT but not
 * yet in HUB_SPOKE_MAP. Uses sane defaults so Related Resources always
 * renders something useful while content teams catch up.
 */
export function fallbackHubSpokeEntry(
  slug: string,
  cluster: ContentCluster,
): HubSpokeEntry {
  return {
    slug,
    cluster,
    pillar: PILLARS[cluster],
    siblings: [],
    resources: {
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact],
    },
  };
}
