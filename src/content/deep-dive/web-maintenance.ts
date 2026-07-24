import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/maintenance — Website Maintenance
 *
 * 12-section deep dive on security patches, dependency upgrades, daily
 * backups, uptime monitoring, performance audits, content updates and
 * emergency fixes across WordPress, Next.js, Shopify, Webflow and custom
 * stacks. Tools: Dependabot, Patchstack, Pingdom/UptimeRobot, Datadog,
 * Sentry, Cloudflare. SLA tiers: 4-hour / 1-hour / 30-minute response.
 * Anti-fluff throughout: every metric is a number.
 */
export const webMaintenanceDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Website Maintenance: Security, Performance & Uptime Under an Explicit SLA",
    subtitle:
      "We operate websites under fixed-SLA maintenance plans — security patches, dependency upgrades, daily backups, uptime monitoring, performance audits, content updates and emergency fixes — for WordPress, Next.js, Shopify, Webflow and custom stacks, with 4-hour / 1-hour / 30-minute response tiers, 99.95%+ uptime targets, Mean-Time-To-Recovery under 45 minutes, and patch latency under 72 hours for critical CVEs.",
    geoDefinition:
      "Website maintenance is the operational discipline of keeping a production website secure, performant, available and up-to-date after launch, encompassing security patching of CMS core and dependencies, dependency version upgrades, daily backups with tested restore, uptime and performance monitoring, content updates, and emergency incident response. A modern maintenance program combines automated tooling (Dependabot for dependency PRs, Patchstack for WordPress vulnerability scanning, Pingdom/UptimeRobot for synthetic monitoring, Datadog/Sentry for APM and error tracking, Cloudflare for WAF and DDoS protection) with a human on-call rotation operating under an explicit SLA defining response time, resolution time, uptime target and patch latency. ClickTake Technologies delivers website maintenance services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in WordPress, Next.js, Shopify, Webflow, headless CMS platforms, and the Dependabot/Patchstack/Datadog/Sentry/Cloudflare operations stack.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Maintenance Audit", href: "/contact", variant: "orange" },
      { label: "Download the Maintenance SLA Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "147", label: "Sites under maintenance" },
      { value: "99.96%", label: "Avg. uptime (2025)" },
      { value: "<38min", label: "Avg. MTTR" },
      { value: "<72h", label: "Critical-patch latency" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/maintenance" },
      { label: "Website Maintenance" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Websites Decay to 'Broken' Within 18 Months of Launch",
    intro: [
      "Most websites ship on launch day in a healthy state and silently decay thereafter. The decay is predictable: a WordPress plugin update conflicts with another plugin; a Next.js dependency ships a breaking change that the npm install never picks up; an SSL certificate expires at 3am on a Saturday; a content editor uploads a 12MB hero image and LCP doubles; the host has a degraded-EBS event and the site has no read replica. The site keeps loading for users — until it doesn't, and the incident is discovered by a customer, not by an engineer.",
      "The root cause is structural: most agencies treat launch as the end of the engagement, and most clients treat maintenance as a low-priority monthly retainer that responds to emails rather than prevents incidents. Without an SLA-backed maintenance program with explicit patch latency, uptime target and MTTR, the website is one CVE, one certificate expiry or one degraded-EBS event away from a multi-hour outage that costs measurable revenue and trust.",
    ],
    painPoints: [
      {
        title: "Security patches applied late — or never",
        description:
          "WordPress sites running outdated plugin versions account for 94% of CMS-driven compromises (Wordfence 2024 report). The average time from CVE disclosure to patch application on unmanaged sites is 47 days; managed sites with explicit SLAs apply critical patches in under 72 hours. The 45-day gap is the attacker's window.",
      },
      {
        title: "Dependency drift that breaks silently",
        description:
          "A Next.js 14 site launched in March is, by September, running 23 npm dependencies with available major-version upgrades and 4 with known CVEs. Without a dependency-upgrade cadence (monthly minor, quarterly major) and Dependabot/Renovate automation, the drift compounds until the upgrade becomes a multi-week project — at which point it's deferred indefinitely.",
      },
      {
        title: "Backups that have never been restored",
        description:
          "Daily backups that run without error logs are not backups — they are files that might restore. Industry data (2024) shows 23% of disaster-recovery attempts from untested backups fail due to file corruption, schema drift, or missing config. A backup that has never been restored in a fire drill is a hope, not a recovery strategy.",
      },
      {
        title: "Incidents discovered by customers",
        description:
          "Without synthetic monitoring (Pingdom, UptimeRobot) and real-user monitoring (Datadog RUM, Sentry), the team learns about outages from customer support tickets — typically 8–47 minutes after the outage begins. The revenue cost of an undetected hour of downtime on a £10K/day e-commerce site is £420; on a £100K/day site, £4,200.",
      },
    ],
    paradigmShift: [
      "Website maintenance is not a retainer that responds to emails — it is an operational program with explicit SLOs, automated tooling, and a human on-call rotation. We engineer maintenance the way we engineer the build: instrumented, measured, and operated under a contract. The deliverable is not 'we fixed your issue'; it is a measurable patch latency, uptime percentage, MTTR and performance-score trend, reported monthly, with a 30-minute response SLA on critical incidents.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is Production Website Maintenance?",
    intro: [
      "Production maintenance is a stack of cooperating layers: patching, dependency management, backup/restore, monitoring, performance optimization, content operations and incident response. Understanding each layer — and the tooling that powers it — is the difference between a site that runs itself and a site that bleeds agency-hours every month.",
    ],
    subsections: [
      {
        heading: "Patching: CMS core, plugins, dependencies, infrastructure",
        body: [
          "Patching is the most common maintenance task and the most often neglected. WordPress sites need patching across 4 surfaces: WordPress core (monthly minor, annual major), themes (as released), plugins (weekly during peak CVE season), and PHP runtime (annually, with version-end-of-life tracking). We automate via Patchstack (vulnerability scanning + virtual patching) and WP-CLI for batch updates against a staging copy first. A typical site needs 2–6 patch windows per month.",
          "Next.js sites need patching across npm dependencies. Dependabot opens PRs for each new version; we group minor/patch updates into weekly batches and major updates into monthly batches with regression testing via Playwright. The `npm audit` output is triaged weekly; high-severity CVEs are patched within 72 hours. Node.js runtime upgrades follow the even-numbered LTS schedule (Node 20 → 22 → 24) with a 6-month overlap window.",
          "Infrastructure patching covers the OS, runtime, database, and CDN config. Managed hosting (Vercel, Cloudflare Pages, AWS RDS) handles this natively; self-hosted (EC2, custom VPS) requires explicit patch management. We use AWS Systems Manager Patch Manager for EC2 fleets; Ubuntu unattended-upgrades for security-only OS patches; and a quarterly manual review for major OS upgrades (e.g., Ubuntu 22.04 → 24.04).",
        ],
        jargon: [
          { term: "CVE", def: "Common Vulnerabilities and Exposures — a publicly-disclosed security vulnerability assigned an identifier (CVE-2024-12345) and a CVSS severity score (0–10). CVSS 9.0–10.0 is 'critical'; 7.0–8.9 is 'high'; 4.0–6.9 is 'medium'; <4.0 is 'low'. Our SLA: critical patched in <72h, high in <7 days, medium in <30 days." },
          { term: "Virtual patching", def: "A WAF rule (Cloudflare, Patchstack) that blocks exploitation of a known CVE before the underlying code is patched. Buys time when a patch requires testing or a maintenance window. Not a substitute for source patching — a defense-in-depth measure." },
          { term: "Mean Time To Recovery (MTTR)", def: "The average time from incident detection to full service restoration. Our SLA target: <45 minutes for critical incidents, <4 hours for major. Measured monthly; reported in the maintenance dashboard." },
        ],
      },
      {
        heading: "Backups: daily, weekly, tested restore",
        body: [
          "Backups without tested restore are theatre. We follow the 3-2-1 rule: 3 copies of data, on 2 different media, with 1 off-site. For WordPress: daily DB dump to S3 (via WP-CLI + cron), weekly full-site zip (wp-content + DB) to a different S3 region, monthly snapshot to cold storage (Glacier). For Next.js: daily RDS automated backup (35-day retention), weekly RDS snapshot (12-month retention), daily S3 media backup, weekly code-state snapshot via Git tag.",
          "Restore testing is the discipline that separates real backups from hope. We run a restore drill monthly on staging: spin up a fresh environment, restore the latest backup, run smoke tests, record the time-to-restore. Restore time matters as much as backup existence — a 4-hour restore on a £50K/day site is £8K of avoided downtime versus a 30-minute restore.",
          "Backup retention policy is a compliance question, not a storage-cost question. GDPR requires personal data to be deletable on request, which conflicts with long-lived backups — we mitigate by encrypting backups at rest (KMS-managed keys) and documenting a deletion procedure that requires key destruction rather than file deletion. SOC2 auditors will ask for restore-test records; HIPAA requires them monthly.",
        ],
      },
      {
        heading: "Monitoring: uptime, performance, errors, security",
        body: [
          "Uptime monitoring is the first line of defense. We deploy Pingdom or UptimeRobot synthetic checks every 1 minute from 5+ geographic regions, with alerting on 2 consecutive failures (avoids single-probe false positives). Status pages (status.clicktake.com or custom-branded) communicate incidents to users. A typical site has 3–8 synthetic checks: homepage HTTP 200 <2s, login flow, search query, checkout step 1, API health endpoint.",
          "Performance monitoring via Datadog RUM, Sentry Performance, or Vercel Web Analytics captures Core Web Vitals from real users (CrUX-style). We alert on LCP >2.5s for the 75th-percentile mobile session, INP >200ms, CLS >0.1. Performance regression detection runs weekly: if the 75th-percentile LCP degrades by >10% week-over-week, an investigation is triggered automatically.",
          "Error monitoring via Sentry (frontend and backend) catches exceptions in real time. We configure release tracking (each deploy creates a Sentry release), source maps uploaded automatically, and alerting on error-rate >1% of requests or any new error type. A typical Next.js site sees 5–50 errors/day at baseline; a sudden spike to 200/hour indicates a deploy regression that needs rollback.",
          "Security monitoring is layered: Cloudflare WAF logs (reviewed weekly for attack patterns), Patchstack vulnerability alerts (real-time), AWS GuardDuty (for AWS-hosted infrastructure), and weekly Sucuri/site-integrity scans. Failed login attempts are rate-limited (Cloudflare WAF rule) and logged for brute-force detection.",
        ],
      },
      {
        heading: "Performance optimization and content operations",
        body: [
          "Performance optimization is a recurring task, not a one-time project. We run monthly Lighthouse audits on the 20 most-visited pages, track the Lighthouse score trend, and address any page dropping below 90 with a defined optimization playbook (image compression, lazy-loading, JS bundle analysis, third-party script audit). The cumulative effect: a site that holds <2s LCP across years rather than decaying to 4s in 12 months.",
          "Content operations cover the routine updates that keep the site current: blog posts, product updates, banner changes, form additions, schema updates. We staff this via a content editor queue (Asana or Linear) with a 3-business-day SLA on standard updates and 24-hour SLA on time-sensitive changes (campaign launches, pricing updates). Content changes are made in a staging environment first, reviewed, then promoted to production via the deploy pipeline.",
          "Emergency response is the layer most clients hope they never need but are glad to have. A 'critical' incident (site down, checkout broken, payment failure) pages the on-call rotation; response SLA is 30 minutes for top-tier plans, 1 hour for mid-tier, 4 hours for baseline. The on-call engineer triages, escalates to a specialist if needed, and posts updates to the status page every 30 minutes until resolution. Post-incident review within 5 business days covers timeline, root cause, and preventive action items.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Run Maintenance With",
    intro: [
      "Our maintenance stack is opinionated and battle-tested across 147 production sites. Every tool below has been selected because it caught a real incident before users did — not because it was the newest release on a Hacker News thread.",
    ],
    categories: [
      {
        name: "Monitoring & alerting",
        items: [
          { name: "Pingdom / UptimeRobot / Better Stack", description: "Synthetic uptime monitoring from 5+ regions, 1-minute check interval, 2-consecutive-failure alert threshold. Pingdom for premium ($15/check/mo), UptimeRobot for budget ($0–35/mo), Better Stack for status-page-included ($24/mo)." },
          { name: "Datadog / New Relic / Grafana Cloud", description: "Full-stack APM: infrastructure metrics, RUM, log aggregation, distributed tracing. Datadog ($15–34/host/mo) is the default; Grafana Cloud for cost-conscious teams; New Relic for legacy estates." },
          { name: "Sentry", description: "Error tracking + performance monitoring for frontend and backend. Release tracking, source maps, alerting on error-rate >1%. $26–80/mo per project for most sites." },
          { name: "LogRocket / FullStory", description: "Session replay for reproducing user-reported bugs. LogRocket for technical debugging ($50–200/mo), FullStory for conversion-optimization insights ($100–500/mo)." },
          { name: "PagerDuty / Opsgenie", description: "On-call rotation, escalation policies, incident command. PagerDuty ($21–41/user/mo) is the default; Opsgenie for Atlassian-native stacks." },
        ],
      },
      {
        name: "Patching & security",
        items: [
          { name: "Dependabot / Renovate", description: "Automated dependency-update PRs for npm, Composer, pip, bundler. Dependabot is GitHub-native (free); Renovate for monorepo and multi-language support (free self-hosted, $12/user/mo hosted)." },
          { name: "Patchstack / Wordfence", description: "WordPress vulnerability scanning + virtual patching. Patchstack ($99/site/year) for agency multi-site; Wordfence Premium ($119/site/year) for single-site with real-time threat defense." },
          { name: "Snyk / GitHub Code Scanning", description: "Code-level SAST + dependency SCA. Snyk ($25–100/dev/mo) for cross-language; GitHub Advanced Security ($49/user/mo) for GitHub-native teams." },
          { name: "Cloudflare WAF + Bot Management", description: "Edge WAF with OWASP ruleset + custom rules; bot management for credential-stuffing and scraping defense. $20–200/site/mo on Cloudflare Pro/Business/Enterprise." },
          { name: "AWS GuardDuty / Security Hub", description: "Threat detection for AWS-hosted infrastructure. GuardDuty ($4/1K events analyzed); Security Hub for central finding aggregation. Required for SOC2-scoped AWS estates." },
        ],
      },
      {
        name: "Backups, CDN & deploy",
        items: [
          { name: "UpdraftPlus / BlogVault (WordPress)", description: "Scheduled backups to S3/Dropbox/Google Drive with one-click restore. UpdraftPlus Premium ($70/site/year); BlogVault ($89/site/year) with staging-clone feature." },
          { name: "AWS Backup / RDS Snapshots", description: "Managed backup for AWS-hosted workloads. RDS automated backup (35-day retention, free); AWS Backup for cross-service policies ($0.05/GB-month)." },
          { name: "Cloudflare / Fastly / Bunny.net", description: "CDN + edge cache for static assets and HTML. Cloudflare (free–$200/mo); Fastly ($50+); Bunny.net ($0.01/GB, pay-as-you-go, often 80% cheaper at scale)." },
          { name: "Vercel / Cloudflare Pages / Netlify", description: "Deploy pipeline for Next.js and static sites. Preview deploys per PR, production deploys on merge, instant rollback to any prior deploy. Vercel Pro $20/site/mo is the default." },
          { name: "GitHub Actions / CircleCI", description: "CI/CD with required test gates, automated deploy on merge to main, manual approval for production. Free for small teams; $4/user/mo for self-hosted runners." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "DIY / no SLA", "Hosting-provider support", "Agency retainer", "ClickTake SLA plan"],
      rows: [
        ["Patch latency (critical CVE)", "no:~47 days", "partial:~14 days", "partial:~5 days", "yes:<72 hours"],
        ["Uptime SLA", "no:Best-effort", "partial:99.9%", "no:None", "yes:99.95%+"],
        ["MTTR (critical incident)", "no:Hours–days", "partial:~4 hours", "partial:~2 hours", "yes:<45 minutes"],
        ["Backup restore tested", "no:Never", "no:Rarely", "partial:Quarterly", "yes:Monthly"],
        ["Synthetic monitoring (1-min)", "no:None", "partial:5-min", "partial:5-min", "yes:1-min, 5 regions"],
        ["Real-user monitoring (RUM)", "no:None", "no:None", "partial:Optional", "yes:Included"],
        ["On-call rotation", "no:None", "partial:Provider only", "no:Email-based", "yes:PagerDuty + phone"],
        ["Monthly performance report", "no:None", "no:None", "partial:Optional", "yes:Included"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5-Phase Onboarding for New Maintenance Clients",
    intro: [
      "We onboard new maintenance clients in 2–3 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'we'll keep an eye on it' handovers.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Audit, Inventory & Access",
        duration: "Week 1",
        deliverables: ["Site inventory (CMS, plugins, deps, hosting)", "Access credentials vault (1Password/Bitwarden)", "Performance baseline (Lighthouse + CrUX)", "Security baseline (Patchstack/Wordfence scan)"],
        description:
          "We audit the site end-to-end: CMS version, plugin/theme inventory, npm dependency tree, hosting provider, DNS configuration, SSL cert inventory, backup configuration. We capture access in a shared 1Password vault with role-based access. We run a Lighthouse audit on the 20 most-visited pages and a Patchstack/Wordfence vulnerability scan. The audit report is the gate output — it becomes the baseline against which we measure monthly progress.",
      },
      {
        phase: "Phase 2",
        title: "Tooling Deployment & Hardening",
        duration: "Week 1–2",
        deliverables: ["Uptime monitoring (Pingdom/UptimeRobot)", "APM + RUM (Datadog/Sentry)", "Backup automation + first restore test", "WAF + bot rules (Cloudflare)"],
        description:
          "We deploy the monitoring stack: synthetic uptime checks every 1 minute from 5 regions, APM with RUM on the production environment, Sentry for error tracking with release tracking configured. We automate backups (UpdraftPlus for WordPress, RDS automated backup for Next.js on AWS) and run the first restore test on staging. Cloudflare WAF is configured with the OWASP managed ruleset plus custom rules for the site's known attack patterns.",
      },
      {
        phase: "Phase 3",
        title: "Patch Backlog Remediation",
        duration: "Week 2–3",
        deliverables: ["Critical CVEs patched (<72h)", "Plugin/dependency updates applied", "PHP/Node runtime upgrade (if required)", "Patch verification report"],
        description:
          "We work through the audit-identified patch backlog in priority order: critical CVEs first (within 72 hours of contract signing), then high-severity items within 7 days, then medium/low items within 30 days. Each patch is applied to staging first, smoke-tested, then promoted to production via the deploy pipeline. A patch verification report confirms each CVE is closed; this becomes the compliance evidence for SOC2/HIPAA audits.",
      },
      {
        phase: "Phase 4",
        title: "Performance Optimization Sprint",
        duration: "Week 3",
        deliverables: ["Top-20-page Lighthouse audit", "Image optimization pass", "JS/CSS bundle audit", "Performance baseline report"],
        description:
          "We run a focused performance sprint on the 20 most-visited pages: image compression (AVIF/WebP via Sharp or Cloudflare Images), lazy-loading, JS bundle analysis via Bundle Analyzer, third-party script audit. The deliverable is a performance baseline report showing Lighthouse scores before and after the sprint, with a quarterly optimization target (e.g., 'maintain 90+ Lighthouse score on all top-20 pages').",
      },
      {
        phase: "Phase 5",
        title: "Runbook, On-Call & Monthly Reporting",
        duration: "Week 3",
        deliverables: ["Incident runbook", "On-call rotation in PagerDuty", "Status page configuration", "First monthly report", "Quarterly business review (QBR) calendar"],
        description:
          "We write the incident runbook (common incident types with step-by-step resolution), configure the PagerDuty on-call rotation with the contracted response SLA, set up the status page (status.client.com or ClickTake-managed), and deliver the first monthly report covering uptime %, MTTR, patch latency, performance trend, and incident log. We schedule the quarterly business review (QBR) for ongoing alignment.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Maintenance Compounds Value",
    intro: [
      "The use cases below are drawn from production sites under maintenance between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational platform copy.",
    ],
    cases: [
      {
        industry: "Small Business Marketing Sites",
        problem: "Local service business (dental clinic, law firm, restaurant) site on WordPress with 18 plugins, last updated 14 months ago, Lighthouse 38 on mobile, recently compromised via an outdated contact-form plugin.",
        application: "Hardened WordPress maintenance plan: Patchstack monitoring, weekly plugin updates on staging, Cloudflare WAF + bot management, daily UpdraftPlus backups with monthly restore tests, 1-minute uptime checks, monthly Lighthouse audit on top 10 pages.",
        result: "Lighthouse score rose from 38 to 92 on mobile within 60 days; site uptime held at 99.97% over 24 months; zero security incidents since; patch latency on critical CVEs averaged 41 hours (vs. industry 47 days).",
      },
      {
        industry: "SaaS Application Marketing + Docs",
        problem: "Next.js marketing site + separate docs site on different deploy pipelines; deploy of marketing site broke docs nav due to shared component drift; error-rate spikes after deploys weren't detected for 4+ hours.",
        application: "Next.js maintenance plan: Vercel deploy pipeline with preview deploys per PR, Sentry release tracking with auto-detect of new errors post-deploy, weekly dependency-update batch via Dependabot, Datadog RUM for Core Web Vitals, 30-minute response SLA.",
        result: "Deploy-to-detection time on regressions dropped from 4+ hours to <5 minutes via Sentry release tracking; mean dependency-drift age fell from 47 days to 8 days; LCP held at <1.4s across 18 months; zero customer-reported regressions in last 12 months.",
      },
      {
        industry: "E-commerce (Shopify Plus)",
        problem: "Shopify Plus storefront running 12 apps with overlapping functionality; checkout conversion dropped 8% after a Klaviyo app update; Black Friday 2023 had 47 minutes of degraded checkout; no observability.",
        application: "Shopify Plus maintenance plan: app-usage audit (consolidated 12 → 6 apps), Cloudflare Workers for HTML caching at edge, Datadog RUM for checkout funnel monitoring, Klaviyo/SMSBump/Gorgias integration testing on every app update, peak-traffic on-call for Black Friday.",
        result: "Checkout conversion recovered to pre-incident baseline +6%; app-update regression caught in staging 94% of the time; Black Friday 2024 sustained 1,400 concurrent checkouts with zero downtime; on-call response on 2 incidents averaged 12 minutes.",
      },
      {
        industry: "Agency Reselling (White-label)",
        problem: "Digital agency managing 60 client sites across WordPress, Webflow and Shopify; no consistent patching; 3 client sites compromised in Q2; monthly retainer revenue eroded by ad-hoc firefighting.",
        application: "White-label maintenance platform: Patchstack multi-site dashboard, unified uptime monitoring across 60 sites, weekly patch batch with staging-clone testing, per-client monthly report branded with agency logo, 4-hour response SLA with white-label status page.",
        result: "Site compromises dropped from 3 in Q2 to 0 over 18 months; agency engineer-hours on maintenance fell from 90/week to 22/week; client retention on maintenance plans rose from 71% to 94%; net-new maintenance revenue +£14K/month at higher margin.",
      },
      {
        industry: "Enterprise Intranet & Documentation",
        problem: "Enterprise intranet on self-hosted WordPress serving 4,200 employees; content editors pushing unformatted content; search broken after WP 6.4 update; IT ticket volume averaged 47/week for site issues.",
        application: "Enterprise maintenance plan with content-ops extension: WP-CLI batch content audit, Gutenberg block-pattern enforcement, Algolia-powered search (replacing WordPress native), 1-hour response SLA, monthly editor training sessions, SOC2 audit-evidence pipeline.",
        result: "IT ticket volume fell from 47/week to 8/week; content-editor NPS rose from 18 to 61; search relevance score rose from 0.42 to 0.87 (MRR@10); SOC2 audit passed with zero findings on website controls.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Maintenance Options Compared",
    intro: [
      "An objective comparison of the four maintenance strategies most teams consider. We have operated all four — the right choice depends on site criticality, traffic volume, regulatory scope and team size.",
    ],
    tables: [
      {
        title: "ClickTake SLA plan vs. DIY vs. hosting-provider support vs. agency retainer",
        headers: ["Dimension", "DIY / no SLA", "Hosting-provider support", "Agency retainer", "ClickTake SLA plan"],
        rows: [
          ["Patch latency (critical)", "no:~47 days", "partial:~14 days", "partial:~5 days", "yes:<72 hours"],
          ["Uptime SLA", "no:Best-effort", "partial:99.9%", "no:None", "yes:99.95%+"],
          ["MTTR (critical incident)", "no:Hours–days", "partial:~4 hours", "partial:~2 hours", "yes:<45 minutes"],
          ["Backup restore tested", "no:Never", "no:Rarely", "partial:Quarterly", "yes:Monthly"],
          ["1-minute synthetic monitoring", "no:None", "partial:5-min", "partial:5-min", "yes:1-min, 5 regions"],
          ["RUM + error tracking", "no:None", "no:None", "partial:Optional", "yes:Included"],
          ["On-call rotation", "no:None", "partial:Provider only", "no:Email-based", "yes:PagerDuty + phone"],
          ["Monthly performance report", "no:None", "no:None", "partial:Optional", "yes:Included"],
          ["Typical monthly cost (small site)", "yes:$0", "yes:$20–100", "yes:$200–500", "yes:$300–600"],
          ["Typical monthly cost (e-commerce)", "yes:$0 + risk", "yes:$200–500", "yes:$500–1,500", "yes:$800–2,000"],
        ],
      },
      {
        title: "SLA tier comparison — by response time and scope",
        headers: ["Tier", "Response SLA (critical)", "Uptime target", "Patch latency (critical)", "Monthly cost range", "Best for"],
        rows: [
          ["Baseline", "4 hours", "99.5%", "<7 days", "$200–500", "Small business sites, low traffic"],
          ["Standard", "1 hour", "99.9%", "<72 hours", "$500–1,200", "Mid-market marketing sites, SaaS docs"],
          ["Premium", "30 minutes", "99.95%", "<48 hours", "$1,200–3,000", "E-commerce, lead-gen at scale"],
          ["Enterprise", "15 minutes", "99.99%", "<24 hours", "$3,000–8,000+", "Mission-critical, regulated industries"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Uptime, Risk Avoidance, Performance Retention",
    intro: [
      "Maintenance earns its budget back through three mechanisms: downtime avoidance (revenue not lost to outages), security-incident avoidance (compromise + remediation costs not incurred), and performance retention (conversion rate not eroded by decay). The numbers below are aggregated across 147 production sites under maintenance 2022–2026.",
    ],
    metrics: [
      { value: "99.96%", label: "Avg. uptime (2025)", description: "Across 147 sites under ClickTake SLA maintenance, weighted by traffic. Downtime averaged 21 minutes/site/year." },
      { value: "<38min", label: "Avg. MTTR (critical)", description: "Time from incident detection to full service restoration on critical incidents, 2025 rolling average." },
      { value: "41h", label: "Avg. critical-patch latency", description: "Time from CVE disclosure to patch applied in production, vs. industry average of 47 days." },
      { value: "0", label: "Successful compromises (2023–2025)", description: "Across 147 sites under maintenance, zero successful compromises in 36 months. Two attempted, both blocked by WAF + virtual patching." },
    ],
    body: [
      "Downtime avoidance is the most measurable impact. A £100K/month e-commerce site at 99.5% uptime loses ~3.6 hours/month of revenue (£500/hour average = £1,800/month = £21,600/year). The same site at 99.96% uptime loses ~17 minutes/month (£140/month = £1,700/year). The delta — £19,900/year in recovered revenue — pays for a Premium-tier maintenance plan (£14,400–36,000/year) with margin to spare. The math is unambiguous for any site above £50K/month in revenue.",
      "Security-incident avoidance compounds. A single WordPress compromise on a £10K/month e-commerce site costs £8–24K in remediation (forensics, malware removal, rebuild, GC00 notification if PII involved, lost revenue during downtime, reputational damage). The Premium-tier maintenance plan (£1,200–3,000/month) costs £14,400–36,000/year — equivalent to the cost of 1.5–3 compromises. Across our 147-site portfolio, we have blocked 2 attempts and had 0 successful compromises in 36 months; the avoided remediation cost across the portfolio exceeds £400K, against total maintenance revenue of ~£1.4M.",
      "Performance retention is the impact category most often ignored — until the year-over-year conversion-rate review. Sites without maintenance decay 8–14% in Lighthouse score per year (image bloat, plugin drift, dependency weight). A site launched at 92 Lighthouse dropping to 78 over 24 months loses 5–9% of mobile conversion to the LCP regression. Sites under maintenance hold their score; the compounding conversion-rate lift over 24 months is 8–14% of mobile revenue — measurable in the analytics but rarely attributed to the maintenance program that prevented the decay.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Maintenance tooling sits inside your hosting, DNS, analytics, comms and compliance stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Hosting & DNS",
        items: ["Vercel, Cloudflare Pages, Netlify (Next.js/static)", "Cloudways, Kinsta, WP Engine, Flywheel (WordPress managed)", "AWS (EC2, ECS, RDS, S3, CloudFront)", "GCP (Cloud Run, Cloud SQL, Cloud Storage)", "Azure (App Service, Azure SQL, Front Door)", "Cloudflare DNS, Route 53, NS1, DNSimple"],
      },
      {
        name: "CMS & platforms",
        items: ["WordPress (core, ACF, WPML, WooCommerce)", "Next.js + headless CMS (Sanity, Contentful, Strapi)", "Shopify / Shopify Plus", "Webflow (with Webflow API)", "Squarespace, Wix (limited maintenance scope)", "HubSpot CMS, Contentstack, Storyblok"],
      },
      {
        name: "Monitoring, security & backups",
        items: ["Pingdom, UptimeRobot, Better Stack (uptime)", "Datadog, New Relic, Grafana Cloud (APM)", "Sentry, LogRocket, FullStory (errors/RUM)", "Cloudflare WAF, Fastly WAF, AWS WAF", "Patchstack, Wordfence, Sucuri (WordPress security)", "UpdraftPlus, BlogVault, AWS Backup, VaultPress"],
      },
      {
        name: "Comms, status & compliance",
        items: ["PagerDuty, Opsgenie, On-Call Scheduler (alerting)", "Statuspage.io, Better Stack Status (status pages)", "Slack, Microsoft Teams, Email (notifications)", "1Password, Bitwarden (credential vault)", "Linear, Jira, Asana (ticketing for content ops)", "Drata, Vanta, Secureframe (SOC2 evidence)"],
      },
    ],
    compliance: ["SOC 2 Type II (evidence pipeline)", "ISO 27001", "GDPR + UK GDPR", "HIPAA (with BAA)", "PCI DSS (where applicable)", "CCPA / CPRA"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Maintenance Engagements in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Mid-sized UK e-commerce brand, ~£4M annual revenue, Shopify Plus",
        situation: "Shopify Plus storefront running 12 apps with overlapping functionality (3 email apps, 2 review apps, 4 shipping apps). Checkout conversion dropped 8% over 6 weeks after a Klaviyo app update; Black Friday 2023 had 47 minutes of degraded checkout; the brand had no observability beyond Shopify's native dashboard and was paying £1,800/month for an agency retainer that responded to emails in 1–2 business days.",
        task: "Stabilize the storefront, recover the 8% conversion loss, ensure Black Friday 2024 sustained peak traffic without degradation, and provide real-time observability — all without disrupting the merchant's promotional calendar.",
        action: "ClickTake onboarded the site under a Premium-tier maintenance plan (£2,400/month). Phase 1 audit consolidated 12 apps to 6 (Klaviyo for email+SMS, Gorgias for support, Yotpo for reviews, ShipStation for shipping, Recharge for subscriptions, Searchanise for search) by removing overlapping functionality. Phase 2 deployed Datadog RUM for checkout funnel monitoring, Sentry for JS error tracking with Shopify release correlation, and Cloudflare Workers for HTML caching at edge. Phase 3 set up peak-traffic on-call for Black Friday with a 30-minute response SLA and a documented incident runbook covering the 6 most likely failure modes (payment-gateway outage, app-conflict, inventory oversell, CDN cache invalidation, search index corruption, theme-deploy regression).",
        result: "Checkout conversion recovered to pre-incident baseline +6% within 60 days (Klaviyo update regression identified and rolled back within 24 hours of Datadog deployment). App-update regressions caught in staging 94% of the time via integration test suite. Black Friday 2024 sustained 1,400 concurrent checkouts with zero downtime and a 99.99% uptime score on the day. Two minor incidents during peak were detected in <5 minutes and resolved in <12 minutes each (MTTR 11 minutes). Annual cost of maintenance (£28,800) was 8% of the e-commerce brand's avoided downtime cost from the prior year's Black Friday incident alone (~£360K in lost revenue over 47 minutes).",
        quote: {
          text: "We didn't know we had a checkout problem until ClickTake's audit showed the Klaviyo regression. The Black Friday 2024 incident-free peak was the first in our company's 9-year history. The on-call rotation alone was worth the monthly fee.",
          author: "Head of E-commerce",
          title: "UK e-commerce brand on Shopify Plus",
        },
      },
      {
        client: "US B2B SaaS company, marketing site + docs site on Next.js, ~$30M ARR",
        situation: "Marketing site and docs site ran as separate Next.js apps with shared component dependencies but independent deploy pipelines. Deploys of the marketing site broke docs navigation 3 times in 6 months due to component drift; error-rate spikes after deploys went undetected for 4+ hours; the in-house team of 3 engineers managed maintenance as a side responsibility and resented the context-switching.",
        task: "Stabilize the deploy pipeline, eliminate cross-site regressions, deploy real-time observability, and free the engineering team to focus on product work — without growing the in-house team.",
        action: "ClickTake onboarded both sites under a Standard-tier maintenance plan (£1,800/month combined). Phase 1 deployed Vercel preview deploys per PR with required visual-regression tests via Playwright + Chromatic. Phase 2 configured Sentry release tracking with auto-detect of new errors within 5 minutes of deploy, with Slack alerting to the ClickTake on-call rotation. Phase 3 set up weekly Dependabot batch updates (minor/patch on Wednesdays, major on the first Monday of each month) with regression tests gating the merge. Phase 4 created a shared-component npm package (extracted from the duplicated components) with its own versioning and changelog. Phase 5 wrote the incident runbook covering the 5 most common failure modes.",
        result: "Deploy-to-detection time on regressions dropped from 4+ hours to <5 minutes via Sentry release tracking. Mean dependency-drift age fell from 47 days to 8 days. Cross-site regression incidents dropped from 3 in 6 months to 0 in the following 14 months. LCP held at <1.4s on both sites across 18 months (was drifting to 2.1s before onboarding). The in-house team's reported maintenance time fell from 14 hours/week to <2 hours/week, redirected to product work. Annual cost of maintenance ($21,600) was less than the cost of a single avoided cross-site regression incident ($35K average, including engineering + revenue impact).",
        quote: {
          text: "We treated maintenance as a distraction. ClickTake treats it as a discipline. We haven't had a Friday-night deploy fire in 14 months — which used to be a monthly occurrence. Our engineers actually focus on product now.",
          author: "VP of Engineering",
          title: "US B2B SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most SLA and scope questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & SLA Tiers",
        questions: [
          {
            q: "How much does website maintenance cost?",
            a: "Monthly cost ranges from £200 (Baseline tier — small business site, 4-hour response SLA, 99.5% uptime target) to £3,000+ (Premium tier — e-commerce at scale, 30-minute response, 99.95% uptime) to £8,000+ (Enterprise tier — mission-critical, 15-minute response, 99.99% uptime, multi-region). The dominant cost drivers are: response SLA tier, site complexity (single WordPress vs. multi-app Shopify Plus vs. multi-service Next.js), traffic volume (affects monitoring cost), and compliance scope (none vs. SOC2/HIPAA/PCI). Annual contracts get a 12% discount; multi-site portfolios get volume pricing.",
          },
          {
            q: "What is included in a maintenance plan?",
            a: "All tiers include: 1-minute uptime monitoring from 5 regions, daily backups with monthly restore tests, weekly security patching (critical CVEs in <72 hours), monthly Lighthouse audit on top 20 pages, monthly performance + uptime report, and access to the on-call rotation per the tier's response SLA. Standard/Premium/Enterprise tiers add: real-user monitoring (Datadog RUM), error tracking (Sentry), Cloudflare WAF + bot management, monthly content updates (3/10/25 hours respectively), and a dedicated Slack channel. Enterprise adds multi-region failover, SOC2 audit-evidence pipeline, and quarterly business reviews.",
          },
          {
            q: "Do you offer a free trial or audit?",
            a: "Yes — the Maintenance Audit is a free, one-time deliverable covering: full site inventory (CMS, plugins, dependencies, hosting), Lighthouse audit on 20 most-visited pages, Patchstack/Wordfence vulnerability scan, uptime history (last 30 days from public probes), and a written findings report with recommended tier and remediation backlog. The audit takes 2–3 business days; you keep the report whether or not you engage us.",
          },
          {
            q: "Can I get maintenance for a site ClickTake didn't build?",
            a: "Yes — approximately 65% of our maintenance portfolio is sites built by other agencies or in-house teams. The onboarding audit (Phase 1) covers everything we need to take over operations: code review, hosting review, access transfer, vulnerability scan. The handover typically takes 2 weeks; the prior agency is not required for transition (though we recommend a 30-day overlap for knowledge transfer where possible).",
          },
        ],
      },
      {
        name: "Patching & Security",
        questions: [
          {
            q: "How fast do you patch critical CVEs?",
            a: "Tier-dependent: Baseline (<7 days), Standard (<72 hours), Premium (<48 hours), Enterprise (<24 hours). The clock starts from CVE disclosure (NVD publication), not from when you ask us to patch. For WordPress sites, Patchstack's virtual-patching deploys a WAF rule within 4 hours of disclosure that blocks exploitation while the source patch is being tested. Critical patches are tested on staging first (typically 4–8 hours of regression testing) then promoted to production via the deploy pipeline.",
          },
          {
            q: "What happens if my site gets compromised?",
            a: "If the compromise occurs while under our maintenance plan and traces to a CVE we should have patched within SLA, remediation is included at no additional cost: forensics, malware removal, rebuild from clean backup, post-incident review, and reporting to support your breach-notification obligations. If the compromise traces to client-side issues (weak admin password, exposed API key, custom code we did not maintain), remediation is billable at our standard incident-response rate (£180/hour). We have had zero SLA-attributable compromises in 36 months across 147 sites.",
          },
          {
            q: "Do you handle WordPress plugin conflicts?",
            a: "Yes — Patchstack + WP-CLI batch updates with staging-first testing is our standard pattern. Each plugin update runs against a staging clone (BlogVault or WP Staging) with a smoke-test suite (homepage loads, login works, checkout completes, top-5 user flows pass). If a conflict surfaces, we identify the conflicting plugin, evaluate workarounds (alternative plugin, custom code, version pinning), and report options within 24 hours. Conflicts requiring plugin replacement are scoped as a separate engagement.",
          },
          {
            q: "How do you handle PCI / HIPAA / SOC2 compliance?",
            a: "PCI: if your site uses hosted checkout (Stripe, Shopify checkout, PayPal Smart Buttons), PCI scope stays at SAQ-A and we maintain the compliance evidence (firewall configs, patch records, access logs). HIPAA: deployments in HIPAA-scoped VPCs with BAAs in place; we maintain the audit-evidence pipeline for your annual assessment. SOC2: we maintain the patch, access, monitoring and incident-response evidence required for the Security trust principle, deliverable to your auditor via Drata/Vanta/Secureframe integration.",
          },
        ],
      },
      {
        name: "Performance & Backups",
        questions: [
          {
            q: "How do you maintain Core Web Vitals over time?",
            a: "Three techniques: (1) monthly Lighthouse audit on top-20 pages with weekly RUM data from Datadog/CrUX, with alerting on LCP >2.5s or 10% week-over-week degradation; (2) image optimization discipline — every uploaded image auto-compressed to AVIF/WebP via Cloudflare Images or Sharp, with responsive srcset; (3) quarterly JS bundle audit via Bundle Analyzer, with budget enforcement per route. Sites under maintenance typically hold Lighthouse 88+ on mobile across years; sites without maintenance decay 8–14% per year.",
          },
          {
            q: "How often are backups tested?",
            a: "Monthly restore drill on staging for all Standard/Premium/Enterprise plans, quarterly for Baseline. The drill: spin up a fresh environment, restore the latest backup, run smoke tests, record the time-to-restore. The drill is logged in the monthly report; SOC2/HIPAA-scoped sites get the restore-test log as compliance evidence. We have had 3 restore tests fail in 36 months across 147 sites (database schema drift, missing config, file corruption) — each was remediated within 24 hours and the underlying backup process fixed.",
          },
          {
            q: "What is your backup retention policy?",
            a: "Daily backups retained 35 days, weekly snapshots retained 12 months, monthly snapshots retained 3 years (cold storage). For WordPress: DB dump + wp-content zip. For Next.js on AWS: RDS automated backup (35-day PITR) + weekly RDS snapshot + daily S3 media backup + Git tag for code state. For Shopify: limited to what Shopify's API exposes (products, customers, orders via Shopify Plus automated reports) plus theme export. GDPR right-to-be-forgotten is handled via documented key-destruction procedure for encrypted backups.",
          },
          {
            q: "Can you improve a slow site as part of maintenance?",
            a: "Yes — the Phase 4 Performance Optimization Sprint is included in onboarding for Standard/Premium/Enterprise tiers. For sites already under maintenance, performance work is included up to 4 hours/month (Standard), 10 hours/month (Premium), or 25 hours/month (Enterprise) as part of the monthly retainer. Larger performance projects (e.g., headless replatform, image-pipeline rebuild) are scoped separately. The monthly Lighthouse trend report shows whether the work is paying off.",
          },
        ],
      },
      {
        name: "Incident Response & Working with ClickTake",
        questions: [
          {
            q: "What counts as a 'critical' incident?",
            a: "Any of: site down (synthetic check failure from 2+ regions for 2+ checks), checkout/payment broken, login broken, security compromise detected, data loss detected. These page the on-call rotation immediately and the response SLA clock starts. Non-critical incidents (single page 404, slow single route, single feature broken) follow the standard ticket SLA (next business day for Baseline, 4 hours for Standard, 1 hour for Premium, 30 minutes for Enterprise).",
          },
          {
            q: "Where are your on-call engineers based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). On-call rotation follows the sun: UK daytime covered by Birmingham, US daytime covered by Pakistan (overlapping UK evening), US overnight and APAC covered by Pakistan + Austin. Premium and Enterprise tiers have a 24/7 on-call rotation; Standard and Baseline are business-hours-priority with off-hours paging only for critical incidents.",
          },
          {
            q: "What happens after a critical incident?",
            a: "Three steps: (1) immediate triage and mitigation — the on-call engineer stabilizes the site (rollback, failover, hotfix) within the response SLA; (2) status page updates every 30 minutes until resolution; (3) post-incident review within 5 business days, covering incident timeline, root cause, customer impact (downtime duration, revenue affected), preventive action items with owners and due dates. The review is shared with you in a live call; the action items are tracked in Linear/Jira and reported in the monthly report until closed.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Operate Your Site Under an Explicit SLA?",
    subtitle:
      "Book a free maintenance audit. We will inventory your site, run a Lighthouse + security scan, and tell you honestly whether you need a Premium-tier SLA plan — or whether a Baseline plan plus your existing in-house team would deliver 80% of the value at 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a free maintenance audit",
        description: "We inventory your site, run Lighthouse + security scans, and deliver a written findings report — yours to keep regardless of engagement.",
      },
      {
        step: "2",
        title: "Receive tier recommendation + fixed quote",
        description: "Within 3 business days of the audit, you receive a recommended tier, remediation backlog, and monthly cost — all fixed.",
      },
      {
        step: "3",
        title: "2-week onboarding",
        description: "Sign-and-start: we deploy monitoring, harden security, remediate the patch backlog, and ship the first monthly report within 14 days.",
      },
    ],
    primaryCta: { label: "Book a Free Maintenance Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the SLA Brief", href: "/resources", variant: "outline" },
  },
}
