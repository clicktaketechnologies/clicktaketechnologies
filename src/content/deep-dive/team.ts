import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /team — ClickTake Technologies team deep-dive.
 *
 * Per blueprint Part 2.C: focus on BRAND depth — deep-dive bios for team
 * members (philosophy + expertise, not just names), department
 * structure, hiring philosophy, culture. Target 1,500-2,000 words.
 */
export const teamDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Our Team",
    title: "28 People Across 4 Offices, Coordinated as One Engineering Organization",
    subtitle:
      "Leadership in Birmingham, engineering in Multan, business desks in Austin and Dubai. Every engagement is staffed with a UK-based account lead and a Pakistan-based tech lead — the two coordinate daily and present a single face to the client.",
    geoDefinition:
      "ClickTake Technologies operates a distributed engineering organization of 28 people across four offices: Birmingham (United Kingdom) for leadership and account management, Multan (Pakistan) for engineering and AI delivery, Austin (United States) for North American business development, and Dubai (United Arab Emirates) for MENA region coverage. The team is structured into five departments — Leadership, Development, Marketing, Creative and Operations — with cross-office coordination handled via Linear, GitHub, Slack and Notion. Hiring is hybrid (in-office 2-3 days per week for engineering) with a four-stage interview process taking 2-3 weeks.",
    character: "team",
    ctas: [
      { label: "View Open Roles", href: "/careers", variant: "orange" },
      { label: "Meet the Team", href: "#team-departments", variant: "outline" },
    ],
    stats: [
      { value: "28", label: "Team members" },
      { value: "4", label: "Offices" },
      { value: "5", label: "Departments" },
      { value: "2.4 yrs", label: "Avg tenure" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Team" },
    ],
  },

  problem: {
    title: "Why Most Distributed Agency Teams Fail — and How We Don't",
    intro: [
      "Distributed agencies fail in predictable ways. The client-facing office loses visibility into engineering decisions. The engineering office becomes a 'factory' that takes specs and ships code without understanding the business context. Time-zone gaps become communication gaps. Quality drifts. The client pays for the resulting rework.",
      "ClickTake's model is designed to prevent these failure modes. Every engagement has two leads — one client-facing in Birmingham (or Austin/Dubai), one technical in Multan. The two are paired for the duration of the engagement, not swapped per sprint. They run weekly client demos together. They share a Slack channel with the client. They are jointly accountable for delivery. There is no 'phone game' between client and engineer.",
    ],
    painPoints: [
      {
        title: "The 'factory' engineering office",
        description:
          "Offshore engineering teams that receive specs via Jira tickets and ship code without understanding the business problem produce technically-correct solutions that miss the point. The client pays for rework.",
      },
      {
        title: "The disappearing account manager",
        description:
          "Client-facing offices that don't understand engineering decisions over-promise, under-scope, and disappear when the engineering team pushes back. The client loses trust.",
      },
      {
        title: "Time-zone communication gaps",
        description:
          "Pure-async distributed teams lose 24-48 hours on every question. The client waits overnight for an answer that should have taken 5 minutes on a call.",
      },
    ],
    paradigmShift: [
      "ClickTake pairs every engagement with a UK-based account lead and a Pakistan-based tech lead. The two run joint client demos, share a Slack channel with the client, and are jointly accountable. Time-zone overlap is 5 hours per day (10:00-15:00 UK time, 14:00-19:00 PK time) — enough for synchronous decisions, with the rest of the day used for focused engineering work. The model is not 'factory + sales' — it is one team in two locations.",
    ],
  },

  deepDive: {
    title: "How the Team Is Structured",
    intro: [
      "Five departments, four offices, one engineering organization. The structure below has been stable since 2024 and reflects how work actually flows — not an aspirational org chart.",
    ],
    subsections: [
      {
        heading: "Leadership (3 people, Birmingham + Multan)",
        body: [
          "Founder & CEO (Birmingham) — owns vision, strategy, key client relationships and partnerships. Chairs the weekly leadership meeting. Still personally reviews every proposal over £50K.",
          "CTO (Multan, originally Birmingham) — owns engineering standards across every project. Personally reviews architecture decisions on engagements over £100K. Runs the Friday engineering all-hands. Wrote ClickTake's internal 'Production LLM Engineering' playbook used by every AI engagement.",
          "Head of Growth (Birmingham) — owns the growth practice (SEO, paid, content, CRO). Previously led growth at a UK e-commerce brand. Personally audits every paid-media account over £15K/month in spend.",
        ],
        jargon: [
          { term: "Tech lead", def: "The senior engineer accountable for architecture decisions and code quality on a specific engagement. Always based in Multan. Co-presents weekly demos with the account lead." },
          { term: "Account lead", def: "The client-facing owner of an engagement. Always based in Birmingham, Austin or Dubai. Owns scope, timeline, and client communication." },
        ],
      },
      {
        heading: "Development (12 people, Multan)",
        body: [
          "The largest department and the engineering engine of the company. Senior Full-Stack Engineers (4) ship Next.js / Node / Postgres engagements. AI/ML Engineers (3) ship custom LLM systems, RAG pipelines and computer vision work. WordPress & E-commerce Engineers (2) handle Shopify, WooCommerce and headless commerce builds. Python Backend Engineers (2) handle FastAPI, async workers and data pipelines. QA Engineer (1) runs the automated testing practice and reviews every PR over 500 lines.",
          "Engineering team members are paired on engagements — never solo. A senior engineer is always paired with a mid-level or junior engineer, both for mentorship and for redundancy. Every PR is reviewed by at least one engineer who did not write the code. Production deploys require sign-off from the tech lead.",
        ],
      },
      {
        heading: "Marketing (3 people, Birmingham + Multan)",
        body: [
          "SEO Specialist (Multan, serving all regions) — runs technical SEO, content optimization, link building and local SEO. Personally writes or reviews every content brief over 1,500 words.",
          "Paid Media Manager (Birmingham) — manages Google, Meta, TikTok and LinkedIn ad campaigns. Google Ads and Meta Blueprint certified. Personally audits accounts over £15K/month.",
          "Social Media Manager (Birmingham) — owns organic social across Facebook, Instagram, TikTok, LinkedIn and YouTube. Produces content calendars, manages community engagement.",
        ],
      },
      {
        heading: "Creative (3 people, Multan + Birmingham)",
        body: [
          "Brand & Graphic Designer (Multan) — designs brand identities, marketing collateral, design systems. Figma power user with 6+ years of agency experience.",
          "UI/UX Designer (Multan) — crafts UX research, wireframes, high-fidelity UI, prototypes. WCAG 2.2 AA certified. Works closely with engineering from design handoff through production.",
          "Video Editor (Birmingham, originally Multan) — edits ads, explainers, social cuts, motion graphics, short-form vertical video. Adobe Premiere Pro + After Effects + DaVinci Resolve.",
        ],
      },
      {
        heading: "Operations (4 people, distributed)",
        body: [
          "Project Manager (Birmingham) — coordinates multi-region delivery. Runs sprint planning, weekly client demos, milestone reporting. PMP-certified.",
          "Client Success Manager (Birmingham) — owns post-launch support, renewals and retainer relationships for UK + EU clients.",
          "Client Success Manager (Austin) — same role for North American clients.",
          "Operations Lead (Dubai) — same role for MENA clients, plus regional partnerships and Dubai office management.",
        ],
      },
    ],
  },

  techStack: {
    title: "Tools We Use to Coordinate Across 4 Offices",
    intro: [
      "Coordination across 4 time zones is a tooling problem as much as a culture problem. The stack below is what we actually use every day — not an aspirational list.",
    ],
    categories: [
      {
        name: "Engineering coordination",
        items: [
          { name: "Linear", description: "Sprint planning, issue tracking, cross-team dependencies. Replaced Jira in 2023." },
          { name: "GitHub + GitHub Actions", description: "Code hosting, PR review, CI/CD. Every client engagement gets a client-owned GitHub org." },
          { name: "Vercel + Cloudflare", description: "Preview deploys on every PR. Production deploys require tech-lead approval." },
          { name: "Sentry + Datadog", description: "Error tracking + observability. Required on every production deploy." },
        ],
      },
      {
        name: "Communication",
        items: [
          { name: "Slack (paid plan)", description: "Async communication, client channels, engineering channels. Time-zone-aware do-not-disturb enforced." },
          { name: "Loom", description: "Recorded demos, walkthroughs, async standups. Cuts meeting time by ~40%." },
          { name: "Google Meet + Notion", description: "Synchronous meetings (capped at 45 minutes), shared docs, decision logs." },
          { name: "Calendly", description: "Scheduling across 4 time zones. Every team member publishes their availability." },
        ],
      },
      {
        name: "Hiring & people",
        items: [
          { name: "Greenhouse", description: "Applicant tracking, structured interviews, scorecards. Every interview is scored against a published rubric." },
          { name: "Deel", description: "International payroll across UK, Pakistan, US and UAE. compliant contractor and employee management." },
          { name: "Lattice", description: "Quarterly performance reviews, 360 feedback, goal tracking." },
          { name: "1Password + Tailscale", description: "Zero-trust security. Every team member uses a hardware security key for MFA." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Practice", "Most distributed agencies", "ClickTake"],
      rows: [
        ["Engineer pairing on engagements", "no:Often solo", "yes:Always paired senior + mid"],
        ["Tech lead on every project", "no", "yes"],
        ["Time-zone overlap for sync decisions", "no:Async-only", "yes:5 hours/day UK↔PK"],
        ["Code review requirement", "yes:Variable", "yes:At least 1 non-author reviewer"],
        ["Production deploy sign-off", "no:Self-serve", "yes:Tech-lead approval required"],
        ["Quarterly 360 reviews", "rare", "yes:For every team member"],
      ],
    },
  },

  methodology: {
    title: "How We Hire: 4-Stage Process, 2-3 Week Cycle",
    intro: [
      "Hiring is the single highest-leverage activity at ClickTake. A bad senior hire costs 6-12 months of delivery quality; a good one compounds for years. Our process is designed to filter for technical depth, communication clarity, and cultural fit — in that order.",
    ],
    steps: [
      {
        phase: "Stage 1",
        title: "Recruiter Screen (30 min)",
        duration: "Week 1",
        deliverables: ["Resume review", "Compensation alignment", "Role-fit signal"],
        description:
          "30-minute video call with our talent lead. Confirms basic role fit, compensation alignment, work authorization, and English fluency. We respond to every qualified application within 5 business days.",
      },
      {
        phase: "Stage 2",
        title: "Technical Interview (60 min)",
        duration: "Week 1-2",
        deliverables: ["Code review exercise", "System design discussion", "Engineering values alignment"],
        description:
          "60-minute video call with a senior engineer in the relevant department. Includes a code-review exercise (reviewing a real PR with planted bugs) and a system-design discussion. No live coding — we find it produces false negatives.",
      },
      {
        phase: "Stage 3",
        title: "Take-Home Exercise (4-6 hours, paid for senior roles)",
        duration: "Week 2",
        deliverables: ["Working code", "Written rationale", "Async review by 2 engineers"],
        description:
          "4-6 hour take-home exercise scoped to the actual work the role involves. Senior roles are paid at a fixed day-rate for the exercise. We review the submission asynchronously with two engineers scoring independently against a rubric.",
      },
      {
        phase: "Stage 4",
        title: "Culture & Values Interview (60 min)",
        duration: "Week 2-3",
        deliverables: ["Two team-member references", "Culture-fit scoring", "Offer decision"],
        description:
          "60-minute conversation with two team members from the department the candidate would join. Focuses on collaboration style, conflict resolution, mentorship philosophy. Two references are requested and called before an offer is extended.",
      },
    ],
  },

  useCases: {
    title: "What It's Like to Work Here — By Department",
    intro: [
      "Five departments, five different working patterns. Below is what a typical week looks like for each department — drawn from actual Lattice self-reports and sprint data.",
    ],
    cases: [
      {
        industry: "Development (Multan)",
        problem: "Engineers want deep work time but also need synchronous collaboration with the UK office.",
        application: "Mon-Wed in office (10:00-18:00 PKT) for pair programming and code review. Thu-Fri remote, deep work. 14:00-19:00 PKT overlap with UK office for synchronous decisions. Friday engineering all-hands at 16:00 PKT.",
        result: "Engineers report 4.5/5 satisfaction with meeting-to-focus-time ratio (industry benchmark 3.2/5).",
      },
      {
        industry: "Marketing (Birmingham + Multan)",
        problem: "Marketing work spans UK, US, MENA and Pakistan markets — different channels, languages and consumer behavior per region.",
        application: "SEO specialist in Multan handles technical SEO across all regions. Paid media manager in Birmingham handles UK + EU accounts; partners with Austin desk for US accounts and Dubai desk for MENA accounts. Weekly cross-region marketing sync on Mondays.",
        result: "Cross-region campaigns ship in 2 weeks versus 6+ weeks at single-office agencies.",
      },
      {
        industry: "Creative (Multan + Birmingham)",
        problem: "Design needs to be in sync with engineering for handoff, but creative work needs isolation.",
        application: "Designers in Multan co-locate with engineering 3 days/week for handoff. Thursday is 'design day' — no meetings, deep work on design systems, brand work, video. Video editor in Birmingham partners with paid media for ad creative.",
        result: "Design-to-engineering handoff defects down 60% since introducing co-location policy in 2024.",
      },
      {
        industry: "Operations (distributed)",
        problem: "Client success managers need to cover 4 time zones without burning out.",
        application: "UK CSM covers UK + EU (09:00-17:00 GMT). US CSM covers Americas (09:00-17:00 CST). Dubai operations lead covers MENA + Asia (10:00-19:00 GST). Handover doc updated end-of-day each region. No CSM is on-call outside their region's business hours.",
        result: "CSM tenure averages 3.1 years vs industry benchmark 1.8 years. 100% of retainers have a named CSM in the client's time zone.",
      },
      {
        industry: "Leadership (Birmingham + Multan)",
        problem: "Leadership needs to stay close to delivery without micromanaging.",
        application: "Weekly leadership meeting Mondays 11:00 GMT (all 4 offices dial in). Founder reviews every proposal >£50K. CTO reviews every architecture decision >£100K. Head of Growth audits every paid account >£15K/month. Friday all-hands rotates between engineering, growth and company-wide.",
        result: "Average senior-leadership-to-engineer ratio 1:5 — kept deliberately flat.",
      },
    ],
  },

  comparison: {
    title: "ClickTake as an Employer vs. Other Agencies",
    intro: [
      "An honest comparison drawn from anonymous Glassdoor reviews of competitors and our own Lattice engagement data.",
    ],
    tables: [
      {
        title: "Engineering culture: ClickTake vs. typical UK agency vs. typical offshore firm",
        headers: ["Dimension", "UK agency", "Offshore firm", "ClickTake"],
        rows: [
          ["Senior:Junior ratio", "1:4 to 1:6", "1:8 to 1:15", "1:3 (deliberately flat)"],
          ["Code review requirement", "yes:Variable", "no:Often skipped", "yes:Mandatory, non-author reviewer"],
          ["Time for learning / R&D", "no:Billable-only", "no:Billable-only", "yes:Fridays, 4 hours/week"],
          ["Conf. budget per engineer", "yes:£500-£1.5K", "no:Often zero", "yes:£2,500/year"],
          ["Open-source contribution allowed", "rare", "no", "yes:Encouraged, with paid time"],
          ["Median tenure (engineers)", "1.5-2 years", "1-1.5 years", "2.4 years"],
        ],
      },
    ],
  },

  businessImpact: {
    title: "Team Performance: What 6+ Years of Stable Hiring Produced",
    intro: [
      "Numbers below are aggregated from Lattice, Greenhouse and our internal delivery dashboard. They reflect the team as of mid-2026.",
    ],
    metrics: [
      { value: "2.4 yrs", label: "Median engineer tenure", description: "Versus 1.5-2 year industry benchmark for agency engineers." },
      { value: "4.5/5", label: "Engineer satisfaction", description: "Self-reported in quarterly Lattice surveys; benchmark is 3.2/5." },
      { value: "92%", label: "Offer acceptance rate", description: "Of senior engineers offered a role, 92% accept — high for distributed agencies." },
      { value: "11%", label: "Annual voluntary attrition", description: "Below the 18-22% agency industry benchmark." },
    ],
    body: [
      "Engineer tenure is the metric we watch most carefully. The 2.4-year median is not accidental — it is the result of deliberate policy choices: paired engineering on every engagement (no solo work), 4 hours of learning/R&D time every Friday, £2,500/year conference budget, explicit permission to contribute to open-source during work hours, and a 1:3 senior-to-junior ratio that keeps senior engineers from being overwhelmed by mentorship load.",
      "Offer acceptance rate at 92% tells us our compensation is competitive and our interview process is respectful. The 8% who decline typically cite specific reasons (location constraints, competing offer from a FAANG company) rather than process dissatisfaction. We track every decline reason and adjust compensation bands annually based on the data.",
      "Voluntary attrition at 11% is below the 18-22% agency industry benchmark. When engineers do leave, exit interviews consistently cite two reasons: relocation to a different city (we don't open new offices casually), or moving to a FAANG / big-tech role for compensation we cannot match. Both reasons are acceptable — we don't try to retain against them. We do, however, treat every departure as a learning opportunity and adjust policy when patterns emerge.",
    ],
  },

  integrations: {
    title: "Hiring, Tools & Compliance",
    intro: [
      "The platforms and policies that govern how the team operates — published here so candidates and clients can verify.",
    ],
    categories: [
      {
        name: "Hiring platforms",
        items: ["Greenhouse (ATS)", "LinkedIn Recruiter", "Hired.com", "Stack Overflow Jobs (legacy)", "Internal referrals (35% of hires)"],
      },
      {
        name: "People operations",
        items: ["Lattice (performance, 360 reviews)", "Deel (international payroll)", "1Password (secrets management)", "Tailscale (zero-trust network)", "Hardware security keys (YubiKey, required for all engineers)"],
      },
      {
        name: "Learning & development",
        items: ["£2,500/year conference budget per engineer", "Frontend Masters / Egghead / Udemy business accounts", "O'Reilly Learning Platform (company account)", "Friday R&D time (4 hours/week, protected)", "Annual internal hackathon (3 days, paid)"],
      },
      {
        name: "Compensation philosophy",
        items: ["Above-market for Pakistan engineering market", "At-market for UK engineering market", "Transparent bands (published internally)", "Annual compensation review (March)", "Equity for leadership and senior IC roles"],
      },
    ],
    compliance: ["GDPR-compliant HR data handling", "Equal Employment Opportunity policy", "Published salary bands (internal)", "Anti-harassment policy (signed annually)", "Mental-health support (Spill, included in benefits)"],
  },

  caseStudies: {
    title: "Two Team-Member Stories",
    intro: [
      "Anonymized but real stories from team members who joined ClickTake and grew with us. Both consented to publication.",
    ],
    studies: [
      {
        client: "Senior AI/ML Engineer, joined 2022 as mid-level",
        situation: "Joined ClickTake in 2022 as a mid-level AI engineer with 3 years of experience at a Lahore-based agency. Compensation was at-market for Pakistan; the draw was the AI practice and the UK client exposure.",
        task: "Grow into a senior IC role within 18 months, ship a production LLM system end-to-end, and represent ClickTake in client demos.",
        action: "Paired with the CTO on the first LLM engagement (UK legal firm, 2023). Took over tech-lead role on engagement #3 (UK healthcare LLM scribe, 2024). Promoted to Senior AI/ML Engineer in Q3 2024 after shipping 4 production LLM systems. Spoke at PyCon Pakistan 2024 on 'Production RAG: Eval Harnesses That Don't Suck'.",
        result: "Now leads the AI practice's evaluation-harness workstream. Mentors 2 junior AI engineers. Compensation has grown 95% over 4 years. Turned down 2 FAANG offers to stay — cited the production-LLM portfolio and the Friday R&D time as deciding factors.",
        quote: {
          text: "I joined for the AI work. I'm staying because I get to ship real LLM systems with real evals — not demos. The 4 hours of Friday R&D time is what makes the difference.",
          author: "Senior AI/ML Engineer",
          title: "Joined 2022",
        },
      },
      {
        client: "Client Success Manager, joined 2023 from a competitor agency",
        situation: "Joined ClickTake's Birmingham office in 2023 from a London agency where they had burned out after 18 months. Was considering leaving the industry entirely.",
        task: "Take over the UK + EU client-success portfolio, rebuild the post-launch handoff process, and stay sane doing it.",
        action: "Took over 14 retainer accounts in the first 60 days. Built the cross-region handoff doc system (UK → US → Dubai → UK) that eliminated 90% of after-hours escalations. Negotiated a 4-day workweek (compressed hours, full pay) after 12 months in role. Promoted to Senior CSM in Q1 2026.",
        result: "UK + EU retention rate is 96% under their management (vs 88% company average). Has not had an after-hours escalation in 14 months. Recently mentored the new US-based CSM through the same handoff process.",
        quote: {
          text: "At my old agency I was on-call across 3 time zones and burned out in 18 months. At ClickTake I work 4 days a week, my clients know it, and my retention numbers are the highest in the company.",
          author: "Senior Client Success Manager",
          title: "Joined 2023",
        },
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions About the Team",
    intro: [
      "Most questions we get from candidates and clients. If yours is not here, email careers@clicktaketech.com.",
    ],
    categories: [
      {
        name: "Hiring & careers",
        questions: [
          {
            q: "Where are your open roles located?",
            a: "Most engineering roles are based in Multan, Pakistan (hybrid: 3 days/week in office). Most client-facing roles are based in Birmingham, UK (hybrid: 2 days/week in office). US and UAE desks are remote. Current open roles are listed at /careers.",
          },
          {
            q: "Do you hire fully-remote engineers in Pakistan?",
            a: "No. Engineering roles in Multan are hybrid 3 days/week in office. The in-office cadence is deliberate — it enables pair programming, mentorship, and code review that we cannot replicate fully remote. We have made exceptions for senior engineers relocating to other cities in Pakistan, but this is rare.",
          },
          {
            q: "What is the interview process?",
            a: "Four stages over 2-3 weeks: (1) 30-min recruiter screen; (2) 60-min technical interview with a senior engineer; (3) take-home exercise (4-6 hours, paid for senior roles); (4) 60-min culture and values interview. We respond to every applicant within 5 business days at each stage.",
          },
          {
            q: "Do you sponsor visas for international candidates?",
            a: "For the UK office: yes, we hold a UK Sponsor Licence and have sponsored Skilled Worker visas for senior engineering and leadership roles. For other offices: not currently. Visa sponsorship is decided case-by-case at the offer stage.",
          },
        ],
      },
      {
        name: "Working here",
        questions: [
          {
            q: "What is compensation like?",
            a: "For Pakistan engineering roles: above-market for the Pakistan market — typically 20-40% above comparable agency roles in Lahore/Karachi. For UK roles: at-market for Birmingham (slightly below London rates, but with hybrid flexibility and lower cost of living). Salary bands are published internally and reviewed annually in March.",
          },
          {
            q: "What benefits do you offer?",
            a: "All offices: private health insurance, mental-health support (Spill), £2,500/year learning budget, 25 days PTO + public holidays, paid parental leave (16 weeks primary, 4 weeks secondary). UK office: pension (3% employer match), EMI share options for senior roles. Pakistan office: annual profit-share bonus, transport allowance.",
          },
          {
            q: "Is the 4-day workweek available?",
            a: "Available to senior roles (3+ years tenure) on a case-by-case basis, with compressed hours and full pay. Currently 4 team members are on a 4-day week. We do not offer it as a default — it's earned through track record and retained through performance.",
          },
          {
            q: "What is the time-off policy?",
            a: "25 days PTO + public holidays (UK and Pakistan have 8 public holidays each, US has 10, UAE has 11). PTO rolls over up to 5 days/year. Unlimited sick leave (with doctor's note after 3 days). Paid parental leave: 16 weeks primary caregiver, 4 weeks secondary caregiver, available from day one of employment.",
          },
        ],
      },
      {
        name: "Team structure",
        questions: [
          {
            q: "How are engineers paired on engagements?",
            a: "Every engagement is staffed with a senior engineer paired with a mid-level or junior engineer. The senior owns architecture and code review; the junior owns implementation. Both attend the weekly client demo with the account lead. Pairing is rotated across engagements to spread institutional knowledge.",
          },
          {
            q: "How often do team members work across offices?",
            a: "Most team members stay in their home office for the duration of their tenure. Cross-office travel happens for senior roles: the CTO travels between Birmingham and Multan quarterly; leadership travels to Austin and Dubai annually for client meetings and conferences. Engineers occasionally travel for client on-sites (typically 1-2 trips per year for senior engineers).",
          },
          {
            q: "What is the ratio of senior to junior engineers?",
            a: "1:3 — deliberately flat. We keep the ratio tight to prevent senior engineers from being overwhelmed by mentorship load. When the ratio drifts above 1:4, we open senior engineering roles to bring it back down. The flat structure is a deliberate quality choice — it costs more but produces better code and better client outcomes.",
          },
        ],
      },
    ],
  },

  finalCta: {
    title: "Want to Join the Team?",
    subtitle:
      "We hire deliberately and slowly. If you are a senior engineer, designer, or growth specialist who wants to ship production systems with real evals, real code review, and real mentorship — we want to talk to you. View open roles at /careers or book an exploratory conversation with our talent lead.",
    steps: [
      {
        step: "1",
        title: "View open roles",
        description: "Visit /careers to see current openings across all 4 offices and all 5 departments.",
      },
      {
        step: "2",
        title: "Apply with a resume + note",
        description: "Tell us why ClickTake specifically — generic cover letters go to the bottom of the pile. We read every application.",
      },
      {
        step: "3",
        title: "First response within 5 business days",
        description: "Every qualified application gets a human response within 5 business days. No black-hole ATS.",
      },
    ],
    primaryCta: { label: "View Open Roles", href: "/careers", variant: "orange" },
    secondaryCta: { label: "Email Our Talent Lead", href: "mailto:careers@clicktaketech.com", variant: "outline" },
  },
}
