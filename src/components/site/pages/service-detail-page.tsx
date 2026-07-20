'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  Wrench,
  TrendingUp,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { CATEGORY_STYLES, SERVICES, SITE, type ServiceItem } from "@/lib/site-data";

interface Props { service: ServiceItem; }

// Geo-targeted copy per region — drives local SEO for each service detail
// page. Each region has its own micro-copy that mentions the local city,
// language and time zone, so Google can match long-tail queries like
// "AI development company Birmingham" or "SaaS agency Dubai".
const REGION_COPY = [
  {
    flag: "🇬🇧",
    city: "Birmingham",
    country: "United Kingdom",
    blurb: "Serving Birmingham, London, Manchester and the Midlands from our registered UK HQ. Available Mon–Sat, 09:30–21:00 GMT.",
    phone: "+44 7391 653377",
    hours: "GMT",
  },
  {
    flag: "🇵🇰",
    city: "Multan",
    country: "Pakistan",
    blurb: "Engineering hub serving Lahore, Karachi, Islamabad and across Pakistan. Available Mon–Sat, 09:30–21:00 PKT.",
    phone: "+92 306 9753003",
    hours: "PKT",
  },
  {
    flag: "🇺🇸",
    city: "Austin, TX",
    country: "United States",
    blurb: "North American business desk — coast-to-coast coverage. Available Mon–Fri, 09:00–18:00 CST for clients across the USA.",
    phone: "+1 (by appointment)",
    hours: "CST",
  },
  {
    flag: "🇦🇪",
    city: "Dubai",
    country: "United Arab Emirates",
    blurb: "MENA office serving Dubai, Abu Dhabi, Riyadh and Doha. Available Sat–Thu, 10:00–20:00 GST.",
    phone: "+971 (by appointment)",
    hours: "GST",
  },
];

/**
 * Per-category copy for the structured sections (Problem, Service Explanation,
 * Benefits, Process, Tools, FAQs). These were previously hard-coded as a
 * single generic block; now each category has tailored, keyword-rich copy
 * that aligns with the ClickTake brand voice and supports local SEO.
 */
const CATEGORY_COPY: Record<string, {
  problem: string[];
  explanation: string[];
  benefits: { title: string; desc: string }[];
  process: { t: string; d: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
}> = {
  ai: {
    problem: [
      "Off-the-shelf LLM APIs give you 80% answers — but the last 20% is what ships production value. Generic chatbots hallucinate on your domain data, can't call your internal APIs, and have no evaluation harness to catch regressions before users do.",
      "Internal teams prototype a demo in a week, then spend six months fighting eval drift, prompt injection, latency budgets and cost ceilings. Most AI projects never reach production because the engineering around the model is treated as an afterthought.",
    ],
    explanation: [
      "ClickTake's AI practice builds production-grade LLM applications with fine-tuning, retrieval-augmented generation (RAG), tool-using agents and full evaluation harnesses. We treat the model as one component in a larger system that includes data pipelines, observability, guardrails and cost controls.",
      "Every engagement starts with a discovery workshop to map your domain, success metrics and risk tolerance. From there we design the architecture — fine-tuning vs. RAG vs. hybrid, model selection, eval suite, deployment topology — and ship in weekly sprints with demoable progress.",
    ],
    benefits: [
      { title: "Production-grade accuracy", desc: "Eval harnesses with golden datasets, regression tests and human-in-the-loop review — no more 'it works on Tuesday' prompts." },
      { title: "Cost & latency budgets", desc: "Smart routing, caching and model tiering keep your bill predictable without sacrificing response quality." },
      { title: "Domain-locked knowledge", desc: "RAG + fine-tuning grounds the model in YOUR data — no hallucinations on customer-facing surfaces." },
      { title: "Observable by default", desc: "Every prompt, response, tool call and token cost is logged for audit, debugging and continuous improvement." },
    ],
    process: [
      { t: "Discovery workshop", d: "We map your domain, success metrics, risk tolerance and existing data assets. Output: architecture proposal with model selection, eval plan and ROI model." },
      { t: "Prototype & eval", d: "Working prototype in 2 weeks with a golden eval dataset. You see real outputs on YOUR data, not a vendor demo on synthetic inputs." },
      { t: "Production build", d: "Weekly sprints with demos. We harden the system: guardrails, rate limits, observability, cost controls, fallbacks and A/B routing." },
      { t: "Launch & iterate", d: "Ship to production with monitoring dashboards. 30 days of post-launch support included; ongoing iteration cycles available as a retainer." },
    ],
    tools: [
      "OpenAI GPT-4o / o1", "Anthropic Claude 3.5", "Meta Llama 3.1", "Mistral",
      "LangChain / LlamaIndex", "Pinecone / Weaviate / pgvector", "LangSmith / Langfuse",
      "Python · FastAPI · Pydantic", "Ray / Modal for batch inference", "Vercel AI SDK",
    ],
    faqs: [
      { q: "Should we fine-tune a model or use RAG?", a: "It depends on the use case. For dynamic knowledge that changes weekly (e.g. support docs), RAG wins. For consistent style/behaviour (e.g. brand voice, structured output), fine-tuning wins. Most production systems use both — we'll recommend the right mix during discovery." },
      { q: "How do you prevent hallucinations?", a: "Three layers: (1) RAG grounds responses in source documents with citations, (2) guardrail models check outputs for groundedness/toxicity/PII, (3) eval harnesses catch regressions before deploy. No system is 100% hallucination-free, but we make it measurable and bounded." },
      { q: "What does an engagement cost?", a: "Discovery workshops start at £2.5k (1 week). Production builds typically range £15k–£80k depending on scope, model complexity and integration depth. Retainers for ongoing iteration start at £4k/month." },
      { q: "Can you work with our existing data warehouse?", a: "Yes — we've integrated with Snowflake, BigQuery, Postgres, Databricks and S3. We'll review your data assets during discovery and design the pipeline accordingly." },
      { q: "Who owns the IP?", a: "You do — fully. All code, models, eval datasets and documentation are handed over at the end of the engagement. We retain no rights to your data or trained models." },
    ],
  },
  web: {
    problem: [
      "Most agency-built websites look great in a Figma mockup but ship as performance disasters: 6MB JS bundles, 4-second LCP, broken Core Web Vitals, and zero consideration for SEO, accessibility or maintainability. They win design awards and lose customers.",
      "SaaS projects are worse — agencies build the demo, then disappear when you need to add billing, RBAC, audit logs, multi-tenancy or compliance. You're left with code no one understands and a six-figure rebuild invoice.",
    ],
    explanation: [
      "ClickTake builds production-grade web applications on Next.js, React and modern edge infrastructure. We engineer for performance (Core Web Vitals in the green), SEO (server-rendered, schema-rich, crawlable), accessibility (WCAG 2.1 AA), and maintainability (typed, tested, documented).",
      "For SaaS, we ship the unglamorous foundations that scale: multi-tenant data models, Stripe billing with usage-based metering, RBAC with audit logs, admin tooling, observability and CI/CD. You get a codebase your future team can actually own.",
    ],
    benefits: [
      { title: "Green Core Web Vitals", desc: "LCP < 1.5s, CLS < 0.05, INP < 100ms on real user data — not lab tests. SEO + conversion lift is immediate." },
      { title: "SEO from day one", desc: "Server-rendered HTML, schema.org markup, sitemap.xml, robots.txt, canonical tags, OG cards — all wired in, not bolted on." },
      { title: "Accessible by default", desc: "WCAG 2.1 AA compliance — keyboard navigation, screen reader support, focus management, color contrast." },
      { title: "Ownable code", desc: "TypeScript strict mode, documented architecture, unit + e2e tests, CI pipeline. Your future team will thank us." },
    ],
    process: [
      { t: "Discovery & architecture", d: "Map user journeys, success metrics, tech stack constraints. Output: architecture diagram, data model, sprint plan with milestones." },
      { t: "Design system", d: "Component library in Figma → shadcn/ui + Tailwind tokens. One source of truth for design, code and content." },
      { t: "Build sprints", d: "Weekly sprints with demos. Every PR ships to a preview URL. You see progress every 5 business days." },
      { t: "Launch & handoff", d: "Production deploy with analytics, error tracking, uptime monitoring. 30 days of post-launch support + full handoff docs." },
    ],
    tools: [
      "Next.js 16 (App Router)", "React 19", "TypeScript 5", "Tailwind CSS 4",
      "shadcn/ui + Radix", "Prisma 6 + Postgres", "Stripe billing", "NextAuth v4",
      "Vercel / Cloudflare Workers", "Sentry + PostHog", "Playwright for e2e",
    ],
    faqs: [
      { q: "Do you work with our existing design?", a: "Yes. We can take a Figma file, a Sketch file, or even an existing codebase and rebuild it. If you don't have a designer, we have in-house designers who can produce one." },
      { q: "Can you migrate from WordPress / Webflow / Shopify?", a: "Yes — we've migrated from all three. We preserve SEO equity (URLs, redirects, schema) and typically improve performance 3-5× in the process." },
      { q: "Do you offer ongoing maintenance?", a: "Yes. After the 30-day post-launch support window, we offer retainer plans starting at £2k/month covering security patches, dependency upgrades, performance audits and feature work." },
      { q: "What about multi-tenant SaaS?", a: "We've built multi-tenant SaaS for 5+ clients with tenant isolation, RBAC, audit logs, usage-based billing and per-tenant analytics. We'll share architecture references during discovery." },
      { q: "Can you handle compliance (SOC2 / GDPR / HIPAA)?", a: "Yes — we've shipped SOC2-compliant and GDPR-compliant SaaS. HIPAA is handled case-by-case. We work with your compliance team or can recommend a partner." },
    ],
  },
  marketing: {
    problem: [
      "Most digital marketing agencies optimize for vanity metrics — impressions, clicks, follower counts — that don't move revenue. You get a pretty dashboard every month and the same flat pipeline you started with.",
      "Performance marketing teams chase ROAS in isolation, ignoring LTV, CAC payback and contribution margin. They'll scale unprofitable channels to hit a target and leave you with a churn problem six months later.",
    ],
    explanation: [
      "ClickTake's growth practice runs data-driven SEO, paid media, content and CRO programmes tied to revenue — not vanity metrics. We model the full funnel from impression → SQL → closed-won → LTV, and optimize for contribution margin, not ROAS in isolation.",
      "Every channel has its own playbook: technical SEO with schema + programmatic pages, paid creative testing at scale, content engines with topical authority maps, CRO programmes with statistical rigor. We don't silo channels — we compound them.",
    ],
    benefits: [
      { title: "Revenue-tied reporting", desc: "Dashboards in your CRM, not Google Analytics. Every channel mapped to SQL, closed-won and LTV." },
      { title: "Compounding content", desc: "Topical authority maps + programmatic SEO + editorial calendars that build traffic month over month — not spike-and-decay campaigns." },
      { title: "Statistical CRO", desc: "A/B tests with proper sample sizing, significance thresholds and pre-registered hypotheses — no more 'we tested it for 4 days and it won'." },
      { title: "Cross-channel attribution", desc: "Server-side conversion tracking, MMM where needed, and honest answers about what's actually driving pipeline." },
    ],
    process: [
      { t: "Audit & strategy", d: "Full-funnel audit: technical SEO, paid accounts, content assets, CRO opportunities. Output: 90-day roadmap with prioritized bets and revenue projections." },
      { t: "Foundations", d: "Fix the basics first — analytics, conversion tracking, schema, technical SEO health. No point pouring budget into a leaky funnel." },
      { t: "Sprint execution", d: "Bi-weekly sprints per channel. Each sprint ships tests (creative, landing pages, content) and reports on impact." },
      { t: "Compound & scale", d: "Reallocate budget to what works. Double down on winners, kill losers. Quarterly business reviews with revenue impact, not channel metrics." },
    ],
    tools: [
      "Google Analytics 4 + Server-Side GTM", "Google Ads + Meta + LinkedIn + TikTok",
      "Ahrefs / SEMrush", "Hotjar / Microsoft Clarity", "Looker Studio / Hex",
      "Webflow / Next.js for landing pages", "Convert.com / VWO for CRO",
      "HubSpot / Salesforce integration", "PostHog for product analytics",
    ],
    faqs: [
      { q: "Do you require a minimum ad spend?", a: "No — but we'll be honest if your budget is too small to test effectively. As a rule of thumb, paid media engagements need £5k+/month in ad spend to generate statistically meaningful test data." },
      { q: "How long until we see results?", a: "Technical SEO and CRO can show impact in 4-8 weeks. Content SEO compounds over 3-6 months. Paid media can drive pipeline within 2-4 weeks but takes 8-12 weeks to optimize." },
      { q: "Do you write the content or just strategy?", a: "Both. We have in-house copywriters for SEO content, ad creative, and landing pages. We can also work with your existing content team in an editorial + strategy role." },
      { q: "How do you report?", a: "Live dashboards in Looker Studio (or your BI tool of choice) updated daily. Bi-weekly sprint reports. Quarterly business reviews with revenue impact and forward-looking bets." },
      { q: "Can you work with our existing marketing team?", a: "Yes — most engagements are mixed ClickTake + in-house. We can lead, augment, or consult depending on your team's capacity and capabilities." },
    ],
  },
  creative: {
    problem: [
      "Most creative agencies deliver brand assets that look beautiful in a pitch deck but break the moment they hit production — logos that don't scale, color systems that fail accessibility, typography that breaks in 12 languages, video formats that don't fit any ad placement.",
      "Brand work is treated as an art project instead of a system. You get a 60-page guidelines PDF no one reads, instead of a living design system your team can actually use.",
    ],
    explanation: [
      "ClickTake's creative practice delivers brand systems — not just assets. Identities designed for digital-first brands, product UI kits that ship in code, motion systems that work across every channel and aspect ratio, and video that fits every placement from TikTok to CTV.",
      "Every deliverable is built as a component: logo variants with usage rules, color tokens with accessibility-tested contrast ratios, type scales with web/CSS variables, motion templates with timing curves. Your team can extend the system without us.",
    ],
    benefits: [
      { title: "Production-ready systems", desc: "Design tokens that map directly to Tailwind / CSS variables. No translation gap between design and code." },
      { title: "Accessibility-tested", desc: "WCAG 2.1 AA contrast ratios verified across every color pairing. Your brand is inclusive by default." },
      { title: "Multi-format delivery", desc: "Video cut for every aspect ratio (9:16, 1:1, 16:9, 4:5). Logo variants for every context. No scramble when a new channel appears." },
      { title: "Living guidelines", desc: "Not a PDF — a Figma library + code component library + usage docs that update as your brand evolves." },
    ],
    process: [
      { t: "Brand discovery", d: "Stakeholder interviews, competitive audit, market positioning. Output: brand brief with voice, values, visual direction." },
      { t: "Identity exploration", d: "3 distinct directions presented as full mockups (logo, color, type, application). One selected for refinement." },
      { t: "System build", d: "Final identity expanded into a complete system: logo variants, color tokens, type scale, motion principles, component library." },
      { t: "Handoff & rollout", d: "Living guidelines (Figma + code), training session for your team, asset library, ongoing support for first 30 days." },
    ],
    tools: [
      "Figma + Figma Variables", "Adobe Creative Suite", "Framer for prototypes",
      "Lottie / Rive for motion", "After Effects + Premiere", "DaVinci Resolve",
      "Tailwind tokens export", "Storybook for component documentation",
    ],
    faqs: [
      { q: "Do you do logo-only projects?", a: "Yes, but we'll push back if a logo in isolation won't solve your problem. A logo without a system is just a mark — it won't differentiate you. We recommend minimum identity packages (logo + color + type + basic application)." },
      { q: "Can you work with our existing brand?", a: "Absolutely — we frequently extend existing brands with new components, motion systems, or video. We'll respect your brand guidelines while pushing the work forward." },
      { q: "Do you handle video production end-to-end?", a: "Yes — script, storyboard, shoot (in-house crew for UK/PK; partner crews for US/UAE), edit, motion graphics, color, sound. Delivered in every aspect ratio your channels need." },
      { q: "What's the difference between a brand identity and a design system?", a: "Identity = the visual expression (logo, color, type, voice). Design system = the operational layer (components, tokens, documentation, code). We deliver both." },
      { q: "Do you offer ongoing creative support?", a: "Yes — retainer plans for ongoing creative work (ad creative, social content, landing page design) start at £3k/month." },
    ],
  },
  "starter-kit": {
    problem: [
      "Founders waste 6-12 months stitching together a brand, a website, an AI assistant and a growth plan — each from a different vendor, none of which integrate. By the time it ships, the momentum (and often the runway) is gone.",
      "Pre-packaged 'startup kits' from agencies cut corners: template websites, generic AI chatbots with no domain data, growth playbooks that are 40 pages of buzzwords with no execution plan. You pay for a checklist and get nothing shippable.",
    ],
    explanation: [
      "The ClickTake Business Development Starter Kit is our flagship offering for ambitious founders. In 90 days, we deliver a complete brand identity, a production-ready Next.js website (up to 6 pages), an AI assistant trained on your domain for lead qualification and FAQs, and a 90-day growth marketing playbook with execution support.",
      "Every component is built to integrate: brand tokens feed the website design system, the website feeds the AI assistant context, the growth playbook is wired to the analytics we set up. You don't get 4 disconnected deliverables — you get one operating system for launch.",
    ],
    benefits: [
      { title: "Live in 90 days", desc: "Fixed timeline, fixed scope, fixed price. No scope creep, no surprise invoices, no 6-month rabbit hole." },
      { title: "Fully integrated stack", desc: "Brand → website → AI → growth — designed as one system, not four siloed deliverables." },
      { title: "Production-ready", desc: "Not a demo. Real code, real analytics, real CRM integration, real SEO. Ship-ready from day one." },
      { title: "Ownable IP", desc: "All source files, code, training data and documentation handed over. No vendor lock-in." },
    ],
    process: [
      { t: "Week 1-2: Discovery & brand", d: "Stakeholder workshop, competitive audit, brand brief. 3 identity directions explored, one refined. Final brand system delivered." },
      { t: "Week 3-6: Website build", d: "Production-ready Next.js site (up to 6 pages). Brand tokens integrated. SEO, analytics and CRM wired in." },
      { t: "Week 7-9: AI assistant", d: "Domain-trained assistant for lead qualification + FAQs. Integrated into website. Eval harness + guardrails included." },
      { t: "Week 10-12: Growth playbook", d: "90-day growth plan: SEO content calendar, paid creative testing roadmap, CRO backlog. Execution support for first 30 days." },
    ],
    tools: [
      "Figma (brand + design system)", "Next.js 16 + Tailwind 4 (website)",
      "OpenAI / Anthropic + LangChain (AI)", "Posthog + GA4 (analytics)",
      "Stripe (billing if needed)", "HubSpot / Attio CRM (lead capture)",
      "Vercel / Cloudflare (hosting)", "Linear (project tracking)",
    ],
    faqs: [
      { q: "Is the 90-day timeline guaranteed?", a: "Yes — provided you commit to the discovery workshop in week 1 and provide timely feedback on each sprint deliverable. We've shipped 12+ starter kits on this timeline. If we miss it due to our own delay, we work until it's done at no extra cost." },
      { q: "What's included in the website?", a: "Up to 6 pages (typically Home, About, Services, Pricing, Contact, + one custom). Includes CMS integration, SEO setup, analytics, mobile responsiveness, performance optimization, and 2 rounds of revisions per page." },
      { q: "How does the AI assistant work?", a: "We fine-tune / RAG-train a model on your domain data (FAQs, product docs, sales scripts). It qualifies leads via a chat widget on your site, captures them to your CRM, and answers visitor questions 24/7. You get the eval harness and can iterate post-launch." },
      { q: "What if we need more than 6 pages?", a: "Additional pages are £1.5k each. Most founders start with 6 and expand post-launch — the system is designed to be extended." },
      { q: "What does the growth playbook include?", a: "A 90-day tactical plan: SEO content calendar with 12-18 articles, paid creative testing roadmap (Google + Meta), CRO backlog with 10-15 experiments, and weekly check-ins for the first 30 days to support execution." },
      { q: "Do you take equity instead of cash?", a: "Not for the standard kit, but we have a separate programme for venture-backed startups at the seed stage. Reach out via the contact form if interested." },
    ],
  },
};

export function ServiceDetailPage({ service }: Props) {
  const cat = CATEGORY_STYLES[service.category] ||
    // starter-kit falls back to a custom amber/pink style
    {
      eyebrow: "Flagship Offering",
      accentColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
      accentBorder: "border-amber-500/30",
      gradient: "from-amber-500 to-brand-pink",
      title: "Flagship Offering",
      description: "Our all-in-one package for ambitious founders.",
      group: "Flagship",
      glow: "rgba(245,158,11,0.18)",
      borderHover: "hover:border-amber-500/40",
    };

  const copy = CATEGORY_COPY[service.category] || CATEGORY_COPY.web;

  // Pull the inclusions list — for starter-kit we use a richer one
  const isStarter = service.slug === "starter-kit";
  const inclusions = isStarter
    ? [
        "Brand identity system (logo, typography, color, guidelines)",
        "Production-ready Next.js website (up to 6 pages)",
        "AI assistant for lead qualification & FAQs",
        "Analytics, SEO basics and conversion tracking setup",
        "90-day growth marketing playbook (SEO + paid + content)",
        "Copywriting for all primary pages",
        "2 rounds of revisions per deliverable",
        "Hand-off documentation & training",
      ]
    : [
        "Discovery workshop & success metrics",
        "Dedicated engineering & design team",
        "Weekly demo & async progress notes",
        "Production-ready code with tests",
        "Performance & SEO audit",
        "30-day post-launch support",
      ];

  const deliverables = isStarter
    ? [
        { label: "Time to live", value: "≈ 90 days" },
        { label: "Revision rounds", value: "2 per deliverable" },
        { label: "Handoff", value: "Source + docs + training" },
      ]
    : [
        { label: "Engagement", value: "Sprint-based" },
        { label: "Team", value: "Mixed senior + lead" },
        { label: "Reporting", value: "Weekly demo + Linear" },
      ];

  // Related services — same category, excluding current, limited to 4
  const related = SERVICES
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 4);

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── 1. HERO ─────────────────────────────────────────── */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${cat.accentColor}`}>
              {cat.eyebrow}
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {service.title}
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {service.detailed_description || service.description}
            </p>

            {/* Deliverables strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {deliverables.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-md p-4"
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{d.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── 2. PROBLEM STATEMENT ───────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <AlertTriangle className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">The problem we solve</h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {copy.problem.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.section>

          {/* ─── 3. SERVICE EXPLANATION ─────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">How we deliver {service.title.toLowerCase()}</h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {copy.explanation.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.section>

          {/* ─── 4. WHAT'S INCLUDED ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">What&apos;s included</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {inclusions.map((inc) => (
                <div
                  key={inc}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4"
                >
                  <CheckCircle2 className={`h-5 w-5 shrink-0 ${cat.accentColor}`} />
                  <span className="text-sm leading-relaxed">{inc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── 5. BENEFITS ────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <TrendingUp className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Why teams choose ClickTake</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-5 hover:border-primary/30 transition"
                >
                  <div className={`text-sm font-semibold mb-1.5 ${cat.accentColor}`}>{b.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{b.desc}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── 6. PROCESS ─────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">How we engage</h2>
            <ol className="relative border-l border-border pl-6 space-y-6">
              {copy.process.map((step, i) => (
                <li key={step.t} className="relative">
                  <span className={`absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${cat.gradient} text-[10px] font-bold text-white`}>
                    {i + 1}
                  </span>
                  <div className="font-semibold">{step.t}</div>
                  <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.d}</div>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* ─── 7. TOOLS & TECHNOLOGY ──────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Wrench className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Tools &amp; technology</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-3xl leading-relaxed">
              The exact stack we use to deliver {service.title.toLowerCase()} for clients across the UK, Pakistan,
              USA and Dubai. All tooling choices are reviewed in discovery — we&apos;ll recommend alternatives if your
              team has existing investments or constraints.
            </p>
            <div className="flex flex-wrap gap-2">
              {copy.tools.map((tool) => (
                <span
                  key={tool}
                  className={`inline-flex items-center rounded-full border ${cat.accentBorder} ${cat.accentBg} px-3 py-1.5 text-xs font-medium`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.section>

          {/* ─── 8. FAQS ────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <HelpCircle className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            </div>
            <div className="space-y-3">
              {copy.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 [&_summary]:cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-3 text-sm font-semibold list-none">
                    <span>{faq.q}</span>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform group-open:rotate-90 ${cat.accentColor}`} />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </motion.section>

          {/* ─── 9. GEO AVAILABILITY ────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {service.title} — available across 4 regions
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              ClickTake Technologies delivers {service.title.toLowerCase()} to clients worldwide from
              our offices in the UK, Pakistan, USA and Dubai. Local team, local hours, local
              understanding — global delivery standards.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {REGION_COPY.map((r) => (
                <div
                  key={r.city}
                  className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 hover:border-primary/30 hover:bg-card/60 transition"
                >
                  <div className="text-2xl mb-1.5">{r.flag}</div>
                  <div className="text-sm font-bold leading-tight">{r.city}</div>
                  <div className="text-[11px] text-muted-foreground mb-2">{r.country}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{r.blurb}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span className="truncate">{r.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 shrink-0" />
                    {r.hours}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── 10. INTERNAL LINKS — RELATED SERVICES ─────────── */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mt-12 sm:mt-16"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">Related services</h2>
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">
                Other {cat.group} services from ClickTake that pair well with {service.title}.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 hover:border-primary/40 hover:bg-card/60 transition"
                  >
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${cat.gradient} text-white`}>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold leading-tight group-hover:text-foreground text-foreground/90">
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {s.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
                >
                  Browse all services <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.section>
          )}

          {/* ─── CTA ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
                Ready to get started?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a consultation and let&apos;s scope it together. Free 30-minute discovery call.
              </div>
            </div>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${cat.gradient} px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0`}
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
