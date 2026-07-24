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
  { label: "Work", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Secondary links (used in mobile menu / footer / not in top nav directly)
export const NAV_LINKS_SECONDARY = [
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Resources", href: "/resources" },
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
    gradient: "from-brand-magenta to-brand-blue",
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
    gradient: "from-brand-cyan to-brand-blue",
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
    gradient: "from-brand-pink to-orange-500",
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

  // Web
  { slug: "web/full-stack", title: "Full-Stack Web Development", description: "Next.js, React, Node — production from day one.", detailed_description: "End-to-end web apps with auth, billing, realtime and observability — built on Next.js, Postgres and edge infrastructure.", category: "web", icon_name: "Server", display_order: 6 },
  { slug: "web/saas", title: "SaaS Platform Engineering", description: "Multi-tenant dashboards, billing, analytics.", detailed_description: "Multi-tenant SaaS with Stripe billing, RBAC, audit logs and admin tooling — engineered for scale from MVP to IPO.", category: "web", icon_name: "Layers", display_order: 7 },
  { slug: "web/auth", title: "Auth & Identity", description: "SSO, SAML, MFA, role-based access.", detailed_description: "Enterprise-grade auth: SSO, SAML, OIDC, MFA and granular RBAC — compliant with SOC2 and GDPR.", category: "web", icon_name: "Shield", display_order: 8 },
  { slug: "web/python-backend", title: "Python Backend & APIs", description: "FastAPI, Django, async workers, data pipelines.", detailed_description: "High-throughput Python backends with async workers, queues and observability — perfect for AI and data-heavy apps.", category: "web", icon_name: "Cloud", display_order: 9 },
  { slug: "web/wordpress", title: "WordPress Development", description: "Custom themes, plugins, headless WP, maintenance.", detailed_description: "WordPress development services: custom themes, plugin development, headless WordPress with Next.js, performance optimization, security hardening and ongoing maintenance for business sites across the UK, Pakistan and USA.", category: "web", icon_name: "Layout", display_order: 10 },
  { slug: "web/ecommerce", title: "E-commerce Development", description: "Shopify, WooCommerce, headless commerce, marketplaces.", detailed_description: "E-commerce development services for Shopify, WooCommerce, headless commerce (Medusa, Saleor) and custom marketplaces — with conversion-optimized UX, payment integrations, inventory sync and SEO-ready architecture for brands in the UK, Pakistan, USA and Dubai.", category: "web", icon_name: "ShoppingCart", display_order: 11 },
  { slug: "web/custom-software", title: "Custom Software Development", description: "Dashboards, CRMs, booking, inventory, SaaS, portals, APIs.", detailed_description: "Custom software development for business dashboards, CRM systems, booking platforms, inventory systems, repair shop management, business portals, API integrations, SaaS products and reporting systems — engineered on modern stacks with multi-region delivery.", category: "web", icon_name: "Code2", display_order: 12 },
  { slug: "web/maintenance", title: "Website Maintenance", description: "Security, updates, backups, monitoring, performance.", detailed_description: "Website maintenance plans covering security patches, dependency upgrades, daily backups, uptime monitoring, performance audits, content updates and emergency fixes — for WordPress, Next.js, Shopify and custom platforms.", category: "web", icon_name: "Wrench", display_order: 13 },
  { slug: "web/redesign", title: "Website Redesign", description: "Modernize, rebrand and replatform without losing SEO.", detailed_description: "Website redesign services that modernize your UI/UX, improve Core Web Vitals, preserve SEO equity (URLs, redirects, schema) and align with your current brand — for WordPress, Next.js, Shopify and custom sites across the UK, Pakistan, USA and Dubai.", category: "web", icon_name: "RefreshCw", display_order: 14 },
  { slug: "web/domain-hosting", title: "Domain & Hosting", description: "Domain registration, managed hosting, SSL, CDN, DNS.", detailed_description: "Domain registration, managed cloud hosting (Vercel, Cloudflare, AWS), SSL certificates, CDN configuration, DNS management, email hosting and 24/7 uptime monitoring — bundled with every ClickTake build or as a standalone service.", category: "web", icon_name: "Globe", display_order: 15 },

  // Marketing
  { slug: "digital-marketing/paid-advertising", title: "PPC / Paid Ads", description: "Google, Meta, TikTok & LinkedIn ads that scale.", detailed_description: "Full-funnel paid media with creative testing, attribution and ROAS optimization across every major ad platform.", category: "marketing", icon_name: "Megaphone", display_order: 16 },
  { slug: "digital-marketing/content-strategy", title: "Content Strategy & SEO", description: "Editorial that ranks and converts.", detailed_description: "Data-driven content engines — topical authority, programmatic SEO, and editorial calendars that compound traffic.", category: "marketing", icon_name: "PenTool", display_order: 17 },
  { slug: "digital-marketing/cro", title: "Conversion Rate Optimization", description: "Experimentation programmes that lift revenue.", detailed_description: "A/B testing programmes with statistical rigor, funnel analysis and CRO playbooks that compound conversion over time.", category: "marketing", icon_name: "TrendingUp", display_order: 18 },
  { slug: "seo", title: "SEO Services", description: "Technical, on-page, off-page and local SEO.", detailed_description: "End-to-end SEO services: technical audits, on-page optimization, off-page link building, local SEO, Google Business Profile optimization and monthly reporting for businesses across Birmingham, Multan, Austin and Dubai. Book a free SEO audit today.", category: "marketing", icon_name: "Search", display_order: 19 },
  { slug: "digital-marketing/social-media", title: "Social Media Marketing", description: "Strategy, content, community, paid social — full funnel.", detailed_description: "Social media marketing services across Facebook, Instagram, TikTok, LinkedIn, YouTube and X — strategy, content production, community management, paid social campaigns and monthly performance reporting for brands in the UK, Pakistan, USA and Dubai.", category: "marketing", icon_name: "Share2", display_order: 20 },

  // Creative
  { slug: "creative/graphic-design", title: "Graphic Design", description: "Identity systems, guidelines, marketing assets.", detailed_description: "Graphic design services: brand identities, marketing collateral, social media graphics, ad creative, presentation design and print assets — delivered as a living design system your team can extend.", category: "creative", icon_name: "Palette", display_order: 21 },
  { slug: "creative/web-design", title: "Web Design", description: "UX research, wireframes, UI systems, prototypes.", detailed_description: "Web design services: UX research, wireframes, high-fidelity UI design, design systems, interactive prototypes and handoff to engineering — built on Figma, optimized for conversion and accessibility (WCAG 2.2 AA).", category: "creative", icon_name: "PenTool", display_order: 22 },
  { slug: "creative/video-production", title: "Video Editing", description: "Ads, explainers, social cuts, motion graphics.", detailed_description: "Video editing services for ads, explainers, social cuts, YouTube long-form, motion graphics and short-form vertical video — delivered in every aspect ratio your channels need.", category: "creative", icon_name: "Video", display_order: 23 },

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
    color: "from-brand-cyan to-brand-blue",
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
    color: "from-brand-blue to-sky-600",
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
    color: "from-brand-cyan to-teal-500",
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
    color: "from-brand-cyan to-brand-blue",
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
    color: "from-brand-cyan to-brand-blue",
  },
  {
    label: "Pakistan · Multan HQ",
    addr: "Office #12, B.C.G Chowk, Paracha Street, Multan 60600",
    phone: "+92 306 9753003",
    hours: "Mon-Sat: 09:30 AM - 09:00 PM PKT",
    color: "from-brand-magenta to-brand-blue",
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
    glow: "from-brand-cyan to-brand-blue",
  },
  {
    icon: "Mail",
    label: "Email Address",
    value: "Info@clicktaketech.com",
    href: "mailto:Info@clicktaketech.com",
    glow: "from-brand-magenta to-brand-magenta",
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
    excerpt: "Rank in Birmingham's local pack with this step-by-step local SEO checklist for UK SMEs.",
    category: "SEO",
    readTime: "8 min read",
    slug: "birmingham-seo-guide",
  },
  {
    title: "Headless Shopify vs. Medusa: 2026 Comparison",
    excerpt: "Architecture, cost, and time-to-market compared — with a recommendation matrix by use case.",
    category: "Engineering",
    readTime: "15 min read",
    slug: "headless-shopify-vs-medusa",
  },
  {
    title: "Pakistan Tech Talent: A Hiring Guide for Global Founders",
    excerpt: "Salary benchmarks, time zones, and quality bar — what to expect when hiring engineers in Pakistan.",
    category: "Hiring",
    readTime: "10 min read",
    slug: "pakistan-tech-talent-guide",
  },
  {
    title: "Dubai Market Entry: Digital Playbook",
    excerpt: "From domain choice to local payment gateways — everything you need to launch digitally in the UAE.",
    category: "Market Entry",
    readTime: "11 min read",
    slug: "dubai-market-entry",
  },
  {
    title: "Austin SaaS Growth Channels That Work in 2026",
    excerpt: "The paid, organic, and community channels producing pipeline for Austin-based SaaS startups.",
    category: "Growth",
    readTime: "9 min read",
    slug: "austin-saas-growth-channels",
  },
];

// ─── ABOUT (matches original About.tsx data) ──
export const ABOUT_STATS = [
  { val: "120+", label: "Projects Shipped", icon: "Code2", color: "from-brand-cyan to-brand-blue" },
  { val: "80+", label: "Happy Clients", icon: "Users", color: "from-brand-magenta to-brand-magenta" },
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
    color: "from-brand-magenta to-brand-magenta",
    glowRaw: "color-mix(in oklab, var(--brand-magenta) 20%, transparent)",
  },
  {
    icon: "Globe",
    title: "Global Delivery",
    desc: "Teams in the UK, Pakistan, USA and Dubai — coordinated across time zones for 18-hour coverage.",
    color: "from-brand-cyan to-brand-blue",
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
  body: string; // markdown-ish plain text body
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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "seo-audit-checklist-2026",
    title: "The Complete SEO Audit Checklist for 2026",
    excerpt: "A 47-point technical, on-page and off-page SEO audit checklist that we use for every ClickTake client across the UK, Pakistan, USA and Dubai.",
    category: "SEO",
    author: "ClickTake Growth Team",
    publishedAt: "2026-01-15",
    readTime: "12 min read",
    tags: ["seo", "audit", "technical-seo", "local-seo"],
    body: "A complete SEO audit covers three pillars: technical, on-page and off-page. This article walks through the 47-point checklist our team uses for every ClickTake engagement — covering Core Web Vitals, schema markup, internal linking, content gaps, backlink profile and local SEO signals. We share the exact tools (Ahrefs, SEMrush, Search Console, GA4), the exact thresholds we look for, and the exact prioritization framework we use to ship fixes in the right order.",
  },
  {
    slug: "nextjs-16-app-router-best-practices",
    title: "Next.js 16 App Router Best Practices for Production",
    excerpt: "Server components, server actions, edge runtime, streaming — the patterns we use to ship Next.js apps that score 90+ on PageSpeed.",
    category: "Web Dev",
    author: "ClickTake Engineering",
    publishedAt: "2026-01-22",
    readTime: "15 min read",
    tags: ["nextjs", "react", "performance", "app-router"],
    body: "Next.js 16 App Router introduces server components, server actions, edge runtime and streaming — all of which can dramatically improve performance if used correctly, or break your build if used carelessly. This article shares the production patterns we use at ClickTake: when to use server vs client components, how to structure server actions, how to choose between edge and node runtime, and how to wire streaming + Suspense for sub-1s LCP.",
  },
  {
    slug: "ai-automation-playbook-for-sme",
    title: "The AI Automation Playbook for SMEs",
    excerpt: "Where AI creates real ROI for small and medium businesses — and where it doesn't. A practical framework with 12 automations you can ship in 30 days.",
    category: "AI Automation",
    author: "ClickTake AI Team",
    publishedAt: "2026-02-05",
    readTime: "10 min read",
    tags: ["ai", "automation", "llm", "rag"],
    body: "AI automation is everywhere — but most SMEs do not know where to start, and most agencies oversell what AI can do. This playbook shares the 12 AI automations we have shipped for SME clients across the UK, Pakistan, USA and Dubai — covering lead capture, customer support, sales workflows, reporting, email/SMS and business process orchestration. For each, we share the use case, the architecture, the cost and the expected ROI.",
  },
  {
    slug: "local-seo-birmingham-guide",
    title: "Local SEO Birmingham: A Complete Guide for UK SMEs",
    excerpt: "Rank in Birmingham's local pack with this step-by-step local SEO guide — GBP, citations, reviews, NAP consistency and content.",
    category: "SEO",
    author: "ClickTake Growth Team",
    publishedAt: "2026-02-18",
    readTime: "8 min read",
    tags: ["local-seo", "birmingham", "uk", "gbp"],
    body: "Birmingham is the UK's second-largest city and one of the most competitive local SEO markets outside London. This guide walks through everything you need to rank in the Birmingham local pack: Google Business Profile optimization, citation building across UK directories, review acquisition strategies, NAP consistency, local content production and local link building.",
  },
  {
    slug: "shopify-vs-medusa-2026",
    title: "Shopify vs Medusa vs Saleor: 2026 Headless Commerce Comparison",
    excerpt: "Architecture, cost, time-to-market and scalability compared — with a recommendation matrix by use case for DTC brands.",
    category: "E-commerce",
    author: "ClickTake Engineering",
    publishedAt: "2026-03-01",
    readTime: "15 min read",
    tags: ["ecommerce", "shopify", "medusa", "saleor", "headless"],
    body: "Headless commerce is no longer a niche architecture — it is the default for DTC brands scaling past 7 figures. But which platform? Shopify Plus with Hydrogen, Medusa.js or Saleor? This article compares all three across architecture, cost, time-to-market, scalability, multi-currency, multi-language and developer experience — with a clear recommendation matrix by use case.",
  },
  {
    slug: "startup-launch-checklist",
    title: "The 90-Day Startup Launch Checklist",
    excerpt: "Everything you need to launch a new brand online in 90 days — domain, hosting, website, branding, GBP, business email, SEO and marketing.",
    category: "Business Startup",
    author: "ClickTake Team",
    publishedAt: "2026-03-12",
    readTime: "10 min read",
    tags: ["startup", "launch", "checklist", "starter-kit"],
    body: "Launching a new brand online is overwhelming — there are 47 things to do and most founders forget half of them. This is the exact 90-day launch checklist we use for our Business Startup Kit clients — covering domain registration, hosting setup, website build, branding, Google Business Profile, business email, foundational SEO, analytics, and a 30-day marketing starter plan. Each item has an owner, a timeline and a definition of done.",
  },
  {
    slug: "social-media-content-that-converts",
    title: "Social Media Content That Actually Converts",
    excerpt: "Stop posting for likes. The content framework we use to turn social followers into paying customers across Facebook, Instagram, TikTok and LinkedIn.",
    category: "Digital Marketing",
    author: "ClickTake Growth Team",
    publishedAt: "2026-03-25",
    readTime: "9 min read",
    tags: ["social-media", "content", "conversion", "tiktok"],
    body: "Most social media content is optimized for likes — which is the wrong metric. This article shares the content framework we use at ClickTake: the 4 content types (educational, aspirational, proof, offer), the posting cadence by platform, the hook formats that work in 2026, and the measurement framework that ties social content to pipeline.",
  },
  {
    slug: "wcag-2-2-aa-accessibility-guide",
    title: "WCAG 2.2 AA Accessibility: A Practical Implementation Guide",
    excerpt: "The 23 WCAG 2.2 AA success criteria that matter for most websites — with code examples and the testing tools we use.",
    category: "Web Dev",
    author: "ClickTake Engineering",
    publishedAt: "2026-04-08",
    readTime: "12 min read",
    tags: ["accessibility", "wcag", "a11y", "compliance"],
    body: "WCAG 2.2 AA is the accessibility standard we ship on every ClickTake build — and with the EU Accessibility Act taking effect in 2025, it is now a legal requirement for many businesses. This guide walks through the 23 success criteria that matter for most websites, with code examples (focus management, ARIA, semantic HTML, color contrast) and the testing tools we use (axe, Lighthouse, NVDA, VoiceOver).",
  },
  {
    slug: "ai-chatbot-for-lead-qualification",
    title: "How to Build an AI Chatbot That Actually Qualifies Leads",
    excerpt: "The architecture, evals and guardrails we use to ship AI chatbots that capture qualified leads — not hallucinate on customer-facing surfaces.",
    category: "AI Automation",
    author: "ClickTake AI Team",
    publishedAt: "2026-04-22",
    readTime: "11 min read",
    tags: ["ai", "chatbot", "lead-qualification", "rag"],
    body: "Most AI chatbots are demos — they look great in a vendor pitch and fall apart the moment a real customer asks a real question. This article shares the production architecture we use at ClickTake for lead-qualifying chatbots: RAG over your domain docs, guardrails for PII and toxicity, eval harnesses with golden datasets, human-in-the-loop escalation, and CRM integration so qualified leads land in your sales pipeline.",
  },
  {
    slug: "ppc-creative-testing-framework",
    title: "The PPC Creative Testing Framework That 4x'd ROAS",
    excerpt: "The exact creative testing framework we used to scale a client from 3× to 47× ROAS — including the testing matrix, sample sizes and statistical thresholds.",
    category: "Digital Marketing",
    author: "ClickTake Growth Team",
    publishedAt: "2026-05-06",
    readTime: "10 min read",
    tags: ["ppc", "paid-ads", "creative-testing", "roas"],
    body: "Creative is the new targeting on Meta and TikTok — and most brands test creative wrong. This article shares the creative testing framework we used to scale Verve Studio from 3× to 47× ROAS: the 5-variant testing matrix, the sample size calculator, the statistical significance thresholds, the kill/scale criteria, and the weekly cadence we run with our creative team.",
  },
  {
    slug: "clicktake-2026-year-in-review",
    title: "ClickTake 2026: A Year in Review",
    excerpt: "What we shipped, what we learned and where we are headed in 2027 — across AI, web, marketing and creative.",
    category: "Company News",
    author: "ClickTake Leadership",
    publishedAt: "2026-05-20",
    readTime: "7 min read",
    tags: ["company", "year-in-review", "2026"],
    body: "2026 was a big year for ClickTake — we shipped 38 projects across 4 regions, launched our AI Automation practice, opened a Dubai office and grew the team from 18 to 42. This article shares what we shipped, what we learned, the metrics that mattered, and where we are headed in 2027.",
  },
  {
    slug: "case-study-lumen-commerce-3x-revenue",
    title: "Case Study: How We 3×'d Lumen Commerce's Online Revenue in 4 Months",
    excerpt: "A full headless Shopify rebuild with AI-driven product recommendations and a custom checkout flow — delivered in 16 weeks.",
    category: "Case Studies",
    author: "ClickTake Team",
    publishedAt: "2026-06-03",
    readTime: "13 min read",
    tags: ["case-study", "ecommerce", "shopify", "ai"],
    body: "Lumen Commerce came to ClickTake after a previous agency delivered a slow, monolithic Shopify theme that was capping their BFCM performance. We rebuilt the entire storefront headless on Next.js + Shopify, added an AI-driven product recommendation engine trained on their order history, and shipped a custom checkout flow. The result: +312% revenue, 3× faster LCP, and record-breaking BFCM sales. This case study walks through the architecture, the build timeline, the metrics and the lessons learned.",
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

