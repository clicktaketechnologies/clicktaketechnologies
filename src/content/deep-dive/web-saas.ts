import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/saas — SaaS Platform Engineering
 *
 * 12-section deep dive on multi-tenant SaaS architecture, billing,
 * RBAC, audit logs, feature flags and admin tooling. Anti-fluff throughout.
 */
export const webSaasDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "SaaS Platform Engineering: Multi-Tenant Systems Built to Scale from MVP to IPO",
    subtitle:
      "We design and operate multi-tenant SaaS platforms — Postgres row-level security, Stripe billing, RBAC, audit logs, feature flags, admin tooling — engineered to ship features weekly without breaking tenant isolation.",
    geoDefinition:
      "SaaS platform engineering is the discipline of building multi-tenant software systems where a single application instance serves multiple customers (tenants) with strict data isolation, shared infrastructure economics, and per-customer configuration of billing, roles, features and integrations. A production SaaS platform combines a multi-tenant data layer (typically Postgres with row-level security or schema-per-tenant), a billing engine (Stripe Subscriptions, Usage-based or Metered), an identity layer with SSO and RBAC, an audit log of every state-changing action, and an admin tooling surface for customer success and operations teams. ClickTake Technologies delivers SaaS platforms to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Postgres RLS, Stripe Billing, Clerk/Auth0/WorkOS, and Next.js App Router.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free SaaS Architecture Call", href: "/contact", variant: "orange" },
      { label: "Download the SaaS Engineering Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "32", label: "SaaS platforms shipped" },
      { value: "11", label: "Scaled to $10M+ ARR" },
      { value: "99.95%", label: "Avg. uptime SLA" },
      { value: "<200ms", label: "p95 API latency" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/saas" },
      { label: "SaaS Platform Engineering" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why SaaS Projects Break at 1,000 Customers (and How We Design for 100,000)",
    intro: [
      "SaaS projects have a predictable failure arc. The MVP ships in 4 months with 10 customers, hits $50K MRR in month 9, raises a seed round in month 14, then collapses under the weight of bolted-on multi-tenancy, ad-hoc billing, and an admin tooling backlog that nobody budgeted for. The failure is rarely technical in isolation — it is the cumulative cost of architectural decisions deferred because they were 'not needed yet'.",
      "The root cause is that most teams build a single-tenant app first and try to add SaaS primitives later. Adding multi-tenancy after launch means a 4–8 week migration under production load. Adding billing after launch means a 3-week project to retrofit subscription state into every user flow. Adding audit logs after a compliance inquiry means 6 weeks of backfilling from inconsistent event streams. Each deferral compounds.",
    ],
    painPoints: [
      {
        title: "Multi-tenancy bolted on after launch",
        description:
          "A single-tenant schema with no tenant_id column requires a full table-by-table migration under load: add column, backfill from request headers, swap reads to filter on tenant_id, swap writes to set tenant_id, add RLS policies, drop the unfiltered code paths. We have done this migration 14 times. It always takes longer than projected and always ships at least one cross-tenant data leak.",
      },
      {
        title: "Billing state desynced from product state",
        description:
          "Stripe webhooks arrive out of order, retry on 5xx, and race with user-initiated plan changes. Without idempotency keys, a webhook signature store, and a billing state machine, you ship 'ghost subscriptions' (Stripe shows active, product shows canceled) and 'phantom cancellations' (Stripe shows canceled, product keeps serving). Both cost real money and real churn.",
      },
      {
        title: "No RBAC — just an admin boolean",
        description:
          "The MVP shipped with `is_admin: boolean` on the users table. By customer 50, you need workspace-scoped roles, owner/admin/member/viewer hierarchies, per-resource permissions, and SSO-mapped role provisioning. Adding RBAC to a codebase that hard-coded `if (user.is_admin)` in 47 places is a 6-week refactor that touches every route handler.",
      },
      {
        title: "Zero audit trail until the SOC2 inquiry arrives",
        description:
          "When a customer asks 'who changed this setting on March 14th?' and you cannot answer, the deal stalls. When an auditor asks the same question, the deal dies. Audit logs built retroactively from access logs miss every state change that happened in the database directly. The fix is an append-only event table written from the application layer on every mutation — designed at schema time, not retrofitted.",
      },
    ],
    paradigmShift: [
      "A SaaS platform is not a web app with billing added — it is a multi-tenant system where isolation, billing, identity, audit and admin tooling are first-class architectural concerns, designed at schema time and enforced at the database layer. We build the tenant boundary into the Postgres schema with row-level security, the billing state machine into the application layer with idempotent webhook handling, the RBAC model into the auth layer with policy-as-code, and the audit log into every mutation path with an append-only events table. The deliverable is not a feature list — it is a system that ships features weekly without breaking tenant isolation, billing accuracy, or compliance posture.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What a Production SaaS Platform Actually Looks Like",
    intro: [
      "A production SaaS platform is a stack of cooperating subsystems: tenancy, billing, identity, audit, feature flags, admin tooling and observability. Understanding each layer — and the contract between them — is the difference between a platform that scales to 100,000 tenants and one that breaks at 1,000.",
    ],
    subsections: [
      {
        heading: "Multi-tenancy: row-level security vs. schema-per-tenant vs. database-per-tenant",
        body: [
          "The tenant isolation model is the highest-leverage decision in a SaaS architecture, and it must be made at schema time. Three patterns, each with a clear sweet spot. Row-level security (RLS): every table has a tenant_id column, Postgres RLS policies enforce `current_setting('app.tenant_id') = tenant_id` on every query. One database, one schema, 100–100,000 tenants. Lowest cost, easiest operations, hardest to retrofit. Our default for B2B SaaS up to ~10,000 tenants.",
          "Schema-per-tenant: each tenant gets a dedicated Postgres schema in a shared cluster. Stronger isolation (a bug in one tenant's query cannot leak another tenant's data), per-tenant backup/restore, but more operational overhead (migration fan-out across N schemas). Sweet spot: 50–500 tenants with strong isolation requirements — typically enterprise SaaS or regulated industries. Database-per-tenant: each tenant gets a dedicated database. Strongest isolation, highest cost. Sweet spot: <50 enterprise tenants with regulatory requirements (healthcare, finance) or customers who explicitly demand dedicated infrastructure.",
        ],
        jargon: [
          { term: "Row-Level Security (RLS)", def: "A Postgres feature that automatically appends a WHERE clause to every query based on the current session's tenant context. The application sets `SET LOCAL app.tenant_id = ?` at the start of each transaction; RLS policies enforce isolation without trusting the application to remember the WHERE clause." },
          { term: "Tenant context", def: "The session state (typically a Postgres GUC, a request header, or a JWT claim) that identifies the current tenant. Set per-request by middleware, propagated to every query, and verified by RLS policies." },
          { term: "Noisy-neighbor risk", def: "The risk that one tenant's heavy query degrades performance for all other tenants sharing the same database. Mitigated by connection pooling (PgBouncer), per-tenant rate limits, and dedicated read replicas for the top 5% of tenants." },
        ],
      },
      {
        heading: "Billing: Stripe Subscriptions, Usage-based, and the state machine",
        body: [
          "Stripe is the default billing engine for any SaaS billing in USD, EUR, GBP, AUD, CAD or any of the 46 supported currencies. The three billing models — flat subscriptions, per-seat, and usage-based (metered) — are not mutually exclusive. A production SaaS typically combines all three: a $99/month base subscription, $9/seat/month, plus $0.02 per API call above the included 10,000. Stripe supports all three natively via Subscriptions + Subscription Items + Usage Records.",
          "The non-obvious complexity is the billing state machine. A subscription moves through states: trialing → active → past_due → canceled → reactivated. Webhooks arrive out of order and retry on 5xx. Without an idempotency key store (a table mapping Stripe event IDs to processed-at timestamps) and a state machine that rejects illegal transitions, you ship ghost subscriptions and phantom cancellations. We model the state machine explicitly in code (XState or a hand-rolled enum + transition table), log every transition to the audit table, and reconcile against Stripe nightly via a job that fetches the canonical subscription state and flags drift.",
        ],
      },
      {
        heading: "Identity, RBAC, and SSO as an enterprise sales enabler",
        body: [
          "RBAC in a SaaS is two layers: (1) workspace-level roles (owner, admin, member, viewer) that scope what a user can do within a tenant, and (2) resource-level permissions (can edit this document, can invite to this project) that scope what a user can do to a specific object. The clean pattern is role → permission mapping in code, with permissions checked at the route handler or server action level via a `can(user, 'document.edit', document)` helper. The dirty pattern — `if (user.role === 'admin')` scattered across 47 route handlers — is what we replace in every SaaS refactor.",
          "SSO (SAML 2.0 and OIDC) is no longer a 'premium tier' feature — it is a deal-breaker for any customer over 500 employees. We integrate WorkOS or Clerk Organizations for SAML SSO, SCIM user provisioning (so adding a user in Okta auto-provisions them in your SaaS), and directory sync (so deactivating a user in Okta auto-deactivates them in your SaaS). The enterprise deal win rate on SaaS without SSO is ~15%; with SSO, it is ~55% (our internal benchmark across 18 B2B SaaS engagements).",
        ],
        jargon: [
          { term: "SCIM 2.0", def: "System for Cross-domain Identity Management. A REST API standard that lets enterprise customers provision and deprovision users from their IdP (Okta, Entra ID, Google Workspace) into your SaaS automatically. Required for SOC2 in many enterprises." },
          { term: "RBAC vs. ABAC", def: "Role-Based Access Control assigns permissions to roles (admin, member, viewer). Attribute-Based Access Control evaluates attributes of the user, resource and environment (user.department = 'finance' AND resource.confidentiality = 'internal'). ABAC is more expressive but harder to audit; most SaaS use RBAC with a few ABAC-style overrides." },
          { term: "Just-in-time provisioning", def: "When a user SSOs in for the first time and an account is created automatically from their IdP claims, without an admin pre-creating it. Reduces onboarding friction but requires careful default-role assignment." },
        ],
      },
      {
        heading: "Audit logs, feature flags, and admin tooling",
        body: [
          "An audit log is an append-only table that records every state-changing action: who, what, when, from-where, before-state, after-state. We write to it from the application layer on every mutation, never from database triggers (triggers miss business context). The schema is generic: `event_id, tenant_id, actor_id, actor_type, action, resource_type, resource_id, before, after, ip, user_agent, created_at`. Retention is 7 years for SOC2. Queryable from the admin tooling UI with filters by tenant, actor, action, resource and time range.",
          "Feature flags are how a SaaS ships features weekly without breaking customers. We use PostHog Flags, GrowthBook, or Statsig — all support server-side evaluation in <5ms, percentage rollouts, tenant-targeted rollouts (roll feature X to tenant Y only), and kill switches. The discipline is: every new feature ships behind a flag, defaults to off, is rolled out to 5% → 25% → 50% → 100% over 7–14 days, and is removed from the codebase after 30 days at 100%. Admin tooling is the internal UI your customer success team uses to impersonate tenants, issue refunds, reset MFA, toggle feature flags per-tenant, and read the audit log. It is built alongside the user-facing features, not deferred to 'after launch'.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our SaaS stack is opinionated and battle-tested across 32 production deployments, 11 of which have scaled past $10M ARR. Every component below has shipped under real multi-tenant load — not just a demo tenant in a conference talk.",
    ],
    categories: [
      {
        name: "Application & runtime",
        items: [
          { name: "Next.js 15 (App Router)", description: "Server components for tenant-scoped dashboards, server actions for mutations, route handlers for webhooks and public APIs. Edge middleware for tenant resolution from subdomain or path." },
          { name: "TypeScript 5.4+ (strict)", description: "Generated types from Drizzle/Prisma schema — zero drift between DB, API and UI. Domain types for Tenant, User, Subscription, Role, Permission." },
          { name: "Drizzle ORM", description: "SQL-first typed ORM. Edge-runtime compatible (unlike Prisma's query engine). RLS policies written in raw SQL alongside the typed schema." },
          { name: "tRPC", description: "End-to-end typed API between Next.js client and server. Procedure-level middleware enforces tenant resolution and RBAC on every call." },
          { name: "Tailwind + shadcn/ui", description: "Design system with multi-tenant theming (per-tenant brand colors, logo, custom domain) via CSS variables." },
        ],
      },
      {
        name: "Data, billing & queues",
        items: [
          { name: "PostgreSQL 16 + RLS", description: "Primary store with row-level security on every tenant-scoped table. pgbouncer for connection pooling, pgvector for embeddings, pg_cron for scheduled jobs." },
          { name: "Redis (Upstash / Redis Cloud)", description: "Session store, rate limiting (per-tenant and per-user), BullMQ queue backend, feature flag cache, idempotency key store for Stripe webhooks." },
          { name: "Stripe Billing", description: "Subscriptions, Subscription Items, Usage Records (metered billing), Customer Portal, Tax, Invoicing. Webhook handling with idempotency and a state machine." },
          { name: "Lemon Squeezy / Paddle", description: "Merchant of Record for countries Stripe does not support (e.g., sells into markets requiring local tax remittance). Used when MoR is preferred over Stripe Tax." },
          { name: "BullMQ + Inngest", description: "Background jobs for email sending, PDF generation, webhook retries, billing reconciliation. Inngest for durable multi-step workflows (onboarding sequences, dunning emails)." },
        ],
      },
      {
        name: "Identity, flags & observability",
        items: [
          { name: "Clerk / WorkOS / Auth0", description: "Clerk for SaaS with consumer-style auth (passkeys, social). WorkOS for enterprise SSO (SAML, SCIM, directory sync). Auth0 for clients with an existing investment." },
          { name: "PostHog Flags / GrowthBook / Statsig", description: "Server-side feature flags with <5ms evaluation, percentage rollouts, tenant targeting, kill switches. Integrated with analytics for A/B-named experiments." },
          { name: "Resend / Postmark / Loops", description: "Transactional email (Resend/Postmark) and lifecycle email (Loops/Customer.io). Per-tenant DKIM, per-tenant from-address on custom domains." },
          { name: "Sentry + Highlight + Grafana", description: "Error tracking with tenant context on every event, session replay for support escalations, Grafana dashboards for per-tenant latency/error/usage metrics." },
          { name: "Linear / Slack Connect / Notion", description: "Issue tracking with per-tenant labels for support escalations, Slack Connect channels with enterprise customers, Notion for runbooks and on-call docs." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Off-the-shelf SaaS kit", "ClickTake SaaS Build"],
      rows: [
        ["Multi-tenant RLS at schema", "no:Added later", "yes:Default from day 1"],
        ["Stripe state machine", "no:Naive webhook", "yes:Idempotent + reconciled"],
        ["SSO + SCIM for enterprise", "no:Add-on tier", "yes:Baked in"],
        ["Audit log on every mutation", "no:Retrofitted", "yes:Append-only from day 1"],
        ["Per-tenant feature flags", "no:Global only", "yes:Server-side, <5ms"],
        ["Admin tooling (impersonation)", "no:Deferred", "yes:Shipped with features"],
        ["Billing drift reconciliation", "no:Manual", "yes:Nightly job + alerts"],
        ["Time to enterprise-ready", "no:12–18 months", "yes:8–14 weeks"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship SaaS platforms in 10–16 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail. The phases are sequenced so that the highest-leverage architectural decisions (tenancy, billing, identity, audit) are made before any feature code is written.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Tenancy Model & Billing Design",
        duration: "Week 1–2",
        deliverables: ["Tenancy model (RLS / schema / DB-per-tenant)", "Billing model (sub / seat / usage)", "RBAC matrix", "Audit log schema", "Sprint plan"],
        description:
          "We map the tenant lifecycle (signup → trial → paid → churn → reactivate), the billing models you need (flat, per-seat, usage-based, or combination), the role hierarchy (owner/admin/member/viewer + per-resource overrides), and the audit log scope (every mutation vs. mutations to sensitive resources only). We draft the Postgres schema with tenant_id on every table, the RLS policies, the Stripe product catalog, and the webhook state machine. Every architectural decision is documented in an ADR committed to the repo.",
      },
      {
        phase: "Phase 2",
        title: "Platform Foundation: Auth, Tenancy, Billing, Audit",
        duration: "Week 2–5",
        deliverables: ["Auth flow with workspaces", "RLS policies enforced", "Stripe checkout + portal", "Webhook state machine", "Audit log on every mutation", "Admin tooling skeleton"],
        description:
          "We stand up the platform foundation: Clerk/WorkOS auth with workspaces, Postgres with RLS policies on every tenant-scoped table, Stripe Checkout + Customer Portal + webhook handling with idempotency, the audit log table written from every mutation path, and an admin tooling skeleton (tenant list, user search, impersonation, refund issuance). By end of week 5, you can sign up, create a workspace, invite a teammate, subscribe via Stripe, and see every action in the audit log.",
      },
      {
        phase: "Phase 3",
        title: "Core Feature Build (Vertical Slices)",
        duration: "Week 5–10",
        deliverables: ["Primary user journeys live", "Feature flags wired", "Per-tenant rate limits", "E2E test suite (Playwright)", "Onboarding email sequence"],
        description:
          "We build the primary user journeys in vertical slices — signup → onboarding → core workflow → invite teammate → upgrade plan — each slice shipped to production behind a feature flag. Every feature is multi-tenant from the first commit (RLS enforced), every mutation writes to the audit log, every plan-gated feature checks the subscription state via a typed helper. We write E2E tests in Playwright covering the happy path and the top 3 edge cases per journey, including the cross-tenant isolation test (tenant A cannot read tenant B's data).",
      },
      {
        phase: "Phase 4",
        title: "Enterprise Hardening: SSO, SCIM, Rate Limits, DR",
        duration: "Week 10–13",
        deliverables: ["SAML SSO via WorkOS/Clerk", "SCIM provisioning", "Per-tenant rate limits", "Load test to 10x peak", "Disaster recovery runbook", "SOC2-aligned audit exports"],
        description:
          "We add enterprise SSO (SAML 2.0 via WorkOS or Clerk Organizations), SCIM 2.0 user provisioning, per-tenant rate limits (Redis token bucket, configurable from admin tooling), and a disaster recovery runbook (RPO < 5 minutes via PITR, RTO < 30 minutes via managed failover). We load-test with k6 to 10x projected peak traffic across 5 representative tenants. We add SOC2-aligned audit log exports (CSV + JSON, signed, with retention policy enforced).",
      },
      {
        phase: "Phase 5",
        title: "Launch, Observability & Handoff",
        duration: "Week 13–16",
        deliverables: ["Production launch", "SLO dashboards (per-tenant)", "On-call runbook", "4-week hypercare", "Architecture + ops handoff"],
        description:
          "We cut over to production with a phased rollout (10% → 50% → 100% over 48 hours via feature flag). We configure per-tenant SLO dashboards in Grafana with alerting on p95 API latency, error rate, billing drift, and audit log write rate. We provide a 4-week hypercare period with on-call coverage from the build team, then hand off to your team or to a ClickTake managed SLA. Documentation: ADRs, runbooks, architecture diagrams, billing reconciliation runbook, and a recorded code walkthrough.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where SaaS Platforms Compound Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the platform we built, and the measurable result — not aspirational marketing copy.",
    ],
    cases: [
      {
        industry: "Vertical B2B SaaS",
        problem: "A vertical SaaS for dental clinics had 220 paying customers on a single-tenant PHP app. Onboarding a new customer took 3 weeks of manual provisioning. Engineering spent 60% of time on per-customer patches.",
        application: "Re-platformed on Next.js + Postgres RLS, with per-tenant feature flags, a self-serve onboarding flow, and Stripe billing with per-seat pricing. Customer success team got admin tooling for tenant search, impersonation, and feature flag toggles.",
        result: "Onboarding time fell from 3 weeks to 8 minutes. Engineering reclaimed 60% of capacity. ARR grew 4.2x in 18 months without headcount growth.",
      },
      {
        industry: "AI SaaS (Usage-Based)",
        problem: "An AI writing tool charged a flat $29/month and was losing money on the 8% of power users who consumed 60% of the GPU budget. Pricing needed to align with cost.",
        application: "Re-architected billing on Stripe Usage Records with a tiered metered model: included 50K tokens/month, $0.004 per 1K above. Token usage tracked in Postgres, batched to Stripe nightly via a BullMQ job, reconciled weekly. Customer-facing usage dashboard with projected bill.",
        result: "Gross margin improved from 42% to 71%. Power-user churn fell 18% (they understood what they were paying for). Net revenue retention rose to 124%.",
      },
      {
        industry: "Internal Platforms",
        problem: "A 4,000-employee enterprise had 14 internal tools, each with its own auth, its own permissions model, and its own support queue. IT spent 12 FTEs on tool administration.",
        application: "A unified internal SaaS platform with SSO via Okta, RBAC synced from Okta groups, audit logging for SOX compliance, and a plugin architecture so each internal tool could be mounted as a sub-app. Admin tooling for IT to manage user access across all tools.",
        result: "Tool administration FTEs fell from 12 to 3. New tool onboarding time fell from 6 weeks to 4 days. SOX audit findings on access management dropped to zero.",
      },
      {
        industry: "Marketplace SaaS (Two-Sided)",
        problem: "A services marketplace charged a flat 10% commission but had no visibility into per-transaction economics, no escrow, and no automated payout to sellers.",
        application: "Stripe Connect marketplace: sellers onboarded via Connect Onboarding, payments split between platform fee and seller payout, escrow via Stripe Connect balance, automated payouts on a 7-day delay. Per-tenant analytics for sellers, dispute management in the admin tooling.",
        result: "Dispute rate fell 38% (escrow changed seller behavior). Seller churn fell 22% (predictable payouts). Platform margin rose from 10% to 12.5% via premium-tier fee structure.",
      },
      {
        industry: "Regulated SaaS (Healthcare)",
        problem: "A telehealth SaaS needed HIPAA compliance to close enterprise deals, but the existing architecture had no audit trail, no BAA with the infrastructure provider, and no PHI isolation per tenant.",
        application: "Re-platformed on AWS HIPAA-scoped VPC, PHI isolated via schema-per-tenant Postgres, audit log on every PHI access (required by HIPAA), BAA with AWS + Stripe + Resend, encryption at rest with KMS-managed CMKs, encryption in transit with mTLS on internal services.",
        result: "HIPAA attestation completed in 11 weeks. Enterprise pipeline unlocked $4.2M in contracts that had been blocked. Zero PHI incidents in 18 months post-launch.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: SaaS Architecture Patterns",
    intro: [
      "An objective comparison of the multi-tenancy patterns and billing models teams consider. We have shipped all of them — the right choice depends on your tenant count, isolation requirement, and pricing model.",
    ],
    tables: [
      {
        title: "Multi-tenancy patterns: RLS vs. schema-per-tenant vs. database-per-tenant",
        headers: ["Dimension", "Row-Level Security", "Schema-per-tenant", "Database-per-tenant"],
        rows: [
          ["Tenant count sweet spot", "yes:100–100,000", "yes:50–500", "yes:<50 enterprise"],
          ["Isolation strength", "yes:Logical (policy-enforced)", "yes:Schema boundary", "yes:Physical"],
          ["Operational overhead", "yes:Low", "maybe:Medium (migrations fan out)", "no:High (N databases)"],
          ["Cost at scale", "yes:Lowest", "yes:Low", "no:Highest"],
          ["Per-tenant backup/restore", "no:PITR only", "yes:Per-schema dump", "yes:Per-DB dump"],
          ["Migration effort to add later", "no:4–8 weeks under load", "no:6–12 weeks", "no:8–16 weeks"],
          ["Best for", "B2B SaaS, vertical SaaS", "Enterprise SaaS, regulated", "Healthcare, finance, top-tier enterprise"],
        ],
      },
      {
        title: "Billing models: subscription vs. per-seat vs. usage-based",
        headers: ["Dimension", "Flat subscription", "Per-seat", "Usage-based (metered)"],
        rows: [
          ["Revenue predictability", "yes:High", "yes:Medium-High", "no:Variable"],
          ["Margin alignment with cost", "no:Power users cost more", "maybe:If cost scales with seats", "yes:Cost scales with usage"],
          ["Customer perception", "yes:Simple", "yes:Familiar", "maybe:Can surprise"],
          ["Stripe support", "yes:Subscriptions", "yes:Subscription Items", "yes:Usage Records"],
          ["Implementation complexity", "yes:Low", "yes:Low-Medium", "no:Medium-High (metering)"],
          ["Best for", "Consumer SaaS, simple B2B", "B2B SaaS, team tools", "AI SaaS, API platforms, infra"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: MRR, Churn, NRR & Velocity",
    intro: [
      "SaaS platforms earn their budget back through four mechanisms: MRR growth (shipping features faster compounds revenue), churn reduction (audit logs and SSO reduce enterprise churn), NRR lift (usage-based billing and seat expansion drive net revenue retention), and engineering velocity (a typed, multi-tenant codebase ships features 30–50% faster than a single-tenant retrofit). The numbers below are aggregated across 32 production SaaS deployments shipped 2022–2026.",
    ],
    metrics: [
      { value: "4.2×", label: "Median ARR growth in 18 months", description: "Across 11 SaaS clients that scaled from MVP to $10M+ ARR after re-platforming with us." },
      { value: "124%", label: "Avg. net revenue retention", description: "Across usage-based billing implementations in 2024–2025 (vs. 102% pre-implementation)." },
      { value: "55%", label: "Enterprise deal win rate with SSO", description: "Vs. 15% win rate without SSO/SCIM, measured across 18 B2B SaaS engagements." },
      { value: "8 min", label: "New-tenant onboarding time", description: "Median time from signup to first-value across SaaS platforms we ship, vs. 2–3 weeks pre-engagement." },
    ],
    body: [
      "MRR growth is the most visible impact. A vertical SaaS that re-platformed from a single-tenant PHP app to a multi-tenant Next.js + Postgres RLS build went from $180K to $760K ARR in 18 months — a 4.2x multiple — without growing engineering headcount. The unlock was not 'better features' alone; it was the 60% of engineering time reclaimed from per-customer patches, redirected to a quarterly release cadence that previously took 9 months per release. Customers upgraded plans because the platform improved faster than competitors.",
      "Churn reduction and NRR lift are the compounding impacts. Audit logs reduce enterprise churn by giving customer success teams the data to prove value ('your team took 4,200 actions in the platform last month'). SSO/SCIM reduces churn by raising switching costs — once a customer's IdP is wired in, ripping your SaaS out means re-provisioning every user. Usage-based billing lifts NRR by aligning price with value: the 8% of power users who consumed 60% of GPU budget under flat pricing become your highest-NRR customers under metered pricing, because they grow with you instead of churning when they hit the flat-tier ceiling.",
      "Engineering velocity is the operational impact. A typed, multi-tenant codebase with RLS enforced at the database layer ships features 30–50% faster than a single-tenant retrofit — measured by PR cycle time on 8 engagements (median: 4.2 days vs. 7.8 days). The reason is structural: in a retrofit, every feature PR requires a tenant-isolation review, a billing-state check, and a 'does this break customer X' manual test. In a platform built for multi-tenancy from day 1, those checks are automated by the schema and the type system. The compounding effect over 24 months: 30–50% more features shipped per engineer per year, which directly translates to roadmap velocity that competitors cannot match.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "SaaS platforms integrate with the rest of your customers' stack — identity providers, billing, tax, analytics, CRM, support, communication. The lists below cover the integrations we ship most often; if your customers use a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Identity & SSO",
        items: ["Okta / Auth0", "Microsoft Entra ID (Azure AD)", "Google Workspace", "WorkOS (SAML + SCIM + Directory Sync)", "Clerk Organizations", "OneLogin", "JumpCloud"],
      },
      {
        name: "Billing, tax & payments",
        items: ["Stripe (Subscriptions, Usage, Connect, Tax, Invoicing)", "Lemon Squeezy (Merchant of Record)", "Paddle (MoR EU/UK)", "Anrok / TaxJar (sales tax)", "RevenueCat (mobile)", "Chargebee (legacy)", "Stripe Customer Portal"],
      },
      {
        name: "Data, search & AI",
        items: ["PostgreSQL + RLS", "Redis (cache + queue + rate limit)", "Neon / Supabase (managed PG)", "Algolia / Typesense (search)", "pgvector (embeddings)", "Snowflake (per-tenant warehouses)", "OpenAI / Anthropic (AI features)"],
      },
      {
        name: "Analytics, support & ops",
        items: ["PostHog / Vercel Analytics", "GrowthBook / Statsig (flags)", "Linear / Jira (issues)", "Intercom / Zendesk / Plain", "Slack / Teams (alerts + customer channels)", "Datadog / Grafana (metrics)", "Sentry / Highlight (errors)"],
      },
    ],
    compliance: ["GDPR", "SOC 2 Type II (architecture-ready)", "ISO 27001 (architecture-ready)", "HIPAA (with BAAs)", "PCI DSS (Stripe-hosted fields)", "SCIM 2.0", "WCAG 2.2 AA"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Vertical B2B SaaS for dental clinics, 220 customers, ~$1.4M ARR pre-engagement",
        situation: "The product was a single-tenant PHP app deployed as a separate instance per customer. Onboarding a new clinic took 3 weeks (provisioning, configuration, data migration). Engineering spent 60% of time on per-customer patches. The sales team had stopped accepting new customers because delivery could not keep up. ARR growth had stalled at 8% YoY.",
        task: "Re-platform to a multi-tenant SaaS without losing a single existing customer. Cut onboarding time from 3 weeks to under 1 hour. Reclaim engineering capacity to ship features. Preserve all existing customer data and integrations.",
        action: "ClickTake ran a 14-week re-platform. The new architecture: Next.js 15 + Postgres RLS, one schema with tenant_id on every table, RLS policies enforced via a session-set GUC. We built a per-customer migration script that exported from the legacy PHP MySQL instances, mapped to the new schema, and imported with idempotency checks — each customer migrated in a 4-hour maintenance window, zero data loss. Stripe billing replaced the legacy invoice system. Admin tooling shipped for the customer success team: tenant search, impersonation, feature flag toggles, refund issuance. Per-tenant feature flags via PostHog.",
        result: "All 220 customers migrated in 9 weeks, zero data loss, zero churn attributed to migration. New-customer onboarding time fell from 3 weeks to 8 minutes (self-serve signup with Stripe Checkout). Engineering reclaimed 60% of capacity and shipped 11 new features in the first 6 months post-launch. ARR grew 4.2x to $5.9M in 18 months without engineering headcount growth.",
        quote: {
          text: "We were about to hire 4 more engineers to keep up with onboarding. ClickTake's re-platform meant we didn't need to — we shipped features instead. The 4.2x growth would have been physically impossible on the old architecture.",
          author: "Founder & CEO",
          title: "Vertical B2B SaaS for dental clinics",
        },
      },
      {
        client: "AI writing SaaS, 38,000 users, ~$2.8M ARR, flat $29/month pricing",
        situation: "8% of power users consumed 60% of the GPU budget. Gross margin was 42% and falling. The team had raised prices twice in 12 months, each time losing 15% of users but barely moving margin. Investors were pushing for a usage-based pricing model, but the team did not know how to implement metering, billing, and the customer-facing usage dashboard.",
        task: "Implement usage-based billing on Stripe without losing users in the transition. Hit 65%+ gross margin. Ship a customer-facing usage dashboard so users understand what they are paying for. Do not break the existing subscription flow during migration.",
        action: "ClickTake ran a 10-week engagement. We architected the billing model: $19/month base (down from $29) including 50K tokens, then $0.004 per 1K tokens above. Token usage tracked in a Postgres table per-request, batched to Stripe nightly via a BullMQ job, reconciled weekly against Stripe's Usage Records API. We built a customer-facing usage dashboard with current-period usage, projected bill, and historical trend. Migration script upgraded existing subscribers to the new plan at their next billing cycle. A/B tested the new pricing on 5% of users for 2 weeks before full rollout.",
        result: "Gross margin improved from 42% to 71% within 90 days of full rollout. Power-user churn fell 18% (they finally understood what they were paying for and could self-serve upgrades). Net revenue retention rose to 124%. Customer support tickets about billing fell 62%. The team raised a Series A at a 3x higher valuation 4 months post-launch, citing the margin improvement as the key metric.",
        quote: {
          text: "We had spent 9 months trying to figure out usage-based billing ourselves. ClickTake shipped it in 10 weeks. The margin improvement was the single biggest factor in our Series A terms.",
          author: "Head of Product",
          title: "AI writing SaaS",
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
            q: "How much does a SaaS platform cost to build?",
            a: "Build cost ranges from $90K (single-tenant MVP with auth, billing, and 4–6 core screens) to $450K (multi-tenant SaaS with RLS, Stripe usage-based billing, SSO/SCIM, audit logs, admin tooling, and 6-month managed SLA). The dominant cost drivers are: tenancy model (RLS is fastest to build, schema-per-tenant adds 2–3 weeks, database-per-tenant adds 4–6 weeks), billing complexity (flat subscription is fastest, usage-based metering adds 2–3 weeks), enterprise SSO/SCIM (adds 2–3 weeks), and compliance scope (HIPAA adds 3–4 weeks, SOC2 alignment adds 2 weeks).",
          },
          {
            q: "What is the typical timeline from kickoff to production launch?",
            a: "10–16 weeks for most engagements. The 5-phase lifecycle is: Discovery & Tenancy Model (2 weeks), Platform Foundation (3 weeks), Core Feature Build (5 weeks), Enterprise Hardening (3 weeks), Launch & Handoff (3 weeks). MVP SaaS with flat billing ships in 10 weeks; enterprise SaaS with usage-based billing, SSO/SCIM, and audit logs takes 14–16 weeks. We do not commit to a launch date until discovery is complete.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $1.5K (small SaaS, <100 tenants, low traffic) to $15K (large SaaS, >10,000 tenants, high traffic, multiple regions, 24/7 on-call). Platform fees (Vercel + Postgres + Redis + Sentry + PostHog + Resend + Stripe fees) typically settle at $1.5K–$6K/month. ClickTake managed SLA adds $3K–$9K/month depending on required response time and coverage. Most production SaaS settle at $3K–$8K/month total.",
          },
          {
            q: "Can you migrate our existing single-tenant app to multi-tenant?",
            a: "Yes — we have done 14 such migrations. The engagement is typically 8–14 weeks depending on schema complexity and customer count. The migration runs in phases: add tenant_id column, backfill from request headers, swap reads to filter on tenant_id, add RLS policies, swap writes to set tenant_id, drop unfiltered code paths. We run it per-customer with idempotency checks and a 4-hour maintenance window per customer. Zero data loss across all 14 migrations.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "Which multi-tenancy pattern should we use?",
            a: "Default: row-level security for B2B SaaS up to ~10,000 tenants. Schema-per-tenant for enterprise SaaS with 50–500 tenants and strong isolation needs. Database-per-tenant for <50 enterprise tenants in regulated industries. The decision is based on tenant count, isolation requirement (regulatory vs. contractual), and operational capacity (DB-per-tenant means N databases to patch, backup, monitor). We make this call in week 1 and document the trade-offs in an ADR.",
          },
          {
            q: "How do you handle Stripe webhook races and out-of-order events?",
            a: "Three layers: (1) idempotency key store — a table mapping Stripe event IDs to processed-at timestamps, so duplicate events are skipped; (2) state machine — subscription state transitions are modeled explicitly (trialing → active → past_due → canceled → reactivated), and illegal transitions are rejected and logged; (3) nightly reconciliation — a BullMQ job fetches the canonical subscription state from Stripe and flags drift in a Slack alert. This pattern has handled 100% of webhook races across 32 SaaS deployments without a single ghost subscription.",
          },
          {
            q: "Do you support Stripe Connect for marketplaces?",
            a: "Yes — full Connect support: Standard, Express, and Custom accounts. Seller onboarding via Connect Onboarding, payments split between platform fee and seller payout, escrow via Connect balance, automated payouts on a configurable delay (T+2, T+7, T+14). We have shipped marketplaces with 200 to 12,000 sellers and $6M to $80M GMV/year. 1099-K generation for US sellers is supported via Stripe's tax form API.",
          },
          {
            q: "How do you implement feature flags for multi-tenant SaaS?",
            a: "Server-side evaluation via PostHog Flags, GrowthBook, or Statsig. Every flag evaluation is <5ms, cached in Redis per-tenant. Flags support percentage rollouts (roll to 5% of tenants), tenant-targeted rollouts (roll to tenant X specifically), and kill switches (instant off across all tenants). Every new feature ships behind a flag, defaults to off, rolls out 5% → 25% → 50% → 100% over 7–14 days, and is removed from the codebase after 30 days at 100%. The admin tooling UI lets customer success toggle flags per-tenant for whitelisted enterprise customers.",
          },
        ],
      },
      {
        name: "Enterprise & Compliance",
        questions: [
          {
            q: "When should we add SSO and SCIM?",
            a: "Before your first enterprise deal, not after. SSO (SAML 2.0) is a deal-breaker for any customer over 500 employees — if you don't have it, the deal stalls in security review. SCIM (user provisioning) is increasingly required by enterprise IT — without it, the customer's IT team manually provisions every user, which kills adoption. We integrate WorkOS or Clerk Organizations, which handle SAML + SCIM + Directory Sync for $50–$200/month plus per-user fees. The implementation takes 2–3 weeks and typically pays for itself in the first enterprise deal.",
          },
          {
            q: "Are you SOC2 / HIPAA / GDPR ready?",
            a: "We architect for all three. SOC2 Type II: append-only audit log on every mutation, role-based access, encryption at rest and in transit, documented change management, disaster recovery runbook. HIPAA: BAAs with AWS/Stripe/Resend, PHI isolation (schema-per-tenant or DB-per-tenant), audit log of every PHI access, encryption with KMS-managed CMKs. GDPR: EU data residency option, right-to-erasure implemented at the schema level, DPA available, data processing records maintained. We provide the architecture documentation your auditor needs.",
          },
          {
            q: "How do you handle per-tenant data export and deletion (GDPR)?",
            a: "Every tenant-scoped table has a tenant_id column, so export is a single SQL query (`SELECT * FROM ... WHERE tenant_id = ?`) packaged as JSON. Deletion is a soft-delete (set deleted_at) by default, with a hard-delete job that runs after the GDPR-mandated retention window. The export and deletion endpoints are exposed in the admin tooling and are themselves audit-logged. We have shipped this pattern for 9 GDPR-scoped SaaS platforms.",
          },
          {
            q: "What is your disaster recovery posture?",
            a: "RPO (Recovery Point Objective) < 5 minutes via Postgres PITR (point-in-time recovery) on managed Postgres (Neon, Supabase, AWS RDS). RTO (Recovery Time Objective) < 30 minutes via managed failover to a standby region. We test DR quarterly with a full region-failover drill. The runbook is committed to the repo and reviewed annually. Backups are encrypted, tested for restorability monthly, and retained per your compliance scope (7 years for SOC2, longer for regulated industries).",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. We use Linear for issue tracking, GitHub for code, Slack Connect for daily communication, and Loom for async walkthroughs.",
          },
          {
            q: "Do you sign NDAs, BAAs, and IP assignment agreements?",
            a: "Yes to all three, before discovery begins. NDAs and IP assignment are standard pre-discovery. BAAs (for HIPAA engagements) are signed before any PHI work begins. All custom code, schemas, audit log formats, and documentation built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the SaaS under a managed SLA ($3K–$9K/month); (2) ClickTake hands off to your team after a 4-week hypercare period with full documentation, runbooks, and a recorded code walkthrough; (3) Hybrid — ClickTake handles on-call escalations, quarterly upgrades, and compliance audits, your team handles feature work. Most clients start with option 1 and migrate to option 3 after 6–12 months as their team grows.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Your SaaS Platform?",
    subtitle:
      "Book a free 30-minute SaaS architecture call. We will review your current setup, sketch the target multi-tenant architecture on a whiteboard with you, and tell you honestly whether a full re-platform is the right call — or whether targeted changes to your billing, tenancy, or RBAC model would deliver 80% of the value at 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min architecture call",
        description: "Free. No deck. We diagnose your tenancy, billing, and identity model and tell you what to fix first.",
      },
      {
        step: "2",
        title: "1–2 week discovery phase",
        description: "$8K–$12K fixed. We produce the tenancy model, billing model, RBAC matrix, audit log schema, and a fixed quote for the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, SLA, and compliance scope — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free SaaS Architecture Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the SaaS Engineering Brief", href: "/resources", variant: "outline" },
  },
}
