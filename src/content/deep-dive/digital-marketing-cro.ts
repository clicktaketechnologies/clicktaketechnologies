import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/digital-marketing/cro — Conversion Rate Optimization
 *
 * Experimentation programmes: research, hypothesis, experiment, analyze,
 * scale. Built on VWO, Optimizely, Convert.com, AB Tasty, PostHog,
 * GrowthBook, Hotjar, Microsoft Clarity, FullStory. ~5,200 words across
 * 12 sections.
 */
export const croDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Digital Marketing",
    title: "Conversion Rate Optimization: Experiment Programmes That Compound Revenue",
    subtitle:
      "We design and operate experimentation programmes with statistical rigor — funnel analysis, hypothesis-led A/B and multivariate tests, server-side experiments and Bayesian decisioning — measured by uplift %, statistical significance and shipping velocity, not by 'we tested something'.",
    geoDefinition:
      "Conversion rate optimization (CRO) is the discipline of improving the percentage of website visitors who take a defined action — purchase, signup, lead form submission — through structured experimentation: quantitative funnel analysis, qualitative user research, hypothesis-led A/B and multivariate tests, and statistical evaluation of results before scaling winners. A modern CRO programme runs 4–12 experiments per month per traffic surface, using server-side experimentation for performance-critical flows and client-side for content and UI variations. ClickTake Technologies operates CRO programmes for SaaS, e-commerce, lead-gen and B2B clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with experimentation teams fluent in VWO, Optimizely, PostHog, GrowthBook and Bayesian statistics.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Funnel Audit", href: "/contact", variant: "orange" },
      { label: "Download the CRO Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "+27%", label: "Avg. conversion lift (12mo)" },
      { value: "8.4", label: "Experiments shipped / mo (median)" },
      { value: "62%", label: "Winner rate (vs. 18% industry avg)" },
      { value: "98%", label: "Tests reaching statistical significance" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing/cro" },
      { label: "Conversion Rate Optimization" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most 'A/B Testing' Programmes Produce Zero Lift",
    intro: [
      "Most CRO programmes fail the same way: a long backlog of test ideas generated from intuition rather than research, A/B tests that end before statistical significance, results that confirm whatever the team hoped to prove, and a quarterly review where 22 tests produced 1 winner that didn't survive re-test. After 12 months of investment, the conversion rate is unchanged and the team has quietly stopped testing.",
      "The structural problem is that 'A/B testing' is not a strategy — it's a tactic. Without a research layer that identifies the actual bottleneck, a hypothesis layer that predicts the expected uplift, and a statistical layer that prevents false-positive winners, A/B testing becomes expensive confirmation bias. Real CRO programmes compound 15–35% conversion lift per year. Fake ones produce slide decks.",
    ],
    painPoints: [
      {
        title: "Tests end too early — false-positive winners that don't survive re-test",
        description:
          "Stopping a test at 90% confidence after 4 days produces a 35% false-positive rate. Industry standard is 95% confidence with a minimum sample of 100 conversions per variant AND a 14-day observation window to account for day-of-week variance. Tests stopped early 'win' in the slide deck and lose in production — typically within 30 days of full rollout.",
      },
      {
        title: "No research layer = random hypothesis backlog",
        description:
          "Most CRO backlogs are brainstormed opinions ranked by ICE (Impact, Confidence, Ease) scores assigned by the team that brainstormed them. The result: 70% of tests test ideas the user didn't care about. Real CRO programmes derive hypotheses from quantitative funnel analysis (where are users dropping?), qualitative session replay (why are they dropping?), and user testing (what confuses them?).",
      },
      {
        title: "Client-side testing breaks performance and SEO",
        description:
          "Tag-based A/B testing (Optimizely Snippet, VWO SmartCode) injects JavaScript that delays First Contentful Paint by 200–800ms and produces a visible 'flicker' on slower connections. Google's CLS penalty and Core Web Vitals hit can wipe out the conversion lift the test was measuring. Server-side experimentation (via feature flags on your backend) eliminates the flicker and the performance penalty.",
      },
      {
        title: "Bayesian vs. frequentist confusion makes results uninterpretable",
        description:
          "Most teams don't know which statistical model their testing tool uses. VWO and Optimizely use Bayesian; Convert.com and AB Tasty default to frequentist. Bayesian reports 'probability to be best' which sounds intuitive but inflates winner rates. Frequentist reports p-values and confidence intervals which are mathematically stricter. Mixing the two in a single programme produces false winners at 18–25% rates.",
      },
    ],
    paradigmShift: [
      "A CRO programme is a learning system that compounds conversion lift over time. We engineer it as such: a research layer that produces 30–60 evidence-backed hypotheses per quarter, a statistical layer that runs tests to 95% significance with 14-day minimum observation, a meta-analysis layer that captures learnings from every test (winners and losers), and a shipping layer that promotes winners via server-side feature flags without re-deploying code. The deliverable is not a test report; it is a measurably higher conversion rate, a knowledge base of what works for your users, and a shipping velocity that compounds 15–35% lift per year.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production-Grade CRO Programme Actually Is",
    intro: [
      "A CRO programme is a stack of cooperating layers — research, hypothesis, experimentation, statistics, and meta-analysis — not a testing tool. Each layer can be excellent on its own and the programme will still underperform if the layers don't interlock. Below is how each layer works in a ClickTake-operated programme.",
    ],
    subsections: [
      {
        heading: "Research: quantitative + qualitative + user testing",
        body: [
          "Research is the input that determines whether your test backlog is signal or noise. We operate three research streams in parallel. (1) Quantitative: GA4 funnel analysis identifies the exact step where users drop (e.g., 68% reach the pricing page, 22% reach checkout, 6% complete purchase). Hotjar and Microsoft Clarity heatmaps show where users click and how far they scroll. (2) Qualitative: session replay on the top drop-off pages — we watch 100+ sessions per page per month to identify confusion patterns (rage clicks, dead clicks, u-turns, form abandonment mid-field). (3) User testing: 5-user moderated tests via UserTesting.com or Lookback on each top drop-off page — 5 users surface 85% of usability issues per Nielsen Norman Group research.",
          "Research findings feed into a structured hypothesis backlog. Each hypothesis follows the format: 'Because we observed [quantitative evidence] and [qualitative evidence], we expect that [change] will cause [outcome] for [user segment]. We'll measure this via [primary metric] and consider it a winner if it produces [uplift] with [significance threshold].' Hypotheses are prioritised via PIE (Potential, Importance, Ease) scoring — a more rigorous variant of ICE that weights traffic impact and implementation effort. Most programmes operate a 30–60 hypothesis backlog with 8–12 active tests at any time.",
        ],
        jargon: [
          { term: "Statistical significance", def: "The probability that an observed uplift is real and not random noise. Industry standard is 95% (p<0.05), meaning 1-in-20 chance the result is a false positive. Higher traffic sites use 99% to reduce false-positive rate at scale." },
          { term: "Sample size", def: "The minimum number of conversions per variant required to detect a given uplift with statistical power. Calculated upfront via power analysis — typically 100–500 conversions per variant for a 5% minimum detectable effect. Stopping before sample size is reached invalidates the test." },
          { term: "Minimum detectable effect (MDE)", def: "The smallest uplift the test is powered to detect. A test with MDE=5% requires ~16,000 conversions per variant; MDE=20% requires ~1,000. Setting MDE too low (e.g., 1%) requires unrealistic traffic; too high (e.g., 30%) misses real but small winners." },
        ],
      },
      {
        heading: "Experimentation: A/B, multivariate, split-URL, server-side",
        body: [
          "Different experiment types answer different questions. A/B tests compare one variant against control — fastest to significance, best for testing distinct concepts (different headlines, different page layouts). Multivariate tests (MVT) compare all combinations of multiple changes — useful for understanding interaction effects (e.g., headline × CTA × image = 8 variants), but require 4–8× the traffic of A/B. Split-URL tests route users to entirely different URLs — used for full-page redesigns where client-side flicker is unacceptable. Server-side experiments run on your backend via feature flags — used for pricing, checkout flow, and personalisation where the variation must not appear client-side at all.",
          "We deploy client-side testing via VWO, Optimizely, Convert.com or AB Tasty for content and UI variations where flicker is acceptable. We deploy server-side testing via GrowthBook, PostHog, or Statsig for performance-critical flows where flicker or Core Web Vitals impact matters. Most production programmes use both — client-side for the marketing site, server-side for the product/checkout. The testing tool must be wired to your analytics (GA4 for funnel; Mixpanel/Amplitude for product) so experiment results are cross-validatable across tools.",
        ],
        jargon: [
          { term: "Flicker effect", def: "The visible flash of the control page before the variant loads when using client-side JavaScript injection. Caused by the testing tool's snippet executing after the page renders. Eliminated by synchronous loader scripts, server-side rendering of variants, or full server-side experimentation." },
          { term: "Feature flag", def: "A server-side configuration toggle that gates which users see which variation. Tools like GrowthBook, LaunchDarkly, Statsig and PostHog manage flags, audience targeting, and rollouts without code redeploys. Enables gradual rollout (1% → 10% → 50% → 100%) and instant kill-switch on incidents." },
          { term: "Bayesian vs. frequentist", def: "Two statistical frameworks for evaluating test results. Bayesian (used by VWO, Optimizely) reports 'probability to be best' — easier to interpret, but inflates winner rates. Frequentist (used by Convert, AB Tasty default) reports p-values and confidence intervals — stricter, requires pre-set sample size. Don't mix frameworks within a programme." },
        ],
      },
      {
        heading: "Statistics: power, significance, and the multiple-comparisons trap",
        body: [
          "Statistical rigor is what separates real CRO from slide-deck CRO. Three rules govern every test we run. (1) Pre-test power analysis: we calculate the required sample size based on baseline conversion rate, MDE, significance threshold (95%), and statistical power (80%) before launching. A test with 4% baseline conversion, 5% MDE, 95% significance, 80% power needs ~62,000 users per variant. (2) Fixed-horizon testing: we don't peek at results mid-test. The test runs to the pre-calculated sample size, full stop. Peeking inflates false-positive rate from 5% to 25%+. (3) Multiple-comparisons correction: when running 8+ tests simultaneously, we apply Bonferroni correction (lower per-test significance threshold) to keep the family-wise error rate at 5%.",
          "Bayesian testing tools (VWO, Optimizely) report 'probability to be best' which is intuitive but easy to misinterpret. A 90% probability-to-be-best is not the same as 90% statistical significance — the Bayesian framework makes different assumptions about prior distributions. We train every client on reading both reports and aligning decisions to the framework the testing tool uses. Mixing Bayesian and frequentist within a single programme (a common mistake when clients switch tools mid-year) inflates winner rates by 18–25% from false positives.",
        ],
      },
      {
        heading: "Meta-analysis: the learning system that compounds",
        body: [
          "The single biggest predictor of CRO programme success is not winner rate — it's learning velocity. A programme that ships 8 tests/month with 20% winner rate (1.6 winners/month) but captures learnings from every test will outperform a programme shipping 20 tests/month with 25% winner rate (5 winners/month) but no learning capture — because the second programme keeps re-testing variations of failed ideas. We maintain a learning database in Notion (or Linear for technical teams) where every test — winner, loser, or inconclusive — produces a documented learning tagged by surface area (pricing, checkout, signup, etc.), user segment, and hypothesis category.",
          "Quarterly meta-analysis reviews the learning database to extract patterns. 'Pricing page tests with social proof above the fold won 4/6 times' is a pattern that informs future hypotheses. 'Signup form tests reducing fields lost 3/4 times' is a pattern that retires a hypothesis category. The meta-analysis also identifies interaction effects — tests that won alone but lost when combined. Over 12 months, the learning database becomes your team's accumulated knowledge of what works for your specific users — far more valuable than any individual test winner.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build CRO Programmes With",
    intro: [
      "Our CRO stack is the same set of tools we operate across 19 active client programmes. Every tool below has been selected because it survived a real experimentation incident — not because it had the best demo at the last CRO conference.",
    ],
    categories: [
      {
        name: "Experimentation Platforms",
        items: [
          { name: "VWO", description: "Bayesian testing platform with strong visual editor for non-technical teams. Best for marketing teams running content and UI tests without engineering involvement." },
          { name: "Optimizely", description: "Enterprise-grade experimentation with both client-side (Web Experimentation) and server-side (Full Stack) products. Best for high-traffic sites needing split-URL and server-side tests." },
          { name: "Convert.com", description: "Frequentist testing with transparent pricing and GDPR-friendly data residency. Best for mid-market accounts priced out of Optimizely and VWO." },
          { name: "PostHog", description: "Open-source product analytics + experimentation + feature flags in one platform. Best for product-led growth SaaS wanting warehouse-native experimentation." },
          { name: "GrowthBook / Statsig", description: "Server-side experimentation + feature-flag platforms. Best for engineering teams running tests inside the application (checkout, pricing, onboarding) without client-side flicker." },
        ],
      },
      {
        name: "Research & Qualitative",
        items: [
          { name: "Hotjar", description: "Heatmaps, session replay, form analytics, on-site surveys. Industry-standard for qualitative research on marketing sites. $0–$99/month tiers cover most use cases." },
          { name: "Microsoft Clarity", description: "Free heatmap + session replay tool with unlimited traffic. Lower-fidelity than Hotjar but the price (free) makes it the default for low-budget programmes." },
          { name: "FullStory", description: "Enterprise session replay with advanced search (rage clicks, u-turns, dead clicks). Best for product surfaces where user journey complexity justifies the cost ($1K–$8K/month)." },
          { name: "UserTesting.com / Lookback", description: "Moderated and unmoderated user testing with recruited participants. 5-user tests per surface area surface 85% of usability issues per Nielsen Norman research." },
          { name: "GA4 + Looker Studio", description: "Free quantitative funnel analysis. Custom funnels in GA4 + Looker Studio dashboards for conversion-rate monitoring across surfaces." },
        ],
      },
      {
        name: "Implementation & Infrastructure",
        items: [
          { name: "GTM Server-Side", description: "Server-side tag management for experiment event tracking without client-side flicker. Routes experiment data to GA4, Mixpanel, Amplitude and the testing tool simultaneously." },
          { name: "LaunchDarkly", description: "Feature-flag platform for gradual rollouts and instant kill-switches on winning tests promoted to production. Integrates with GrowthBook/Statsig for full server-side test management." },
          { name: "Mixpanel / Amplitude", description: "Product analytics for cross-validating experiment results. Tests run in VWO/Optimizely should show the same uplift in Mixpanel/Amplitude — if they don't, the test is invalid." },
          { name: "Linear / Notion", description: "Hypothesis backlog in Linear (engineering-tracked) or Notion (editorial-tracked). Learning database captured per test in the same tool, tagged by surface, segment, hypothesis category." },
          { name: "Statsig / Eppo (causal inference)", description: "Causal-inference experimentation platforms for measuring long-term effects (LTV, retention) where A/B test windows are too short. Used for pricing, monetisation and onboarding tests." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "In-house + free tool", "Testing-tool-only agency", "ClickTake CRO Programme"],
      rows: [
        ["Research layer", "no", "maybe:Heatmaps only", "yes:Quant + qual + user testing"],
        ["Hypothesis framework", "no", "no", "yes:PIE-scored, evidence-backed"],
        ["Statistical rigor", "no:Peek + stop early", "maybe:95% conf.", "yes:Power analysis + 14-day window + Bonferroni"],
        ["Server-side tests", "no", "no", "yes:GrowthBook / PostHog / Statsig"],
        ["Shipping velocity", "yes:1–2/mo", "yes:4–6/mo", "yes:8–12/mo"],
        ["Learning database", "no", "no", "yes:Per-test learnings + quarterly meta-analysis"],
        ["Cross-tool validation", "no", "no", "yes:GA4 + Mixpanel + testing tool triangulation"],
        ["Min monthly traffic required", "yes:50K sessions", "yes:100K sessions", "yes:200K sessions"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Research to Compounding Lift in 5 Phases",
    intro: [
      "We ship CRO programmes in 8–12 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'experimentation kickoff' where the team shows you a Google Sheet of test ideas.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Funnel Audit & Measurement Foundation",
        duration: "Week 1–2",
        deliverables: ["Funnel analysis report", "Top drop-off pages identified", "GA4 + testing tool wiring spec", "Statistical power analysis"],
        description:
          "We audit your full conversion funnel: traffic sources → landing pages → key engagement events → conversion. We identify the top 5 drop-off points (by absolute conversion loss, not by percentage). We spec the testing tool wiring (VWO/Optimizely/Convert for client-side, GrowthBook/PostHog for server-side) and ensure GA4, Mixpanel, and the testing tool all receive experiment events. We run pre-test power analysis on each top drop-off to determine minimum detectable effect at your traffic volume — this prevents launching tests that can never reach significance.",
      },
      {
        phase: "Phase 2",
        title: "Research Sprint & Hypothesis Backlog",
        duration: "Week 2–4",
        deliverables: ["Heatmap + session replay analysis", "User testing (5 users per top drop-off)", "30–60 hypotheses prioritised via PIE", "First 8 test briefs"],
        description:
          "We run a 2-week research sprint on the top 5 drop-off pages: Hotjar/Clarity heatmaps and session replays (100+ sessions per page), 5-user moderated user testing per page, and a competitive review of 5–10 comparable pages. Research findings are translated into 30–60 hypotheses following the 'Because we observed X, we expect Y for segment Z, measured by W, winner if V' format. Hypotheses are PIE-scored (Potential, Importance, Ease) and the top 8 are converted into test briefs with explicit primary metric, MDE, sample size, and significance threshold.",
      },
      {
        phase: "Phase 3",
        title: "Experiment Infrastructure Setup",
        duration: "Week 4–6",
        deliverables: ["Testing tool deployed (client + server-side)", "Feature flags configured", "GA4 + Mixpanel cross-validation wired", "Test brief template + learning database"],
        description:
          "We deploy the testing infrastructure: client-side tool (VWO/Optimizely/Convert) for content and UI variations, server-side tool (GrowthBook/PostHog/Statsig) for performance-critical flows, and feature flags (LaunchDarkly) for safe rollout of winners. We wire GA4 + Mixpanel to receive experiment events for cross-validation — every test result must triangulate across all three tools. We stand up the learning database in Notion/Linear with the test brief template, learning capture template, and quarterly meta-analysis cadence.",
      },
      {
        phase: "Phase 4",
        title: "First Experiment Cycle",
        duration: "Week 6–9",
        deliverables: ["First 8 experiments launched", "Statistical monitoring dashboard", "First 2–3 winners identified", "First 8 learnings documented"],
        description:
          "We launch the first 8 experiments in parallel (max 8 active tests to control multiple-comparisons false-positive rate). Each experiment runs to its pre-calculated sample size with a minimum 14-day observation window. Statistical monitoring dashboard shows daily progress, projected significance date, and per-test conversion delta. Winners (reaching 95% significance) are flagged for promotion; losers are documented as learnings. By end of week 9, the programme has shipped its first winners and accumulated its first 8 documented learnings.",
      },
      {
        phase: "Phase 5",
        title: "Shipping, Scaling & Meta-Analysis",
        duration: "Week 9–12",
        deliverables: ["Winners promoted via feature flags", "Learning database populated", "Quarterly meta-analysis cadence", "12-month experimentation roadmap"],
        description:
          "Winners are promoted to 100% production traffic via feature flags with a 1% → 10% → 50% → 100% gradual rollout over 5–7 days, with an instant kill-switch if the production uplift doesn't match the test uplift. The learning database is reviewed weekly for emerging patterns. We establish the quarterly meta-analysis cadence with the client team in the room — patterns extracted, hypothesis categories retired, next-quarter roadmap prioritised. The 12-month roadmap projects test velocity, expected winner rate, and projected cumulative conversion lift.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where CRO Compounds Revenue",
    intro: [
      "The use cases below are drawn from production CRO programmes operated between 2023 and 2026. Each card describes the specific business problem, the experimentation architecture we built, and the measurable result after 90 days.",
    ],
    cases: [
      {
        industry: "SaaS Signup Flow",
        problem: "Free-trial signup conversion of 2.1% from landing page to activated account. The 6-step signup form had 11 required fields and a 38% drop-off at step 3 (email verification). Activation rate (first action within 24h) was 41%.",
        application: "Rebuilt signup into a single-step progressive disclosure form (3 fields initially, more post-activation). Tested email-vs-SMS verification (SMS won, +18% completion). Tested social signup (Google + GitHub) which lifted overall completion by 34%. Server-side test via GrowthBook. 14 tests shipped over 90 days.",
        result: "Signup conversion lifted from 2.1% to 4.8% (+128%). Activation rate rose to 67%. Cost per activated user dropped from $42 to $18. Winner rate: 43% (6 of 14 tests).",
      },
      {
        industry: "E-commerce Checkout",
        problem: "Checkout completion of 38% on a 4-page flow (cart → shipping → payment → confirm). Mobile completion was 22% vs. desktop 51%. Abandoned cart recovery emails recovered 8% of lost revenue.",
        application: "Tested single-page accordion checkout (won, +14%). Tested guest checkout vs. forced account (guest won, +22%). Tested Apple Pay + Google Pay express buttons (won, +31% on mobile). Tested trust badges on payment page (won, +6%). 18 tests over 90 days, all server-side via PostHog.",
        result: "Checkout completion lifted to 61% (+60%). Mobile completion rose to 47%. Abandoned cart recovery improved to 14% recovery (due to higher-quality email capture). Revenue per session +38%.",
      },
      {
        industry: "Lead Gen Form (B2B Services)",
        problem: "Contact form conversion of 1.4% with 14 required fields. Sales team complained that 70% of leads were unqualified. Cost per qualified lead was $480.",
        application: "Reduced form to 4 required fields (name, email, company, message). Tested progressive disclosure for qualification questions post-submission. Tested calendar booking (Calendly) inline vs. separate thank-you page. Tested value-anchor copy above form ('14-day response SLA'). 11 tests over 90 days.",
        result: "Form conversion lifted to 4.8% (+243%). Qualified-lead share rose from 30% to 58%. Cost per qualified lead dropped to $182. Sales cycle compressed by 8 days due to calendar booking.",
      },
      {
        industry: "Pricing Page Optimization",
        problem: "Pricing page bounce rate of 64% and conversion-to-trial of 8%. Three-tier pricing (Starter/Pro/Enterprise) with the middle tier 'recommended'. Sales-led deals were 80% of revenue, self-serve only 20%.",
        application: "Tested two-tier vs. three-tier (two-tier won, +22% trial conversion). Tested annual-vs-monthly default (annual default won, +14% MTV). Tested feature comparison table compactness (compact won, +9%). Tested social proof placement (above-the-fold won, +18%). 16 tests over 90 days.",
        result: "Pricing page bounce dropped to 41%. Conversion-to-trial lifted to 14.8% (+85%). Self-serve share of revenue grew from 20% to 38%. Sales-led deal quality improved (smaller customers self-served).",
      },
      {
        industry: "Onboarding Flow Optimization",
        problem: "7-day activation rate of 24% on a 9-step onboarding. Day-30 retention of 11%. Users who completed all 9 steps activated at 78%; users who stopped at step 5 activated at 4%.",
        application: "Tested progressive onboarding (steps revealed as user takes actions) vs. upfront wizard (progressive won, +18% completion). Tested reducing to 4 essential steps with 5 deferred (won, +31% activation). Tested in-app tooltips vs. email nudges (in-app won, +12%). 13 tests over 90 days, all server-side via Statsig.",
        result: "7-day activation lifted to 47% (+96%). Day-30 retention rose to 21%. Time-to-first-value dropped from 4.2 days to 1.8 days. Trial-to-paid conversion rose from 18% to 29%.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: CRO Models Compared",
    intro: [
      "An honest comparison of the four CRO operating models most brands consider. We have operated all four — the right choice depends on your traffic volume, in-house analytics depth, and willingness to commit to a 12-month+ experimentation cadence.",
    ],
    tables: [
      {
        title: "In-house + free tool vs. Testing-tool-only agency vs. Full-stack CRO agency vs. ClickTake CRO Programme",
        headers: ["Dimension", "In-house + free", "Tool-only agency", "Full-stack agency", "ClickTake"],
        rows: [
          ["Min monthly traffic", "yes:50K sessions", "yes:100K sessions", "yes:150K sessions", "yes:200K sessions"],
          ["Research layer", "no", "maybe", "yes", "yes:Quant + qual + user testing"],
          ["Statistical rigor", "no", "maybe", "yes", "yes:Power + 14-day + Bonferroni"],
          ["Server-side tests", "no", "no", "maybe", "yes"],
          ["Tests shipped / mo", "yes:1–2", "yes:4–6", "yes:6–10", "yes:8–12"],
          ["Learning database", "no", "no", "maybe", "yes:Per-test + quarterly meta"],
          ["Cross-tool validation", "no", "no", "no", "yes:GA4 + Mixpanel + testing"],
          ["Min monthly retainer", "yes:Tool only", "yes:$5K", "yes:$15K", "yes:$12K"],
        ],
      },
      {
        title: "Experiment type by use case",
        headers: ["Experiment type", "Best for", "Traffic required", "Setup complexity", "Statistical model"],
        rows: [
          ["A/B test (client-side)", "Content + UI variations", "10K+ sessions/variant", "Low", "Bayesian or frequentist"],
          ["A/B test (server-side)", "Pricing, checkout, flows", "10K+ sessions/variant", "Medium", "Bayesian or frequentist"],
          ["Multivariate (MVT)", "Interaction effects", "8× A/B traffic", "Medium", "Frequentist recommended"],
          ["Split-URL test", "Full-page redesigns", "10K+ sessions/variant", "Medium", "Bayesian or frequentist"],
          ["Personalisation", "Segment-targeted variations", "Segment-reachable volume", "High", "Bayesian (continuous)"],
          ["Bandit optimisation", "Continuous headline/creative rotation", "High continuous traffic", "High", "Multi-armed bandit"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Uplift, Velocity and Compounding Lift",
    intro: [
      "CRO programmes earn their budget back through one of three mechanisms: direct conversion lift (more revenue per visitor), CAC reduction (lower cost per acquired customer at the same traffic), or activation lift (more users reaching the 'aha' moment that drives retention). The numbers below are aggregated across 19 production programmes operated 2023–2026.",
    ],
    metrics: [
      { value: "+27%", label: "Avg. conversion lift (12mo)", description: "Cumulative uplift across operated programmes at month 12, vs. month-0 baseline." },
      { value: "8.4", label: "Experiments shipped per month (median)", description: "Per programme at steady-state (months 4+). Industry median is 2.1 per month." },
      { value: "62%", label: "Winner rate", description: "Share of shipped tests producing statistically significant uplift. Industry median is 18%." },
      { value: "+38%", label: "Revenue per session lift", description: "Across e-commerce and SaaS programmes at month 12, controlling for traffic changes." },
    ],
    body: [
      "Direct conversion lift is the most measurable impact and typically funds the engagement within 90 days. A SaaS client with 100K monthly sessions and 2.1% trial conversion (2,100 trials/month) sees conversion lift to 4.8% (4,800 trials/month) — a 2,700-trial increase. At $42 cost per trial (blended paid + organic), that's $113K/month of incremental acquisition value. The CRO programme that delivered this costs $14K/month to operate; the payback period is under 11 days.",
      "CAC reduction is the second-order effect. The same SaaS client above now acquires 2,700 more trials per month at $0 marginal cost — meaning the blended CAC drops from $42 to $18. The paid media budget that was producing 1,800 trials at $76K/month now produces the same 1,800 trials at $32K/month (with conversion lift applied), freeing $44K/month for either new acquisition channels or margin. This is the compounding effect of CRO: every conversion-rate improvement reduces the CAC of every channel that feeds the funnel.",
      "Activation lift is the impact category most often ignored in the business case — until month 6 when retention curves diverge. The same SaaS client above saw activation rate (first action within 24h) rise from 41% to 67%. Activated users retain at 3.1× the rate of non-activated users at day 90. The 26-point activation lift translates to a 41% increase in 90-day retained users — and retained users are what drive LTV. The CRO programme that improves activation is, structurally, an LTV improvement programme with a 6–12 month lag to the income statement.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "CRO programmes do not live in a testing tool UI. They sit inside your analytics, product, CRM, data warehouse and feature-flag stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Experimentation Platforms",
        items: ["VWO (Bayesian, client-side)", "Optimizely Web + Full Stack (Bayesian, both sides)", "Convert.com (Frequentist, client-side)", "AB Tasty (Frequentist + personalisation)", "PostHog (open-source, server-side)", "GrowthBook / Statsig (server-side + feature flags)"],
      },
      {
        name: "Research & Qualitative",
        items: ["Hotjar (heatmaps + replay + surveys)", "Microsoft Clarity (free heatmaps + replay)", "FullStory (enterprise replay + search)", "UserTesting.com / Lookback (moderated user tests)", "GA4 (funnel analysis)", "Mixpanel / Amplitude (product funnel analysis)"],
      },
      {
        name: "Implementation & Feature Flags",
        items: ["GTM Server-Side (event routing)", "LaunchDarkly (feature flags + gradual rollout)", "Split.io / Unleash (open-source feature flags)", "Segment / RudderStack (CDP for experiment events)", "Snowflake / BigQuery (warehouse-native analysis)"],
      },
      {
        name: "CRM & Revenue Attribution",
        items: ["HubSpot (deal attribution for B2B tests)", "Salesforce (revenue uplift measurement)", "Stripe (revenue impact per test)", "ProfitWell / Baremetrics (subscription metrics)", "Looker Studio / Tableau (cross-source dashboards)"],
      },
    ],
    compliance: ["GDPR (EU/UK consent + cookie banner)", "CCPA / CPRA (California)", "PII anonymisation in session replay (Hotjar/Clarity masking)", "PCI DSS scope (no card data in testing tool — server-side only)", "Google Core Web Vitals (CLS / LCP impact of client-side testing)", "Apple ATT (mobile testing via SDK)", "Schema.org structured data preservation across variants"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Programmes in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Brand names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "US-based B2B SaaS, ~$18M ARR, project management tooling",
        situation: "Free-trial signup conversion of 2.1% from landing page to activated account. The 6-step signup form had 11 required fields and a 38% drop-off at step 3 (email verification). Activation rate (first action within 24h) was 41%. CAC was $42 per trial, $187 per activated user. The growth team had run 6 tests in the past year with 1 winner that didn't survive re-test.",
        task: "Lift signup conversion to 4%+ and activation to 60%+ within 90 days, while reducing cost per activated user to under $100. Establish the experimentation infrastructure that would compound lift beyond the engagement.",
        action: "ClickTake deployed GrowthBook for server-side experimentation, Hotjar for session replay, and UserTesting.com for moderated 5-user tests on each top drop-off page. We ran a 2-week research sprint producing 47 PIE-prioritised hypotheses. Over 90 days we shipped 14 tests: progressive disclosure signup (won, +22%), SMS-vs-email verification (SMS won, +18%), social signup via Google + GitHub (won, +34%), in-app onboarding simplification (won, +31%), and 10 others. Every test ran to pre-calculated sample size with 14-day minimum observation. Statistical monitoring dashboard showed daily progress against 95% significance threshold.",
        result: "Signup conversion lifted to 4.8% (+128%). Activation rate rose to 67%. Cost per activated user dropped from $187 to $74. Winner rate: 43% (6 of 14 tests). Revenue per session lifted 38%. The learning database captured 14 documented learnings; 3 hypothesis categories were retired ('reducing required fields below 3' lost consistently, 'adding trust badges' had no effect, 'social signup' won across all surfaces).",
        quote: {
          text: "We'd been 'A/B testing' for 2 years and produced exactly one winner that didn't survive rollout. ClickTake's first 90 days produced 6 winners that all held in production. The difference was the research layer and the statistical rigor — we were testing the wrong things and stopping tests too early.",
          author: "VP of Growth",
          title: "B2B SaaS company",
        },
      },
      {
        client: "UK-based D2C e-commerce brand, ~£12M ARR, specialty retail",
        situation: "Checkout completion of 38% on a 4-page flow. Mobile completion was 22% vs. desktop 51%. Abandoned cart recovery emails recovered 8% of lost revenue. The team had run 22 A/B tests via a free Optimizely tier over 18 months with 3 winners — all of which lifted conversion by <5% and didn't materially move revenue.",
        task: "Lift checkout completion to 55%+ within 90 days, with at least 40% of the lift coming from mobile. Establish server-side testing to enable performance-critical flow tests that client-side testing couldn't reach.",
        action: "ClickTake deployed PostHog for server-side experimentation (replacing the client-side Optimizely tier) and Mixpanel for cross-validation. Research sprint: Hotjar heatmaps + 100 mobile session replays on each checkout page. We shipped 18 tests over 90 days: single-page accordion checkout (won, +14%), guest checkout (won, +22%), Apple Pay + Google Pay express (won, +31% on mobile), trust badges on payment (won, +6%), simplified shipping form (won, +9%). Statistical monitoring via PostHog with 95% significance and 14-day minimum observation.",
        result: "Checkout completion lifted to 61% (+60%). Mobile completion rose to 47% (vs. desktop 65%). Abandoned cart recovery improved to 14% (due to higher-quality email capture from the new flow). Revenue per session +38%. Annualised revenue impact: £2.1M incremental. The learning database captured 18 documented learnings; the most actionable pattern: 'reducing form fields below 4 never won, but reducing required fields always won.'",
        quote: {
          text: "Two years of testing produced 3 small winners. ClickTake's 90 days produced 9 winners including a 31% mobile lift that we'd never have found with client-side testing. The server-side infrastructure is the unlock — we can finally test the actual checkout flow without breaking performance.",
          author: "Head of E-commerce",
          title: "D2C retail brand",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most CRO strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Engagements",
        questions: [
          {
            q: "How much does a CRO programme cost to operate?",
            a: "Monthly retainer ranges from $12K (single surface area, 8 tests/mo) to $35K (multi-surface, 20+ tests/mo, server-side infrastructure + dedicated growth engineer). Most accounts sit in the $14K–$22K/month range. Includes research, hypothesis development, test design, implementation (client + server-side), statistical analysis, and learning database maintenance. Testing tool licenses are additional ($300–$8K/month depending on tool and traffic).",
          },
          {
            q: "What's the minimum monthly traffic required?",
            a: "200K sessions/month for a viable programme. Below that, sample sizes are too small to reach 95% statistical significance on most tests within reasonable timeframes. For sub-200K traffic, we offer a 'research-only' engagement ($6K/month) that produces the hypothesis backlog and measurement infrastructure without active testing — clients then run tests themselves or graduate to full programme as traffic grows.",
          },
          {
            q: "Is there a setup fee?",
            a: "Yes — a one-time $8K–$14K setup fee covering funnel audit, research sprint, testing tool deployment (client + server-side), feature flag configuration, and cross-validation wiring to GA4 + Mixpanel. This is foundation work that doesn't recur monthly. Existing programmes with clean infrastructure can sometimes skip the setup fee if the audit comes back clean.",
          },
          {
            q: "Do you offer performance pricing on conversion lift?",
            a: "Optional. Our standard model is fixed retainer. We also offer a hybrid model with 5–15% performance bonus on conversion lift above an agreed baseline — clients typically prefer this once the measurement infrastructure has been validated for 3+ months. We don't take a percentage of revenue uplift (too noisy a signal) but will structure milestone payments on cumulative winner count.",
          },
        ],
      },
      {
        name: "Experimentation & Statistics",
        questions: [
          {
            q: "Bayesian or frequentist — which should we use?",
            a: "Pick one and stick with it. VWO and Optimizely use Bayesian (reports 'probability to be best'); Convert.com and AB Tasty default to frequentist (reports p-values and confidence intervals). Bayesian is more intuitive but inflates winner rates; frequentist is stricter but requires pre-set sample size. Mixing frameworks within a single programme inflates false positives by 18–25%. We default to frequentist for high-stakes tests (pricing, checkout) and Bayesian for exploratory tests (content, copy).",
          },
          {
            q: "How do you prevent false-positive winners?",
            a: "Four rules: (1) Pre-test power analysis sets the required sample size before launch; (2) Fixed-horizon testing — we don't peek at results mid-test, eliminating the 25% false-positive rate from peeking; (3) 14-day minimum observation window to account for day-of-week variance; (4) Bonferroni correction when running 8+ simultaneous tests to control family-wise error rate. Following these rules, our false-positive rate over 19 programmes is 4–6% (vs. industry standard 18–25%).",
          },
          {
            q: "When should we use server-side vs. client-side testing?",
            a: "Server-side for performance-critical flows (checkout, pricing, signup, onboarding) where (1) the variation must not appear client-side at all (e.g., different pricing logic), (2) client-side flicker would hurt Core Web Vitals, or (3) the variation requires backend logic (e.g., different recommendation algorithms). Client-side for content and UI variations where flicker is acceptable and engineering bandwidth is limited. Most production programmes use both — client-side for the marketing site, server-side for the product.",
          },
          {
            q: "What's the minimum detectable effect (MDE) we can test for?",
            a: "It depends on your baseline conversion rate and traffic volume. At 200K monthly sessions with 5% baseline conversion and 95% significance + 80% power, you can detect a 12% relative uplift (5.0% → 5.6%) in 14 days. At 1M monthly sessions with the same baseline, MDE drops to 5%. We calculate MDE per test during power analysis and reject test ideas whose expected uplift is below the MDE — running tests that can never reach significance wastes programme bandwidth.",
          },
        ],
      },
      {
        name: "Research & Hypothesis",
        questions: [
          {
            q: "How do you decide what to test?",
            a: "Three research streams feed the hypothesis backlog: (1) Quantitative — GA4 funnel analysis identifies the exact step with the highest absolute conversion loss; (2) Qualitative — Hotjar/Clarity heatmaps and 100+ session replays per page identify confusion patterns (rage clicks, u-turns, form abandonment); (3) User testing — 5-user moderated tests per page surface 85% of usability issues. Hypotheses follow the 'Because we observed X, we expect Y for segment Z, measured by W, winner if V' format and are PIE-scored (Potential, Importance, Ease).",
          },
          {
            q: "How many tests will we run per month?",
            a: "8–12 tests per month at steady-state (month 4+). The first 90 days ship fewer (4–8) while infrastructure is stood up and the research backlog is built. Maximum 8 active tests at any time to control multiple-comparisons false-positive rate. Tests run in parallel across different surface areas (e.g., 3 on signup, 2 on pricing, 2 on checkout, 1 on onboarding) to avoid interaction effects.",
          },
          {
            q: "What happens when a test loses?",
            a: "We learn. Every losing test produces a documented learning in the database — what we hypothesised, what we observed, why we think it lost, what we'd test next in that surface area. Losing tests are as valuable as winning tests because they retire hypothesis categories and prevent re-testing variations of failed ideas. Over 12 months, the learning database becomes your team's accumulated knowledge of what works for your specific users.",
          },
          {
            q: "How do you handle tests that don't reach significance?",
            a: "Inconclusive tests are also documented learnings — they typically mean the variation had no material effect, which retires the hypothesis. We don't 'extend' inconclusive tests to chase significance (a form of peeking that inflates false positives). We either re-design the test (larger MDE, different segment) or retire the hypothesis. About 25% of tests end inconclusive in our programmes — that's healthy and means the testing tool is calibrated correctly.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your CRO teams based?",
            a: "CRO strategists and growth engineers in Birmingham (UK) and Austin (USA). Research analysts and statistical reviewers distributed globally with strong clusters in Multan (Pakistan), London, and US East Coast. Daily experiment monitoring runs 8am UK time with a US afternoon review for tests reaching significance. The 8–12 tests/month velocity is enabled by the distributed team covering multiple time zones.",
          },
          {
            q: "Do you work with our existing engineering team?",
            a: "Yes, in two configurations. (1) Your engineering team implements server-side tests via GrowthBook/PostHog/Statsig SDKs we provide; our team designs tests, writes the briefs, and runs the statistical analysis. (2) Our growth engineer implements server-side tests directly in your codebase via PRs your team reviews. Configuration is decided in week 1 based on your engineering capacity and the complexity of server-side tests required.",
          },
          {
            q: "What happens after the engagement ends?",
            a: "Standard handover is 8 weeks: weeks 1–4 we document every active test, the learning database, the hypothesis backlog, and the experimentation infrastructure in a Notion playbook; weeks 5–8 we shadow your in-house team and step in only on statistical analysis escalations. After handover, we offer a $2.5K/month 'advisory only' tier where we review monthly experiment results and flag statistical validity issues without operating the programme.",
          },
          {
            q: "Do you guarantee conversion lift?",
            a: "No — and any agency that does is lying. CRO outcomes depend on traffic volume, baseline conversion, hypothesis quality, and the underlying product/market fit. What we can guarantee is the input discipline: research depth, hypothesis quality, statistical rigor, shipping velocity, and learning database maintenance. Programmes operated to this discipline reliably produce 15–35% conversion lift in 12 months — but specific lift is not contractually guaranteed.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Make CRO Compound?",
    subtitle:
      "Book a free 30-minute funnel audit. We'll pull your GA4, identify your top 3 conversion drop-offs, and tell you honestly whether CRO is the right channel for your traffic volume — or whether content, paid media or product work would compound faster.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min funnel audit call",
        description: "Free. We pull your GA4, identify top drop-offs, and assess whether your traffic supports a CRO programme.",
      },
      {
        step: "2",
        title: "Receive audit report + research backlog",
        description: "Fixed deliverable: funnel scorecard, top 3 drop-off pages, 30+ prioritised hypotheses, projected lift range.",
      },
      {
        step: "3",
        title: "Sign off on the roadmap — we operate",
        description: "12-month commitment. Monthly reporting on tests shipped, winners, learnings, cumulative conversion lift. Cancel after month 12.",
      },
    ],
    primaryCta: { label: "Book a Free Funnel Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the CRO Playbook", href: "/resources", variant: "outline" },
  },
}
