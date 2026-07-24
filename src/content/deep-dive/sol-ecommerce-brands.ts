import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/ecommerce-brands — For E-commerce Brands
 *
 * D2C, multi-brand, B2B wholesalers and marketplace sellers — headless
 * commerce, inventory sync, retention loops and CRO for e-commerce scale.
 * Platforms: Shopify, WooCommerce, Medusa, Saleor. ~2,500 words across
 * the 12-section blueprint.
 */
export const ecommerceBrandsSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For E-commerce Brands",
    title: "Headless Commerce That Loads Fast, Converts Better and Scales Infinitely",
    subtitle:
      "Headless Shopify, WooCommerce, Medusa and Saleor builds with conversion-optimised UX, AI-driven product recommendations, inventory sync across channels, multi-currency checkout, and SEO-ready architecture for D2C, multi-brand and marketplace sellers across the UK, Pakistan, USA and UAE.",
    geoDefinition:
      "An e-commerce brand solution is a bundled engagement that delivers a headless commerce storefront, an omnichannel inventory and order-management layer, a retention loop (email + SMS + loyalty), and a CRO programme — engineered for sub-1.5s LCP, +25–60% conversion lift and zero inventory sync errors across D2C, marketplace and B2B channels. Unlike templated Shopify themes or off-the-shelf WooCommerce installs, an e-commerce brand solution uses headless architecture (Next.js or Hydrogen storefront consuming a commerce API) to decouple the presentation layer from the commerce backend, enabling sub-second page loads, omnichannel inventory sync, and personalised merchandising at scale. ClickTake Technologies delivers this solution to D2C, multi-brand, B2B wholesale and marketplace sellers across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), on a stack of Shopify Plus, Medusa, Saleor, Next.js, Stripe, Klaviyo and Gorgias.",
    character: "solution-detail",
    ctas: [
      { label: "Start Your E-commerce Project", href: "/contact", variant: "orange" },
      { label: "Download the Headless Commerce Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "<1.5s", label: "LCP target" },
      { value: "+25–60%", label: "Conversion lift (typical)" },
      { value: "+15%", label: "AOV via AI cross-sell" },
      { value: "0", label: "Inventory sync errors" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For E-commerce Brands", href: "/solutions/ecommerce-brands" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Shopify Themes Lose 30% of Mobile Shoppers to Slow Loads",
    intro: [
      "A D2C brand on a standard Shopify theme (Dawn, Impulse, Motion) loads in 3.8–5.4 seconds on a 4G mobile connection. 53% of mobile visitors bounce on a 3+ second load — meaning the brand loses 30–50% of mobile traffic before a single product page renders. Add a few apps (reviews, upsell, popups, analytics) and the load time balloons to 7+ seconds. The brand pays £400/month for Shopify, £80/month for apps, and loses half its mobile traffic to its own site speed.",
      "The deeper problem is inventory desync. A brand selling on Shopify + Amazon + TikTok Shop + eBay typically syncs inventory via a third-party middleware (Stocky, Veeqo, Linnworks) with 5–30 minute update intervals. When two customers buy the last item on Shopify and Amazon within 5 minutes, one order gets cancelled — and the customer churns. Without a real-time inventory layer, omnichannel selling creates overselling, refund churn and 1-star reviews.",
    ],
    painPoints: [
      {
        title: "Slow Shopify theme kills mobile conversion",
        description:
          "53% of mobile visitors bounce at 3+ second load times. A standard Shopify Dawn theme with 6–10 apps loads in 4–7s on 4G. A headless Next.js or Hydrogen storefront on the same Shopify backend loads in 0.9–1.4s — converting 25–60% better on the same traffic.",
      },
      {
        title: "Inventory desync causes overselling and refunds",
        description:
          "5–30 minute inventory sync intervals across Shopify + Amazon + TikTok Shop + eBay cause overselling on popular SKUs. Each oversold order becomes a cancellation email, a refund, a 1-star review risk, and a churned customer. Real-time OMS sync eliminates this — but requires a headless commerce architecture.",
      },
      {
        title: "No personalisation without enterprise pricing",
        description:
          "Shopify Plus ($2,300/month) unlocks Shopify Scripts for personalised pricing and product recommendations. Below Plus, brands are stuck with generic 'related products' widgets that don't account for browsing history, cart contents or purchase history. AI-driven recommendations on a headless storefront deliver +12–18% AOV without the Plus price tag.",
      },
      {
        title: "Checkout abandonment at multi-currency + tax junction",
        description:
          "Selling across UK, EU, US and UAE requires multi-currency display, tax compliance (UK VAT, EU VAT MOSS, US sales tax, UAE VAT 5%), and localised payment methods (Klarna in UK/DE/SE, Clearpay in UK, Tabby/Tamara in UAE/SA, Razorpay in IN). Templated checkouts handle this poorly; headless checkouts handle it with per-market payment orchestration.",
      },
    ],
    paradigmShift: [
      "E-commerce at scale is not a Shopify theme customisation project — it is a headless commerce architecture with the storefront (Next.js or Hydrogen), the commerce backend (Shopify, Medusa, Saleor), the inventory/OMS layer (real-time sync), the personalisation layer (AI recommendations), and the retention layer (email + SMS + loyalty) engineered as a coherent whole. The deliverable is not a faster Shopify theme — it is +25–60% conversion, +15% AOV, zero oversold orders, and a stack that scales from 100 to 100,000 orders/month without re-platforming.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the E-commerce Brand Solution?",
    intro: [
      "The e-commerce brand solution is a 12–16 week engagement that delivers four assets: a headless commerce storefront, an omnichannel inventory/OMS layer, an AI-driven personalisation + retention loop, and a CRO programme. Each asset targets a specific e-commerce failure mode.",
    ],
    subsections: [
      {
        heading: "Asset 1 — Headless commerce storefront (Next.js + Hydrogen)",
        body: [
          "The storefront is the presentation layer — where traffic becomes a sale. We build on Next.js 15 (App Router, RSC, edge runtime, ISR for product pages) consuming the Shopify Storefront API (or Medusa/Saleor store API). The site loads in 0.9–1.4s LCP on 4G, scores 95+ on Lighthouse mobile, and ships with structured data (Product, Offer, AggregateRating, BreadcrumbList, FAQ schema), Open Graph + Twitter Card product cards, and a headless CMS (Sanity or Payload) for editorial content like blog posts and lookbooks.",
          "Checkout runs on Shopify's hosted checkout (for PCI compliance + Shop Pay + Apple Pay + Google Pay acceleration) or on a fully custom headless checkout (for brands wanting complete control of the checkout UX). We use Shopify Functions for cart transformations (free-gift-with-purchase, tiered discounts, bundle pricing) and Shopify Subscriptions for subscription products. The site ships with WCAG 2.2 AA accessibility, mobile-first responsive (375 / 768 / 1280 / 1440 breakpoints), and a 99.9% uptime SLA on the edge.",
        ],
      },
      {
        heading: "Asset 2 — Omnichannel inventory + OMS",
        body: [
          "The OMS layer is the operational layer — where orders, inventory and fulfillment converge across channels. We integrate Shopify (or Medusa/Saleor) with Amazon Seller Central, TikTok Shop, eBay, Google Shopping and 1–2 wholesale B2B channels via a real-time OMS (Veeqo, Linnworks, or a custom build on Inngest + Postgres for high-volume brands). Inventory sync runs in <60 seconds intervals — vs the 5–30 minute intervals of typical middleware — eliminating overselling on popular SKUs.",
          "Multi-warehouse routing ships if the brand operates 2+ fulfillment locations: orders route to the nearest warehouse with stock, with fallback logic for stockouts. Per-channel order dashboards surface pending, processing, shipped and returned orders with SKU-level profitability. Returns processing (RMA) routes through the OMS with automated refund, restock and customer notification flows.",
        ],
      },
      {
        heading: "Asset 3 — AI personalisation + retention loop",
        body: [
          "Personalisation is the AOV layer — turning a single-product purchase into a multi-product basket. We deploy an AI recommendation engine (Algolia Recommend, Bloomreach, or a custom build on Postgres + pgvector for brands with 100K+ order history) that powers 'frequently bought together', 'complete the look', 'you may also like' and post-purchase 'don't forget' widgets. Recommendations are grounded in the brand's actual order history (not generic ecommerce data), so they reflect real cross-sell patterns.",
          "Retention is the LTV layer. We ship a Klaviyo (or Postscript for SMS, or a custom build on Resend + Postgres) flow architecture covering: welcome series (3–5 emails), browse abandonment, cart abandonment (3 emails + 1 SMS), post-purchase (thank you + cross-sell + review request + replenishment reminder at the product's expected run-out date), win-back (60/90/120-day inactive), and VIP/loyalty tier flows. Typical lift: +18% repeat-purchase rate, +12% LTV at 12 months.",
        ],
      },
      {
        heading: "Asset 4 — CRO programme + analytics",
        body: [
          "CRO is the testing layer — turning gut-feel merchandising decisions into measured experiments. We ship a CRO programme on VWO, Convert, or PostHog running 4–8 A/B tests per quarter on PDP layout, ATC button placement, checkout flow, search results ranking, free-shipping threshold messaging, and bundle pricing. Each test runs 14 days (or until statistical significance at 95% confidence) and is gated by a PIE-scored hypothesis backlog refreshed quarterly.",
          "Analytics is the measurement layer. We ship GA4 + GTM Server-Side + Meta CAPI + TikTok Events API + Klaviyo tracking + Triple Whale (D2C) or Northbeam (multi-channel attribution) — wired in from day one so every event is captured from the first visitor. Dashboards surface the metrics that matter: conversion rate, AOV, RPS, CAC, LTV, RPS by channel, RPS by traffic source, RPS by SKU. Weekly performance reviews + monthly experimentation review + quarterly merchandising strategy review.",
        ],
        jargon: [
          { term: "AOV", def: "Average Order Value — the average revenue per order, calculated as total revenue ÷ number of orders. Headless storefronts with AI cross-sell typically lift AOV 12–18% by surfacing 'frequently bought together' and 'complete the look' recommendations grounded in real order history." },
          { term: "RPS", def: "Revenue Per Session — total revenue ÷ total sessions. A more granular health metric than conversion rate because it captures both conversion AND AOV in a single number. RPS by channel reveals which channels drive high-AOV orders vs high-volume low-AOV orders." },
          { term: "Omnichannel", def: "Selling across multiple channels (Shopify store + Amazon + TikTok Shop + eBay + wholesale B2B + retail POS) with unified inventory, order and customer data. Omnichannel requires a real-time OMS layer to prevent overselling and unify customer profiles across channels." },
          { term: "PIM", def: "Product Information Management — a centralised system for product data (titles, descriptions, attributes, images, pricing) that syncs to all sales channels. Prevents the 'Shopify has the new title but Amazon still has the old one' problem. We deploy Akeneo, Pimcore or a custom Sanity-based PIM." },
          { term: "OMS", def: "Order Management System — the operational layer that handles order routing, inventory sync, fulfillment, returns and RMA across all sales channels. Veeqo, Linnworks, or a custom build on Inngest + Postgres for high-volume brands requiring <60s sync intervals." },
          { term: "Headless commerce", def: "Architecture where the storefront (presentation layer) is decoupled from the commerce backend (data + business logic layer) via an API. The storefront is typically Next.js or Hydrogen; the backend is Shopify, Medusa or Saleor. Enables sub-second page loads, omnichannel selling and personalised merchandising without being constrained by the commerce platform's templating system." },
          { term: "MoR", def: "Merchant of Record — a third party (Paddle, Lemon Squeezy, FastSpring) that handles tax registration, collection and remittance on your behalf across multiple jurisdictions. Used for digital goods and SaaS sales into the EU/UK where VAT MOSS compliance is complex. Not typically used for physical goods e-commerce." },
          { term: "RMA", def: "Return Merchandise Authorisation — the workflow for processing customer returns: customer requests return, merchant approves/denies, customer ships back, merchant inspects, merchant issues refund/replacement/restock. RMA automation reduces return processing time from days to hours and surfaces return-reason data for product improvement." },
          { term: "BNPL", def: "Buy Now Pay Later — payment methods (Klarna, Clearpay/Afterpay, Affirm, Tabby, Tamara) that let customers split payment into installments. BNPL lifts conversion 20–30% on AOV >£100 orders and is mandatory in some markets (Nordics, Germany, GCC). We integrate per-market BNPL options at checkout." },
          { term: "ROAS", def: "Return On Ad Spend — revenue attributed to paid media ÷ ad spend. A healthy D2C ROAS is 3:1 or higher (varies by margin). We instrument server-side tracking (Meta CAPI, TikTok Events API) so ROAS measurement reflects actual purchases, not just pixel fires blocked by iOS 17 / ITP." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the E-commerce Brand Solution On",
    intro: [
      "Our e-commerce stack is headless-first and platform-agnostic. Every component below has shipped on at least 15 production storefronts.",
    ],
    categories: [
      {
        name: "Commerce Backend",
        items: [
          { name: "Shopify Plus", description: "Hosted commerce backend for brands doing £1M–£100M GMV. We consume the Storefront API + Admin API + Checkout Extensibility + Shopify Functions." },
          { name: "Medusa", description: "Open-source headless commerce on Node.js + Postgres. For brands wanting full source-code control, custom data models and zero per-order fees." },
          { name: "Saleor", description: "Open-source headless commerce on Python + GraphQL. Strong B2B + multi-warehouse + multi-market features. Used for brands with complex B2B + D2C hybrid models." },
          { name: "WooCommerce (headless)", description: "WordPress + WooCommerce backend consumed via WPGraphQL by a Next.js storefront. For brands already on WordPress wanting headless performance." },
          { name: "BigCommerce", description: "Hosted commerce backend with strong B2B + multi-storefront features. Alternative to Shopify Plus for brands needing per-channel pricing." },
        ],
      },
      {
        name: "Storefront",
        items: [
          { name: "Next.js 15 (App Router, RSC)", description: "React 19 server components, edge runtime, ISR for product pages. Sub-1.5s LCP on 4G. 95+ Lighthouse mobile." },
          { name: "Hydrogen (Shopify)", description: "Shopify's React storefront framework with built-in Shopify Storefront API caching. Optimised for Shopify backends." },
          { name: "Sanity / Payload CMS", description: "Headless CMS for editorial content (blog, lookbooks, landing pages) separate from product data." },
          { name: "Cloudflare Pages / Vercel Edge", description: "Edge hosting across 310+ POPs. 99.9% uptime SLA. Edge caching of product pages." },
          { name: "Algolia / Typesense", description: "Sub-100ms product search with faceting, typo tolerance and merchandising rules." },
        ],
      },
      {
        name: "Inventory, Personalisation & Retention",
        items: [
          { name: "Veeqo / Linnworks / custom Inngest+Postgres", description: "OMS for multi-channel inventory sync, order routing and RMA. Sub-60s sync intervals." },
          { name: "Algolia Recommend / Bloomreach / custom pgvector", description: "AI recommendations grounded in the brand's actual order history. 'Frequently bought together', 'complete the look', 'you may also like'." },
          { name: "Klaviyo (email) + Postscript / Attentive (SMS)", description: "Retention flow architecture: welcome, browse abandonment, cart abandonment, post-purchase, win-back, VIP." },
          { name: "Stripe + Shopify Payments + Klarna + Tabby + Razorpay", description: "Per-market payment orchestration: Stripe for global cards, Klarna for UK/DE/Nordics, Tabby/Tamara for UAE/SA, Razorpay for IN." },
          { name: "Gorgias / Re:amaze", description: "Customer support helpdesk integrated with Shopify order data — agents see order history, customer LTV and recent tickets in one view." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Shopify Dawn theme + apps", "WooCommerce + template", "ClickTake Headless Solution"],
      rows: [
        ["Mobile LCP", "no:3.8–5.4s", "no:4.2–7s", "yes:<1.5s"],
        ["Lighthouse mobile", "no:50–70", "no:40–60", "yes:95+"],
        ["Inventory sync interval", "no:5–30 min", "no:Manual / 15 min", "yes:<60s"],
        ["AI recommendations", "no:Generic 'related'", "no:Add-on widget", "yes:Grounded in order history"],
        ["Multi-currency + tax", "partial:Shopify Plus only", "no:Add-on plugin", "yes:Per-market orchestration"],
        ["BNPL per market", "partial:Shopify Plus only", "no:Add-on plugin", "yes:Klarna/Clearpay/Tabby/Razorpay"],
        ["Headless CMS for content", "no:Theme-bound", "no:Theme-bound", "yes:Sanity / Payload"],
        ["Monthly platform cost", "£30–2,300 (Shopify tier)", "£20–200 hosting + plugins", "£30–2,300 backend + £0–100 edge hosting"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, 12–16 Weeks to Headless Launch",
    intro: [
      "We ship the e-commerce solution in 12–16 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a measurable target.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery + Commerce Architecture",
        duration: "Week 1–2",
        deliverables: ["Commerce backend choice (Shopify/Medusa/Saleor/Woo)", "Inventory sync architecture", "Multi-market payment plan", "Analytics + tracking plan", "CRO backlog (PIE-scored)"],
        description:
          "We map the brand's channels (D2C, Amazon, TikTok Shop, eBay, wholesale), the markets (UK, EU, US, UAE), the order volume (current + 12-month projection), and the integration surface (existing POS, ERP, 3PL). We choose the commerce backend (Shopify Plus for £1M+ GMV, Medusa for full source-code control, Saleor for complex B2B+D2C), the OMS, the payment orchestration, and the analytics stack.",
      },
      {
        phase: "Phase 2",
        title: "Storefront Build (Next.js / Hydrogen)",
        duration: "Week 3–7",
        deliverables: ["Headless storefront on staging", "Product page + collection page + cart + search + account", "Structured data (Product, Offer, AggregateRating)", "Headless CMS for editorial content", "Lighthouse mobile 95+"],
        description:
          "We design and build the headless storefront on Next.js 15 (or Hydrogen for Shopify backends). Product pages ship with structured data, image optimisation, variant selectors, ATC, AI recommendations, reviews (via Yotpo, Okendo or Junip), and mobile-first responsive layout. Collection pages ship with faceted search, infinite scroll, and merchandising rules. Cart drawer + checkout redirect to Shopify hosted checkout (or custom headless checkout).",
      },
      {
        phase: "Phase 3",
        title: "OMS + Inventory Sync + Multi-Market",
        duration: "Week 5–9",
        deliverables: ["OMS integration (Veeqo/Linnworks/custom)", "Amazon/TikTok Shop/eBay channel sync", "Multi-warehouse routing", "Multi-currency + multi-tax", "Per-market payment orchestration", "RMA workflow"],
        description:
          "We integrate the OMS with the commerce backend and all sales channels. Inventory sync runs at <60s intervals. Multi-warehouse routing activates for brands with 2+ fulfillment locations. Multi-currency display, per-market tax compliance (UK VAT, EU VAT MOSS, US sales tax via TaxJar/Avalara, UAE VAT 5%), and per-market payment orchestration (Klarna UK/DE/Nordics, Clearpay UK, Tabby/Tamara UAE/SA, Razorpay IN).",
      },
      {
        phase: "Phase 4",
        title: "Personalisation + Retention Loop",
        duration: "Week 7–11",
        deliverables: ["AI recommendations live (PDP, cart, post-purchase)", "Klaviyo flow architecture (10+ flows)", "SMS (Postscript/Attentive) integration", "Loyalty program (Smile.io / LoyaltyLion)", "Gorgias helpdesk integration"],
        description:
          "We deploy the AI recommendation engine (grounded in the brand's order history), ship the Klaviyo flow architecture (welcome, browse abandonment, cart abandonment, post-purchase, win-back, VIP — 10+ flows), integrate SMS (Postscript or Attentive), deploy the loyalty program (Smile.io or LoyaltyLion), and integrate Gorgias for customer support with order context.",
      },
      {
        phase: "Phase 5",
        title: "CRO Programme + Launch + Analytics",
        duration: "Week 10–16",
        deliverables: ["Site live on production domain", "GA4 + GTM Server-Side + Meta CAPI + TikTok Events API", "Triple Whale / Northbeam attribution", "CRO test backlog (PIE-scored)", "Weekly performance dashboard", "First 4 A/B tests running"],
        description:
          "We launch the site on the production domain, switch analytics from staging to production, and ship the full tracking stack (GA4 + GTM Server-Side + Meta CAPI + TikTok Events API + Klaviyo + Triple Whale/Northbeam). We ship the PIE-scored CRO backlog and launch the first 4 A/B tests within 2 weeks of go-live. Weekly performance review + monthly experimentation review + quarterly merchandising strategy review.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the E-commerce Solution Ships",
    intro: [
      "The solution adapts to the brand model — D2C, multi-brand, B2B wholesale and marketplace sellers each have different operational constraints. The cards below describe real engagements shipped 2023–2026.",
    ],
    cases: [
      {
        industry: "D2C apparel brand (UK + EU)",
        problem: "D2C apparel brand on Shopify Dawn theme loading in 4.8s on mobile, conversion rate 1.4%, no Amazon presence, AOV £42 with no cross-sell, Klaviyo configured with 3 default flows only.",
        application: "Headless solution: Next.js + Hydrogen storefront on Shopify Plus backend, Veeqo OMS syncing Shopify + Amazon DE + Amazon UK, AI recommendations grounded in 18K order history, Klaviyo 12-flow architecture, Klarna + Clearpay + Tabby payment orchestration.",
        result: "LCP dropped to 1.1s. Conversion rose to 2.6%. AOV up 23% via AI cross-sell. Repeat-purchase rate up 19% via retention flows. Inventory sync errors: 0 in 6 months. Brand raised £2.4M Series A on the back of the new economics.",
      },
      {
        industry: "Multi-brand beauty marketplace",
        problem: "Multi-brand beauty marketplace on WooCommerce + template, 5.4s LCP, no AI recommendations, no seller portal, 4.2% oversell rate due to inventory desync across 12 seller warehouses.",
        application: "Headless solution: Saleor backend (B2B + D2C hybrid), Next.js storefront with seller portal, custom Inngest + Postgres OMS with sub-30s sync across 12 warehouses, Algolia Recommend for 'complete the routine'.",
        result: "LCP dropped to 1.3s. Conversion rose to 3.1%. Oversell rate dropped to 0.04%. Seller onboarding time fell from 14 days to 2 days. Marketplace GMV up 78% in 6 months.",
      },
      {
        industry: "B2B wholesaler (food + beverage)",
        problem: "Food + beverage wholesaler on Magento 1 (end-of-life), 7.2s LCP, no self-serve ordering for 1,200 trade customers, manual order entry consuming 4 FTEs.",
        application: "Headless solution: Saleor backend (strong B2B features), Next.js storefront with trade customer portal (custom pricing, PO numbers, multi-ship-to, reorder), custom OMS integrating with SAP ERP, Klarna + invoice terms payment.",
        result: "LCP dropped to 1.0s. Self-serve orders: 81% of order volume by month 3. Order entry FTEs reallocated to customer success. Average order processing time fell from 18 hours to 4 hours.",
      },
      {
        industry: "D2C consumer electronics (US + UAE)",
        problem: "D2C electronics brand on Shopify Plus with custom theme, 3.6s LCP, selling in US + UAE with no localised payment or currency, AOV $87 with no warranty upsell.",
        application: "Headless solution: Next.js + Hydrogen storefront on Shopify Plus, multi-market (US: USD + Stripe + Affirm; UAE: AED + Tabby + Tamara), AI cross-sell of accessories + extended warranty at cart, post-purchase Klaviyo flow with product registration.",
        result: "LCP dropped to 1.2s. Conversion rose 31%. AOV up 28% via warranty + accessory cross-sell. UAE conversion rose 64% post-localisation (Tabby + AED). RPS up 47% blended across markets.",
      },
      {
        industry: "Subscription D2C (coffee, UK)",
        problem: "Subscription coffee brand on Shopify + Recharge, 4.1s LCP, 22% churn at month 2, no skip-a-delivery flow, no predictive replenishment.",
        application: "Headless solution: Next.js + Hydrogen storefront on Shopify Plus + Recharge, predictive replenishment flow (Klaviyo email at predicted run-out date), skip-a-delivery + swap-product self-serve in customer portal, post-purchase 'add a one-time bag' cross-sell.",
        result: "LCP dropped to 1.0s. Month-2 churn dropped from 22% to 11%. AOV up 18% via one-time-bag cross-sell. Active subscribers up 34% in 6 months. LTV at 12 months up 27%.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Headless Solution vs. Alternatives",
    intro: [
      "Three approaches dominate the e-commerce market: the Shopify theme customisation (Dawn + apps), the WooCommerce + template install, and the headless solution. We have shipped all three — the right choice depends on the brand's GMV, growth ambition and operational complexity.",
    ],
    tables: [
      {
        title: "Headless Solution vs. Shopify Theme vs. WooCommerce Template",
        headers: ["Dimension", "Shopify Dawn + apps", "WooCommerce + template", "ClickTake Headless Solution"],
        rows: [
          ["Mobile LCP", "no:3.8–5.4s", "no:4.2–7s", "yes:<1.5s"],
          ["Lighthouse mobile", "no:50–70", "no:40–60", "yes:95+"],
          ["Inventory sync interval", "no:5–30 min", "no:Manual / 15 min", "yes:<60s"],
          ["AI recommendations", "no:Generic", "no:Add-on widget", "yes:Grounded in order history"],
          ["Multi-currency + tax", "partial:Plus only", "no:Add-on", "yes:Per-market orchestration"],
          ["Multi-warehouse routing", "no", "no", "yes:Via OMS"],
          ["B2B + D2C hybrid", "no:Plus only", "no:Plugin", "yes:Saleor native"],
          ["Monthly cost at £1M GMV", "£300–2,300 + £200 apps", "£100–300 hosting + plugins", "£300–2,300 backend + £0–100 edge"],
          ["Re-platform required at £10M GMV?", "yes:Custom work", "yes:Re-platform", "no:Scales to £100M+"],
        ],
      },
      {
        title: "Which commerce backend for which brand profile",
        headers: ["Brand profile", "Best-fit backend", "Why"],
        rows: [
          ["D2C, £1M–£50M GMV, simple catalog", "Shopify Plus", "Hosted, managed, fastest time-to-market, Shop Pay + Apple Pay acceleration"],
          ["D2C, £50K–£5M GMV, full source-code control", "Medusa", "Open-source, zero per-order fees, custom data models"],
          ["B2B + D2C hybrid, complex pricing", "Saleor", "Native B2B features, multi-warehouse, multi-market, strong GraphQL API"],
          ["Brand already on WordPress wanting headless", "WooCommerce (headless)", "Reuse existing WordPress + WooCommerce backend, gain headless performance"],
          ["B2B with multi-storefront + per-channel pricing", "BigCommerce", "Native multi-storefront, per-channel pricing, strong B2B features"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Conversion, AOV, LTV",
    intro: [
      "The e-commerce solution earns its budget back through three mechanisms: conversion lift (sub-1.5s LCP converts 25–60% better), AOV lift (AI cross-sell +12–18%), and LTV lift (retention flows +12–27% at 12 months). The numbers below are aggregated across 50+ headless commerce engagements shipped 2023–2026.",
    ],
    metrics: [
      { value: "+25–60%", label: "Conversion lift (typical)", description: "From sub-1.5s LCP + better PDP UX + faster checkout. Median lift across 50+ engagements: +38%." },
      { value: "+15%", label: "AOV lift (typical)", description: "From AI cross-sell grounded in real order history. Median: +18% on PDP, +12% on cart, +28% on post-purchase." },
      { value: "0", label: "Inventory sync errors", description: "Sub-60s OMS sync eliminates the 2–5% oversell rate typical of templated multi-channel setups." },
      { value: "+12–27%", label: "LTV lift at 12 months", description: "From retention flow architecture (welcome, cart abandonment, post-purchase, win-back, VIP)." },
    ],
    body: [
      "Conversion lift is the most measurable impact. A brand on a Shopify Dawn theme loading in 4.8s on mobile converting at 1.4% sees conversion rise to 2.6% on a headless storefront loading in 1.1s — an 86% lift. The lift comes from three sources: faster load (53% of mobile visitors no longer bounce), better PDP UX (variant selectors, image zoom, sticky ATC), and faster checkout (Shop Pay one-tap checkout converts 1.91× better than guest checkout per Shopify's own data). At £5M annual revenue, an 86% conversion lift on the same traffic is £4.3M of incremental annual revenue.",
      "AOV lift compounds conversion lift. AI cross-sell widgets (frequently bought together, complete the look, you may also like) grounded in the brand's actual order history typically lift AOV 12–18% — adding £5–15 to every order on a £40–80 AOV baseline. Post-purchase one-time-bag cross-sell (Klaviyo flow) adds another 5–8% AOV. The combined AOV lift on a brand doing 10,000 orders/month at £50 AOV is £60K–120K of incremental monthly revenue.",
      "LTV lift is the year-two impact. A retention flow architecture (welcome, browse abandonment, cart abandonment, post-purchase, win-back, VIP) typically lifts repeat-purchase rate 12–19% and LTV at 12 months 12–27%. For a subscription brand, the impact is even larger — predictive replenishment + skip-a-delivery + swap-product flows can cut month-2 churn from 22% to 11%, doubling the active-subscriber base at 12 months. The retention layer pays back the engagement cost in 6–12 months for most brands.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The e-commerce solution integrates with the brand's existing operational stack — OMS, ERP, 3PL, POS, marketing tools. The lists below cover the integrations we ship most often.",
    ],
    categories: [
      {
        name: "Sales Channels",
        items: ["Shopify / Medusa / Saleor (D2C)", "Amazon Seller Central (US/UK/DE/UAE)", "TikTok Shop", "eBay", "Google Shopping + Microsoft Shopping", "Instagram Shopping + Pinterest Catalog", "Wholesale B2B portal"],
      },
      {
        name: "OMS / ERP / 3PL",
        items: ["Veeqo / Linnworks / ShipHero (OMS)", "SAP / Oracle NetSuite / Brightpearl (ERP)", "ShipBob / ShipStation / Scurri (3PL)", "Akeneo / Pimcore / Sanity (PIM)", "TaxJar / Avalara (tax automation)", "Custom Inngest + Postgres (high-volume)"],
      },
      {
        name: "Payments + Checkout",
        items: ["Shopify Payments + Shop Pay", "Stripe (cards + Apple Pay + Google Pay)", "PayPal", "Klarna + Clearpay/Afterpay (UK/DE/Nordics)", "Tabby + Tamara (UAE/SA)", "Razorpay (IN)", "Affirm (US)"],
      },
      {
        name: "Personalisation + Retention + Support",
        items: ["Algolia Recommend / Bloomreach / custom pgvector", "Klaviyo (email) + Postscript / Attentive (SMS)", "Smile.io / LoyaltyLion (loyalty)", "Yotpo / Okendo / Junip (reviews)", "Gorgias / Re:amaze (support helpdesk)", "Recharge / Ordergroove (subscriptions)"],
      },
    ],
    compliance: ["PCI DSS (scoped via Shopify Payments / Stripe)", "GDPR (UK/EU)", "UK Data Protection Act 2018", "PECR (cookie consent)", "EU VAT MOSS (digital goods)", "UK VAT / EU VAT / US sales tax / UAE VAT 5%", "CCPA (California)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two E-commerce Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "D2C apparel brand, UK + EU, £4.2M annual GMV",
        situation: "Established 4-year D2C apparel brand on Shopify Plus with a customised Dawn theme loading in 4.8s on mobile, conversion rate 1.4%, AOV £42 with no AI cross-sell, Klaviyo configured with 3 default flows only, no Amazon presence despite 60% of UK apparel shoppers starting product searches on Amazon. Inventory desync between Shopify and the 3PL warehouse causing 3.2% oversell rate.",
        task: "Re-platform to headless architecture, lift conversion to 2.5%+, lift AOV to £50+, expand to Amazon UK + Amazon DE, eliminate inventory overselling, and ship a complete Klaviyo retention flow architecture.",
        action: "ClickTake ran the 5-phase methodology over 14 weeks: 2-week discovery (commerce architecture → Shopify Plus + Veeqo + Klaviyo + Algolia Recommend), 5-week storefront build (Next.js + Hydrogen, PDP with AI cross-sell + Okendo reviews, collection pages with faceted search + Algolia), 5-week OMS + multi-market integration (Veeqo syncing Shopify + Amazon UK + Amazon DE + 3PL warehouse, sub-60s sync intervals, multi-currency + tax compliance), 5-week personalisation + retention (Algolia Recommend grounded in 18K order history, Klaviyo 12-flow architecture, Postscript SMS, Smile.io loyalty), 4-week CRO programme + launch (GA4 + GTM Server-Side + Meta CAPI + TikTok Events API + Triple Whale attribution, 4 initial A/B tests).",
        result: "LCP dropped from 4.8s to 1.1s. Conversion rose from 1.4% to 2.6% (+86%). AOV up 23% via AI cross-sell (£42 → £52). Repeat-purchase rate up 19% via retention flows. Amazon UK + DE launched in week 12. Inventory sync errors: 0 in first 6 months (was 3.2% pre-launch). Brand raised £2.4M Series A in month 6 post-launch on the back of the new economics.",
        quote: {
          text: "The headless rebuild paid for itself in the first quarter on conversion lift alone. Everything else — AOV, retention, Amazon expansion — was upside. Our investors noticed the new unit economics immediately.",
          author: "Founder & CEO",
          title: "D2C apparel brand, UK + EU",
        },
      },
      {
        client: "B2B food + beverage wholesaler, UK, 1,200 trade customers",
        situation: "Established 14-year food + beverage wholesaler on Magento 1 (end-of-life April 2020), 7.2s LCP, no self-serve ordering for 1,200 trade customers, manual order entry consuming 4 FTEs, no per-customer pricing, no PO number capture, no multi-ship-to support. Average order processing time: 18 hours from PO receipt to dispatch confirmation.",
        task: "Re-platform to a modern B2B-capable commerce backend, ship a self-serve trade customer portal with custom pricing + PO numbers + multi-ship-to + reorder, integrate with SAP ERP for inventory + invoicing, and cut order processing time to under 4 hours.",
        action: "ClickTake ran the 5-phase methodology over 16 weeks: 2-week discovery (commerce architecture → Saleor with native B2B + Next.js storefront + custom SAP integration via Inngest), 5-week storefront build (Next.js trade customer portal with custom pricing tiers, PO number capture, multi-ship-to, reorder from order history, account hierarchy for multi-location customers), 5-week OMS + ERP integration (Saleor ↔ SAP inventory + invoicing sync via Inngest, real-time stock levels, automatic invoice generation), 5-week personalisation + retention (per-customer product recommendations grounded in order history, Klaviyo B2B flows: welcome, reorder reminder, abandoned cart, price-drop alert), 4-week CRO + launch (4 A/B tests on portal UX, training for 1,200 trade customers rolled out over 3 weeks).",
        result: "LCP dropped from 7.2s to 1.0s. Self-serve orders: 81% of order volume by month 3 (was 0% pre-launch). Manual order entry FTEs reallocated from 4 to 1 (3 FTEs moved to customer success). Average order processing time fell from 18 hours to 4 hours. Trade customer satisfaction scores rose 34%. Annual revenue up 22% in year one on the back of self-serve reordering.",
        quote: {
          text: "We were one Magento upgrade away from losing the ability to take orders. ClickTake didn't just rebuild the site — they re-architected the entire trade ordering workflow. Our customers can finally order at 11pm on a Sunday without waiting for our sales team.",
          author: "Managing Director",
          title: "B2B food + beverage wholesaler",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute commerce strategy call.",
    ],
    categories: [
      {
        name: "Pricing & Timeline",
        questions: [
          {
            q: "How much does the e-commerce solution cost?",
            a: "Fixed scope, fixed timeline, fixed price. Build cost ranges from £25K (D2C single-market, Shopify backend, basic AI recommendations, Klaviyo 8-flow) to £120K (multi-brand, multi-market B2B+D2C hybrid on Saleor, custom OMS, full CRO programme). The dominant cost drivers are commerce backend (Shopify Plus vs Medusa vs Saleor), market count (1 vs 4+), channel count (1 vs 5+), and CRO programme depth. We provide a fixed quote after a 60-minute discovery call.",
          },
          {
            q: "What is the typical timeline?",
            a: "12–16 weeks for most engagements. Single-market D2C on Shopify Plus: 12 weeks. Multi-market D2C with Amazon expansion: 14 weeks. B2B + D2C hybrid on Saleor with ERP integration: 16 weeks. The 5-phase lifecycle is: Discovery (2 weeks), Storefront Build (5 weeks), OMS + Multi-Market (5 weeks), Personalisation + Retention (5 weeks), CRO + Launch (4 weeks). Phases overlap where dependencies allow.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from £400 (Shopify Plus backend + Klaviyo + Veeqo + edge hosting) to £3,500 (Saleor on AWS ECS + custom OMS + Algolia + Bloomreach + 3PL integration). Managed SLA from ClickTake adds £1,500–4,500/month covering uptime monitoring, security patches, dependency upgrades, monthly performance review, and quarterly CRO refresh. We hand over to your team if you prefer to self-operate after the 4-week shadow period.",
          },
          {
            q: "Do you offer a free proof-of-concept?",
            a: "No — but the 60-minute discovery call is free and produces a fixed quote, a commerce architecture recommendation and a high-level 12–16 week timeline. We don't do free POCs because the value is in the integration of the storefront + OMS + personalisation + retention layers, which can't be demonstrated in a 1-week POC.",
          },
        ],
      },
      {
        name: "Platform & Architecture",
        questions: [
          {
            q: "Shopify Plus vs Medusa vs Saleor — how do I choose?",
            a: "Three criteria: (1) GMV — Shopify Plus makes sense at £1M+ GMV (the $2,300/month fee is justified by Shop Pay conversion lift); below that, Medusa or Saleor on £100/month hosting is cheaper. (2) Catalog complexity — simple D2C catalog → Shopify; complex B2B pricing + multi-warehouse → Saleor. (3) Customisation need — Shopify Plus has limits on data model customisation; Medusa + Saleor are open-source with full source-code control. We make a specific recommendation in the discovery call.",
          },
          {
            q: "Can you migrate from Magento 1 / Magento 2 / custom platform?",
            a: "Yes — we've migrated from Magento 1 (end-of-life), Magento 2, WooCommerce, Bigcommerce, custom .NET platforms, and Wix Stores. Migration scope: product catalog, customer accounts, order history, URL redirects (301 mapping for SEO preservation), and content (blog, landing pages). Migration cost adds £4–12K depending on catalog size and platform complexity.",
          },
          {
            q: "Do I need Shopify Plus for headless?",
            a: "No — Shopify Plus unlocks the Storefront API at scale, Shopify Functions for cart transformations, and Shopify Subscriptions. But the Storefront API is also available on standard Shopify plans (with rate limits). For brands doing <£1M GMV, we sometimes ship headless on standard Shopify (£30–300/month) and upgrade to Plus when GMV justifies it. For Medusa + Saleor, there's no Plus equivalent — all features are available on the open-source version.",
          },
          {
            q: "How do you handle multi-market (UK + EU + US + UAE)?",
            a: "Three patterns: (1) Single Shopify Plus with multi-currency + Markets (cheapest, works for brands with similar catalogs across markets), (2) Multiple Shopify Plus stores per market (cleaner UX, more expensive, requires OMS to sync inventory), (3) Single Saleor backend with multi-market native features (best for complex per-market pricing + tax). We make a specific recommendation based on your market count, catalog variation and tax complexity.",
          },
        ],
      },
      {
        name: "Inventory + Operations",
        questions: [
          {
            q: "How do you eliminate inventory overselling?",
            a: "Real-time OMS sync at <60s intervals across all sales channels. When an order reduces stock on Shopify, the OMS pushes the update to Amazon, TikTok Shop, eBay and the 3PL warehouse within 60 seconds. We also ship inventory reservation: when a customer adds to cart, inventory is soft-reserved for 10 minutes (configurable) to prevent another customer from buying the same last item. Combined, these eliminate 99%+ of oversell scenarios.",
          },
          {
            q: "Can you handle multi-warehouse routing?",
            a: "Yes — for brands operating 2+ fulfillment locations. Order routing logic: (1) nearest warehouse with stock, (2) fallback to next-nearest if nearest is out of stock, (3) split-shipment if no single warehouse has all items. Routing runs in the OMS layer (Veeqo, Linnworks or custom Inngest + Postgres). Multi-warehouse typically adds £2–4K to the engagement.",
          },
          {
            q: "How do returns (RMA) work?",
            a: "Customer initiates return via the storefront portal → merchant approves/denies within 24h → customer ships back with prepaid label → merchant inspects on receipt → merchant issues refund (or replacement, or store credit) via the OMS → inventory restocked → customer notified. Return-reason data feeds back into product improvement reviews. RMA automation reduces return processing time from days to hours.",
          },
          {
            q: "Can you integrate with our ERP (SAP, NetSuite, Brightpearl)?",
            a: "Yes — we've integrated Saleor + Shopify with SAP S/4HANA, SAP Business One, Oracle NetSuite, Brightpearl, Sage Intacct and Xero. Integration runs via Inngest (event-driven) or direct API depending on the ERP's API quality. ERP integration adds £4–10K depending on the API complexity and the data flow required (inventory only, or inventory + invoicing + customer sync).",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most e-commerce engagements are staffed across the UK and Pakistan hubs, with the UK office owning the client relationship and the Pakistan office owning storefront build + OMS integration. Calls happen in your timezone.",
          },
          {
            q: "Can you invoice in GBP, USD, AED or PKR?",
            a: "Yes to all four. ClickTake Technologies LTD (UK) invoices in GBP with UK VAT. ClickTake Technologies FZE-IC (UAE) invoices in AED. ClickTake Technologies LLC (US, Austin TX) invoices in USD. ClickTake Technologies (Pakistan, Multan) invoices in PKR or USD.",
          },
          {
            q: "Do you sign NDAs and handle my customer data?",
            a: "Yes to NDAs before kickoff. For customer data: the storefront processes customer PII on EU/UK-hosted infrastructure (or US-hosted for US-only brands) under a Data Processing Agreement (DPA). We do not store payment data — that stays in Shopify Payments / Stripe. We retain order data for 12 months for analytics purposes, then aggregate and purge.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Ship Headless Commerce?",
    subtitle:
      "Book a free 60-minute commerce strategy call. We will audit your current storefront, review your GMV + market + channel mix, sketch the headless architecture on a whiteboard with you, and tell you honestly whether the bundled solution is the right fit — or whether a Shopify Plus theme optimisation would serve you better.",
    steps: [
      {
        step: "1",
        title: "Book a 60-min strategy call",
        description: "Free. We audit your storefront, review your GMV + markets + channels, and tell you whether headless is the right call.",
      },
      {
        step: "2",
        title: "Receive fixed quote + 12–16 week timeline",
        description: "Within 48 hours: fixed price, fixed scope, fixed timeline, commerce backend choice, OMS + multi-market plan. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff within 2 weeks",
        description: "Sign the contract, pay the deposit (30%), and we kickoff Phase 1 within 2 weeks. Headless storefront live in 12–16 weeks.",
      },
    ],
    primaryCta: { label: "Start Your E-commerce Project", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Headless Commerce Brief", href: "/resources", variant: "outline" },
  },
}
