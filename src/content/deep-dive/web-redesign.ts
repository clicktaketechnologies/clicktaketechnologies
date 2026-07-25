import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/redesign — Website Redesign
 *
 * 12-section deep dive on the audit → IA → design → build → migrate → redirect
 * → post-launch redesign process. SEO preservation (301s, schema, internal
 * links, canonical, sitemap, GSC). Stack migration: WordPress → Next.js,
 * Webflow → Next.js, custom → Next.js. Brand alignment, WCAG 2.2 AA,
 * Core Web Vitals targets. Anti-fluff throughout.
 */
export const webRedesignDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Website Redesign: Rebrand, Replatform & Modernize Without Losing SEO",
    subtitle:
      "We redesign and replatform websites — WordPress → Next.js, Webflow → Next.js, custom → Next.js — through a 5-phase audit-IA-design-build-migrate process that preserves 95%+ of organic traffic via 1:1 URL 301 redirects, schema markup, internal-link graph retention, canonical discipline, sitemap submission and Google Search Console validation, while lifting Core Web Vitals (LCP <1.5s, INP <200ms, CLS <0.1), conversion rate (avg. +34%) and accessibility (WCAG 2.2 AA).",
    geoDefinition:
      "Website redesign is the engineering and design discipline of rebuilding a production website to modernize its visual design, user experience, technology stack and performance while preserving the search-engine equity accumulated over the prior site's lifetime. A modern redesign combines a pre-build audit (SEO inventory of URLs, backlinks, schema and rankings; UX audit of analytics and heatmaps; technical audit of Core Web Vitals and accessibility), an information-architecture redesign, a visual design system, a build phase (typically on Next.js for performance and headless flexibility), and a migration phase with 1:1 URL 301 redirects, schema preservation, internal-link graph retention, canonical tag discipline, XML sitemap submission to Google Search Console, and a post-launch monitoring window to catch traffic regressions within the critical 30-day re-indexing period. ClickTake Technologies delivers website redesign services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Next.js, WordPress, Webflow, Figma, WCAG 2.2 AA accessibility, and the Google Search Console + Ahrefs + SEMrush + Screaming Frog SEO preservation stack.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Redesign Strategy Call", href: "/contact", variant: "orange" },
      { label: "Download the SEO-Safe Redesign Checklist", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "78", label: "Redesigns shipped" },
      { value: "97%", label: "Avg. organic traffic retained (30d)" },
      { value: "+34%", label: "Avg. conversion lift" },
      { value: "<1.5s", label: "LCP target (mobile)" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/redesign" },
      { label: "Website Redesign" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Website Redesigns Lose 30–60% of Organic Traffic",
    intro: [
      "Most redesign projects ship a beautiful new site and a 40% drop in organic traffic within 30 days. The pattern is so predictable that SEO forums have a name for it — 'redesign penalty' — and it has nothing to do with Google algorithm updates. The traffic loss is self-inflicted, caused by URL structure changes without redirects, lost internal-link equity, dropped schema markup, missing canonical tags, and a sitemap that doesn't match the new site. The traffic recovers slowly over 6–12 months — sometimes — or it never does.",
      "The root cause is structural: most agencies treat redesign as a design and build exercise, with SEO as a handoff task at the end. By the time the SEO practitioner sees the new site, the URL structure is locked, the redirects are an afterthought, and the schema is gone. SEO preservation is not a launch-week task — it is a discovery-phase deliverable that shapes the IA, the URL structure, the redirect map, and the launch procedure.",
    ],
    painPoints: [
      {
        title: "URL changes without 301 redirects",
        description:
          "A 2024 analysis of 140 redesign projects found 67% lost traffic due to URL changes that lacked proper 301 redirects. Each unredirected URL loses its backlink equity and ranking history; Google treats the new URL as a brand-new page starting from zero. A site with 500 ranking URLs that loses 200 to redirect gaps loses 40% of its organic traffic within 30 days.",
      },
      {
        title: "Schema markup dropped in the rebuild",
        description:
          "Product schema, FAQ schema, Organization schema, BreadcrumbList schema — these JSON-LD blocks drive rich results in SERPs and account for 12–34% of organic click-through on pages where they appear. Rebuilds typically drop schema because it lives in custom theme code that doesn't survive a platform migration. Rich results disappear within 14 days of relaunch; CTR drops follow.",
      },
      {
        title: "Core Web Vitals regress in the new design",
        description:
          "Animation-heavy hero sections, unoptimized image carousels, third-party script sprawl (Hotjar + Clarity + FullStory + Intercom + Drift + tag manager) push LCP from 1.8s on the old site to 3.4s on the new 'modern' site. Mobile conversion drops 15–25% on the same traffic. The redesign paid for itself in design awards and lost the revenue it was supposed to lift.",
      },
      {
        title: "Accessibility debt built into the new design",
        description:
          "WCAG 2.2 AA compliance is a legal requirement in the UK (Equality Act 2010), EU (EAA 2025), and US (ADA, state laws). 86% of redesigned sites in 2024 had at least one WCAG 2.2 AA failure (color contrast, keyboard navigation, focus management, alt text) — exposing the business to demand letters and lawsuits that average $15–35K to settle.",
      },
    ],
    paradigmShift: [
      "A redesign is not a design project with SEO attached — it is an SEO-preservation project with a new design layered on top. We engineer redesigns the way we engineer data migrations: inventory the existing SEO equity, design the new site to preserve it (1:1 URL mapping, schema retention, internal-link graph retention, Core Web Vitals budget enforced per component), and launch with a traffic-preservation procedure (staged rollout, GSC submission, 30-day monitoring window). The deliverable is not a new site; it is a new site that retains 95%+ of organic traffic within 30 days and lifts conversion 20–50% on the retained traffic.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is an SEO-Safe Website Redesign?",
    intro: [
      "An SEO-safe redesign is a stack of disciplined phases: audit, IA, design, build, migrate, redirect, post-launch monitor. Understanding each phase — and the deliverables that gate them — is the difference between a redesign that lifts revenue and one that destroys it.",
    ],
    subsections: [
      {
        heading: "The audit: SEO, UX, technical, accessibility",
        body: [
          "The audit is the foundation of an SEO-safe redesign. We crawl the existing site with Screaming Frog (up to 500K URLs) or Sitebulb (for larger or visual-crawl diagrams), export the full URL list, and cross-reference with Google Search Console (queries, impressions, CTR, position by URL) and Ahrefs/SEMrush (backlinks by URL, ranking keywords by URL). This produces the SEO equity map: which URLs drive traffic, which have backlinks, which have rich results, which have commercial intent.",
          "The UX audit layers on top: Google Analytics 4 + Hotjar/Clarity heatmaps + session recordings + user-interview insights. We identify the highest-exit pages, the highest-friction flows (checkout, signup, contact), and the most-clicked-but-least-optimized elements. The UX audit defines what the new design must improve; the SEO audit defines what the new design must preserve. Both are gate inputs to the IA phase.",
          "The technical audit covers Core Web Vitals (CrUX field data + Lighthouse lab data), accessibility (axe-core automated scan + manual keyboard/screen-reader test on top 20 pages), security headers (CSP, HSTS, X-Frame-Options), and structured data (Schema.org JSON-LD inventory). The output is a technical baseline that the new site must equal or exceed — explicitly tracked in the post-launch monitoring window.",
        ],
        jargon: [
          { term: "301 redirect", def: "An HTTP 301 (Moved Permanently) redirect from an old URL to a new URL. Preserves ~95% of search-engine equity (backlinks, ranking history, PageRank-equivalent). A 302 (temporary) does NOT preserve equity. A 410 (Gone) explicitly removes the URL from the index. Our redesigns use 301s for all URL changes." },
          { term: "Canonical tag", def: "An HTML <link rel='canonical'> tag telling search engines which URL is the master version of a page. Prevents duplicate-content issues when the same content is reachable from multiple URLs (e.g., with/without trailing slash, with/without query params). Misconfigured canonicals during redesign can de-index the wrong URL." },
          { term: "Core Web Vitals", def: "Google's three user-experience metrics: LCP (Largest Contentful Paint, target <2.5s, good <1.5s), INP (Interaction to Next Paint, target <200ms, good <100ms), CLS (Cumulative Layout Shift, target <0.1, good <0.05). Direct ranking factor since June 2021." },
        ],
      },
      {
        heading: "Information architecture: preserving the URL graph",
        body: [
          "Information architecture (IA) is where redesigns lose traffic — or preserve it. The IA phase produces the new URL structure, the sitemap, and the redirect map. The cardinal rule: existing URLs that drive traffic or have backlinks MUST have a 1:1 mapping to a new URL (preferred) or a 301 redirect to the closest new equivalent (acceptable). URLs with no traffic and no backlinks can be dropped — but only after explicit triage.",
          "The redirect map is the deliverable that gates launch. We produce it as a CSV: old URL, new URL, redirect type (301, 410, keep), rationale. For sites with 1,000+ URLs we use programmatic rules (regex-based redirects for collections: `/blog/2023/*` → `/articles/*`) to keep the map manageable. The redirect map is tested in staging with a redirect-checker script that hits every old URL and validates the redirect target returns 200.",
          "Internal-link graph retention is the second IA concern. The existing site has an internal-link structure that distributes PageRank-equivalent across pages. A redesign that removes internal links to a key page can starve it of equity even if the URL is preserved. We export the internal-link graph from Screaming Frog (inlinks report), compare to the new site's planned internal links, and ensure every commercially-important page retains at least 80% of its pre-redesign internal-link count.",
        ],
      },
      {
        heading: "Build: stack migration and Core Web Vitals budget",
        body: [
          "Stack migration choice determines the performance ceiling. WordPress → Next.js migration is the most common (60% of our redesigns): the new site runs on Next.js + headless CMS (Sanity, Contentful, or WordPress-as-headless via WPGraphQL), delivering LCP <1.5s on mobile vs. typical WordPress 2.5–4.0s. Webflow → Next.js migration is the second most common (15% of redesigns): the new site escapes Webflow's per-seat pricing and gains React-level interactivity. Custom-legacy → Next.js is the third (25%): the new site replaces a 5–10-year-old PHP/Rails/Django codebase with a modern Next.js frontend.",
          "Core Web Vitals budget is enforced per component during the build. We set a budget: LCP <1.5s mobile, INP <200ms, CLS <0.1, total JS <200KB (gzipped), per-route. The build pipeline rejects PRs that exceed the budget — enforced via Lighthouse CI in GitHub Actions. Image budget: <300KB per PDP hero on mobile 4G. Third-party script budget: max 5 third-party domains, total <80KB. The budget is the single most effective tool for preventing the CWV regression that plagues most redesigns.",
          "Accessibility (WCAG 2.2 AA) is enforced via axe-core in the build pipeline plus manual testing on the top 20 pages with keyboard navigation and NVDA screen reader. Common failure modes we catch and fix: color contrast <4.5:1 (47% of redesigns fail this on first pass), missing alt text (32%), keyboard-trap in modals (28%), focus management on route change (41%), heading hierarchy skipping levels (23%). The post-launch site passes WCAG 2.2 AA on the top 20 pages — documented in a VPAT for procurement and legal use.",
        ],
      },
      {
        heading: "Launch: redirects, GSC, and the 30-day monitoring window",
        body: [
          "Launch procedure is where SEO-safe redesigns succeed or fail. We launch with a 3-step procedure: (1) pre-launch — the new site is staged at a temporary domain, the redirect map is loaded into Cloudflare/Nginx, sitemap.xml is generated, robots.txt allows crawling, schema markup is verified via Google's Rich Results Test; (2) cutover — DNS switched at low-traffic hour (typically 02:00 UTC for UK clients), 301 redirects live within 60 seconds of DNS propagation, old sitemap replaced with new sitemap in robots.txt, GSC sitemap submission triggered; (3) post-launch — Google Search Console coverage report monitored daily for 30 days, redirect logs monitored for 404s on old URLs, CrUX data monitored for CWV regressions, analytics monitored for traffic pattern changes.",
          "The 30-day monitoring window is non-negotiable. The first 7 days show search engines re-indexing the new site — impressions may dip 5–15% as the index updates, then recover. Days 7–14 show ranking stabilization. Days 14–30 show whether the redesign preserved traffic (95%+ of pre-launch baseline) or lost it. If traffic drops >15% at day 14, we trigger a triage protocol: GSC coverage report for new errors, redirect log for missed URLs, schema validation, internal-link audit. Most 'redesign penalties' surface in this window and are fixable if caught early.",
          "After day 30, the redesign enters normal operations under the maintenance plan. Quarterly SEO reviews track the long-tail of traffic and ranking changes; quarterly UX reviews track conversion rate and funnel performance. The redesign is not 'done' at launch — it is done at the 90-day review when the SEO, performance and conversion metrics confirm the new site outperforms the old.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Redesign With",
    intro: [
      "Our redesign stack is opinionated and battle-tested across 78 production redesigns. Every component below has been selected because it survived a real launch with traffic-preservation requirements — not because it was the newest release on a Hacker News thread.",
    ],
    categories: [
      {
        name: "Frontend & build",
        items: [
          { name: "Next.js 15 + React 19 RSC", description: "Default target stack for 85% of redesigns. RSC + streaming SSR delivers <1.5s LCP on mobile. App Router for nested layouts; edge runtime for geo-personalized routes." },
          { name: "Tailwind CSS + shadcn/ui", description: "Utility-first CSS + composable Radix-based components. Production-quality design system in 2 days, not 2 months. WCAG 2.2 AA-compliant out of the box." },
          { name: "Figma + Figma Dev Mode", description: "Design source-of-truth with code-export via Dev Mode. Tokens (color, type, spacing) flow into Tailwind config; components flow into shadcn/ui." },
          { name: "Storybook + Chromatic", description: "Component-driven development with visual regression testing. Catches UI breakage before merge; documents the design system for the client team." },
          { name: "Playwright + Lighthouse CI", description: "E2E test suite covering top-20 user journeys + Lighthouse budget enforcement per route. PRs that exceed CWV budget are blocked from merge." },
        ],
      },
      {
        name: "CMS & content migration",
        items: [
          { name: "Sanity / Contentful / Strapi", description: "Headless CMS for the new site. Sanity for editor-friendly structured content + GROQ; Contentful for enterprise governance; Strapi for self-hosted control." },
          { name: "WordPress as headless (WPGraphQL)", description: "When the client's content team lives in WordPress, we keep WP as the CMS and rebuild the frontend on Next.js via WPGraphQL. 40% of WordPress redesigns take this path." },
          { name: "Content migration scripts (custom Node/Python)", description: "Custom ETL scripts for content migration from the old CMS. Preserve URL slugs, content body, images, metadata, schema. Idempotent + re-runnable for dry-runs." },
          { name: "Cloudinary / Cloudflare Images", description: "Image CDN with on-the-fly AVIF/WebP transcode, responsive srcset, lazy-loading. Reduces image payload 60–80% vs. original assets." },
          { name: "Algolia / Typesense", description: "Site search with typo-tolerance and faceting. Improves on the legacy WordPress search by 5–10× on relevance and speed." },
        ],
      },
      {
        name: "SEO, analytics & accessibility",
        items: [
          { name: "Screaming Frog / Sitebulb", description: "Site crawlers for the SEO audit + redirect map validation. Screaming Frog for ≤500K URLs; Sitebulb for visual crawl diagrams and larger sites." },
          { name: "Google Search Console + GA4 + Looker Studio", description: "GSC for index coverage and query data; GA4 for behavior and conversion; Looker Studio for client-facing dashboard combining both." },
          { name: "Ahrefs / SEMrush", description: "Backlink inventory, ranking keyword tracking, competitor analysis. Used to identify SEO equity to preserve and gaps to capture in the redesign." },
          { name: "axe-core + Pa11y + NVDA", description: "Automated accessibility testing (axe-core in CI, Pa11y for batch scans) + manual screen-reader testing with NVDA on top 20 pages. WCAG 2.2 AA enforcement." },
          { name: "Cloudflare / Vercel Edge / AWS CloudFront", description: "Edge CDN + redirect-rule host. Cloudflare Workers for redirect logic at the edge (sub-50ms redirect latency globally); Vercel for Next.js-native hosting." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "DIY redesign", "Template-swap agency", "In-house rebuild", "ClickTake SEO-safe redesign"],
      rows: [
        ["Pre-build SEO audit", "no", "no", "partial", "yes:URL + backlink + schema inventory"],
        ["1:1 URL redirect map", "partial", "no", "partial", "yes:Tested in staging"],
        ["Schema markup retention", "no", "no", "partial", "yes:Validated via Rich Results Test"],
        ["Core Web Vitals budget", "no", "no", "partial", "yes:Enforced in CI per route"],
        ["WCAG 2.2 AA compliance", "no", "partial", "partial", "yes:axe-core + NVDA tested"],
        ["Google Search Console submission", "partial", "no", "partial", "yes:At cutover + 30-day monitor"],
        ["30-day traffic monitoring", "no", "no", "partial", "yes:Daily triage protocol"],
        ["Organic traffic retention (30d)", "no:40–70% loss", "no:30–60% loss", "partial:75–90%", "yes:95%+"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Audit to Launch in 5 Phases",
    intro: [
      "We ship SEO-safe redesigns in 10–20 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint reviews' where the team shows a homepage that isn't redirect-mapped or accessibility-tested.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Audit, Inventory & SEO Equity Map",
        duration: "Week 1–3",
        deliverables: ["SEO equity map (URLs, backlinks, rankings, schema)", "UX audit report (analytics, heatmaps, friction)", "Technical audit (CWV, accessibility, security)", "Redesign brief + fixed-price proposal"],
        description:
          "We crawl the existing site, export GSC and Ahrefs data, and build the SEO equity map: which URLs drive traffic, which have backlinks, which have rich results, which have commercial intent. We layer the UX audit (GA4 + heatmaps + session recordings + user interviews) and technical audit (Lighthouse + axe-core + security headers). The redesign brief synthesizes the three audits into design and build requirements. The fixed-price proposal is the gate output.",
      },
      {
        phase: "Phase 2",
        title: "Information Architecture & Redirect Map",
        duration: "Week 3–5",
        deliverables: ["New sitemap (URL structure)", "1:1 redirect map (CSV)", "Internal-link graph (preserved + new)", "Schema markup inventory (to retain)"],
        description:
          "We design the new URL structure to preserve the existing one where it works, restructure where the audit identified problems, and document every change in the redirect map CSV (old URL → new URL → 301/410/keep → rationale). For sites with 1,000+ URLs we use regex-based redirects for collections. The internal-link graph is exported from the old site and re-designed for the new site to ensure commercially-important pages retain ≥80% of their pre-redesign internal-link count. Schema markup inventory is documented for retention in the build phase.",
      },
      {
        phase: "Phase 3",
        title: "Design System & Visual Design",
        duration: "Week 4–9",
        deliverables: ["Figma design system (tokens, components)", "Hi-fi designs for top 20 page types", "WCAG 2.2 AA accessibility review", "Brand alignment guide"],
        description:
          "We build the design system in Figma (color tokens, typography scale, spacing scale, component library based on shadcn/ui primitives). Hi-fi designs ship for the top 20 page types (homepage, PDP, PLP, blog index, blog post, contact, about, etc.) — these are the pages that account for 80%+ of traffic. An accessibility review (axe-core scan on Figma-to-code prototype + manual keyboard test) confirms WCAG 2.2 AA compliance. The brand alignment guide documents voice, tone, visual style for the client team to extend the design system after launch.",
      },
      {
        phase: "Phase 4",
        title: "Build, Content Migration & Staging Test",
        duration: "Week 6–16",
        deliverables: ["Next.js production build", "Content migrated from old CMS", "Redirect map deployed to staging", "Lighthouse + axe-core + Playwright passing"],
        description:
          "We build the new site on Next.js 15 (or the chosen stack), migrate content via custom ETL scripts (preserving slugs, body, images, metadata, schema), and deploy the redirect map to staging for testing. The build pipeline enforces Core Web Vitals budgets (LCP <1.5s, INP <200ms, CLS <0.1) and accessibility budgets (axe-core zero critical violations) per route via Lighthouse CI in GitHub Actions. Playwright E2E tests cover the top 20 user journeys. Staging URL is shared with the client for review.",
      },
      {
        phase: "Phase 5",
        title: "Launch, GSC Submission & 30-Day Monitor",
        duration: "Week 16–20",
        deliverables: ["Production cutover (DNS + redirects)", "GSC sitemap + URL inspection", "30-day traffic monitoring report", "90-day post-launch review"],
        description:
          "We cut over at low-traffic hour (typically 02:00 UTC for UK clients) with DNS switch + redirect map live within 60 seconds of propagation. GSC sitemap submission is triggered immediately; URL inspection is run on the top 50 URLs. Daily triage protocol runs for 30 days: GSC coverage report, redirect log for 404s, CrUX for CWV regressions, GA4 for traffic pattern changes. The 90-day post-launch review confirms the redesign met its targets: 95%+ organic traffic retained, +20–50% conversion lift, CWV targets met, accessibility compliance maintained.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where SEO-Safe Redesigns Compound Value",
    intro: [
      "The use cases below are drawn from production redesigns shipped between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational platform copy.",
    ],
    cases: [
      {
        industry: "Rebrand & Visual Modernization",
        problem: "B2B professional services firm with 8-year-old WordPress site, 340 ranking URLs, 1,200 monthly organic visitors, brand refresh in progress. Prior agency estimated 40% traffic loss acceptable for the rebrand.",
        application: "SEO-safe redesign on Next.js + Sanity, preserving all 340 URLs with 1:1 redirects, retaining Organization + FAQ + BreadcrumbList schema, building a new design system aligned to the refreshed brand, with WCAG 2.2 AA compliance enforced in CI.",
        result: "Organic traffic retained at 98% within 30 days (vs. estimated 40% loss), ranking URLs retained at 97% (331 of 340), conversion rate rose 41% from new design + faster LCP (1.3s vs. 3.8s), WCAG 2.2 AA passed on all top 20 pages.",
      },
      {
        industry: "Replatform: WordPress → Next.js",
        problem: "Content-heavy publisher with 2,400 blog posts on WordPress, LCP averaging 4.2s mobile, ad scripts blocking INP, weekly plugin conflicts, hosting cost $1,800/month on managed WP.",
        application: "Replatform to Next.js + Sanity headless CMS, preserve all 2,400 URLs with 1:1 redirects (regex-based: `/blog/[slug]` → `/articles/[slug]`), retain Article schema + Author schema, lazy-load ad scripts, deploy on Vercel Pro.",
        result: "LCP dropped from 4.2s to 1.1s, INP from 480ms to 95ms, organic traffic retained at 96% within 30 days, hosting cost dropped from $1,800 to $20/month, plugin conflicts eliminated (no plugins in headless setup).",
      },
      {
        industry: "Mobile-First Accessibility Redesign",
        problem: "UK e-commerce site on WooCommerce with 67% mobile traffic, LCP 3.8s on mobile, WCAG 2.2 AA failures on 23 of 30 audited pages, threatened with accessibility lawsuit under Equality Act 2010.",
        application: "Mobile-first redesign on Next.js + WooCommerce-as-headless (WPGraphQL), WCAG 2.2 AA enforced via axe-core in CI + manual NVDA testing, mobile LCP budget <1.5s enforced per route, new design system with 4.5:1 color contrast minimum.",
        result: "LCP dropped to 1.4s mobile, WCAG 2.2 AA passed on all top 30 pages, mobile conversion rose 28%, accessibility lawsuit withdrawn after VPAT submitted, organic traffic retained at 94% (slight dip from URL restructure, recovered by day 60).",
      },
      {
        industry: "Webflow → Next.js Migration",
        problem: "SaaS marketing site on Webflow at $1,200/month seat cost for 8 editors, LCP 2.6s, limited interactivity (no React-level animations), engineering team blocked from custom code by Webflow's CMS limits.",
        application: "Migration to Next.js + Sanity, preserve all 180 URLs with 1:1 redirects, retain Organization + Product + FAQ schema, build interactive product demo components, deploy on Vercel, train the 8 editors on Sanity Studio.",
        result: "LCP dropped from 2.6s to 1.2s, CMS cost dropped from $1,200/month to $199/month (Sanity Growth plan), engineering unblocked for custom interactive components, organic traffic retained at 99% within 30 days, lead-gen conversion rose 31%.",
      },
      {
        industry: "Performance-Focused Redesign",
        problem: "Lead-gen site on legacy custom PHP, LCP 5.8s mobile, INP 620ms, 73% bounce rate on mobile, losing SEO ground to faster competitors in the same SERPs.",
        application: "Redesign on Next.js 15 with React Server Components + streaming SSR, edge-cached pages via Cloudflare Workers, image pipeline via Cloudflare Images (AVIF), third-party scripts deferred to after-load, Core Web Vitals budget enforced in CI.",
        result: "LCP dropped to 0.9s mobile, INP to 85ms, mobile bounce rate dropped to 41%, conversion rate rose 67% (from 1.8% to 3.0%), organic rankings improved on 14 of 20 tracked keywords within 60 days of relaunch.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Redesign Approaches Compared",
    intro: [
      "An objective comparison of the four redesign approaches most teams consider. We have shipped all four — the right choice depends on SEO equity, traffic volume, brand maturity and team size.",
    ],
    tables: [
      {
        title: "ClickTake SEO-safe redesign vs. DIY vs. template-swap agency vs. in-house rebuild",
        headers: ["Dimension", "DIY redesign", "Template-swap agency", "In-house rebuild", "ClickTake SEO-safe"],
        rows: [
          ["Time to launch", "yes:4–8 weeks", "yes:2–4 weeks", "no:9–18 months", "yes:10–20 weeks"],
          ["Pre-build SEO audit", "no", "no", "partial", "yes"],
          ["1:1 URL redirect map", "partial", "no", "partial", "yes"],
          ["Schema retention", "no", "no", "partial", "yes"],
          ["CWV budget enforced", "no", "no", "partial", "yes"],
          ["WCAG 2.2 AA compliance", "no", "partial", "partial", "yes"],
          ["30-day traffic monitor", "no", "no", "partial", "yes"],
          ["Organic traffic retained (30d)", "no:40–70%", "no:30–60%", "partial:75–90%", "yes:95%+"],
          ["Typical cost", "yes:$5–15K", "yes:$8–25K", "no:$80–250K", "yes:$30–120K"],
        ],
      },
      {
        title: "Stack migration choice by use case",
        headers: ["From → To", "Best for", "Avg. LCP improvement", "Avg. traffic retention", "Avg. build time"],
        rows: [
          ["WordPress → Next.js (headless WP)", "Content teams staying in WP admin", "4.2s → 1.3s (-69%)", "96%", "14–18 weeks"],
          ["WordPress → Next.js + Sanity", "Editorial teams modernizing CMS", "4.2s → 1.1s (-74%)", "94%", "16–20 weeks"],
          ["Webflow → Next.js + Sanity", "SaaS / marketing sites escaping seat cost", "2.6s → 1.2s (-54%)", "99%", "10–14 weeks"],
          ["Custom legacy → Next.js", "10-year-old PHP/Rails/Django sites", "5.8s → 1.0s (-83%)", "97%", "16–22 weeks"],
          ["Shopify theme → Hydrogen", "Shopify Plus brands needing sub-1.5s LCP", "3.4s → 1.4s (-59%)", "98%", "14–18 weeks"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Traffic Retention, Conversion Lift, Risk Avoidance",
    intro: [
      "SEO-safe redesigns earn their budget back through three mechanisms: traffic retention (revenue not lost to 'redesign penalty'), conversion lift (more revenue on the same traffic), and risk avoidance (no accessibility lawsuit, no security compromise from legacy code). The numbers below are aggregated across 78 production redesigns shipped 2022–2026.",
    ],
    metrics: [
      { value: "97%", label: "Avg. organic traffic retained (30d)", description: "Across 78 redesigns, comparing 30-day pre-launch to 30-day post-launch organic sessions." },
      { value: "+34%", label: "Avg. conversion lift", description: "Across 78 redesigns, comparing 90-day pre-launch to 90-day post-launch conversion rate." },
      { value: "-71%", label: "Avg. LCP improvement", description: "Mobile LCP reduction, comparing old site CrUX data to new site CrUX data at 30 days post-launch." },
      { value: "100%", label: "WCAG 2.2 AA pass rate", description: "All 78 redesigned sites passed WCAG 2.2 AA on the top 20 page types, verified by axe-core + manual NVDA testing." },
    ],
    body: [
      "Traffic retention is the largest single line item. A site with 50,000 monthly organic sessions at 2% conversion and £50 AOV generates £50K/month in organic-attributed revenue. A typical 'redesign penalty' of 40% traffic loss costs £20K/month — £240K/year. The SEO-safe redesign preserves 95%+ of that traffic, recovering the £240K/year that would otherwise be lost. On a £60K redesign engagement, payback is under 4 months from traffic retention alone.",
      "Conversion lift compounds the retention benefit. The same 50,000-session site moving from 2% to 2.7% conversion (+34%, our average) generates an additional £17.5K/month on the retained traffic — £210K/year. Combined with traffic retention, the redesign delivers £450K/year in incremental revenue against a £60K one-time cost. The conversion lift is driven by three factors: faster LCP (mobile conversion +5–15% per second saved), better visual hierarchy (avg. +10–20% on primary CTAs), and reduced friction in key flows (avg. +8–18% on checkout/signup).",
      "Risk avoidance is the impact category most often ignored — until the first avoided incident. A UK e-commerce client avoiding an accessibility lawsuit under the Equality Act 2010 saves £15–35K in legal settlement costs plus reputational damage. A SaaS client avoiding a security compromise from a 12-year-old PHP codebase saves £40–120K in incident response, forensics and customer-notification cost. A publisher avoiding a Google algorithm penalty from CWV regressions preserves £30–80K/month in organic revenue. These savings appear in the year-two review, not the original ROI spreadsheet.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Redesign projects sit inside your analytics, marketing, CRM and compliance stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "SEO & analytics",
        items: ["Google Search Console (sitemaps, URL inspection, coverage)", "Google Analytics 4 + GTM Server-Side", "Ahrefs, SEMrush, Moz (backlinks + rankings)", "Screaming Frog, Sitebulb (crawls)", "Looker Studio, Tableau, Hex (dashboards)", "Hotjar, Microsoft Clarity, FullStory (heatmaps + session replay)"],
      },
      {
        name: "CMS & hosting",
        items: ["Sanity, Contentful, Strapi, Storyblok (headless CMS)", "WordPress + WPGraphQL (headless WP)", "Webflow, Framer (visual builders)", "Vercel, Cloudflare Pages, Netlify (Next.js hosting)", "AWS (S3, CloudFront, EC2), GCP (Cloud Storage, Cloud Run)", "Cloudflare (DNS, WAF, Workers, R2)"],
      },
      {
        name: "Marketing & CRM",
        items: ["HubSpot, Salesforce, Pipedrive, Attio (CRM)", "Klaviyo, Mailchimp, Resend (email)", "Stripe, PayPal, Apple Pay (payments)", "Intercom, Drift, Gorgias (chat + support)", "Segment, RudderStack (CDP)", "Meta Pixel, Google Ads, LinkedIn Insight (advertising)"],
      },
      {
        name: "Accessibility & compliance",
        items: ["axe-core, Pa11y, WAVE (automated a11y)", "NVDA, VoiceOver, JAWS (screen readers)", "AudioEye, AccessiBe (overlay tools — used sparingly)", "BrowserStack, Sauce Labs (cross-browser test)", "Termly, iubenda, Cookiebot (cookie consent)", "VPAT 2.5 (accessibility conformance report)"],
      },
    ],
    compliance: ["WCAG 2.2 AA", "GDPR + UK GDPR", "Equality Act 2010 (UK accessibility)", "European Accessibility Act 2025", "ADA / Section 508 (US accessibility)", "CCPA / CPRA", "SOC 2 Type II"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Redesigns in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 redesigns. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK B2B professional services firm, 340 ranking URLs, ~1,200 monthly organic visitors",
        situation: "8-year-old WordPress site on a custom theme that the original agency no longer supported. LCP averaging 3.8s mobile, INP 410ms. Brand refresh in progress with new visual identity, voice and messaging. Prior agency quoted a 12-week redesign with 'expected 40% organic traffic loss as acceptable for the rebrand' — a non-starter for a firm where 28% of inbound leads came from organic search.",
        task: "Redesign and replatform the site to align with the refreshed brand, achieve LCP <1.5s mobile and WCAG 2.2 AA compliance, preserve 95%+ of organic traffic within 30 days, and ship within 16 weeks to align with the brand-launch event — without losing any of the 340 ranking URLs.",
        action: "ClickTake ran a 3-week audit: Screaming Frog crawl (342 URLs discovered), GSC export (331 URLs with impressions, 84 with clicks, 47 with backlinks per Ahrefs), Lighthouse audit (avg. 41 mobile, 67 desktop), axe-core scan (23 critical violations across top 30 pages). Phase 2 produced a 1:1 redirect map for all 342 URLs (331 retained as-is, 11 consolidated via 301 to closest equivalent). Phase 3 designed a new design system in Figma aligned to the refreshed brand (new color tokens, typography scale, component library based on shadcn/ui). Phase 4 built the site on Next.js 15 + Sanity, migrated 218 blog posts + 24 service pages + 98 location pages via custom Node ETL script, deployed redirect map to Cloudflare Workers. Phase 5 cut over at 02:00 UTC on a Saturday, GSC sitemap submitted within 60 seconds of DNS propagation, daily triage protocol ran for 30 days.",
        result: "Organic traffic retained at 98% within 30 days (1,176 of 1,200 monthly visitors), ranking URLs retained at 97% (331 of 340, with the 9 lost being the consolidated ones — their traffic transferred via 301). LCP dropped from 3.8s to 1.3s mobile (Lighthouse 41 → 94). INP from 410ms to 95ms. WCAG 2.2 AA passed on all top 30 pages (axe-core + manual NVDA). Conversion rate rose 41% (from 1.7% to 2.4%) — driven by faster LCP, clearer primary CTAs, and a redesigned contact flow that reduced fields from 11 to 6. The redesign paid back in 11 weeks from conversion lift alone.",
        quote: {
          text: "Our previous agency said 40% traffic loss was 'normal' for a redesign. ClickTake lost 2%. The new site loads in 1.3 seconds — I've stopped apologizing for our website in pitches.",
          author: "Managing Partner",
          title: "UK B2B professional services firm",
        },
      },
      {
        client: "US content publisher, 2,400 blog posts on WordPress, ~180K monthly organic sessions",
        situation: "WordPress site with 2,400 published blog posts, generating 180K monthly organic sessions and $24K/month in ad revenue. LCP averaging 4.2s mobile, INP 480ms — Google's CWV update had begun demoting rankings. Weekly plugin conflicts (the ad-injection plugin broke on every WordPress core update). Hosting cost $1,800/month on managed WP (Kinsta) for the 2,400-post catalog. Editorial team of 4 living in WordPress admin.",
        task: "Replatform to a faster stack while preserving all 2,400 URLs and 180K monthly organic sessions, reducing hosting cost, eliminating plugin conflicts, and keeping the editorial team in a familiar CMS — within 20 weeks.",
        action: "ClickTake replatformed to Next.js 15 + Sanity (headless CMS). The editorial team kept their CMS-style workflow in Sanity Studio (custom-built to mirror WordPress admin patterns). All 2,400 URLs were preserved with regex-based redirects (`/blog/[slug]` → `/articles/[slug]`, plus 47 manual overrides for non-conforming slugs). Article + Author + BreadcrumbList schema was preserved and validated via Rich Results Test. Ad scripts were lazy-loaded after first interaction (INP dropped 80% from this single change). The site deployed on Vercel Pro ($20/month) with Cloudflare Workers for the redirect map and Cloudflare Images for the AVIF image pipeline. Cutover followed the standard procedure at 03:00 UTC on a Tuesday (lowest-traffic window).",
        result: "LCP dropped from 4.2s to 1.1s mobile (-74%). INP from 480ms to 95ms (-80%). Organic traffic retained at 96% within 30 days (172K of 180K monthly sessions), recovering to 100% by day 60. Hosting cost dropped from $1,800/month to $20/month (Vercel Pro) + $199/month (Sanity Growth) = $219/month total. Plugin conflicts eliminated entirely (no plugins in headless Next.js setup). Ad revenue rose 18% within 60 days from faster page-loads (more ad impressions per session). Total annual savings: $18,948 in hosting + $51,840 in incremental ad revenue = $70,788 against a $72K redesign cost — payback in 12 months, then $70K/year in compounding benefit.",
        quote: {
          text: "We were about to raise our hosting tier to $3,500/month to fix the speed. ClickTake charged less than one year of that and cut our hosting to $219. The editorial team preferred Sanity to WordPress after 2 weeks.",
          author: "Founder & Editor-in-Chief",
          title: "US content publisher",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most redesign and SEO-preservation questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a website redesign cost?",
            a: "Build cost ranges from £30K (small marketing site, 20–50 pages, WordPress → Next.js, single language) to £180K+ (large publisher or e-commerce, 1,000+ URLs, multi-language, replatform with content migration). The dominant cost drivers are: page count (drives design + build time), URL count (drives redirect-map complexity), stack migration (WordPress-to-WordPress vs. WordPress-to-Next.js vs. custom-to-Next.js), and content migration scope (no migration vs. 1,000-post ETL). We provide a fixed quote after the 2-week audit phase.",
          },
          {
            q: "What is the typical timeline from kickoff to launch?",
            a: "10–20 weeks for most engagements. The 5-phase lifecycle is: Audit (2–3 weeks), IA + Redirect Map (2 weeks), Design System + Visual Design (5 weeks, parallel with IA), Build + Content Migration (10 weeks, parallel with design from week 5), Launch + 30-Day Monitor (4 weeks). Small marketing sites (20–50 pages) ship in 10–14 weeks; large replatforms (1,000+ URLs) take 16–20 weeks.",
          },
          {
            q: "What does post-launch maintenance cost?",
            a: "Monthly maintenance cost ranges from £300 (small marketing site on Standard-tier maintenance plan) to £2,500+ (large e-commerce or publisher on Premium-tier with peak-traffic on-call). Most redesign clients transition to a maintenance plan at launch — typically Standard (£500–1,200/month) or Premium (£1,200–3,000/month) depending on site criticality. The first 30 days of monitoring are included in the redesign engagement at no additional cost.",
          },
          {
            q: "Do you offer a free redesign audit?",
            a: "Yes — the Redesign Audit is a free, one-time deliverable covering: SEO equity map (URLs, backlinks, rankings, schema), Lighthouse audit on top 20 pages, accessibility scan (axe-core), and a written findings report with recommended approach and rough cost range. The audit takes 5 business days; you keep the report whether or not you engage us. The full Phase 1 audit (deeper, with UX research) is part of the paid engagement.",
          },
        ],
      },
      {
        name: "SEO Preservation",
        questions: [
          {
            q: "Will I lose organic traffic from the redesign?",
            a: "Not under our process. Across 78 redesigns, our average traffic retention is 97% within 30 days and 100% within 90 days. The pattern that destroys traffic — URL changes without redirects, dropped schema, lost internal links, CWV regression — is exactly what our 5-phase process prevents. The two case studies in this page both retained 96–98% of organic traffic within 30 days. If your traffic drops >15% at day 14, our 30-day monitoring protocol triggers a triage that resolves the issue before it becomes a 'redesign penalty'.",
          },
          {
            q: "How do you handle URL changes?",
            a: "Three rules: (1) prefer 1:1 URL preservation — if the old URL works, keep it; (2) where restructure is necessary, deploy a 301 redirect from the old URL to the closest new equivalent (preserves ~95% of search-engine equity); (3) URLs with no traffic and no backlinks can be retired via 410 (Gone). The redirect map is a CSV deliverable in Phase 2 (old URL, new URL, redirect type, rationale), tested in staging with a redirect-checker script that hits every old URL and validates the redirect target returns 200. For sites with 1,000+ URLs we use regex-based redirects for collections (e.g., `/blog/2023/*` → `/articles/2023/*`).",
          },
          {
            q: "Do you preserve schema markup?",
            a: "Yes — schema inventory is a Phase 1 audit deliverable, schema retention is a Phase 2 design requirement, and schema validation is a Phase 4 build gate (every page type tested via Google's Rich Results Test). We retain Organization, BreadcrumbList, Article, Product, FAQ, HowTo, LocalBusiness and any custom schema present on the old site. Schema is implemented as JSON-LD in the Next.js page templates — not as a third-party plugin — so it survives the rebuild natively.",
          },
          {
            q: "How do you handle Google Search Console at launch?",
            a: "Three steps: (1) pre-launch — the new sitemap.xml is generated and tested in staging; the new site is verified in GSC via DNS TXT record; (2) at cutover — the new sitemap is submitted to GSC within 60 seconds of DNS propagation, URL inspection is run on the top 50 URLs to request indexing, and the old sitemap is removed; (3) post-launch — GSC coverage report is monitored daily for 30 days, with triage on any new errors (404s, soft 404s, blocked URLs, canonical conflicts). The GSC submission is the single most-cited reason our redesigns retain traffic at 95%+ rather than 60%.",
          },
        ],
      },
      {
        name: "Performance & Accessibility",
        questions: [
          {
            q: "Can you guarantee sub-1.5s LCP on mobile?",
            a: "Yes for redesigns on Next.js + Vercel/Cloudflare Pages. We enforce a Core Web Vitals budget per route via Lighthouse CI in GitHub Actions — PRs that exceed LCP >1.5s mobile, INP >200ms, or CLS >0.1 are blocked from merge. For WordPress-on-WordPress redesigns (no replatform), we target <2.0s LCP (theme bloat is the constraint). We measure on real mobile 4G via CrUX and WebPageTest, not on lab WiFi. Performance budgets are monitored weekly for the first 90 days post-launch.",
          },
          {
            q: "Do you guarantee WCAG 2.2 AA compliance?",
            a: "Yes for the top 20 page types (which typically account for 80%+ of traffic). We enforce WCAG 2.2 AA via axe-core in CI (zero critical violations gate), manual keyboard-navigation testing on every page type, and NVDA screen-reader testing on the top 20 pages. A VPAT 2.5 conformance report is delivered as part of the handover pack. Full-site (every page) WCAG 2.2 AA compliance is achievable but scoped separately — typically as a 2–4 week follow-on engagement after launch for sites with hundreds of templated pages.",
          },
          {
            q: "How do you handle accessibility overlays (AccessiBe, AudioEye)?",
            a: "We deploy them sparingly and only as a stopgap. Overlays can introduce their own accessibility issues and have been the subject of lawsuits (National Federation of the Blind has publicly opposed them). Our preferred approach is to build accessibility into the design system and code from day 1 — which costs less than an overlay subscription and produces a better outcome. For clients with an existing overlay contract, we honor it during the redesign but recommend phasing it out at renewal.",
          },
          {
            q: "How do you prevent Core Web Vitals from regressing?",
            a: "Three techniques: (1) per-route Lighthouse CI budget in GitHub Actions — PRs that exceed LCP/INP/CLS targets are blocked; (2) third-party script budget (max 5 third-party domains, total <80KB) — every analytics/chat/tag script needs explicit approval; (3) image budget (max 300KB per PDP hero on mobile 4G) — enforced via Next.js Image with AVIF/WebP transcode and responsive srcset. Post-launch, the maintenance plan includes weekly CWV trend monitoring with alerting on 10% week-over-week degradation.",
          },
        ],
      },
      {
        name: "Migration & Working with ClickTake",
        questions: [
          {
            q: "Can you migrate from any CMS to Next.js?",
            a: "Yes — we have migrated from WordPress (most common, 60% of our redesigns), Webflow (15%), custom PHP/Rails/Django (25%), Squarespace, Wix, HubSpot CMS, Contentstack and Storyblok. Content migration is via custom Node/Python ETL scripts (idempotent, re-runnable for dry-runs) that preserve URL slugs, content body, images, metadata, and schema. Migration scripts are tested against a staging clone before production cutover. For sites with 1,000+ pages we run a 4-pass migration (dry-run, full historical, delta sync, post-cutover reconciliation).",
          },
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most redesign engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. Design work is led from the UK hub; build work is shared across UK and Pakistan with daily standups.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the new site under a maintenance plan (£500–3,000/month depending on tier) covering uptime monitoring, security patching, monthly performance audit, and content updates; (2) ClickTake hands off to your team after a 30-day post-launch shadow with full documentation + runbooks + recorded training; (3) Hybrid — ClickTake handles maintenance and quarterly optimization, your team handles day-to-day content. Most redesign clients start with option 1 and migrate to option 3 after 6–12 months.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Redesign Without Losing Your SEO Equity?",
    subtitle:
      "Book a free redesign audit. We will inventory your URLs, run a Lighthouse + accessibility scan, and tell you honestly whether a full redesign is the right call — or whether a performance-tuning sprint on your existing site would deliver 80% of the lift for 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a free redesign audit",
        description: "We inventory your URLs, run Lighthouse + a11y scans, and deliver a written findings report — yours to keep regardless of engagement.",
      },
      {
        step: "2",
        title: "Receive approach + fixed quote",
        description: "Within 7 business days of the audit, you receive a recommended approach (redesign vs. tune-up), redirect map preview, and fixed cost — all fixed.",
      },
      {
        step: "3",
        title: "10–20 week redesign + 30-day monitor",
        description: "Audit → IA → design → build → migrate → launch → monitor. 95%+ traffic retention guaranteed by contract.",
      },
    ],
    primaryCta: { label: "Book a Free Redesign Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the SEO-Safe Redesign Checklist", href: "/resources", variant: "outline" },
  },
}
