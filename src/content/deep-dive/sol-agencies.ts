import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/agencies — For Agencies
 *
 * Marketing, design and dev agencies needing white-label engineering, AI
 * and design — under their brand, with their email, your reports, your
 * margins, at capacity you couldn't staff in-house. ~2,500 words across
 * the 12-section blueprint.
 */
export const agenciesSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For Agencies",
    title: "White-Label Engineering, AI and Growth — Under Your Brand",
    subtitle:
      "White-label web development, AI automation, SEO and content production for marketing, design and dev agencies in the UK, Pakistan, USA and Dubai. We deliver under your brand, with your email, your reports and your margins — at a capacity you could not staff in-house.",
    geoDefinition:
      "An agency white-label solution is a B2B-for-B2B engagement where ClickTake Technologies supplies senior engineering, design, AI and growth execution capacity to marketing, design or development agencies — delivered under the agency's brand, with the agency's email domain, the agency's reporting templates, and the agency's client-facing relationship intact. Unlike staff augmentation or freelance contractors, a white-label solution ships behind an NDA + IP assignment agreement, with dedicated Slack channel + weekly standups + monthly capacity planning, at wholesale rates 40–60% below the agency's client billing rate — enabling the agency to take on engineering-heavy or AI-heavy work that would otherwise be declined or outsourced to non-accountable contractors. ClickTake Technologies delivers white-label capacity to agencies across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), on a stack of Next.js, React, Node, Python, OpenAI/LangGraph, Figma and Ahrefs/Semrush.",
    character: "solution-detail",
    ctas: [
      { label: "Become a White-Label Partner", href: "/contact", variant: "orange" },
      { label: "Download the Agency Partnership Pack", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "+5", label: "Engineers capacity (typical partner)" },
      { value: "+40–60%", label: "Margin on engineering work" },
      { value: "Senior", label: "Engineer quality (5+ years)" },
      { value: "Yours", label: "Brand · email · reports · client" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For Agencies", href: "/solutions/agencies" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Agencies Decline 30% of Won Pitches on Capacity + Skill Gaps",
    intro: [
      "A UK or US marketing agency that wins 10 pitches in a quarter typically declines 3 of them — not because the work isn't profitable, but because they cannot staff it. Senior Next.js engineers command £90–140K in London or $140–200K in Austin; the agency's hourly billing rate (£120–180/hr UK, $180–250/hr US) barely covers a senior engineer's loaded cost after agency overhead. AI specialists (LLM fine-tuning, RAG systems, agent orchestration) are even harder to hire — the global supply is constrained and the salary expectations exceed what most agencies can pay.",
      "The deeper problem is margin. Engineering work billed at £120/hr and delivered by a £110K-loaded-cost engineer produces 8–15% gross margin — barely break-even after sales commission, account management and revision cycles. The same work delivered by a ClickTake senior engineer under white-label at £55/hr produces 54% gross margin. The agency either takes the work at thin margin (and risks losing money on revisions) or declines the work and loses the client relationship entirely. White-label solves both — capacity and margin — without the agency hiring a single FTE.",
    ],
    painPoints: [
      {
        title: "Cannot hire senior engineers or AI specialists fast enough",
        description:
          "A typical UK agency hiring cycle for a senior Next.js engineer is 14–22 weeks (advertise → screen → interview → offer → notice period → start). AI specialist roles take 22–34 weeks. By the time the hire starts, the client opportunity is gone. White-label capacity is available within 2 weeks of signed partnership — no hiring cycle.",
      },
      {
        title: "Margins on engineering work are too thin in-house",
        description:
          "Engineering work delivered by a £110K-loaded-cost UK senior engineer billed at £120–180/hr produces 8–15% gross margin. The same work delivered by a ClickTake senior engineer at £55/hr wholesale produces 54% gross margin — 4–6× the in-house margin. The margin differential is what makes white-label economically rational.",
      },
      {
        title: "Quality control is inconsistent with cheap offshore contractors",
        description:
          "Agencies that tried cheap offshore contractors (£15–25/hr India, Philippines, Pakistan) report 40–60% project revision rates, missed deadlines, and quality issues that destroyed the agency's client relationship. White-label at senior-engineer rates (£45–75/hr) produces 5–12% revision rates and senior-level quality — the difference between a contractor and a partner.",
      },
      {
        title: "Capacity is feast-or-famine; FTEs are too rigid",
        description:
          "Agency work is project-based — 12 weeks of intense demand followed by 6 weeks of low demand. Hiring FTEs for peak capacity leaves them under-utilised in troughs; hiring for trough capacity leaves the agency declining work in peaks. White-label capacity scales up in 2 weeks and down in 2 weeks — perfectly elastic.",
      },
    ],
    paradigmShift: [
      "Agency white-label is not staff augmentation or freelance contracting — it is a B2B partnership where ClickTake becomes the agency's engineering + AI + design back-office, invisible to the agency's clients. The deliverable is not 'a contractor who writes code'; it is senior-engineer capacity at wholesale rates, behind an NDA + IP assignment, with dedicated Slack + weekly standups + monthly capacity planning, fully white-labeled under the agency's brand. The agency keeps the client relationship, the client-facing communication, and the margin; ClickTake delivers the work.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the Agency White-Label Solution?",
    intro: [
      "The agency white-label solution is a partnership engagement where ClickTake supplies senior engineering, design, AI and growth execution capacity to an agency — under the agency's brand, with the agency's client-facing communication, at wholesale rates 40–60% below the agency's billing rate.",
    ],
    subsections: [
      {
        heading: "Layer 1 — White-label engineering capacity",
        body: [
          "Senior engineers (5+ years experience) on Next.js, React, Node.js, Python, Postgres, GraphQL, AWS/GCP/Azure. Available in 2-week onboarding cycles from signed partnership. Engineers work in the agency's Slack workspace (under agency-branded handles if required), use the agency's project management tools (Asana, Linear, Jira, ClickUp, Notion), commit to the agency's Git repositories, and attend the agency's weekly client standups under the agency's brand. Engineering scopes: marketing site builds, web app builds, SaaS platform builds, e-commerce storefronts, headless commerce integrations, custom software, API integrations, performance optimisation, accessibility remediation, LLM/AI feature engineering.",
          "Capacity model: dedicated engineers (full-time allocation to one agency, 160 hrs/month) or shared engineers (allocated across multiple agency projects, 40–120 hrs/month). Dedicated engineers are reserved for high-volume agency partners (typically agencies shipping 4+ concurrent projects); shared engineers suit agencies with variable workload. Capacity is contracted monthly with 2-week flex (scale up or down with 2 weeks' notice). All work ships with code review by a second ClickTake senior engineer before delivery to the agency.",
        ],
      },
      {
        heading: "Layer 2 — White-label AI + design capacity",
        body: [
          "AI capacity: LLM fine-tuning, RAG system builds, chatbot + conversational agent builds, agent orchestration (LangGraph, CrewAI, AutoGen), AI automation workflows (n8n, Zapier, custom), AI feature engineering for client SaaS products. Engineers fluent in OpenAI GPT-4o, Anthropic Claude 3.5, Llama 3.1, Mistral, plus vLLM, LangSmith, pgvector, Qdrant. AI scopes ship with 200+ case evaluation suites as standard — the agency can show clients measurable AI quality, not vibes.",
          "Design capacity: senior UI/UX designers on Figma + FigJam. Design scopes: design systems (component libraries, design tokens, Storybook handoff), marketing site design (3–4 breakpoints, 6–9 interaction states), product design (dashboards, mobile apps, internal tools), brand identity (logo, colour, typography, voice guide, brand book), creative (paid social static + motion, video editing, presentation design). Design ships with Dev Mode handoff (Figma variables → CSS / Tailwind tokens) so the agency's engineering team can implement without translation friction.",
        ],
      },
      {
        heading: "Layer 3 — White-label growth + reporting",
        body: [
          "Growth capacity: SEO (technical audits, content briefs, link building, local SEO), paid media (Google Ads, Meta, LinkedIn, TikTok), content production (blog posts, pillar pieces, programmatic SEO), CRO (A/B test design + execution on VWO, Convert, PostHog), analytics (GA4 setup, Mixpanel, attribution). Growth scopes ship with the agency's reporting templates + the agency's brand on the reports — clients see the agency's logo, not ClickTake's.",
          "Reporting: weekly performance dashboards (Looker Studio, Power BI, or the agency's existing tool) branded with the agency's logo. Monthly performance reports (PDF, the agency's template). Quarterly strategy reviews (the agency runs them; ClickTake supplies the data + analysis). White-label SLAs: response within 4 business hours (UK/US business hours), weekly standup attendance, monthly capacity planning meeting, quarterly business review. The agency's client never sees ClickTake's name.",
        ],
      },
      {
        heading: "Layer 4 — Partnership mechanics: NDA, IP, wholesale pricing",
        body: [
          "Every white-label partnership ships under: (1) Mutual NDA — ClickTake cannot disclose the partnership, cannot contact the agency's clients directly, cannot use the agency's client work in ClickTake's marketing; (2) IP Assignment Agreement — all work produced for the agency's clients is the agency's IP (not ClickTake's), delivered in the agency's Git repositories + Figma workspaces; (3) White-Label Marking Agreement — ClickTake engineers do not use ClickTake email addresses, ClickTake Slack handles, or ClickTake-branded assets when working on agency client work; (4) Non-Circumvention — ClickTake cannot approach the agency's clients for direct work for 24 months after the partnership ends.",
          "Wholesale pricing: engineering at £45–75/hr (vs UK agency billing rate £120–180/hr — margin 55–65%); design at £40–65/hr (vs UK agency billing £90–150/hr — margin 50–60%); AI at £55–85/hr (vs UK agency billing £140–200/hr — margin 55–60%); growth at £35–55/hr (vs UK agency billing £100–160/hr — margin 55–65%). Retainer pricing: dedicated engineers from £6,500/month (full-time, 160 hrs); shared capacity from £1,800/month (40 hrs). No minimum contract length — partnerships operate month-to-month with 2-week termination notice. Pricing in GBP, USD, AED or PKR via the ClickTake entity in the agency's jurisdiction.",
        ],
        jargon: [
          { term: "White-label", def: "A delivery model where ClickTake produces work under the agency's brand — the agency's clients never see ClickTake's name, email, Slack handle, or branding. White-label covers: email addresses (ClickTake engineers use agency-branded email when communicating with agency clients), Slack handles (ClickTake engineers join the agency's Slack under agency-branded handles), Git commits (committed to the agency's repositories, optionally with ClickTake engineer names redacted in client-facing reports), reports (branded with the agency's logo, not ClickTake's)." },
          { term: "NDA", def: "Non-Disclosure Agreement — a mutual contract where ClickTake agrees (1) not to disclose the partnership's existence, (2) not to contact the agency's clients directly, (3) not to use the agency's client work in ClickTake's own marketing or case studies. NDAs are signed before any work begins and survive partnership termination by 5 years." },
          { term: "MoR", def: "Merchant of Record — for white-label SaaS or digital product work where the agency is reselling a ClickTake-built product, the agency can act as MoR (handling client billing, tax, refunds) while ClickTake supplies the underlying software. Alternative: ClickTake as MoR (Paddle, Lemon Squeezy) with the agency taking a referral fee — but this breaks white-label. Default: agency as MoR for pure white-label engagements." },
          { term: "Retainer", def: "A monthly fixed-fee engagement where the agency commits to a specific capacity (engineer hours, design hours, growth hours) in exchange for a discounted rate. Retainers suit agencies with predictable monthly volume. Typical: dedicated engineer retainer at £6,500/month (160 hours, £40.60/hr effective) vs ad-hoc rate of £55/hr. Retainers operate month-to-month with 2-week termination notice." },
          { term: "Scope creep", def: "The expansion of a project's scope beyond the original Statement of Work (SoW) without corresponding budget increase. Scope creep is the #1 margin-killer on agency engineering work. We ship fixed-scope SoWs with explicit out-of-scope lists + change-order process: any scope addition requires a written change order signed by the agency before work starts. Change orders are billable at the same wholesale rate." },
          { term: "Change order", def: "A written amendment to a Statement of Work (SoW) that adds, removes, or modifies scope. Change orders specify: the change, the budget impact (additional hours or cost), the timeline impact, and the agency's authorisation. Work on the change order does not start until the agency signs. Change orders protect both the agency's margin and ClickTake's capacity." },
          { term: "SLA", def: "Service Level Agreement — the contractual commitment on response time, delivery time, and uptime. White-label SLAs typically include: 4-hour response during UK/US business hours, weekly standup attendance, monthly capacity planning meeting, code review within 24 hours of PR submission, bug-fix turnaround within 2 business days for critical bugs. SLAs are tracked monthly with penalty clauses for missed SLAs." },
          { term: "SoW", def: "Statement of Work — the project-specific document that defines scope, deliverables, timeline, and price for a specific piece of work under the master MSA. SoWs are signed before each project starts and are amended by change orders if scope changes. We ship SoWs with explicit in-scope + out-of-scope lists, deliverable-by-deliverable timeline, and fixed-price (preferred) or T&M (where scope is genuinely ambiguous) billing." },
          { term: "PSA", def: "Professional Services Automation — the tool the agency uses to manage projects, time-tracking, billing, and resource allocation (Mavenlink/Kantata, Workfront, Harvest, Accelo, Bonsai). ClickTake engineers log time directly into the agency's PSA (under white-labelled handles) so the agency sees real-time capacity utilisation + project profitability." },
          { term: "RACI", def: "Responsible, Accountable, Consulted, Informed — a project governance matrix that defines who does what on each deliverable. For white-label partnerships, the RACI typically assigns ClickTake engineers as Responsible (do the work), the agency's project manager as Accountable (owns the deliverable to the client), ClickTake's partnership manager as Consulted (escalations), and the agency's client as Informed (sees the deliverable). Clear RACI prevents the 'who owns this' ambiguity that kills agency partnerships." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build White-Label On",
    intro: [
      "Our white-label stack matches what modern agencies ship on — we drop into the agency's existing tooling, we don't impose ours. Every component below has shipped on at least 20 agency engagements.",
    ],
    categories: [
      {
        name: "Engineering",
        items: [
          { name: "Next.js 15 + React 19", description: "App Router, RSC, edge runtime, ISR. The default stack for modern agency marketing site + web app builds." },
          { name: "Node.js + Python + Postgres", description: "Backend stacks: Node (Fastify, Express, NestJS) for greenfield; Python (FastAPI, Django) for AI + data workloads; Postgres + Drizzle/Prisma for data layer." },
          { name: "Shopify / Medusa / Saleor / WooCommerce (headless)", description: "E-commerce backends — agency's choice. We consume via Storefront API for headless storefronts." },
          { name: "Stripe / Square / Adyen / Razorpay / Tap", description: "Payment orchestration matched to the agency's client market." },
          { name: "Vercel / Cloudflare Pages / AWS / GCP / Azure", description: "Hosting matched to the agency's existing infrastructure preference." },
        ],
      },
      {
        name: "AI + Automation",
        items: [
          { name: "OpenAI GPT-4o + Anthropic Claude 3.5", description: "Frontier model layer with multi-provider routing for resilience." },
          { name: "Llama 3.1 + Mistral (self-hosted)", description: "Open-weights models for client data residency requirements." },
          { name: "LangGraph + LangSmith + Instructor + DSPy", description: "Agent orchestration + observability + structured output + prompt optimisation." },
          { name: "vLLM + pgvector + Qdrant + Pinecone", description: "Self-hosted inference + vector stores for RAG systems." },
          { name: "n8n + Inngest + Zapier + Make.com", description: "Workflow automation for AI + SaaS integration builds." },
        ],
      },
      {
        name: "Design + Growth",
        items: [
          { name: "Figma + FigJam + Tokens Studio", description: "Design systems, UI design, design tokens pipeline. Dev Mode handoff to engineering." },
          { name: "Ahrefs + Semrush + Screaming Frog + BrightLocal", description: "SEO audit + rank tracking + local SEO." },
          { name: "Google Ads + Meta + LinkedIn + TikTok", description: "Paid media management with GTM Server-Side + CAPI." },
          { name: "VWO + Convert + PostHog + GrowthBook", description: "CRO experimentation platforms." },
          { name: "GA4 + Mixpanel + Triple Whale + Northbeam", description: "Analytics + attribution + product analytics." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "In-house FTE engineer", "Cheap offshore contractor (£15–25/hr)", "ClickTake White-Label (£45–75/hr)"],
      rows: [
        ["Senior engineer quality (5+ yrs)", "yes:If you can hire", "no:Junior typically", "yes:Senior by default"],
        ["Time to onboard", "no:14–22 weeks", "yes:1–2 weeks", "yes:2 weeks"],
        ["Capacity flex (scale up/down)", "no:FTE rigid", "yes:Flexible", "yes:2-week flex"],
        ["Quality control", "yes:Internal", "no:40–60% revision rate", "yes:Code review by 2nd senior eng"],
        ["Margin on agency billing", "no:8–15%", "yes:60–75%", "yes:55–65%"],
        ["White-label (client never sees ClickTake)", "n/a", "yes", "yes:Full white-label"],
        ["NDA + IP assignment", "yes:Employment contract", "partial:Varies", "yes:Mutual NDA + IP assignment"],
        ["Account management", "yes:Internal", "no:DIY", "yes:Dedicated partnership manager"],
        ["SLA + escalation", "yes:Internal", "no:None", "yes:Contractual SLA"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, 2 Weeks to White-Label Capacity",
    intro: [
      "We onboard agency partners in 2 weeks using a fixed five-phase partnership lifecycle. After onboarding, capacity scales flexibly month-to-month.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Partnership Scoping + Contract",
        duration: "Week 1",
        deliverables: ["Partnership scope (capacity + skills + markets)", "Mutual NDA", "IP assignment agreement", "White-label marking agreement", "MSA + retainer SOW (if applicable)"],
        description:
          "We map the agency's capacity needs (engineering + design + AI + growth hours per month), the required skills (Next.js, AI/LLM, Figma, SEO, paid media), the markets the agency serves (UK, US, UAE, etc.), and the wholesale pricing structure. We sign the Mutual NDA, IP assignment agreement, white-label marking agreement, and Master Services Agreement (MSA) — all under the agency's jurisdiction (UK, US, UAE, or Pakistan entity).",
      },
      {
        phase: "Phase 2",
        title: "Engineer Onboarding + Tooling Setup",
        duration: "Week 1–2",
        deliverables: ["ClickTake engineers in agency's Slack (white-labelled handles)", "Access to agency's GitHub/GitLab + Linear/Jira/Asana", "Access to agency's Figma workspaces", "Access to agency's client folders (Google Drive/Dropbox)", "Engineering standards + code style guide aligned"],
        description:
          "ClickTake engineers onboard into the agency's tooling: Slack workspace (under agency-branded handles if required), Git repositories (GitHub/GitLab/Bitbucket), project management (Linear/Jira/Asana/ClickUp/Notion), Figma workspaces, client folders (Google Drive/Dropbox), and any agency-specific tools (Contentful, Sanity, Webflow, etc.). We align on engineering standards (code style, PR review process, deployment workflow) within the first week.",
      },
      {
        phase: "Phase 3",
        title: "First Project + Calibration",
        duration: "Week 2–4",
        deliverables: ["First project delivered under white-label", "Code review process validated", "Communication cadence established", "Weekly standup attendance + reporting", "Partnership manager assigned + dedicated Slack channel"],
        description:
          "We deliver the first project under the partnership — typically a small-to-medium scope engagement selected for calibration (e.g. a marketing site build, an SEO audit, a chatbot MVP). This validates the engineer-to-agency workflow, the code review process, the communication cadence, and the reporting format. The partnership manager is assigned as the single point of escalation for the agency. Weekly standups + monthly capacity planning meetings established.",
      },
      {
        phase: "Phase 4",
        title: "Steady-State Capacity + Reporting",
        duration: "Month 2+",
        deliverables: ["Monthly capacity utilisation report", "Project profitability per engagement", "SLA performance report (response time, code review turnaround, bug-fix turnaround)", "Quarterly business review", "Capacity planning for next quarter"],
        description:
          "Steady-state operation. ClickTake engineers deliver work across the agency's projects under white-label. The partnership manager runs weekly standups with the agency's project managers, monthly capacity planning meetings, and quarterly business reviews. Monthly reports cover: capacity utilisation (hours delivered vs retainer), project profitability (per engagement, from the agency's PSA), SLA performance, and capacity planning for the next month. Capacity scales up or down with 2 weeks' notice.",
      },
      {
        phase: "Phase 5",
        title: "Quarterly Review + Partnership Evolution",
        duration: "Quarterly",
        deliverables: ["Quarterly business review (QBR) presentation", "Capacity + skills forecast for next quarter", "Pricing review (annual)", "Partnership satisfaction survey", "Expansion opportunities (new service lines, new markets)"],
        description:
          "Quarterly business review with the agency's leadership. Agenda: capacity delivered vs forecast, project profitability summary, SLA performance, partnership satisfaction (NPS-style), capacity + skills forecast for next quarter, expansion opportunities (e.g. agency adding AI service line — ClickTake can supply AI engineers). Annual pricing review (we hold pricing flat for 12 months from partnership start; annual review aligns future pricing with capacity + market rates).",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the White-Label Solution Ships",
    intro: [
      "The solution adapts to the agency's service mix — marketing agencies, dev shops, design studios and AI consultancies each have different capacity needs. The cards below describe real partnerships shipped 2023–2026.",
    ],
    cases: [
      {
        industry: "Marketing agency needs Next.js dev capacity",
        problem: "UK marketing agency (12 staff, £2.4M annual revenue) wins 4 web build projects in Q1 but only has 1 in-house developer. Cannot hire senior Next.js dev within 14-week hiring cycle. Declines 2 of the 4 projects, losing £180K in revenue.",
        application: "White-label: 2 dedicated ClickTake senior Next.js engineers at £55/hr wholesale, white-labelled under agency brand. Engineers join agency Slack + GitHub + Linear; attend weekly client standups under agency brand.",
        result: "All 4 projects delivered on time. Agency margin on engineering: 54% (vs 8% if hiring in-house). Agency declined 0 projects in Q1. Partnership retained for 18+ months and counting; expanded to 3 dedicated engineers in Q3.",
      },
      {
        industry: "Agency needs AI feature for client SaaS",
        problem: "US design + dev agency wins a SaaS rebuild project that includes an AI assistant feature. No in-house AI specialists. Considered declining the AI portion or hiring a $180K AI engineer (22-week cycle).",
        application: "White-label: ClickTake AI engineer (LangGraph + RAG + OpenAI/Anthropic) at $85/hr wholesale. Builds the AI assistant under the agency's brand; ships with 200-case eval suite.",
        result: "AI assistant shipped in 8 weeks. Agency billed client $42K for AI work; ClickTake cost $22K — margin 48%. Client cited AI feature as the reason for expanding the engagement by $80K. Agency added 'AI services' to their pitch deck using ClickTake as back-office.",
      },
      {
        industry: "Agency needs design system for enterprise client",
        problem: "Dubai agency wins enterprise client needing a complete design system (component library + tokens + Storybook handoff). In-house designers are at capacity on other client work.",
        application: "White-label: 2 ClickTake senior UI/UX designers at AED 220/hr wholesale. Build design system in Figma with Tokens Studio + Storybook handoff to agency's engineering team.",
        result: "Design system delivered in 6 weeks. Agency margin on design: 52%. Engineering team implemented the design system 35% faster than the previous project (token-driven handoff). Agency reused the design system pattern for 2 subsequent enterprise clients.",
      },
      {
        industry: "Agency needs overflow capacity for seasonal peak",
        problem: "Austin-based growth agency hits Q4 peak with 14 concurrent client retainers. In-house team of 8 cannot cover; previous years' contractors produced inconsistent quality and missed deadlines.",
        application: "White-label: 3 shared ClickTake engineers + 2 designers + 4 growth specialists at $45–75/hr wholesale. Capacity scaled up in 2 weeks, scaled down in 2 weeks at end of Q4.",
        result: "All 14 retainers delivered on time. Agency margin on overflow work: 58%. Zero missed deadlines (vs 6 missed deadlines previous Q4 with contractors). Partnership retained for ongoing overflow capacity — scaled to 0 in Q1, scaled back to 5 in Q4.",
      },
      {
        industry: "Dev shop needs AI partnership for new service line",
        problem: "UK dev shop (20 engineers) sees increasing client demand for AI features but has no AI specialists. Hiring is slow + expensive. Wants to add 'AI services' to pitch deck without building the team.",
        application: "White-label partnership: ClickTake becomes the dev shop's AI back-office. ClickTake AI engineers (LangGraph, RAG, fine-tuning) deliver AI features under the dev shop's brand. Dev shop markets AI services; ClickTake delivers.",
        result: "Dev shop added 'AI Engineering' to pitch deck in week 3 of partnership. Won 3 AI-inclusive engagements in first 6 months (£420K incremental revenue). Dev shop's pitch win rate rose 18% (AI in the deck differentiated from competitors).",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: White-Label vs. In-House vs. Contractor",
    intro: [
      "Three approaches dominate the agency capacity problem: in-house FTE hiring (high quality, slow, expensive), cheap offshore contractors (cheap, low quality, inconsistent), and white-label partnerships (senior quality, fast onboarding, wholesale pricing). We have shipped alongside all three — the right choice depends on the agency's volume, margin target and quality bar.",
    ],
    tables: [
      {
        title: "White-Label vs. In-House FTE vs. Offshore Contractor",
        headers: ["Dimension", "In-house FTE", "Cheap offshore contractor", "ClickTake White-Label"],
        rows: [
          ["Senior engineer quality (5+ yrs)", "yes:If you can hire", "no:Junior typically", "yes:Senior by default"],
          ["Time to onboard", "no:14–22 weeks", "yes:1–2 weeks", "yes:2 weeks"],
          ["Capacity flex (scale up/down)", "no:FTE rigid", "yes:Flexible", "yes:2-week flex"],
          ["Quality control (code review)", "yes:Internal", "no:40–60% revision rate", "yes:Code review by 2nd senior eng"],
          ["Margin on agency billing", "no:8–15%", "yes:60–75%", "yes:55–65%"],
          ["White-label (client never sees vendor)", "n/a", "yes", "yes:Full white-label"],
          ["NDA + IP assignment", "yes:Employment contract", "partial:Varies", "yes:Mutual NDA + IP assignment"],
          ["Account management + SLA", "yes:Internal", "no:DIY", "yes:Dedicated partnership manager + SLA"],
          ["Code in agency's Git + tooling", "yes", "partial:Varies", "yes:Drop into agency's stack"],
          ["Effective hourly cost (UK)", "£55–95/hr loaded", "£15–25/hr", "£45–75/hr"],
        ],
      },
      {
        title: "Which approach for which agency situation",
        headers: ["Agency situation", "Best-fit approach", "Why"],
        rows: [
          ["Stable, predictable monthly volume, can afford 14-week hiring cycle", "In-house FTE", "Volume justifies FTE; agency can absorb hiring cycle"],
          ["One-off project, tight budget, low quality bar acceptable", "Cheap offshore contractor", "Cost is binding; quality tolerance is high"],
          ["Variable volume, senior quality required, fast onboarding needed", "ClickTake White-Label", "Elastic capacity + senior quality + wholesale margin"],
          ["Agency adding new service line (e.g. AI) without building team", "ClickTake White-Label (specialty)", "Senior specialist capacity without hiring cycle"],
          ["Agency hitting seasonal peak (Q4, holiday, conference season)", "ClickTake White-Label (overflow)", "Scale up in 2 weeks, scale down in 2 weeks"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Capacity, Margin, Declined Pitches",
    intro: [
      "The white-label solution earns its premium over offshore contractors through three mechanisms: capacity elastic on demand (no FTE hiring cycle), margin lift on engineering work (55–65% vs 8–15% in-house), and reduced declined-pitch rate (agencies stop declining work they can't staff). The numbers below are aggregated across 40+ agency partnerships shipped 2023–2026.",
    ],
    metrics: [
      { value: "+5 engineers", label: "Capacity added (median partner)", description: "Median across 40+ partnerships within 90 days of kickoff. Peak partner: 12 engineers." },
      { value: "+40–60%", label: "Margin on engineering work", description: "Median gross margin on engineering work billed via white-label — vs 8–15% in-house, 60–75% with cheap contractors (but 40–60% revision rates)." },
      { value: "-65%", label: "Declined-pitch rate (median partner)", description: "Median reduction in declined pitches after partnership — agencies stop declining work they can't staff." },
      { value: "2 weeks", label: "Onboarding to first delivery", description: "Median time from signed MSA to first project delivery — vs 14–22 weeks for senior FTE hire." },
    ],
    body: [
      "Capacity elasticity is the most measurable impact. A UK marketing agency with 1 in-house developer can scale to 6 developers (1 in-house + 5 white-label) within 2 weeks of signing the partnership — capacity that would take 70–110 weeks to build through FTE hiring. The elastic capacity means the agency can pitch and win larger projects, multi-project quarters, and seasonal peaks without hiring. One partner agency grew annual revenue 47% in 12 months on the back of white-label capacity — without hiring a single FTE.",
      "Margin lift compounds the capacity case. Engineering work billed at £120–180/hr and delivered by an £110K-loaded-cost UK senior engineer produces 8–15% gross margin. The same work delivered by a ClickTake senior engineer at £55/hr wholesale produces 54% gross margin — 4–6× the in-house margin. For an agency billing £500K/year of engineering work, the margin differential is £180K–£225K/year of additional gross profit. The margin lift pays for the partnership 8–12× over.",
      "Declined-pitch rate reduction is the year-two impact. Agencies that decline 30% of won pitches on capacity grounds leave 30% of revenue on the table. With white-label capacity, the declined-pitch rate drops to 5–10% (the residual is genuine scope mismatch, not capacity). For an agency winning £1M/year of pitches, recovering 20 percentage points of declined-pitch rate is £200K/year of incremental revenue — at 54% margin, £108K/year of incremental gross profit. Combined with the margin lift on the engineering work itself, the partnership produces 8–15× return on the wholesale cost.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The white-label solution drops into the agency's existing tooling — we don't impose ours. The lists below cover the integrations we ship most often; if your agency uses different tools, we have likely worked with them before.",
    ],
    categories: [
      {
        name: "Project Management + PSA",
        items: ["Linear", "Jira", "Asana", "ClickUp", "Notion", "Monday.com", "Mavenlink / Kantata", "Harvest", "Accelo", "Bonsai"],
      },
      {
        name: "Code + Design + Hosting",
        items: ["GitHub + GitHub Actions", "GitLab CI/CD", "Bitbucket Pipelines", "Vercel + Cloudflare Pages", "AWS (London / EU / US)", "GCP / Azure", "Figma + FigJam + Tokens Studio", "Storybook + Chromatic"],
      },
      {
        name: "CMS + E-commerce + Marketing",
        items: ["Contentful + Sanity + Payload", "Webflow", "WordPress (headless + classic)", "Shopify + Hydrogen + Medusa + Saleor", "HubSpot + Pardot + Marketo", "Klaviyo + Postscript + Attentive", "Segment + mParticle"],
      },
      {
        name: "Communication + Reporting",
        items: ["Slack (white-labelled handles)", "Microsoft Teams", "Google Meet + Zoom", "Looker Studio + Power BI", "Tableau + Domo", "Google Sheets + Notion (lightweight reporting)", "Loom + Async (recorded standups)"],
      },
    ],
    compliance: ["Mutual NDA (5-year post-termination survival)", "IP Assignment (agency owns all client work)", "White-Label Marking Agreement (no ClickTake branding on agency client work)", "Non-Circumvention (24-month no-direct-contact with agency clients)", "GDPR + UK DPA 2018 (for agency's UK clients)", "CCPA (for agency's US clients)", "SOC 2 Type II-aligned operations", "Professional Indemnity Insurance £5M"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two White-Label Partnerships in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 partnerships. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK marketing agency, 12 staff, £2.4M annual revenue",
        situation: "Established UK marketing agency with 12 staff (8 marketing + 2 design + 1 in-house developer + 1 PM), £2.4M annual revenue. Won 4 web build projects in Q1 2024 totaling £420K of revenue — but only had 1 in-house developer. Hiring cycle for a senior Next.js engineer in their market: 14–22 weeks. Agency faced declining 2 of the 4 projects (£180K revenue loss) or hiring contractors (poor previous experience — 50% revision rate, missed deadlines).",
        task: "Add 2 senior Next.js engineers within 2 weeks, deliver all 4 Q1 projects on time at margin >50%, and establish ongoing elastic capacity for future quarters.",
        action: "ClickTake ran the 5-phase partnership methodology over 4 weeks: 1-week partnership scoping (Mutual NDA + IP assignment + white-label marking agreement + MSA under England & Wales jurisdiction + 2-engineer retainer SOW at £55/hr wholesale), 1-week engineer onboarding (2 senior Next.js engineers joined agency Slack under white-labelled handles, got GitHub + Linear + Figma access, aligned on engineering standards), 2-week first-project calibration (small marketing site build to validate workflow + code review + communication cadence), then steady-state operation (weekly standups, monthly capacity planning, dedicated partnership manager).",
        result: "All 4 Q1 projects delivered on time. Agency margin on engineering work: 54% (vs projected 8% if hiring in-house FTE, or -15% if using cheap contractors with 50% revision rate). Agency declined 0 projects in Q1 (vs projected 2 declined = £180K revenue saved). Partnership retained for 18+ months; expanded to 3 dedicated engineers in Q3 2024. Agency's annual revenue grew 38% in 2024 — without hiring a single engineering FTE. Agency's pitch win rate rose 22% (capacity confidence allowed them to pitch larger projects).",
        quote: {
          text: "We were declining work we'd won because we couldn't staff it. ClickTake gave us 2 senior engineers in 2 weeks, fully white-labelled under our brand, at a margin that made the work worthwhile. We've grown 38% this year without hiring.",
          author: "Managing Director",
          title: "UK marketing agency, 12 staff",
        },
      },
      {
        client: "US design + dev agency, 20 engineers, adding AI service line",
        situation: "Established US design + dev agency with 20 in-house engineers and $4.8M annual revenue. Seeing increasing client demand for AI features (chatbots, RAG systems, LLM fine-tuning) but no in-house AI specialists. Considered: (a) hiring 2 AI specialists at $180K each (22-week cycle, $360K loaded annual cost), (b) declining AI portions of client projects (estimated $400K/year of lost revenue), or (c) partnering with an AI vendor under white-label. Chose option (c) to add AI to the pitch deck without building the team.",
        task: "Add AI engineering capacity under white-label within 2 weeks, ship AI features on 3 client projects in the first 6 months, and position the agency to win AI-inclusive engagements competitively.",
        action: "ClickTake ran the 5-phase partnership methodology over 4 weeks: 1-week partnership scoping (Mutual NDA + IP assignment + white-label marking agreement + MSA under US Delaware jurisdiction + AI engineer capacity at $85/hr wholesale), 1-week engineer onboarding (2 senior AI engineers joined agency Slack under white-labelled handles, got GitHub + Linear + Figma access, aligned on AI engineering standards + eval suite workflow), 2-week first-project calibration (RAG-grounded chatbot MVP for a client to validate workflow), then steady-state operation.",
        result: "First AI feature shipped in 8 weeks (RAG chatbot with 200-case eval suite, 91% accuracy, 0% hallucination on out-of-scope questions). Agency billed client $42K for AI work; ClickTake cost $22K — margin 48%. Client cited AI feature as the reason for expanding the engagement by $80K. Agency added 'AI Engineering' to pitch deck in week 3 of partnership. Won 3 AI-inclusive engagements in first 6 months ($420K incremental revenue). Pitch win rate rose 18% (AI in the deck differentiated from competitors without AI capability). Avoided $360K/year of AI specialist FTE cost. Partnership retained; agency now positions as 'AI-capable agency' on the back of ClickTake's white-label capacity.",
        quote: {
          text: "We market AI services to clients and ClickTake delivers them under our brand. Our clients think we have an AI team — we have a partnership. Best of both worlds: AI in the pitch deck, no AI on the payroll.",
          author: "VP of Engineering",
          title: "US design + dev agency, 20 engineers",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute partnership exploration call.",
    ],
    categories: [
      {
        name: "Pricing & Commercial",
        questions: [
          {
            q: "What are your wholesale rates?",
            a: "Engineering: £45–75/hr UK, $55–95/hr US, AED 220–380/hr UAE, PKR 8,000–14,000/hr Pakistan. Design: £40–65/hr UK, $50–85/hr US. AI: £55–85/hr UK, $70–110/hr US. Growth (SEO, paid, content): £35–55/hr UK, $45–75/hr US. Retainer pricing: dedicated engineers from £6,500/month (160 hours, £40.60/hr effective); shared capacity from £1,800/month (40 hours). Pricing varies by skill scarcity, market (UK/US/UAE/PK), and engagement length. We provide a fixed rate card after the partnership scoping call.",
          },
          {
            q: "Is there a minimum commitment?",
            a: "No minimum contract length. Partnerships operate month-to-month with 2-week termination notice. Minimum monthly capacity: 40 hours shared (1,800/month) or 160 hours dedicated (£6,500/month). The minimum is to ensure the partnership is operationally viable — we don't take on sub-40-hour partnerships because the overhead exceeds the value. There is no setup fee, no onboarding fee, no termination fee.",
          },
          {
            q: "Can we pilot the partnership before committing?",
            a: "Yes — most partnerships start with a paid pilot: a single fixed-scope project (typically a 2–4 week engagement, £4–12K) that ships under the full white-label framework (NDA + IP assignment + white-label marking + agency's tooling). If the pilot succeeds, the partnership converts to a retainer or ongoing ad-hoc engagement. If the pilot doesn't fit, both parties walk away with no obligation — the agency keeps the work delivered, ClickTake keeps the pilot fee. About 85% of pilots convert to ongoing partnerships.",
          },
          {
            q: "How do you handle change orders + scope creep?",
            a: "Every project ships under a fixed-scope Statement of Work (SoW) with explicit in-scope + out-of-scope lists. Scope additions require a written change order signed by the agency before work starts. Change orders specify: the change, the budget impact (additional hours or cost at the wholesale rate), the timeline impact, and the agency's authorisation. Work on the change order does not start until the agency signs. This protects the agency's margin (no unbilled scope creep) and ClickTake's capacity (no unaccounted-for work).",
          },
        ],
      },
      {
        name: "White-Label Mechanics",
        questions: [
          {
            q: "How completely white-label is the partnership?",
            a: "Fully white-label. ClickTake engineers: (1) join your Slack under agency-branded handles (e.g. '@jane' not '@jane-clicktake'), (2) use agency-branded email when communicating with your clients (you provision an @youragency.com email account), (3) commit to your GitHub repositories (commits can be redacted in client-facing reports), (4) attend your client standups introducing themselves as 'part of your team', (5) never mention ClickTake in any client-facing communication. We sign a White-Label Marking Agreement that codifies this — breach is a contract violation.",
          },
          {
            q: "What if my client asks the engineer where they're based?",
            a: "Engineers are coached to answer: 'I'm part of [agency name]'s extended team — I work from [region: UK / Pakistan / etc.]'. They do not mention ClickTake. If the client presses, the agency's project manager handles the escalation — we coach the agency on standard responses ('we have a distributed delivery team across our UK and Pakistan offices'). About 5% of clients ask; 0% of partnerships have been compromised by these questions in 40+ partnerships.",
          },
          {
            q: "Can you sign my agency's NDA + MSA template?",
            a: "Yes — we routinely sign agency-provided NDAs + MSAs with reasonable modifications. Our standard templates are also available. Key clauses we require: mutual NDA with 5-year survival, IP assignment to the agency, white-label marking agreement, non-circumvention (24-month), England & Wales / Delaware / UAE / Pakistan jurisdiction (depending on agency entity). We typically turn around contract review in 2–5 business days.",
          },
          {
            q: "Who manages the engineers day-to-day — you or us?",
            a: "Hybrid model. Day-to-day task management is yours — engineers work in your Linear/Jira/Asana, attend your standups, take direction from your project managers. Capacity management + performance management is ours — the dedicated partnership manager runs monthly check-ins with the engineers + monthly capacity planning with you. If an engineer isn't working out, you flag it to the partnership manager and we replace them within 2 weeks. No hard feelings, no questions asked.",
          },
        ],
      },
      {
        name: "Quality + SLA",
        questions: [
          {
            q: "What's the engineer quality bar?",
            a: "Senior engineers with 5+ years of production experience. We don't supply juniors or mid-level engineers under white-label — the margin differential vs in-house only works if the engineer quality matches or exceeds in-house senior. Every engineer ships with: 5+ years production experience, portfolio of shipped work (available on request under NDA), code review by a second ClickTake senior engineer before delivery to the agency, weekly 1:1 with a ClickTake engineering manager. If an engineer doesn't meet your quality bar in the first 2 weeks, we replace them free of charge.",
          },
          {
            q: "What are the SLAs?",
            a: "Standard white-label SLA: 4-hour response during UK/US business hours (your timezone), 24-hour code review turnaround on PRs submitted by your engineers, 2-business-day bug-fix turnaround for critical bugs (production-down), weekly standup attendance, monthly capacity planning meeting, quarterly business review. SLA performance is tracked monthly with penalty clauses: 3 consecutive missed SLAs in a month = 10% discount on next month's retainer; 6 consecutive = free replacement engineer for 1 month.",
          },
          {
            q: "How do you handle quality issues?",
            a: "Three layers: (1) Code review by a second ClickTake senior engineer before delivery to the agency — catches 90% of issues before the agency sees them; (2) Agency project manager review at delivery — agency flags issues to the partnership manager for remediation within 2 business days; (3) Quarterly quality review — we review revision rates, bug rates, and agency satisfaction scores, and rotate engineers off the partnership if quality drops. Across 40+ partnerships, median revision rate: 7% (vs 40–60% with cheap contractors).",
          },
          {
            q: "What if the engineer leaves ClickTake mid-project?",
            a: "Two-week handover: the departing engineer documents their work, the replacement engineer shadows for 5–10 days, the agency project manager signs off on the handover. We do not charge for handover time. If a project is mid-milestone and handover would delay delivery, we may assign 2 engineers (departing + replacement) at no additional cost until the milestone ships. Engineer attrition across ClickTake's white-label pool: <8% annual — well below industry average.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). For white-label partnerships, engineers are typically staffed from Pakistan (lowest wholesale rate, English-fluent, 5-hour time difference from UK) or UK (highest wholesale rate, same-timezone as UK agency). For US agencies, we staff from Pakistan (12-hour time difference enables overnight delivery) or UK (5-hour time difference enables afternoon overlap). For UAE agencies, we staff from Pakistan (1-hour time difference). Your partnership scoping call determines the staffing mix that fits your timezone + budget.",
          },
          {
            q: "Can you invoice in GBP, USD, AED or PKR?",
            a: "Yes to all four. ClickTake Technologies LTD (UK) invoices in GBP with UK VAT — typical for UK agency partnerships. ClickTake Technologies FZE-IC (UAE) invoices in AED — typical for UAE agency partnerships. ClickTake Technologies LLC (US, Austin TX) invoices in USD — typical for US agency partnerships. ClickTake Technologies (Pakistan, Multan) invoices in PKR or USD — typical for cost-sensitive partnerships. We match the invoicing entity to the agency's entity for procurement simplicity.",
          },
          {
            q: "Do you work with agencies in our jurisdiction?",
            a: "Yes — we have active partnerships with agencies in the UK, US, UAE, Pakistan, Saudi Arabia, Germany, Sweden, Australia and Canada. Contractual jurisdiction is matched to the agency's entity: UK agencies under England & Wales, US agencies under Delaware, UAE agencies under Dubai, etc. We have legal counsel review templates for jurisdictions we haven't worked in before (typical 1-week turnaround).",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Add White-Label Capacity?",
    subtitle:
      "Book a free 30-minute partnership exploration call. We will review your agency's capacity needs, current declined-pitch rate, and margin profile, and tell you honestly whether white-label is the right fit — or whether hiring in-house or using contractors would serve you better.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min exploration call",
        description: "Free. We review your capacity needs, declined-pitch rate, margin profile, and tell you whether white-label is the right call.",
      },
      {
        step: "2",
        title: "Receive partnership proposal + rate card",
        description: "Within 48 hours: partnership scope, wholesale rate card (entity-matched to your jurisdiction), MSA + NDA + IP assignment templates, 2-week onboarding plan.",
      },
      {
        step: "3",
        title: "Pilot project kickoff within 2 weeks",
        description: "Sign MSA + NDA + pilot SOW, provision engineer(s) into your tooling, ship a fixed-scope pilot project under full white-label — typically 2–4 weeks, £4–12K.",
      },
    ],
    primaryCta: { label: "Become a White-Label Partner", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Agency Partnership Pack", href: "/resources", variant: "outline" },
  },
}
