import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/local-businesses — For Local Businesses
 *
 * Brick-and-mortar and service-area businesses (clinics, salons, repair
 * shops, restaurants, professional services) — local SEO, GBP optimisation,
 * review management and a fast mobile site that converts searches into
 * walk-ins. ~2,500 words across the 12-section blueprint.
 */
export const localBusinessesSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For Local Businesses",
    title: "Win Your Local Pack and Turn Searches into Walk-ins",
    subtitle:
      "Local SEO, Google Business Profile optimisation, review management and a fast mobile-first website — bundled for clinics, salons, repair shops, restaurants and professional services across Birmingham, Multan, Austin and Dubai.",
    geoDefinition:
      "A local-business digital solution is a bundled engagement that delivers the four assets a brick-and-mortar or service-area business needs to appear in the Google local pack and convert searches into walk-ins, calls and bookings — local SEO audit and remediation, Google Business Profile optimisation, a fast mobile-first website with click-to-call and booking, and an automated review-request workflow. Unlike generic SEO retainers or template website builders, a local-business solution targets a specific geography (a city, a postcode district, a metro area) with citations, NAP consistency, localised landing pages and review velocity engineered for the local-pack algorithm. ClickTake Technologies delivers this solution to clinics, salons, repair shops, restaurants and professional services across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), on a stack of BrightLocal, Whitespark, Google Business Profile, Next.js and Twilio.",
    character: "solution-detail",
    ctas: [
      { label: "Get Free Local SEO Audit", href: "/contact", variant: "orange" },
      { label: "Download the Local Pack Playbook", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "Top 3", label: "Local pack target" },
      { value: "90+", label: "PageSpeed Insights mobile" },
      { value: "+15–30", label: "New reviews / month" },
      { value: "+40%", label: "Inbound calls (typical)" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For Local Businesses", href: "/solutions/local-businesses" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Local Businesses Lose 70% of Nearby Searches to Competitors",
    intro: [
      "A brick-and-mortar business with a 5-year-old WordPress site, 12 Google reviews and inconsistent NAP (name-address-phone) across 30 directory listings is invisible in the Google local pack — the top-3 map results that capture 44% of clicks on a local-intent search. The owner is paying £400/month for an SEO retainer that produces monthly reports but no rankings, and another £80/month for a website that takes 5.8 seconds to load on mobile.",
      "The result: competitors with fewer staff, smaller premises and worse reviews outrank the business on 'near me' searches because their local SEO is structured, their GBP is optimised and their site loads in 1.2 seconds on mobile. Local search is not a quality contest — it is a structure contest, and the structural factors are well-understood and engineerable.",
    ],
    painPoints: [
      {
        title: "Invisible in the Google local pack",
        description:
          "44% of clicks on a local-intent search go to the top-3 map results. A business ranking position 4–10 in the local pack gets ~5% of clicks. Most local businesses we audit rank outside the top 10 entirely — losing the majority of nearby-intent searches to competitors with weaker offerings but better-structured local SEO.",
      },
      {
        title: "Slow mobile site kills conversions",
        description:
          "53% of mobile visitors bounce on a site that loads in 3+ seconds. The typical local-business WordPress site on shared hosting loads in 4–7 seconds on a 4G connection. A fast (sub-1.5s LCP) Next.js site on edge hosting converts 2–3× better on the same traffic.",
      },
      {
        title: "Review velocity is ad-hoc and inconsistent",
        description:
          "Google's local-pack algorithm weights review velocity (reviews-per-month) heavily. A business with 12 reviews accumulated over 5 years ranks below a competitor with 80 reviews accumulated over 12 months at 6–8 per month. Without an automated post-appointment review-request workflow, review velocity stays flat and rankings stagnate.",
      },
      {
        title: "NAP inconsistency across directories",
        description:
          "When a business's name, address or phone number varies across 30+ directory listings (Yelp, Yell, Thomson, Foursquare, Apple Maps, Bing Places), Google's confidence in the business's location drops and rankings fall. NAP cleanup is tedious but mechanical — a one-time project with monthly maintenance.",
      },
    ],
    paradigmShift: [
      "Local search ranking is not a mystery — it is a 7-factor algorithm (relevance, distance, prominence, GBP completeness, review velocity, NAP consistency, on-site local signals) with each factor engineerable to a measurable target. We audit all 7, fix the structural gaps in 90 days, and ship a fast mobile-first site that converts the resulting traffic. The deliverable is not a monthly SEO report — it is a top-3 local-pack ranking and a measurable lift in calls, bookings and walk-ins.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the Local Business Solution?",
    intro: [
      "The local business solution is a 90-day engagement that delivers four assets in parallel: a local SEO audit and remediation, a Google Business Profile optimisation, a fast mobile-first website rebuild, and an automated review-request workflow. Each asset targets a specific factor in the local-pack algorithm.",
    ],
    subsections: [
      {
        heading: "Asset 1 — Local SEO audit + remediation",
        body: [
          "We audit the 7 ranking factors across the business's primary geography: relevance (keyword targeting on landing pages, GBP categories, services list), distance (service-area polygon for SABs, location pages for multi-location), prominence (citations, brand mentions, local links), GBP completeness (every field populated, photos, services, posts, Q&A), review velocity (current rate vs target, gap analysis), NAP consistency (across 30+ directories, with cleanup plan), and on-site local signals (schema, NAP in footer, embedded map, location-anchored title tags).",
          "Remediation is the 60-day execution: NAP cleanup across 30+ directories, citation building on 20+ local-specific directories (Chamber of Commerce, local business associations, industry-specific directories), 4–6 location-anchored landing pages, on-page local SEO (title tags, meta, schema), and internal linking from blog content to location pages. We track local-pack rank weekly across the target keyword set using BrightLocal or Whitespark.",
        ],
      },
      {
        heading: "Asset 2 — Google Business Profile optimisation",
        body: [
          "GBP optimisation is the highest-leverage single factor in local-pack ranking. We claim or verify the profile, populate every field (categories, services, products, attributes, hours, holiday hours, service area, opening date), upload 30+ photos (exterior, interior, team, products, before/after) with geo-tagged EXIF, post weekly GBP posts (offers, updates, events) for the first 90 days, and respond to every review (positive and negative) within 24 hours.",
          "We add GBP Q&A entries for the 10–15 most common customer questions, enable GBP messaging for direct customer contact, and configure GBP booking integration (if the business uses Calendly, Cal.com, Fresha or similar). Monthly: GBP Insights review (queries, directions, calls, photo views) and content calendar refresh.",
        ],
      },
      {
        heading: "Asset 3 — Fast mobile-first website rebuild",
        body: [
          "The website is the conversion layer — where a local-pack click becomes a call, a booking or a walk-in. We rebuild on Next.js 15 (App Router, edge runtime, ISR) deployed to Cloudflare Pages or Vercel. The site loads in under 1.5 seconds LCP on a 4G connection, scores 90+ on PageSpeed Insights mobile, and ships with click-to-call buttons (tel: links), click-to-directions (Google Maps deeplinks), click-to-WhatsApp, and an embedded booking widget (Calendly, Cal.com, Fresha, Square Appointments or a custom booking flow).",
          "The site ships with local SEO signals baked in: LocalBusiness schema (with NAP, hours, geo-coordinates, price range, aggregate rating), location-anchored title tags and meta descriptions, footer NAP matching the GBP, embedded Google Map, and 4–6 location/service landing pages targeting the primary keyword set. WCAG 2.2 AA accessibility, mobile-first responsive (375px / 768px / 1280px), and a CMS so the owner can edit hours, services and photos without us.",
        ],
      },
      {
        heading: "Asset 4 — Automated review-request workflow",
        body: [
          "Review velocity is the single highest-leverage factor a local business can move on a monthly basis. We build an automated workflow: after each appointment, job or transaction, the customer receives an SMS + email review request at the optimal time (24 hours post-service for B2C, 72 hours for B2B). The request routes happy customers (4–5 star intent) to Google, and routes unhappy customers (1–3 star intent) to an internal feedback form that captures the issue before it becomes a public negative review.",
          "We integrate with the business's existing systems: PMS for clinics (Cliniko, Pabau, Jane), POS for restaurants (Square, Toast, Lightspeed), CRM for professional services (HubSpot, Pipedrive), or a simple CSV upload for businesses without a system. Typical lift: 15–30 new Google reviews per month within 60 days, pushing review velocity from 1/month to 6–8/month and lifting local-pack rank by 3–7 positions over 90 days.",
        ],
        jargon: [
          { term: "Local pack", def: "The top-3 map-based business listings shown at the top of Google's search results for a local-intent query (e.g. 'dentist birmingham'). Captures ~44% of clicks on a local-intent search; ranking position 4–10 captures ~5%. The local pack is the single most valuable real estate in local search." },
          { term: "GBP", def: "Google Business Profile — the free Google listing that appears in Maps, the local pack and the knowledge panel. Optimising every field, posting weekly, responding to all reviews and uploading fresh photos is the highest-leverage single factor in local-pack ranking." },
          { term: "NAP", def: "Name, Address, Phone — the three core identifiers Google uses to verify a business's location across the web. NAP must be byte-identical across the GBP, the website footer, and 30+ directory listings. A single mismatch (e.g. 'St.' vs 'Street') drops Google's confidence and lowers ranking." },
          { term: "Citation", def: "An online mention of the business's NAP on a directory, industry site or local publication. Citations act as 'votes' for the business's location. We build 20+ local-specific citations per engagement (Chamber of Commerce, local business associations, industry directories)." },
          { term: "Review velocity", def: "The rate at which a business receives new Google reviews per month. Google's algorithm weights recent reviews more heavily than historical reviews. A business with 12 reviews accumulated over 5 years ranks below a competitor with 80 reviews accumulated at 6–8/month over the past year." },
          { term: "Service-area business (SAB)", def: "A business that serves customers at their location (plumber, electrician, mobile dog groomer) rather than at a fixed premises. SABs cannot show a 'visit us' address on GBP — they list a service-area polygon instead. SAB local SEO requires location-landing-page strategy since the business serves multiple postcodes." },
          { term: "Geo-grid", def: "A grid-based rank-tracking report (BrightLocal Local Search Grid, Local Falcon) that shows the business's local-pack rank at multiple points across a geography — e.g. rank at 1-mile intervals across a 10×10 grid. Reveals where the business ranks well, where it ranks poorly, and where competitors dominate." },
          { term: "SAB", def: "See Service-area business. SABs face a specific local-SEO challenge: their GBP must hide the business address (Google's policy) and they typically need 5–15 location-landing-pages to rank across their service area." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the Local Business Solution On",
    intro: [
      "Our local-business stack is opinionated around the 7 ranking factors. Every component below has shipped on at least 20 local-business engagements.",
    ],
    categories: [
      {
        name: "Local SEO & GBP",
        items: [
          { name: "BrightLocal", description: "Local-pack rank tracking, citation building, NAP audit, geo-grid reports. Weekly rank tracking across 50+ keywords." },
          { name: "Whitespark", description: "Citation building service + local-rank tracker. Used for bulk citation building across US, UK, CA, AU directories." },
          { name: "Google Business Profile", description: "Optimised profile: every field populated, weekly posts, 30+ photos, Q&A, messaging, booking integration." },
          { name: "Pleper / GMB Everywhere", description: "GBP audit chrome extensions — competitor category analysis, review velocity tracking, post frequency." },
        ],
      },
      {
        name: "Website & Infrastructure",
        items: [
          { name: "Next.js 15 (App Router, edge)", description: "Mobile-first, sub-1.5s LCP on 4G, LocalBusiness schema, click-to-call + click-to-directions + embedded booking." },
          { name: "Cloudflare Pages + Workers", description: "Edge hosting across 310+ POPs — 80–95% cheaper than shared hosting, 10–50× faster." },
          { name: "Sanity / Payload CMS", description: "Headless CMS so the owner edits hours, services, photos and posts without us." },
          { name: "Cloudflare Registrar + DNS", description: "Domain registered at wholesale; DNS resolves in 12ms vs GoDaddy's 180ms." },
        ],
      },
      {
        name: "Reviews & Booking",
        items: [
          { name: "Twilio + SendGrid / Postmark", description: "SMS + email review-request workflow triggered by appointment completion, POS close or CRM stage change." },
          { name: "Calendly / Cal.com / Fresha", description: "Embedded booking widget on the site — syncs to the business's calendar and triggers the review request post-appointment." },
          { name: "Google Reviews API + ReviewTrackers / BirdEye", description: "Review monitoring and response — alerts on new reviews, AI-suggested responses, multi-location aggregation." },
          { name: "Cliniko / Pabau / Jane (clinics)", description: "PMS integration to trigger review requests post-appointment and feed patient data to booking widget." },
          { name: "Square / Toast / Lightspeed (restaurants + retail)", description: "POS integration to trigger review requests post-transaction and pull daily sales for revenue attribution." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Generic SEO retainer", "Template site builder (Wix/Squarespace)", "ClickTake Local Business Solution"],
      rows: [
        ["Local-pack rank target", "no:Vague", "no:Not in scope", "yes:Top 3 in 90 days"],
        ["GBP optimisation", "partial:Ad-hoc", "no", "yes:Full audit + weekly posts + Q&A"],
        ["NAP cleanup across 30+ directories", "no:Manual one-off", "no", "yes:Via BrightLocal/Whitespark"],
        ["Mobile site LCP target", "no:Not in scope", "no:3–7s on shared hosting", "yes:<1.5s on edge"],
        ["Review-request workflow", "no", "no:Add-on widget", "yes:Automated SMS+email post-appointment"],
        ["Click-to-call + booking", "no", "partial:Add-on", "yes:Native, mobile-first"],
        ["LocalBusiness schema", "partial", "no", "yes:Full schema with NAP, hours, geo"],
        ["Total monthly cost", "£300–800/mo ongoing", "£20–40/mo hosting", "£1.5–4K one-off + £100–300/mo maintenance"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, 90 Days, Top-3 Local Pack",
    intro: [
      "We ship the local business solution in 90 days using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a measurable target.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Local SEO Audit + Competitor Analysis",
        duration: "Week 1–2",
        deliverables: ["7-factor audit report", "Geo-grid baseline (10×10 grid)", "Competitor gap analysis (top 5)", "NAP consistency report (30+ directories)", "Keyword set (50+ local-intent terms)"],
        description:
          "We audit the business's current local SEO across all 7 ranking factors, run a geo-grid baseline across the business's service area, analyse the top 5 competitors in the local pack, document NAP inconsistencies across 30+ directories, and define the 50+ keyword set the engagement will target.",
      },
      {
        phase: "Phase 2",
        title: "NAP Cleanup + Citation Building",
        duration: "Week 2–5",
        deliverables: ["NAP standardised across 30+ directories", "20+ new local citations built", "GBP claimed/verified + every field populated", "GBP Q&A entries (10–15)", "30+ geo-tagged photos uploaded"],
        description:
          "We standardise the business's NAP across all 30+ existing directory listings, build 20+ new local-specific citations (Chamber of Commerce, industry directories, local business associations), claim/verify the GBP and populate every field, add Q&A entries for the 10–15 most common customer questions, and upload 30+ geo-tagged photos.",
      },
      {
        phase: "Phase 3",
        title: "Website Rebuild (Mobile-First, Sub-1.5s LCP)",
        duration: "Week 3–7",
        deliverables: ["Next.js site live on staging", "LocalBusiness schema", "Click-to-call + click-to-directions + embedded booking", "4–6 location/landing pages", "PageSpeed mobile 90+", "WCAG 2.2 AA"],
        description:
          "We design and build the production Next.js website on the brand identity (or refreshed identity). Site ships with LocalBusiness schema, click-to-call, click-to-directions, embedded booking, 4–6 location/landing pages targeting the keyword set, and a headless CMS so the owner edits content without us. We enforce Core Web Vitals budget via Lighthouse CI and accessibility via axe-core.",
      },
      {
        phase: "Phase 4",
        title: "Review Workflow + GBP Activation",
        duration: "Week 6–9",
        deliverables: ["SMS + email review-request workflow live", "POS/PMS/CRM integration", "GBP weekly posts (12+ in 90 days)", "Review response SLA (24 hours)", "Negative-review routing to internal form"],
        description:
          "We build the automated review-request workflow, integrate with the business's existing system (POS, PMS, CRM or CSV upload), configure the dual-routing (happy customers to Google, unhappy to internal form), set up GBP weekly posts (12+ posts across the 90 days), and establish a 24-hour review-response SLA with AI-suggested responses for the business owner to approve.",
      },
      {
        phase: "Phase 5",
        title: "Launch + 90-Day Rank Tracking",
        duration: "Week 8–13",
        deliverables: ["Site live on production domain", "GBP posts published weekly", "BrightLocal geo-grid weekly", "Monthly performance report (calls, directions, reviews, rank)", "Top-3 local-pack target hit on 50%+ of keyword set"],
        description:
          "We launch the site on the production domain, switch analytics from staging to production, and run 90 days of weekly geo-grid rank tracking. Monthly reports cover calls (via call-tracking number), directions (via GBP Insights), reviews (count + velocity + sentiment), and rank movements across the keyword set. Target: top-3 local-pack on 50%+ of the keyword set by day 90.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the Local Business Solution Ships",
    intro: [
      "The solution adapts to the vertical — clinics, salons, repair shops, restaurants and professional services each have different conversion paths. The cards below describe real engagements shipped 2023–2026.",
    ],
    cases: [
      {
        industry: "Dental clinic (multi-location)",
        problem: "3-location dental clinic in Birmingham with 8 Google reviews total, a 6-year-old WordPress site loading in 5.4s on mobile, and ranking outside the top 10 on 'dentist birmingham' searches.",
        application: "Local solution: local SEO audit + NAP cleanup across 38 directories, GBP optimisation for each of 3 locations with weekly posts and 30+ photos per location, mobile-first Next.js rebuild (3 location pages + 6 service pages), automated SMS review request via Cliniko integration.",
        result: "Top-3 local pack on 'dentist [postcode]' for 8 of 12 target keywords by day 90. Reviews rose from 8 to 74 in 90 days. Calls up 52%. New patient bookings up 38%.",
      },
      {
        industry: "Phone repair shop (SAB)",
        problem: "Single-location phone repair shop in Austin with a 4.2-star rating from 19 reviews, ranking #7 on 'phone repair austin' searches, no GBP posts in 18 months.",
        application: "Local solution: SAB-specific local SEO with location-landing-pages for 12 Austin postcodes, GBP optimisation with weekly posts + 40+ repair-before/after photos, Next.js rebuild with click-to-call + same-day-booking widget, SMS review request via Shopify POS integration.",
        result: "Top-3 local pack on 'phone repair [postcode]' for 9 of 12 target postcodes by day 90. Reviews rose from 19 to 87. Walk-in repairs up 47%. Average ticket up 12%.",
      },
      {
        industry: "Salon chain (Dubai)",
        problem: "2-location salon chain in Dubai with Arabic + English customer base, GBP in English only, no Arabic reviews, ranking outside top 5 on 'salon dubai [area]' searches.",
        application: "Local solution: bilingual GBP (Arabic + English) with weekly posts in both languages, Arabic + English location pages on the Next.js site, automated WhatsApp (not SMS — Dubai preference) review request via Fresha integration.",
        result: "Top-3 local pack on 'salon [area]' for 7 of 10 target areas by day 90. Reviews rose from 34 to 142 (41% in Arabic). Bookings up 63% via WhatsApp + online booking.",
      },
      {
        industry: "Professional services firm (solicitors)",
        problem: "4-partner law firm in Manchester with 6 Google reviews, a 9-year-old website, ranking outside top 20 on 'solicitor manchester' searches.",
        application: "Local solution: local SEO audit + NAP cleanup, GBP optimisation with weekly thought-leadership posts, Next.js rebuild with 4 service-area pages (family, employment, property, litigation) + click-to-call + Calendly booking, automated email review request via HubSpot CRM integration.",
        result: "Top-3 local pack on 'solicitor manchester' for 6 of 10 target keywords by day 90. Reviews rose from 6 to 41. Consultation bookings up 78%. New client matters up 31%.",
      },
      {
        industry: "Restaurant group (3 locations)",
        problem: "3-location restaurant group in Multan with Google reviews inconsistent across locations (4.1, 3.2, 4.6), no GBP posts, no online ordering, ranking outside top 5 on 'restaurant [area]' searches.",
        application: "Local solution: GBP optimisation per location with menu upload + weekly post + photo refresh, Next.js rebuild with online ordering (via SQAQR or Clover), automated SMS review request 4 hours post-meal (optimal window for restaurants) via Clover POS integration.",
        result: "Top-3 local pack on 'restaurant [area]' for 8 of 12 target areas by day 90. Reviews balanced across locations (4.4, 4.2, 4.6). Online orders up 92%. Repeat-customer rate up 23%.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Local Business Solution vs. Alternatives",
    intro: [
      "Three approaches dominate the local-business market: the generic SEO retainer (£300–800/month, vague targets), the DIY template site (Wix/Squarespace, no local SEO), and the bundled local solution. We have shipped all three — the right choice depends on the business's growth ambition.",
    ],
    tables: [
      {
        title: "Local Business Solution vs. SEO Retainer vs. Template Site",
        headers: ["Dimension", "Generic SEO retainer", "Template site (Wix/Squarespace)", "ClickTake Local Solution"],
        rows: [
          ["Local-pack rank target", "no:Vague", "no:Not in scope", "yes:Top 3 in 90 days"],
          ["GBP optimisation", "partial:Ad-hoc", "no", "yes:Full audit + weekly posts"],
          ["NAP cleanup across 30+ dirs", "no:Manual one-off", "no", "yes:Via BrightLocal/Whitespark"],
          ["Mobile site LCP", "no:Not in scope", "no:3–7s on shared hosting", "yes:<1.5s on edge"],
          ["Review-request workflow", "no", "no", "yes:Automated SMS+email post-appointment"],
          ["Click-to-call + booking", "no", "partial:Add-on", "yes:Native, mobile-first"],
          ["Total cost (90 days)", "£900–2,400 (3 months retainer)", "£60–120 + DIY time", "£1,500–4,000 one-off"],
          ["Time to top-3 local pack", "no:6–18 months if ever", "no:Unlikely", "yes:90 days on 50%+ of keywords"],
        ],
      },
      {
        title: "What each approach optimises for",
        headers: ["Business situation", "Best-fit approach", "Why"],
        rows: [
          ["Established business, decent rankings, wants maintenance", "SEO retainer", "Rankings are okay; just need monitoring + minor tweaks"],
          ["New business, tight budget, DIY-capable owner", "Template site", "Cash is the binding constraint; owner time is available"],
          ["Established business, rankings poor, needs structural fix", "ClickTake Local Solution", "Structural 90-day fix + fast mobile site + review workflow"],
          ["Multi-location business, scaling", "ClickTake Local Solution (multi-location scope)", "Per-location GBP + location pages + multi-location review workflow"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Calls, Walk-ins & Revenue",
    intro: [
      "The local business solution earns its budget back through three mechanisms: more inbound calls (top-3 local-pack ranking drives 4–8× the calls of position 4–10), more walk-ins (mobile-first site with click-to-directions converts traffic to visits), and more reviews (automated workflow lifts review velocity 5–10× in 90 days). The numbers below are aggregated across 80+ local-business engagements shipped 2023–2026.",
    ],
    metrics: [
      { value: "Top 3", label: "Local-pack target on 50%+ of keywords", description: "Median hit rate at day 90 across 80+ engagements — drives 4–8× the calls of position 4–10." },
      { value: "+40%", label: "Inbound calls (typical)", description: "Median lift across 80+ engagements, measured via call-tracking numbers." },
      { value: "+15–30", label: "New Google reviews / month", description: "Within 60 days of the review workflow going live — pushes review velocity from 1/month to 6–8/month." },
      { value: "<1.5s", label: "Mobile LCP target", description: "Sub-1.5s LCP on 4G — converts 2–3× better than the typical 4–7s WordPress local-business site." },
    ],
    body: [
      "Inbound calls are the most measurable impact. A business ranking position 4–10 in the local pack receives ~5% of local-intent clicks; the same business ranking top-3 receives ~44%. For a typical 'dentist birmingham' search with 1,200 monthly searches, that is the difference between 60 and 528 clicks — and at a 12% call conversion rate, the difference between 7 and 63 inbound calls per month. The local-pack lift alone pays for the engagement in 1–3 months for most service businesses.",
      "Walk-ins and bookings compound the call impact. A mobile site with click-to-call, click-to-directions and embedded booking converts 2–3× better than the typical 4–7s WordPress local-business site. A dental clinic we shipped saw new-patient bookings rise 38% in 90 days — purely from the combination of faster site + better GBP + more reviews. The booking widget captured £28K of new patient revenue in month one alone.",
      "Reviews compound over time. The review workflow lifts review velocity from 1/month to 6–8/month within 60 days, which lifts local-pack rank, which lifts calls, which lifts review requests, which lifts review velocity further. This is the positive feedback loop that makes a one-time 90-day engagement produce compounding returns for 12–24 months post-launch — assuming the business keeps the review workflow running.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The local business solution integrates with the systems the business already runs — POS, PMS, CRM, booking. The lists below cover the integrations we ship most often.",
    ],
    categories: [
      {
        name: "PMS (clinics, salons, spas)",
        items: ["Cliniko", "Pabau", "Jane", "Fresha", "Phorest", "Vagaro", "Booker", "Mindbody"],
      },
      {
        name: "POS (restaurants, retail)",
        items: ["Square", "Toast", "Lightspeed", "Clover", "Shopify POS", "Talech", "Epos Now"],
      },
      {
        name: "CRM & Booking",
        items: ["HubSpot (Free/Starter)", "Pipedrive", "Calendly", "Cal.com", "Acuity Scheduling", "SimplyBook.me", "Setmore"],
      },
      {
        name: "Reviews & Local SEO",
        items: ["Google Business Profile API", "BrightLocal", "Whitespark", "ReviewTrackers", "BirdEye", "Podium", "Grade.us"],
      },
    ],
    compliance: ["GDPR (UK/EU)", "UK Data Protection Act 2018", "PECR (cookie consent + SMS opt-in)", "CASL (Canada, for Canadian customers)", "TCPA (US SMS compliance, opt-in + opt-out)", "PCI DSS (scoped via Stripe / Square / Clover)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Local Business Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "3-location dental clinic group, Birmingham UK",
        situation: "Established 12-year dental group with 3 Birmingham locations, 8 Google reviews total across all locations (4.1, 3.4, 0.7 star averages), a 6-year-old WordPress site loading in 5.4s on mobile, and ranking outside the top 10 on 'dentist birmingham' searches. New patient enquiries had fallen 34% year-on-year. Competitor clinics with fewer chairs and shorter histories were dominating the local pack.",
        task: "Lift all 3 locations into the top-3 local pack on 'dentist [postcode]' searches within 90 days, ship a fast mobile-first site with online booking, and lift review count from 8 to 50+ across the group.",
        action: "ClickTake ran the 5-phase methodology: 2-week audit (7-factor audit + 10×10 geo-grid baseline + competitor analysis + NAP report across 38 directories), 3-week NAP cleanup + citation building (38 directories cleaned, 22 new local citations built per location, GBP claimed/verified per location with 30+ photos each), 4-week Next.js rebuild (3 location pages + 6 service pages + click-to-call + Calendly booking + LocalBusiness schema), 3-week review workflow (Cliniko integration triggering SMS + email review request 24 hours post-appointment, dual-routing happy/unhappy), 5-week launch + weekly geo-grid tracking.",
        result: "Top-3 local pack on 'dentist [postcode]' for 8 of 12 target keywords by day 90 (was 0 of 12 at baseline). Reviews rose from 8 to 74 across the group (4.4, 4.2, 4.5 averages). Inbound calls up 52% (measured via call-tracking numbers). New patient bookings up 38%. The clinic estimated £42K of incremental revenue in month 3 alone — paying for the engagement 8× over in the first quarter.",
        quote: {
          text: "We had given up on Google. We were paying £500/month to an SEO who sent us a report every month saying we were 'making progress'. ClickTake shipped more in 90 days than the SEO did in 3 years.",
          author: "Practice Owner",
          title: "3-location dental clinic group, Birmingham",
        },
      },
      {
        client: "Single-location phone repair shop, Austin TX",
        situation: "5-year-old phone repair shop in central Austin with 19 Google reviews (4.2 average), ranking #7 on 'phone repair austin' searches, no GBP posts in 18 months, 4.8s mobile site loading time. Walk-in repairs had plateaued despite the Austin market growing.",
        task: "Lift to top-3 local pack on 'phone repair [austin area]' searches across 12 Austin postcodes, ship a faster site with same-day-booking widget, and double review count in 90 days.",
        action: "ClickTake ran the 5-phase methodology: 2-week audit (SAB-specific audit, 10×10 geo-grid baseline across central Austin, competitor analysis of top 5 repair shops, NAP report), 3-week NAP cleanup + SAB citation building (32 directories cleaned, 18 new Austin-specific citations built, GBP optimised as SAB with hidden address + service-area polygon), 4-week Next.js rebuild (12 location-landing-pages for Austin postcodes + click-to-call + same-day-booking widget + 40 repair before/after photos in GBP), 3-week review workflow (Shopify POS integration triggering SMS review request 4 hours post-pickup), 5-week launch + weekly geo-grid tracking.",
        result: "Top-3 local pack on 'phone repair [postcode]' for 9 of 12 target postcodes by day 90 (was 0 of 12 at baseline). Reviews rose from 19 to 87 (4.6 average). Walk-in repairs up 47%. Average ticket up 12% (cross-sell of accessories + warranties on the rebuilt site). Estimated $58K incremental revenue in the first 90 days post-launch.",
        quote: {
          text: "The booking widget alone paid for the project. People book their repair online, show up at the booked time, and we're not dealing with the chaos of walk-ins only. Reviews went from a trickle to a flood.",
          author: "Owner",
          title: "Phone repair shop, Austin TX",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a free 20-minute local SEO audit call.",
    ],
    categories: [
      {
        name: "Pricing & Timeline",
        questions: [
          {
            q: "How much does the local business solution cost?",
            a: "Fixed scope, fixed timeline, fixed price. Build cost ranges from £1,500 (single-location, basic site, no PMS/POS integration) to £4,000 (multi-location, custom booking flow, PMS/POS integration, bilingual). The dominant cost drivers are location count (1 vs 3+), integration depth (CSV upload vs PMS/POS), and bilingual scope (English only vs English + Arabic/Urdu/Spanish). We provide a fixed quote after a 20-minute audit call.",
          },
          {
            q: "How long until we hit top-3 local pack?",
            a: "Target: 50%+ of your keyword set in top-3 by day 90. Median across 80+ engagements: 60% of keywords in top-3 by day 90. The fastest engagements hit top-3 on 70%+ of keywords by day 60; the slowest (highly competitive niches like 'dentist london') hit top-3 on 30% by day 90 and continue climbing through month 4–6. We track weekly via BrightLocal geo-grid.",
          },
          {
            q: "What ongoing maintenance is required?",
            a: "Two options: (1) Self-managed with our playbook — £0/month, you spend ~1 hour/week on GBP posts and review responses; (2) ClickTake managed — £100–300/month covering weekly GBP posts, review responses within 24h, monthly geo-grid report, and quarterly SEO refresh. Most clients start self-managed and switch to managed after 3–6 months as they realise the time commitment.",
          },
          {
            q: "Do you offer a free local SEO audit?",
            a: "Yes — a 20-minute audit call where we run a live 7-factor audit on your business and 2 competitors, show you the geo-grid baseline, and tell you honestly whether the bundled solution is the right fit. We do not charge for this and we do not use it as a sales-pitch-in-disguise — if your rankings are already good, we'll tell you.",
          },
        ],
      },
      {
        name: "Scope & Customisation",
        questions: [
          {
            q: "What if I have multiple locations?",
            a: "We scope per location. Single-location engagements target one geography; multi-location engagements target each location's geography with per-location GBP, per-location landing pages, and per-location review workflow. Cost scales roughly linearly: 3 locations ≈ 2.2× single-location cost, 5 locations ≈ 3.3×.",
          },
          {
            q: "I'm a service-area business — can you still help?",
            a: "Yes — SABs (plumbers, electricians, mobile groomers, etc.) are a specific specialty. SAB local SEO requires a location-landing-page strategy (typically 8–15 pages targeting your service-area postcodes), GBP configured with hidden address + service-area polygon, and citation building on SAB-friendly directories. We've shipped 30+ SAB engagements.",
          },
          {
            q: "Can you handle bilingual markets (Arabic in Dubai, Urdu in Multan)?",
            a: "Yes. Bilingual scope adds £500–1,500 to the engagement depending on the second language and translation volume. We ship a bilingual GBP (Arabic + English, Urdu + English, Spanish + English), bilingual location pages on the site, and bilingual review-request SMS. About 30% of our local engagements are bilingual.",
          },
          {
            q: "I already have a website I like — can I keep it?",
            a: "Sometimes. If your site is fast (sub-2.5s LCP on mobile), accessible (WCAG 2.2 AA), and on a stack we can edit (Next.js, Astro, or a customisable WordPress), we can keep it and ship the local SEO + GBP + review workflow on top. If your site is on Wix/Squarespace with locked-down schema and slow hosting, we recommend the rebuild — the local-pack lift pays for it in 1–3 months.",
          },
        ],
      },
      {
        name: "Reviews & Compliance",
        questions: [
          {
            q: "Is the review-request workflow GDPR/PECR compliant?",
            a: "Yes. We obtain explicit opt-in consent for SMS review requests at the point of booking or appointment (not pre-ticked boxes). We include opt-out language in every SMS ('Reply STOP to unsubscribe'). We process review-request data on EU/UK-hosted infrastructure (Twilio EU, SendGrid EU). We provide a DSAR workflow template for the business to handle data-subject requests.",
          },
          {
            q: "Will Google penalise me for asking customers for reviews?",
            a: "No — Google explicitly allows businesses to ask customers for reviews. What Google penalises is review gating (filtering happy customers to Google and unhappy to a private form) IF done via in-person or email prompting. Our workflow routes via a neutral initial question ('How was your experience?') and uses the response to route — which is compliant under Google's November 2023 review policy update.",
          },
          {
            q: "What if I get a negative review?",
            a: "Two layers: (1) Our review workflow routes unhappy customers (1–3 star intent) to an internal feedback form before they reach Google — capturing 60–80% of negatives privately; (2) For negatives that do reach Google, we provide AI-suggested response templates you approve, response SLA of 24 hours, and a guide on when to ask Google to remove a review (policy violations only — not just 'I disagree').",
          },
          {
            q: "Can the review workflow integrate with my existing POS/PMS/CRM?",
            a: "Yes — we've integrated with Cliniko, Pabau, Jane, Fresha, Phorest (clinics/salons); Square, Toast, Lightspeed, Clover, Shopify POS (restaurants/retail); HubSpot, Pipedrive (professional services); and CSV upload for businesses without a system. If your system isn't listed, we've likely integrated with it before — ask.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most local-business engagements are staffed from the UK and Pakistan hubs, with the UK office owning the client relationship and the Pakistan office owning execution. Calls happen in your timezone.",
          },
          {
            q: "Can you invoice in GBP, USD, AED or PKR?",
            a: "Yes to all four. ClickTake Technologies LTD (UK) invoices in GBP with UK VAT. ClickTake Technologies FZE-IC (UAE) invoices in AED. ClickTake Technologies LLC (US, Austin TX) invoices in USD. ClickTake Technologies (Pakistan, Multan) invoices in PKR or USD.",
          },
          {
            q: "Do you sign NDAs and handle my customer data?",
            a: "Yes to NDAs before kickoff. For customer data: the review workflow processes your customer names + phone numbers + appointment times on EU/UK-hosted infrastructure under a Data Processing Agreement (DPA). We do not store payment data — that stays in your POS/PMS. We retain review-request logs for 90 days for audit purposes, then purge.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Win Your Local Pack?",
    subtitle:
      "Book a free 20-minute local SEO audit. We'll run a live 7-factor audit on your business and 2 competitors, show you the geo-grid baseline, and tell you honestly whether the bundled solution is the right fit — or whether your rankings are already good enough that a cheaper retainer would serve you better.",
    steps: [
      {
        step: "1",
        title: "Book a 20-min audit call",
        description: "Free. We run a live 7-factor audit on your business + 2 competitors and show you the geo-grid baseline.",
      },
      {
        step: "2",
        title: "Receive fixed quote + 90-day timeline",
        description: "Within 48 hours: fixed price, fixed scope, fixed timeline, target keyword set, geo-grid baseline. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff within 2 weeks",
        description: "Sign the contract, pay the deposit (30%), and we kickoff Phase 1 within 2 weeks. Top-3 local pack target by day 90.",
      },
    ],
    primaryCta: { label: "Get Free Local SEO Audit", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Local Pack Playbook", href: "/resources", variant: "outline" },
  },
}
