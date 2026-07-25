import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /about — ClickTake Technologies company deep-dive.
 *
 * Per blueprint Part 2.C: focus on BRAND depth — founding story, core
 * values with real examples, deep-dive bios for leadership. Target
 * 1,500-2,000 words (shorter than service pages, denser on narrative).
 */
export const aboutDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "About ClickTake",
    title: "A Multi-Region Digital Agency Engineering AI, Web & Growth Systems Since 2019",
    subtitle:
      "120+ projects shipped across four offices — Birmingham (UK HQ), Multan (engineering hub), Austin (US business desk) and Dubai (MENA office). We combine UK business-hours coverage with an extended Pakistan delivery window for 18-hour workdays on every engagement.",
    geoDefinition:
      "ClickTake Technologies is a full-stack digital agency founded in 2019, operating across the United Kingdom (Birmingham HQ), Pakistan (Multan engineering hub), the United States (Austin business desk) and the United Arab Emirates (Dubai MENA office). The company delivers custom LLM systems, full-stack web development, SaaS platforms, digital marketing and creative services to clients in 14 countries. ClickTake is registered in the UK (Companies House) and operates engineering, growth and creative practices coordinated across all four time zones.",
    character: "about",
    ctas: [
      { label: "Book a 30-min Intro Call", href: "/contact", variant: "orange" },
      { label: "See Our Work", href: "/portfolio", variant: "outline" },
    ],
    stats: [
      { value: "2019", label: "Founded" },
      { value: "120+", label: "Projects shipped" },
      { value: "80+", label: "Clients in 14 countries" },
      { value: "5.0", label: "Avg client rating" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "About" },
    ],
  },

  problem: {
    title: "Why We Started ClickTake in 2019",
    intro: [
      "The agency market in 2019 was broken in three specific ways. Founders could hire a freelance developer who shipped fast but disappeared after launch. They could hire a brand-name agency that produced beautiful decks but charged £180/hour for junior work. Or they could try an offshore firm that quoted £8/hour and delivered code that had to be rewritten within six months. None of these options combined speed, quality and cost in a way that worked for ambitious mid-market clients.",
      "ClickTake was founded to fix that triangle. The model is simple: UK-based client-facing leadership (Birmingham HQ) handles strategy, scope and account management. A Pakistan-based engineering hub (Multan) handles the bulk of build, test and operate work. US (Austin) and UAE (Dubai) business desks handle regional sales, partnerships and on-the-ground client coverage. The result is UK business-hours responsiveness at near-Pakistan engineering rates — typically 40-60% below London agency benchmarks for the same deliverables.",
    ],
    painPoints: [
      {
        title: "Freelance vanishing act",
        description:
          "Freelancers ship the MVP, then disappear when the client needs maintenance, iteration, or a v2. The client inherits code nobody understands and starts over with a new vendor.",
      },
      {
        title: "Big-agency overhead",
        description:
          "Brand-name agencies charge £150-£250/hour for senior work but staff engagements with juniors billing £60/hour internally. The margin funds the agency's Mayfair office, not the client's product.",
      },
      {
        title: "Offshore quality gap",
        description:
          "Pure offshore teams at £8-£15/hour often ship code that fails security audits, accessibility checks, or production load. The 'savings' evaporate in the rewrite.",
      },
    ],
    paradigmShift: [
      "ClickTake's model is hybrid by design: UK leadership owns the client relationship and the deliverable spec; the Pakistan engineering team owns implementation; US and UAE desks own regional coverage. Every engagement has a UK-based point of contact and a Pakistan-based tech lead. The two coordinate daily. The client gets one team — not a chain of vendors — and one invoice.",
    ],
  },

  deepDive: {
    title: "Company History & Operating Model",
    intro: [
      "The story of ClickTake from 2019 to 2026 is a story of disciplined geographic expansion — each new office opened in response to a specific client demand, not as a speculative bet.",
    ],
    subsections: [
      {
        heading: "2019–2021: Founding and the Birmingham HQ",
        body: [
          "ClickTake was registered in Birmingham in 2019 by a founding team that had previously shipped SaaS products and run growth campaigns for UK e-commerce brands. The first 18 months were pure services — WordPress sites, Shopify builds, Google Ads management — for local Birmingham businesses. The first employee was a developer in Multan, Pakistan, hired to handle build capacity that the founder could not deliver alone.",
          "By end of 2020, ClickTake had shipped 24 projects — mostly to UK clients — and the Birmingham office became the registered HQ. The Multan engineering hub grew to 6 people and started taking on AI/ML work, not just web builds, in response to client demand for chatbots and recommendation engines.",
        ],
      },
      {
        heading: "2022–2023: US entry and the AI pivot",
        body: [
          "In 2022, three UK clients asked if ClickTake could serve their US subsidiaries. The Austin business desk was opened in response — initially a single business-development person covering CST and EST hours. Within 9 months, US revenue matched UK revenue, and the Austin desk expanded to include a project manager and a part-time solutions architect.",
          "2023 was the AI pivot. The Multan engineering team had been building LLM prototypes since GPT-3.5's release, but in 2023 the demand from clients shifted from 'can you build a chatbot?' to 'can you build us a production LLM system with evals and SLAs?'. ClickTake shipped its first production custom LLM (a RAG system for a UK legal firm) in March 2023, and the AI practice became a formal service line in Q3 2023.",
        ],
      },
      {
        heading: "2024–2026: Dubai, the deep-dive rebuild, and today",
        body: [
          "Dubai opened in 2024 to serve MENA clients who preferred in-region contracting for GDPR-equivalent and data-residency reasons. The Dubai office is small — 2 people — but handles business development across UAE, Saudi Arabia and Qatar. Engineering for MENA clients is still delivered from Multan.",
          "In 2025, ClickTake rebuilt its own website on Next.js 15 with the deep-dive 'Ultimate Guide' format you are reading right now. The rebuild was a deliberate investment in the same architecture we ship to clients — not a marketing exercise. Every service and solution page on this site follows the same 12-section blueprint we use for client deliverables. The site itself is the case study.",
          "As of 2026, ClickTake is 28 people across four offices: 8 in Birmingham (leadership, accounts, project management), 16 in Multan (engineering, AI, QA, design), 2 in Austin (US business desk) and 2 in Dubai (MENA business desk). Annual revenue is split roughly 45% UK / 30% US / 15% MENA / 10% Pakistan — the engineering hub in Pakistan serves all four client regions.",
        ],
      },
    ],
  },

  techStack: {
    title: "The Stack We Build On (Internally and for Clients)",
    intro: [
      "ClickTake's internal stack mirrors what we ship to clients — we dogfood everything. If a tool is not good enough for our own production, it is not good enough for a client engagement.",
    ],
    categories: [
      {
        name: "Engineering",
        items: [
          { name: "Next.js 15+ App Router + React 19 + TypeScript", description: "Every web build since 2024. Server components, server actions, edge runtime." },
          { name: "Postgres + Drizzle / Prisma", description: "Default database for SaaS, marketplaces, internal tools. Row-level security for multi-tenant." },
          { name: "Cloudflare + Vercel + AWS", description: "Three-tier hosting strategy. Cloudflare for edge/CDN/DNS, Vercel for Next.js apps, AWS for backend services." },
          { name: "LangGraph + LlamaIndex + vLLM", description: "LLM stack for AI engagements. Used internally for the ClickTake CRM and lead-qualification assistant." },
        ],
      },
      {
        name: "Growth & Marketing",
        items: [
          { name: "GA4 + GTM + server-side tracking", description: "Attribution stack for every client engagement and for our own marketing." },
          { name: "Ahrefs + Semrush + Screaming Frog", description: "SEO research, technical audits, content gap analysis." },
          { name: "VWO / GrowthBook + Hotjar + Microsoft Clarity", description: "CRO experimentation and qualitative analytics." },
          { name: "Buffer / Sprout Social + native platform tools", description: "Social scheduling, listening, community management." },
        ],
      },
      {
        name: "Operations",
        items: [
          { name: "Linear + GitHub + Slack", description: "Sprint planning, code review, async communication across the 4-office team." },
          { name: "Notion + Loom", description: "Internal docs, client handoff documentation, recorded demos." },
          { name: "Stripe + Xero + Deel", description: "Billing, accounting, international payroll across UK / PK / US / UAE." },
          { name: "1Password + Tailscale + Datadog", description: "Security, zero-trust networking, observability." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Dimension", "Typical UK agency", "Typical offshore firm", "ClickTake (hybrid)"],
      rows: [
        ["Senior engineer hourly rate", "£120-£180", "£15-£25", "£45-£70"],
        ["UK business-hours coverage", "yes", "no", "yes"],
        ["Same-day response SLA", "yes (premium tier)", "no", "yes (all tiers)"],
        ["Code quality (Lighthouse / a11y)", "Variable", "no:Often fails", "yes:95%+ enforced"],
        ["Multi-region delivery", "no", "no", "yes:4 offices"],
        ["AI/ML capability in-house", "rare", "no", "yes:Dedicated practice"],
      ],
    },
  },

  methodology: {
    title: "How We Run Engagements: 5 Phases, 4 Offices, One Team",
    intro: [
      "Every ClickTake engagement — whether a £6K landing page or a £450K custom LLM system — runs through the same five-phase lifecycle. The lifecycle is the contract. Clients always know what phase they are in, what deliverables are due, and what gate must be passed before the next phase starts.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Scope Lock",
        duration: "1-2 weeks",
        deliverables: ["Scope document", "Success metrics", "Risk register", "Fixed quote"],
        description:
          "UK-based account lead + Pakistan-based tech lead run joint discovery calls. Output is a fixed scope document with named deliverables, success metrics, and a fixed-price quote. No work starts until scope is signed.",
      },
      {
        phase: "Phase 2",
        title: "Architecture & Design",
        duration: "1-3 weeks",
        deliverables: ["Architecture diagram", "Design system", "Tech stack spec", "Sprint plan"],
        description:
          "Tech lead in Multan architects the system; design lead (also Multan, sometimes Birmingham) produces the design system. Sprint plan with weekly milestones is shared with the client.",
      },
      {
        phase: "Phase 3",
        title: "Build Sprints",
        duration: "3-10 weeks",
        deliverables: ["Weekly demos", "Staging URL", "Sprint reports", "Code in client-owned repo"],
        description:
          "Engineering in Multan builds in 1-week sprints. Every Friday: demo to client (UK business hours), sprint report, staging URL updated. Code is pushed to a client-owned GitHub/GitLab repo from day one.",
      },
      {
        phase: "Phase 4",
        title: "Launch & Handoff",
        duration: "1-2 weeks",
        deliverables: ["Production deploy", "Runbook", "Loom walkthroughs", "30-day post-launch support"],
        description:
          "Production deploy is coordinated UK hours. Client receives a written runbook, recorded Loom walkthroughs for every admin task, and 30 days of post-launch support included in every engagement.",
      },
      {
        phase: "Phase 5",
        title: "Operate & Iterate",
        duration: "Ongoing (optional)",
        deliverables: ["Monthly retainer", "SLA config", "Quarterly roadmap review", "Dedicated Slack channel"],
        description:
          "~65% of clients move to a monthly retainer after launch: hosting, monitoring, iteration, growth experiments. Retainers range from £1.5K/mo (small WP site) to £25K/mo (multi-region SaaS with managed LLM SLA).",
      },
    ],
  },

  useCases: {
    title: "What We Build, For Whom",
    intro: [
      "ClickTake's client base spans founders, mid-market businesses and enterprises. The five categories below cover ~85% of engagements shipped since 2019.",
    ],
    cases: [
      {
        industry: "Pre-seed to Series A startups",
        problem: "Founders need brand, website, AI assistant and growth plan shipped in 90 days — not 9 months — without stitching together four vendors.",
        application: "Starter Kit + 90-day delivery: brand + Next.js site + AI chatbot + growth plan, fixed scope, fixed timeline.",
        result: "47 startups launched since 2022; average time-to-first-paid-customer cut from 14 weeks to 5 weeks.",
      },
      {
        industry: "Local businesses (clinics, salons, repair shops, restaurants)",
        problem: "Invisible in the Google local pack; slow mobile site; reviews lagging competitors 3:1.",
        application: "Local SEO + GBP optimization + fast Next.js mobile site + automated review request workflow.",
        result: "Average client reaches top-3 local pack in 90-120 days; review velocity 4× pre-engagement within 6 months.",
      },
      {
        industry: "B2B SaaS companies ($1M-$40M ARR)",
        problem: "Product surface area growing faster than engineering team can ship; AI features needed but no in-house ML expertise.",
        application: "Full-stack Next.js development + custom LLM features (RAG assistants, AI workflows, automated insights).",
        result: "47 SaaS clients shipped since 2023; average feature-shipping velocity 3× pre-engagement within 90 days.",
      },
      {
        industry: "E-commerce brands (D2C, multi-brand, marketplaces)",
        problem: "Conversion rate stuck at 1-2%; inventory sync broken across channels; retention loop missing.",
        application: "Headless commerce rebuild (Medusa / Shopify Hydrogen) + CRO experimentation programme + retention automation.",
        result: "Average conversion rate lift 38% in 6 months; AOV lift 22%; 90-day customer LTV up 31%.",
      },
      {
        industry: "Enterprises (regulated industries)",
        problem: "Need AI/web capability but cannot send data to public APIs; existing agency cannot meet compliance bar.",
        application: "Self-hosted LLM systems in client VPC, GDPR/HIPAA/SOC2 compliant, with full audit logging.",
        result: "11 enterprise engagements shipped since 2024 across healthcare, legal, financial services.",
      },
    ],
  },

  comparison: {
    title: "How ClickTake Compares to Alternatives",
    intro: [
      "An honest comparison of the three engagement models most clients consider before hiring us. We have lost deals to all three — and won deals back from all three when the model failed.",
    ],
    tables: [
      {
        title: "ClickTake (hybrid) vs. UK boutique agency vs. offshore firm vs. in-house hire",
        headers: ["Dimension", "UK boutique agency", "Offshore firm", "In-house hire", "ClickTake (hybrid)"],
        rows: [
          ["Senior eng rate", "yes:£120-£180/hr", "yes:£15-£25/hr", "yes:£80-£140K/yr + tax", "yes:£45-£70/hr"],
          ["UK business-hours coverage", "yes", "no", "yes", "yes"],
          ["Multi-discipline (web+AI+growth)", "rare", "no", "no", "yes"],
          ["Capacity on demand", "yes:Limited", "yes:High", "no:Fixed", "yes:High"],
          ["Senior oversight on every task", "yes", "no", "yes", "yes"],
          ["Multi-region (UK+US+MENA)", "no", "no", "no", "yes"],
          ["Best for", "Premium brand work", "Bulk build at low cost", "Long-term product ownership", "Production systems + ongoing growth"],
        ],
      },
    ],
  },

  businessImpact: {
    title: "Business Impact: What 6+ Years and 120+ Projects Produced",
    intro: [
      "Aggregate numbers across every ClickTake engagement since 2019. These are not projections — they are actuals from shipped work.",
    ],
    metrics: [
      { value: "120+", label: "Projects shipped", description: "Since 2019 across 4 offices and 14 client countries." },
      { value: "92%", label: "Client retention", description: "Of clients who completed a project, 92% returned for a second engagement or moved to retainer." },
      { value: "£18M+", label: "Client revenue attributed", description: "Revenue generated for clients via ClickTake-built systems (websites, SaaS, marketing) — measured by client self-report." },
      { value: "4.9/5", label: "Avg client rating", description: "Across 80+ verifiable reviews on Clutch, Google and Trustpilot." },
    ],
    body: [
      "Client retention is the metric we track most carefully. A 92% retention rate over 6 years means we are not winning one-off deals — we are building long-term relationships. The average ClickTake client has been with us for 2.4 years and has run 2.7 engagements. The longest-running client (a UK e-commerce brand) has been on retainer since 2020.",
      "The £18M+ revenue-attributed number is the most conservative metric we publish. It only counts revenue clients explicitly attribute to ClickTake-built systems in their own reporting. The true lift — including organic search traffic gains, conversion rate improvements, and AI-driven cost savings — is substantially higher but harder to attribute precisely.",
      "The 4.9/5 average rating is aggregated from 80+ reviews across Clutch (28 reviews), Google (35 reviews) and Trustpilot (17 reviews). We do not pay for reviews, do not offer discounts in exchange for reviews, and do not filter negative reviews. The two non-5-star reviews we have received are public on Clutch and describe specific delivery issues we resolved.",
    ],
  },

  integrations: {
    title: "Ecosystem: Tools, Platforms & Compliance",
    intro: [
      "The tools and platforms ClickTake is certified on, partnered with, or formally compliant with. This is not a marketing list — every item below is verified and current.",
    ],
    categories: [
      {
        name: "Platform partnerships",
        items: ["Cloudflare Partner", "Vercel Partner", "Google Partner (Premier tier)", "Meta Business Partner", "Shopify Partner", "WordPress VIP Partner", "AWS Consulting Partner"],
      },
      {
        name: "AI/ML platforms",
        items: ["OpenAI API", "Anthropic API", "AWS Bedrock", "Google Vertex AI", "Azure OpenAI", "Cloudflare Workers AI", "Together AI", "Replicate"],
      },
      {
        name: "Marketing & analytics",
        items: ["Google Analytics 4 certified", "Google Tag Manager certified", "Google Ads certified", "Meta Blueprint certified", "HubSpot Solutions Partner", "Salesforce App Innovation Partner"],
      },
      {
        name: "Payments & operations",
        items: ["Stripe Verified Partner", "PayPal Partner", "Razorpay Partner", "Xero Partner", "Deel Certified"],
      },
    ],
    compliance: ["GDPR (UK + EU)", "HIPAA-ready architecture", "SOC 2 Type II aligned operations", "ISO 27001 aligned", "PCI DSS scoped builds", "EU AI Act readiness assessments"],
  },

  caseStudies: {
    title: "Two Client Engagements That Define Us",
    intro: [
      "Anonymized but factual. Names withheld under NDA; the work and numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK healthcare provider (~180 clinicians, NHS-adjacent)",
        situation: "In 2024 the provider was spending 90+ minutes per clinician per day on visit notes, contributing to a 31% burnout rate and a 6-week chart-update backlog.",
        task: "Build a HIPAA-compliant LLM scribe that drafts structured SOAP notes from consultation transcripts, grounded in the patient chart and ICD-10 codes, with a clinician-approval workflow.",
        action: "ClickTake deployed a self-hosted Llama 3.1 70B model on AWS p4d instances inside a HIPAA-scoped VPC. We built a RAG pipeline over the EHR's FHIR API, fine-tuned the model on 3,400 de-identified historical notes, and integrated the approval workflow into the existing EHR via SMART-on-FHIR. The eval suite of 312 test cases ran nightly throughout the engagement.",
        result: "Average note-writing time fell from 11 minutes to 2.5 minutes per visit. Chart-update backlog cleared in 4 weeks. Clinician satisfaction scores rose 38%. Denied-claims rate fell 22% due to more accurate ICD-10 coding. The system now processes 4,200 consultations per week.",
        quote: {
          text: "The first AI tool our clinicians actually thank us for. The notes are good enough to approve with minor edits — which I never expected from an LLM.",
          author: "Clinical Operations Director",
          title: "NHS-adjacent healthcare network",
        },
      },
      {
        client: "B2B SaaS company, 8K customers, ~$40M ARR",
        situation: "Tier-1 support handled 14,000 tickets/month with a 6.2-hour first-response time. CSAT was 78%. The product surface area was growing faster than the support team could scale.",
        task: "Reduce first-response time to under 30 minutes and lift CSAT to 85%+ without growing headcount — using an LLM assistant that agents collaborate with rather than a customer-facing chatbot.",
        action: "ClickTake built a RAG-grounded assistant on GPT-4o with fallback to Claude 3.5 for long-context tickets. The system reads the ticket, retrieves relevant docs and past resolutions, and drafts a reply the agent reviews. We deployed behind the existing Zendesk interface with a 4-week agent shadow period. The eval suite tracked 247 ticket categories.",
        result: "42% of tickets auto-resolved without human action. Average handle time on the remaining tickets fell from 4.2 hours to 1.1 hours. First-response time dropped to 14 minutes. CSAT rose to 89%. The support team grew 0% while ticket volume grew 31% — the LLM absorbed the increase.",
        quote: {
          text: "We thought we'd need to hire 8 more agents this year. We hired zero. The assistant isn't replacing anyone — it's making everyone 3x faster.",
          author: "VP of Customer Experience",
          title: "B2B SaaS company",
        },
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions About ClickTake",
    intro: [
      "If your question is not here, book a 30-minute call — we answer most strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Company basics",
        questions: [
          {
            q: "When was ClickTake founded and where is it registered?",
            a: "ClickTake was founded in 2019 and is registered in the United Kingdom (Companies House). The registered HQ is in Birmingham, with engineering operations in Multan (Pakistan), and business-development desks in Austin (USA) and Dubai (UAE).",
          },
          {
            q: "How big is the team and how is it distributed?",
            a: "28 people across 4 offices: 8 in Birmingham (leadership, accounts, project management), 16 in Multan (engineering, AI, QA, design), 2 in Austin (US business desk), and 2 in Dubai (MENA business desk). The Pakistan hub delivers engineering for all four client regions.",
          },
          {
            q: "What does the name 'ClickTake' mean?",
            a: "The name reflects the agency's positioning between click (digital marketing / traffic) and take (conversion / revenue). The full name is ClickTake Technologies — emphasizing the engineering depth, not just the marketing depth.",
          },
          {
            q: "Are you a UK company or a Pakistan company?",
            a: "Both, operationally. ClickTake Technologies Ltd is the UK registered entity. ClickTake Technologies (Pvt) Ltd is the Pakistan entity employing the engineering team. Clients contract with whichever entity best suits their tax, currency and data-residency preferences.",
          },
        ],
      },
      {
        name: "Working with us",
        questions: [
          {
            q: "What is the typical engagement size?",
            a: "Engagements range from £6K (single landing page or audit) to £450K (multi-region SaaS with custom LLM). The median engagement is £35-£70K. Retainers range from £1.5K/month (small WP site maintenance) to £25K/month (managed multi-region SaaS + LLM SLA).",
          },
          {
            q: "Do you work with startups or only established companies?",
            a: "Both. About 35% of engagements are with pre-seed to Series A startups, 50% with mid-market businesses ($1M-$100M revenue), and 15% with enterprises. Startups typically engage us for the 90-day Starter Kit; enterprises for custom LLM systems with compliance requirements.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before any work begins. All custom code, fine-tuned weights, prompts, evaluation suites and design files produced during an engagement are the client's IP, deliverable in a Git repository at the end of the project. ClickTake retains no rights to client proprietary work.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the system under a managed SLA; (2) ClickTake hands off to the client team after a 4-week shadow-operations period; (3) Hybrid — ClickTake handles escalations and quarterly upgrades, client team handles day-to-day ops. ~65% of clients choose option 1 or 3.",
          },
        ],
      },
      {
        name: "Hiring & careers",
        questions: [
          {
            q: "Where are your open roles and how do I apply?",
            a: "Current open roles are listed at /careers. Most engineering roles are based in Multan (Pakistan); most client-facing roles are based in Birmingham (UK) or remote in the US/UAE. Apply via the form on the careers page — we respond to every qualified application within 5 business days.",
          },
          {
            q: "Do you hire remote or only in-office?",
            a: "Hybrid. Engineering roles in Multan are in-office 3 days/week. Leadership and account roles in Birmingham are in-office 2 days/week. US and UAE desks are remote. We do not hire fully-remote engineers in Pakistan — the in-office cadence is deliberate for mentorship and code review.",
          },
          {
            q: "What is the interview process?",
            a: "Four rounds: (1) 30-min recruiter screen; (2) 60-min technical interview with a senior engineer; (3) take-home exercise (4-6 hours, paid for senior roles); (4) 60-min culture and values interview with two team members. Total cycle time is typically 2-3 weeks.",
          },
        ],
      },
    ],
  },

  finalCta: {
    title: "Want to Talk to a Real Engineer, Not a Salesperson?",
    subtitle:
      "Book a 30-minute call. We will match you with a senior engineer or growth lead based on your use case — not a salesperson reading from a script. If we are not the right fit, we will tell you in the first 10 minutes and refer you to someone who is.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min call",
        description: "Free. Tell us your use case. We will tell you whether we can help — or refer you to someone who can.",
      },
      {
        step: "2",
        title: "Receive a scope + quote",
        description: "Within 5 business days. Fixed scope, fixed price, fixed timeline. No vague estimates.",
      },
      {
        step: "3",
        title: "Start with a 1-week paid sprint",
        description: "De-risk the engagement. Most clients run a 1-week paid discovery sprint before committing to the full build.",
      },
    ],
    primaryCta: { label: "Book a Free 30-min Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "See Our Work", href: "/portfolio", variant: "outline" },
  },
}
