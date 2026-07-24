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
      "Founders waste 6-12 months stitching together a domain, hosting, a website, branding, a Google Business Profile, business email, SEO setup and a marketing plan — each from a different vendor, none of which integrate. By the time it ships, the momentum (and often the runway) is gone.",
      "Pre-packaged 'startup kits' from agencies cut corners: template websites, generic branding, no local SEO foundation, no business email, no marketing plan. You pay for a checklist and get nothing shippable.",
    ],
    explanation: [
      "The ClickTake Business Startup Kit is our flagship end-to-end launch package for new founders, local businesses and rebranders. We deliver everything you need to be online and discoverable: domain registration, managed hosting, a production-ready Next.js website, complete brand identity, Google Business Profile setup, business email, foundational SEO setup and a 30-day marketing starter plan — all coordinated as a single, integrated launch.",
      "Every component is built to integrate: the domain points to the hosting, the website uses the brand tokens, the GBP reflects the brand, the business email is wired to the contact form, the SEO setup feeds the analytics, and the marketing plan is grounded in the actual site we just shipped. You don't get 8 disconnected deliverables — you get one operating system for launch.",
    ],
    benefits: [
      { title: "End-to-end launch", desc: "Domain, hosting, website, branding, GBP, email, SEO and marketing — all in one fixed-scope package. No vendor juggling, no scope gaps." },
      { title: "Production-ready", desc: "Not a template. Real code, real SEO, real analytics, real local SEO signals. Ship-ready from day one." },
      { title: "Local SEO foundation", desc: "Google Business Profile setup + optimization + local citations so you show up in the local pack from launch week." },
      { title: "Ownable IP", desc: "All source files, code, brand assets and documentation handed over. No vendor lock-in. You own everything." },
    ],
    process: [
      { t: "Week 1: Discovery & setup", d: "Stakeholder workshop, brand brief, domain registration, hosting setup, business email provisioning, GBP claimed." },
      { t: "Week 2-4: Brand & website", d: "Brand identity delivered (logo, color, type, guidelines). Production-ready Next.js site (up to 6 pages) built with brand tokens, SEO and analytics wired in." },
      { t: "Week 5: SEO & GBP launch", d: "On-page SEO finalized, schema markup, sitemap and robots.txt shipped, GBP optimized and published, local citations built, Search Console and GA4 verified." },
      { t: "Week 6: Marketing starter plan", d: "30-day marketing starter plan delivered: SEO content calendar, paid creative testing roadmap, CRO backlog. Execution support for first 14 days." },
    ],
    tools: [
      "Figma (brand + design system)", "Next.js 16 + Tailwind 4 (website)",
      "Google Workspace / Microsoft 365 (business email)",
      "Google Business Profile + Search Console + GA4 (local SEO + analytics)",
      "Cloudflare / Vercel (hosting + CDN)", "Stripe (billing if needed)",
      "HubSpot / Attio CRM (lead capture)", "Linear (project tracking)",
    ],
    faqs: [
      { q: "What's included in the website?", a: "Up to 6 pages (typically Home, About, Services, Pricing, Contact, + one custom). Includes CMS integration, SEO setup, analytics, mobile responsiveness, performance optimization, and 2 rounds of revisions per page." },
      { q: "Can I use my existing domain?", a: "Yes — we can register a new domain on your behalf or transfer/registrar-manage an existing one. We handle DNS, SSL and email provisioning either way." },
      { q: "Do you handle the Google Business Profile verification?", a: "Yes — we set up and optimize the GBP, and walk you through the verification process (postcard or video verification depending on your business category)." },
      { q: "What does the marketing starter plan include?", a: "A 30-day tactical plan: SEO content calendar with 6-8 article topics, paid creative testing roadmap (Google + Meta), CRO backlog with 5-8 experiments, and execution support for the first 14 days." },
      { q: "Can I add an AI chatbot to the kit?", a: "Yes — the AI chatbot is available as an add-on (£2.5k). It is not included in the base kit because not every founder needs one at launch. We will recommend it during discovery if it makes sense for your business." },
      { q: "What if we need more than 6 pages?", a: "Additional pages are £1.5k each. Most founders start with 6 and expand post-launch — the system is designed to be extended." },
      { q: "Do you take equity instead of cash?", a: "Not for the standard kit, but we have a separate programme for venture-backed startups at the seed stage. Reach out via the contact form if interested." },
    ],
  },
};

/**
 * Per-slug copy overrides for services that need bespoke copy that doesn't
 * match their category default. Slugs not in this map fall back to their
 * CATEGORY_COPY entry above.
 */
const SERVICE_COPY: Record<string, typeof CATEGORY_COPY["web"]> = {
  "ai/automation": {
    problem: [
      "Most 'AI automation' projects are demos — a vendor wires ChatGPT to a Slack channel, you get a flashy pitch deck, and three months later nothing is automated. The chatbot hallucinates on real customer questions, the workflow breaks the moment an edge case appears, and there is no eval harness to catch regressions before users do.",
      "Internal teams prototype a workflow in a week, then spend six months fighting eval drift, prompt injection, latency budgets, cost ceilings and integration debt. Most AI automation projects never reach production because the engineering around the model is treated as an afterthought.",
    ],
    explanation: [
      "ClickTake's AI Automation practice builds production-grade automations for lead capture, customer support, sales workflows, reporting, email/SMS and business process orchestration — using GPT-4o, Claude and Llama with RAG, fine-tuning, tool-using agents, evals, guardrails and observability.",
      "Every engagement starts with a discovery workshop to map your workflows, success metrics and risk tolerance. From there we design the architecture — which steps are AI, which are deterministic, which need human-in-the-loop — and ship in weekly sprints with measurable automation rates and ROI.",
    ],
    benefits: [
      { title: "Lead capture automation", desc: "AI qualifies inbound leads 24/7 via website chat, email and WhatsApp — capturing to your CRM with structured data so sales only talks to qualified prospects." },
      { title: "Customer support automation", desc: "AI resolves 40-70% of L1 tickets autonomously (RAG over your docs), escalates the rest to humans with full context, and logs every interaction for QA." },
      { title: "Sales workflow automation", desc: "AI drafts follow-ups, updates CRM fields, schedules meetings, generates proposals — your sales team focuses on closing, not admin." },
      { title: "Reporting automation", desc: "AI generates weekly/monthly reports from your data warehouse, in natural language, with charts and insights — delivered to Slack, email or a dashboard." },
    ],
    process: [
      { t: "Discovery workshop", d: "We map your workflows, identify automation candidates, model ROI per automation, and prioritize by impact × effort. Output: automation roadmap with eval plan and architecture." },
      { t: "Prototype & eval", d: "Working prototype in 2 weeks with a golden eval dataset. You see real outputs on YOUR data, not a vendor demo on synthetic inputs." },
      { t: "Production build", d: "Weekly sprints with demos. We harden each automation: guardrails, rate limits, observability, cost controls, fallbacks, human-in-the-loop escalation." },
      { t: "Launch & iterate", d: "Ship to production with monitoring dashboards. 30 days of post-launch support included; ongoing iteration cycles available as a retainer." },
    ],
    tools: [
      "OpenAI GPT-4o / o1", "Anthropic Claude 3.5", "Meta Llama 3.1",
      "LangChain / LlamaIndex", "Pinecone / Weaviate / pgvector",
      "LangSmith / Langfuse (evals + observability)", "Zapier / n8n / Inngest",
      "Python · FastAPI · Pydantic", "Vercel AI SDK", "Slack / WhatsApp / Email APIs",
    ],
    faqs: [
      { q: "Which workflows should we automate first?", a: "We prioritize by impact × effort. High-volume, repetitive, well-documented workflows are best — L1 support, lead qualification, follow-up emails, weekly reporting. We'll model ROI per candidate during discovery and recommend a sequence." },
      { q: "How do you prevent hallucinations in customer-facing automations?", a: "Three layers: (1) RAG grounds responses in source documents with citations, (2) guardrail models check outputs for groundedness/toxicity/PII, (3) eval harnesses catch regressions before deploy. For high-stakes flows, we add human-in-the-loop escalation." },
      { q: "Can you integrate with our existing CRM / help desk / data warehouse?", a: "Yes — we've integrated with HubSpot, Salesforce, Attio, Zendesk, Intercom, Snowflake, BigQuery, Postgres and more. We'll review your stack during discovery and design the integration accordingly." },
      { q: "What does an engagement cost?", a: "Discovery workshops start at £2.5k (1 week). Production automation builds typically range £15k–£80k depending on scope, model complexity and integration depth. Retainers for ongoing iteration start at £4k/month." },
      { q: "Who owns the IP?", a: "You do — fully. All code, models, eval datasets and documentation are handed over at the end of the engagement. We retain no rights to your data or trained models." },
    ],
  },

  "seo": {
    problem: [
      "Most SEO agencies optimize for vanity metrics — impressions, average position, indexed pages — that don't move pipeline. You get a pretty monthly report and the same flat organic traffic you started with.",
      "Template SEO packages ship generic blog posts, low-quality directory links, and on-page tweaks that worked in 2018 but don't move the needle in 2026. Worse, some tactics (PBNs, mass guest posts) actively get your site penalized.",
    ],
    explanation: [
      "ClickTake's SEO practice runs end-to-end — technical audits, on-page optimization, off-page link building, local SEO, Google Business Profile optimization and monthly reporting tied to revenue, not rankings.",
      "We model the full funnel from impression → click → session → SQL → closed-won → LTV, and optimize for contribution margin. Every channel has its own playbook: technical SEO with schema + programmatic pages, content engines with topical authority maps, white-hat link building, and rigorous local SEO for Birmingham, Multan, Austin and Dubai.",
    ],
    benefits: [
      { title: "Technical SEO foundation", desc: "Core Web Vitals in the green, clean schema markup, crawlable architecture, no orphan pages, no broken redirects, no JS rendering issues." },
      { title: "Topical authority content", desc: "Content engines built on topical authority maps — not random blog posts. Every article targets a specific keyword cluster with internal links and schema." },
      { title: "White-hat link building", desc: "Digital PR, resource page outreach, broken link building and partnerships — no PBNs, no mass guest posts, no link schemes that get you penalized." },
      { title: "Local SEO + GBP", desc: "Google Business Profile optimization, local citations, NAP consistency, review acquisition workflows — so you rank in the local pack across every city you serve." },
    ],
    process: [
      { t: "Audit & strategy", d: "47-point technical + content + off-page audit. Competitive gap analysis. Output: 90-day roadmap with prioritized bets and revenue projections." },
      { t: "Technical foundations", d: "Fix Core Web Vitals, schema, internal linking, URL structure, sitemap, robots.txt. No point producing content on a foundation Google can't crawl." },
      { t: "Content engine", d: "Topical authority map → editorial calendar → monthly content production (8-12 articles). Each article targets a keyword cluster with internal links and schema." },
      { t: "Off-page + local", d: "White-hat link building (digital PR, outreach). GBP optimization, local citations, review acquisition workflows. Monthly reporting tied to SQL and revenue." },
    ],
    tools: [
      "Ahrefs / SEMrush", "Google Search Console + GA4 + Server-Side GTM",
      "Screaming Frog / Sitebulb (technical audits)", "Looker Studio / Hex (reporting)",
      "Clearscope / Surfer SEO (content optimization)", "BrightLocal / Whitespark (local SEO)",
      "HubSpot / Salesforce (CRM attribution)", "Next.js / Webflow (landing pages)",
    ],
    faqs: [
      { q: "Do you guarantee rankings?", a: "No — and you should run from any agency that does. Google's algorithm has 200+ ranking factors and we don't control them. What we do guarantee is the work: a defined number of audit hours, content articles, link building outreach and reporting hours per month." },
      { q: "How long until we see results?", a: "Technical SEO fixes can show impact in 4-8 weeks. Content SEO compounds over 3-6 months. Local SEO can move the local pack in 6-12 weeks. We'll set realistic expectations during discovery based on your starting position and competition." },
      { q: "Do you write the content or just strategy?", a: "Both. We have in-house SEO copywriters for content production. We can also work with your existing content team in an editorial + strategy role if you prefer." },
      { q: "Do you do local SEO for multi-location businesses?", a: "Yes — we have a multi-location local SEO playbook covering GBP per location, location pages, citation building per city, review acquisition per location and local content production. We've shipped this for businesses with 5-50+ locations." },
      { q: "How do you report?", a: "Live dashboards in Looker Studio (or your BI tool of choice) updated daily. Monthly reports tied to SQL and revenue (not just traffic). Quarterly business reviews with revenue impact and forward-looking bets." },
    ],
  },

  "digital-marketing/social-media": {
    problem: [
      "Most social media agencies optimize for engagement metrics — likes, follower count, reach — that don't move revenue. You get a pretty dashboard every month and the same flat pipeline you started with.",
      "Template social packages ship generic Canva graphics, recycled trending audio, and posting schedules that ignore your audience's actual behavior. Your feed looks like every other brand in your space — invisible.",
    ],
    explanation: [
      "ClickTake's social media practice runs full-funnel — strategy, content production, community management, paid social and monthly performance reporting tied to revenue, not vanity metrics.",
      "We model the full funnel from impression → engagement → click → session → SQL → closed-won → LTV, and optimize for contribution margin. Every platform has its own playbook: short-form vertical video for TikTok/Reels, professional long-form for LinkedIn, visual storytelling for Instagram, community management across all channels.",
    ],
    benefits: [
      { title: "Platform-native content", desc: "Short-form vertical video for TikTok/Reels/Shorts, professional long-form for LinkedIn, visual storytelling for Instagram. No recycled posts across platforms." },
      { title: "Community management", desc: "Real-time response to comments, DMs and reviews — your audience feels heard, not ignored. We escalate sales opportunities to your team within 24h." },
      { title: "Paid social that scales", desc: "Meta, TikTok, LinkedIn and YouTube ad management with creative testing, attribution and ROAS optimization across every major ad platform." },
      { title: "Revenue-tied reporting", desc: "Dashboards in your CRM, not the social platform. Every channel mapped to SQL, closed-won and LTV — not vanity metrics." },
    ],
    process: [
      { t: "Audit & strategy", d: "Full audit: content, audience, competitors, paid accounts. Output: 90-day roadmap with platform-specific playbooks, content pillars and revenue projections." },
      { t: "Content engine", d: "Monthly content calendar: 12-20 posts per platform. Short-form video pipeline (script → shoot → edit → motion graphics). Brand-aligned templates in Figma." },
      { t: "Community management", d: "Daily monitoring of comments, DMs and reviews across all platforms. Sales opportunities escalated to your team within 24h. Sentiment reporting monthly." },
      { t: "Paid social", d: "Meta, TikTok, LinkedIn and YouTube ad management. Creative testing at scale. Attribution to revenue. Quarterly business reviews with ROI per platform." },
    ],
    tools: [
      "Figma (content templates)", "After Effects + Premiere + DaVinci Resolve (video)",
      "Meta Ads + TikTok Ads + LinkedIn Ads + YouTube Ads",
      "Later / Buffer / Hootsuite (scheduling)", "Brand24 / Mention (social listening)",
      "Looker Studio / Hex (reporting)", "HubSpot / Salesforce (CRM attribution)",
    ],
    faqs: [
      { q: "Do you produce the content or just strategy?", a: "Both. We have in-house designers, videographers and editors for content production. We can also work with your existing creative team in an editorial + strategy role." },
      { q: "Which platforms should we be on?", a: "It depends on your audience. B2B SaaS? LinkedIn + YouTube. DTC e-commerce? Instagram + TikTok + Pinterest. Local services? Facebook + Instagram + GBP. We'll recommend the right mix during discovery." },
      { q: "How often do you post?", a: "Typically 3-5x/week per platform, but it depends on your audience and capacity. Quality > quantity — we'd rather ship 3 great pieces than 10 mediocre ones." },
      { q: "Do you manage paid social too?", a: "Yes — paid social is bundled with organic in most engagements. We don't believe in siloing them. If you only want paid, we can do that too — but you'll get better results with both under one roof." },
      { q: "How do you report?", a: "Live dashboards in Looker Studio (or your BI tool) updated daily. Monthly reports tied to SQL and revenue (not just engagement). Quarterly business reviews with revenue impact per platform." },
    ],
  },

  "web/wordpress": {
    problem: [
      "Most WordPress builds ship as a pile of premium plugins held together with custom CSS and a page builder. They work for the first month, then degrade — plugin conflicts, security vulnerabilities, slow page loads, broken updates.",
      "WordPress agencies optimize for fast delivery, not maintainability. You get a site that looks fine in the demo, then becomes a maintenance nightmare the moment you try to update a plugin, change hosting, or add a new feature.",
    ],
    explanation: [
      "ClickTake's WordPress practice ships custom themes, custom plugins, headless WordPress with Next.js, performance optimization, security hardening and ongoing maintenance — for business sites across the UK, Pakistan, USA and Dubai.",
      "We treat WordPress as an engineering platform, not a configuration tool. Custom themes (no page builders), custom plugins (no premium plugin bloat), headless architecture where it makes sense, and rigorous security + performance audits on every build.",
    ],
    benefits: [
      { title: "Custom theme engineering", desc: "Hand-coded custom themes — no Elementor, no Divi, no WPBakery. Faster, more secure, more maintainable, and easier to extend." },
      { title: "Headless WordPress", desc: "Use WordPress as a CMS, ship the front-end on Next.js for sub-1s LCP, green Core Web Vitals and modern UX." },
      { title: "Security hardening", desc: "OWASP Top 10 remediation, 2FA, rate limiting, WAF, daily malware scans, automated updates with rollback. We've never had a client site hacked." },
      { title: "Performance optimization", desc: "Page caching, image optimization, lazy loading, CDN, database optimization. We typically ship 90+ PageSpeed scores on real WordPress builds." },
    ],
    process: [
      { t: "Discovery & architecture", d: "Map content model, integrations, performance budget, security requirements. Output: architecture diagram, plugin list (minimal), sprint plan." },
      { t: "Custom theme build", d: "Hand-coded theme (no page builder), custom blocks if needed, ACF/CMB2 for custom fields. Performance + accessibility baked in." },
      { t: "Plugin + integration", d: "Custom plugins where off-the-shelf won't work. E-commerce, membership, CRM, marketing automation, payment integrations." },
      { t: "Launch + maintenance", d: "Production deploy with security hardening + CDN + caching. 30 days post-launch support included. Maintenance plans start at £2k/month." },
    ],
    tools: [
      "WordPress 6.x", "Custom themes (ACF / CMB2)", "WooCommerce / MemberPress / Gravity Forms",
      "Next.js 16 (for headless)", "WPGraphQL / WP REST API", "Cloudflare (CDN + WAF)",
      "Stripe / PayPal / GoCardless", "HubSpot / Mailchimp / ActiveCampaign",
    ],
    faqs: [
      { q: "Do you use page builders like Elementor or Divi?", a: "No. We hand-code custom themes for performance, security and maintainability. Page builders add 2-3MB of JS, create vendor lock-in, and become unmaintainable as the site grows. If you need a visual editor for non-technical staff, we use Gutenberg blocks or a headless CMS." },
      { q: "Should we go headless?", a: "It depends. If you need sub-1s LCP, modern UX (animations, transitions, app-like features), or you're scaling beyond 100k monthly visits, headless makes sense. If you just need a fast marketing site, a well-built traditional WordPress theme is fine and cheaper. We'll recommend during discovery." },
      { q: "Can you migrate from Squarespace / Wix / Webflow / Shopify?", a: "Yes — we've migrated from all of them. We preserve SEO equity (URLs, redirects, schema), migrate content (blog posts, pages, media), and typically improve performance 3-5× in the process." },
      { q: "Do you offer ongoing maintenance?", a: "Yes — maintenance plans start at £2k/month and cover security patches, plugin updates, daily backups, uptime monitoring, performance audits and a fixed number of content hours. You can also pay hourly for ad-hoc work." },
      { q: "Can you handle WooCommerce at scale?", a: "Yes — we've shipped WooCommerce stores doing 7-8 figures annually. We optimize for catalog size, checkout performance, inventory sync, multi-currency and multi-warehouse. For very large catalogs (10k+ SKUs), we recommend headless WooCommerce." },
    ],
  },

  "web/ecommerce": {
    problem: [
      "Most e-commerce builds ship as a theme customization on top of Shopify or WooCommerce — they look fine in the demo, then cap your conversion rate, your AOV and your BFCM revenue for years.",
      "Off-the-shelf themes load 4+ MB of JS, can't surface AI-driven recommendations without an enterprise plan, and break the moment you need a custom checkout flow, multi-currency, or multi-warehouse inventory sync.",
    ],
    explanation: [
      "ClickTake's e-commerce practice ships headless Shopify, WooCommerce, Medusa and Saleor builds — plus custom marketplaces — with conversion-optimized UX, AI-driven product recommendations, inventory sync and SEO-ready architecture for brands in the UK, Pakistan, USA and Dubai.",
      "We engineer for performance (sub-1s LCP), conversion (custom checkout flows, upsells, order bumps), and scale (multi-currency, multi-language, multi-warehouse). We've shipped 7- and 8-figure DTC storefronts and marketplaces.",
    ],
    benefits: [
      { title: "Headless commerce", desc: "Next.js front-end + Shopify/Medusa/Saleor back-end. Sub-1s LCP, green Core Web Vitals, modern UX, no theme constraints." },
      { title: "AI-driven recommendations", desc: "Product recommendation models trained on your order history — 'frequently bought together', 'you may also like', 'complete the look'." },
      { title: "Multi-currency + multi-language", desc: "Stripe + Adyen for multi-currency. Weglot or custom i18n for multi-language. Tax-compliant checkout for UK, EU, US, UAE." },
      { title: "Unified inventory", desc: "Sync inventory across Shopify, Amazon, eBay, TikTok Shop and your warehouse — no overselling, no manual reconciliation." },
    ],
    process: [
      { t: "Discovery & architecture", d: "Map catalog size, integrations, payment gateways, shipping, tax. Output: architecture diagram (front-end + back-end + integrations), sprint plan." },
      { t: "Design system", d: "Conversion-optimized UI in Figma → shadcn/ui + Tailwind tokens. One source of truth for design, code and content." },
      { t: "Build sprints", d: "Weekly sprints with demos. Custom checkout flow, AI recommendations, inventory sync, multi-currency, multi-language." },
      { t: "Launch + iterate", d: "Production deploy with analytics, error tracking, A/B testing infrastructure. 30 days post-launch support + CRO backlog." },
    ],
    tools: [
      "Next.js 16 + React 19", "Shopify Storefront API / Medusa / Saleor / WooCommerce",
      "Stripe + Adyen (payments)", "Algolia (search)", "Postgres + pgvector (recs)",
      "Vercel / Cloudflare (hosting + CDN)", "Segment + GA4 + PostHog (analytics)",
      "Klaviyo / HubSpot (email + CRM)",
    ],
    faqs: [
      { q: "Shopify, Medusa, Saleor or WooCommerce — which should we pick?", a: "It depends on your budget, catalog size, customization needs and team. Shopify Plus is fastest to ship but most expensive at scale. Medusa and Saleor are open-source, self-hosted, and most flexible. WooCommerce is good if you already have WordPress. We'll recommend during discovery." },
      { q: "Can you migrate without losing SEO equity?", a: "Yes — we run a full URL audit, map every product and category URL to its new equivalent, ship 301 redirects, preserve schema markup, and add new Service + Product + FAQPage schemas. We've done this for 7-figure stores with zero SEO equity lost." },
      { q: "How do you handle multi-currency and tax?", a: "Stripe + Adyen for multi-currency payments. Tax compliance via Stripe Tax, TaxJar or Avalara depending on your volume and jurisdictions. We've shipped tax-compliant checkouts for UK, EU, US, Canada, Australia and UAE." },
      { q: "Do you build marketplaces?", a: "Yes — we've built multi-vendor marketplaces on Medusa, Saleor and custom architecture. Multi-vendor onboarding, split payments, vendor dashboards, commission structures, dispute resolution." },
      { q: "Can you handle B2B + DTC in one store?", a: "Yes — we ship B2B portals (account-based pricing, PO checkout, net-terms) alongside DTC storefronts. Same back-end, different front-ends. Common for brands selling both retail and wholesale." },
    ],
  },

  "web/custom-software": {
    problem: [
      "Most custom software projects ship as a pile of features held together with technical debt — they work for the first release, then become unmaintainable the moment you try to add a second feature, integrate a third party, or scale beyond the original 100 users.",
      "Offshore software shops optimize for delivery speed, not maintainability. You get a codebase no one understands, no documentation, no tests, no architecture — and a six-figure rebuild invoice when the original team disappears.",
    ],
    explanation: [
      "ClickTake's custom software practice ships business dashboards, CRM systems, booking platforms, inventory systems, repair shop management software, business portals, API integrations, SaaS products and reporting systems — engineered on modern stacks with multi-region delivery.",
      "We engineer for maintainability from day one: typed, tested, documented, observable. You get a codebase your future team can actually own — not a black box that requires us to maintain forever.",
    ],
    benefits: [
      { title: "Modern stack", desc: "Next.js 16, React 19, TypeScript strict, Postgres, Prisma, Stripe, NextAuth. No legacy frameworks, no technical debt on day one." },
      { title: "Typed + tested", desc: "TypeScript strict mode, unit + integration + e2e tests, CI pipeline. Bugs caught before deploy, not after." },
      { title: "Observable by default", desc: "Sentry for errors, PostHog for product analytics, structured logging, audit logs. You know what's happening in production." },
      { title: "Ownable code", desc: "Documented architecture, ADRs (architecture decision records), handoff docs, training sessions. Your future team will thank us." },
    ],
    process: [
      { t: "Discovery & architecture", d: "Map user journeys, data model, integrations, success metrics. Output: architecture diagram, data model, API contract, sprint plan." },
      { t: "Design system", d: "Component library in Figma → shadcn/ui + Tailwind tokens. One source of truth for design, code and content." },
      { t: "Build sprints", d: "Weekly sprints with demos. Every PR ships to a preview URL. You see progress every 5 business days." },
      { t: "Launch + handoff", d: "Production deploy with analytics, error tracking, uptime monitoring. 30 days of post-launch support + full handoff docs + training." },
    ],
    tools: [
      "Next.js 16 (App Router)", "React 19 + TypeScript 5", "Tailwind CSS 4 + shadcn/ui",
      "Postgres + Prisma 6", "Stripe billing + NextAuth v4", "Inngest / Temporal (workflows)",
      "Vercel / Cloudflare Workers (hosting)", "Sentry + PostHog (observability)",
      "Playwright (e2e)", "Linear (project tracking)",
    ],
    faqs: [
      { q: "We need a CRM — should we build or buy?", a: "Usually buy. HubSpot, Attio, Salesforce and Pipedrive cover 90% of CRM needs at a fraction of the cost of building. We'll recommend buying and integrating (which we do) — and only building custom where you genuinely need differentiation. Building a CRM is rarely a competitive advantage." },
      { q: "Can you integrate with our existing systems?", a: "Yes — we've integrated with HubSpot, Salesforce, Attio, Xero, QuickBooks, ShipStation, Klaviyo, Stripe, GoCardless, AWS, GCP, Azure, Snowflake, BigQuery and dozens of industry-specific APIs. We'll review your stack during discovery." },
      { q: "Do you build SaaS products?", a: "Yes — multi-tenant SaaS with RBAC, audit logs, Stripe billing (subscription + usage-based), admin tooling, observability. We've shipped SaaS from MVP to Series A." },
      { q: "Can you handle compliance (SOC2 / GDPR / HIPAA)?", a: "Yes — we've shipped SOC2-compliant and GDPR-compliant software. HIPAA is handled case-by-case. We work with your compliance team or can recommend a partner." },
      { q: "Do you offer ongoing maintenance?", a: "Yes. After the 30-day post-launch support window, we offer retainer plans starting at £3k/month covering security patches, dependency upgrades, performance audits and feature work." },
    ],
  },

  "web/maintenance": {
    problem: [
      "Most websites are launched and then forgotten — until a plugin update breaks the checkout, a security vulnerability gets exploited, or a Google algorithm change tanks your traffic. By then, the original agency has moved on and you're scrambling.",
      "Maintenance retainers from agencies are usually 'we'll keep an eye on it' — no SLA, no uptime guarantee, no proactive monitoring, no security patches, no performance audits. You pay £1k/month for nothing.",
    ],
    explanation: [
      "ClickTake's website maintenance plans cover security patches, dependency upgrades, daily backups, uptime monitoring, performance audits, content updates and emergency fixes — for WordPress, Next.js, Shopify and custom platforms.",
      "We treat maintenance as engineering, not babysitting. Proactive monitoring, automated patching with rollback, weekly performance audits, monthly security scans, and a real SLA with response time guarantees.",
    ],
    benefits: [
      { title: "Security first", desc: "OWASP Top 10 remediation, daily malware scans, automated security patches with rollback, 2FA enforcement, WAF, rate limiting." },
      { title: "Uptime SLA", desc: "99.9% uptime SLA on all maintenance plans. 24/7 monitoring with PagerDuty escalation. Average response time < 30 minutes." },
      { title: "Performance audits", desc: "Weekly Core Web Vitals monitoring, monthly performance audits, quarterly optimization sprints. We catch regressions before they hurt your SEO." },
      { title: "Content + feature work", desc: "Every plan includes a fixed number of content + feature hours per month. No ticket system, no quotes — just submit work and we ship." },
    ],
    process: [
      { t: "Onboarding", d: "Full site audit: security, performance, SEO, accessibility, backups, monitoring. Output: remediation backlog + onboarding report." },
      { t: "Proactive monitoring", d: "24/7 uptime monitoring, daily malware scans, weekly Core Web Vitals tracking, monthly security scans. Issues escalated to you + us via Slack/email." },
      { t: "Monthly cadence", d: "Weekly dependency updates, monthly security patches, monthly performance audits, quarterly optimization sprints, monthly content hours." },
      { t: "Emergency response", d: "Critical issues (site down, checkout broken, security breach) get a <30-min response, 24/7. Non-critical issues get a <4-hour response during business hours." },
    ],
    tools: [
      "PagerDuty (24/7 monitoring)", "Sentry (error tracking)", "PostHog (product analytics)",
      "Cloudflare (WAF + CDN + DDoS)", "GitHub Actions (automated patching)",
      "Vercel / WP Engine / Kinsta (hosting)", "UpdraftPlus / Backblaze (backups)",
      "Lighthouse / PageSpeed Insights (performance)",
    ],
    faqs: [
      { q: "What platforms do you maintain?", a: "Next.js, React, WordPress, WooCommerce, Shopify, Webflow, Medusa, Saleor and custom Postgres-backed applications. If your platform isn't listed, ask — we've likely worked with it." },
      { q: "Do you take over from another agency?", a: "Yes — we do this frequently. We run a full audit on day one (security, performance, SEO, code quality, infrastructure), document everything we find, and ship a remediation plan before we start the maintenance cadence." },
      { q: "What's your SLA?", a: "99.9% uptime SLA on all plans. Critical issues (site down, checkout broken, security breach) get a <30-minute response 24/7. Non-critical issues get a <4-hour response during business hours. Full SLA in the master services agreement." },
      { q: "Can you handle emergency fixes outside business hours?", a: "Yes — all plans include 24/7 emergency response for critical issues. Non-critical work is handled during business hours (Mon-Fri 09:30-21:00 in your region's timezone)." },
      { q: "How does the content hours system work?", a: "Each plan includes a fixed number of content + feature hours per month. You submit work via Slack or Linear, we ship it within 1-3 business days depending on scope. Unused hours roll over for one month, then expire. No ticket system, no quotes for in-scope work." },
    ],
  },

  "web/redesign": {
    problem: [
      "Most website redesigns fail at one of two extremes: either they keep the old site's architecture and just slap a new coat of paint on it (so the old performance and SEO problems persist), or they throw everything away and start from scratch (so 18 months of SEO equity evaporates overnight).",
      "Redesign agencies rarely understand SEO migration. They break URLs, lose schema markup, forget 301 redirects, ship a new IA that Google can't crawl — and your traffic drops 40% in the first month.",
    ],
    explanation: [
      "ClickTake's website redesign service modernizes your UI/UX, improves Core Web Vitals, preserves SEO equity (URLs, redirects, schema) and aligns with your current brand — for WordPress, Next.js, Shopify and custom sites across the UK, Pakistan, USA and Dubai.",
      "We treat redesign as engineering + SEO migration, not just design. URL audit, 301 redirect maps, schema preservation, content audit, performance budget, accessibility (WCAG 2.2 AA), and a launch-day monitoring plan to catch any traffic dips in real time.",
    ],
    benefits: [
      { title: "SEO equity preserved", desc: "Full URL audit, 301 redirect map, schema preservation, content audit. We've never lost a client more than 5% organic traffic in a redesign." },
      { title: "Modern UX + UI", desc: "Conversion-optimized design system in Figma → shadcn/ui + Tailwind tokens. Mobile-first, accessible, fast." },
      { title: "Green Core Web Vitals", desc: "LCP < 1.5s, CLS < 0.05, INP < 100ms on real user data — not lab tests. SEO + conversion lift is immediate." },
      { title: "Brand-aligned", desc: "Redesign aligned with your current brand identity — or use the redesign as an opportunity to refresh the brand too." },
    ],
    process: [
      { t: "Audit & strategy", d: "Full audit: SEO (URLs, schema, traffic), performance (Core Web Vitals), accessibility (WCAG 2.2 AA), content (what to keep/cull/rewrite). Output: redesign roadmap + redirect map." },
      { t: "Design system", d: "Conversion-optimized UI in Figma → shadcn/ui + Tailwind tokens. One source of truth for design, code and content. Aligned with your brand." },
      { t: "Build sprints", d: "Weekly sprints with demos. Every PR ships to a preview URL. SEO migration (redirects, schema, sitemap) wired in from sprint 1." },
      { t: "Launch + monitor", d: "Production deploy with real-time traffic monitoring. Day-1 redirect verification. 30 days post-launch support + SEO performance report." },
    ],
    tools: [
      "Figma (design system)", "Next.js 16 + Tailwind 4 (build)", "Screaming Frog (SEO audit)",
      "Ahrefs / SEMrush (backlink + keyword preservation)", "Lighthouse / PageSpeed (performance)",
      "axe / Lighthouse (accessibility)", "Cloudflare (CDN + redirects)",
    ],
    faqs: [
      { q: "Can you redesign without losing SEO?", a: "Yes — this is our specialty. We run a full URL audit, map every old URL to its new equivalent, ship 301 redirects, preserve schema markup, submit a new sitemap, and monitor traffic daily for the first 30 days. We've never lost a client more than 5% organic traffic in a redesign." },
      { q: "Should we replatform at the same time?", a: "Usually yes — if you're paying for a redesign, replatforming (e.g. WordPress → Next.js, Shopify → headless) at the same time saves you a second migration later. But if your current platform is working, we can redesign in place. We'll recommend during discovery." },
      { q: "How long does a redesign take?", a: "10-16 weeks for a typical marketing site (10-30 pages). 16-24 weeks for an e-commerce site or SaaS dashboard. We'll give you a fixed timeline + scope during discovery." },
      { q: "Do you handle the brand refresh too?", a: "Optional. We can work with your existing brand, or bring in our creative team to refresh the brand alongside the redesign. Most clients refresh the brand — it's efficient to do both at once." },
      { q: "What happens on launch day?", a: "We deploy during a low-traffic window (typically Friday night UK time). Real-time traffic monitoring in Search Console + GA4 + Ahrefs. Day-1 redirect verification. Day-7 performance report. Day-30 SEO performance report. If anything dips, we catch and fix it immediately." },
    ],
  },

  "web/domain-hosting": {
    problem: [
      "Most businesses treat domain and hosting as an afterthought — registered with the cheapest registrar, hosted on shared hosting that costs £3/month, DNS managed by an intern who left two years ago. Then the site goes down on BFCM and no one knows how to fix it.",
      "Domain registrars and hosting providers are notorious for hidden renewal fees, deceptive pricing, and lock-in. You think you're paying £10/year for a domain — until it auto-renews at £40, or expires because the credit card on file lapsed and someone scooped it up.",
    ],
    explanation: [
      "ClickTake's Domain & Hosting service handles domain registration, managed cloud hosting (Vercel, Cloudflare, AWS), SSL certificates, CDN configuration, DNS management, email hosting and 24/7 uptime monitoring — bundled with every ClickTake build or as a standalone service.",
      "We treat infrastructure as engineering. Domain registered with a reputable registrar, DNS managed by Cloudflare, hosting on Vercel/AWS/Cloudflare Workers, SSL auto-renewing, CDN configured for global performance, email hosted on Google Workspace or Microsoft 365, and 24/7 uptime monitoring with PagerDuty escalation.",
    ],
    benefits: [
      { title: "Reputable registrars", desc: "Domains registered with Cloudflare, Namecheap or Google Domains — at cost, no markup, no hidden renewal fees. Auto-renew with backup payment methods." },
      { title: "Managed cloud hosting", desc: "Vercel, Cloudflare Workers, AWS (ECS/Fargate), or Render — depending on your stack. No shared hosting, no cPanel, no insecure FTP." },
      { title: "Global CDN + SSL", desc: "Cloudflare CDN with 300+ edge locations. Auto-renewing SSL (Let's Encrypt or Cloudflare). HTTP/3, Brotli, image optimization." },
      { title: "24/7 monitoring", desc: "PagerDuty uptime monitoring with 1-minute checks. Email + SMS + Slack alerts. We respond to outages 24/7 — average response < 30 minutes." },
    ],
    process: [
      { t: "Discovery", d: "Map your stack, traffic, regions, compliance requirements. Output: hosting recommendation (Vercel / Cloudflare / AWS), DNS plan, SSL plan, monitoring plan." },
      { t: "Domain + DNS setup", d: "Domain registered or transferred. DNS migrated to Cloudflare (free plan minimum). SPF/DKIM/DMARC configured for email deliverability." },
      { t: "Hosting + CDN", d: "Hosting provisioned on Vercel / Cloudflare / AWS. CDN configured. SSL issued. Environment variables, secrets and API keys rotated." },
      { t: "Monitoring + handoff", d: "Uptime monitoring via PagerDuty. Performance monitoring via Lighthouse CI. Weekly performance reports. 24/7 emergency response." },
    ],
    tools: [
      "Cloudflare (DNS + CDN + WAF + SSL)", "Vercel (Next.js hosting)",
      "AWS (ECS / Fargate / S3 / RDS)", "Google Workspace / Microsoft 365 (email)",
      "PagerDuty (uptime monitoring)", "Lighthouse CI (performance)",
      "Terraform (infrastructure as code)", "Backblaze / S3 (backups)",
    ],
    faqs: [
      { q: "Can you take over management of our existing domain?", a: "Yes — we can either manage your domain in-place (registrar stays the same, we get delegated access) or transfer it to a registrar we manage. Either way, you retain full ownership and we provide admin access on request." },
      { q: "Do you mark up the hosting cost?", a: "No. We pass through the actual hosting cost (Vercel Pro, Cloudflare Pro, AWS, etc.) with no markup. You pay us for management + monitoring + support on top. We'll show you the actual hosting invoice." },
      { q: "Can you handle high-traffic sites?", a: "Yes — we've hosted sites doing 10M+ monthly visits on Cloudflare Workers + Vercel + AWS. We design for scale from day one: CDN caching, edge runtime, autoscaling, read replicas." },
      { q: "Do you handle email hosting too?", a: "Yes — we provision and manage Google Workspace or Microsoft 365 for business email. Includes SPF/DKIM/DMARC setup for deliverability, alias management, and 2FA enforcement." },
      { q: "What's your uptime SLA?", a: "99.9% uptime SLA on all hosting plans. 24/7 monitoring with 1-minute checks. Average response to outages < 30 minutes. Full SLA in the master services agreement." },
    ],
  },

  "creative/graphic-design": {
    problem: [
      "Most graphic design agencies deliver brand assets that look beautiful in a pitch deck but break the moment they hit production — logos that don't scale, color systems that fail accessibility, typography that breaks in 12 languages, graphics that don't fit any ad placement.",
      "Brand work is treated as an art project instead of a system. You get a 60-page guidelines PDF no one reads, instead of a living design system your team can actually use.",
    ],
    explanation: [
      "ClickTake's graphic design practice delivers brand systems — not just assets. Identities designed for digital-first brands, marketing collateral that ships in code, social media graphics that fit every placement, ad creative that converts, presentation design that wins deals, and print assets that print correctly.",
      "Every deliverable is built as a component: logo variants with usage rules, color tokens with accessibility-tested contrast ratios, type scales with web/CSS variables, motion templates with timing curves. Your team can extend the system without us.",
    ],
    benefits: [
      { title: "Production-ready systems", desc: "Design tokens that map directly to Tailwind / CSS variables. No translation gap between design and code." },
      { title: "Accessibility-tested", desc: "WCAG 2.2 AA contrast ratios verified across every color pairing. Your brand is inclusive by default." },
      { title: "Multi-format delivery", desc: "Logo variants for every context. Ad creative for every placement. Social graphics for every channel. No scramble when a new channel appears." },
      { title: "Living guidelines", desc: "Not a PDF — a Figma library + code component library + usage docs that update as your brand evolves." },
    ],
    process: [
      { t: "Brand discovery", d: "Stakeholder interviews, competitive audit, market positioning. Output: brand brief with voice, values, visual direction." },
      { t: "Identity exploration", d: "3 distinct directions presented as full mockups (logo, color, type, application). One selected for refinement." },
      { t: "System build", d: "Final identity expanded into a complete system: logo variants, color tokens, type scale, motion principles, component library." },
      { t: "Handoff & rollout", d: "Living guidelines (Figma + code), training session for your team, asset library, ongoing support for first 30 days." },
    ],
    tools: [
      "Figma + Figma Variables", "Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
      "Lottie / Rive (motion)", "Tailwind tokens export", "Storybook (component documentation)",
    ],
    faqs: [
      { q: "Do you do logo-only projects?", a: "Yes, but we'll push back if a logo in isolation won't solve your problem. A logo without a system is just a mark — it won't differentiate you. We recommend minimum identity packages (logo + color + type + basic application)." },
      { q: "Can you work with our existing brand?", a: "Absolutely — we frequently extend existing brands with new components, marketing collateral, or social graphics. We'll respect your brand guidelines while pushing the work forward." },
      { q: "Do you produce marketing collateral?", a: "Yes — social media graphics, ad creative (Meta, TikTok, LinkedIn, YouTube), presentation design (pitch decks, sales decks, webinars), print assets (business cards, brochures, signage), and email templates." },
      { q: "What's the difference between a brand identity and a design system?", a: "Identity = the visual expression (logo, color, type, voice). Design system = the operational layer (components, tokens, documentation, code). We deliver both." },
      { q: "Do you offer ongoing creative support?", a: "Yes — retainer plans for ongoing creative work (ad creative, social content, presentation design) start at £3k/month." },
    ],
  },

  "creative/web-design": {
    problem: [
      "Most web design agencies deliver pretty Figma mockups that look stunning in a pitch — then fall apart in production. They don't account for real content length, responsive behavior, accessibility, performance budgets, or engineering handoff.",
      "Design without engineering context produces mockups that can't be built, or that get built badly. Designers throw files over the wall; engineers rebuild from scratch; the final site looks nothing like the design.",
    ],
    explanation: [
      "ClickTake's web design practice ships UX research, wireframes, high-fidelity UI, design systems, interactive prototypes and engineering handoff — built on Figma, optimized for conversion and accessibility (WCAG 2.2 AA).",
      "We design for production from day one. Real content (not lorem ipsum), real responsive behavior, real accessibility constraints, real performance budgets. Engineering handoff is built into the design process — components, tokens, and Figma libraries that map directly to shadcn/ui + Tailwind.",
    ],
    benefits: [
      { title: "UX research first", desc: "User interviews, journey mapping, competitor analysis. Design grounded in real user needs — not aesthetic preferences." },
      { title: "Production-ready", desc: "Real content, real responsive behavior, real accessibility. No lorem ipsum, no broken states, no missing breakpoints." },
      { title: "Engineering handoff", desc: "Figma libraries with variables, components, auto-layout. Tokens map directly to Tailwind. Engineers build to spec — no translation gap." },
      { title: "Conversion-optimized", desc: "Every screen designed against a conversion goal. CTA placement, hierarchy, cognitive load, friction reduction — all considered." },
    ],
    process: [
      { t: "Discovery & UX research", d: "User interviews, journey mapping, competitor analysis, success metrics. Output: UX research brief + journey maps + wireframes." },
      { t: "Design system", d: "Component library in Figma with variables, auto-layout, accessibility-tested color pairings. One source of truth for design + code." },
      { t: "High-fidelity UI", d: "Pixel-perfect mockups for every screen, every state, every breakpoint. Interactive prototype for key flows." },
      { t: "Engineering handoff", d: "Tokens exported to Tailwind, components documented in Storybook, training session for engineering. 30 days of design support during build." },
    ],
    tools: [
      "Figma (design + prototypes + variables)", "Maze / Useberry (user testing)",
      "axe / Stark (accessibility)", "Lighthouse (performance budgets)",
      "Storybook (component documentation)", "Linear (project tracking)",
    ],
    faqs: [
      { q: "Do you design for mobile-first?", a: "Yes — every project starts with mobile wireframes and scales up to desktop. Mobile accounts for 60-80% of traffic on most client sites, so designing desktop-first is designing for the minority." },
      { q: "Can you work with our existing design system?", a: "Yes — we can extend your existing Figma library, or work within your brand guidelines. We'll respect your system while pushing the work forward. If you don't have a design system, we'll build one." },
      { q: "Do you do user testing?", a: "Yes — we run user testing via Maze or Useberry on every project, with 5-15 testers per round. We also do moderated user interviews for high-stakes projects (checkout, onboarding, pricing)." },
      { q: "What about accessibility?", a: "WCAG 2.2 AA is the default on every project. Color contrast verified with Stark/axe. Keyboard navigation, screen reader support, focus management — all designed in, not bolted on. We can also ship WCAG 2.2 AAA on request." },
      { q: "Do you handle the engineering build too?", a: "Optional. We can hand off to your engineering team (with full handoff docs + 30 days support), or our engineering team can build the design end-to-end. Most clients use us for both — it ensures the design ships as designed." },
    ],
  },

  "creative/video-production": {
    problem: [
      "Most video production agencies deliver beautiful long-form video that looks stunning — and then can't be cut for TikTok, Reels, Shorts, YouTube ads, or any of the 8 placements your marketing team actually needs.",
      "Video work is treated as a one-off deliverable, not a system. You get a 60-second ad, then pay another £5k to get it cut into 9:16, another £3k for 4:5, another £2k for 1:1 — by the time you have all the formats, you've spent 3× the original budget.",
    ],
    explanation: [
      "ClickTake's video editing practice delivers ads, explainers, social cuts, YouTube long-form, motion graphics and short-form vertical video — in every aspect ratio your channels need, from a single production budget.",
      "We treat video as a system, not a deliverable. Script → storyboard → shoot → edit → motion graphics → color → sound → multi-format delivery. Every shoot is planned for multi-format output. Every edit ships in every aspect ratio your channels need.",
    ],
    benefits: [
      { title: "Multi-format delivery", desc: "9:16, 1:1, 16:9, 4:5 — every aspect ratio your channels need, delivered from a single production budget. No £5k re-cuts." },
      { title: "End-to-end production", desc: "Script, storyboard, shoot (in-house crew for UK/PK; partner crews for US/UAE), edit, motion graphics, color, sound. One team, one timeline, one budget." },
      { title: "Platform-native editing", desc: "TikTok edits ≠ YouTube edits ≠ LinkedIn edits. We edit for each platform's pacing, hooks, captions and audience behavior." },
      { title: "Motion systems", desc: "Motion templates with timing curves, lower thirds, transitions — built as a system your team can extend." },
    ],
    process: [
      { t: "Discovery & script", d: "Brief, target audience, distribution plan, success metrics. Output: script + storyboard + shot list." },
      { t: "Shoot", d: "In-house crew for UK/PK; partner crews for US/UAE. 4K capture, professional lighting, sound, and talent direction." },
      { t: "Edit + motion", d: "Edit in Premiere/DaVinci. Motion graphics in After Effects. Color grade. Sound design. Captions." },
      { t: "Multi-format delivery", d: "Master cut delivered in 16:9. Re-cuts delivered in 9:16, 1:1, 4:5 for every platform. Source files handed over." },
    ],
    tools: [
      "Adobe Premiere + After Effects", "DaVinci Resolve (color)",
      "Lottie / Rive (motion graphics for web)", "Frame.io (review + approval)",
      "Descript (transcription + captions)", " Epidemic Sound (licensed music)",
    ],
    faqs: [
      { q: "Do you handle the shoot or just the edit?", a: "Both. We have in-house crews in the UK (Birmingham, London, Manchester) and Pakistan (Multan, Lahore, Karachi). For US (Austin) and UAE (Dubai) we use vetted partner crews. If you've already shot the footage, we can edit from your files." },
      { q: "How many formats do you deliver?", a: "Standard delivery is 16:9 (master), 9:16 (vertical), 1:1 (square), 4:5 (Instagram portrait). If you need additional formats (e.g. 9:16 with safe zones for TikTok captions, or 16:9 with end cards for YouTube ads), we deliver those too." },
      { q: "Can you produce short-form vertical at scale?", a: "Yes — we have a weekly short-form pipeline for clients doing 5-20 vertical videos per week. Each video goes through script → shoot (or stock) → edit → motion graphics → captions → publish in 24-48 hours." },
      { q: "Do you write the script?", a: "Yes — we have in-house scriptwriters for ads, explainers, social cuts and YouTube long-form. We can also work from your script, or co-write with your subject matter experts." },
      { q: "Who owns the footage?", a: "You do — fully. All raw footage, project files, motion graphics and final cuts are handed over. We retain no rights to your footage or final videos." },
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

  const copy = SERVICE_COPY[service.slug] || CATEGORY_COPY[service.category] || CATEGORY_COPY.web;

  // Pull the inclusions list — for starter-kit we use a richer one
  const isStarter = service.slug === "starter-kit";
  const inclusions = isStarter
    ? [
        "Domain registration (1 year) + managed cloud hosting (1 year)",
        "Production-ready Next.js website (up to 6 pages) with SEO + analytics wired in",
        "Complete brand identity (logo, color, typography, guidelines)",
        "Google Business Profile setup + optimization (local SEO foundation)",
        "Business email setup (Google Workspace or Microsoft 365)",
        "Foundational SEO setup (titles, meta, schema, sitemap, robots.txt, Search Console)",
        "30-day marketing starter plan (SEO content calendar + paid creative testing roadmap)",
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
