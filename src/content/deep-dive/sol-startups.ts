import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/startups — For Startups
 *
 * Founder-focused landing page: complete brand + production website + AI
 * assistant + 90-day growth plan, delivered as one fixed-scope, fixed-timeline
 * engagement for pre-seed to Series A teams across Birmingham, Multan,
 * Austin and Dubai. ~2,500 words across the 12-section blueprint.
 */
export const startupsSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For Startups",
    title: "Launch Online End-to-End in 90 Days — Not 9 Months",
    subtitle:
      "A complete brand, production Next.js website (up to 6 pages), domain-trained AI assistant, and 90-day growth marketing plan — shipped as one fixed-scope, fixed-timeline engagement for pre-seed to Series A founders in the UK, Pakistan, USA and UAE.",
    geoDefinition:
      "A startup launch solution is a fixed-scope, fixed-timeline bundle that delivers the four assets a founder needs to go from idea to revenue-generating online presence — brand identity, production website, AI assistant and a 90-day growth plan — under one team, one contract and one accountable owner. Unlike coordinating a brand designer, web agency, AI vendor and marketing consultant separately (which takes 6–9 months and burns 30–60% of a typical seed runway on vendor coordination), a startup launch solution ships all four components in 90 days with integration points designed in from day one. ClickTake Technologies delivers this solution to pre-seed through Series A founders across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), on a stack of Figma, Next.js, Cloudflare, OpenAI/LangGraph and structured paid-social plus content distribution.",
    character: "solution-detail",
    ctas: [
      { label: "Start Your Startup Project", href: "/contact", variant: "orange" },
      { label: "Download the 90-Day Launch Plan", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "90 days", label: "Fixed timeline to launch" },
      { value: "4", label: "Assets bundled (brand + site + AI + growth)" },
      { value: "60+", label: "Startup launches shipped" },
      { value: "Pre-seed → Series A", label: "Stage range served" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For Startups", href: "/solutions/startups" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Founders Lose 6–9 Months Stitching Four Vendors Together",
    intro: [
      "A pre-seed or seed-stage founder setting up their go-to-market stack the traditional way coordinates four separate vendors: a brand designer (4–8 weeks, £3–8K), a web agency (8–16 weeks, £8–25K), an AI/chatbot vendor (4–8 weeks, £4–12K) and a growth marketer (4–8 weeks, £3–10K). Each vendor has its own timeline, its own kickoff, its own brief intake and its own accountability gap — the seam between what one vendor delivered and what the next vendor needs. The result is 6–9 months from idea to live-and-marketing, with 30–60% of the runway spent on vendor coordination rather than selling, hiring or shipping product.",
      "The deeper cost is missed compounding. A startup that launches in month 9 instead of month 3 loses 6 months of organic SEO compounding, 6 months of customer feedback loops, 6 months of paid-media learning and 6 months of investor-visible traction. For a typical seed-stage startup burning £25K/month, that 6-month delay costs £150K of runway — often the difference between raising the Series A and shutting down.",
    ],
    painPoints: [
      {
        title: "Vendor coordination eats the founder's calendar",
        description:
          "Coordinating 4 separate vendors consumes 10–15 hours/week of founder time — kickoff calls, briefs, review cycles, invoice approvals, accountability chasing. A pre-seed founder who should be selling spends 25–35% of their week managing freelancers and agencies instead of talking to customers.",
      },
      {
        title: "Template kits produce generic, undifferentiated launches",
        description:
          "Off-the-shelf startup kits (Wix templates, no-code site builders, pre-built chatbot widgets) deliver a launch that looks and behaves like 10,000 other startups. Investors and customers notice. Brand recall, demo conversion and inbound lead quality all underperform a custom-built launch by 30–60%.",
      },
      {
        title: "No single partner owns the integrated outcome",
        description:
          "When the website, brand, AI assistant and growth plan are delivered by four vendors, no one is accountable for the integrated outcome — conversion rate, lead quality, time-to-revenue. Each vendor points at the other when leads don't convert. The founder absorbs the risk.",
      },
      {
        title: "Runway burns while the launch waits",
        description:
          "A 9-month launch at £25K/month burn rate consumes £225K of runway before the first paying customer. A 90-day launch consumes £75K — saving £150K of runway that buys 6 more months of operating time at Series A pitch time.",
      },
    ],
    paradigmShift: [
      "A startup launch is not four separate projects — it is one project with four components, and the components only compound when they are designed together. The brand designer hands color tokens and the type system to the web designer; the web designer ships the site with structured data and event tracking the AI assistant and the growth marketer both depend on; the AI assistant is trained on the brand voice and the website copy; the growth marketer launches paid social the day the site goes live, into a funnel that was instrumented from week one. One team, one timeline, one accountable owner, 90 days to live-and-marketing.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the Startup Launch Solution?",
    intro: [
      "The startup launch solution is a fixed-scope, fixed-timeline engagement that delivers four assets in 90 days: a complete brand identity, a production Next.js website (up to 6 pages), a domain-trained AI assistant, and a 90-day growth marketing plan with 30 days of execution support. Each component is non-optional in the bundle — removing one breaks the integration that makes the bundle compound.",
    ],
    subsections: [
      {
        heading: "Asset 1 — Complete brand identity",
        body: [
          "Brand identity is the visual and verbal layer that makes the website, the pitch deck, the social profiles and the AI assistant recognisably the same business. We deliver a primary logo (3 variants: primary, secondary, mark), a colour system (4–6 brand colours with hex/RGB/HSL values and WCAG-validated contrast pairs), a typography system (1 display + 1 body font, with font files and a typographic scale), a 1-page voice-and-tone guide, and a 12–20 page brand book (PDF) documenting every decision.",
          "The brand book includes usage rules (clear space, minimum size, colour-on-colour combinations to avoid), alternative logo lockups for light/dark backgrounds and social avatars, and a brand voice reference with 5–10 example sentences in the brand tone. Founders use the brand book to brief future freelancers, designers and the AI assistant — keeping brand consistency through Series A without re-engaging us.",
        ],
      },
      {
        heading: "Asset 2 — Production Next.js website (up to 6 pages)",
        body: [
          "The website is the conversion layer — where the founder's value proposition becomes a lead, a booking, a sign-up or a demo request. We build on Next.js 15 (App Router, React 19, edge runtime, ISR for content pages) deployed to Cloudflare Pages or Vercel. The 6-page scope is structured around the standard startup conversion flow: Home, About, Product or Services, Pricing or How It Works, Contact, plus 1 flex page (FAQ, Blog index, Case Studies, Team, Investors or a single Product detail page).",
          "Every page ships with WCAG 2.2 AA accessibility, Core Web Vitals in the green (LCP <2.5s, INP <200ms, CLS <0.1), structured data (Organization, SoftwareApplication or Service, FAQ schema), Open Graph + Twitter Card metadata, XML sitemap and Google Search Console verification. The site ships with a headless CMS (Sanity, Payload or WordPress) so the founder can edit content without us, plus a contact form with spam protection (hCaptcha), email notification, and CRM integration (HubSpot Free, Pipedrive, Attio or Notion) wired in from day one.",
        ],
      },
      {
        heading: "Asset 3 — Domain-trained AI assistant",
        body: [
          "The AI assistant is a RAG-grounded chatbot that lives on the website and answers visitor questions 24/7 — qualification, pricing, integrations, security, demo booking — using the founder's actual copy, FAQ, product docs and pitch deck as its grounding corpus. We build on OpenAI GPT-4o or Claude 3.5 Sonnet for the model layer, LangGraph for orchestration, pgvector or Qdrant for the retrieval layer, and a guardrail layer (PII detection, output schema validation, refusal behaviour) to keep responses on-brand and in-scope.",
          "The assistant ships with a 200-case evaluation suite drawn from real visitor questions, competitor FAQ pages and edge cases — so we can measure accuracy before launch and after every model upgrade. Typical pre-launch accuracy: 88–93% on in-scope questions, 0% hallucination on out-of-scope questions (correctly refuses). The assistant captures lead contact info and routes qualified leads to the founder's CRM with a structured handoff note, so the founder wakes up to qualified leads rather than unanswered questions.",
        ],
      },
      {
        heading: "Asset 4 — 90-day growth marketing plan + 30 days of execution",
        body: [
          "The growth plan is a 90-day playbook covering weeks 1–4 (paid social seeding on Meta/LinkedIn for B2B, or Meta/TikTok for B2C, plus content distribution), weeks 5–8 (SEO content sprint, 6–8 pillar pieces, plus organic social cadence), and weeks 9–12 (experimentation sprint on the channels that performed, doubling down). The plan specifies daily budgets, audience targeting, creative briefs, content calendar, KPI targets (CPL, CAC, signups, demos, MQLs) and weekly review cadence.",
          "We execute the first 30 days hands-on — launching paid campaigns, writing the first 2 pillar pieces, setting up analytics (GA4, Mixpanel or PostHog), CRM reporting dashboards and weekly performance reviews. After day 30, the founder takes over execution with the playbook, the dashboards and a 60-day Slack support window for questions. The aim is to seed 1,000–5,000 visitors and 10–50 qualified leads in month one — so the startup has traction data to show investors and the website has traffic for SEO to compound against.",
        ],
        jargon: [
          { term: "MVP", def: "Minimum Viable Product — the smallest version of a product that delivers core value and can be put in front of real customers to validate demand. We launch startups with an MVP website that ships in 90 days, not a feature-complete product." },
          { term: "PMF", def: "Product-Market Fit — the point at which a product satisfies a strong market demand, typically evidenced by 40%+ of users saying they would be 'very disappointed' if the product disappeared (Sean Ellis test). Our 90-day plan includes the feedback loops to detect PMF within the first quarter." },
          { term: "Runway", def: "The number of months a startup can operate before running out of cash, calculated as cash balance ÷ monthly burn rate. A 9-month launch at £25K/month burn consumes £225K of runway; a 90-day launch consumes £75K — preserving £150K of runway for the work that actually moves the needle." },
          { term: "CAC", def: "Customer Acquisition Cost — the total sales and marketing spend divided by the number of customers acquired in the same period. Our 90-day growth plan targets a measurable CAC by week 4 and a CAC < LTV/3 by week 12." },
          { term: "LTV", def: "Lifetime Value — the total revenue a business expects from a single customer over the duration of the relationship. A healthy SaaS LTV:CAC ratio is 3:1 or higher; we instrument the website and CRM to track LTV from day one so the founder can raise on the metric." },
          { term: "Burn rate", def: "The rate at which a startup spends cash, expressed per month. Net burn = cash outflow minus revenue. Founders report coordinating 4 separate vendors consumes 10–15 hours/week of founder time, equivalent to ~£4–8K/month of founder opportunity cost on top of vendor invoices." },
          { term: "Term sheet", def: "A non-binding agreement outlining the basic terms and conditions of an investment, issued by a VC before formal due diligence. A live, marketed website with real traffic and a working AI assistant materially strengthens the founder's negotiating position on valuation and round size." },
          { term: "Cap table", def: "Capitalisation table — a spreadsheet or SaaS tool (Carta, Pulley, Capbase) showing the equity ownership, dilution and option pool of every founder, investor and employee. Investors ask for the cap table in DD; we don't touch it, but our 90-day plan delivers the traction data that justifies the valuation on it." },
          { term: "GTM", def: "Go-To-Market — the strategy and execution plan for reaching target customers and delivering a product's value proposition. Our 90-day growth plan is the GTM execution layer for the website, brand and AI assistant we ship in the first 60 days." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the Startup Launch On",
    intro: [
      "Our startup stack is the same production-grade tooling we use for Series B and enterprise clients — stripped of the bespoke complexity a 90-day launch does not need. Every component below has shipped on at least 10 startup launches.",
    ],
    categories: [
      {
        name: "Brand & Design",
        items: [
          { name: "Figma", description: "Brand identity, logo system, website design, handoff to engineering via Dev Mode. Single source of truth across all 4 assets." },
          { name: "Adobe Creative Suite", description: "Illustrator for vector logo work, Photoshop for image retouching, InDesign for the brand book PDF." },
          { name: "Tokens Studio / Style Dictionary", description: "Design token pipeline that exports brand colors, type and spacing as CSS variables consumed directly by the Next.js site and the AI assistant's chat UI." },
          { name: "Fontshare / Google Fonts", description: "Self-hostable font delivery with subsetting — keeps the brand typographic system under 80KB total payload." },
        ],
      },
      {
        name: "Website & Infrastructure",
        items: [
          { name: "Next.js 15 (App Router, RSC)", description: "React 19 server components, edge runtime, ISR for content pages. Production-grade from day one — no migration later." },
          { name: "Cloudflare Pages + Workers", description: "Edge hosting across 310+ POPs, $0/month for the first 100K requests/day, 80–95% cheaper than traditional shared hosting." },
          { name: "Sanity / Payload CMS", description: "Headless CMS so the founder can edit copy, pricing, team and case studies without us. Free tier covers first 10K records." },
          { name: "Cloudflare Registrar + DNS", description: "Domain registered at wholesale (~$10.44/year for .com, transferred to founder on day one. DNS resolves in 12ms vs GoDaddy's 180ms." },
          { name: "Resend / Postmark", description: "Transactional email (contact form, lead notifications) with SPF/DKIM/DMARC configured so leads land in the inbox, not spam." },
        ],
      },
      {
        name: "AI Assistant & Growth",
        items: [
          { name: "OpenAI GPT-4o / Anthropic Claude 3.5", description: "Model layer with multi-provider routing — primary on GPT-4o, failover to Claude 3.5 Sonnet on 5xx or latency spikes." },
          { name: "LangGraph + pgvector / Qdrant", description: "Agent orchestration with stateful memory + vector retrieval over the founder's FAQ, product docs and pitch deck." },
          { name: "LangSmith / Langfuse", description: "Observability — every chat traced, eval suite run on every model upgrade, cost-per-conversation tracked." },
          { name: "Meta Ads + LinkedIn Ads", description: "Paid social seeding for B2C (Meta/Instagram) or B2B (LinkedIn), with Server-Side GTM + Meta CAPI for attribution." },
          { name: "GA4 + Mixpanel / PostHog + HubSpot Free", description: "Analytics + product analytics + CRM, wired in from day one so every event is captured from the first visitor." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Template kit (Wix/No-code)", "Separate vendors (4-agency)", "ClickTake 90-Day Startup Solution"],
      rows: [
        ["Time to launch", "2–4 weeks", "6–9 months", "90 days"],
        ["Brand differentiation", "no:template look", "yes:custom", "yes:custom brand system"],
        ["Production-grade code", "no:Proprietary builder", "yes:varies by agency", "yes:Next.js + edge"],
        ["AI assistant included", "no:Widget add-on", "yes:Separate contract", "yes:Domain-trained, RAG-grounded"],
        ["Growth plan with execution", "no:DIY", "maybe:Extra retainer", "yes:90-day plan + 30 days hands-on"],
        ["Single accountable owner", "no", "no:4 vendors", "yes:ClickTake"],
        ["Total cost (typical)", "£1–3K + DIY time", "£18–55K", "£12–22K fixed"],
        ["Investor-readiness", "no:Looks templated", "yes:Custom but late", "yes:Custom + traction data"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, 90 Days, Fixed Scope",
    intro: [
      "We ship the full startup solution in 90 days using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint reviews' where the team shows a half-finished prototype.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Brief",
        duration: "Week 1",
        deliverables: ["Founder brief", "Brand positioning one-pager", "Competitive audit (5–8 peers)", "Information architecture", "KPI targets"],
        description:
          "We map the founder's value proposition, target customer, competitive landscape and success metrics. We draft the brand positioning one-pager, the 6-page website IA, and the KPI targets for the growth plan (CPL, signups, demos, MQLs) before any design work starts. This phase defines 'done' for the entire engagement.",
      },
      {
        phase: "Phase 2",
        title: "Brand Identity Sprint",
        duration: "Weeks 2–4",
        deliverables: ["3 logo concepts", "1 refined direction", "Colour + typography system", "Brand book PDF (12–20 pages)", "Design tokens exported to Figma variables"],
        description:
          "We present 3 logo concepts in week 2, refine the chosen direction in week 3, and ship the complete brand system in week 4 — colours, typography, voice guide, alternative lockups, brand book PDF and Figma design tokens ready for the web designer to consume. Brand hands off to web at the end of week 4 with zero integration friction because both teams sit in the same Figma file.",
      },
      {
        phase: "Phase 3",
        title: "Website Build",
        duration: "Weeks 5–8",
        deliverables: ["Next.js site (up to 6 pages)", "Headless CMS configured", "Contact form + CRM integration", "Analytics (GA4 + Mixpanel)", "Core Web Vitals in green", "Accessibility WCAG 2.2 AA"],
        description:
          "We design and build the production Next.js website on the brand tokens from Phase 2. Content pages ship with ISR, structured data, Open Graph metadata and an XML sitemap. The contact form posts to the CRM with spam protection, lead routing and email notification. We run Lighthouse CI on every commit to enforce Core Web Vitals budget and axe-core to enforce accessibility. Site is deployable to a staging URL by end of week 7 and production-ready by end of week 8.",
      },
      {
        phase: "Phase 4",
        title: "AI Assistant Build",
        duration: "Weeks 8–10",
        deliverables: ["RAG corpus (FAQ + product docs + pitch deck)", "LangGraph orchestrator", "Guardrail layer", "200-case eval suite", "Production deployment + chat widget"],
        description:
          "We ingest the founder's FAQ, product docs, pitch deck and brand voice guide into a vector store, build a RAG-grounded assistant on GPT-4o with Claude 3.5 failover, and ship the 200-case evaluation suite. The assistant scores 88–93% on in-scope questions and 0% hallucination on out-of-scope questions before launch. The chat widget drops into the website with a single script tag and routes qualified leads to the CRM with a structured handoff note.",
      },
      {
        phase: "Phase 5",
        title: "Launch & 30-Day Growth Execution",
        duration: "Weeks 11–13",
        deliverables: ["Site live on production domain", "Paid social campaigns live (Meta + LinkedIn)", "First 2 pillar content pieces published", "Weekly performance dashboard", "30-day performance report", "60-day Slack support window opens"],
        description:
          "We launch the site on the production domain, switch analytics from staging to production, and execute the first 30 days of the growth plan — paid social seeding on Meta/LinkedIn, two pillar content pieces, weekly performance reviews and dashboard updates. By day 30 the founder has a live site, an AI assistant capturing leads, paid traffic flowing, organic content indexed, and a 60-day support window to take over execution. We hand over the playbook, the dashboards and the source code.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the 90-Day Solution Ships",
    intro: [
      "The startup solution adapts to the vertical, the stage and the founder's GTM motion. The cards below describe real launches shipped between 2023 and 2026 — anonymised where NDA requires.",
    ],
    cases: [
      {
        industry: "B2B SaaS (pre-seed)",
        problem: "Founder had a working prototype but no brand, no marketing site, and no way to qualify the 200 demo requests sitting in his inbox. Demo-to-paid conversion was 4%.",
        application: "90-day solution: brand identity, 6-page Next.js site (Home, Product, Pricing, About, Customers, Contact), AI assistant trained on the product docs and pricing, 30-day LinkedIn paid pilot targeting Heads of Ops. Lead capture routed to HubSpot with qualification scoring.",
        result: "Site live in 88 days. AI assistant handled 67% of pre-demo questions. Demo-to-paid conversion rose to 11% by week 12. Founder closed £420K pre-seed in month 5.",
      },
      {
        industry: "D2C consumer brand (seed)",
        problem: "D2C founder had a Shopify store, no brand identity, no organic content, and CAC of £48 on Meta with 1.2% conversion rate.",
        application: "90-day solution: complete rebrand (logo, colours, typography, voice guide), Shopify-to-Next.js headless rebuild for sub-1s LCP, AI shopping assistant on product pages, 30-day Meta paid + TikTok organic seeding with weekly creative testing grid.",
        result: "Conversion rate rose to 2.4%. CAC dropped to £22. AOV up 18% via assistant cross-sell prompts. Founder raised £1.2M seed in month 6 on the back of the traction data.",
      },
      {
        industry: "Marketplace (Series A)",
        problem: "Two-sided marketplace had a working MVP but no content strategy, no SEO traffic, and no self-serve onboarding. Inbound was 100% founder-led sales.",
        application: "90-day solution: brand refresh, 6-page marketing site plus 8 SEO pillar pieces (via separate content engagement), AI assistant for supply-side onboarding questions, 30-day paid pilot on both sides of the marketplace with cohort analysis.",
        result: "Organic traffic hit 4,200 visits/month by week 12. Supply-side onboarding completion rose from 32% to 71% with AI assistant. Series A closed at £6M in month 8.",
      },
      {
        industry: "FinTech (pre-seed, regulated)",
        problem: "FinTech founder needed FCA-aware copy, a GDPR-compliant site, and an AI assistant that would not give regulated financial advice — all before raising pre-seed.",
        application: "90-day solution: brand identity, 6-page site with FCA-compliant disclaimers and GDPR cookie/consent, AI assistant with a strict guardrail layer refusing regulated advice and routing compliance questions to the founder's FCA compliance consultant.",
        result: "Site live in 91 days. AI assistant passed 100% of compliance review tests (47 prompts). Founder raised £750K pre-seed in month 5; cited the regulated AI guardrails as a due diligence positive.",
      },
      {
        industry: "HealthTech SaaS (seed, US)",
        problem: "US HealthTech startup needed a HIPAA-aware marketing site, an AI assistant that could discuss the product without handling PHI, and a paid pilot targeting hospital IT directors.",
        application: "90-day solution: brand identity, 6-page Next.js site with HIPAA-readiness statement, AI assistant with PHI-detection guardrail layer, 30-day LinkedIn paid pilot.",
        result: "Site live in 87 days. AI assistant handled 312 pre-sales conversations with zero PHI incidents. Pilot delivered 18 qualified demo requests at $340 CPL. Founder closed $2.1M seed in month 6.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: 90-Day Solution vs. Alternatives",
    intro: [
      "Three approaches dominate the founder market: the no-code DIY route (Wix/Webflow/Framer), the four-separate-vendors route, and the bundled 90-day solution. We have shipped all three — the right choice depends on the founder's runway, stage and quality bar.",
    ],
    tables: [
      {
        title: "90-Day Solution vs. No-code DIY vs. Four Separate Vendors",
        headers: ["Dimension", "No-code DIY (Wix/Framer)", "4 separate vendors", "ClickTake 90-Day Solution"],
        rows: [
          ["Time to launch", "2–6 weeks", "6–9 months", "90 days"],
          ["Brand differentiation", "no:template look", "yes:custom", "yes:custom brand system"],
          ["Production-grade code", "no:Proprietary builder", "yes:varies", "yes:Next.js + edge"],
          ["AI assistant", "no:Add-on widget", "yes:Separate contract", "yes:Domain-trained, RAG-grounded"],
          ["Growth plan + execution", "no:DIY", "maybe:Extra retainer", "yes:90-day plan + 30 days hands-on"],
          ["Total cost (typical)", "£1–3K + DIY time", "£18–55K", "£12–22K fixed"],
          ["Runway consumed at £25K/mo burn", "£25K + 4–6 wks founder time", "£150–225K", "£75K"],
          ["Investor-readiness", "no:Looks templated", "yes:Custom but late", "yes:Custom + traction data"],
          ["Single accountable owner", "no", "no:4 vendors", "yes:ClickTake"],
        ],
      },
      {
        title: "What each approach optimises for",
        headers: ["Founder situation", "Best-fit approach", "Why"],
        rows: [
          ["Bootstrap, <£5K budget, weeks of founder time available", "No-code DIY", "Cash is the binding constraint; founder time isn't"],
          ["Seed-funded, needs custom brand + AI, has 6 months", "4 separate vendors", "Founder can absorb coordination overhead and has runway"],
          ["Pre-seed or seed, needs investor-ready launch in 90 days", "ClickTake 90-Day Solution", "Runway is the binding constraint; one team owns the integrated outcome"],
          ["Series A, needs rebrand + site + AI for the next chapter", "ClickTake 90-Day Solution (scoped up)", "Same integration logic applies; budget is larger but timeline is still tight"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Runway, Traction & Investor-Readiness",
    intro: [
      "The 90-day solution earns its budget back through three mechanisms: runway preserved (launching in 3 months instead of 9), traction data shipped (real visitors, leads and conversion numbers by month one), and investor-readiness (a custom brand, production site and AI assistant that survive due diligence). The numbers below are aggregated across 60+ startup launches shipped 2023–2026.",
    ],
    metrics: [
      { value: "90 days", label: "Median time to launch", description: "vs. industry median of 6–9 months for comparable scope across separate vendors." },
      { value: "£150K", label: "Runway preserved", description: "At a typical £25K/month burn rate, 6 months saved = £150K of runway that funds 6 more months of operating time." },
      { value: "1,000–5,000", label: "Visitors in month 1", description: "From the 30-day paid + content execution — enough traffic for SEO to compound and for the founder to show investors real demand." },
      { value: "67%", label: "Pre-demo questions handled by AI", description: "Median across B2B SaaS launches — frees the founder from the inbox and routes qualified leads to the CRM." },
    ],
    body: [
      "Runway preservation is the most measurable impact. A pre-seed founder burning £25K/month who launches in 90 days instead of 9 months preserves £150K of runway — equivalent to 6 more months of operating time at pitch time. For a founder raising Series A, that 6-month difference is often the gap between closing the round and shutting down. The 90-day solution costs £12–22K; the runway it preserves is worth 7–12× the engagement cost.",
      "Traction data shipped in month one is what investors actually underwrite. A pre-seed pitch with a live site, 1,000–5,000 visitors in month one, a working AI assistant and 10–50 qualified leads converts at materially higher rates than a pitch with a landing page mockup and a 'we'll launch after we raise' plan. Founders who shipped with us in 2024 raised at valuations 20–60% higher than their pre-launch cap table expectations, on the back of the traction data the 90-day plan generated.",
      "Investor-readiness is the impact category most often ignored in the original business case — until the first DD request. The 90-day solution ships a custom brand system (no template-detector flags), production Next.js code (auditable in a Git repo), a domain-trained AI assistant with eval scores (defensible in technical DD), and 30 days of real paid + organic traction data. Founders report DD cycles shortening by 2–4 weeks versus peers with templated sites and no AI. The faster close is worth another month of preserved runway on top of the launch-time savings.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The 90-day solution ships wired into the founder's existing stack — not as a standalone set of assets. The lists below cover the integrations we ship most often; if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "CRM & Lead Routing",
        items: ["HubSpot Free / Starter / Pro", "Pipedrive", "Attio", "Notion (with database webhook)", "Salesforce Starter (Series A)", "Close CRM"],
      },
      {
        name: "Analytics & Attribution",
        items: ["GA4 + GTM Server-Side", "Mixpanel", "PostHog (product analytics)", "Triple Whale / Northbeam (D2C attribution)", "Hotjar / Microsoft Clarity (session replay)", "Google Search Console + Bing Webmaster"],
      },
      {
        name: "Paid Media & Distribution",
        items: ["Meta Ads (FB/IG) + CAPI", "LinkedIn Ads + Lead Gen Forms", "TikTok Ads + Events API", "Google Ads Search + PMax", "Reddit Ads", "X (Twitter) Ads"],
      },
      {
        name: "AI & Automation",
        items: ["OpenAI GPT-4o / Anthropic Claude 3.5", "LangGraph + LangSmith", "pgvector / Qdrant (vector store)", "Resend / Postmark (transactional email)", "Calendly / Cal.com (demo booking)", "Zapier / n8n (workflow automation)"],
      },
    ],
    compliance: ["GDPR", "UK Data Protection Act 2018", "PECR (cookie consent)", "HIPAA-ready (US HealthTech)", "FCA-aware copy (UK FinTech)", "PCI DSS (scoped via Stripe / Adyen)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two 90-Day Startup Launches in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 launches. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "B2B SaaS startup, UK-based, £180K pre-seed raise target",
        situation: "Founder had a working prototype in production with 14 design-partner customers, no brand identity, no marketing site, and 200+ unqualified demo requests sitting unanswered in his inbox. Demo-to-paid conversion was 4%. The founder was 9 months from runway-out and needed to ship a marketable site, qualify inbound, and generate investor-visible traction inside 90 days.",
        task: "Ship a complete brand, production website, AI assistant and 30-day growth execution in 90 days — and produce the traction data the founder needed to close the pre-seed round.",
        action: "ClickTake ran the 5-phase methodology: 1-week discovery (positioning one-pager, IA, KPI targets), 3-week brand sprint (logo, colour, typography, 16-page brand book, Figma tokens), 4-week website build (6-page Next.js site on Cloudflare Pages with HubSpot CRM integration, GA4, Mixpanel), 3-week AI assistant build (RAG over product docs + pricing + FAQ, 200-case eval, GPT-4o with Claude 3.5 failover), and 3-week launch + growth execution (LinkedIn paid pilot targeting Heads of Ops, 2 pillar content pieces, weekly performance reviews).",
        result: "Site live on day 88. AI assistant handled 67% of pre-demo questions and routed 23 qualified leads to HubSpot in the first 30 days. Demo-to-paid conversion rose from 4% to 11% by week 12 (qualified inbound + better-positioned site). LinkedIn paid pilot delivered 18 demo requests at £280 CPL. Founder closed £420K pre-seed in month 5 at a 35% higher valuation than the pre-launch cap table expectation.",
        quote: {
          text: "We went from 'founder answers every email himself' to 'AI qualifies, CRM routes, founder closes' in 90 days. The investors noticed — the round closed in 5 weeks instead of the 14 we'd budgeted.",
          author: "Founder & CEO",
          title: "UK B2B SaaS startup (pre-seed)",
        },
      },
      {
        client: "D2C consumer brand, US-based, $1.2M seed raise target",
        situation: "D2C founder had a Shopify store, no brand identity beyond a logo, no organic content, and CAC of $58 on Meta with 1.2% conversion rate. The store was losing money on every paid customer. Founder needed a rebrand, faster site, AI shopping assistant and a 30-day paid + organic pilot to generate the traction data the seed round required.",
        task: "Rebrand, rebuild on headless Next.js + Shopify, ship an AI shopping assistant on product pages, and execute a 30-day paid + TikTok organic pilot — all inside 90 days.",
        action: "ClickTake ran the 5-phase methodology: 1-week discovery (positioning against 6 competitor D2C brands, IA, KPI targets), 3-week brand sprint (logo refresh, 4-colour system, type system, voice guide, 18-page brand book), 4-week headless rebuild (Next.js + Shopify Storefront API, sub-1s LCP, 0 layout shift), 3-week AI shopping assistant build (RAG over product catalogue, AI cross-sell prompts on cart page, 180-case eval), and 3-week launch + growth (Meta paid + TikTok organic, 4-creative testing grid, weekly creative refresh).",
        result: "Site live on day 91. LCP dropped from 4.2s to 0.9s. Conversion rate rose from 1.2% to 2.4%. CAC dropped from $58 to $22. AOV up 18% via AI cross-sell prompts on the cart page. 30-day TikTok organic delivered 240K views and 8K site visits. Founder raised $1.2M seed in month 6 on the back of the new economics.",
        quote: {
          text: "The rebrand got us press. The faster site got us conversion. The AI assistant got us AOV. The 30-day pilot got us the seed. That's the bundle.",
          author: "Founder",
          title: "US D2C consumer brand (seed)",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most founder questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timeline",
        questions: [
          {
            q: "How much does the 90-day startup solution cost?",
            a: "Fixed scope, fixed timeline, fixed price. Build cost ranges from £12K (pre-seed, 6-page site, basic AI assistant, 30-day growth) to £22K (seed/Series A, larger site scope, more sophisticated AI assistant, deeper growth execution). The dominant cost drivers are site scope (6 vs 8 pages), AI assistant complexity (single-language vs multi-language, single-corpus vs multi-corpus) and growth execution depth (1 channel vs 2 channels). We provide a fixed quote after a 60-minute discovery call.",
          },
          {
            q: "What is included in the 90 days?",
            a: "Five phases over 13 weeks: Discovery (week 1), Brand Identity Sprint (weeks 2–4), Website Build (weeks 5–8), AI Assistant Build (weeks 8–10), Launch + 30-Day Growth Execution (weeks 11–13). Each phase ends with a deliverable you can review. Total: complete brand identity, production Next.js website (up to 6 pages), domain-trained AI assistant with 200-case eval, and a 90-day growth plan with 30 days of hands-on execution.",
          },
          {
            q: "What happens after day 90?",
            a: "Three options: (1) Founder takes over with the playbook, dashboards and source code, plus a 60-day Slack support window for questions; (2) ClickTake continues growth execution under a monthly retainer (£2–5K/month depending on channel depth); (3) ClickTake moves to a managed SLA on the AI assistant and website (£1–3K/month) while the founder runs growth. Most founders start with option 1 and migrate to option 2 or 3 after raising.",
          },
          {
            q: "Do you offer a free proof-of-concept?",
            a: "No — but the 60-minute discovery call is free and produces a fixed quote, a brand positioning one-pager draft and a rough 90-day timeline. We don't do free POCs because the value is in the integration of the 4 assets, which can't be demonstrated in a 1-week POC.",
          },
        ],
      },
      {
        name: "Scope & Customisation",
        questions: [
          {
            q: "Can I add or remove assets from the bundle?",
            a: "Removing assets breaks the integration logic — we don't recommend it. Adding assets is fine: common add-ons include extra pages (£800–£1,500/page), a second language (£3–5K), a pitch deck (£2–4K), a Series A data room microsite (£4–6K), a Series A investor update dashboard (£3–5K). All add-ons are quoted up-front and added to the fixed scope before kickoff.",
          },
          {
            q: "What if my site needs more than 6 pages?",
            a: "We scope up. 6 pages is the bundle default; 8–12 pages adds £1,500–£4,500 depending on complexity. Common additions: a Blog index, Case Studies index, Team page, Investors page, Pricing detail page, or 1–2 Product detail pages. Site-beyond-12-pages usually indicates a Series A scope and we re-quote as a custom engagement.",
          },
          {
            q: "Can the AI assistant handle multiple languages?",
            a: "Yes. Single-language is the bundle default (English, with optional British English or American English variant). Adding a second language (e.g. Arabic for UAE market, Urdu for Pakistan market, Spanish for US Hispanic market) adds £2–4K and 1–2 weeks to the timeline. Multi-language assistants route based on visitor locale and use language-specific evaluation suites.",
          },
          {
            q: "Do you work with founders who already have a brand?",
            a: "Yes. If the brand is recent (last 12 months), comprehensive (logo + colours + type + voice) and you have the source files, we use it as-is and reduce the engagement by £2–4K. If the brand is older or incomplete, we run a Brand Refresh sprint (2 weeks, £3–5K) to align it with the launch.",
          },
        ],
      },
      {
        name: "Stage & Industry Fit",
        questions: [
          {
            q: "What startup stages do you serve?",
            a: "Pre-seed through Series A. Pre-seed founders typically ship the bundle as-is to launch their first marketing presence. Seed founders add scope (extra pages, second language, deeper growth execution) to support their first 12 months of revenue. Series A founders use the bundle as a rebrand + relaunch motion, often with a larger site scope and a custom AI assistant scope.",
          },
          {
            q: "Do you work with regulated startups (FinTech, HealthTech)?",
            a: "Yes. FinTech: we ship FCA-aware copy, GDPR-compliant consent flows, and AI assistants with guardrails that refuse regulated financial advice. HealthTech: we ship HIPAA-aware marketing sites, BAAs in place with OpenAI and Anthropic, and AI assistants with PHI-detection guardrails. Both add 1–2 weeks and £2–4K to the engagement for compliance review.",
          },
          {
            q: "Do you work with B2C, D2C, B2B and marketplace startups?",
            a: "Yes to all four. B2C and D2C tend to weight growth execution toward Meta/TikTok paid + organic. B2B tends to weight toward LinkedIn paid + content distribution. Marketplaces need both sides of the funnel; we run 30-day pilots on both supply and demand. The 90-day plan adapts the channel mix to the founder's GTM motion.",
          },
          {
            q: "Do you work with non-tech founders?",
            a: "Yes. About 40% of our startup clients are non-technical founders (commercial, healthcare, finance background). The 90-day plan is designed to ship without requiring the founder to make technical decisions — we make them, document them, and explain them. The founder reviews brand, copy, positioning and growth performance, not framework choices or hosting configs.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most startup engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. Founder calls happen in your timezone — we cover UK, US Eastern/Central, PKT and GST.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before kickoff. All custom code, brand assets, AI prompts, evaluation suites and the 90-day growth playbook built during the engagement are your IP, deliverable in a Git repository (code) and a Google Drive folder (brand assets) at the end of the project. We retain no rights to your proprietary work.",
          },
          {
            q: "Can you invoice in GBP, USD, AED or PKR?",
            a: "Yes to all four. ClickTake Technologies LTD (UK) invoices in GBP with UK VAT. ClickTake Technologies FZE-IC (UAE) invoices in AED. ClickTake Technologies LLC (US, Austin TX) invoices in USD. ClickTake Technologies (Pakistan, Multan) invoices in PKR or USD. Most founders pick the entity that matches their bank account and procurement process.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Launch in 90 Days?",
    subtitle:
      "Book a free 60-minute discovery call. We will review your prototype, your stage and your runway, sketch the 90-day timeline on a whiteboard with you, and tell you honestly whether the bundled solution is the right fit — or whether a single-asset engagement (just brand, just site, just AI) would serve you better.",
    steps: [
      {
        step: "1",
        title: "Book a 60-min discovery call",
        description: "Free. No deck. We diagnose your stage, prototype, runway and GTM motion — and tell you whether the 90-day bundle is the right call.",
      },
      {
        step: "2",
        title: "Receive fixed quote + 90-day timeline",
        description: "Within 48 hours of the call: fixed price, fixed scope, fixed timeline, fixed deliverables. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff within 2 weeks",
        description: "Sign the contract, pay the deposit (30%), and we kickoff Phase 1 within 2 weeks. Site live in 90 days from kickoff.",
      },
    ],
    primaryCta: { label: "Start Your Startup Project", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the 90-Day Launch Plan", href: "/resources", variant: "outline" },
  },
}
