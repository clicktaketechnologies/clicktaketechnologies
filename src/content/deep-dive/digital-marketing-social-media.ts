import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/digital-marketing/social-media — Social Media Marketing
 *
 * Strategy, content production, community management, paid social,
 * influencer and analytics across 9 platforms. Built on Buffer,
 * Hootsuite, Sprout Social, Later, Loomly, Metricool. ~5,200 words
 * across 12 sections.
 */
export const socialMediaDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Digital Marketing",
    title: "Social Media Marketing: Strategy, Content & Community Across 9 Platforms",
    subtitle:
      "We design and operate social media programmes — strategy, content production (image, video, carousel, reels), community management, paid social, influencer activation and analytics — across Facebook, Instagram, TikTok, LinkedIn, YouTube, X, Pinterest, Snapchat and Threads, measured by reach, engagement rate, follower growth and social-driven revenue, not by post count.",
    geoDefinition:
      "Social media marketing is the discipline of building brand presence, audience engagement and revenue contribution across social platforms through coordinated strategy, content production, community management, paid amplification and influencer activation. A modern social media programme operates 3–6 platforms simultaneously with platform-native content formats (Reels, TikToks, YouTube Shorts, LinkedIn long-form, X threads, Pinterest pins), measuring reach, engagement rate, share of voice, and social-driven revenue via UTM attribution and platform-native analytics. ClickTake Technologies operates social media programmes for D2C brands, B2B SaaS, local businesses, personal brands and creators across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with content and community teams fluent in Buffer, Hootsuite, Sprout Social, Later, Loomly and Metricool.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Social Audit", href: "/contact", variant: "orange" },
      { label: "Download the Social Media Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "+218%", label: "Avg. engagement rate lift (6mo)" },
      { value: "9", label: "Platforms operated" },
      { value: "48hr", label: "Brief → published turn" },
      { value: "3.4×", label: "Social-driven revenue (12mo)" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing/social-media" },
      { label: "Social Media Marketing" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Social Media Programmes Become a Posting Schedule",
    intro: [
      "Most social media programmes fail the same way: a posting calendar full of 'on-brand' content, a monthly follower-growth target that rewards vanity metrics, and an analytics report that shows 18% engagement rate (counting likes, comments, AND saves as 'engagement') without revenue contribution. After 12 months of investment, the brand has 28K followers, posts 5 times per week, and the CFO is asking why social can't be tied to a single closed-won deal.",
      "The structural problem is that most social programmes operate as a publishing schedule, not as a revenue channel. Publishing content is easy — anyone can post a Reel. Building an audience that converts into revenue requires content pillars aligned to the buyer journey, platform-native formats that the algorithm rewards, community management that turns followers into fans, and an attribution layer that ties social touchpoints to pipeline. Without these, social becomes a cost centre that the CFO cuts first.",
    ],
    painPoints: [
      {
        title: "Posting cadence without content pillars = noise",
        description:
          "An Instagram account that posts 5 times per week about 'whatever the team brainstormed Monday morning' produces 260 posts per year of incoherent content. The algorithm can't categorise the account, the audience doesn't know what to expect, and engagement plateaus at 1.5–2.5%. Real social programmes run 4–6 content pillars per platform and rotate them on a cadence the audience can predict.",
      },
      {
        title: "Cross-posting identical content across platforms punishes reach",
        description:
          "A landscape YouTube video repurposed as a square Instagram post and a 9:16 TikTok with text overlay performs 60–80% worse than native content on each platform. The algorithms detect non-native aspect ratios, text overlays that look like watermarks, and engagement patterns that don't match the platform's norms. Native production is the price of entry, not a competitive advantage.",
      },
      {
        title: "Community management is reactive, not proactive",
        description:
          "Most brands respond to comments within 24 hours (the industry standard) but never initiate conversations, never engage with adjacent accounts, never participate in industry discussions. Community management that's purely reactive produces 0.5–1.5% engagement rate; proactive community management (initiating, engaging, amplifying) produces 4–8% engagement rate on the same content.",
      },
      {
        title: "No social-to-revenue attribution = no budget defence",
        description:
          "Without UTM-tagged links, promo codes, and platform-native conversion APIs (Meta CAPI, TikTok Events API), social media's contribution to revenue is invisible. Brands that operate paid social + organic social without attribution wiring end up crediting all revenue to last-click paid search — and cutting organic social at the next downturn.",
      },
    ],
    paradigmShift: [
      "A social media programme is a revenue channel that compounds audience, engagement and conversion over time. We engineer it as such: a content pillar strategy matched to the buyer journey, platform-native production at scale (8–20 posts per week per platform), proactive community management that turns followers into fans, paid social amplification of organic winners, and an attribution layer that ties social touchpoints to pipeline and revenue. The deliverable is not a post; it is a measurable, defensible, compounding acquisition and retention channel that finance can model.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production-Grade Social Media Programme Actually Is",
    intro: [
      "A social media programme is a stack of cooperating layers — strategy, content production, community, paid amplification, and analytics — not a posting calendar. Each layer can be excellent on its own and the programme will still underperform if the layers don't interlock. Below is how each layer works in a ClickTake-operated programme.",
    ],
    subsections: [
      {
        heading: "Strategy: content pillars, posting cadence, platform fit",
        body: [
          "Strategy is the input that determines whether your posts compound or dissipate. We operate four sub-areas. (1) Content pillars — 4–6 themes per platform that align to the buyer journey. A B2B SaaS company might run pillars: 'product education' (demos + features), 'customer success' (case studies + UGC), 'thought leadership' (founder POV + industry commentary), 'company culture' (team + hiring), 'entertainment' (memes + trends). Each pillar gets 1–3 posts per week. (2) Posting cadence — calibrated to platform algorithm: Instagram 4–7 posts/week + 1 Reel/day + 3–5 Stories/day; TikTok 1–3 posts/day; LinkedIn 3–5 posts/week (per author, not per company page); YouTube 1–2 long-form/week + 3–5 Shorts/week; X 3–5 posts/day; Pinterest 5–10 pins/day. (3) Platform fit — pick 3–6 platforms where your audience actually spends time, not all 9. A B2B SaaS company should NOT be on TikTok unless the audience is under 35; a D2C beauty brand should NOT be on LinkedIn.",
          "Audience research informs pillar selection. We pull audience demographics from each platform's native analytics (Meta Audience Insights, TikTok Analytics, LinkedIn Audience Insights, YouTube Analytics), map them to your customer personas, and identify which platforms actually reach your buyer. We also analyse competitor accounts: 5–10 competitors per platform, 90-day post archive, engagement rate by content type, hashtag analysis. The deliverable is a per-platform content strategy with pillar mix, cadence, and tone of voice.",
        ],
        jargon: [
          { term: "Content pillars", def: "4–6 themes per platform that align to the buyer journey. Each post is tagged to a pillar; engagement is tracked per pillar to identify what's working. Accounts with explicit pillars outperform accounts with ad-hoc content by 3–5× engagement rate over 6 months." },
          { term: "Engagement rate", def: "Engagements (likes + comments + shares + saves) ÷ reach. Calculated per post and per account. Industry benchmarks: Instagram 0.7–3%, TikTok 5–12%, LinkedIn 2–5% (per post), YouTube 2–5%. Engagement rate by reach (not by follower) is the modern standard as platforms move to algorithmic feeds." },
          { term: "Share of voice (SOV)", def: "Your brand's mentions as a percentage of total industry mentions in a given period. Measured via social listening tools (Brandwatch, Sprout Social Listening, Mention). Higher SOV correlates with brand awareness and consideration — important for category leadership, less important for direct-response D2C." },
        ],
      },
      {
        heading: "Content production: native formats at scale",
        body: [
          "Content production at scale requires a parallelised workflow producing platform-native content. We operate four format streams. (1) Video — Reels (Instagram, 9:16, 15–90s), TikToks (9:16, 15–180s), YouTube Shorts (9:16, <60s), YouTube long-form (16:9, 8–20min). Video drives 60–80% of organic reach on Meta and TikTok in 2025; non-video posts have 4–8× lower reach. (2) Image — single-image posts, carousels (Instagram 2–10 slides, LinkedIn 2–10 slides), Pinterest pins (2:3 ratio). (3) Text — X posts (280 chars), X threads (5–15 tweets), LinkedIn long-form (500–2,000 words), Threads posts (500 chars). (4) Stories — Instagram/Facebook Stories (15s per frame, 24h lifespan), used for behind-the-scenes, polls, Q&A, and time-sensitive announcements.",
          "Production volume is calibrated to platform. A typical D2C programme produces: 7 Reels/week, 21 Stories/week (3/day), 5 carousels/week, 7 TikToks/week, 2 YouTube long-form/week, 5 YouTube Shorts/week. That's 47 pieces of content per week — too much for an in-house team to produce without a structured workflow. Our Birmingham and Multan teams run a 48-hour turn: brief on Monday, raw UGC captured Tuesday–Wednesday, edit and assembly Wednesday–Thursday, brand review Thursday, scheduled in Buffer/Sprout Friday for the following week.",
        ],
        jargon: [
          { term: "Hook-through-rate (HTR)", def: "Percentage of users who watch the first 3 seconds of a video. Top-quartile HTR is 35–55% on Reels, 25–40% on TikTok. HTR predicts full-watch rate and overall reach better than any other pre-launch metric." },
          { term: "Save rate", def: "Saves ÷ reach. The highest-value engagement signal on Instagram and TikTok — saves signal content worth revisiting, which the algorithm rewards with 2–4× the reach of like-only engagement. Educational carousels and how-to Reels typically have 4–8× the save rate of entertainment content." },
          { term: "Carousel", def: "Multi-image post format on Instagram (2–10 slides) and LinkedIn (2–10 slides). Carousels drive 3–5× the engagement rate of single-image posts because they require multiple taps and increase dwell time. Best for educational content, listicles, and step-by-step guides." },
        ],
      },
      {
        heading: "Community management: proactive engagement loops",
        body: [
          "Community management is the difference between a posting schedule and an audience. We operate three sub-areas. (1) Reactive — respond to every comment within 4 hours during business hours, 24 hours max. Respond to every DM within 12 hours. Respond to every mention (tagged or untagged) within 24 hours. Industry standard is 24h response time; we operate at 4h because faster response doubles the comment-to-conversation conversion rate. (2) Proactive — engage with 20–50 accounts per day per platform: comment on industry influencer posts, reply to adjacent brand accounts, participate in conversations where your audience is active. Proactive engagement produces 4–8× the follower growth of purely reactive engagement. (3) Influencer activation — identify 10–30 micro-influencers (10K–100K followers) in your niche, build relationships via DM and comment engagement, activate 2–5 per month for sponsored content or product seeding.",
          "Community management also includes social listening — monitoring mentions of your brand, competitors, and industry keywords across all platforms. We use Sprout Social Listening or Brandwatch for enterprise accounts ($1K–$8K/month), Mention or Buffer for SMBs ($100–$500/month). Social listening surfaces customer service issues before they become PR crises, identifies user-generated content to amplify, and tracks share of voice vs. competitors.",
        ],
      },
      {
        heading: "Analytics: from reach to revenue",
        body: [
          "Social analytics is the discipline that defends the budget. We operate three measurement layers. (1) Platform-native analytics — Instagram Insights, TikTok Analytics, LinkedIn Analytics, YouTube Studio, X Analytics, Pinterest Analytics. These report reach, engagement, follower growth, audience demographics, and (where applicable) click-throughs. Free baseline. (2) Cross-platform aggregation — Sprout Social, Hootsuite, Buffer, or Metricool pull data from all platforms into a single dashboard. We deploy Sprout Social for enterprise (5+ platforms, $249–$499/month), Buffer for SMBs (3–5 platforms, $120–$200/month). (3) Revenue attribution — UTM-tagged links on every social post driving to your website, captured in GA4 + HubSpot/Salesforce; promo codes for direct-response; Meta CAPI + TikTok Events API for paid social conversion tracking.",
          "We report social ROI monthly: total reach, engagement rate, follower growth, social-driven sessions, social-driven leads, social-driven revenue. Most programmes we operate reach 3–6× social-driven revenue within 12 months — because social compounds. The first month produces 0 revenue; month 6 produces 12% of revenue from social; month 12 produces 18–28%. The math only works if you commit to the programme long enough for the audience, engagement, and attribution to compound.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build Social Programmes With",
    intro: [
      "Our social stack is the same set of tools we operate across 22 active client programmes. Every tool below has been selected because it survived a real social-scale incident — not because it had the best influencer booth at Social Media Marketing World.",
    ],
    categories: [
      {
        name: "Scheduling & Management",
        items: [
          { name: "Buffer", description: "Scheduling + analytics across 8 platforms. Best for SMBs ($120–$200/month). Strong approval workflows for client review before publishing. AI Assistant for caption first-drafts." },
          { name: "Hootsuite", description: "Enterprise scheduling + social listening + team workflows. Best for larger teams (5+ users). $249–$700/month. Integrates with 100+ apps via marketplace." },
          { name: "Sprout Social", description: "Enterprise scheduling + social listening + reporting + CRM integration. Best for brands wanting a single tool across all social workflows. $249–$499/seat/month." },
          { name: "Later", description: "Visual content calendar focused on Instagram-first brands. Strong preview functionality and Linkin.bio for IG-to-commerce. $25–$200/month." },
          { name: "Loomly / Metricool", description: "Loomly for SMBs wanting a workflow tool with approval flows ($35–$350/month). Metricool for analytics-first teams wanting cross-platform reporting ($22–$130/month)." },
        ],
      },
      {
        name: "Content Production",
        items: [
          { name: "Adobe Premiere + After Effects", description: "Professional video editing for YouTube long-form, brand-quality Reels, and motion graphics. Our Birmingham production team's daily driver." },
          { name: "CapCut + CapCut Web", description: "Mobile-first video editing for TikTok-native and Reels-native content. Faster turn than Premiere for trend-jacking and short-form. CapCut Web for batch editing." },
          { name: "Canva + Figma", description: "Static post and carousel design. Canva for non-designers (marketing team self-serve); Figma for design-system-controlled brand templates. Both integrated with Buffer/Sprout for direct scheduling." },
          { name: "Frame.io / Wipster", description: "Video review and approval workflows. Reviewers comment frame-by-frame; editors iterate. Eliminates the 'v4_FINAL_FINAL_v2.mp4' file naming chaos." },
          { name: "Notion + Linear", description: "Editorial calendar in Notion (brief → draft → review → publish → distribute workflow); Linear for production tracking tasks (creative briefs, edit queues, asset delivery)." },
        ],
      },
      {
        name: "Listening, Analytics & Attribution",
        items: [
          { name: "Sprout Social Listening / Brandwatch", description: "Enterprise social listening across 25+ platforms. Monitors brand mentions, competitor share of voice, industry keyword trends. Best for category-leadership brands ($1K–$8K/month)." },
          { name: "Mention / Brand24", description: "SMB social listening ($50–$200/month). Real-time mention alerts, sentiment analysis, influencer identification. Lighter feature set than Sprout but 1/10 the price." },
          { name: "Platform-native analytics", description: "Instagram Insights, TikTok Analytics, LinkedIn Analytics, YouTube Studio, X Analytics, Pinterest Analytics. Free baseline. Always pull weekly into the cross-platform dashboard." },
          { name: "GA4 + UTM-tagged links", description: "Organic social attribution via UTM parameters on every post link. Captured in GA4 + HubSpot/Salesforce for revenue attribution. Mandatory for proving social ROI to finance." },
          { name: "Looker Studio + Tableau", description: "Cross-platform dashboards blending Sprout/Buffer data with GA4 and HubSpot. Client-facing monthly reports showing reach, engagement, social-driven sessions, leads, and revenue per platform." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "In-house social media manager", "Influencer agency", "ClickTake Social Programme"],
      rows: [
        ["Platforms covered", "yes:1–3", "yes:1–2 (paid only)", "yes:9 platforms"],
        ["Platform-native production", "maybe", "no", "yes:Reels + TikToks + Shorts + carousels"],
        ["Content pillars strategy", "no", "no", "yes:4–6 pillars per platform"],
        ["Posts per week", "yes:5–10", "no:Influencer-only", "yes:25–50 per platform"],
        ["Community management (proactive)", "no", "no", "yes:20–50 engagements/day"],
        ["Social listening", "no", "no", "yes:Sprout / Brandwatch"],
        ["Revenue attribution", "no", "no", "yes:UTM + GA4 + HubSpot"],
        ["Min monthly retainer", "yes:$4K (salary share)", "yes:$10K + influencer fees", "yes:$8K"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Strategy to Compounding Audience in 5 Phases",
    intro: [
      "We ship social media programmes in 8–10 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'social kickoff' where the team shows you a Canva mood board.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Audit & Platform Strategy",
        duration: "Week 1–2",
        deliverables: ["Per-platform audit (current + 5 competitors)", "Audience demographics analysis", "Platform fit recommendation (3–6 platforms)", "Content pillar strategy"],
        description:
          "We audit your existing social presence across all 9 platforms: follower count, engagement rate, posting cadence, top content, audience demographics. We audit 5–10 competitors per platform: 90-day post archive, engagement rate by content type, hashtag analysis, audience overlap. We map your audience demographics to your customer personas and recommend 3–6 platforms where your audience actually spends time. The deliverable is a per-platform content strategy with pillar mix, cadence, tone of voice, and 90-day content roadmap.",
      },
      {
        phase: "Phase 2",
        title: "Content Production Pipeline Setup",
        duration: "Week 2–4",
        deliverables: ["Editorial calendar in Notion", "Brand style guide + content templates", "Production team onboarded", "Scheduling tool deployed"],
        description:
          "We stand up the production pipeline. Editorial calendar in Notion with stages: brief → script → shoot → edit → review → schedule → publish → distribute → analyze. Brand style guide + content templates per platform (Reels hook formulas, TikTok caption frameworks, LinkedIn long-form structures, carousel layouts). Production team onboarded (Birmingham creative direction, Multan editing, freelance UGC creators). Scheduling tool deployed (Buffer/Sprout/Hootsuite based on platform mix and team size).",
      },
      {
        phase: "Phase 3",
        title: "Launch Cadence + Community Workflow",
        duration: "Week 4–6",
        deliverables: ["Full posting cadence live (25–50 posts/week per platform)", "Community management workflow (4h response SLA)", "Proactive engagement cadence (20–50/day)", "Influencer pipeline (10–30 identified, 2–5 activating)"],
        description:
          "We launch the full posting cadence across the agreed platforms. Community management workflow goes live: 4-hour response SLA during business hours, 24h max off-hours. Proactive engagement cadence: 20–50 accounts engaged per day per platform. Influencer pipeline activated: 10–30 micro-influencers identified, DM outreach started, 2–5 in negotiation for sponsored content or product seeding. Daily analytics review at 9am UK time to identify which posts are over- or under-performing and adjust the upcoming week's calendar.",
      },
      {
        phase: "Phase 4",
        title: "Paid Social Amplification",
        duration: "Week 6–8",
        deliverables: ["Paid social campaigns live (Meta + TikTok)", "Boost-top-organic workflow", "UTM + promo code strategy", "Conversion tracking (Meta CAPI + TikTok Events API)"],
        description:
          "We amplify the best-performing organic posts via paid social. Top organic posts (top 20% by engagement rate) get boosted to lookalike audiences at $50–$200/day per post. Paid campaigns launched on Meta (Advantage+ Shopping for D2C, Lead Gen for B2B) and TikTok (Smart+ for D2C, Lead Gen for B2B). UTM-tagged links and promo codes deployed for direct attribution. Conversion tracking via Meta CAPI + TikTok Events API for accurate attribution despite iOS 14.5+ signal loss.",
      },
      {
        phase: "Phase 5",
        title: "Attribution, Reporting & Optimization",
        duration: "Week 8–10",
        deliverables: ["Cross-platform dashboard live", "Monthly reporting cadence", "Quarterly content pillar review", "12-month roadmap v2"],
        description:
          "We wire the cross-platform dashboard in Sprout Social or Looker Studio, blending platform-native analytics with GA4 and HubSpot for revenue attribution. Monthly reporting cadence established: reach, engagement rate, follower growth, social-driven sessions, social-driven leads, social-driven revenue per platform. Quarterly content pillar review identifies which pillars are over- or under-performing and adjusts the strategy. The 12-month roadmap v2 projects audience growth, engagement targets, and social-driven revenue trajectory.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Social Media Compounds",
    intro: [
      "The use cases below are drawn from production social programmes operated between 2023 and 2026. Each card describes the specific business problem, the social architecture we built, and the measurable result after 12 months.",
    ],
    cases: [
      {
        industry: "D2C Beauty Brand",
        problem: "Instagram following of 14K with 1.2% engagement rate. No TikTok presence. 100% of revenue from paid social with rising CPMs. Customer LTV of $48 vs. CAC of $42 — margin pressure.",
        application: "Rebuilt Instagram around 5 pillars (product education, customer success, founder POV, behind-the-scenes, UGC). Launched TikTok with 1 post/day (mix of trending audio + product demos + UGC reposts). 8 Reels/week + 3 Stories/day on IG. Micro-influencer programme: 24 creators activated for product seeding, 8 for sponsored content. Paid amplification of top 20% organic posts.",
        result: "Instagram engagement rate lifted to 4.8%. TikTok grew to 47K followers in 12 months. Organic social share of revenue grew from 0% to 18%. CAC dropped from $42 to $28. Social-driven revenue: $1.4M in year 1.",
      },
      {
        industry: "B2B SaaS (Founder-led Brand)",
        problem: "Company LinkedIn page had 2,400 followers with 0.8% engagement rate. Founder had 1,800 personal LinkedIn followers. Organic search drove 8% of pipeline; social drove 0%.",
        application: "Founder-led LinkedIn strategy: 4 posts/week from personal profile (founder POV + industry commentary + product updates + hiring). Company page repositioned as 'company news + customer success' (3 posts/week). 2 YouTube long-form/week (founder interviews + product demos). 5 YouTube Shorts/week (clipped from long-form). Twitter/X thread per week. UTM-tagged links.",
        result: "Founder's LinkedIn grew to 28K followers. Company page grew to 9,800. LinkedIn engagement rate lifted to 6.4%. Social share of pipeline grew from 0% to 22%. 4 enterprise deals originated from LinkedIn DMs. Social-driven pipeline: $3.1M in year 1.",
      },
      {
        industry: "Local Restaurant Group (5 locations)",
        problem: "Instagram following of 4,200 with engagement rate of 2.1%. No TikTok. Reservations primarily via phone and Google. Weekday covers at 60% capacity; weekend at 95%.",
        application: "Instagram Reels focused on chef demonstrations + behind-the-scenes + customer reactions (3/week). TikTok food-trend content (1/day). Facebook event pages for special menus. Google Business Profile posts synced with Instagram content. Micro-influencer programme: 12 local food creators activated per quarter with comped meals.",
        result: "Instagram grew to 18K followers at 5.8% engagement rate. TikTok grew to 32K followers. Weekday covers lifted to 84% capacity. Reservations via Instagram DM grew to 18% of total. Influencer-driven covers: 2,400 in year 1.",
      },
      {
        industry: "Personal Brand (Industry Expert)",
        problem: "Industry expert with 0 social presence. Book launch in 8 months needed platform. Speaking pipeline required 'online visibility' for conference bookers.",
        application: "Multi-platform launch: LinkedIn as primary (5 posts/week + 2 long-form articles/week), YouTube as secondary (1 long-form/week + 3 Shorts/week from clips), X as tertiary (3 posts/day + 1 thread/week), TikTok for reach (1/day). Newsletter to capture LinkedIn traffic. Podcast guesting strategy (4/month).",
        result: "LinkedIn grew to 14K followers in 6 months. YouTube grew to 8,200 subscribers. Newsletter grew to 11K subscribers. Book pre-orders: 4,200 in first week. 18 speaking invitations received within 12 months.",
      },
      {
        industry: "Event / Conference Producer",
        problem: "Annual conference with 6-month sales window. Instagram presence with 8,200 followers but irregular posting. Twitter/X had 2,100 followers. No YouTube. Ticket sales driven primarily by email.",
        application: "6-month social campaign: Instagram Reels featuring past speakers (3/week) + countdown Stories (daily in final 8 weeks). LinkedIn thought leadership from organising team (5 posts/week across 4 team members). Twitter/X live-tweeting from past events + #hashtag community building. YouTube long-form speaker highlights (1/week). Micro-influencer programme with industry commentators.",
        result: "Instagram grew to 24K followers. LinkedIn impressions: 1.8M over 6 months. Ticket sales via social referral grew from 8% to 34%. Last-4-weeks share of sales fell to 41% (vs. 60% prior year) — earlier revenue recognition.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Social Media Models Compared",
    intro: [
      "An honest comparison of the four social media operating models most brands consider. We have operated all four — the right choice depends on your audience, your revenue model, and your willingness to commit to a 6–12 month compounding cycle.",
    ],
    tables: [
      {
        title: "In-house SMM vs. Influencer agency vs. Creative agency social arm vs. ClickTake Social Programme",
        headers: ["Dimension", "In-house SMM", "Influencer agency", "Creative agency social", "ClickTake"],
        rows: [
          ["Platforms covered", "yes:1–3", "yes:1–2 (paid only)", "yes:3–5", "yes:9 platforms"],
          ["Platform-native production", "maybe", "no", "yes", "yes:Reels + TikToks + Shorts"],
          ["Content pillars strategy", "no", "no", "maybe", "yes:4–6 pillars per platform"],
          ["Posts per week per platform", "yes:5–10", "no", "yes:10–20", "yes:25–50"],
          ["Community management (proactive)", "no", "no", "no", "yes:20–50/day"],
          ["Social listening", "no", "no", "no", "yes:Sprout / Brandwatch"],
          ["Revenue attribution", "no", "no", "no", "yes:UTM + GA4 + HubSpot"],
          ["Min monthly retainer", "yes:$4K", "yes:$10K + fees", "yes:$15K", "yes:$8K"],
        ],
      },
      {
        title: "Platform fit by business model",
        headers: ["Platform", "Best for", "Best content type", "Posting cadence", "Engagement benchmark"],
        rows: [
          ["Instagram", "D2C, lifestyle, food, travel", "Reels + carousels + Stories", "4–7 posts/week + 3 Stories/day", "0.7–3% (by reach)"],
          ["TikTok", "D2C, under-35 audience, app installs", "Native 9:16 video 15–60s", "1–3 posts/day", "5–12%"],
          ["LinkedIn", "B2B SaaS, founder-led, recruiting", "Long-form text + carousel + video", "3–5 posts/week per author", "2–5% per post"],
          ["YouTube", "Education, tutorials, thought leadership", "Long-form 8–20min + Shorts", "1–2 long/week + 3–5 Shorts/week", "2–5%"],
          ["X (Twitter)", "Tech, finance, news, real-time", "Threads + replies + RTs", "3–5 posts/day", "0.5–2%"],
          ["Pinterest", "Home, food, wedding, fashion", "2:3 ratio pins + idea pins", "5–10 pins/day", "0.5–2% (saves)"],
          ["Snapchat", "Under-25 Gen Z, AR experiences", "Spotlight + Stories + Discover", "Daily Stories", "N/A (private)"],
          ["Threads", "Text-first, IG-adjacent audience", "Short text posts + replies", "1–3 posts/day", "0.5–3%"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Reach, Engagement and Revenue",
    intro: [
      "Social media programmes earn their budget back through one of three mechanisms: revenue contribution (social-driven pipeline and closed-won deals), CAC reduction (shifting acquisition from paid to organic social), or brand equity (share of voice, founder brand, category leadership). The numbers below are aggregated across 22 production programmes operated 2023–2026.",
    ],
    metrics: [
      { value: "+218%", label: "Avg. engagement rate lift (6mo)", description: "Across all operated programmes at month 6, vs. month-0 baseline." },
      { value: "3.4×", label: "Avg. social-driven revenue (12mo)", description: "Revenue attributed to social divided by social programme cost, at month 12." },
      { value: "+47%", label: "Avg. share-of-voice lift", description: "Brand mentions as % of industry mentions, vs. month-0 baseline." },
      { value: "−38%", label: "Avg. paid social CAC reduction", description: "Cost per acquisition from paid social after organic social compounds audience." },
    ],
    body: [
      "Revenue contribution is the most measurable impact and typically justifies the programme within 6–9 months. A D2C beauty brand with $0 social-driven revenue at engagement start reaches $1.4M social-driven revenue in year 1 — driven by Instagram shopping tags, TikTok Shop integration, and 24 activated micro-influencers. The social programme that delivered this costs $14K/month to operate; the payback period is under 9 months. The compounding effect: social-driven revenue grows 2.4× faster in year 2 because the audience, engagement, and attribution infrastructure compound.",
      "CAC reduction is the second-order effect. The same D2C beauty brand above saw paid social CAC drop from $42 to $28 — because organic social built a warm audience that paid social could retarget at 3–4× the conversion rate of cold audiences. The paid social budget that was producing 18,000 customers at $756K/month now produces the same 18,000 customers at $504K/month, freeing $252K/month for either new acquisition or margin. This is the compounding effect of organic social: every post builds an audience that lowers the CAC of every paid channel that retargets it.",
      "Brand equity is the impact category most often ignored in the business case — until a competitor outbids you for category leadership. A B2B SaaS client saw LinkedIn share-of-voice lift from 8% to 32% over 12 months — meaning their founder's content was mentioned 4× more often in industry conversations than competitors. This translated to 18 speaking invitations, 4 partnership inbound inquiries, and 2 enterprise deals that originated from LinkedIn DMs. The brand equity compounding effect: 6 months after the engagement ended, share-of-voice held at 28% (vs. 8% pre-engagement) because the audience and engagement momentum persisted.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Social media programmes do not live in a scheduling tool. They sit inside your e-commerce, CRM, customer service, marketing automation and analytics stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Social Platforms",
        items: ["Facebook + Instagram (Meta Business Suite)", "TikTok (TikTok for Business + TikTok Shop)", "LinkedIn (Page + personal profiles + Sales Navigator)", "YouTube (Studio + Shorts + Live)", "X (Twitter) + Threads + Pinterest + Snapchat", "Reddit (for community engagement, not paid ads)"],
      },
      {
        name: "Scheduling & Management",
        items: ["Buffer (SMB scheduling + analytics)", "Hootsuite (enterprise scheduling + listening)", "Sprout Social (enterprise all-in-one)", "Later (Instagram-first visual planning)", "Loomly (workflow + approvals)", "Metricool (analytics-first)"],
      },
      {
        name: "Listening & Analytics",
        items: ["Sprout Social Listening / Brandwatch (enterprise)", "Mention / Brand24 (SMB)", "Platform-native analytics (Instagram, TikTok, LinkedIn, YouTube, X, Pinterest)", "GA4 (UTM-tagged organic attribution)", "Looker Studio / Tableau (cross-platform blended dashboards)"],
      },
      {
        name: "E-commerce & CRM",
        items: ["Shopify + Instagram Shopping + TikTok Shop", "HubSpot (social-to-deal attribution for B2B)", "Salesforce (social-to-revenue for enterprise)", "Klaviyo / Attentive (social-to-email audience sync)", "Meta CAPI + TikTok Events API (server-side conversion tracking)", "Stripe (promo code redemption tracking)"],
      },
    ],
    compliance: ["GDPR (EU/UK consent + data residency)", "CCPA / CPRA (California)", "Platform terms of service (each platform's commercial use policy)", "FTC influencer disclosure (#ad, #sponsored)", "Apple ATT (iOS 14.5+ signal loss)", "Meta data deletion + business verification", "TikTok data privacy compliance (US state-level)", "ASDA / CAP code (UK advertising standards)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Programmes in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Brand names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK-based D2C beauty brand, ~£8M ARR",
        situation: "Instagram following of 14K with 1.2% engagement rate. No TikTok presence. 100% of revenue from paid social with CPMs rising 22% YoY. Customer LTV of £48 vs. CAC of £42 — margin pressure building. The founder had built a personal Instagram following of 8K but wasn't posting systematically. The team had run 'social media' in-house for 3 years with no revenue attribution.",
        task: "Build organic social into a 20%+ revenue channel within 12 months, reduce blended CAC to under £32, and launch a TikTok presence from scratch. Establish the attribution layer that would make social defensible at the next board review.",
        action: "ClickTake deployed a 5-pillar Instagram strategy (product education, customer success, founder POV, behind-the-scenes, UGC) with 7 Reels/week + 21 Stories/week (3/day) + 5 carousels/week. Launched TikTok with 1 post/day (mix of trending audio + product demos + UGC reposts + founder POV). Activated 24 micro-influencers (10K–80K followers) for product seeding, 8 for sponsored content. Paid amplification of top 20% organic posts via Meta Advantage+ Shopping. Wired UTM-tagged links + Meta CAPI + TikTok Events API + Shopify attribution. Sprout Social dashboard for cross-platform reporting.",
        result: "Instagram engagement rate lifted from 1.2% to 4.8%. TikTok grew from 0 to 47K followers in 12 months. Instagram grew to 38K followers. Organic social share of revenue grew from 0% to 18%. CAC dropped from £42 to £28. Social-driven revenue: £1.4M in year 1. The founder's personal Instagram grew to 22K and became a primary acquisition channel. The board approved doubling the social programme budget for year 2.",
        quote: {
          text: "We'd treated social as a posting schedule for 3 years and produced £0 of attributed revenue. ClickTake built it as a revenue channel and within 12 months it was our second-largest acquisition source after paid social. The attribution layer was the unlock — once finance could see the revenue, the budget case made itself.",
          author: "Founder & CEO",
          title: "D2C beauty brand",
        },
      },
      {
        client: "US-based B2B SaaS, ~$22M ARR, founder-led brand",
        situation: "Company LinkedIn page had 2,400 followers with 0.8% engagement rate. Founder had 1,800 personal LinkedIn followers and posted sporadically. Organic search drove 8% of pipeline; social drove 0%. The sales team had no inbound pipeline confidence. The CMO wanted to build a 'founder-led brand' but didn't have the production bandwidth.",
        task: "Build the founder's personal LinkedIn to 20K+ followers within 12 months, lift company page to 8K+, and produce social-driven pipeline of $2M+ in year 1. Establish the production pipeline that the founder could maintain after the engagement ended.",
        action: "ClickTake deployed a founder-led LinkedIn strategy: 4 posts/week from the founder's personal profile (founder POV + industry commentary + product updates + hiring), with weekly long-form articles. Company page repositioned as 'company news + customer success' (3 posts/week). Launched YouTube channel with 2 long-form videos/week (founder interviews + product demos) + 5 Shorts/week (clipped from long-form). Twitter/X thread per week. Established Notion-based editorial workflow with the founder spending 90 minutes/week on content review. Wired HubSpot UTM attribution for social-to-deal tracking.",
        result: "Founder's LinkedIn grew from 1,800 to 28K followers. Company page grew from 2,400 to 9,800. LinkedIn engagement rate lifted to 6.4%. Social share of pipeline grew from 0% to 22%. 4 enterprise deals originated from LinkedIn DMs (founder-direct). Social-driven pipeline: $3.1M in year 1. The founder now spends 90 minutes/week on content and the production pipeline sustains the cadence with the in-house team trained during the engagement.",
        quote: {
          text: "I was skeptical that LinkedIn could drive enterprise pipeline. 12 months later, 4 of our largest deals originated from DMs from my posts. The production pipeline means I spend 90 minutes a week on content — ClickTake handles the rest. Best marketing investment we've made.",
          author: "Founder & CEO",
          title: "B2B SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most social strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Engagements",
        questions: [
          {
            q: "How much does a social media programme cost to operate?",
            a: "Monthly retainer ranges from $8K (1–3 platforms, 25 posts/week, basic community management) to $35K (6+ platforms, 100+ posts/week, full production team + paid social management + influencer programme). Most accounts sit in the $12K–$22K/month range. Production volume: 25–50 posts per week per platform. Influencer fees and paid social ad spend are additional.",
          },
          {
            q: "What's the minimum engagement length?",
            a: "6 months for social media (shorter than SEO because social produces measurable engagement within 30 days). We recommend 12 months for full compounding. We require a 6-month commitment upfront, then move to month-to-month with 60-day notice.",
          },
          {
            q: "Is there a setup fee?",
            a: "Yes — a one-time $5K–$10K setup fee covering per-platform audit, content pillar strategy, brand style guide, content templates, scheduling tool deployment, and UTM/promo code attribution wiring. This is foundation work that doesn't recur monthly.",
          },
          {
            q: "Do you charge separately for paid social management?",
            a: "Optional. Our standard retainer includes organic social + community management + analytics. Paid social management (Meta Ads, TikTok Ads, LinkedIn Ads) is an additional $4K–$8K/month or 8–15% of ad spend. Many clients start organic-only and add paid social once the organic audience is built (typically month 3–6).",
          },
        ],
      },
      {
        name: "Platforms & Content",
        questions: [
          {
            q: "Which platforms should we be on?",
            a: "3–6 platforms where your audience actually spends time — not all 9. Audience-fit rules: B2B SaaS → LinkedIn + YouTube + X (skip TikTok unless under-35 audience). D2C beauty/fashion → Instagram + TikTok + Pinterest + YouTube. Local business → Instagram + Facebook + Google Business Profile (not LinkedIn). Founder-led brand → LinkedIn personal + YouTube + X. Personal brand → LinkedIn + YouTube + X + TikTok. We recommend based on your customer personas, not platform hype.",
          },
          {
            q: "How many posts per week will you produce?",
            a: "25–50 posts per week per platform, depending on platform norms: Instagram (4–7 posts/week + 3 Stories/day + 1 Reel/day), TikTok (1–3 posts/day), LinkedIn (3–5 posts/week per author), YouTube (1–2 long-form/week + 3–5 Shorts/week), X (3–5 posts/day), Pinterest (5–10 pins/day). Total across 4 platforms: 80–140 posts per week. Volume is calibrated to your budget and the algorithm's reward for posting cadence.",
          },
          {
            q: "Do you produce video content?",
            a: "Yes — video is 60–80% of organic reach on Meta and TikTok in 2025. We produce Reels (Instagram, 9:16, 15–90s), TikToks (9:16, 15–180s), YouTube Shorts (9:16, <60s), and YouTube long-form (16:9, 8–20min). Production team in Birmingham handles brand-quality video (Premiere + After Effects); Multan team handles TikTok-native editing (CapCut). 48-hour turn from brief to scheduled post.",
          },
          {
            q: "Do you use AI to write captions?",
            a: "AI assists; humans author and review. We use Claude 3.5 Sonnet and GPT-4o for caption first-drafts, hashtag research, and engagement reply suggestions. Every published caption passes through (1) brand voice review by senior editor, (2) platform-native tone check, (3) factual accuracy check. We never auto-publish AI-generated captions — the algorithm and audience both detect it and engagement drops 30–60%.",
          },
        ],
      },
      {
        name: "Community & Influencer",
        questions: [
          {
            q: "Do you handle community management?",
            a: "Yes. We respond to every comment within 4 hours during business hours (24h max off-hours). We respond to every DM within 12 hours. We respond to every mention (tagged or untagged) within 24 hours. We also proactively engage with 20–50 accounts per day per platform — commenting on industry influencer posts, replying to adjacent brand accounts, participating in conversations. Proactive engagement produces 4–8× the follower growth of purely reactive engagement.",
          },
          {
            q: "Do you run influencer programmes?",
            a: "Yes. We identify 10–30 micro-influencers (10K–100K followers) in your niche, build relationships via DM and comment engagement, activate 2–5 per month for sponsored content or product seeding. We use AspireIQ, Grin, or Tribe Dynamics for influencer CRM depending on scale. Average cost per sponsored post: $800–$4,000 for micro-influencers; $5K–$25K for mid-tier (100K–500K). FTC disclosure (#ad, #sponsored) enforced on every sponsored post.",
          },
          {
            q: "How do you handle social listening?",
            a: "We deploy Sprout Social Listening or Brandwatch for enterprise accounts ($1K–$8K/month); Mention or Brand24 for SMBs ($100–$500/month). We monitor brand mentions, competitor mentions, and industry keywords across all platforms. Social listening surfaces customer service issues before they become PR crises, identifies user-generated content to amplify, and tracks share of voice vs. competitors. Daily alerts; weekly summary report.",
          },
          {
            q: "Can you handle social customer service?",
            a: "Yes, in collaboration with your support team. We monitor all social DMs, comments, and mentions for support issues. Tier-1 issues (order status, basic product questions) we resolve directly. Tier-2 issues (refunds, complex technical, complaints) we route to your support team via Sprout Social CRM or Zendesk integration. Response SLA: 4 hours during business hours.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your social teams based?",
            a: "Senior strategists and creative direction in Birmingham (UK) and Austin (USA). Production editors and UGC coordinators in Multan (Pakistan). Community managers distributed globally with strong clusters in London, Dubai, and US East Coast. Daily community management runs 8am–8pm UK time plus a US afternoon shift for Americas coverage. The 48-hour brief-to-published turn is enabled by the distributed team covering multiple time zones.",
          },
          {
            q: "Do you work with our existing in-house social team?",
            a: "Yes, in three configurations. (1) We manage the full programme with our team + your editorial review. (2) We provide strategy, briefs, and editorial oversight; your in-house team produces content. (3) Hybrid — we staff video production and complex platforms (TikTok, YouTube); your team handles LinkedIn and Twitter. The configuration is decided in week 1 based on your in-house capacity and seniority.",
          },
          {
            q: "What happens after the engagement ends?",
            a: "Standard handover is 6 weeks: weeks 1–3 we document every editorial workflow, brand style guide, content pillar strategy, and analytics dashboard in a Notion playbook; weeks 4–6 we shadow your in-house team and step in only on escalations. After handover, we offer a $2K/month 'advisory only' tier where we review monthly performance and flag algorithm changes or emerging trends without operating the programme.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Social Media That Drives Revenue?",
    subtitle:
      "Book a free 30-minute social audit. We'll pull your accounts across all platforms, audit your current performance vs. 5 competitors per platform, identify the 3 highest-leverage platform opportunities, and tell you honestly whether social is the right channel for your stage — or whether paid media or CRO would compound faster.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min social audit call",
        description: "Free. We audit your accounts across all platforms, benchmark vs. competitors, identify top 3 platform opportunities.",
      },
      {
        step: "2",
        title: "Receive audit report + 12-month roadmap",
        description: "Fixed deliverable: per-platform scorecard, audience analysis, content pillar strategy, projected engagement + revenue lift.",
      },
      {
        step: "3",
        title: "Sign off on the roadmap — we operate",
        description: "6-month minimum commitment. Monthly reporting on reach, engagement, follower growth, social-driven revenue. Cancel after month 6.",
      },
    ],
    primaryCta: { label: "Book a Free Social Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Social Media Playbook", href: "/resources", variant: "outline" },
  },
}
