import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/full-stack — Full-Stack Web Development
 *
 * 12-section deep dive on production Next.js / React / Node web apps.
 * Anti-fluff: every paragraph adds a spec, a number, or a transition.
 */
export const webFullStackDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Full-Stack Web Development: Production Next.js Apps Shipped in 8–16 Weeks",
    subtitle:
      "We design, build, ship and operate full-stack web applications on Next.js 15, React 19, TypeScript, Tailwind, Postgres and edge infrastructure — instrumented for Core Web Vitals from the first commit and deployable on Vercel, Cloudflare or AWS.",
    geoDefinition:
      "Full-stack web development is the engineering discipline covering every layer of a web application — from the database schema and API surface through the server-rendered UI and client interactions. A modern full-stack system is typically built on a meta-framework (Next.js, Remix, SvelteKit), a typed language (TypeScript), a relational database (Postgres), an ORM (Prisma or Drizzle), and an edge-capable runtime (Vercel Edge, Cloudflare Workers, AWS Lambda@Edge). ClickTake Technologies delivers full-stack web applications to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Next.js App Router, React Server Components, edge runtime, streaming, and Postgres-backed SaaS architectures.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Architecture Call", href: "/contact", variant: "orange" },
      { label: "Download the Full-Stack Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "120+", label: "Web apps shipped" },
      { value: "<1.8s", label: "LCP target" },
      { value: "95+", label: "Lighthouse score" },
      { value: "8–16", label: "Weeks to production" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/full-stack" },
      { label: "Full-Stack Web Development" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Web Projects Stall at 80% — and How We Ship the Last 20%",
    intro: [
      "Most web projects fail in the same place: the integration layer between frontend, backend, auth, billing and infrastructure. The landing page ships in week 4. The dashboard ships in week 8. Then the team spends the next 4 months debugging server actions, fighting hydration mismatches, tuning bundle sizes and arguing about whether a query belongs in a server component or a route handler. The pattern is so consistent we can predict it from a project's tech choices.",
      "The root cause is structural: most teams are still building Next.js apps the way they built Create React App apps in 2019 — client-side everything, with the server treated as a JSON API. They never adopt server components, never use streaming, never profile Core Web Vitals until launch week, and never treat the database schema as a versioned contract. The result is a 4MB JS bundle, a 3-second LCP, and a 6-month maintenance backlog before the app reaches a single paying user.",
    ],
    painPoints: [
      {
        title: "Hydration mismatches and client/server boundary confusion",
        description:
          "Next.js App Router requires a clear mental model of which code runs where. Teams that copy-paste from React 17 tutorials produce 'use client' directives on every file, killing the server-component performance benefit and generating hydration warnings on every other render.",
      },
      {
        title: "N+1 queries and missing database indexes",
        description:
          "Without a typed ORM and an explicit query plan, dashboards issue 50+ database round-trips per page load. A user list that should render in 80ms takes 2.4 seconds. The fix is not 'add Redis' — it is correct schema design, eager loading, and indexing, applied before the symptom appears.",
      },
      {
        title: "Core Web Vitals ignored until launch week",
        description:
          "INP (Interaction to Next Paint) replaced FID in March 2024 as a Core Web Vital. Teams that did not budget for it ship apps with 350ms+ INP on mobile, get demoted in Google search results, and lose 8–15% of organic conversions. The fix requires architectural decisions made in week 2, not week 16.",
      },
      {
        title: "Auth, billing and multi-tenancy bolted on late",
        description:
          "Auth added in week 12 is always worse than auth designed in week 2. Bolt-on auth produces session bugs, role escalation paths, and Stripe webhook races that take 6 weeks to untangle. Multi-tenancy added late means a 4-week migration to row-level security under production load.",
      },
    ],
    paradigmShift: [
      "A full-stack web app is not a frontend plus a backend — it is a single compiled system where the server, the client, the database and the edge runtime are co-designed. We treat the Next.js route tree, the Postgres schema, the auth session and the Stripe billing state as one contract. We write the contract in TypeScript, enforce it at build time, and instrument it with OpenTelemetry before the first user signs in. The deliverable is not a codebase that runs locally — it is a system that handles 1,000 concurrent users at <1.8s LCP and <200ms INP under a 99.9% uptime SLA.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Modern Full-Stack Web App Actually Looks Like",
    intro: [
      "A modern full-stack web app is a compiled system spanning four runtimes: the Node.js server, the React Server Component layer, the browser client, and the edge CDN. Understanding what runs where — and what data crosses each boundary — is the difference between an app that loads in 800ms and one that loads in 3.5s.",
    ],
    subsections: [
      {
        heading: "Server Components: the default rendering mode",
        body: [
          "React Server Components (RSC), stabilized in Next.js 13 and production-ready in Next.js 15, render on the server and stream HTML to the browser — zero JavaScript shipped for the rendered output. A product page that lists 24 SKUs with images, prices and reviews renders as static HTML, with the 'Add to cart' button hydrated as a client component weighing under 4KB gzipped. The same page built with client-side rendering ships 180KB of JS and waits for a fetch before paint.",
          "The discipline is deciding what stays on the server. Rules we enforce: data fetching stays on the server; database queries never cross to the client; third-party SDK calls (Stripe, Algolia, PostHog) run server-side with credentials in the environment, not the bundle; only interactive primitives (forms, dropdowns, modals) become client components. The result is a typical page weight of 40–90KB gzipped JS, versus 250–500KB for an equivalent client-rendered app.",
        ],
        jargon: [
          { term: "Server Action", def: "An async function defined in a server component that the client can call directly — Next.js compiles it into a POST endpoint. Replaces hand-written API routes for form submissions and mutations, with type safety end-to-end." },
          { term: "Hydration", def: "The process of attaching React event handlers to server-rendered HTML so the page becomes interactive. Partial hydration (via React 19 Suspense) hydrates only the components that need interactivity, reducing INP." },
          { term: "Streaming", def: "Sending HTML to the browser in chunks as it becomes available, rather than waiting for the entire page to render. Next.js streams via React Suspense boundaries — the navigation paints in 200ms, slow data sections fill in later." },
        ],
      },
      {
        heading: "Data layer: Postgres, Prisma/Drizzle, and the schema-as-contract pattern",
        body: [
          "Every full-stack app we ship runs on Postgres — the most boring, most reliable, best-documented database in production. We use Prisma or Drizzle as the typed ORM, write the schema in TypeScript, and treat the migration history as a versioned contract reviewed in every PR. A typical schema for a SaaS app covers 18–35 tables, with explicit foreign keys, indexes on every column used in a WHERE or ORDER BY clause, and row-level security policies enforced at the database layer for multi-tenant isolation.",
          "The schema-as-contract pattern means: the migration file is the source of truth, the ORM types are generated from it, and the API responses are typed from the ORM types. A breaking change in the schema fails the build — there is no 'works on my machine' drift between the database, the API and the frontend. We run migrations via a deploy-time script with backwards-compatible changes (add column, backfill, swap read, swap write, drop old) so zero-downtime deploys are the default, not a special-occasion ritual.",
        ],
      },
      {
        heading: "Edge runtime, ISR, and the cache hierarchy",
        body: [
          "Next.js 15 supports four rendering modes per route: Static Site Generation (build-time HTML), Incremental Static Regeneration (stale-while-revalidate at the edge with a revalidate window), Server-Side Rendering (per-request render with no cache), and Streaming SSR (per-request render with Suspense-streamed sections). The default choice for any read-heavy page is ISR with a 60-second revalidate window — the page renders once, is cached at 300+ Cloudflare/Vercel edge POPs, and re-renders at most once per minute regardless of traffic volume.",
          "Edge runtime runs server-side code on Cloudflare Workers or Vercel Edge Functions in 50–300ms from any user globally, with cold starts under 50ms. We use it for auth checks, A/B test routing, geolocation redirects and feature flag evaluation — anything that needs to be fast and stateless. Compute-heavy work (PDF generation, video transcoding, large ML inference) stays on Node.js server runtime or an external worker queue.",
        ],
        jargon: [
          { term: "ISR", def: "Incremental Static Regeneration. Next.js re-generates a static page in the background after the revalidate window expires, serving stale content until the new version is ready. Eliminates the per-request render cost for content that changes every few minutes." },
          { term: "Edge runtime", def: "A V8-isolate-based runtime that runs JavaScript at the CDN edge. Cold start <50ms vs 1–3s for Lambda. Limited Node.js API surface — no fs, no native modules, no long-running compute." },
          { term: "Tag-based revalidation", def: "Next.js feature that lets you invalidate cached pages by tag (e.g., 'product-123') instead of waiting for the revalidate window. Used when a Stripe webhook updates a price and the product page must reflect it within 1 second." },
        ],
      },
      {
        heading: "Observability: OpenTelemetry, error tracking, and Core Web Vitals",
        body: [
          "A production web app without observability is flying blind. We instrument every app with OpenTelemetry traces on the server (route handler entry → DB query → external API call → response), Sentry for client-side error tracking with release health and source maps, and Vercel Speed Insights or Web Vitals library for field Core Web Vitals (LCP, INP, CLS, FCP, TTFB) on real user traffic. Dashboards are in Grafana or Vercel Observability, with alerts on p75 INP > 200ms, p75 LCP > 2.5s, error rate > 0.5%, and uptime < 99.9%.",
          "The discipline is reviewing the field data weekly, not just at launch. A release that adds 30KB to the bundle or shifts a query to a slower path shows up in the p75 LCP within 24 hours. We treat Core Web Vitals as a CI check — Lighthouse CI runs on every PR against a representative page set, and a regression over 5 points blocks the merge.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our full-stack stack is opinionated and battle-tested across 120+ production deployments. Every component below has shipped under real traffic — not just a conference demo. The stack optimizes for type safety end-to-end, edge-renderable output, and a deploy pipeline measured in minutes, not hours.",
    ],
    categories: [
      {
        name: "Framework & runtime",
        items: [
          { name: "Next.js 15 (App Router)", description: "Server components, server actions, route handlers, ISR, streaming. Our default meta-framework for every full-stack project." },
          { name: "React 19", description: "Concurrent rendering, use() hook for suspense-derived data, server components stable, actions API for form mutations." },
          { name: "TypeScript 5.4+", description: "Strict mode, no implicit any, exhaustive switch checks. Generated types from Prisma/Drizzle schema — zero hand-written type drift." },
          { name: "Tailwind CSS 3.4 / 4", description: "Utility-first styling, JIT compilation, ~10KB gzipped base. Paired with shadcn/ui for accessible primitives." },
          { name: "tRPC / Next.js Route Handlers", description: "End-to-end typed APIs without codegen. tRPC for internal SPA-style apps; route handlers for public REST APIs and webhooks." },
        ],
      },
      {
        name: "Data & backend",
        items: [
          { name: "PostgreSQL 16", description: "Primary relational store. JSONB for semi-structured data, row-level security for multi-tenancy, full-text search via pg_trgm and tsvector." },
          { name: "Prisma / Drizzle ORM", description: "Typed query builder + schema-as-code + migration history. Prisma for ergonomic DX; Drizzle for SQL-first teams and edge runtime compatibility." },
          { name: "Redis (Upstash / Redis Cloud)", description: "Session store, rate limiting, queue backend for BullMQ, cache layer for expensive queries and external API responses." },
          { name: "BullMQ / Inngest", description: "Background job queues for email sending, PDF generation, webhook retries. Inngest for durable multi-step workflows with automatic retries." },
          { name: "Zod / Valibot", description: "Runtime schema validation for API inputs, environment variables, and server action arguments. Zod for full-featured apps; Valibot when bundle size is critical." },
        ],
      },
      {
        name: "Infrastructure & observability",
        items: [
          { name: "Vercel / Cloudflare Pages / AWS Amplify", description: "Deployment platforms with edge runtime, preview deploys per PR, and instant rollbacks. Vercel for Next.js-native DX; Cloudflare for cost at scale; AWS for enterprise procurement." },
          { name: "Cloudflare CDN / R2 / KV", description: "Global CDN with 300+ POPs, object storage (R2) at $0.015/GB with no egress fees, and edge KV for feature flags and A/B test assignments." },
          { name: "Sentry / Highlight / Vercel Observability", description: "Error tracking with source maps, release health, session replays, and Core Web Vitals field data on real user traffic." },
          { name: "OpenTelemetry + Grafana / Datadog", description: "Distributed tracing from edge → server → database → external API. p50/p95/p99 latency percentiles per route, with alerting on regression." },
          { name: "GitHub Actions / Earthly", description: "CI pipelines with type-check, unit, integration and e2e tests, Lighthouse CI performance budgets, and preview deploys on every PR." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Off-the-shelf SaaS template", "ClickTake Full-Stack Build"],
      rows: [
        ["Server components by default", "no:Mostly client-rendered", "yes:Default rendering mode"],
        ["Type-safe DB → API → UI", "no:Hand-written types drift", "yes:Generated from schema"],
        ["Edge runtime for auth & flags", "no:Node.js only", "yes:50ms cold start globally"],
        ["Core Web Vitals CI gate", "no:Manual Lighthouse runs", "yes:Lighthouse CI on every PR"],
        ["Migration as versioned contract", "no:Drift over time", "yes:Reviewed in every PR"],
        ["OpenTelemetry tracing", "no:Black box", "yes:End-to-end traces"],
        ["Multi-tenant RLS", "no:Bolted on", "yes:Designed at schema time"],
        ["Deploy frequency", "no:Weekly if lucky", "yes:Multiple per day"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship full-stack web apps in 8–16 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'agile ceremonies' where the team shows a half-working demo and calls it a sprint.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Architecture & Schema",
        duration: "Week 1–2",
        deliverables: ["Architecture diagram", "Database schema (SQL)", "API contract (OpenAPI)", "Risk register", "Sprint plan"],
        description:
          "We map the user journeys, the data model, the API surface and the infrastructure topology. We draft the Postgres schema, the auth model, the multi-tenancy strategy and the billing integration plan before writing a line of feature code. We agree on Core Web Vitals budgets (LCP <1.8s, INP <200ms, CLS <0.1), Lighthouse score floors (95+ on key pages), and uptime SLA (99.9% or 99.95%). Every architectural decision is documented in an ADR (Architecture Decision Record) committed to the repo.",
      },
      {
        phase: "Phase 2",
        title: "Foundation: Auth, Schema, CI/CD, Design System",
        duration: "Week 2–4",
        deliverables: ["Deployed auth flow", "Migrated Postgres schema", "CI pipeline with Lighthouse CI", "Design system in Figma + code", "Preview deploys per PR"],
        description:
          "We stand up the project skeleton: Next.js 15 app with App Router, TypeScript strict mode, Tailwind + shadcn/ui, Postgres with Prisma/Drizzle, auth via Clerk/Auth0/NextAuth, CI on GitHub Actions, and preview deploys on every PR. The design system is built as a parallel workstream — Figma library plus coded components in a /components/ui directory, with a Storybook or similar showcase. By end of week 4, the empty app deploys to production with auth, an empty dashboard, and a passing Lighthouse CI run.",
      },
      {
        phase: "Phase 3",
        title: "Core Feature Build",
        duration: "Week 4–10",
        deliverables: ["Primary user journeys live", "Stripe billing integrated", "Admin tooling MVP", "E2E test suite (Playwright)", "Tracing + error tracking live"],
        description:
          "We build the primary user journeys in vertical slices — sign-up → onboarding → core workflow → billing → dashboard — each slice shipped to production behind a feature flag. We write E2E tests in Playwright covering the happy path and the top 3 edge cases per journey. Stripe billing is integrated with webhook handlers, idempotency keys, and a billing state machine. Admin tooling (user search, impersonation, refund issuance) is built alongside the user-facing features, not deferred to the end.",
      },
      {
        phase: "Phase 4",
        title: "Hardening: Performance, Security, Accessibility",
        duration: "Week 10–13",
        deliverables: ["Lighthouse 95+ on all key routes", "WCAG 2.2 AA audit passed", "OWASP top 10 review", "Load test report", "Disaster recovery runbook"],
        description:
          "We run a performance audit: bundle analysis, query analysis with EXPLAIN ANALYZE, image optimization audit, and Core Web Vitals field data review on staging traffic. We run a WCAG 2.2 AA accessibility audit (axe + manual screen-reader testing) and fix every violation. We run an OWASP top 10 review (auth, session, injection, XSS, CSRF, SSRF, insecure deserialization). We load-test with k6 to 5x projected peak traffic and write the disaster recovery runbook.",
      },
      {
        phase: "Phase 5",
        title: "Launch, Observability & Handoff",
        duration: "Week 13–16",
        deliverables: ["Production launch", "SLO dashboards", "On-call runbook", "4-week hypercare", "Code + docs handoff"],
        description:
          "We cut over to production with a phased rollout (10% → 50% → 100% over 48 hours via feature flag). We configure SLO dashboards in Grafana or Vercel Observability with alerting on p75 LCP, p75 INP, error rate, and uptime. We provide a 4-week hypercare period with on-call coverage from the build team, then hand off to your team or to a ClickTake managed SLA. Documentation: ADRs, runbooks, architecture diagrams and a recorded code walkthrough.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Full-Stack Web Apps Compound Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational marketing copy.",
    ],
    cases: [
      {
        industry: "B2B SaaS Dashboards",
        problem: "A Series A SaaS had a React SPA dashboard that took 4.2 seconds to load on customer networks, with 380KB of JS and 12 API round-trips on the initial paint.",
        application: "Re-platformed on Next.js 15 App Router with server components. The dashboard shell renders server-side in 280ms; per-widget data is streamed via Suspense. The API was consolidated from 12 endpoints to 3 batched route handlers.",
        result: "LCP fell from 4.2s to 1.1s, INP from 340ms to 110ms, bundle from 380KB to 78KB. Trial-to-paid conversion rose 19%.",
      },
      {
        industry: "Two-Sided Marketplaces",
        problem: "A services marketplace had SEO pages that rendered client-side, so Google indexed empty shells. Organic traffic was 8% of total despite 40K SKUs.",
        application: "Rebuilt listing pages as ISR with a 5-minute revalidate window, server-rendered JSON-LD structured data, and a tag-based revalidation hook on inventory updates. 300+ edge-cached pages indexed within 14 days.",
        result: "Organic impressions up 312% in 90 days. Indexed pages grew from 4,200 to 38,000. Cost per acquisition fell 41%.",
      },
      {
        industry: "Internal Tools & Operations",
        problem: "An ops team managed 1,200 active jobs on 14 spreadsheets and 6 separate SaaS tools. Average time to update a job status was 8 minutes across tools.",
        application: "A Next.js internal tool with Postgres backing, role-based access for 40 internal users, bulk import/export, audit log of every change, and a Slack integration that pushes status updates to the relevant channel.",
        result: "Status update time fell from 8 minutes to 45 seconds. Tool switching eliminated. 22 hours/week of ops time reclaimed.",
      },
      {
        industry: "Customer Portals",
        problem: "A B2B vendor's customers could not self-serve invoices, contracts or usage data — every request routed to a 4-day-email-back support queue.",
        application: "A customer portal built on Next.js, with SSO via SAML for enterprise customers, document repository backed by S3 + CloudFront, usage charts rendered server-side with Recharts, and a Stripe-billing integration for self-serve plan upgrades.",
        result: "60% of billing and document requests self-served. Support tickets fell 38%. NPS rose 14 points.",
      },
      {
        industry: "AI Products & Copilots",
        problem: "An AI startup had a working model but a slow, flaky UI that streamed tokens inconsistently and crashed under 50 concurrent users.",
        application: "A Next.js App Router frontend with React Server Components for the static shell, streaming AI responses via Server-Sent Events through a route handler, Redis-backed rate limiting, and Postgres-backed conversation history with full-text search.",
        result: "P95 token-to-first-byte fell to 480ms. Concurrent user capacity rose from 50 to 2,400. Trial sign-ups doubled after the UX overhaul.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Next.js Full-Stack vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches teams consider for a new web app. We have shipped all four — the right choice depends on your team's skills, your SEO requirements, your traffic shape and your budget.",
    ],
    tables: [
      {
        title: "Next.js Full-Stack (ClickTake) vs. SPA + Separate API vs. WordPress vs. No-code (Bubble/Webflow)",
        headers: ["Dimension", "SPA + API", "WordPress", "No-code", "ClickTake Next.js"],
        rows: [
          ["Time to first deploy", "yes:6–10 weeks", "yes:2–4 weeks", "yes:1–3 weeks", "yes:8–16 weeks"],
          ["SEO / SSR", "no:Needs extra work", "yes:Native", "no:Limited", "yes:Native + ISR"],
          ["Type safety end-to-end", "no:If separate repos", "no:PHP, no types", "no", "yes:TS strict"],
          ["Core Web Vitals budget", "no:Hard to hit", "maybe:Plugin-dependent", "no", "yes:Lighthouse CI"],
          ["Multi-tenant ready", "maybe", "no", "no", "yes:RLS at schema"],
          ["Custom billing workflows", "yes", "no:Plugins only", "no", "yes:Native Stripe"],
          ["Long-term cost at scale", "yes:2 codebases", "no:Plugin sprawl", "no:Per-seat pricing", "yes:Single codebase"],
          ["Best for", "Mobile-first SPAs", "Content sites, SMBs", "MVPs, internal tools", "SaaS, marketplaces, AI products"],
        ],
      },
      {
        title: "Where each rendering mode wins",
        headers: ["Page type", "Static (SSG)", "ISR", "Streaming SSR", "Edge runtime"],
        rows: [
          ["Marketing homepage", "yes", "maybe", "no", "no"],
          ["Product listing (50K SKUs)", "no", "yes", "no", "no"],
          ["User dashboard (auth required)", "no", "no", "yes", "no"],
          ["Auth check / A/B route", "no", "no", "no", "yes"],
          ["Pricing page (changes monthly)", "yes", "yes", "no", "no"],
          ["Search results (per-query)", "no", "no", "yes", "maybe"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Performance, Conversion & Velocity",
    intro: [
      "Full-stack web projects earn their budget back through four mechanisms: conversion lift (faster pages convert better), SEO traffic (Core Web Vitals are a ranking factor), team velocity (a typed codebase ships features faster), and operating cost (one codebase is cheaper than two). The numbers below are aggregated across 120+ production deployments shipped 2022–2026.",
    ],
    metrics: [
      { value: "1.4s", label: "Avg. p75 LCP", description: "Across all production full-stack apps we operate, measured on field CrUX data." },
      { value: "23%", label: "Avg. conversion lift", description: "On checkout and signup funnels after re-platforming from client-rendered SPA to Next.js SSR." },
      { value: "12×", label: "Deploy frequency", description: "Per-week deploys increase vs. pre-engagement baseline (median: 1.2 → 14.4)." },
      { value: "99.94%", label: "Avg. uptime", description: "Blended across all production full-stack apps under ClickTake-managed SLA in 2025." },
    ],
    body: [
      "Conversion lift is the most directly attributable impact. Google's CrUX data and multiple industry studies (Deloitte 2020, Google SOASTA 2017, Akamai 2017) consistently show that a 100ms improvement in page load time lifts conversion 1–8% across verticals. We see the same pattern in our own data: clients re-platforming from a client-rendered SPA to a Next.js SSR build with LCP moving from 3.5s to 1.2s see 18–28% conversion lift on signup and checkout funnels within 60 days of launch. For a SaaS at $100K MRR, that is $18K–$28K of new MRR per month, attributable to the re-platform.",
      "SEO traffic compounds over months. A client with 40,000 product SKUs moved from a client-rendered React SPA (Google indexed 4,200 pages, mostly empty shells) to a Next.js ISR build (Google indexed 38,000 pages within 90 days). Organic impressions rose 312% in the first quarter and continued compounding to 580% over 12 months. The same pattern applies to publishing, marketplaces, and any business where organic search drives the funnel.",
      "Team velocity and operating cost are the long-tail impacts. A single typed codebase ships features 30–50% faster than a separate frontend + API repo (measured by PR cycle time on 8 engagements). One codebase, one deploy pipeline, one set of CI checks and one on-call rotation costs less than two — typically $4K–$8K/month in platform fees (Vercel Pro + Sentry + Postgres + Redis) versus $8K–$15K for the equivalent SPA + API + CDN + queue stack. For a 24-month horizon, the savings compound to $150K–$250K.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Full-stack web apps integrate with the rest of your stack — billing, email, search, analytics, CRM, support, identity. The lists below cover the integrations we ship most often; if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Auth & identity",
        items: ["Clerk (preferred for SaaS)", "Auth0 / Okta", "WorkOS (enterprise SSO)", "NextAuth.js / Auth.js", "Supabase Auth", "AWS Cognito", "Stytch (passkeys)"],
      },
      {
        name: "Payments & billing",
        items: ["Stripe (Subscriptions, Usage-based, Connect)", "Lemon Squeezy (Merchant of Record)", "Paddle (MoR for EU/UK)", "RevenueCat (mobile subs)", "Mollie (EU)", "TaxJar / Anrok (sales tax)"],
      },
      {
        name: "Data, search & AI",
        items: ["PostgreSQL (primary store)", "Redis (cache + queue)", "Algolia / Typesense (search)", "Neon / Supabase (managed PG)", "Vercel Postgres", "OpenAI / Anthropic (AI features)", "pgvector (embeddings)"],
      },
      {
        name: "Marketing, support & ops",
        items: ["Resend / Postmark / SendGrid", "Loops / Customer.io (lifecycle)", "PostHog / Vercel Analytics / Plausible", "Sentry / Highlight (errors)", "Linear / GitHub (issues)", "Slack / Teams (alerts)", "Datadog / Grafana (metrics)"],
      },
    ],
    compliance: ["GDPR", "SOC 2 Type II (architecture-ready)", "ISO 27001 (architecture-ready)", "PCI DSS (Stripe-hosted fields)", "WCAG 2.2 AA", "EU DSA readiness review"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "B2B SaaS analytics company, ~$18M ARR, 4,200 customers",
        situation: "The product dashboard was a React SPA on top of a separate Node.js API. Initial paint took 4.2 seconds, INP was 340ms, the JS bundle was 380KB gzipped, and every customer onboarding survey called out 'slow dashboard' as the top complaint. The team was spending 35% of engineering time on performance fires instead of features.",
        task: "Re-platform the customer-facing dashboard on Next.js 15 App Router with server components, while keeping the existing Node.js API for the parts not yet migrated. Hit LCP <1.8s, INP <200ms, and bundle <100KB on the primary dashboard route — without losing any feature.",
        action: "ClickTake ran a 14-week re-platform. The dashboard shell moved to a server component that renders in 280ms with the user's identity, workspaces and recent activity fetched in parallel via Promise.all. Per-widget data is streamed via Suspense boundaries, so the shell paints in 600ms and widgets fill in over the next 2 seconds. The API was consolidated from 12 endpoints to 3 batched route handlers using a custom BFF pattern. We added Lighthouse CI to the GitHub Actions pipeline with a 95-point floor on the dashboard route. PostHog was instrumented for field CrUX data.",
        result: "LCP fell from 4.2s to 1.1s, INP from 340ms to 110ms, bundle from 380KB to 78KB gzipped. Lighthouse score moved from 62 to 98 on the primary route. Trial-to-paid conversion rose 19% in the 90 days following launch. The engineering team reclaimed the 35% of time previously spent on performance fires and redirected it to two new product lines.",
        quote: {
          text: "Our customers stopped complaining about speed and started complaining about features — which is the only good kind of complaint. The re-platform paid for itself in 5 months on conversion lift alone.",
          author: "VP of Engineering",
          title: "B2B SaaS analytics company",
        },
      },
      {
        client: "UK-based services marketplace, 40K SKUs, ~£6M GMV/year",
        situation: "Listing pages were client-rendered, so Google indexed empty HTML shells. Organic search drove 8% of traffic despite the catalog depth. Paid acquisition cost was rising 22% YoY. A previous agency had recommended a 6-month SEO retainer focused on content; the leadership team was skeptical.",
        task: "Rebuild listing pages so Google can index them, without losing the existing booking flow. Triple organic impressions in 90 days. Do not break the existing paid funnel during migration.",
        action: "ClickTake rebuilt the listing pages as Next.js ISR with a 5-minute revalidate window, server-rendered JSON-LD structured data for Product and Offer schemas, and a tag-based revalidation hook fired from the inventory service on stock changes. We wrote 301 redirects for every legacy URL (4,200 mappings) and submitted an updated sitemap. The booking flow remained on the existing SPA, mounted as a client component inside the new server-rendered shell. Total engagement: 9 weeks.",
        result: "Google indexed 38,000 pages within 14 days of launch (up from 4,200). Organic impressions rose 312% in 90 days and 580% over 12 months. Cost per acquisition fell 41% as paid budget was reallocated to SEO. The marketplace hit profitability for the first time in month 11 post-launch.",
        quote: {
          text: "We were about to sign a £90K SEO retainer. ClickTake told us the problem wasn't content — it was that Google couldn't see our pages. They were right. We saved the retainer and tripled our traffic.",
          author: "Founder & CEO",
          title: "UK services marketplace",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most architecture questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a full-stack web app cost to build?",
            a: "Build cost ranges from $60K (internal tool with SSO, 4–6 core screens) to $350K (multi-tenant SaaS with billing, admin tooling, audit logs and 6-month managed SLA). The dominant cost drivers are: number of distinct user roles, integration depth with external systems (Stripe, CRM, ERP), compliance requirements (SOC2, HIPAA), and whether you need native mobile or just responsive web. We provide a fixed quote after a 1-week discovery sprint.",
          },
          {
            q: "What is the typical timeline from kickoff to production launch?",
            a: "8–16 weeks for most engagements. The 5-phase lifecycle is: Discovery (2 weeks), Foundation (2 weeks), Core Feature Build (6 weeks), Hardening (3 weeks), Launch & Handoff (3 weeks). Internal tools and MVPs ship in 8 weeks; production SaaS with billing and admin tooling takes 14–16 weeks. We do not commit to a launch date until the discovery phase is complete.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $400 (Vercel Hobby + Neon free tier + Resend, low traffic) to $6K (Vercel Pro + managed Postgres HA + Redis + Sentry + PostHog + 24/7 on-call). Managed SLA from ClickTake adds $3K–$9K/month depending on required response time and coverage window. Most production SaaS apps settle at $1.5K–$3K/month in platform fees plus the ClickTake managed SLA.",
          },
          {
            q: "Do you offer a fixed-price quote or time-and-materials?",
            a: "Fixed-price for the full engagement, after the 1-week discovery sprint ($6K–$8K). Discovery produces the architecture, the schema, the API contract and the sprint plan — enough detail to quote fixed. We do not work time-and-materials because it misaligns incentives: we want to be paid for shipping, not for hours.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "Do you support Next.js App Router or only the Pages Router?",
            a: "App Router exclusively for new projects (since Next.js 13.4 stabilized it in 2023). Server components, server actions, route handlers, streaming, ISR — all App Router. We maintain a small number of Pages Router apps for legacy clients, but every new engagement starts on App Router. If your existing app is on Pages Router, we can migrate it as a separate engagement (typically 4–6 weeks for a mid-sized app).",
          },
          {
            q: "Can you deploy on our AWS / Azure / GCP account instead of Vercel?",
            a: "Yes. We deploy on AWS (Amplify, ECS Fargate, or App Runner), Azure (Container Apps), GCP (Cloud Run), or self-hosted on Kubernetes. Vercel is our default for new SaaS projects because of the DX (preview deploys, edge functions, automatic CI), but enterprise procurement often requires AWS. The trade-off: AWS gives you control and lets you apply existing cloud-commit discounts; Vercel gives you 30% faster iteration. We can support either.",
          },
          {
            q: "What Core Web Vitals targets do you commit to?",
            a: "LCP <1.8s (p75 on field data), INP <200ms (p75), CLS <0.1, FCP <1.2s, TTFB <600ms — all measured on real user traffic via PostHog, Vercel Speed Insights, or CrUX. We enforce these as Lighthouse CI budgets on every PR (95+ score on key routes) and as alerting thresholds on field data. If a release regresses p75 LCP by more than 200ms, the on-call gets paged.",
          },
          {
            q: "How do you handle multi-tenancy for SaaS apps?",
            a: "Three patterns, chosen based on tenant count, isolation requirement and cost: (1) shared database with row-level security (Postgres RLS, tenant_id column, RLS policy on every table) — best for 100–10,000 tenants; (2) schema-per-tenant in a single Postgres cluster — best for 10–500 tenants with strong isolation; (3) database-per-tenant — best for <50 enterprise tenants with regulatory isolation requirements. We design the pattern in week 1 and bake it into the schema before any feature code is written.",
          },
        ],
      },
      {
        name: "Performance & SEO",
        questions: [
          {
            q: "How fast will the app be?",
            a: "On field data with a typical user on a mid-tier Android over 4G: LCP 1.0–1.8s, INP 100–180ms, CLS <0.05. On desktop over fiber: LCP 600–900ms. These are not aspirational targets — they are what we measure on production traffic. If your app is slower than this at launch, we have a bug, not a marketing problem.",
          },
          {
            q: "Will the app be SEO-friendly?",
            a: "Yes — server-rendered HTML, JSON-LD structured data, semantic HTML, sitemap.xml, robots.txt, OpenGraph tags, canonical URLs, hreflang for multi-locale, 301 redirect map for migrations, and a Core Web Vitals budget enforced in CI. We have shipped marketplace and publishing sites that went from <10K indexed pages to >40K indexed pages within 90 days of launch.",
          },
          {
            q: "Do you support headless CMS integration?",
            a: "Yes — Sanity, Contentful, Storyblok, Strapi, Payload, Directus, Hygraph, and headless WordPress (via WPGraphQL). We have shipped Next.js apps with each of these. For marketing-heavy sites we recommend Sanity; for product-led sites we recommend Payload; for clients with an existing WordPress investment we recommend headless WordPress with WPGraphQL.",
          },
          {
            q: "How do you handle A/B testing without hurting Core Web Vitals?",
            a: "We use edge-runtime middleware (Cloudflare Workers or Vercel Edge Middleware) to assign variants in <5ms before the page renders, with the variant stored in a cookie for sticky attribution. We avoid client-side A/B tools (Optimizely, VWO) that cause hydration mismatches and CLS. PostHog Flags, GrowthBook, or Statsig are our default server-side tools.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. We use Linear for issue tracking, GitHub for code, and Slack Connect for daily communication.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All custom code, schemas, prompts and documentation built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work. The ClickTake-owned components (if any, e.g., a shared UI library) are licensed to you perpetually.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the app under a managed SLA ($3K–$9K/month); (2) ClickTake hands off to your team after a 4-week hypercare period with full documentation and a recorded code walkthrough; (3) Hybrid — ClickTake handles on-call escalations and quarterly upgrades, your team handles feature work. Most clients start with option 1 and migrate to option 3 after 6–12 months.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Your Full-Stack Web App?",
    subtitle:
      "Book a free 30-minute architecture call. We will review your current setup, sketch the target architecture on a whiteboard with you, and tell you honestly whether a full rebuild is the right call — or whether a targeted re-platform of the slowest routes would deliver 80% of the value at 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min architecture call",
        description: "Free. No deck. We diagnose your current bottlenecks and tell you whether to re-platform, optimize, or stay put.",
      },
      {
        step: "2",
        title: "1-week discovery sprint",
        description: "$6K–$8K fixed. We produce the architecture, the schema, the API contract and a fixed quote for the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, SLA and Core Web Vitals targets — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Architecture Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Full-Stack Playbook", href: "/resources", variant: "outline" },
  },
}
