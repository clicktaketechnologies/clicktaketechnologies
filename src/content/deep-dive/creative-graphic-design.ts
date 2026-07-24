import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/creative/graphic-design — Graphic Design
 *
 * Brand identity systems, marketing collateral, social creative, presentation
 * design and print assets — delivered as a living design system the team can
 * extend without re-commissioning the agency.
 */
export const graphicDesignDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Creative",
    title: "Graphic Design Services: Brand Systems & Creative Assets Built to Compound",
    subtitle:
      "We design brand identities, marketing collateral, social graphics, presentation decks and print assets — built in Figma and Adobe Creative Suite, shipped with a brand book, design tokens and reusable component libraries so your team can extend the system without us.",
    geoDefinition:
      "Graphic design services produce the visual layer of a brand — logos, color systems, typography, layout grids, marketing collateral, social assets, presentation decks and print materials — as a coherent system rather than one-off artwork. A production-grade identity ships with a brand book (PDF), editable source files (.fig / .ai / .svg), exported assets (.png / .svg / .pdf / .webp) and design tokens that downstream developers and marketers can reuse. ClickTake Technologies delivers graphic design services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with senior designers fluent in Figma, Adobe Creative Suite, Affinity and Procreate and a production process grounded in design tokens, accessibility (WCAG 2.2 AA contrast) and measurable creative testing.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Brand Audit Call", href: "/contact", variant: "orange" },
      { label: "Download the Brand System Sample Pack", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "190+", label: "Brand systems shipped" },
      { value: "4.2×", label: "Avg. asset reuse rate" },
      { value: "62%", label: "Avg. creative win rate" },
      { value: "AA", label: "WCAG 2.2 contrast target" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Creative", href: "/services/creative/graphic-design" },
      { label: "Graphic Design" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Brand Design Work Stops Compounding After Launch",
    intro: [
      "Most businesses buy graphic design as one-off artwork: a logo project here, a brochure there, a freelancer for the next ad campaign. Twelve months later they have 400 files in a shared drive, three slightly different logos in production, four shades of brand blue across their website, and a marketing team that opens a new commission for every banner. The brand does not compound — it dilutes.",
      "The root cause is structural: design delivered as artwork rather than as a system. Without a brand book, design tokens, a defined layout grid and a source-of-truth component library, every new asset is rebuilt from scratch — and rebuilt slightly differently each time.",
    ],
    painPoints: [
      {
        title: "Brand drift across channels",
        description:
          "Three months after a rebrand, the website uses #1E40AF blue, the social posts use #2563EB and the print brochure uses #2056C9. Without a documented color system and design tokens, drift compounds with every new designer who touches the brand.",
      },
      {
        title: "Every asset starts from a blank canvas",
        description:
          "Marketing teams open a fresh Figma file for each banner, each deck, each brochure — because the previous file is unsearchable, locked to a freelancer who left, or saved as a flattened PNG. Design-to-ship time averages 4–7 days per asset; with a tokenised system it drops to 4–8 hours.",
      },
      {
        title: "Creative testing is guesswork",
        description:
          "Without a structured creative grid (hook × visual × value-prop × CTA), paid-social teams test random variations and declare a winner on 200 impressions. Win rates sit at 20–30% — half of what a disciplined creative-testing programme achieves.",
      },
      {
        title: "Handoff to engineering is lossy",
        description:
          "Designers hand off a Figma file; developers rebuild spacing, typography and color from scratch because no tokens, no CSS variables, no Storybook reference exist. The shipped site matches the design at 70–80% fidelity on first pass.",
      },
    ],
    paradigmShift: [
      "A brand is not a logo — it is a system. We deliver graphic design as a tokenised, documented, extensible system: a brand book that codifies every decision, a Figma component library that lets your team assemble new assets in minutes, design tokens that sync to code, and an export pipeline that ships every asset in every format your channels need. The first project takes 6–8 weeks; every project after that takes hours, not weeks.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Production-Grade Graphic Design System?",
    intro: [
      "A production-grade graphic design system is a layered stack: identity at the top, collateral in the middle, operational assets at the bottom — all governed by a brand book and design tokens that keep every layer consistent. Understanding the layers — and investing in the right one for your stage — is the difference between a brand that compounds and one that needs re-commissioning every 18 months.",
    ],
    subsections: [
      {
        heading: "Layer 1 — Brand identity: the foundational system",
        body: [
          "Brand identity is the top of the stack: logo (primary, secondary, mark, monochrome, responsive variants), color system (primary, secondary, neutral, semantic, light + dark mode), typography (display, heading, body, mono — each with weight, size and line-height scale), voice and tone principles, iconography style, photography direction, and layout grid. We deliver each as a documented decision, not a vibe.",
          "The output is a 40–80 page brand book (PDF) plus a Figma library with all components tokenised. Color values ship in hex, RGB, HSL and OKLCH. Typography ships with font files (WOFF2, OTF), fallback stacks and variable-font axes. Logo files ship in SVG, PDF, PNG (transparent + on light + on dark) and a favicon set (16/32/48/180/512). Every decision references a measurable constraint — contrast ratio, legibility at 12px, print-reproduction safety — not personal taste.",
        ],
        jargon: [
          { term: "Design token", def: "A named design decision (color/brand/blue-500 = #2563EB) stored as a single source of truth and exported to CSS variables, Figma variables, Tailwind config and JSON for engineering. One change propagates across every asset and every screen." },
          { term: "WCAG 2.2 AA contrast", def: "Web Content Accessibility Guidelines requirement that text-on-background contrast ratios hit 4.5:1 (normal text) or 3:1 (large text). Brand colors that miss this bar fail accessibility audits and exclude ~15% of users." },
          { term: "Vector source", def: "An editable file (.fig, .ai, .svg) that preserves paths, layers and type — as opposed to a flattened .png. Without vector source, you cannot resize a logo without quality loss or modify it without rebuilding it." },
        ],
      },
      {
        heading: "Layer 2 — Marketing collateral: the operational layer",
        body: [
          "Marketing collateral translates the identity into shippable assets: brochures (tri-fold, bi-fold, saddle-stitch), pitch decks (10–40 slides), one-pagers, case-study templates, business cards, letterheads, ads (display, print, OOH), social graphics (square 1:1, portrait 4:5, story 9:16, landscape 16:9). Each template ships as a Figma component with editable text and image slots, so the marketing team can produce the next 200 assets without us.",
          "The productivity lift is measurable: teams that move from bespoke-design-every-asset to template-driven production cut design-to-ship time from 4–7 days to 4–8 hours, and cut external design spend by 60–80% in year one. The templates also enforce brand consistency by construction — a marketer cannot accidentally use the wrong blue if the template only contains the right blue.",
        ],
      },
      {
        heading: "Layer 3 — Social and paid creative: the testing layer",
        body: [
          "Social and paid creative is where graphic design meets performance marketing. We design within a structured creative-testing grid: 4 hooks × 4 visuals × 4 value-props × 2 CTAs = 128 combinations, of which we ship the 16–32 highest-priority in the first wave. Each creative is tagged with its grid coordinates so performance data can be attributed back to specific design decisions (e.g. 'problem-led hooks outperform feature-led hooks by 1.4× in this audience').",
          "Win rates — the percentage of creative variants that beat the control — average 62% across our paid-social engagements, versus the 20–30% industry baseline. The discipline is in the grid: you cannot iterate on creative performance if you do not know which dimension you are testing.",
        ],
        jargon: [
          { term: "Creative fatigue", def: "Performance drop-off on a single creative after 7–14 days of paid exposure, typically 15–40% CTR decline. Disciplined creative refresh (2–4 new variants per week per ad set) keeps fatigue below 15%." },
          { term: "Hook rate", def: "Percentage of viewers who watch past the first 3 seconds of a video or scroll past the first frame of an image. The dominant predictor of paid-social performance — beats visual polish, beats brand recall." },
          { term: "Variant grid", def: "A pre-defined matrix of creative dimensions (hook × visual × value-prop × CTA) that every paid-social test maps to. Without a grid, testing is unattributable; with a grid, every winner teaches you something reusable." },
        ],
      },
      {
        heading: "Layer 4 — Design tokens and engineering handoff",
        body: [
          "The final layer is the bridge between design and code. We export every design decision as a token — color/brand/blue-500, font/heading/xl/line-height, spacing/4 — and sync those tokens to Figma Variables, CSS custom properties, Tailwind config, and a JSON file consumable by any front-end framework. The result: developers apply the brand system by reference, not by eyeballing.",
          "On engagements where we own both design and build (the majority), handoff fidelity is 95–100% because the same token system flows from Figma to the React component. On design-only engagements, we deliver a Storybook reference implementation alongside the Figma file so the in-house or third-party engineering team has unambiguous specs.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Design With",
    intro: [
      "Our design stack is opinionated and battle-tested across 190+ brand systems and thousands of creative assets. Every tool below is in active production use; we do not switch tools to chase the newest release.",
    ],
    categories: [
      {
        name: "Primary design tools",
        items: [
          { name: "Figma", description: "Primary tool for identity systems, UI design, marketing collateral, presentation decks and component libraries. Multiplayer editing, variables, branching and Dev Mode handoff make it the operational center of every engagement." },
          { name: "Adobe Illustrator", description: "Vector illustration, logo construction, custom iconography, complex print layouts. Source-of-truth for SVG assets that need pixel-perfect control." },
          { name: "Adobe Photoshop", description: "Photo retouching, composite imagery, ad creative, OOH production. Used for raster work that Illustrator and Figma do not handle." },
          { name: "Adobe InDesign", description: "Multi-page print production — brochures, catalogues, annual reports, magazines. Handles 100+ page documents with master pages, styles and pre-press color separations." },
          { name: "Affinity Designer / Photo / Publisher", description: "Non-subscription Adobe alternatives — used for clients who prefer perpetual licensing or need a parallel production seat without per-seat subscription overhead." },
        ],
      },
      {
        name: "Specialised & motion",
        items: [
          { name: "Procreate (iPad)", description: "Hand-drawn illustration, custom lettering, texture overlays. Output as layered PSD or transparent PNG for compositing in Figma or Photoshop." },
          { name: "Canva Pro", description: "Self-serve marketing production for in-house teams — we set up the brand kit, locked templates and approval workflow so non-designers can produce on-brand assets without agency involvement." },
          { name: "After Effects", description: "Motion graphics for social, ads and presentation intros. Exports as MP4, GIF, Lottie JSON or animated SVG depending on the delivery channel." },
          { name: "Lottie / Rive", description: "Vector animation formats that ship as code (JSON) rather than video — used for web UI motion, app micro-interactions and lightweight ad creative at 10–20× smaller file size than MP4." },
        ],
      },
      {
        name: "Handoff, tokens & ops",
        items: [
          { name: "Figma Dev Mode + Variables", description: "Generates CSS, Tailwind, iOS and Android code snippets from designs. Variables power the token system that syncs to code." },
          { name: "Style Dictionary / Token Studio", description: "Token transformation pipeline — one source JSON exports to CSS, SCSS, Tailwind, iOS Swift, Android XML, RN and Figma Variables in a single build." },
          { name: "Storybook", description: "Component reference for engineering — documents every design component with props, variants and accessibility states. Used on design+build engagements to lock handoff fidelity." },
          { name: "Frontify / Brandfolder / Bynder", description: "Brand management platforms (DAM) for clients who need enterprise-grade asset storage, version control, rights management and brand-portal access for distributed teams." },
          { name: "Frame.io / Filestage", description: "Review-and-approve workflows for design proofs, video cuts and print pre-press — replaces email-attachment review cycles." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Freelance designer", "Traditional agency", "ClickTake design system"],
      rows: [
        ["Brand book included", "no", "yes:Static PDF", "yes:Interactive Figma + PDF"],
        ["Design tokens shipped", "no", "no", "yes:CSS + Tailwind + JSON + Figma"],
        ["Component library", "no", "no", "yes:Figma + Storybook"],
        ["Asset reuse rate", "no:~10%", "no:~25%", "yes:60–80%"],
        ["Design-to-ship time (new asset)", "no:4–7 days", "no:5–10 days", "yes:4–8 hours"],
        ["Creative testing grid", "no", "no", "yes:4×4×4×2 structured grid"],
        ["WCAG 2.2 AA enforced", "no", "partially", "yes:Every color combo tested"],
        ["Self-serve templates for marketing", "no", "no", "yes:Figma + Canva Pro templates"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Handoff in 6 Phases",
    intro: [
      "We ship brand systems and creative programmes in 4–8 weeks using a fixed six-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'concept review' meetings where the team shows three Pinterest mood-boards.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Brand Brief",
        duration: "Week 1",
        deliverables: ["Stakeholder interview notes", "Competitor visual audit", "Brand brief (positioning, audience, tone)", "Success metrics"],
        description:
          "We interview 4–8 stakeholders, audit 6–10 competitors on 12 visual dimensions (logo, color, type, imagery, layout, motion, voice), and codify the brand brief: who you serve, what you stand for, what you are not, and what success looks like. The brief is signed off before any creative work begins — because a brief that moves after design starts is the single largest cause of redesign cycles.",
      },
      {
        phase: "Phase 2",
        title: "Moodboard & Direction",
        duration: "Week 1–2",
        deliverables: ["3 visual directions", "Reference grid", "Stakeholder rating workshop", "Direction chosen"],
        description:
          "We build three distinct visual directions — each grounded in references from adjacent industries, not your competitors — and run a structured rating workshop with stakeholders. We do not ask 'which do you like?' (subjective, unattributable); we ask 'which best expresses the brief on dimensions 1–5?' (attributable, decisive). One direction is chosen; the other two are archived as decision context.",
      },
      {
        phase: "Phase 3",
        title: "Concept Exploration",
        duration: "Week 2–4",
        deliverables: ["Logo concepts (3 routes)", "Color system proposals", "Typography pairings", "Iconography style"],
        description:
          "Within the chosen direction, we explore 3 concept routes for the logo (e.g. wordmark, monogram, abstract mark), 3 color systems (warm, cool, neutral-led), 2–3 typography pairings and the iconography style. Concepts are presented in context — applied to a business card, a social post, a website hero — not as floating artwork. The chosen concept is refined through 2–3 review cycles.",
      },
      {
        phase: "Phase 4",
        title: "Refinement & System Build",
        duration: "Week 4–6",
        deliverables: ["Final logo set (all variants)", "Color tokens", "Typography scale", "Component library (Figma)", "Voice and tone guide"],
        description:
          "We lock the identity and build the full system: every logo variant (primary, secondary, mark, monochrome, responsive), the complete color token set with WCAG-validated contrast pairs, the typography scale (display through caption, light through bold), the iconography library, and the Figma component library. Every decision is documented in the brand book as it is built — not bolted on at the end.",
      },
      {
        phase: "Phase 5",
        title: "Collateral & Templates",
        duration: "Week 5–7",
        deliverables: ["Marketing collateral (brochure, one-pager, deck)", "Social templates (1:1, 4:5, 9:16, 16:9)", "Ad creative first wave (16–32 variants)", "Canva Pro brand kit (optional)"],
        description:
          "The system is applied to the operational asset set: the marketing brochure, the pitch deck (10–40 slides), the case-study template, the social-post templates in every aspect ratio your channels need, and the first wave of paid-ad creative (16–32 variants on the testing grid). For clients who want self-serve marketing production, we set up the Canva Pro brand kit with locked templates and an approval workflow.",
      },
      {
        phase: "Phase 6",
        title: "Brand Book, Handoff & Onboarding",
        duration: "Week 7–8",
        deliverables: ["Brand book (PDF, 40–80 pages)", "Figma library (with edit access)", "Design tokens (CSS / Tailwind / JSON)", "Source files (.fig, .ai, .svg)", "Onboarding workshop (2 hours)"],
        description:
          "We deliver the complete brand book (PDF), transfer Figma library ownership, export design tokens in every format your engineering team needs, package all source files in a structured archive, and run a 2-hour onboarding workshop for your marketing and engineering teams. After handoff, your team can extend the system — or commission us for the next engagement with the system already in place.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Brand Systems Compound Value",
    intro: [
      "The use cases below are drawn from production engagements shipped between 2022 and 2026. Each card describes the specific business problem, the design system we built, and the measurable result — not aspirational design awards.",
    ],
    cases: [
      {
        industry: "New-brand SaaS startup",
        problem: "Pre-launch SaaS company needs an identity, a marketing site, an investor deck and a launch campaign in 8 weeks — with no in-house designer and a $35K budget.",
        application: "A complete identity system (logo, color, typography, voice), a 16-page brand book, a 24-slide investor deck template, 8 social-post templates and 24 launch-ad creative variants on a structured testing grid. Figma library handed off for the in-house marketer to extend.",
        result: "Launched on schedule. Launch campaign hit 3.2% CTR (industry avg 1.1%). Asset reuse rate of 71% in year one — the founder produced 180 social posts from templates without re-commissioning design.",
      },
      {
        industry: "Rebrand for a regional professional-services firm",
        problem: "Accounting firm with 22-year-old brand, 4 offices, 140 staff — ready to rebrand without losing 22 years of brand equity or alienating existing clients.",
        application: "An evolution rebrand (not a revolution): retained the existing mark's silhouette but rebuilt proportions, refined the color system to WCAG 2.2 AA, paired a new typography system, and rebuilt every collateral template. Phased rollout over 90 days with a 40-page brand book distributed to all staff.",
        result: "Client-retention rate held at 98% through the rebrand. New-business close rate rose 18% (post-rebrand proposal template). Brand-recall survey at 6 months: 64% of clients recognised the new identity as the same firm.",
      },
      {
        industry: "Product launch for an e-commerce brand",
        problem: "D2C skincare brand launching a new product line needs launch creative across paid social, email, the website, influencer kits and retail point-of-sale — in 4 weeks.",
        application: "A launch creative system on top of the existing brand: 32 paid-social variants on a 4×4×2 testing grid, 6 email templates, a launch landing page, an influencer-kit design, and 4 point-of-sale assets. All assets tokenised against the existing brand so they slot into the long-term library.",
        result: "Launch campaign hit 4.1× ROAS in week one. Creative testing identified 2 winning variants in 72 hours. Asset reuse rate of 58% — the launch creative fed 6 months of always-on social content.",
      },
      {
        industry: "Campaign creative for a B2B services firm",
        problem: "B2B IT services firm needs quarterly campaign creative across LinkedIn, email, the website and sales decks — but each campaign was starting from a blank canvas and taking 4 weeks per cycle.",
        application: "A campaign-creative template system: 12 LinkedIn ad templates, 6 email templates, 4 landing-page hero variants, 4 sales-deck covers — all parameterised by campaign theme, value-prop and CTA. Quarterly campaign production now assembles from templates rather than re-designing.",
        result: "Campaign production cycle dropped from 4 weeks to 5 days. Creative-testing win rate rose from 24% (pre-template) to 58% (template-driven testing grid). Marketing team produces 80% of campaign creative in-house; ClickTake retained for the 20% that needs senior design.",
      },
      {
        industry: "Pitch deck for a Series B fundraise",
        problem: "Founders raising a $25M Series B have 14 days to produce a deck that survives 4 partner-meeting rounds and 60+ investor reviews — without looking like every other AI-startup deck.",
        application: "A 22-slide pitch deck built on a custom layout system (not a template): data-visualisation system for metrics, narrative arc mapped to investor psychology, dark-mode variant for demo-heavy sections, and 5 reusable case-study slides. Source files in Figma for the founders to edit between meetings.",
        result: "Deck carried through 4 partner meetings without redesign. Founders closed the round in 9 weeks. Three investors asked who designed the deck — one became a client.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Design-System Engagement vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your stage, your in-house design capacity, and the volume of creative your marketing engine needs.",
    ],
    tables: [
      {
        title: "ClickTake design system vs. Freelance designer vs. Traditional agency vs. In-house team",
        headers: ["Dimension", "Freelance designer", "Traditional agency", "In-house team", "ClickTake design system"],
        rows: [
          ["Time to first asset", "yes:1–2 weeks", "no:4–8 weeks", "no:6–12 weeks to hire", "yes:2–4 weeks"],
          ["Brand book included", "no", "yes:Static PDF", "maybe", "yes:Interactive Figma + PDF"],
          ["Design tokens shipped", "no", "no", "maybe", "yes"],
          ["Component library", "no", "no", "maybe", "yes:Figma + Storybook"],
          ["Asset reuse rate", "no:~10%", "no:~25%", "yes:~50%", "yes:60–80%"],
          ["Design-to-ship time (after launch)", "no:4–7 days", "no:5–10 days", "yes:2–4 days", "yes:4–8 hours"],
          ["Annual design spend (mid-market)", "yes:$30–80K", "no:$80–250K", "no:$180–400K (2 FTE)", "yes:$25–60K + $10–30K retainer"],
          ["Best for", "One-off projects", "Big-launch campaigns", "Companies shipping 500+ assets/mo", "Compounding brand systems"],
        ],
      },
      {
        title: "Identity vs. collateral vs. creative — what each layer solves",
        headers: ["Need", "Identity system", "Collateral templates", "Paid creative testing"],
        rows: [
          ["Rebrand or new brand", "yes", "yes:build after identity", "no"],
          ["Marketing can't produce fast enough", "no", "yes", "partially"],
          ["Paid-social creative is underperforming", "no", "no", "yes"],
          ["Engineering handoff is lossy", "yes:tokens", "partially", "no"],
          ["Brand drift across channels", "yes", "yes", "no"],
          ["Investor or enterprise pitch", "yes", "yes:deck template", "no"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROI, Cost Savings & Revenue Lift",
    intro: [
      "Graphic design engagements earn their budget back through one of three mechanisms: production-cost reduction (templating replaces bespoke design), revenue lift (better-performing creative drives more conversions), or brand-equity compounding (a coherent brand increases pricing power and pipeline quality over time). The numbers below are aggregated across 190+ engagements shipped 2022–2026.",
    ],
    metrics: [
      { value: "4.2×", label: "Avg. asset reuse rate", description: "Percentage of new marketing assets produced from templates rather than bespoke design, 12 months after system delivery." },
      { value: "62%", label: "Avg. creative win rate", description: "Percentage of paid-social creative variants that beat the control in disciplined testing-grid programmes." },
      { value: "−72%", label: "Design-to-ship time reduction", description: "Average reduction in time-to-ship for a new marketing asset, post-template-system delivery." },
      { value: "<8mo", label: "Typical payback period", description: "Time to recover the engagement cost from production-cost savings + revenue lift." },
    ],
    body: [
      "Production-cost reduction is the most measurable impact and typically funds the engagement within a year. A marketing team producing 200 assets/month at $400 average external cost per asset spends $96K/year on design; after a templated system ships, 70% of those assets are produced in-house at near-zero marginal cost — saving $80K/year against an engagement cost of $35–55K. Payback is 5–8 months.",
      "Revenue lift is harder to attribute but often larger. Paid-social programmes that move from ad-hoc creative to a structured testing grid see win rates climb from 20–30% to 50–65% within 60 days — and since the winning variants carry the next 60–90 days of ad spend, every percentage point of win-rate lift compounds into ROAS improvement. Across 24 D2C engagements we measured, average paid-social ROAS lifted 1.4× within 90 days of system delivery.",
      "Brand-equity compounding is the slowest-burning and largest impact. Two years after a rebrand, clients report 15–40% higher proposal close rates (buyers perceive a more credible firm), 10–25% pricing power improvement (the brand carries a premium), and a measurable lift in inbound pipeline quality (better-fit prospects self-select). These effects rarely appear in the original ROI spreadsheet; they show up in the year-two review when leadership asks 'why is the funnel so much easier than it used to be?'",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "A design system that lives only in Figma is half a system. The list below covers the integrations we ship most often — where the design system flows into the tools your marketing, product and engineering teams already use.",
    ],
    categories: [
      {
        name: "Design source & libraries",
        items: ["Figma (primary library + Dev Mode)", "Figma Variables + Branching", "Adobe Creative Cloud Libraries", "Canva Pro Brand Kit", "Frontify / Brandfolder / Bynder (DAM)", "Sketch (legacy migrations)"],
      },
      {
        name: "Code & token export",
        items: ["CSS custom properties / SCSS variables", "Tailwind config (v3 + v4)", "Style Dictionary / Token Studio", "Storybook component reference", "Figma Variables → JSON sync", "iOS Swift / Android XML token export"],
      },
      {
        name: "Marketing & creative ops",
        items: ["Canva Pro (locked brand templates)", "Figma + Slack review workflows", "Frame.io / Filestage proofing", "Notion / Confluence brand wiki", "Webflow / Framer (CMS-driven design)", "HubSpot / Marketo email templates"],
      },
      {
        name: "Paid social & ad platforms",
        items: ["Meta Ads (creative upload + dynamic creative)", "TikTok Ads (Spark Ads + native creative)", "LinkedIn Campaign Manager", "Google Ads (Performance Max asset library)", "Pinterest / Reddit / X ad creative", "Triple Whale / Northbeam (creative analytics)"],
      },
    ],
    compliance: ["WCAG 2.2 AA contrast (validated on every color pair)", "Section 508 / EN 301 549 accessibility", "Print pre-press (CMYK + Pantone + bleed + crop marks)", "Brand-rights clearance on stock & licensed imagery", "GDPR-compliant asset storage and version control", "Source-file escrow on engagement close"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Brand Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Regional professional-services firm, 4 offices, 140 staff",
        situation: "The firm's 22-year-old identity had drifted: three slightly different logos across offices, four shades of brand blue, no documented typography system, no templates for the 60+ proposals produced per quarter. Each proposal was designed from scratch by an external freelancer at $800–$1,200 each, taking 4–7 days per cycle. Close rate had stalled at 28%.",
        task: "Rebrand the firm without losing 22 years of equity — produce a complete identity system, a brand book, a proposal template and the supporting collateral, in 8 weeks, for under $50K.",
        action: "ClickTake ran an evolution rebrand: retained the existing mark's silhouette but rebuilt proportions, refined the color system to WCAG 2.2 AA (4 primary colors, 6 neutrals, 4 semantic), paired a serif display with a sans body, and built a 40-page brand book. We delivered a 24-page proposal template in Figma with editable sections and a dark-mode variant. Phased rollout across 4 offices took 90 days; the brand book was distributed to all 140 staff with a 2-hour onboarding workshop.",
        result: "Client-retention rate held at 98% through the rebrand. Proposal-design time dropped from 4–7 days to 4 hours (template-driven). Proposal close rate rose from 28% to 46% within 6 months. External design spend fell from $72K/year to $14K/year (retainer for senior-level work only). Brand-recall survey at 6 months: 64% of clients recognised the new identity as the same firm.",
        quote: {
          text: "We expected a rebrand to feel risky. Instead, our partners stopped arguing about which logo to use and our close rate went up. The template alone paid for the project in 4 months.",
          author: "Managing Partner",
          title: "Regional professional-services firm",
        },
      },
      {
        client: "D2C skincare brand, $4M ARR, launching second product line",
        situation: "The brand's first product line had grown organically — creative was produced ad-hoc by a freelancer, paid-social win rate sat at 24%, and the asset drive held 600+ files with no naming convention. The team had 4 weeks to launch the second line across paid social, email, the website and influencer kits.",
        task: "Build a launch creative system on top of the existing brand, ship 32 paid-social variants on a structured testing grid, and produce the full launch collateral set in 4 weeks — without a rebrand.",
        action: "ClickTake audited the existing 600-asset library, extracted the de-facto brand system, formalised it into tokens, and built a launch creative system: 32 paid-social variants on a 4-hook × 4-visual × 2-CTA grid, 6 email templates, a launch landing page, an influencer-kit design and 4 point-of-sale assets. All assets were tagged against the testing grid and shipped to Meta and TikTok ad managers via structured naming.",
        result: "Launch campaign hit 4.1× ROAS in week one (industry avg 2.2×). Creative testing identified 2 winning variants in 72 hours — both problem-led hooks, validating a strategic insight the brand had not previously tested. Win rate over the first 60 days: 58% (up from 24% pre-engagement). Asset reuse rate of 58% — the launch creative fed 6 months of always-on social content. The brand retained ClickTake for ongoing quarterly creative.",
        quote: {
          text: "We thought we needed a new brand. We needed a system that let us test. The grid taught us more about our customers in 60 days than the previous 18 months.",
          author: "Head of Growth",
          title: "D2C skincare brand",
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
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a brand identity system cost?",
            a: "A complete brand identity system (logo, color, typography, voice, brand book, Figma component library, design tokens) ranges from $18K (startup, single vertical, 4-week timeline) to $65K (established multi-vertical company, rebrand, 8-week timeline, multi-stakeholder workshop). Marketing collateral and template packages add $8K–$25K depending on the number of templates. We provide a fixed quote after the discovery call.",
          },
          {
            q: "What is the typical timeline from kickoff to handoff?",
            a: "4–8 weeks for an identity system. Phase-by-phase: Discovery (1 week), Moodboard & Direction (1–2 weeks), Concept Exploration (2–3 weeks), Refinement & System Build (2 weeks), Collateral & Templates (2 weeks), Brand Book & Handoff (1 week). Simple new-brand engagements ship in 4 weeks; established-firm rebrands with stakeholder review cycles take the full 8 weeks.",
          },
          {
            q: "Do you offer ongoing design support after launch?",
            a: "Yes — three models. (1) Retainer: $2K–$8K/month for a fixed allocation of senior design hours, typically used for campaign creative, deck production and template maintenance. (2) Sprint: $4K–$12K per 2-week sprint for project work (campaign launches, product launches). (3) Self-serve: $0 ongoing — the templates and brand book let your in-house team produce without us. Most clients start with a retainer and migrate to self-serve within 6–12 months.",
          },
          {
            q: "What does a rebrand cost vs. a new-brand identity?",
            a: "Rebrands typically cost 1.2–1.5× a comparable new-brand engagement, because of stakeholder management, equity-preservation analysis, phased rollout planning and the larger volume of existing collateral to be migrated. A rebrand for a 100-person firm averages $35–55K; a new brand for a 5-person startup averages $18–28K.",
          },
        ],
      },
      {
        name: "Deliverables & Process",
        questions: [
          {
            q: "What exactly do I receive at the end of the engagement?",
            a: "The full delivery archive contains: (1) Brand book PDF (40–80 pages, all decisions documented); (2) Figma library with edit-access transfer to your team; (3) Source files — .fig, .ai, .svg, .pdf, .png for every logo variant and asset; (4) Design tokens exported as CSS custom properties, Tailwind config, JSON and Figma Variables; (5) Font files (WOFF2, OTF) with licensing documented; (6) Exported assets in every format your channels need; (7) Storybook reference (on design+build engagements); (8) Onboarding workshop recording.",
          },
          {
            q: "Who owns the IP after the engagement?",
            a: "You do — fully. All custom artwork, source files, brand books, component libraries and design tokens built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. We do ask for permission to reference the engagement in our portfolio (case study + 2–3 image crops) — this is optional and you can decline.",
          },
          {
            q: "Can you work with our existing brand rather than redesigning from scratch?",
            a: "Yes — about 40% of our engagements are system-build-only: we take your existing identity, formalise it into a tokenised system, build the Figma component library, write the brand book, and ship the templates. This is typically a 4-week engagement at $18–28K. It is the right choice when the identity is fine but the system around it is missing.",
          },
          {
            q: "How do you handle stakeholder reviews and approvals?",
            a: "Each phase ends with a structured review gate: a Figma/Filestage review link with role-based comment threads, a 60–90 minute review meeting, and a sign-off document listing the decisions taken. We avoid the 'show three moodboards and ask which you like' pattern — instead, we ask stakeholders to rate directions against the agreed brief on a 1–5 scale across 4–5 dimensions. This converts subjective preference into attributable decisions.",
          },
        ],
      },
      {
        name: "Technical Specs & Handoff",
        questions: [
          {
            q: "Do your design tokens sync to our codebase?",
            a: "Yes. We export tokens via Style Dictionary or Token Studio into the formats your stack uses: CSS custom properties, SCSS variables, Tailwind config (v3 or v4), iOS Swift, Android XML, React Native and Figma Variables. On design+build engagements, the same token system flows from Figma to your production code, so handoff fidelity is 95–100%. On design-only engagements, we deliver the token JSON and a Storybook reference implementation for your engineering team to consume.",
          },
          {
            q: "How do you ensure accessibility (WCAG 2.2 AA)?",
            a: "Every color pair in the system is tested for contrast: text-on-background (4.5:1 for normal text, 3:1 for large text), UI-component contrast (3:1 against adjacent colors), and focus-indicator contrast. We test in light and dark mode, and we validate non-color contrast (e.g. icon-only buttons have shape or text alternatives). The brand book documents which color pairs are approved for which use — so the marketing team cannot accidentally ship an inaccessible combination.",
          },
          {
            q: "Can you deliver print-ready files as well as digital?",
            a: "Yes. Print files ship as CMYK PDF (PDF/X-1a or X-4) with Pantone spot colors where the brand requires, bleed (3mm standard, 5mm for large-format), crop marks, and pre-press separation previews. We work with the client's chosen print vendor to confirm specs before final export. Common deliverables: business cards, brochures, flyers, posters, point-of-sale, packaging, exhibition stands.",
          },
          {
            q: "What file formats do you ship?",
            a: "Vector source: .fig (primary), .ai (Illustrator for legacy print), .svg (web), .pdf (print). Raster: .png (transparent + on light + on dark), .jpg (photographic), .webp (web optimised), .avif (modern web). Motion: .mp4 (H.264), .gif (legacy social), .json (Lottie), .riv (Rive). Fonts: .woff2 (web), .otf / .ttf (desktop), variable-font axes where applicable. Every format is shipped, not just the format we used to create the asset.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your designers based?",
            a: "Senior designers and creative directors in Birmingham (UK) and Austin (USA); production designers and motion specialists in Multan (Pakistan); client-facing design leads in Dubai (UAE) for Middle East engagements. Most engagements are staffed across UK + Pakistan to give you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround on production work.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All custom artwork, source files, brand books, component libraries and design tokens built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work.",
          },
          {
            q: "Can you work alongside our in-house design team?",
            a: "Yes — about 30% of our engagements involve an in-house designer or design team. We typically lead the identity and system-build phases, then transition to a supporting role (template maintenance, senior review, campaign creative) as the in-house team takes over operational production. We treat the in-house team as the long-term owner of the system and onboard them accordingly.",
          },
          {
            q: "What happens if we need a redesign in 18 months?",
            a: "Most clients do not — the system is built to compound, not to be replaced. But if a strategic shift requires a redesign, the existing tokenised system makes the redesign 40–60% cheaper and 50% faster than starting from scratch, because the structural decisions (color roles, typography scale, layout grid) can be preserved while the surface expression changes. We have re-engaged on 12 client systems over 4 years; the average redesign re-engagement is $18–30K and 4–6 weeks.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build a Brand System That Compounds?",
    subtitle:
      "Book a free 30-minute brand audit call. We will review your current identity and collateral, identify the three highest-impact fixes, and tell you honestly whether a full engagement is the right call — or whether a focused template package would solve your problem for less.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min brand audit call",
        description: "Free. No deck. We review your current identity and collateral and tell you the three highest-impact fixes.",
      },
      {
        step: "2",
        title: "Receive a fixed scope and quote",
        description: "Within 3 business days — identity system, collateral package, timeline and fixed price. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff and ship in 4–8 weeks",
        description: "Six-phase methodology. Brand book, Figma library, tokens and templates delivered in a structured archive.",
      },
    ],
    primaryCta: { label: "Book a Free Brand Audit Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Brand System Sample Pack", href: "/resources", variant: "outline" },
  },
}
