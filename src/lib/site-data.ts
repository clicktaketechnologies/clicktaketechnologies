// Central source of truth for ClickTake brand & contact info.
// All hardcoded fallback data from the original ClickTake Vite project
// is consolidated here so components can render without Supabase.

export const SITE = {
  name: "ClickTake Technologies",
  domain: "www.clicktaketech.com",
  url: "https://www.clicktaketech.com",
  email: "Info@clicktaketech.com",
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
      address: "Office #12, B.C.G Chowk, Paracha Street, Multan 60600",
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
    { name: "TikTok", href: "https://tiktok.com/@clicktaketech", icon: "tiktok" },
    { name: "Pinterest", href: "https://pinterest.com/clicktaketech", icon: "pinterest" },
    { name: "Threads", href: "https://threads.net/@clicktaketech", icon: "threads" },
    { name: "Tumblr", href: "https://clicktaketech.tumblr.com", icon: "tumblr" },
  ],
  brand: {
    primary: "#136DFF",
    accent: "#FF53A9",
  },
  tagline: "Connecting in a better way",
  founded: 2020,
} as const;

// ─── NAV LINKS (mix of in-page anchors and routed pages, matching original) ──
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Work", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  { label: "Process", href: "/#process" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
export const SERVICES: ServiceItem[] = [
  // AI
  { slug: "ai/llm", title: "Custom LLM Solutions", description: "Fine-tuned GPT & Llama models for your domain.", detailed_description: "Production-grade LLM apps with fine-tuning, RAG, and evaluation harnesses tuned to your domain.", category: "ai", icon_name: "Brain", display_order: 1 },
  { slug: "ai/chatbots", title: "AI Chatbots & Assistants", description: "Conversational agents that resolve tickets and qualify leads.", detailed_description: "Multi-channel AI chatbots for support, sales and internal knowledge — built on RAG and fine-tuned models.", category: "ai", icon_name: "Bot", display_order: 2 },
  { slug: "ai/prompt-engineering", title: "Prompt Engineering", description: "Reliable, evaluated prompt pipelines for production.", detailed_description: "Structured prompt systems with evals, fallbacks and observability — no more 'it works on Tuesday' prompts.", category: "ai", icon_name: "Wand2", display_order: 3 },
  { slug: "ai/cv-nlp", title: "Computer Vision & NLP", description: "OCR, defect detection, classification and beyond.", detailed_description: "Vision pipelines for manufacturing, retail and healthcare — from dataset curation to edge deployment.", category: "ai", icon_name: "Eye", display_order: 4 },

  // Web
  { slug: "web/full-stack", title: "Full-Stack Web Development", description: "Next.js, React, Node — production from day one.", detailed_description: "End-to-end web apps with auth, billing, realtime and observability — built on Next.js, Postgres and edge infrastructure.", category: "web", icon_name: "Server", display_order: 5 },
  { slug: "web/saas", title: "SaaS Platform Engineering", description: "Multi-tenant dashboards, billing, analytics.", detailed_description: "Multi-tenant SaaS with Stripe billing, RBAC, audit logs and admin tooling — engineered for scale from MVP to IPO.", category: "web", icon_name: "Layers", display_order: 6 },
  { slug: "web/auth", title: "Auth & Identity", description: "SSO, SAML, MFA, role-based access.", detailed_description: "Enterprise-grade auth: SSO, SAML, OIDC, MFA and granular RBAC — compliant with SOC2 and GDPR.", category: "web", icon_name: "Shield", display_order: 7 },
  { slug: "web/python-backend", title: "Python Backend & APIs", description: "FastAPI, Django, async workers, data pipelines.", detailed_description: "High-throughput Python backends with async workers, queues and observability — perfect for AI and data-heavy apps.", category: "web", icon_name: "Cloud", display_order: 8 },

  // Marketing
  { slug: "digital-marketing/paid-advertising", title: "Paid Advertising (PPC)", description: "Google, Meta, TikTok & LinkedIn ads that scale.", detailed_description: "Full-funnel paid media with creative testing, attribution and ROAS optimization across every major ad platform.", category: "marketing", icon_name: "Megaphone", display_order: 9 },
  { slug: "digital-marketing/content-strategy", title: "Content Strategy & SEO", description: "Editorial that ranks and converts.", detailed_description: "Data-driven content engines — topical authority, programmatic SEO, and editorial calendars that compound traffic.", category: "marketing", icon_name: "PenTool", display_order: 10 },
  { slug: "digital-marketing/cro", title: "Conversion Rate Optimization", description: "Experimentation programmes that lift revenue.", detailed_description: "A/B testing programmes with statistical rigor, funnel analysis and CRO playbooks that compound conversion over time.", category: "marketing", icon_name: "TrendingUp", display_order: 11 },
  { slug: "seo", title: "Search Engine Optimization", description: "Technical, on-page and off-page SEO.", detailed_description: "End-to-end SEO: technical audits, content optimization, link building and local SEO for Birmingham, Lahore, Austin and Dubai.", category: "marketing", icon_name: "Search", display_order: 12 },

  // Creative
  { slug: "creative/graphic-design", title: "Brand & Graphic Design", description: "Identity systems, guidelines, assets.", detailed_description: "Brand identities that travel — logos, typography, color systems and guidelines built for digital-first brands.", category: "creative", icon_name: "Palette", display_order: 13 },
  { slug: "creative/video-production", title: "Video Production", description: "Ads, explainers, social cuts, motion.", detailed_description: "End-to-end video: script, storyboard, shoot, edit, motion graphics — delivered for every channel and aspect ratio.", category: "creative", icon_name: "Video", display_order: 14 },

  // Flagship
  {
    slug: "starter-kit",
    title: "Business Development Starter Kit",
    description: "Brand, website, AI assistant and 90-day growth plan — all in one package.",
    detailed_description:
      "Our flagship offering for ambitious founders. We deliver a complete brand identity, a production-ready Next.js website, an AI assistant for lead qualification, and a 90-day growth marketing plan — typically live in 90 days.",
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
      "From custom LLM applications and RAG pipelines to computer vision and predictive models, our AI practice helps businesses across the UK, Pakistan, USA and Dubai turn raw data into autonomous, revenue-driving products.",
    services: [
      { title: "Custom LLM Solutions", desc: "Fine-tuned GPT & Llama models for your domain." },
      { title: "AI Chatbots & Assistants", desc: "Conversational agents that resolve tickets and qualify leads." },
      { title: "Prompt Engineering", desc: "Reliable, evaluated prompt pipelines for production." },
      { title: "Computer Vision & NLP", desc: "OCR, defect detection, classification and beyond." },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    group: "Web",
    tagline: "High-performance websites & web apps engineered to convert.",
    description:
      "We design and build marketing sites, SaaS dashboards, e-commerce storefronts and headless CMS platforms using Next.js, React and modern edge infrastructure — optimised for SEO in Birmingham, Pakistan, the US and Dubai markets.",
    services: [
      { title: "Full-Stack Web Development", desc: "Next.js, React, Node — production from day one." },
      { title: "SaaS Platform Engineering", desc: "Multi-tenant dashboards, billing, analytics." },
      { title: "Auth & Identity", desc: "SSO, SAML, MFA, role-based access." },
      { title: "Python Backend & APIs", desc: "FastAPI, Django, async workers, data pipelines." },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    group: "Growth",
    tagline: "Compounding growth across search, social and paid channels.",
    description:
      "Our growth team runs data-driven SEO, paid media, content and CRO programmes tailored to local intent in the UK (Birmingham), Pakistan, USA and Dubai — so every pound, rupee and dirham works harder.",
    services: [
      { title: "Paid Advertising (PPC)", desc: "Google, Meta, TikTok & LinkedIn ads that scale." },
      { title: "Content Strategy & SEO", desc: "Editorial that ranks and converts." },
      { title: "Conversion Rate Optimization", desc: "Experimentation programmes that lift revenue." },
      { title: "Search Engine Optimization", desc: "Technical, on-page and off-page SEO." },
    ],
  },
  {
    id: "creative",
    title: "Creative Services",
    group: "Creative",
    tagline: "Brand systems and product design that earn attention.",
    description:
      "Our designers craft brand identities, product UIs and motion systems that feel premium in every market we serve — from Birmingham startups to Dubai enterprises.",
    services: [
      { title: "Brand & Graphic Design", desc: "Identity systems, guidelines, assets." },
      { title: "Video Production", desc: "Ads, explainers, social cuts, motion." },
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
