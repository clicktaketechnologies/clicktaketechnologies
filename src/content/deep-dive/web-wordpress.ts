import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/wordpress — WordPress Development
 *
 * 12-section deep dive on custom themes, Gutenberg blocks, headless WP,
 * WooCommerce, performance optimization and security hardening. Anti-fluff throughout.
 */
export const webWordpressDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "WordPress Development: Custom Themes, Headless WP & WooCommerce Built for SEO",
    subtitle:
      "We design, build and operate WordPress sites — custom block themes, ACF Blocks with native block.json, headless WP via WPGraphQL + Next.js, WooCommerce storefronts, MemberPress/LearnDash communities — optimized for LCP <1.5s, organic traffic and conversion, secured with Wordfence + 2FA + patch management.",
    geoDefinition:
      "WordPress development is the engineering discipline of building websites on the WordPress content management system, which powers approximately 43% of all websites on the public web as of 2025. A modern WordPress build combines a custom theme (block theme on WordPress 6.5+ or classic theme on legacy installs), custom Gutenberg blocks (ACF Blocks with native block.json, or native React blocks), a plugin stack selected for performance and security, and an infrastructure layer (managed hosting on Cloudways/Kinsta/WP Engine, or headless WP on Vercel/Cloudflare paired with a Next.js frontend). ClickTake Technologies delivers WordPress development services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in PHP 8.2+, Bedrock/Sage, ACF Pro, WPML, WPGraphQL, WooCommerce, MemberPress, LearnDash, and the WP Rocket + Cloudflare performance stack.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free WordPress Strategy Call", href: "/contact", variant: "orange" },
      { label: "Download the WordPress Performance Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "180+", label: "WordPress sites shipped" },
      { value: "<1.5s", label: "LCP target" },
      { value: "43%", label: "Of the web runs WP" },
      { value: "0", label: "Security incidents (24mo)" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/wordpress" },
      { label: "WordPress Development" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most WordPress Sites Are Slow, Insecure and SEO-Invisible",
    intro: [
      "WordPress has a reputation problem it does not entirely deserve. The 43% of the web running on WordPress includes some of the fastest, most secure, highest-ranking sites on the internet — and a much larger tail of slow, vulnerable, plugin-bloated installs that drag the average down. The gap between the two groups is not the platform. It is the build.",
      "The failure pattern is consistent across the 100+ WordPress rescue engagements we have run. A business buys a $200 theme from ThemeForest, installs 30 plugins to add features the theme does not include, runs it on shared hosting at $5/month, and is shocked when Lighthouse scores 38, the LCP is 6.4 seconds, and a security scan finds 4 critical vulnerabilities. The instinct is to blame WordPress — but the same business on a custom block theme with 6 well-chosen plugins on Cloudways hosting would score 95+ on Lighthouse and 1.2s on LCP. The platform is rarely the bottleneck; the build is.",
    ],
    painPoints: [
      {
        title: "Theme bloat and the page-builder trap",
        description:
          "ThemeForest themes with bundled page builders (Elementor, WPBakery, Divi) ship 1.5–4MB of CSS/JS on every page render, generate 200+ DOM nodes, and produce LCP times of 4–8 seconds. The page builder advertises 'no code needed' but the cost is paid in performance, SEO ranking, and conversion rate. A custom block theme with ACF Blocks ships 80–180KB and renders in under 1.5 seconds — same design, 10x less code.",
      },
      {
        title: "Plugin sprawl and the dependency hell",
        description:
          "The average bloated WordPress install runs 28 plugins, of which 6 are abandoned (no updates in 12+ months), 4 duplicate functionality, and 3 have known vulnerabilities. Each plugin adds PHP execution time, database queries, and CSS/JS to the page. The fix is not 'fewer plugins' — it is the right 6–10 plugins, chosen for active maintenance, performance, and security, plus custom code for anything not covered by a maintained plugin.",
      },
      {
        title: "Shared hosting and the slow-TTFB tax",
        description:
          "Shared hosting at $5–$15/month puts 200–800 sites on a single server, with PHP-FPM pools sized for the average site, not yours. TTFB (Time to First Byte) of 1.8–4.5 seconds is the result — and TTFB is the upper bound on LCP. No amount of caching, image optimization, or CDN configuration can fix a 3-second TTFB. The fix is managed WordPress hosting (Cloudways, Kinsta, WP Engine) on isolated containers with dedicated PHP-FPM pools, where TTFB falls to 200–400ms.",
      },
      {
        title: "Security neglect until the defacement",
        description:
          "WordPress is the most-attacked CMS on the web because it is the most-deployed. The 90,000+ attacks per minute against WordPress sites (brute-force login, exploit of known plugin vulnerabilities, XML-RPC amplification) are automated and continuous. Sites without Wordfence or equivalent, without 2FA on admin accounts, without limited login attempts, and without patch management get compromised — typically within 4–8 weeks of going live. The fix is a security stack applied at launch, not after the first incident.",
      },
    ],
    paradigmShift: [
      "A WordPress site is not a theme plus plugins — it is a system: the theme (custom block theme or classic), the plugin stack (6–10 well-chosen, actively maintained plugins), the content model (custom post types, taxonomies, ACF fields), the infrastructure (managed hosting with isolated PHP-FPM, Redis object cache, Cloudflare CDN), the security stack (Wordfence, 2FA, limited login attempts, patch management), and the observability layer (uptime monitoring, performance budgets, security scanning). We engineer all six as a coherent whole, then operate it under a maintenance SLA. The deliverable is not a WordPress install — it is a fast, secure, SEO-visible site that ranks, converts, and does not get defaced.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Modern WordPress Build Actually Looks Like",
    intro: [
      "A modern WordPress build is a system of cooperating layers: theme, blocks, plugins, content model, infrastructure and security. Understanding each layer — and the contract between them — is the difference between a site that loads in 1.2 seconds and one that loads in 6.",
    ],
    subsections: [
      {
        heading: "Block themes vs. classic themes: choosing the right model",
        body: [
          "WordPress 5.9 (January 2022) shipped the block editor for full-site editing. WordPress 6.0+ shipped block themes — themes built entirely from blocks, with theme.json controlling global styles, no PHP templates for the layout. Block themes are the future of WordPress theming: they ship less PHP, give editors more control in the admin UI, and integrate natively with the Gutenberg editor. We build new sites as block themes when the design fits the block model (most marketing sites, publishing sites, and small e-commerce).",
          "Classic themes (PHP templates with the traditional template hierarchy) remain the right choice for: legacy sites we are maintaining without a re-theme, complex layouts that the block editor cannot express cleanly, and sites where the editorial team prefers the classic widget/menu admin. We also build 'hybrid' themes — classic theme structure with block-editor support for content — when migrating a large classic theme incrementally to blocks. The choice is driven by the design, the editorial workflow, and the migration strategy — not by a 'block themes are always better' dogma.",
        ],
        jargon: [
          { term: "Block theme", def: "A WordPress theme built entirely from blocks, with theme.json for global styles and no PHP templates for layout. Introduced in WP 5.9. Editors can modify the layout via the Site Editor in the admin UI." },
          { term: "theme.json", def: "A JSON file in the theme root that defines global styles (colors, typography, spacing), block defaults, and editor settings. Replaces dozens of PHP filters and CSS rules with a single declarative file." },
          { term: "ACF Blocks", def: "Custom Gutenberg blocks built with Advanced Custom Fields Pro, using native block.json for registration. Editors get a familiar ACF field UI; developers get PHP templates (not React) for the block render. The fastest path to custom blocks for teams not fluent in React." },
        ],
      },
      {
        heading: "Custom Gutenberg blocks: ACF Blocks vs. native React blocks",
        body: [
          "Custom Gutenberg blocks are how a WordPress site gets a unique design that the block editor's default blocks cannot express. Two implementation paths. ACF Blocks (using ACF Pro's `acf_register_block_type()` with native block.json): the editor gets an ACF field group UI for the block's content, the developer writes a PHP template for the render. This is the right path for 90% of custom blocks — it ships in 1–2 days per block, requires no React, and the ACF field UI is familiar to editors.",
          "Native React blocks (using `@wordpress/create-block` with the block.json + JSX + PHP render callback): the editor gets a fully custom UI in the block editor itself, with live preview of changes. This is the right path for blocks with complex interactivity (a configurator, a booking widget, a dynamic chart) where the editor needs to see the result as they edit. Native blocks take 3–5 days per block and require React fluency. We default to ACF Blocks and reach for native React blocks when the interactivity justifies the cost.",
        ],
      },
      {
        heading: "Headless WordPress: WPGraphQL + Next.js",
        body: [
          "Headless WordPress separates the content management (WordPress admin, content model, editorial workflow) from the rendering (Next.js, Astro, or another frontend framework). The frontend pulls content from WordPress via the REST API or, preferably, via WPGraphQL (a GraphQL API for WordPress). The benefits: frontend performance of a modern JS framework (LCP <1s, Lighthouse 100), design flexibility beyond what WordPress themes allow, and the ability to use the same content in mobile apps or other channels.",
          "The trade-offs: headless WordPress is more expensive to build ($40K–$80K vs. $15K–$40K for a themed build), requires a separate deploy pipeline for the frontend (Vercel, Cloudflare Pages), and loses some plugin functionality (plugins that render to the frontend via shortcodes or PHP templates do not work in headless mode). We recommend headless WP for: large publishing sites with >100K monthly visitors where the performance delta drives SEO and ad revenue, multichannel content strategies (web + mobile + kiosk), and clients with an existing Next.js investment. We do not recommend headless WP for: small business sites (the cost is not justified), sites heavily dependent on frontend-rendering plugins (WooCommerce, LearnDash, MemberPress), or editorial teams that need to preview changes in the WordPress admin (headless preview is a known pain point).",
        ],
        jargon: [
          { term: "WPGraphQL", def: "A WordPress plugin that exposes the content model as a GraphQL API. The headless frontend queries for exactly the fields it needs, in a single request, with strong typing. Replaces the WordPress REST API for headless builds (fewer requests, better DX, typed schema)." },
          { term: "Next.js ISR with WPGraphQL", def: "Incremental Static Regeneration: the Next.js frontend renders WordPress content to static HTML at build time, revalidates on a schedule (e.g., every 60 seconds), and uses tag-based revalidation to refresh immediately when content changes in WordPress (via a webhook from WP to Next.js)." },
          { term: "Preview webhook", def: "A webhook from WordPress to Next.js that triggers an on-demand regeneration of a page when an editor clicks 'Preview'. Solves the headless preview pain point — the editor sees their draft changes in the Next.js frontend within 2–3 seconds of clicking Preview." },
        ],
      },
      {
        heading: "WooCommerce, MemberPress, LearnDash and the e-commerce stack",
        body: [
          "WooCommerce is the default e-commerce engine for WordPress, powering ~28% of all online stores as of 2025. A production WooCommerce build combines: WooCommerce core (free), a payment gateway (Stripe, PayPal, Square, or local gateways), a shipping plugin (WooCommerce Shipping or Table Rate Shipping), a tax plugin (TaxJar or WooCommerce Tax), and a performance layer (object cache via Redis, image optimization, CDN). A well-tuned WooCommerce store handles 100–500 orders/day on managed hosting; larger volumes require dedicated infrastructure or headless WooCommerce (Store API + Next.js frontend).",
          "MemberPress (membership sites with paid subscriptions and content gating) and LearnDash (LMS with courses, lessons, quizzes, certificates) are the dominant plugins for community and education sites. Both integrate with WooCommerce for physical/digital product sales alongside memberships/courses. The complexity is in the user journey: a visitor becomes a member, gets access to gated content, takes a course, earns a certificate, renews their subscription. We design this journey at the content-model level (custom post types for courses, lessons, certificates; ACF fields for video URLs, quiz questions, completion criteria) before configuring the plugins.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our WordPress stack is opinionated and battle-tested across 180+ production deployments. Every component below has shipped under real traffic — not just a demo on a fresh install.",
    ],
    categories: [
      {
        name: "Core platform & theming",
        items: [
          { name: "WordPress 6.5+", description: "The CMS core. Block editor (Gutenberg) for content, full-site editing for themes, REST API and WPGraphQL for headless." },
          { name: "PHP 8.2+", description: "The runtime. PHP 8.2 adds readonly properties, 8.3 adds typed class constants. We require PHP 8.2+ for all new builds — PHP 7.x is end-of-life and slower." },
          { name: "Bedrock (Roots)", description: "Modern WordPress structure with Composer for dependency management, environment-based config, and separated web/app directories. Replaces the classic wp-content folder structure." },
          { name: "Sage 10 (Roots)", description: "Modern WordPress theme with Blade templates, Tailwind CSS, and Laravel Mix for asset bundling. Our default for classic-theme builds." },
          { name: "ACF Pro", description: "Advanced Custom Fields Pro. Custom fields, flexible content, repeaters, galleries, and ACF Blocks. The foundation of every custom content model we build." },
        ],
      },
      {
        name: "Plugins, e-commerce & community",
        items: [
          { name: "WooCommerce", description: "E-commerce engine. Powers ~28% of all online stores. Combined with Stripe, WooCommerce Shipping, and TaxJar for production-grade storefronts." },
          { name: "MemberPress", description: "Membership plugin with subscription billing, content gating, and member management. Integrates with Stripe, PayPal, and Authorize.net." },
          { name: "LearnDash", description: "LMS plugin with courses, lessons, quizzes, assignments, certificates, and group management. The dominant WordPress LMS." },
          { name: "WPML / Polylang", description: "Multilingual plugins. WPML for full-featured multilingual sites with translation management; Polylang for lighter-weight multilingual needs." },
          { name: "Yoast SEO / RankMath", description: "SEO plugins with XML sitemaps, schema markup, OpenGraph, breadcrumb navigation, and content analysis. Yoast for established sites; RankMath for new builds (more features in the free tier)." },
        ],
      },
      {
        name: "Performance, security & hosting",
        items: [
          { name: "WP Rocket", description: "The dominant caching plugin: page caching, cache preloading, GZIP compression, lazy loading, database cleanup, and Heartbeat control. Pays for itself in 1 week of traffic." },
          { name: "Cloudflare (CDN + WAF + R2)", description: "Global CDN with 300+ POPs, Web Application Firewall, bot management, and R2 object storage for media offload. Free tier covers most SMB sites; Pro tier ($20/month) adds image optimization and WAF rules." },
          { name: "Redis Object Cache", description: "Persistent object cache via Redis. Caches database query results, reduces TTFB by 40–60% on database-heavy pages. Required for any site with WooCommerce or membership functionality." },
          { name: "Wordfence / Sucuri", description: "Security plugins with WAF, malware scanning, brute-force protection, and 2FA enforcement. Wordfence for real-time threat defense; Sucuri for cloud-based WAF and cleanup." },
          { name: "Cloudways / Kinsta / WP Engine", description: "Managed WordPress hosting with isolated containers, dedicated PHP-FPM pools, automatic backups, staging environments, and 24/7 support. Cloudways for cost-sensitive; Kinsta/WPE for premium support and performance." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "ThemeForest + shared hosting", "ClickTake Custom WP Build"],
      rows: [
        ["Custom block theme", "no:Bloated ThemeForest theme", "yes:Custom ACF Blocks"],
        ["LCP target", "no:4–8 seconds", "yes:<1.5 seconds"],
        ["TTFB", "no:1.8–4.5 seconds", "yes:200–400ms"],
        ["Plugin count", "no:25–40 (bloat)", "yes:6–10 (curated)"],
        ["Security stack", "no:None", "yes:Wordfence + 2FA + patches"],
        ["Lighthouse score", "no:30–60", "yes:95+"],
        ["Headless WP option", "no", "yes:WPGraphQL + Next.js"],
        ["Maintenance SLA", "no:Self-managed", "yes:Monthly retainer"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Launch in 5 Phases",
    intro: [
      "We ship WordPress sites in 6–14 weeks using a fixed five-phase lifecycle. The phases are sequenced so that the highest-leverage decisions (theme model, plugin stack, infrastructure, content model) are made before any code is written.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Content Model & Plugin Stack",
        duration: "Week 1–2",
        deliverables: ["Content model (CPTs, taxonomies, ACF fields)", "Plugin stack recommendation", "Hosting recommendation", "Design direction", "Sprint plan"],
        description:
          "We map the content types (pages, posts, custom post types for products/courses/events), the taxonomies (categories, tags, custom), the custom fields (ACF field groups for each content type), the plugin stack (6–10 plugins chosen for active maintenance, performance, and security), and the hosting recommendation (Cloudways for cost-sensitive, Kinsta/WPE for premium). We agree on the theme model (block theme vs. classic vs. headless), the design direction (Figma wireframes or a reference site), and the performance budgets (LCP <1.5s, TTFB <400ms, Lighthouse 95+).",
      },
      {
        phase: "Phase 2",
        title: "Foundation: Theme, Content Model, Staging",
        duration: "Week 2–4",
        deliverables: ["Custom theme scaffold (Bedrock + Sage or block theme)", "Custom post types + ACF fields registered", "Plugin stack installed", "Staging environment live", "CI for deploys"],
        description:
          "We stand up the project foundation: Bedrock structure with Composer for dependencies, custom theme scaffold (Sage 10 for classic, or a block theme with theme.json for new builds), custom post types and ACF field groups registered, the curated plugin stack installed and configured, and a staging environment on Cloudways/Kinsta/WPE with a CI deploy pipeline (GitHub Actions pushing to staging on merge). By end of week 4, the empty site is live on staging with the content model in place.",
      },
      {
        phase: "Phase 3",
        title: "Design Build & Custom Blocks",
        duration: "Week 4–9",
        deliverables: ["Custom theme designed and built", "Custom ACF Blocks (8–15 blocks)", "Page templates for key page types", "WooCommerce/MemberPress/LearnDash configured", "Content entered by editorial team"],
        description:
          "We design and build the custom theme: header, footer, page templates (home, about, blog, contact, landing page), single post template, archive templates. We build 8–15 custom ACF Blocks (hero, feature grid, testimonial, CTA, FAQ, pricing table, video embed, logo cloud, etc.) that the editorial team uses to compose pages in the block editor. We configure WooCommerce (products, checkout, shipping, tax), MemberPress (membership levels, content gating, billing), or LearnDash (courses, lessons, quizzes) as needed. The editorial team enters content in parallel with our build.",
      },
      {
        phase: "Phase 4",
        title: "Hardening: Performance, Security, SEO",
        duration: "Week 9–12",
        deliverables: ["WP Rocket + Cloudflare + Redis configured", "Image optimization pipeline", "Wordfence + 2FA + limited login attempts", "Yoast/RankMath configured with schema", "Lighthouse 95+ verified", "Security scan passed"],
        description:
          "We configure the performance stack: WP Rocket (page caching, lazy loading, GZIP, database cleanup), Cloudflare (CDN, image optimization, WAF, R2 for media offload), Redis Object Cache (database query caching). We optimize images (WebP conversion, responsive srcset, lazy loading). We configure the security stack: Wordfence (WAF, malware scan, brute-force protection), 2FA on all admin accounts, limited login attempts (5 per 15 minutes), patch management (automatic updates for minor releases, manual review for major). We configure Yoast or RankMath with XML sitemaps, schema markup (Article, Product, FAQ, Breadcrumb), OpenGraph, and breadcrumb navigation. We verify Lighthouse 95+ on all key page templates and pass a security scan with zero critical findings.",
      },
      {
        phase: "Phase 5",
        title: "Launch, Training & Maintenance",
        duration: "Week 12–14",
        deliverables: ["Production launch", "Editorial training (2 sessions)", "Maintenance SLA documentation", "30-day hypercare", "Handoff documentation"],
        description:
          "We cut over to production: DNS migration with zero downtime, 301 redirect map for any URL changes, search console submission, and uptime monitoring activation. We run two editorial training sessions (one for content editors, one for admins) covering the block editor, ACF Blocks, plugin management, and the maintenance workflow. We provide a 30-day hypercare period with daily uptime checks and weekly performance reviews. We hand off documentation: theme structure, plugin list, content model, maintenance runbook, and a recorded training video. Post-launch, we operate the site under a maintenance SLA ($300–$1,500/month depending on site size and update frequency).",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where WordPress Compounds Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the WordPress build we delivered, and the measurable result — not aspirational marketing copy.",
    ],
    cases: [
      {
        industry: "Business & Corporate Sites",
        problem: "A Birmingham-based professional services firm had a 7-year-old WordPress site on shared hosting, 32 plugins, 6-second LCP, and a Lighthouse score of 28. Organic traffic had declined 62% over 3 years. The site had been defaced twice in 12 months.",
        application: "Re-built as a custom block theme on Bedrock + Sage, 8 curated plugins, Cloudways hosting with Redis object cache, Cloudflare CDN + WAF, Wordfence + 2FA, ACF Blocks for the editorial team. 301 redirect map preserved all SEO equity.",
        result: "LCP fell from 6 seconds to 1.1 seconds. Lighthouse rose from 28 to 98. Organic traffic recovered to 110% of pre-decline baseline within 9 months. Zero security incidents in 24 months post-launch.",
      },
      {
        industry: "Publishing & Media",
        problem: "A niche publishing site had 80K monthly visitors on a slow WordPress install. Editorial team was frustrated with the page builder's editor experience. Ad revenue was capped by Core Web Vitals failures.",
        application: "Migrated to headless WordPress (WPGraphQL + Next.js 15 ISR) for the frontend, kept WordPress admin for editorial. Custom ACF Blocks for article components. Cloudflare CDN with image optimization. Webhook-driven revalidation on publish.",
        result: "LCP fell from 3.8s to 0.9s. Editorial workflow improved (faster previews, no page-builder friction). Ad revenue rose 38% within 60 days as Core Web Vitals passed and ad inventory became premium-eligible.",
      },
      {
        industry: "E-commerce (WooCommerce)",
        problem: "A UK-based retailer ran WooCommerce on shared hosting with 47 plugins. Checkout took 4.2 seconds, the cart page timed out under 50 concurrent users, and the conversion rate was 1.2% — half the industry benchmark.",
        application: "Re-platformed on Cloudways with dedicated PHP-FPM, Redis object cache, 12 curated plugins (down from 47), WP Rocket, Cloudflare CDN with Argo, Stripe payment gateway with Apple Pay/Google Pay, and a custom WooCommerce block theme. Image optimization via ShortPixel.",
        result: "Checkout time fell from 4.2s to 1.1s. Concurrent user capacity rose from 50 to 800. Conversion rate rose from 1.2% to 2.4%. Revenue grew 89% in the first 6 months at the same traffic level.",
      },
      {
        industry: "Membership & LMS",
        problem: "An online education provider ran LearnDash on a slow WordPress install. Course completion rate was 18% (industry benchmark: 30%). Members complained about slow lesson pages and broken video playback.",
        application: "Re-built with a custom block theme optimized for LearnDash, dedicated Cloudways hosting with Redis, Cloudflare Stream for video delivery, MemberPress for membership gating, and a custom progress-tracking block. Reduced plugin count from 24 to 9.",
        result: "Lesson page load time fell from 4.5s to 1.3s. Video playback failures fell to near-zero. Course completion rate rose from 18% to 34%. Member retention (90-day) rose from 61% to 78%.",
      },
      {
        industry: "Multilingual Sites",
        problem: "A Dubai-based professional services firm needed a 4-language site (English, Arabic, French, Mandarin) with RTL support for Arabic. The previous single-language site was losing deals from non-English-speaking markets.",
        application: "Custom block theme with WPML for multilingual management, RTL-aware CSS, Cloudflare for geo-routing to the right default language, dedicated Arabic typography (IBM Plex Sans Arabic), and hreflang tags for SEO.",
        result: "Site launched in 4 languages. Organic traffic from non-English markets grew 280% in 6 months. Inbound inquiries from Arabic-speaking markets rose 4.2x. Deal win rate from non-English-speaking prospects rose from 8% to 31%.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: WordPress Build Patterns & Hosting",
    intro: [
      "An objective comparison of the WordPress build patterns and hosting tiers teams consider. We have shipped all of them — the right choice depends on your traffic, budget, editorial workflow, and performance requirements.",
    ],
    tables: [
      {
        title: "WordPress build patterns: custom block theme vs. classic Sage vs. headless WP vs. ThemeForest",
        headers: ["Dimension", "ThemeForest + page builder", "Custom classic Sage", "Custom block theme", "Headless WP + Next.js"],
        rows: [
          ["Build cost", "yes:$3K–$15K", "maybe:$15K–$40K", "yes:$20K–$50K", "no:$40K–$80K"],
          ["LCP achievable", "no:4–8s", "yes:1.2–2s", "yes:1.0–1.5s", "yes:0.6–1.2s"],
          ["Editorial DX", "no:Page builder friction", "yes:Classic editor", "yes:Block editor", "maybe:WP admin + Next.js preview"],
          ["Plugin compatibility", "yes:Full", "yes:Full", "yes:Full", "no:Frontend-rendering plugins break"],
          ["Multichannel (web + mobile)", "no", "no", "no", "yes:Same content API"],
          ["Best for", "Tight budget, throwaway sites", "Complex layouts, legacy migration", "Marketing, publishing, SMB e-commerce", "High-traffic publishing, multichannel"],
        ],
      },
      {
        title: "Hosting tiers: shared vs. managed WP vs. dedicated vs. headless CDN",
        headers: ["Dimension", "Shared ($5–$15/mo)", "Managed WP ($30–$200/mo)", "Dedicated ($200–$1K/mo)", "Headless CDN (Vercel + WP)"],
        rows: [
          ["TTFB", "no:1.8–4.5s", "yes:200–400ms", "yes:150–300ms", "yes:100–200ms"],
          ["Concurrent users", "no:50–200", "yes:500–2,000", "yes:5,000–20,000", "yes:10,000–100,000"],
          ["Isolation", "no:Shared container", "yes:Isolated container", "yes:Dedicated server", "yes:Edge-cached"],
          ["Staging environment", "no:Manual", "yes:1-click", "yes:Multiple", "yes:Preview deploys"],
          ["Best for", "Hobby, low-traffic", "SMB, e-commerce, membership", "High-traffic publishing", "Headless WP, viral traffic"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: SEO Traffic, Conversion & Security",
    intro: [
      "WordPress builds earn their budget back through four mechanisms: SEO traffic lift (Core Web Vitals are a ranking factor and most bloated WP sites fail them), conversion lift (faster pages convert better — 100ms = 1–8% conversion lift per industry studies), security risk reduction (the avoided cost of a single defacement or data breach typically exceeds the entire build cost), and editorial productivity (a well-built block theme lets editors ship pages in hours, not days). The numbers below are aggregated across 180+ WordPress deployments shipped 2022–2026.",
    ],
    metrics: [
      { value: "1.1s", label: "Avg. LCP post-build", description: "Across all production WordPress sites we operate, measured on field CrUX data." },
      { value: "94", label: "Avg. Lighthouse score", description: "Performance score on the homepage of all production WordPress sites we ship." },
      { value: "62%", label: "Avg. organic traffic recovery", description: "On SEO rescue engagements where the prior site had Core Web Vitals failures." },
      { value: "0", label: "Security incidents (24mo)", description: "Across all production WordPress sites under our maintenance SLA in 2024–2025." },
    ],
    body: [
      "SEO traffic lift is the most directly attributable impact. Google's Core Web Vitals are a confirmed ranking factor — sites that fail them get demoted in search results, sites that pass them get promoted. A Birmingham professional services firm we re-platformed saw LCP move from 6 seconds to 1.1 seconds, Lighthouse from 28 to 98, and organic traffic recover from 62% below their pre-decline baseline to 110% of baseline within 9 months. The recovered traffic translated to ~£340K of additional annual revenue from inbound inquiries — the entire build cost was recovered in the first 7 weeks post-launch.",
      "Conversion lift compounds with SEO traffic. The same firm saw inbound inquiry conversion rise from 1.8% to 3.4% after the re-platform — the faster site kept visitors engaged longer and the cleaner design guided them to the contact form. For a WooCommerce client, checkout time fell from 4.2 seconds to 1.1 seconds, and conversion rate doubled from 1.2% to 2.4% — translating to 89% revenue growth at the same traffic level within 6 months. Industry research (Akamai 2017, Google SOASTA 2017, Deloitte 2020) consistently shows 100ms of latency improvement lifts conversion 1–8% across verticals; we see the same pattern in our WordPress data.",
      "Security risk reduction is the impact that does not show up on the ROI spreadsheet until the first avoided incident. The average cost of a WordPress defacement (cleanup, reputation damage, lost traffic during recovery) is $5K–$25K for an SMB; the average cost of a WooCommerce data breach (PCI fines, customer notification, legal exposure) is $50K–$500K. Our maintenance SLA clients have had zero security incidents in 24 months across 80+ sites — the avoided incident cost alone pays for the maintenance retainer many times over. The editorial productivity impact is harder to measure but real: a well-built block theme lets a single editor ship a landing page in 2–4 hours versus 1–2 days on a page-builder theme — a 4x productivity multiplier that compounds across the editorial team's yearly output.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "WordPress sites integrate with the rest of your marketing, e-commerce, analytics and security stack. The lists below cover the integrations we ship most often; if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "E-commerce, membership & LMS",
        items: ["WooCommerce + Stripe / PayPal / Square", "MemberPress (subscriptions + gating)", "LearnDash (courses + LMS)", "LifterLMS (alternative LMS)", "Easy Digital Downloads (digital products)", "Subscriptio (subscription billing)", "WooCommerce Subscriptions"],
      },
      {
        name: "SEO, analytics & marketing",
        items: ["Yoast SEO / RankMath", "Google Analytics 4 + Tag Manager", "Google Search Console", "PostHog / Plausible / Fathom", "HubSpot / Salesforce / Pipedrive CRM", "Mailchimp / Klaviyo / ActiveCampaign", "Meta Pixel / TikTok Pixel / LinkedIn Insight"],
      },
      {
        name: "Multilingual & localization",
        items: ["WPML (full multilingual with translation management)", "Polylang (lighter multilingual)", "TranslatePress (front-end translation)", "Loco Translate (plugin/theme string translation)", "Cloudflare geo-routing", "hreflang tags for SEO", "RTL CSS for Arabic / Hebrew"],
      },
      {
        name: "Performance, security & hosting",
        items: ["WP Rocket (caching)", "Cloudflare (CDN + WAF + R2)", "Redis Object Cache", "Wordfence / Sucuri (security)", "ShortPixel / Imagify (image optimization)", "Cloudways / Kinsta / WP Engine (hosting)", "Vercel / Cloudflare Pages (headless)"],
      },
    ],
    compliance: ["GDPR (cookie consent, data export, data deletion)", "PCI DSS (Stripe-hosted fields for WooCommerce)", "WCAG 2.2 AA (accessibility)", "ISO 27001 (architecture-ready)", "SOC 2 (architecture-ready)", "CCPA (California privacy)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Birmingham-based professional services firm, 35 staff, ~£4.2M annual revenue",
        situation: "The firm's 7-year-old WordPress site ran on shared hosting (£8/month) with 32 plugins including a ThemeForest page builder. LCP was 6.4 seconds, Lighthouse performance was 28, TTFB was 3.2 seconds. Organic traffic had declined 62% over 3 years as Google's Core Web Vitals updates demoted the site. The site had been defaced twice in 12 months — once via an abandoned plugin vulnerability, once via a brute-forced admin password. The firm was losing 2–3 inbound inquiries per week to competitors with faster, better-ranking sites. Estimated revenue impact of the decline: £340K/year in lost inbound work.",
        task: "Re-build the site to LCP <1.5s, Lighthouse 95+, zero security incidents, and recover organic traffic to pre-decline baseline within 9 months. Preserve all SEO equity (URLs, redirects, backlinks). Stay on WordPress — the firm's marketing team was fluent in the admin and did not want to learn a new CMS. Budget: £35K including 12 months of maintenance.",
        action: "ClickTake ran a 12-week engagement. The new architecture: Bedrock + Sage 10 custom classic theme (chosen because the design required complex layouts the block editor could not express cleanly in v6.4), 8 curated plugins (down from 32) covering SEO (RankMath), security (Wordfence + 2FA + limited login attempts), performance (WP Rocket + Redis Object Cache), forms (Gravity Forms), analytics (GA4 + Tag Manager), backups (UpdraftPlus), multilingual preparation (WPML installed but not activated for phase 2), and ACF Pro for the custom content model. Hosting moved from shared (£8/month) to Cloudways on DigitalOcean (£28/month) with dedicated PHP-FPM, Redis, and automatic daily backups. Cloudflare Pro ($20/month) added for CDN, image optimization, and WAF. We wrote a 412-URL 301 redirect map preserving all SEO equity from the legacy URL structure. The content model was redesigned with 4 custom post types (services, case studies, team members, insights) and 6 ACF field groups. Two editorial training sessions were delivered.",
        result: "LCP fell from 6.4s to 1.1s (5.8x improvement). Lighthouse rose from 28 to 98. TTFB fell from 3.2s to 240ms. Organic traffic recovered to 110% of pre-decline baseline within 9 months (vs. the firm's 3-year decline). Inbound inquiries rose from 8/week to 19/week. Inbound inquiry conversion rose from 1.8% to 3.4%. Estimated annual revenue impact: £410K in additional inbound work. Zero security incidents in 24 months post-launch. The firm's marketing team ships 4–6 landing pages per month without engineering involvement, vs. 1 every 6 weeks on the old page-builder theme.",
        quote: {
          text: "We thought we needed to leave WordPress. We didn't — we needed to leave the bad WordPress build. The new site is faster, ranks higher, and our team can update it without calling a developer. The ROI was visible in the first month.",
          author: "Marketing Director",
          title: "Birmingham professional services firm",
        },
      },
      {
        client: "UK-based online retailer, ~£2.8M annual WooCommerce revenue, 1,200 SKUs",
        situation: "The WooCommerce store ran on shared hosting with 47 plugins including 5 page builders, 3 caching plugins (conflicting with each other), and 4 abandoned plugins with known vulnerabilities. Checkout took 4.2 seconds, the cart page timed out under 50 concurrent users during sales events, and the conversion rate was 1.2% — half the industry benchmark of 2.4%. The team had been told WooCommerce 'could not scale' and was evaluating a migration to Shopify Plus estimated at £80K + £2K/month.",
        task: "Reduce checkout time to under 1.5 seconds, sustain 500+ concurrent users during sales events, lift conversion rate to 2%+, and stay on WooCommerce (the team's inventory and order management workflows were deeply integrated). Budget: £42K including 12 months of maintenance.",
        action: "ClickTake ran a 10-week engagement. The new architecture: custom block theme (the design fit the block model cleanly), 12 curated plugins (down from 47) covering WooCommerce core + Stripe + Apple Pay/Google Pay + WooCommerce Shipping + TaxJar + WP Rocket + Redis Object Cache + RankMath + Wordfence + 2FA + Gravity Forms + GA4. Hosting moved from shared (£12/month) to Cloudways on AWS ($90/month) with dedicated PHP-FPM, Redis, automatic scaling, and a staging environment. Cloudflare Pro ($20/month) added for CDN, image optimization, and bot management (critical for sale events). Image optimization via ShortPixel (WebP conversion, responsive srcset). We re-architected the checkout flow to use WooCommerce Blocks (faster than the classic shortcode checkout) and pre-loaded the Stripe payment intent on cart page load. Database optimized: removed orphaned post meta, added indexes on common query columns, configured Redis to cache product queries.",
        result: "Checkout time fell from 4.2s to 1.1s (3.8x improvement). Concurrent user capacity rose from 50 to 800 (sustained during a Black Friday event with 1,200 concurrent users). Conversion rate rose from 1.2% to 2.4% (matching the industry benchmark). Revenue grew 89% in the first 6 months at the same traffic level — translating to ~£2.5M in additional annual revenue. The Shopify Plus migration was cancelled, saving the £80K migration cost and £24K/year in platform fees. Cloud spend rose from £12/month to £110/month — a £1,176/year increase that returned £2.5M in revenue. Zero security incidents in 18 months post-launch.",
        quote: {
          text: "We were 3 weeks away from signing a Shopify Plus contract. ClickTake proved WooCommerce was never the problem — our build was. We saved the migration cost, kept our inventory workflows, and grew revenue 89% in 6 months.",
          author: "Founder & CEO",
          title: "UK-based online retailer",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most WordPress questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a custom WordPress site cost to build?",
            a: "Build cost ranges from $15K (custom classic theme, 4–6 page templates, 6 curated plugins, managed hosting setup) to $80K (headless WordPress with WPGraphQL + Next.js, custom block theme, WooCommerce + MemberPress + LearnDash integration, multi-language, and 6-month maintenance SLA). The dominant cost drivers are: theme model (block theme is fastest to build; headless is most expensive), e-commerce complexity (WooCommerce adds 2–3 weeks; WooCommerce + subscriptions + memberships adds 4–5 weeks), multilingual scope (each language adds 1 week for translation setup), and editorial training (2 sessions included; additional sessions $500 each).",
          },
          {
            q: "What is the typical timeline from kickoff to launch?",
            a: "6–14 weeks for most engagements. The 5-phase lifecycle is: Discovery (2 weeks), Foundation (2 weeks), Design Build & Custom Blocks (5 weeks), Hardening (3 weeks), Launch & Training (2 weeks). Simple business sites with 6–8 page templates ship in 6–8 weeks; e-commerce or membership sites with custom integrations take 10–12 weeks; headless WordPress builds take 12–14 weeks. We do not commit to a launch date until discovery is complete.",
          },
          {
            q: "What does ongoing maintenance cost?",
            a: "Monthly maintenance ranges from $300 (small business site, weekly updates, daily backups, uptime monitoring) to $1,500 (e-commerce or membership site, daily updates, real-time monitoring, monthly performance reviews, priority support). The retainer covers: WordPress core updates, plugin updates (with compatibility testing), theme updates, daily off-site backups, uptime monitoring (1-minute checks), security monitoring (Wordfence alerts), and monthly performance reviews. Most production WordPress sites settle at $400–$800/month.",
          },
          {
            q: "Should we use WordPress, or migrate to Webflow / Shopify / a custom build?",
            a: "Use WordPress for: content-driven sites (publishing, marketing, business), e-commerce with complex inventory (WooCommerce), membership/LMS sites (MemberPress/LearnDash), multilingual sites (WPML is best-in-class), and any team already fluent in the WordPress admin. Use Shopify for: pure e-commerce with simple inventory and a non-technical team. Use Webflow for: marketing sites where the design team wants visual editing without code. Use a custom Next.js build for: SaaS products, web apps, or sites with extreme performance requirements. We have shipped all four — the right choice depends on content type, team, and budget, not on a 'WordPress is bad' myth.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "Block theme or classic theme — which should we use?",
            a: "Block theme for: new marketing sites, publishing sites, and small e-commerce where the design fits the block model. Block themes ship less PHP, give editors more control via the Site Editor, and are the future of WordPress theming. Classic theme (Sage 10) for: legacy sites we are maintaining without a re-theme, complex layouts the block editor cannot express cleanly, and sites where the editorial team prefers the classic widget/menu admin. We also build 'hybrid' themes — classic structure with block-editor support — for incremental migrations. The choice is driven by the design, the editorial workflow, and the migration strategy, not by a 'block themes are always better' dogma.",
          },
          {
            q: "ACF Blocks or native React Gutenberg blocks?",
            a: "ACF Blocks for 90% of custom blocks. The editor gets an ACF field group UI (familiar), the developer writes a PHP template for the render (fast, no React required). Ships in 1–2 days per block. Native React blocks for blocks with complex interactivity (a configurator, a booking widget, a dynamic chart) where the editor needs to see the result as they edit. Native blocks take 3–5 days per block and require React fluency. We default to ACF Blocks and reach for native React blocks when the interactivity justifies the cost.",
          },
          {
            q: "Headless WordPress — when is it worth it?",
            a: "Headless WP (WPGraphQL + Next.js) is worth it for: large publishing sites with >100K monthly visitors where the performance delta drives SEO and ad revenue, multichannel content strategies (web + mobile + kiosk), and clients with an existing Next.js investment. It is NOT worth it for: small business sites (the cost is not justified), sites heavily dependent on frontend-rendering plugins (WooCommerce, LearnDash, MemberPress — these lose functionality in headless mode), or editorial teams that need to preview changes in the WordPress admin (headless preview is a known pain point). The cost premium is ~$25K–$40K over a themed build; the performance premium is LCP 0.6–1.2s vs. 1.0–1.5s.",
          },
          {
            q: "How do you handle multilingual WordPress sites?",
            a: "WPML for full-featured multilingual with translation management (translation memory, professional translator integration, content copying across languages). Polylang for lighter-weight multilingual needs (no translation management, simpler UI). TranslatePress for front-end translation (editor translates directly on the page). We default to WPML for any site with 3+ languages or professional translation workflows, Polylang for 2-language sites with in-house translators. All three plugins produce proper hreflang tags for SEO, RTL CSS for Arabic/Hebrew, and language-aware URL structures (/en/, /ar/, /fr/).",
          },
        ],
      },
      {
        name: "Performance & Security",
        questions: [
          {
            q: "How fast will the site be?",
            a: "On a custom block theme with managed hosting and the performance stack (WP Rocket + Redis + Cloudflare): LCP 1.0–1.5s, TTFB 200–400ms, Lighthouse 95+. On headless WordPress with Next.js: LCP 0.6–1.2s, Lighthouse 100. These are not aspirational targets — they are what we measure on production traffic across 180+ sites. If your site is slower than this at launch, we have a configuration issue, not a marketing problem.",
          },
          {
            q: "How do you handle WordPress security?",
            a: "Five layers: (1) Wordfence WAF with real-time threat defense (blocks brute-force, exploit attempts, and malicious traffic at the edge); (2) 2FA on all admin accounts (TOTP via Wordfence or Authy); (3) limited login attempts (5 per 15 minutes per IP, exponential backoff); (4) patch management (automatic updates for WordPress minor releases, manual review and testing for major releases and plugin updates); (5) daily off-site backups with 30-day retention (UpdraftPlus to S3-compatible storage). Our maintenance SLA clients have had zero security incidents in 24 months across 80+ sites.",
          },
          {
            q: "How do you handle WooCommerce performance?",
            a: "Four layers: (1) Redis Object Cache for database query caching (reduces TTFB by 40–60% on product and category pages); (2) Cloudflare CDN with image optimization and bot management (critical for sale events); (3) WooCommerce Blocks checkout (faster than the classic shortcode checkout, 1.1s vs. 4.2s in our case study); (4) database optimization (orphaned post meta cleanup, indexes on common query columns, scheduled cleanup of expired transients). With all four, a WooCommerce store handles 500–800 concurrent users on $90–$200/month hosting; without them, the same store times out at 50 concurrent users.",
          },
          {
            q: "Do you offer SEO services for WordPress?",
            a: "Yes — we configure Yoast or RankMath with XML sitemaps, schema markup (Article, Product, FAQ, Breadcrumb, LocalBusiness), OpenGraph, breadcrumb navigation, and content analysis. We write the 301 redirect map for migrations, submit to Google Search Console, and configure GA4 with Tag Manager. For ongoing SEO (content production, link building, technical audits), our digital marketing team offers a separate retainer — see the SEO Services page. WordPress is the easiest CMS to make SEO-visible, but the SEO work itself (keyword research, content production, link building) is a separate discipline from the WordPress build.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most WordPress engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. We use Linear for issue tracking, GitHub for code (private repos for theme/plugin code), Slack Connect for daily communication, and Loom for async walkthroughs.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All custom theme code, custom plugin code, ACF field groups, and documentation built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work. Third-party plugins and themes remain under their original licenses (we provide a complete license inventory at handoff).",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the site under a maintenance SLA ($300–$1,500/month depending on site size and update frequency); (2) ClickTake hands off to your team after a 30-day hypercare period with full documentation, training videos, and a recorded code walkthrough; (3) Hybrid — ClickTake handles core updates, security monitoring, and quarterly performance reviews, your team handles content and minor plugin updates. Most clients start with option 1 and migrate to option 3 after 6–12 months as their team's WordPress fluency grows.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build (or Rescue) Your WordPress Site?",
    subtitle:
      "Book a free 30-minute WordPress strategy call. We will review your current site's performance, security and SEO, sketch the target architecture on a whiteboard with you, and tell you honestly whether a full re-build is the right call — or whether targeted fixes to your hosting, plugin stack, or theme would deliver 80% of the value at 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min WordPress call",
        description: "Free. No deck. We run a Lighthouse audit on your current site live and tell you what to fix first.",
      },
      {
        step: "2",
        title: "1-week discovery phase",
        description: "$3K–$5K fixed. We produce the content model, plugin stack recommendation, hosting recommendation, and a fixed quote for the full build.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly maintenance cost, SLA, and performance targets — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free WordPress Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the WordPress Performance Brief", href: "/resources", variant: "outline" },
  },
}
