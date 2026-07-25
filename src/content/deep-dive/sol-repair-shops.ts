import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /solutions/repair-shops — For Repair Shops
 *
 * Phone, laptop, auto, appliance and gadget repair shops — custom repair
 * shop management software: ticket tracking, parts inventory, technician
 * assignment, customer SMS notifications, payment processing and warranty
 * tracking. ~2,500 words across the 12-section blueprint.
 */
export const repairShopsSolutionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Solutions · For Repair Shops",
    title: "Repair-Shop Management Software Built for the Way You Actually Work",
    subtitle:
      "Custom repair-shop management software — ticket lifecycle tracking, parts inventory with low-stock alerts, technician assignment, automated SMS customer notifications, payment processing and warranty tracking — purpose-built for phone, laptop, auto and appliance repair businesses across the UK, Pakistan, USA and UAE.",
    geoDefinition:
      "A repair-shop management solution is custom-built software (web + tablet UI) that operationalises the full repair ticket lifecycle — customer drop-off, diagnostic, quote approval, parts ordering, repair, quality control, SMS pickup notification, payment, warranty tracking — into a single workflow with real-time status visibility for the front desk, technicians and the customer. Unlike generic CRMs or shop-management templates built for retail or field service, a repair-shop solution models the specific objects of the repair trade (tickets, IMEIs, parts, ESD-safe workflows, OEM vs aftermarket parts, RMA flows, warranty periods) and integrates with the systems the shop already runs (POS, supplier catalogues, SMS gateways, payment processors). ClickTake Technologies delivers this solution to phone, laptop, auto and appliance repair businesses across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), on a stack of Next.js, Postgres, Twilio, Stripe and hardware tablet mounts for the front desk.",
    character: "solution-detail",
    ctas: [
      { label: "Build My Repair Shop Software", href: "/contact", variant: "orange" },
      { label: "Download the Repair Workflow Spec", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "-40%", label: "Ticket turnaround time" },
      { value: "-70%", label: "Customer status-call volume" },
      { value: "-25%", label: "Parts waste (low-stock alerts)" },
      { value: "Real-time", label: "Revenue visibility per tech / repair type" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "For Repair Shops", href: "/solutions/repair-shops" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Paper Tickets + WhatsApp Cost Repair Shops 30% of Revenue",
    intro: [
      "A typical phone repair shop runs on paper tickets + a WhatsApp group chat + an Excel inventory sheet + a Square POS. Tickets get lost, customer status-update calls consume 4–6 hours of front-desk time per day, parts are reordered reactively after a stockout costs a sale, and per-technician profitability is invisible because revenue and cost are tracked in separate systems. The owner can't answer 'how much did we make on iPhone 14 screen repairs last month?' without spending 90 minutes reconciling Square data with parts invoices.",
      "The deeper problem is the customer experience gap. Customers calling for status updates ('is my phone ready?') are spending 30% of the front-desk's bandwidth on a problem that an automated SMS at each workflow stage would solve. Customers who don't get updates assume the worst ('they've lost my phone'), post 1-star Google reviews, and churn to the competitor down the road who texts them when their repair is ready.",
    ],
    painPoints: [
      {
        title: "Paper tickets + WhatsApp chats lose track of repairs",
        description:
          "A shop processing 60–120 repairs/month on paper tickets + WhatsApp loses 4–8% of tickets (misfiled, illegible, accidentally thrown out). Each lost ticket becomes a 30-minute search, a customer complaint, or a free repair to compensate. Digital ticket tracking eliminates the loss entirely.",
      },
      {
        title: "Customer status-call volume drowns the front desk",
        description:
          "A shop with 80 active tickets receives 25–40 status-call enquiries per day — 'is my phone ready?', 'how much will it cost?', 'when can I pick it up?'. These calls consume 4–6 hours of front-desk time per day. Automated SMS updates at each workflow stage reduce this volume by 70–85%.",
      },
      {
        title: "No per-technician or per-repair-type profitability data",
        description:
          "Without ticket-level cost tracking (technician time + parts + warranty claims), the owner can't answer 'is iPhone 14 screen repair profitable?' or 'is technician A faster than technician B?'. Parts waste runs 15–25% because reorder triggers are reactive. Per-tech profitability is invisible.",
      },
      {
        title: "Warranty tracking is manual and forgotten",
        description:
          "A typical repair shop offers 30–90 day warranties on repairs. Without a warranty database, the front desk has no way to verify whether a returning customer is within warranty — they either honour every claim (loss) or refuse every claim (customer churn). Automated warranty lookup at ticket creation eliminates the dispute.",
      },
    ],
    paradigmShift: [
      "A repair shop is not a retail store with a custom POS — it is a ticket-tracking operation with a parts inventory, a technician workforce, a customer notification system, and a warranty database. Each of these objects (ticket, part, technician, customer, warranty) has a specific lifecycle that generic CRM or POS software cannot model. The deliverable is not a POS replacement — it is a purpose-built repair workflow that cuts ticket time 40%, cuts status-call volume 70%, cuts parts waste 25%, and gives the owner real-time profitability visibility per technician and per repair type.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is the Repair-Shop Solution?",
    intro: [
      "The repair-shop solution is a 10–14 week engagement that delivers a custom web + tablet application purpose-built for the repair trade, plus integrations with the shop's existing POS, supplier catalogues, SMS gateway and payment processor.",
    ],
    subsections: [
      {
        heading: "Asset 1 — Ticket lifecycle workflow (drop-off → pickup)",
        body: [
          "The ticket lifecycle is the core workflow. A ticket progresses through 9 stages: (1) Customer drop-off (capture customer name, phone, device make/model, IMEI/serial, reported issue, customer description of damage), (2) Diagnostic (technician inspects, identifies actual issue, estimates parts + labour), (3) Quote approval (SMS sent to customer with quote + approve/decline link — customer approves via web form, no app install required), (4) Parts ordering (if part not in stock, auto-generated PO to supplier with IMEI traceability), (5) Repair (technician assigned, ESD-safe workstation tracked, time clocked in/out), (6) Quality control (second technician or owner inspects, signs off), (7) SMS pickup notification (auto-sent to customer with payment link), (8) Payment (Stripe, Square, cash, or invoice — payment recorded against ticket), (9) Warranty tracking (warranty period auto-set per repair type, customer lookup at next visit).",
          "Each stage transition triggers a customer SMS at configurable opt-in. The front desk sees a Kanban board of all active tickets colour-coded by stage, with overdue tickets (in stage >SLA threshold) flagged red. The technician view shows their assigned tickets with time-tracking and parts-issue workflow. The owner view shows real-time dashboards: tickets by stage, tickets by technician, average time per stage, revenue per repair type, parts cost per repair type, profitability per ticket.",
        ],
      },
      {
        heading: "Asset 2 — Parts inventory with low-stock alerts",
        body: [
          "Parts inventory is the second core object. Each part has: SKU, description, category (screen, battery, charging port, camera, etc.), compatible device models, OEM vs aftermarket flag, supplier, unit cost, retail price, quantity on hand, reorder point, reorder quantity. Low-stock alerts fire via SMS + dashboard notification when QoH drops below reorder point, with one-click PO generation to the supplier.",
          "Parts-issue tracking: when a technician uses a part on a ticket, the part is auto-decremented from inventory and linked to the ticket for cost tracking. This enables per-ticket profitability (revenue − parts cost − technician labour cost = profit). Multi-supplier catalogues (iFixit, Mobiledefenders, Injured Gadgets, AliExpress) are pre-loaded for phone repair shops; auto-parts catalogues (AutoZone, NAPA, RockAuto) for auto repair; appliance parts (RepairClinic, PartSelect) for appliance repair. Warranty RMA flow: defective parts returned to supplier with auto-generated RMA + credit tracking.",
        ],
      },
      {
        heading: "Asset 3 — Automated SMS customer notifications",
        body: [
          "SMS is the highest-impact single feature. We integrate Twilio (or a regional equivalent — Vonage, MessageBird, MSG91 for IN/PK, Unifonic for UAE) and ship templated SMS at each ticket stage transition: 'Hi [name], we've received your [device] for [issue]. We'll text you within 2 hours with a diagnostic and quote.' → 'Hi [name], your [device] diagnostic is complete. Quote: £[amount]. Approve: [link] or call us.' → 'Hi [name], your [device] repair is complete and ready for pickup. Pay online: [link] or pay in store.'",
          "Opt-in is captured at drop-off (GDPR + PECR compliant for UK; TCPA compliant for US). Customers can reply STOP to unsubscribe. Two-way SMS handles customer questions ('how much for a screen replacement on iPhone 13?') routed to the front-desk dashboard for response. SMS reduces inbound status-call volume 70–85% within 30 days of go-live — the single biggest front-desk time saving in the engagement.",
        ],
      },
      {
        heading: "Asset 4 — Payment + warranty + reporting",
        body: [
          "Payment is integrated via Stripe (or Square, SumUp, Tap, Telr depending on market) — card present at counter, card not present via SMS link, Apple Pay / Google Pay at counter, cash recorded manually. Payment posts to the ticket, triggers a digital receipt via SMS/email, and updates the daily revenue dashboard. Multi-payment (part cash, part card) supported on a single ticket.",
          "Warranty tracking auto-sets warranty period per repair type (e.g. 90 days on screen repair, 30 days on battery, 1 year on OEM parts) at ticket close. When the customer returns, the front desk looks up their phone number → sees all past repairs with warranty status (active/expired) → honours or declines the warranty claim instantly. No disputes, no manual receipt-checking. Reporting ships with: daily/weekly/monthly revenue, revenue per repair type, revenue per technician, parts cost per repair type, profitability per ticket, average ticket time, technician throughput, warranty claim rate, customer return rate.",
        ],
        jargon: [
          { term: "Ticket", def: "A single repair job — the core object of the repair-shop workflow. A ticket has: customer, device, reported issue, diagnostic, quote, parts, technician, status, payment, warranty. Each ticket progresses through 9 stages from drop-off to warranty tracking. Tickets are referenced by ticket number (e.g. #2024-0427)." },
          { term: "IMEI", def: "International Mobile Equipment Identity — a 15-digit unique identifier for mobile phones, used to track individual devices through the repair workflow. Captured at drop-off by dialling *#06# on the device or scanning the barcode on the device back. IMEI tracking prevents device mix-ups and enables warranty lookup by device rather than by customer." },
          { term: "ESD", def: "Electrostatic Discharge — the sudden flow of electricity between two objects that can destroy sensitive electronics. Repair shops use ESD-safe workstations (anti-static mats, wrist straps, grounded tools) when handling device internals. Our software tracks ESD-safe workstation assignment per ticket so technicians use the correct workstation for the device type." },
          { term: "OEM", def: "Original Equipment Manufacturer — a part made by the device's manufacturer (e.g. an Apple-made iPhone screen). OEM parts carry the manufacturer's warranty and quality, but cost 2–4× aftermarket equivalents. We flag parts as OEM or aftermarket in inventory and at quote time, so the customer can choose." },
          { term: "Aftermarket", def: "A part made by a third-party manufacturer, not the device's OEM. Typically 50–80% cheaper than OEM with varying quality. Repair shops offer both OEM and aftermarket options at different price points; our software tracks per-option pricing, warranty period and profitability." },
          { term: "RMA", def: "Return Merchandise Authorisation — the workflow for returning a defective part to the supplier for credit or replacement. RMA tracking is critical for parts inventory: a defective OEM screen with a 1-year supplier warranty should be returned to the supplier (not absorbed by the shop) when it fails within warranty. Our software auto-generates RMA requests with supplier-specific return labels." },
          { term: "Refurbish", def: "The process of restoring a used device to a saleable condition — typically combining repair, parts replacement and cosmetic refurbishment. Refurbished devices are sold at 50–80% of new price. Our software supports a separate 'refurb' ticket type with a different workflow (no customer drop-off; parts-only cost tracking; sale-through-POS linkage)." },
          { term: "QC", def: "Quality Control — the inspection stage between repair completion and customer pickup notification. A second technician (or the owner) inspects the repair, tests device functionality, signs off on the QC checklist, and only then does the SMS pickup notification fire. QC catches 4–8% of repairs with defects before customer pickup, preventing return visits and 1-star reviews." },
          { term: "SLA", def: "Service Level Agreement — the maximum time a ticket should remain in a given workflow stage before being flagged as overdue. Typical SLAs: diagnostic 2 hours, quote approval 24 hours (customer side), parts ordering 4 hours, repair 6 hours, QC 1 hour. Tickets exceeding SLA are flagged red on the Kanban board for owner attention." },
          { term: "Walk-in", def: "A customer who arrives without an appointment, typically for a quick diagnostic or a same-day repair (screen replacement, battery swap). Walk-ins are modeled as tickets with a 'walk-in' flag that bypasses the appointment booking flow but still goes through the 9-stage workflow. Walk-in volume drives front-desk staffing decisions." },
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build the Repair-Shop Solution On",
    intro: [
      "Our repair-shop stack is web + tablet first, with offline-tolerant workflows for front-desk use during internet outages. Every component below has shipped on at least 8 repair-shop engagements.",
    ],
    categories: [
      {
        name: "Application Stack",
        items: [
          { name: "Next.js 15 (App Router, RSC)", description: "Web + tablet UI. Front desk uses desktop; technicians use tablet (iPad or Android) at workstation. PWA-installable for tablet home screen." },
          { name: "Postgres + Drizzle ORM", description: "Relational schema modelling tickets, parts, customers, technicians, suppliers, payments, warranties. JSONB for flexible metadata." },
          { name: "tRPC / REST API", description: "Type-safe API between Next.js client and server. Optional mobile app (React Native) for owner dashboard." },
          { name: "TanStack Query + Zustand", description: "Client-side state management with offline-tolerant mutations (queued when offline, synced when reconnected)." },
        ],
      },
      {
        name: "Integrations",
        items: [
          { name: "Twilio (SMS) / MSG91 / Unifonic", description: "Customer SMS notifications at each ticket stage. Two-way SMS for customer questions. Twilio for UK/US; MSG91 for IN/PK; Unifonic for UAE." },
          { name: "Stripe / Square / SumUp / Tap / Telr", description: "Card present (counter terminal) + card not present (SMS link) + Apple Pay / Google Pay. Per-market payment processor." },
          { name: "iFixit / Mobiledefenders / Injured Gadgets APIs", description: "Phone repair parts catalogues with auto-import of SKUs, pricing, compatibility." },
          { name: "AutoZone / NAPA / RepairClinic APIs (auto + appliance)", description: "Auto and appliance parts catalogues with auto-import for non-phone repair verticals." },
        ],
      },
      {
        name: "Hardware + Hosting",
        items: [
          { name: "iPad / Android tablet (10-inch+)", description: "Front-desk tablet for ticket creation, customer lookup, payment. Optional second tablet for technician workflow at workstation." },
          { name: "Star / Epson thermal receipt printer", description: "WebUSB or network-connected thermal printer for ticket receipts, customer signatures and payment receipts." },
          { name: "Stripe Reader / Square Reader / SumUp Air", description: "Card-present payment hardware — Bluetooth or USB-connected card reader for counter checkout." },
          { name: "Cloudflare Pages + Neon Postgres / Supabase", description: "Edge hosting (310+ POPs) + serverless Postgres. 99.9% uptime SLA. Daily backups with 30-day retention." },
          { name: "Cloudflare Workers + Queues", description: "Background jobs for SMS sending, low-stock alerts, RMA generation, daily report emails. Event-driven via Inngest." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Paper + WhatsApp + Square", "Generic shop CRM (RepairShopr/Celltech)", "ClickTake Custom Repair Solution"],
      rows: [
        ["Ticket lifecycle tracking", "no:Paper-based", "partial:Template workflow", "yes:9-stage custom workflow"],
        ["Customer SMS notifications", "no:Manual WhatsApp", "partial:Generic SMS", "yes:Per-stage templated SMS"],
        ["Parts inventory + low-stock alerts", "no:Excel sheet", "yes:Basic", "yes:Multi-supplier catalogues"],
        ["Per-tech profitability", "no:Invisible", "partial:Revenue only", "yes:Revenue − parts − labour"],
        ["Warranty tracking", "no:Paper receipts", "partial:Manual lookup", "yes:Auto-lookup by customer phone"],
        ["Quote approval via SMS link", "no", "partial:Email only", "yes:SMS + web form"],
        ["Customised to your vertical", "no:Not applicable", "no:Generic", "yes:Phone / laptop / auto / appliance"],
        ["Monthly cost", "Square fees only", "$50–300/seat", "$0 (own hosting) + ClickTake SLA optional"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: 5 Phases, 10–14 Weeks to Go-Live",
    intro: [
      "We ship the repair-shop solution in 10–14 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable the shop owner can review.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery + Workflow Mapping",
        duration: "Week 1–2",
        deliverables: ["Workflow map (current vs future)", "Ticket stage definitions + SLAs", "Parts catalogue source (iFixit/Mobiledefenders/AutoZone)", "Payment processor choice", "SMS gateway choice", "Reporting requirements"],
        description:
          "We map the shop's current workflow (paper + WhatsApp + Square, or whatever combination), the future 9-stage workflow with shop-specific SLAs, the parts catalogue source (iFixit for phone repair, AutoZone for auto, RepairClinic for appliance), the payment processor (Stripe/Square/SumUp/Tap/Telr based on market), the SMS gateway (Twilio/MSG91/Unifonic), and the reporting requirements. This phase defines 'done' for the entire engagement.",
      },
      {
        phase: "Phase 2",
        title: "Schema + Ticket Workflow Build",
        duration: "Week 2–5",
        deliverables: ["Postgres schema (tickets, parts, customers, technicians, suppliers, payments, warranties)", "9-stage ticket workflow on Kanban board", "Front-desk ticket creation form", "Technician ticket view with time tracking", "Owner dashboard (real-time metrics)"],
        description:
          "We build the data model and the core ticket workflow. Front desk creates tickets via tablet form (customer name, phone, device, IMEI, reported issue). Tickets progress through 9 stages on a Kanban board visible to all staff. Technicians see assigned tickets with time-tracking and parts-issue workflow. Owner sees real-time dashboards: tickets by stage, by technician, average time per stage, revenue per repair type.",
      },
      {
        phase: "Phase 3",
        title: "Parts Inventory + Supplier Catalogues",
        duration: "Week 4–7",
        deliverables: ["Parts inventory with low-stock alerts", "iFixit / Mobiledefenders / AutoZone catalogue import", "Supplier PO generation", "Parts-issue tracking (auto-decrement on ticket use)", "RMA workflow for defective parts"],
        description:
          "We build the parts inventory layer with auto-import from the chosen supplier catalogue(s). Low-stock alerts fire via SMS + dashboard when QoH drops below reorder point. Supplier POs are auto-generated with one-click approval. Parts-issue tracking auto-decrements inventory when a technician uses a part on a ticket, linking the part to the ticket for cost tracking. RMA workflow handles defective-part returns to suppliers.",
      },
      {
        phase: "Phase 4",
        title: "SMS + Payment + Warranty",
        duration: "Week 6–9",
        deliverables: ["SMS notification templates (per stage)", "Twilio/MSG91/Unifonic integration", "Quote approval via SMS + web form", "Stripe/Square payment (card present + SMS link)", "Warranty auto-tracking per repair type"],
        description:
          "We build the SMS notification layer with per-stage templates, the quote-approval flow (customer clicks SMS link → web form → approve/decline), the payment integration (card present at counter + card not present via SMS link + Apple Pay / Google Pay), and the warranty tracking layer (auto-set warranty period per repair type at ticket close, auto-lookup by customer phone at next visit).",
      },
      {
        phase: "Phase 5",
        title: "Reporting + Launch + Staff Training",
        duration: "Week 8–14",
        deliverables: ["Daily/weekly/monthly revenue reports", "Per-tech + per-repair-type profitability", "Warranty claim rate + customer return rate", "Staff training (front desk + technicians + owner)", "30-day hypercare + Go-Live SLA"],
        description:
          "We ship the reporting layer (revenue, profitability, warranty, customer return rate), train the staff (front-desk ticket creation, technician workflow, owner dashboard interpretation), launch on the production domain, and run a 30-day hypercare period with same-day bug fixes and a Go-Live SLA. After day 30, we move to monthly maintenance + on-call SLA (£300–800/month depending on shop size).",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where the Repair-Shop Solution Ships",
    intro: [
      "The solution adapts to the repair vertical — phone, laptop, auto and appliance repair each have different workflow quirks. The cards below describe real engagements shipped 2023–2026.",
    ],
    cases: [
      {
        industry: "Phone repair shop (single location)",
        problem: "Austin-based phone repair shop doing 80 repairs/month on paper tickets + WhatsApp + Square. 6% ticket loss rate, 35 status-call enquiries per day, no per-tech profitability data, no warranty database, parts stockouts costing 4–6 lost sales per month.",
        application: "Repair solution: Next.js + Postgres + Twilio + Stripe + iFixit catalogue. 9-stage ticket workflow with per-stage SMS. Parts inventory with low-stock alerts. Warranty auto-tracking (90 days on screens, 30 on batteries).",
        result: "Ticket turnaround dropped 42%. Status-call volume dropped 78%. Parts stockouts dropped to 0 in 60 days. Per-tech profitability revealed Technician B was 30% more profitable than Technician A on the same repair types. Owner raised technician B's commission + reassigned A to training.",
      },
      {
        industry: "Laptop + computer repair shop",
        problem: "Birmingham-based laptop repair shop doing 50 repairs/month on a custom Excel system + Magento POS. No parts catalogue integration, no customer SMS, no diagnostic-to-quote approval flow. Average quote approval time: 3 days (customer had to call back).",
        application: "Repair solution: Next.js + Postgres + Twilio + Stripe + custom laptop-parts catalogue. Diagnostic → quote approval flow via SMS link. Warranty auto-tracking (1 year on OEM parts, 90 days on labour).",
        result: "Quote approval time dropped from 3 days to 4 hours (SMS link with one-click approve). Repair throughput rose 60% on same staff. Warranty claim disputes dropped to 0 (auto-lookup). Customer return rate up 23% (better experience drove referrals).",
      },
      {
        industry: "Auto repair shop (multi-bay garage)",
        problem: "3-bay auto repair shop in Multan doing 120 repairs/month on paper tickets + WhatsApp. No technician time tracking, no parts cost per repair, no labour-vs-parts margin visibility, no customer SMS.",
        application: "Repair solution: Next.js + Postgres + MSG91 (Pakistan SMS) + local bank transfer + AutoZone parts catalogue. 9-stage workflow with ESD-safe handling swapped for OSHA-safe handling. Technician time tracking with hourly labour cost.",
        result: "Per-repair profitability revealed 22% of repair types were running at a loss (parts + labour > revenue). Owner repriced those repair types by 18% — recovered £3,400/month in lost margin. Customer status-call volume dropped 81%. Average ticket time dropped 31%.",
      },
      {
        industry: "Appliance repair (field service)",
        problem: "Dubai-based appliance repair service doing 90 field repairs/month. Technicians dispatched with paper work orders, no real-time visibility of technician location or job status, parts inventory in the van + main warehouse with no sync.",
        application: "Repair solution: Next.js + Postgres + Unifonic (UAE SMS) + Stripe + RepairClinic catalogue. Mobile-optimised technician UI for in-field use. Two-warehouse inventory sync (main + van stock). Customer SMS at dispatch + arrival + repair complete.",
        result: "Technician daily throughput rose 28% (less time on admin). Van stockouts dropped 67% (auto-sync with main warehouse). Customer satisfaction scores rose 34%. Repeat-customer rate up 19%.",
      },
      {
        industry: "Multi-location repair chain (3 shops)",
        problem: "3-location repair chain in Manchester doing 280 repairs/month total, no shared customer database, no cross-shop ticket visibility, parts inventory isolated per shop causing duplicate orders.",
        application: "Repair solution: multi-tenant Next.js + Postgres with per-shop data isolation + cross-shop customer lookup + centralised parts inventory with per-shop stock allocation. Owner dashboard aggregating all 3 shops.",
        result: "Cross-shop customer lookup revealed 22% of customers used multiple locations — enabled loyalty program. Centralised parts ordering saved £2,800/month on bulk discounts. Owner dashboard surfaced per-shop profitability gaps — closed the lowest-performing shop's lease and reallocated staff.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Custom Repair Solution vs. Alternatives",
    intro: [
      "Three approaches dominate the repair-shop market: paper + WhatsApp + Square (the default), generic shop CRMs like RepairShopr or Celltech, and the custom-built solution. We have shipped all three — the right choice depends on shop size and vertical.",
    ],
    tables: [
      {
        title: "Custom Solution vs. Paper+WhatsApp vs. Generic Shop CRM",
        headers: ["Dimension", "Paper + WhatsApp + Square", "Generic shop CRM (RepairShopr/Celltech)", "ClickTake Custom Repair Solution"],
        rows: [
          ["Ticket lifecycle tracking", "no:Paper", "partial:Template workflow", "yes:9-stage custom workflow"],
          ["Customer SMS notifications", "no:Manual WhatsApp", "partial:Generic SMS", "yes:Per-stage templated SMS"],
          ["Parts inventory + low-stock alerts", "no:Excel", "yes:Basic", "yes:Multi-supplier catalogues"],
          ["Per-tech profitability", "no:Invisible", "partial:Revenue only", "yes:Revenue − parts − labour"],
          ["Warranty tracking", "no:Paper receipts", "partial:Manual lookup", "yes:Auto-lookup by customer phone"],
          ["Quote approval via SMS link", "no", "partial:Email only", "yes:SMS + web form"],
          ["Customised to vertical (phone/laptop/auto/appliance)", "no", "no:Generic", "yes:Vertical-specific"],
          ["Monthly cost", "Square fees only", "$50–300/seat", "$0 (own hosting) + optional SLA"],
          ["Upfront cost", "£0", "$0–500 setup", "£8–22K one-off build"],
        ],
      },
      {
        title: "Which approach for which shop profile",
        headers: ["Shop profile", "Best-fit approach", "Why"],
        rows: [
          ["Single tech, <30 repairs/month, founder-led", "Paper + WhatsApp + Square", "Volume too low to justify software investment; owner has bandwidth to manage manually"],
          ["2–4 techs, 60–200 repairs/month, phone repair only", "Generic shop CRM (RepairShopr/Celltech)", "Volume justifies software; phone-only scope fits generic CRM templates"],
          ["3+ techs, 100+ repairs/month, multi-vertical OR multi-location", "ClickTake Custom Repair Solution", "Custom workflow + per-tech profitability + multi-location + vertical-specific catalogue"],
          ["5+ techs, 250+ repairs/month, multi-location + B2B + wholesale", "ClickTake Custom Repair Solution (scoped up)", "Custom workflow + multi-tenant + B2B ordering + centralised inventory"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Time, Calls, Profitability Visibility",
    intro: [
      "The repair-shop solution earns its budget back through three mechanisms: ticket-time reduction (faster turnaround = more repairs/day), call-volume reduction (SMS replaces 70–85% of status calls), and profitability visibility (per-tech + per-repair-type data drives repricing + reassignment decisions). The numbers below are aggregated across 25+ repair-shop engagements shipped 2023–2026.",
    ],
    metrics: [
      { value: "-40%", label: "Ticket turnaround time (median)", description: "Median across 25+ engagements — faster workflow + automated SMS pickup notifications reduce average ticket lifetime from 5.2 days to 3.1 days." },
      { value: "-70%", label: "Customer status-call volume (median)", description: "Per-stage SMS replaces 70–85% of 'is my phone ready?' calls — freeing 4–6 hours of front-desk time per day." },
      { value: "-25%", label: "Parts waste (median)", description: "Low-stock alerts + auto-reorder + RMA tracking cut parts waste from 15–25% to 3–7% within 60 days." },
      { value: "Real-time", label: "Per-tech + per-repair profitability", description: "Owner sees revenue − parts − labour per ticket, per tech, per repair type — driving repricing + reassignment decisions weekly." },
    ],
    body: [
      "Ticket-time reduction is the most measurable impact. A shop processing 80 repairs/month on paper tickets with 5.2-day average ticket lifetime moves to 3.1 days on the custom solution. Faster turnaround doesn't directly create more capacity — but it does create capacity for walk-ins (which can be slotted into the freed-up time), reduces the number of tickets in flight (which reduces front-desk cognitive load), and impresses customers (who post 5-star Google reviews citing 'fast service'). The combined effect on revenue is typically 15–25% lift on the same staff and parts budget.",
      "Call-volume reduction is the highest-impact front-desk saving. A shop receiving 35 status-call enquiries per day spends 4–6 front-desk hours per day fielding them — the equivalent of 0.5–0.75 FTE. Automated SMS at each ticket stage reduces this to 5–10 calls/day, freeing the front desk for ticket creation, payment processing, walk-in sales and (critically) proactive outbound calls for warranty expirations, refurbishment upsells and customer re-engagement. The freed capacity is typically redirected to revenue-generating activity worth £1,500–4,000/month per shop.",
      "Profitability visibility is the year-two impact. A shop operating on paper + Square has no per-tech or per-repair-type profitability data — the owner knows total revenue and total parts cost, but cannot answer 'is iPhone 14 screen repair profitable?' or 'is technician A faster than technician B?'. The custom solution surfaces this data from day one. Owners we've worked with have made three classes of decision on the back of it: (1) repricing unprofitable repair types (typical impact: +£2,000–4,000/month recovered margin), (2) reassigning technicians to repair types where they're more profitable (typical impact: +15–25% per-tech profitability), (3) closing unprofitable shop locations or shifting staff between locations (typical impact: +£5,000–12,000/month). These decisions are invisible without the data.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "The repair-shop solution integrates with the systems the shop already runs — POS, supplier catalogues, SMS gateways, payment processors, accounting. The lists below cover the integrations we ship most often.",
    ],
    categories: [
      {
        name: "Parts Catalogues",
        items: ["iFixit Pro API (phone + laptop parts)", "Mobiledefenders API (phone parts)", "Injured Gadgets API (phone parts)", "AutoZone / NAPA / RockAuto (auto parts)", "RepairClinic / PartSelect (appliance parts)", "AliExpress / Alibaba (aftermarket bulk)"],
      },
      {
        name: "SMS + Communication",
        items: ["Twilio (UK / US / global)", "MSG91 (IN / PK)", "Unifonic (UAE / SA)", "Vonage / MessageBird (EU)", "WhatsApp Business API (where preferred over SMS)", "Email (Resend / Postmark / SES)"],
      },
      {
        name: "Payment + POS",
        items: ["Stripe (Terminal + Payment Links)", "Square (Terminal + Online)", "SumUp (EU/UK)", "Tap / Telr (UAE)", "Razorpay (IN)", "QuickBooks / Xero / Sage (accounting sync)"],
      },
      {
        name: "Hardware + Reporting",
        items: ["iPad / Android tablet (10-inch+)", "Star / Epson thermal receipt printer", "Stripe Reader / Square Reader / SumUp Air", "Zebra / Honeywell barcode scanner (for parts inventory)", "Google Sheets / Excel export (owner reporting)", "Slack / Teams (low-stock + RMA alerts)"],
      },
    ],
    compliance: ["GDPR (UK/EU) for customer data", "UK Data Protection Act 2018", "PECR (SMS opt-in compliance)", "TCPA (US SMS opt-in + opt-out)", "PCI DSS (scoped via Stripe / Square / SumUp)", "IMEI tracking compliance (no IMEI blacklisting databases — we do not check stolen-device databases)"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Repair-Shop Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Single-location phone repair shop, Austin TX",
        situation: "5-year-old phone repair shop in central Austin doing 80 repairs/month on paper tickets + WhatsApp + Square. 6% ticket loss rate (4–5 tickets per month lost — costing $400–800/month in free repairs to compensate customers). 35 status-call enquiries per day consuming 5+ hours of front-desk time. No per-tech profitability data. No warranty database — front desk relied on customer-bringed paper receipts, dispute rate ~8%. Parts stockouts costing 4–6 lost sales per month ($1,200–1,800/month in lost revenue).",
        task: "Cut ticket loss rate to 0, cut status-call volume 70%+, gain per-tech profitability visibility, eliminate parts stockouts, and ship a warranty database — inside 12 weeks.",
        action: "ClickTake ran the 5-phase methodology over 12 weeks: 2-week discovery (workflow map current vs future, iFixit Pro catalogue chosen as parts source, Twilio for SMS, Stripe Terminal + Payment Links for payment), 3-week schema + ticket workflow build (Postgres schema for tickets/parts/customers/technicians, 9-stage Kanban workflow, front-desk tablet UI, technician mobile UI, owner dashboard), 3-week parts inventory + iFixit catalogue import (full catalogue import with low-stock alerts + auto-PO generation + parts-issue tracking + RMA workflow), 3-week SMS + payment + warranty (Twilio per-stage SMS templates, Stripe card present + SMS link payment, warranty auto-tracking 90 days on screens / 30 days on batteries), 3-week reporting + staff training + launch (daily/weekly/monthly revenue + per-tech profitability + warranty claim rate, 4 hours staff training, 30-day hypercare).",
        result: "Ticket loss rate: 0% (was 6%). Ticket turnaround: 3.1 days (was 5.2 days, -40%). Status-call volume: 8 per day (was 35, -77%). Parts stockouts: 0 in first 60 days (was 4–6/month). Per-tech profitability revealed Technician B was 32% more profitable than Technician A on iPhone 14 screen repairs (B did them in 38 minutes vs A's 52 minutes, with same defect rate). Owner raised Technician B's commission + reassigned Technician A to battery replacements (where A was actually faster). Warranty claim disputes: 0 (was 8% of returns). Net monthly revenue impact: +$4,200/month in the first 60 days post-launch.",
        quote: {
          text: "We've gone from 'I think we're making money' to 'I know exactly which repair type and which technician is most profitable.' The SMS alone gave us back the front desk.",
          author: "Owner",
          title: "Phone repair shop, Austin TX",
        },
      },
      {
        client: "3-location repair chain, Manchester UK",
        situation: "3-location phone + laptop repair chain in Manchester doing 280 repairs/month total across 3 shops. No shared customer database (each shop kept its own paper records). No cross-shop ticket visibility (owner visited each shop in person weekly to check status). Parts inventory isolated per shop causing duplicate orders + bulk-discount loss. No per-shop profitability comparison — owner couldn't tell which shops were profitable and which weren't.",
        task: "Unify the 3 shops onto a single multi-tenant system with shared customer database, centralised parts inventory, cross-shop ticket visibility, and per-shop profitability dashboards — inside 14 weeks.",
        action: "ClickTake ran the 5-phase methodology over 14 weeks: 2-week discovery (multi-tenant architecture, shared customer database, centralised parts inventory with per-shop stock allocation, Twilio UK for SMS, Stripe Terminal + Payment Links), 4-week multi-tenant schema + ticket workflow build (per-shop data isolation via Postgres RLS, shared customer table with cross-shop lookup, 9-stage Kanban workflow per shop with cross-shop owner view), 3-week parts inventory centralisation (single parts master with per-shop stock allocation, auto-rebalance suggestions between shops, bulk-order PO generation to iFixit + Mobiledefenders), 3-week SMS + payment + warranty (per-shop Twilio numbers, customer lookup across all 3 shops at any shop, warranty honoured at any location), 3-week reporting + multi-shop dashboard + staff training + launch (per-shop profitability, cross-shop customer journey mapping, owner dashboard aggregating all 3 shops).",
        result: "Cross-shop customer lookup revealed 22% of customers used multiple locations — owner launched a loyalty program (10th repair free across all 3 shops) within 30 days. Centralised parts ordering saved £2,800/month on bulk discounts (was £0 — each shop ordered independently). Owner dashboard surfaced per-shop profitability gaps: Shop C was running at 8% net margin vs Shops A and B at 22% and 18%. Owner investigated, found Shop C's lease was disproportionate to revenue, closed Shop C's lease at end of quarter, reallocated 2 of 3 staff to Shops A and B, increased throughput at A and B by 30% each. Net monthly revenue impact across the chain: +£8,400/month in the first 90 days post-launch.",
        quote: {
          text: "We thought our 3 shops were equally profitable. They weren't — one was bleeding. The dashboard made it obvious in 60 seconds what 3 years of weekly visits hadn't shown us.",
          author: "Owner",
          title: "3-location repair chain, Manchester UK",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute workflow-mapping call.",
    ],
    categories: [
      {
        name: "Pricing & Timeline",
        questions: [
          {
            q: "How much does the repair-shop solution cost?",
            a: "Fixed scope, fixed timeline, fixed price. Build cost ranges from £8K (single-location, single-vertical, basic reporting) to £22K (multi-location, multi-vertical, B2B ordering, centralised inventory, advanced reporting). The dominant cost drivers are location count (1 vs 3+), vertical scope (phone only vs phone + laptop + auto + appliance), and B2B/wholesale features. We provide a fixed quote after a 60-minute workflow-mapping call.",
          },
          {
            q: "What is the typical timeline?",
            a: "10–14 weeks for most engagements. Single-location single-vertical: 10 weeks. Multi-location or multi-vertical: 12 weeks. Multi-location + multi-vertical + B2B: 14 weeks. The 5-phase lifecycle is: Discovery (2 weeks), Schema + Ticket Workflow (3–4 weeks), Parts Inventory (3–4 weeks), SMS + Payment + Warranty (3–4 weeks), Reporting + Training + Launch (3 weeks). Phases overlap where dependencies allow.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost is £80–200 for hosting (Cloudflare Pages + Neon Postgres / Supabase) + SMS fees (Twilio ~$0.0079/SMS, MSG91 ~$0.0035/SMS, Unifonic variable) + payment processing fees (Stripe 1.5% + 20p UK, Square 1.4% + 25p). Managed SLA from ClickTake adds £300–800/month depending on shop size, covering uptime monitoring, security patches, monthly report refresh, and on-call bug-fix response within 1 business day. Self-managed is £0 — we hand over the codebase + runbook after the 30-day hypercare.",
          },
          {
            q: "Do you offer a free workflow-mapping call?",
            a: "Yes — a 60-minute call where we map your current workflow on a whiteboard, identify the 3–5 highest-impact improvement areas, and tell you honestly whether the custom solution is the right fit — or whether a generic shop CRM (RepairShopr/Celltech) would serve you at lower cost. We don't charge for this.",
          },
        ],
      },
      {
        name: "Scope & Customisation",
        questions: [
          {
            q: "I run a phone repair shop — does the solution work out of the box?",
            a: "Yes for phone repair verticals — we've shipped 15+ phone repair engagements and the schema, workflow, parts catalogue (iFixit + Mobiledefenders + Injured Gadgets) and SMS templates are pre-built. Phone repair engagements ship in 10 weeks at the lower end of the price range (£8–12K).",
          },
          {
            q: "I run a laptop / computer repair shop — does it work for me?",
            a: "Yes — laptop repair follows the same 9-stage workflow as phone repair, with different parts catalogues (custom laptop-parts catalogue typically required, since laptop parts are less standardised than phone parts). Laptop repair engagements ship in 11–12 weeks at £10–14K.",
          },
          {
            q: "I run an auto repair shop — does it work for me?",
            a: "Yes — auto repair follows a similar 9-stage workflow with ESD-safe handling swapped for OSHA-safe handling. Parts catalogues: AutoZone / NAPA / RockAuto APIs. Auto repair engagements ship in 12–14 weeks at £12–18K. We've shipped 4 auto repair engagements.",
          },
          {
            q: "I run an appliance repair / field service operation — does it work for me?",
            a: "Yes — appliance repair typically runs as a field service (technician dispatched to customer location) rather than drop-off. The solution adds a mobile-optimised technician UI for in-field use, two-warehouse inventory sync (main + van stock), and customer SMS at dispatch + arrival + repair complete. Appliance repair engagements ship in 12–14 weeks at £12–18K.",
          },
          {
            q: "Can the solution handle multiple locations?",
            a: "Yes — multi-tenant architecture with per-shop data isolation via Postgres RLS, shared customer table with cross-shop lookup, centralised parts inventory with per-shop stock allocation, and owner dashboard aggregating all locations. Multi-location adds £3–6K to the engagement depending on location count.",
          },
        ],
      },
      {
        name: "Compliance & Data",
        questions: [
          {
            q: "Is the SMS workflow GDPR / PECR / TCPA compliant?",
            a: "Yes. We obtain explicit opt-in consent for SMS at ticket drop-off (signed on the tablet, not pre-ticked). Every SMS includes opt-out language ('Reply STOP to unsubscribe'). Customer data is hosted on EU/UK infrastructure (Twilio EU + Neon Postgres EU) for UK shops, US infrastructure for US shops. We provide a DSAR workflow template for the shop to handle data-subject requests.",
          },
          {
            q: "Do you check IMEI against stolen-device databases?",
            a: "No — we do not check IMEI against stolen-device databases (CheckMEND, Immobilise, NMPR). This is a deliberate choice: it's a separate compliance regime (different legal liability, different data sources, different vendor integrations) and most shops handle it via a separate CheckMEND subscription. We capture and store the IMEI for warranty tracking, not for stolen-device verification.",
          },
          {
            q: "Where is the customer data hosted?",
            a: "Postgres database on Neon (EU/US regions) or Supabase (EU/US regions) — your choice based on market. SMS logs hosted on Twilio (EU/US) or MSG91 (IN) or Unifonic (UAE). Payment data is tokenised by Stripe/Square/SumUp — we never store card data. Backups run daily with 30-day retention, hosted in the same region as the primary database.",
          },
          {
            q: "What happens if the internet goes down in the shop?",
            a: "The tablet UI uses TanStack Query with offline-tolerant mutations — ticket creation, ticket stage transitions and parts-issue tracking queue locally when offline and sync when reconnected. SMS sending and payment processing require connectivity (they're external APIs) — these queue and fire when reconnected. Typical offline tolerance: 4–8 hours of front-desk operation without internet, with no data loss.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most repair-shop engagements are staffed from the UK and Pakistan hubs. Calls happen in your timezone.",
          },
          {
            q: "Do you sign NDAs and IP assignment?",
            a: "Yes to both, before kickoff. All custom code, schema, SMS templates and reporting dashboards built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work.",
          },
          {
            q: "Can you invoice in GBP, USD, AED or PKR?",
            a: "Yes to all four. ClickTake Technologies LTD (UK) invoices in GBP with UK VAT. ClickTake Technologies FZE-IC (UAE) invoices in AED. ClickTake Technologies LLC (US, Austin TX) invoices in USD. ClickTake Technologies (Pakistan, Multan) invoices in PKR or USD.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Your Repair-Shop Software?",
    subtitle:
      "Book a free 60-minute workflow-mapping call. We will map your current repair workflow on a whiteboard, identify the 3–5 highest-impact improvement areas, and tell you honestly whether the custom solution is the right fit — or whether a generic shop CRM like RepairShopr would serve you at lower cost.",
    steps: [
      {
        step: "1",
        title: "Book a 60-min workflow-mapping call",
        description: "Free. We map your current workflow on a whiteboard, identify bottlenecks, and tell you whether custom software is the right call.",
      },
      {
        step: "2",
        title: "Receive fixed quote + 10–14 week timeline",
        description: "Within 48 hours: fixed price, fixed scope, fixed timeline, vertical-specific parts catalogue choice, SMS + payment plan. No vague estimates.",
      },
      {
        step: "3",
        title: "Kickoff within 2 weeks",
        description: "Sign the contract, pay the deposit (30%), and we kickoff Phase 1 within 2 weeks. Software live in 10–14 weeks.",
      },
    ],
    primaryCta: { label: "Build My Repair Shop Software", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Download the Repair Workflow Spec", href: "/resources", variant: "outline" },
  },
}
