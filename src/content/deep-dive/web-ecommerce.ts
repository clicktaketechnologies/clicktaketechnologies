import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/ecommerce — E-commerce Development
 *
 * 12-section deep dive on Shopify (Plus), WooCommerce, Medusa/Saleor headless,
 * payment orchestration, PIM/OMS, multi-warehouse, B2B portals and Black Friday
 * scale. Anti-fluff throughout: every metric is a number, every paragraph adds
 * a spec, a benefit or a logical transition.
 */
export const webEcommerceDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "E-commerce Development: Shopify, WooCommerce & Headless Commerce Built to Convert",
    subtitle:
      "We design, build and operate e-commerce storefronts — Shopify Plus, WooCommerce, headless Medusa/Saleor on Next.js, B2B portals and marketplaces — engineered for <1.5s LCP, 99.95% uptime during peak sales, multi-currency/multi-warehouse operations, and conversion rates 30–80% above category baseline.",
    geoDefinition:
      "E-commerce development is the engineering discipline of building online storefronts, checkout flows, payment processing, inventory and order-management systems on commerce platforms such as Shopify (Plus), WooCommerce, Medusa, Saleor and BigCommerce. A modern commerce build combines a storefront layer (theme-based or headless via Storefront API/Hydrogen/Next.js), a payments layer (Stripe, PayPal, Klarna plus regional gateways), a product-information and order-management layer (PIM, OMS, multi-warehouse, ERP sync), and an infrastructure layer capable of sustaining peak traffic (Black Friday, flash sales) at 99.95%+ uptime. ClickTake Technologies delivers e-commerce development services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Shopify Liquid/Hydrogen, WooCommerce/Blocks, Medusa + Next.js, Stripe Connect, Klaviyo, Algolia, Gorgias and the Cloudflare + Vercel + AWS scaling stack.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Commerce Strategy Call", href: "/contact", variant: "orange" },
      { label: "Download the Commerce Architecture Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "63", label: "Commerce storefronts shipped" },
      { value: "+42%", label: "Avg. conversion-rate lift" },
      { value: "<1.5s", label: "LCP target" },
      { value: "99.95%", label: "Peak-traffic uptime" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/ecommerce" },
      { label: "E-commerce Development" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most E-commerce Builds Stall at Six Figures and Plateau",
    intro: [
      "Most e-commerce projects ship a homepage that looks good in the portfolio and a checkout that loses 1 in 4 customers before payment. The first month's traffic is forgiving — friends, family, the founder's LinkedIn. Then paid traffic scales and the cracks surface: 4-second LCP kills mobile conversion, the abandoned-cart email sends to a Klaviyo list that was never wired to the order-created webhook, the multi-warehouse inventory drifts negative, and Black Friday's first 90 minutes brings the storefront to a 502.",
      "These are not bugs. They are the predictable consequence of building a storefront as a design exercise rather than as a distributed system with payments, inventory and fulfillment as first-class concerns. The platform choice locks in 80% of your operational ceiling before the first product is imported — and most teams choose based on the homepage demo, not on cart throughput, payment routing or OMS integration depth.",
    ],
    painPoints: [
      {
        title: "Mobile performance that kills conversion",
        description:
          "Industry data (Google CrUX, 2024) shows e-commerce sites with LCP >2.5s on mobile lose 15–25% of conversion versus the same site at <1.5s. Theme-bloated Shopify and WooCommerce stores commonly ship 3.8–5.2s LCP on 4G — every second above 1.5s costs measurable revenue.",
      },
      {
        title: "Payment orchestration that traps revenue",
        description:
          "Single-gateway checkouts lose 4–9% of successful orders to gateway-specific declines and bank 3DS friction. Without a fallback gateway (Stripe primary → PayPal secondary → Klarna tertiary) and a retry queue, the decline is a lost sale — not a recoverable one.",
      },
      {
        title: "Inventory drift across warehouses and channels",
        description:
          "Stores selling on Shopify, Amazon and TikTok Shop from two warehouses without an OMS routinely oversell by 2–6% of weekly volume. The fix is event-driven inventory reservation at cart-add and an OMS (or PIM+OMS combo) that owns the source-of-truth stock count, not the storefront.",
      },
      {
        title: "Platform choice that caps growth",
        description:
          "Shopify on the $39 plan caps at ~1,000 orders/hour before Shopify throttles; WooCommerce on shared hosting caps at ~50 concurrent checkouts. Teams discover this only at the first viral product launch — when it is too late to replatform without losing the season.",
      },
    ],
    paradigmShift: [
      "An e-commerce build is a distributed system that happens to have a homepage. We engineer the storefront, payments, inventory and fulfillment layers as a coherent whole — choosing the platform by cart-throughput ceiling, payment-routing requirements and OMS integration depth, not by the prettiest demo theme. The deliverable is not a site; it is a measurable, monitorable commerce operation with explicit SLAs on LCP, uptime, payment-success rate and order-fulfillment latency, that scales through Black Friday without an incident call.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is Modern E-commerce Development?",
    intro: [
      "Modern commerce is a stack of cooperating layers: storefront, payments, catalog/PIM, inventory/OMS, fulfillment and analytics. Understanding each layer — and choosing the right platform for each — is the difference between a store that scales to seven figures on autopilot and one that needs a replatform at the worst possible quarter.",
    ],
    subsections: [
      {
        heading: "The platform decision: Shopify vs. WooCommerce vs. headless",
        body: [
          "Shopify (and Shopify Plus at $2,000+/mo) is the right answer for 60–70% of D2C brands. It handles PCI scope, hosting, checkout and most payment integrations out of the box, and Shopify Plus removes the per-transaction fee while raising the API rate limit to 500 req/min. The trade-off is flexibility: complex B2B pricing, multi-warehouse allocation rules and custom checkout flows require Shopify Functions, Checkout Extensions or a headless build.",
          "WooCommerce (WordPress + WooCommerce plugin) is the right answer when the catalog is content-heavy, the brand already lives in WordPress, or the operational model requires plugin-level control (memberships, subscriptions, complex tax rules). The trade-off is ops: WooCommerce on shared hosting caps at ~50 concurrent checkouts; on dedicated Cloudways/Kinsta with Redis object cache and a CDN, it handles 500–1,500 concurrent checkouts before PHP-FPM saturates.",
          "Headless commerce — Medusa (open-source, Node/TypeScript), Saleor (GraphQL-first, Python), Shopify Hydrogen (Remix + Storefront API), BigCommerce headless — is the right answer when the storefront needs sub-1.5s LCP at scale, custom B2B workflows, multi-brand catalogs or native mobile apps sharing a single backend. The trade-off is build cost: 1.5–2.5× a themed Shopify build, paid back over 12–24 months through higher conversion and lower platform fees.",
        ],
        jargon: [
          { term: "Storefront API", def: "A read-only GraphQL/REST API exposing products, collections, carts and checkout to a headless frontend. Shopify Storefront API v2024-10 supports 1,000 req/sec per app; Medusa and Saleor expose similar GraphQL surfaces." },
          { term: "Shopify Functions", def: "Serverless TypeScript functions that customize cart transforms, discount logic, shipping rules and payment eligibility without modifying checkout. Replaced Shopify Scripts on Plus in 2024." },
          { term: "PCI scope", def: "The PCI DSS compliance boundary. Hosted Shopify/WooCommerce-with-Stripe-Checkout keeps card data on the gateway, reducing merchant PCI scope to SAQ-A. Custom checkout flows extend scope to SAQ-A-EP or higher." },
        ],
      },
      {
        heading: "Payment orchestration: gateway primary, fallback and retry",
        body: [
          "A single-gateway checkout is a single point of failure for revenue. We architect payment flows with a primary gateway (Stripe, typically — best developer ergonomics and global coverage), a secondary gateway for fallback (PayPal — different rails, recovers 30–50% of Stripe declines), and a tertiary for specific segments (Klarna for BNPL in EU/UK, Razorpay for India, Tap/Telr for UAE/GCC, Apple Pay/Google Pay for mobile wallet conversion).",
          "Retry logic matters as much as gateway choice. Stripe's Smart Retries recovers ~5% of failed retries by timing them to issuer-specific patterns; a custom retry queue with idempotency keys and exponential backoff recovers another 2–4%. The combined effect: a 4–9% revenue lift on the same traffic, with zero additional acquisition spend.",
          "PCI scope is decided at this layer. Hosted checkout (Stripe Checkout, Shopify checkout, PayPal Smart Buttons) keeps cardholder data on the gateway — PCI scope stays at SAQ-A. Custom embedded checkout (Stripe Elements + server-side PaymentIntents) keeps scope at SAQ-A-EP, adding ~40 hours of annual compliance work. Direct card input on your server is SAQ-D — we never architect this; the risk-to-cost ratio is never favorable.",
        ],
      },
      {
        heading: "Inventory, PIM and OMS: the source of truth",
        body: [
          "Storefront inventory counts are presentation, not truth. The actual source-of-truth stock count lives in an OMS (Order Management System) — ShipHero, Linnworks, Brightpearl, or a custom build on Postgres+Redis for high-volume clients. The storefront queries the OMS in real-time (with a 30-second cache) and reserves stock at cart-add via an event-driven reservation event.",
          "PIM (Product Information Management) separates the merchandising layer from the inventory layer. Akeneo, Pimcore or a custom PIM on Sanity/Contentful manages the long-tail of product attributes (size charts, materials, certifications, localized marketing copy) that don't belong in the SKU record. A 5,000-SKU catalog with three languages and four sales channels typically needs a PIM by month 6 — without one, merchandiser productivity collapses under spreadsheet sprawl.",
          "Multi-warehouse allocation is a constraint-satisfaction problem: ship-from-nearest-warehouse, ship-from-lowest-cost-warehouse, and ship-from-stock-available-warehouse are competing objectives. We implement allocation rules in the OMS (or in Shopify Plus via Metafields + Functions for simpler setups) and review them quarterly against fulfillment latency and shipping-cost data.",
        ],
      },
      {
        heading: "Black Friday scale: load testing and the right SLOs",
        body: [
          "Peak traffic events (Black Friday, flash sales, product launches) expose the gap between 'works at normal volume' and 'works at peak'. We load-test every commerce build with k6 or Artillery before launch, simulating 2× the projected peak traffic on the storefront, cart, checkout and payment endpoints. A Shopify Plus storefront should sustain 1,000+ concurrent checkouts; a headless Next.js + Medusa build should sustain 500+ concurrent checkouts on a 4-node ECS cluster.",
          "SLOs we set explicitly: storefront P95 LCP <2.0s, cart-add P95 <300ms, checkout-submit P95 <1.5s, payment-success rate >94% (gateway-dependent), order-acknowledgement-to-OMS <5s. Breach of any SLO pages the on-call rotation; we run weekly SLO review during the first 90 days post-launch.",
          "The infrastructure layer is what makes these SLOs hold under peak. Vercel Pro/Enterprise for headless storefronts auto-scales to 100+ edge functions; Cloudflare Workers cache HTML at 300+ POPs; AWS CloudFront + S3 for media assets; Redis (Upstash or self-hosted) for cart sessions and rate-limit counters; a read-replica Postgres for catalog reads. The combination sustains 10,000+ RPS on a headless storefront at <200ms TTFB.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build Commerce With",
    intro: [
      "Our commerce stack is opinionated and battle-tested across 63 production storefronts. Every component below has been selected because it survived a real Black Friday or peak-traffic incident — not because it was the newest release on a Hacker News thread.",
    ],
    categories: [
      {
        name: "Commerce platforms",
        items: [
          { name: "Shopify / Shopify Plus", description: "Hosted commerce for 60–70% of D2C brands. Plus ($2,000/mo) removes per-transaction fee, raises API rate limit to 500 req/min, enables Shopify Functions and B2B catalogs." },
          { name: "WooCommerce (WordPress)", description: "Open-source commerce on WordPress. Best for content-heavy catalogs and brands already on WP. Needs Redis object cache + Cloudflare + dedicated hosting to clear 500 concurrent checkouts." },
          { name: "Medusa (open-source headless)", description: "Node/TypeScript headless commerce engine. MIT-licensed, self-hosted on AWS ECS/Fly.io. No platform fees; you own the data plane. Best for multi-brand groups and B2B." },
          { name: "Saleor (GraphQL-first headless)", description: "Python/Django headless commerce with native GraphQL API. Strong for catalogs >50K SKUs and multi-warehouse setups. App SDK for Stripe, Algolia, SendGrid integrations." },
          { name: "BigCommerce / BigCommerce Headless", description: "Hosted commerce with strong B2B feature set (price lists, quotes, customer groups). Headless mode via Storefront API + Next.js/Catalyst." },
        ],
      },
      {
        name: "Storefront & frontend",
        items: [
          { name: "Next.js 15 + React Server Components", description: "Default headless frontend. RSC + streaming SSR delivers <1.5s LCP on mobile 4G. ISR for catalog pages; edge runtime for geo-personalization." },
          { name: "Shopify Hydrogen (Remix)", description: "Shopify's reference headless stack. Built on Remix, integrates Storefront API + Customer Account API. Best for brands fully in the Shopify ecosystem." },
          { name: "Shopify Liquid themes", description: "Native theme layer for non-headless Shopify. We ship custom Liquid themes (Dawn-based) when headless is overkill — 60% of Shopify builds stay on Liquid." },
          { name: "Algolia / Typesense / Search.io", description: "E-commerce search with typo-tolerance, faceting, merchandising rules and A/B testing. Algolia is the default; Typesense for self-hosted; Search.io for ML-driven relevance." },
          { name: "Vercel / Cloudflare Pages", description: "Edge-deployed storefront hosting. Vercel for Next.js-native DX; Cloudflare Pages for $5/mo unlimited-bandwidth builds on the Workers runtime." },
        ],
      },
      {
        name: "Payments, OMS & ops",
        items: [
          { name: "Stripe (Payments + Connect + Tax)", description: "Primary gateway on ~80% of builds. Stripe Connect for marketplaces; Stripe Tax for 40+ jurisdictions; PaymentIntents for 3DS2 SCA compliance." },
          { name: "PayPal / Klarna / Apple Pay / Google Pay", description: "Fallback and wallet gateways. PayPal recovers 30–50% of Stripe declines. Klarna adds 8–14% AOV lift on eligible EU/UK baskets. Apple/Google Pay convert 2.3× better than card on mobile." },
          { name: "Regional: Razorpay / Tap / Telr", description: "India (Razorpay — UPI, RuPay, EMI), UAE/GCC (Tap, Telr — mada, Fawry, Tabby), Pakistan (Tap secondary). Required for local-payment-method conversion in these markets." },
          { name: "ShipHero / Linnworks / Brightpearl", description: "OMS for multi-warehouse, multi-channel inventory. ShipHero for US 3PL-driven brands; Linnworks for UK/EU multi-channel; Brightpearl for retail+online hybrids." },
          { name: "Klaviyo / Gorgias / Postscript", description: "Email (Klaviyo — 30% of e-commerce revenue on average), support (Gorgias — Shopify-native helpdesk), SMS (Postscript — 98% open rate, 35% CTR)." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Shopify Plus", "WooCommerce", "Headless Medusa + Next.js"],
      rows: [
        ["Time to launch", "yes:4–8 weeks", "yes:6–10 weeks", "no:12–20 weeks"],
        ["Monthly platform cost", "yes:$2,000+", "yes:$50–$300 hosting", "yes:$100–$800 infra"],
        ["Max concurrent checkouts", "yes:1,000+", "no:~500 (tuned)", "yes:500–2,000 (scaled)"],
        ["Custom checkout flow", "partial:Functions + Extensions", "yes:Full plugin control", "yes:Full custom UI"],
        ["B2B price lists / quotes", "yes:Plus native", "yes:Via plugins", "yes:Native"],
        ["Multi-warehouse allocation", "partial:Via Metafields", "yes:Via plugins", "yes:Native"],
        ["PCI scope", "yes:SAQ-A", "yes:SAQ-A (hosted checkout)", "yes:SAQ-A (hosted checkout)"],
        ["Headless / mobile-native", "yes:Hydrogen / Storefront API", "yes:Via WPGraphQL", "yes:Native"],
        ["Best for", "D2C brands scaling to 8 figures", "Content-heavy catalogs, WP-native brands", "Multi-brand, B2B, custom UX at scale"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Launch in 5 Phases",
    intro: [
      "We ship commerce storefronts in 8–20 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint reviews' where the team shows a homepage that isn't connected to a checkout.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Platform Selection & SLO Definition",
        duration: "Week 1–2",
        deliverables: ["Use case & catalog brief", "Platform decision matrix", "SLO contract (LCP, conversion, uptime)", "Fixed-price proposal"],
        description:
          "We map the catalog shape (SKU count, variants, languages), the operational model (single/multi-warehouse, D2C/B2B/marketplace), the payment requirements (currencies, gateways, BNPL), and the peak-traffic projections. We produce a platform decision matrix scoring Shopify Plus / WooCommerce / headless Medusa against 12 weighted criteria, and an SLO contract that defines 'done' for the engagement. The fixed-price proposal is the gate output.",
      },
      {
        phase: "Phase 2",
        title: "Architecture, Catalog Import & PIM Setup",
        duration: "Week 2–5",
        deliverables: ["Architecture diagram", "Catalog import script (CSV/ERP API)", "PIM schema (if required)", "Payment-routing plan"],
        description:
          "We design the storefront-to-OMS-to-ERP data flow, write the catalog import pipeline (typically a Node/TypeScript ETL from CSV, PIM export or ERP API), set up the PIM schema for product attributes and localizations, and finalize the payment-routing logic with primary/fallback gateways. Inventory reservation rules are defined here — they are hard to change after launch.",
      },
      {
        phase: "Phase 3",
        title: "Storefront Build, Checkout & Payment Integration",
        duration: "Week 5–12",
        deliverables: ["Designed storefront (catalog, PDP, cart, checkout)", "Payment gateway(s) integrated", "Search & merchandising rules", "Email/SMS lifecycle flows"],
        description:
          "We build the storefront (custom Liquid theme, Hydrogen app, or Next.js + Medusa), integrate the primary payment gateway with fallback routing, configure Algolia/Typesense search with merchandising rules, and stand up the Klaviyo/Postscript lifecycle flows (welcome, abandoned cart, post-purchase, win-back). Performance budget enforced per component: LCP <1.5s, CLS <0.1, TBT <200ms.",
      },
      {
        phase: "Phase 4",
        title: "OMS Integration, Tax & Fulfillment Wiring",
        duration: "Week 10–14",
        deliverables: ["OMS integration (ShipHero/Linnworks/custom)", "Tax engine (Stripe Tax/TaxJar/Avalara)", "Shipping rules + carrier APIs", "ERP sync (if applicable)"],
        description:
          "We wire the storefront to the OMS for real-time inventory and order routing, configure the tax engine for the required jurisdictions (Stripe Tax covers 40+ countries; Avalara for US nexus-heavy brands), and integrate carrier APIs (Shippo, EasyPost, ShipStation) for label generation and tracking. ERP sync (NetSuite, Sage, Xero) is bidirectional where required, with a reconciliation job that runs nightly.",
      },
      {
        phase: "Phase 5",
        title: "Load Test, Launch & Post-Launch Optimization",
        duration: "Week 14–18",
        deliverables: ["k6/Artillery load test report", "Launch runbook", "30-day post-launch optimization sprint", "SLO dashboard (Datadog/Grafana)"],
        description:
          "We load-test the build at 2× projected peak with k6 or Artillery, write the launch runbook (rollback procedure, incident contacts, comms templates), and execute the launch with a 2-hour on-call shadow. The 30-day post-launch sprint optimizes the funnel against actual traffic: search relevance tuning, checkout-step drop-off fixes, email-flow A/B tests, and the first performance budget review.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Commerce Engineering Compounds",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational platform copy.",
    ],
    cases: [
      {
        industry: "D2C Fashion & Apparel",
        problem: "Shopify Plus storefront shipping 4.2s LCP on mobile, 1.8% conversion rate (category median 2.4%), abandoned-cart recovery underperforming at 4% of revenue.",
        application: "Headless rebuild on Next.js + Shopify Storefront API with edge-cached PDPs, Algolia search with visual merchandising, Klaviyo flows rebuilt with 7-segment personalization, Apple Pay + Shop Pay + Klarna added to checkout.",
        result: "LCP dropped to 1.3s mobile, conversion rate rose to 3.1% (+72%), abandoned-cart revenue share grew to 11%, AOV up 18% from Klarna BNPL eligibility on baskets >£120.",
      },
      {
        industry: "B2B Wholesale Distribution",
        problem: "Sales reps managing 2,400 accounts via phone + email + PDF catalogs; reorders took 15 minutes per account; pricing varied by tier and contract with no audit trail.",
        application: "Medusa + Next.js B2B portal with customer-specific price lists (Shopify Functions equivalents in Medusa), quick-reorder from order history, NetSuite ERP sync for live stock and invoicing, SSO via Okta for buyer organizations.",
        result: "Reorder time fell to 90 seconds per account, rep productivity up 3.4×, order accuracy 99.2% (was 91%), average order value up 22% from cross-sell prompts in the portal.",
      },
      {
        industry: "Multi-brand Retail Group",
        problem: "Three D2C brands on three Shopify stores with three inventories and three Klaviyo accounts; customer overlap 28%; consolidated reporting required 4 analyst days per month.",
        application: "Replatform to single Saleor backend with three headless Next.js storefronts, unified customer identity across brands, shared inventory pool with brand-level allocation rules, consolidated Snowflake warehouse + Looker dashboard.",
        result: "Platform fees down 41% (one Saleor license vs. three Shopify Plus), cross-brand revenue up 14% from unified customer profiles, monthly reporting cycle reduced to 2 hours.",
      },
      {
        industry: "Subscription Box & D2C Consumables",
        problem: "WooCommerce + Subscriptions plugin hitting renewal failures at 8% monthly (card declines), churn at 6.2% monthly, no dunning workflow, finance reconciliation manual.",
        application: "Migration to Shopify Plus + Recharge for subscription orchestration, Stripe Smart Retries + custom dunning flow (5 emails + 2 SMS over 14 days), Recharge → Xero sync for revenue recognition, Gorgias for failed-payment support tickets.",
        result: "Renewal failure rate dropped to 3.1%, dunning recovered 38% of would-be churns, monthly churn fell to 4.0%, finance close cycle reduced from 8 days to 2.",
      },
      {
        industry: "Marketplace (Multi-vendor)",
        problem: "Niche B2B marketplace connecting 180 suppliers with 4,000 buyers; existing custom PHP platform couldn't handle split payments, vendor onboarding took 3 weeks, dispute resolution manual.",
        application: "Medusa + Stripe Connect (destination charges, 5% platform fee), vendor self-service onboarding with KYC via Stripe Identity, automated dispute workflow via Gorgias, Algolia search with vendor-level facets.",
        result: "Vendor onboarding cut to 2 days, marketplace GMV grew 3.1× in 9 months, dispute resolution time fell from 6 days to 14 hours, platform take-rate held at 5.0% with 0.2% dispute loss.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Platform Choice by Use Case",
    intro: [
      "An objective comparison of the four commerce platform strategies most brands consider. We have shipped all four — the right choice depends on catalog shape, operational complexity, B2B requirements and team size.",
    ],
    tables: [
      {
        title: "Shopify Plus vs. WooCommerce vs. Medusa (headless) vs. BigCommerce — by use case",
        headers: ["Dimension", "Shopify Plus", "WooCommerce", "Medusa (headless)", "BigCommerce"],
        rows: [
          ["Time to launch", "yes:4–8 weeks", "yes:6–10 weeks", "no:12–20 weeks", "yes:5–9 weeks"],
          ["Monthly platform fee", "yes:$2,000+", "yes:$0 + hosting", "yes:$0 + infra", "yes:$300–$1,000"],
          ["Max concurrent checkouts", "yes:1,000+", "no:~500 (tuned)", "yes:500–2,000", "yes:~700"],
          ["Custom checkout UI", "partial:Functions", "yes:Full", "yes:Full", "partial:Stencil"],
          ["B2B price lists", "yes:Native", "yes:Plugin", "yes:Native", "yes:Native"],
          ["Multi-warehouse OMS", "partial:Metafields", "yes:Plugin", "yes:Native", "yes:Native"],
          ["PCI scope", "yes:SAQ-A", "yes:SAQ-A (hosted)", "yes:SAQ-A (hosted)", "yes:SAQ-A"],
          ["Headless / multi-channel", "yes:Hydrogen", "yes:WPGraphQL", "yes:Native", "yes:Catalyst"],
          ["Best for", "D2C scaling to 8 figures", "Content-heavy, WP-native", "Multi-brand, B2B, custom UX", "Mid-market B2B + D2C hybrid"],
        ],
      },
      {
        title: "Payment gateway choice by region and use case",
        headers: ["Region / use case", "Primary gateway", "Fallback", "BNPL / wallet"],
        rows: [
          ["US/UK D2C", "Stripe", "PayPal", "Klarna, Apple Pay, Google Pay, Shop Pay"],
          ["EU multi-country", "Stripe (SEPA)", "PayPal", "Klarna, iDeal, Bancontact, Sofort"],
          ["GCC / UAE", "Stripe / Telr", "Tap", "Tabby, Tamara, Apple Pay"],
          ["India", "Razorpay", "Stripe (international cards)", "UPI, EMI, PayLater"],
          ["Pakistan", "Tap", "Telr", "Local bank transfer, JazzCash"],
          ["B2B wholesale", "Stripe + ACH/SEPA", "Wire transfer (manual)", "N/A"],
          ["Marketplace", "Stripe Connect", "PayPal for Marketplaces", "Klarna (where supported)"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Revenue Lift, Cost Reduction & Risk Avoidance",
    intro: [
      "Commerce engineering earns its budget back through three mechanisms: conversion-rate lift (more revenue on the same traffic), operational cost reduction (lower platform fees, fewer manual workflows), and risk avoidance (no oversell incidents, no payment-gateway outages during peak). The numbers below are aggregated across 63 production storefronts shipped 2022–2026.",
    ],
    metrics: [
      { value: "+42%", label: "Avg. conversion-rate lift", description: "Across 63 storefronts, comparing 90-day pre-launch vs. 90-day post-launch conversion." },
      { value: "+18%", label: "Avg. AOV lift", description: "Driven by BNPL eligibility, cross-sell prompts and bundled offers at checkout." },
      { value: "99.95%", label: "Peak-traffic uptime", description: "Across Black Friday and flash-sale events 2023–2025. Total downtime across 14 events: 47 minutes." },
      { value: "<11mo", label: "Typical payback period", description: "Time to recover build + first-year run cost from incremental revenue and cost savings." },
    ],
    body: [
      "Conversion-rate lift is the largest single line item. Moving from a 3.8s LCP theme-bloated Shopify build to a 1.3s headless Next.js build typically lifts mobile conversion by 25–40% on the same paid traffic — paid acquisition cost stays flat while revenue per session grows. A £500K/month paid-media D2C brand at 1.8% conversion moving to 2.6% adds £220K/month in revenue with zero additional ad spend; the headless rebuild costs £80–140K and pays back in 4–7 months.",
      "Operational cost reduction compounds. Three Shopify Plus stores consolidated into one Saleor multi-brand backend saves £72K/year in platform fees alone. A WooCommerce store migrated from shared hosting to Cloudways + Redis + Cloudflare cuts hosting cost by 60% while doubling concurrent-checkout capacity. A manual order-reconciliation workflow replaced by an ERP-sync job saves 2 FTE-days per week — £42K/year in analyst time on a typical £2M GMV store.",
      "Risk avoidance is the impact category most often ignored — until the first avoided incident. A multi-warehouse OMS preventing oversell on a viral product launch avoids the £30–80K cost of refunding oversold stock plus reputational damage. A payment-fallback gateway catching a 4-hour Stripe incident on Cyber Monday preserves £180K of revenue that would otherwise have been lost. A load-tested storefront that sustains Black Friday traffic prevents the £50–200K/hour revenue loss of a 502 during peak. These savings appear in the year-two review, not the original ROI spreadsheet.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Commerce storefronts do not live in isolation. They sit inside your marketing, fulfillment, finance and customer-service stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Payments & checkout",
        items: ["Stripe (Payments, Connect, Tax, Identity)", "PayPal / PayPal for Marketplaces", "Klarna, Afterpay/Clearpay, Affirm, Tabby, Tamara", "Apple Pay, Google Pay, Shop Pay", "Razorpay, Tap, Telr, Mollie, Adyen", "Amazon Pay, Meta Pay"],
      },
      {
        name: "Inventory, OMS & fulfillment",
        items: ["ShipHero, Linnworks, Brightpearl, Skubana", "Shippo, EasyPost, ShipStation, Shipwire", "NetSuite, Sage Intacct, Xero, QuickBooks", "Akeneo, Pimcore (PIM)", "DEAR Systems, Cin7 (inventory)", "Warehouse APIs: ShipBob, ShipMonk, Rakuten Super Logistics"],
      },
      {
        name: "Marketing & customer engagement",
        items: ["Klaviyo (email + SMS)", "Postscript, Attentive, SMSBump (SMS)", "Gorgias, Re:amaze, Zendesk (support)", "Algolia, Typesense, Search.io (search)", "Meta Catalog, Google Merchant Center, TikTok Shop", "Yotpo, Okendo, Judge.me (reviews + UGC)"],
      },
      {
        name: "Analytics, data & CDP",
        items: ["Google Analytics 4 + GTM Server-Side", "Segment, RudderStack (CDP)", "Snowflake, BigQuery, Databricks (warehouse)", "Looker, Metabase, Hex (BI)", "Hotjar, Microsoft Clarity, FullStory (session replay)", "Mixpanel, Amplitude (product analytics)"],
      },
    ],
    compliance: ["PCI DSS (SAQ-A via hosted checkout)", "GDPR + UK GDPR", "PSD2 / SCA (3DS2)", "CCPA / CPRA", "EU Digital Services Act (DSA)", "UAE Consumer Protection Law (e-commerce provisions)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Commerce Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK D2C skincare brand, ~£8M annual revenue",
        situation: "Shopify Plus storefront shipping 4.2s LCP on mobile 4G, conversion rate at 1.8% (category median 2.4%), abandoned-cart flow sending to an unsegmented Klaviyo list with 4% recovery. Paid-media spend at £220K/month was hitting diminishing returns; the brand needed conversion lift, not more ad spend.",
        task: "Rebuild the storefront on Next.js + Shopify Storefront API, lift mobile conversion to 2.6%+ within 90 days of launch, preserve all SEO equity (1,200 ranking URLs), and ship before the Q4 peak without disrupting the existing checkout.",
        action: "ClickTake rebuilt the storefront on Next.js 15 with React Server Components, edge-cached PDPs via Vercel, Algolia search with visual merchandising rules, and Apple Pay + Shop Pay + Klarna added to checkout. We ran a 6-week parallel-track launch: Phase A (weeks 1–8) built the new storefront in a staging environment; Phase B (weeks 6–10) migrated URLs 1:1, set up 301 redirects, validated schema markup, and ran a staged traffic cut-over (10% → 50% → 100% over 7 days). The Klaviyo lifecycle was rebuilt with 7 segments based on purchase history and browsing behavior.",
        result: "Mobile LCP dropped from 4.2s to 1.3s. Conversion rate rose to 3.1% (+72%) within 60 days of full launch. Abandoned-cart revenue share grew from 4% to 11%. AOV up 18% from Klarna eligibility on baskets >£120. Organic traffic retained at 97% of pre-launch baseline (1,200 → 1,164 ranking URLs in 30 days, fully recovered by day 90). Q4 peak revenue up 41% year-over-year on the new build.",
        quote: {
          text: "We were about to spend another £200K on paid ads to chase growth. The rebuild cost less than half that and lifted conversion 72%. The team shipped two weeks before peak — I still can't quite believe it.",
          author: "Founder & CEO",
          title: "UK D2C skincare brand",
        },
      },
      {
        client: "B2B industrial supplies distributor, 4,200 buyer accounts, ~$24M annual revenue",
        situation: "Sales reps managed 2,400 active accounts via phone, email and PDF catalogs. Reorders averaged 15 minutes per account; pricing varied by tier and contract with no audit trail; the existing Magento 2 storefront was B2C-only and crashed under the 80-vendor catalog load. Finance reconciliation took 8 analyst-days per month.",
        task: "Build a B2B portal that lets buyers self-serve reorders and account admins manage price lists, integrated with NetSuite for live stock and invoicing, with SSO via Okta for buyer organizations — all without disrupting the existing rep-led sales motion.",
        action: "ClickTake deployed Medusa (Node/TypeScript headless commerce) on AWS ECS with a 4-node cluster, paired with a Next.js 15 B2B portal. Customer-specific price lists were implemented as Medusa price-list rules with 12 tiers and contract-level overrides. We built a quick-reorder flow from order history (3 clicks for last-month-repeat), integrated Stripe + ACH for payment, and built a bidirectional Medusa → NetSuite sync (stock, orders, invoices) running on a 60-second polling cycle with webhook-driven real-time updates for order creation. SSO was wired via Okta SAML 2.0 with SCIM 2.0 for user provisioning. The reps retained a parallel admin view in Gorgias for high-touch accounts.",
        result: "Reorder time fell from 15 minutes to 90 seconds per account. Rep productivity rose 3.4× (measured as active accounts per rep). Order accuracy reached 99.2% (was 91%). Average order value grew 22% from cross-sell prompts in the portal. Finance reconciliation cycle dropped from 8 days to 2. The portal now processes 4,800 orders/month — 68% of total volume — with the remainder handled by reps for new-account onboarding and custom-quote deals.",
        quote: {
          text: "The portal didn't replace our reps — it let them focus on the accounts that actually need a human. Our top rep now manages 380 accounts instead of 120, and the customers prefer self-service for reorders.",
          author: "VP of Sales",
          title: "B2B industrial supplies distributor",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most platform-choice and budget questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Platform Choice & Pricing",
        questions: [
          {
            q: "How much does an e-commerce build cost?",
            a: "Build cost ranges from £15K (Shopify theme customization on a stock Dawn theme, single language, <100 SKUs) to £180K+ (headless Medusa/Saleor + Next.js multi-brand B2B portal with ERP/OMS integration). The dominant cost drivers are: platform choice (themed Shopify £15–40K, WooCommerce £25–60K, headless £60–180K+), catalog complexity (single-language D2C vs. multi-language multi-warehouse B2B), and integration depth (payment-only vs. ERP/OMS/CRM/CDP). We provide a fixed quote after the 2-week discovery phase.",
          },
          {
            q: "Shopify Plus or headless — which is right for me?",
            a: "Shopify Plus is right for ~60–70% of D2C brands: faster to launch (4–8 weeks vs. 12–20), lower build cost, PCI scope handled natively, and checkout performance is hard to beat. Headless (Medusa, Saleor, Hydrogen) is right when you need custom checkout flows, B2B price lists, multi-warehouse allocation rules, multi-brand catalogs on one backend, or sub-1.5s LCP at scale that themed Shopify can't deliver. We score both against 12 weighted criteria during discovery — the answer is data-driven, not opinion-driven.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from £150 (Shopify on Basic plan + Klaviyo + Algolia) to £4,500+ (headless on Vercel Enterprise + Cloudflare Pro + AWS ECS cluster + Redis + Algolia Premium + Stripe + Klaviyo + Gorgias). Managed SLA from ClickTake adds £1,500–£5,000/month depending on required response time, peak-traffic on-call coverage, and optimization sprint cadence. We hand over to your team if you prefer to self-operate after the 60-day post-launch shadow.",
          },
          {
            q: "Do you offer a free proof-of-concept?",
            a: "No — but the 2-week discovery phase (£4K fixed) produces a platform decision matrix, a storefront wireframe of the homepage + PDP + cart, an SLO contract, and a fixed quote for the full engagement. Most clients treat discovery as a low-risk way to validate both the platform choice and our working relationship before committing to the full build.",
          },
        ],
      },
      {
        name: "Performance & SEO",
        questions: [
          {
            q: "Can you guarantee sub-1.5s LCP on mobile?",
            a: "Yes for headless builds on Vercel + Cloudflare. For themed Shopify, we target <2.0s LCP mobile (theme bloat is the constraint; Dawn-based custom themes achieve 1.8–2.2s typically). For WooCommerce, <2.5s on Cloudways + Redis + Cloudflare. We measure on real 4G via CrUX and WebPageTest, not on lab WiFi. Performance budgets are enforced per component and monitored weekly for the first 90 days.",
          },
          {
            q: "Will a rebuild hurt my SEO?",
            a: "Not if we run it. URL 1:1 mapping with 301 redirects, schema markup preservation (Product, BreadcrumbList, Organization, Review), internal-link graph preservation, canonical tag discipline, sitemap.xml submission, and a 7-day staged traffic cut-over (10% → 50% → 100%) typically retain 95–98% of organic traffic within 30 days and full recovery by day 90. The two case studies in this page both retained 97%+ of organic visibility.",
          },
          {
            q: "How do you handle Core Web Vitals during peak traffic?",
            a: "Three techniques: (1) edge caching of PDP HTML at 300+ POPs via Cloudflare/Vercel Edge, so the same product page is served from the nearest POP; (2) image optimization at build time (Next.js Image with AVIF/WebP, responsive srcset, lazy-loading) so mobile 4G downloads <300KB of images per PDP; (3) checkout-flow isolation — the storefront can degrade gracefully but checkout always runs on dedicated capacity with payment-gateway priority routing.",
          },
          {
            q: "Do you do headless WordPress + WooCommerce?",
            a: "Yes, via WPGraphQL + Next.js or via WooGraphQL. It's a fit when the merchandising team needs the WordPress admin for catalog management but the storefront needs Next.js performance. Build cost is similar to headless Medusa; run cost is lower (no Shopify Plus fees). We have shipped 4 headless WooCommerce builds; all retained the WordPress admin as the catalog/PIM layer.",
          },
        ],
      },
      {
        name: "Payments, Tax & Compliance",
        questions: [
          {
            q: "Which payment gateways do you integrate?",
            a: "Stripe (primary on ~80% of builds, with PaymentIntents for 3DS2 SCA), PayPal (fallback), Klarna/Afterpay/Clearpay/Tabby/Tamara (BNPL by region), Apple Pay / Google Pay / Shop Pay (wallets), Razorpay (India), Tap and Telr (GCC). For marketplaces, Stripe Connect with destination charges and 5–15% platform fee. For B2B, Stripe + ACH/SEPA with Net-30 invoice terms via Stripe Invoicing.",
          },
          {
            q: "How do you handle sales tax / VAT?",
            a: "Stripe Tax for ≤40 jurisdictions and standard rules; TaxJar for US-heavy nexus; Avalara AvaTax for ≥15 US states or complex product-taxability rules. EU/UK OSS and VAT registration handled via the gateway's tax engine. We configure product tax categories (clothing, food, digital, etc.) and origin/destination rules; quarterly tax-report review is part of managed SLA.",
          },
          {
            q: "Are you PCI DSS compliant?",
            a: "We architect for SAQ-A by using hosted checkout (Stripe Checkout, Shopify checkout, PayPal Smart Buttons) — cardholder data never touches your servers. Custom embedded checkout (Stripe Elements) extends scope to SAQ-A-EP, adding ~40 hours/year of compliance work. We never architect direct card input on your server (SAQ-D); the risk-to-cost ratio is never favorable. Annual SAQ signing is part of the handover pack.",
          },
          {
            q: "How do you handle GDPR / CCPA / regional compliance?",
            a: "Cookie consent via OneTrust or Cookiebot, with granular consent categories (necessary, analytics, marketing). Customer data subject access requests (DSAR) handled via a documented workflow with 30-day SLA. EU/UK data residency via EU-hosted Stripe + EU Klaviyo sending domain + EU S3 region for media assets. CCPA 'Do Not Sell My Personal Information' integrated into the storefront footer and Klaviyo suppression workflow.",
          },
        ],
      },
      {
        name: "Scale, Migration & Working with ClickTake",
        questions: [
          {
            q: "How do you handle Black Friday / peak traffic?",
            a: "k6 or Artillery load test at 2× projected peak in the 2 weeks before launch. Auto-scaling configured (Vercel Pro/Enterprise, AWS ECS with target-tracking scaling, Cloudflare Workers for HTML caching). Pre-warmed databases and Redis clusters. Payment-gateway priority routing. On-call coverage during peak hours with a 4-hour response SLA (1-hour for Plus-tier managed SLA). Post-peak review within 7 days covering SLO breaches, incident timeline, and optimization backlog.",
          },
          {
            q: "Can you migrate from Magento 2 / BigCommerce / Squarespace?",
            a: "Yes. We have migrated 11 storefronts off Magento 2 (end-of-life risk and PHP upgrade burden), 4 off BigCommerce (platform-fee threshold for growing brands), and 6 off Squarespace (catalog and checkout ceiling). Migration is a 4–8 week phase covering catalog import (CSV or API), URL redirect map (1:1 with regex-based collection rules), order history migration (where the destination platform supports it), customer account migration with password reset (passwords are not portable), and a staged traffic cut-over.",
          },
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most commerce engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. Peak-traffic on-call covers UK and US business hours; a follow-the-sun rotation is added for managed SLA clients.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the storefront under a managed SLA (£1,500–£5,000/month) covering uptime monitoring, performance budgets, monthly optimization sprint, and peak-traffic on-call; (2) ClickTake hands off to your team after a 60-day post-launch shadow period with full documentation + runbooks; (3) Hybrid — ClickTake handles escalations, peak-traffic on-call, and quarterly platform upgrades, your team handles day-to-day merchandising and content. Most clients start with option 1 and migrate to option 3 after 6–12 months.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build a Commerce Storefront That Converts?",
    subtitle:
      "Book a free 30-minute strategy call. We will diagnose your storefront, sketch the platform decision matrix on a whiteboard with you, and tell you honestly whether a headless rebuild is the right call — or whether a Shopify theme tuning sprint would deliver 80% of the lift for 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min strategy call",
        description: "Free. No deck. We diagnose your storefront and tell you whether a rebuild or optimization is the right call.",
      },
      {
        step: "2",
        title: "2-week discovery phase",
        description: "£4K fixed. We produce the platform decision matrix, storefront wireframes, SLO contract and a fixed quote for the full build.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, peak-traffic SLA — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Strategy Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Commerce Architecture Brief", href: "/resources", variant: "outline" },
  },
}
