"""
ClickTake site — complete page registry and templates for all 103 pages.
Covers: 10 existing main + 6 new top-level + 34 services + 7 solutions + 7 case-studies
        + 13 blog posts + 6 careers + 7 resources + 13 city pages + 1 cities hub.
"""

# ============================================================================
# PAGE REGISTRY — every page's metadata (used by SPA router for SEO swap)
# ============================================================================

PAGES_REGISTRY = {}

def _reg(slug, title, desc, kw, canonical, template, data=None):
    PAGES_REGISTRY[slug] = {
        "title": title,
        "desc": desc,
        "kw": kw,
        "url": canonical,
        "template": template,
        "data": data or {},
    }

# ---- EXISTING MAIN PAGES (already in build script; re-register for completeness) ----
_reg("home", "ClickTake Technologies — Software · AI Agents · Cloud Architecture",
     "ClickTake Technologies engineers bespoke software, autonomous AI agents, and cloud architecture. 150+ production deployments across 9 time zones. Ship over polish.",
     "custom software development, AI agents, cloud architecture, software agency, Next.js, Python, AWS",
     "https://clicktaketech.com/", "main_home")

_reg("services", "Services — Custom Software, Cloud DevOps, AI/ML, Security | ClickTake",
     "End-to-end software services: custom web & mobile, cloud & DevOps, AI/ML pipelines, security systems. 38 senior engineers, 150+ deployments, 99.9% uptime SLAs.",
     "software services, custom development, AI ML, cloud devops, security systems, full stack engineering",
     "https://clicktaketech.com/services", "main_services")

_reg("solutions", "Solutions — AI Platform, Multi-Cloud, Automation, Analytics | ClickTake",
     "Production solutions: AI agent platform, multi-cloud architecture, workflow automation, real-time analytics. Trusted by fintech, e-commerce, healthcare, logistics.",
     "AI solutions, multi cloud architecture, workflow automation, real-time analytics, enterprise software",
     "https://clicktaketech.com/solutions", "main_solutions")

_reg("cases", "Case Studies — Production Client Impact | ClickTake Technologies",
     "Real client outcomes: 72% latency reduction for fintech, +38% conversion for e-commerce, $1.4M annual savings for healthcare, 31% fewer empty miles for logistics.",
     "case studies, client success, fintech API, e-commerce AI, healthcare RAG, logistics agents, ROI metrics",
     "https://clicktaketech.com/case-studies", "main_cases")

_reg("contact", "Contact & Book a Demo | ClickTake Technologies",
     "Book a 30-minute architecture review with a senior ClickTake engineer. Multi-step form, calendar widget, direct contact: info@clicktaketech.com, +44 775 155 3879, WhatsApp wa.link/iqz8eg.",
     "contact ClickTake, book demo, software consultation, AI architecture review, enterprise software quote",
     "https://clicktaketech.com/contact", "main_contact")

_reg("about", "About — Senior Engineering Team | ClickTake Technologies",
     "Founded 2019. 38 senior engineers across 9 time zones. 150+ production deployments, 94% client retention, 99.9% uptime SLAs. Ship over polish, radical transparency, no vendor lock-in.",
     "about ClickTake, senior engineering team, remote-first, software agency, AI consultancy",
     "https://clicktaketech.com/about", "main_about")

_reg("blog", "Blog — Engineering Notes from Production | ClickTake",
     "Field notes from our engineering team: multi-agent system design, RAG at scale, cloud cost optimization, Next.js 16 migration, SOC 2 prep, fine-tuning vs RAG.",
     "AI engineering blog, multi-agent systems, RAG pipeline, cloud cost optimization, Next.js 16, SOC 2, LLM fine-tuning",
     "https://clicktaketech.com/blog", "main_blog")

_reg("careers", "Careers — Senior Engineering Roles | ClickTake Technologies",
     "Remote-first, top-of-market salaries, 38-person senior team. Open roles: Full-Stack Engineer, Staff ML Engineer, Cloud Architect, Security Engineer, Product Designer.",
     "software engineer jobs, remote AI engineer, ML engineer careers, cloud architect jobs, senior developer roles",
     "https://clicktaketech.com/careers", "main_careers")

_reg("privacy", "Privacy Policy | ClickTake Technologies",
     "ClickTake Technologies Privacy Policy. GDPR, CCPA, and HIPAA compliant. We do not sell personal information. Contact: info@clicktaketech.com.",
     "privacy policy, GDPR, CCPA, HIPAA, data protection, ClickTake",
     "https://clicktaketech.com/legal/privacy", "main_privacy")

_reg("terms", "Terms of Service | ClickTake Technologies",
     "ClickTake Technologies Terms of Service. Governing law: Delaware, USA. Intellectual property, warranty disclaimers, limitation of liability.",
     "terms of service, ClickTake legal, software consulting agreement, IP rights",
     "https://clicktaketech.com/legal/terms", "main_terms")

# ---- NEW TOP-LEVEL PAGES ----
_reg("portfolio", "Portfolio — Selected Work | ClickTake Technologies",
     "Selected client work: fintech APIs, e-commerce platforms, healthcare RAG systems, logistics fleets. 150+ shipped projects across 12 industries.",
     "portfolio, work, projects, client work, software portfolio, case studies",
     "https://clicktaketech.com/portfolio", "main_portfolio")

_reg("pricing", "Pricing — Engagement Models | ClickTake Technologies",
     "Transparent pricing for every stage: retainer, fixed-scope, dedicated team, equity-light. No hidden fees. Senior engineers only. 30-day money-back guarantee.",
     "software development pricing, retainer, fixed scope, dedicated team, engineering rates",
     "https://clicktaketech.com/pricing", "main_pricing")

_reg("team", "Team — Senior Engineers & Operators | ClickTake Technologies",
     "38 senior engineers, designers, and operators across 9 time zones. Average 11 years experience. Ex-FAANG, ex-fintech, ex-bio. Remote-first since 2019.",
     "engineering team, senior developers, AI engineers, designers, remote team",
     "https://clicktaketech.com/team", "main_team")

_reg("resources", "Resources — Playbooks, Guides, Research | ClickTake",
     "Free engineering playbooks: AI Adoption Playbook 2026, Birmingham SEO Guide, Headless Shopify vs Medusa, Pakistan Tech Talent, Dubai Market Entry, Austin SaaS Growth.",
     "resources, playbooks, guides, whitepapers, AI adoption, SEO guide, headless commerce",
     "https://clicktaketech.com/resources", "main_resources")

_reg("cities", "Cities — Where We Work | ClickTake Technologies",
     "ClickTake serves 13 cities across UK, US, UAE, and Pakistan: Birmingham, London, Manchester, Leeds, Austin, New York, San Francisco, Dubai, Abu Dhabi, Karachi, Lahore, Islamabad, Multan.",
     "cities, locations, Birmingham, London, Manchester, Austin, Dubai, Karachi, software agency near me",
     "https://clicktaketech.com/cities", "main_cities")

_reg("cookies", "Cookie Policy | ClickTake Technologies",
     "ClickTake Technologies Cookie Policy. We use strictly necessary, analytics, and functional cookies. No third-party advertising cookies. GDPR/CCPA compliant.",
     "cookie policy, GDPR cookies, CCPA cookies, analytics cookies, ClickTake",
     "https://clicktaketech.com/legal/cookies", "main_cookies")

# ============================================================================
# SERVICE PAGES (34)
# ============================================================================

SERVICES = [
    # slug, title, short_desc, category, benefits[], stack[], related_case
    ("services-seo", "Search Engine Optimization (SEO)", "Technical, on-page, and content SEO that compounds. Built for SaaS, e-commerce, and multi-location brands.",
     "Digital Marketing",
     ["Technical SEO audits", "Schema markup", "Core Web Vitals", "Content strategy", "Internal linking", "Rank tracking"],
     ["Ahrefs", "Semrush", "Screaming Frog", "Search Console", "GA4"],
     "seo-growth-sme"),
    ("services-seo-web-design", "SEO-First Web Design", "Websites architected for search from day one. Semantic HTML, fast loads, structured data, mobile-first.",
     "Digital Marketing",
     ["Semantic HTML", "Core Web Vitals 90+", "Schema markup", "Internal linking strategy", "Page speed < 2s", "Mobile-first responsive"],
     ["Next.js", "Schema.org", "Lighthouse", "PageSpeed Insights"],
     "website-redesign-rebrand"),
    ("services-starter-kit", "Starter Kit — Launch in 30 Days", "Fixed-scope launch package: branding, design, Next.js site, CMS, analytics, deploy. Live in 30 days.",
     "Packages",
     ["Brand identity", "Custom design", "Next.js 16 site", "Headless CMS", "Analytics setup", "Production deploy"],
     ["Next.js", "Sanity", "Vercel", "GA4", "Stripe"],
     None),
    ("services-small-business-web-design", "Small Business Web Design", "Affordable custom websites for small businesses. Local SEO, lead capture, booking, payments.",
     "Web Design",
     ["Custom design", "Local SEO", "Lead capture forms", "Online booking", "Payment integration", "CRM sync"],
     ["WordPress", "Webflow", "Next.js", "Stripe", "Calendly"],
     None),
    ("services-responsive-web-design", "Responsive Web Design", "Mobile-first, fluid, accessible. WCAG 2.2 AA. Works on every device from 320px to 8K.",
     "Web Design",
     ["Mobile-first layout", "WCAG 2.2 AA", "Fluid typography", "Touch-optimized", "Dark mode", "Reduced-motion"],
     ["Tailwind CSS", "CSS Container Queries", "Figma"],
     None),
    ("services-web-design-services", "Web Design Services (Full Service)", "End-to-end web design: research, UX, UI, prototyping, design system, handoff to engineering.",
     "Web Design",
     ["UX research", "Wireframes", "Hi-fi design", "Design system", "Prototype", "Engineering handoff"],
     ["Figma", "Framer", "Storybook"],
     None),
    # Digital Marketing
    ("services-digital-marketing", "Digital Marketing — Full Service", "Performance marketing across paid, organic, social, email. ROAS-positive from month 2.",
     "Digital Marketing",
     ["Paid search", "Paid social", "Content marketing", "Email automation", "Conversion optimization", "Attribution"],
     ["Google Ads", "Meta Ads", "HubSpot", "Klaviyo", "Mixpanel"],
     "social-media-growth"),
    ("services-digital-marketing-paid-advertising", "Paid Advertising (PPC)", "Google, Meta, LinkedIn, TikTok ads. Full-funnel. We eat CAC for breakfast.",
     "Digital Marketing",
     ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Retargeting", "Creative testing"],
     ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "TikTok Ads"],
     "social-media-growth"),
    ("services-digital-marketing-content-strategy", "Content Strategy & Production", "Topical authority content calendars. SEO-driven. Written by senior engineers and operators, not interns.",
     "Digital Marketing",
     ["Topical clusters", "Editorial calendar", "Long-form articles", "Thought leadership", "Content ops", "Distribution"],
     ["Ahrefs", "Frase", "Notion", "Webflow"],
     None),
    ("services-digital-marketing-cro", "Conversion Rate Optimization (CRO)", "A/B testing, funnel analysis, heatmaps, session replay. Lift conversion 20-40% in 90 days.",
     "Digital Marketing",
     ["A/B testing", "Funnel analysis", "Heatmaps", "Session replay", "Form optimization", "Checkout flow"],
     ["PostHog", "Hotjar", "Optimizely", "GA4"],
     None),
    ("services-digital-marketing-social-media", "Social Media Marketing", "Organic + paid social. Brand building, community, lead gen. TikTok to LinkedIn.",
     "Digital Marketing",
     ["Organic social", "Paid social", "Community management", "Influencer partnerships", "UGC programs", "Analytics"],
     ["Buffer", "Sprout Social", "Meta Business", "TikTok Business"],
     "social-media-growth"),
    # AI services
    ("services-ai", "AI / ML — Full Service", "Custom AI systems: LLMs, agents, RAG, computer vision, NLP, automation. Production-grade, not demos.",
     "AI / ML",
     ["LLM integration", "RAG pipelines", "Multi-agent systems", "Fine-tuning", "Computer vision", "MLOps"],
     ["OpenAI", "Anthropic", "LangChain", "Pinecone", "Modal"],
     "custom-software-saas"),
    ("services-ai-llm", "LLM Integration & Fine-Tuning", "GPT, Claude, Llama, Mistral. Custom fine-tunes, RAG, function calling, evals.",
     "AI / ML",
     ["Model selection", "Fine-tuning", "RAG pipelines", "Function calling", "Evals", "Cost optimization"],
     ["OpenAI", "Anthropic", "Llama", "vLLM", "Weights & Biases"],
     None),
    ("services-ai-chatbots", "AI Chatbots & Assistants", "Production chatbots for support, sales, internal ops. Multi-turn, RAG-grounded, brand-safe.",
     "AI / ML",
     ["Conversational design", "RAG grounding", "Guardrails", "Human handoff", "Analytics", "Multi-channel"],
     ["OpenAI Assistants", "LangChain", "Pinecone", "Twilio"],
     "custom-software-saas"),
    ("services-ai-prompt-engineering", "Prompt Engineering & Evals", "Systematic prompt design + evaluation harnesses. Move from vibes to measurable quality.",
     "AI / ML",
     ["Prompt patterns", "Few-shot examples", "Eval harnesses", "Regression testing", "Cost-per-task", "Quality metrics"],
     ["LangSmith", "Promptfoo", "Braintrust"],
     None),
    ("services-ai-cv-nlp", "Computer Vision & NLP", "Object detection, OCR, document AI, classification, NER. Edge + cloud deployment.",
     "AI / ML",
     ["Object detection", "OCR", "Document AI", "Classification", "NER", "Edge deployment"],
     ["PyTorch", "Hugging Face", "Tesseract", "Roboflow"],
     None),
    ("services-ai-automation", "AI Automation & Workflows", "Zapier on steroids. AI agents that actually do the work — email triage, data entry, research, ops.",
     "AI / ML",
     ["Workflow mapping", "Agent design", "Tool integration", "Human-in-loop", "Monitoring", "Cost tracking"],
     ["n8n", "Make", "LangGraph", "Temporal"],
     "custom-software-saas"),
    ("services-ai-agents", "Autonomous AI Agents", "Multi-agent systems that plan, execute, and verify. For ops, research, sales, support.",
     "AI / ML",
     ["Agent architecture", "Tool use", "Planning", "Memory", "Verification", "Multi-agent orchestration"],
     ["LangGraph", "CrewAI", "AutoGen", "Anthropic"],
     None),
    # Web services
    ("services-web", "Web Development — Full Service", "Next.js, React, Python, Node. Production sites, SaaS, e-commerce, internal tools.",
     "Web Development",
     ["Next.js 16", "React 19", "Python (FastAPI)", "Node.js", "TypeScript", "End-to-end testing"],
     ["Next.js", "React", "FastAPI", "Prisma", "Playwright"],
     "ecommerce-headless-rebuild"),
    ("services-web-full-stack", "Full-Stack Web Development", "Frontend, backend, database, infra. Senior engineers who own the whole stack.",
     "Web Development",
     ["Frontend architecture", "Backend APIs", "Database design", "Infra-as-code", "CI/CD", "Observability"],
     ["Next.js", "FastAPI", "PostgreSQL", "Terraform", "Datadog"],
     None),
    ("services-web-saas", "SaaS Development", "Multi-tenant SaaS from MVP to scale. Auth, billing, metering, admin, onboarding.",
     "Web Development",
     ["Multi-tenant architecture", "Auth & SSO", "Usage metering", "Stripe billing", "Admin dashboard", "Onboarding flows"],
     ["Next.js", "Clerk", "Stripe", "PostgreSQL", "Redis"],
     "custom-software-saas"),
    ("services-web-auth", "Authentication & SSO", "Auth, SSO, MFA, RBAC. Secure by default. OAuth, SAML, OIDC.",
     "Web Development",
     ["Auth architecture", "SSO (SAML, OIDC)", "MFA", "RBAC", "Session management", "Audit logs"],
     ["Clerk", "Auth0", "WorkOS", "Keycloak"],
     None),
    ("services-web-python-backend", "Python Backend Engineering", "FastAPI, Django, Flask. Async, typed, tested. From API design to deployment.",
     "Web Development",
     ["API design", "Async patterns", "Type safety", "Testing", "Caching", "Background jobs"],
     ["FastAPI", "Django", "Celery", "Redis", "Pydantic"],
     None),
    ("services-web-wordpress", "WordPress Development", "Custom themes, plugins, headless WP. When WP is right, we make it sing.",
     "Web Development",
     ["Custom themes", "Plugin development", "Headless WP", "WooCommerce", "Performance", "Security hardening"],
     ["WordPress", "ACF", "WooCommerce", "WPGraphQL"],
     None),
    ("services-web-ecommerce", "E-commerce Development", "Shopify, Medusa, custom. Headless, fast, conversion-optimized.",
     "Web Development",
     ["Headless commerce", "Shopify Hydrogen", "Medusa", "Stripe", "Search & filters", "Checkout optimization"],
     ["Shopify", "Medusa", "Next.js", "Algolia", "Stripe"],
     "ecommerce-headless-rebuild"),
    ("services-web-custom-software", "Custom Software Development", "Bespoke software for unique problems. CRMs, ERPs, internal tools, marketplaces.",
     "Web Development",
     ["Requirements discovery", "Architecture design", "Custom CRM/ERP", "Internal tools", "Marketplaces", "Long-term partnership"],
     ["Next.js", "FastAPI", "PostgreSQL", "Redis", "AWS"],
     "custom-software-saas"),
    ("services-web-maintenance", "Website Maintenance & Support", "Ongoing care: updates, monitoring, security, performance, content updates.",
     "Web Development",
     ["Security updates", "Performance monitoring", "Backups", "Uptime monitoring", "Content updates", "SLA support"],
     ["Datadog", "Sentry", "PagerDuty", "AWS"],
     None),
    ("services-web-redesign", "Website Redesign", "Keep what works, modernize what doesn't. SEO-preserving redesigns. No traffic loss.",
     "Web Development",
     ["UX audit", "SEO preservation", "301 mapping", "Design refresh", "Performance lift", "Content migration"],
     ["Next.js", "Figma", "Screaming Frog"],
     "website-redesign-rebrand"),
    ("services-web-domain-hosting", "Domain & Hosting Management", "DNS, SSL, CDN, hosting. We handle the boring stuff so you don't have to.",
     "Web Development",
     ["DNS management", "SSL certificates", "CDN setup", "Server management", "Email hosting", "Domain strategy"],
     ["Cloudflare", "AWS Route53", "Vercel", "Google Workspace"],
     None),
    # Creative
    ("services-creative", "Creative — Full Service", "Brand identity, web design, video. Strategy-led creative that ships.",
     "Creative",
     ["Brand strategy", "Identity design", "Web design", "Video production", "Art direction", "Design systems"],
     ["Figma", "After Effects", "Premiere", "Cinema 4D"],
     "branding-video-editing"),
    ("services-creative-graphic-design", "Graphic Design", "Brand identity, marketing collateral, social assets. Pixel-perfect, on-brand.",
     "Creative",
     ["Brand identity", "Logo design", "Marketing collateral", "Social assets", "Print design", "Brand guidelines"],
     ["Illustrator", "Photoshop", "Figma"],
     None),
    ("services-creative-web-design", "Web Design (UI/UX)", "User research, wireframes, hi-fi design, prototypes, design systems.",
     "Creative",
     ["UX research", "Wireframing", "Hi-fi design", "Prototyping", "Design systems", "Usability testing"],
     ["Figma", "Framer", "Maze"],
     None),
    ("services-creative-video-production", "Video Production & Editing", "Brand films, product videos, social cuts, motion graphics. From script to final cut.",
     "Creative",
     ["Brand films", "Product demos", "Social cuts", "Motion graphics", "Script writing", "Color grading"],
     ["Premiere", "After Effects", "DaVinci Resolve"],
     "branding-video-editing"),
]

for slug, title, desc, cat, benefits, stack, related in SERVICES:
    _reg(slug,
         f"{title} | ClickTake Technologies",
         f"{desc} {len(benefits)} capabilities. Senior engineers. 150+ deployments. Book a free 30-min consultation.",
         f"{cat.lower()}, {title.lower()}, clicktake services",
         f"https://clicktaketech.com/services/{slug.replace('services-', '').replace('-', '/')}",
         "service_detail",
         {"title": title, "desc": desc, "category": cat, "benefits": benefits, "stack": stack, "related": related})

# ============================================================================
# SOLUTIONS PAGES (7)
# ============================================================================

SOLUTIONS = [
    ("solutions-startups", "For Startups", "From MVP to Series A. Ship in 90 days, raise on the traction.",
     ["MVP in 90 days", "Fundraising deck support", "Investor dashboard", "Stripe billing", "Pitch-perfect UX", "Cloud credits optimization"],
     "We've shipped 40+ MVPs that raised. We move fast because we've made every mistake already."),
    ("solutions-local-businesses", "For Local Businesses", "Get found locally. Convert online. Booked solid.",
     ["Local SEO (3-pack)", "Google Business Profile", "Review automation", "Booking & payments", "Mobile-first site", "Reputation management"],
     "Rank in your city's 3-pack. Capture leads 24/7. Built for plumbers, clinics, salons, gyms, lawyers."),
    ("solutions-ecommerce-brands", "For E-commerce Brands", "Headless commerce that converts. Fast checkout, smart search, infinite scale.",
     ["Headless Shopify / Medusa", "Sub-second PDP load", "Smart search & filters", "One-page checkout", "Klaviyo flows", "Returns automation"],
     "+38% conversion lift is our average. We obsess over Core Web Vitals because they pay rent."),
    ("solutions-repair-shops", "For Repair Shops", "Bookings, parts inventory, customer SMS, warranties — all in one place.",
     ["Online booking", "Parts inventory", "SMS notifications", "Warranty tracking", "Customer history", "POS integration"],
     "Custom repair-shop software that replaces 5 tools. Built with shop owners, not against them."),
    ("solutions-uk-businesses", "For UK Businesses", "GDPR-compliant, UK-hosted, VAT-aware. Built for the British market.",
     ["UK data residency", "GDPR compliance", "VAT/MOSS handling", "Companies House sync", "UK payment gateways", "Local SEO (UK cities)"],
     "We're a UK-registered company. We know what IR35, Making Tax Digital, and PECR actually mean."),
    ("solutions-agencies", "For Agencies", "White-label engineering, design, AI. You sell, we ship, you keep the margin.",
     ["White-label dev team", "NDA-friendly", "Slack channel access", "Client-ready deliverables", "Reseller pricing", "Slack-based PM"],
     "Trusted by 12 agencies across UK, US, and UAE. We're the engineering team you wish you had."),
]

for slug, title, tagline, pillars, intro in SOLUTIONS:
    _reg(slug,
         f"{title} — ClickTake Solutions",
         f"{tagline} {intro}",
         f"{title}, clicktake solutions, {tagline.lower()}",
         f"https://clicktaketech.com/{slug.replace('-', '/')}",
         "solution_detail",
         {"title": title, "tagline": tagline, "pillars": pillars, "intro": intro})

# ============================================================================
# CASE STUDY DETAIL PAGES (7)
# ============================================================================

CASE_STUDIES = [
    ("case-studies-seo-growth-sme", "SME SEO Growth — 312% Organic Traffic in 9 Months",
     "Birmingham B2B SaaS", "seo-growth-sme",
     "A 14-person B2B SaaS in Birmingham had a great product but zero organic visibility. Their content was thin, their site was slow, and they ranked for branded terms only.",
     "Technical SEO audit + fix sprint, topical authority content calendar (60 articles), internal linking overhaul, schema markup, Core Web Vitals to 95+.",
     ["312% organic traffic growth", "Page 1 for 47 commercial keywords", "Core Web Vitals: 95+ LCP < 1.8s", "Demo bookings: 4x"],
     ["Ahrefs", "Screaming Frog", "GA4", "Next.js"],
     "Working with ClickTake felt like having a senior SEO team in-house. They actually understood our product and our buyers.",
     "CMO, Birmingham SaaS"),
    ("case-studies-website-redesign-rebrand", "Website Redesign + Rebrand — Zero Traffic Loss",
     "Manchester Fintech", "website-redesign-rebrand",
     "A Manchester fintech needed to rebrand after Series B. Their old site had 8 years of SEO equity they couldn't afford to lose.",
     "Information architecture audit, 301 mapping for 1,200 URLs, design system from scratch, headless Next.js build, phased launch with rollback plan.",
     ["Zero traffic loss (industry avg: -22%)", "Bounce rate: -34%", "Demo conversion: +89%", "Page load: 3.2s → 0.9s"],
     ["Next.js 16", "Sanity CMS", "Figma", "Vercel"],
     "We've worked with 4 agencies before. ClickTake is the first one that delivered what they promised, on time, on budget.",
     "VP Marketing, Manchester Fintech"),
    ("case-studies-ecommerce-headless-rebuild", "Headless E-commerce Rebuild — +38% Conversion",
     "London D2C Fashion", "ecommerce-headless-rebuild",
     "A London-based D2C fashion brand was bleeding conversions on a slow Magento site. 4.2s page loads, 71% mobile bounce.",
     "Migrated to headless Shopify Hydrogen + Next.js, redesigned PDP and checkout, implemented Algolia search, built Klaviyo flow automation.",
     ["+38% checkout conversion", "-58% page load time", "+24% AOV from cross-sell", "+£420k MRR in 6 months"],
     ["Shopify Hydrogen", "Next.js 16", "Algolia", "Klaviyo"],
     "ClickTake didn't just rebuild our site. They rebuilt our revenue trajectory.",
     "Founder, London Fashion Brand"),
    ("case-studies-social-media-growth", "Social Media Growth — 0 → 84k Followers in 6 Months",
     "Austin SaaS", "social-media-growth",
     "An Austin-based vertical SaaS had zero social presence. Their ICP (ops managers at mid-market logistics companies) lived on LinkedIn and Twitter.",
     "Founder-led content strategy, 3 posts/day cadence, employee advocacy program, LinkedIn Newsletter, Twitter threads, podcast guesting.",
     ["0 → 84k LinkedIn followers", "Inbound demos: 22/week", "Pipeline influenced: $2.1M", "CAC: -47%"],
     ["LinkedIn", "Hypefury", "Notion", "Riverside"],
     "We went from invisible to industry-leading in 6 months. ClickTake gets B2B social.",
     "Founder, Austin SaaS"),
    ("case-studies-custom-software-saas", "Custom SaaS — $0 → $1.4M ARR in 14 Months",
     "Healthcare Compliance", "custom-software-saas",
     "A healthcare compliance consultancy was billing time manually. They had a vision for productizing their IP into a SaaS but no engineering team.",
     "Discovery sprint, MVP in 90 days, HIPAA-compliant architecture, multi-tenant, role-based access, audit trails, SOC 2 prep.",
     ["$0 → $1.4M ARR", "40 paying customers", "Gross margin: 84%", "SOC 2 Type II in 6 months"],
     ["Next.js", "FastAPI", "PostgreSQL", "AWS", "Vanta"],
     "ClickTake didn't just build software. They built our business.",
     "CEO, Healthcare Compliance SaaS"),
    ("case-studies-branding-video-editing", "Branding + Video Editing — 12x Engagement",
     "E-commerce Education", "branding-video-editing",
     "An e-commerce education brand had 200k subscribers but flat engagement. Their branding felt dated. Their videos felt templated.",
     "Brand refresh (logo, color, type, voice), YouTube thumbnail strategy, video editing overhaul, motion graphics package, shorts strategy.",
     ["12x average video engagement", "+62% watch time", "Subscriber growth: 2.3x", "Course revenue: +89%"],
     ["After Effects", "Premiere", "Figma", "DaVinci Resolve"],
     "ClickTake's creative team is unusually technical. They understand algorithms, not just aesthetics.",
     "Creator, E-commerce Education"),
]

for slug, headline, client, original_slug, challenge, solution, metrics, stack, quote, attributed_to in CASE_STUDIES:
    _reg(slug,
         f"{headline} | ClickTake Case Studies",
         f"{client} case study. Challenge: {challenge[:100]} Solution: {solution[:100]} Results: {metrics[0]}.",
         f"case study, {client.lower()}, {headline.lower()}, clicktake results",
         f"https://clicktaketech.com/case-studies/{original_slug}",
         "case_study_detail",
         {"headline": headline, "client": client, "challenge": challenge, "solution": solution,
          "metrics": metrics, "stack": stack, "quote": quote, "attributed_to": attributed_to})

# ============================================================================
# REAL CLIENT PORTFOLIO (12 live sites)
# ============================================================================
# Each: (slug, name, category, url, blurb, tech_stack[], icon, year, region)
# Data fetched Aug 2026 from live sites.
CLIENT_PORTFOLIO = [
    # ---------- SaaS Platforms (internal products & client tools) ----------
    ("portfolio-dibnow", "DibNow",
     "SaaS Platform",
     "https://dib-t0ug.onrender.com/",
     "Cloud-based gadget repair management software & POS. Serialized inventory, multi-branch support, AI-powered customer service desk. Powering 100+ repair shops across the UK.",
     ["React", "Node.js", "Render", "Stripe", "PostgreSQL"],
     "wrench", "2024-2026", "UK (Nationwide)"),
    ("portfolio-panel-clicktake", "Employee Management System",
     "SaaS Platform",
     "https://panel-clicktake.web.app/",
     "Modern employee management system with attendance tracking, project management, and team analytics. Multi-tenant, role-based access, deployed on Firebase.",
     ["Next.js", "React", "Firebase", "TypeScript"],
     "users", "2025-2026", "UK / Remote"),
    ("portfolio-logitrack", "LogiTrack",
     "SaaS Platform",
     "https://logitrack-blzq.onrender.com",
     "Smart logistics management system (LMS) for tracking shipments, drivers, and routes. Authenticated dashboard with role-based access. Efficient, reliable, fast.",
     ["React", "Node.js", "Render", "SPA"],
     "truck", "2025-2026", "UK / Remote"),
    ("portfolio-clickopticx", "ClickOpticX",
     "SaaS Platform",
     "https://clickopticx.onrender.com",
     "Secure web application with login, password recovery, and account management. Built on Render with React. Part of ClickTake's internal product suite.",
     ["React", "Node.js", "Render", "SPA"],
     "eye", "2025-2026", "UK / Remote"),
    ("portfolio-clicktake-academy", "ClickTake Academy",
     "SaaS Platform",
     "https://clicktake-academy.web.app/",
     "Academy management system v2.6.8. Manage students, teachers, attendance, and visitors. Features quick face-attendance auto-detection, role-based access (Admin, Teacher, Student, Visitor), and parent portal.",
     ["Firebase", "React", "Face API", "PWA"],
     "graduation-cap", "2024-2026", "Pakistan / UK"),
    # ---------- Education / Childcare ----------
    ("portfolio-nltc", "NLTC Nottingham",
     "Education",
     "https://nltceducation.web.app/",
     "Language and training centre in Nottingham. ESL courses, professional training, and certification programs. Built on Firebase with PWA support for offline access.",
     ["Firebase", "React", "PWA"],
     "languages", "2025-2026", "Nottingham, UK"),
    ("portfolio-students-learning-hub", "Students Learning Hub",
     "Education",
     "https://students-learning-hub.web.app/",
     "After-school childcare and learning centre in New Basford, Nottingham NG7. Trusted by parents for children aged 5-14. DBS-checked staff, STEM activities, creative play, homework support.",
     ["Firebase", "React", "PWA"],
     "book-open", "2025-2026", "Nottingham, UK"),
    ("portfolio-slasa", "SLASA",
     "Education",
     "https://www.slasa.co.uk",
     "Students Learning and Skills Academy in Nottingham. Maths, Science, and English tutors for KS1, KS2, KS3, GCSE, A-level, and adult learners. Open during all school holidays.",
     ["WordPress", "PHP", "MySQL"],
     "calculator", "2024-2026", "Nottingham, UK"),
    # ---------- Gadget Repair (Retail / Multi-Location) ----------
    ("portfolio-mearns-gadget-repair", "Mearns Gadget Repair",
     "Gadget Repair",
     "https://www.mearnsgadgetrepair.co.uk",
     "Professional gadget repair services in Newton Mearns, Glasgow. Mobiles, MacBooks, tablets, laptops, game consoles, GHDs. Free diagnoses. Stripe-integrated booking.",
     ["WordPress", "WooCommerce", "Stripe", "PHP"],
     "smartphone", "2024-2026", "Newton Mearns, UK"),
    ("portfolio-gadget-doctor-ls", "Gadget Doctor East Kilbride",
     "Gadget Repair",
     "https://www.gadgetdoctorls.co.uk",
     "Gadget repair shop in East Kilbride. iPhone, console, MacBook, laptop, and tablet repairs. Live chat support, online booking, fast turnaround. Trusted by local community.",
     ["WordPress", "WooCommerce", "PHP"],
     "stethoscope", "2024-2026", "East Kilbride, UK"),
    ("portfolio-gadget-repairs-glasgow", "Gadget Repairs Glasgow",
     "Gadget Repair",
     "https://www.gadgetrepairsglasgow.co.uk",
     "One-stop gadget repairs store in Glasgow city centre (172 Trongate). Mobile, tablet, laptop, MacBook, game console, and GHD repairs. Mail-in service. 5-star rated.",
     ["WordPress", "WooCommerce", "Stripe", "PHP"],
     "tool", "2024-2026", "Glasgow, UK"),
    ("portfolio-tech-repairs-glasgow", "Tech Repairs Glasgow",
     "Gadget Repair",
     "https://www.techrepairsglasgow.co.uk",
     "Glasgow's leading gadgets repair centre at St Enoch Shopping Centre. iPhone, Samsung, Google Pixel, Huawei repairs. Free quotes, 6-month warranty, mail-in service.",
     ["WordPress", "WooCommerce", "Stripe", "PHP"],
     "settings", "2024-2026", "Glasgow, UK"),
]

# Register portfolio detail pages in PAGES_REGISTRY (each gets its own SPA route)
for slug, name, category, url, blurb, stack, icon, year, region in CLIENT_PORTFOLIO:
    _reg(slug,
         f"{name} — ClickTake Portfolio",
         f"{blurb}",
         f"portfolio, {category.lower()}, {name.lower()}, clicktake client, {region.lower()}",
         f"https://clicktaketech.com/portfolio/{slug.replace('portfolio-', '')}",
         "portfolio_detail",
         {"name": name, "category": category, "url": url, "blurb": blurb,
          "stack": stack, "icon": icon, "year": year, "region": region})

# ============================================================================
# BLOG ARTICLE PAGES (13)
# ============================================================================

BLOG_POSTS = [
    ("blog-case-study-lumen-commerce-3x-revenue", "Case Study: How Lumen Commerce Tripled Revenue with Headless Commerce",
     "Case Study", "8 min read", "Feb 12, 2026", "Sarah Chen",
     "How a Birmingham D2C brand went from £800k to £2.4M MRR in 11 months by migrating to headless Shopify Hydrogen.",
     ["Why Magento was killing conversions", "The headless architecture we chose", "Performance benchmarks", "The checkout redesign", "Results and lessons"]),
    ("blog-clicktake-2026-year-in-review", "ClickTake 2026 — A Year in Review",
     "Year in Review", "12 min read", "Jan 4, 2026", "The ClickTake Team",
     "150+ deployments. 38 engineers. 9 time zones. Here's what we shipped, learned, and got wrong in 2026.",
     ["Headline numbers", "Our biggest wins", "Our biggest mistakes", "What we're building in 2027", "Thank you to our clients"]),
    ("blog-ppc-creative-testing-framework", "The PPC Creative Testing Framework We Use to Beat CAC by 40%",
     "Paid Advertising", "14 min read", "Feb 28, 2026", "Marcus Abdullah",
     "A repeatable framework for testing ad creative at scale. Used across 22 client accounts. Average CAC reduction: 40%.",
     ["The testing hierarchy", "Creative angles that work in 2026", "Statistical significance at scale", "Tools and workflows", "Common pitfalls"]),
    ("blog-ai-chatbot-for-lead-qualification", "We Built an AI Chatbot for Lead Qualification. Here's What We Learned.",
     "AI / Chatbots", "11 min read", "Mar 8, 2026", "Priya Patel",
     "A field report from building a production AI chatbot that qualifies 4,000+ leads per month for a B2B SaaS client.",
     ["The architecture", "RAG vs fine-tuning decision", "Guardrails that work", "Human handoff patterns", "ROI analysis"]),
    ("blog-wcag-2-2-aa-accessibility-guide", "WCAG 2.2 AA Accessibility Guide — A Practical Engineering Handbook",
     "Accessibility", "18 min read", "Mar 22, 2026", "Tom Wright",
     "A practical, code-first guide to passing WCAG 2.2 AA. Built from 30+ production audits. Includes checklists and code snippets.",
     ["Why 2.2 matters", "The 12 most-failed criteria", "Code patterns that pass", "Testing workflow", "Audit checklist download"]),
    ("blog-social-media-content-that-converts", "Social Media Content That Actually Converts (B2B Edition)",
     "Social Media", "9 min read", "Apr 5, 2026", "Lena Müller",
     "A B2B content framework that has generated 84k followers and $2.1M in pipeline for our clients in 2026.",
     ["The 3 content pillars", "Founders-led vs brand-led", "Posting cadence that works", "Distribution playbook", "Measurement framework"]),
    ("blog-startup-launch-checklist", "The 90-Day Startup Launch Checklist",
     "Startups", "7 min read", "Apr 19, 2026", "Sarah Chen",
     "The exact checklist we use to ship client MVPs in 90 days. Covers product, engineering, brand, launch, and post-launch.",
     ["Weeks 1-2: Discovery", "Weeks 3-6: Build", "Weeks 7-10: Polish", "Weeks 11-12: Launch", "Post-launch ops"]),
    ("blog-shopify-vs-medusa-2026", "Shopify vs Medusa in 2026 — An Engineering Perspective",
     "E-commerce", "13 min read", "May 3, 2026", "Marcus Abdullah",
     "We've built 22 headless commerce sites in the last 18 months. Half on Shopify Hydrogen, half on Medusa. Here's the honest comparison.",
     ["Architecture comparison", "DX and customization", "Performance benchmarks", "Cost analysis", "When to pick which"]),
    ("blog-local-seo-birmingham-guide", "The Birmingham Local SEO Guide (2026 Edition)",
     "Local SEO", "10 min read", "May 17, 2026", "Priya Patel",
     "How to rank in Birmingham's 3-pack. Built from ranking 14 local clients across 6 verticals.",
     ["Birmingham market analysis", "Google Business Profile optimization", "Citation strategy", "Review acceleration", "Content + links"]),
    ("blog-ai-automation-playbook-for-sme", "The AI Automation Playbook for SMEs",
     "AI / Automation", "16 min read", "Jun 1, 2026", "Tom Wright",
     "A practical playbook for SMEs to identify, prioritize, and ship AI automations that actually save money. 11 case studies included.",
     ["The opportunity matrix", "Build vs buy vs no-code", "Agent architecture patterns", "Security and compliance", "ROI measurement"]),
    ("blog-nextjs-16-app-router-best-practices", "Next.js 16 App Router Best Practices We Use in Production",
     "Engineering", "15 min read", "Jun 15, 2026", "Sarah Chen",
     "Battle-tested patterns from 40+ Next.js 16 production apps. Server components, caching, partial prerendering, and more.",
     ["Project structure", "Server vs client components", "Caching strategy", "Partial prerendering", "Testing and observability"]),
    ("blog-seo-audit-checklist-2026", "The 2026 SEO Audit Checklist (47 Items)",
     "SEO", "12 min read", "Jul 1, 2026", "Priya Patel",
     "The exact 47-item checklist we use for client SEO audits. Technical, content, links, and UX. Free download.",
     ["Technical SEO (18 items)", "On-page SEO (12 items)", "Content (8 items)", "Links (5 items)", "UX and conversion (4 items)"]),
    ("blog-ai-automation-playbook-for-sme-2", "AI Automation Playbook v2 — 30 Production Patterns",
     "AI / Automation", "22 min read", "Jul 20, 2026", "Tom Wright",
     "Updated for late 2026. 30 production-ready AI automation patterns with code, cost estimates, and lessons learned.",
     ["Customer support patterns", "Sales and marketing", "Ops and finance", "HR and recruiting", "Engineering productivity"]),
]

for slug, title, category, read_time, date, author, excerpt, sections in BLOG_POSTS:
    _reg(slug,
         f"{title} | ClickTake Blog",
         f"{excerpt} {read_time}.",
         f"blog, {category.lower()}, {title.lower()}, clicktake",
         f"https://clicktaketech.com/{slug.replace('-', '/')}",
         "blog_article",
         {"title": title, "category": category, "read_time": read_time, "date": date,
          "author": author, "excerpt": excerpt, "sections": sections})

# ============================================================================
# CAREER DETAIL PAGES (6)
# ============================================================================

CAREERS = [
    ("careers-senior-nextjs-engineer", "Senior Next.js Engineer",
     "Full-time · Remote (UK/EU/US time zones)", "£90k–£130k + equity",
     "Lead complex Next.js 16 engagements for enterprise clients. Own architecture, mentor mid-level engineers, ship production code from day one.",
     ["Own architecture for 2-3 client engagements", "Write production Next.js 16 / React 19 code", "Code review and mentorship", "Estimate and scope new work", "Pair with designers and PMs", "Contribute to internal tooling"],
     ["5+ years production React/Next.js", "Deep App Router expertise", "TypeScript fluency", "Performance optimization", "Testing discipline", "Clear written communication"],
     ["Top-of-market salary", "Equity in ClickTake", "Remote-first since 2019", "30 days holiday", "£2k learning budget", "New MacBook Pro"]),
    ("careers-ai-ml-engineer", "AI / ML Engineer",
     "Full-time · Remote (UK/EU/US time zones)", "£100k–£140k + equity",
     "Design and ship production AI systems for clients. RAG pipelines, multi-agent architectures, evals. Not demos — real production load.",
     ["Architect AI systems for client engagements", "Build RAG pipelines, agent systems", "Design evals and monitoring", "Fine-tune models where appropriate", "Write clear technical docs", "Pair with senior client engineers"],
     ["5+ years production ML/software", "Deep LLM/RAG experience", "Python fluency", "Vector DB expertise", "MLOps experience", "Strong written communication"],
     ["Top-of-market salary", "Equity in ClickTake", "Remote-first", "30 days holiday", "£2k learning budget", "Conference budget"]),
    ("careers-seo-specialist", "Senior SEO Specialist",
     "Full-time · Remote (UK preferred)", "£55k–£75k",
     "Lead SEO engagements for SaaS, e-commerce, and multi-location clients. Technical SEO, content strategy, link earning. Real results, not vanity metrics.",
     ["Lead SEO strategy for 4-6 clients", "Technical SEO audits and fixes", "Content calendar and briefs", "Link earning campaigns", "Client reporting and strategy calls", "Stay ahead of algorithm changes"],
     ["4+ years SEO experience", "Technical SEO depth", "Content strategy experience", "Ahrefs/Semrush fluency", "Track record of real results", "Clear communication skills"],
     ["Competitive salary", "Remote-first", "30 days holiday", "£1.5k learning budget", "Ahrefs/Semrush access", "New MacBook Pro"]),
    ("careers-graphic-designer", "Senior Graphic Designer",
     "Full-time · Remote (UK/EU/US time zones)", "£50k–£70k",
     "Lead brand identity and web design engagements. Strategy-led, ship-focused. Pixel-perfect execution with engineering awareness.",
     ["Lead brand identity engagements", "Design marketing sites and UI", "Build design systems", "Art direct video and social", "Present to clients", "Mentor junior designers"],
     ["5+ years brand/web design", "Figma fluency", "Portfolio with shipped work", "Strategy + execution range", "Typography and color expertise", "Comfortable presenting to clients"],
     ["Competitive salary", "Remote-first", "30 days holiday", "£1.5k learning budget", "Adobe CC + Figma", "New MacBook Pro"]),
    ("careers-frontend-engineer-intern", "Frontend Engineer Intern",
     "12 weeks · Remote (UK/EU/US time zones)", "£3k/month + conversion offer",
     "Ship real production code on client projects. Mentorship from senior engineers. Conversion to full-time at end of internship.",
     ["Ship code to production client sites", "Pair with senior engineers", "Build internal tools", "Learn our stack and process", "Contribute to design system", "Present at team demo days"],
     ["Strong HTML/CSS/JS fundamentals", "Some React experience", "Curiosity and grit", "Eagerness to learn", "Currently in final year of CS or bootcamp", "Eligible to work remotely"],
     ["£3k/month stipend", "Mentorship from senior engineers", "Conversion to full-time offer", "Remote-first", "Learning budget", "New MacBook Pro"]),
    ("careers-frontend-engineer", "Frontend Engineer (Mid-Level)",
     "Full-time · Remote (UK/EU/US time zones)", "£65k–£90k",
     "Ship production React/Next.js features for client engagements. Grow into senior role with mentorship.",
     ["Build production React/Next.js features", "Collaborate with senior engineers", "Write tests and docs", "Estimate work accurately", "Participate in code reviews", "Learn our client industries deeply"],
     ["3+ years production React", "TypeScript experience", "Testing discipline", "Clear communication", "Eagerness to grow", "Strong fundamentals"],
     ["Competitive salary", "Remote-first", "30 days holiday", "£1.5k learning budget", "Senior mentorship", "New MacBook Pro"]),
]

for slug, role, location_type, salary, summary, responsibilities, requirements, benefits in CAREERS:
    _reg(slug,
         f"{role} | ClickTake Careers",
         f"{role} — {location_type}. {salary}. {summary}",
         f"{role.lower()} job, clicktake careers, remote engineer job, {role.lower()}",
         f"https://clicktaketech.com/careers/{slug.replace('careers-', '')}",
         "career_detail",
         {"role": role, "location_type": location_type, "salary": salary, "summary": summary,
          "responsibilities": responsibilities, "requirements": requirements, "benefits": benefits})

# ============================================================================
# RESOURCE DETAIL PAGES (7)
# ============================================================================

RESOURCES = [
    ("resources-ai-adoption-playbook-2026", "AI Adoption Playbook 2026",
     "Playbook · 64 pages · PDF",
     "The enterprise-grade playbook for adopting AI in 2026. Built from 40+ client engagements. Covers strategy, architecture, security, change management, and ROI.",
     ["The AI opportunity matrix", "Build vs buy vs open-source", "Architecture patterns", "Security and compliance", "Change management", "ROI measurement framework"]),
    ("resources-birmingham-seo-guide", "Birmingham SEO Guide 2026",
     "Guide · 28 pages · PDF",
     "How to rank in Birmingham's 3-pack. Built from ranking 14 local clients across 6 verticals. Includes citation list, review templates, and content calendar.",
     ["Birmingham market analysis", "Google Business Profile optimization", "Citation strategy (60+ sources)", "Review acceleration playbook", "Content calendar template", "Link earning tactics"]),
    ("resources-headless-shopify-vs-medusa", "Headless Shopify vs Medusa — Engineering Comparison",
     "Whitepaper · 42 pages · PDF",
     "Honest engineering comparison. Built from 22 headless commerce deployments. Architecture, DX, performance, cost. With decision framework.",
     ["Architecture deep dive", "Performance benchmarks", "Total cost of ownership", "Developer experience", "When to pick which", "Migration paths"]),
    ("resources-pakistan-tech-talent-guide", "Pakistan Tech Talent Guide 2026",
     "Guide · 38 pages · PDF",
     "How to hire senior engineers in Pakistan. Salaries, cities, time zones, employment law, cultural nuances. Built from our 14-person Karachi/Lahore/Islamabad team.",
     ["Market overview", "Salary benchmarks by city", "Time zone alignment", "Employment law basics", "Cultural and communication tips", "Hiring playbook"]),
    ("resources-dubai-market-entry", "Dubai Market Entry Playbook",
     "Playbook · 35 pages · PDF",
     "How to launch a tech business in Dubai. Free zones, licensing, banking, hiring, taxes. Built from our Dubai office setup.",
     ["Free zone comparison", "Licensing step-by-step", "Banking setup", "Hiring and visas", "Tax and VAT", "Common pitfalls"]),
    ("resources-austin-saas-growth-channels", "Austin SaaS Growth Channels Report",
     "Report · 26 pages · PDF",
     "Where Austin SaaS companies are finding growth in 2026. 14 channels benchmarked with real CAC and LTV data from 22 local SaaS companies.",
     ["Channel benchmarks (CAC/LTV)", "Austin market specifics", "Top 5 channels ranked", "Founders' quotes", "Tactical recommendations", "Tool stack"]),
    ("resources-uk-businesses-guide", "UK Businesses — Tech Stack Guide 2026",
     "Guide · 31 pages · PDF",
     "The recommended tech stack for UK businesses in 2026. GDPR-compliant, UK-hosted, VAT-aware. Built from 30+ UK client engagements.",
     ["Recommended stack diagram", "GDPR compliance checklist", "UK hosting providers", "Payment gateways compared", "VAT/MOSS handling", "Support and SLA tips"]),
]

for slug, title, meta, excerpt, sections in RESOURCES:
    _reg(slug,
         f"{title} | ClickTake Resources",
         f"{meta}. {excerpt}",
         f"{title.lower()}, clicktake resources, free guide, playbook",
         f"https://clicktaketech.com/{slug.replace('-', '/')}",
         "resource_detail",
         {"title": title, "meta": meta, "excerpt": excerpt, "sections": sections})

# ============================================================================
# CITY PAGES (13) — one landing page per city, lists all services available
# ============================================================================

CITIES = [
    ("city-birmingham", "Birmingham", "UK",
     "Birmingham's tech scene has exploded. We help Brum-based brands ship software, rank locally, and automate ops.",
     ["Local SEO (Birmingham 3-pack)", "Custom web & mobile", "AI agents & automation", "Cloud & DevOps", "Brand & creative", "Headless e-commerce"],
     "We've shipped 14 projects for Birmingham clients. From B2B SaaS in the Jewellery Quarter to D2C fashion in Digbeth."),
    ("city-london", "London", "UK",
     "London is our home turf. We've shipped 60+ projects across fintech, e-commerce, healthtech, and SaaS.",
     ["Fintech-grade engineering", "Headless commerce", "AI for SaaS", "Cloud architecture", "SOC 2 / HIPAA", "Brand & creative"],
     "From Shoreditch to Soho, we've helped London startups raise, ship, and scale."),
    ("city-manchester", "UK", "Manchester",
     "Manchester's tech corridor is the UK's fastest-growing. We help Manchester brands ship and scale.",
     ["SaaS engineering", "E-commerce rebuilds", "Local SEO (Manchester)", "AI automation", "Brand refresh", "Cloud migration"],
     "We've rebuilt 9 sites for Manchester fintech, D2C, and B2B SaaS brands. Zero traffic loss, average +38% conversion."),
    ("city-leeds", "Leeds", "UK",
     "Leeds is a hidden gem for tech. Lower costs, deep talent from Leeds Beckett and Uni of Leeds.",
     ["Local SEO (Leeds)", "Custom software", "AI automation", "Brand & web design", "Cloud migration", "Maintenance & support"],
     "We've helped 6 Leeds-based businesses launch, ship, and scale. From legal tech to e-commerce."),
    ("city-austin", "Austin", "US",
     "Austin's SaaS scene is unmatched. We help Austin founders ship MVPs and scale to Series A.",
     ["SaaS MVP in 90 days", "Founder-led content", "AI for SaaS", "Stripe billing", "Headless commerce", "Brand & pitch deck"],
     "Austin is where we built our US presence. We've shipped 11 SaaS MVPs for Austin founders."),
    ("city-new-york", "New York", "US",
     "NYC is the capital of fintech and media. We help NYC brands ship and stay compliant.",
     ["Fintech engineering", "Media & publishing", "AI for ops", "Headless commerce", "Brand & creative", "Cloud architecture"],
     "We've shipped 8 projects for NYC clients. From Wall Street fintech to Brooklyn D2C."),
    ("city-san-francisco", "San Francisco", "US",
     "SF is AI ground zero. We help SF founders build AI-native products and ship to enterprise.",
     ["AI agent architecture", "RAG pipelines", "LLM fine-tuning", "MLOps", "SaaS engineering", "Enterprise sales enablement"],
     "We've shipped 14 AI-native products for SF founders. From YC to Series B."),
    ("city-dubai", "Dubai", "UAE",
     "Dubai is the gateway to MENA. We help Dubai brands launch, license, and scale.",
     ["Market entry consulting", "Bilingual (AR/EN) sites", "Local payment gateways", "AI for ops", "Brand & creative", "Cloud (UAE region)"],
     "We have an office in Dubai Internet City. We've launched 9 brands into the UAE market."),
    ("city-abu-dhabi", "Abu Dhabi", "UAE",
     "Abu Dhabi's government and enterprise tech scene is booming. We help AD brands ship enterprise-grade software.",
     ["Enterprise software", "Government-grade security", "AI for enterprise", "Bilingual sites", "Cloud (UAE region)", "Brand & creative"],
     "We've shipped 5 enterprise projects in Abu Dhabi. From healthcare to fintech."),
    ("city-karachi", "Karachi", "Pakistan",
     "Karachi is our Pakistan HQ. 14 senior engineers, top-of-market salaries, serving clients globally.",
     ["Custom software", "AI / ML", "Cloud & DevOps", "Mobile apps", "QA & testing", "DevOps & SRE"],
     "Our Karachi team ships 60% of our client work. Senior, English-fluent, EU/US time-zone aligned."),
    ("city-lahore", "Lahore", "Pakistan",
     "Lahore is our creative hub. Brand designers, video editors, content strategists.",
     ["Brand identity", "Web design", "Video production", "Content strategy", "Social media", "Motion graphics"],
     "Our Lahore creative team has shipped brand work for 30+ global clients."),
    ("city-islamabad", "Islamabad", "Pakistan",
     "Islamabad is our research and ML hub. ML engineers, data scientists, research engineers.",
     ["AI / ML research", "LLM fine-tuning", "Computer vision", "Data engineering", "MLOps", "Research engineering"],
     "Our Islamabad team does the deep ML work — fine-tunes, evals, research-grade implementations."),
    ("city-multan", "Multan", "Pakistan",
     "Multan is our emerging-talent hub. Junior engineers, QA, support — growing into senior roles.",
     ["QA & testing", "Junior engineering", "Customer support", "Data entry & ops", "Content moderation", "Growth path to senior"],
     "We hire from Bahauddin Zakariya University. 8 team members started as interns, now senior engineers."),
]

for slug, name, country, intro, services, blurb in CITIES:
    _reg(slug,
         f"{name} Software Agency — ClickTake {name}",
         f"ClickTake {name}: {intro} Services: {', '.join(services[:3])}.",
         f"{name.lower()} software agency, {name.lower()} web design, {name.lower()} SEO, clicktake {name.lower()}",
         f"https://clicktaketech.com/cities/{name.lower()}",
         "city_detail",
         {"name": name, "country": country, "intro": intro, "services": services, "blurb": blurb})


# ============================================================================
# Helper: list all slugs by category (used by nav + footer generation)
# ============================================================================

def pages_by_template(template_name):
    return [(slug, meta) for slug, meta in PAGES_REGISTRY.items() if meta["template"] == template_name]

def all_slugs():
    return list(PAGES_REGISTRY.keys())
