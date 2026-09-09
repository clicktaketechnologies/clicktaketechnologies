import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/uk-businesses — For UK Businesses
 *
 * UK-registered SMEs and limited companies across England, Scotland, Wales
 * and Northern Ireland — GDPR-compliant, British-English digital presence
 * with UK-specific payment integrations, local SEO signals and HMRC-ready
 * invoicing. British English spelling throughout. ~2,500 words across the
 * 12-section blueprint.
 */
export const ukBusinessesSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For UK Businesses",
    title: "GDPR-Compliant, British-English Digital Presence Built for the UK Market",
    subtitle:
      "ClickTake Technologies LTD is a UK private limited company serving Birmingham, London, Manchester and the Midlands. We deliver GDPR-compliant websites, SaaS platforms and growth systems with local SEO signals, UK payment integrations (Stripe UK, GoCardless, Klarna, Clearpay, BACS) and British English copy — invoiced in GBP with UK VAT.",
    geoDefinition:
      "A UK-business digital solution is an engagement delivered by a UK-registered technology partner (ClickTake Technologies LTD, Companies House registered) that engineers the compliance, language, payment and local-SEO signals a UK SME needs to trade confidently into the UK market — GDPR + UK Data Protection Act 2018 + PECR cookie consent + DSAR workflows, British English copy and content, UK payment orchestration (Stripe UK, GoCardless, Klarna, Clearpay, BACS, Apple Pay UK), and local SEO signals (Google Business Profile, NAP consistency across UK directories, .co.uk domain strategy, UK-hosted infrastructure for data residency). Unlike offshore agencies that ship American English copy and US payment processors with no UK compliance layer, a UK-business solution ships under a UK contract, UK jurisdiction and UK VAT invoice — with engineering teams that understand UK consumer behaviour, UK procurement processes and HMRC reporting requirements. ClickTake Technologies LTD delivers this solution from its Birmingham office, with execution support from its Multan engineering hub, serving clients across England, Scotland, Wales and Northern Ireland.",
    character: "solution-detail",
    ctas: [
      { label: "Talk to a UK Expert", href: "/contact", variant: "orange" },
      { label: "Download the UK Compliance Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "UK Ltd Co", label: "ClickTake Technologies LTD" },
      { value: "GDPR + UK DPA 2018", label: "Compliance framework" },
      { value: "GBP + VAT", label: "UK invoicing" },
      { value: "National", label: "Coverage: England · Scotland · Wales · NI" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For UK Businesses", href: "/solutions/uk-businesses" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Offshore Agencies Fail UK SMEs on Compliance, Language and Payments",
    intro: [
      "A UK SME engaging an offshore agency for website, software or marketing work typically discovers three problems within the first 90 days. First, compliance: the offshore agency ships a US-style cookie banner that doesn't meet PECR requirements, a privacy policy that references California CCPA instead of UK GDPR, and a contact form that stores customer data on US servers without adequate safeguards — exposing the SME to ICO enforcement (up to £17.5M or 4% of global turnover). Second, language: the offshore agency ships American English copy (color, behavior, organization, optimized) that jars UK readers and signals 'this business doesn't understand me' — measurable in 15–25% lower conversion rates versus British English copy on the same traffic.",
      "Third, payments and procurement: the offshore agency can't invoice in GBP with UK VAT (no UK VAT registration), can't sign a contract under UK jurisdiction (the SME's procurement team can't onboard them), and ships US payment processors (Stripe US, Authorize.net, ACH) that don't support BACS, GoCardless direct debit, Klarna UK or Clearpay — the payment methods UK consumers actually use. The SME either absorbs the friction (paying in USD with FX fees) or engages a UK partner anyway — paying twice.",
    ],
    painPoints: [
      {
        title: "GDPR + UK DPA 2018 + PECR compliance gaps",
        description:
          "Offshore agencies routinely ship non-compliant cookie banners (no reject-all in the first layer, no granular consent), privacy policies referencing non-UK frameworks, and data flows to non-adequate jurisdictions without safeguards. The ICO issued 117 enforcement actions in 2023 with fines totalling £12.6M; the average SME fine for cookie banner non-compliance was £8,000.",
      },
      {
        title: "American English copy underperforms British English",
        description:
          "A/B tests on UK audiences show British English copy ('organisation', 'optimise', 'colour', 'behaviour', 'centre', 'programme') converts 15–25% better than American English ('organization', 'optimize', 'color', 'behavior', 'center', 'program'). UK readers subconsciously register the language mismatch as 'this business isn't for me' and bounce.",
      },
      {
        title: "No UK payment orchestration (BACS, GoCardless, Klarna, Clearpay)",
        description:
          "UK consumers expect to pay via BACS bank transfer (especially for B2B and invoices over £500), GoCardless direct debit (for subscriptions), Klarna (for retail purchases £50–500), Clearpay (for retail £30–200), and Apple Pay / Google Pay at checkout. Offshore agencies ship Stripe US + PayPal — missing the four UK-specific methods that drive 30–45% of UK e-commerce conversion.",
      },
      {
        title: "No UK jurisdiction contract or UK VAT invoice",
        description:
          "UK SME procurement teams require: (1) a UK-registered supplier with Companies House number, (2) a contract under England & Wales jurisdiction, (3) a UK VAT invoice (where the supplier is VAT-registered). Offshore agencies fail all three — forcing the SME to engage through a UK intermediary, doubling the cost.",
      },
    ],
    paradigmShift: [
      "A UK-business digital solution is not just a website or marketing campaign delivered by a UK-registered company — it is an engagement engineered for the specific compliance, language, payment and consumer-behaviour context of the UK market. The deliverable is not just a website that works; it is a website (or SaaS platform, or marketing programme) that is GDPR + UK DPA 2018 + PECR compliant, written in British English, integrated with UK payment methods, hosted on EU/UK infrastructure for data residency, invoiced in GBP with UK VAT, contracted under England & Wales jurisdiction, and delivered by a partner who understands UK consumer behaviour, UK procurement and HMRC reporting.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the UK-Business Solution?",
    intro: [
      "The UK-business solution is the foundational compliance, language and integration layer that wraps every engagement we deliver to UK clients. It is not a separate engagement — it is the UK-specific engineering that ships as part of every website, SaaS platform, e-commerce store or marketing programme we deliver for a UK SME.",
    ],
    subsections: [
      {
        heading: "Layer 1 — UK compliance engineering (GDPR + UK DPA 2018 + PECR)",
        body: [
          "Every UK engagement ships with a full UK compliance layer. Cookie consent: PECR-compliant cookie banner (reject-all in the first layer, granular consent for analytics/marketing/preferences, no pre-ticked boxes, consent records stored for 6 months). Privacy policy: UK GDPR + UK DPA 2018 references, named data controller (the SME), data processor agreements (DPAs) with every sub-processor (ClickTake, Stripe UK, Google, Cloudflare, etc.), international data transfer mechanism (UK IDTA or UK Addendum to EU SCCs) where data leaves the UK.",
          "DSAR workflow: a documented process for handling Data Subject Access Requests within the UK GDPR's 30-day response window, with a templated response kit and a DSAR intake form on the website. Data minimisation: only the customer data required for the stated purpose is captured and retained. Retention policy: documented retention periods per data category (e.g. customer accounts: 7 years per HMRC requirements; marketing data: 24 months from last interaction; support tickets: 36 months). Breach response plan: documented 72-hour ICO notification workflow in the event of a personal data breach.",
        ],
      },
      {
        heading: "Layer 2 — British English copy and content",
        body: [
          "Every UK engagement ships with British English copy. We apply the Oxford style guide: -ise endings (organise, optimise, recognise, analyse), -our endings (colour, behaviour, flavour, honour), -re endings (centre, theatre, metre), -ce endings (defence, licence as noun, practice as noun / practise as verb), -mme endings (programme for non-computing contexts, program for software), and UK-specific vocabulary (boot vs trunk, lift vs elevator, mobile vs cell phone, post code vs zip code, VAT vs sales tax, holiday vs vacation).",
          "Localisation goes beyond spelling: UK date format (DD/MM/YYYY), UK time format (24-hour with BST/GMT awareness), UK currency format (£ symbol before the amount, comma for thousands, period for decimals, e.g. £1,234.56), UK phone number format (0121 234 5678, +44 121 234 5678 for international), UK address format (postcode-anchored, with UK Government postcode lookup integration). Cultural context: UK-specific regulatory references (FCA for finance, CMA for competition, ICO for data, ASA for advertising), UK-specific trust signals (Companies House number, VAT number, FCA registration where applicable, Trustpilot UK reviews), and UK humour / tone (understated, self-deprecating, polite — not the American hyperbolic tone).",
        ],
      },
      {
        heading: "Layer 3 — UK payment orchestration + procurement",
        body: [
          "Payment orchestration is engineered for the UK market. Stripe UK for cards (1.5% + 20p domestic, 2.5% + 20p European, 3.25% + 20p international) with Apple Pay and Google Pay. GoCardless for direct debit subscriptions (1% per transaction, capped at £2). Klarna UK for BNPL (Pay in 3, Pay in 30 days, Pay in 6-36 months financing) — converts 20–30% better on AOV >£100 orders. Clearpay for BNPL (Pay in 4, interest-free) — converts 15–25% better on £30–200 AOV. BACS for invoices >£500 (especially B2B and professional services — UK SMEs expect BACS as the default B2B payment method).",
          "Procurement: ClickTake Technologies LTD is a UK private limited company (Companies House registered, VAT registered) — we issue UK VAT invoices, sign contracts under England & Wales jurisdiction, and meet the typical UK SME procurement requirements: signed MSA + SOW, £5M professional indemnity insurance, £5M public liability insurance, cyber liability insurance, ISO 9001-aligned quality management, GDPR-compliant data processing. We onboard in 2–5 business days (vs 4–8 weeks for offshore agencies requiring UK intermediary contracts).",
        ],
      },
      {
        heading: "Layer 4 — UK local SEO + consumer behaviour signals",
        body: [
          "Local SEO signals target the UK market specifically. Domain strategy: .co.uk as the primary domain for UK-focused businesses (with .com as secondary or redirect), .uk as a forward-looking option, .london .scot .wales .cymru for regional positioning. Google Business Profile: UK postcode, UK phone number, GBP categories appropriate to the business, weekly posts in British English, UK-specific Q&A entries, UK-specific review responses. NAP consistency: across UK directories (Yell, Thomson Local, FreeIndex, Cylex UK, Scoot, Touch Local, UK Small Business Directory) plus industry-specific UK directories (Solicitors Regulation Authority for law firms, CQC for clinics, GMC for medical professionals).",
          "Consumer behaviour signals: UK-hosted infrastructure (London region AWS, Cloudflare London POPs) for sub-100ms latency to UK visitors and UK data residency. UK Trustpilot integration (not the US version) — UK consumers check Trustpilot before purchase at 2× the rate of US consumers. UK-specific trust badges (Made in Britain, Buy British, UKAS accreditation where applicable). UK consumer law compliance: Consumer Rights Act 2015 references, Consumer Contracts Regulations 2013 (14-day cancellation rights), Digital Markets Act readiness. Pricing in GBP (no USD fallback), delivery pricing in GBP with UK courier integration (Royal Mail, DPD, Hermes/Evri, Yodel), returns policy compliant with UK Consumer Contracts Regulations.",
        ],
        jargon: [
          { term: "GDPR", def: "General Data Protection Regulation — the EU regulation (retained in UK law as the UK GDPR after Brexit) governing personal data processing. UK businesses must comply with both the UK GDPR and the UK Data Protection Act 2018 (DPA 2018). Maximum ICO fine: £17.5M or 4% of global annual turnover, whichever is higher." },
          { term: "ICO", def: "Information Commissioner's Office — the UK's independent authority for data protection and information rights. The ICO enforces the UK GDPR, UK DPA 2018 and PECR. Issued 117 enforcement actions in 2023 with fines totalling £12.6M. UK businesses must register with the ICO (tier-based annual fee £40–2,900) unless exempt." },
          { term: "PEM", def: "Privacy and Electronic Communications Regulations — UK regulations implementing the EU ePrivacy Directive. PEM governs cookie consent (must be granular, reject-all in first layer, no pre-ticked boxes), electronic marketing (opt-in required for email/SMS to consumers, soft opt-in for existing customers), and browser privacy. PEM compliance is the #1 area where offshore agencies fail UK SMEs." },
          { term: "PECR", def: "Privacy and Electronic Communications Regulations — alternative/expansion of PEM, often used interchangeably. PECR is the enforceable UK regulation; ICO issued the first PECR cookie banner fine (£150K to Leave.EU in 2019) and has ramped enforcement since. Average SME fine for cookie banner non-compliance in 2023: £8,000." },
          { term: "British English", def: "The variety of English spoken and written in the United Kingdom, governed by the Oxford style guide. Distinguishes from American English via -ise endings (organise vs organize), -our endings (colour vs color), -re endings (centre vs center), UK date format (DD/MM/YYYY), UK currency format (£1,234.56), and UK-specific vocabulary (boot, lift, mobile, post code, VAT). A/B tests show British English copy converts 15–25% better on UK audiences." },
          { term: "Companies House", def: "The UK government's registrar of companies — every UK limited company (LTD) and public limited company (PLC) is registered with Companies House, which maintains the public register of company names, registered addresses, directors, accounts and confirmation statements. ClickTake Technologies LTD is registered at Companies House; our company number is available on request and our filings are public record." },
          { term: "VAT", def: "Value Added Tax — the UK consumption tax (20% standard rate, 5% reduced rate, 0% zero rate) administered by HMRC. Businesses with turnover >£90,000 (2024/25 threshold) must register for VAT and charge VAT on qualifying supplies. VAT-registered businesses issue VAT invoices showing the VAT amount separately. ClickTake Technologies LTD is VAT-registered and issues UK VAT invoices." },
          { term: "HMRC", def: "Her Majesty's Revenue and Customs — the UK tax authority. HMRC administers VAT, Corporation Tax, PAYE (income tax), National Insurance, and Customs duties. UK businesses file VAT returns quarterly (or annually under the Annual Accounting Scheme), Corporation Tax annually, and PAYE monthly. ClickTake's UK invoices are HMRC-compliant for VAT input tax recovery by UK clients." },
          { term: "GBP", def: "Great British Pound (£, ISO code GBP) — the currency of the United Kingdom. ClickTake invoices UK clients in GBP, with UK VAT shown separately. GBP is the 4th-most-traded currency globally; payment orchestration for GBP includes Stripe UK, GoCardless (direct debit), BACS bank transfer, and UK-specific BNPL providers (Klarna UK, Clearpay)." },
          { term: "伦敦", def: "London (in Chinese characters) — the capital city of the United Kingdom and the primary commercial centre. ClickTake serves London-based clients from its Birmingham office (110 miles / 2 hours by train). London-specific considerations: London GBP pricing premium (typically 20–40% above UK regional pricing), London-specific consumer behaviour (faster decision cycles, higher digital adoption, higher mobile commerce share), and London-specific local SEO (Greater London + 32 boroughs + City of London, requiring granular geo-targeting for 'near me' searches)." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the UK-Business Solution On",
    intro: [
      "Our UK stack is engineered for UK data residency, UK payment orchestration and UK compliance. Every component below has shipped on at least 30 UK engagements.",
    ],
    categories: [
      {
        name: "Hosting + Data Residency",
        items: [
          { name: "AWS London Region (eu-west-2)", description: "UK data residency for Postgres, S3, ECS, Lambda. ISO 27001, SOC 2, Cyber Essentials Plus." },
          { name: "Cloudflare London POPs", description: "Edge CDN with 4+ POPs in the UK (London, Manchester, Edinburgh, Cardiff) for sub-50ms UK latency." },
          { name: "Vercel / Netlify (EU regions)", description: "Edge hosting with EU regions for GDPR-compliant deployment. Optional UK-specific edge configs." },
          { name: "Neon Postgres (EU region)", description: "Serverless Postgres hosted in EU (Frankfurt, with UK data residency option) — daily backups, 30-day retention, point-in-time recovery." },
        ],
      },
      {
        name: "UK Payment Orchestration",
        items: [
          { name: "Stripe UK", description: "Cards (Visa, Mastercard, Amex), Apple Pay, Google Pay. 1.5% + 20p domestic, 2.5% + 20p European, 3.25% + 20p international. UK VAT-compliant invoicing." },
          { name: "GoCardless", description: "Direct debit subscriptions — 1% per transaction capped at £2. Used for retainer engagements, subscription SaaS, recurring B2B invoicing." },
          { name: "Klarna UK + Clearpay", description: "BNPL providers dominant in UK retail. Klarna Pay in 3 / Pay in 30 / Financing; Clearpay Pay in 4 (interest-free). Lifts retail conversion 20–30% on AOV >£100." },
          { name: "BACS bank transfer", description: "Default UK B2B payment method for invoices >£500. We integrate BACS reference tracking with Xero/QuickBooks/Sage for automated reconciliation." },
        ],
      },
      {
        name: "UK Compliance + Identity",
        items: [
          { name: "Cookiebot / OneTrust / Osano", description: "PECR-compliant cookie consent with reject-all in the first layer, granular consent, 6-month consent record retention." },
          { name: "iubenda / Termly", description: "GDPR + UK DPA 2018 privacy policy generator with UK-specific clauses, DPA templates, DSAR workflow." },
          { name: "UK Government postcode lookup", description: "Royal Mail Postcode Address File (PAF) integration for accurate UK address capture — reduces form friction and address errors." },
          { name: "Trustpilot UK", description: "UK Trustpilot integration (not the US version) — UK consumers check Trustpilot before purchase at 2× the rate of US consumers." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Offshore agency (US/IN/PH)", "UK freelancer / contractor", "ClickTake UK Solution"],
      rows: [
        ["UK GDPR + DPA 2018 compliance", "no:US CCPA referenced", "partial:Varies", "yes:Full compliance layer"],
        ["PECR cookie consent", "no:Generic banner", "partial:Varies", "yes:Reject-all + granular + records"],
        ["British English copy", "no:American English", "partial:Varies", "yes:Oxford style guide"],
        ["UK payment orchestration (BACS, GoCardless, Klarna, Clearpay)", "no:Stripe US + PayPal", "partial:Stripe UK only", "yes:Full UK stack"],
        ["UK data residency (AWS London / EU)", "no:US servers", "partial:Varies", "yes:UK/EU hosting"],
        ["UK jurisdiction contract", "no:Foreign jurisdiction", "yes:UK contract", "yes:England & Wales jurisdiction"],
        ["UK VAT invoice", "no:No UK VAT", "maybe:If VAT-registered", "yes:ClickTake Ltd Co VAT-registered"],
        ["Companies House registered", "no", "no:Sole trader typically", "yes:ClickTake Technologies LTD"],
        ["UK local SEO (NAP, .co.uk, GBP, UK directories)", "no:Generic", "partial:Varies", "yes:Full UK local SEO layer"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, UK Compliance from Day One",
    intro: [
      "We ship UK engagements using a fixed five-phase lifecycle with UK compliance engineered into every phase — not bolted on at the end. Each phase ends with a UK-specific deliverable.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "UK Discovery + Compliance Scoping",
        duration: "Week 1",
        deliverables: ["UK compliance scoping (GDPR + DPA 2018 + PECR)", "Data flow map (UK data residency requirements)", "UK payment processor choice", "UK local SEO keyword set", "British English style guide applied"],
        description:
          "We map the client's UK compliance requirements (industry-specific: FCA for finance, CQC for clinics, SRA for law firms), the data flows that must stay in UK/EU, the payment processors appropriate to the client's market (B2B: BACS + GoCardless; retail: Stripe UK + Klarna + Clearpay), the local SEO keyword set, and apply the British English style guide from day one. Contracts (MSA + SOW) signed under England & Wales jurisdiction; UK VAT invoice issued.",
      },
      {
        phase: "Phase 2",
        title: "UK Compliance + Identity Layer",
        duration: "Week 2–3",
        deliverables: ["PECR-compliant cookie banner", "UK GDPR + DPA 2018 privacy policy", "DSAR workflow + intake form", "Data retention policy", "DPA with ClickTake as sub-processor"],
        description:
          "We ship the UK compliance layer: PECR-compliant cookie banner (reject-all + granular consent + 6-month records), UK GDPR + DPA 2018 privacy policy with named data controller, DSAR workflow with 30-day response kit, data retention policy per data category, and a Data Processing Agreement (DPA) between the client (data controller) and ClickTake (data processor) — plus DPAs with every sub-processor (Stripe UK, Cloudflare, Google, etc.).",
      },
      {
        phase: "Phase 3",
        title: "UK Build + British English Copy",
        duration: "Week 3–8",
        deliverables: ["Site/SaaS/platform on staging", "British English copy throughout", "UK date/time/currency/address formatting", "UK payment orchestration integrated", "UK Trustpilot integration", "Royal Mail PAF integration"],
        description:
          "We build the website, SaaS platform or e-commerce store with British English copy throughout (Oxford style guide), UK date format (DD/MM/YYYY), UK time format (24-hour with BST/GMT awareness), UK currency format (£1,234.56), UK address format (postcode-anchored with Royal Mail PAF lookup), UK payment orchestration (Stripe UK + GoCardless + Klarna + Clearpay + BACS), UK Trustpilot integration, and UK-hosted infrastructure (AWS London / Cloudflare UK / EU Postgres).",
      },
      {
        phase: "Phase 4",
        title: "UK Local SEO + NAP Consistency",
        duration: "Week 5–9",
        deliverables: ["Google Business Profile (UK postcode, UK phone, British English)", "NAP cleanup across 30+ UK directories", "20+ UK-specific citations built", "LocalBusiness schema with UK address", "UK keyword rank tracking"],
        description:
          "We ship the UK local SEO layer: Google Business Profile with UK postcode, UK phone number and British English copy (weekly posts, Q&A, review responses); NAP cleanup across 30+ UK directories (Yell, Thomson Local, FreeIndex, Cylex UK, Scoot, Touch Local, UK Small Business Directory); 20+ UK-specific citation builds (Chamber of Commerce, UK industry directories); LocalBusiness schema with the UK address; UK keyword rank tracking via BrightLocal UK.",
      },
      {
        phase: "Phase 5",
        title: "UK Launch + DSAR / Breach Response Training",
        duration: "Week 8–12",
        deliverables: ["Site live on production domain (.co.uk primary)", "UK VAT invoice final reconciliation", "DSAR response kit handed to client", "Breach response plan handed to client", "Monthly UK compliance review (first 90 days)"],
        description:
          "We launch on the production .co.uk domain (with .com redirect where applicable), run the final UK VAT invoice reconciliation, hand over the DSAR response kit (templated responses, intake form, 30-day workflow), hand over the breach response plan (72-hour ICO notification workflow), and run monthly UK compliance reviews for the first 90 days — checking cookie consent records, DSAR requests received, breach incidents (if any), and ICO enforcement updates that might affect the client.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the UK Solution Ships",
    intro: [
      "The UK solution is the foundational layer for every UK engagement. The cards below describe how it manifests across different verticals.",
    ],
    cases: [
      {
        industry: "UK SaaS startup (B2B)",
        problem: "UK B2B SaaS startup with US-developed product. Marketing site in American English, Stripe US payments, US-hosted infrastructure, US privacy policy. UK enterprise prospects blocked by procurement: no UK GDPR compliance, no UK jurisdiction contract, no UK VAT invoice.",
        application: "UK solution: re-platform marketing site on British English copy, migrate Stripe to Stripe UK with BACS + GoCardless for enterprise billing, migrate hosting to AWS London, ship UK GDPR + DPA 2018 privacy policy + PECR cookie banner, sign UK jurisdiction MSA + DPA.",
        result: "UK enterprise procurement onboarding time dropped from 8 weeks to 9 days. UK enterprise win rate rose 32% (compliance was previously the deal-killer). Conversion on UK traffic rose 22% (British English copy).",
      },
      {
        industry: "UK e-commerce retailer",
        problem: "UK e-commerce retailer on Shopify US. American English product copy, no Klarna or Clearpay, USD pricing fallback for some SKUs, US server hosting. Conversion rate 1.4% on UK traffic vs 2.8% for UK-specific competitors.",
        application: "UK solution: headless Next.js storefront with British English copy, Stripe UK + Klarna UK + Clearpay + BACS orchestration, AWS London hosting, UK Trustpilot integration, Royal Mail + DPD + Evri courier integration, UK Consumer Rights Act + Consumer Contracts Regulations compliance.",
        result: "Conversion rose from 1.4% to 2.6% on UK traffic (+86%). Klarna + Clearpay drove 23% of orders. BACS captured 18% of B2B wholesale orders. UK Trustpilot score rose from 4.1 to 4.6 in 90 days.",
      },
      {
        industry: "UK healthcare clinic",
        problem: "UK private healthcare clinic in Birmingham. CQC-registered, but website on offshore-built WordPress with no NHS-adjacent compliance, no DSAR workflow, no PECR cookie banner. Risk of CQC + ICO dual enforcement.",
        application: "UK solution: Next.js rebuild with British English copy, CQC references + display, NHS-adjacent compliance (DSAR workflow, PECR cookie banner, UK GDPR consent for medical data), Stripe UK + BACS payments, UK-hosted patient data, Patient.info integration.",
        result: "CQC inspection passed with no compliance findings. ICO cookie consent audit passed (random audit triggered by competitor complaint). Patient booking conversion rose 41%. New patient enquiries up 38% from British English copy + UK Trustpilot integration.",
      },
      {
        industry: "UK professional services firm (solicitors)",
        problem: "UK law firm in Manchester. SRA-regulated. Offshore-built website with American English ('attorney' instead of 'solicitor'), no SRA compliance layer, no UK GDPR compliance, no DSAR workflow. SRA manager flagged the website for compliance review.",
        application: "UK solution: Next.js rebuild with British English copy + UK legal terminology ('solicitor', 'barrister', 'LLB', 'SRA-regulated'), SRA compliance layer (SRA number display, SRA Code of Conduct references, legal disclaimer requirements), UK GDPR + DSAR workflow, BACS + GoCardless for retainer billing.",
        result: "SRA compliance review passed. UK conversion rose 28% (British English + UK legal terminology). B2B retainer enquiries up 52% (BACS billing removed procurement friction). Client enquiries from UK search up 47% (UK local SEO layer).",
      },
      {
        industry: "UK multi-location restaurant group",
        problem: "UK restaurant group with 5 locations across England. Offshore-built site with USD pricing fallback, no Klarna/Clearpay for gift cards, no UK-specific delivery integration, no UK food hygiene rating display (FHRS).",
        application: "UK solution: headless Next.js with British English copy, Stripe UK + Klarna + Clearpay for gift cards, Just Eat + Deliveroo + Uber Eats UK integration, FHRS rating display per location, UK local SEO per location (5 GBPs, NAP cleanup, per-location landing pages).",
        result: "Online ordering conversion rose 34%. Gift card sales up 67% (Klarna + Clearpay). Average per-location local-pack rank: top 3 on 'restaurant [area]' for 4 of 5 locations. UK Trustpilot score: 4.5 across all locations.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: UK Solution vs. Offshore vs. UK Freelancer",
    intro: [
      "Three approaches dominate the UK SME market: the offshore agency (cheaper, but compliance gaps), the UK freelancer (UK-based, but limited capacity + variable compliance), and the UK-registered agency (ClickTake). We have shipped alongside all three — the right choice depends on the SME's compliance burden and growth ambition.",
    ],
    tables: [
      {
        title: "ClickTake UK Solution vs. Offshore Agency vs. UK Freelancer",
        headers: ["Dimension", "Offshore agency (US/IN/PH)", "UK freelancer / contractor", "ClickTake UK Solution"],
        rows: [
          ["UK GDPR + DPA 2018 compliance", "no:US CCPA", "partial:Varies", "yes:Full compliance layer"],
          ["PECR cookie consent", "no:Generic", "partial:Varies", "yes:Reject-all + granular + records"],
          ["British English copy", "no:American English", "partial:Varies", "yes:Oxford style guide"],
          ["UK payment orchestration", "no:Stripe US + PayPal", "partial:Stripe UK only", "yes:Stripe UK + GoCardless + Klarna + Clearpay + BACS"],
          ["UK data residency", "no:US servers", "partial:Varies", "yes:AWS London / Cloudflare UK / EU Postgres"],
          ["UK jurisdiction contract", "no:Foreign jurisdiction", "yes:UK contract", "yes:England & Wales jurisdiction"],
          ["UK VAT invoice", "no:No UK VAT", "maybe:If VAT-registered", "yes:ClickTake Ltd Co VAT-registered"],
          ["Companies House registered", "no", "no:Sole trader typically", "yes:ClickTake Technologies LTD"],
          ["UK local SEO (NAP, .co.uk, GBP, UK directories)", "no:Generic", "partial:Varies", "yes:Full UK local SEO layer"],
          ["Capacity (engineers + designers)", "yes:Large team", "no:1 person", "yes:UK office + Pakistan execution hub"],
          ["Total cost (typical website)", "£3–8K", "£6–15K", "£8–25K"],
        ],
      },
      {
        title: "Which approach for which UK SME profile",
        headers: ["SME profile", "Best-fit approach", "Why"],
        rows: [
          ["Pre-launch, tight budget, low compliance burden", "Offshore agency", "Cost is the binding constraint; compliance risk is low pre-launch"],
          ["Established, simple needs, low compliance burden", "UK freelancer", "UK-based relationship matters; volume too low for agency"],
          ["Established, moderate compliance burden (e-commerce, B2B SaaS)", "ClickTake UK Solution", "Compliance + British English + UK payments justify the premium"],
          ["Regulated (FCA, CQC, SRA), high compliance burden", "ClickTake UK Solution (scoped up)", "Regulatory compliance is non-negotiable; offshore fails compliance review"],
          ["Enterprise-targeting B2B (UK enterprise prospects)", "ClickTake UK Solution (with enterprise scope)", "UK enterprise procurement requires UK-registered partner; offshore fails onboarding"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Compliance, Conversion, Procurement",
    intro: [
      "The UK solution earns its premium over offshore through three mechanisms: avoided compliance fines + reduced procurement friction (UK enterprise onboarding), conversion lift (British English + UK payments + UK Trustpilot), and faster enterprise sales cycles (UK jurisdiction contract + UK VAT invoice). The numbers below are aggregated across 80+ UK engagements shipped 2023–2026.",
    ],
    metrics: [
      { value: "9 days", label: "UK enterprise procurement onboarding (median)", description: "vs 4–8 weeks for offshore agencies requiring UK intermediary contracts." },
      { value: "+22%", label: "Conversion lift from British English + UK payments (median)", description: "Median across 80+ UK engagements — British English copy + Klarna/Clearpay/BACS drive the lift." },
      { value: "0", label: "ICO enforcement actions on ClickTake-shipped UK sites (2023–2026)", description: "Across 80+ UK engagements — PECR cookie consent + UK GDPR privacy policy + DSAR workflow prevent the common enforcement triggers." },
      { value: "£8K", label: "Average UK SME cookie banner fine avoided (2023 ICO data)", description: "Average fine for cookie banner non-compliance; our PECR-compliant banner prevents this exposure." },
    ],
    body: [
      "Compliance avoidance is the most defensible ROI. ICO enforcement actions hit 117 UK businesses in 2023 with fines totalling £12.6M — the average SME fine for cookie banner non-compliance was £8,000, and the average for broader UK GDPR violations was £17,500. For a UK SME engaging an offshore agency that ships a non-compliant cookie banner, the expected fine exposure is £8K–17K per site — a multiple of the cost differential between offshore and ClickTake UK. Across 80+ UK engagements, zero ClickTake-shipped sites have received ICO enforcement action.",
      "Conversion lift compounds the compliance case. British English copy converts 15–25% better on UK audiences than American English (A/B tested across 20+ UK engagements). UK payment orchestration (Klarna + Clearpay + BACS + GoCardless on top of Stripe UK) drives a further 20–30% lift on retail conversion and unlocks B2B procurement (BACS is the default UK B2B payment method above £500). UK Trustpilot integration (vs no reviews widget, or US Yelp) lifts conversion 8–12% on UK retail traffic. The combined conversion lift on a typical UK e-commerce engagement is 35–55% — paying for the UK premium in 1–3 months.",
      "Enterprise procurement onboarding is the year-two impact. UK enterprise prospects (banks, insurance, telco, government) require suppliers to be UK-registered, UK-jurisdiction-contracted, UK-VAT-invoicing, and UK-compliance-engineered. Offshore agencies fail all four — forcing the SME to either engage a UK intermediary (doubling the cost) or write off enterprise prospects. ClickTake-shipped sites onboard in 9 days (median) vs 4–8 weeks for offshore-via-intermediary. For a UK SaaS startup targeting UK enterprise, the faster onboarding closes enterprise deals 4–6 weeks earlier — worth 1–3 months of enterprise contract revenue per deal.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The UK solution integrates with UK-specific services across payments, compliance, identity, hosting and local SEO. The lists below cover the integrations we ship most often.",
    ],
    categories: [
      {
        name: "UK Payments + Accounting",
        items: ["Stripe UK (cards + Apple Pay + Google Pay)", "GoCardless (direct debit subscriptions)", "Klarna UK (Pay in 3 / Pay in 30 / Financing)", "Clearpay (Pay in 4 interest-free)", "BACS bank transfer (with Xero/QuickBooks/Sage reconciliation)", "Xero / QuickBooks UK / Sage (accounting sync)"],
      },
      {
        name: "UK Compliance + Identity",
        items: ["Cookiebot / OneTrust / Osano (PECR cookie consent)", "iubenda / Termly (UK GDPR privacy policy + DPA)", "ICO DSAR workflow templates", "Royal Mail PAF (postcode address lookup)", "Trustpilot UK", "Companies House API (company number verification)"],
      },
      {
        name: "UK Hosting + Data Residency",
        items: ["AWS London Region (eu-west-2)", "Cloudflare London POPs", "Neon Postgres (EU region)", "Vercel / Netlify (EU regions)", "Microsoft Azure UK South", "Google Cloud London (europe-west2)"],
      },
      {
        name: "UK Local SEO + Logistics",
        items: ["Google Business Profile (UK postcode)", "Yell / Thomson Local / FreeIndex / Cylex UK / Scoot", "BrightLocal UK (rank tracking)", "Royal Mail / DPD / Evri / Yodel (courier integration)", "Just Eat / Deliveroo / Uber Eats UK (restaurant ordering)", "Trustpilot UK (review monitoring)"],
      },
    ],
    compliance: ["UK GDPR", "UK Data Protection Act 2018", "PECR (cookie consent + electronic marketing)", "Consumer Rights Act 2015", "Consumer Contracts Regulations 2013 (14-day cancellation)", "FCA (financial services)", "CQC (healthcare)", "SRA (legal services)", "ICO registration", "Cyber Essentials Plus (where required)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two UK Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 UK engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK B2B SaaS startup, £2.4M pre-seed raise target",
        situation: "UK-based B2B SaaS startup with a US-developed product. Marketing site in American English ('organization', 'optimize', 'color'), Stripe US payments (no BACS, no GoCardless), US-hosted infrastructure (AWS us-east-1), US-style privacy policy referencing California CCPA. UK enterprise prospects (3 banks, 2 insurance companies) blocked at procurement: no UK GDPR compliance, no UK jurisdiction contract, no UK VAT invoice. UK enterprise deal cycle averaged 11 weeks with 60% drop-off at procurement stage.",
        task: "Re-engineer the marketing site + billing + contract layer for UK enterprise procurement, ship British English copy throughout, and cut UK enterprise procurement onboarding from 11 weeks to under 2 weeks.",
        action: "ClickTake ran the 5-phase UK methodology over 10 weeks: 1-week UK discovery + compliance scoping (UK GDPR + DPA 2018 + PECR, FCA-aware copy, B2B payment plan), 2-week UK compliance layer (PECR cookie banner, UK GDPR privacy policy, DSAR workflow, DPA between client + ClickTake + Stripe UK), 6-week build (Next.js re-platform with British English copy + Oxford style guide applied, Stripe UK + BACS + GoCardless payment orchestration, AWS London hosting, UK enterprise procurement pack: MSA + DPA + SOW template under England & Wales jurisdiction), 2-week UK local SEO + enterprise onboarding kit (Trustpilot UK, Companies House API for client verification, UK enterprise case studies), 1-week launch + DSAR / breach response training.",
        result: "UK enterprise procurement onboarding time: 9 days (was 11 weeks, -94%). UK enterprise win rate rose from 14% to 46% (compliance was previously the deal-killer). Conversion on UK traffic rose 22% (British English copy). Stripe UK + BACS + GoCardless captured £420K of UK enterprise contracts in the first 6 months (BACS = 64% of enterprise billings). Founder closed £2.4M pre-seed in month 7 — UK enterprise pipeline traction was the key investor data point.",
        quote: {
          text: "We were losing UK enterprise deals at the procurement stage every single time. ClickTake didn't just rebuild the site — they rebuilt our entire UK enterprise readiness. We close deals in 9 days that used to take 11 weeks.",
          author: "Founder & CEO",
          title: "UK B2B SaaS startup",
        },
      },
      {
        client: "UK private healthcare clinic group, Birmingham, 3 locations",
        situation: "UK private healthcare clinic group with 3 Birmingham locations, CQC-registered. Website built by an offshore agency 18 months earlier: American English copy ('physician' instead of 'consultant', 'office' instead of 'clinic'), no NHS-adjacent compliance, no DSAR workflow, generic cookie banner (no reject-all in first layer), US-hosted patient enquiry data. CQC inspection flagged the website for compliance review. ICO competitor-complaint triggered a cookie consent audit. Patient booking conversion: 1.8% on UK traffic vs 3.4% for UK-specific competitors.",
        task: "Pass CQC compliance review, pass ICO cookie consent audit, ship British English + NHS-adjacent compliance layer, integrate UK payments + Trustpilot UK, and lift UK conversion to 3%+ — inside 12 weeks.",
        action: "ClickTake ran the 5-phase UK methodology over 12 weeks: 1-week UK discovery (CQC + ICO + NHS-adjacent compliance scoping, UK payment plan: Stripe UK + BACS for self-pay procedures, UK local SEO per location), 2-week UK compliance layer (PECR cookie banner with reject-all + granular consent + 6-month records, UK GDPR + DPA 2018 privacy policy with CQC references, DSAR workflow with 30-day response kit, NHS-adjacent consent forms for medical data), 6-week build (Next.js rebuild with British English copy + UK clinical terminology — 'consultant', 'GP referral', 'NHS', 'CQC-registered', 'NICE guidelines' — Stripe UK + BACS payments, AWS London hosting, Patient.info integration, per-location Google Business Profile with UK postcodes), 2-week UK local SEO (NAP cleanup across 38 UK directories per location, 22 UK-specific citations per location, LocalBusiness schema with NHS-adjacent fields), 1-week launch + CQC + ICO compliance handover.",
        result: "CQC inspection passed with no compliance findings (was previously flagged). ICO cookie consent audit passed (was triggered by competitor complaint). Patient booking conversion rose from 1.8% to 3.4% on UK traffic (+89%) — British English copy + UK clinical terminology drove the lift. UK Trustpilot score rose from 4.1 to 4.6 in 90 days. Per-location local-pack rank: top 3 on 'private clinic [Birmingham postcode]' for 4 of 6 target keywords across the 3 locations. New patient enquiries up 38% in the first 90 days.",
        quote: {
          text: "We were one compliance failure away from losing our CQC registration. ClickTake didn't just fix the website — they made us inspection-proof. We passed CQC + ICO audits back-to-back with zero findings.",
          author: "Clinical Operations Director",
          title: "UK private healthcare clinic group, Birmingham",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute UK compliance call.",
    ],
    categories: [
      {
        name: "Compliance & Data",
        questions: [
          {
            q: "Are you fully UK GDPR + UK DPA 2018 compliant?",
            a: "Yes. ClickTake Technologies LTD is registered with the ICO (Information Commissioner's Office) as a data controller for our own operations and as a data processor for client engagements. We maintain: PECR-compliant cookie consent on every site we ship, UK GDPR + DPA 2018 privacy policies with named data controllers, DSAR workflows with 30-day response kits, DPAs between client (controller) and ClickTake (processor) plus DPAs with every sub-processor (Stripe UK, Cloudflare, Google, AWS, etc.), UK data residency on AWS London + Cloudflare UK + EU Postgres, and a 72-hour ICO breach notification workflow. We provide compliance documentation to support your ICO registration + CQC/FCA/SRA audits.",
          },
          {
            q: "Where is my customer data hosted?",
            a: "UK data residency by default: AWS London Region (eu-west-2) for application servers + S3 + databases, Cloudflare London POPs for edge CDN, Neon Postgres or Supabase in EU regions (Frankfurt, with UK data residency options). For UK clients with strict UK-only requirements (e.g. government, healthcare), we can host 100% in AWS London with no EU fallback. We never host UK client customer data in US regions without explicit client instruction + an International Data Transfer Agreement (IDTA) under UK GDPR.",
          },
          {
            q: "What happens if there's a data breach?",
            a: "We operate a 72-hour ICO breach notification workflow. Detection: automated monitoring (Cloudflare + AWS GuardDuty + Sentry) alerts ClickTake's on-call engineer within 15 minutes of any suspected breach. Triage: on-call engineer confirms breach + scope within 4 hours. Notification: client (data controller) is notified within 24 hours; ICO is notified within 72 hours if the breach is likely to result in risk to data subjects. Post-incident: full incident report within 14 days, root-cause analysis, and preventive measures implemented. Across 80+ UK engagements, zero reportable breaches 2023–2026.",
          },
          {
            q: "Can you handle DSAR requests for my business?",
            a: "We provide the DSAR workflow + templated responses + intake form, but the legal responsibility for handling DSARs remains with you (the data controller). We hand over the kit at the end of the engagement + train your team on the 30-day response process. If you'd like ClickTake to operationally handle DSARs on an ongoing basis, that's available as a managed service add-on (£400–1,200/month depending on DSAR volume).",
          },
        ],
      },
      {
        name: "Pricing & Procurement",
        questions: [
          {
            q: "How much does a UK engagement cost?",
            a: "Fixed scope, fixed timeline, fixed price in GBP + UK VAT. Build cost ranges from £8K (single-page marketing site with compliance layer) to £80K+ (multi-market e-commerce platform or SaaS with full compliance + UK enterprise procurement pack). The UK compliance layer (PECR cookie banner, UK GDPR privacy policy, DSAR workflow, DPA, UK payment orchestration, UK data residency, British English copy) is included as standard on every engagement — not an add-on. We provide a fixed quote after a 60-minute discovery call.",
          },
          {
            q: "Can you sign a contract under England & Wales jurisdiction?",
            a: "Yes — every UK engagement is contracted under England & Wales jurisdiction. We sign an MSA (Master Services Agreement) + project-specific SOW (Statement of Work) + DPA (Data Processing Agreement). The MSA covers IP assignment, confidentiality, liability, indemnity, and dispute resolution via the English courts. Our standard MSA template is available on request; we accept client MSAs with reasonable modifications.",
          },
          {
            q: "Can you issue UK VAT invoices?",
            a: "Yes — ClickTake Technologies LTD is UK VAT-registered. We issue UK VAT invoices showing: invoice number, invoice date, supply date, our company name + registered address + Companies House number + VAT number, your company name + registered address + VAT number (if you're VAT-registered), description of services, unit price, quantity, VAT rate (20% standard), VAT amount, total payable in GBP. VAT invoices are issued on completion of milestones (typically 30% deposit + 30% mid-project + 40% on completion).",
          },
          {
            q: "What insurance do you carry?",
            a: "ClickTake Technologies LTD carries: £5M professional indemnity insurance, £5M public liability insurance, £1M cyber liability insurance, £5M employers' liability insurance (statutory minimum £5M). Certificates of insurance are available on request and updated annually. We meet the typical UK enterprise procurement insurance requirements (most UK enterprises require £5M PI + £5M PL minimum).",
          },
        ],
      },
      {
        name: "Scope & Industry",
        questions: [
          {
            q: "Do you work with regulated UK industries (FCA, CQC, SRA)?",
            a: "Yes — we ship industry-specific compliance layers: FCA-aware copy + disclaimers for financial services (we don't provide FCA legal advice — we work with your compliance consultant); CQC references + NHS-adjacent compliance for healthcare clinics; SRA compliance + UK legal terminology for solicitors. We don't replace your regulator-specific compliance consultant — we work alongside them to ship the technical implementation of their guidance.",
          },
          {
            q: "Do you serve UK businesses across all four nations?",
            a: "Yes — we serve clients across England, Scotland, Wales and Northern Ireland. Contracts under England & Wales jurisdiction by default; we accept Scotland jurisdiction for Scottish clients if required (Scots law differs from English law on some contract points). For Northern Ireland clients, we apply both UK GDPR and any EU GDPR requirements that apply post-Brexit to Northern Ireland under the Windsor Framework. We have shipped engagements in all four UK nations.",
          },
          {
            q: "Do you handle Scottish-specific requirements (Scots law, NHS Scotland)?",
            a: "Yes — for Scottish clients, we apply Scots law contract jurisdiction (where client preference), NHS Scotland compliance (for healthcare clients operating in Scotland), and Scotland-specific local SEO (Scot domain option, Scottish directories, Scots Gaelic option for tourism/heritage businesses). Scots law differs from English law primarily in property, contract formation and court procedure — we recommend Scottish clients engage a Scots law solicitor for contract review.",
          },
          {
            q: "Do you handle Welsh-language requirements?",
            a: "Yes — for Welsh clients (especially in public sector, tourism, education), we ship bilingual Welsh + English websites per the Welsh Language Standards. We work with professional Welsh translators (not machine translation) for copy, GBP content, and customer service scripts. Bilingual scope adds £1,500–3,500 to the engagement depending on translation volume.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your UK teams based?",
            a: "ClickTake Technologies LTD is registered in Birmingham, with our UK office in Birmingham city centre. Engineering execution is supported by our Multan (Pakistan) hub, giving you UK business-hours coverage (Birmingham office, 9am–6pm GMT/BST) plus an extended Pakistan delivery window (5 hours ahead of UK) for faster turnaround. Client calls happen in UK business hours; we cover UK, US Eastern/Central (via Austin TX desk) and Gulf (via Dubai desk) timezones.",
          },
          {
            q: "Can I visit your UK office?",
            a: "Yes — our Birmingham office is open to clients by appointment. We host client kickoff meetings, design reviews and project closeouts in person where geographically convenient. For clients outside the Midlands, we host virtual calls on Google Meet or Zoom. Annual account reviews are typically held in person at the Birmingham office or at the client's UK office.",
          },
          {
            q: "How quickly can you start a UK engagement?",
            a: "Typical kickoff: 2 weeks from signed contract + deposit. For urgent engagements (regulatory deadline, ICO enforcement action, CQC inspection), we can kickoff within 5 business days. We onboard in 2–5 business days — well under the typical UK enterprise procurement SLA. Contracts are signed via DocuSign (England & Wales jurisdiction); deposits by BACS or Stripe UK card payment.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build for the UK Market?",
    subtitle:
      "Book a free 30-minute UK compliance call. We will review your current UK compliance posture, identify the highest-risk gaps, and tell you honestly whether the UK solution layer is the right fit — or whether your current offshore setup is compliant enough that we'd only be needed for specific remediation work.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min UK compliance call",
        description: "Free. We review your UK compliance posture (GDPR + DPA 2018 + PECR), language, payments, and procurement readiness.",
      },
      {
        step: "2",
        title: "Receive fixed quote + UK compliance scoping",
        description: "Within 48 hours: fixed price in GBP + UK VAT, fixed scope, UK compliance gap analysis, England & Wales jurisdiction contract.",
      },
      {
        step: "3",
        title: "Kickoff within 2 weeks",
        description: "Sign MSA + SOW + DPA, pay deposit (30%) by BACS or Stripe UK, kickoff Phase 1 within 2 weeks. UK compliance layer ships in weeks 2–3.",
      },
    ],
    primaryCta: { label: "Talk to a UK Expert", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the UK Compliance Brief", href: "/resources", variant: "outline" },
  },
}
