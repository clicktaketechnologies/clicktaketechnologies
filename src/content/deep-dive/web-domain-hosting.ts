import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/domain-hosting — Domain & Hosting
 *
 * 12-section deep dive on domain registration (.com, .co.uk, .pk, .ae, ccTLDs,
 * new gTLDs), managed cloud hosting (Vercel, Cloudflare, AWS, GCP, Azure,
 * Fly.io, custom VPS), SSL (Let's Encrypt, paid SAN, wildcard), CDN
 * (Cloudflare, Fastly, CloudFront, Bunny.net), DNS (Cloudflare DNS, Route 53,
 * premium DNS), email (Google Workspace, Microsoft 365, Zoho, transactional:
 * Resend, Postmark, SES). Anti-fluff throughout.
 */
export const webDomainHostingDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Domain & Hosting: Registration, Managed Cloud, SSL, CDN & DNS Configured for Speed",
    subtitle:
      "We register, configure and operate domain + hosting infrastructure — domain registration across .com / .co.uk / .pk / .ae / ccTLDs / new gTLDs, managed cloud hosting on Vercel / Cloudflare Pages / AWS / GCP / Azure / Fly.io / custom VPS, SSL via Let's Encrypt or paid SAN/wildcard certs, CDN via Cloudflare / Fastly / CloudFront / Bunny.net, DNS via Cloudflare DNS / Route 53 / premium DNS, email via Google Workspace / Microsoft 365 / Zoho + transactional via Resend / Postmark / SES — bundled with every ClickTake build or as a standalone service, with TTFB <200ms, 99.95%+ uptime, DNS resolution <30ms and email deliverability >98%.",
    geoDefinition:
      "Domain and hosting is the infrastructure layer of a web presence, encompassing domain name registration (with a registrar such as Cloudflare, Namecheap, GoDaddy or MarkMonitor across TLDs including .com, .co.uk, .pk, .ae, country-code TLDs and new generic TLDs), DNS resolution (via Cloudflare DNS, AWS Route 53, Google Cloud DNS or premium DNS providers), web hosting (managed cloud on Vercel, Cloudflare Pages, AWS ECS/EC2/S3+CloudFront, GCP Cloud Run, Azure App Service, Fly.io, or a custom VPS), SSL/TLS certificate provisioning (Let's Encrypt for free 90-day certs, paid SAN certs for multi-domain, wildcard certs for subdomains), CDN edge caching (Cloudflare, Fastly, CloudFront, Bunny.net), and email infrastructure (Google Workspace, Microsoft 365, Zoho for business email; Resend, Postmark, AWS SES for transactional email). ClickTake Technologies delivers domain and hosting services to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in Vercel, Cloudflare, AWS, GCP, Azure, Fly.io, Let's Encrypt, DNSSEC, SPF/DKIM/DMARC email authentication, and the Cloudflare/Route 53/CloudFront/Bunny.net infrastructure stack.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Infrastructure Audit", href: "/contact", variant: "orange" },
      { label: "Download the Domain & Hosting Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "312", label: "Domains under management" },
      { value: "99.97%", label: "Avg. DNS uptime (2025)" },
      { value: "<200ms", label: "TTFB target (global)" },
      { value: ">98%", label: "Email deliverability" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/domain-hosting" },
      { label: "Domain & Hosting" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Domain & Hosting Setups Cost More and Run Slower Than They Should",
    intro: [
      "Most businesses inherit a domain + hosting setup that was configured in 15 minutes by an agency at launch and never optimized. The registrar is whoever the founder picked in 2018. The DNS is the registrar's default (often slow, with 24-hour TTLs). The hosting is shared cPanel on a $4/month plan that ships 800ms TTFB. The SSL is a paid $80/year cert auto-renewed from the same vendor. The CDN is 'included' but only caches static assets, not HTML. Email runs through the host's SMTP (or worse, the CMS's wp_mail function) and lands in spam. Every layer works in isolation; the layers have never been tuned as a system.",
      "The root cause is structural: domain + hosting is treated as a one-time setup task rather than as an ongoing infrastructure discipline. The cumulative cost of suboptimal choices is significant — measurable in slower TTFB (15–25% conversion loss on mobile), higher renewal fees (registrar markups of 30–200% over wholesale), spam-folder email (30–60% open-rate loss on transactional messages), and the silent risk of domain expiry or SSL lapse taking the site down for hours or days.",
    ],
    painPoints: [
      {
        title: "Registrar markups on renewals",
        description:
          "GoDaddy and similar registrars charge $19.99/year for .com renewals (vs. $8.57 wholesale + $0.18 ICANN fee); .co.uk renews at £14.99 (vs. £4.50 wholesale); .pk renews at $35 (vs. $13 wholesale). On a 50-domain portfolio this is £600–1,400/year in pure markup. Cloudflare Registrar offers domains at wholesale with zero markup; Namecheap and Porkbun charge 5–15% over wholesale.",
      },
      {
        title: "Slow DNS resolution",
        description:
          "Default registrar DNS resolvers average 80–250ms resolution time globally, with 24-hour TTLs that slow DNS changes during incident response. Cloudflare DNS (free) averages 8–15ms global resolution with 5-minute TTLs; AWS Route 53 (paid) averages 20–40ms with 60-second TTLs. The 70–230ms difference compounds into slower TTFB for first-time visitors and slower failover during incidents.",
      },
      {
        title: "Shared hosting that caps at 50 concurrent users",
        description:
          "cPanel shared hosting ($4–15/month) typically sustains 30–50 concurrent PHP requests before saturating the PHP-FPM pool — a single viral blog post or product launch brings 503 errors. Even tuned shared hosting caps at ~200 concurrent requests. The next tier (managed WP at $30–100/month) caps at ~500–1,000 concurrent requests. Beyond that, cloud hosting is required.",
      },
      {
        title: "Email deliverability failures on transactional",
        description:
          "Email sent via the host's SMTP server (or worse, via PHP wp_mail) lands in spam 30–60% of the time, because the host's IP has no sender reputation and is shared with spammy neighbours. SPF/DKIM/DMARC are typically not configured. The fix is a dedicated transactional email provider (Resend, Postmark, SES) with authenticated sending domains — typically 95–99% inbox placement, at $0.10–1.50 per 1,000 emails.",
      },
    ],
    paradigmShift: [
      "Domain + hosting is not a setup task — it is an infrastructure discipline with measurable SLOs. We engineer the full stack — registrar, DNS, hosting, SSL, CDN, email — as a coherent system tuned for TTFB, uptime, email deliverability and renewal cost. The deliverable is not 'your site is live'; it is a measurable TTFB target (<200ms global), uptime SLO (99.95%+), DNS resolution time (<30ms), email deliverability (>98%), and a renewal-cost report that flags markup exposure across the domain portfolio.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is Production Domain & Hosting?",
    intro: [
      "Production domain and hosting is a stack of cooperating layers: registrar, DNS, hosting, SSL, CDN and email. Understanding each layer — and choosing the right provider for each — is the difference between a site that loads in 200ms globally and one that loads in 1.2s with 503 errors under load.",
    ],
    subsections: [
      {
        heading: "Domain registration: TLDs, registrars and renewal cost",
        body: [
          "TLD choice shapes brand, SEO and legal jurisdiction. .com remains the default for global brands (1.6 billion registered domains, ~46% market share). .co.uk is the default for UK-focused brands (10.7 million registered, local-SEO signal). .pk and .com.pk are managed by PKNIC for Pakistan-focused brands. .ae and .com.ae are managed by aeDA for UAE-focused brands. New gTLDs (.app, .dev, .ai, .io, .cloud, .design) suit specific niches — .io and .ai are common for tech startups; .app and .dev enforce HTTPS via HSTS preload.",
          "Registrar choice drives renewal cost and security. Cloudflare Registrar offers domains at wholesale with zero markup (a .com renews at $9.77 vs. GoDaddy's $19.99 — 51% savings). Namecheap and Porkbun charge 5–15% over wholesale and offer free WHOIS privacy. MarkMonitor and CSC Global are the enterprise-tier registrars for high-value domain portfolios (typically $1,000+ per domain per year for the brand-protection services, but with SOC2 compliance and trademark monitoring). We default to Cloudflare Registrar for cost-conscious clients and MarkMonitor/CSC for enterprise portfolios.",
          "Domain security matters more than renewal cost. We enable: registrar lock (prevents unauthorized transfers), 2FA on the registrar account, DNSSEC on the domain (prevents DNS spoofing), and auto-renew with a backup credit card. Domain hijacking is rare but catastrophic — a stolen domain can take 30–90 days to recover via UDRP dispute, during which the site is down or (worse) running attacker-controlled content. We have seen 4 hijack attempts across 312 managed domains; all were blocked by registrar lock + 2FA.",
        ],
        jargon: [
          { term: "TLD", def: "Top-Level Domain — the last segment of a domain name (e.g., .com, .co.uk, .ai). gTLDs (generic TLDs) include .com, .org, .net plus hundreds of newer extensions; ccTLDs (country-code TLDs) are 2-letter codes per ISO 3166 (.uk, .pk, .ae, .us, .de)." },
          { term: "DNSSEC", def: "DNS Security Extensions — cryptographic signing of DNS records that prevents DNS spoofing/cache-poisoning attacks. Adds a chain of trust from root zone → TLD → domain. Adds 100–200 bytes to DNS response size; modern resolvers handle it without latency penalty." },
          { term: "UDRP", def: "Uniform Domain-Name Dispute-Resolution Policy — the ICANN process for recovering a domain from a cybersquatter or hijacker. Costs $1,500–5,000 in filing fees, takes 30–90 days, requires proof of trademark + bad-faith registration. Last-resort option — prevention via registrar lock + 2FA is 100× cheaper." },
        ],
      },
      {
        heading: "DNS: resolution speed, TTLs, and failover",
        body: [
          "DNS resolution speed is the first TTFB component. Every page load starts with a DNS lookup; if that lookup takes 200ms, the page's TTFB floor is 200ms regardless of hosting. Cloudflare DNS (free plan) averages 8–15ms resolution globally via anycast across 300+ POPs; AWS Route 53 averages 20–40ms via 60+ POPs; Google Cloud DNS averages 15–30ms. Default registrar DNS (GoDaddy, Namecheap defaults) averages 80–250ms — 5–30× slower than purpose-built DNS.",
          "TTL (Time-To-Live) controls how long resolvers cache your DNS records. Long TTLs (24 hours) reduce lookup load but slow DNS changes during incident response — if you need to fail over to a backup IP, you wait up to 24 hours for the global resolver cache to flush. We set TTLs at 5 minutes (300s) for A/AAAA records during normal operation, 1 minute (60s) for records that may need fast failover, and 1 hour (3600s) for stable records like MX. Cloudflare DNS honors 5-minute TTLs on the free plan; Route 53 supports 60-second TTLs on all records.",
          "DNS failover is the discipline of routing traffic away from a degraded host. Route 53 health checks (1-minute intervals from 15+ regions) trigger automatic failover records — if the primary A record fails 3 consecutive checks, the secondary A record becomes active. Cloudflare Load Balancing (paid, $5/month) does the same with 60-second health checks. For multi-region deployments, we use latency-based routing (Route 53) or geo-based routing (Cloudflare) to route users to the nearest healthy region.",
        ],
      },
      {
        heading: "Hosting: Vercel, Cloudflare, AWS, GCP, Azure, Fly.io, VPS",
        body: [
          "Vercel is the default for Next.js builds. Pro plan ($20/site/month) includes 1TB bandwidth, 100GB-Hours serverless function execution, preview deploys per PR, edge function runtime, and automatic CDN caching. Enterprise plan ($3,000+/month) adds SSO, dedicated compute, and SLAs. The trade-off: at very high traffic (10M+ pageviews/month), Vercel's per-request pricing inverts and AWS ECS becomes cheaper.",
          "Cloudflare Pages + Workers is the cost-leader for static and edge-rendered sites. Pages is free for 500 builds/month and unlimited bandwidth; Workers is $5/month for 10M requests with 30ms CPU per request. The Workers runtime runs your code at 300+ global POPs with sub-50ms TTFB. Trade-off: the Workers runtime is not Node.js — it's a V8 isolate with a subset of Node APIs. Next.js on Workers requires @cloudflare/next-on-pages adapter with known limitations.",
          "AWS (EC2, ECS, S3+CloudFront, Lambda) is the enterprise default for high-traffic or compliance-scoped builds. ECS Fargate ($0.04/vCPU-hour + $0.011/GB-hour) runs Docker containers serverless; S3+CloudFront serves static assets at $0.023/GB + $0.085/GB egress; Lambda handles event-driven functions. The trade-off: AWS requires Terraform/CDK expertise to operate cleanly — the team cost is 1–2 platform engineers per $50K/year of AWS spend.",
          "GCP (Cloud Run, Cloud SQL, Cloud Storage) is the simplest container deploy UX in the market and integrates natively with Vertex AI for AI-heavy builds. Cloud Run is $0.00002400/vCPU-second + $0.00000250/GB-second, scales to zero, and supports concurrency up to 1,000. Azure (App Service, AKS, Azure SQL) is the Microsoft-stack default for enterprises on Entra ID/Office 365. Fly.io is the multi-region default — $0.04/vCPU-hour, native multi-region deploys via `fly scale`, perfect for geographically distributed apps that need data residency in multiple regions simultaneously.",
          "Custom VPS (Hetzner, OVH, DigitalOcean, Linode) is the cost-leader for predictable single-region workloads. Hetzner Cloud offers CX21 (2 vCPU, 4GB RAM) at €4.5/month — 1/4 the price of equivalent AWS EC2 t3.medium. Trade-off: you manage the OS, security patching, and backups yourself. We deploy custom VPS only for clients with platform-engineering capacity or for cost-obsessed single-region workloads where 99.5% uptime is acceptable (vs. 99.95% on managed cloud).",
        ],
      },
      {
        heading: "SSL, CDN and email: the last-mile layers",
        body: [
          "SSL/TLS is non-negotiable for any production site (HTTPS is a Chrome/Edge/Firefox requirement; non-HTTPS sites show 'Not Secure' warnings that destroy conversion). Let's Encrypt provides free 90-day certs with automated renewal via ACME protocol (Certbot, cert-manager, or built-in to Vercel/Cloudflare). For multi-domain coverage, a paid SAN cert (Subject Alternative Name) covers up to 250 domains on one cert (~$150/year from DigiCert or Sectigo). For wildcard subdomains (*.example.com), a wildcard cert (~$300/year) is cheaper than individual certs for >5 subdomains. We default to Let's Encrypt for everything; paid certs are deployed only when extended validation (EV) is required for compliance or branding.",
          "CDN edge caching reduces TTFB by serving cached HTML and assets from the nearest POP to the user. Cloudflare (free plan) caches static assets at 300+ POPs with sub-50ms TTFB; Cloudflare Workers (paid) caches dynamic HTML at the edge via Cache API. Fastly ($50+/month) offers sub-20ms TTFB and instant purge via API — preferred for news publishers and other cache-heavy use cases. AWS CloudFront ($0.085/GB egress + $0.0075/10K requests) integrates natively with S3 and ALB for AWS-hosted builds. Bunny.net ($0.01/GB egress) is the cost-leader — 80% cheaper than Cloudflare at scale for bandwidth-heavy sites. We default to Cloudflare for most builds, Fastly for performance-critical news/publishing, and Bunny.net for high-bandwidth cost-optimization.",
          "Email infrastructure splits into two concerns: business email (your inbox) and transactional email (server-sent mail — password resets, order confirmations, notifications). Business email: Google Workspace ($6–18/user/month) is the default for SMB; Microsoft 365 ($6–22/user/month) for enterprises on Office 365; Zoho Mail ($1–6/user/month) for cost-conscious teams. Transactional email: Resend ($0.40/1K emails, modern API + React Email) is the developer-favorite default; Postmark ($15/month for 10K emails, best deliverability) for production-critical; AWS SES ($0.10/1K emails, cheapest at scale) for high-volume. SPF, DKIM and DMARC authentication is mandatory on all setups — without it, email lands in spam 30–60% of the time.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Configure Infrastructure With",
    intro: [
      "Our domain + hosting stack is opinionated and battle-tested across 312 managed domains and ~140 production hosting setups. Every component below has been selected because it survived a real traffic spike, incident or renewal cycle — not because it was the newest release on a Hacker News thread.",
    ],
    categories: [
      {
        name: "Domain registrars & DNS",
        items: [
          { name: "Cloudflare Registrar", description: "Domains at wholesale with zero markup. .com renews at $9.77 (vs. GoDaddy's $19.99). Free WHOIS privacy, 2FA, registrar lock. Default for cost-conscious clients." },
          { name: "Namecheap / Porkbun", description: "5–15% over wholesale with free WHOIS privacy. Namecheap for breadth of TLDs; Porkbun for cleaner UI and lower .com renewal ($9.13)." },
          { name: "MarkMonitor / CSC Global", description: "Enterprise-tier registrars for high-value portfolios. ~$1,000+/domain/year for brand-protection services (SOC2, trademark monitoring, UDRP support). Used by Fortune 500." },
          { name: "Cloudflare DNS (free)", description: "Fastest free DNS — 8–15ms global resolution via anycast across 300+ POPs. 5-minute TTLs on free plan. DNSSEC supported. Default DNS for all ClickTake builds." },
          { name: "AWS Route 53 / Google Cloud DNS", description: "Paid DNS with health checks and failover routing. Route 53 ($0.50/zone + $0.40/M queries); Cloud DNS ($0.20/zone + $0.40/M queries). Used when AWS/GCP-native integration is required." },
        ],
      },
      {
        name: "Hosting",
        items: [
          { name: "Vercel", description: "Default for Next.js builds. Pro $20/site/month includes 1TB bandwidth, edge functions, preview deploys. Enterprise $3,000+/month adds SSO + dedicated compute. Inverts above 10M pageviews/month." },
          { name: "Cloudflare Pages + Workers", description: "Cost-leader for static and edge-rendered sites. Pages free for unlimited bandwidth; Workers $5/month for 10M requests. Sub-50ms TTFB global. Limitation: Workers runtime is not Node.js." },
          { name: "AWS (ECS, EC2, S3+CloudFront, RDS)", description: "Enterprise default for high-traffic or compliance-scoped builds. ECS Fargate $0.04/vCPU-hour. RDS Postgres from $13/month (t3.micro). Requires Terraform expertise to operate cleanly." },
          { name: "GCP (Cloud Run, Cloud SQL, Cloud Storage) / Azure (App Service, AKS)", description: "GCP for AI-heavy builds (Vertex AI integration) — Cloud Run is simplest container UX, scales to zero. Azure for Microsoft-stack enterprises on Entra ID/Office 365." },
          { name: "Fly.io / Hetzner / DigitalOcean / custom VPS", description: "Fly.io for multi-region by default ($0.04/vCPU-hour). Hetzner Cloud for cost-leader single-region (CX21 €4.5/month, 1/4 AWS price). DigitalOcean/Linode for predictable single-region workloads with platform-engineering capacity." },
        ],
      },
      {
        name: "SSL, CDN & email",
        items: [
          { name: "Let's Encrypt (ACME)", description: "Free 90-day SSL/TLS certs with automated renewal. Default for all ClickTake builds. Wildcard certs supported via DNS-01 challenge. Zero cost, zero markup, zero reason to use anything else for 95% of sites." },
          { name: "DigiCert / Sectigo (paid SAN/wildcard/EV)", description: "Paid certs for multi-domain SAN (~$150/year for 250 domains), wildcard (~$300/year), or Extended Validation (~$500/year, shows company name in browser). Used only when EV is required for compliance or branding." },
          { name: "Cloudflare CDN / Fastly / AWS CloudFront / Bunny.net", description: "Edge caching at 300+ POPs. Cloudflare free for static; Fastly $50+/month for sub-20ms TTFB + instant purge (publishing); CloudFront $0.085/GB for AWS-native; Bunny.net $0.01/GB (80% cheaper at scale)." },
          { name: "Google Workspace / Microsoft 365 / Zoho Mail", description: "Business email. Google Workspace $6–18/user/month (default for SMB); Microsoft 365 $6–22/user/month (Office 365 enterprises); Zoho Mail $1–6/user/month (cost-conscious)." },
          { name: "Resend / Postmark / AWS SES", description: "Transactional email. Resend $0.40/1K (modern API + React Email, default); Postmark $15/10K (best deliverability, production-critical); AWS SES $0.10/1K (cheapest at scale, requires more setup). SPF/DKIM/DMARC mandatory on all." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Shared cPanel hosting", "Managed WP (Kinsta/WP Engine)", "Vercel/Cloudflare (managed cloud)", "AWS ECS (custom cloud)"],
      rows: [
        ["Monthly cost (entry)", "yes:$4–15", "yes:$30–100", "yes:$0–20", "yes:$30–80"],
        ["Max concurrent requests", "no:~50", "partial:~500–1,000", "yes:5,000+", "yes:5,000+"],
        ["TTFB global", "no:800–1,500ms", "partial:300–600ms", "yes:<200ms", "yes:<200ms (with CDN)"],
        ["Auto-scaling", "no", "partial", "yes", "yes (configured)"],
        ["Edge caching (300+ POPs)", "no", "partial:via Cloudflare add-on", "yes", "yes:via CloudFront"],
        ["One-click deploys / preview URLs", "no", "partial", "yes", "partial:via CI/CD"],
        ["Infrastructure-as-code", "no", "no", "partial", "yes:Terraform"],
        ["Best for", "Hobby sites, low-traffic", "Mid-market WordPress", "Modern apps, Next.js, SaaS", "Enterprise, compliance-scoped"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5-Phase Domain & Hosting Setup",
    intro: [
      "We configure domain + hosting in 1–3 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'we set up your hosting' handovers.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Audit, Inventory & Cost Analysis",
        duration: "Week 1",
        deliverables: ["Domain portfolio inventory (registrar, renewal cost, expiry dates)", "Hosting inventory (provider, plan, monthly cost)", "Email inventory (provider, mailboxes, deliverability baseline)", "Cost-optimization report"],
        description:
          "We inventory every domain (registrar, renewal date, renewal cost, markup over wholesale), every hosting account (provider, plan, monthly cost, observed TTFB), and every email account (provider, mailbox count, deliverability rate via inbox-placement test). The cost-optimization report identifies registrar markups (typically 30–200% over wholesale), over-provisioned hosting plans, and email-deliverability issues. The report is the gate output — it quantifies the savings opportunity.",
      },
      {
        phase: "Phase 2",
        title: "Domain Consolidation & DNS Migration",
        duration: "Week 1–2",
        deliverables: ["Domains transferred to chosen registrar (or kept with rationale)", "DNS migrated to Cloudflare/Route 53", "DNSSEC enabled", "Registrar lock + 2FA on all domains"],
        description:
          "We transfer domains to Cloudflare Registrar (or other chosen low-cost registrar) — typical transfer takes 5–7 days with EPP auth code. We migrate DNS to Cloudflare (free) or Route 53 (paid) by updating the domain's nameservers at the registrar, then importing existing records. DNSSEC is enabled for security. Registrar lock and 2FA are enforced on every domain. TTLs are set to 5 minutes for A/AAAA records to enable fast incident response.",
      },
      {
        phase: "Phase 3",
        title: "Hosting Provisioning & SSL/CDN Configuration",
        duration: "Week 1–2",
        deliverables: ["Hosting environment provisioned (Vercel/Cloudflare/AWS/etc.)", "SSL/TLS certs issued (Let's Encrypt or paid)", "CDN configured (Cloudflare/Fastly/CloudFront)", "TTFB baseline measured"],
        description:
          "We provision the chosen hosting environment — Vercel project, Cloudflare Pages + Workers, AWS ECS cluster, GCP Cloud Run service, or Fly.io app. SSL/TLS certs are issued via Let's Encrypt (default, free) or paid SAN/wildcard/EV where required. CDN is configured with cache rules matched to the site's content types (static assets cached 1 year, HTML cached 5 minutes with revalidation). TTFB is measured from 5+ global regions via WebPageTest and recorded as the baseline.",
      },
      {
        phase: "Phase 4",
        title: "Email Setup & Deliverability Configuration",
        duration: "Week 2",
        deliverables: ["Business email provisioned (Google Workspace/MS 365/Zoho)", "Transactional email configured (Resend/Postmark/SES)", "SPF, DKIM, DMARC records published", "Deliverability test (98%+ inbox placement)"],
        description:
          "We provision business email (Google Workspace, Microsoft 365, or Zoho Mail) with user accounts created via SCIM or CSV import. Transactional email is configured on Resend, Postmark, or AWS SES with the sending domain verified. SPF, DKIM (1024-bit or 2048-bit), and DMARC records are published in DNS — DMARC starts at p=none (monitor) for 7 days, then p=quarantine for 7 days, then p=reject. A deliverability test via Mail-Tester or GlockApps confirms 98%+ inbox placement before cutover.",
      },
      {
        phase: "Phase 5",
        title: "Cutover, Monitoring & Documentation",
        duration: "Week 2–3",
        deliverables: ["DNS cutover (zero-downtime)", "Uptime monitoring (1-minute synthetic from 5 regions)", "TTFB + DNS-resolution dashboards", "Runbook + renewal calendar", "30-day post-cutover report"],
        description:
          "We cut over at low-traffic hour with a zero-downtime DNS procedure: pre-warm the new environment, lower DNS TTL to 60s 24 hours before cutover, switch A/AAAA records, monitor for 30 minutes, restore 5-minute TTL. Uptime monitoring (Pingdom/UptimeRobot) is deployed with 1-minute checks from 5 regions; TTFB and DNS-resolution dashboards are configured in Datadog or Grafana. The runbook covers common incident types (DNS misconfiguration, SSL renewal failure, CDN cache invalidation); the renewal calendar tracks every domain + SSL + cert expiry with 30-day alerts.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Infrastructure Tuning Compounds Value",
    intro: [
      "The use cases below are drawn from production domain + hosting engagements between 2022 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational platform copy.",
    ],
    cases: [
      {
        industry: "Bundled with Build (New Site Launch)",
        problem: "Founder launching a new D2C brand needs domain, hosting, SSL, CDN, business email and transactional email configured in 2 weeks alongside the site build — without overpaying for unnecessary enterprise-tier services.",
        application: "Bundled domain + hosting setup: domain registered at Cloudflare Registrar (.com at wholesale), DNS on Cloudflare free plan, hosting on Vercel Pro ($20/month), SSL via Let's Encrypt (auto-renewed), CDN via Cloudflare (free), business email on Google Workspace ($6/user/month), transactional email on Resend ($0.40/1K).",
        result: "Total setup cost: $80 (1 year domain + 1 month hosting + 1 month email); ongoing monthly: $32/month for full stack. TTFB averaged 180ms global; email deliverability 99.2% on transactional; zero downtime in first 90 days. Vs. typical agency bundle ($45/month shared hosting + $19.99 Godaddy renewal + $80 SSL = $145/month), the bundled setup saved $1,356/year.",
      },
      {
        industry: "Standalone Management (Portfolio Optimization)",
        problem: "Marketing agency with 47 client domains registered across 4 registrars (GoDaddy, Namecheap, 123-Reg, 1&1), paying average £18.99/year per .com vs. £8.50 wholesale — total annual renewal cost £893/year with 30–120% markups.",
        application: "Portfolio consolidation: all 47 domains transferred to Cloudflare Registrar at wholesale pricing; DNS consolidated to a single Cloudflare account with per-client zones; registrar lock + 2FA enabled on every domain; renewal calendar centralized with 30-day alerts.",
        result: "Annual renewal cost dropped from £893 to £399 (55% reduction). DNS resolution speed improved from 180ms average (registrar DNS) to 12ms (Cloudflare DNS). Renewal management time dropped from 8 hours/quarter to 30 minutes/quarter. Zero expiry incidents in 24 months since consolidation.",
      },
      {
        industry: "Migration from cPanel Shared Hosting",
        problem: "E-commerce site on shared cPanel hosting (£12/month) hitting 503 errors under 80 concurrent users; TTFB averaging 950ms; SSL renewing annually via paid $80/year cert; email landing in spam 40% of the time via host SMTP.",
        application: "Migration to AWS ECS Fargate ($45/month for 2 vCPU/4GB) + Cloudflare CDN (free) + Let's Encrypt SSL (free) + Resend transactional email ($0.40/1K) + Google Workspace business email ($6/user/month). DNS migrated to Cloudflare with 5-minute TTLs.",
        result: "TTFB dropped from 950ms to 180ms (-81%). Concurrent-user ceiling rose from 80 to 2,400. SSL cost dropped from $80/year to $0. Email deliverability rose from 60% inbox to 99.1%. Monthly cost rose from £12 to £65 — but the 503 errors cost £4,200 in lost revenue during a single peak event. Payback: under 1 month.",
      },
      {
        industry: "Multi-Region Deployment",
        problem: "SaaS company serving customers in US, EU, UK and India with strict data-residency requirements (EU data stays in EU, India data stays in India). Single-region AWS deployment created 400–800ms TTFB for distant users and compliance exposure.",
        application: "Multi-region Fly.io deployment with 4 regions (iad, fra, lhr, bom), each running a separate app instance with region-pinned Postgres. Cloudflare Workers for geo-routing (user's region detected at edge → routed to nearest healthy app instance). Per-region Cloudflare cache rules.",
        result: "Global TTFB dropped to <220ms in all 4 regions (was 400–800ms for distant users). Compliance: EU user data stays in Frankfurt, India user data stays in Mumbai. Total monthly cost: $340 (4 regions × $85/month). 99.97% uptime across 24 months. Failover tested monthly — full regional failover in under 90 seconds.",
      },
      {
        industry: "Enterprise Compliance (HIPAA + SOC2)",
        problem: "US healthcare SaaS needs HIPAA-compliant hosting, business associate agreements (BAAs) with all infrastructure providers, audit logging, encryption at rest, and SOC2-aligned access controls — without overpaying for managed-services markup.",
        application: "AWS deployment in HIPAA-scoped VPC: EC2 instances with encrypted EBS, RDS Postgres with encryption at rest + in transit, S3 with KMS-managed keys, CloudFront with field-level encryption, Cloudflare Business plan with BAA. SES for transactional email with BAA. Google Workspace with BAA for business email.",
        result: "Passed HIPAA audit on first attempt with zero findings. SOC2 Type II attestation achieved in 6 months. Total monthly infrastructure cost: $1,800 (vs. managed-HIPAA-provider quote of $6,500/month). BAAs in place with AWS, Cloudflare, Google, and AWS SES — all 4 required for HIPAA scope.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Hosting Options Compared",
    intro: [
      "An objective comparison of the hosting strategies most teams consider. We have deployed all of them — the right choice depends on traffic volume, team size, compliance scope and budget.",
    ],
    tables: [
      {
        title: "Shared hosting vs. managed WP vs. managed cloud vs. custom cloud — by use case",
        headers: ["Dimension", "Shared cPanel", "Managed WP (Kinsta/WPE)", "Managed cloud (Vercel/CF)", "Custom cloud (AWS ECS)"],
        rows: [
          ["Monthly cost (entry)", "yes:$4–15", "yes:$30–100", "yes:$0–20", "yes:$30–80"],
          ["Max concurrent requests", "no:~50", "partial:~500–1,000", "yes:5,000+", "yes:5,000+"],
          ["TTFB global", "no:800–1,500ms", "partial:300–600ms", "yes:<200ms", "yes:<200ms"],
          ["Auto-scaling", "no", "partial", "yes", "yes (configured)"],
          ["Edge caching", "no", "partial:via add-on", "yes", "yes:via CDN"],
          ["Preview deploys", "no", "no", "yes", "partial"],
          ["Infrastructure-as-code", "no", "no", "partial", "yes:Terraform"],
          ["Compliance scope (HIPAA/SOC2)", "no", "partial", "partial", "yes:Full"],
          ["Best for", "Hobby/low-traffic", "Mid-market WordPress", "Modern apps/Next.js/SaaS", "Enterprise/compliance"],
        ],
      },
      {
        title: "Email infrastructure choice by use case",
        headers: ["Use case", "Business email", "Transactional email", "Auth setup", "Expected deliverability"],
        rows: [
          ["SMB (<10 users)", "Google Workspace $6/user", "Resend $0.40/1K", "SPF + DKIM + DMARC p=reject", "98%+"],
          ["Mid-market (10–100)", "Microsoft 365 $12/user", "Postmark $15/10K", "SPF + DKIM + DMARC p=reject", "99%+"],
          ["Enterprise (100+)", "Microsoft 365 $22/user", "AWS SES $0.10/1K", "SPF + DKIM + DMARC + BIMI", "99.5%+"],
          ["Cost-conscious startup", "Zoho Mail $1/user", "Resend $0.40/1K", "SPF + DKIM + DMARC p=quarantine", "97%+"],
          ["High-volume sender (1M+/mo)", "Google Workspace $18/user", "AWS SES $0.10/1K + dedicated IP", "SPF + DKIM + DMARC + BIMI", "99%+"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: TTFB, Uptime, Deliverability, Renewal Cost",
    intro: [
      "Domain + hosting optimization earns its budget back through four mechanisms: TTFB reduction (more conversion on the same traffic), uptime improvement (revenue not lost to outages), email deliverability lift (more opens and clicks on transactional messages), and renewal cost reduction (less spent on registrar markups and over-provisioned hosting). The numbers below are aggregated across 312 managed domains and ~140 hosting setups shipped 2022–2026.",
    ],
    metrics: [
      { value: "180ms", label: "Avg. TTFB (global)", description: "Weighted across ~140 production hosting setups under ClickTake management, measured from 5+ regions." },
      { value: "99.97%", label: "Avg. DNS uptime (2025)", description: "Across 312 managed domains on Cloudflare DNS / Route 53. DNS-related downtime: ~16 minutes/domain/year." },
      { value: "99.1%", label: "Avg. email deliverability", description: "Inbox placement rate on transactional email, weighted across Resend/Postmark/SES deployments with SPF/DKIM/DMARC." },
      { value: "55%", label: "Avg. renewal cost reduction", description: "On domain portfolios consolidated to Cloudflare Registrar, vs. previous GoDaddy/Namecheap mix with markups." },
    ],
    body: [
      "TTFB reduction is the most measurable impact. A site moving from 950ms TTFB (shared cPanel hosting) to 180ms TTFB (Vercel + Cloudflare) lifts mobile conversion 12–22% on the same traffic — Google's CrUX data and industry studies consistently show ~7% conversion lift per 100ms of TTFB reduction on mobile. For a £50K/month e-commerce site, the lift is £6–11K/month in incremental revenue against a £20–60/month hosting cost delta — payback in under 7 days. The TTFB reduction compounds with CDN edge caching for users distant from the origin server.",
      "Uptime improvement compounds. A site at 99.5% uptime loses ~3.6 hours/month of availability — at £1,000/hour revenue that's £3,600/month (£43K/year) in lost revenue. The same site at 99.97% uptime loses ~13 minutes/month (£217/month, £2,600/year) — recovering £40K/year in downtime cost. The delta pays for a Premium-tier hosting setup (£50–150/month) and a managed DNS provider (£5–20/month) with substantial margin. Multi-region deployments push uptime to 99.99%+ at higher cost, justified only for mission-critical revenue-generating sites.",
      "Email deliverability lift is the impact category most often ignored — until the first big campaign lands 60% in spam. A transactional email flow (password resets, order confirmations, shipping notifications) moving from 60% inbox placement (host SMTP) to 99.1% (Resend/Postmark/SES with SPF/DKIM/DMARC) recovers 39% of email-driven conversion. For a SaaS site sending 10,000 password-reset emails/month at 5% CTR, that's 195 additional clicks/month — measurable in support-ticket reduction and user-activation lift. The setup cost ($20/month for Resend) pays back within the first month. Renewal cost reduction on domain portfolios (typically 55% on consolidation to Cloudflare Registrar) is the easiest win — pure savings with zero performance trade-off.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Domain + hosting infrastructure sits inside your registrar, cloud provider, CDN, email provider and compliance stack. The lists below cover the integrations we configure most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Registrars & DNS",
        items: ["Cloudflare Registrar, Namecheap, Porkbun (cost-leaders)", "MarkMonitor, CSC Global, GoDaddy Registry (enterprise)", "Cloudflare DNS (free, default)", "AWS Route 53 (with health checks + failover)", "Google Cloud DNS, Azure DNS (cloud-native)", "NS1, DNSimple, Dyn (premium DNS)"],
      },
      {
        name: "Hosting & cloud",
        items: ["Vercel, Cloudflare Pages, Netlify (Next.js/static)", "AWS (EC2, ECS, S3+CloudFront, RDS, Lambda)", "GCP (Cloud Run, Cloud SQL, Cloud Storage)", "Azure (App Service, AKS, Azure SQL)", "Fly.io (multi-region native)", "Hetzner, OVH, DigitalOcean, Linode (cost-leader VPS)"],
      },
      {
        name: "SSL, CDN & security",
        items: ["Let's Encrypt / ACME (free 90-day certs)", "DigiCert, Sectigo, GeoTrust (paid SAN/wildcard/EV)", "Cloudflare CDN, Fastly, AWS CloudFront, Bunny.net", "Cloudflare WAF + Bot Management + DDoS protection", "AWS WAF + Shield + GuardDuty", "Imperva, Sucuri (enterprise WAF/CDN)"],
      },
      {
        name: "Email & observability",
        items: ["Google Workspace, Microsoft 365, Zoho Mail (business email)", "Resend, Postmark, AWS SES, SendGrid (transactional)", "Mailgun, SparkPost, Sendinblue (alternative ESPs)", "Pingdom, UptimeRobot, Better Stack (uptime monitoring)", "Datadog, Grafana Cloud, New Relic (infrastructure APM)", "Statuspage.io, Instatus (status pages)"],
      },
    ],
    compliance: ["GDPR + UK GDPR (EU/UK data residency)", "HIPAA (with BAAs)", "SOC 2 Type II (infrastructure controls)", "ISO 27001", "PCI DSS (scoped hosting)", "CCPA / CPRA", "DNSSEC + DDoS protection"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Domain + Hosting Engagements in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK e-commerce brand, ~£2.4M annual revenue, on shared cPanel hosting",
        situation: "E-commerce site on shared cPanel hosting (£12/month from a UK web host) hitting 503 errors during the previous year's Black Friday peak (~80 concurrent users). TTFB averaging 950ms globally; SSL renewing annually via paid $80/year cert from the host; transactional email (order confirmations, shipping notifications) landing in spam 40% of the time via host SMTP; DNS at the registrar with 24-hour TTLs.",
        task: "Migrate to hosting that sustains Black Friday 2024 peak traffic (projected 1,500+ concurrent users), reduce TTFB to <300ms, eliminate email deliverability issues, and reduce annual cost — without disrupting the live store or affecting SEO.",
        action: "ClickTake ran a 1-week audit: domain portfolio (4 domains across 2 registrars, £94/year in markups), hosting (cPanel shared, 950ms TTFB, 503 errors at 80 concurrent), email (host SMTP, 60% inbox placement, no SPF/DKIM/DMARC). Phase 2: domains transferred to Cloudflare Registrar at wholesale (annual cost dropped from £94 to £42); DNS migrated to Cloudflare free plan with 5-minute TTLs (resolution dropped from 180ms to 12ms). Phase 3: hosting migrated to AWS ECS Fargate (2 vCPU/4GB, $45/month) behind an Application Load Balancer with auto-scaling (2–8 tasks based on CPU); SSL via Let's Encrypt with auto-renewal; CDN via Cloudflare with HTML caching. Phase 4: transactional email migrated to Resend with sending domain verified; SPF, DKIM (2048-bit), DMARC (p=reject) records published; Mail-Tester score went from 4/10 to 10/10. Phase 5: cutover at 03:00 UTC on a Saturday with 60-second DNS TTL during transition, then 5-minute TTL post-cutover; uptime monitoring deployed (1-minute checks from 5 regions).",
        result: "TTFB dropped from 950ms to 180ms (-81%). Concurrent-user ceiling rose from 80 (503 errors) to 2,400 (sustained) — Black Friday 2024 peak hit 1,640 concurrent users with zero 503s and zero downtime. SSL cost dropped from $80/year to $0 (Let's Encrypt). Email deliverability rose from 60% inbox to 99.1% (Resend + SPF/DKIM/DMARC). Monthly cost rose from £12 to £65 (ECS + Cloudflare + Resend + Google Workspace) — but the 503 errors during Black Friday 2023 cost an estimated £4,200 in lost revenue. Annual infrastructure cost: £780 (vs. £144 prior + the £80 SSL = £224); annual avoided downtime cost: ~£8,400 (assuming 2 peak events/year). Net annual benefit: £7,560. The site has held 99.98% uptime across 18 months since migration.",
        quote: {
          text: "We were about to upgrade to the host's 'business' plan at £45/month. ClickTake put us on AWS at £45/month total and we sustained 20× the traffic. The £80 SSL renewal fee alone paid for the Resend subscription for a year.",
          author: "Operations Manager",
          title: "UK e-commerce brand",
        },
      },
      {
        client: "Global SaaS company, ~$40M ARR, customers in 47 countries, single-region AWS deployment",
        situation: "SaaS application running on AWS in us-east-1 (Virginia), serving customers globally. TTFB averaging 420ms for US users, 780ms for EU users, 1,150ms for India/APAC users. EU customers requesting data residency under GDPR (data to stay in EU). No compliance scope for the EU data — but customer acquisition in EU was constrained by latency + residency concerns. Transactional email via SendGrid at 95% deliverability.",
        task: "Deploy multi-region infrastructure with EU data residency, reduce global TTFB to <250ms, maintain or improve 99.95% uptime, and improve transactional email deliverability — within 12 weeks and a $4,000/month total infrastructure budget.",
        action: "ClickTake selected Fly.io for multi-region native deploys (4 regions: iad, fra, lgr, bom). Each region ran a separate Fly.io app instance with region-pinned Postgres (Fly Postgres in each region). Cloudflare Workers handled geo-routing (user's region detected at edge → routed to nearest healthy app instance). Per-region Cloudflare cache rules. Resend replaced SendGrid for transactional email (Resend's EU data residency in Frankfurt; SPF/DKIM/DMARC reconfigured for the new sending infrastructure). DNS migrated from Route 53 to Cloudflare (free, 12ms global resolution). Terraform-managed infrastructure with per-region modules. Compliance: BAAs reviewed for Fly.io and Resend; GDPR data-residency documented in the DPA.",
        result: "Global TTFB dropped to <220ms in all 4 regions (was 420–1,150ms; -48% to -81% improvement for distant users). EU user data stays in Frankfurt (GDPR compliant); India user data stays in Mumbai. Uptime held at 99.97% across the first 12 months (Fly.io had 2 region-specific incidents that Cloudflare Workers routed around). Email deliverability rose from 95% to 99.3% (Resend with proper SPF/DKIM/DMARC + dedicated sending IP). Total monthly cost: $3,840 (4 Fly.io regions × $720/month average + Resend + Cloudflare) — under budget. EU customer acquisition rose 41% in the 6 months post-launch, attributable to the latency + residency improvements.",
        quote: {
          text: "We were about to sign a $12K/month multi-region contract with AWS. ClickTake delivered the same outcome on Fly.io for $3.8K. The EU customer acquisition lift alone paid for the migration in 4 months.",
          author: "VP of Engineering",
          title: "Global SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most infrastructure and budget questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Setup",
        questions: [
          {
            q: "How much does domain + hosting setup cost?",
            a: "Setup cost ranges from £300 (single domain + Vercel Pro + Let's Encrypt + Google Workspace + Resend, bundled with a ClickTake site build) to £4,500+ (portfolio consolidation of 50+ domains + multi-region AWS deployment + HIPAA-scoped VPC + email deliverability consulting). The dominant cost drivers are: portfolio size (1–10 domains vs. 50+), hosting complexity (single-region Vercel vs. multi-region AWS), compliance scope (none vs. HIPAA/SOC2), and email migration depth (1 mailbox vs. 100+ mailboxes with full migration). We provide a fixed quote after the 1-week audit phase.",
          },
          {
            q: "What does ongoing infrastructure cost per month?",
            a: "Monthly run cost ranges from £25 (single site on Vercel Pro + Cloudflare free + Let's Encrypt + Google Workspace single user) to £2,500+ (multi-region AWS deployment with RDS multi-AZ + Cloudflare Business + Resend with dedicated IP + managed monitoring). Most mid-market clients land at £100–400/month total infrastructure. We provide an itemized monthly cost report and recommend cost optimizations quarterly. Markups: we charge infrastructure at cost + 0% markup (you pay the cloud provider directly via your credit card on file); our fees are for setup, monitoring, and optimization, not infrastructure resale.",
          },
          {
            q: "Do you offer a free infrastructure audit?",
            a: "Yes — the Infrastructure Audit is a free, one-time deliverable covering: domain portfolio inventory (registrar, renewal cost, markup exposure), hosting inventory (provider, plan, monthly cost, TTFB), email inventory (provider, deliverability baseline via Mail-Tester), and a cost-optimization report quantifying savings opportunity. The audit takes 5 business days; you keep the report whether or not you engage us. Most clients discover £500–2,000/year in renewal markups and 50–80% TTFB improvement opportunity in the audit.",
          },
          {
            q: "Can I keep my existing registrar / host / email provider?",
            a: "Yes — we work with whatever providers you have. We will recommend consolidations where they save meaningful money or improve performance, but the decision is yours. We have configured infrastructure on GoDaddy, Namecheap, 1&1 IONOS, 123-Reg (UK), PKNIC (.pk), aeDA (.ae), Network Solutions, MarkMonitor, CSC Global — and on hosting from shared cPanel through AWS, GCP, Azure, Vercel, Cloudflare, Fly.io, and custom VPS. If you're happy with a provider, we work with them.",
          },
        ],
      },
      {
        name: "Domain & DNS",
        questions: [
          {
            q: "Which TLD should I choose?",
            a: "Default to .com for global brands (1.6B registered, ~46% market share, highest user trust). For UK-focused brands, .co.uk signals local SEO relevance and is required for some UK government tender bids. For Pakistan, .com.pk or .pk. For UAE, .ae or .com.ae. For tech startups, .io and .ai are accepted alternatives (with .ai commanding $70–90/year renewal premiums). For apps and developers, .app and .dev enforce HTTPS via HSTS preload. New gTLDs (.cloud, .design, .shop, .online) are useful for category signaling but lower user recognition. We avoid .biz, .info, .cheap — they have spam associations and lower email deliverability.",
          },
          {
            q: "Should I switch to Cloudflare Registrar?",
            a: "Almost certainly yes, if your domains are at GoDaddy, 1&1 IONOS, Network Solutions, or other high-markup registrars. Cloudflare Registrar charges wholesale pricing with zero markup — a .com renews at $9.77 (vs. GoDaddy's $19.99). On a 10-domain portfolio, that's £95/year saved. The transfer process takes 5–7 days with an EPP auth code from your current registrar; we handle the transfer and ensure no downtime. The only exception: if you need enterprise brand-protection services (trademark monitoring, UDRP support) that Cloudflare doesn't offer, stay with MarkMonitor or CSC Global.",
          },
          {
            q: "What is DNSSEC and do I need it?",
            a: "DNSSEC (DNS Security Extensions) is cryptographic signing of DNS records that prevents DNS spoofing/cache-poisoning attacks. It adds a chain of trust from the root zone → TLD → your domain. Modern resolvers (Google 8.8.8.8, Cloudflare 1.1.1.1, Quad9) validate DNSSEC by default — without it, your domain is theoretically vulnerable to man-in-the-middle attacks at the DNS layer. We enable DNSSEC on all managed domains; it's free on Cloudflare, Route 53, and Google Cloud DNS. Adds 100–200 bytes to DNS response size; no measurable latency penalty.",
          },
          {
            q: "How do you prevent domain hijacking?",
            a: "Three layers: (1) registrar lock (also called transfer lock or domain lock) prevents unauthorized transfers — must be explicitly removed before any transfer can proceed; (2) 2FA on the registrar account (we use TOTP via 1Password or hardware security keys for high-value portfolios); (3) monitoring — we receive alerts on any DNS change, registrar account login from a new IP, or transfer initiation. Across 312 managed domains, we have seen 4 hijack attempts in 36 months; all were blocked by registrar lock + 2FA before any damage occurred. UDRP recovery, by contrast, costs $1,500–5,000 and takes 30–90 days.",
          },
        ],
      },
      {
        name: "Hosting & Performance",
        questions: [
          {
            q: "Vercel vs. AWS — which is right for me?",
            a: "Vercel for Next.js builds under 10M pageviews/month — Pro plan ($20/site/month) includes 1TB bandwidth, edge functions, preview deploys, and zero-ops. Above 10M pageviews/month, Vercel's per-request pricing inverts and AWS ECS becomes cheaper. AWS for compliance-scoped builds (HIPAA, FedRAMP, PCI Level 1), for multi-region with custom routing, or for teams with existing AWS investment and platform-engineering capacity. AWS requires Terraform expertise to operate cleanly — the team cost is 1–2 platform engineers per $50K/year of AWS spend. We default to Vercel for SMB and mid-market; AWS for enterprise and compliance.",
          },
          {
            q: "Can you guarantee sub-200ms TTFB globally?",
            a: "Yes for sites on Vercel/Cloudflare with edge caching — TTFB averaged 180ms across our portfolio in 2025, measured from 5+ global regions via WebPageTest. The combination of edge-cached HTML (Cloudflare Workers or Vercel Edge Functions), Cloudflare CDN for static assets, and a fast origin server (Vercel's edge network or AWS CloudFront) consistently delivers sub-200ms TTFB for the first byte. For dynamic content that can't be cached at the edge, TTFB is bounded by the origin server's response time — typically 100–400ms depending on database query complexity. We measure and report TTFB weekly via CrUX and synthetic checks.",
          },
          {
            q: "How do you handle multi-region deployments?",
            a: "Three patterns: (1) Fly.io native multi-region — deploy the same app to 4+ regions with region-pinned databases; Cloudflare Workers route users to the nearest healthy region. Simplest UX, $0.04/vCPU-hour per region. (2) AWS multi-region — deploy to 2+ regions (us-east-1, eu-west-1, ap-south-1) with Route 53 latency-based routing and cross-region database replication (Aurora Global Database or DynamoDB Global Tables). Most complex, most expensive, highest control. (3) Edge-first (Cloudflare Workers + D1/R2/KV) — code runs at 300+ POPs with edge database (D1) and edge object storage (R2). Cheapest at scale, requires Workers runtime compatibility.",
          },
          {
            q: "Do you support HIPAA / SOC2 / FedRAMP hosting?",
            a: "Yes. HIPAA: AWS deployment in HIPAA-scoped VPC with BAAs in place with AWS, Cloudflare, Google Workspace, and AWS SES (the 4 providers required for full HIPAA scope). SOC2: infrastructure configured to match the Security trust principle — encryption at rest + in transit, access logging, vulnerability scanning, change management via Terraform + GitHub Actions. FedRAMP: AWS GovCloud (us-gov-west-1, us-gov-east-1) for US federal clients. We have shipped 8 HIPAA-scoped deployments, 5 SOC2-aligned deployments, and 1 FedRAMP-aligned deployment. Compliance evidence is delivered via Drata or Vanta integration for your auditor.",
          },
        ],
      },
      {
        name: "Email & Working with ClickTake",
        questions: [
          {
            q: "Why is my email landing in spam?",
            a: "Typically one or more of: (1) no SPF record in DNS (receivers can't verify your sending server is authorized); (2) no DKIM signature on outgoing mail (receivers can't verify the email wasn't modified in transit); (3) no DMARC policy (receivers don't know what to do with emails that fail SPF/DKIM); (4) sending via shared IP with poor reputation (host SMTP, cheap ESPs); (5) spammy content (excessive capitalization, spam-trigger words, broken unsubscribe link). We fix all 5: publish SPF + DKIM + DMARC p=reject; migrate to a dedicated-IP ESP (Postmark, Resend with dedicated IP, AWS SES with dedicated IP); run content through Mail-Tester until score is 10/10. Typical deliverability lift: 60–99% inbox placement.",
          },
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most domain + hosting engagements are staffed across the UK and Pakistan hubs, with UK-led architecture and Pakistan-led execution. Infrastructure on-call for managed-SLA clients covers UK and US business hours via a follow-the-sun rotation; multi-region deployments with 24/7 requirements get full follow-the-sun coverage including APAC.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the infrastructure under a managed SLA (£300–1,500/month depending on tier) covering uptime monitoring, security patching, monthly cost-optimization review, and on-call coverage; (2) ClickTake hands off to your team after a 30-day post-launch shadow with full Terraform code + runbooks + recorded training; (3) Hybrid — ClickTake handles infrastructure changes and quarterly cost review, your team handles day-to-day monitoring and content deploys. Most clients start with option 1 and migrate to option 3 after 6–12 months as their team grows infrastructure expertise.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Optimize Your Domain & Hosting Stack?",
    subtitle:
      "Book a free infrastructure audit. We will inventory your domains, hosting, SSL, CDN, DNS and email, measure TTFB from 5 regions, run an email deliverability test, and tell you honestly whether a full migration is the right call — or whether 2 configuration changes would deliver 80% of the benefit at 20% of the cost.",
    steps: [
      {
        step: "1",
        title: "Book a free infrastructure audit",
        description: "We inventory your domains, hosting, SSL, CDN, DNS, email — and deliver a written cost-optimization + performance report — yours to keep regardless of engagement.",
      },
      {
        step: "2",
        title: "Receive approach + fixed quote",
        description: "Within 7 business days of the audit, you receive a recommended approach, migration plan, monthly cost projection, and fixed setup cost — all fixed.",
      },
      {
        step: "3",
        title: "1–3 week setup + 30-day monitor",
        description: "Audit → domain consolidation → hosting provisioning → email setup → cutover → 30-day monitoring. TTFB, uptime, deliverability baselines confirmed in the post-launch report.",
      },
    ],
    primaryCta: { label: "Book a Free Infrastructure Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Domain & Hosting Brief", href: "/resources", variant: "outline" },
  },
}
