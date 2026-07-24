import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/digital-marketing/content-strategy — Content Strategy & SEO
 *
 * Topical authority, programmatic SEO, editorial calendars and distribution.
 * Built on Ahrefs, Semrush, Clearscope, Surfer SEO, Frase, MarketMuse,
 * Screaming Frog and Botify. ~5,300 words across 12 sections.
 */
export const contentStrategyDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Digital Marketing",
    title: "Content Strategy & SEO: Editorial Engines That Compound Traffic",
    subtitle:
      "We design and operate content programmes that build topical authority — pillar pages, topic clusters, programmatic SEO and editorial calendars — measured by organic sessions, keyword rankings and content-to-revenue attribution, not by post count.",
    geoDefinition:
      "Content strategy is the systematic planning, production, distribution and measurement of editorial and visual content organised around topic clusters that search engines and AI answer engines reward with sustained organic visibility. A modern content strategy combines topical authority maps, programmatic SEO (template-driven pages at 1,000–100,000 scale), human-edited AI-assisted production, and content-to-revenue attribution that links each article to leads, pipeline and revenue. ClickTake Technologies operates content programmes for SaaS, e-commerce, marketplaces, publishing and B2B lead-gen clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with editorial teams fluent in Ahrefs, Semrush, Clearscope and Surfer SEO.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Content Audit", href: "/contact", variant: "orange" },
      { label: "Download the Editorial Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "312%", label: "Avg. organic traffic lift (12mo)" },
      { value: "1,840", label: "Keywords ranked per client (median)" },
      { value: "4.2×", label: "Content-to-revenue attribution" },
      { value: "72hr", label: "Brief → published turn" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing/content-strategy" },
      { label: "Content Strategy & SEO" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Content Programmes Become a Cost Centre",
    intro: [
      "Most content programmes fail the same way: a calendar full of 'interesting' posts, a volume target that rewards publishing over performance, and an attribution model that credits the first-touch blog post the prospect read 9 months ago with $0 because the deal closed on a branded search. After 18 months of investment, the team has published 180 articles, traffic has grown 40%, and the CFO is asking why content can't pay for itself.",
      "The structural problem is that most content programmes are designed for traffic, not for revenue. Traffic is easy to grow — write more, target broader keywords, syndicate to LinkedIn. Revenue is hard to attribute — the buyer's journey spans 6–18 touchpoints over 30–180 days, and the content team rarely owns the data infrastructure to prove their contribution. Without that attribution, content gets cut first when budgets tighten.",
    ],
    painPoints: [
      {
        title: "Volume targets reward publishing, not compounding",
        description:
          "An editorial team measured on 'posts per month' ships thin content. Thin content ranks for nothing, converts nobody, and after 12 months you have 180 articles with 0 featured-snippet placements and a domain rating that hasn't moved. Volume is a vanity metric; topical authority is the real one.",
      },
      {
        title: "Keyword research without business intent wastes spend",
        description:
          "Ranking for 'what is CRM' drives 12,000 monthly sessions and zero pipeline. Ranking for 'CRM for real estate teams under 50 agents' drives 240 monthly sessions and 14 qualified leads per month. Most content programmes optimise to the first kind of keyword because the volume looks better in the dashboard.",
      },
      {
        title: "No content-to-revenue attribution = no budget defence",
        description:
          "Without HubSpot/Stripe/Salesforce wired back to GA4 and content paths, every dollar spent on content is undefendable at budget review. The CMO can't show that the 6 articles on 'API rate limiting' drove $380K of pipeline over 9 months — so the team gets cut to 2 writers when the next downturn hits.",
      },
      {
        title: "AI-generated content without editorial review tanks E-E-A-T",
        description:
          "Google's 2024 spam updates penalised sites publishing AI-generated content at scale without human editorial oversight. Sites that published 1,000+ AI articles in 2023 saw 60–90% organic traffic drops. AI accelerates production; it doesn't replace expertise, experience, authoritativeness and trustworthiness (E-E-A-T).",
      },
    ],
    paradigmShift: [
      "A content programme is a compounding asset that converts intent into revenue. We engineer it as such: a topical authority map that matches the buyer journey, a production pipeline that ships 4 articles per writer per week with editorial review, an attribution layer that ties each article to pipeline and revenue, and a refresh cycle that updates top performers every 90 days. The deliverable is not a blog post; it is a measurable, defensible, compounding acquisition channel that finance can model.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production-Grade Content Strategy Actually Is",
    intro: [
      "A content strategy is a stack of cooperating layers — topic authority, production, distribution, measurement and refresh — not a content calendar. Each layer can be excellent on its own and the programme will still underperform if the layers don't interlock. Below is how each layer works in a ClickTake-operated programme.",
    ],
    subsections: [
      {
        heading: "Topical authority: pillar + cluster architecture",
        body: [
          "Topical authority is the strategy of comprehensively covering one topic area — say, 'API rate limiting' — across a single pillar page (the 4,000–6,000-word definitive guide) plus 8–15 cluster articles (each targeting a long-tail keyword like 'Redis rate limiting implementation', 'token bucket vs leaky bucket', 'rate limit headers'). All clusters internally link to the pillar; the pillar internally links to all clusters. The internal-link graph signals to search engines that your domain is the authority on this topic. Sites with a pillar+cluster architecture rank for the head term 3–6 months faster than sites publishing standalone articles on the same keywords.",
          "The pillar+cluster model scales via programmatic SEO when the topic has a templatable structure. Job boards, marketplaces, location pages, comparison pages and glossary pages are all programmatic patterns — a single template generates 1,000–100,000 unique pages from a database. Programmatic SEO works when (1) each page has unique data, (2) the template includes unique content beyond the data, and (3) internal linking is preserved. We deploy programmatic SEO on Next.js with ISR (Incremental Static Regeneration) for sub-200ms TTFB, with each page validated against Search Console weekly for indexation status.",
        ],
        jargon: [
          { term: "Topical authority", def: "A search engine's confidence that your domain comprehensively covers a topic. Built by publishing 8–20 articles per topic cluster, internally linked via a pillar page, with consistent authorship and E-E-A-T signals. Topical authority compounds: each new cluster article lifts the ranking of the pillar and vice versa." },
          { term: "Pillar page", def: "A 4,000–8,000-word comprehensive guide on a head term (e.g., 'CRM software'). Targets the high-volume keyword, links to all cluster articles, and is updated every 90 days. Pillar pages typically drive 30–50% of a programme's organic traffic." },
          { term: "Programmatic SEO", def: "Template-driven page generation at 1,000–100,000 page scale. Each page targets a unique long-tail keyword (e.g., '[city] + [service]' or '[tool A] vs [tool B]'). Requires a clean data source, a unique content layer per page, and disciplined internal linking to avoid thin-content penalties." },
        ],
      },
      {
        heading: "Production: in-house + freelance + AI-assisted, with editorial review",
        body: [
          "Content production at scale requires a blended workforce. We staff each programme with a senior editor (in-house), 2–4 staff writers (in-house or freelance), 4–8 freelance subject-matter experts (SMEs) for technical accuracy, and an AI-assisted drafting layer (Claude 3.5 Sonnet or GPT-4o for first drafts and outlines). The editorial review layer is non-negotiable — every published article passes through (1) SME fact-check, (2) editor structural review, (3) SEO brief compliance check via Clearscope, and (4) plagiarism + AI-detection scan via Originality.ai. Production throughput is 4 articles per writer per week at 1,500–2,500 words each.",
          "The brief is the source of truth. Each brief specifies the target keyword, secondary keywords, search intent (informational / commercial / transactional / navigational), the 3–5 competing articles to differentiate from, the unique angle, the required word count, the internal-link targets, the schema markup, the author byline (with bio + E-E-A-T signals), and the CTA. A writer who deviates from the brief produces content that doesn't rank — the editorial process catches this before publication.",
        ],
        jargon: [
          { term: "E-E-A-T", def: "Experience, Expertise, Authoritativeness, Trustworthiness — Google's quality framework, evaluated per page via author bio, credentials, external citations, content accuracy and brand reputation. YMYL (Your Money Your Life) topics — finance, health, legal — face the strictest E-E-A-T scrutiny." },
          { term: "Clearscope / Surfer SEO score", def: "An SEO content optimization tool that scores an article (0–100) based on keyword coverage, term frequency, and topical relevance vs. top-ranking competitors. We require a score ≥75 before publication; articles scoring 85+ rank 1.8× faster than those scoring 60–70." },
          { term: "Content brief", def: "A structured document that defines what an article must achieve, who it's for, what keywords it targets, what competing pages exist, what the unique angle is, and what internal/external links it must include. The brief is the contract between editorial, SEO and writer." },
        ],
      },
      {
        heading: "Distribution: content is a launch, not a publish",
        body: [
          "An article that's published but not distributed loses 70% of its potential traffic. We treat each piece as a launch with a 30-day distribution arc: (1) publication on the blog with internal links from 4–8 existing articles, (2) syndication to LinkedIn (3 posts from the author + 1 from the company page), (3) repurposing to a 90-second vertical video for TikTok/Reels/YouTube Shorts, (4) inclusion in the next email newsletter with a personalised hook, (5) submission to Hacker News / Reddit / industry newsletters where relevant, (6) outreach to 10–20 industry experts for quote inclusion (which becomes a backlink opportunity when they share). Distribution typically drives 30–50% of an article's first-30-day traffic; organic search catches up over 90–180 days.",
          "Distribution also includes the refresh cycle. Top-performing articles are refreshed every 90 days: stats updated, new sections added, internal links to newer content, schema revalidated, and the 'last updated' date bumped. Refreshed articles see a 15–35% ranking lift within 4–6 weeks. We maintain a refresh queue of the top 20% of articles by traffic; each is refreshed 4× per year.",
        ],
      },
      {
        heading: "Measurement: content-to-revenue attribution",
        body: [
          "Content-to-revenue attribution is the discipline that defends the content budget. We deploy GA4 + HubSpot/Salesforce + a content-path data warehouse view that links every organic session to a contact, every contact to a deal, and every deal to closed-won revenue. The model attributes revenue via a multi-touch attribution model (position-based: 40% first-touch / 20% mid-touch / 40% last-touch) — applied specifically to content touchpoints, not all marketing touchpoints. A blog article that drove the first-touch on a $48K deal gets $19,200 of credit; the article that drove the last-touch gets $19,200; mid-touch articles share $9,600.",
          "We report content ROI monthly: total revenue attributed, cost per article (writer + editor + SME + tooling amortisation), ROI multiple (revenue ÷ cost). Most programmes we operate reach 3–6× ROI within 12 months and 8–15× ROI within 24 months — because content is a compounding asset. The first article costs $800 to produce and drives $0 in revenue for 6 months. By month 18, that article has driven $14K of attributed revenue. By month 36, $42K. The math only works if you commit to the programme long enough for the compounding to materialise.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build Content Programmes With",
    intro: [
      "Our content stack is the same set of tools we operate across 24 active client programmes. Every tool below has been selected because it survived a real content-scale incident — not because it had the best booth at BrightonSEO.",
    ],
    categories: [
      {
        name: "Research & Briefing",
        items: [
          { name: "Ahrefs", description: "Backlink analysis, keyword research, rank tracking, content gap analysis. Industry-standard for organic-search intelligence. Our daily driver for keyword volume, difficulty and SERP feature opportunities." },
          { name: "Semrush", description: "Keyword Magic Tool for long-tail discovery, Position Tracking for daily rank updates, Topic Research for cluster ideation. We use Semrush alongside Ahrefs for cross-validation on volume estimates." },
          { name: "Clearscope", description: "Content optimization scoring (0–100). Each article must score ≥75 before publication. Integrates with Google Docs and WordPress. Surfer SEO is an equivalent alternative we deploy per client preference." },
          { name: "Frase / MarketMuse", description: "AI-assisted content briefs and topic modeling. Frase for speed-to-brief at scale; MarketMuse for deeper topical-authority mapping on enterprise programmes with 500+ articles in scope." },
          { name: "Also Asked / Answer The Public", description: "People-Also-Ask question mining for FAQ schema and featured-snippet targeting. Surfaces question variants that Ahrefs/Semrush underreport." },
        ],
      },
      {
        name: "Production & Editorial",
        items: [
          { name: "Next.js + MDX + Contentlayer", description: "Programmatic SEO and headless CMS-rendered pages on Next.js App Router with ISR. Sub-200ms TTFB, perfect Core Web Vitals, easy programmatic page generation." },
          { name: "WordPress + Yoast / Rank Math", description: "For clients on WordPress. Yoast for technical SEO basics (schema, breadcrumbs, XML sitemaps); Rank Math as the more feature-rich alternative." },
          { name: "Sanity / Contentful / Payload CMS", description: "Headless CMS for editorial teams that need structured content, custom fields and multi-channel publishing. Sanity for real-time collaboration; Payload for developer-friendly schema-first modelling." },
          { name: "Notion + Linear", description: "Editorial calendar in Notion (brief → draft → review → publish → distribute → refresh workflow); Linear for technical SEO tasks (schema fixes, redirect chains, internal-link cleanup)." },
          { name: "Originality.ai + Grammarly Business", description: "AI-detection + plagiarism scan (Originality) and grammar/style enforcement (Grammarly) as the last gate before publication. Every article passes both before going live." },
        ],
      },
      {
        name: "Technical SEO & Measurement",
        items: [
          { name: "Screaming Frog + Sitebulb", description: "Crawl 10K–1M+ URLs for technical SEO audits. Screaming Frog for daily crawls; Sitebulb for visual crawl analysis and client reporting." },
          { name: "Botify", description: "Enterprise crawler + log file analyzer for sites above 100K URLs. Tells you which pages Google actually crawls vs. which it ignores — the basis for crawl-budget optimization." },
          { name: "Google Search Console + GA4", description: "Free baseline. GSC for indexation status, query performance, core web vitals; GA4 for session, conversion and content-path attribution." },
          { name: "Looker Studio + BigQuery", description: "Cross-source dashboards. BigQuery as the warehouse for content-path data; Looker Studio for client-facing monthly reports (traffic, rankings, attributed revenue, ROI)." },
          { name: "HubSpot / Salesforce + Stripe attribution", description: "CRM-side attribution wiring. Custom properties on each contact for 'first content touch', 'last content touch', and 'content touch count' — synced to deals and closed-won revenue." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "In-house writer", "Content mill", "ClickTake Content Strategy"],
      rows: [
        ["Topical authority map", "no", "no", "yes:Pillar + cluster + programmatic"],
        ["Briefs with SEO targets", "maybe", "no", "yes:Clearscope ≥75 required"],
        ["SME editorial review", "no", "no", "yes:Per-article fact-check"],
        ["Production rate", "yes:1–2/wk", "yes:5–10/wk thin", "yes:4/wk writer, editorial-grade"],
        ["Distribution arc", "no", "no", "yes:30-day multi-channel"],
        ["Refresh cycle", "no", "no", "yes:Top 20% refreshed quarterly"],
        ["Content-to-revenue attribution", "no", "no", "yes:Multi-touch via HubSpot/Salesforce"],
        ["Programmatic SEO", "no", "no", "yes:Next.js + ISR templates"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Topic Map to Compounding Traffic in 5 Phases",
    intro: [
      "We ship content programmes in 8–12 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'editorial kickoff' where the team shows you a Notion doc with 10 blog post titles.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Topic Map & Authority Audit",
        duration: "Week 1–3",
        deliverables: ["Topical authority map (10–30 clusters)", "Competitor content gap analysis", "Keyword universe (500–5,000 keywords)", "Existing content audit"],
        description:
          "We map the topic clusters your business should own — derived from your product surface, buyer journey and competitor coverage. For each cluster, we identify the pillar keyword (head term), the 8–15 cluster keywords (long-tail), and the programmatic opportunities (if any). We audit your existing content: which articles drive traffic, which drive revenue, which are thin and should be redirected. The deliverable is a 12-month editorial roadmap with prioritised clusters ranked by revenue potential and ranking difficulty.",
      },
      {
        phase: "Phase 2",
        title: "Production Pipeline Setup",
        duration: "Week 3–5",
        deliverables: ["Editorial workflow in Notion", "Brief templates per content type", "Freelance roster onboarded", "AI-assisted drafting pipeline"],
        description:
          "We stand up the production pipeline. Editorial calendar in Notion with stages: brief → outline → draft → SME review → editor review → SEO score → publish → distribute → refresh. Brief templates per content type (pillar, cluster, comparison, listicle, case study). Freelance SMEs onboarded with NDAs and style guides. AI-assisted drafting pipeline configured (Claude 3.5 Sonnet for outlines and first drafts, with human editor control). Target throughput: 4 articles per writer per week.",
      },
      {
        phase: "Phase 3",
        title: "Pillar + Cluster Launch",
        duration: "Week 5–8",
        deliverables: ["First 3 pillars published", "First 12–24 cluster articles live", "Internal-link graph established", "Schema markup validated"],
        description:
          "We launch the first 3 pillar pages (one per priority cluster) plus 12–24 cluster articles supporting them. Internal links are bidirectional: each cluster links to the pillar; the pillar links to all clusters. Schema markup (Article, FAQPage, HowTo, BreadcrumbList) is validated via Schema.org validator and Google Rich Results Test. Each article is submitted to GSC for indexing on publication day. By end of week 8, the cluster has topical authority signals established and the first ranking movements appear.",
      },
      {
        phase: "Phase 4",
        title: "Distribution & Attribution Wiring",
        duration: "Week 8–10",
        deliverables: ["30-day distribution arc per article", "Email + social + syndication channels live", "HubSpot/Salesforce content attribution", "Looker Studio dashboard"],
        description:
          "We wire the distribution layer: email newsletter inclusion, LinkedIn author posts, repurposing pipeline to short-form video, submission to industry newsletters and communities. We wire the attribution layer: HubSpot/Salesforce custom properties for first/mid/last content touch, BigQuery view that joins GA4 sessions to CRM contacts to deals to closed-won revenue. The Looker Studio dashboard goes live with monthly views of traffic, rankings, attributed pipeline, attributed revenue, ROI per cluster and ROI per article.",
      },
      {
        phase: "Phase 5",
        title: "Programmatic SEO + Refresh Cycle",
        duration: "Week 10–12",
        deliverables: ["Programmatic SEO templates live", "Refresh queue established", "Quarterly review cadence", "12-month roadmap v2"],
        description:
          "We launch the programmatic SEO layer (if applicable): comparison pages, location pages, glossary pages, or marketplace listing pages — generated from a database via Next.js + ISR. We establish the refresh cycle: top 20% of articles by traffic refreshed every 90 days, with stats updated, new sections added, internal links to newer content, and 'last updated' date bumped. The quarterly review cadence is set with finance in the room — content ROI reported as a multiple of cost, not as a vanity traffic number.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Content Strategy Compounds",
    intro: [
      "The use cases below are drawn from production content programmes operated between 2023 and 2026. Each card describes the specific business problem, the content architecture we built, and the measurable result after 12 months.",
    ],
    cases: [
      {
        industry: "B2B SaaS (DevOps tooling)",
        problem: "Organic search contributed 8% of pipeline. The blog had 142 articles — most published in 2021 — driving 4,200 monthly sessions and ranking for no commercial-intent keywords. Sales team had no inbound confidence; CAC was $14K.",
        application: "Rebuilt the blog around 8 priority clusters (API rate limiting, observability, deployment automation, etc.). Published 3 pillars (4–6K words each) + 64 cluster articles (1.5–2.5K words each) over 12 months. Added programmatic SEO for 240 '[tool A] vs [tool B]' comparison pages. Wired HubSpot content-path attribution.",
        result: "Organic sessions grew to 38,000/month (9×). Organic share of pipeline grew to 34%. CAC dropped to $6,800. 14 keywords in top 3, 89 in top 10, 412 in top 100. Attributed revenue: $1.4M in year 1.",
      },
      {
        industry: "E-commerce (Specialty Food Brand)",
        problem: "Brand relied on paid social for 78% of revenue. Organic search contributed 6%. The blog had 28 recipe posts and zero product-led content. CAC was rising 18% YoY as Meta CPMs inflated.",
        application: "Built content around 4 clusters: recipes (informational), ingredient sourcing (E-E-A-T), cooking techniques (educational), and product collections (transactional). Programmatic SEO for 180 'recipes with [ingredient]' pages. Refresh cycle on top 30 recipes quarterly. Attribution via Shopify + GA4 + Klaviyo.",
        result: "Organic sessions grew from 4,200 to 47,000/month. Organic share of revenue grew to 31%. Paid dependency dropped to 52%. Attributed revenue: $1.9M incremental in year 1.",
      },
      {
        industry: "Marketplace (B2B Services)",
        problem: "Marketplace had 8,400 service providers indexed but only 1,800 driving traffic. Long-tail '[service] in [city]' pages existed but were thin (200–400 words, no internal links, no unique data).",
        application: "Programmatic SEO rebuild: each provider page enriched with 800–1,200 words of unique content (services offered, service area, certifications, pricing range). Template generated 8,400 unique pages with internal-link clusters per city. Added comparison pages ('[service] pricing by city'). Crawl budget optimized via Botify.",
        result: "Indexed pages grew from 1,800 to 8,200. Organic sessions grew from 22,000 to 184,000/month. Top-10 ranking keywords grew from 480 to 3,900. Lead volume grew 4.1×.",
      },
      {
        industry: "Publishing (Industry Newsletter)",
        problem: "Newsletter had 24,000 subscribers but no search engine presence — all traffic was direct/email. Revenue model depended on newsletter growth, which had plateaued.",
        application: "Repurposed 18 months of newsletter issues into 280 SEO-optimised articles organised into 14 topical clusters. Added programmatic SEO for 1,200 '[company] news' pages tracking portfolio companies. Built topical authority map aligned to the 3 industry verticals covered.",
        result: "Organic sessions grew from 1,200 to 72,000/month in 14 months. Newsletter subscribers grew to 58,000. Subscription revenue grew 2.6×. Organic became the #1 acquisition channel for new subscribers.",
      },
      {
        industry: "B2B Lead Gen (Cybersecurity Consulting)",
        problem: "Consulting firm relied on referrals and conferences. Organic search drove 12 monthly leads at $0 because no content existed. Sales cycle of 90+ days with no inbound nurture.",
        application: "Built 6 clusters around compliance frameworks (SOC2, ISO 27001, HIPAA, PCI DSS, GDPR, NIST). Published 4 pillars + 38 cluster articles. Added gated assets (compliance checklists, RFP templates) for lead capture. Wired HubSpot lead scoring + sales handoff at score 65+.",
        result: "Organic sessions grew to 9,400/month. Lead volume grew to 84/month with 22% converting to SQLs. Sales cycle compressed to 58 days. Closed-won revenue from organic: $1.1M in year 1.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Content Strategy Models Compared",
    intro: [
      "An honest comparison of the four content operating models most brands consider. We have operated all four — the right choice depends on your organic-search ambition, in-house talent depth, and willingness to commit to a 12-month+ compounding cycle.",
    ],
    tables: [
      {
        title: "In-house writer vs. Content mill vs. Specialist content agency vs. ClickTake Content Strategy",
        headers: ["Dimension", "In-house writer", "Content mill", "Specialist agency", "ClickTake"],
        rows: [
          ["Monthly output", "yes:8–12 articles", "yes:30–60 articles", "yes:15–25 articles", "yes:16–32 articles"],
          ["Topical authority map", "no", "no", "maybe", "yes"],
          ["Programmatic SEO", "no", "no", "no", "yes"],
          ["SME editorial review", "no", "no", "yes", "yes"],
          ["Distribution arc", "no", "no", "maybe", "yes:30-day multi-channel"],
          ["Refresh cycle", "no", "no", "no", "yes:Quarterly"],
          ["Content-to-revenue attribution", "no", "no", "no", "yes:HubSpot/Salesforce wired"],
          ["Min monthly retainer", "yes:$6K (salary share)", "yes:$2K", "yes:$12K", "yes:$9K"],
        ],
      },
      {
        title: "Content type by search intent and funnel stage",
        headers: ["Content type", "Search intent", "Funnel stage", "Avg. word count", "Typical ranking time"],
        rows: [
          ["Pillar page", "Informational (broad)", "TOFU/MOFU", "4,000–8,000", "6–12 months"],
          ["Cluster article", "Informational (specific)", "TOFU/MOFU", "1,500–2,500", "3–6 months"],
          ["Comparison page", "Commercial", "MOFU/BOFU", "2,000–3,500", "4–8 months"],
          ["Listicle", "Informational/Commercial", "TOFU/MOFU", "1,500–3,000", "3–6 months"],
          ["Case study", "Commercial", "MOFU/BOFU", "1,200–2,500", "4–8 months"],
          ["Programmatic page", "Transactional", "BOFU", "600–1,500", "2–4 months"],
          ["Glossary / definition", "Informational", "TOFU", "800–1,500", "3–6 months"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Traffic, Pipeline and Revenue",
    intro: [
      "Content programmes earn their budget back through one of three mechanisms: organic traffic growth (reducing paid media dependency), pipeline contribution (filling the sales funnel with inbound leads), or direct revenue attribution (closing the loop from content touch to closed-won deal). The numbers below are aggregated across 24 production programmes operated 2023–2026.",
    ],
    metrics: [
      { value: "312%", label: "Avg. organic traffic lift (12mo)", description: "Across all operated programmes at month 12, vs. month-0 baseline." },
      { value: "4.2×", label: "Avg. content-to-revenue attribution", description: "Revenue attributed to content divided by content programme cost, at month 18." },
      { value: "−41%", label: "Avg. paid media dependency reduction", description: "Share of new-customer acquisition shifting from paid to organic at month 12." },
      { value: "84", label: "Top-10 keywords per client (median)", description: "Keywords ranking in Google's top 10 results at month 12." },
    ],
    body: [
      "Organic traffic growth is the most visible impact and typically justifies the programme within 12 months. A B2B SaaS client with 4,200 monthly organic sessions at engagement start reaches 38,000 monthly sessions at month 12 — a 9× lift that, valued at the equivalent paid-search CPC ($4.20), represents $159K/month of media-equivalent value. The content programme that delivered this costs $14K/month to operate; the payback period is 9 months even before counting pipeline contribution.",
      "Pipeline contribution is the second-order effect. The same SaaS client above saw organic's share of pipeline grow from 8% to 34% over 12 months — meaning the sales team had 4.2× more inbound-qualified leads to work, at a CAC of $6,800 instead of $14,000. The sales team's capacity was unchanged; the funnel was simply larger and warmer. The compounding effect: inbound leads from content close at 31% vs. 18% for cold outbound — meaning revenue grew faster than pipeline.",
      "Direct revenue attribution is the discipline that defends the budget. The same SaaS client above had $1.4M of revenue attributed to content in year 1 — meaning each of the 67 articles published that year drove $20,900 of attributed revenue on average. The top 5 articles drove 41% of attributed revenue; the bottom 20 drove 4%. This Pareto distribution is normal and informs the refresh cycle: doubling down on the top 20% compounds faster than expanding into new clusters. By year 2, attributed revenue reached $3.8M — a 2.7× lift on 1.4× content volume, evidence of compounding.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Content programmes do not live in a CMS. They sit inside your analytics, CRM, marketing automation, data warehouse and email stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "CMS & Publishing",
        items: ["WordPress + Yoast / Rank Math", "Next.js + MDX + Contentlayer (headless)", "Sanity / Contentful / Payload (headless CMS)", "Webflow (for marketing sites)", "Ghost (for publishing-first sites)", "Shopify (for e-commerce blog)"],
      },
      {
        name: "SEO & Research",
        items: ["Ahrefs / Semrush (keyword + backlink research)", "Clearscope / Surfer SEO (content optimization)", "Frase / MarketMuse (briefs + topic modeling)", "Screaming Frog / Sitebulb (technical crawls)", "Botify (enterprise crawl + log analysis)", "Google Search Console + GA4 (free baseline)"],
      },
      {
        name: "CRM & Attribution",
        items: ["HubSpot (custom content-touch properties + deal attribution)", "Salesforce (Pardot + Sales Cloud)", "Stripe (revenue back to content touch)", "Mixpanel / Amplitude (product-side attribution)", "BigQuery + Looker Studio (warehouse-native MTA)"],
      },
      {
        name: "Distribution & Email",
        items: ["Klaviyo / Attentive (email + SMS)", "Mailchimp / Customer.io / ConvertKit", "LinkedIn (author + company page auto-publish)", "Twitter/X + Threads auto-cross-posting", "Mailgun / Resend / Postmark (transactional)"],
      },
    ],
    compliance: ["GDPR (EU/UK consent + cookie banner)", "CCPA / CPRA (California)", "Google E-E-A-T guidelines (YMYL expertise)", "Google Helpful Content Update (2024) compliance", "Originality.ai plagiarism + AI-content scan (per article)", "Author byline + bio + credentials disclosure", "Schema.org structured data validation"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Programmes in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Brand names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "US-based B2B SaaS, ~$22M ARR, DevOps tooling",
        situation: "Organic search contributed 8% of pipeline ($1.76M of $22M ARR). The blog had 142 articles — most published in 2021 — driving 4,200 monthly sessions. No commercial-intent keywords ranked. CAC was $14K. The CMO was being pressured to cut content and reallocate to paid media, where ROAS was visible.",
        task: "Lift organic share of pipeline to 30%+ within 12 months, reduce CAC to under $9K, and build the attribution layer that would make content defensible at the next board review.",
        action: "ClickTake built a 12-month editorial roadmap around 8 priority clusters (API rate limiting, observability, deployment automation, IaC, security automation, monitoring, incident response, platform engineering). Published 3 pillars (5–7K words each) + 64 cluster articles (1.8–2.5K words each). Deployed programmatic SEO for 240 '[tool A] vs [tool B]' comparison pages on Next.js + ISR. Wired HubSpot content-path attribution (first/mid/last touch properties on contact + deal records). Built Looker Studio dashboard with monthly views of attributed pipeline and revenue per cluster.",
        result: "Organic sessions grew from 4,200 to 38,000/month (9×) in 12 months. Organic share of pipeline grew to 34%. CAC dropped to $6,800. 14 keywords in top 3, 89 in top 10, 412 in top 100. Attributed revenue: $1.4M in year 1. The CMO defended content at the board review with the dashboard; the team headcount was doubled rather than cut.",
        quote: {
          text: "For 3 years we couldn't prove content drove revenue. After ClickTake wired the attribution, the dashboard spoke for itself at the board meeting. We doubled the content team instead of cutting it.",
          author: "Chief Marketing Officer",
          title: "B2B SaaS company",
        },
      },
      {
        client: "UK-based specialty food e-commerce brand, ~£6M ARR",
        situation: "Brand relied on paid social for 78% of revenue. Organic search contributed 6%. The blog had 28 recipe posts and zero product-led content. CAC was rising 18% YoY as Meta CPMs inflated. The CFO had mandated a 30% reduction in paid spend over 18 months.",
        task: "Build organic into a 30%+ revenue channel within 12 months to absorb the paid-spend cut, while maintaining 4× blended ROAS on remaining paid.",
        action: "ClickTake built 4 content clusters: recipes (informational TOFU), ingredient sourcing (E-E-A-T authority), cooking techniques (educational MOFU), and product collections (transactional BOFU). Published 64 articles + 12 programmatic '[ingredient] recipes' pages per month over 9 months. Refresh cycle on top 30 recipes quarterly. Attribution via Shopify + GA4 + Klaviyo custom properties for first content touch.",
        result: "Organic sessions grew from 4,200 to 47,000/month. Organic share of revenue grew to 31%. Paid dependency dropped to 52% (exceeding the 30% reduction target). Blended ROAS held at 4.4×. Attributed revenue: £1.9M incremental in year 1. The CFO's paid-spend cut was implemented on schedule without revenue disruption.",
        quote: {
          text: "We were 12 months from a paid-spend cliff with no organic backstop. ClickTake built us a content engine that absorbed the cut and grew revenue 18% in the same period. The CFO now asks about content ROI monthly — and the answer is a 4× multiple.",
          author: "Founder & CEO",
          title: "Specialty food e-commerce brand",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most content-strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Engagements",
        questions: [
          {
            q: "How much does a content programme cost to operate?",
            a: "Monthly retainer ranges from $9K (single writer + part-time editor + SMEs on demand) to $35K (3 writers + senior editor + 4 SMEs + programmatic SEO engineering + full attribution dashboard). Most accounts sit in the $14K–$22K/month range. Production volume: 16–32 articles per month at 1,500–2,500 words each, plus programmatic page generation where applicable. Total all-in cost per article: $400–$1,200.",
          },
          {
            q: "What's the minimum engagement length?",
            a: "12 months. Content is a compounding asset — the first 6 months produce minimal ranking movement as Google assesses topical authority and E-E-A-T. Clients who cancel before month 9 lose most of the compounding benefit. We require a 12-month commitment upfront, then move to month-to-month with 60-day notice.",
          },
          {
            q: "Is there a setup fee?",
            a: "Yes — a one-time $8K–$15K setup fee covering topical-authority map, content audit, editorial workflow setup, freelance roster onboarding, and attribution layer wiring. This is foundation work that doesn't recur monthly. Existing programmes with clean attribution and structure can sometimes skip the setup fee if the audit comes back clean.",
          },
          {
            q: "Do you offer performance pricing on attributed revenue?",
            a: "Optional. Our standard model is fixed retainer. We also offer a hybrid model with 5–10% performance bonus on attributed revenue above an agreed baseline — clients typically prefer this once the attribution layer has been validated for 3+ months. We don't take a percentage of organic traffic or rankings (vanity metrics that game easily).",
          },
        ],
      },
      {
        name: "Content Production",
        questions: [
          {
            q: "Do you use AI to write the content?",
            a: "AI assists; humans author. We use Claude 3.5 Sonnet and GPT-4o for outline generation, first-draft scaffolding, and research synthesis. Every published article is fact-checked by a subject-matter expert, structurally reviewed by a senior editor, SEO-scored via Clearscope (≥75 required), and plagiarism + AI-detection scanned via Originality.ai. Articles published without human editorial review tank E-E-A-T signals — Google's 2024 Helpful Content Update penalised sites doing this at scale.",
          },
          {
            q: "How many articles will we publish per month?",
            a: "16–32 articles per writer per month at 1,500–2,500 words each, depending on content type. Pillar pages (4,000–8,000 words) count as 4 cluster articles. Programmatic SEO pages are generated separately at 100–5,000 pages per month depending on template. Volume is calibrated to your budget and the ranking difficulty of your target keywords — we won't publish 30 articles/month if your topic area only has 8 viable clusters.",
          },
          {
            q: "Who owns the content?",
            a: "You do. Always. Every article, brief, editorial calendar, and freelance contract is structured so the IP transfers to you on acceptance. We retain no rights to your content. We don't republish your content elsewhere or use it for other clients. Your CMS, your authors (with bylines), your backlinks.",
          },
          {
            q: "Can you work with our existing in-house writers?",
            a: "Yes. We operate in three configurations: (1) we manage the full programme with our writers + your editorial review; (2) we provide SEO briefs + editorial oversight and your writers produce; (3) hybrid — we staff the programmatic SEO and pillar pages, your team handles cluster articles. The configuration is decided in week 1 based on your in-house capacity and seniority.",
          },
        ],
      },
      {
        name: "SEO & Rankings",
        questions: [
          {
            q: "How long until we see ranking improvements?",
            a: "First ranking movements appear at week 6–8 for low-difficulty long-tail keywords (KD <20). Top-10 rankings for medium-difficulty keywords (KD 20–50) appear at month 4–8. Head-term rankings (KD >50) take 9–18 months. Topical authority compounds — the second cluster ranks 30–40% faster than the first because the domain has established E-E-A-T signals. We measure ranking velocity monthly and adjust the editorial calendar to accelerate the slowest clusters.",
          },
          {
            q: "What is programmatic SEO and do we need it?",
            a: "Programmatic SEO generates 1,000–100,000 unique pages from a database via a single template — e.g., '[city] + [service]' location pages for a multi-location business, '[tool A] vs [tool B]' comparison pages for a SaaS, '[ingredient] recipes' for a food brand. You need it if (1) you have a structured dataset (locations, products, ingredients, comparisons), (2) each page has unique data and a unique content layer, and (3) the keyword universe is large enough to justify the engineering investment (typically 500+ target keywords). We deploy programmatic SEO on Next.js + ISR for sub-200ms TTFB.",
          },
          {
            q: "How do you handle E-E-A-T for YMYL topics (finance, health, legal)?",
            a: "Three layers: (1) author bylines with credentialed bios — medical content is reviewed by a licensed MD; financial content by a CFA or CPA; legal content by a practicing attorney; (2) external citations to authoritative sources (peer-reviewed journals, government statistics, regulatory bodies) on every factual claim; (3) 'expert reviewer' credit lines on the article page. We've operated 4 YMYL programmes and seen organic traffic grow 2–4× despite YMYL being the most competitive E-E-A-T category.",
          },
          {
            q: "Can you guarantee specific keyword rankings?",
            a: "No — and any agency that does is lying. Google's algorithm considers 200+ ranking factors and updates 8–10 times per year. What we can guarantee is the input discipline: brief quality, editorial review, Clearscope scores, internal-link architecture, refresh cadence, and attribution wiring. Programmes operated to this discipline reliably produce 3–5× organic traffic growth in 12 months — but specific keyword positions are not contractually guaranteed.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your editorial teams based?",
            a: "Senior editors in Birmingham (UK) and Austin (USA). Writers and SMEs distributed globally with strong clusters in Multan (Pakistan), London, and US East Coast. Editorial direction is UK/US-led; production throughput is global. The 72-hour brief-to-publish turn is enabled by the distributed team covering multiple time zones — a brief written in Birmingham at 5pm is being drafted in Multan by 9am the next day.",
          },
          {
            q: "Do you write for our industry if you've never worked in it before?",
            a: "Yes, with SMEs. We pair our writers with subject-matter experts in your industry — typically freelance practitioners we onboard for the engagement. For YMYL topics (medical, financial, legal) we use credentialed SMEs with verifiable qualifications. We've written competently for industries including DevOps, cybersecurity, healthcare, fintech, real estate, e-commerce, B2B services, and education — each with SME review on every article.",
          },
          {
            q: "What happens if we want to bring content in-house later?",
            a: "We support it. Standard handover is 8 weeks: weeks 1–4 we document every editorial workflow, brief template, style guide, and attribution wiring in a Notion playbook; weeks 5–8 we shadow your in-house team and step in only on editorial escalations. After handover, we offer a $2.5K/month 'advisory only' tier where we review monthly performance and flag SEO/strategy issues without producing content.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build a Content Engine That Compounds?",
    subtitle:
      "Book a free 30-minute content audit. We'll pull your domain in Ahrefs, map your existing topical authority, identify the 3 highest-leverage clusters to invest in, and tell you honestly whether content is the right channel for your stage — or whether paid media or CRO would compound faster.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min content audit call",
        description: "Free. We pull your domain in Ahrefs, map topical authority, and identify the top 3 cluster opportunities.",
      },
      {
        step: "2",
        title: "Receive audit report + 12-month roadmap",
        description: "Fixed deliverable: content scorecard, gap analysis, prioritised cluster map, projected traffic + revenue lift.",
      },
      {
        step: "3",
        title: "Sign off on the roadmap — we operate",
        description: "12-month commitment. Monthly reporting on traffic, rankings, attributed pipeline and revenue. Cancel after month 12.",
      },
    ],
    primaryCta: { label: "Book a Free Content Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Editorial Playbook", href: "/resources", variant: "outline" },
  },
}
