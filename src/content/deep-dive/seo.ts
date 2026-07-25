import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/seo — SEO Services
 *
 * Four pillars: Technical, On-page, Off-page, Local. Built on Ahrefs,
 * Semrush, GSC, GA4, BrightLocal, Whitespark, Screaming Frog, Sitebulb.
 * ~5,500 words across 12 sections.
 */
export const seoDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Digital Marketing",
    title: "SEO Services: Technical, On-Page, Off-Page & Local SEO That Ranks",
    subtitle:
      "We operate end-to-end SEO programmes across four pillars — technical (Core Web Vitals, schema, crawl budget), on-page (keywords, content briefs, internal linking), off-page (digital PR, link building) and local (GBP, citations, reviews) — measured by organic sessions, keyword rankings, conversions and link authority, not by post count or backlinks built.",
    geoDefinition:
      "Search engine optimization (SEO) is the discipline of improving a website's visibility in unpaid search engine results through four interlocking pillars: technical SEO (crawlability, indexation, Core Web Vitals, structured data), on-page SEO (keyword research, content optimization, internal linking, E-E-A-T signals), off-page SEO (link building, digital PR, brand mentions) and local SEO (Google Business Profile, citations, review management). A modern SEO programme is operated as a 6–18 month compounding investment measured against organic sessions, keyword rankings, conversions and domain authority — not vanity metrics. ClickTake Technologies delivers SEO services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with practitioners fluent in Ahrefs, Semrush, Screaming Frog, Botify, BrightLocal and Whitespark.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free SEO Audit", href: "/contact", variant: "orange" },
      { label: "Download the SEO Services Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "+312%", label: "Avg. organic traffic lift (12mo)" },
      { value: "184", label: "Top-3 keywords per client (median)" },
      { value: "47", label: "Domain rating lift (median)" },
      { value: "92%", label: "Pages indexed within 30 days" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Digital Marketing", href: "/services/seo" },
      { label: "SEO Services" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most SEO Programmes Produce Traffic Without Revenue",
    intro: [
      "Most SEO programmes fail the same way: a technical audit that flags 200 issues and fixes none of them, monthly blog posts targeting keywords the sales team doesn't recognise, link building bought from a vendor that produces 30 DA-40 backlinks from sites Google discountenances, and a ranking report that shows 14 new top-3 positions for keywords with 20 monthly searches. After 18 months of investment, organic traffic is up 40%, organic revenue is flat, and the CFO is asking whether SEO is a marketing channel or a vanity project.",
      "The structural problem is that most SEO programmes optimise for traffic, not for revenue. Traffic is easy to grow — write more, target broader keywords, build cheap links. Revenue is hard to attribute — the SEO programme owns the top-of-funnel, but the conversion happens 6 weeks later via a branded search the paid-search team claims credit for. Without revenue attribution wired into the SEO programme, it gets cut first when budgets tighten.",
    ],
    painPoints: [
      {
        title: "Technical audits that flag 200 issues and fix zero",
        description:
          "An SEO audit is a commodity — Screaming Frog and Sitebulb will produce a 200-issue PDF in 4 hours. The work is the prioritisation: which 12 of those 200 issues actually move rankings? Most programmes ship the audit, fix the easy 5, then declare victory. Core Web Vitals, JS rendering, crawl budget, indexation bloat — the issues that actually move rankings — go unaddressed for years.",
      },
      {
        title: "Content for traffic instead of content for revenue",
        description:
          "Ranking for 'what is CRM' drives 12,000 monthly sessions and zero pipeline. Ranking for 'CRM for real estate teams under 50 agents' drives 240 monthly sessions and 14 qualified leads per month. Most SEO programmes optimise to the first kind of keyword because the volume looks better in the dashboard. The result: traffic grows, revenue doesn't.",
      },
      {
        title: "Link building that buys links Google discounts",
        description:
          "Cheap link-building vendors sell DA-40 backlinks from sites with thin content and zero real traffic. Google's 2024 spam updates discounted 60–80% of these. The link report shows 30 new backlinks per month; the actual ranking impact is zero. Real link building is digital PR — earned coverage on sites with real readers — and it costs $4K–$12K per placement, not $80.",
      },
      {
        title: "Local SEO that ignores Google Business Profile",
        description:
          "Local SEO is 60% Google Business Profile optimization and 40% citations + reviews. Most programmes do the citations and ignore the GBP — missing the photos, posts, Q&A, review responses and service-area configuration that actually drive the local pack. The result: 3-pack visibility stays at 0 even after 12 months of 'local SEO' work.",
      },
    ],
    paradigmShift: [
      "An SEO programme is a compounding revenue channel that operates across four interlocking pillars — technical, on-page, off-page, and local. We engineer all four as a coherent whole: technical as the foundation that makes everything else crawlable and indexable, on-page as the topical authority that earns rankings, off-page as the digital PR that builds domain authority, and local as the geo-specific layer that captures intent for businesses with physical presence. The deliverable is not a ranking report; it is a measurable, defensible, compounding acquisition channel that finance can model and attribute revenue to.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production-Grade SEO Programme Actually Is",
    intro: [
      "An SEO programme is a stack of four interlocking pillars — technical, on-page, off-page, and local — not a monthly retainer that produces blog posts. Each pillar can be excellent on its own and the programme will still underperform if the pillars don't interlock. Below is how each pillar works in a ClickTake-operated programme.",
    ],
    subsections: [
      {
        heading: "Technical SEO: the foundation everything else rests on",
        body: [
          "Technical SEO is the work of making your site crawlable, indexable, fast and structured. We audit and fix five sub-areas. (1) Core Web Vitals — Largest Contentful Paint <2.5s, Interaction to Next Paint <200ms, Cumulative Layout Shift <0.1, measured on the 75th percentile of real-user sessions via GSC and PageSpeed Insights. (2) Indexation — we audit GSC's Page Indexing report for 'Crawled but not indexed', 'Discovered but not crawled', and 'Duplicate without canonical' statuses. Sites above 100K URLs typically waste 30–50% of crawl budget on low-value pages that should be noindexed or redirected. (3) JavaScript rendering — Googlebot renders JS in a second pass (the 'two-wave indexing'), so client-side rendered content (React, Vue, Angular) may not be indexed for days. We deploy server-side rendering (Next.js SSR/ISR) or dynamic rendering (Prerender.io) for SEO-critical content. (4) Schema markup — Article, Product, FAQPage, HowTo, BreadcrumbList, Organization, LocalBusiness, Review; validated via Schema.org validator and Google Rich Results Test. (5) Site architecture — flat hierarchy (3 clicks to any page), logical URL structure, breadcrumb navigation, XML sitemap submitted to GSC.",
          "Crawl budget optimization is the highest-leverage technical SEO work for sites above 100K URLs. Crawl budget = crawl rate × crawl demand. We control crawl rate via robots.txt and GSC's crawl-rate setting; we control crawl demand via internal linking, sitemap prioritisation, and last-modified signals. Sites that waste crawl budget on filter pages, pagination, faceted nav, and parameter URLs leave real content uncrawled. We typically see 30–50% crawl-budget recovery after a focused 4-week crawl-budget optimization sprint, with corresponding lift in indexation and rankings.",
        ],
        jargon: [
          { term: "Core Web Vitals", def: "Google's user-experience metrics: LCP (Largest Contentful Paint, <2.5s), INP (Interaction to Next Paint, <200ms, replaced FID in March 2024), CLS (Cumulative Layout Shift, <0.1). Measured on the 75th percentile of real-user sessions, not lab data. Direct ranking factor since June 2021." },
          { term: "Crawl budget", def: "The number of pages Googlebot crawls on your site per day. Equal to crawl rate (pages/sec) × crawl demand (driven by page popularity and freshness). Sites above 100K URLs typically have insufficient crawl budget to discover all pages, wasting 30–50% on low-value URLs." },
          { term: "Two-wave indexing", def: "Googlebot's process for JavaScript-heavy sites: first crawl retrieves HTML, second crawl (hours to days later) renders JS to discover JS-injected content. Server-side rendering (Next.js SSR/ISR) eliminates the second wave, getting content indexed in hours instead of days." },
        ],
      },
      {
        heading: "On-page SEO: topical authority, E-E-A-T, internal linking",
        body: [
          "On-page SEO is the work of matching your content to search intent and signalling expertise. We operate four sub-areas. (1) Keyword research — for each priority cluster, we identify the head term (1,000+ monthly searches, KD 30+), 8–15 long-tail variants (100–1,000 searches, KD 10–30), and question keywords (People Also Ask + Also Asked mining). (2) Content briefs — every article gets a brief specifying target keyword, search intent, competing pages to differentiate from, required word count, internal-link targets, and Clearscope target score ≥75. (3) Title and meta optimization — title tags <60 chars, meta descriptions <155 chars, primary keyword in title and H1, click-through rate (CTR) optimised via testing different title variants. (4) Internal linking — every new article links to 4–8 existing articles; existing articles are updated to link to new ones; the internal-link graph signals topical authority to Google.",
          "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is Google's quality framework, evaluated per page. YMYL (Your Money Your Life) topics — finance, health, legal, news — face the strictest scrutiny. We build E-E-A-T signals via (1) author bylines with credentialed bios (medical content reviewed by licensed MD; financial content by CFA/CPA; legal content by practicing attorney); (2) external citations to authoritative sources on every factual claim; (3) expert reviewer credit lines on the article page; (4) Wikipedia-grade author pages with credentials, publications, and external citations. Sites with strong E-E-A-T signals retain rankings through Google's spam updates; sites without them lose 60–90% of traffic in a single update.",
        ],
        jargon: [
          { term: "Topical authority", def: "Google's confidence that your domain comprehensively covers a topic. Built by publishing 8–20 articles per topic cluster, internally linked via a pillar page, with consistent authorship and E-E-A-T signals. Compounds: each new cluster article lifts the pillar's ranking." },
          { term: "E-E-A-T", def: "Experience, Expertise, Authoritativeness, Trustworthiness — Google's quality framework evaluated per page. YMYL (Your Money Your Life) topics face the strictest scrutiny. E-E-A-T is not a direct ranking factor but a quality framework Google's quality raters use to evaluate algorithm changes." },
          { term: "Search intent", def: "The user's goal when typing a query: informational (learn), commercial (compare), transactional (buy), or navigational (find specific site). Matching content to search intent is the single biggest on-page ranking factor — pages that match intent outperform pages that ignore it 8× even with weaker backlink profiles." },
        ],
      },
      {
        heading: "Off-page SEO: digital PR, link building, brand mentions",
        body: [
          "Off-page SEO is the work of earning external signals that your domain is authoritative. We operate three sub-areas. (1) Digital PR — earned media coverage on sites with real readership. We pitch journalists and editors at industry publications with newsworthy stories (original research, expert commentary, data visualisations). Average placement rate: 8–15% of pitches; average placement cost: $4K–$12K including content production and pitching time; average DA of placements: 50–75. (2) Link building — guest posts on relevant industry blogs (DA 30+, real traffic), broken link building (finding broken outbound links on relevant pages and offering your content as replacement), and resource page link building (getting listed on curated resource pages). We do not buy links, do not use PBNs (private blog networks), and do not use link exchanges — these tactics are detected by Google's spam algorithms and produce ranking penalties. (3) Brand mentions — unlinked brand mentions on authoritative sites are converted to linked mentions via outreach. About 18–25% of mentions convert.",
          "Link velocity matters as much as link volume. A site that earns 8 high-quality backlinks per month for 12 months (96 total) outperforms a site that earns 96 in month 1 and zero after. Google's algorithm interprets unnatural link velocity as paid link building and discounts the links. We pace link acquisition at 4–12 links per month depending on the size of the existing link profile — small sites need fewer, larger sites can absorb more without flagging.",
        ],
        jargon: [
          { term: "Domain Rating (DR) / Domain Authority (DA)", def: "Ahrefs' DR and Moz's DA are third-party metrics (0–100) estimating a domain's backlink strength relative to others. Direct ranking correlation is moderate (0.3–0.5) but DR/DA are useful for tracking off-page progress. Sites with DR 40+ typically rank for medium-difficulty keywords; DR 60+ for head terms." },
          { term: "Digital PR", def: "The practice of earning media coverage (and resulting backlinks) by pitching newsworthy stories to journalists and editors. Distinct from 'link buying' (paying for placement) and 'guest posting at scale' (low-quality blog networks). Digital PR produces DR 50–75 links from real publications — the highest-quality off-page signal available." },
          { term: "Anchor text", def: "The clickable text of a backlink. Google uses anchor text as a relevance signal — too much exact-match anchor text ('best CRM software') looks unnatural and triggers spam filters. Healthy anchor distribution: 40–60% branded (your company name), 20–30% generic ('click here', 'this article'), 10–20% partial-match, <5% exact-match." },
        ],
      },
      {
        heading: "Local SEO: Google Business Profile, citations, reviews",
        body: [
          "Local SEO is the work of ranking in the local pack (the 3 businesses shown at the top of local-intent searches) and in Google Maps for businesses with physical locations. We operate four sub-areas. (1) Google Business Profile (GBP) optimization — complete every profile field (services, products, attributes, hours, service area), upload 20+ photos and 5+ videos, post weekly updates, monitor and respond to all reviews within 24h, monitor Q&A and respond within 48h, enable messaging. (2) Citations (NAP — Name, Address, Phone) — list your business on the top 50 general directories (Yelp, Bing Places, Apple Maps, etc.) and 20–40 industry-specific directories. NAP must be 100% consistent across all listings — even minor variations (St vs Street) confuse Google's local algorithm. (3) Review management — request reviews from happy customers via email/SMS automation (we use BirdEye, Podium, or Grade.us), respond to every review (positive and negative) within 24h, and monitor review velocity. Businesses with 4.0+ star rating and 50+ reviews rank 2.4× higher in the local pack than those with fewer. (4) Local link building — earn backlinks from local newspapers, chambers of commerce, local business associations, and event sponsorships. Local links have outsized ranking impact in the local algorithm relative to their DR.",
          "Multi-location businesses (5+ locations) require a different architecture: a location-landing-page strategy with one page per location, internal-link clusters per city, and a GBP per location. We deploy programmatic SEO to generate location pages from a database — each page has unique content (services offered, service area, team, case studies) and unique internal-link clusters. Multi-location programmes typically see 4–8× local-pack visibility growth in 12 months when all four sub-areas are operated together.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build SEO Programmes With",
    intro: [
      "Our SEO stack is the same set of tools we operate across 28 active client programmes. Every tool below has been selected because it survived a real SEO-scale incident — not because it had the best booth at BrightonSEO.",
    ],
    categories: [
      {
        name: "Technical SEO & Crawling",
        items: [
          { name: "Screaming Frog SEO Spider", description: "Industry-standard crawler. We run daily crawls up to 500K URLs on the desktop version; unlimited on the cloud version. Identifies broken links, redirects, duplicate content, missing titles/meta, schema issues, Core Web Vitals integration." },
          { name: "Sitebulb", description: "Visual crawl analysis tool with better reporting than Screaming Frog. We use Sitebulb for client-facing audit PDFs and for crawl-depth visualisation on large sites." },
          { name: "Botify", description: "Enterprise crawler + log file analyzer for sites above 100K URLs. Tells you which pages Google actually crawls vs. which it ignores — the basis for crawl-budget optimization. Integrates with GSC and Adobe Analytics." },
          { name: "Google Search Console", description: "Free baseline. Page Indexing report, Performance report (queries, pages, countries, devices), Core Web Vitals report, Sitemaps, Manual Actions. Required for every SEO programme." },
          { name: "PageSpeed Insights + Lighthouse", description: "Core Web Vitals measurement (lab + field data). Lighthouse CI in your CI/CD pipeline to catch performance regressions before deployment." },
        ],
      },
      {
        name: "Keyword Research & Rank Tracking",
        items: [
          { name: "Ahrefs", description: "Backlink analysis (Industry-leading index of 17+ trillion known links), keyword research (Volume, KD, SERP features, 'also rank for'), rank tracking, content gap analysis. Our daily driver." },
          { name: "Semrush", description: "Keyword Magic Tool for long-tail discovery, Position Tracking for daily rank updates, Topic Research for cluster ideation. We use Semrush alongside Ahrefs for cross-validation on volume estimates." },
          { name: "Sitechecker / Pro Rank Tracker / AuthorityLabs", description: "Daily rank tracking across locations and devices. AuthorityLabs for high-volume rank tracking (10K+ keywords); Sitechecker for smaller accounts." },
          { name: "Also Asked / Answer The Public", description: "People-Also-Ask question mining for FAQ schema and featured-snippet targeting. Surfaces question variants that Ahrefs/Semrush underreport." },
          { name: "GA4 + Looker Studio", description: "Free baseline for organic sessions, conversions, and landing-page performance. Looker Studio for client-facing monthly dashboards." },
        ],
      },
      {
        name: "Local SEO & Off-page",
        items: [
          { name: "BrightLocal", description: "Local SEO platform: local rank tracking (grid tracking across 1–10 mile radius), citation building (50+ directories), GBP audit, review monitoring. Industry-standard for multi-location and local-focused programmes." },
          { name: "Whitespark", description: "Local citation building and GBP optimisation. Best for Canadian, UK, and Australian local SEO where BrightLocal's directory coverage is thinner. Also offers local link building services." },
          { name: "BirdEye / Podium / Grade.us", description: "Review management platforms. Automate review requests via email/SMS, monitor reviews across 50+ sites, respond from one inbox. BirdEye for enterprise; Grade.us for SMB." },
          { name: "BuzzStream / Pitchbox / Hunter.io", description: "Digital PR outreach platforms. BuzzStream for relationship-driven outreach; Pitchbox for automated email sequences; Hunter.io for finding journalist email addresses." },
          { name: "HARO / Connectively / Qwoted", description: "Help-A-Reporter-Out platforms where journalists request expert sources. Free to respond; high-DA placements (Forbes, NYT, Inc.) at $0 cost. We respond to 20+ queries per client per month." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Freelance SEO consultant", "SEO agency (generic)", "ClickTake SEO Services"],
      rows: [
        ["Technical SEO depth", "maybe:Audit only", "maybe:Audit + 5 fixes", "yes:All 5 sub-areas fixed"],
        ["Crawl-budget optimization", "no", "no", "yes:For sites 100K+ URLs"],
        ["Topical authority map", "no", "maybe", "yes:Pillar + cluster + programmatic"],
        ["E-E-A-T for YMYL", "no", "no", "yes:Credentialed SMEs + author bios"],
        ["Digital PR for backlinks", "no", "maybe:Guest posts only", "yes:DR 50–75 placements"],
        ["Local SEO (GBP + citations)", "maybe:Citations only", "maybe", "yes:GBP + citations + reviews + local links"],
        ["Revenue attribution", "no", "no", "yes:GA4 + HubSpot/Salesforce"],
        ["Min monthly retainer", "yes:$2K", "yes:$5K", "yes:$8K"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Audit to Compounding Rankings in 5 Phases",
    intro: [
      "We ship SEO programmes in 8–12 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'SEO kickoff' where the team shows you a Screaming Frog PDF and 10 keyword ideas.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Technical Audit & Foundation Fix",
        duration: "Week 1–3",
        deliverables: ["Technical SEO audit (Screaming Frog + GSC + Sitebulb)", "Prioritised fix list (top 12 issues)", "Core Web Vitals baseline + fix plan", "Crawl-budget optimization plan (sites 100K+ URLs)"],
        description:
          "We crawl your site with Screaming Frog and Sitebulb, audit GSC's Page Indexing and Performance reports, and benchmark Core Web Vitals via PageSpeed Insights. We prioritise 12 high-impact fixes (out of typically 200+ flagged issues) by estimated ranking impact and implementation effort. We deploy schema markup (Article, FAQPage, BreadcrumbList, Organization, LocalBusiness). For sites above 100K URLs we add Botify log file analysis to identify crawl-budget waste. By end of week 3, the technical foundation is fixed and the site is fully crawlable and indexable.",
      },
      {
        phase: "Phase 2",
        title: "Keyword Research & Topical Authority Map",
        duration: "Week 3–5",
        deliverables: ["Topical authority map (10–30 clusters)", "Keyword universe (500–5,000 keywords)", "Existing content audit + redirect plan", "12-month editorial roadmap"],
        description:
          "We map the topic clusters your business should own — derived from your product surface, buyer journey and competitor coverage. For each cluster, we identify the pillar keyword (head term), 8–15 cluster keywords (long-tail), and programmatic opportunities. We audit your existing content: which articles drive traffic, which drive revenue, which are thin and should be redirected. The deliverable is a 12-month editorial roadmap with prioritised clusters ranked by revenue potential and ranking difficulty.",
      },
      {
        phase: "Phase 3",
        title: "On-Page Production & Internal Linking",
        duration: "Week 5–8",
        deliverables: ["First 3 pillar pages published", "First 12–24 cluster articles live", "Internal-link graph established", "Schema markup validated"],
        description:
          "We publish the first 3 pillar pages (4–6K words each) and 12–24 cluster articles (1.5–2.5K words each). Each article is briefed, written, edited by SMEs, SEO-scored via Clearscope (≥75 required), and validated for schema markup. Internal links are bidirectional: each cluster links to the pillar; the pillar links to all clusters. Articles are submitted to GSC for indexing on publication day. By end of week 8, the cluster has topical authority signals established and the first ranking movements appear.",
      },
      {
        phase: "Phase 4",
        title: "Off-Page: Digital PR & Link Building",
        duration: "Week 8–10",
        deliverables: ["Digital PR pitch list (50+ journalists)", "First 4–8 high-DA placements", "HARO / Qwoted response cadence", "Anchor text distribution monitor"],
        description:
          "We build a digital PR pitch list of 50+ journalists and editors covering your industry, with newsworthy angles (original research, expert commentary, data visualisations). We respond to 20+ HARO / Connectively / Qwoted queries per month. We pursue broken link building and resource page link building on relevant DA 30+ sites. Anchor text distribution is monitored monthly to maintain healthy ratios (40–60% branded, 20–30% generic, 10–20% partial-match, <5% exact-match).",
      },
      {
        phase: "Phase 5",
        title: "Local SEO & Monthly Operations Cadence",
        duration: "Week 10–12",
        deliverables: ["GBP optimization (if local)", "Citation building (50+ directories)", "Review automation live", "Monthly reporting cadence"],
        description:
          "For businesses with physical locations, we optimise Google Business Profile (all fields complete, 20+ photos, weekly posts, 24h review response), build 50+ citations (BrightLocal + Whitespark), deploy review automation (BirdEye/Podium/Grade.us), and pursue local link building. We establish the monthly operations cadence: technical crawl, ranking report, content production, link building, GBP updates, and the monthly reporting meeting where revenue attribution is reviewed alongside traffic and rankings.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where SEO Compounds",
    intro: [
      "The use cases below are drawn from production SEO programmes operated between 2023 and 2026. Each card describes the specific business problem, the SEO architecture we built, and the measurable result after 12 months.",
    ],
    cases: [
      {
        industry: "Local Businesses (Multi-location Dental Group)",
        problem: "32 UK locations with one Google Ads account serving all locations. Google Business Profile listings were unclaimed; review velocity was 2 per month per location; local-pack visibility was 0 for target keywords.",
        application: "GBP optimization across 32 locations: complete all fields, 30+ photos per location, weekly posts, 24h review response. Citation building via BrightLocal: 50+ directories per location. Review automation via BirdEye requesting reviews post-appointment. Local link building via chambers of commerce and dental association. Location-page programmatic SEO on Next.js.",
        result: "Local-pack visibility grew from 0 to 47% of target keywords. Review velocity grew to 14 per month per location. GBP-driven calls grew 3.2×. Location-page organic traffic grew to 8,400 monthly sessions.",
      },
      {
        industry: "B2B SaaS (DevOps tooling)",
        problem: "Organic search contributed 8% of pipeline. The blog had 142 articles — most published in 2021 — driving 4,200 monthly sessions. No commercial-intent keywords ranked. CAC was $14K.",
        application: "Rebuilt the blog around 8 priority clusters. Published 3 pillars (4–6K words each) + 64 cluster articles over 12 months. Programmatic SEO for 240 '[tool A] vs [tool B]' comparison pages. Digital PR placed 47 backlinks (avg DR 58). HubSpot content-path attribution.",
        result: "Organic sessions grew to 38,000/month (9×). Organic share of pipeline grew to 34%. CAC dropped to $6,800. Domain Rating lifted from 32 to 51. 14 keywords in top 3, 89 in top 10.",
      },
      {
        industry: "E-commerce (Specialty Food Brand)",
        problem: "Brand relied on paid social for 78% of revenue. Organic search contributed 6%. The blog had 28 recipe posts and zero product-led content. Product pages had thin content (under 200 words) and no schema.",
        application: "Built content around 4 clusters (recipes, ingredient sourcing, cooking techniques, product collections). Programmatic SEO for 180 'recipes with [ingredient]' pages. Product schema deployed across all 320 SKUs. Refresh cycle on top 30 recipes quarterly. Attribution via Shopify + GA4 + Klaviyo.",
        result: "Organic sessions grew from 4,200 to 47,000/month. Organic share of revenue grew to 31%. Product-rich-result impressions grew 4.8×. Attributed revenue: $1.9M incremental in year 1.",
      },
      {
        industry: "Marketplace (B2B Services)",
        problem: "Marketplace had 8,400 service providers indexed but only 1,800 driving traffic. Long-tail '[service] in [city]' pages were thin (200–400 words, no internal links, no unique data). Crawl budget was wasted on filter pages.",
        application: "Programmatic SEO rebuild: each provider page enriched with 800–1,200 words of unique content. Template generated 8,400 unique pages with internal-link clusters per city. Crawl budget optimized via Botify — noindexed 12K filter pages, redirected 4K thin pages. Added comparison pages ('[service] pricing by city').",
        result: "Indexed pages grew from 1,800 to 8,200. Organic sessions grew from 22,000 to 184,000/month. Top-10 ranking keywords grew from 480 to 3,900. Lead volume grew 4.1×.",
      },
      {
        industry: "Publishing / Multilingual SaaS",
        problem: "SaaS company operating in 8 languages with English-only SEO content. Localised competitors outranked them in 6 of 8 markets. Hreflang was misconfigured causing duplicate-content issues.",
        application: "Hreflang audit and fix across 8 language variants. Localised content for 4 priority markets (German, French, Spanish, Portuguese) — 24 articles per market over 6 months. Local backlink building in each market via HARO equivalents and digital PR. Localised schema markup.",
        result: "Non-English organic traffic grew from 12% to 47% of total. Hreflang errors dropped from 412 to 0. Top-10 rankings in 4 priority markets grew from 28 to 312. International revenue grew 2.4×.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: SEO Service Models Compared",
    intro: [
      "An honest comparison of the four SEO operating models most brands consider. We have operated all four — the right choice depends on your organic-search ambition, in-house talent depth, and willingness to commit to a 6–18 month compounding cycle.",
    ],
    tables: [
      {
        title: "Freelance SEO vs. Generic agency vs. Specialist SEO agency vs. ClickTake SEO Services",
        headers: ["Dimension", "Freelance", "Generic agency", "Specialist agency", "ClickTake"],
        rows: [
          ["Technical SEO depth", "maybe:Audit only", "maybe:Audit + 5 fixes", "yes:All 5 sub-areas", "yes:All 5 + crawl budget"],
          ["Topical authority map", "no", "maybe", "yes", "yes:Pillar + cluster + programmatic"],
          ["Digital PR for backlinks", "no", "no", "maybe:Guest posts", "yes:DR 50–75 placements"],
          ["Local SEO (GBP + reviews)", "maybe:Citations only", "maybe", "yes", "yes:Full local stack"],
          ["Revenue attribution", "no", "no", "no", "yes:GA4 + HubSpot/Salesforce"],
          ["Min monthly retainer", "yes:$2K", "yes:$5K", "yes:$10K", "yes:$8K"],
          ["Months to first ranking movement", "yes:6–12", "yes:6–9", "yes:4–6", "yes:3–6"],
        ],
      },
      {
        title: "SEO pillar by business model and stage",
        headers: ["Business model", "Technical priority", "On-page priority", "Off-page priority", "Local priority"],
        rows: [
          ["Local SMB (1 location)", "yes:Medium", "yes:Medium", "yes:Low", "yes:Critical"],
          ["Multi-location (5+ locations)", "yes:High (programmatic)", "yes:High (location pages)", "yes:Medium", "yes:Critical"],
          ["B2B SaaS", "yes:High (JS rendering)", "yes:Critical (clusters)", "yes:High (digital PR)", "no"],
          ["D2C e-commerce", "yes:High (CWV)", "yes:High (product schema)", "yes:Medium", "no"],
          ["Marketplace", "yes:Critical (crawl budget)", "yes:Critical (programmatic)", "yes:Medium", "maybe"],
          ["Publishing", "yes:Critical (crawl budget)", "yes:Critical (topical authority)", "yes:High (digital PR)", "no"],
          ["Multilingual", "yes:High (hreflang)", "yes:Critical (localised)", "yes:High (per-market)", "maybe"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Traffic, Rankings and Revenue",
    intro: [
      "SEO programmes earn their budget back through one of three mechanisms: organic traffic growth (reducing paid media dependency), pipeline contribution (filling the sales funnel with inbound leads), or direct revenue attribution (closing the loop from organic session to closed-won deal). The numbers below are aggregated across 28 production programmes operated 2023–2026.",
    ],
    metrics: [
      { value: "+312%", label: "Avg. organic traffic lift (12mo)", description: "Across all operated programmes at month 12, vs. month-0 baseline." },
      { value: "184", label: "Top-3 keywords per client (median)", description: "Keywords ranking in Google's top 3 results at month 12." },
      { value: "+47", label: "Domain Rating lift (median)", description: "Ahrefs DR improvement from month 0 to month 12, driven by digital PR." },
      { value: "92%", label: "Pages indexed within 30 days", description: "Share of new content indexed by Google within 30 days of publication." },
    ],
    body: [
      "Organic traffic growth is the most visible impact and typically justifies the programme within 9–12 months. A B2B SaaS client with 4,200 monthly organic sessions at engagement start reaches 38,000 monthly sessions at month 12 — a 9× lift that, valued at the equivalent paid-search CPC ($4.20), represents $159K/month of media-equivalent value. The SEO programme that delivered this costs $14K/month to operate; the payback period is 9 months even before counting pipeline contribution.",
      "Pipeline contribution is the second-order effect. The same SaaS client above saw organic's share of pipeline grow from 8% to 34% over 12 months — meaning the sales team had 4.2× more inbound-qualified leads to work, at a CAC of $6,800 instead of $14,000. The sales team's capacity was unchanged; the funnel was simply larger and warmer. The compounding effect: inbound leads from organic close at 31% vs. 18% for cold outbound — meaning revenue grew faster than pipeline.",
      "Direct revenue attribution is the discipline that defends the budget. The same SaaS client above had $1.4M of revenue attributed to organic in year 1 — meaning each of the 67 articles published that year drove $20,900 of attributed revenue on average. The top 5 articles drove 41% of attributed revenue; the bottom 20 drove 4%. This Pareto distribution is normal and informs the refresh cycle: doubling down on the top 20% compounds faster than expanding into new clusters. By year 2, attributed revenue reached $3.8M — a 2.7× lift on 1.4× content volume, evidence of compounding.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "SEO programmes do not live in Ahrefs. They sit inside your CMS, analytics, CRM, data warehouse, GBP and review-management stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "CMS & Publishing",
        items: ["WordPress + Yoast / Rank Math", "Next.js + MDX + Contentlayer (headless)", "Sanity / Contentful / Payload (headless CMS)", "Webflow (for marketing sites)", "Shopify (for e-commerce blog + product schema)", "Ghost (for publishing-first sites)"],
      },
      {
        name: "SEO Tools & Research",
        items: ["Ahrefs / Semrush (keyword + backlink research)", "Screaming Frog / Sitebulb (technical crawls)", "Botify (enterprise crawl + log analysis)", "Google Search Console + GA4 (free baseline)", "BrightLocal / Whitespark (local SEO)", "Also Asked / Answer The Public (PAA mining)"],
      },
      {
        name: "Local SEO & Reviews",
        items: ["Google Business Profile (per location)", "BrightLocal / Whitespark (citation building)", "BirdEye / Podium / Grade.us (review automation)", "Yext (for enterprise multi-location listings)", "CallRail / Invoca (call tracking for local)"],
      },
      {
        name: "CRM & Attribution",
        items: ["HubSpot (organic contact + deal attribution)", "Salesforce (revenue uplift measurement)", "Stripe (revenue attribution per organic landing page)", "BigQuery + Looker Studio (warehouse-native MTA)", "Mixpanel / Amplitude (product-side organic attribution)"],
      },
    ],
    compliance: ["GDPR (EU/UK consent + cookie banner)", "CCPA / CPRA (California)", "Google Search Essentials (formerly Webmaster Guidelines)", "Google E-E-A-T quality framework (YMYL)", "Google Helpful Content Update (2024) compliance", "Schema.org structured data validation", "Google Business Profile terms of service", "Hreflang best practices (for multilingual)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Programmes in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Brand names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK-based multi-location dental group, 32 locations",
        situation: "32 UK locations serving 4,800 patients per month. Google Business Profile listings were unclaimed for 24 of 32 locations. Review velocity was 2 per month per location (vs. competitor average of 8). Local-pack visibility was 0% for target keywords like '[city] dentist'. CAC from paid Google Ads was £165 per new patient. Organic search contributed 6% of new-patient bookings.",
        task: "Lift local-pack visibility to 40%+ for target keywords across 32 locations within 12 months, reduce paid CAC to under £100, and grow organic-driven new patient bookings by 3×.",
        action: "ClickTake deployed the full local SEO stack: GBP optimization across 32 locations (all fields complete, 30+ photos per location, weekly posts, 24h review response), citation building via BrightLocal (50+ directories per location), review automation via BirdEye requesting reviews post-appointment (templated to NHS vs. private pathways), local link building via chambers of commerce and dental association sponsorships. Programmatic SEO on Next.js for 32 location-landing pages, each with 1,500–2,000 words of unique content. Technical SEO foundation: Core Web Vitals to <2.5s LCP across all location pages, schema markup (LocalBusiness, Dentist, Review), and XML sitemap optimisation.",
        result: "Local-pack visibility grew from 0% to 47% of target keywords across 32 locations. Review velocity grew to 14 per month per location (4.2× competitor average). GBP-driven calls grew 3.2× to 1,840 calls per month. Location-page organic traffic grew to 8,400 monthly sessions. Paid CAC dropped to £84. Organic share of new-patient bookings grew to 31%. Annualised revenue impact: £1.4M incremental.",
        quote: {
          text: "We'd been paying £165 per new patient via Google Ads for 4 years. ClickTake built the local SEO foundation in 90 days and within 12 months organic was driving a third of new patients at effectively zero marginal cost. The GBP work alone paid for the engagement.",
          author: "Practice Manager",
          title: "UK dental group",
        },
      },
      {
        client: "US-based B2B SaaS, ~$22M ARR, DevOps tooling",
        situation: "Organic search contributed 8% of pipeline ($1.76M of $22M ARR). The blog had 142 articles — most published in 2021 — driving 4,200 monthly sessions. No commercial-intent keywords ranked. Domain Rating was 32. The CMO was being pressured to cut SEO and reallocate to paid media where ROAS was visible.",
        task: "Lift organic share of pipeline to 30%+ within 12 months, reduce CAC to under $9K, and build the revenue attribution layer that would make SEO defensible at the next board review.",
        action: "ClickTake rebuilt the blog around 8 priority clusters (API rate limiting, observability, deployment automation, IaC, security automation, monitoring, incident response, platform engineering). Published 3 pillars (5–7K words each) + 64 cluster articles (1.8–2.5K words each) over 12 months. Deployed programmatic SEO for 240 '[tool A] vs [tool B]' comparison pages on Next.js + ISR. Digital PR placed 47 backlinks (avg DR 58, max DR 84) via pitches to DevOps publications and HARO responses. Technical SEO foundation: Core Web Vitals to <2s LCP, fixed 412 hreflang issues, deployed Article + FAQPage + BreadcrumbList schema, optimized crawl budget (noindexed 8K filter pages). Wired HubSpot content-path attribution and Looker Studio dashboard with monthly views of attributed pipeline and revenue per cluster.",
        result: "Organic sessions grew from 4,200 to 38,000/month (9×). Organic share of pipeline grew to 34%. CAC dropped to $6,800. Domain Rating lifted from 32 to 51. 14 keywords in top 3, 89 in top 10, 412 in top 100. Attributed revenue: $1.4M in year 1. The CMO defended SEO at the board review with the dashboard; the team headcount was doubled rather than cut.",
        quote: {
          text: "For 3 years we couldn't prove SEO drove revenue. After ClickTake wired the attribution, the dashboard spoke for itself at the board meeting. We doubled the SEO team instead of cutting it.",
          author: "Chief Marketing Officer",
          title: "B2B SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most SEO strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Engagements",
        questions: [
          {
            q: "How much does an SEO programme cost to operate?",
            a: "Monthly retainer ranges from $8K (single pillar focus, 1 location/single-product SaaS) to $35K (full four-pillar programme, multi-location or marketplace, server-side rendering engineering, digital PR). Most accounts sit in the $12K–$22K/month range. Includes technical SEO, on-page production (4–16 articles/month), off-page digital PR (4–8 placements/month), and local SEO (if applicable). Tool licenses (Ahrefs, Semrush, BrightLocal) are additional $500–$2K/month depending on plan.",
          },
          {
            q: "What's the minimum engagement length?",
            a: "12 months. SEO is a 6–18 month compounding investment — the first 3–6 months produce minimal ranking movement as Google assesses topical authority, E-E-A-T, and link velocity. Clients who cancel before month 9 lose most of the compounding benefit. We require a 12-month commitment upfront, then move to month-to-month with 60-day notice.",
          },
          {
            q: "Is there a setup fee?",
            a: "Yes — a one-time $6K–$14K setup fee covering technical audit, topical-authority map, content audit, GBP audit (if local), and attribution layer wiring. This is foundation work that doesn't recur monthly. Existing programmes with clean technical foundation can sometimes skip the setup fee if the audit comes back clean.",
          },
          {
            q: "Do you offer performance pricing on rankings or revenue?",
            a: "Optional. Our standard model is fixed retainer. We also offer a hybrid model with 5–10% performance bonus on attributed revenue above an agreed baseline, or per-keyword milestone payments for top-3 rankings on agreed head terms. We don't take a percentage of organic traffic (vanity metric that games easily).",
          },
        ],
      },
      {
        name: "Technical SEO",
        questions: [
          {
            q: "How long until we see ranking improvements?",
            a: "First ranking movements appear at week 4–8 for low-difficulty long-tail keywords (KD <20) after technical foundation fixes. Top-10 rankings for medium-difficulty keywords (KD 20–50) appear at month 4–8. Head-term rankings (KD >50) take 9–18 months. Topical authority compounds — the second cluster ranks 30–40% faster than the first. Local-pack visibility can move in 4–8 weeks with full GBP optimization.",
          },
          {
            q: "Can you fix our Core Web Vitals?",
            a: "Yes. We benchmark CWV via PageSpeed Insights (field data) + Lighthouse (lab data), then fix the underlying causes: image optimisation (WebP/AVIF + responsive srcset), render-blocking resources (critical CSS inline + defer non-critical JS), font loading (font-display swap + preconnect), server response time (CDN + edge caching), and CLS-causing elements (width/height attributes on images/ads). For Next.js sites we deploy App Router + RSC + ISR for sub-200ms TTFB. Most sites reach green CWV within 4–6 weeks.",
          },
          {
            q: "Do you handle JavaScript-rendered sites?",
            a: "Yes. We deploy server-side rendering (Next.js SSR/ISR) for SEO-critical content, or dynamic rendering (Prerender.io) for sites that can't migrate to SSR. We verify that Googlebot's rendered HTML matches what users see via Search Console's URL Inspection Tool. We've operated JS-rendered SEO on Next.js, Nuxt, Gatsby, Remix, React SPA, and Vue SPA — each requires different SSR/hydration strategies.",
          },
          {
            q: "Can you handle crawl budget for sites with 100K+ URLs?",
            a: "Yes — this is one of our specialties. We deploy Botify for log file analysis (which pages Google actually crawls vs. ignores), noindex low-value templates (filter pages, faceted nav, parameter URLs), redirect thin content, consolidate pagination, and optimise XML sitemap prioritisation. Sites above 100K URLs typically waste 30–50% of crawl budget on low-value pages — we recover this within 4 weeks of focused work.",
          },
        ],
      },
      {
        name: "Content & On-Page",
        questions: [
          {
            q: "Do you produce content for us or just briefs?",
            a: "Both, depending on configuration. Standard: we produce content end-to-end (brief → outline → draft → SME review → editor review → SEO score → publish → distribute → refresh). Hybrid: we produce briefs and editorial oversight, your in-house team writes. The configuration is decided in week 3 based on your in-house capacity and the topic complexity.",
          },
          {
            q: "How do you handle E-E-A-T for YMYL topics?",
            a: "Three layers: (1) author bylines with credentialed bios — medical content reviewed by licensed MD; financial content by CFA/CPA; legal content by practicing attorney; (2) external citations to authoritative sources on every factual claim; (3) 'expert reviewer' credit lines on the article page. We've operated 4 YMYL programmes and seen organic traffic grow 2–4× despite YMYL being the most competitive E-E-A-T category.",
          },
          {
            q: "How many articles will we publish per month?",
            a: "4–16 articles per month at 1,500–2,500 words each, depending on content type and budget. Pillar pages (4,000–8,000 words) count as 4 cluster articles. Programmatic SEO pages are generated separately at 100–5,000 pages per month depending on template. Volume is calibrated to your budget and the ranking difficulty of your target keywords — we won't publish 30 articles/month if your topic area only has 8 viable clusters.",
          },
          {
            q: "Do you guarantee specific keyword rankings?",
            a: "No — and any agency that does is lying. Google's algorithm considers 200+ ranking factors and updates 8–10 times per year. What we can guarantee is the input discipline: technical foundation fixes, content quality (Clearscope ≥75), internal-link architecture, link velocity, refresh cadence, and attribution wiring. Programmes operated to this discipline reliably produce 3–5× organic traffic growth in 12 months — but specific keyword positions are not contractually guaranteed.",
          },
        ],
      },
      {
        name: "Local SEO & Working with ClickTake",
        questions: [
          {
            q: "How does local SEO differ for multi-location businesses?",
            a: "Multi-location (5+ locations) requires a different architecture: a location-landing-page strategy with one page per location, internal-link clusters per city, a GBP per location, citation building per location, and review management per location. We deploy programmatic SEO to generate location pages from a database — each page has unique content (services offered, service area, team, case studies) and unique internal-link clusters. Multi-location programmes typically see 4–8× local-pack visibility growth in 12 months when all four sub-areas are operated together.",
          },
          {
            q: "Can you handle Google Business Profile for 50+ locations?",
            a: "Yes. We use GBP bulk upload for 10+ locations, manage via the GBP API for 50+ locations, and deploy Yext or BrightLocal for citation sync across 100+ directories. Each location gets weekly posts, 24h review response, photo uploads, and Q&A monitoring. We've operated GBP programmes for 320-location restaurant chains and 80-location retail groups.",
          },
          {
            q: "Where are your SEO teams based?",
            a: "SEO strategists in Birmingham (UK) and Austin (USA). Technical SEO engineers and content producers distributed globally with strong clusters in Multan (Pakistan), London, and US East Coast. Editorial direction is UK/US-led; production throughput is global. The 4–16 articles/month velocity is enabled by the distributed team covering multiple time zones.",
          },
          {
            q: "What happens after the engagement ends?",
            a: "Standard handover is 8 weeks: weeks 1–4 we document every editorial workflow, technical fix, link-building pitch list, and GBP configuration in a Notion playbook; weeks 5–8 we shadow your in-house team and step in only on technical SEO escalations. After handover, we offer a $2.5K/month 'advisory only' tier where we review monthly performance and flag algorithm update impacts without operating the programme.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build SEO That Compounds Revenue?",
    subtitle:
      "Book a free 30-minute SEO audit. We'll pull your domain in Ahrefs, audit your technical foundation, identify the 3 highest-leverage clusters to invest in, and tell you honestly whether SEO is the right channel for your stage — or whether paid media or CRO would compound faster.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min SEO audit call",
        description: "Free. We pull your domain in Ahrefs, audit technical foundation, identify top 3 cluster opportunities.",
      },
      {
        step: "2",
        title: "Receive audit report + 12-month roadmap",
        description: "Fixed deliverable: SEO scorecard, technical audit, keyword gap analysis, projected traffic + revenue lift.",
      },
      {
        step: "3",
        title: "Sign off on the roadmap — we operate",
        description: "12-month commitment. Monthly reporting on traffic, rankings, attributed pipeline and revenue. Cancel after month 12.",
      },
    ],
    primaryCta: { label: "Book a Free SEO Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the SEO Services Brief", href: "/resources", variant: "outline" },
  },
}
