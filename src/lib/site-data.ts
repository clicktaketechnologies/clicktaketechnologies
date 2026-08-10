// Central source of truth for ClickTake brand & contact info.
// All hardcoded fallback data from the original ClickTake Vite project
// is consolidated here so components can render without Supabase.

export const SITE = {
  name: "ClickTake Technologies",
  domain: "clicktaketech.com",
  url: "https://clicktaketech.com",
  email: "info@clicktaketech.com",
  phones: [
    { label: "Pakistan", value: "+92 306 9753003", href: "tel:+923069753003" },
    { label: "United Kingdom", value: "+44 7391 653377", href: "tel:+447391653377" },
  ],
  locations: [
    {
      country: "United Kingdom",
      city: "Birmingham",
      flag: "🇬🇧",
      note: "Registered HQ — serving London, Manchester & the Midlands",
      coords: "52.4862° N, 1.8904° W",
      address: "Flat 312, Kitts Green Road, Birmingham B33 9SB",
      hours: "Mon-Sat: 09:30 AM - 09:00 PM GMT",
      phone: "+44 7391 653377",
    },
    {
      country: "Pakistan",
      city: "Multan",
      flag: "🇵🇰",
      note: "Engineering & delivery hub — serving Lahore, Karachi, Islamabad & beyond",
      coords: "30.1575° N, 71.5249° E",
      address: "Office #12, B.C.G Chowk, Paracha Street, Multan, Punjab 60600, Pakistan",
      hours: "Mon-Sat: 09:30 AM - 09:00 PM PKT",
      phone: "+92 306 9753003",
    },
    {
      country: "United States",
      city: "Austin, TX",
      flag: "🇺🇸",
      note: "North American business desk — coast to coast coverage",
      coords: "30.2672° N, 97.7431° W",
      address: "Remote-first · Available across US time zones",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM CST",
      phone: "+1 (by appointment)",
    },
    {
      country: "United Arab Emirates",
      city: "Dubai",
      flag: "🇦🇪",
      note: "MENA office — serving Abu Dhabi, Riyadh & Doha",
      coords: "25.2048° N, 55.2708° E",
      address: "Business Bay · Dubai, UAE",
      hours: "Mon-Sat: 10:00 AM - 08:00 PM GST",
      phone: "+971 (by appointment)",
    },
  ],
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/clicktaketechnologies/", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/clicktaketechnologiesuk/", icon: "instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/click-take-technologies/", icon: "linkedin" },
    { name: "YouTube", href: "https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw", icon: "youtube" },
    { name: "TikTok", href: "https://www.tiktok.com/@clicktaketechtechnologiesuk", icon: "tiktok" },
    { name: "Pinterest", href: "https://uk.pinterest.com/clicktaketechtechnologies/", icon: "pinterest" },
    { name: "Threads", href: "https://www.threads.com/@clicktaketech", icon: "threads" },
    { name: "Tumblr", href: "https://www.tumblr.com/clicktaketechtechnologies", icon: "tumblr" },
  ],
  brand: {
    primary: "#136DFF",
    accent: "#FF53A9",
  },
  tagline: "Connecting in a better way",
  founded: 2019,
} as const;

// ─── NAV LINKS (mix of in-page anchors and routed pages, matching original) ──
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Solutions", href: "/solutions", mega: true },
  // Resources mega shows: Portfolio + Case Studies (SHOWCASE) and Blog + Pricing (LEARN).
  { label: "Resources", href: "/resources", mega: true },
  // Company mega shows: About + Team + Careers (ABOUT US).
  { label: "Company", href: "/about", mega: true },
] as const;

// Secondary links (used in mobile menu / footer / not in top nav directly).
// Expanded after the homepage redesign collapsed Work / Case Studies / Blog /
// Pricing / About / Contact into the Resources + Company mega menus — these
// routes still need to appear in the footer Navigation column.
export const NAV_LINKS_SECONDARY = [
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Resources", href: "/resources" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Process", href: "/#process" },
  { label: "Testimonials", href: "/#testimonials" },
] as const;

// ─── SERVICE CATEGORY STYLES (matches original CATEGORY_STYLES + CATEGORY_DISPLAY) ──
export type ServiceCategoryStyle = {
  gradient: string;
  glow: string;
  borderHover: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  title: string;
  description: string;
  eyebrow: string;
  group: string;
};

export const CATEGORY_STYLES: Record<string, ServiceCategoryStyle> = {
  ai: {
    gradient: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "color-mix(in oklab, var(--brand-magenta) 12%, transparent)",
    borderHover: "hover:border-brand-magenta/40",
    accentColor: "text-brand-magenta",
    accentBg: "bg-brand-magenta/10",
    accentBorder: "border-brand-magenta/30",
    title: "Intelligent Systems",
    description:
      "Custom AI solutions that automate decisions, understand language, and see the world — built for production, not demos.",
    eyebrow: "AI & Machine Learning",
    group: "AI & Machine Learning",
  },
  web: {
    gradient: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "color-mix(in oklab, var(--brand-cyan) 12%, transparent)",
    borderHover: "hover:border-brand-cyan/40",
    accentColor: "text-brand-cyan",
    accentBg: "bg-brand-cyan/10",
    accentBorder: "border-brand-cyan/30",
    title: "Digital Products",
    description:
      "Production-grade applications built on proven stacks — performant, secure, and designed to scale from day one.",
    eyebrow: "Web Development",
    group: "Web Development",
  },
  marketing: {
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.12)",
    borderHover: "hover:border-emerald-500/40",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    title: "Growth Systems",
    description:
      "Data-led marketing that compounds. SEO, paid, and conversion work that drives qualified pipeline — not vanity metrics.",
    eyebrow: "Digital Marketing",
    group: "Digital Marketing",
  },
  creative: {
    gradient: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "color-mix(in oklab, var(--brand-pink) 12%, transparent)",
    borderHover: "hover:border-brand-pink/40",
    accentColor: "text-brand-pink",
    accentBg: "bg-brand-pink/10",
    accentBorder: "border-brand-pink/30",
    title: "Brand & Content",
    description:
      "Visual identities, digital product design, and video that makes your brand impossible to ignore.",
    eyebrow: "Creative Services",
    group: "Creative Services",
  },
};

// ─── ICON NAMES (matched to lucide-react in services.tsx) ──
export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  detailed_description?: string;
  category: keyof typeof CATEGORY_STYLES;
  icon_name: string;
  display_order: number;
};

// ─── SERVICES (matches original DB rows; icon_name maps to lucide icons) ──
// Aligned with ClickTake canonical 15-service list. New services added:
//   - Social Media Marketing (marketing)
//   - Web Design (creative)
//   - WordPress Development (web)
//   - E-commerce Development (web)
//   - Custom Software Development (web)
//   - AI Automation (ai)
//   - Website Maintenance (web)
//   - Website Redesign (web)
//   - Domain & Hosting (web)
// "Business Development Starter Kit" is retained (canonical "Business Startup Kit").
export const SERVICES: ServiceItem[] = [
  // AI
  { slug: "ai/llm", title: "Custom LLM Solutions", description: "Fine-tuned GPT & Llama models for your domain.", detailed_description: "Production-grade LLM apps with fine-tuning, RAG, and evaluation harnesses tuned to your domain.", category: "ai", icon_name: "Brain", display_order: 1 },
  { slug: "ai/chatbots", title: "AI Chatbots & Assistants", description: "Conversational agents that resolve tickets and qualify leads.", detailed_description: "Multi-channel AI chatbots for support, sales and internal knowledge — built on RAG and fine-tuned models.", category: "ai", icon_name: "Bot", display_order: 2 },
  { slug: "ai/prompt-engineering", title: "Prompt Engineering", description: "Reliable, evaluated prompt pipelines for production.", detailed_description: "Structured prompt systems with evals, fallbacks and observability — no more 'it works on Tuesday' prompts.", category: "ai", icon_name: "Wand2", display_order: 3 },
  { slug: "ai/cv-nlp", title: "Computer Vision & NLP", description: "OCR, defect detection, classification and beyond.", detailed_description: "Vision pipelines for manufacturing, retail and healthcare — from dataset curation to edge deployment.", category: "ai", icon_name: "Eye", display_order: 4 },
  { slug: "ai/automation", title: "AI Automation", description: "Lead capture, support, sales & reporting automation with AI agents.", detailed_description: "AI-driven automation for lead capture, customer support, sales workflows, reporting, email/SMS and business process orchestration — built on GPT-4o, Claude and Llama with evals, guardrails and observability.", category: "ai", icon_name: "Workflow", display_order: 5 },
  { slug: "ai/agents", title: "AI Agent Development", description: "Autonomous goal-pursuing agents with tool-use, memory and planning.", detailed_description: "Production AI agent systems that pursue multi-step goals autonomously — built on LangGraph, CrewAI and the Claude Agent SDK with typed tool schemas, persistent memory, plan-and-execute reasoning, eval harnesses, guardrails and human-in-the-loop checkpoints. Distinct from workflow automation: agents are goal-driven, not flow-driven.", category: "ai", icon_name: "Bot", display_order: 6 },

  // Web
  { slug: "web/full-stack", title: "Full-Stack Web Development", description: "Next.js, React, Node — production from day one.", detailed_description: "End-to-end web apps with auth, billing, realtime and observability — built on Next.js, Postgres and edge infrastructure.", category: "web", icon_name: "Server", display_order: 6 },
  { slug: "web/saas", title: "SaaS Platform Engineering", description: "Multi-tenant dashboards, billing, analytics.", detailed_description: "Multi-tenant SaaS with Stripe billing, RBAC, audit logs and admin tooling — engineered for scale from MVP to IPO.", category: "web", icon_name: "Layers", display_order: 7 },
  { slug: "web/auth", title: "Auth & Identity", description: "SSO, SAML, MFA, role-based access.", detailed_description: "Enterprise-grade auth: SSO, SAML, OIDC, MFA and granular RBAC — compliant with SOC2 and GDPR.", category: "web", icon_name: "Shield", display_order: 8 },
  { slug: "web/python-backend", title: "Python Backend & APIs", description: "FastAPI, Django, async workers, data pipelines.", detailed_description: "High-throughput Python backends with async workers, queues and observability — perfect for AI and data-heavy apps.", category: "web", icon_name: "Cloud", display_order: 9 },
  { slug: "web/wordpress", title: "WordPress Web Design Services", description: "Custom themes, plugins, headless WP, maintenance.", detailed_description: "WordPress web design services: custom themes, plugin development, headless WordPress with Next.js, performance optimization, security hardening and ongoing maintenance for business sites across the UK, Pakistan and USA. We design, build and host WordPress sites that load fast, rank well and convert visitors into customers.", category: "web", icon_name: "Layout", display_order: 10 },
  { slug: "web/ecommerce", title: "Ecommerce Web Design Services", description: "Shopify, WooCommerce, headless commerce, marketplaces.", detailed_description: "Ecommerce web design services for Shopify, WooCommerce, headless commerce (Medusa, Saleor) and custom marketplaces — with conversion-optimized UX, payment integrations, inventory sync and SEO-ready architecture for brands in the UK, Pakistan, USA and Dubai. We design and build Shopify stores, WooCommerce sites and headless commerce platforms that turn browsers into buyers.", category: "web", icon_name: "ShoppingCart", display_order: 11 },
  { slug: "web/custom-software", title: "Custom Software Development", description: "Dashboards, CRMs, booking, inventory, SaaS, portals, APIs.", detailed_description: "Custom software development for business dashboards, CRM systems, booking platforms, inventory systems, repair shop management, business portals, API integrations, SaaS products and reporting systems — engineered on modern stacks with multi-region delivery.", category: "web", icon_name: "Code2", display_order: 12 },
  { slug: "web/maintenance", title: "Website Maintenance & Hosting", description: "Security, updates, backups, monitoring, performance.", detailed_description: "Web design hosting services and website maintenance plans covering security patches, dependency upgrades, daily backups, uptime monitoring, performance audits, content updates and emergency fixes — for WordPress, Next.js, Shopify and custom platforms. Bundled with every ClickTake build or as a standalone retainer starting at £150/month.", category: "web", icon_name: "Wrench", display_order: 13 },
  { slug: "web/redesign", title: "Website Redesign", description: "Modernize, rebrand and replatform without losing SEO.", detailed_description: "Website redesign services that modernize your UI/UX, improve Core Web Vitals, preserve SEO equity (URLs, redirects, schema) and align with your current brand — for WordPress, Next.js, Shopify and custom sites across the UK, Pakistan, USA and Dubai.", category: "web", icon_name: "RefreshCw", display_order: 14 },
  { slug: "web/domain-hosting", title: "Web Design Hosting Services", description: "Domain registration, managed hosting, SSL, CDN, DNS.", detailed_description: "Web design hosting services: domain registration, managed cloud hosting (Vercel, Cloudflare, AWS), SSL certificates, CDN configuration, DNS management, email hosting and 24/7 uptime monitoring — bundled with every ClickTake build or as a standalone service. Starting at £25/month for managed WordPress hosting, £75/month for Next.js on Vercel Pro.", category: "web", icon_name: "Globe", display_order: 15 },

  // Marketing
  { slug: "digital-marketing/paid-advertising", title: "PPC / Paid Ads", description: "Google, Meta, TikTok & LinkedIn ads that scale.", detailed_description: "Full-funnel paid media with creative testing, attribution and ROAS optimization across every major ad platform.", category: "marketing", icon_name: "Megaphone", display_order: 16 },
  { slug: "digital-marketing/content-strategy", title: "Content Strategy & SEO", description: "Editorial that ranks and converts.", detailed_description: "Data-driven content engines — topical authority, programmatic SEO, and editorial calendars that compound traffic.", category: "marketing", icon_name: "PenTool", display_order: 17 },
  { slug: "digital-marketing/cro", title: "Conversion Rate Optimization", description: "Experimentation programmes that lift revenue.", detailed_description: "A/B testing programmes with statistical rigor, funnel analysis and CRO playbooks that compound conversion over time.", category: "marketing", icon_name: "TrendingUp", display_order: 18 },
  { slug: "seo", title: "SEO Services", description: "Technical, on-page, off-page and local SEO.", detailed_description: "End-to-end SEO services: technical audits, on-page optimization, off-page link building, local SEO, Google Business Profile optimization and monthly reporting for businesses across Birmingham, Multan, Austin and Dubai. Book a free SEO audit today.", category: "marketing", icon_name: "Search", display_order: 19 },
  { slug: "digital-marketing/social-media", title: "Social Media Marketing", description: "Strategy, content, community, paid social — full funnel.", detailed_description: "Social media marketing services across Facebook, Instagram, TikTok, LinkedIn, YouTube and X — strategy, content production, community management, paid social campaigns and monthly performance reporting for brands in the UK, Pakistan, USA and Dubai.", category: "marketing", icon_name: "Share2", display_order: 20 },

  // Creative
  { slug: "creative/graphic-design", title: "Graphic Design", description: "Identity systems, guidelines, marketing assets.", detailed_description: "Graphic design services: brand identities, marketing collateral, social media graphics, ad creative, presentation design and print assets — delivered as a living design system your team can extend.", category: "creative", icon_name: "Palette", display_order: 21 },
  { slug: "creative/web-design", title: "Professional Web Design Services", description: "UX research, wireframes, UI systems, prototypes.", detailed_description: "Professional web design services: UX research, wireframes, high-fidelity UI design, design systems, interactive prototypes and handoff to engineering — built on Figma, optimized for conversion and accessibility (WCAG 2.2 AA). Custom and bespoke web design for UK, Pakistan, USA and Dubai brands. Best for marketing sites, SaaS dashboards, ecommerce stores and brand rebuilds.", category: "creative", icon_name: "PenTool", display_order: 22 },
  { slug: "creative/video-production", title: "B2B Video Production", description: "B2B video production services UK: explainers, demos, brand films, video ads.", detailed_description: "B2B video production services UK from ClickTake Technologies — SaaS explainer videos (60–90s), product demos, corporate brand films, performance video ads (15–60s), YouTube long-form and motion graphics. Scripted storyboards, multi-aspect-ratio delivery (9:16, 1:1, 16:9), burned-in captions, sidecar SRT, 1–3 week turnaround per cut. 1,400+ cuts shipped. 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing. ROAS up 1.8×, CPV down 44%. Serving B2B SaaS and enterprise clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE). Fixed-scope pricing, script approvals before shoot, full IP ownership. Book a free 30-min video strategy call.", category: "creative", icon_name: "Video", display_order: 23 },

  // SEO-targeted landing pages (keyword-driven routes — Phase: Web Design Services KW Optimization)
  // Each captures a specific high-volume keyword cluster from the Aug 2026 Ahrefs export.
  { slug: "web-design-services", title: "Web Design Services", description: "Professional, custom & responsive websites for UK brands.", detailed_description: "Web design services for UK, Pakistan, USA and Dubai brands. ClickTake designs and builds professional, custom and responsive websites on Next.js + Figma — optimized for Core Web Vitals, SEO and conversion. From small business landing pages to enterprise SaaS dashboards and ecommerce stores, we ship fixed-scope projects in 4-12 weeks. 120+ sites shipped since 2019. Book a free 30-min consult.", category: "creative", icon_name: "PenTool", display_order: 24 },
  { slug: "seo-web-design", title: "SEO & Web Design Services", description: "Sites that rank and convert — SEO baked in from day one.", detailed_description: "SEO and web design services in one team. ClickTake ships fast, indexable, conversion-optimized websites that rank on Google — combining technical SEO (schema, sitemaps, Core Web Vitals), on-page SEO (title/meta/H1/internal links) and high-converting UI design. We handle both the design and the SEO so there's no finger-pointing between agencies. For brands in the UK, Pakistan, USA and Dubai. Book a free SEO audit + site review today.", category: "marketing", icon_name: "Search", display_order: 25 },
  { slug: "small-business-web-design", title: "Small Business Web Design Services", description: "Affordable, fast, SEO-ready sites for SMEs — from £1,500.", detailed_description: "Small business web design services for UK SMEs, local businesses and startups. ClickTake ships fast-launch (4 weeks), fixed-price, SEO-ready, mobile-first websites from £1,500 — built on Next.js, hosted on Vercel, optimized for Google Business Profile and local search. Includes contact form, basic SEO setup, analytics and 30 days of post-launch support. Book a free 30-min consult.", category: "creative", icon_name: "Sparkles", display_order: 26 },
  { slug: "responsive-web-design", title: "Responsive Web Design Services", description: "Mobile-first sites with Core Web Vitals <100, Lighthouse 95+.", detailed_description: "Responsive web design services for UK, Pakistan, USA and Dubai brands. ClickTake builds mobile-first, fully responsive websites that score 95+ on Lighthouse across all categories and pass Core Web Vitals (LCP <2.5s, CLS <0.1, INP <200ms). WCAG 2.2 AA accessibility. Built on Next.js + Tailwind, tested across 30+ real devices. Book a free 30-min consult.", category: "creative", icon_name: "Layout", display_order: 27 },

  // Flagship
  {
    slug: "starter-kit",
    title: "Business Startup Kit",
    description: "Domain, hosting, website, branding, GBP, business email, SEO setup & marketing starter plan — all in one package.",
    detailed_description:
      "Our flagship Business Startup Kit launches you online end-to-end: domain registration, managed hosting, a production-ready website, complete branding, Google Business Profile setup, business email, foundational SEO setup and a 30-day marketing starter plan. Built for new founders, local businesses and rebranders across the UK, Pakistan, USA and Dubai.",
    category: "starter-kit",
    icon_name: "Rocket",
    display_order: 0,
  },
];

// Helper: group services by category (excluding starter-kit), like original `serviceGroups` useMemo
export function groupServicesByCategory(services: ServiceItem[] = SERVICES) {
  const map = new Map<string, ServiceItem[]>();
  for (const s of services) {
    if (s.category === "starter-kit") continue;
    const g = map.get(s.category);
    if (g) g.push(s);
    else map.set(s.category, [s]);
  }
  return map;
}

export const STARTER_KIT = SERVICES.find((s) => s.slug === "starter-kit");

// ─── SERVICE CATEGORIES (kept for legacy components that import SERVICE_CATEGORIES) ──
export type ServiceCategory = {
  id: string;
  title: string;
  group: string;
  tagline: string;
  description: string;
  services: { title: string; desc: string }[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    group: "AI & ML",
    tagline: "Intelligent systems that learn, decide and ship value.",
    description:
      "From custom LLM applications and RAG pipelines to computer vision and AI automation, our AI practice helps businesses across the UK, Pakistan, USA and Dubai turn raw data into autonomous, revenue-driving products.",
    services: [
      { title: "Custom LLM Solutions", desc: "Fine-tuned GPT & Llama models for your domain." },
      { title: "AI Chatbots & Assistants", desc: "Conversational agents that resolve tickets and qualify leads." },
      { title: "Prompt Engineering", desc: "Reliable, evaluated prompt pipelines for production." },
      { title: "Computer Vision & NLP", desc: "OCR, defect detection, classification and beyond." },
      { title: "AI Automation", desc: "Lead capture, support, sales & reporting automation." },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    group: "Web",
    tagline: "High-performance websites & web apps engineered to convert.",
    description:
      "We design and build marketing sites, SaaS dashboards, e-commerce storefronts, WordPress sites, custom software and headless CMS platforms using Next.js, React and modern edge infrastructure — optimised for SEO in Birmingham, Pakistan, the US and Dubai markets.",
    services: [
      { title: "Full-Stack Web Development", desc: "Next.js, React, Node — production from day one." },
      { title: "SaaS Platform Engineering", desc: "Multi-tenant dashboards, billing, analytics." },
      { title: "Auth & Identity", desc: "SSO, SAML, MFA, role-based access." },
      { title: "Python Backend & APIs", desc: "FastAPI, Django, async workers, data pipelines." },
      { title: "WordPress Development", desc: "Custom themes, plugins, headless WP, maintenance." },
      { title: "E-commerce Development", desc: "Shopify, WooCommerce, headless commerce, marketplaces." },
      { title: "Custom Software Development", desc: "Dashboards, CRMs, booking, inventory, SaaS, portals, APIs." },
      { title: "Website Maintenance", desc: "Security, updates, backups, monitoring, performance." },
      { title: "Website Redesign", desc: "Modernize, rebrand and replatform without losing SEO." },
      { title: "Domain & Hosting", desc: "Domain registration, managed hosting, SSL, CDN, DNS." },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    group: "Growth",
    tagline: "Compounding growth across search, social and paid channels.",
    description:
      "Our growth team runs data-driven SEO, paid media, social media marketing, content and CRO programmes tailored to local intent in the UK (Birmingham), Pakistan, USA and Dubai — so every pound, rupee and dirham works harder.",
    services: [
      { title: "PPC / Paid Ads", desc: "Google, Meta, TikTok & LinkedIn ads that scale." },
      { title: "Content Strategy & SEO", desc: "Editorial that ranks and converts." },
      { title: "Conversion Rate Optimization", desc: "Experimentation programmes that lift revenue." },
      { title: "SEO Services", desc: "Technical, on-page, off-page and local SEO." },
      { title: "Social Media Marketing", desc: "Strategy, content, community, paid social — full funnel." },
    ],
  },
  {
    id: "creative",
    title: "Creative Services",
    group: "Creative",
    tagline: "Brand systems and product design that earn attention.",
    description:
      "Our designers craft brand identities, web design systems and motion packages that feel premium in every market we serve — from Birmingham startups to Dubai enterprises.",
    services: [
      { title: "Graphic Design", desc: "Identity systems, guidelines, marketing assets." },
      { title: "Web Design", desc: "UX research, wireframes, UI systems, prototypes." },
      { title: "Video Editing", desc: "Ads, explainers, social cuts, motion graphics." },
    ],
  },
];

export const STATS = [
  { value: "120+", label: "Products shipped" },
  { value: "4", label: "Global offices" },
  { value: "18", label: "Industries served" },
  { value: "98%", label: "Client retention" },
];

// ─── PROCESS STEPS (matches original Process.tsx data) ──
export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "Deep research into your goals, users and positioning to uncover opportunities that drive long-term growth.",
    icon: "Search",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "shadow-cyan-500/25",
    glowRaw: "rgba(0,200,255,0.3)",
    detail: "Competitor audits · User research · Market positioning · KPI mapping",
    duration: "Week 1",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "A scalable roadmap aligned with branding, user experience and measurable business impact.",
    icon: "Brain",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "shadow-blue-500/25",
    glowRaw: "rgba(59,130,246,0.3)",
    detail: "Tech stack selection · Wireframes · Sprint planning · Resource allocation",
    duration: "Week 1-2",
  },
  {
    n: "03",
    title: "Design",
    desc: "Premium interfaces crafted with motion, clarity and immersive visual systems that captivate.",
    icon: "Pencil",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "shadow-sky-500/25",
    glowRaw: "rgba(14,165,233,0.3)",
    detail: "UI/UX systems · Component libraries · Motion design · Brand integration",
    duration: "Week 2-3",
  },
  {
    n: "04",
    title: "Build",
    desc: "Modern engineering with AI integrations, scalable architecture and production-ready performance.",
    icon: "Cog",
    color: "from-teal-500 to-brand-cyan",
    glow: "shadow-teal-500/25",
    glowRaw: "rgba(20,184,166,0.3)",
    detail: "Agile sprints · Code reviews · QA testing · Performance audits",
    duration: "Week 3-6",
  },
  {
    n: "05",
    title: "Launch",
    desc: "Deployment, optimisation and continuous iteration focused on performance and growth metrics.",
    icon: "Rocket",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glow: "shadow-cyan-500/25",
    glowRaw: "rgba(0,200,255,0.3)",
    detail: "CI/CD pipeline · Analytics setup · SEO launch · Growth tracking",
    duration: "Week 6+",
  },
];

export const PROCESS_OUTCOMES = [
  { icon: "CheckCircle", label: "Quality Guaranteed", desc: "Every deliverable reviewed twice before handoff." },
  { icon: "Clock", label: "On-Time Delivery", desc: "Milestone-based sprints with transparent reporting." },
  { icon: "Users", label: "Dedicated Team", desc: "A named team member on every project, not tickets." },
  { icon: "Zap", label: "Fast Iterations", desc: "48-hr turnaround on feedback and revisions." },
];

// ─── TESTIMONIALS (merged from original fallback + geo-targeted) ──
export const TESTIMONIALS = [
  {
    quote:
      "ClickTake rebuilt our entire stack and tripled our online revenue in just four months. They genuinely felt like an extension of our internal team.",
    name: "Sarah Mitchell",
    role: "Founder, Lumen Commerce",
    location: "London, UK",
    rating: 5,
  },
  {
    quote:
      "The AI automations they engineered save us over 30 hours every week. Exceptional execution, clean systems and incredible design taste.",
    name: "James O'Connor",
    role: "CTO, Northwind",
    location: "Manchester, UK",
    rating: 5,
  },
  {
    quote:
      "The best digital partner we've worked with. Strategy, branding, development and growth — all executed at an elite level.",
    name: "Aisha Khan",
    role: "Marketing Director, Verve Studio",
    location: "Birmingham, UK",
    rating: 5,
  },
  {
    quote:
      "From brand identity to a fully custom booking platform, ClickTake handled everything end-to-end. Premium craft, delivered on deadline.",
    name: "Aisha Al-Mansoori",
    role: "COO, Hospitality group",
    location: "Dubai, UAE",
    rating: 5,
  },
];

// ─── PORTFOLIO / WORK (matches original fallbackProjects) ──
export const WORK_CASES = [
  {
    title: "Lumen Commerce",
    category: "E-Commerce · Headless Shopify",
    description:
      "Full headless rebuild with AI-driven product recommendations and a custom checkout flow. Delivered a 3× faster storefront and record-breaking BFCM sales.",
    metric: "+312% revenue",
    tags: ["Shopify", "Next.js", "AI Recs"],
    image: "/image1.webp",
    glow: "hover:shadow-cyan-500/20",
    url: "/portfolio#lumen-commerce",
    location: "Birmingham, UK",
  },
  {
    title: "Northwind SaaS",
    category: "Web App · AI Dashboard",
    description:
      "Built an analytics platform with GPT-powered insight summaries, role-based access, and real-time data pipelines for a B2B SaaS startup.",
    metric: "12k MAU",
    tags: ["React", "Node.js", "OpenAI"],
    image: "/image2.jpg",
    glow: "hover:shadow-indigo-500/20",
    url: "/portfolio#northwind-saas",
    location: "Manchester, UK",
  },
  {
    title: "Atlas Realty",
    category: "Brand Identity · Web",
    description:
      "Complete brand overhaul with a fast property listing site, map search, and mortgage calculator.",
    metric: "9.2 PageSpeed",
    tags: ["Branding", "Webflow", "Maps API"],
    image: "/image3.jpg",
    glow: "hover:shadow-violet-500/20",
    url: "/portfolio#atlas-realty",
    location: "Austin, USA",
  },
  {
    title: "Verve Studio",
    category: "Paid Growth · Marketing",
    description:
      "Meta & Google campaigns with funnel optimisation that scaled ROAS from 3× to 47×.",
    metric: "47× ROAS",
    tags: ["Meta Ads", "Google", "CRO"],
    image: "/image4.jpg",
    glow: "hover:shadow-fuchsia-500/20",
    url: "/portfolio#verve-studio",
    location: "Dubai, UAE",
  },
];

// ─── OFFICES (matches original Contact.tsx) ──
export const OFFICES = [
  {
    label: "UK Office",
    addr: "Flat 312, Kitts Green Road, Birmingham B33 9SB",
    phone: "+44 7391 653377",
    hours: "Mon-Sat: 09:30 AM - 09:00 PM GMT",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    label: "Pakistan · Multan HQ",
    addr: "Office #12, B.C.G Chowk, Paracha Street, Multan 60600",
    phone: "+92 306 9753003",
    hours: "Mon-Sat: 09:30 AM - 09:00 PM PKT",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    label: "Pakistan · Multan (Dev)",
    addr: "Basti Rid Lar, Multan, Punjab 59130",
    phone: "+92 306 9753003",
    hours: "Mon-Sat: 09:30 AM - 09:00 PM PKT",
    color: "from-emerald-500 to-teal-500",
  },
];

export const CONTACT_METHODS = [
  {
    icon: "MessageCircle",
    label: "WhatsApp · Pakistan",
    value: "+92 306 9753003",
    href: "https://wa.me/923069753003",
    glow: "from-emerald-400 to-green-500",
  },
  {
    icon: "Phone",
    label: "WhatsApp · United Kingdom",
    value: "+44 7391 653377",
    href: "https://wa.me/447391653377",
    glow: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: "Mail",
    label: "Email Address",
    value: "Info@clicktaketech.com",
    href: "mailto:Info@clicktaketech.com",
    glow: "bg-[#EC4899]/15 text-[#EC4899]",
  },
];

export const CONTACT_BENEFITS = [
  "Free project consultation",
  "Fast response within hours",
  "AI-powered scalable solutions",
];

// ─── RESOURCES (original /resources page fallback content) ──
export const RESOURCES = [
  {
    title: "The 2026 AI Adoption Playbook",
    excerpt: "A practical framework for evaluating where AI creates real ROI in your business — and where it doesn't.",
    category: "AI Strategy",
    readTime: "12 min read",
    slug: "ai-adoption-playbook-2026",
  },
  {
    title: "Birmingham SEO: A Local Business Guide",
    excerpt: "Rank in Birmingham's local pack with this step-by-step local SEO checklist for UK SMEs. Google Business Profile, citations, link-building & tracking included.",
    category: "SEO",
    readTime: "8 min read",
    slug: "birmingham-seo-guide",
  },
  {
    title: "Headless Shopify vs. Medusa: 2026 Comparison",
    excerpt: "Architecture, cost, and time-to-market compared for Shopify vs Medusa vs Saleor — with a recommendation matrix by use case and migration path.",
    category: "Engineering",
    readTime: "15 min read",
    slug: "headless-shopify-vs-medusa",
  },
  {
    title: "Pakistan Tech Talent: A Hiring Guide for Global Founders",
    excerpt: "Salary benchmarks, time zones, and quality bar — what to expect when hiring engineers in Pakistan. Covers contractor vs EOR vs subsidiary structures.",
    category: "Hiring",
    readTime: "10 min read",
    slug: "pakistan-tech-talent-guide",
  },
  {
    title: "Dubai Market Entry: Digital Playbook",
    excerpt: "From domain choice to local payment gateways — everything you need to launch digitally in the UAE. Covers licensing, SEO, payments & compliance.",
    category: "Market Entry",
    readTime: "11 min read",
    slug: "dubai-market-entry",
  },
  {
    title: "Austin SaaS Growth Channels That Work in 2026",
    excerpt: "The paid, organic, and community channels producing pipeline for Austin-based SaaS startups. Includes budget benchmarks and channel-mix recommendations.",
    category: "Growth",
    readTime: "9 min read",
    slug: "austin-saas-growth-channels",
  },
];

// ─── ABOUT (matches original About.tsx data) ──
export const ABOUT_STATS = [
  { val: "120+", label: "Projects Shipped", icon: "Code2", color: "bg-[#EC4899]/15 text-[#EC4899]" },
  { val: "80+", label: "Happy Clients", icon: "Users", color: "bg-[#EC4899]/15 text-[#EC4899]" },
  { val: "5.0", label: "Average Rating", icon: "Star", color: "from-amber-400 to-orange-500" },
  { val: "6+", label: "Years Active", icon: "TrendingUp", color: "from-teal-400 to-brand-cyan" },
];

export const ABOUT_VALUES = [
  {
    icon: "Zap",
    title: "Speed Without Compromise",
    desc: "48-hour feedback turnarounds. Milestone-driven sprints. We move fast and ship quality.",
    color: "from-amber-400 to-orange-500",
    glowRaw: "rgba(251,191,36,0.2)",
  },
  {
    icon: "Award",
    title: "Results-First Mindset",
    desc: "Every decision we make is tied to your KPIs — traffic, leads, conversions, revenue.",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glowRaw: "color-mix(in oklab, var(--brand-magenta) 20%, transparent)",
  },
  {
    icon: "Globe",
    title: "Global Delivery",
    desc: "Teams in the UK, Pakistan, USA and Dubai — coordinated across time zones for 18-hour coverage.",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
    glowRaw: "rgba(0,200,255,0.2)",
  },
];

// ─── BOOKING mock dates/times (original /contact used these) ──
export const BOOKING_TIMES = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

export function getBookingDates() {
  const today = new Date();
  const days: { day: string; num: string; month: string }[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let added = 0;
  let cursor = new Date(today);
  while (added < 5) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      // skip weekends
      days.push({
        day: dayNames[dow],
        num: String(cursor.getDate()).padStart(2, "0"),
        month: monthNames[cursor.getMonth()],
      });
      added++;
    }
  }
  return days;
}

// ─── SOLUTIONS (audience landing pages) ─────────────────────────────────────
export type Solution = {
  slug: string;
  title: string;
  audience: string;
  hero: string;
  summary: string;
  pain_points: string[];
  our_solution: string[];
  services: string[]; // service slugs to deep-link
  outcomes: { label: string; value: string }[];
  cta: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "startups",
    title: "For Startups",
    audience: "Founders launching a new product or brand",
    hero: "Launch online end-to-end in 90 days — not 9 months.",
    summary:
      "Get a complete brand, production-ready website, AI assistant and 90-day growth plan designed for founders who need to ship fast without cutting corners. Built for pre-seed to Series A teams across the UK, Pakistan, USA and Dubai.",
    pain_points: [
      "Stitching together brand, website, AI and growth from four different vendors wastes months and burns runway.",
      "Template-based startup kits produce generic results that fail to differentiate you in a crowded market.",
      "Founders cannot find a single partner that ships production-ready code, real AI and a real growth plan in a fixed timeline.",
    ],
    our_solution: [
      "One team, one timeline, one fixed scope — brand, website, AI assistant and growth playbook delivered in 90 days.",
      "Production-ready Next.js website (up to 6 pages) with SEO, analytics and CRM wired in from day one.",
      "Domain-trained AI assistant for lead qualification and 24/7 FAQ handling.",
      "90-day growth marketing plan with execution support for the first 30 days.",
    ],
    services: ["starter-kit", "web/full-stack", "ai/chatbots", "digital-marketing/content-strategy"],
    outcomes: [
      { label: "Time to live", value: "≈ 90 days" },
      { label: "Brand assets", value: "Full system" },
      { label: "AI assistant", value: "Production" },
      { label: "Growth plan", value: "90-day" },
    ],
    cta: "Start Your Startup Project",
  },
  {
    slug: "local-businesses",
    title: "For Local Businesses",
    audience: "Brick-and-mortar & service-area businesses",
    hero: "Win your local pack and turn searches into walk-ins.",
    summary:
      "Local SEO, Google Business Profile optimization, review management and a fast mobile site that converts local searches into booked appointments. Built for clinics, salons, repair shops, restaurants and professional services across Birmingham, Multan, Austin and Dubai.",
    pain_points: [
      "You are invisible in the Google local pack even though you have been in business for years.",
      "Your website is slow on mobile and visitors bounce before they call.",
      "Review collection is ad-hoc — competitors outrank you with 3× the reviews.",
    ],
    our_solution: [
      "Local SEO audit + Google Business Profile optimization (categories, services, photos, posts).",
      "Fast, mobile-first website rebuild on Next.js with click-to-call, booking and directions.",
      "Automated review request workflow via SMS and email post-appointment.",
      "Citation building and local link acquisition across UK, Pakistan, US and UAE directories.",
    ],
    services: ["seo", "web/full-stack", "digital-marketing/social-media", "web/maintenance"],
    outcomes: [
      { label: "Local pack", value: "Top 3" },
      { label: "PageSpeed", value: "90+" },
      { label: "Reviews/mo", value: "+15-30" },
      { label: "Calls/mo", value: "+40%" },
    ],
    cta: "Get Free Local SEO Audit",
  },
  {
    slug: "ecommerce-brands",
    title: "For E-commerce Brands",
    audience: "DTC, multi-channel and marketplace sellers",
    hero: "Headless commerce that loads fast, converts better and scales infinitely.",
    summary:
      "Headless Shopify, WooCommerce, Medusa and custom marketplace builds — with conversion-optimized UX, AI-driven product recommendations, inventory sync, multi-currency, and SEO-ready architecture for DTC brands in the UK, Pakistan, USA and Dubai.",
    pain_points: [
      "Your Shopify theme loads in 4+ seconds and you are losing 30% of mobile shoppers.",
      "Inventory desync between Shopify, Amazon and your warehouse causes overselling.",
      "You cannot personalize product recommendations without an enterprise plan.",
    ],
    our_solution: [
      "Headless commerce rebuild on Next.js + Shopify (or Medusa/Saleor) with sub-1s LCP.",
      "AI-driven product recommendations trained on your order history.",
      "Unified inventory sync across Shopify, Amazon, eBay and TikTok Shop.",
      "Multi-currency, multi-language and tax-compliant checkout for UK, EU, US and UAE.",
    ],
    services: ["web/ecommerce", "web/full-stack", "ai/automation", "digital-marketing/cro"],
    outcomes: [
      { label: "LCP", value: "<1.5s" },
      { label: "Conversion", value: "+25-60%" },
      { label: "AOV", value: "+15%" },
      { label: "Sync errors", value: "0" },
    ],
    cta: "Start Your E-commerce Project",
  },
  {
    slug: "repair-shops",
    title: "For Repair Shops",
    audience: "Phone, laptop, auto, appliance & gadget repair",
    hero: "Repair-shop management software built for the way you actually work.",
    summary:
      "Custom repair shop management software: ticket tracking, parts inventory, technician assignment, customer SMS notifications, payment processing and reporting — purpose-built for phone, laptop, auto and appliance repair businesses in the UK, Pakistan, USA and Dubai.",
    pain_points: [
      "Paper tickets and WhatsApp chats make it impossible to track repair status or parts usage.",
      "Customers call constantly asking for updates — eating your front-desk bandwidth.",
      "You cannot run a profitability report per technician or per repair type.",
    ],
    our_solution: [
      "Custom repair-shop management dashboard (web + tablet) with ticket lifecycle tracking.",
      "Automated SMS/email updates to customers at each stage: received → diagnosed → repaired → ready.",
      "Parts inventory with low-stock alerts and supplier reorder points.",
      "Per-technician, per-repair-type profitability reports and monthly revenue dashboards.",
    ],
    services: ["web/custom-software", "web/full-stack", "ai/automation", "web/maintenance"],
    outcomes: [
      { label: "Ticket time", value: "-40%" },
      { label: "Customer calls", value: "-70%" },
      { label: "Parts waste", value: "-25%" },
      { label: "Revenue visibility", value: "Real-time" },
    ],
    cta: "Build My Repair Shop Software",
  },
  {
    slug: "uk-businesses",
    title: "For UK Businesses",
    audience: "UK-registered SMEs and limited companies",
    hero: "A UK-registered partner that understands GDPR, HMRC and local intent.",
    summary:
      "ClickTake Technologies LTD is a UK private limited company serving Birmingham, London, Manchester and the Midlands. We deliver GDPR-compliant websites, SaaS platforms and growth systems with local SEO signals, UK payment integrations and British English copy.",
    pain_points: [
      "Offshore agencies do not understand GDPR, UK consumer law or British English nuance.",
      "You need a UK invoice and a UK-registered partner for procurement and HMRC.",
      "Local SEO signals (citations, NAP consistency, GBP) require a UK-based partner.",
    ],
    our_solution: [
      "UK private limited company (CLICKTAKE TECHNOLOGIES LTD) — UK invoice, UK contract, UK jurisdiction.",
      "GDPR-compliant data handling, cookie banners, DSAR workflows and privacy policies.",
      "Local SEO for Birmingham, London, Manchester — citations, GBP, NAP consistency.",
      "UK payment integrations: Stripe UK, GoCardless, Klarna, Clearpay, BACS.",
    ],
    services: ["web/full-stack", "seo", "digital-marketing/paid-advertising", "web/maintenance"],
    outcomes: [
      { label: "Entity", value: "UK Ltd Co" },
      { label: "GDPR", value: "Compliant" },
      { label: "Invoices", value: "UK VAT" },
      { label: "Coverage", value: "National" },
    ],
    cta: "Talk to a UK Expert",
  },
  {
    slug: "agencies",
    title: "For Agencies",
    audience: "Marketing, design & dev agencies needing white-label",
    hero: "White-label engineering, AI and growth — under your brand.",
    summary:
      "White-label web development, AI automation, SEO and content production for marketing, design and dev agencies in the UK, Pakistan, USA and Dubai. We deliver under your brand, with your email, your reports and your margins — at a capacity you could not staff in-house.",
    pain_points: [
      "You cannot hire senior engineers or AI specialists fast enough to keep up with sales.",
      "Margins on engineering work are too thin when you staff in-house in the UK or US.",
      "Quality control is inconsistent when you offload to cheap offshore contractors.",
    ],
    our_solution: [
      "White-label engineering team — senior Next.js, React, Node and Python developers under your brand.",
      "White-label AI automation, chatbot and LLM fine-tuning services for your clients.",
      "White-label SEO, content production and reporting — your logo, your domain, your margins.",
      "Dedicated Slack channel, weekly standups, NDA, IP assignment — fully white-label.",
    ],
    services: ["web/full-stack", "ai/automation", "seo", "creative/web-design"],
    outcomes: [
      { label: "Capacity", value: "+5 engineers" },
      { label: "Margin", value: "+40-60%" },
      { label: "Quality", value: "Senior" },
      { label: "Brand", value: "Yours" },
    ],
    cta: "Become a White-Label Partner",
  },
];

// ─── PRICING ────────────────────────────────────────────────────────────────
export type PricingPlan = {
  slug: "starter" | "growth" | "scale" | "custom";
  name: string;
  tagline: string;
  price_from: string;
  billing: string;
  description: string;
  features: string[];
  not_included: string[];
  cta: string;
  highlight: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "For new founders & local businesses",
    price_from: "£1,500",
    billing: "one-off project",
    description:
      "Get online with a fast, mobile-first website, foundational SEO and Google Business Profile setup. Perfect for new founders, local service businesses and rebrand launches that need to ship quickly without sacrificing quality.",
    features: [
      "Up to 5-page mobile-first Next.js website",
      "Google Business Profile setup + optimization",
      "Foundational on-page SEO (titles, meta, schema, sitemap)",
      "Contact form with spam protection + email notifications",
      "SSL, CDN, analytics and Search Console setup",
      "Domain + 1 year managed hosting",
      "2 rounds of revisions",
      "14-day post-launch support",
    ],
    not_included: [
      "AI chatbot or automation",
      "Ongoing monthly SEO",
      "Paid media management",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    slug: "growth",
    name: "Growth",
    tagline: "For scaling brands & e-commerce stores",
    price_from: "£6,000",
    billing: "one-off project + monthly retainer",
    description:
      "A production-ready website or e-commerce rebuild with AI automation, ongoing SEO, paid media management and conversion optimization. Designed for brands that have product-market fit and are ready to scale acquisition across the UK, Pakistan, USA and Dubai.",
    features: [
      "Up to 15-page Next.js website or Shopify/Medusa e-commerce rebuild",
      "AI chatbot for lead qualification + FAQs (domain-trained)",
      "Monthly SEO (technical, content, link building, GBP) — 3 months included",
      "Google + Meta paid ads management — 3 months included",
      "Conversion rate optimization (A/B tests, funnel analysis)",
      "Analytics + CRM integration (HubSpot/Attio)",
      "Unlimited revisions during build",
      "60-day post-launch support",
    ],
    not_included: [
      "Custom SaaS / multi-tenant engineering",
      "Enterprise SSO / SAML / compliance audit",
    ],
    cta: "Scale with Growth",
    highlight: true,
  },
  {
    slug: "scale",
    name: "Scale",
    tagline: "For SaaS, marketplaces & custom software",
    price_from: "£20,000",
    billing: "milestone-based project",
    description:
      "Custom software, SaaS platforms and marketplaces engineered for scale — multi-tenant architecture, billing, RBAC, audit logs, API integrations and 24/7 monitoring. Built for venture-backed startups and enterprises in the UK, Pakistan, USA and Dubai.",
    features: [
      "Custom software / SaaS / marketplace build (Next.js + Postgres)",
      "Multi-tenant data model + RBAC + audit logs",
      "Stripe billing (subscription + usage-based metering)",
      "AI automation: chatbots, lead capture, reporting, workflow",
      "API integrations (3rd party: HubSpot, Xero, ShipStation, etc.)",
      "Security audit + OWASP Top 10 remediation",
      "CI/CD pipeline + observability (Sentry, PostHog)",
      "90-day post-launch support + handoff documentation",
    ],
    not_included: [
      "Ongoing paid media management",
      "Monthly SEO content production",
    ],
    cta: "Engineer with Scale",
    highlight: false,
  },
  {
    slug: "custom",
    name: "Custom Quote",
    tagline: "For complex, multi-region or enterprise",
    price_from: "Let's talk",
    billing: "tailored engagement",
    description:
      "For multi-region enterprise deployments, complex migrations, HIPAA/SOC2 compliance, government contracts or ongoing retainers covering engineering, AI, design and growth — we will scope a tailored engagement with a fixed timeline and milestone-based billing.",
    features: [
      "Tailored scope across engineering, AI, design and growth",
      "Multi-region delivery (UK, Pakistan, USA, Dubai)",
      "Compliance: SOC2, HIPAA, GDPR, ISO 27001",
      "Dedicated team + project manager",
      "SLA-backed support and uptime",
      "Quarterly business reviews and roadmap planning",
      "On-site visits available (UK, US, UAE)",
      "Quarterly security audits",
    ],
    not_included: [
      "Nothing is off the table — let's discuss.",
    ],
    cta: "Request a Custom Quote",
    highlight: false,
  },
];

// ─── TEAM ───────────────────────────────────────────────────────────────────
export type TeamMember = {
  name: string;
  role: string;
  department: "Leadership" | "Development" | "Marketing" | "Creative" | "Operations";
  bio: string;
  focus: string[];
};

export const TEAM: TeamMember[] = [
  // Leadership
  {
    name: "ClickTake Leadership",
    role: "Founder & CEO",
    department: "Leadership",
    bio: "Leads ClickTake Technologies' vision across four regions — setting strategy for AI, web and growth engagements for clients in the UK, Pakistan, USA and Dubai.",
    focus: ["Strategy", "Partnerships", "Delivery"],
  },
  {
    name: "ClickTake Leadership",
    role: "CTO",
    department: "Leadership",
    bio: "Owns engineering standards across all ClickTake projects — from LLM evaluation harnesses to multi-tenant SaaS architecture and security audits.",
    focus: ["Architecture", "AI", "Security"],
  },
  {
    name: "ClickTake Leadership",
    role: "Head of Growth",
    department: "Leadership",
    bio: "Drives the growth practice — SEO, paid media, content and CRO — for brands across Birmingham, Multan, Austin and Dubai.",
    focus: ["SEO", "Paid Media", "CRO"],
  },
  // Development
  {
    name: "ClickTake Engineer",
    role: "Senior Full-Stack Engineer",
    department: "Development",
    bio: "Ships Next.js, React and Node applications with auth, billing and observability — turning designs into production code that scales.",
    focus: ["Next.js", "TypeScript", "Postgres"],
  },
  {
    name: "ClickTake Engineer",
    role: "AI / ML Engineer",
    department: "Development",
    bio: "Builds LLM applications, RAG pipelines and computer vision systems — with evals, guardrails and cost controls baked in.",
    focus: ["LLMs", "RAG", "Evals"],
  },
  {
    name: "ClickTake Engineer",
    role: "WordPress & E-commerce Engineer",
    department: "Development",
    bio: "Delivers WordPress, Shopify, WooCommerce and headless commerce builds with conversion-optimized UX and SEO-ready architecture.",
    focus: ["WordPress", "Shopify", "Headless"],
  },
  {
    name: "ClickTake Engineer",
    role: "Python Backend Engineer",
    department: "Development",
    bio: "Builds high-throughput Python backends with FastAPI, async workers and observability — perfect for AI and data-heavy applications.",
    focus: ["Python", "FastAPI", "Data"],
  },
  // Marketing
  {
    name: "ClickTake Growth",
    role: "SEO Specialist",
    department: "Marketing",
    bio: "Runs technical SEO, content optimization, link building and local SEO for clients across the UK, Pakistan, USA and Dubai.",
    focus: ["Technical SEO", "Local SEO", "Content"],
  },
  {
    name: "ClickTake Growth",
    role: "Paid Media Manager",
    department: "Marketing",
    bio: "Manages Google, Meta, TikTok and LinkedIn ad campaigns with creative testing, attribution and ROAS optimization.",
    focus: ["Google Ads", "Meta Ads", "Attribution"],
  },
  {
    name: "ClickTake Growth",
    role: "Social Media Manager",
    department: "Marketing",
    bio: "Owns organic social across Facebook, Instagram, TikTok, LinkedIn and YouTube — strategy, content calendars and community management.",
    focus: ["Social Strategy", "Content", "Community"],
  },
  // Creative
  {
    name: "ClickTake Creative",
    role: "Brand & Graphic Designer",
    department: "Creative",
    bio: "Designs brand identities, marketing collateral and design systems that travel across every channel and market.",
    focus: ["Brand", "Identity", "Design Systems"],
  },
  {
    name: "ClickTake Creative",
    role: "UI/UX Designer",
    department: "Creative",
    bio: "Crafts UX research, wireframes, high-fidelity UI and prototypes optimized for conversion and WCAG 2.2 AA accessibility.",
    focus: ["UX Research", "UI Design", "Prototyping"],
  },
  {
    name: "ClickTake Creative",
    role: "Video Editor",
    department: "Creative",
    bio: "Edits ads, explainers, social cuts, motion graphics and short-form vertical video for every channel and aspect ratio.",
    focus: ["Editing", "Motion", "Short-form"],
  },
  // Operations
  {
    name: "ClickTake Operations",
    role: "Project Manager",
    department: "Operations",
    bio: "Coordinates multi-region delivery across the UK, Pakistan, USA and Dubai — sprint planning, weekly demos, and milestone reporting.",
    focus: ["Delivery", "Sprints", "Reporting"],
  },
  {
    name: "ClickTake Operations",
    role: "Client Success Manager",
    department: "Operations",
    bio: "Owns post-launch support, renewals and ongoing retainer relationships — ensuring every ClickTake client gets continuous value.",
    focus: ["Support", "Renewals", "Retainers"],
  },
];

export const TEAM_DEPARTMENTS = [
  "Leadership",
  "Development",
  "Marketing",
  "Creative",
  "Operations",
] as const;

// ─── CAREERS ────────────────────────────────────────────────────────────────
export type CareerRole = {
  slug: string;
  title: string;
  department: "Development" | "Marketing" | "Creative" | "Operations" | "Sales";
  location: "Birmingham, UK" | "Multan, Pakistan" | "Austin, USA" | "Dubai, UAE" | "Remote";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
};

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: "senior-nextjs-engineer",
    title: "Senior Next.js Engineer",
    department: "Development",
    location: "Remote",
    type: "Full-time",
    summary:
      "Lead the engineering of production Next.js applications for clients across the UK, Pakistan, USA and Dubai — owning architecture, code quality and delivery.",
    responsibilities: [
      "Architect and ship Next.js 16 (App Router) applications with server components, server actions and edge runtime.",
      "Own code quality: TypeScript strict, unit + e2e tests, CI pipelines, code reviews.",
      "Collaborate with design on a shadcn/ui + Tailwind 4 component library.",
      "Mentor mid-level engineers and run weekly code review sessions.",
      "Partner with PMs on sprint planning, estimation and risk management.",
    ],
    requirements: [
      "5+ years shipping production React/Next.js applications.",
      "Deep understanding of Next.js App Router, server components, and edge runtime.",
      "TypeScript strict mode, Tailwind, Prisma, Postgres, Stripe billing.",
      "Strong written English and async collaboration skills (we span 4 time zones).",
    ],
    nice_to_have: [
      "Experience with multi-tenant SaaS architecture.",
      "AI/LLM integration experience (OpenAI, Anthropic, LangChain).",
      "Open-source contributions or technical writing.",
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    department: "Development",
    location: "Multan, Pakistan",
    type: "Full-time",
    summary:
      "Build production LLM applications, RAG pipelines and AI automation workflows for clients across four regions — with evals, guardrails and observability baked in.",
    responsibilities: [
      "Design and ship LLM applications using GPT-4o, Claude and Llama — with RAG, fine-tuning and tool-using agents.",
      "Build evaluation harnesses with golden datasets and regression tests.",
      "Implement guardrails (PII, toxicity, groundedness) and cost/latency controls.",
      "Work with the engineering team to integrate AI into Next.js applications.",
      "Stay current with the LLM research literature and apply findings to client work.",
    ],
    requirements: [
      "3+ years building production ML/LLM systems.",
      "Python (FastAPI), LangChain/LlamaIndex, pgvector/Pinecone, LangSmith/Langfuse.",
      "Experience with RAG, fine-tuning and agent architectures.",
      "Strong communication skills for client-facing workshops.",
    ],
    nice_to_have: [
      "Published research in NLP/ML.",
      "Experience with computer vision (YOLO, OCR).",
      "Familiarity with edge deployment (Modal, Ray).",
    ],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    department: "Marketing",
    location: "Birmingham, UK",
    type: "Full-time",
    summary:
      "Run technical SEO, content optimization, link building and local SEO for clients across the UK, Pakistan, USA and Dubai — driving measurable organic growth.",
    responsibilities: [
      "Conduct technical SEO audits and implement fixes (Core Web Vitals, schema, crawlability).",
      "Build topical authority maps and content calendars for client blogs.",
      "Execute local SEO: GBP optimization, citation building, NAP consistency.",
      "Acquire high-quality backlinks through outreach and partnerships.",
      "Report monthly on organic traffic, rankings and conversions.",
    ],
    requirements: [
      "3+ years in an SEO role with measurable results.",
      "Expert with Ahrefs/SEMrush, Search Console, GA4 and Looker Studio.",
      "Strong understanding of technical SEO (Core Web Vitals, schema, JS rendering).",
      "Excellent written English for content production.",
    ],
    nice_to_have: [
      "Experience with programmatic SEO.",
      "Local SEO for multi-location businesses.",
      "Familiarity with e-commerce SEO (Shopify, WooCommerce).",
    ],
  },
  {
    slug: "graphic-designer",
    title: "Brand & Graphic Designer",
    department: "Creative",
    location: "Remote",
    type: "Full-time",
    summary:
      "Design brand identities, marketing collateral and design systems for clients across four regions — delivering premium craft that travels across every channel.",
    responsibilities: [
      "Design brand identities: logos, typography, color systems, guidelines.",
      "Produce marketing collateral: social graphics, ad creative, presentations.",
      "Maintain design systems in Figma with variables and component libraries.",
      "Collaborate with engineering on design tokens → Tailwind / CSS variables.",
      "Ensure WCAG 2.2 AA accessibility across all color pairings.",
    ],
    requirements: [
      "3+ years in a brand or graphic design role.",
      "Expert with Figma (variables, components, auto-layout).",
      "Strong portfolio demonstrating brand identity work.",
      "Understanding of accessibility (WCAG 2.2 AA contrast ratios).",
    ],
    nice_to_have: [
      "Motion design (Lottie, Rive, After Effects).",
      "Print design experience.",
      "Illustration skills.",
    ],
  },
  {
    slug: "frontend-engineer-intern",
    title: "Frontend Engineer Intern",
    department: "Development",
    location: "Multan, Pakistan",
    type: "Internship",
    summary:
      "Join our Multan engineering hub as a frontend intern — learn Next.js, React, TypeScript and Tailwind from senior engineers while shipping real features for real clients.",
    responsibilities: [
      "Build UI components in Next.js + Tailwind under the guidance of senior engineers.",
      "Write unit tests and participate in code reviews.",
      "Help with bug fixes, performance audits and accessibility improvements.",
      "Learn the ClickTake delivery process from discovery to launch.",
    ],
    requirements: [
      "Final-year student or recent graduate in CS or related field.",
      "Solid understanding of HTML, CSS, JavaScript and React basics.",
      "Willingness to learn Next.js App Router, TypeScript and Tailwind.",
      "Can-do attitude and strong communication skills.",
    ],
    nice_to_have: [
      "Personal projects on GitHub.",
      "Familiarity with TypeScript.",
      "Experience with Tailwind CSS.",
    ],
  },
];

export const CAREERS_PERKS = [
  { icon: "Globe", title: "Remote-first", desc: "Work from anywhere in the UK, Pakistan, USA or Dubai — we span 4 time zones and ship like one team." },
  { icon: "TrendingUp", title: "Real growth", desc: "Weekly 1:1s, mentorship from senior engineers and a personal learning budget (£1,500/yr)." },
  { icon: "Heart", title: "Health & wellness", desc: "Private health insurance (UK/UAE), family medical coverage (Pakistan) and wellness stipend." },
  { icon: "Laptop", title: "Top-tier gear", desc: "MacBook Pro or equivalent, 32GB RAM, mechanical keyboard and a 4K monitor of your choice." },
  { icon: "Plane", title: "Team retreats", desc: "Quarterly team retreats across our 4 regions — last year: Birmingham, Lahore, Austin, Dubai." },
  { icon: "Award", title: "Real impact", desc: "Ship to real clients from week one — no throwing interns on the bug backlog." },
];

export const CAREERS_DEPARTMENTS = [
  "Development",
  "Marketing",
  "Creative",
  "Operations",
  "Sales",
] as const;

// ─── BLOG ───────────────────────────────────────────────────────────────────
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "SEO" | "Web Dev" | "Digital Marketing" | "AI Automation" | "Business Startup" | "E-commerce" | "Case Studies" | "Company News";
  author: string;
  publishedAt: string; // ISO date
  readTime: string;
  tags: string[];
  body: string; // markdown-ish plain text body (used for SEO/OG fallback)
  heroImage?: string; // optional hero image URL
  bodyHtml?: string; // optional rich HTML body (preferred for rendering)
};

export const BLOG_CATEGORIES = [
  "SEO",
  "Web Dev",
  "Digital Marketing",
  "AI Automation",
  "Business Startup",
  "E-commerce",
  "Case Studies",
  "Company News",
] as const;

// ─── BLOG (real articles, sourced from /blog_src/*.md) ───────────────────
// AUTO-GENERATED by scripts/port_blog_to_ts.py — do not edit by hand.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "blog-7-best-ai-chatbots-for-capturing-website-leads-2026",
    title: "7 Best AI Chatbots for Capturing Website Leads (2026)",
    excerpt: "If you're asking what is the best AI chatbot for capturing leads on a website, the answer depends on something most buying guides skip entirely: whether the bot actually qualifies prospects or merely collects their contact details.",
    category: "AI Automation",
    author: "ClickTake Technologies",
    publishedAt: "2026-08-05",
    readTime: "14 min read",
    tags: ["ai-chatbot", "lead-qualification"],
    body: "If you're asking what is the best AI chatbot for capturing leads on a website, the answer depends on something most buying guides skip entirely: whether the bot actually qualifies prospects or merely collects their contact details.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/7-best-ai-chatbots-for-capturing-website-leads-2026-1785665053464.webp",
    bodyHtml: "<p class=\"ck-prose-p\">If you're asking what is the best AI chatbot for capturing leads on a website, the answer depends on something most buying guides skip entirely: whether the bot actually qualifies prospects or merely collects their contact details. Many websites that deploy a chatbot fall into the same trap, they configure it to gather an email address, call it lead generation, and wonder why the sales team is still drowning in unqualified enquiries. Gathering a contact is not the same as qualifying a prospect. A visitor who types their email into a chat widget has told you almost nothing about whether they're worth a sales conversation.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, we encounter this pattern regularly when auditing client conversion stacks. A chatbot sits on the homepage, asks for a name and email, passes nothing meaningful to the CRM, and the sales team manually triages every conversation. The tool itself is rarely the problem. The configuration is.</p>\n<p class=\"ck-prose-p\">This article compares seven AI chatbot platforms evaluated against the criteria that actually affect lead conversion: conditional branching, CRM write-back depth, appointment booking capability, pricing relative to volume, and UK GDPR controls. By the end, you'll have a clear shortlist and a practical framework for trialling whichever platform fits your setup.</p>\n<h2 class=\"ck-h2\" id=\"what-makes-a-chatbot-actually-qualify-leads-not-just-collect-them\">What makes a chatbot actually qualify leads, not just collect them</h2>\n<p class=\"ck-prose-p\">The difference between an <a href=\"https://www.lindy.ai/blog/ai-lead-generation-chatbot\">AI lead capture chatbot</a> and a genuine lead-qualification tool comes down to a handful of non-negotiable capabilities. A chatbot that asks \"What's your email?\" is replacing a form, not running a qualification process. Qualification means the bot branches based on answers, routes the lead based on budget or intent, and passes structured data directly to your CRM or sales inbox. Conditional logic, CRM write-back, and progressive profiling are the foundations; without them, you have a lead capture widget, not a qualification engine.</p>\n<h3 class=\"ck-h3\" id=\"the-criteria-that-separate-lead-qualification-from-lead-collection\">The criteria that separate lead qualification from lead collection</h3>\n<p class=\"ck-prose-p\">Every platform in this comparison was evaluated against five criteria:</p>\n<ul class=\"ck-prose-ul\">\n<li class=\"ck-prose-li\"><strong>Conditional branching and multi-step flows</strong>, can the bot ask different questions based on previous answers, or does every visitor get the same sequence?</li>\n<li class=\"ck-prose-li\"><strong>Native CRM integration depth</strong>, does the bot write directly to your CRM, or does it rely on Zapier as a middleman?</li>\n<li class=\"ck-prose-li\"><strong>Appointment booking capability</strong>, can a qualified lead book a call without leaving the chat?</li>\n<li class=\"ck-prose-li\"><strong>Pricing transparency relative to volume</strong>, does the cost scale predictably as your traffic grows?</li>\n<li class=\"ck-prose-li\"><strong>UK GDPR data controls</strong>, where is data stored, and does the platform support consent capture and DSAR handling?</li>\n</ul>\n<h3 class=\"ck-h3\" id=\"why-most-chatbot-deployments-underperform-on-conversion\">Why most chatbot deployments underperform on conversion</h3>\n<p class=\"ck-prose-p\">The failure mode is almost always the same: buy an off-the-shelf tool, use the default template, add no qualification logic, and connect nothing to the CRM. The result is a chat widget that collects contacts the sales team still has to manually review. Industry benchmarks from Ruler Analytics put average form-to-lead conversion at 1.7 to 2.9% across industries. Well-configured conversational lead generation flows can outperform that meaningfully, research from Drift and Intercom's own published benchmarks cite improvements of 20 to 35% in some deployments, with select high-intent implementations reporting conversion rates approaching three times a static form. The gap is not about the tool; it's about whether the tool is configured to do real qualification work.</p>\n<h2 class=\"ck-h2\" id=\"what-is-the-best-ai-chatbot-for-capturing-leads-on-a-website-7-options-compared\">What is the best AI chatbot for capturing leads on a website, 7 options compared</h2>\n<p class=\"ck-prose-p\">Rather than reviewing each platform in isolation, grouping them by primary use case gives you a faster route to a shortlist. The groups below map to the most common deployment scenarios.</p>\n<h3 class=\"ck-h3\" id=\"comparison-overview\">Comparison overview</h3>\n<div class=\"ck-prose-table-wrap\"><table class=\"ck-prose-table\">\n<thead>\n<tr>\n<th>Platform</th>\n<th>Best for</th>\n<th>Starting price</th>\n<th>Conditional branching</th>\n<th>Native CRM write-back</th>\n<th>Booking</th>\n<th>EU/UK data hosting</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tidio</td>\n<td>SMB / e-commerce</td>\n<td>From $29/mo</td>\n<td>Paid tiers only</td>\n<td>Via middleware</td>\n<td>Limited</td>\n<td>EU hosting available</td>\n</tr>\n<tr>\n<td>Freshchat</td>\n<td>Budget B2B</td>\n<td>From $19/mo</td>\n<td>Basic</td>\n<td>CRM sync</td>\n<td>No</td>\n<td>Verify with vendor</td>\n</tr>\n<tr>\n<td>Chatbase</td>\n<td>Knowledge-heavy sites</td>\n<td>From $32/mo</td>\n<td>Limited</td>\n<td>Via middleware</td>\n<td>No</td>\n<td>Verify with vendor</td>\n</tr>\n<tr>\n<td>HubSpot</td>\n<td>HubSpot CRM users</td>\n<td>Free (HubSpot plan)</td>\n<td>Yes</td>\n<td>Native</td>\n<td>Yes</td>\n<td>EU hosting available</td>\n</tr>\n<tr>\n<td>Landbot</td>\n<td>B2B flow design</td>\n<td>From $40/mo</td>\n<td>Yes (strong)</td>\n<td>Native HubSpot</td>\n<td>Calendly</td>\n<td>Verify with vendor</td>\n</tr>\n<tr>\n<td>Intercom</td>\n<td>Structured inbound</td>\n<td>From $39/seat/mo</td>\n<td>Yes</td>\n<td>Native</td>\n<td>Yes</td>\n<td>EU hosting available</td>\n</tr>\n<tr>\n<td>Drift</td>\n<td>Enterprise pipeline</td>\n<td>~$2,500/mo</td>\n<td>Yes (advanced)</td>\n<td>Salesforce / Marketo</td>\n<td>Yes</td>\n<td>Verify with vendor</td>\n</tr>\n</tbody>\n</table></div>\n<p class=\"ck-prose-p\"><em>Prices are indicative and subject to change. Verify current pricing and features directly with each vendor before purchasing.</em></p>\n<h3 class=\"ck-h3\" id=\"best-for-smbs-and-e-commerce-tidio-freshchat-and-chatbase\">Best for SMBs and e-commerce: Tidio, Freshchat, and Chatbase</h3>\n<p class=\"ck-prose-p\">Tidio is the strongest option in this group for e-commerce sites running Shopify or WooCommerce. Its lead-capture flows are visual and fast to deploy, and the free tier is genuinely usable for low-volume testing. According to Tidio's published feature documentation, conditional logic depth is restricted on lower pricing tiers, so complex branching requires a paid plan. For straightforward lead capture with product-aware integrations, it edges ahead of the other two in this group. Note that Tidio's pricing is published in USD; check the current rate on Tidio's pricing page for the equivalent in sterling.</p>\n<p class=\"ck-prose-p\">Freshchat is a solid budget option with CRM sync and reasonable qualification flow support. The tradeoff, based on user reviews across G2 and Capterra, is that building anything beyond a basic flow requires more manual configuration than Tidio. Chatbase is purpose-built for AI bots trained on existing site content, which works well for knowledge-heavy businesses, but its native lead routing capabilities are thinner than dedicated qualification tools according to Chatbase's own feature documentation. For most e-commerce brands, Tidio is the pragmatic starting point.</p>\n<h3 class=\"ck-h3\" id=\"best-for-b2b-and-crm-heavy-teams-hubspot-chatbot-and-landbot\">Best for B2B and CRM-heavy teams: HubSpot chatbot and Landbot</h3>\n<p class=\"ck-prose-p\"><a href=\"https://www.hubspot.com/startups/tech-stacks/ai/ai-sales-chatbot\">HubSpot's native chatbot builder</a> is free within the HubSpot ecosystem and writes directly to HubSpot CRM without any middleware. If your sales team already lives in HubSpot, this is the lowest-friction chatbot CRM integration available. There is no integration gap, no field-mapping setup across tools, and no data latency from a third-party connection.</p>\n<p class=\"ck-prose-p\">Landbot offers genuinely strong visual flow-building with support for conditional branching, appointment booking, and Calendly integration. For B2B teams running qualification conversations that need to mirror an actual sales script, Landbot is the most flexible off-the-shelf option in this group. HubSpot wins on CRM depth; Landbot wins on conversation design flexibility. If you're not already in the HubSpot ecosystem, Landbot is worth trialling first.</p>\n<h3 class=\"ck-h3\" id=\"best-for-enterprise-pipeline-intercom-and-drift\">Best for enterprise pipeline: Intercom and Drift</h3>\n<p class=\"ck-prose-p\">Intercom is a mature platform with strong AI capabilities through its Fin AI agent, which handles both resolution and qualification. Its integration library is broad, and it offers EU data hosting, relevant for UK-based businesses operating under UK GDPR. For companies running a structured inbound pipeline, it is a capable enterprise-grade option at a more accessible price point than Drift.</p>\n<p class=\"ck-prose-p\">Drift sits at roughly $2,500/month and is firmly enterprise territory, with pipeline-intent scoring and direct integrations with Salesforce and Marketo. If your business operates high-volume inbound with a dedicated sales development team, Drift's routing and intent-scoring capabilities justify the investment. For most SMBs, the pricing puts it firmly out of scope.</p>\n<h2 class=\"ck-h2\" id=\"custom-built-vs-off-the-shelf-where-the-conversion-gap-lives\">Custom-built vs. off-the-shelf: where the conversion gap lives</h2>\n<p class=\"ck-prose-p\">The platforms above are strong starting points, but they share a fundamental ceiling. Every off-the-shelf tool is built to serve the widest possible audience, which means qualification logic, guardrails, and CRM data architecture are always a compromise between your specific sales process and every other customer's.</p>\n<h3 class=\"ck-h3\" id=\"when-an-off-the-shelf-tool-is-the-right-call\">When an off-the-shelf tool is the right call</h3>\n<p class=\"ck-prose-p\">For most small e-commerce sites and early-stage B2B businesses with simple qualification criteria, Tidio, Landbot, or HubSpot's native chatbot is entirely sufficient. Setup time is low, cost is predictable, and the standard integrations cover most CRM stacks. The tradeoff is that you're configuring within the boundaries of someone else's template logic, a reasonable compromise when your qualification criteria are straightforward.</p>\n<h3 class=\"ck-h3\" id=\"what-a-custom-lead-qualification-chatbot-delivers\">What a custom lead-qualification chatbot delivers</h3>\n<p class=\"ck-prose-p\">For B2B businesses with complex qualification criteria or high-value sales conversations, a custom build is where the meaningful conversion gains are. ClickTake Technologies designs and builds custom AI lead-qualification chatbots as part of its AI automation service offering, including built-in evaluation frameworks and guardrails: the bot's responses are tested against expected qualification outputs before going live, and guardrails prevent the bot from going off-script or collecting data outside its defined scope.</p>\n<p class=\"ck-prose-p\">In a recent client engagement, a B2B services company saw a significant improvement in qualified-lead-to-meeting conversion rate (exact figures withheld by agreement) after replacing a generic chatbot flow with a structured qualification architecture built around their actual sales criteria. The key difference was conditional routing logic tied directly to CRM field mapping, not a generic template. Based on ClickTake's project experience, custom builds typically run a six to twelve week timeline with investment starting from \u00a315,000 to \u00a340,000 depending on integration complexity and scope. For businesses at this stage, a free 30-minute scoping call is a practical first step before committing to a SaaS subscription you'll under-configure.</p>\n<h2 class=\"ck-h2\" id=\"crm-integrations-and-gdpr-controls-what-uk-sites-need-to-verify\">CRM integrations and GDPR controls: what UK sites need to verify</h2>\n<p class=\"ck-prose-p\">Both of these due-diligence checks tend to be skipped during chatbot evaluation, and they're directly linked. Every data flow that a CRM integration creates raises exactly the compliance questions that UK GDPR governs.</p>\n<h3 class=\"ck-h3\" id=\"native-vs-middleware-crm-integrations-why-the-distinction-matters\">Native vs. middleware CRM integrations: why the distinction matters</h3>\n<p class=\"ck-prose-p\">Several platforms advertise \"CRM integration\" but deliver it via Zapier or Make rather than a native connection. That distinction affects data latency, field-mapping control, and reliability. HubSpot's own chatbot writes natively to HubSpot CRM, the cleanest option for HubSpot users. Landbot also offers a <a href=\"https://landbot.io/integrations/hubspot\">native HubSpot connection</a> with support for creating and updating contacts, companies, deals, and tickets directly within the chatbot flow. For Salesforce users, the native option is Einstein Bots within the Salesforce ecosystem; most third-party chatbots connect to Salesforce via middleware. Pipedrive native connections are thin across all platforms in this roundup, so middleware is typically required regardless of which tool you choose.</p>\n<h3 class=\"ck-h3\" id=\"gdpr-and-uk-data-compliance-checks-before-you-deploy\">GDPR and UK data compliance checks before you deploy</h3>\n<p class=\"ck-prose-p\">UK businesses operating under UK GDPR need to verify several things before deploying any chatbot that collects personal data. Where is the data processed and stored, EU or UK residency, or US servers? Intercom offers EU hosting; Tidio also provides EU hosting options. Does the platform support consent capture and records of processing? This should be configured as part of the chatbot flow, not added as an afterthought. Can data subject access requests be handled through the platform, or does it require manual extraction?</p>\n<p class=\"ck-prose-p\">Few vendors are explicit about UK data residency in their public documentation, so treat this as a question to ask directly during any trial or sales conversation. If a vendor cannot answer it clearly, that is itself a compliance risk signal worth noting before you go live.</p>\n<h2 class=\"ck-h2\" id=\"how-to-shortlist-and-trial-the-right-chatbot-for-your-site\">How to shortlist and trial the right chatbot for your site</h2>\n<p class=\"ck-prose-p\">You now have enough to shortlist. This section cuts to the practical decision logic so you don't stall on evaluation.</p>\n<h3 class=\"ck-h3\" id=\"key-questions-before-choosing-a-platform\">Key questions before choosing a platform</h3>\n<p class=\"ck-prose-p\">Start with these questions before selecting any AI lead capture chatbot. What is the primary goal, volume lead capture, structured qualification, or pipeline routing? The answer determines whether a simple widget or a complex flow builder is right. Does your CRM require a native integration, or can you work with middleware? This immediately eliminates or prioritises several platforms on the list above. Do you have an in-house team to configure and iterate the bot, or do you need a build-and-deploy partner? If the answer is the latter, scoping a custom build before committing to a SaaS subscription is the more efficient route.</p>\n<h3 class=\"ck-h3\" id=\"a-30-day-trial-approach-that-gives-you-real-conversion-data\">A 30-day trial approach that gives you real conversion data</h3>\n<p class=\"ck-prose-p\">Start with one platform on a single high-traffic page, not site-wide. Measure the current form conversion rate on that page before the chatbot goes live; this is your baseline. Run the chatbot for 30 days with at least three qualification questions and CRM write-back enabled from day one, this is a suggested testing approach rather than a fixed protocol, but it gives you enough data to make an informed decision. At the end of the trial, compare qualified-lead volume against the pre-chatbot baseline, not just raw conversations or chat sessions. That comparison is the only data point that tells you whether to pay for a subscription, switch platforms, or escalate to a custom build.</p>\n<h2 class=\"ck-h2\" id=\"choosing-the-right-fit-for-your-business\">Choosing the right fit for your business</h2>\n<p class=\"ck-prose-p\">So, what is the best AI chatbot for capturing leads on a website? The honest answer is that it depends on your qualification complexity, your CRM stack, and whether you have the internal resource to configure it properly. For most SMBs, Tidio, Landbot, or HubSpot's native tool will cover the majority of use cases at a predictable monthly cost. For businesses that need structured qualification logic, guardrails, and direct CRM architecture built around their actual sales process, a custom build is worth the investment.</p>\n<h2 class=\"ck-h2\" id=\"frequently-asked-questions\">Frequently asked questions</h2>\n<h3 class=\"ck-h3\" id=\"which-ai-chatbot-is-best-for-capturing-website-leads-on-a-small-budget\">Which AI chatbot is best for capturing website leads on a small budget?</h3>\n<p class=\"ck-prose-p\">For small budgets, Tidio and HubSpot's free chatbot are the strongest starting points. Tidio suits e-commerce businesses; HubSpot suits teams already using HubSpot CRM. Both support basic conditional flows and CRM write-back without significant upfront cost.</p>\n<h3 class=\"ck-h3\" id=\"do-i-need-a-custom-chatbot-or-will-an-off-the-shelf-tool-work\">Do I need a custom chatbot or will an off-the-shelf tool work?</h3>\n<p class=\"ck-prose-p\">Off-the-shelf tools work well for straightforward qualification criteria and standard CRM stacks. If your sales process involves complex routing logic, bespoke scoring, or tight CRM data architecture requirements, a custom build will typically deliver better conversion outcomes.</p>\n<h3 class=\"ck-h3\" id=\"what-gdpr-checks-should-i-run-before-deploying-a-chatbot\">What GDPR checks should I run before deploying a chatbot?</h3>\n<p class=\"ck-prose-p\">Verify where data is stored (EU or UK residency vs US servers), confirm the platform supports consent capture within the chat flow, and check whether data subject access requests can be handled without manual extraction. Ask vendors these questions directly, vague answers are a compliance risk signal.</p>\n<p class=\"ck-prose-p\">If you're still weighing up what is the best AI chatbot for capturing leads on a website for your specific situation, ClickTake Technologies offers a free 30-minute consultation to audit your current chatbot setup or scope a custom qualification build. Book a 30-minute call to get a straight assessment of what your conversion stack needs. <a href=\"https://clicktake.co.uk/contact\">Book your free call here.</a></p>",
  },
  {
    slug: "blog-7-social-media-content-types-that-actually-drive-sales",
    title: "7 social media content types that actually drive sales",
    excerpt: "Most brands measure social media performance by likes, shares, and follower growth. These metrics feel meaningful; they're easy to report, and they generate the kind of positive momentum that keeps stakeholders happy in a monthly review.",
    category: "Digital Marketing",
    author: "ClickTake Technologies",
    publishedAt: "2026-07-27",
    readTime: "11 min read",
    tags: ["social-media", "content-strategy"],
    body: "Most brands measure social media performance by likes, shares, and follower growth. These metrics feel meaningful; they're easy to report, and they generate the kind of positive momentum that keeps stakeholders happy in a monthly review.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/7-social-media-content-types-that-actually-drive-sales-1785658994038.webp",
    bodyHtml: "<p class=\"ck-prose-p\">Most brands measure social media performance by likes, shares, and follower growth. These metrics feel meaningful; they're easy to report, and they generate the kind of positive momentum that keeps stakeholders happy in a monthly review. The problem is that engagement rate has a weak relationship with revenue, and optimising for the wrong signal will cost you real money over time. If you've been asking what type of social media content actually drives sales, the answer depends far less on volume or frequency than on format, funnel stage, and the commercial intent baked into every post.</p>\n<p class=\"ck-prose-p\">Social platforms now generate measurable purchase behaviour at scale, and the formats that win on engagement are not always the ones that close sales. Reels-based direct-response ads convert at 3.8% against 1.3% for static image ads, a near 3x gap. The data suggests this performance difference is largely attributable to format rather than budget, though creative execution and audience targeting play a role too. That contrast sets up the core argument of this piece.</p>\n<p class=\"ck-prose-p\">This article breaks down seven content formats by documented conversion data, not opinion. By the end, you'll know which formats to prioritise, how to write CTAs that drive action, and how to build the tracking infrastructure to measure what's working.</p>\n<h2 class=\"ck-h2\" id=\"why-social-content-earns-engagement-but-not-revenue\">Why social content earns engagement but not revenue</h2>\n<p class=\"ck-prose-p\">Most social strategies are built around what the algorithm rewards, not what the customer needs to feel confident buying. High reach and strong engagement rates are not interchangeable with purchase intent. A post can go viral and produce zero sales if it lacks a clear next step, targets the wrong funnel stage, or sends traffic to a landing page that doesn't convert.</p>\n<p class=\"ck-prose-p\">Engagement rate measures content resonance. Conversion rate measures commercial action. Both matter, but optimising purely for engagement can actively harm revenue by training your audience to consume without acting. If every post you publish is built to generate comments and shares, you're building a habit in your audience that has nothing to do with purchasing.</p>\n<p class=\"ck-prose-p\">Content formats also carry implicit audience intent signals. Product demo content attracts decision-stage viewers who are already evaluating their options. Behind-the-scenes content builds brand familiarity at the awareness stage. Matching format to funnel stage is the foundational principle before you test anything else, it's the distinction that separates content strategies generating revenue from those generating only reports.</p>\n<h2 class=\"ck-h2\" id=\"what-type-of-social-media-content-actually-drives-sales-the-evidence\">What type of social media content actually drives sales, the evidence</h2>\n<p class=\"ck-prose-p\">The formats below are ordered from strongest conversion evidence to weakest. Use this as a prioritisation guide, not a rigid rule. Your specific audience, offer, and creative execution will shape your own numbers, but these benchmarks give you a defensible starting hypothesis.</p>\n<h3 class=\"ck-h3\" id=\"1-ugc-the-highest-documented-conversion-uplift\">1. UGC: the highest documented conversion uplift</h3>\n<p class=\"ck-prose-p\"><a href=\"https://contentsquare.com/blog/ugc-to-revenue/\">User-generated content</a> is the most rigorously evidenced format for incremental sales lift. Product pages featuring at least 12 verified UGC images or videos convert at 6.9% versus 2.3% for brand-only pages, a 200% relative lift. A parallel A/B test across 2,000 product detail pages showed UGC outperforming brand-produced creative by a median uplift of 19% on conversion, 27% on time-on-page, and 11% on average order value. The mechanism is trust: when a real customer demonstrates a product, the buyer's objection to risk is reduced in a way that polished studio creative simply can't replicate.</p>\n<h3 class=\"ck-h3\" id=\"2-product-demo-posts-the-strongest-format-for-high-intent-traffic\">2. Product demo posts: the strongest format for high-intent traffic</h3>\n<p class=\"ck-prose-p\">Product demos benchmark at a 2.9% average conversion rate for decision-stage audiences, making them the strongest format for warming traffic that's already evaluating a purchase. A demo post doesn't need to be high-production; it needs to show the product working, address the primary objection, and end with a specific CTA. Decision-stage viewers are not looking for brand storytelling at this point. They want proof that the product does what it claims.</p>\n<h3 class=\"ck-h3\" id=\"3-short-form-video-the-best-reach-to-revenue-efficiency-at-scale\">3. Short-form video: the best reach-to-revenue efficiency at scale</h3>\n<p class=\"ck-prose-p\">Reels and TikTok short-form video deliver the strongest reach-to-revenue ratio when running paid direct-response campaigns. The 3.8% conversion rate for Reels-based ads versus 1.3% for static images is not a marginal improvement; it represents a structural advantage that tends to hold as spend increases. Short-form video also has the flexibility to function across funnel stages: a UGC-style product video can serve as a decision-stage ad, while an educational or entertainment-led Reel can drive top-of-funnel acquisition organically.</p>\n<h3 class=\"ck-h3\" id=\"4-carousel-ads-strong-for-consideration-and-multi-product-browsing\">4. Carousel ads: strong for consideration and multi-product browsing</h3>\n<p class=\"ck-prose-p\">Carousel ads sit in the 2.5%, 3.5% conversion range on Instagram and carry an engagement rate of 1.36%, above both static images (1.04%) and Reels (1.24%) in feed placement. They work particularly well for higher-consideration purchases where the buyer benefits from seeing multiple product angles, a before-and-after sequence, or a step-by-step demonstration across slides. For impulse buys and lower-priced single products, a single strong image or video will often outperform a carousel.</p>\n<h3 class=\"ck-h3\" id=\"5-urgency-led-promo-posts-high-conversion-in-the-right-context\">5. Urgency-led promo posts: high conversion in the right context</h3>\n<p class=\"ck-prose-p\">Urgency-driven promotional content converts at roughly 3%, 5% in Instagram Stories format and 4%, 7% in Instagram Lives, where real-time social proof and scarcity dynamics are strongest. Placement is the critical factor: urgency language performs better in Stories and Lives than in standard feed posts, because the ephemeral format reinforces the message. \"Today only\" in a Stories slide lands differently than the same phrase buried in a feed caption.</p>\n<h3 class=\"ck-h3\" id=\"6-behind-the-scenes-content-a-trust-builder-not-a-direct-converter\">6. Behind-the-scenes content: a trust builder, not a direct converter</h3>\n<p class=\"ck-prose-p\">Behind-the-scenes content rarely converts in isolation, but it meaningfully improves conversion on subsequent touchpoints by functioning as a brand familiarity driver at the awareness stage. It reduces the friction a viewer feels when they later encounter a product demo or UGC ad, think of it as the first interaction in a multi-touch sequence, not the closing argument. Measuring it purely on direct conversion will undervalue its contribution to the funnel; view-through attribution or assisted-conversion reports in GA4 give a more accurate picture of its role.</p>\n<h3 class=\"ck-h3\" id=\"7-shoppable-posts-friction-reduction-with-growing-evidence\">7. Shoppable posts: friction reduction with growing evidence</h3>\n<p class=\"ck-prose-p\">Shoppable posts remove the click-off-platform step, and native checkout surfaces often outperform off-platform landing pages in platform-published comparisons. Direct conversion benchmarks for shoppable posts specifically are thinner than for the formats above, but the directional evidence is clear: removing friction between intent and purchase improves conversion. If your product catalogue is set up for native shopping on Instagram or TikTok Shop, this format deserves testing as a complement to your paid campaigns.</p>\n<h2 class=\"ck-h2\" id=\"platform-benchmarks-where-each-format-actually-performs\">Platform benchmarks: where each format actually performs</h2>\n<p class=\"ck-prose-p\">The format alone doesn't determine the result. Platform context shapes what's possible because audience intent, viewing behaviour, and native shopping features differ significantly across channels. A product demo on TikTok behaves differently from the same video on Instagram, even at identical production quality.</p>\n<p class=\"ck-prose-p\">On Instagram, the full breakdown by content type looks like this: Stories link-in-bio CTR runs between 0.33% and 0.54%, with conversion around 3%, 5%; Reels deliver CTR of 0.7%, 1.4% and conversion of 2%, 4%; Carousels convert at 2.5%, 3.5%; single images at 1.5%, 2.5%; and Lives at 4%, 7%. Instagram's overall average conversion rate sits around 1.08%, which means several formats consistently beat the platform mean when executed with the right intent signal and CTA. These benchmarks aren't aspirational; they're achievable with correct format-to-funnel matching.</p>\n<p class=\"ck-prose-p\">TikTok link-in-bio CTR benchmarks at 2%, 4%, meaningfully higher than Instagram Stories and static feed placements. On Meta combined (Facebook and Instagram), Facebook's average conversion rate sits around 1.85%, above Instagram's average, which explains why many DTC brands run TikTok for top-of-funnel acquisition and Meta for retargeting and conversion. Short-form video is the bridge format that works across both, though creative production needs to match native viewing behaviour on each platform rather than repurposing a single asset across channels.</p>\n<h2 class=\"ck-h2\" id=\"prioritising-formats-writing-ctas-and-measuring-results\">Prioritising formats, writing CTAs and measuring results</h2>\n<p class=\"ck-prose-p\">Benchmark data is only useful if you have a decision framework to apply it. The prioritisation logic is straightforward: start with UGC and product demos for conversion campaigns, use short-form video for acquisition, and layer urgency-led Stories into retargeting windows during promotional periods. Behind-the-scenes and educational content fills the awareness stage organically. This architecture covers the full funnel without wasting budget on formats mismatched to the objective.</p>\n<p class=\"ck-prose-p\"><a href=\"https://sproutsocial.com/insights/call-to-action-phrases/\">CTA phrasing</a> follows the same funnel logic. Awareness-stage content should drive low-friction actions: \"Save this post,\" \"Follow for more,\" or \"Tap the link in bio\" for a content resource. Decision-stage content, including product demos, UGC, and testimonials, should drive direct purchase CTAs: \"Shop now,\" \"See it in action,\" or \"Get your free sample.\" First-person phrasing frequently outperforms second-person in A/B tests: \"Start my free trial\" has been shown to outperform \"Start your free trial.\" Urgency language converts better in Stories and Lives than in feed posts. These are not stylistic preferences; they're documented performance patterns.</p>\n<p class=\"ck-prose-p\">Tracking social sales accurately requires three things working in tandem:</p>\n<ul class=\"ck-prose-ul\">\n<li class=\"ck-prose-li\"><strong>Standardised UTM parameters</strong> on every social link, both organic and paid</li>\n<li class=\"ck-prose-li\"><strong>Conversion events firing in GA4</strong> for purchases, form fills, and demo requests</li>\n<li class=\"ck-prose-li\"><strong>Platform pixels or Conversions API</strong> installed to improve match rates</li>\n</ul>\n<p class=\"ck-prose-p\">For <a href=\"https://www.attributionapp.com/blog/social-media-attribution/\">attribution modelling</a>, use last-click for simple weekly reporting, multi-touch for budget allocation decisions, and assisted-conversion views in GA4 to understand how social contributes at stages before the final click. Lookback windows should match the sales cycle: roughly 24 days for transactional e-commerce, 90 days or longer for higher-consideration purchases.</p>\n<h2 class=\"ck-h2\" id=\"how-clicktake-technologies-builds-this-system-for-dtc-clients\">How ClickTake Technologies builds this system for DTC clients</h2>\n<p class=\"ck-prose-p\">A structured audit is the most efficient way to identify where a current strategy is underperforming. At ClickTake Technologies, we run a systematic creative testing framework across Meta and TikTok that isolates one variable per test cycle: format, CTA phrasing, opening hook, or landing page destination. UGC and product demo assets are tested head-to-head against brand-produced creative in the same ad set to generate clean conversion data rather than directional opinion.</p>\n<p class=\"ck-prose-p\">The framework uses the benchmarks outlined in this article as starting hypotheses, then refines against client-specific data within the first 30 days of a campaign. For e-commerce clients, the typical 90-day output is a content calendar structured around the conversion funnel: short-form UGC and product demos running as paid conversion campaigns on Meta, behind-the-scenes and educational content seeded organically on TikTok and Instagram Reels for acquisition, and urgency-led Stories running to retargeting audiences during promotional windows.</p>\n<p class=\"ck-prose-p\">This architecture is designed for iterative improvement through creative testing rather than blanket budget increases. For brands looking to build this structure from scratch or audit an existing setup, a <a href=\"https://clicktaketechnologies.com\">free 30-minute consultation with the ClickTake Technologies team</a> is a practical starting point for identifying where your current content strategy may be leaving revenue on the table.</p>\n<h2 class=\"ck-h2\" id=\"the-bottom-line-what-type-of-social-media-content-actually-drives-sales\">The bottom line: what type of social media content actually drives sales</h2>\n<p class=\"ck-prose-p\">The core hierarchy is clear: UGC and product demos lead on documented conversion uplift, short-form video wins on reach-to-revenue efficiency at scale, and carousels and urgency-led promo content serve specific funnel stages with strong supporting data. The key shift is moving from creating content that performs on-platform to creating content that converts off-platform, and that requires matching format to intent, writing CTAs with a specific payoff, and closing the measurement loop with UTMs and pixel tracking.</p>\n<p class=\"ck-prose-p\"><strong>Social media content that actually drives sales is a system, not a collection of individual posts.</strong> Each format has a role that maps to a funnel stage, and each stage requires a different success metric. Start with UGC and product demos as your highest-conversion formats, set up tracking before you publish a single post, and build from data rather than instinct.</p>\n<p class=\"ck-prose-p\">The brands that win on social aren't necessarily the ones posting the most or spending the most. They're the ones who treat content as a testable, measurable commercial asset, and who iterate their way to performance rather than hoping for it.</p>",
  },
  {
    slug: "blog-ai-automations-that-actually-work-for-small-businesses",
    title: "AI Automations That Actually Work for Small Businesses",
    excerpt: "If you're wondering what AI automations actually work for small businesses, you're not alone, and the answer is more straightforward than most vendors make it sound.",
    category: "AI Automation",
    author: "ClickTake Technologies",
    publishedAt: "2026-07-18",
    readTime: "12 min read",
    tags: ["ai", "automation"],
    body: "If you're wondering what AI automations actually work for small businesses, you're not alone, and the answer is more straightforward than most vendors make it sound.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/ai-automations-that-actually-work-for-small-businesses-1785659099666.webp",
    bodyHtml: "<p class=\"ck-prose-p\">If you're wondering what AI automations actually work for small businesses, you're not alone, and the answer is more straightforward than most vendors make it sound. Many small business owners fall into one of two camps: they've tried an AI tool, found it underwhelming, and quietly moved on, or they're staring at a list of 50 automation options with no idea where to begin. Both situations are frustrating, and both are avoidable.</p>\n<p class=\"ck-prose-p\">The automations covered in this article are not theoretical. They are workflows the team at ClickTake Technologies has built and deployed for real clients across the UK, with measurable outcomes attached to each one, drawn from case studies including a 12-person accounting practice, a Manchester professional services firm, and a Midlands e-commerce retailer. The focus splits across two categories: customer-facing automations that directly improve revenue and lead conversion, and operational automations that recover time and accelerate cash flow. Across both categories, realistic ROI ranges from two hours of admin saved per week at the low end to \u00a315,000 in incremental revenue over six months at the high end (based on that accounting practice case study, referenced later in this article). By the end, you'll know exactly which automation to tackle first and which tools to build it with.</p>\n<h2 class=\"ck-h2\" id=\"why-most-ai-automation-attempts-dont-deliver-for-small-businesses\">Why most AI automation attempts don't deliver for small businesses</h2>\n<p class=\"ck-prose-p\">The failure mode here is rarely the technology. It's choosing the wrong automation to start with. Most SME owners either reach for the most-hyped tool available, or they attempt to automate something too complex before they've built any confidence in the process. The result is weeks of setup time and very little tangible return.</p>\n<h3 class=\"ck-h3\" id=\"the-real-problem-is-starting-in-the-wrong-place\">The real problem is starting in the wrong place</h3>\n<p class=\"ck-prose-p\">Automation ROI is highest when you target repetitive, high-volume tasks with a clear input and a predictable output. Vague goals like \"improve customer communication\" produce vague results. Specific goals like \"qualify every lead that fills in our contact form and <a href=\"https://zapier.com/automation/crm-automation\">create a CRM record automatically</a>\" produce measurable wins within days. The specificity of the target is everything.</p>\n<h3 class=\"ck-h3\" id=\"how-to-identify-a-workflow-worth-automating\">How to identify a workflow worth automating</h3>\n<p class=\"ck-prose-p\">Run any candidate workflow through three questions: Is this task repeated more than five times a week? Does it follow a consistent pattern? Does it currently require a human to make a low-stakes decision? If the answer to all three is yes, you have a strong automation candidate. This filter alone will save you from investing time in workflows that sound appealing but don't have the volume or consistency to justify the build effort.</p>\n<h2 class=\"ck-h2\" id=\"what-ai-automations-actually-work-for-small-businesses-customer-facing-wins\">What AI automations actually work for small businesses: customer-facing wins</h2>\n<p class=\"ck-prose-p\">The first group of proven wins are automations that directly touch the client journey. These tend to get the most attention because the results show up in pipeline metrics and customer satisfaction scores, the numbers founders actually track.</p>\n<h3 class=\"ck-h3\" id=\"lead-qualification-chatbots-that-filter-before-you-follow-up\">Lead qualification chatbots that filter before you follow up</h3>\n<p class=\"ck-prose-p\">A chatbot deployed on an enquiry or contact page can ask qualifying questions about budget, timeline, and use case; score the response against preset criteria; and route hot leads to your CRM while deprioritising poor fits. A professional services firm in Manchester reduced proposal creation from 35 hours per week to 6 hours using exactly this approach, and new client acquisitions rose 18% within six months. The tools that make this possible include ManyChat, HubSpot AI, and custom GPT-powered bots built via Make or Zapier. A working first version typically takes two to four weeks to deploy and shows measurable impact within the first 30 days.</p>\n<h3 class=\"ck-h3\" id=\"customer-support-automation-that-handles-the-majority-of-enquiries\">Customer support automation that handles the majority of enquiries</h3>\n<p class=\"ck-prose-p\">A well-configured support chatbot handles FAQs, order status, and common troubleshooting without any human input. A Midlands e-commerce retailer implemented this and cut response times by 70% and achieved 80% automatic resolution of enquiries, with customer satisfaction scores improving by 25% over the same period. Across typical SME setups, the founder or a customer service hire spends five to eight hours per week on repetitive inbox triage. That time is recoverable within weeks using tools like Tidio, Intercom, Zendesk, or a custom-built solution. For small e-commerce and service businesses, a realistic deflection rate sits between 60% and 80% for routine enquiries, and 70%+ is achievable when the bot is properly integrated with your order management and FAQ content.</p>\n<h3 class=\"ck-h3\" id=\"automated-follow-up-sequences-that-keep-warm-leads-engaged\">Automated follow-up sequences that keep warm leads engaged</h3>\n<p class=\"ck-prose-p\">Email and SMS drip campaigns triggered by form fills, trial sign-ups, or inactivity are not just broadcast marketing, they're structured sequences with conditional logic based on lead behaviour. That distinction matters: behaviour-triggered sequences consistently outperform bulk campaigns because the message arrives at the right moment. Platforms including HubSpot, Mailchimp, and ActiveCampaign all support this natively. A five-email sequence with basic branching logic takes roughly one to two weeks to set up, and for transactional flows like abandoned cart or new enquiry follow-up, positive ROI typically appears within the first two to four weeks.</p>\n<h2 class=\"ck-h2\" id=\"operational-automations-that-recover-time-and-accelerate-cash-flow\">Operational automations that recover time and accelerate cash flow</h2>\n<p class=\"ck-prose-p\">Back-office automations tend to be less glamorous than chatbots, but they often deliver faster and more predictable returns because they target bottlenecks you can measure precisely before and after.</p>\n<h3 class=\"ck-h3\" id=\"invoice-processing-and-payment-collection\">Invoice processing and payment collection</h3>\n<p class=\"ck-prose-p\">A London creative agency reported 60% faster invoice preparation and 30% faster payment collection after automating their invoicing workflow. The mechanics are straightforward: an automation watches a project management tool for a completed status, generates a draft invoice, sends it to the client, and triggers a follow-up reminder on day 7 and day 14 if unpaid. Across ClickTake's client deployments, automated payment reminders have consistently reduced average payment times by five to ten days. Most small businesses can build this using QuickBooks connected to Zapier, or through a custom Make workflow, and it's typically live within a week.</p>\n<h3 class=\"ck-h3\" id=\"appointment-booking-and-inbox-triage\">Appointment booking and inbox triage</h3>\n<p class=\"ck-prose-p\">Eliminating back-and-forth scheduling saves two to three hours per week for most service businesses. One documented example reduced a coordination process that previously took three hours down to 30 minutes after implementing automated booking. Tools like Calendly integrated with a CRM, or a Zapier plus Google Calendar setup, handle this without any custom development.</p>\n<p class=\"ck-prose-p\">Pair that with an inbox triage layer, an AI step that reads incoming emails, classifies them by urgency, and drafts responses or routes them to the right person, and a team of two to five people can recover six to ten hours per week combined. For a business billing at \u00a375 to \u00a3100 per hour, that's meaningful recovered capacity within the first month. These kinds of AI agents for business tasks are among the fastest to demonstrate a clear return.</p>\n<h2 class=\"ck-h2\" id=\"which-ai-automations-actually-work-for-small-businesses-roi-and-timelines\">Which AI automations actually work for small businesses: ROI and timelines</h2>\n<p class=\"ck-prose-p\">Vendor landing pages show headline numbers. Here is what the data actually supports across real deployments, based on ClickTake's implementation work with UK SMEs.</p>\n<h3 class=\"ck-h3\" id=\"timelines-from-first-setup-to-first-measurable-result\">Timelines from first setup to first measurable result</h3>\n<p class=\"ck-prose-p\">Lead qualification chatbots typically take two to four weeks to deploy and show measurable impact within the first 30 days. Email automation sequences go live in one to two weeks. Invoice and booking automations are often live within a week of starting the build. A 12-person accounting practice that stacked several of these automations together reported 25 hours saved per week and \u00a315,000 in additional advisory revenue within six months. That kind of compound return is what happens when you deploy one automation, measure the result, and layer in the next.</p>\n<h3 class=\"ck-h3\" id=\"honest-benchmarks-for-time-savings-and-cost-reductions\">Honest benchmarks for time savings and cost reductions</h3>\n<p class=\"ck-prose-p\">Across deployments, the consistent ranges are: email triage recovering five to eight hours per week; invoice processing saving two to four hours per week; appointment booking freeing up two to three hours per week; and customer support chatbots achieving 60, 80% deflection for FAQ-heavy businesses.</p>\n<p class=\"ck-prose-p\">It helps to frame these in two ways. Direct labour recovery is quantifiable as a salary cost: if a team member earns \u00a335,000 per year (roughly \u00a316, \u00a318 per hour including on-costs), recovering 10 hours per week over 52 weeks represents approximately \u00a38,300, \u00a39,400 in reclaimed capacity annually. Indirect gains, faster collections, higher lead conversion, fewer dropped enquiries, often exceed the direct savings within six months.</p>\n<h2 class=\"ck-h2\" id=\"the-no-code-tool-stack-that-gets-you-live-without-a-developer\">The no-code tool stack that gets you live without a developer</h2>\n<p class=\"ck-prose-p\">Rather than listing every tool available, here is the stack that addresses most common SME automation needs without requiring any custom development work.</p>\n<h3 class=\"ck-h3\" id=\"choosing-between-zapier-make-and-n8n-for-your-workflows\">Choosing between Zapier, Make, and n8n for your workflows</h3>\n<p class=\"ck-prose-p\">The decision comes down to complexity and cost. Zapier offers the easiest setup with the broadest app connections: its free tier covers 100 tasks per month, and paid plans start from approximately \u00a315 per month. Make handles more complex branching logic and offers a more generous free tier of 1,000 operations per month, with paid plans from approximately \u00a38 per month. n8n suits teams that want self-hosted control and data privacy, with a free self-hosted option and cloud plans from approximately \u00a318 to \u00a320 per month.</p>\n<p class=\"ck-prose-p\">For most small businesses starting out, Make offers a strong balance of capability and cost, though the right choice ultimately depends on your existing tool stack and the complexity of your first workflow.</p>\n<h3 class=\"ck-h3\" id=\"pairing-gpt-with-your-automation-platform\">Pairing GPT with your automation platform</h3>\n<p class=\"ck-prose-p\">The standard pattern that works across all four of the automation types covered in this article is: a trigger (a form submission, a new CRM record, or an incoming email), <a href=\"https://zapier.com/apps/crm-messaging/integrations/chatgpt\">one GPT step</a> with a focused prompt (classify, score, or summarise), and one action (create a CRM record, send a Slack notification, or draft an email reply). Keep the first automation narrow and measurable. A single working automation that saves two hours per week is more valuable than an ambitious system that never fully deploys. Build confidence first, then layer complexity in.</p>\n<h2 class=\"ck-h2\" id=\"when-to-build-it-yourself-and-when-to-bring-in-a-specialist\">When to build it yourself and when to bring in a specialist</h2>\n<p class=\"ck-prose-p\">This is an honest assessment, not a pitch. Some automations are genuinely within reach of a non-technical founder using Make or Zapier over a patient weekend. Others benefit significantly from experienced architecture and deployment.</p>\n<h3 class=\"ck-h3\" id=\"where-no-code-tools-are-enough-on-their-own\">Where no-code tools are enough on their own</h3>\n<p class=\"ck-prose-p\">Simple linear workflows (form submission to CRM record, invoice trigger, booking confirmation) are well within reach of <a href=\"https://heybrb.ai/blog/no-code-automation-tools-uk-2026\">no-code tools</a>. The risk is low, the monthly cost is manageable, and the learning curve is navigable for most founders. Start here. Build confidence with one working automation before moving to anything more complex.</p>\n<h3 class=\"ck-h3\" id=\"where-an-experienced-team-saves-you-months-of-trial-and-error\">Where an experienced team saves you months of trial and error</h3>\n<p class=\"ck-prose-p\">Custom lead qualification bots with scoring logic, multi-step email sequences with conditional branching, and customer support automations with escalation paths all require architecture decisions that most SME owners aren't equipped to make quickly without significant time investment. The difference between a chatbot that converts and one that frustrates visitors often comes down to how the qualification logic is structured, how guardrails are applied, and how CRM handoffs are handled when edge cases appear.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, we build and deploy these workflows end-to-end for clients, with implementation timelines that reflect the real-project benchmarks in this article rather than optimistic estimates. If you're not sure which automation would deliver the highest immediate value for your specific business, a free 30-minute consultation is the fastest way to get a clear answer. In one call, we can identify the right starting point, give you a realistic sense of build time, and tell you what return to expect.</p>\n<h2 class=\"ck-h2\" id=\"start-narrow-measure-everything-build-from-there\">Start narrow, measure everything, build from there</h2>\n<p class=\"ck-prose-p\">The businesses seeing the clearest ROI from AI automation are not trying to automate everything at once. They're deploying one well-chosen automation, measuring the result, and building from there. That discipline is what separates the businesses posting real gains from the ones still experimenting six months later with nothing to show for it.</p>\n<p class=\"ck-prose-p\">When it comes to what <a href=\"https://www.ai-crescent.com/blog/ai-automation-for-small-business\">AI automations</a> actually work for small businesses, the evidence from real deployments consistently points to the same starting priorities: lead qualification, customer support, invoice workflows, and booking automation. Any one of them, implemented properly, will often demonstrate a measurable return within 30 days. Stack two or three, and the compound effect starts to look significant within a quarter.</p>\n<p class=\"ck-prose-p\">If you're ready to identify which automation fits your business first, <strong>book a free 30-minute consultation with the ClickTake Technologies team</strong>. We'll review your current workflows, identify the highest-impact starting point, and give you a clear picture of build time and expected return, a direct conversation with practitioners who build these systems for UK businesses every day.</p>",
  },
  {
    slug: "blog-ai-business-automation-what-actually-works-for-smes",
    title: "AI business automation: what actually works for SMEs",
    excerpt: "The pressure to adopt AI in business operations has never been louder. Every vendor promises transformation, every conference panel cites staggering productivity gains, and every newsletter seems to have a new tool you should have been using yesterday.",
    category: "AI Automation",
    author: "ClickTake Technologies",
    publishedAt: "2026-07-09",
    readTime: "12 min read",
    tags: ["ai", "automation"],
    body: "The pressure to adopt AI in business operations has never been louder. Every vendor promises transformation, every conference panel cites staggering productivity gains, and every newsletter seems to have a new tool you should have been using yesterday.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/ai-business-automation-what-actually-works-for-smes-1785659065796.webp",
    bodyHtml: "<p class=\"ck-prose-p\">The pressure to adopt AI in business operations has never been louder. Every vendor promises transformation, every conference panel cites staggering productivity gains, and every newsletter seems to have a new tool you should have been using yesterday. For most SME owners, business automation with AI raises a specific, honest question: not whether it works in principle, but whether it will work for <em>them</em>, and whether the budget spent will actually show up in the numbers that matter.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, we have spent the past year running workflow audits for SME clients across a range of industries, mapping current processes, identifying automation candidates, and tracking what happens post-deployment. The pattern is remarkably consistent. A handful of use cases deliver measurable, repeatable returns. Several others consume time and budget without moving the needle. Knowing the difference before you commit is worth more than any individual tool recommendation. This guide maps both sides, gives you a practical framework for evaluating your own processes, and walks through a 30-day pilot structure you can run with your existing team.</p>\n<h2 class=\"ck-h2\" id=\"business-automation-with-ai-high-roi-use-cases-for-smes\">Business automation with AI, high-ROI use cases for SMEs</h2>\n<p class=\"ck-prose-p\">The use cases with the strongest evidence share a common profile: high volume, clear decision rules, repetitive structure, and real cost when delayed. Set aside the marketing noise and three areas stand out consistently for SMEs pursuing AI business process automation: lead capture and qualification, content operations, and customer triage.</p>\n<h3 class=\"ck-h3\" id=\"lead-capture-and-qualification-at-scale\">Lead capture and qualification at scale</h3>\n<p class=\"ck-prose-p\">AI-driven qualification chatbots score inbound leads against criteria you define, route high-fit contacts directly to sales, and log every interaction to your CRM without manual intervention. The ROI case is straightforward. Your sales team stops spending significant time chasing contacts who were never going to buy. Warm leads get a response in seconds rather than hours. Your qualification process no longer depends on which team member happens to be at their desk. Published pilots consistently report 20 to 40% reductions in manual hours for this use case, alongside the obvious upside of 24/7 availability that a human team simply cannot match.</p>\n<h3 class=\"ck-h3\" id=\"content-operations-and-production-workflows\">Content operations and production workflows</h3>\n<p class=\"ck-prose-p\">SMEs using AI workflow orchestration for content are not replacing their editors or strategists. They are eliminating the low-value steps that sit between an idea and a published piece: brief generation, first-draft production, image sourcing, formatting, and scheduling. The strategic layer still requires human judgement. The mechanical layer does not. Teams running these AI-driven workflow automation setups report meaningful throughput gains, producing significantly more content without proportional increases in headcount or cost. Published case studies point to throughput improvements in the range of 30 to 50% for structured content pipelines, though results vary with implementation quality.</p>\n<h3 class=\"ck-h3\" id=\"customer-triage-and-support-routing\">Customer triage and support routing</h3>\n<p class=\"ck-prose-p\">Intelligent routing cuts first-response time by classifying intent, categorising tickets, and resolving Tier-1 queries automatically before a human ever sees them. Bank of America's Erica assistant has handled more than 3.2 billion client interactions, illustrating the scale this approach can reach. For an SME, even a modest implementation that deflects a meaningful proportion of routine support queries, commonly reported in the range of 20 to 40% in published pilots, frees your team to focus on the conversations that actually require their expertise.</p>\n<h2 class=\"ck-h2\" id=\"where-ai-automation-tends-to-disappoint\">Where AI automation tends to disappoint</h2>\n<p class=\"ck-prose-p\">Most vendor guides stop at the success stories. The failure modes are equally instructive. Understanding where AI-driven process automation consistently falls short saves you from the expensive mistake of discovering it at your own cost.</p>\n<h3 class=\"ck-h3\" id=\"processes-built-on-poor-data-foundations\">Processes built on poor data foundations</h3>\n<p class=\"ck-prose-p\">AI does not fix bad data. It amplifies it. If your CRM has missing fields, your intake forms are inconsistently completed, or your historical records contain duplicate entries and schema mismatches, any automation you build on top will inherit every one of those problems at scale. The symptoms are predictable: misrouted leads, incorrect classifications, automations that produce outputs nobody trusts.</p>\n<p class=\"ck-prose-p\">The fix is unglamorous but essential: data hygiene first, automation second. Poor data quality is consistently cited among the leading reasons <a href=\"https://officeproconsulting.com.au/why-ai-pilots-fail/\">SME pilots fail to deliver</a> on their early promise, appearing alongside misaligned scope and inadequate change management in implementation post-mortems. Skipping the data audit is one of the most common and most avoidable errors.</p>\n<h3 class=\"ck-h3\" id=\"complex-decisions-that-require-human-context\">Complex decisions that require human context</h3>\n<p class=\"ck-prose-p\">There is a class of workflow where rule-based logic breaks down entirely: nuanced pricing negotiations, sensitive HR matters, legal or compliance judgements, and strategic recommendations that depend on context no model has been trained to understand. AI can support these processes by retrieving relevant information or summarising options, but driving them autonomously is where errors become genuinely expensive. High-trust client interactions also belong in this category. An automated response at the wrong moment does not just fail to help, it actively damages the relationship you have spent years building.</p>\n<h2 class=\"ck-h2\" id=\"a-readiness-framework-before-you-commit-any-budget\">A readiness framework before you commit any budget</h2>\n<p class=\"ck-prose-p\">Before evaluating a single tool, score any process you are considering against four criteria. This takes ten minutes and will save you months of frustration.</p>\n<h3 class=\"ck-h3\" id=\"scoring-your-processes-for-automation-fit\">Scoring your processes for automation fit</h3>\n<p class=\"ck-prose-p\"><strong>Volume:</strong> Is this process high-frequency enough to justify the setup cost? A task you perform twice a month is not an automation candidate. A task that happens fifty times a day almost certainly is.</p>\n<p class=\"ck-prose-p\"><strong>Rule clarity:</strong> Can the decision logic be written down without ambiguity? If you struggle to document the rules, AI will struggle to follow them.</p>\n<p class=\"ck-prose-p\"><strong>Data quality:</strong> Is the input data clean, consistently structured, and readily accessible? Incomplete or inconsistent inputs produce unreliable outputs.</p>\n<p class=\"ck-prose-p\"><strong>Error tolerance:</strong> What actually happens when the automation gets it wrong? A misclassified support ticket is recoverable. An incorrect compliance action may not be.</p>\n<p class=\"ck-prose-p\">High-fit processes score well on all four criteria. Low-fit processes typically fail on rule clarity or data quality, which is useful information in itself, because it tells you where to focus before revisiting automation later.</p>\n<h3 class=\"ck-h3\" id=\"realistic-budget-and-payback-expectations-for-smes\">Realistic budget and payback expectations for SMEs</h3>\n<p class=\"ck-prose-p\">A single well-scoped workflow automation typically runs between \u00a32,500 and \u00a312,000 all-in for year one, depending on integration complexity, the tools selected, and how much data preparation is required beforehand. (These figures are converted from USD ranges of approximately $3,000 to $15,000 commonly cited in <a href=\"https://sg1consulting.us/resources-pdf/us/ai-automation-pilot-roi-methodology.pdf\">implementation methodology guides</a>, using prevailing exchange rates; actual costs will vary with scope and supplier.) Ongoing maintenance, monitoring, and support typically add \u00a3400 to \u00a31,500 per month for anything running in a production environment, broadly consistent with USD ranges reported in published SME case studies.</p>\n<p class=\"ck-prose-p\">A 90 to 180-day pilot ROI window is a reasonable planning assumption, commonly cited in implementation methodology guides. If a carefully scoped automation has not moved your target metric within six months, the use case or the implementation needs to change.</p>\n<h2 class=\"ck-h2\" id=\"what-measurable-roi-actually-looks-like-in-practice\">What measurable ROI actually looks like in practice</h2>\n<p class=\"ck-prose-p\">Across published case studies and implementation benchmarks for AI-enabled process automation in SME contexts, the ranges are broadly consistent: 20 to 40% reduction in manual hours for well-scoped pilots, 15 to 35% operational cost reduction in repetitive back-office processes, 30 to 60% error reduction in rules-driven tasks, and 30 to 45 days to first measurable gains. These figures are derived from <a href=\"https://www.unframe.ai/blog/how-to-measure-ai-pilot-roi\">establishing a clear baseline</a> before the pilot begins, then measuring the same KPIs post-deployment on a defined volume of work.</p>\n<h3 class=\"ck-h3\" id=\"kpis-worth-tracking-from-day-one\">KPIs worth tracking from day one</h3>\n<p class=\"ck-prose-p\">Six metrics appear consistently across published case studies and are worth tracking from the moment your pilot goes live.</p>\n<p class=\"ck-prose-p\"><strong>Time saved per case</strong> gives you the clearest picture of productivity impact. <strong>Error rate versus your manual baseline</strong> shows whether quality is improving or degrading. <strong>SLA and turnaround time improvement</strong> demonstrates service-level impact to the rest of the business. <strong>Escalation rate</strong>, how often a human had to intervene, tells you how stable the automation actually is. <strong>Throughput change</strong> captures whether you are processing more work with the same team.</p>\n<p class=\"ck-prose-p\">Monetised labour value converts all of the above into a figure the business can act on. That single number is what makes the scale-or-stop decision defensible.</p>\n<h3 class=\"ck-h3\" id=\"the-roi-calculation-smes-often-get-wrong\">The ROI calculation SMEs often get wrong</h3>\n<p class=\"ck-prose-p\">Most SMEs measure tool cost against hours saved and call it done. The calculation misses four hidden costs that consistently erode the headline number: setup time and integration effort, the productivity dip during the transition period while staff adjust, ongoing prompt or workflow maintenance as your processes evolve, and the staff time spent on exception handling that the automation could not resolve. Build these into your business case before you sign anything, and your projections will hold up considerably better under scrutiny.</p>\n<h2 class=\"ck-h2\" id=\"running-a-business-automation-with-ai-pilot-in-30-days\">Running a business automation with AI pilot in 30 days</h2>\n<p class=\"ck-prose-p\">The most important rule for a first pilot is minimum viable scope: one process, one measurable outcome, one small team, and human review in place for anything the automation flags as uncertain. Resist every temptation to expand scope mid-pilot. The goal is a clean, honest result, not an impressive demo.</p>\n<h3 class=\"ck-h3\" id=\"minimum-viable-scope-what-to-include-and-what-to-leave-out\">Minimum viable scope: what to include and what to leave out</h3>\n<p class=\"ck-prose-p\">Pick one process that is high-frequency, rule-based, and currently generating meaningful manual workload for your team. Start with a 20% volume subset on historical or test data before you touch live workflows. For the first two to three weeks, run the automation in parallel alongside your existing manual process on the same items. This parallel-running phase is not optional: it is how you catch edge cases before they affect real customers or real revenue, and it is how your team builds enough confidence in the output to actually use it.</p>\n<h3 class=\"ck-h3\" id=\"the-30-day-structure-that-prevents-pilot-drift\">The 30-day structure that prevents pilot drift</h3>\n<p class=\"ck-prose-p\">Structure the pilot in clear phases rather than treating it as a continuous build:</p>\n<p class=\"ck-prose-p\"><strong>Days 1, 3:</strong> Select the use case using the four-criteria scoring method above.</p>\n<p class=\"ck-prose-p\"><strong>Days 1, 5:</strong> Establish your baseline measurements and define success in specific, measurable terms.</p>\n<p class=\"ck-prose-p\"><strong>Days 3, 7:</strong> Audit your data sources, confirm access and permissions, and identify any quality issues that need resolving before the automation can run reliably.</p>\n<p class=\"ck-prose-p\"><strong>Days 8, 21:</strong> Build the workflow, test it in parallel against the manual process, and log timings, accuracy, and exception rates daily.</p>\n<p class=\"ck-prose-p\"><strong>Days 22, 30:</strong> Refine based on what the data shows, then evaluate against your baseline.</p>\n<p class=\"ck-prose-p\">The decision at day thirty is binary: the pilot either beats baseline on your chosen KPI without creating additional workload, or it does not. Scale what works. Adjust or stop what does not.</p>\n<h2 class=\"ck-h2\" id=\"getting-this-right-without-the-trial-and-error\">Getting this right without the trial and error</h2>\n<p class=\"ck-prose-p\">The 30-day pilot structure above reflects industry best practice for AI-driven workflow automation and is consistent with frameworks used across published SME implementation guides. It also takes time, internal focus, and a team willing to run something new alongside everything else they are already managing. For many SME owners, that is the real constraint: not budget or ambition, but bandwidth.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, we run workflow audits for SME clients that identify exactly which processes are ready for intelligent process automation (IPA) and which ones need data or structural work first. The engagement is diagnostic before it is prescriptive. We map your current workflows, score them against the four readiness criteria, and produce a prioritised recommendation aligned to your business goals and available budget, including anonymised benchmarks from comparable client engagements. There is no generic software demo, no pressure to commit to a platform before you understand what you actually need.</p>\n<p class=\"ck-prose-p\">If you want a faster path to clarity on where business automation with AI will and will not move the needle for your business, a no-obligation 30-minute consultation is the right starting point. Book yours directly through the ClickTake Technologies website.</p>\n<h2 class=\"ck-h2\" id=\"start-narrow-measure-honestly-scale-what-works\">Start narrow, measure honestly, scale what works</h2>\n<p class=\"ck-prose-p\">Business automation with AI works best when it is applied surgically, not broadly. The use cases that consistently pay off share four characteristics: sufficient volume, clear rules, clean data, and low error tolerance. Every other process should wait until those foundations are in place.</p>\n<p class=\"ck-prose-p\">Start with one process. Establish your baseline before you build anything. Run the pilot honestly and let the data make the scale decision for you. The SMEs seeing real returns from AI automation tools for business are not the ones who moved fastest. They are the ones who picked the right starting point and measured their way to confidence before committing further budget.</p>\n<p class=\"ck-prose-p\">If you would rather skip the guesswork, ClickTake Technologies can do the diagnostic work for you. The conversation starts with a free consultation, and it ends with a clear picture of where your first automation should be and what it should deliver.</p>",
  },
  {
    slug: "blog-how-to-build-a-social-media-content-strategy-in-2026",
    title: "How to build a social media content strategy in 2026",
    excerpt: "Many brands posting on social media in 2026 are not failing because they lack discipline, they lack a coherent  social media content strategy.",
    category: "Digital Marketing",
    author: "ClickTake Technologies",
    publishedAt: "2026-06-30",
    readTime: "11 min read",
    tags: ["social-media", "content-strategy"],
    body: "Many brands posting on social media in 2026 are not failing because they lack discipline, they lack a coherent  social media content strategy.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/how-to-build-a-social-media-content-strategy-in-2026-1785666229006.webp",
    bodyHtml: "<p class=\"ck-prose-p\">Many brands posting on social media in 2026 are not failing because they lack discipline, they lack a coherent  <strong>social media content strategy</strong>. The calendar is full, the posts go out on time, and the follower count inches forward, but revenue does not move in the same direction. That gap is not a content problem; it is a strategy problem.</p>\n<p class=\"ck-prose-p\">A documented social media content strategy is the difference between posting to fill a calendar and posting to build a business. When agencies work from live client data rather than gut instinct, they approach this process in a specific order, and every tactical decision (format, frequency, topic) traces back to a measurable objective. That same framework applies to any brand willing to follow it.</p>\n<p class=\"ck-prose-p\">This article walks you through a practical sequence for building a social media content strategy: audit your current state, set business-linked goals, research your audience, select platforms, define content pillars, build a 30-day editorial calendar, and measure performance. Work through them in order, and you will have a real strategy rather than a content schedule dressed up as one.</p>\n<h2 class=\"ck-h2\" id=\"why-most-brands-post-without-a-real-social-media-content-strategy-and-what-it-costs-them\">Why most brands post without a real social media content strategy (and what it costs them)</h2>\n<p class=\"ck-prose-p\">Staying consistent is not a strategy. It is a habit. Many brands produce content without tying it to a business goal, a defined audience, or a measurable outcome, which means they are optimising for output rather than results. High effort for low return is the predictable consequence, and the longer this continues, the harder it becomes to diagnose because the team feels like they are doing the right things.</p>\n<p class=\"ck-prose-p\">Before building anything, audit what you already have: review the past three to six months of content performance, identify which posts drove clicks or enquiries, and note which formats fell flat. From there, set goals tied directly to business outcomes, lead volume, website traffic, or pipeline contribution, so every subsequent decision has a clear reference point.</p>\n<p class=\"ck-prose-p\">A real social media plan contains six things: a goal tied to a business outcome, a defined audience, chosen platforms, content pillars, a posting system, and a measurement framework. Notice that a content calendar is not on that list as a standalone item. The calendar is one output of a strategy, not the strategy itself. Getting this distinction right before you start building saves months of effort pointed in the wrong direction.</p>\n<h2 class=\"ck-h2\" id=\"know-your-audience-before-you-choose-a-platform\">Know your audience before you choose a platform</h2>\n<h3 class=\"ck-h3\" id=\"building-an-audience-profile-that-shapes-your-content\">Building an audience profile that shapes your content</h3>\n<p class=\"ck-prose-p\">Platform selection is a downstream decision. The first question is not \"should we be on TikTok?\" but \"who are we trying to reach, and where do they already spend their time?\" Define your ideal customer profile for social by mapping their demographics, interests, pain points, and content consumption habits. Practical prompts that sharpen this quickly: what problems does your audience search for at 11pm, what accounts do they follow, and which content formats do they engage with versus scroll past?</p>\n<p class=\"ck-prose-p\">This step shapes everything that follows. If your audience is procurement managers at mid-sized UK manufacturers, short-form entertainment content is unlikely to move them. If your audience is 24-year-olds buying skincare, a dense LinkedIn thought-leadership post will reach the wrong people entirely. The platform should follow the audience, never the other way around.</p>\n<h3 class=\"ck-h3\" id=\"choosing-the-right-platforms-instead-of-trying-to-be-everywhere\">Choosing the right platforms instead of trying to be everywhere</h3>\n<p class=\"ck-prose-p\">Evaluate platform fit on two criteria: audience match and content format strength. In 2026, the positioning is fairly clear: LinkedIn for B2B and professional services, Instagram and TikTok for visual and consumer brands, Facebook for community and local businesses, and X for real-time commentary and news-adjacent sectors. Focused, well-executed platform strategies typically outperform spreading resources too thin across multiple channels.</p>\n<p class=\"ck-prose-p\">A simple decision rule: go where your buyer already is, then master that platform before expanding. Brands that spread thin across six channels end up with six mediocre presences. Brands that commit to two platforms and build genuine expertise there tend to see compounding returns.</p>\n<h3 class=\"ck-h3\" id=\"competitor-analysis-as-a-shortcut-to-faster-positioning\">Competitor analysis as a shortcut to faster positioning</h3>\n<p class=\"ck-prose-p\">Audit two or three competitor accounts before you begin posting: what formats do they use, which posts generate the most engagement, and where are the gaps? This is market research, not imitation.</p>\n<p class=\"ck-prose-p\">The most valuable output of a competitor audit is the content territory your competitors are ignoring, because that is where you can differentiate rather than compete on the same ground with less authority.</p>\n<h2 class=\"ck-h2\" id=\"how-to-build-a-social-media-content-strategy-around-content-pillars\">How to build a social media content strategy around content pillars</h2>\n<h3 class=\"ck-h3\" id=\"how-to-define-3-5-pillars-that-serve-your-goals\">How to define 3, 5 pillars that serve your goals</h3>\n<p class=\"ck-prose-p\">Content pillars are the recurring themes that make your account consistent and recognisable. Each pillar should map to either a business goal (leads, trust, visibility), an audience need (education, inspiration, entertainment), or a brand differentiator (process, proof, culture). For B2B brands, a strong set of pillars includes authority, education, proof, and humanisation. For B2C brands, it typically looks like education, inspiration, entertainment, community, and behind-the-scenes content, with a smaller promotional slice added in.</p>\n<p class=\"ck-prose-p\">Keep it to three to five pillars. More than five creates dilution: the account loses its recognisable voice and starts to feel like a broadcast channel with no clear perspective. Fewer than three creates repetition that disengages your audience over time.</p>\n<h3 class=\"ck-h3\" id=\"mapping-pillars-to-content-formats-and-the-8020-content-mix\">Mapping pillars to content formats and the 80/20 content mix</h3>\n<p class=\"ck-prose-p\">Each pillar maps naturally to a format. Educational pillars suit carousels and how-to videos. Proof pillars suit case study posts and testimonial graphics. Entertainment pillars suit short-form video. The format is not arbitrary; it is the delivery mechanism that matches what the audience expects from that type of content.</p>\n<p class=\"ck-prose-p\">Structure your content mix around the 80/20 rule: roughly 80% value-led content and 20% promotional content. This is a structural decision, not an approximation. Accounts that push promotional content above that threshold start to feel like adverts, and audiences stop trusting them. Trust is the precondition for conversion, so protecting it through content mix discipline is a commercial decision as much as a creative one.</p>\n<h2 class=\"ck-h2\" id=\"building-your-posting-cadence-and-30-day-editorial-calendar\">Building your posting cadence and 30-day editorial calendar</h2>\n<h3 class=\"ck-h3\" id=\"platform-specific-cadence-how-often-to-post-without-burning-out\">Platform-specific cadence: how often to post without burning out</h3>\n<p class=\"ck-prose-p\">Posting cadences vary significantly by platform, and the right answer for your brand depends on your production capacity as much as the platform's algorithm. Realistic 2026 planning ranges: LinkedIn 2, 5 posts per week, Instagram 4, 7 posts per week, Facebook 3, 5 posts per week, TikTok 1, 3 posts per day, and X 3, 5 posts per day. These are planning ranges, not minimums you must hit from day one.</p>\n<p class=\"ck-prose-p\">Consistency beats volume every time. A brand posting four times per week, every week, for six months will outperform a brand that posts 20 times in one week and then disappears for a fortnight. Match your cadence to actual production capacity, then increase it once the system is running smoothly.</p>\n<h3 class=\"ck-h3\" id=\"structuring-a-30-day-editorial-calendar-template\">Structuring a 30-day editorial calendar template</h3>\n<p class=\"ck-prose-p\">Map your 30-day calendar using content pillars as the structure. Rotate pillars across the month to create variety without losing focus. If you have four pillars and post daily, each pillar should appear roughly seven to eight times across 30 days. For brands posting less frequently, the formula is straightforward: divide your total planned posts by the number of pillars to find each pillar's share. Plan in batches, weekly or fortnightly, assign formats in advance, and build a small asset bank of evergreen posts you can deploy when the week gets unpredictable.</p>\n<p class=\"ck-prose-p\">The calendar is a planning tool, not a rigid script. Leave space for reactive content and trending moments, because platform-native content that responds to what is happening in real time often outperforms pre-planned posts dropped into an ongoing conversation late, particularly on TikTok and X where recency carries significant algorithmic weight. The pillars give you the structure; the reactive space keeps the account feeling current.</p>\n<h3 class=\"ck-h3\" id=\"tools-and-templates-to-manage-execution-without-the-complexity\">Tools and templates to manage execution without the complexity</h3>\n<p class=\"ck-prose-p\">The practical toolkit does not need to be expensive. For scheduling and content recycling, <a href=\"https://buffer.com/resources/data-best-content-format-social-media/\">Buffer and SocialBee</a> are reliable starting points. For team collaboration and approvals, <a href=\"https://planable.io/blog/content-calendar-tools/\">Planable and CoSchedule</a> handle the workflow cleanly. For design, Canva or Adobe Express cover most small business needs without requiring a designer on call. For a ready-made editorial calendar template, both <a href=\"https://blog.hubspot.com/marketing/social-media-strategy-for-your-business\">HubSpot and Buffer</a> offer free downloadable options that work well as a starting structure for your content marketing strategy.</p>\n<p class=\"ck-prose-p\">Choose the simplest stack that matches your team size. A solo founder needs a very different setup to a five-person marketing team with approval workflows and multiple brand accounts. Start simple and add complexity only when the simple version genuinely limits you.</p>\n<h2 class=\"ck-h2\" id=\"measuring-performance-with-social-media-kpis-that-actually-matter\">Measuring performance with social media KPIs that actually matter</h2>\n<h3 class=\"ck-h3\" id=\"the-three-layer-kpi-framework-for-social-media\">The three-layer KPI framework for social media</h3>\n<p class=\"ck-prose-p\">Measure performance across three tiers. Awareness KPIs cover reach, impressions, and follower growth. Engagement KPIs cover engagement rate, saves, shares, and video watch time. Business-outcome KPIs cover click-through rate, leads, conversion rate, and revenue attributed to social. Each tier serves a different purpose, and the mistake most brands make is stopping at tier one or tier two and calling it measurement.</p>\n<p class=\"ck-prose-p\">Platform benchmarks for 2026 (based on <a href=\"https://www.hootsuite.com/social-media-tools/social-media-roi-calculator\">Hootsuite and Sprout Social</a> industry data): LinkedIn averages around 2.4% engagement for company pages and 6% or more for personal profiles; Instagram's top quartile sits at 1.8% or above; TikTok averages 3.7% to 5.7% for consistent small business accounts; Facebook organic engagement typically falls between 0.5% and 4.2% depending on content type. Use these as a relative comparison rather than absolute targets, because industry sector and account size shift the numbers considerably.</p>\n<h3 class=\"ck-h3\" id=\"why-vanity-metrics-mislead-and-how-data-led-teams-measure-differently\">Why vanity metrics mislead and how data-led teams measure differently</h3>\n<p class=\"ck-prose-p\">A post with 500 likes that generates zero clicks is underperforming a post with 80 likes that generates 40 website visits and five enquiries. The difference between those two outcomes is not visible in a platform dashboard unless you are tracking the right social media KPIs. This principle underpins how data-led agencies such as ClickTake Technologies structure social performance reviews for clients, measuring against conversion metrics and pipeline contribution rather than vanity benchmarks.</p>\n<p class=\"ck-prose-p\">Connect social to revenue by using UTM parameters on every link, setting up conversion tracking pixels, and pulling attributed data from your CRM or e-commerce platform. Without this infrastructure, you are measuring effort rather than impact.</p>\n<h3 class=\"ck-h3\" id=\"building-a-review-cadence-to-optimise-continuously\">Building a review cadence to optimise continuously</h3>\n<p class=\"ck-prose-p\">Set up a monthly review with a simple structure: pull post-level data, identify the top three performers per pillar, note what format and hook drove that performance, and replicate the pattern in the next month's calendar. Optimisation is a loop, not a one-off project. The brands that improve fastest treat every month's data as an input to the next month's plan. Double down on what works before experimenting with new formats; consistent replication of strong performance is more valuable than novelty for its own sake.</p>\n<h2 class=\"ck-h2\" id=\"turn-this-framework-into-a-system-you-actually-run\">Turn this framework into a system you actually run</h2>\n<p class=\"ck-prose-p\">A social media content strategy is not a document you create once and file away. It is a system you build, run, and refine. The components covered here, audit, goal-setting, audience research, platform selection, content pillars, a 30-day editorial calendar, and KPI measurement, form the minimum viable structure for a content strategy that connects social activity to commercial outcomes.</p>\n<p class=\"ck-prose-p\">Start with one platform, one audience, three pillars, and a 30-day calendar. That is enough to build a real foundation. You do not need six platforms, ten pillars, or an enterprise scheduling tool to see early results. You need clarity on who you are talking to, what you are saying, and whether it is working.</p>\n<p class=\"ck-prose-p\">Brands serious about turning social into a growth channel rather than a content treadmill typically work with teams who bring both strategic frameworks and live conversion data to the table. If you want a social media content strategy built on real outcomes rather than best guesses, <a href=\"https://clicktake.co.uk/services/growth-marketing/\">ClickTake Technologies' growth marketing services</a> are worth exploring.</p>",
  },
  {
    slug: "blog-leading-platforms-for-website-user-behavior-analytics-in-2026",
    title: "Leading Platforms for Website User Behavior Analytics in 2026",
    excerpt: "So, what are the leading platforms for website user behaviour analytics in 2026, and how do you choose between them without ending up with three overlapping subscriptions and no clear insight?",
    category: "Web Dev",
    author: "ClickTake Technologies",
    publishedAt: "2026-06-21",
    readTime: "11 min read",
    tags: ["analytics", "user-behavior"],
    body: "So, what are the leading platforms for website user behaviour analytics in 2026, and how do you choose between them without ending up with three overlapping subscriptions and no clear insight?",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/leading-platforms-for-website-user-behavior-analytics-in-2026-1785658198005.webp",
    bodyHtml: "<p class=\"ck-prose-p\">So, what are the leading platforms for website user behaviour analytics in 2026, and how do you choose between them without ending up with three overlapping subscriptions and no clear insight? In our experience working with clients across e-commerce, SaaS, and content sites, most teams install one analytics tool, set it up once, and never touch it again. Six months later, when conversion rate drops and no one can explain why, they add another tool on top. The real problem is not the tools themselves; it is the assumption that knowing how much traffic you receive is the same as understanding what users are actually doing with it.</p>\n<p class=\"ck-prose-p\">There are two distinct intelligence layers here. Quantitative analytics, the kind GA4 provides, tells you volume: sessions, bounce rate, channel mix. Qualitative behavioural analytics reveals where users hesitate, what they click, and where they abandon. Both layers matter, but in our experience running behaviour analytics integrations across dozens of client audits at ClickTake Technologies, most teams over-invest in the first and almost entirely ignore the second. The pattern is consistent: the platform choice is rarely wrong, but the tool is almost always underused.</p>\n<p class=\"ck-prose-p\">This article maps the main categories of user behaviour analytics, compares the strongest platforms by use case, and shows how the data connects to a broader SEO and CRO workflow.</p>\n<h2 class=\"ck-h2\" id=\"what-the-main-categories-of-website-user-behaviour-analytics-actually-cover\">What the main categories of website user behaviour analytics actually cover</h2>\n<p class=\"ck-prose-p\">Before evaluating specific platforms, you need to be clear about what type of analytics you are actually buying. The term \"behaviour analytics\" now covers at least three distinct tool categories, and conflating them leads to procuring the wrong product entirely.</p>\n<h3 class=\"ck-h3\" id=\"visual-ux-tools-heatmaps-scroll-maps-and-session-recordings\">Visual UX tools: heatmaps, scroll maps, and session recordings</h3>\n<p class=\"ck-prose-p\">These tools record individual user sessions and aggregate click and scroll data into visual overlays. Hotjar, Microsoft Clarity, and Mouseflow sit in this category. They answer where users go, what they click, and where they stop scrolling. Mouseflow is notable for offering <a href=\"https://mouseflow.com/platform/website-heatmap-tool/\">seven distinct heatmap types</a>, including attention, geo, and friction heatmaps that go well beyond the standard click and scroll views. Clarity stands out for being completely free. These are the right starting point for teams doing UX research or CRO work on a defined set of pages.</p>\n<h3 class=\"ck-h3\" id=\"product-analytics-events-funnels-and-cohort-analysis\">Product analytics: events, funnels, and cohort analysis</h3>\n<p class=\"ck-prose-p\">Amplitude, Mixpanel, Heap, and PostHog belong here. These platforms track discrete user actions across sessions and build quantitative models: funnel drop-off rates, retention curves, cohort behaviour over time. They answer how many users complete a given sequence and where in the funnel the break occurs. They require more upfront instrumentation than visual tools but return considerably richer analytical depth, particularly for SaaS teams making product decisions.</p>\n<h3 class=\"ck-h3\" id=\"enterprise-experience-analytics-journey-intelligence-at-scale\">Enterprise experience analytics: journey intelligence at scale</h3>\n<p class=\"ck-prose-p\">FullStory, Contentsquare, and Pendo target larger organisations with complex digital products. FullStory is built on high-fidelity session replay with a searchable behavioural data model, so you can query across all sessions for specific interactions rather than watching recordings at random. Contentsquare layers revenue attribution onto zone-based heatmaps. Pendo combines analytics with in-app guidance, which makes it a popular choice for SaaS onboarding teams. These platforms carry enterprise pricing to match their capabilities.</p>\n<h2 class=\"ck-h2\" id=\"leading-platforms-for-user-behaviour-analytics-compared-which-features-actually-matter\">Leading platforms for user behaviour analytics compared: which features actually matter</h2>\n<p class=\"ck-prose-p\">With the categories clear, here is how the most widely used platforms stack up across the five features that drive most procurement decisions: session recording, heatmaps, funnel analysis, cohort analysis, and A/B or experimentation integration.</p>\n<h3 class=\"ck-h3\" id=\"hotjar-and-microsoft-clarity-the-accessible-entry-points\">Hotjar and Microsoft Clarity: the accessible entry points</h3>\n<p class=\"ck-prose-p\">Hotjar offers session recordings, heatmaps, and basic funnel analysis, with a free tier and paid plans starting around \u00a325 to \u00a332 per month on annual billing (based on Hotjar's published pricing at time of writing). It is the default first choice for marketing teams that need visual UX insight without significant engineering overhead. Microsoft Clarity competes directly on the basics but is entirely free, <a href=\"https://developers.google.com/analytics/devguides/collection/ga4\">connecting with GA4</a> and offering genuinely useful rage-click and dead-click detection out of the box. Clarity's limitation is depth: it does not match fuller product analytics tools on funnels or cohort analysis.</p>\n<h3 class=\"ck-h3\" id=\"fullstory-heap-and-logrocket-enterprise-grade-session-intelligence\">FullStory, Heap, and LogRocket: enterprise-grade session intelligence</h3>\n<p class=\"ck-prose-p\">FullStory's core strength is high-fidelity session replay paired with a queryable data model. You can search across all sessions for specific behavioural patterns rather than reviewing recordings individually, which dramatically reduces the time needed to identify friction. Heap takes a different approach through autocapture: all user interactions are recorded automatically without manual event tagging, which significantly reduces implementation time. This is particularly valuable when requirements change after launch, as it allows you to define funnels retroactively. LogRocket adds developer-facing value by combining session replay with console logs, network requests, and error tracking, making it the natural choice for engineering teams debugging production issues.</p>\n<h3 class=\"ck-h3\" id=\"amplitude-mixpanel-and-posthog-depth-in-quantitative-user-behaviour-analytics\">Amplitude, Mixpanel, and PostHog: depth in quantitative user behaviour analytics</h3>\n<p class=\"ck-prose-p\">Amplitude is the strongest platform for retention analysis, predictive journey modelling, and cohort-based product decisions. Mixpanel is more lightweight but delivers flexible event dashboards and conversion reports with minimal setup, making it accessible for product and growth teams who want fast funnel visibility without rebuilding queries repeatedly. PostHog positions itself as the open-source all-in-one: session replay, heatmaps, funnels, feature flags, and A/B testing in a single deployable stack, with a privacy-by-design architecture that appeals strongly to teams handling sensitive user data.</p>\n<h2 class=\"ck-h2\" id=\"matching-the-right-platform-to-your-use-case\">Matching the right platform to your use case</h2>\n<p class=\"ck-prose-p\">Feature parity only tells part of the story. The right platform depends on the specific question you are trying to answer, not on which tool has the longest feature list. Here is how the decision typically breaks down by team type.</p>\n<p class=\"ck-prose-p\">For e-commerce and DTC brands, the priority is understanding drop-off at product, basket, and checkout stages. Hotjar or Mouseflow handle this well at the UX research level. When you need funnel analysis tied to specific product categories or user segments, Heap or Amplitude are the stronger options. Contentsquare is worth evaluating for larger retailers where revenue-linked zone analytics justify the enterprise cost.</p>\n<p class=\"ck-prose-p\">SaaS product teams typically need product analytics alongside activation insight. Amplitude or Mixpanel handle the quantitative side; Pendo adds in-app guidance on top if onboarding is a priority. PostHog is the strongest single-platform option for engineering-led teams that want analytics, experimentation, and session replay under one self-hosted roof without stitching together multiple tools.</p>\n<p class=\"ck-prose-p\">For agencies and CRO teams managing multiple client accounts, the operational question is cost-per-client and ease of account switching. Hotjar's multi-site plans and Mouseflow's feature-inclusive pricing both work well at this level (see respective vendor pricing pages for current plan structures). Microsoft Clarity is a practical baseline for smaller client accounts where the budget does not support paid tooling, with the understanding that its analytical depth is limited compared with paid alternatives.</p>\n<h2 class=\"ck-h2\" id=\"pricing-gdpr-compliance-and-data-privacy-considerations\">Pricing, GDPR compliance, and data privacy considerations</h2>\n<p class=\"ck-prose-p\">The cost and compliance profile of a platform should be evaluated together. Treating them as separate decisions often leads to signing a contract and then discovering the tool does not meet your data residency requirements.</p>\n<p class=\"ck-prose-p\">On pricing, the market follows a broadly consistent pattern. Small teams typically pay between \u00a315 and \u00a335 per user per month on standard plans; medium-sized teams pay \u00a350 to \u00a3100 per user per month as security, admin, and volume requirements grow; enterprise contracts are custom-quoted, generally landing between \u00a3100 and \u00a3300 per user per month before negotiated discounts. These are illustrative ranges based on publicly available vendor information and will vary by plan and negotiation. Microsoft Clarity stands out as a prominent free option in the visual analytics category, with no cap on session recordings according to its published terms. Hotjar's free tier caps recordings and pushes meaningful usage toward paid plans. PostHog offers a usage-based free tier with clearly defined thresholds before billing begins, see PostHog's pricing page for current limits.</p>\n<p class=\"ck-prose-p\">On GDPR compliance, the practical checklist covers four items: <a href=\"https://improvado.io/blog/gdpr-compliant-analytics-tools\">EU data residency options</a>, standard contractual clauses for cross-border transfers, configurable data retention periods, and a consent mode that integrates cleanly with your consent management platform. Matomo is a strong choice when data ownership and self-hosting are non-negotiable; its on-premises deployment option means no data leaves your infrastructure. PostHog's self-hosted option provides comparable control, and Piwik PRO also offers an on-prem deployment path worth evaluating. Cookieless tracking approaches are available in the market broadly, and PostHog supports privacy-focused deployment modes; for Hotjar specifically, check the current vendor documentation for cookieless configuration options, as these come with trade-offs in session accuracy that are worth understanding before enabling them in production.</p>\n<h2 class=\"ck-h2\" id=\"how-behaviour-analytics-data-feeds-directly-into-a-technical-seo-audit\">How behaviour analytics data feeds directly into a technical SEO audit</h2>\n<p class=\"ck-prose-p\">This is the integration most teams miss entirely, and it is where behaviour analytics delivers some of its highest return on investment, particularly for teams already running crawl-based audits.</p>\n<p class=\"ck-prose-p\">A standard technical SEO audit tells you what is wrong with a page: slow LCP, missing canonical tags, thin content, poor internal linking. What it cannot tell you is whether that issue is actively harming user behaviour, or whether it is an edge case on a page very few users visit. Layering session recording data on top of crawl findings closes that diagnostic gap. A page flagged for slow load time becomes a much higher priority when session data shows users bouncing within two seconds on mobile. Funnel analytics from tools like Heap or Amplitude can confirm exactly where in the journey a technical issue creates a measurable drop-off, turning a vague audit finding into a prioritised sprint task.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, the technical SEO audit workflow includes overlaying <a href=\"https://www.inspectlet.com/guides/best-session-recording-tools\">session recordings and heatmap data</a> from tools like Microsoft Clarity or FullStory onto crawl and Core Web Vitals data. This is done because session evidence consistently changes client prioritisation decisions, not for reporting aesthetics. When a client can see users rage-clicking a broken filter on their category page, the fix moves to the top of the backlog rather than sitting in a recommendations document for three months. Behaviour analytics also surfaces issues that crawlers simply cannot detect: confusing navigation patterns, form fields that trigger abandonment, and above-the-fold layouts that cause users to miss the primary CTA entirely.</p>\n<p class=\"ck-prose-p\">The most actionable audit output is a finding that links all three layers together: behaviour evidence, technical cause, and conversion impact. For example: users on the mobile product template repeatedly tap a non-interactive image carousel and abandon before the CTA; render review shows delayed JavaScript hydration and the CTA positioned below the fold; fix priority is high because the template accounts for 40 per cent of organic sessions. That kind of finding is immediately actionable, not something that requires further interpretation before it can be scheduled.</p>\n<h2 class=\"ck-h2\" id=\"choosing-the-right-user-behaviour-analytics-platform-without-overcomplicating-the-decision\">Choosing the right user behaviour analytics platform without overcomplicating the decision</h2>\n<p class=\"ck-prose-p\">The leading platforms for user behaviour analytics in 2026 are not interchangeable, and the best choice depends entirely on the question you are actually trying to answer. Visual-first teams doing UX research belong on Hotjar, Clarity, or Mouseflow. Product teams running quantitative funnel and cohort analysis need <a href=\"https://amplitude.com/compare/best-posthog-alternatives-funnel-analysis\">Amplitude, Mixpanel, or PostHog</a>. Enterprise teams diagnosing complex digital journeys at scale should evaluate FullStory or Contentsquare.</p>\n<p class=\"ck-prose-p\">On pricing, be clear-eyed: free tools get you started, but they impose caps and limitations that tend to become problems exactly when your traffic grows. On compliance, verify EU data residency, consent mode compatibility, and configurable retention periods before signing a contract. Regardless of which platform you choose, make sure it connects to your SEO and CRO workflows rather than sitting in a separate tab that only one person on the team ever opens. The data is only valuable when it changes what you build, fix, or prioritise next.</p>\n<p class=\"ck-prose-p\">If you want a direct assessment of whether your current analytics stack is actually being used effectively, the ClickTake Technologies team offers a free 30-minute consultation to walk through your setup and identify the gaps worth closing first.</p>",
  },
  {
    slug: "blog-next-js-pagespeed-optimisation-how-to-hit-90-scores",
    title: "Next.js PageSpeed optimisation: how to hit 90+ scores",
    excerpt: "Most Next.js sites commonly score in the 60, 80 range on PageSpeed Insights before any optimisation work begins. That surprises people, because Next.js is a modern framework with performance baked into its architecture. The issue is rarely the framework itself.",
    category: "Web Dev",
    author: "ClickTake Technologies",
    publishedAt: "2026-06-12",
    readTime: "14 min read",
    tags: ["nextjs", "performance"],
    body: "Most Next.js sites commonly score in the 60, 80 range on PageSpeed Insights before any optimisation work begins. That surprises people, because Next.js is a modern framework with performance baked into its architecture. The issue is rarely the framework itself.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/next-js-pagespeed-optimisation-how-to-hit-90-scores-1785659045382.webp",
    bodyHtml: "<p class=\"ck-prose-p\">Most Next.js sites commonly score in the 60, 80 range on PageSpeed Insights before any optimisation work begins. That surprises people, because Next.js is a modern framework with performance baked into its architecture. The issue is rarely the framework itself. It is the decisions made during development: which components run on the client, how images are delivered, whether server responses are cached, and how third-party scripts are loaded. This guide covers the full Next.js PageSpeed optimisation process, what causes low scores, which levers move the needle most, and the exact sequence to apply them.</p>\n<p class=\"ck-prose-p\">Next.js ships powerful optimisation tools out of the box, yet many teams under-utilise features such as next/image, next/font, server components, and built-in caching primitives. In our audits across scaling e-commerce and SaaS projects, the same five bottleneck layers appear consistently. Fix them in the right order and sites commonly move from the 60, 80 range into the 90+ band. This article covers exactly that sequence, with configuration examples drawn directly from those production audits.</p>\n<h2 class=\"ck-h2\" id=\"why-most-nextjs-builds-miss-90-pagespeed\">Why most Next.js builds miss 90+ PageSpeed</h2>\n<p class=\"ck-prose-p\">Four root causes account for the majority of low PageSpeed scores in Next.js projects. Understanding which one is hurting you most is the starting point, not the code fixes themselves.</p>\n<h3 class=\"ck-h3\" id=\"the-four-root-causes-behind-low-lighthouse-scores\">The four root causes behind low Lighthouse scores</h3>\n<p class=\"ck-prose-p\">The first is excess client-side JavaScript, usually caused by overusing \"use client\" throughout the App Router. Every component marked as a client component gets shipped to the browser and evaluated during page load, which drives up Total Blocking Time (TBT) and Interaction to Next Paint (INP). The second is unoptimised images, particularly hero images that are either too large, served as CSS backgrounds (which Next.js cannot optimise), or missing the priority prop. This directly delays Largest Contentful Paint (LCP).</p>\n<p class=\"ck-prose-p\">The third cause is a slow Time to First Byte (TTFB) from uncached SSR responses. If every page request hits a database or an external API without caching, the server latency cascades into the LCP score. The fourth is third-party scripts: analytics, tag managers, chat widgets, and consent tools that inject long tasks during the critical render window, pushing up TBT and triggering Cumulative Layout Shift (CLS) when their content loads late.</p>\n<h3 class=\"ck-h3\" id=\"how-to-read-a-pagespeed-insights-report-before-you-fix-anything\">How to read a PageSpeed Insights report before you fix anything</h3>\n<p class=\"ck-prose-p\"><a href=\"https://nextjs.org/learn/seo/nextjs-speed-insights\">PageSpeed Insights</a> shows two data layers. The top section displays field data from the Chrome User Experience Report (CrUX): real user measurements aggregated over 28 days. The lower section is lab data from a Lighthouse run: a controlled, simulated load. Both matter. Lighthouse tells you what is technically broken; CrUX tells you whether real users are actually experiencing the problem.</p>\n<p class=\"ck-prose-p\">Within the Lighthouse section, focus on the Opportunities tab first. These are changes with a direct, estimated impact on load time. Diagnostics surfaces configuration issues that may not carry a score penalty yet but create future risk. Fix Opportunities in order of estimated saving before touching Diagnostics. Commit to a fix priority based on what the field data confirms, not just what looks bad in the lab run.</p>\n<h2 class=\"ck-h2\" id=\"nextjs-pagespeed-optimisation-image-strategies-for-faster-lcp\">Next.js PageSpeed optimisation: image strategies for faster LCP</h2>\n<p class=\"ck-prose-p\">Images are the most common LCP failure point in Next.js projects. A hero image that is not preloaded, not served in a modern format, or rendered without explicit sizing will delay LCP regardless of how well the rest of the page performs.</p>\n<h3 class=\"ck-h3\" id=\"configuring-nextimage-for-avif-webp-and-responsive-sizing\">Configuring next/image for AVIF, WebP, and responsive sizing</h3>\n<p class=\"ck-prose-p\">The <a href=\"https://nextjs.org/docs/app/api-reference/components/image\">next/image</a> component handles format negotiation automatically when you configure it correctly in next.config.js. By listing ['image/avif', 'image/webp'] in the formats array, Next.js inspects the browser's Accept header on each request. It then returns AVIF where supported, WebP as the fallback, and the original format where neither is available. AVIF is typically 45 to 65 per cent smaller than JPEG; WebP is around 25 to 35 per cent smaller. That size reduction translates directly into faster LCP.</p>\n<p class=\"ck-prose-p\">// next.config.js<br />\nmodule.exports = {<br />\n  images: {<br />\n    formats: ['image/avif', 'image/webp'],<br />\n    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],<br />\n    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],<br />\n    remotePatterns: [<br />\n      {<br />\n        protocol: 'https',<br />\n        hostname: 'res.cloudinary.com',<br />\n      },<br />\n    ],<br />\n  },<br />\n}</p>\n<p class=\"ck-prose-p\">The deviceSizes and imageSizes arrays control which responsive variants Next.js generates. Tuning these to match your actual design breakpoints prevents the framework from generating unnecessary sizes and ensures the browser always has a close match available in the srcset. You do not need to build manual  elements with separate  tags; the component handles all of that.</p>\n<h3 class=\"ck-h3\" id=\"the-priority-and-sizes-props-most-developers-skip\">The priority and sizes props most developers skip</h3>\n<p class=\"ck-prose-p\">The priority prop on the LCP image is one of the highest-value, lowest-effort fixes available. Adding it causes Next.js to inject a  tag for that image into the document , which tells the browser to fetch it before it would normally discover it in the markup. A commonly observed issue in ClickTake Technologies audits is an omitted priority prop on the hero image, a small oversight with a measurable impact on LCP.</p>\n<p class=\"ck-prose-p\">The sizes prop is equally important and equally neglected. It tells the browser how wide the image will actually render at different viewport widths, so it can select the smallest appropriate candidate from the srcset rather than defaulting to the largest. A value of \"(max-width: 768px) 100vw, 50vw\" instructs the browser to load the full-width image only on small screens and a half-width variant on larger ones. Getting this wrong means users download a far larger image than the layout requires.</p>\n<h2 class=\"ck-h2\" id=\"server-components-and-bundle-splitting-cut-what-the-browser-does-not-need\">Server components and bundle splitting: cut what the browser does not need</h2>\n<p class=\"ck-prose-p\">Moving components server-side is the single most impactful change for reducing TBT and INP. In one recent ClickTake Technologies audit, the JavaScript bundle dropped from 245 KB to 87 KB after switching from an all-client-component approach to a proper server and client split, a 64 per cent reduction in shipped JavaScript.</p>\n<h3 class=\"ck-h3\" id=\"running-nextbundle-analyzer-to-find-the-real-culprits\">Running @next/bundle-analyzer to find the real culprits</h3>\n<p class=\"ck-prose-p\">Install <a href=\"https://nextjs.org/docs/14/pages/building-your-application/optimizing/bundle-analyzer\">@next/bundle-analyzer</a>, configure it in next.config.js with an environment flag, and run ANALYZE=true npm run build. The output is an interactive treemap where larger boxes mean larger bundle contributions. Look for heavy third-party libraries that could be replaced with smaller alternatives, duplicate library versions appearing across multiple chunks, and large client-only imports caused by unnecessary \"use client\" usage.</p>\n<p class=\"ck-prose-p\">// next.config.js<br />\nconst withBundleAnalyzer = require('@next/bundle-analyzer')({<br />\n  enabled: process.env.ANALYZE === 'true',<br />\n})</p>\n<p class=\"ck-prose-p\">module.exports = withBundleAnalyzer({<br />\n  reactStrictMode: true,<br />\n})</p>\n<h3 class=\"ck-h3\" id=\"moving-components-server-side-and-lazy-loading-the-rest\">Moving components server-side and lazy-loading the rest</h3>\n<p class=\"ck-prose-p\">In the App Router, all components are server components by default. The common mistake is adding \"use client\" to an entire component tree just to access one interactive element, which pulls everything in that tree into the client bundle. The correct pattern is to isolate the interactive part into its own small client component and keep the surrounding UI server-rendered.</p>\n<p class=\"ck-prose-p\">For heavy client-only components such as maps, charts, and carousels, use dynamic() with { ssr: false }. This defers both the download and the execution of that component until after the initial page load, reducing the JavaScript evaluated during the critical window and improving TBT directly. The key distinction is that dynamic() is not just a code-splitting tool; it is a TBT and INP optimisation when the deferred component contains meaningful execution work.</p>\n<h2 class=\"ck-h2\" id=\"nextjs-pagespeed-optimisation-caching-and-rendering-strategy\">Next.js PageSpeed optimisation, caching and rendering strategy</h2>\n<p class=\"ck-prose-p\">A slow TTFB collapses LCP regardless of how well images are optimised. If the server takes 800 milliseconds to respond, the browser cannot begin rendering until that time has passed. The fix is choosing the right rendering mode for each page type and caching aggressively where freshness requirements allow.</p>\n<h3 class=\"ck-h3\" id=\"when-to-use-ssg-isr-and-ssr-for-each-page-type\">When to use SSG, ISR, and SSR for each page type</h3>\n<p class=\"ck-prose-p\">Marketing pages, blog posts, and documentation pages should always be statically generated. The HTML is ready at request time, served from a CDN edge, and imposes no server-side rendering cost per visit. Product pages and category pages suit Incremental Static Regeneration: set revalidate to a window that reflects how often the content changes (an hour for most catalogues), and Next.js regenerates the page in the background after that window expires without blocking the user request.</p>\n<p class=\"ck-prose-p\">Dashboards and account pages genuinely require per-request rendering. Use export const dynamic = 'force-dynamic' and cache: 'no-store' for these routes. The important discipline is limiting force-dynamic to pages that actually need it. Applying it globally across a site is the fastest way to turn a fast Next.js app into a slow one.</p>\n<h3 class=\"ck-h3\" id=\"cache-control-headers-cdn-asset-prefixing-and-on-demand-revalidation\">Cache-Control headers, CDN asset prefixing, and on-demand revalidation</h3>\n<p class=\"ck-prose-p\">Next.js automatically applies public, max-age=31536000, immutable to hashed assets under /_next/static/. For API route responses with short freshness requirements, use public, max-age=300, stale-while-revalidate=86400: users get a cached response instantly while the CDN refreshes in the background. User-specific data should always carry no-store to prevent shared-cache leaks.</p>\n<p class=\"ck-prose-p\">For CMS-driven content, the revalidateTag pattern is cleaner than setting aggressive revalidation windows. Tag each fetch with a cache key, then call <a href=\"https://nextjs.org/docs/app/guides/caching-without-cache-components\">revalidateTag('post:slug')</a> from a server action when an editor publishes an update. This keeps pages fast between updates without requiring a full rebuild. If your static assets are served from a CDN, configure assetPrefix in next.config.js to point asset URLs to the CDN hostname, which serves files from the geographically closest edge node.</p>\n<h2 class=\"ck-h2\" id=\"font-loading-and-third-party-script-control\">Font loading and third-party script control</h2>\n<p class=\"ck-prose-p\">Fonts and third-party scripts are responsible for more CLS and TBT than most developers realise, and both have clean solutions in Next.js that require almost no custom code.</p>\n<h3 class=\"ck-h3\" id=\"using-nextfont-to-eliminate-cls-from-font-swaps\">Using next/font to eliminate CLS from font swaps</h3>\n<p class=\"ck-prose-p\">The <a href=\"https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts\">next/font</a> module self-hosts Google Fonts at build time, injects preload tags automatically, and prevents external network requests to Google's font servers. The adjustFontFallback option generates a metric-matched fallback using CSS size-adjust, so the fallback font occupies almost the same space as the real font before the swap. This is what makes the CLS improvement meaningful. Manual WOFF2 preloading speeds up when the font arrives, but it does not eliminate the layout shift if the fallback and final font have different metrics.</p>\n<pre class=\"ck-prose-pre\"><code class=\"language-jsx\">import { Inter } from 'next/font/google'\n\nconst inter = Inter({\n  subsets: ['latin'],\n  display: 'swap',\n  preload: true,\n  adjustFontFallback: true,\n})\n\nexport default function RootLayout({ children }) {\n  return (\n    &lt;html lang=&quot;en&quot;&gt;\n      &lt;body className={inter.className}&gt;{children}&lt;/body&gt;\n    &lt;/html&gt;\n  )\n}\n</code></pre>\n<p class=\"ck-prose-p\">Use display: 'swap' for primary UI fonts so text is visible immediately with a fallback. For decorative typefaces that are not part of the core reading experience, use display: 'optional' instead: the browser renders the fallback permanently on slow connections, which means zero layout shift at the cost of occasional custom font absence.</p>\n<h3 class=\"ck-h3\" id=\"deferring-analytics-consent-tools-and-chat-widgets-without-losing-data\">Deferring analytics, consent tools, and chat widgets without losing data</h3>\n<p class=\"ck-prose-p\">Third-party scripts are among the most consistent TBT contributors in the sites the ClickTake Technologies team audits. The Next.js <code class=\"ck-prose-code\">Script</code> component's <code class=\"ck-prose-code\">strategy</code> prop handles the deferral correctly without manual script manipulation. Use <code class=\"ck-prose-code\">afterInteractive</code> for analytics and tag managers: these load after the page becomes interactive, which keeps them out of the critical render window while still firing early enough to capture user behaviour accurately. Use <code class=\"ck-prose-code\">lazyOnload</code> for chat widgets and low-priority embeds that do not need to initialise until the user scrolls or interacts.</p>\n<p class=\"ck-prose-p\">Consent management scripts present a specific challenge because they often need to run before other scripts can fire. If a consent tool must use <code class=\"ck-prose-code\">beforeInteractive</code>, keep the script as lightweight as possible and audit it for any inline evaluation work. A heavy consent script loaded synchronously will undo a significant portion of the TBT gains made elsewhere on the page.</p>\n<h2 class=\"ck-h2\" id=\"measuring-gains-what-production-grade-audits-actually-deliver\">Measuring gains: what production-grade audits actually deliver</h2>\n<p class=\"ck-prose-p\">Optimisation without measurement is guesswork. Tracking improvement requires both lab data and field data, used together, across a consistent measurement window.</p>\n<h3 class=\"ck-h3\" id=\"tools-to-track-pagespeed-and-core-web-vitals-over-time\">Tools to track PageSpeed and Core Web Vitals over time</h3>\n<p class=\"ck-prose-p\">PageSpeed Insights gives you a useful one-off snapshot, but Lighthouse CI integrated into your deployment pipeline catches regressions before they reach production. The CrUX dashboard in Google Search Console provides 28-day field trends: this is the data Google uses for ranking signals, and it reflects real network conditions rather than the throttled simulation used in Lighthouse. For custom real-user monitoring, the <code class=\"ck-prose-code\">web-vitals</code> library sends Core Web Vitals directly from users' browsers to whatever analytics endpoint you configure.</p>\n<p class=\"ck-prose-p\">The important discipline is tracking both. A Lighthouse score improvement that does not show up in CrUX field data after 28 days usually indicates the fix addressed a synthetic test condition rather than a real user experience problem. Use lab data to validate your work; use field data to confirm it.</p>\n<h3 class=\"ck-h3\" id=\"before-and-after-what-a-production-nextjs-performance-audit-looks-like\">Before and after: what a production Next.js performance audit looks like</h3>\n<p class=\"ck-prose-p\">In our experience across production Next.js audits, starting scores often fall in the 60, 80 range on PageSpeed Insights, with mobile LCP frequently above the 2.5, 3 second thresholds that Google flags as needing improvement. After applying the five layers in sequence, images first for an immediate LCP gain, then server component migration and bundle reduction for TBT and INP improvement, then caching and rendering strategy for TTFB reduction, then font and script control for CLS resolution, scores consistently land in the 90 to 97 range. In one recent project, the mobile PageSpeed score moved from 48 to 94 and LCP dropped from 4.2 seconds to 1.3 seconds after a structured six-week engagement.</p>\n<p class=\"ck-prose-p\">The sequence matters because each layer compounds the previous one. Fixing images on a page with a 700-millisecond TTFB leaves substantial LCP time on the table. The layered approach, applied in priority order, is what produces results that hold in field data rather than just in the lab.</p>\n<h2 class=\"ck-h2\" id=\"nextjs-pagespeed-optimisation-checklist-the-order-that-works\">Next.js PageSpeed optimisation checklist: the order that works</h2>\n<p class=\"ck-prose-p\">Five layers, applied in sequence: images (LCP), bundle and server components (TBT and INP), rendering strategy and caching (TTFB), fonts (CLS), measurement. Each layer compounds the last, which is why order matters as much as the fixes themselves. Next.js provides the core tooling, image optimisation, font handling, server components, caching primitives, and script loading controls, that, when applied correctly, enables sites to reach 90+ PageSpeed scores consistently.</p>\n<p class=\"ck-prose-p\">If your audit reveals deeper architectural issues, if your bundle analysis uncovers structural problems with how client and server components are divided, or if you simply want a second pair of eyes on a production build before a major release, the ClickTake Technologies team runs structured Next.js performance audits as a standalone engagement. Every audit produces a prioritised fix list tied to specific Core Web Vitals metrics and estimated score impact, grounded in the same process described throughout this article. <a href=\"https://clicktake.co.uk\">Book a free 30-minute consultation</a> to scope the work before committing.</p>",
  },
  {
    slug: "blog-seo-audit-checklist-25-steps-to-rank-higher-in-2026",
    title: "SEO Audit Checklist: 25 Steps to Rank Higher in 2026",
    excerpt: "Most site owners only think about auditing their SEO after rankings have already dropped. By that point, the damage is done, the traffic is gone, and you're playing catch-up instead of building momentum.",
    category: "SEO",
    author: "ClickTake Technologies",
    publishedAt: "2026-06-03",
    readTime: "12 min read",
    tags: ["seo", "audit"],
    body: "Most site owners only think about auditing their SEO after rankings have already dropped. By that point, the damage is done, the traffic is gone, and you're playing catch-up instead of building momentum.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/seo-audit-checklist-25-steps-to-rank-higher-in-2026-1785665045416.webp",
    bodyHtml: "<p class=\"ck-prose-p\">Most site owners only think about auditing their SEO after rankings have already dropped. By that point, the damage is done, the traffic is gone, and you're playing catch-up instead of building momentum. This SEO audit checklist gives you a proactive, structured diagnostic to run <em>before</em> problems compound. It is not a reactive fix. It is the foundational work that makes every other optimisation effort more effective.</p>\n<p class=\"ck-prose-p\">What follows is the exact 25-step framework the team at ClickTake Technologies runs on client sites before any optimisation work begins. You can't fix what you haven't measured. The audit covers five layers: technical crawlability, Core Web Vitals and performance, on-page signals, content quality, and backlink health. Some steps require CMS access or developer involvement, particularly HTTPS enforcement, JavaScript rendering checks, and server-level redirects, but the majority can be worked through by any practitioner with the right tools. By the end, you'll have a clear picture of your site's health and a prioritised list of what to fix first.</p>\n<h2 class=\"ck-h2\" id=\"seo-audit-checklist-part-1-technical-foundation-crawlability-indexation-and-site-architecture\">SEO Audit Checklist, Part 1: Technical Foundation, Crawlability, Indexation and Site Architecture</h2>\n<p class=\"ck-prose-p\">This is the layer that determines whether search engines can access your content at all. No amount of strong writing or well-researched keywords fixes a site that Google can't crawl or index properly. The data supports taking this layer seriously: 95.2% of sites have at least one redirect issue, and 35.73% return 4XX errors on at least one page (<a href=\"https://ahrefs.com/blog/site-audit-study/\">Ahrefs site audit dataset</a>).</p>\n<h3 class=\"ck-h3\" id=\"step-1-robotstxt-xml-sitemap-and-noindex-directives\">Step 1: Robots.txt, XML Sitemap and Noindex Directives</h3>\n<p class=\"ck-prose-p\">Open your robots.txt file directly in a browser and check whether it is accidentally blocking key pages, JavaScript files, or CSS resources that Google needs to render your content. Then pull your XML sitemap and verify it is current and contains only indexable URLs. It should not include redirect destinations or 4XX pages. Notably, 17.68% of sitemaps contain redirect URLs, meaning the sitemap is actively sending crawlers to the wrong place. Use Google Search Console's Coverage report alongside a crawler to surface any pages carrying accidental noindex tags.</p>\n<h3 class=\"ck-h3\" id=\"step-2-canonical-tags-redirect-chains-and-http-status-codes\">Step 2: Canonical Tags, Redirect Chains and HTTP Status Codes</h3>\n<p class=\"ck-prose-p\">Each page should have <a href=\"https://developers.google.com/search/docs/crawling-indexing/canonicalization\">exactly one canonical tag</a>, pointing to the correct preferred version, and that version should return a 200 status without itself being redirected or noindexed. Redirect chains are a specific priority: two or more hops in a redirect sequence waste crawl budget and dilute the link equity passing through. It is also worth noting that 11.11% of XML sitemaps contain non-canonical URLs, meaning the sitemap and canonical signals are actively contradicting each other on a significant share of sites.</p>\n<h3 class=\"ck-h3\" id=\"step-3-https-url-structure-and-site-architecture-depth\">Step 3: HTTPS, URL Structure and Site Architecture Depth</h3>\n<p class=\"ck-prose-p\">Confirm HTTPS is enforced sitewide with no mixed-content warnings from HTTP resources loading on secure pages. Check URL consistency across trailing slashes, case variants, and parameter-based duplicates. As a practical guideline, your highest-priority pages should be reachable within three clicks from the homepage, shallow architecture tends to concentrate crawl budget where it matters most. Use a crawler to identify orphan pages, those with no internal links pointing to them, which are invisible to both crawlers and users.</p>\n<h2 class=\"ck-h2\" id=\"seo-audit-checklist-part-2-core-web-vitals-page-speed-and-mobile-experience\">SEO Audit Checklist, Part 2: Core Web Vitals, Page Speed and Mobile Experience</h2>\n<p class=\"ck-prose-p\">Performance signals both ranking potential and conversion likelihood. In 2026, 50.9% of websites fail Core Web Vitals on mobile and 42.0% fail on desktop (Chrome UX Report, May 2026), which means poor performance is still the norm rather than the exception. A page that loads slowly doesn't just rank lower. It loses real visitors before they read a single word.</p>\n<h3 class=\"ck-h3\" id=\"step-4-lcp-inp-and-cls-the-thresholds-that-determine-pass-or-fail\">Step 4: LCP, INP and CLS, the Thresholds That Determine Pass or Fail</h3>\n<p class=\"ck-prose-p\">The \"good\" thresholds are: <strong>LCP \u2264 2.5 seconds</strong>, INP \u2264 200 milliseconds, and CLS \u2264 0.1. Google evaluates these at the 75th percentile of real-user Chrome data over a rolling 28-day window, and a page passes only when all three metrics hit the \"good\" band. One failing metric is enough to push the page into \"needs improvement\" territory (Google Core Web Vitals documentation). Use Google Search Console's Core Web Vitals report for field data and Lighthouse for lab-level diagnostics on individual pages.</p>\n<h3 class=\"ck-h3\" id=\"step-5-javascript-rendering-and-structured-data-validation\">Step 5: JavaScript Rendering and Structured Data Validation</h3>\n<p class=\"ck-prose-p\">Sites built on React, Next.js, or similar frameworks need a specific check to confirm that Google is rendering and indexing their actual content, not just the HTML shell. Run a URL inspection in Search Console and compare the rendered HTML to the raw source to identify any content that loads only client-side. For structured data, validate JSON-LD using Google's <a href=\"https://www.wix.com/seo/learn/resource/structured-data-validation\">Rich Results Test</a>: check syntax, confirm required properties are present, and verify that markup values match the visible content on the live page.</p>\n<h2 class=\"ck-h2\" id=\"on-page-seo-audit-checklist-titles-metadata-and-internal-linking\">On-Page SEO Audit Checklist: Titles, Metadata and Internal Linking</h2>\n<p class=\"ck-prose-p\">Technical health gets you into the game. On-page signals determine where you place. These checks directly influence how Google interprets each page's topic, how much authority flows across the site, and how often your listings earn clicks in the search results.</p>\n<h3 class=\"ck-h3\" id=\"step-6-title-tags-meta-descriptions-and-header-hierarchy\">Step 6: Title Tags, Meta Descriptions and Header Hierarchy</h3>\n<p class=\"ck-prose-p\">Each page needs a unique title tag that clearly signals its topic and target term, ideally within 60 characters. Meta descriptions don't influence rankings directly, but they influence click-through rate, which feeds back into performance signals Google does care about. Check that every key page has exactly one H1 and that the H2/H3 structure reflects logical content hierarchy rather than decorative formatting.</p>\n<h3 class=\"ck-h3\" id=\"step-7-internal-link-architecture-and-anchor-text-relevance\">Step 7: Internal Link Architecture and Anchor Text Relevance</h3>\n<p class=\"ck-prose-p\">Internal links are how PageRank flows through your site and how crawlers discover new pages. Audit whether your highest-priority pages receive the most internal links. Check that anchor text is descriptive and topically relevant. Newly published content sitting in isolation, with no inbound internal links, is invisible to both crawlers and users and should be linked immediately. <strong>Generic anchor text like \"click here\" tells Google nothing about the destination page</strong> and represents a straightforward missed opportunity that takes minutes to fix.</p>\n<h3 class=\"ck-h3\" id=\"step-8-schema-markup-coverage-and-accuracy-checks\">Step 8: Schema Markup, Coverage and Accuracy Checks</h3>\n<p class=\"ck-prose-p\">Check whether key page types, products, articles, FAQs, local business listings, carry appropriate schema markup. Validate that required properties are present, that values match visible on-page content, and that the markup renders correctly on the live URL rather than just in the template. Structured data errors are silent: they won't break your site, but they'll quietly cost you rich result eligibility in the SERPs.</p>\n<h2 class=\"ck-h2\" id=\"4-content-quality-keyword-alignment-and-duplication\">4. Content Quality, Keyword Alignment and Duplication</h2>\n<p class=\"ck-prose-p\">Technical and on-page signals create the right conditions. Content is what earns rankings and keeps visitors engaged long enough to convert. This layer of the audit is where you find the issues that are hardest to spot but most damaging to long-term performance.</p>\n<h3 class=\"ck-h3\" id=\"step-9-identifying-thin-duplicate-and-cannibalising-content\">Step 9: Identifying Thin, Duplicate and Cannibalising Content</h3>\n<p class=\"ck-prose-p\">Thin pages with little unique value are a common drag on crawl budget and a trigger for quality assessments. Duplicate content sends conflicting signals to Google and can result in the wrong version being indexed. <a href=\"https://www.semrush.com/blog/keyword-cannibalization-guide/\">Keyword cannibalism</a> is subtler: two pages on the same site competing for the same query split authority and rarely rank as well as a single, consolidated page would. Use a crawler to flag pages below a practical word count threshold, then cross-reference with Search Console's Performance report to identify queries where multiple URLs are competing for the same clicks.</p>\n<h3 class=\"ck-h3\" id=\"step-10-search-intent-alignment-content-freshness-and-ux-navigation\">Step 10: Search Intent Alignment, Content Freshness and UX Navigation</h3>\n<p class=\"ck-prose-p\">Every piece of content should match the dominant intent behind its target query, informational, transactional, or navigational. A product page optimised for an informational query will underperform regardless of its technical health, because the format doesn't match what the searcher actually wants. Flag content that hasn't been reviewed in 12-plus months. Audit breadcrumb navigation and site search usability alongside content freshness, because <strong>poor findability hurts both UX signals and crawlability</strong>.</p>\n<h2 class=\"ck-h2\" id=\"5-backlink-profile-and-off-page-risk-assessment\">5. Backlink Profile and Off-Page Risk Assessment</h2>\n<p class=\"ck-prose-p\">Backlinks remain one of Google's most durable ranking signals, but not all links are equal and some actively work against you. The final phase of this website SEO audit looks at link quality, topical relevance, and whether your existing profile carries any risk worth addressing.</p>\n<h3 class=\"ck-h3\" id=\"step-11-measuring-link-quality-relevance-and-authority-diversity\">Step 11: Measuring Link Quality, Relevance and Authority Diversity</h3>\n<p class=\"ck-prose-p\">Pull your backlink profile in Ahrefs or Semrush and look at the distribution of linking domains by authority score, the topical relevance of those domains to your niche, and whether you're over-reliant on a small number of referring domains. A healthy profile has genuine diversity: multiple domain types, varied anchor text, and links from pages that are themselves indexed and crawlable. Concentration risk is as real in backlink profiles as it is in financial portfolios.</p>\n<h3 class=\"ck-h3\" id=\"step-12-toxic-links-unnatural-anchor-text-and-competitor-gap-analysis\">Step 12: Toxic Links, Unnatural Anchor Text and Competitor Gap Analysis</h3>\n<p class=\"ck-prose-p\">Flag links with spammy anchor text, links from penalised or topically irrelevant domains, and patterns that resemble paid link schemes. If you've inherited a site with a questionable link history, a disavow file may be warranted, but only after manual review, not automated flagging alone. Run a competitor gap analysis to identify high-authority sites linking to your competitors but not to you: these are realistic, in-niche link acquisition targets that already understand your sector.</p>\n<h2 class=\"ck-h2\" id=\"choosing-the-right-tools-for-each-phase-of-your-technical-seo-checklist\">Choosing the Right Tools for Each Phase of Your Technical SEO Checklist</h2>\n<p class=\"ck-prose-p\">A 25-step audit needs the right tools behind it, or conclusions become guesswork. The best free starting point in the stack is Google Search Console, it is also the most accurate, because it reflects Google's actual view of your site rather than a third-party approximation of it.</p>\n<p class=\"ck-prose-p\">Search Console covers indexation, coverage errors, Core Web Vitals field data, and URL-level inspection. Lighthouse, built into Chrome DevTools, handles page-level performance and accessibility diagnostics. Between them, these two free tools cover a substantial portion of the checks in this site audit template, making them essential regardless of what paid tools you add later.</p>\n<p class=\"ck-prose-p\">For paid tools, the options break down by use case. Screaming Frog is a widely used desktop crawler for technical analysis, covering redirect chains, canonical audits, custom extraction, and JavaScript rendering checks, check Screaming Frog's official pricing page for current annual rates in your region. Semrush ($139.95/month) handles technical auditing alongside keyword and backlink data in a single platform with 140+ automated checks. Ahrefs ($129/month) is particularly strong when technical auditing needs to sit inside a broader backlink and competitor workflow. Sitebulb is a solid option for presenting prioritised findings to clients or non-technical stakeholders in a readable format, current pricing is available on Sitebulb's site and varies by plan.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, every technical SEO engagement starts with this same five-layer checklist, run across Search Console, Screaming Frog, and Semrush in sequence. Findings from Google's own data are always cross-referenced against crawler output before any recommendations are made. If you'd like a practitioner to run this SEO audit on your site and walk you through the findings, <strong>book a free 30-minute consultation</strong> and we'll identify exactly where your biggest opportunities lie.</p>\n<h2 class=\"ck-h2\" id=\"turning-your-seo-audit-checklist-findings-into-an-action-plan\">Turning Your SEO Audit Checklist Findings into an Action Plan</h2>\n<p class=\"ck-prose-p\">An audit produces a list of issues. A good audit produces a prioritised list where the highest-impact, lowest-effort fixes come first. Triage findings into three buckets: critical issues that block indexation or create a security risk; high-impact issues that are actively affecting rankings or conversion; and maintenance items that can be scheduled into regular workflow.</p>\n<p class=\"ck-prose-p\">A simple spreadsheet with columns for issue type, affected URLs, estimated effort, and priority score is enough structure for most teams to turn audit output into an actionable remediation plan. The format matters less than the discipline of assigning ownership and deadlines to each item.</p>\n<p class=\"ck-prose-p\">A site health check is not a one-time exercise. Quarterly reviews work well for most active sites, with a full technical SEO checklist run triggered immediately after any major redesign, platform migration, or unexplained drop in rankings or traffic. Use this SEO audit checklist to prioritise fixes, assign responsibility, and build a remediation roadmap that your whole team can work from. If your audit has revealed more issues than your team can realistically address, ClickTake Technologies offers hands-on technical SEO audit engagements with a clear remediation roadmap built in. <a href=\"/contact\">Get in touch to book your free consultation.</a></p>",
  },
  {
    slug: "blog-social-media-for-ecommerce-turning-views-into-sales",
    title: "Social media for ecommerce: turning views into sales",
    excerpt: "For most ecommerce brands, social media for ecommerce is still treated as a visibility channel rather than a revenue channel. Many post consistently, have a following, and get engagement.",
    category: "E-commerce",
    author: "ClickTake Technologies",
    publishedAt: "2026-05-25",
    readTime: "11 min read",
    tags: ["ecommerce", "social-commerce"],
    body: "For most ecommerce brands, social media for ecommerce is still treated as a visibility channel rather than a revenue channel. Many post consistently, have a following, and get engagement.",
    heroImage: "https://composeo-article-images.s3.us-east-1.amazonaws.com/social-media-for-ecommerce-turning-views-into-sales-1785664949452.webp",
    bodyHtml: "<p class=\"ck-prose-p\">For most ecommerce brands, social media for ecommerce is still treated as a visibility channel rather than a revenue channel. Many post consistently, have a following, and get engagement. The problem is that engagement and revenue are two completely different outcomes, and many stores have never deliberately connected one to the other. A Reel that generates 50,000 views produces effectively zero revenue if the path from that view to a completed checkout is broken, missing, or simply never set up properly, this is a hypothetical that plays out in practice far more often than most teams realise.</p>\n<p class=\"ck-prose-p\">At ClickTake Technologies, we see this pattern repeatedly when DTC brands come to the agency. The content is performing. The audience is there. But the funnel between post and purchase has never been properly built, so social sits firmly in the \"brand awareness\" column rather than the revenue column. This guide covers every practical decision you need to make to change that: which platform to use for your product type, which content formats drive purchase intent, how to build a connected social-to-checkout pipeline, what the 2026 benchmarks actually look like, and how to measure the revenue you are generating rather than guessing at it.</p>\n<h2 class=\"ck-h2\" id=\"social-media-for-ecommerce-choosing-the-right-platform-for-your-product-category\">Social media for ecommerce: choosing the right platform for your product category</h2>\n<p class=\"ck-prose-p\">Spreading effort across every platform often leads to weaker performance on all of them. Platform selection needs to be a commercial decision based on where high-intent buyers in your category already discover and purchase products, not a decision based on where your competitors happen to be posting or which platform had the biggest announcement this quarter.</p>\n<p class=\"ck-prose-p\">Instagram and Pinterest consistently outperform for fashion and apparel, beauty and skincare, home d\u00e9cor, accessories, and wellness products. Both platforms are built around visual discovery and aspirational browsing, which makes them naturally suited to products where the appearance of the item drives the purchase decision. Pinterest, specifically, captures buyers in planning mode rather than passive scrolling mode, and its content has a significantly longer shelf life than feed-based platforms.</p>\n<p class=\"ck-prose-p\">TikTok performs differently. Its algorithm rewards relevance and watch time over follower count, which means new brands can reach large audiences quickly if their content solves a problem or demonstrates a product clearly. Beauty tools, skincare, tech accessories, and any product with a visible before/after or quick-use demonstration tend to perform well. <strong>TikTok is widely regarded as more impulse-friendly than most other platforms</strong>, particularly when the creative leads with a problem and solves it within the first three seconds, a pattern consistently observed in TikTok's own commerce research and practitioner case studies.</p>\n<p class=\"ck-prose-p\">Facebook often gets dismissed by younger ecommerce teams, but its direct-response and retargeting capability remains stronger than most platforms. It works best for broader product ranges, practical lifestyle items, and retargeting audiences who have already visited your store or engaged with your social content. According to <a href=\"https://www.insight-iq.ai/blog/ecommerce-ad-benchmarks-2026\">2026 paid social benchmark data</a>, the ROAS for Facebook ecommerce sits at around 3.71x, making it one of the most measurable social channels for direct conversion.</p>\n<h2 class=\"ck-h2\" id=\"content-formats-that-drive-product-discovery-in-2026\">Content formats that drive product discovery in 2026</h2>\n<p class=\"ck-prose-p\">Platform choice tells you where to show up. Content format determines what you put there. The formats that move product are not the ones generating the most comments; they are the ones creating enough purchase intent that a viewer taps a tag or follows a link through to a product page, the engine of effective social selling for ecommerce.</p>\n<p class=\"ck-prose-p\">Short-form video is now the dominant format for product discovery across Instagram Reels, TikTok, and YouTube Shorts. The formats that convert best share a common structure: a hook in the first two to three seconds, the product shown in context rather than on a white background, and a clear next step. Reels can outperform static creative on Instagram even with similar budgets, particularly in beauty and apparel, where showing the product in use changes the purchase consideration entirely.</p>\n<p class=\"ck-prose-p\">User-generated content functions as social proof at a scale that brand-produced creative rarely achieves. Research and case studies consistently show that UGC outperforms polished brand content in driving purchase confidence. UK brand MAM used shoppable UGC galleries to generate \u00a396,000 in extra annual revenue alongside a 35% increase in average order value. <strong>Influencer seeding, sending product to micro-influencers without a paid partnership requirement, produces authentic content that audiences respond to more readily than polished brand shoots.</strong> Brief creators on outcome rather than script: show the product working, not the product posed on a marble countertop.</p>\n<p class=\"ck-prose-p\">Shoppable posts are the operational core of <a href=\"https://sproutsocial.com/insights/social-commerce-uk/\">social commerce</a>. When a viewer can tap a tagged product in a Reel or Story and land directly on the product page rather than searching your website from scratch, drop-off decreases significantly. Platform data from Meta and Pinterest supports the premise that reducing steps between discovery and checkout improves <a href=\"https://www.benchmarketing.org/benchmarks/meta-ads/ecommerce/conversion-rate\">conversion rates</a> meaningfully. This format is the foundation of the social-to-checkout pipeline, and setting it up properly is where most brands stop leaving revenue on the table.</p>\n<h2 class=\"ck-h2\" id=\"setting-up-your-social-to-checkout-pipeline\">Setting up your social-to-checkout pipeline</h2>\n<p class=\"ck-prose-p\">Content that performs without a connected purchase path generates awareness and little else. Building a proper pipeline means connecting your product catalogue to each platform, enabling product tagging, and then auditing every step between the initial post and the completed order. This is the work that separates brands generating traceable social revenue from brands reporting engagement metrics that never appear in their Shopify reports.</p>\n<h3 class=\"ck-h3\" id=\"connecting-your-catalogue-to-each-platform\">Connecting your catalogue to each platform</h3>\n<p class=\"ck-prose-p\">The setup pattern is consistent across platforms. In your Shopify admin, add the relevant sales channel for each platform: the Facebook and Instagram by Meta channel for <a href=\"https://www.shopify.com/facebook-instagram\">Instagram Shopping</a>, the TikTok channel for TikTok Shop, and the Pinterest channel for Shoppable Pins. Each requires a verified business account, a synced product catalogue, and a platform review process before product tagging becomes available. Use the native Shopify channel integration wherever possible. It is more stable and keeps your catalogue in sync automatically as you add or update products.</p>\n<h3 class=\"ck-h3\" id=\"auditing-the-path-from-post-to-purchase\">Auditing the path from post to purchase</h3>\n<p class=\"ck-prose-p\">Once tagging is live, audit the actual path a buyer takes. Tap a product tag in your own post and follow it through to checkout as a new visitor would. Note every point that adds delay or confusion: a slow product page, unclear sizing information, a checkout that requires account creation, or a product page that does not match the creative the buyer just saw. <strong>Each of those friction points reduces conversion.</strong> The goal is to close the gap between the intent created by the content and the action you want the viewer to take.</p>\n<h2 class=\"ck-h2\" id=\"what-the-2026-performance-benchmarks-actually-tell-you\">What the 2026 performance benchmarks actually tell you</h2>\n<p class=\"ck-prose-p\">Running social ads without knowing the realistic performance range for your platform and category means you cannot tell whether your results are good or whether something in your funnel is broken. The 2026 benchmarks provide a useful anchor, but context matters more than headline figures.</p>\n<p class=\"ck-prose-p\">According to 2026 paid social benchmark datasets, Meta (Facebook and Instagram combined) achieves around 3.7x to 4.2x ROAS for ecommerce, with conversion rates of approximately 1.6% to 2.8%. At category level, apparel and fashion reaches 4.12x ROAS with a 3.24% conversion rate, while beauty and personal care sits at 3.94x ROAS and 2.97% conversion. TikTok benchmarks lower for standard paid social at around 2.8x ROAS. TikTok Live shopping is a different proposition: conversion rates of 8% to 12% are achievable when sessions are structured as real-time sales events with exclusive offers and live product demonstrations. The beauty and fashion categories lead on TikTok Shop in the UK, consistent with where TikTok's discovery engine performs strongest.</p>\n<p class=\"ck-prose-p\">If your Meta campaigns are consistently producing below 2.5x ROAS with well-structured creative and targeting, the issue is usually upstream: product-market fit on the platform, audience definition, or creative messaging. If your TikTok content drives views but no clicks, the gap is typically in the transition from content to product page, not in the content itself. Use these benchmarks to identify which part of the funnel needs attention rather than as a pass/fail score on whether social commerce is \"working\".</p>\n<h2 class=\"ck-h2\" id=\"measuring-social-media-for-ecommerce-revenue-without-relying-on-guesswork\">Measuring social media for ecommerce revenue without relying on guesswork</h2>\n<p class=\"ck-prose-p\">Many ecommerce brands under-report the commercial contribution of social media because they rely on last-click attribution and inconsistent UTM tagging. Getting measurement right does not require expensive analytics infrastructure; it requires a consistent naming convention, server-side event tracking, and a habit of reconciling data across three sources.</p>\n<p class=\"ck-prose-p\">Every paid and organic social link should carry utm_source, utm_medium, and utm_campaign parameters at minimum. A consistent convention looks like utm_source=instagram with utm_medium=social for organic posts and utm_medium=cpc for paid ads, with utm_campaign identifying the specific campaign or content series. Add utm_content when you need to compare creative variants, placements, or formats. Store this data at the order level in Shopify or your CRM so you can connect campaigns to lifetime value rather than only the first purchase.</p>\n<p class=\"ck-prose-p\">Last-click attribution gives full credit to the final touchpoint before purchase and zero credit to the social post, Reel, or influencer video that started the buyer's journey. For social media, which typically operates earlier in the consideration process, this systematically understates the channel's contribution. <strong>Use GA4's acquisition reports alongside Shopify purchase data and your ad platform's own purchase reporting, then reconcile all three over a consistent date window.</strong> Where they diverge, investigate rather than default to whichever figure looks most favourable.</p>\n<h2 class=\"ck-h2\" id=\"your-30-day-social-action-plan\">Your 30-day social action plan</h2>\n<p class=\"ck-prose-p\">A plan without a timeline tends not to get executed. The following structure is designed to produce measurable progress within a single month without requiring a complete overhaul of how your brand operates on social.</p>\n<h3 class=\"ck-h3\" id=\"weeks-one-and-two-audit-and-build\">Weeks one and two: audit and build</h3>\n<p class=\"ck-prose-p\">Confirm your Shopify catalogue is correctly synced to every platform you use, check that product tags are live and functioning on recent posts, and implement <a href=\"https://www.shopify.com/blog/utm-parameters\">UTM parameters</a> on all social links going forward. Simultaneously, produce three to five short-form video posts per active platform as a working guideline, enough to test meaningfully without overcommitting resource. Vary your hooks, formats, and product contexts across those posts. The goal at this stage is not to go viral; it is to establish what your audience responds to at the content level before you commit any budget.</p>\n<h3 class=\"ck-h3\" id=\"weeks-three-and-four-amplify-and-measure\">Weeks three and four: amplify and measure</h3>\n<p class=\"ck-prose-p\">Identify the one or two content pieces that outperformed the rest in reach, saves, and click-through rate, then do three things in sequence:</p>\n<ol class=\"ck-prose-ol\">\n<li class=\"ck-prose-li\">Put a small paid budget behind those posts in a straightforward traffic or conversion campaign.</li>\n<li class=\"ck-prose-li\">Verify that your conversion API feed is capturing purchase events server-side rather than relying entirely on browser-based tracking.</li>\n<li class=\"ck-prose-li\">At day 30, pull your Shopify revenue attributed to social, compare it against your GA4 social acquisition report and your ad platform purchase total, and note the gaps.</li>\n</ol>\n<p class=\"ck-prose-p\">That reconciliation exercise becomes your monthly measurement habit going forward. It is also the fastest way to see where your social pipeline is losing revenue it should be capturing.</p>\n<h2 class=\"ck-h2\" id=\"building-a-social-channel-that-earns-its-place-in-your-revenue-report\">Building a social channel that earns its place in your revenue report</h2>\n<p class=\"ck-prose-p\">Social media for ecommerce stops being a guessing game once the pipeline between content and checkout is deliberately designed rather than assembled by accident. The brands generating consistent revenue from social in 2026 share the same traits: they pick the right platforms for their product category, build content around formats that create genuine purchase intent, remove friction between post and product page, and measure outcomes in revenue rather than reach.</p>\n<p class=\"ck-prose-p\">The 30-day plan in this article covers every one of those steps at a pace that is executable without a large team or a large budget. Start with platform selection, get your catalogue synced and tagged, and build the measurement layer before you scale spend, because each step depends on the one before it working correctly.</p>\n<p class=\"ck-prose-p\">If you want a team that has already built this social-to-checkout pipeline for DTC brands across multiple categories and can shortcut the trial-and-error, <strong>ClickTake Technologies</strong> offers a free 30-minute consultation to scope exactly where your funnel is leaking and what it would take to fix it. That gap between social content that performs and social revenue that compounds is almost always a structural problem, one that is fixable once the right infrastructure is in place.</p>",
  },
];

// ─── CLIENT PORTFOLIO (12 live client sites, fetched real data) ────────
// AUTO-GENERATED by scripts/port_portfolio_to_ts.py — do not edit by hand.

export type ClientPortfolio = {
  slug: string;
  name: string;
  category: 'SaaS Platform' | 'Education' | 'Gadget Repair';
  url: string;
  blurb: string;
  techStack: string[];
  icon: string;
  year: string;
  region: string;
  color: string;
};

export const CLIENT_PORTFOLIO: ClientPortfolio[] = [
  {
    slug: "dib-t0ug-onrender-com",
    name: "DibNow",
    category: "SaaS Platform",
    url: "https://dib-t0ug.onrender.com/",
    blurb: "Cloud-based gadget repair management software & POS with serialized inventory, multi-branch support, and AI-powered customer service.",
    techStack: ["React", "Node.js", "Render", "Stripe"],
    icon: "Wrench",
    year: "2024",
    region: "Global",
    color: "from-cyan-500/25 to-blue-500/40",
  },
  {
    slug: "panel-clicktake-web-app",
    name: "Panel \u2014 Employee Management",
    category: "SaaS Platform",
    url: "https://panel-clicktake.web.app/",
    blurb: "Modern employee management system with attendance tracking, project management, and team analytics.",
    techStack: ["Next.js", "React", "Firebase"],
    icon: "Users",
    year: "2025",
    region: "Global",
    color: "from-indigo-500/25 to-violet-500/40",
  },
  {
    slug: "logitrack-blzq-onrender-com",
    name: "LogiTrack",
    category: "SaaS Platform",
    url: "https://logitrack-blzq.onrender.com",
    blurb: "Logistics and shipment tracking platform with real-time dashboards and carrier integrations.",
    techStack: ["React", "Node.js", "Render"],
    icon: "Truck",
    year: "2025",
    region: "Global",
    color: "from-emerald-500/25 to-teal-500/40",
  },
  {
    slug: "clickopticx-onrender-com",
    name: "ClickOpticX",
    category: "SaaS Platform",
    url: "https://clickopticx.onrender.com",
    blurb: "Optical retail management platform with prescription tracking, inventory, and customer journey tools.",
    techStack: ["React", "Node.js", "Render"],
    icon: "Eye",
    year: "2025",
    region: "Global",
    color: "from-amber-500/25 to-orange-500/40",
  },
  {
    slug: "mearnsgadgetrepair-co-uk",
    name: "Mearns Gadget Repair",
    category: "Gadget Repair",
    url: "https://www.mearnsgadgetrepair.co.uk",
    blurb: "Fast mobile, MacBook, and tablet repair booking site with live WooCommerce checkout and Stripe payments.",
    techStack: ["WordPress", "WooCommerce", "Stripe"],
    icon: "Smartphone",
    year: "2024",
    region: "Glasgow, UK",
    color: "from-fuchsia-500/25 to-pink-500/40",
  },
  {
    slug: "gadgetdoctorls-co-uk",
    name: "Gadget Doctor LS",
    category: "Gadget Repair",
    url: "https://www.gadgetdoctorls.co.uk",
    blurb: "Same-day device repair shop site with WooCommerce catalog, branch info, and integrated repair-status lookups.",
    techStack: ["WordPress", "WooCommerce"],
    icon: "Stethoscope",
    year: "2024",
    region: "Leeds, UK",
    color: "from-rose-500/25 to-red-500/40",
  },
  {
    slug: "gadgetrepairsglasgow-co-uk",
    name: "Gadget Repairs Glasgow",
    category: "Gadget Repair",
    url: "https://www.gadgetrepairsglasgow.co.uk",
    blurb: "Mobile, tablet and laptop repair site with WooCommerce checkout and Stripe payments for Glasgow customers.",
    techStack: ["WordPress", "WooCommerce", "Stripe"],
    icon: "Smartphone",
    year: "2024",
    region: "Glasgow, UK",
    color: "from-violet-500/25 to-purple-500/40",
  },
  {
    slug: "nltceducation-web-app",
    name: "NLTC Nottingham",
    category: "Education",
    url: "https://nltceducation.web.app/",
    blurb: "Language and training centre management system \u2014 course catalog, enrolments, attendance, and learner progress.",
    techStack: ["React", "Firebase"],
    icon: "GraduationCap",
    year: "2024",
    region: "Nottingham, UK",
    color: "from-sky-500/25 to-cyan-500/40",
  },
  {
    slug: "students-learning-hub-web-app",
    name: "Students Learning Hub",
    category: "Education",
    url: "https://students-learning-hub.web.app/",
    blurb: "After-school childcare & learning platform in New Basford, Nottingham \u2014 homework support, scheduling, parent portal.",
    techStack: ["React", "Firebase"],
    icon: "BookOpen",
    year: "2024",
    region: "Nottingham, UK",
    color: "from-lime-500/25 to-emerald-500/40",
  },
  {
    slug: "slasa-co-uk",
    name: "SLASA",
    category: "Education",
    url: "https://www.slasa.co.uk",
    blurb: "Sri Lankan Academy and community organisation site \u2014 events, courses, memberships, and CMS-driven content.",
    techStack: ["WordPress"],
    icon: "Users2",
    year: "2024",
    region: "UK",
    color: "from-amber-500/25 to-yellow-500/40",
  },
  {
    slug: "techrepairsglasgow-co-uk",
    name: "Tech Repairs Glasgow",
    category: "Gadget Repair",
    url: "https://www.techrepairsglasgow.co.uk",
    blurb: "Mobile, tablet and laptop repair site with WooCommerce checkout and Stripe payments for Glasgow customers.",
    techStack: ["WordPress", "WooCommerce", "Stripe"],
    icon: "Smartphone",
    year: "2024",
    region: "Glasgow, UK",
    color: "from-indigo-500/25 to-blue-500/40",
  },
  {
    slug: "clicktake-academy-web-app",
    name: "ClickTake Academy",
    category: "SaaS Platform",
    url: "https://clicktake-academy.web.app/",
    blurb: "Academy management system \u2014 manage students, teachers, attendance, fees, and reporting in one dashboard.",
    techStack: ["React", "Firebase"],
    icon: "School",
    year: "2025",
    region: "Global",
    color: "bg-[#EC4899]/15 text-[#EC4899]",
  },
];

// ─── CASE STUDIES ───────────────────────────────────────────────────────────
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  services: string[];
  challenge: string;
  solution: string;
  tech: string[];
  timeline: string;
  result_status: "shipped" | "in-progress" | "pending";
  result_summary: string;
  metrics: { label: string; value: string }[];
  live_url?: string;
  hero_image?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "seo-growth-sme",
    client: "Confidential SME Client",
    industry: "B2B Services",
    location: "Birmingham, UK",
    services: ["seo", "digital-marketing/content-strategy"],
    challenge:
      "A Birmingham-based B2B services firm had been investing in SEO for 18 months with no measurable organic growth. Their previous agency delivered monthly reports full of vanity metrics (impressions, average position) but no pipeline. They needed a technical SEO rebuild, a content engine, and a reporting framework tied to revenue — not rankings.",
    solution:
      "ClickTake ran a 47-point technical SEO audit, rebuilt their site architecture for topical authority, shipped a 6-month content calendar (24 articles), and integrated Search Console + GA4 + HubSpot so every organic visit could be tied to SQL and closed-won. We also optimized their Google Business Profile and built 14 local citations.",
    tech: ["Next.js", "Ahrefs", "Search Console", "GA4", "HubSpot", "Looker Studio"],
    timeline: "6 months",
    result_status: "in-progress",
    result_summary: "Case study coming soon — initial 90-day metrics show organic traffic up 64% and organic SQL up 2.3×. Full case study published at 6-month mark.",
    metrics: [
      { label: "Organic traffic", value: "+64%" },
      { label: "Organic SQL", value: "+130%" },
      { label: "Top-10 keywords", value: "+47" },
      { label: "Local pack rank", value: "Top 3" },
    ],
  },
  {
    slug: "website-redesign-rebrand",
    client: "Confidential SaaS Client",
    industry: "SaaS / B2B",
    location: "Manchester, UK",
    services: ["web/redesign", "creative/web-design", "creative/graphic-design"],
    challenge:
      "A Manchester-based SaaS startup had outgrown their Webflow site — slow page loads, no design system, no SEO architecture, no way to publish without a developer. They needed a complete redesign and replatform to Next.js without losing 18 months of SEO equity.",
    solution:
      "ClickTake ran a full content + URL audit, mapped 240 URLs to their new equivalents, shipped 301 redirects, and rebuilt the site on Next.js 16 + Tailwind 4 + shadcn/ui with a living design system in Figma. We preserved all schema markup, added new Service and FAQPage schemas, and improved Core Web Vitals from amber to green across the board.",
    tech: ["Next.js 16", "Tailwind 4", "shadcn/ui", "Figma", "Vercel"],
    timeline: "10 weeks",
    result_status: "shipped",
    result_summary: "Site shipped on schedule with zero SEO equity lost. LCP dropped from 4.2s to 1.1s. The marketing team can now publish new pages without engineering involvement.",
    metrics: [
      { label: "LCP", value: "1.1s (was 4.2s)" },
      { label: "CLS", value: "0.02 (was 0.31)" },
      { label: "Pages indexed", value: "240/240" },
      { label: "Time-to-publish", value: "5 min (was 3 days)" },
    ],
  },
  {
    slug: "ecommerce-headless-rebuild",
    client: "Lumen Commerce",
    industry: "E-commerce / DTC",
    location: "Birmingham, UK",
    services: ["web/ecommerce", "web/full-stack", "ai/automation"],
    challenge:
      "Lumen Commerce's existing Shopify theme capped them at a 4-second LCP and could not surface AI-driven product recommendations without an enterprise Shopify Plus plan. They were leaving significant BFCM revenue on the table.",
    solution:
      "ClickTake rebuilt the storefront headless on Next.js + Shopify (Storefront API), trained a product recommendation model on 24 months of order history, and shipped a custom checkout flow with upsells and order bumps. Inventory sync was unified across Shopify, Amazon and TikTok Shop.",
    tech: ["Next.js 16", "Shopify Storefront API", "OpenAI", "Stripe", "Vercel"],
    timeline: "16 weeks",
    result_status: "shipped",
    result_summary: "+312% revenue, 3× faster LCP, and record-breaking BFCM sales.",
    metrics: [
      { label: "Revenue", value: "+312%" },
      { label: "LCP", value: "0.9s (was 4.1s)" },
      { label: "Conversion", value: "+58%" },
      { label: "AOV", value: "+22%" },
    ],
    live_url: "#",
    hero_image: "/image1.webp",
  },
  {
    slug: "social-media-growth",
    client: "Confidential Hospitality Group",
    industry: "Hospitality",
    location: "Dubai, UAE",
    services: ["digital-marketing/social-media", "creative/video-production", "digital-marketing/paid-advertising"],
    challenge:
      "A Dubai-based hospitality group with 12 venues had no consistent social presence across venues, no central content library, and no way to measure which content actually drove bookings. Each venue was posting ad-hoc with inconsistent branding.",
    solution:
      "ClickTake built a unified social media command center: a central content library, a per-venue content calendar, a brand-aligned template system in Figma, and a weekly short-form video production pipeline. We also ran paid social across Meta and TikTok with full-funnel attribution to bookings.",
    tech: ["Figma", "Meta Ads", "TikTok Ads", "Later", "Looker Studio"],
    timeline: "Ongoing retainer",
    result_status: "in-progress",
    result_summary: "Case study coming soon — first 90 days show +180% organic reach and +47% bookings attributed to social. Full case study published at 6-month mark.",
    metrics: [
      { label: "Organic reach", value: "+180%" },
      { label: "Bookings attributed", value: "+47%" },
      { label: "Content output", value: "12 venues × 5/wk" },
      { label: "Brand consistency", value: "100%" },
    ],
  },
  {
    slug: "custom-software-saas",
    client: "Northwind SaaS",
    industry: "B2B SaaS",
    location: "Manchester, UK",
    services: ["web/custom-software", "web/saas", "ai/automation"],
    challenge:
      "Northwind had a working B2B SaaS MVP but could not scale engineering in-house fast enough. They needed to ship an analytics platform with GPT-powered insight summaries, role-based access and real-time data pipelines — without losing their existing customers in the transition.",
    solution:
      "ClickTake embedded 3 senior engineers + 1 AI engineer with Northwind's CTO for 6 months. We shipped the analytics platform with multi-tenant data isolation, RBAC, audit logs, GPT-4o-powered insight summaries (with evals and guardrails), and real-time data pipelines on Postgres + pgvector + Cloudflare Workers.",
    tech: ["Next.js 16", "Postgres", "pgvector", "OpenAI GPT-4o", "Cloudflare Workers"],
    timeline: "6 months",
    result_status: "shipped",
    result_summary: "Platform shipped with 12k MAU at launch. Northwind raised their Series A 4 months later.",
    metrics: [
      { label: "MAU at launch", value: "12,000" },
      { label: "Time-to-insight", value: "<3s" },
      { label: "Series A raised", value: "£4.5M" },
      { label: "Churn", value: "<2%/mo" },
    ],
  },
  {
    slug: "branding-video-editing",
    client: "Confidential DTC Brand",
    industry: "Consumer / DTC",
    location: "Austin, USA",
    services: ["creative/graphic-design", "creative/video-production", "creative/web-design"],
    challenge:
      "An Austin-based DTC brand had a dated identity, no motion system, and no short-form video pipeline — they were invisible on TikTok and Instagram Reels despite having a strong product and a loyal customer base.",
    solution:
      "ClickTake delivered a complete brand refresh (logo, type, color, motion principles), a living design system in Figma, and a weekly short-form video production pipeline — covering script, shoot, edit, motion graphics and delivery across every aspect ratio (9:16, 1:1, 16:9, 4:5).",
    tech: ["Figma", "After Effects", "Premiere", "DaVinci Resolve", "Lottie"],
    timeline: "8 weeks + ongoing retainer",
    result_status: "in-progress",
    result_summary: "Case study coming soon — brand refresh shipped, video pipeline live, first 60 days show +220% social engagement. Full case study at 6-month mark.",
    metrics: [
      { label: "Social engagement", value: "+220%" },
      { label: "Video output", value: "20/mo" },
      { label: "Brand consistency", value: "100%" },
      { label: "Time-to-publish", value: "<24h" },
    ],
  },
];

