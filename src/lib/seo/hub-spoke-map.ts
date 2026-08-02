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
    href: "/services/digital-marketing"
  },
  creative: { label: "Creative & Brand Design", href: "/services/creative" },
  solution: { label: "Industry Solutions", href: "/solutions" },
  company: { label: "About ClickTake Technologies", href: "/about" }
} as const;

/* ─── Shared resource links (used across multiple pages) ──────────────── */
const SHARED_RESOURCES = {
  pricing: {
    label: "View Pricing & Packages",
    href: "/pricing",
    blurb: "Transparent retainer + project pricing for every engagement size."
  },
  contact: {
    label: "Book a Free 30-min Consultation",
    href: "/contact",
    blurb: "Talk to a senior strategist — no sales pitch, no commitment."
  },
  portfolio: {
    label: "Explore Client Work",
    href: "/portfolio",
    blurb: "Case studies, before/after redesigns, and measurable outcomes."
  },
  about: {
    label: "About ClickTake Technologies",
    href: "/about",
    blurb: "How we engineer scalable digital ecosystems for global clients."
  }
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
      { label: "AI Agent Development", href: "/services/ai/agents", blurb: "Goal-driven autonomous agents with tool use, memory, and planning." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "ai/chatbots": {
    slug: "ai/chatbots",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Production LLM hosting, fine-tuning, and inference optimization." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Eval-driven prompt libraries with regression testing." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Connect chatbots to CRM, ticketing, and knowledge bases." },
      { label: "AI Agent Development", href: "/services/ai/agents", blurb: "Hand complex intents off to a goal-driven backend agent." },
      { label: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Voice + text multi-modal assistants." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "ai/prompt-engineering": {
    slug: "ai/prompt-engineering",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Foundation models behind production prompt systems." },
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Prompt-driven conversational agents." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Prompt chains and agentic orchestration." },
      { label: "AI Agent Development", href: "/services/ai/agents", blurb: "System prompts and tool schemas for autonomous agents." },
      { label: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Structured-output prompts for document extraction." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "ai/cv-nlp": {
    slug: "ai/cv-nlp",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Text generation backbone for NLP pipelines." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Chain CV/NLP models into automated document flows." },
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Multi-modal assistants with vision input." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Structured-output prompts for extraction tasks." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "AI Agent Development", href: "/services/ai/agents", blurb: "Goal-driven agents that pick their own path through workflows." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "ai/agents": {
    slug: "ai/agents",
    cluster: "ai",
    pillar: PILLARS.ai,
    siblings: [
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Workflow-driven orchestration — the natural pairing for goal-driven agents." },
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "Inference layer, fine-tuning, and self-hosted models for agent reasoning." },
      { label: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Eval-driven system prompts and structured-output schemas for tool use." },
      { label: "AI Chatbots & Virtual Assistants", href: "/services/ai/chatbots", blurb: "Conversational front-ends that hand off to backend agents." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "Authentication & Security", href: "/services/web/auth", blurb: "OAuth, SSO, MFA, and zero-trust architectures." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/saas": {
    slug: "web/saas",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "The engineering backbone for SaaS products." },
      { label: "Authentication & Security", href: "/services/web/auth", blurb: "Multi-tenant auth, RBAC, and audit logging." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "SaaS extensions and integrations." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "SLA-backed ongoing engineering." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/auth": {
    slug: "web/auth",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Auth integrated into Next.js + tRPC apps." },
      { label: "SaaS Platform Development", href: "/services/web/saas", blurb: "Multi-tenant auth for SaaS products." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Enterprise SSO and directory sync." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Quarterly security audits and patch management." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/python-backend": {
    slug: "web/python-backend",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Python backends paired with Next.js frontends." },
      { label: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Python orchestration for agentic pipelines." },
      { label: "Large Language Model Deployment", href: "/services/ai/llm", blurb: "FastAPI inference servers for LLMs." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Heavy-compute backend services." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/wordpress": {
    slug: "web/wordpress",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Modernize legacy WordPress sites with Next.js headless." },
      { label: "E-commerce Development", href: "/services/web/ecommerce", blurb: "WooCommerce → Shopify → headless commerce migrations." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "WordPress core, plugin, and security updates." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Headless WordPress + Next.js frontends." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/ecommerce": {
    slug: "web/ecommerce",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Conversion-focused storefront redesigns." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Custom commerce backends and headless storefronts." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Funnel diagnostics and A/B testing programs." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "PCI-DSS scans and uptime monitoring." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/custom-software": {
    slug: "web/custom-software",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Bespoke web applications." },
      { label: "SaaS Platform Development", href: "/services/web/saas", blurb: "Productize custom software as SaaS." },
      { label: "Python Backend Development", href: "/services/web/python-backend", blurb: "Heavy-data backend services." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Long-term stewardship of custom builds." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/maintenance": {
    slug: "web/maintenance",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "When maintenance isn't enough — modernize." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Handover from build to ongoing care." },
      { label: "Web Domain & Hosting", href: "/services/web/domain-hosting", blurb: "Managed infrastructure underpinning SLAs." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Legacy system stewardship." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/redesign": {
    slug: "web/redesign",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "UX-led design before rebuild." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Engineering execution of redesigns." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Pre-redesign CRO audit prevents costly mistakes." },
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Post-launch iteration." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "web/domain-hosting": {
    slug: "web/domain-hosting",
    cluster: "web",
    pillar: PILLARS.web,
    siblings: [
      { label: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "Infrastructure + application support bundle." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Greenfield deployments." },
      { label: "Custom Software Development", href: "/services/web/custom-software", blurb: "Private cloud environments." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Migrations as part of redesign." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Paid social + organic synergy." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "digital-marketing/content-strategy": {
    slug: "digital-marketing/content-strategy",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Technical + on-page SEO foundation." },
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "Content-first design systems." },
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Distribute content across channels." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Amplify hero content." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "digital-marketing/cro": {
    slug: "digital-marketing/cro",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Send qualified traffic to optimized funnels." },
      { label: "Creative Web Design", href: "/services/creative/web-design", blurb: "UX improvements that compound CRO gains." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "When CRO hits diminishing returns." },
      { label: "Search Engine Optimization", href: "/services/seo", blurb: "Pre-qualification via intent-matched SEO." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "seo": {
    slug: "seo",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Editorial engine that powers SEO." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Convert organic traffic into pipeline." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Core Web Vitals + IA alignment." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Technical SEO infrastructure." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "digital-marketing/social-media": {
    slug: "digital-marketing/social-media",
    cluster: "marketing",
    pillar: PILLARS.marketing,
    siblings: [
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Editorial backbone for social distribution." },
      { label: "Creative Video Production", href: "/services/creative/video-production", blurb: "Short-form video for social platforms." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Paid social amplification." },
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Social templates and brand systems." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Visual language for content distribution." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "creative/web-design": {
    slug: "creative/web-design",
    cluster: "creative",
    pillar: PILLARS.creative,
    siblings: [
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Visual identity that informs UX." },
      { label: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Engineering execution of designs." },
      { label: "Web Redesign Services", href: "/services/web/redesign", blurb: "Design-led rebuilds." },
      { label: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "UX patterns that convert." }
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "creative/video-production": {
    slug: "creative/video-production",
    cluster: "creative",
    pillar: PILLARS.creative,
    siblings: [
      { label: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Distribution for short-form video." },
      { label: "Creative Graphic Design", href: "/services/creative/graphic-design", blurb: "Thumbnails, lower-thirds, motion graphics." },
      { label: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Video as a content pillar." },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Video creative for paid social." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Bootstrapped local commerce." }
    ],
    bridgeTo: [
      "web/full-stack",
      "web/saas",
      "ai/automation",
      "digital-marketing/paid-advertising",
      "creative/web-design"
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [
        { label: "Starter Kit for Founders", href: "/services/starter-kit", blurb: "Fixed-scope MVP package." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact
      ]
    }
  },
  "local-businesses": {
    slug: "local-businesses",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Repair Shops", href: "/solutions/repair-shops", blurb: "Booking + POS + inventory." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "Local SEO + UK compliance." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Local-to-global growth." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Local fulfillment + online sales." }
    ],
    bridgeTo: [
      "seo",
      "web/wordpress",
      "web/ecommerce",
      "creative/web-design",
      "digital-marketing/social-media"
    ],
    resources: {
      blogs: [],
      pricing: [
        { label: "Starter Kit for Local Businesses", href: "/services/starter-kit", blurb: "Get online in 2 weeks." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact
      ]
    }
  },
  "ecommerce-brands": {
    slug: "ecommerce-brands",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "DTC brand launches." },
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local + online commerce." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "GDPR-compliant commerce." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "White-label commerce builds." }
    ],
    bridgeTo: [
      "web/ecommerce",
      "digital-marketing/paid-advertising",
      "digital-marketing/cro",
      "creative/video-production",
      "web/maintenance"
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  "repair-shops": {
    slug: "repair-shops",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Broader local-business playbook." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "UK repair shop compliance." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Tech-enabled repair networks." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Sell parts online." }
    ],
    bridgeTo: [
      "web/wordpress",
      "web/custom-software",
      "seo",
      "digital-marketing/social-media"
    ],
    resources: {
      blogs: [],
      pricing: [
        { label: "Starter Kit for Repair Shops", href: "/services/starter-kit", blurb: "Booking + inventory + POS in one package." },
        SHARED_RESOURCES.pricing,
        SHARED_RESOURCES.contact
      ]
    }
  },
  "uk-businesses": {
    slug: "uk-businesses",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local SEO across UK regions." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "UK-based founder playbook." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "UK commerce compliance." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "UK white-label partner." }
    ],
    bridgeTo: [
      "web/full-stack",
      "web/auth",
      "seo",
      "digital-marketing/content-strategy"
    ],
    resources: {
      blogs: [],
      caseStudies: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  agencies: {
    slug: "agencies",
    cluster: "solution",
    pillar: PILLARS.solution,
    siblings: [
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Founders who need an engineering partner." },
      { label: "Solutions for E-commerce Brands", href: "/solutions/ecommerce-brands", blurb: "Commerce builds for agency clients." },
      { label: "Solutions for UK Businesses", href: "/solutions/uk-businesses", blurb: "UK-specific compliance layer." },
      { label: "Solutions for Local Businesses", href: "/solutions/local-businesses", blurb: "Local SEO capacity." }
    ],
    bridgeTo: [
      "web/full-stack",
      "web/wordpress",
      "creative/web-design",
      "digital-marketing/content-strategy",
      "ai/automation"
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
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
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Broader founder playbook." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  },
  about: {
    slug: "about",
    cluster: "company",
    pillar: PILLARS.company,
    siblings: [
      { label: "Our Team", href: "/team", blurb: "The senior engineers and designers behind the work." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "How we partner with founders." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "Our white-label partnership model." },
      { label: "Starter Kit", href: "/services/starter-kit", blurb: "A low-risk way to start working together." }
    ],
    resources: {
      blogs: [],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact, SHARED_RESOURCES.portfolio]
    }
  },
  team: {
    slug: "team",
    cluster: "company",
    pillar: PILLARS.company,
    siblings: [
      { label: "About ClickTake Technologies", href: "/about", blurb: "Our story and engineering principles." },
      { label: "Solutions for Startups", href: "/solutions/startups", blurb: "Founders we've partnered with." },
      { label: "Solutions for Agencies", href: "/solutions/agencies", blurb: "Our white-label partnerships." },
      { label: "Starter Kit", href: "/services/starter-kit", blurb: "Work with our team — low commitment." }
    ],
    resources: {
      blogs: [
        { label: "Careers at ClickTake", href: "/careers", blurb: "Open engineering, design, and PM roles." }
      ],
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact, SHARED_RESOURCES.portfolio]
    }
  }
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
      pricing: [SHARED_RESOURCES.pricing, SHARED_RESOURCES.contact]
    }
  };
}
