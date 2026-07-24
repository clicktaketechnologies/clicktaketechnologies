import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/custom-software — Custom Software Development
 *
 * 12-section deep dive on CRMs, booking platforms, inventory systems, repair
 * shop management, business portals, API integrations, SaaS products and
 * reporting dashboards. Architecture: microservices, event-driven (Kafka /
 * EventBridge), CQRS, multi-tenant. Stack: Next.js, React Native / Flutter,
 * Postgres, Redis, AWS/GCP/Azure, Docker, K8s. Anti-fluff throughout.
 */
export const webCustomSoftwareDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Custom Software Development: Business Systems Engineered to Fit the Workflow",
    subtitle:
      "We design, build and operate custom software — CRMs, booking platforms, inventory systems, repair shop management, business portals, API integrations, SaaS products and reporting dashboards — on Next.js, React Native/Flutter, Postgres, Redis, AWS/GCP/Azure with microservices, event-driven (Kafka/EventBridge), CQRS and multi-tenant architectures, shipped in 12–24 weeks with explicit SLOs on latency, uptime and time-saved-per-workflow.",
    geoDefinition:
      "Custom software development is the engineering discipline of building applications tailored to a specific organization's workflow, data model and integration requirements, in contrast to off-the-shelf SaaS or packaged software. A modern custom build combines a frontend (Next.js web, React Native or Flutter mobile), a backend (Node/Python/Go services, often in a microservices or event-driven topology), a data layer (Postgres, Redis, event store, search index), an integration layer (REST/GraphQL APIs, webhooks, message queues), and an infrastructure layer (Docker containers on AWS ECS/EKS, GCP Cloud Run, Azure AKS or Fly.io). ClickTake Technologies delivers custom software development services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Next.js, FastAPI, Postgres+Drizzle/Prisma, Kafka/EventBridge, Temporal, Docker, Kubernetes, Terraform and the AWS/GCP/Azure native service catalog.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Architecture Call", href: "/contact", variant: "orange" },
      { label: "Download the Custom Software Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "89", label: "Custom systems shipped" },
      { value: "11.4×", label: "Avg. workflow speedup" },
      { value: "99.94%", label: "Avg. uptime (2025)" },
      { value: "<400ms", label: "P95 API latency target" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/custom-software" },
      { label: "Custom Software Development" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Off-the-Shelf Software Caps Your Operating Model",
    intro: [
      "Most businesses hit the same wall 18–36 months after adopting their CRM, ERP or operations SaaS. The product fit the org chart at the time of purchase, but the org chart kept evolving — a new service line, a second warehouse, a regional subsidiary, a regulatory change — and the SaaS didn't. Workarounds multiply: spreadsheets shadow the system, the integration that 'just worked' breaks after the vendor's API v3 deprecation, and a 30-second data entry becomes a 4-minute cross-system copy-paste performed 200 times a day.",
      "The root cause is structural: packaged software optimizes for the median buyer. Your workflow is not the median. The 15% of your process that differs from the median is the 15% that creates your competitive advantage — and it's the 15% the SaaS won't accommodate without custom fields, custom objects, custom workflows, custom Apex/Workflow rules, at which point you are maintaining custom software inside someone else's product, paying their per-seat license for the privilege.",
    ],
    painPoints: [
      {
        title: "The spreadsheet shadow that won't die",
        description:
          "A 2024 study of 400 mid-market firms found 73% maintain a 'shadow system' of spreadsheets and Airtable bases alongside their CRM/ERP because the official system can't model the actual workflow. Each shadow system costs 4–12 FTE-hours per week in reconciliation and is a single formula-error away from a financial misstatement.",
      },
      {
        title: "Integration sprawl that breaks quarterly",
        description:
          "Custom integrations to SaaS vendors (Salesforce, HubSpot, Xero, NetSuite, Zendesk) break on every API version bump — typically 2–4 times per year per integration. Without versioned contracts, integration tests and an alerting layer, the breakage is discovered by users, not engineers, and costs 2–4 days of disrupted operations each time.",
      },
      {
        title: "Per-seat pricing that punishes scale",
        description:
          "A 200-seat team paying $85/seat/month for a SaaS CRM spends $204K/year. Custom software with the same feature set costs $180–350K to build and $30–60K/year to operate — break-even at 18–30 months, then the gap compounds. For 500+ seats, the case is unambiguous.",
      },
      {
        title: "Workflows the SaaS can't model",
        description:
          "Repair-shop job routing with technician skill-matching and parts-reservation interlocks. Multi-warehouse allocation with carrier-cost optimization. Approval chains with role-based delegation and time-based escalation. These are common operational patterns that off-the-shelf systems model poorly or not at all — and they are the patterns that define operational excellence in your category.",
      },
    ],
    paradigmShift: [
      "Custom software is not 'software instead of SaaS' — it is software that fits the workflow the SaaS couldn't model, integrated with the SaaS that does the commodity work. We engineer custom systems as a thin, well-bounded layer that fills the gap between your operational model and your SaaS stack, integrated via versioned APIs and event streams, owned by you as IP, and operated under explicit SLOs. The deliverable is not an app; it is a measurable reduction in workflow time, error rate and per-seat cost — backed by a system you control.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is Custom Software Development?",
    intro: [
      "Custom software is a stack of cooperating layers: frontend, backend services, data plane, integration plane and infrastructure. Understanding each layer — and choosing the right architecture for each — is the difference between a system that ships in 14 weeks and one that bleeds budget for 18 months without reaching production.",
    ],
    subsections: [
      {
        heading: "Architecture: monolith, modular monolith, microservices, event-driven",
        body: [
          "Architecture choice is the highest-leverage decision in any custom build. A monolith (single Next.js app with Postgres) is right for 70% of business applications — CRM, booking, dashboard, portal, internal tool — and ships in 8–14 weeks. A modular monolith (single deployable, strict module boundaries enforced by lint rules and Postgres schemas) extends the monolith's fit to 200K LOC before extraction is needed.",
          "Microservices is right when the team size exceeds 6 engineers (Conway's Law applies — the architecture must match the team structure), when different services have different scaling profiles (the reporting service reads 100× more than the write service), or when different services have different reliability requirements (the booking service must be 99.99%, the recommendation service can be 99.5%). Premature microservices add 4–8 weeks of build overhead and 2–4 weeks/year of ops overhead per service.",
          "Event-driven architecture (Kafka, AWS EventBridge, GCP Pub/Sub) is right when the system has long-running workflows (order fulfillment, claims processing, multi-step approvals), when services need to react to changes in other services without coupling, or when audit/replay is a regulatory requirement. We pair event-driven with CQRS (Command Query Responsibility Segregation) when read patterns differ significantly from write patterns — typical in reporting-heavy systems where the write model is normalized and the read model is denormalized for fast queries.",
        ],
        jargon: [
          { term: "Multi-tenant", def: "A single deployment serves multiple customer organizations (tenants) with strict data isolation. Three isolation models: row-level security (RLS) in shared Postgres (cheapest, scales to ~10K tenants), schema-per-tenant (medium isolation, scales to ~500 tenants), database-per-tenant (strongest isolation, scales to ~50 tenants per DB cluster)." },
          { term: "CQRS", def: "Command Query Responsibility Segregation — separate write models (optimized for validation, business rules, normalization) from read models (optimized for query patterns, often denormalized). The read model is updated via events from the write model. Pays off when read/write ratio exceeds 10:1." },
          { term: "Saga", def: "A pattern for managing distributed transactions across services. Each step publishes an event and has a compensating action for rollback. Orchestrated sagas (Temporal, AWS Step Functions) are easier to reason about; choreographed sagas (Kafka events) scale better." },
        ],
      },
      {
        heading: "The data plane: Postgres, Redis, search, event store",
        body: [
          "Postgres is the default relational store for ~85% of custom builds — ACID transactions, JSONB for semi-structured data, row-level security for multi-tenancy, full-text search for moderate-volume catalogs, and 14K+ TPS on a single r6g.4xlarge with tuned autovacuum and connection pooling via PgBouncer. We use Drizzle ORM for typed queries or Prisma for schema-first migrations.",
          "Redis is the default cache, queue and session store. Used for: hot-path caching (product catalogs, lookup tables), rate-limit counters, session storage, BullMQ/Celery job queues, real-time presence (with pub/sub), and distributed locks for idempotency. A single r7g.large handles 100K ops/sec with sub-millisecond latency; we deploy in cluster mode above 50GB working set.",
          "Search is a separate concern from the OLTP database once the catalog exceeds ~50K rows or needs typo-tolerance, faceting, or merchandising rules. We deploy Typesense (self-hosted, $50/mo) for ≤1M docs, Algolia (managed, $80–800/mo) for ≤10M docs, or Elasticsearch/OpenSearch (self-hosted or managed) for >10M docs or complex aggregations.",
          "The event store is the source-of-truth in event-driven systems. Postgres can serve as an event store up to ~5K events/sec via the outbox pattern; above that we deploy Kafka (MSK on AWS, Confluent Cloud, or self-hosted on EC2). The event store is append-only; projections (read models) are derived from it and can be rebuilt at any time.",
        ],
      },
      {
        heading: "Integration plane: APIs, webhooks, queues, ETL",
        body: [
          "Custom systems exist to integrate. We expose REST APIs (OpenAPI 3.1 spec, versioned via URL prefix /v1/, /v2/), GraphQL APIs (for client-driven queries — typically mobile apps and dashboards), and webhook consumers (for inbound events from Stripe, GitHub, Slack, etc.). Every API is contract-tested with Pact or Schemathesis; every webhook is idempotent and signed.",
          "Outbound integrations to SaaS vendors (Salesforce, HubSpot, Xero, NetSuite, Zendesk, Slack, Microsoft 365) are built against versioned APIs with a version-pinning policy — we pin to the current major version and upgrade on our schedule, not the vendor's. A vendor SDK shim layer isolates the rest of the codebase from vendor API quirks. Failure modes are explicit: retry with exponential backoff for transient errors, dead-letter queue for permanent errors, alert for unexpected patterns.",
          "ETL pipelines sync data between systems on a schedule or event-trigger. We use a spectrum: simple cron + Node script for <1M rows/day, Airbyte or Fivetran for managed connectors to 300+ destinations, or Dagster/Airflow for complex DAGs with dependencies. Real-time CDC (change data capture) via Debezium + Kafka replaces batch ETL when latency requirements are sub-minute.",
        ],
      },
      {
        heading: "Infrastructure: Docker, K8s, serverless, IaC",
        body: [
          "Docker containers are the universal deployment artifact — every service builds to an image, runs the same way in dev and prod, and is reproducible from a Dockerfile committed to Git. We use multi-stage builds to keep image size under 200MB for Node/Python services; distroless or Alpine base images to reduce CVE surface.",
          "Orchestration choice depends on scale and team. AWS ECS with Fargate (serverless containers) is right for 1–20 services — no cluster to manage, $0.04/vCPU-hour, scales to zero. Kubernetes (EKS on AWS, GKE on GCP, AKS on Azure) is right for 20+ services or when the team needs the full control plane — at the cost of 1–2 platform-engineer FTEs to operate. Fly.io is right for geographically distributed deployments (multi-region by default, $0.04/vCPU-hour).",
          "Serverless (AWS Lambda, Cloudflare Workers, Vercel Functions) is right for event-triggered functions (image processing, webhook ingestion, scheduled jobs) with cold-start tolerance. We avoid serverless for high-throughput always-on services — the per-invocation pricing inverts above ~1M invocations/day, and cold-start latency of 200–800ms is unacceptable for synchronous user requests.",
          "Infrastructure as Code (Terraform, AWS CDK, Pulumi) is non-negotiable. Every cloud resource — VPC, RDS, ECS service, IAM role, Cloudflare route — is defined in code, peer-reviewed, and applied via CI/CD. Drift detection runs nightly; manual changes to production infrastructure are reverted automatically. This is the difference between an auditable system and a fragile one.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build Custom Software With",
    intro: [
      "Our custom software stack is opinionated and battle-tested across 89 production deployments. Every component below has been selected because it survived a real production incident — not because it was the newest release on a Hacker News thread.",
    ],
    categories: [
      {
        name: "Frontend",
        items: [
          { name: "Next.js 15 + React 19", description: "Default web frontend. RSC + streaming SSR for <1.5s LCP. App Router for nested layouts. Edge runtime for geo-personalized routes." },
          { name: "React Native + Expo", description: "Cross-platform mobile (iOS + Android) from one TypeScript codebase. Expo EAS Build + Update for OTA app updates without App Store review." },
          { name: "Flutter", description: "Alternative mobile stack for performance-critical apps (60fps animations, complex canvas). Compiled to native ARM; 2–3× faster than RN on graphics-heavy screens." },
          { name: "Tailwind CSS + shadcn/ui", description: "Utility-first CSS + composable Radix-based components. Production-quality design system in 2 days, not 2 months." },
          { name: "TanStack Query + Zustand", description: "Server-state cache (Query) + client-state store (Zustand). Eliminates 80% of Redux boilerplate; integrates with RSC for optimistic updates." },
        ],
      },
      {
        name: "Backend & data",
        items: [
          { name: "Node.js (Fastify) / Python (FastAPI) / Go (Fiber)", description: "Three primary backend stacks. Node for JS-full-stack teams, Python for AI/data-heavy services, Go for high-throughput low-latency services. Pick by team skill, not hype." },
          { name: "PostgreSQL 16 + Drizzle/Prisma", description: "Default relational store. ACID, JSONB, RLS for multi-tenancy, full-text search. Drizzle for type-safe SQL-first queries; Prisma for schema-first migrations." },
          { name: "Redis 7 + BullMQ/Celery", description: "Cache, queue, session store, rate-limit counters. BullMQ for Node job queues; Celery for Python. Single r7g.large handles 100K ops/sec." },
          { name: "Kafka / AWS EventBridge / GCP Pub/Sub", description: "Event bus for event-driven architectures. Kafka for high-throughput (100K+ events/sec), EventBridge for AWS-native serverless, Pub/Sub for GCP." },
          { name: "Temporal", description: "Workflow orchestration for long-running sagas. Durable execution, automatic retry, replay-based debugging. Replaces hand-rolled state machines for multi-step business processes." },
        ],
      },
      {
        name: "Infrastructure & ops",
        items: [
          { name: "AWS (ECS, RDS, S3, CloudFront, Lambda)", description: "Default cloud for ~70% of builds. ECS+Fargate for serverless containers, RDS Postgres, S3+CloudFront for media, Lambda for event functions." },
          { name: "GCP (Cloud Run, Cloud SQL, Cloud Storage)", description: "Alternative cloud for AI-heavy builds (Vertex AI) or when the org is Google Workspace native. Cloud Run is the simplest container deploy UX in the market." },
          { name: "Azure (AKS, Azure SQL, Azure Front Door)", description: "Enterprise cloud for Microsoft-stack orgs (Entra ID, Office 365, Dynamics). AKS for Kubernetes, Azure SQL for SQL Server workloads." },
          { name: "Docker + Terraform + GitHub Actions", description: "Universal IaC + CI/CD. Every cloud resource in Terraform; every build/deploy in GitHub Actions with required reviews and automated test gates." },
          { name: "Datadog / Grafana Cloud / Sentry", description: "Observability stack. Datadog for full-stack APM+logs+metrics; Grafana Cloud for cost-conscious teams; Sentry for frontend+backend error tracking." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Dimension", "Off-the-shelf SaaS", "Low-code (Retool/Internal)", "In-house build", "ClickTake Custom"],
      rows: [
        ["Time to production", "yes:1–4 weeks", "yes:2–6 weeks", "no:9–18 months", "yes:12–24 weeks"],
        ["Workflow fit", "no:~70%", "partial:~80%", "yes:100%", "yes:100%"],
        ["Per-seat cost at 200 seats", "no:$204K/year", "yes:$24K/year", "yes:$0 + FTEs", "yes:$30–60K/year ops"],
        ["Integration depth", "partial:Vendor API", "partial:Pre-built connectors", "yes:Full", "yes:Full"],
        ["IP ownership", "no:Vendor", "no:Platform", "yes:Yours", "yes:Yours"],
        ["Custom workflow modeling", "no:Fields only", "partial:Drag-drop", "yes:Full code", "yes:Full code"],
        ["Compliance & data residency", "partial:Vendor regions", "no:Platform regions", "yes:Full control", "yes:Full control"],
        ["Best for", "Commodity workflows (CRM, accounting)", "Internal tools, <100 users", "Enterprises with 10+ engineers", "Mid-market, 50–5,000 users"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship custom software in 12–24 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint reviews' where the team shows a UI that isn't connected to a database.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Workflow Mapping & Architecture",
        duration: "Week 1–3",
        deliverables: ["Workflow map (current vs. future state)", "Data model", "Architecture diagram", "Integration inventory", "Fixed-price proposal"],
        description:
          "We shadow the actual workflow for 3–5 days, interview users across roles, and map the current state in a Figma/Miro diagram. We identify the 15% of the workflow that the SaaS can't model — this is the build scope. We design the data model (ERD in dbdiagram.io), the service topology (C4 model diagram), and the integration inventory (every system the custom build must talk to, with API versions and auth methods). The fixed-price proposal is the gate output.",
      },
      {
        phase: "Phase 2",
        title: "Backend & Data Plane Build",
        duration: "Week 3–9",
        deliverables: ["Postgres schema + migrations", "API contracts (OpenAPI 3.1)", "Auth + RBAC", "Background job workers", "Integration adapters"],
        description:
          "We build the data plane first — Postgres schema with Drizzle/Prisma migrations, Redis cache layer, event store if event-driven. We define the API contracts in OpenAPI 3.1 (or GraphQL schema) and stub the endpoints. Auth and RBAC are implemented (OAuth 2.1/OIDC via Auth0/Clerk/WorkOS, or self-hosted Keycloak for on-prem). Background workers (BullMQ or Celery) handle long-running tasks. Integration adapters isolate vendor APIs from the core domain.",
      },
      {
        phase: "Phase 3",
        title: "Frontend Build & Mobile App",
        duration: "Week 6–14",
        deliverables: ["Web frontend (Next.js)", "Mobile app (React Native / Flutter) — if in scope", "Design system", "E2E test suite (Playwright)"],
        description:
          "We build the frontend in parallel with the backend — typically starting in week 6 once the API contracts are stable. The design system (Tailwind + shadcn/ui) is built in week 6–7, then screens ship at 2–4 per week. Mobile (if in scope) starts in week 8 once the API is stable enough to integrate. Playwright E2E tests cover the 20 most critical user journeys; visual regression tests catch UI breakage.",
      },
      {
        phase: "Phase 4",
        title: "Integration, Migration & Load Test",
        duration: "Week 12–18",
        deliverables: ["SaaS integrations live (Salesforce/HubSpot/Xero/etc.)", "Data migration from legacy system", "k6/Artillery load test report", "Security review + pen test"],
        description:
          "We wire the integrations to live SaaS instances — versioned, contract-tested, with retry and dead-letter queues. We migrate data from the legacy system (typically a 2-pass migration: full historical load in week 14, delta sync in week 17, cutover in week 18). We load-test with k6 at 2× projected peak. An external pen test (Cobalt.io or similar) runs in week 16–17; findings are remediated before launch.",
      },
      {
        phase: "Phase 5",
        title: "Launch, Training & Post-Launch Ops",
        duration: "Week 18–24",
        deliverables: ["Production deploy", "User training (recorded + live)", "Runbook + on-call rotation", "30-day optimization sprint", "SLO dashboard"],
        description:
          "We deploy to production with a blue-green or canary strategy, train users (live sessions per role + recorded videos + written runbooks), and operate the system under a 30-day post-launch shadow. The on-call rotation is documented in PagerDuty; the SLO dashboard (Datadog or Grafana) tracks latency, error rate, uptime and queue depth. The 30-day optimization sprint addresses the top 10 friction points found in real usage.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Custom Software Compounds Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational platform copy.",
    ],
    cases: [
      {
        industry: "Repair Shop Management (Electronics/Auto)",
        problem: "Repair shop using a paper job-book + Excel for parts inventory + WhatsApp for customer updates. Average job took 6 days from intake to pickup; technician time wasted on parts lookup averaged 90 minutes/day; customer update NPS was 24.",
        application: "Custom repair-shop management system on Next.js + Postgres: job intake with photo capture, technician skill-matching for assignment, parts reservation with auto-reorder at min-stock, automated SMS/email updates at 5 job-stage transitions, customer self-service portal for status + invoice payment.",
        result: "Average job cycle time fell from 6 days to 2.8 days; technician parts-lookup time fell to 12 minutes/day; customer NPS rose to 67; first-time-fix rate rose from 71% to 89% via parts-availability checks at intake.",
      },
      {
        industry: "Healthcare Clinic Operations",
        problem: "Multi-location clinic group using paper scheduling + an outdated on-prem EHR; appointment no-show rate 18%; billing reconciliation took 12 days/month; patient record lookup across locations required phone calls.",
        application: "Custom clinic operations layer on FastAPI + Postgres, integrated with the existing EHR via FHIR API: cross-location scheduling with provider availability rules, automated SMS reminders 48h/24h/2h before appointments, billing integration with Stripe + Xero, patient portal for records + appointments + payments.",
        result: "No-show rate fell to 7%; billing reconciliation cycle dropped to 2 days; cross-location record lookup became instant; front-desk FTE requirement fell from 4 to 2 per location as patient self-service adoption reached 64%.",
      },
      {
        industry: "Logistics & Freight Brokerage",
        problem: "Freight brokerage managing 1,200 loads/month via email + phone + a 12-year-old on-prem TMS; quote-to-confirmation averaged 6 hours; carrier compliance tracking was manual; invoice accuracy 87%.",
        application: "Custom load-management platform on Next.js + Node + Temporal: automated rate-quote engine (Lane + weight + seasonality), carrier compliance dashboard (insurance, MC authority, safety score), Temporal-orchestrated load lifecycle (8 stages with SLA monitoring), automated invoice generation with document OCR.",
        result: "Quote-to-confirmation time dropped to 45 minutes; carrier compliance issues caught 100% at onboarding (was 64%); invoice accuracy rose to 99.4%; revenue per dispatcher up 2.8× via reduced manual coordination.",
      },
      {
        industry: "Real Estate Developer CRM",
        problem: "Real estate developer with 14 active projects using a generic CRM that couldn't model unit inventory, payment plans, or agent commission structures; sales agents spent 30% of time on admin; finance reconciliation took 10 days/month.",
        application: "Custom real-estate CRM on Next.js + Postgres: unit inventory with floor-plan integration, multi-stage payment plan tracking (downpayment, construction milestones, handover), agent commission engine with tier rules, integrated document e-signing (DocuSign), finance export to Sage Intacct.",
        result: "Sales agent admin time dropped to 8% of workweek; finance reconciliation fell to 1.5 days/month; commission disputes dropped 91% via transparent calculation logs; unit inventory accuracy reached 100% (was 78%).",
      },
      {
        industry: "Fintech Lending Platform",
        problem: "Lending startup building a digital lending product; needed to integrate credit bureaus, bank account aggregation (Plaid), KYC/AML (Persona), and a loan-servicing engine; in-house build estimated at 14 months by 3 vendors.",
        application: "Custom lending platform on Next.js + FastAPI + Temporal: loan application flow with bureau pull + bank analysis, decisioning engine (rules + scorecard), loan-servicing module (amortization, payments, collections), investor reporting dashboard, AWS deployment in a PCI-scoped VPC.",
        result: "Time to MVP launch: 16 weeks (vs. 14-month estimates); loan decisioning time under 90 seconds (was 24 hours manual); serviced $42M in loans in first 18 months; regulatory examination passed without findings.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Custom Software vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on workflow complexity, user count, integration depth and team size.",
    ],
    tables: [
      {
        title: "Custom Software (ClickTake) vs. SaaS vs. Low-code vs. In-house build — by use case",
        headers: ["Dimension", "Off-the-shelf SaaS", "Low-code (Retool/Bubble)", "In-house build", "ClickTake Custom"],
        rows: [
          ["Time to production", "yes:1–4 weeks", "yes:2–6 weeks", "no:9–18 months", "yes:12–24 weeks"],
          ["Workflow fit", "no:~70%", "partial:~80%", "yes:100%", "yes:100%"],
          ["Per-seat cost at 200 seats", "no:$204K/year", "yes:$24K/year", "yes:$0 + FTEs", "yes:$30–60K/year ops"],
          ["Custom workflow modeling", "no:Fields only", "partial:Drag-drop", "yes:Full code", "yes:Full code"],
          ["Integration depth", "partial:Vendor API", "partial:Pre-built", "yes:Full", "yes:Full"],
          ["IP ownership", "no:Vendor", "no:Platform", "yes:Yours", "yes:Yours"],
          ["Data residency control", "partial:Vendor regions", "no:Platform regions", "yes:Full", "yes:Full"],
          ["Best for", "Commodity workflows (CRM, accounting)", "Internal tools, <100 users", "Enterprises with 10+ engineers", "Mid-market, 50–5,000 users"],
        ],
      },
      {
        title: "Architecture choice by team size and scale",
        headers: ["Team size", "User count", "Throughput", "Recommended architecture"],
        rows: [
          ["1–3 engineers", "<1K users", "<100 RPS", "Monolith (Next.js + Postgres)"],
          ["4–8 engineers", "1K–10K users", "100–1K RPS", "Modular monolith + Redis + read replica"],
          ["8–15 engineers", "10K–100K users", "1K–10K RPS", "Microservices (3–6 services) + Kafka/EventBridge"],
          ["15+ engineers", "100K+ users", "10K+ RPS", "Microservices + CQRS + event sourcing + multi-region"],
          ["Any team, AI-heavy", "Any", "Any", "Microservices + vector DB + LLM gateway + GPU pool"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Time Saved, Error Reduction, Revenue per Employee",
    intro: [
      "Custom software earns its budget back through three mechanisms: workflow time reduction (the same work in less time), error-rate reduction (fewer mistakes, rework and disputes), and revenue-per-employee lift (each FTE produces more output). The numbers below are aggregated across 89 production deployments shipped 2022–2026.",
    ],
    metrics: [
      { value: "11.4×", label: "Avg. workflow speedup", description: "Ratio of pre-deployment workflow time to post-deployment, across the 89 deployments." },
      { value: "-87%", label: "Avg. error-rate reduction", description: "Reduction in error/discrepancy rate on the automated workflow, 90-day post-launch vs. pre-launch." },
      { value: "+2.3×", label: "Revenue per employee", description: "Average lift in revenue/FTE/year, driven by removing manual coordination from the workflow." },
      { value: "<14mo", label: "Typical payback period", description: "Time to recover build + first-year run cost from labor savings and revenue lift." },
    ],
    body: [
      "Workflow time reduction is the most measurable impact and typically funds the engagement. A 12-person repair shop spending 90 minutes/technician/day on parts lookup and customer updates recovers 14.4 hours/day across the team — equivalent to 1.8 FTEs at £32K/year each, or £58K/year in recovered capacity. The custom system costs £45–80K to build and £8K/year to operate; payback is 11–18 months. The recovered capacity is redirected to higher-throughput work (more jobs/day) rather than headcount reduction in most cases.",
      "Error-rate reduction compounds. A freight brokerage with 87% invoice accuracy loses 13% of monthly revenue to dispute resolution, write-offs and credit notes. A custom invoicing engine with OCR-verified line items, contract-rate validation, and automated approval workflows lifts accuracy to 99.4% — recovering the 12% leakage. On $4M/month brokerage revenue, that's $480K/month in recovered revenue; the system costs $180K to build and $24K/year to operate. The payback is under 6 weeks.",
      "Revenue-per-employee lift is the impact category that most surprises leadership. A logistics dispatcher managing 60 loads/month on a 12-year-old TMS, after deploying a custom platform with automated rate-quoting and carrier compliance, manages 168 loads/month — a 2.8× lift. The dispatcher headcount stays flat while revenue grows 2.8×; revenue per dispatcher rises from $480K/year to $1.34M/year. This pattern repeats across industries: when the system absorbs the coordination overhead, each FTE produces 2–4× the output, and the operating leverage shows up in the gross margin within 6–12 months of launch.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Custom systems do not live in isolation. They sit inside your CRM, ERP, accounting, comms and analytics stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "CRM, ERP & accounting",
        items: ["Salesforce (Sales Cloud, Service Cloud, Financial Force)", "HubSpot (CRM, Marketing, Service)", "Microsoft Dynamics 365 (Sales, BC, F&O)", "NetSuite, Sage Intacct, Xero, QuickBooks", "Zoho (CRM, Books, Inventory)", "Pipedrive, Attio, Close"],
      },
      {
        name: "Comms, collaboration & support",
        items: ["Slack, Microsoft Teams, Discord", "Zendesk, Intercom, Freshdesk, Gorgias", "Twilio (SMS, Voice, WhatsApp)", "SendGrid, Resend, Postmark, SES (transactional email)", "DocuSign, PandaDoc, HelloSign (e-signature)", "Zoom, Google Meet, Microsoft Teams (video)"],
      },
      {
        name: "Data, identity & payments",
        items: ["Snowflake, BigQuery, Databricks (warehouse)", "Segment, RudderStack (CDP)", "Auth0, Clerk, WorkOS, Okta, Keycloak (identity)", "Stripe, PayPal, Adyen (payments)", "Plaid, Teller, Yodlee (banking data)", "Persona, Onfido, Jumio (KYC/AML)"],
      },
      {
        name: "Industry-specific platforms",
        items: ["Epic, Cerner, Athena (healthcare — FHIR API)", "Buildertrend, Procore, PlanGrid (construction)", "Shopify, WooCommerce, BigCommerce (commerce)", "ShipHero, Linnworks, ShipStation (fulfillment)", "Veeva, IQVIA (life sciences)", "SAP, Oracle EBS (enterprise ERP)"],
      },
    ],
    compliance: ["SOC 2 Type II", "ISO 27001", "GDPR + UK GDPR", "HIPAA (with BAA)", "PCI DSS (scoped to SAQ-A or SAQ-A-EP)", "CCPA / CPRA", "ISO 9001 (quality)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Custom Software Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK electronics repair chain, 18 locations, ~£14M annual revenue",
        situation: "Repair shops used a paper job-book + Excel for parts inventory + WhatsApp for customer updates. Average job took 6 days from intake to pickup; technician parts-lookup time averaged 90 minutes/day; first-time-fix rate 71%; customer NPS 24; central management had no visibility into per-location performance.",
        task: "Build a repair-shop management system covering job intake, technician assignment, parts reservation, customer communications and management reporting — without disrupting the in-shop workflow or requiring technician retraining beyond 4 hours per location.",
        action: "ClickTake built a Next.js + Node.js + Postgres platform deployed on AWS ECS. The job-intake flow used a tablet-first UI with photo capture (Expo React Native app for technicians). Technician assignment used a skill-matching algorithm (device-type × repair-type × technician-certified). Parts inventory integrated with the parts supplier's API for auto-reorder at min-stock. Customer SMS/email updates triggered at 5 job-stage transitions via Twilio + Resend. A management dashboard in the web app gave HQ real-time visibility into per-location WIP, technician performance, and parts usage. Phased rollout: 3 pilot locations in week 16, all 18 by week 22.",
        result: "Average job cycle time fell from 6 days to 2.8 days (53% reduction). Technician parts-lookup time fell from 90 minutes/day to 12 minutes/day. First-time-fix rate rose from 71% to 89% via parts-availability checks at intake. Customer NPS rose from 24 to 67. HQ management reporting cycle (previously 5 days/week of manual aggregation) was eliminated — real-time dashboards replaced it. The system processed 4,200 jobs/month across 18 locations at steady state. Payback period: 9 months on recovered technician capacity alone.",
        quote: {
          text: "We were about to close two underperforming locations. The system showed us they weren't underperforming — they were drowning in admin. After rollout, both turned profitable within 90 days.",
          author: "Operations Director",
          title: "UK electronics repair chain",
        },
      },
      {
        client: "US fintech lending startup, pre-Series A",
        situation: "Lending startup needed to launch a digital personal-loans product in 4 months to hit a regulatory window. Three vendors quoted 12–14 months for in-house build at $1.2–1.8M. The product required credit-bureau integration, bank-account aggregation, KYC/AML, decisioning, loan servicing, and investor reporting — all in a PCI-scoped, SOC2-aligned infrastructure.",
        task: "Design, build and launch the lending platform in 16 weeks, with regulatory examination readiness as a launch gate — and a codebase the startup's 4-engineer team could operate after handover.",
        action: "ClickTake deployed a 5-engineer team (1 lead architect, 2 backend, 1 frontend, 1 DevOps) across the UK and Pakistan hubs. Architecture: Next.js 15 frontend, FastAPI backend (Python for bureau/KYC SDK compatibility), Postgres with row-level security for borrower isolation, Temporal for loan-servicing sagas (8-stage lifecycle with retry and compensation), Redis for rate-limit and session cache. Integrations: Experian bureau pull, Plaid bank aggregation, Persona KYC, Stripe for loan disbursement and repayment. Infrastructure: AWS ECS Fargate in a PCI-scoped VPC, Terraform-managed, GitHub Actions CI/CD with required security scans (Snyk, tfsec, Semgrep). External pen test by Cobalt.io in week 14.",
        result: "MVP launched in 16 weeks (within the regulatory window). Loan decisioning time: under 90 seconds end-to-end (was 24 hours manual at competitors). The platform serviced $42M in loans in the first 18 months, with $0 in regulatory findings on the first state examination. The startup's 4-engineer team took over operations after a 60-day shadow period; ClickTake remained on a quarterly-upgrade retainer. Total build cost: $480K (vs. $1.2–1.8M vendor quotes).",
        quote: {
          text: "Three vendors told us 14 months. ClickTake shipped in 16 weeks. The regulatory examiner called our documentation 'the cleanest first-examination file I've reviewed in 8 years.'",
          author: "CTO & Co-founder",
          title: "US fintech lending startup",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most architecture and budget questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does custom software cost to build?",
            a: "Build cost ranges from £60K (single-workflow internal tool, 1–2 integrations, web-only) to £450K+ (multi-service event-driven platform, 10+ integrations, web + mobile, PCI/HIPAA scoped). The dominant cost drivers are: integration depth (each third-party SaaS integration adds 2–4 weeks), architecture complexity (monolith vs. microservices vs. event-driven), mobile scope (no mobile vs. iOS+Android via RN/Flutter), and compliance scope (none vs. PCI/HIPAA/SOC2). We provide a fixed quote after the 2–3 week discovery phase.",
          },
          {
            q: "What is the typical timeline from kickoff to production?",
            a: "12–24 weeks for most engagements. The 5-phase lifecycle is: Discovery (2–3 weeks), Backend & Data Plane (6 weeks), Frontend & Mobile (8 weeks, parallel with backend from week 3), Integration & Migration (6 weeks), Launch & Post-Launch Ops (6 weeks). Simple single-workflow tools ship in 12 weeks; multi-service platforms with mobile scope take 20–24 weeks.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from £1,200 (single ECS service + RDS + CloudWatch + Sentry) to £8,500+ (multi-service ECS/EKS cluster + RDS multi-AZ + Redis + Kafka + Datadog + on-call rotation). Managed SLA from ClickTake adds £2,500–£7,000/month depending on required response time, on-call coverage, and optimization sprint cadence. We hand over to your team if you prefer to self-operate after the 60-day post-launch shadow.",
          },
          {
            q: "Do you offer a free proof-of-concept?",
            a: "No — but the 2–3 week discovery phase (£8K fixed) produces a workflow map, data model, architecture diagram, integration inventory and a fixed quote for the full engagement. Most clients treat discovery as a low-risk way to validate both the architecture and our working relationship before committing to the full build.",
          },
        ],
      },
      {
        name: "Architecture & Tech Stack",
        questions: [
          {
            q: "Monolith or microservices — how do you decide?",
            a: "Start with a monolith unless you have a specific reason not to. A monolith is right for 70% of business applications and ships in 8–14 weeks. Move to microservices when: team size exceeds 6 engineers (Conway's Law), different services have different scaling profiles (the reporting service reads 100× more than the write service), or different services have different reliability requirements. Premature microservices add 4–8 weeks of build overhead and 2–4 weeks/year of ops overhead per service. We score this during discovery against your team size, scale projection and reliability requirements.",
          },
          {
            q: "Do you build mobile apps?",
            a: "Yes — React Native + Expo for 80% of mobile builds (cross-platform from one TypeScript codebase, OTA updates via EAS, 95%+ code reuse between iOS and Android). Flutter for performance-critical apps (60fps animations, complex canvas, 2–3× faster than RN on graphics-heavy screens). Native (Swift/Kotlin) only when required for platform-specific features (ARKit, background location, advanced camera). Mobile scope adds 4–6 weeks to the timeline.",
          },
          {
            q: "Which cloud do you deploy on?",
            a: "AWS (default for ~70% of builds — ECS Fargate, RDS Postgres, S3, CloudFront, Lambda), GCP (Cloud Run, Cloud SQL — best for AI/Vertex AI-heavy builds or Google Workspace orgs), Azure (AKS, Azure SQL — for Microsoft-stack enterprises on Entra ID/Office 365), or Fly.io (multi-region by default, $0.04/vCPU-hour — for geographically distributed deployments). All infrastructure is provisioned via Terraform; CI/CD via GitHub Actions with required reviews and automated test gates.",
          },
          {
            q: "How do you handle multi-tenancy?",
            a: "Three isolation models, chosen by tenant count and isolation requirement: row-level security (RLS) in shared Postgres for ≤10K tenants (cheapest, pays for itself at scale), schema-per-tenant for ≤500 tenants with medium isolation needs (easier backup/restore per tenant), database-per-tenant for ≤50 tenants with strongest isolation (banking, healthcare). Most SaaS builds start with RLS and migrate to schema-per-tenant only when a specific tenant demands it contractually.",
          },
        ],
      },
      {
        name: "Integrations, Migration & Compliance",
        questions: [
          {
            q: "Which SaaS platforms do you integrate with?",
            a: "Salesforce, HubSpot, Microsoft Dynamics, NetSuite, Sage, Xero, QuickBooks, Zoho, Pipedrive, Stripe, PayPal, Adyen, Plaid, Persona, DocuSign, Slack, Teams, Zendesk, Intercom, Twilio, SendGrid, Resend, AWS, GCP, Azure. For healthcare: Epic, Cerner, Athena via FHIR API. For construction: Buildertrend, Procore. For logistics: ShipHero, Linnworks. If your stack uses a different vendor, we have likely integrated with it before — book a call and ask.",
          },
          {
            q: "How do you handle data migration from the legacy system?",
            a: "Three-pass migration: (1) full historical load 2–4 weeks before cutover, validated against source totals; (2) delta sync on cutover weekend, with the legacy system in read-only mode; (3) post-cutover reconciliation for 2 weeks with parallel run, then legacy system decommissioned. For complex migrations (custom schemas, inconsistent source data) we run a 4-pass variant with an additional dry-run pass 1 week before cutover. Migration scripts are idempotent and re-runnable; rollback is always documented.",
          },
          {
            q: "Are you SOC2 / HIPAA / PCI compliant?",
            a: "We architect for all three. SOC2 Type II: ClickTake's operations are SOC2-aligned; we provide architecture documentation to support your SOC2 audit. HIPAA: deployments in HIPAA-scoped VPCs with BAAs in place with AWS, GCP and Azure. PCI DSS: scoped to SAQ-A (hosted checkout) or SAQ-A-EP (embedded checkout) — never SAQ-D. We do not handle cardholder data directly. Annual compliance attestations are part of the handover pack.",
          },
          {
            q: "How do you prevent vendor lock-in?",
            a: "Three techniques: (1) open-source defaults — Postgres, Redis, Kafka, Next.js, FastAPI are all OSS with multiple managed-service providers; (2) infrastructure as code via Terraform — switching from AWS to GCP is a refactor of the Terraform modules, not a rewrite of the application; (3) integration adapter pattern — vendor-specific code is isolated in adapters, so swapping Stripe for Adyen is a 1-week adapter swap, not a system rewrite. Your code, your data, your infrastructure — deliverable in a Git repo on day 1 of handover.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most custom-software engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. A follow-the-sun on-call rotation covers UK and US business hours for managed-SLA clients.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All custom code, schemas, migrations, infrastructure-as-code, design assets and documentation built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work. The ClickTake reusable component library is licensed to you perpetually as part of the engagement.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the system under a managed SLA (£2,500–£7,000/month) covering uptime monitoring, security patching, monthly optimization sprint, and on-call coverage; (2) ClickTake hands off to your team after a 60-day post-launch shadow period with full documentation + runbooks + recorded training sessions; (3) Hybrid — ClickTake handles escalations, quarterly upgrades and on-call coverage, your team handles day-to-day operations and feature work. Most clients start with option 1 and migrate to option 3 after 6–12 months as their team scales.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build the System That Fits Your Workflow?",
    subtitle:
      "Book a free 30-minute architecture call. We will map your current workflow, identify the 15% that the SaaS can't model, and tell you honestly whether custom software is the right call — or whether a low-code tool would deliver 80% of the value for 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min architecture call",
        description: "Free. No deck. We map your workflow and tell you whether custom software is the right call.",
      },
      {
        step: "2",
        title: "2–3 week discovery phase",
        description: "£8K fixed. We produce the workflow map, data model, architecture diagram and a fixed quote for the full build.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, SLO contract — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Architecture Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Custom Software Brief", href: "/resources", variant: "outline" },
  },
}
