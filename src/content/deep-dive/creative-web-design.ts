import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/creative/web-design — Web Design
 *
 * UX research, wireframes, high-fidelity UI design, design systems,
 * interactive prototypes and dev handoff — built on Figma, optimised for
 * conversion and WCAG 2.2 AA accessibility.
 */
export const webDesignDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Creative",
    title: "Web Design Services: UX-Led UI Systems Engineered to Convert and Ship Clean",
    subtitle:
      "We design websites and product UIs the engineering team can build pixel-for-pixel — UX research, information architecture, wireframes, high-fidelity UI, design systems, interactive prototypes and Dev-Mode handoff, all on Figma and all WCAG 2.2 AA-compliant.",
    geoDefinition:
      "Web design services produce the user experience and visual interface layer of a website or web application — covering UX research, information architecture, user flows, wireframes, high-fidelity UI mockups, interactive prototypes, design systems and developer handoff. Production-grade web design ships as a Figma file with design tokens, a component library, WCAG 2.2 AA-validated color and type systems, and Dev-Mode specifications (spacing, layout, interaction states) that downstream engineers implement without ambiguity. ClickTake Technologies delivers web design services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with senior designers fluent in Figma, FigJam, Maze, Lottie and Storybook and a process grounded in conversion research, accessibility audits and measurable design-to-dev handoff fidelity.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free UX Audit Call", href: "/contact", variant: "orange" },
      { label: "Download the Design System Sample", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "240+", label: "Web designs shipped" },
      { value: "96%", label: "Avg. handoff fidelity" },
      { value: "AA", label: "WCAG 2.2 target" },
      { value: "−38%", label: "Avg. design-to-dev time" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Creative", href: "/services/creative/web-design" },
      { label: "Web Design" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Web Design Projects Ship Late, Look Wrong, and Convert Poorly",
    intro: [
      "Most web design engagements fail in one of three ways. They ship late because the design team has no gated phase structure — every review meeting reopens decisions that were supposedly closed. They look wrong because handoff to engineering is a Figma file plus a wave — the developer rebuilds spacing, typography and color from scratch and hits 70–80% fidelity. And they convert poorly because no UX research happened — the design is the senior designer's opinion, not the user's behaviour.",
      "The root cause is structural: design treated as artwork rather than as a system that ships to production. Without UX research, information architecture, a tokenised component library and a Dev-Mode handoff, every project is bespoke — and bespoke does not scale, does not convert, and does not survive engineering translation.",
    ],
    painPoints: [
      {
        title: "UX research is skipped or rushed",
        description:
          "Teams skip UX research because 'we know our users' — then ship a design based on internal opinion that loses 30–50% of conversion on the live site. A single round of 8 user interviews + 200-participant unmoderated test surfaces 6–10 usability blockers before a line of code is written.",
      },
      {
        title: "No design system = rebuilt components",
        description:
          "Without a tokenised Figma component library, every screen is built from scratch and every developer rebuilds each component from scratch in code. Design-to-dev time averages 12–16 weeks for a 10-page site; with a system in place it drops to 6–9 weeks.",
      },
      {
        title: "Handoff is a Figma file and a wave",
        description:
          "Engineers receive a Figma file with no tokens, no Dev-Mode spec, no interaction documentation. They eyeball spacing, guess at typography scale, and pick the wrong hex. The shipped site matches the design at 70–80% fidelity on first pass — and never fully closes the gap.",
      },
      {
        title: "Accessibility treated as an afterthought",
        description:
          "WCAG 2.2 AA is treated as a compliance check after launch rather than a design constraint during design. Color pairs are picked for aesthetics, then fail 4.5:1 contrast. Focus states are missing. Keyboard navigation is impossible. Result: ~15% of users excluded, legal exposure under ADA/Equality Act, and a costly remediation pass after launch.",
      },
    ],
    paradigmShift: [
      "Web design is not artwork — it is a production-grade specification. We design with the same discipline engineering applies to code: research first, then information architecture, then wireframes, then high-fidelity UI, then a tokenised component library, then a Dev-Mode handoff with every spec documented. The output is a Figma file an engineer can build pixel-for-pixel on first pass, validated for WCAG 2.2 AA, and underpinned by UX research that predicts how users will actually behave on the live site.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Production-Grade Web Design Engagement?",
    intro: [
      "A production-grade web design engagement is a layered pipeline: research at the top, information architecture next, then wireframes, high-fidelity UI, a design system and finally a Dev-Mode handoff. Each layer gates the next — and skipping a layer compounds cost downstream. Understanding the layers is the difference between a 6-week ship and a 6-month drift.",
    ],
    subsections: [
      {
        heading: "Layer 1 — UX research: behaviour before opinion",
        body: [
          "UX research grounds every design decision in observed user behaviour rather than stakeholder opinion. We run two tracks in parallel: qualitative (8–12 moderated user interviews, 60 minutes each, recorded and transcribed) and quantitative (200–500 participant unmoderated tests via Maze or UserTesting, heatmap analysis on the existing site via Hotjar or Clarity). The output is a research report that ranks user tasks by difficulty, identifies the top 6–10 usability blockers, and segments the audience by behavioural pattern — not demographic.",
          "Research is the single highest-ROI investment in a web design engagement. A $12K research phase routinely prevents a $120K redesign that misses the actual user need. Teams that skip research ship designs that convert 30–50% worse than the site they replaced — and do not find out until 90 days post-launch when the analytics are unambiguous.",
        ],
        jargon: [
          { term: "Task success rate", def: "The percentage of test users who complete a specific task (e.g. 'find the pricing page', 'add to cart') without assistance. Industry average for unoptimised sites: 60–70%. Well-designed sites hit 85–95%." },
          { term: "Time-on-task", def: "How long a user takes to complete a task. Lower is better for transactional tasks (checkout); higher is better for content tasks (article reading). Tracked as P50 and P95, not average." },
          { term: "Heatmap", def: "Visual overlay showing where users click, scroll and move on a page. Click maps reveal which elements users think are clickable; scroll maps reveal where content is abandoned; rage-click maps reveal UI elements that frustrate users." },
        ],
      },
      {
        heading: "Layer 2 — Information architecture & user flows",
        body: [
          "Information architecture (IA) is the structure of the site: the sitemap, the navigation hierarchy, the URL structure, the categorisation of content, and the cross-linking pattern. A good IA makes 80% of user tasks reachable in 2 clicks; a bad IA buries critical pages 4+ clicks deep and tanks conversion. We validate IA with tree-testing (200+ participants sort tasks into a proposed structure) before any visual design begins.",
          "User flows are the step-by-step paths users take through the site to complete specific tasks (signup, purchase, support request, content discovery). We diagram each flow in FigJam with decision branches, error states and exit points. A typical engagement documents 8–15 flows; each flow is a hypothesis about user behaviour that the high-fidelity design must support and the post-launch analytics must validate.",
        ],
      },
      {
        heading: "Layer 3 — Wireframes & high-fidelity UI",
        body: [
          "Wireframes are low-fidelity layouts that confirm structure and content hierarchy before any visual design is applied. We ship wireframes in Figma for every page (10–40 pages depending on scope) and review them with stakeholders before opening the high-fidelity design phase. This is the cheapest point to make structural changes — a wireframe iteration costs 2 hours; a high-fidelity iteration costs 2 days.",
          "High-fidelity UI applies the visual system (color, typography, imagery, motion) to the wireframes. Every screen ships in 2–3 states (default, hover, active; plus error, loading, empty, success where relevant) and 3 breakpoints (mobile 375px, tablet 768px, desktop 1280px) — 6–9 variants per screen. Designs are validated against WCAG 2.2 AA at the design stage, not after.",
        ],
        jargon: [
          { term: "Breakpoint", def: "A screen width at which the layout reflows. Standard breakpoints: mobile <768px, tablet 768–1023px, desktop 1024–1439px, wide 1440px+. Every design ships at 3–4 breakpoints; mobile-first design starts at the smallest and works up." },
          { term: "Interaction state", def: "The visual variant of a component for a specific user interaction: default, hover, focus, active, disabled, error, loading, empty, success. A button with 0 states is unusable; a button with all 9 states is production-grade." },
          { term: "Empty state", def: "The variant of a screen or component shown when there is no data (e.g. a fresh dashboard, a search with no results). Most teams forget empty states and ship screens that crash or show blank UI when data is missing." },
        ],
      },
      {
        heading: "Layer 4 — Design system & Dev-Mode handoff",
        body: [
          "The design system is the bridge between design and code. We deliver a Figma component library with every component tokenised (color, typography, spacing, radius, shadow), every variant documented (3–9 states per component), and every token exported via Figma Variables to CSS, Tailwind and JSON. On design+build engagements, the same token system flows into the production codebase; on design-only engagements, we ship a Storybook reference implementation alongside the Figma file.",
          "Dev-Mode handoff is the final layer: every Figma frame ships with Dev-Mode specifications (CSS, Tailwind, iOS, Android code snippets), spacing annotations, layout documentation (flex vs grid, breakpoint behaviour), interaction documentation (hover, focus, motion), and accessibility annotations (ARIA labels, focus order, keyboard behaviour). Engineers build from the spec, not from eyeballing — handoff fidelity hits 95–100% on first pass.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Design With",
    intro: [
      "Our web design stack is opinionated and battle-tested across 240+ production engagements. Every tool below is in active production use; we do not switch tools to chase the newest release.",
    ],
    categories: [
      {
        name: "Primary design & prototyping",
        items: [
          { name: "Figma", description: "Primary tool for wireframes, high-fidelity UI, design systems, component libraries, prototyping and Dev-Mode handoff. Multiplayer editing, variables, branching and auto-layout make it the operational center of every engagement." },
          { name: "FigJam", description: "Workshop and whiteboard tool — used for stakeholder workshops, journey mapping, IA diagramming, user-flow diagramming and design-critique sessions." },
          { name: "Maze", description: "Unmoderated user-testing platform — runs prototype tests with 200–500 participants, collects task-success rate, time-on-task, heatmap and click-path data on Figma prototypes." },
          { name: "UserTesting / User Interviews", description: "Moderated user research — 8–12 participant interviews per engagement, recorded with transcription and timestamped highlights. Used for qualitative research and concept validation." },
          { name: "Hotjar / Microsoft Clarity",        description: "Behavioral analytics on the live site — heatmaps, session recordings, rage-click detection, scroll maps, funnel analysis. Used in research phase and post-launch validation." },
        ],
      },
      {
        name: "Design system & tokens",
        items: [
          { name: "Figma Variables + Branching", description: "Token system inside Figma — color, typography, spacing, radius, shadow as named variables that sync to code via Tokens Studio or Style Dictionary." },
          { name: "Storybook", description: "Component reference for engineering — documents every design component with props, variants, accessibility states and usage examples. Used to lock handoff fidelity on design+build engagements." },
          { name: "Tokens Studio / Style Dictionary", description: "Token transformation pipeline — one Figma source exports to CSS, SCSS, Tailwind, iOS, Android, React Native and JSON in a single build." },
          { name: "Zeroheight / Supernova", description: "Living design-system documentation — publishes the Figma library + Storybook + tokens + usage guidelines as a searchable brand-and-product wiki for designers and developers." },
        ],
      },
      {
        name: "Motion, accessibility & handoff",
        items: [
          { name: "Lottie / LottieFiles", description: "Vector animation format — ships as JSON rather than video for web UI motion, micro-interactions and lightweight hero animations at 10–20× smaller file size than MP4." },
          { name: "axe DevTools / Stark", description: "Accessibility testing — validates WCAG 2.2 AA contrast, color-blindness simulation, focus-order, ARIA labelling at the design stage, before code is written." },
          { name: "NVDA / VoiceOver / TalkBack", description: "Screen readers used for accessibility testing — every key flow is tested with a screen reader to validate keyboard navigation, ARIA implementation and content order." },
          { name: "Figma Dev Mode", description: "Generates CSS, Tailwind, iOS and Android code snippets from designs; surfaces spacing, layout and interaction specs. The foundation of high-fidelity handoff." },
          { name: "Builder.io Visual Copilot / Anima", description: "Figma-to-code translation tools — used on select engagements to accelerate the design-to-code translation for high-volume component work, with manual review and accessibility pass." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Freelance designer", "Design contest platform", "Traditional agency", "ClickTake web design"],
      rows: [
        ["UX research included", "no", "no", "partially", "yes:Interviews + unmoderated tests"],
        ["IA & user flows documented", "no", "no", "yes", "yes:FigJam + tree-testing"],
        ["WCAG 2.2 AA validated", "no", "no", "partially", "yes:Every color pair + screen reader test"],
        ["Tokenised design system", "no", "no", "no", "yes:Figma Variables → CSS/Tailwind/JSON"],
        ["Dev-Mode handoff", "no", "no", "partially", "yes:Specs + Storybook + tokens"],
        ["Handoff fidelity (first pass)", "no:~70%", "no:~60%", "no:~80%", "yes:95–100%"],
        ["Interactive prototype", "no", "no", "yes", "yes:Figma prototype + Maze test"],
        ["Multi-breakpoint designs", "no:Desktop only", "no:Desktop only", "yes:2 breakpoints", "yes:3–4 breakpoints + dark mode"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Handoff in 5 Phases",
    intro: [
      "We ship web designs in 6–12 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'concept review' meetings where the team shows three Pinterest mood-boards.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & UX Research",
        duration: "Week 1–2",
        deliverables: ["Stakeholder interviews (4–8)", "Moderated user research (8–12 interviews)", "Quantitative test (200–500 participants)", "Research report + usability blockers ranked"],
        description:
          "We interview stakeholders to align on business goals and constraints, then run moderated user research (8–12 interviews, 60 minutes each) and unmoderated quantitative testing (200–500 participants via Maze or UserTesting on the existing site or prototype). The output is a research report ranking the top 6–10 usability blockers, segmenting the audience by behavioural pattern, and defining the success metrics for the design phase. Research signs off before any design begins.",
      },
      {
        phase: "Phase 2",
        title: "Information Architecture & User Flows",
        duration: "Week 2–4",
        deliverables: ["Sitemap (validated via tree-test)", "Navigation hierarchy", "User flow diagrams (8–15 flows)", "Content inventory + content model"],
        description:
          "We design the site structure: sitemap, navigation hierarchy, URL structure, content categorisation. We validate the IA with tree-testing (200+ participants sort tasks into the proposed structure) before any visual design begins. We diagram 8–15 user flows in FigJam — each flow is a hypothesis about user behaviour that the high-fidelity design must support and post-launch analytics must validate. Content inventory and content model are documented so the CMS implementation has unambiguous structure.",
      },
      {
        phase: "Phase 3",
        title: "Wireframes & Content Layout",
        duration: "Week 4–6",
        deliverables: ["Wireframes for every page (10–40 pages)", "Component wireframe library", "Stakeholder review + sign-off", "Updated IA based on review"],
        description:
          "We design low-fidelity wireframes for every page in Figma — confirming structure, content hierarchy and component placement before any visual design is applied. This is the cheapest point to make structural changes: a wireframe iteration costs 2 hours, a high-fidelity iteration costs 2 days. Wireframes are reviewed with stakeholders and signed off before the high-fidelity phase opens. The wireframe library also seeds the production component library.",
      },
      {
        phase: "Phase 4",
        title: "High-Fidelity UI & Design System",
        duration: "Week 6–9",
        deliverables: ["High-fidelity UI for every page (3–4 breakpoints)", "Component library (Figma)", "Design tokens (Figma Variables)", "Interactive prototype (Figma)", "WCAG 2.2 AA accessibility audit"],
        description:
          "We apply the visual system to the wireframes: color tokens (validated for WCAG 2.2 AA contrast), typography scale (display through caption, light through bold), imagery direction, motion design (Lottie where applicable). Every screen ships in 3–4 breakpoints (mobile 375px, tablet 768px, desktop 1280px, wide 1440px+) and 6–9 interaction states (default, hover, focus, active, disabled, error, loading, empty, success). We build the Figma component library in parallel and validate accessibility with axe DevTools and NVDA screen-reader testing.",
      },
      {
        phase: "Phase 5",
        title: "Prototype, Validation & Dev Handoff",
        duration: "Week 9–12",
        deliverables: ["Interactive prototype (Figma)", "Maze validation test (200+ participants)", "Design system documentation (Storybook/Zeroheight)", "Dev-Mode handoff package", "Engineering onboarding workshop"],
        description:
          "We assemble the high-fidelity screens into an interactive Figma prototype and validate with a 200+ participant Maze test — measuring task-success rate, time-on-task and click-path against the research-defined success metrics. We document the design system in Storybook or Zeroheight (every component, every variant, every token, every usage guideline). We deliver the Dev-Mode handoff package (specs, tokens, Storybook reference, accessibility annotations) and run a 2-hour engineering onboarding workshop. Engineering builds from spec; we remain available for design QA through build.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Web Design Compounds Value",
    intro: [
      "The use cases below are drawn from production engagements shipped between 2022 and 2026. Each card describes the specific business problem, the design engagement we ran, and the measurable result — not aspirational design awards.",
    ],
    cases: [
      {
        industry: "SaaS dashboard redesign",
        problem: "B2B SaaS product with a 4-year-old dashboard. Power features buried 3+ clicks deep. New-user activation rate sat at 38% (industry benchmark 55%). Support tickets about 'where do I find X?' consumed 22% of tier-1 volume.",
        application: "A research-led redesign: 12 moderated user interviews + 400-participant unmoderated test on the existing dashboard, then IA redesign with tree-testing, then a high-fidelity UI with a redesigned navigation (primary nav + contextual secondary nav), a tokenised design system in Figma, and a Storybook handoff to the in-house engineering team.",
        result: "New-user activation rose from 38% to 61% in 90 days. 'Where do I find X?' support tickets fell 64%. Time-to-first-value dropped from 14 days to 4 days. The design system now powers 3 product surfaces with 92% component reuse.",
      },
      {
        industry: "Marketing site for a Series A startup",
        problem: "Pre-Series-A startup needs a marketing site that converts investors and early customers, ships in 8 weeks, and looks nothing like the 50 other AI-startup sites launching the same quarter.",
        application: "A complete marketing site design: 1-page research sprint (8 user interviews with target buyers), IA for a 7-page site, high-fidelity UI in Figma with a custom design system, interactive prototype validated via 200-participant Maze test, Dev-Mode handoff to the in-house engineer. Lottie motion on the hero and 4 feature sections.",
        result: "Site shipped in 7 weeks. Demo-request conversion hit 6.2% (industry avg 2.4%). Bounce rate fell from 68% to 41%. Three investors referenced the site as a positive signal in the round; the company closed $14M Series A.",
      },
      {
        industry: "Mobile app UI for a fintech",
        problem: "Fintech app with 60K MAU has a UI that was originally built by an outsourced team. Onboarding completion sat at 41% (industry benchmark 65%). App-store reviews cited 'confusing' and 'hard to use'.",
        application: "A 10-week mobile app redesign: research phase (12 moderated interviews + 500-participant unmoderated test), IA and flow redesign for the 6-step onboarding, high-fidelity UI for iOS and Android (HIG and Material 3 patterns), tokenised design system in Figma synced to Swift and Kotlin via Tokens Studio, Lottie micro-interactions on key actions.",
        result: "Onboarding completion rose from 41% to 72% in 60 days. App-store rating rose from 3.4 to 4.6. Weekly active users grew 28% in the 90 days post-launch. The design system now powers 4 product surfaces and reduced design-to-dev time by 47%.",
      },
      {
        industry: "E-commerce storefront design",
        problem: "D2C e-commerce site with 1.8% conversion rate (industry benchmark 2.4%). Mobile conversion was 1.1% — half of desktop. Checkout abandonment sat at 78%.",
        application: "A mobile-first redesign grounded in research: heatmap analysis of the existing site (Hotjar), 8 user interviews with abandoned-cart users, IA redesign for the product catalog, high-fidelity UI for 18 page types in 3 breakpoints, redesigned checkout flow with 3 steps (vs 5), WCAG 2.2 AA validation, Dev-Mode handoff to the in-house Shopify Plus engineering team.",
        result: "Mobile conversion rose from 1.1% to 2.4% in 60 days. Overall conversion hit 2.7%. Checkout abandonment fell from 78% to 61%. Revenue per session rose 47%. The redesign paid for itself in 4 months.",
      },
      {
        industry: "Internal tools & design system",
        problem: "Logistics company with 8 internal tools built by 5 different teams over 6 years. No shared component library. Each tool looked different, required re-training, and shipped UI bugs at 3× the rate of the customer-facing product.",
        application: "A design-system engagement: audit of all 8 tools, extraction of the de-facto patterns, design of a unified tokenised component library in Figma (60 components, 3–9 variants each), Storybook reference implementation, design-system documentation in Zeroheight, and a phased migration plan for the 5 teams.",
        result: "Component reuse across the 8 tools rose from 0% to 78% within 12 months. New-tool design time dropped 62%. UI bug rate fell 54%. The design system is now maintained by 1 in-house designer + 1 in-house engineer; ClickTake retained for quarterly system evolution.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Production-Grade Web Design vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your stage, your in-house engineering capacity, and the conversion criticality of the site.",
    ],
    tables: [
      {
        title: "ClickTake web design vs. Freelance designer vs. Design contest vs. Traditional agency",
        headers: ["Dimension", "Freelance designer", "Design contest", "Traditional agency", "ClickTake web design"],
        rows: [
          ["Time to ship", "yes:4–8 weeks", "yes:2–4 weeks", "no:12–24 weeks", "yes:6–12 weeks"],
          ["UX research included", "no", "no", "partially", "yes:Interviews + unmoderated tests"],
          ["Design system + tokens", "no", "no", "no", "yes:Figma → CSS/Tailwind/JSON"],
          ["WCAG 2.2 AA validated", "no", "no", "partially", "yes:Every screen + screen reader test"],
          ["Handoff fidelity", "no:~70%", "no:~60%", "no:~80%", "yes:95–100%"],
          ["Multi-breakpoint", "no:Desktop only", "no:Desktop only", "yes:2 breakpoints", "yes:3–4 + dark mode"],
          ["Cost (mid-market)", "yes:$8–25K", "yes:$2–8K", "no:$60–200K", "yes:$25–80K"],
          ["Best for", "Simple sites, low budget", "Logos and one-off assets", "Big-budget enterprise", "Production sites that must convert"],
        ],
      },
      {
        title: "Marketing site vs. SaaS dashboard vs. mobile app vs. design system — what each engagement solves",
        headers: ["Need", "Marketing site", "SaaS dashboard", "Mobile app", "Design system"],
        rows: [
          ["Investor / customer conversion", "yes", "no", "partially", "no"],
          ["In-product activation lift", "no", "yes", "yes", "partially"],
          ["Cross-product consistency", "no", "no", "no", "yes"],
          ["Engineering velocity", "partially", "partially", "partially", "yes"],
          ["WCAG 2.2 AA compliance", "yes", "yes", "yes", "yes"],
          ["Token-to-code handoff", "yes", "yes", "yes", "yes"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROI, Cost Savings & Revenue Lift",
    intro: [
      "Web design engagements earn their budget back through one of three mechanisms: conversion lift (better UX drives more signups/purchases), engineering cost reduction (a design system cuts design-to-dev time), or risk reduction (accessibility compliance avoids legal exposure and excludes fewer users). The numbers below are aggregated across 240+ engagements shipped 2022–2026.",
    ],
    metrics: [
      { value: "+38%", label: "Avg. conversion lift", description: "Average uplift in primary conversion (signup, purchase, demo-request) on redesigned sites, measured 60–90 days post-launch." },
      { value: "−47%", label: "Design-to-dev time reduction", description: "Average reduction in engineering hours to build a feature, post design-system delivery, versus pre-system baseline." },
      { value: "96%", label: "Avg. handoff fidelity", description: "Percentage of design intent preserved in shipped code on first engineering pass, measured via design QA review." },
      { value: "AA", label: "WCAG 2.2 compliance", description: "Every shipped design validated for color contrast, keyboard navigation, screen-reader compatibility, focus management." },
    ],
    body: [
      "Conversion lift is the most measurable impact and typically funds the engagement within 3–6 months. A SaaS site redesign that lifts demo-request conversion from 2.4% to 4.1% on 50K monthly visitors adds 850 demo requests per month — at a 22% demo-to-customer rate and $24K ACV, that is $4.5M/year in incremental pipeline against an engagement cost of $45–80K. Payback is 1–3 months. E-commerce engagements see similar mechanics: a 0.6 percentage-point conversion lift on $5M annual revenue returns $1.25M/year against a $40–60K engagement.",
      "Engineering cost reduction is the second mechanism. A tokenised design system with a Storybook reference cuts design-to-dev time by 40–55% across the engineering team — measured by story points delivered per sprint before and after system adoption. For a 10-engineer team averaging $180K loaded cost per engineer, a 47% velocity lift on UI work frees ~3 engineer-equivalents for product work, worth $540K/year. The design system pays for itself in 6–10 weeks.",
      "Risk reduction is the impact category most often ignored — until the first avoided incident. WCAG 2.2 AA compliance avoids ADA / Equality Act lawsuits (settlements average $20–80K per case in the US, plus legal fees). Accessibility compliance also opens the site to the ~15% of users with disabilities — a measurable revenue lift on high-traffic e-commerce and SaaS sites. Brand damage from a public accessibility lawsuit is harder to quantify but consistently larger than the settlement cost; most enterprise clients now require accessibility compliance as a procurement gate.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "A web design that lives only in Figma is half a design. The list below covers the integrations we ship most often — where the design system flows into the tools your engineering, product and marketing teams already use.",
    ],
    categories: [
      {
        name: "Design source & libraries",
        items: ["Figma (primary library + Dev Mode)", "Figma Variables + Branching", "FigJam (workshops + flows)", "Sketch (legacy migrations)", "Adobe XD (legacy migrations)", "Penpot (open-source option)"],
      },
      {
        name: "Code & token export",
        items: ["CSS custom properties / SCSS variables", "Tailwind config (v3 + v4)", "Style Dictionary / Tokens Studio", "Storybook component reference", "Figma Variables → JSON sync", "iOS Swift / Android XML / React Native token export"],
      },
      {
        name: "Research & validation",
        items: ["Maze (unmoderated prototype testing)", "UserTesting (moderated research)", "User Interviews (recruiting)", "Hotjar / Microsoft Clarity (live-site analytics)", "FullStory / LogRocket (session replay)", "Optimizely / VWO (post-launch A/B testing)"],
      },
      {
        name: "Engineering handoff & ops",
        items: ["Figma Dev Mode (specs + code snippets)", "Storybook (component reference)", "Zeroheight / Supernova (system docs)", "Linear / Jira (design tickets + specs)", "GitHub / GitLab (design PRs)", "Chromatic / Percy (visual regression testing)"],
      },
    ],
    compliance: ["WCAG 2.2 AA (validated on every screen + NVDA/VoiceOver/TalkBack screen-reader test)", "Section 508 / EN 301 549 accessibility", "ADA / Equality Act 2010 compliance", "Keyboard-only navigation validated", "Reduced-motion preferences respected", "Source-file + token archive on engagement close"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Web Design Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "B2B SaaS company, $14M Series A, 60K MAU",
        situation: "The product's dashboard was 4 years old. Power features were buried 3+ clicks deep. New-user activation sat at 38% (industry benchmark 55%). Support tickets about 'where do I find X?' consumed 22% of tier-1 volume. The company was about to launch a major feature and needed the dashboard redesigned before launch — 10 weeks.",
        task: "Redesign the dashboard UX without disrupting existing users; ship a tokenised design system the in-house engineering team could own; lift activation from 38% to 55%+ within 90 days of launch.",
        action: "ClickTake ran a 2-week research phase (12 moderated interviews + 400-participant Maze test on the existing dashboard), redesigned the IA with tree-testing (200+ participants), designed high-fidelity UI for 14 dashboard screens across 3 breakpoints with a 60-component Figma library tokenised via Figma Variables, validated the interactive prototype with a 200-participant Maze test, and handed off via Dev Mode + Storybook to the in-house engineering team. We ran weekly design-QA reviews through the 5-week build.",
        result: "New-user activation rose from 38% to 61% in 90 days (target: 55%). 'Where do I find X?' support tickets fell 64%. Time-to-first-value dropped from 14 days to 4 days. The design system now powers 3 product surfaces with 92% component reuse. Engineering velocity on UI work rose 41% (story points per sprint). The company retained ClickTake for ongoing design-system evolution.",
        quote: {
          text: "We've worked with three design agencies before ClickTake. This was the first engagement where the engineering team didn't push back on the handoff. The system just worked.",
          author: "VP of Product",
          title: "B2B SaaS company",
        },
      },
      {
        client: "D2C e-commerce brand, $5M ARR, 60% mobile traffic",
        situation: "The brand's Shopify site had a 1.8% conversion rate (industry benchmark 2.4%). Mobile conversion was 1.1% — half of desktop. Checkout abandonment sat at 78%. The site had been 'redesigned' 18 months earlier by a different agency with no UX research; the redesign had actually lowered conversion by 0.3 points.",
        task: "Mobile-first redesign grounded in research; lift overall conversion to 2.4%+ and mobile conversion to 2.0%+ within 60 days of launch; preserve SEO equity during migration.",
        action: "ClickTake ran a research phase combining Hotjar heatmap analysis of the existing site (3 weeks of session data), 8 moderated interviews with abandoned-cart users, and a 500-participant unmoderated test. We redesigned the IA (catalog taxonomy, faceted navigation), designed high-fidelity UI for 18 page types in 3 breakpoints, redesigned the checkout from 5 steps to 3, validated WCAG 2.2 AA on every screen, and handed off via Figma Dev Mode to the in-house Shopify Plus engineering team. SEO preservation was managed via 1:1 URL mapping with redirects.",
        result: "Mobile conversion rose from 1.1% to 2.4% in 60 days (target: 2.0%). Overall conversion hit 2.7% (target: 2.4%). Checkout abandonment fell from 78% to 61%. Revenue per session rose 47%. The redesign paid for itself in 4 months. Organic traffic held steady through the migration (no SEO dip). The brand retained ClickTake for ongoing CRO experimentation.",
        quote: {
          text: "The previous redesign looked prettier and converted worse. This one looks better and converts better. The research phase was the difference — they found 9 things we'd been getting wrong for 3 years.",
          author: "Head of E-commerce",
          title: "D2C brand",
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
            q: "How much does a web design engagement cost?",
            a: "Production-grade web design engagements range from $25K (5-page marketing site, 6-week timeline) to $120K (complex SaaS dashboard or e-commerce site, 12-week timeline, multi-stakeholder research). The dominant cost drivers are: page count, breakpoint count (mobile-only vs. mobile+tablet+desktop+wide), research depth (lite audit vs. full moderated + unmoderated study), and design-system scope (single product vs. multi-product system). We provide a fixed quote after the discovery call.",
          },
          {
            q: "What is the typical timeline from kickoff to handoff?",
            a: "6–12 weeks. Phase-by-phase: Discovery & UX Research (1–2 weeks), IA & User Flows (2 weeks), Wireframes (2 weeks), High-Fidelity UI & Design System (3 weeks), Prototype Validation & Dev Handoff (2–3 weeks). Simple marketing sites ship in 6 weeks; complex SaaS dashboards or multi-page e-commerce sites take the full 12 weeks.",
          },
          {
            q: "Do you offer ongoing design support after handoff?",
            a: "Yes — three models. (1) Retainer: $3K–$10K/month for a fixed allocation of senior design hours, typically used for new feature design, CRO experimentation and design-system maintenance. (2) Sprint: $5K–$15K per 2-week sprint for project work (new product surface, redesign of a specific flow). (3) Self-serve: $0 ongoing — the design system and Storybook let your in-house team produce without us. Most clients start with a retainer and migrate to self-serve within 6–12 months.",
          },
          {
            q: "Can you do design-only (no build) or design+build?",
            a: "Both. About 60% of our engagements are design-only with Dev-Mode handoff to an in-house or third-party engineering team. About 40% are design+build, where ClickTake also implements the design in Next.js, React, Shopify Plus or WordPress. Design+build engagements have higher handoff fidelity (95–100% on first pass) because the same token system flows from Figma to the production codebase.",
          },
        ],
      },
      {
        name: "Process & Deliverables",
        questions: [
          {
            q: "What exactly do I receive at the end of the engagement?",
            a: "The full delivery archive contains: (1) Research report (interviews + unmoderated test analysis + ranked usability blockers); (2) IA documentation (sitemap + tree-test results + user flows); (3) Wireframes for every page in Figma; (4) High-fidelity UI in Figma (3–4 breakpoints, 6–9 interaction states per screen); (5) Figma component library with edit-access transfer; (6) Design tokens exported as CSS, Tailwind, JSON, Figma Variables; (7) Interactive Figma prototype; (8) Maze validation report (200+ participants); (9) WCAG 2.2 AA accessibility audit; (10) Storybook reference implementation (on design+build); (11) Dev-Mode handoff package; (12) Engineering onboarding workshop recording.",
          },
          {
            q: "Who owns the IP after the engagement?",
            a: "You do — fully. All research, wireframes, high-fidelity designs, component libraries, tokens, prototypes and documentation built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. We do ask for permission to reference the engagement in our portfolio (case study + 2–3 image crops) — this is optional and you can decline.",
          },
          {
            q: "How do you handle stakeholder reviews and approvals?",
            a: "Each phase ends with a structured review gate: a Figma review link with role-based comment threads, a 60–90 minute review meeting, and a sign-off document listing the decisions taken. We avoid the 'show three concepts and pick one' pattern for high-fidelity design — instead, we present a single recommended direction grounded in the research, with two alternative directions documented but not built out. This avoids the false economy of building three full designs to pick one.",
          },
          {
            q: "Can you work with our existing brand rather than redesigning from scratch?",
            a: "Yes — about 70% of our engagements apply an existing brand system to a new web design. We take your brand book, extract or formalise the design tokens, and build the web design system on top. If your brand system is incomplete (no tokens, no documented color/typography scale), we run a 1-week brand-system formalisation sprint before the web design phase opens — typically $6–10K.",
          },
        ],
      },
      {
        name: "Technical Specs & Accessibility",
        questions: [
          {
            q: "How do you ensure accessibility (WCAG 2.2 AA)?",
            a: "Accessibility is a design constraint, not a post-launch check. Every color pair in the system is tested for contrast at the design stage (4.5:1 for normal text, 3:1 for large text, 3:1 for UI components against adjacent colors). Every interactive component ships with visible focus indicators. Every screen is keyboard-navigable in the prototype. Every key flow is tested with NVDA (Windows), VoiceOver (macOS/iOS) and TalkBack (Android) screen readers. The Dev-Mode handoff documents ARIA labels, focus order and keyboard behaviour so engineering implements accessibility by spec, not by guess.",
          },
          {
            q: "Do your design tokens sync to our codebase?",
            a: "Yes. We export tokens via Style Dictionary or Tokens Studio into the formats your stack uses: CSS custom properties, SCSS variables, Tailwind config (v3 or v4), iOS Swift, Android XML, React Native and Figma Variables. On design+build engagements, the same token system flows from Figma to your production code, so handoff fidelity is 95–100%. On design-only engagements, we deliver the token JSON and a Storybook reference implementation for your engineering team to consume.",
          },
          {
            q: "Which frameworks and platforms do you design for?",
            a: "All of them. Web: Next.js, React, Vue, SvelteKit, Astro, Webflow, Framer, WordPress, Shopify. Mobile: iOS (HIG), Android (Material 3), React Native, Flutter. Desktop: macOS, Windows (Fluent), Electron. We are platform-agnostic; the design system is the same, the implementation patterns adapt to the platform's native conventions.",
          },
          {
            q: "How do you preserve SEO during a redesign?",
            a: "Three disciplines: (1) 1:1 URL mapping with 301 redirects for any changed URLs; (2) schema markup retention and validation against the existing schema; (3) internal-link graph preservation — every internal link in the existing site is mapped to its equivalent in the new design. We work with the engineering team (yours or ours) to ensure the migration plan covers technical SEO, run a pre-launch crawl, and monitor for 30 days post-launch via Google Search Console. On redesign engagements where we don't own the build, we deliver a SEO-preservation spec the engineering team implements.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your designers based?",
            a: "Senior designers and design directors in Birmingham (UK) and Austin (USA); production designers and motion specialists in Multan (Pakistan); client-facing design leads in Dubai (UAE) for Middle East engagements. Most engagements are staffed across UK + Pakistan to give you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround on production work.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All research, designs, component libraries, tokens and documentation built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work.",
          },
          {
            q: "Can you work alongside our in-house design or engineering team?",
            a: "Yes — about 50% of our engagements involve an in-house designer or engineering team. We typically lead the research, IA and design-system phases, then transition to a supporting role (design QA, system evolution, CRO experimentation) as the in-house team takes over operational production. We treat the in-house team as the long-term owner of the system and onboard them accordingly.",
          },
          {
            q: "What happens if we need a redesign in 12–18 months?",
            a: "Most clients do not — the design system is built to evolve, not be replaced. But if a strategic shift requires a redesign, the existing tokenised system makes the redesign 40–60% cheaper and 50% faster than starting from scratch, because the structural decisions (color roles, typography scale, layout grid, component patterns) can be preserved while the surface expression changes. We have re-engaged on 18 client systems over 4 years; the average redesign re-engagement is $25–45K and 6–8 weeks.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Design a Site That Converts and Ships Clean?",
    subtitle:
      "Book a free 30-minute UX audit call. We will review your current site on desktop and mobile, identify the top 3 usability blockers, and tell you honestly whether a full engagement is the right call — or whether a focused CRO sprint would solve your problem for less.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min UX audit call",
        description: "Free. No deck. We review your site on desktop + mobile and tell you the top 3 usability blockers.",
      },
      {
        step: "2",
        title: "Receive a fixed scope and quote",
        description: "Within 3 business days — research, IA, UI, design system, handoff, timeline and fixed price. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff and ship in 6–12 weeks",
        description: "Five-phase methodology. Research, wireframes, high-fidelity UI, design system and Dev-Mode handoff delivered.",
      },
    ],
    primaryCta: { label: "Book a Free UX Audit Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Design System Sample", href: "/resources", variant: "outline" },
  },
}
