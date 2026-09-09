import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/starter-kit — Business Startup Kit (ClickTake flagship bundle)
 *
 * Domain + managed hosting + production website (up to 6 pages) + complete
 * branding + Google Business Profile setup + business email + foundational
 * SEO setup + 30-day marketing starter plan — bundled for new founders,
 * local businesses and rebranders across Birmingham, Multan, Austin and Dubai.
 */
export const starterKitDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Flagship Bundle",
    title: "Business Startup Kit: Domain, Hosting, Website, Brand, Email, GBP, SEO & Marketing — One Bundle, One Timeline",
    subtitle:
      "We launch your business end-to-end in 6 weeks: domain registration, managed hosting, a production-ready Next.js website (up to 6 pages), complete branding, Google Business Profile, business email, foundational SEO and a 30-day marketing starter plan — bundled at ~40% savings versus separate vendors.",
    geoDefinition:
      "A Business Startup Kit is a bundled launch package that delivers the foundational digital infrastructure a new business needs to go online and start acquiring customers — domain registration, managed cloud hosting, a production website (typically up to 6 pages), complete brand identity, Google Business Profile setup, business email (Google Workspace or Microsoft 365), foundational on-page and technical SEO setup, and a 30-day marketing starter plan covering paid social and content. Unlike commissioning each component separately from a registrar, hosting provider, web agency, branding agency, SEO consultant and marketing agency, a starter kit ships the full stack under one engagement, one timeline and one accountable team. ClickTake Technologies delivers the Business Startup Kit to founders, local businesses and rebranders across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with a fixed 6-week timeline to launch and a 2-week marketing-starter follow-on, on a stack of Next.js, Cloudflare, Google Workspace, Google Business Profile, Yoast or RankMath, and structured paid-social plus content distribution.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Starter Kit Call", href: "/contact", variant: "orange" },
      { label: "Download the Starter Kit Spec Sheet", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "6 wks", label: "Time to launch" },
      { value: "~40%", label: "Savings vs. separate vendors" },
      { value: "8", label: "Components bundled" },
      { value: "120+", label: "Kits shipped" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Business Startup Kit", href: "/services/starter-kit" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Founders Lose 4–6 Months and $15–30K Coordinating Separate Vendors",
    intro: [
      "A new founder setting up their business infrastructure the traditional way juggles 5–8 vendors: a domain registrar (GoDaddy, Namecheap), a hosting provider (Bluehost, HostGator), a freelance web designer, a freelance brand designer, a Google Workspace reseller, an SEO consultant, a paid-social freelancer and a content writer. Each vendor has its own timeline, its own communication style, its own invoice and its own accountability gap — the gap between what the founder asked for and what the next vendor needs.",
      "The result is predictable: 4–6 months from idea to launch (vs. 6 weeks in a bundled kit), $15–30K total spend (vs. $8–14K in a bundle), and a launch where the website, brand, email, GBP and SEO were each delivered in isolation — missing the integration points that compound results once live.",
    ],
    painPoints: [
      {
        title: "Vendor coordination overhead eats the founder's calendar",
        description:
          "Coordinating 5–8 vendors consumes 12–18 hours/week of founder time — calls, briefs, reviews, invoice approvals, accountability chasing. Founders report this is the single largest hidden cost of going solo; the engagement time spent coordinating could have been spent selling.",
      },
      {
        title: "Integration gaps between vendors kill performance",
        description:
          "The web designer builds the site without consulting the SEO consultant — title tags, meta descriptions, schema and URL structure are wrong. The brand designer delivers a logo without the color tokens the web designer needs. The GBP setup happens without the website URL being finalised. Each gap is a 1–3 week fix after launch.",
      },
      {
        title: "Domain + hosting + email billed at retail markup",
        description:
          "GoDaddy domain renewals: $20/year (Cloudflare wholesale: $10.44). Bluehost hosting: $9.99/month introductory, $24.99/month renewal (Cloudflare Pages: $0–$20/month). Google Workspace via reseller: $8–$12/user/month (direct: $6–$9). Retail markup on bundled infrastructure averages $200–$600/year of unnecessary cost.",
      },
      {
        title: "Launch ships without a marketing starter",
        description:
          "Most founders launch the website and wait for customers. They wait — and wait. Without a 30-day paid-social + content distribution plan to seed the first traffic, the new website sits at 0–50 visitors/month for 6–9 months until organic SEO compounds. A marketing starter plan delivers the first 1,000–5,000 visitors in month one.",
      },
    ],
    paradigmShift: [
      "A business launch is not 8 separate projects — it is one project with 8 components, and the components only compound when they are designed together. The Business Startup Kit bundles the full stack under one team, one timeline and one accountable owner: the brand designer hands the color tokens to the web designer, the web designer hands the URL to the GBP setter-upper, the SEO consultant writes the title tags before the site ships, the marketing lead launches paid social the day the site goes live. The founder signs one contract, attends one weekly standup, and launches in 6 weeks at ~40% lower total cost than coordinating vendors separately.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is in the Business Startup Kit?",
    intro: [
      "The Business Startup Kit is a fixed-scope, fixed-timeline bundle of 8 components that together take a business from idea to live-and-marketing in 6 weeks. Each component is non-optional in the bundle — not because we are inflexible, but because removing one breaks the integration that makes the bundle compound. Understanding what each component delivers — and what it does not — is the difference between a kit that launches a business and a kit that launches a website.",
    ],
    subsections: [
      {
        heading: "Component 1–3 — Domain, hosting & business email",
        body: [
          "The infrastructure layer. Domain registration covers the .com (or .co.uk, .pk, .ae, .us, .io — chosen based on the business's primary market). We register via Cloudflare Registrar at wholesale pricing (~$10.44/year for .com) and transfer ownership to the founder on day one. Managed hosting is Cloudflare Pages + Workers for the Next.js site — $0/month for the first 100K requests/day, scaling to $20/month at significant traffic; this is 80–95% cheaper than traditional shared hosting (Bluehost $9.99/$24.99, HostGator $9.95/$19.95) and 10–50× faster (edge-cached in 310+ POPs).",
          "Business email is Google Workspace (Gmail for business) — the founder's name @ the domain, with 30GB storage, calendar, Drive, Meet and the full Google productivity suite. We configure SPF, DKIM and DMARC records so email lands in the inbox (not spam), set up the DNS on Cloudflare, and provision up to 3 mailboxes. Microsoft 365 is available as an alternative for clients already in the Microsoft ecosystem. Email deliverability is the foundation of every outbound sales motion — a misconfigured DNS record can land 60% of outbound mail in spam and the founder never knows.",
        ],
        jargon: [
          { term: "DNS (Domain Name System)", def: "The internet's phone book — maps your domain (yourbrand.com) to the server IP where your website lives, and to Google's mail servers for email. Misconfigured DNS is the #1 cause of 'my email goes to spam' and 'my website is down'." },
          { term: "SPF / DKIM / DMARC", def: "Three DNS records that authenticate your email as genuinely from your domain. Without all three, 40–60% of your outbound mail lands in spam — even to people who opted in. We configure all three on every Starter Kit." },
          { term: "Managed hosting", def: "Hosting where the provider handles server setup, security patching, SSL certificates, CDN configuration and uptime monitoring — versus 'self-managed' VPS or dedicated hosting where you do it. Cloudflare Pages is fully managed and free for the first 100K requests/day." },
        ],
      },
      {
        heading: "Component 4 — Production website (up to 6 pages)",
        body: [
          "The website is the conversion layer — where the founder's value proposition becomes a lead, a booking, a sale or a sign-up. We build on Next.js (React 19, App Router, edge runtime, ISR for content pages) deployed to Cloudflare Pages. The 6-page scope is structured around the standard new-business conversion flow: Home, About, Services or Products, Contact, plus 2 flex pages (Pricing, FAQ, Blog index, Case Studies, Team, or a single Service/Product detail page).",
          "Every page ships with: WCAG 2.2 AA accessibility (color contrast, keyboard nav, ARIA, focus states), Core Web Vitals in the green (LCP <2.5s, INP <200ms, CLS <0.1), structured data (Organization, LocalBusiness, Service, Product, FAQ schema), Open Graph + Twitter Card metadata for social sharing, XML sitemap, robots.txt and Google Search Console verification. The site is mobile-first responsive (375px / 768px / 1280px / 1440px breakpoints), ships with a CMS (Sanity, Payload or WordPress headless) so the founder can edit content without us, and includes a contact form with spam protection (hCaptcha), email notification, and CRM/webhook integration if the founder already uses one.",
        ],
      },
      {
        heading: "Component 5 — Complete brand identity",
        body: [
          "Brand identity is the visual layer that makes the website, the social profiles, the GBP, the business cards and the pitch deck recognisably the same business. We deliver: a primary logo (3 variants: primary, secondary, mark), a color system (4–6 brand colors with hex/RGB/HSL values and WCAG-validated contrast pairs), a typography system (1 display + 1 body font, with font files, fallback stacks and a typographic scale), a 1-page voice-and-tone guide, and a 12–20 page brand book (PDF) documenting every decision.",
          "Brand identity in the Starter Kit is scoped for a new business — not the 40–80 page enterprise brand book we deliver in a standalone Graphic Design engagement. The kit's brand book is enough to keep the founder consistent across the website, the social profiles, the GBP, the email signature and the first round of marketing creative. If the business later needs a deeper identity system (extended collateral, motion design, multi-vertical variations), the Starter Kit's identity is the foundation the deeper engagement builds on — no rework required.",
        ],
      },
      {
        heading: "Component 6–8 — GBP, SEO & marketing starter",
        body: [
          "Google Business Profile (GBP) is the local-SEO foundation: the business appears in Google Maps, the Local Pack (the 3 businesses shown above organic results for location-based queries), and the Knowledge Panel on the right side of branded searches. We set up the GBP from scratch (or claim an existing one), verify it via postcard or video verification, complete every field (services, products, hours, service area, attributes), upload 10–15 photos, write a 750-character business description with target keywords, and configure the messaging and booking features. For local businesses (dentists, restaurants, trades, retail), GBP is the single highest-ROI local-marketing asset — typically driving 30–60% of inbound leads within 90 days of launch.",
          "Foundational SEO setup covers the technical and on-page layer: keyword research (200–500 seed keywords ranked by intent and difficulty), title tags and meta descriptions on every page, header hierarchy (H1/H2/H3), internal linking structure, image alt text, XML sitemap submission to Google Search Console and Bing Webmaster Tools, schema markup (Organization, LocalBusiness, Service, FAQ), and a 90-day SEO roadmap the founder (or a future SEO vendor) can execute. This is not full SEO delivery — it is the foundation that prevents the new website from launching with technical debt that would take 3–6 months to unwind.",
          "The 30-day marketing starter plan runs weeks 6–8 (the website launches at week 6). It covers: paid social (Meta or LinkedIn, $1K–$3K ad spend managed by us at $0 management fee for the first 30 days), producing 8–16 creative variants on a structured testing grid; content distribution (3 blog posts + 12 social posts scheduled across the founder's channels); and a 30-day analytics review with the founder covering traffic, leads, conversion rate and the next-90-day plan. The starter plan is designed to seed the first 1,000–5,000 visitors and 10–50 leads in month one — so the website does not sit idle waiting for organic SEO to compound (which takes 3–6 months).",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the Starter Kit On",
    intro: [
      "The Starter Kit stack is opinionated, cost-optimised and selected for zero-vendor-lock-in. Every component below has been chosen because it is either free or low-cost at startup scale, scales cleanly to mid-market, and can be transferred to the founder's ownership on day one.",
    ],
    categories: [
      {
        name: "Infrastructure & email",
        items: [
          { name: "Cloudflare Registrar", description: "Domain registration at wholesale ICANN pricing — .com $10.44/year, .co.uk $5.27/year, .pk $20/year, .ae $42/year. No markup, no upsell, no renewal surprise. Domain ownership transfers to the founder on day one." },
          { name: "Cloudflare Pages + Workers", description: "Managed hosting for the Next.js site — free for the first 100K requests/day, $20/month at 10M requests/month. Edge-cached in 310+ POPs, sub-50ms TTFB globally, free SSL, free DDoS protection." },
          { name: "Google Workspace", description: "Business email at $6/user/month (Business Starter) or $12/user/month (Business Standard) — Gmail, Calendar, Drive, Docs, Meet. SPF/DKIM/DMARC configured for inbox delivery." },
          { name: "Microsoft 365 (alternative)", description: "Business email at $6/user/month (Basic) or $12.50/user/month (Standard) — Outlook, Teams, OneDrive, SharePoint. Used for clients already in the Microsoft ecosystem." },
          { name: "Cloudflare DNS + WAF", description: "DNS resolution at 12ms global median (vs. registrar DNS at 80–180ms), free WAF with managed rules, free DDoS protection, free SSL/TLS with automatic renewal." },
        ],
      },
      {
        name: "Website & CMS",
        items: [
          { name: "Next.js (React 19, App Router)", description: "Production-grade React framework — Server Components, edge runtime, ISR for content pages, image optimisation, built-in metadata API for SEO. The same stack that powers Vercel, Loom, Notion and TikTok web." },
          { name: "Sanity CMS", description: "Headless CMS with a free tier (3 users, 10K documents) — structured content modelling, real-time collaboration, GROQ query language. The founder edits content in Sanity Studio; the website renders from the Sanity API." },
          { name: "Payload CMS (alternative)", description: "Open-source headless CMS — self-hosted on Cloudflare Pages + Workers, no per-seat pricing, TypeScript-native. Used for clients who prefer self-hosting or who anticipate >3 editors." },
          { name: "WordPress headless (alternative)", description: "WordPress admin + Next.js front-end via WPGraphQL — for clients who already know WordPress or who need WordPress-native plugins (WooCommerce, MemberPress, LearnDash)." },
          { name: "Tailwind CSS v4", description: "Utility-first CSS framework — design tokens as code, dark mode via prefers-color-scheme, JIT compilation for ~10KB CSS bundles. Powers the design system the brand identity is built on." },
        ],
      },
      {
        name: "SEO, GBP & marketing",
        items: [
          { name: "Google Business Profile", description: "Free local-listing platform — appears in Google Maps, Local Pack, Knowledge Panel. We verify, complete every field, upload photos, write keyword-rich description, configure messaging." },
          { name: "Yoast SEO / RankMath", description: "On-page SEO management for WordPress-headless variants — title tags, meta descriptions, schema, XML sitemap, breadcrumb navigation. Free tier sufficient for Starter Kit scope." },
          { name: "Google Search Console + Bing Webmaster Tools", description: "Free search-engine indexing and performance dashboards — we submit the sitemap, request indexing of key pages, monitor crawl errors, and configure the founder's account on day one." },
          { name: "Meta Ads + Google Ads", description: "Paid-social and paid-search platforms for the 30-day marketing starter — Meta for B2C and local, Google Search for intent-capture, LinkedIn for B2B. We manage the first $1K–$3K at $0 management fee." },
          { name: "Plausible / Fathom / Vercel Analytics", description: "Privacy-first web analytics — GDPR-compliant without cookie banners, sub-1KB script, real-time dashboard. Replaces Google Analytics for founders who value simplicity and compliance." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Component", "DIY / separate vendors", "ClickTake Starter Kit"],
      rows: [
        ["Domain (.com, 1 year)", "yes:$20 (GoDaddy)", "yes:$10.44 (Cloudflare wholesale)"],
        ["Hosting (year 1)", "yes:$120–$300 (Bluehost/HostGator)", "yes:$0 (Cloudflare Pages free tier)"],
        ["Business email (per user/year)", "yes:$72–$144", "yes:$72 (Google Workspace direct)"],
        ["Production website (6 pages)", "yes:$3–10K freelancer", "yes:bundled"],
        ["Brand identity (logo + system)", "yes:$2–8K freelancer", "yes:bundled"],
        ["Google Business Profile setup", "no:DIY (incomplete)", "yes:Fully configured + verified"],
        ["Foundational SEO setup", "no:DIY (no keyword research)", "yes:Keywords + on-page + schema + GSC"],
        ["30-day marketing starter", "no:Not included", "yes:Paid social + content + analytics review"],
        ["Single accountable team", "no:5–8 vendors", "yes:1 team, 1 timeline"],
        ["Time to launch", "no:4–6 months", "yes:6 weeks"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Launch in 5 Phases Over 6 Weeks",
    intro: [
      "We ship the Business Startup Kit in 6 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'we are working on it' updates. The 30-day marketing starter runs weeks 6–8 as a post-launch follow-on.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Brand Brief",
        duration: "Week 1",
        deliverables: ["Founder interview (90 minutes)", "Competitor audit (6–10 competitors)", "Brand brief (positioning, audience, tone)", "Sitemap (6 pages defined)", "Domain registered + ownership transferred"],
        description:
          "We interview the founder for 90 minutes to understand the business, the audience, the value proposition, the competitive landscape and the success metrics. We audit 6–10 competitors on 8 visual and messaging dimensions, draft the brand brief (positioning statement, audience persona, tone-of-voice principles, primary value prop), and define the 6-page sitemap (Home, About, Services/Products, Contact + 2 flex pages). We register the domain via Cloudflare Registrar at wholesale pricing and transfer ownership to the founder on day one. The brand brief and sitemap sign off before any design begins.",
      },
      {
        phase: "Phase 2",
        title: "Brand Identity & Website Design",
        duration: "Week 2–4",
        deliverables: ["Brand identity (logo, color, typography, voice)", "Brand book PDF (12–20 pages)", "Figma wireframes for 6 pages", "High-fidelity UI in 3 breakpoints", "Design tokens (CSS + Tailwind)"],
        description:
          "We design the brand identity (primary logo + 2 variants, 4–6 brand colors with WCAG-validated contrast pairs, 1 display + 1 body font with full typographic scale, voice-and-tone guide) and document it in a 12–20 page brand book PDF. In parallel, we wireframe the 6 pages in Figma (mobile-first, 3 breakpoints) and apply the brand identity to high-fidelity UI. Design tokens are exported as CSS custom properties and Tailwind config so the engineering phase builds on the same system. The brand book and high-fidelity UI sign off before engineering begins.",
      },
      {
        phase: "Phase 3",
        title: "Hosting, Email & Domain Infrastructure",
        duration: "Week 5",
        deliverables: ["Cloudflare Pages project configured", "Google Workspace provisioned (up to 3 mailboxes)", "SPF / DKIM / DMARC records configured", "SSL/TLS active", "Staging environment live"],
        description:
          "We provision the infrastructure: Cloudflare Pages project with Workers, Google Workspace (up to 3 mailboxes at $6/user/month), DNS configuration on Cloudflare, SPF/DKIM/DMARC records for email deliverability, free SSL/TLS with automatic renewal, and a staging environment at staging.yourdomain.com. The founder can send and receive email from name@yourdomain.com by end of week 5. The staging site is visible only to the founder and the ClickTake team — not yet indexed by Google.",
      },
      {
        phase: "Phase 4",
        title: "Website Build, SEO Foundation & GBP",
        duration: "Week 6",
        deliverables: ["Production Next.js site deployed to Cloudflare Pages", "On-page SEO (titles, meta, schema, sitemap)", "Google Business Profile verified and completed", "Google Search Console + Bing Webmaster Tools configured", "Production launch + 301 redirect plan"],
        description:
          "We build the production Next.js site on the design tokens from Phase 2, deploy to Cloudflare Pages, configure on-page SEO (title tags, meta descriptions, header hierarchy, internal linking, image alt text, XML sitemap, schema markup — Organization, LocalBusiness, Service, FAQ), verify and complete the Google Business Profile (photos, services, hours, service area, description), submit the sitemap to Google Search Console and Bing Webmaster Tools, and launch the production site at yourdomain.com. The site is live, indexed, and the founder can edit content via the CMS by end of week 6.",
      },
      {
        phase: "Phase 5",
        title: "30-Day Marketing Starter Plan",
        duration: "Week 6–8",
        deliverables: ["Paid-social campaign live (Meta or LinkedIn, $1–3K ad spend)", "8–16 paid creative variants on a testing grid", "3 blog posts published", "12 social posts scheduled", "30-day analytics review + 90-day plan"],
        description:
          "The marketing starter runs as a 30-day post-launch sprint. We launch paid social on Meta (B2C / local) or LinkedIn (B2B) with $1K–$3K ad spend managed at $0 management fee for the first 30 days. We produce 8–16 creative variants on a structured testing grid (hook × visual × CTA), publish 3 SEO-optimised blog posts on the founder's site, schedule 12 social posts across the founder's channels, and run a 30-day analytics review covering traffic, leads, conversion rate and the next-90-day plan. By end of week 8, the founder has a live website, a verified GBP, a working email, a brand system, an SEO foundation, and the first 1,000–5,000 visitors + 10–50 leads from the marketing starter.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the Starter Kit Compounds Value",
    intro: [
      "The use cases below are drawn from 120+ Starter Kit engagements shipped between 2022 and 2026. Each card describes the specific business problem, the kit configuration we shipped, and the measurable result — not aspirational launch stories.",
    ],
    cases: [
      {
        industry: "Brand-new founder launching a service business",
        problem: "First-time founder leaving a corporate job to launch a consultancy. No brand, no website, no domain, no email. Budget: $12K. Timeline: 6 weeks before the first prospect meeting.",
        application: "Standard Starter Kit: .com domain via Cloudflare, Cloudflare Pages hosting, Google Workspace email, 6-page Next.js site (Home, About, Services, Case Studies, Pricing, Contact), complete brand identity, GBP setup, SEO foundation, 30-day LinkedIn paid-social starter with 12 creative variants targeting the founder's former industry.",
        result: "Launched in 6 weeks. First prospect meeting in week 7 closed a $42K retainer. First-month traffic: 2,400 visitors (1,800 from LinkedIn paid, 600 organic). 14 inbound leads in month one. The founder retained ClickTake for ongoing SEO and content marketing at $3K/month.",
      },
      {
        industry: "Brick-and-mortar local business launch",
        problem: "New dental practice opening in Birmingham (UK). Needs to be visible in Google Maps when local patients search 'dentist near me' from week one of opening. No website, no GBP, no brand.",
        application: "Starter Kit with local-SEO emphasis: .co.uk domain, Cloudflare Pages hosting, Google Workspace email, 6-page Next.js site (Home, About, Treatments, Team, New Patients, Contact), brand identity, GBP verified with 15 photos and full service list, local schema markup, 30-day Meta paid-social starter geo-targeting a 5-mile radius around the practice.",
        result: "GBP appeared in the Local Pack for 'dentist Birmingham' within 14 days of launch. First-month traffic: 3,100 visitors (1,400 paid, 1,200 GBP/Maps, 500 organic). 47 new-patient bookings in month one. The practice hit break-even in month 4 — 8 months ahead of the founder's forecast.",
      },
      {
        industry: "Rebrand for an established business",
        problem: "8-year-old accounting firm with an outdated website, no consistent brand, and a GBP that has not been updated in 4 years. Ready to rebrand without losing the existing client base or SEO equity.",
        application: "Starter Kit configured for rebrand: new domain registered, 301 redirects from the old domain to preserve SEO equity, complete rebrand (logo, color, typography), 6-page Next.js site replacing the legacy WordPress site, GBP refreshed and re-verified, SEO foundation retaining the existing ranking keywords, 30-day Meta + LinkedIn paid-social starter announcing the rebrand to existing and prospective clients.",
        result: "Rebrand shipped in 6 weeks with zero SEO dip (1:1 URL redirects preserved rankings). New-business close rate rose 22% on the new proposal template. Existing-client retention held at 98%. First-month traffic: 4,800 visitors (vs. 2,100 pre-rebrand). The firm retained ClickTake for ongoing website maintenance at $1.5K/month.",
      },
      {
        industry: "Side-hustle-to-business transition",
        problem: "Founder has been running a side-hustle e-commerce brand on Etsy for 2 years. Ready to launch a standalone website, own the customer relationship, and start paid marketing. No domain, no brand system, no infrastructure outside Etsy.",
        application: "Starter Kit configured for D2C: .com domain, Cloudflare Pages hosting, Google Workspace email, 6-page Next.js site (Home, Shop, About, Product detail, Cart/Checkout via Shopify Buy Button, Contact), brand identity lifted and formalised from the Etsy shop's de-facto branding, GBP setup, SEO foundation, 30-day Meta + TikTok paid-social starter with 16 creative variants on a testing grid.",
        result: "Site launched in 6 weeks. First-month revenue on the standalone site: $14K (vs. $4K/month average on Etsy). Customer email list grew from 0 to 1,400 in 30 days. ROAS on Meta paid: 3.2×. The founder left their day job in month 4. They retained ClickTake for ongoing paid-social management at $4K/month.",
      },
      {
        industry: "Multi-location service business launch",
        problem: "Founder opening a multi-location home-services business (3 locations across Austin, TX) needs consistent branding and GBP presence across all 3 locations, with location-specific landing pages for each.",
        application: "Starter Kit configured for multi-location: .com domain, Cloudflare Pages hosting, Google Workspace email, 6-page Next.js site with location-specific landing pages (Home, Services, About, Austin Central, Austin North, Austin South, Contact — using the 6-page scope creatively with location sub-pages), brand identity, 3 GBP profiles (one per location) verified and completed, local SEO schema per location, 30-day Meta paid-social starter geo-targeting each location separately.",
        result: "All 3 locations appeared in Google Maps within 21 days of launch. First-month traffic: 5,200 visitors (2,800 paid, 1,900 GBP/Maps across 3 locations, 500 organic). 89 inbound leads in month one across the 3 locations. The founder retained ClickTake for ongoing SEO + paid-social at $5K/month.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Starter Kit vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most founders consider before engaging us. We have shipped all four — the right choice depends on the founder's budget, timeline and willingness to coordinate vendors.",
    ],
    tables: [
      {
        title: "ClickTake Starter Kit vs. DIY vendor coordination vs. Freelance web designer vs. Traditional agency",
        headers: ["Dimension", "DIY (separate vendors)", "Freelance web designer", "Traditional agency", "ClickTake Starter Kit"],
        rows: [
          ["Time to launch", "no:4–6 months", "no:8–14 weeks", "no:12–24 weeks", "yes:6 weeks"],
          ["Total cost (year 1)", "yes:$8–18K + founder time", "yes:$5–12K (website only)", "no:$25–80K", "yes:$8–14K (all-in)"],
          ["Components bundled", "no:Founder coordinates 5–8", "no:1 (website only)", "partially:3–4", "yes:8 components"],
          ["Brand identity included", "no:Separate vendor", "partially:Logo only", "yes", "yes:Logo + system + brand book"],
          ["GBP setup", "no:DIY (incomplete)", "no", "yes:Extra cost", "yes:Bundled"],
          ["Foundational SEO", "no:DIY (no keyword research)", "no", "yes:Extra cost", "yes:Bundled"],
          ["Marketing starter", "no", "no", "no:Extra retainer", "yes:30 days paid + content"],
          ["Single accountable team", "no", "partially", "yes", "yes"],
          ["Best for", "Founders with time + skills", "Founders needing only a site", "Established businesses", "New founders + rebranders"],
        ],
      },
      {
        title: "What's included vs. what needs a follow-on engagement",
        headers: ["Need", "Starter Kit covers it", "Needs follow-on engagement"],
        rows: [
          ["Launch website (6 pages)", "yes", "no"],
          ["Brand identity (logo + system)", "yes", "no"],
          ["Domain, hosting, email", "yes", "no"],
          ["GBP + foundational SEO", "yes", "no"],
          ["First 30 days of marketing", "yes", "no"],
          ["E-commerce (100+ products)", "no", "yes:E-commerce engagement"],
          ["Custom SaaS / web app", "no", "yes:Full-stack engagement"],
          ["Ongoing SEO + content (month 2+)", "no", "yes:SEO retainer"],
          ["Ongoing paid social (month 2+)", "no", "yes:Paid-social retainer"],
          ["Multi-language site", "no", "yes:Localisation engagement"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROI, Time-to-Revenue & Cost Savings",
    intro: [
      "The Business Startup Kit earns its budget back through one of three mechanisms: time-to-revenue reduction (the founder starts selling 4–5 months sooner than coordinating vendors), cost savings (bundled pricing is ~40% cheaper than separate vendors), or first-month traction (the marketing starter seeds the first 1,000–5,000 visitors and 10–50 leads that a website alone would not generate). The numbers below are aggregated across 120+ Starter Kit engagements shipped 2022–2026.",
    ],
    metrics: [
      { value: "6 wks", label: "Time to launch", description: "Average time from kickoff to live website with GBP, email, brand and SEO foundation — versus 4–6 months coordinating vendors separately." },
      { value: "~40%", label: "Cost savings vs. separate vendors", description: "Average total-cost reduction versus commissioning domain, hosting, email, website, brand, GBP, SEO and marketing separately." },
      { value: "2,800", label: "Avg. first-month visitors", description: "Average traffic in month one — driven by the 30-day marketing starter plus GBP + organic SEO foundation." },
      { value: "27", label: "Avg. first-month leads", description: "Average inbound leads (form fills, calls, DMs, bookings) in month one — across service, local and D2C engagements." },
    ],
    body: [
      "Time-to-revenue reduction is the most measurable impact. A founder coordinating vendors separately takes 4–6 months to launch; a Starter Kit ships in 6 weeks. For a service business with a $5K average client value and 4 new clients per month post-launch, the 4.5-month acceleration is worth $90K in early revenue. For a D2C brand with $14K/month post-launch revenue, the 4.5-month acceleration is worth $63K. The Starter Kit pays for itself 5–10× in time-to-revenue alone — before counting the cost savings and first-month traction.",
      "Cost savings is the second mechanism. Bundled pricing delivers ~40% total-cost reduction versus separate vendors. The savings come from three places: (1) wholesale infrastructure pricing (Cloudflare Registrar $10.44 vs. GoDaddy $20; Cloudflare Pages $0 vs. Bluehost $120–300/year); (2) shared team across components (the brand designer's color tokens are reused by the web designer — no duplicate work); (3) fixed-scope efficiency (we ship 120+ Starter Kits per year — the playbook is repeatable, the templates are pre-built, the friction is engineered out).",
      "First-month traction is the impact category most founders underestimate. A website without a marketing starter sits at 0–50 visitors/month for 6–9 months until organic SEO compounds. The 30-day marketing starter delivers the first 1,000–5,000 visitors in month one — generating the first 10–50 leads, the first customer conversations, and the first real data on what messaging converts. This data is what informs the next 90 days: which paid creative won, which landing page converted, which audience segment booked. Without the starter, the founder launches blind and waits; with the starter, the founder launches and learns immediately.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The Starter Kit does not live in isolation — it sits inside the founder's broader sales, marketing and operations stack. The list below covers the integrations we configure most often during the kit and the integrations we hand off to the founder for month-2+ growth.",
    ],
    categories: [
      {
        name: "Infrastructure & DNS",
        items: ["Cloudflare Registrar (domain)", "Cloudflare DNS + WAF + CDN", "Cloudflare Pages + Workers (hosting)", "Google Workspace (email + calendar + drive)", "Microsoft 365 (alternative email)", "Vercel / Netlify (alternative hosting for Next.js)"],
      },
      {
        name: "Website, CMS & analytics",
        items: ["Next.js (React 19, App Router)", "Sanity CMS / Payload CMS / WordPress headless", "Tailwind CSS v4 (design tokens)", "Plausible / Fathom / Vercel Analytics", "Google Search Console + Bing Webmaster Tools", "Vercel Speed Insights / Cloudflare Web Analytics"],
      },
      {
        name: "Local SEO & business listings",
        items: ["Google Business Profile (primary)", "Bing Places for Business", "Apple Business Connect", "Yext / BrightLocal (citation management)", "Trustpilot / Google reviews (review generation)", "LocalBusiness schema (Organization + Service + FAQ)"],
      },
      {
        name: "Marketing, CRM & comms",
        items: ["Meta Ads + Meta Business Suite", "Google Ads (Search + Performance Max)", "LinkedIn Ads (B2B)", "HubSpot Free CRM / Folk / Notion CRM", "Mailchimp / Brevo / Resend (email marketing)", "Calendly / Cal.com / Cal.com Embedded (booking)"],
      },
    ],
    compliance: ["GDPR-compliant analytics (Plausible / Fathom — no cookies, no consent banner required)", "Google Workspace BAA available for HIPAA-scoped engagements", "Privacy policy + cookie policy + terms of service templates included", "SSL/TLS automatic via Cloudflare", "SPF / DKIM / DMARC configured for email deliverability", "Domain ownership + Google Workspace ownership + Cloudflare account ownership transferred to founder on day one"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Starter Kit Launches in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 Starter Kit engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "First-time founder, service consultancy, UK",
        situation: "Founder leaving a corporate strategy-consulting role to launch a boutique consultancy serving mid-market B2B SaaS. No brand, no website, no domain, no email, no GBP. Budget: $12K. Timeline: 6 weeks before the first scheduled prospect meeting at a portfolio company.",
        task: "Launch a complete digital presence — domain, email, website, brand, GBP, SEO foundation and 30-day marketing starter — in 6 weeks, under $12K, with the consultancy positioned for £8K/month retainer work.",
        action: "ClickTake ran the standard 5-phase Starter Kit. Week 1: founder interview, competitor audit (8 consultancies), brand brief, sitemap (Home, About, Services, Case Studies, Pricing, Contact), .com domain registered via Cloudflare. Weeks 2–4: brand identity designed (logo, 5-color system, serif-display + sans-body typography, 16-page brand book PDF), 6-page Next.js site designed in Figma in 3 breakpoints, design tokens exported. Week 5: Cloudflare Pages project + Google Workspace provisioned, SPF/DKIM/DMARC configured, staging live. Week 6: production site deployed, on-page SEO + schema + XML sitemap, GBP verified and completed, GSC + Bing Webmaster configured, production launch. Weeks 6–8: 30-day LinkedIn paid-social starter with 12 creative variants targeting VP Product at UK B2B SaaS companies, $2K ad spend at $0 management fee, 3 blog posts published, 12 LinkedIn posts scheduled, 30-day analytics review.",
        result: "Launched in 6 weeks, on budget. First prospect meeting in week 7 closed a £3K/month ($3,800/month) retainer (the founder's first client). First-month traffic: 2,400 visitors (1,800 LinkedIn paid, 600 organic). 14 inbound leads in month one. By month 4, the consultancy had 4 retainers at £3K–£8K/month, $24K MRR. The founder retained ClickTake for ongoing SEO + LinkedIn content at $3K/month.",
        quote: {
          text: "I expected to spend 6 months setting this up. ClickTake shipped in 6 weeks and the brand felt like I had been running the consultancy for years. The LinkedIn ads alone paid for the whole kit in week 3.",
          author: "Founder",
          title: "Strategy consultancy",
        },
      },
      {
        client: "New dental practice, Birmingham UK",
        situation: "Two dentists opening a new private practice in Birmingham. They had a 12-week timeline before the practice opened, no brand, no website, no domain, no email, no Google Business Profile. They needed to be visible in Google Maps the day the doors opened, with new-patient bookings already on the calendar.",
        task: "Launch complete digital presence for a local dental practice in 6 weeks, with GBP visible in the Local Pack from week one and 30+ new-patient bookings before the practice opened.",
        action: "ClickTake ran a Starter Kit configured for local-SEO emphasis. Week 1: founder interview, competitor audit (10 Birmingham dental practices), brand brief, sitemap (Home, About, Treatments, Team, New Patients, Contact), .co.uk domain registered via Cloudflare. Weeks 2–4: brand identity designed (logo, calming blue/teal palette, dental-trustworthy typography, 18-page brand book), 6-page Next.js site designed with treatment-specific sub-pages, design tokens exported. Week 5: Cloudflare Pages + Google Workspace provisioned, staging live. Week 6: production site deployed, LocalBusiness schema markup with geo-coordinates, GBP verified via video verification, 15 photos uploaded, full service list and hours configured, 3 location-specific landing pages, Meta paid-social campaign geo-targeting a 5-mile radius, $1.5K ad spend at $0 management fee, 8 creative variants on a testing grid, booking integration via Cal.com. Weeks 6–8: 30-day Meta paid-social + content starter.",
        result: "GBP appeared in the Local Pack for 'dentist Birmingham' within 14 days of launch — 7 days before the practice opened. 47 new-patient bookings before opening day. First-month traffic: 3,100 visitors (1,400 paid, 1,200 GBP/Maps, 500 organic). The practice hit break-even in month 4 — 8 months ahead of the founders' forecast. By month 12, the practice had 380 active patients and a 4.8-star Google rating from 87 reviews.",
        quote: {
          text: "We opened the doors with 47 patients already booked. Our neighbouring practice, which opened 6 months earlier, took 4 months to hit that number. The GBP setup alone was worth the whole engagement.",
          author: "Practice Co-Founder",
          title: "Birmingham dental practice",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Scope",
        questions: [
          {
            q: "How much does the Business Startup Kit cost?",
            a: "The Starter Kit is a fixed-scope bundle priced at $8K–$14K depending on region (UK/Pakistan lower end, USA/UAE higher end) and selected options (CMS choice, ad-spend budget for the marketing starter, mailbox count). The price includes all 8 components: domain registration (1 year), 12 months managed hosting on Cloudflare Pages, Google Workspace email (3 mailboxes, founder pays Google directly at $6/user/month), 6-page Next.js website with CMS, complete brand identity with brand book PDF, Google Business Profile setup, foundational SEO setup, and a 30-day marketing starter plan (paid-social management at $0 for 30 days; ad spend $1–3K is the founder's budget). No hidden fees. We provide a fixed quote after the discovery call.",
          },
          {
            q: "What is not included in the Starter Kit?",
            a: "The kit does not include: e-commerce with more than 10 products (requires our E-commerce engagement), custom SaaS or web-app functionality (requires Full-Stack engagement), multi-language site (requires Localisation engagement), ongoing SEO and content beyond the 30-day starter (requires SEO retainer), ongoing paid social beyond the 30-day starter (requires Paid-Social retainer), website maintenance beyond the first 90 days (requires Maintenance plan), or more than 6 pages of website content (additional pages at $600–$1,200 per page). We will tell you upfront during the discovery call if your needs exceed the kit's scope.",
          },
          {
            q: "Can I customise the kit for my industry?",
            a: "Yes — within the fixed scope. The 6-page sitemap is configurable (Home, About, Contact + 3 flex pages chosen per industry: Pricing, FAQ, Services, Products, Team, Case Studies, Blog index, Location pages, Booking page). The brand identity is configured for your industry's visual conventions. The GBP setup is industry-specific (services list, attributes, photos). The 30-day marketing starter is platform-specific (Meta for B2C/local, LinkedIn for B2B, Google Search for intent-capture). What is not configurable: the 6-week timeline, the 8-component scope, and the bundled pricing.",
          },
          {
            q: "What if I already have a domain or hosting?",
            a: "We will transfer your existing domain into Cloudflare Registrar (so you get wholesale renewals) or leave it where it is if you prefer. We will migrate your existing hosting to Cloudflare Pages (free, near-zero downtime) or build on your existing host if it supports Next.js (Vercel, Netlify, AWS Amplify). If your existing setup is incompatible (e.g. Wix, Squarespace, legacy cPanel shared hosting), we will explain the trade-offs and recommend migration. Existing Google Workspace or Microsoft 365 email is migrated as-is.",
          },
        ],
      },
      {
        name: "Process & Timeline",
        questions: [
          {
            q: "Can the Starter Kit ship faster than 6 weeks?",
            a: "Yes — a 4-week 'Express' timeline is available for an additional $1.5K, where we compress Phases 2 and 4 by running brand identity and website build in parallel with infrastructure setup. The 4-week timeline requires the founder to commit to 24-hour review turnaround on each gate. We do not recommend the Express timeline for founders with day jobs or for engagements involving a live-action brand photoshoot (which adds 1–2 weeks on its own). The standard 6-week timeline is calibrated for founder-led review without overwhelming the founder's calendar.",
          },
          {
            q: "What happens after the 6-week launch?",
            a: "Two weeks of marketing-starter follow-on (weeks 6–8) are included in the kit. After week 8, the founder has three options: (1) Self-serve — the founder manages the website, GBP, SEO and marketing themselves using the CMS, brand book and 90-day roadmap we deliver. (2) Retain ClickTake for ongoing services — typically $2K–$5K/month covering SEO + content, paid social, or both. (3) Hybrid — ClickTake handles the technical work (website maintenance, SEO), the founder handles the content. Most founders start with option 2 and migrate to option 1 or 3 within 6–12 months.",
          },
          {
            q: "What do I need to provide during the engagement?",
            a: "Founder time commitment is approximately 6–8 hours per week across the 6 weeks: 90-minute kickoff interview (week 1), 60-minute brand-brief review (week 1), 60-minute moodboard + direction review (week 2), 60-minute wireframe review (week 3), 90-minute high-fidelity UI review (week 4), 30-minute infrastructure walkthrough (week 5), 60-minute launch review + CMS training (week 6), 30-minute weekly marketing-starter check-ins (weeks 6–8). Founder also provides: existing brand assets (if any), photography (or we arrange a shoot at extra cost), business copy points (we draft copy from the founder interview and the founder edits), and the ad-spend budget for the marketing starter ($1–3K).",
          },
          {
            q: "Who writes the website copy?",
            a: "We do. The 90-minute founder interview in week 1 produces the raw material for the copy. Our copywriter drafts all 6 pages of website copy, the GBP business description, the 3 blog posts in the marketing starter, and the 12 social posts. The founder reviews and edits — typically 2–3 hours of editing across the engagement. If the founder prefers to write their own copy, we provide a copy brief and structure for each page. Copy is included in the kit price; no separate copywriting fee.",
          },
        ],
      },
      {
        name: "Ownership & Handoff",
        questions: [
          {
            q: "Who owns the domain, hosting, email and website after launch?",
            a: "You do — fully. Domain is registered in your name from day one (we are the technical contact, you are the registrant and admin contact). Cloudflare account is in your name; we are a member of your account for the engagement, removed at handoff. Google Workspace is your tenant; we are an admin during the engagement, removed at handoff. Website code is in your GitHub or GitLab repository; we are a collaborator during the engagement, removed at handoff. CMS (Sanity, Payload or WordPress) is in your account. Google Business Profile is in your name. We retain no ownership and no access after handoff — you can fire us and continue without disruption.",
          },
          {
            q: "Can I edit the website myself after launch?",
            a: "Yes — every Starter Kit site ships with a CMS (Sanity, Payload or WordPress headless) that lets you edit text, images, blog posts and case studies without us. We provide a 60-minute CMS training session in week 6 and a written CMS guide. For structural changes (adding pages, changing navigation, modifying design), you would either engage us on an hourly basis ($120/hour) or commission a small engagement. Most founders edit content themselves within a week of training.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before the kickoff interview. All brand assets, website code, copy, design files, source files and configuration built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. We do ask for permission to reference the engagement in our portfolio (case study + 2–3 image crops) — this is optional and you can decline.",
          },
          {
            q: "What happens to my existing website / SEO / GBP if I am rebranding?",
            a: "We migrate your existing SEO equity via 1:1 URL 301 redirects from the old site to the new — preserving rankings during the rebrand. We claim and refresh your existing Google Business Profile (rather than creating a new one) so the existing reviews and history carry over. We export your existing website's content (text, images, blog posts) and re-format it for the new site. The rebrand kit is the same 6-week timeline as the new-business kit, with the migration work folded into Phases 3 and 4.",
          },
        ],
      },
      {
        name: "After Launch & Working with ClickTake",
        questions: [
          {
            q: "Where are your Starter Kit teams based?",
            a: "Starter Kit engagements are staffed across our Birmingham (UK) and Multan (Pakistan) hubs — brand designer and project lead in Birmingham, web designer and developer split across Birmingham and Multan, SEO and marketing lead in Multan, with client-facing oversight from Austin (USA) and Dubai (UAE) for US and Middle East clients. The kit is designed for remote-first delivery — we have shipped 120+ kits across 4 continents with the same playbook.",
          },
          {
            q: "Do you offer ongoing support after the 30-day marketing starter?",
            a: "Yes — three common retainer configurations: (1) Marketing retainer ($2K–$5K/month) covering SEO + content + paid social; (2) Maintenance retainer ($1.5K–$3K/month) covering security patches, dependency upgrades, backups, uptime monitoring, content updates; (3) Full-service retainer ($4K–$8K/month) covering both. Most Starter Kit clients start with the marketing retainer (since the website is new and the founder's biggest need is traffic and leads), then add maintenance in year 2. We will recommend the right configuration at the week-8 30-day review.",
          },
          {
            q: "Can the Starter Kit scale if my business grows?",
            a: "Yes — the stack is selected for scalability. Cloudflare Pages scales from 0 to 10M requests/month without re-architecture. Next.js scales from a 6-page marketing site to a full SaaS application without re-platforming. Sanity CMS scales from 1 editor to 50. Google Workspace scales from 3 to 1,000 mailboxes. The brand system is delivered with design tokens that extend to additional collateral, additional web pages and additional channels. The SEO foundation is built to scale from local to national to international. If you outgrow the kit — typically at 50+ pages, 100+ products or significant SaaS functionality — the kit's stack is the foundation the next engagement builds on, not a throwaway.",
          },
          {
            q: "What is the difference between the Starter Kit and just hiring ClickTake for a website?",
            a: "The Starter Kit bundles 8 components (domain, hosting, email, website, brand, GBP, SEO, marketing starter) into one fixed-scope, fixed-timeline engagement at ~40% lower total cost than separate vendors. Hiring ClickTake for a website only is a standalone engagement ($8–20K for a 6-page site) that does not include domain, hosting, email, brand identity, GBP, SEO or marketing starter. The Starter Kit is the right choice for new founders and rebranders who need the full stack; the standalone website engagement is the right choice for established businesses that already have brand, infrastructure and marketing in place.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Launch Your Business in 6 Weeks?",
    subtitle:
      "Book a free 30-minute Starter Kit call. We will review your business, your timeline and your budget, confirm whether the kit is the right fit, and tell you honestly whether you need the full bundle or a subset. No deck, no sales script — just a working session.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min Starter Kit call",
        description: "Free. No deck. We confirm whether the kit fits your business and timeline.",
      },
      {
        step: "2",
        title: "Receive a fixed-scope quote",
        description: "Within 2 business days — 8 components, 6-week timeline, fixed price, no hidden fees.",
      },
      {
        step: "3",
        title: "Kickoff and launch in 6 weeks",
        description: "Five-phase methodology. Live website, brand, email, GBP, SEO and marketing starter delivered.",
      },
    ],
    primaryCta: { label: "Book a Free Starter Kit Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Starter Kit Spec Sheet", href: "/resources", variant: "outline" },
  },
}
