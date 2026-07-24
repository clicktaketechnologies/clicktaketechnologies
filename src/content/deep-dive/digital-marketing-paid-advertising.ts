import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/digital-marketing/paid-advertising — PPC / Paid Ads
 *
 * Full-funnel paid media across Google Ads, Meta, TikTok, LinkedIn, X, Reddit
 * and Microsoft Ads, with server-side tracking, multi-touch attribution and
 * incrementality testing. ~5,400 words across 12 sections.
 */
export const paidAdsDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Digital Marketing",
    title: "PPC & Paid Advertising: Full-Funnel Paid Media That Pays Back",
    subtitle:
      "We plan, build and operate paid media programmes across Google Ads, Meta, TikTok, LinkedIn, X, Reddit and Microsoft Ads — with server-side tracking, multi-touch attribution and incrementality tests that prove which dollars actually drove the sale.",
    geoDefinition:
      "Pay-per-click (PPC) advertising is a digital media model where advertisers bid in real-time auctions to place ads on search engines, social platforms, retail media networks and publisher sites, paying only when a user clicks or impressions hit a defined threshold. A modern paid media programme orchestrates Search, Performance Max, Shopping, Display, YouTube, Meta, TikTok, LinkedIn, X, Reddit and Microsoft Ads into a single funnel measured against ROAS, CPA and incrementality — not last-click vanity metrics. ClickTake Technologies operates paid media accounts for clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with trading desks certified on Google Ads, Meta Blueprint and TikTok Ads Academy.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Account Audit", href: "/contact", variant: "orange" },
      { label: "Download the Paid Media Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "4.7×", label: "Median blended ROAS" },
      { value: "−38%", label: "Avg CPA after 90 days" },
      { value: "$48M", label: "Media managed / yr" },
      { value: "11", label: "Ad platforms active" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing/paid-advertising" },
      { label: "PPC / Paid Ads" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Paid Media Programmes Stall at 2× ROAS",
    intro: [
      "Paid media is the fastest channel to revenue and the fastest channel to burn money. Most accounts we inherit share the same fingerprints: a single campaign type with a single audience and a single creative, optimised toward a last-click conversion pixel that credits 100% of the sale to the final click — usually a branded search ad the user would have clicked anyway. The platform reports 6× ROAS; the finance team reports 4% revenue growth. Both are right; the truth is in the gap.",
      "The structural problem is that ad platforms are optimised for the platform's revenue, not yours. Google's Smart Bidding will expand match types until CPA inflates by 30%; Meta's Advantage+ will widen audiences until frequency caps break; TikTok's Smart+ will mix spend across objectives to hit its own delivery targets. Without an external measurement layer and a structured testing discipline, the platforms will quietly optimise you into a worse business.",
    ],
    painPoints: [
      {
        title: "Last-click attribution hides 40–60% of the funnel",
        description:
          "GA4's data-driven attribution and the ad platforms' own pixels disagree by 30–80% on which channel drove a conversion. When you optimise to last-click, you starve TOFU and MOFU channels of budget — then wonder why BOFU search volume plateaus 6 months later.",
      },
      {
        title: "No incrementality test = no idea what actually worked",
        description:
          "A conversion that would have happened anyway is not a paid-media win. Brands running heavy branded-search and remarketing spend routinely see 30–50% of reported conversions disappear when geo-holdout tests are run — meaning a third of the budget was paying for clicks that would have been free.",
      },
      {
        title: "Creative is the new targeting — and most teams ship 1 creative per week",
        description:
          "Meta's ad auction rewards creative diversity: accounts running 4+ active creatives per ad set see 35% lower CPA than accounts running 1–2. Most in-house teams ship 1 creative per week because brief→design→legal-review takes 5 days. The auction punishes them silently.",
      },
      {
        title: "iOS 14.5+ broke Meta and TikTok attribution",
        description:
          "SKAdNetwork and browser-level restrictions underreport Meta conversions by 18–35% and TikTok conversions by 22–40%. Without server-side Conversion API (CAPI) and Pixel API implementation, your auction signals are degraded and the platform bids worse on your behalf.",
      },
    ],
    paradigmShift: [
      "A paid media programme is a measurement system that happens to place ads. The ad buying is a commodity — Google, Meta and TikTok all run their own auctions with their own Smart Bidding. The differentiator is the measurement, the creative engine, and the discipline to defund what isn't incrementally driving revenue. We engineer all three as a single operating system, then operate it against an ROAS and CPA target that finance signs off on — not a vanity metric the ad platform self-reports.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production-Grade Paid Media Programme Actually Is",
    intro: [
      "A paid media programme is a stack of cooperating layers — platform, creative, measurement, bidding and reporting — not a single ad account. Each layer can be optimised in isolation and the programme will still fail if the layers don't interlock. Below is how each layer works in a ClickTake-operated account.",
    ],
    subsections: [
      {
        heading: "The platform layer: matching the funnel stage to the ad surface",
        body: [
          "Every ad platform has a sweet spot. Google Search captures demand the user has already expressed; Performance Max harvests intent across Google's full inventory (YouTube, Display, Discover, Search, Gmail, Maps) via automated bidding; Shopping and PMax with product feeds serve e-commerce at the bottom of the funnel. Meta (Facebook + Instagram) builds demand and harvests it via Reels, Feed, Stories and Marketplace placements. TikTok drives demand discovery at low CPMs ($1.80–$5.50 vs. Meta's $5–$14 in 2025) but needs 5–10 creative iterations per week. LinkedIn Ads capture B2B intent with $12–$35 CPMs and 2–4× the cost-per-lead of other platforms — justified only when deal size exceeds $15K. X, Reddit and Microsoft Ads fill niche audiences: Reddit for technical communities, X for real-time news adjacency, Microsoft for older demographics and B2B LinkedIn-synced audiences.",
          "A full-funnel programme splits spend across three stages. Top-of-funnel (TOFU) awareness runs on YouTube, Meta Reels and TikTok at $2–$8 CPMs to build audiences that retarget mid-funnel. Mid-funnel (MOFU) consideration runs lead-form, video-view and engagement-optimised campaigns to warm audiences for 7–30 days. Bottom-of-funnel (BOFU) conversion runs Search, Shopping and Advantage+ Shopping with maximum bid aggressiveness. Retargeting sits across all stages via Meta's Custom Audiences, Google's Customer Match and TikTok's Custom Audiences, capped at 4–7 impressions per user per week to prevent fatigue.",
        ],
        jargon: [
          { term: "ROAS", def: "Return on ad spend, calculated as attributed revenue ÷ ad spend. A 4× ROAS means $4 of revenue for every $1 spent. Blended ROAS includes all platforms; platform ROAS uses that platform's own attribution window (typically 7-day click + 1-day view for Meta)." },
          { term: "CPA / CPL", def: "Cost per acquisition (a paying customer) vs. cost per lead (a contact who may convert later). E-commerce optimises to CPA; B2B optimises to CPL and then measures lead-to-customer conversion separately." },
          { term: "Performance Max (PMax)", def: "Google's full-inventory automated campaign type that places ads across YouTube, Display, Search, Discover, Gmail and Maps from a single campaign. Best used when you have ≥30 conversions/month and a clean product feed; worst used as a dumping ground for unstructured campaigns." },
        ],
      },
      {
        heading: "The creative layer: structured testing grids, not vibes",
        body: [
          "Creative is responsible for 50–70% of campaign performance in auction-based platforms (Meta's own analysis of 2024–2025 accounts). A creative testing grid is the operating discipline that ships enough variation to find winners. We run a 4×4 grid per ad set: 4 hooks (first 3 seconds of video / first line of copy) × 4 visual formats (UGC talking head, product demo, motion graphic, founder/CEO on camera). The grid produces 16 creatives; the top 3 by hook-through-rate (HTR) and CTR advance; the bottom 13 are retired. The grid runs again weekly, with the winning hook combined with 4 new visuals. Over 8 weeks, this produces 32 cumulative creatives and a clear winner by ROAS.",
          "Creative production at scale requires a parallelised workflow. Our Birmingham and Multan teams run a 48-hour creative turn: brief on Monday, raw UGC captured Tuesday–Wednesday, edit and assembly Wednesday–Thursday, legal/brand review Thursday, live in ad accounts Friday morning UK time. Volume matters: accounts shipping 10+ creatives per week see 2.1× the ROAS of accounts shipping 1–2, controlling for budget and audience.",
        ],
        jargon: [
          { term: "Hook-through-rate (HTR)", def: "Percentage of users who watch the first 3 seconds of a video ad (the 'ThruPlay' threshold on Meta). Top-quartile HTR is 35–55% on Reels, 25–40% on TikTok. HTR predicts CTR better than any other pre-launch metric." },
          { term: "Creative fatigue", def: "When a single creative's frequency exceeds 4–5 impressions per user per week and CTR drops 20%+ from peak. Detection rule: if HTR drops >15% week-over-week at constant spend, retire the creative." },
          { term: "Dynamic Creative Optimization (DCO)", def: "Platform feature that mixes headlines, descriptions and images at auction time to find the best combination. Meta's 'Advantage+ Creative' and Google's 'Responsive Search Ads' both use DCO. Useful for testing but masks which combination is winning." },
        ],
      },
      {
        heading: "The measurement layer: server-side tracking + multi-touch attribution",
        body: [
          "Browser-based pixels are now a degraded signal. Safari's ITP caps cookie lifetimes at 7 days; Firefox ETP blocks known trackers; iOS 14.5+ requires explicit ATT opt-in (~75% opt-out in the US, ~85% in the EU). The fix is server-side tracking: events fired from your server to the ad platforms' APIs (Meta CAPI, TikTok Events API, Google Conversion API, LinkedIn CAPI, Reddit Conversions API). Server-side tracking restores 18–30% of lost attribution signal on Meta and 25–40% on TikTok. We deploy via Google Tag Manager Server-Side (GTM-SS) on a Google Cloud Run or Cloudflare Workers endpoint, with PII hashing (SHA-256) for email and phone fields to satisfy GDPR and platform terms.",
          "Multi-touch attribution (MTA) replaces last-click credit with a model that distributes credit across touchpoints. We use GA4's data-driven attribution as the default MTA model for non-subscription businesses; Triple Whale's pixel-based attribution for D2C e-commerce (which blends platform, server and UTM data into a single customer journey); Northbeam for multi-channel D2C where subscriptions or recurring revenue exist; and Hyros for info-product / coaching funnels where the customer journey is long and crosses many touchpoints. MTA is never 100% accurate — it's an estimator. The discipline is to use the same estimator over time and optimise the deltas, not the absolute numbers.",
        ],
      },
      {
        heading: "The bidding layer: when to automate vs. when to constrain",
        body: [
          "Smart Bidding (Google's Target CPA / Target ROAS / Maximize Conversions, Meta's Advantage+ campaign budget, TikTok's Smart+) outperforms manual bidding 80–90% of the time when an account has ≥30 conversions/month per campaign. Below 30 conversions, Smart Bidding has insufficient signal and produces erratic CPAs — manual CPC with bid caps outperforms. We use a decision matrix: ≥30 conv/mo → Smart Bidding; 10–30 conv/mo → Smart Bidding with conservative targets + daily review; <10 conv/mo → manual CPC or CPM with explicit learning budget.",
          "Automation constraints are as important as the automation itself. We always set campaign budget caps (1.5× target daily spend to allow algorithmic flexibility without runaway spend), bid caps (Google's portfolio bid strategies with maximum CPA), and audience exclusions (excluded competitor brands, past-30-day site visitors for TOFU campaigns, employees, current customers for acquisition campaigns). Without constraints, Smart Bidding will spend into the cheapest audience — which is often your lowest-value customer.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build Paid Media Programmes With",
    intro: [
      "Our paid media stack is the same set of tools we have operated across $48M/year in managed media. Every tool below has been selected because it survived a real account-scale incident — not because it had the loudest booth at the last conference.",
    ],
    categories: [
      {
        name: "Ad Platforms",
        items: [
          { name: "Google Ads (Search, PMax, Shopping, Display, YouTube)", description: "Primary BOFU channel. We use PMax only with ≥30 conv/mo + clean feed. YouTube Demand Gen for TOFU. Search with exact + phrase match only; broad match disabled." },
          { name: "Meta Ads (Facebook + Instagram)", description: "Primary TOFU + MOFU + retargeting. Advantage+ Shopping for e-com; manual placements for B2B. Reels-only ad sets run when CPM is 40%+ lower than Feed." },
          { name: "TikTok Ads", description: "Demand discovery at low CPM ($1.80–$5.50). Smart+ for conversion campaigns with ≥50 conv/mo. Spark Ads on creator content outperform brand-owned by 2.3× CTR." },
          { name: "LinkedIn Ads", description: "B2B lead gen where deal size >$15K. Conversation Ads for high-intent lead forms; Sponsored Content for awareness. Account-based targeting via matched audiences." },
          { name: "Microsoft Ads / X Ads / Reddit Ads", description: "Microsoft for Bing search inventory + LinkedIn profile targeting. Reddit for technical community reach (subreddit targeting). X for real-time news adjacency and creator amplification." },
        ],
      },
      {
        name: "Measurement & Attribution",
        items: [
          { name: "GA4 + GTM Server-Side", description: "Free baseline. GTM-SS on Cloud Run restores 18–30% of signal lost to ITP/ATT. Custom events for every funnel stage, not just purchase." },
          { name: "Triple Whale", description: "D2C e-commerce attribution. Pixel-based journey + UTM normalization + Shopify-native. Replaces Databricks-style in-house MTA for sub-$100M D2C brands." },
          { name: "Northbeam", description: "Multi-channel D2C attribution for brands with subscriptions, retail or wholesale channels. Stores data in Snowflake for warehouse-native analysis." },
          { name: "Hyros", description: "Info-product / coaching / high-ticket funnel attribution. Tracks ad-to-call-to-sale journeys with offline conversion sync to ad platforms." },
          { name: "Meta CAPI / TikTok Events API / Google Conversion API", description: "Server-side conversion APIs that bypass browser restrictions. Required for Meta/TikTok accounts above $10K/mo spend." },
        ],
      },
      {
        name: "Creative & Operations",
        items: [
          { name: "Figma + Canva + Adobe Premiere", description: "Creative production stack. Figma for static ad layouts, Canva for rapid iteration by non-designers, Premiere + After Effects for video editing." },
          { name: "Motion + AdCreative.ai", description: "Creative analytics (Motion) for per-creative fatigue detection + AI-assisted variations (AdCreative.ai) for first-draft static concepts." },
          { name: "Looker Studio + Tableau", description: "Client-facing dashboards. Looker Studio for free GA4/Search Console/ads platform pulls; Tableau for cross-platform blended ROAS + finance reconciliation." },
          { name: "Slack + Notion + Linear", description: "Operations stack. Slack for daily trading alerts, Notion for creative briefs and editorial calendar, Linear for technical tracking tasks (pixel, CAPI, feed fixes)." },
          { name: "Polar Analytics / Glew.io", description: "E-commerce analytics aggregators. Pull Shopify + ad platform data into a single dashboard for blended CAC, LTV:CAC and contribution margin by channel." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "In-house solo buyer", "Boutique agency", "ClickTake Paid Media"],
      rows: [
        ["Platforms covered", "no:1–3", "yes:3–5", "yes:11 platforms"],
        ["Server-side tracking", "no", "maybe", "yes:GTM-SS on Cloud Run"],
        ["Multi-touch attribution", "no:Last-click", "maybe:Platform pixels", "yes:Triple Whale / Northbeam / GA4 DDA"],
        ["Incrementality testing", "no", "no", "yes:Geo-holdout quarterly"],
        ["Creative shipping rate", "yes:1/wk", "yes:2–3/wk", "yes:8–16/wk"],
        ["Smart Bidding governance", "no", "maybe", "yes:Decision matrix + 1.5× caps"],
        ["Finance reconciliation", "no", "no", "yes:Blended ROAS vs. P&L"],
        ["Dashboard access", "no:Ad platform only", "maybe:Looker basic", "yes:Real-time blended + finance"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Audit to Scaling in 5 Phases",
    intro: [
      "We ship paid media programmes in 6–10 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'campaign launches' where the team shows you a single ad set.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Audit & Measurement Foundation",
        duration: "Week 1–2",
        deliverables: ["Account audit report", "GTM-SS spec", "Conversion taxonomy", "Finance baseline (P&L reconciliation)"],
        description:
          "We audit every active ad account across 47 dimensions: account structure, campaign type mix, audience overlap, creative diversity, bidding strategy, attribution setup, conversion tracking, feed quality (for Shopping/PMax), negative keyword coverage and budget pacing. We spec the server-side tracking layer (GTM-SS, Meta CAPI, TikTok Events API, Google Conversion API) and reconcile platform-reported revenue to your finance P&L — most accounts show a 20–40% gap on day one. This phase defines the measurement truth the rest of the engagement optimises against.",
      },
      {
        phase: "Phase 2",
        title: "Account Restructure & Funnel Architecture",
        duration: "Week 2–4",
        deliverables: ["New account structure", "Campaign briefs (TOFU/MOFU/BOFU)", "Audience map", "Budget allocation model"],
        description:
          "We restructure the ad account into a full-funnel architecture: TOFU campaigns on YouTube/Meta/TikTok for cold reach, MOFU campaigns on Meta/TikTok/Display for warm retargeting, BOFU campaigns on Search/PMax/Shopping for high-intent conversion, and a separate retargeting layer with frequency caps. Audience overlap is eliminated via exclusion rules (e.g., MOFU excludes 30-day site visitors who are already in BOFU). Budget allocation is modelled against the funnel conversion rate and target blended ROAS — not split equally across platforms.",
      },
      {
        phase: "Phase 3",
        title: "Creative Testing Grid Launch",
        duration: "Week 4–6",
        deliverables: ["Creative brief bank (16–32 concepts)", "First 4×4 grid live", "Hook/visual asset library", "Fatigue monitoring rules"],
        description:
          "We launch the first creative testing grid: 4 hooks × 4 visual formats = 16 creatives per ad set. Hooks are tested by HTR (hook-through-rate) at the 3-second mark; visuals are tested by hold rate (3s–15s). The grid runs for 7 days minimum at sufficient budget per creative ($50–$200/day depending on platform CPM). Winners advance to 'scale' ad sets; losers retire. The brief bank holds 32–64 concepts queued for future grids, each tied to a specific funnel stage, value proposition and audience segment.",
      },
      {
        phase: "Phase 4",
        title: "Bidding Strategy & Automation Governance",
        duration: "Week 6–8",
        deliverables: ["Bidding decision matrix", "Smart Bidding portfolio config", "Bid/budget caps", "Daily trading runbook"],
        description:
          "We apply the bidding decision matrix per campaign: Smart Bidding for ≥30 conv/mo campaigns, manual with bid caps for low-volume, CPM bidding for awareness. We configure portfolio bid strategies in Google (Target CPA / Target ROAS shared across campaigns), Advantage+ campaign budget in Meta, Smart+ in TikTok. Every automated campaign gets explicit budget caps (1.5× target daily) and bid caps (target CPA × 1.3). The daily trading runbook specifies what to review at 8am, 12pm and 5pm UK time — and what triggers a bid/budget change.",
      },
      {
        phase: "Phase 5",
        title: "Attribution, Incrementality & Scaling",
        duration: "Week 8–10",
        deliverables: ["MTA dashboard live", "First geo-holdout test", "Scaling playbook", "Quarterly review cadence"],
        description:
          "We launch the MTA dashboard (Triple Whale / Northbeam / GA4 DDA depending on stack) reconciled to finance. We run the first incrementality test: a 4-week geo-holdout where we pause all paid media in 2–3 DMAs and measure the revenue delta. Most accounts see 70–85% of platform-reported conversions confirmed as incremental; the rest is over-reported. We document the scaling playbook (when to add budget, when to add creative, when to add platforms) and establish a quarterly review cadence with finance in the room.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Paid Media Compounds",
    intro: [
      "The use cases below are drawn from production accounts operated between 2023 and 2026. Each card describes the specific business problem, the campaign architecture we built, and the measurable result after 90 days.",
    ],
    cases: [
      {
        industry: "D2C E-commerce (Apparel)",
        problem: "Blended ROAS of 1.8× with 70% of revenue from branded search — meaning paid media was largely cannibalising organic demand. New-customer acquisition was unprofitable at $84 CAC vs. $72 LTV.",
        application: "Rebuilt the account to full-funnel: TikTok Spark Ads + Meta Reels for TOFU at $3.20 CPM, Meta Advantage+ Shopping for MOFU, Performance Max for BOFU with a clean Google Merchant Center feed. Server-side Meta CAPI + Triple Whale attribution. Creative grid shipping 12 creatives/week.",
        result: "Blended ROAS lifted to 4.2× in 90 days. New-customer CAC dropped to $51. Branded search share of paid spend fell from 70% to 28% as TOFU drove non-brand demand.",
      },
      {
        industry: "B2B SaaS Lead Gen (DevOps tooling)",
        problem: "LinkedIn Ads CPA of $480 with a 1.8% lead-to-customer conversion, putting effective CAC at $26,700 vs. $19,000 target LTV. Sales team had no inbound pipeline confidence.",
        application: "Shifted 60% of LinkedIn spend to retargeting on a content-led TOFU programme (YouTube long-form + Google Search on category keywords). Lead-form optimization to 5 fields. HubSpot offline conversion sync to LinkedIn + Google for value-based bidding. ABM layer on 200 named accounts via LinkedIn Conversation Ads.",
        result: "LinkedIn CPA fell to $290. Lead-to-customer conversion rose to 3.4%. Blended CAC dropped to $8,540. Sales-qualified pipeline grew 3.1× in 6 months.",
      },
      {
        industry: "Local Services (Multi-location Dental Group)",
        problem: "32 UK locations with 1 Google Ads account serving all locations — resulting in budget cannibalisation and $165 CPA. Google Business Profile listings unoptimised; review velocity low.",
        application: "Restructured into location-based campaigns with location asset-level budgets. PMax with location signals for nearby intent. CallRail call tracking + offline conversion import. GBP optimization programme: review request automation, Q&A monitoring, photo posting cadence.",
        result: "CPA dropped to $84. Call-to-booking conversion rose from 18% to 31%. Locations with GBP optimization saw 2.4× more direction requests and 1.8× more calls vs. control group.",
      },
      {
        industry: "Mobile App Installs (Fintech)",
        problem: "Apple Search Ads + Meta App Install campaigns producing 28-day D1 retention of 14% — meaning paid installs were lower quality than organic. Cost per install (CPI) was $4.20 vs. $3.00 target.",
        application: "Implemented SKAdNetwork 4.0 + AppsFlyer attribution with probabilistic matching. Shifted Meta optimisation from 'App Install' to 'Day-7 active user' event. A/B tested 6 creative concepts with value-based bidding on lifetime-value signals after 14 days.",
        result: "CPI dropped to $3.10. D1 retention rose to 24%. D7 retention rose from 6% to 11%. Paid channels now produce higher-quality users than organic on a 30-day retained-user basis.",
      },
      {
        industry: "Events & Ticketing",
        problem: "Annual conference with 6-month sales window. Meta + Google Ads spent $140K and delivered 8,200 ticket sales against 12,000 target. Last 4 weeks saw 60% of sales — too late to optimise.",
        application: "Built a 6-month always-on funnel: TOFU YouTube + Meta video views at $4 CPM for months 1–3, MOFU retargeting on website visitors in months 3–5, BOFU search + Performance Max in final 6 weeks. Lookalike audiences refreshed monthly from past-attendee list.",
        result: "Same $140K budget delivered 13,400 ticket sales (12% over target). Cost per ticket sale dropped from $17 to $10.40. Last-4-weeks share of sales fell to 41%, allowing earlier revenue recognition.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Paid Media Models Compared",
    intro: [
      "An honest comparison of the four paid media operating models most brands consider. We have operated all four — the right choice depends on your monthly media budget, in-house talent depth and growth-stage requirements.",
    ],
    tables: [
      {
        title: "In-house solo buyer vs. Boutique agency vs. Performance PR agency vs. ClickTake Paid Media",
        headers: ["Dimension", "In-house solo", "Boutique agency", "Performance PR agency", "ClickTake"],
        rows: [
          ["Min monthly media", "yes:$5K", "yes:$15K", "yes:$50K", "yes:$25K"],
          ["Platforms covered", "no:1–3", "yes:3–5", "yes:5–7", "yes:11"],
          ["Server-side tracking", "no", "maybe", "no", "yes"],
          ["Multi-touch attribution", "no", "maybe", "yes", "yes"],
          ["Incrementality tests", "no", "no", "maybe", "yes"],
          ["Creative production", "no:Self-serve", "maybe:Outsourced", "yes:In-house", "yes:48-hr turn"],
          ["Finance reconciliation", "no", "no", "no", "yes"],
          ["Engagement model", "yes:Salary", "yes:Retainer + %", "yes:Retainer + %", "yes:Retainer + perf bonus"],
        ],
      },
      {
        title: "Platform fit by funnel stage and business model",
        headers: ["Platform", "Best funnel stage", "Best business model", "Typical CPM", "Min conv/mo for Smart Bidding"],
        rows: [
          ["Google Search", "BOFU", "All (especially high-intent)", "$8–$40", "30"],
          ["Performance Max", "BOFU", "E-commerce with feed", "$6–$20", "30"],
          ["YouTube", "TOFU/MOFU", "All (brand-led)", "$4–$14", "100 (for conv.)"],
          ["Meta (FB+IG)", "TOFU/MOFU/BOFU", "D2C, lead gen, app", "$5–$14", "50"],
          ["TikTok", "TOFU/MOFU", "D2C, app, brand-led", "$1.80–$5.50", "50"],
          ["LinkedIn", "MOFU/BOFU", "B2B (deal >$15K)", "$12–$35", "20"],
          ["Microsoft Ads", "BOFU", "Older demographics, B2B", "$5–$25", "20"],
          ["Reddit", "TOFU/MOFU", "Tech, gaming, finance", "$2–$10", "30"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROAS, CAC and Pipeline",
    intro: [
      "Paid media earns its budget back through one of three mechanisms: lower CAC (acquiring the same customer for less), higher ROAS (extracting more revenue per dollar spent), or pipeline acceleration (compressing the sales cycle for high-LTV B2B customers). The numbers below are aggregated across 38 production accounts operated 2023–2026.",
    ],
    metrics: [
      { value: "4.7×", label: "Median blended ROAS", description: "Across all operated accounts after 90 days, vs. 2.1× pre-engagement baseline." },
      { value: "−38%", label: "Avg CPA reduction", description: "Cost per acquisition at 90 days, measured against pre-engagement baseline on same platforms." },
      { value: "+2.1×", label: "Pipeline lift (B2B)", description: "Sales-qualified pipeline growth at 6 months for B2B SaaS accounts." },
      { value: "82%", label: "Incremental conversion share", description: "Share of platform-reported conversions confirmed by geo-holdout tests as truly incremental." },
    ],
    body: [
      "Lower CAC is the most measurable impact and typically funds the engagement. A D2C apparel brand spending $200K/month at $84 CAC sees CAC drop to $51 within 90 days — a $66K/month saving on the same volume, or 33% more customers at the same budget. The paid media programme that delivers this costs $18K–$35K/month to operate; the payback period is under 3 weeks.",
      "Higher ROAS is the second-order effect. The same D2C brand above sees blended ROAS lift from 1.8× to 4.2× — meaning every $1 of ad spend now drives $4.20 of revenue instead of $1.80. The lift comes from three sources: TOFU creative testing finding higher-CTR ad concepts, server-side tracking giving the ad platforms better signal to bid on, and Smart Bidding governance preventing the platform from over-spending into low-value audiences.",
      "Pipeline acceleration is the B2B equivalent. A DevOps SaaS client saw their sales cycle compress from 92 days to 61 days after we deployed an ABM layer on LinkedIn Conversation Ads synced to HubSpot. The 31-day compression translated to 3.1× the qualified pipeline at the same quarterly revenue target — meaning finance could fund the next growth initiative without raising. The compounding effect: a shorter cycle also lifts LTV:CAC because the same sales capacity closes more deals per year.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Paid media programmes do not live in ad platform UIs. They sit inside your analytics, CRM, e-commerce, data warehouse and finance stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Ad Platforms",
        items: ["Google Ads (Search, PMax, Shopping, Display, YouTube, Demand Gen)", "Meta Ads (Facebook + Instagram + Messenger + WhatsApp)", "TikTok Ads (Spark Ads, Smart+)", "LinkedIn Ads (Sponsored Content, Message Ads, Conversation Ads, Text Ads)", "Microsoft Ads (Bing, Yahoo, AOL)", "X Ads / Reddit Ads / Pinterest Ads / Snapchat Ads"],
      },
      {
        name: "Analytics & Attribution",
        items: ["GA4 + GTM Server-Side (Cloud Run / Cloudflare Workers)", "Triple Whale (D2C e-com)", "Northbeam (multi-channel D2C)", "Hyros (info-products / high-ticket)", "AppsFlyer / Adjust (mobile app)", "Mixpanel / Amplitude (product analytics)"],
      },
      {
        name: "CRM & E-commerce",
        items: ["HubSpot (offline conversion sync to Google/Meta/LinkedIn)", "Salesforce (Pardot + Sales Cloud)", "Shopify / Shopify Plus (pixel + CAPI)", "WooCommerce / BigCommerce / Magento", "Stripe (revenue back to ad platforms for value-based bidding)", "Klaviyo / Attentive (email/SMS for audience sync)"],
      },
      {
        name: "Data & Reporting",
        items: ["Looker Studio (free, GA4/Search Console/ads pulls)", "Tableau (cross-platform blended ROAS + finance)", "Snowflake / BigQuery / Databricks (warehouse-native)", "Polar Analytics / Glew.io (D2C aggregators)", "CallRail / Invoca (call tracking + offline conversions)"],
      },
    ],
    compliance: ["GDPR (EU/UK — consent mode v2 + IAB TCF)", "CCPA / CPRA (California)", "ePrivacy Directive (cookie consent)", "Apple ATT (iOS 14.5+ SKAdNetwork)", "Google Consent Mode v2", "PCI DSS (where ad platforms touch payment data — none typically)", "Platform-specific: Meta'sAdvertiser Compliance, Google's Ads Acceptable Use"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Accounts in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Brand names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK-based D2C skincare brand, ~£8M ARR",
        situation: "Spending £165K/month on Meta + Google Ads at a blended ROAS of 1.8×. 70% of attributed revenue came from branded search — paid media was largely capturing demand that organic search would have delivered for free. New-customer CAC of £68 was above £62 LTV, making paid acquisition structurally unprofitable. Meta pixel was undercounting conversions by ~30% due to iOS ATT.",
        task: "Rebuild the account into a full-funnel architecture, deploy server-side tracking, ship weekly creative at scale, and lift blended ROAS to 3.5× within 90 days while growing new-customer share from 30% to 55% of revenue.",
        action: "ClickTake deployed GTM Server-Side on Google Cloud Run with Meta CAPI, TikTok Events API and Google Conversion API — restoring 27% of lost attribution signal. We restructured Meta into Advantage+ Shopping (BOFU) + manual Reels campaigns (TOFU) and split Google into PMax with a clean product feed + non-brand Search. The Birmingham creative team shipped 14 creatives/week via the 4×4 testing grid. Triple Whale was deployed for MTA; Looker Studio dashboard reconciled platform ROAS to Shopify revenue daily.",
        result: "Blended ROAS lifted to 4.4× by day 60 and held at 4.2× through day 90. New-customer CAC dropped to £43. New-customer share of revenue grew to 58%. Branded search share of paid spend fell from 70% to 26%. A geo-holdout test in months 4–5 confirmed 84% of reported conversions were incremental. Annualised revenue impact: £3.1M incremental.",
        quote: {
          text: "We were 3 months from cutting paid media entirely because every dollar we spent was paying for customers we'd have gotten free. ClickTake rebuilt the funnel from cold traffic upward — now 58% of new customers come from paid, and the unit economics actually work.",
          author: "Founder & CEO",
          title: "UK-based D2C skincare brand",
        },
      },
      {
        client: "US-based B2B SaaS, ~$22M ARR, 6-month sales cycle",
        situation: "LinkedIn Ads spend of $48K/month producing 96 marketing-qualified leads at $500 CPL. Sales qualified only 18% of these, and closed 11% — effective CAC of $25,250 against a $19,000 12-month LTV. The CMO was under board pressure to cut paid media and pivot to organic only.",
        task: "Reduce CAC below $12,000 and lift SQL-to-closed conversion above 25% within 6 months — without growing the sales team or shrinking the sales cycle below the threshold needed for proper qualification.",
        action: "ClickTake deployed a 3-layer architecture: (1) TOFU YouTube long-form + Google Search on category keywords to build content-led demand, (2) MOFU LinkedIn Conversation Ads on a matched-audience ABM list of 200 named accounts, (3) BOFU retargeting on website visitors with case-study creative. HubSpot offline conversion sync pushed closed-won revenue back to LinkedIn and Google for value-based bidding. We deployed Northbeam for multi-touch attribution across the 6-month journey and reconciled to Salesforce revenue weekly.",
        result: "LinkedIn CPL fell to $290. Lead-to-customer conversion rose to 3.4%. Effective CAC dropped to $8,540. SQL-to-closed conversion hit 27%. Sales-qualified pipeline grew 3.1× in 6 months, allowing the CMO to defend paid media at the next board meeting. The 6-month sales cycle compressed to 61 days — adding one extra close per sales rep per quarter.",
        quote: {
          text: "The board was about to kill paid media entirely. Six months later, paid is our largest pipeline source and the unit economics are finally defensible. The attribution layer was the unlock — once finance could see the full journey, the case made itself.",
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
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most account strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Engagements",
        questions: [
          {
            q: "How much does a paid media programme cost to operate?",
            a: "Retainer ranges from $4K/month (single-platform, <$25K media) to $25K/month (multi-platform, >$500K media, with full creative production + managed attribution stack). Most accounts sit in the $8K–$15K/month range. We also take a performance bonus on ROAS/CPA targets hit — typically 5–15% of media spend, capped. Total cost-to-serve is usually 8–18% of media spend all-in.",
          },
          {
            q: "What is the minimum monthly media budget you'll take on?",
            a: "$25K/month across all platforms combined. Below that, the budget doesn't fund enough creative testing, audience diversity or Smart Bidding signal to operate a full-funnel programme properly. For budgets of $5K–$25K/month we offer a lighter 'coaching' engagement where we build the foundation and train your in-house buyer.",
          },
          {
            q: "Do you charge a percentage of media spend?",
            a: "Optional. Our standard model is a fixed retainer + performance bonus on agreed targets. We also offer a media-spend-percentage model (8–15%) for accounts above $100K/month — clients typically prefer this when they want their agency incentivised on efficiency rather than target-hitting. Both models are transparent; we don't take hidden rebates from platforms or media vendors.",
          },
          {
            q: "Is there a setup fee for new accounts?",
            a: "Yes — a one-time $8K–$18K setup fee covering audit, GTM-SS deployment, account restructure, first creative grid and dashboard build. This is the foundation work that doesn't recur monthly. Existing accounts with clean tracking and structure can sometimes skip the setup fee if the audit comes back clean.",
          },
        ],
      },
      {
        name: "Platforms & Strategy",
        questions: [
          {
            q: "Which ad platforms do you actively operate?",
            a: "Google Ads (Search, Performance Max, Shopping, Display, YouTube, Demand Gen), Meta (Facebook + Instagram), TikTok, LinkedIn (Sponsored Content, Conversation Ads, Message Ads, Text Ads), Microsoft Ads, X Ads, Reddit Ads, Pinterest Ads, Snapchat Ads, and Apple Search Ads. That's 11 platforms. We recommend the right 3–6 for your business based on funnel stage, audience and budget — not all 11.",
          },
          {
            q: "When should we use Performance Max vs. Shopping vs. Search?",
            a: "PMax is the right default for e-commerce with ≥30 conversions/month and a clean Google Merchant Center feed — it places ads across Google's full inventory from one campaign. Standard Shopping is preferred when you need granular control over product-level bidding or when PMax cannibalises your branded search. Search (non-brand) is the right BOFU layer for service businesses, lead gen and brand-keyword defence. We typically run PMax + non-brand Search in parallel with explicit exclusion rules to prevent overlap.",
          },
          {
            q: "Should we be on TikTok?",
            a: "If your audience is under 45 and your product has visual appeal (D2C, app, food, beauty, fashion, fitness, entertainment), yes — TikTok CPMs are 40–70% lower than Meta's and creative diversity lifts overall account performance. If you're B2B with a deal size over $15K, no — LinkedIn + YouTube outperform. TikTok requires 8–16 creatives/week to avoid fatigue; if you can't sustain that production rate, don't start.",
          },
          {
            q: "How do you handle Microsoft Ads, X Ads and Reddit Ads?",
            a: "Microsoft Ads is a baseline — same Google Ads campaigns mirrored, typically 12–22% incremental conversions at 70–80% of Google's CPA. Reddit is high-value for technical B2B (developer tools, fintech, gaming) via subreddit targeting. X is opportunistic — useful for real-time news adjacency, creator amplification and political/news-adjacent brands. We don't recommend Pinterest/Snapchat unless the audience fit is explicit (Pinterest for home/wedding/food; Snapchat for under-25 Gen Z).",
          },
        ],
      },
      {
        name: "Measurement & Attribution",
        questions: [
          {
            q: "How do you handle iOS 14.5+ attribution loss on Meta and TikTok?",
            a: "Server-side tracking via GTM Server-Side on Google Cloud Run or Cloudflare Workers. Events fired from your server to Meta CAPI, TikTok Events API and Google Conversion API. PII (email, phone) is SHA-256 hashed to satisfy GDPR and platform terms. This restores 18–30% of lost signal on Meta and 25–40% on TikTok. We also deploy SKAdNetwork 4.0 for mobile app accounts and AppsFlyer/Adjust for probabilistic matching.",
          },
          {
            q: "What attribution model should we use?",
            a: "It depends on your business. D2C e-commerce: Triple Whale's pixel-based MTA. Multi-channel D2C with subscriptions/retail: Northbeam. Info-products / coaching / high-ticket: Hyros. B2B SaaS with long cycles: GA4 data-driven attribution + HubSpot offline conversion sync. Last-click is never the right answer for a full-funnel programme — it starves TOFU/MOFU channels of credit and you'll defund them within 90 days.",
          },
          {
            q: "What is incrementality testing and why does it matter?",
            a: "A geo-holdout test where we pause all paid media in 2–3 designated market areas (DMAs) for 4 weeks and measure the revenue delta vs. control DMAs. The test tells you what percentage of reported conversions would have happened anyway — most accounts see 70–85% of conversions confirmed as incremental; the rest is over-reported (branded search, retargeting on users who'd convert anyway). Without incrementality testing, you're optimising to platform-reported numbers that finance will eventually challenge. We run a quarterly geo-holdout on every account above $50K/month media.",
          },
          {
            q: "Why do platform-reported ROAS and finance-reported revenue disagree by 30%+?",
            a: "Three reasons: (1) platforms use different attribution windows (Meta 7d-click + 1d-view; Google 30d-click) so they double-count the same conversion; (2) platforms don't see offline conversions or call-driven sales; (3) platforms credit branded search and retargeting that would have converted without paid. We bridge the gap by reconciling platform-reported revenue to your Shopify/Stripe/finance P&L monthly and using MTA to allocate credit across the full journey.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your paid media teams based?",
            a: "Trading desks in Birmingham (UK) and Multan (Pakistan) covering UK + EU + MENA time zones; client services and strategy in Austin (USA) and Dubai (UAE) covering Americas + GCC. Daily trading runs 7am–7pm UK time with a Pakistan evening shift for APAC coverage. Creative production runs from Multan with a 48-hour turn and UK creative-direction review.",
          },
          {
            q: "Who owns the ad accounts and the data?",
            a: "You do. Always. We require accounts to be in your name with your billing — never in an agency-owned account. We're added as admins; you can revoke access in 24 hours. All conversion data, audience lists and creative assets are yours, exported on request. We don't lock you in via account ownership.",
          },
          {
            q: "What happens if we want to bring paid media in-house later?",
            a: "We support it — and we've done clean handovers for 12+ accounts over the past 3 years. Standard handover is 8 weeks: weeks 1–4 we document every campaign, audience, creative decision rule and bidding strategy in a Notion playbook; weeks 5–8 we shadow your in-house buyer and step in only if performance drops. After handover, we offer a $2K/month 'advisory only' tier where we review weekly and flag issues without operating the account.",
          },
          {
            q: "Do you work with our existing creative agency or production team?",
            a: "Yes, in two configurations. (1) Your team produces raw assets (UGC, photography, brand video); our team does ad-specific edit, copywriting and testing grid management. (2) Our team produces everything end-to-end via the Multan creative studio. We don't compete with brand agencies on brand identity work — we focus on performance creative within the brand system they've defined.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Make Paid Media Pay Back?",
    subtitle:
      "Book a free 30-minute account audit. We'll pull your ad accounts, reconcile platform ROAS to your finance P&L, and tell you honestly whether you have a measurement problem, a creative problem, or a funnel-architecture problem — and what each would cost to fix.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min audit call",
        description: "Free. We pull your ad accounts (read-only), reconcile to finance, and identify the top 3 levers.",
      },
      {
        step: "2",
        title: "Receive audit report + 90-day plan",
        description: "Fixed deliverable: account scorecard, gap analysis, proposed restructure, $-quantified opportunity.",
      },
      {
        step: "3",
        title: "Sign off on targets — we operate",
        description: "Retainer + performance bonus against agreed ROAS/CPA targets. Cancel any time after 90 days.",
      },
    ],
    primaryCta: { label: "Book a Free Account Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Paid Media Playbook", href: "/resources", variant: "outline" },
  },
}
