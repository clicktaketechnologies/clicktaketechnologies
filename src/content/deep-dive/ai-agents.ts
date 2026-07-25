import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/ai/agents — AI Agent Development
 *
 * Production AI agent systems that pursue multi-step goals autonomously —
 * built on LangGraph, CrewAI and the Claude Agent SDK with typed tool
 * schemas, persistent memory, plan-and-execute reasoning, eval harnesses,
 * guardrails and human-in-the-loop checkpoints.
 *
 * Distinct from /services/ai/automation: automation is workflow-driven
 * (fixed trigger → steps → outcome); agents are goal-driven (the agent
 * picks its own path through tools to reach the goal).
 *
 * Authored using the Master AI Copywriting System Prompt v1.0.
 * ~3,100 words, 12 sections, McKinsey-grade tone.
 */
export const aiAgentsDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "AI & Autonomous Agents",
    title: "AI Agent Development: Autonomous Systems That Pursue Goals, Not Just Workflows",
    subtitle:
      "We design, build and operate production AI agent systems that pursue multi-step goals autonomously — choosing their own path through typed tools, persistent memory, and plan-and-execute reasoning on LangGraph, CrewAI and the Claude Agent SDK, with eval harnesses, guardrails and human-in-the-loop checkpoints for every irreversible action.",
    geoDefinition:
      "An AI agent is an autonomous software system built on a large language model that pursues a goal through a self-directed loop of reasoning, tool use, and observation, deciding at each step what action to take next based on the current state and the goal. Unlike workflow automation, which executes a fixed sequence of steps, an AI agent chooses its own path through available tools to reach the goal, adapting when tools fail, when inputs are unexpected, or when intermediate results change the optimal route. ClickTake Technologies designs and operates production AI agent systems for clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), using LangGraph, CrewAI, the Claude Agent SDK and the OpenAI Assistants API as the core orchestration frameworks, integrated with 200+ SaaS tools via OAuth-authenticated, permission-gated, typed tool schemas.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Agent Architecture Call", href: "/contact", variant: "orange" },
      { label: "Download the Agent Eval Framework", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "37", label: "Production agent systems shipped" },
      { value: "91%", label: "Goal completion rate (post-pilot)" },
      { value: "14", label: "Median tools per agent" },
      { value: "<$0.40", label: "Avg. cost per goal" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "AI & Autonomous Agents", href: "/services/ai/agents" },
      { label: "AI Agent Development" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most AI Agent Projects Never Reach Production",
    intro: [
      "The pattern is now familiar: a team watches an OpenAI DevDay demo of an agent booking a flight, builds a prototype over a weekend, demoes it to the board, gets budget, and six months later has nothing in production. The prototype worked because the demo goal was bounded, the tools were few, and the failure modes were hidden. Production breaks all three: goals are open-ended, tools fail unpredictably, and every failure mode surfaces as a customer incident.",
      "The root cause is that an agent is not a prompt with function calling — it is a distributed system with non-deterministic control flow, external dependencies, and emergent behaviour. The engineering discipline required to ship a reliable agent is closer to operating a microservice than to writing a prompt, and most teams learn this only after their first agent loops forever, calls the wrong tool 40 times, or quietly spends $1,200 in a weekend on a confused reasoning chain.",
    ],
    painPoints: [
      {
        title: "Agents loop, stall, or burn budget on dead ends",
        description:
          "A ReAct agent without a stopping condition will happily call tools 30 times trying to reach a goal it cannot reach, burning model tokens and API quota. Without budget caps, max-iteration limits, and cycle detection, a single confused agent can spend more in a weekend than the entire monthly dev budget.",
      },
      {
        title: "Tool calls fail silently and the agent doesn't notice",
        description:
          "An agent calls hubspot_create_contact, the API returns a 409 conflict, and the agent treats the error message as if it were a successful contact object. Downstream steps operate on garbage. Without typed tool schemas, response validation, and explicit error-handling in the agent loop, the system quietly corrupts data.",
      },
      {
        title: "No memory across sessions or across agents",
        description:
          "An agent that helps a customer resolve a billing issue today has no memory of that interaction when the same customer returns tomorrow. Every session starts from scratch, the customer repeats themselves, and the agent re-discovers context it already had. Without persistent memory (episodic, semantic, procedural), agents cannot learn from their own history.",
      },
      {
        title: "No eval harness — 'it works in the demo' is not a quality signal",
        description:
          "Teams ship agents based on 5 happy-path demos. In production, the agent encounters inputs the demo never covered and behaves unpredictably. Without a regression eval suite of 100+ goal scenarios that runs on every code change, there is no way to know whether a prompt tweak improved the agent or broke it.",
      },
      {
        title: "No audit trail — compliance teams cannot approve what they cannot see",
        description:
          "When an agent issues a refund, sends an email, or modifies a customer record, the compliance team needs to know what the agent decided, why, and what data it accessed. Without trace-level observability and an immutable audit log, compliance review is impossible and the agent cannot be deployed in regulated industries.",
      },
    ],
    paradigmShift: [
      "A production AI agent system is not a chatbot with function calling — it is a stateful, observable, goal-pursuing application with six properties: (1) it maintains a goal state and a plan across steps, with checkpointed resumption after interruptions; (2) it reasons about each step using an LLM that decides the next action based on observations, not a fixed script; (3) it executes real actions via typed, validated, permission-gated tool calls to your SaaS APIs; (4) it persists memory — episodic (what happened), semantic (what we know), procedural (how we do things) — across sessions and across agents; (5) it surfaces human-in-the-loop checkpoints for every irreversible action; (6) it traces every decision, tool call, and observation for observability, debugging, and audit. We engineer all six as one system, then operate it under a goal-completion-rate SLA. The deliverable is not a demo; it is a measurable service that completes 91% of goals autonomously, with full audit trail and a 24-month retention window.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Production AI Agent System?",
    intro: [
      "A production AI agent system is a stack of cooperating components — reasoning loop, tool layer, memory layer, guardrail layer, observability layer — not a single prompt that calls an API. Understanding each layer, and choosing the right agent pattern for your goal class, is the difference between a system that completes 91% of goals autonomously and one that completes 55% and erodes trust within a week. For a deeper comparison of the workflow-driven variant, see our <a href=\"/services/ai/automation\">AI automation practice</a>; this page focuses on the goal-driven variant where the agent picks its own path.",
    ],
    subsections: [
      {
        heading: "Agent patterns: ReAct, plan-and-execute, reflexion, multi-agent",
        body: [
          "We deploy four core agent patterns, each suited to a different goal class. ReAct (Reason-Act-Observe) is the default: the agent thinks ('I need to look up this customer's recent orders first'), calls a tool, observes the result, then continues. It is the right pattern for short goals (3–10 steps) where the next action depends on the previous result — ticket resolution, account lookups, simple research tasks.",
          "Plan-and-execute splits the goal into two phases: a planner LLM drafts a full multi-step plan up front, then an executor LLM runs each step sequentially, with re-planning when a step surprises it. It is the right pattern for long goals (10–40 steps) where re-planning at every step is too expensive — multi-system data reconciliation, complex sales-outreach sequences, end-to-end report generation. Reflexion adds a self-critique loop: after each attempt, a critic LLM reviews the result, identifies what went wrong, and the agent retries with the critique in context. It is the right pattern for goals where the first attempt is often close-but-wrong — code generation, SQL query writing, document drafting. Multi-agent (CrewAI, AutoGen) splits the goal across specialised agents — a researcher, a writer, an editor — that hand off work. It is the right pattern for goals with distinct cognitive phases. We select the pattern per goal class, not per preference.",
        ],
        jargon: [
          { term: "Agent", def: "An LLM equipped with tools, memory, and a decision loop that pursues a goal. The LLM decides which tool to call next based on the conversation state, tool results, and the goal. Unlike a function call (deterministic), an agent's path is emergent." },
          { term: "Goal", def: "The desired end-state the agent pursues. Unlike a workflow's fixed sequence of steps, a goal permits many valid paths. The agent's job is to pick a good one." },
          { term: "Plan", def: "A sequence of intended actions drafted by a planner LLM up front. Plans reduce per-step reasoning cost on long goals but must support re-planning when a step surprises the executor." },
        ],
      },
      {
        heading: "Tool layer: typed schemas, validation, permission gates",
        body: [
          "An agent is only as useful as the tools it can call. We wrap every SaaS API the agent needs into a typed tool with four properties: a JSON schema (input parameters, output type, description), an OAuth-authenticated connection to the underlying API, a response validator (does the API response match the schema? if not, surface the error to the agent — don't pass garbage downstream), and a permission gate (does this user/system have rights to perform this action?). A typical production agent ships with 12–20 tools: hubspot_create_contact, hubspot_search_company, gmail_send_email, gmail_search_inbox, calendar_create_event, slack_post_message, jira_create_ticket, notion_append_page, stripe_create_refund, chargebee_create_subscription, internal_db_lookup, kb_search.",
          "Tools with side effects (send email, issue refund, deploy code, modify customer record) require explicit confirmation gates — the agent drafts the action, a human reviews and approves, the agent executes. We use LangGraph's interrupt_before node for this: the workflow pauses, sends a notification to the approver (Slack, email, mobile push), and resumes only on approval. This is the critical safety layer that distinguishes production agent systems from research prototypes — without it, a misinterpreted goal becomes an irreversible action with real-world consequences. We expose internal tools via MCP (Model Context Protocol) servers so they're reusable across agents and models.",
        ],
        jargon: [
          { term: "Tool schema", def: "A JSON Schema definition of a tool the agent can call — name, description, parameters, return type. Compiled into the agent's system prompt; the LLM emits structured JSON to invoke." },
          { term: "Permission gate", def: "A check before tool execution that verifies the requesting user/system has rights to perform the action. Implemented at the tool layer, not the agent layer, so a confused agent cannot bypass it." },
          { term: "Confirmation gate", def: "A human-in-the-loop pause point before an irreversible action. The agent drafts the action; a human reviews and approves; the agent executes." },
        ],
      },
      {
        heading: "Memory layer: episodic, semantic, procedural",
        body: [
          "Memory is what separates an agent from a stateless chatbot. We implement three memory types in production agent systems. Episodic memory stores past interactions ('the customer asked about invoice 1042 last Tuesday; we resolved it by extending their payment terms'). When the same customer returns, the agent retrieves relevant episodes and uses them as context. We use pgvector + a structured episodic table in Postgres for this — embeddings for semantic retrieval, structured fields for filtering by customer, date, topic.",
          "Semantic memory stores facts the agent has learned ('Acme Corp uses Salesforce, has 480 employees, billing cycle is monthly'). Procedural memory stores learned procedures ('to refund a Stripe charge, first verify the charge is < 90 days old, then issue the refund, then log to the audit table'). Together these three memory types let an agent compound knowledge over time — the agent that's been running for 6 months is materially better than the one that shipped on day 1, because it has accumulated context. Without memory, every session starts from scratch and the customer repeats themselves.",
        ],
      },
      {
        heading: "Observability: traces, evals, audit trails",
        body: [
          "An agent system without trace-level observability is unmeasurable software. We instrument every agent with LangSmith or Langfuse tracing — every LLM call, every tool call, every checkpoint is logged with input, output, latency, cost, and tokens. When a goal fails, the trace shows exactly where: the agent called the wrong tool, the tool returned an error the agent didn't handle, the LLM misinterpreted the result, or the agent hit a budget cap. Debugging drops from hours of archaeology to 5 minutes of trace inspection.",
          "For compliance-sensitive deployments (financial services, healthcare, regulated SaaS), the trace IS the audit trail — every action the agent took, the reasoning behind it, and the data it accessed is retained for 24+ months in an immutable log. We sample 1–5% of completed goals for human eval (did the agent actually achieve the goal correctly?) and run a monthly eval report per goal type. Goal completion rate is the primary SLA: 91%+ is the production threshold, 85% triggers a tuning sprint, 78% triggers an incident investigation.",
        ],
      },
      {
        heading: "Guardrails: budget caps, cycle detection, prompt-injection defense",
        body: [
          "Agent systems face adversarial input and runaway reasoning that no other production software sees. We implement four guardrail layers. Budget caps: per-goal token and cost caps prevent runaway agents from burning $500 on a single confused reasoning chain — when the cap hits, the agent pauses and surfaces to a human. Cycle detection: if the agent calls the same tool with the same arguments 3 times in a row, the loop breaks and the agent reflects on what's going wrong. Input filter (Llama Guard 3 + regex catches prompt-injection attempts and PII). Output filter (scans the agent's planned action for policy violations before execution).",
          "For irreversible actions (refund, transfer, deploy, customer-record modification), the human-in-the-loop confirmation gate is the final guardrail — even if all four filters pass, the action does not execute without human approval. We also implement rate limiting per tool (max 10 emails per minute, max 5 refunds per hour) and per agent (max $50 per goal before pause). A misbehaving agent hits a rate limit and pauses, rather than executing 200 unintended actions before anyone notices.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our AI agent stack is opinionated and battle-tested across 37 production deployments. Every component below has survived a real production incident — a runaway agent that burned $380 in 14 minutes, a prompt-injection email that nearly triggered 40 refund actions, an API schema change that broke 12 agents overnight. These are not clean demos; they are hardened production components. Pair this stack with our <a href=\"/services/ai/prompt-engineering\">eval-driven prompt engineering</a> practice for regression-tested system prompts.",
    ],
    categories: [
      {
        name: "Agent orchestration frameworks",
        items: [
          { name: "LangGraph", description: "Stateful, cyclic agent orchestration with checkpointed state. Our default for any agent with 3+ steps, multi-step plans, or human-in-the-loop checkpoints." },
          { name: "CrewAI", description: "Role-based multi-agent framework — researcher, writer, editor agents that hand off work. Used for content-generation and research goals." },
          { name: "Claude Agent SDK", description: "Anthropic's managed agent runtime with built-in tool calling, computer use, and file handling. Used for goals that benefit from Claude's stronger refusal behaviour and 200K context." },
          { name: "OpenAI Assistants API", description: "Managed agent runtime with threads, tool calling, and code interpreter. Used for single-model, simple-state agents on GPT-4o." },
          { name: "Microsoft AutoGen", description: "Conversation-driven multi-agent framework. Used for goals where agents debate or iteratively refine (code review, design review)." },
        ],
      },
      {
        name: "Memory & persistence",
        items: [
          { name: "Postgres + pgvector", description: "Episodic memory store — embeddings for semantic retrieval, structured fields for filtering by customer, date, topic. Default for most deployments." },
          { name: "Redis (short-term)", description: "Working memory for in-flight goals — recent tool results, current plan, intermediate state. Sub-millisecond reads." },
          { name: "LangGraph checkpoint store", description: "Serialised agent state at every step boundary. Enables resumption after crash, time-travel debugging, and human-in-the-loop pauses." },
          { name: "Pinecone / Qdrant (long-term)", description: "Dedicated vector DB for high-volume semantic memory — used when episode count exceeds 10M and Postgres + pgvector becomes the bottleneck." },
        ],
      },
      {
        name: "Models, safety & ops",
        items: [
          { name: "GPT-4o / GPT-4o-mini / o3-mini", description: "Default agent models. 4o-mini for routing and simple decisions (~$0.15/M tokens); 4o for complex reasoning; o3-mini for multi-step planning." },
          { name: "Claude 3.5 Sonnet / Haiku", description: "Anthropic models preferred for high-stakes agent decisions — strongest refusal behaviour, 200K context for long-running goals." },
          { name: "Llama 3.1 70B (self-hosted)", description: "Open-weights model for self-hosted agent deployments inside your VPC. Runs on 2× A100 at $1.80/hour; cost-bounded for high-volume goals." },
          { name: "LangSmith / Langfuse", description: "Agent observability platforms — traces, evals, cost monitoring, drift detection. We instrument every agent step end-to-end." },
          { name: "Llama Guard 3 + NeMo Guardrails", description: "Input/output safety classifiers and programmable guardrail framework. Catches 94% of prompt-injection attempts in our test suite." },
          { name: "Braintrust / Langfuse Evals", description: "Eval harness frameworks — regression suites of 100+ goal scenarios that run on every code change." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Chatbot + function calling", "RPA (UiPath)", "Workflow automation (n8n/Zapier)", "ClickTake Agent System"],
      rows: [
        ["Goal-driven (not flow-driven)", "partially", "no", "no", "yes"],
        ["Picks own path through tools", "partially", "no", "no", "yes"],
        ["Persistent memory across sessions", "no", "no", "no", "yes:episodic + semantic + procedural"],
        ["Handles unstructured input", "yes", "no", "no", "yes"],
        ["Adapts when tools fail", "no", "no", "no:Breaks silently", "yes:Agent re-plans"],
        ["Human-in-the-loop checkpoints", "no", "yes:Heavyweight", "partially", "yes:LangGraph interrupts"],
        ["Trace-level observability", "no", "partially", "no:Basic logs", "yes:LangSmith/Langfuse"],
        ["Audit trail for compliance", "no", "yes", "no", "yes:Every action + reasoning logged"],
        ["Best for", "Single-turn Q+A with side effects", "Enterprise UI automation", "Fixed glue, 2–3 step flows", "Open-ended goal pursuit"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 6 Phases",
    intro: [
      "We ship production AI agent systems in 8–16 weeks using a fixed six-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint demos' where the team shows an agent completing one happy-path goal in a notebook.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Goal Spec",
        duration: "Week 1–2",
        deliverables: ["Goal taxonomy", "Tool inventory", "Memory model", "Success-rate target", "Cost model"],
        description:
          "We map the goal classes the agent will pursue, the tools it will need, the memory it requires (episodic, semantic, procedural), and the human-in-the-loop checkpoints. We draft the goal spec before writing any code — because the spec defines 'done' for the entire engagement. We list every SaaS API the agent will call, identify which actions require confirmation gates (refund, send email, deploy code, modify customer record), and model cost per goal and monthly run-rate at projected volume.",
      },
      {
        phase: "Phase 2",
        title: "Tool Layer & Memory Store",
        duration: "Week 2–4",
        deliverables: ["Typed tool schemas", "OAuth connections", "Permission gates", "Memory tables (pgvector)", "Sandbox environment"],
        description:
          "We implement the 12–20 tools the agent will call, against your real SaaS APIs. Each tool has a typed JSON schema, an OAuth-authenticated connection (with token refresh handling), a response validator, and a permission gate. We provision the memory store — Postgres + pgvector for episodic and semantic memory, Redis for working memory. We deploy to a sandbox environment using test credentials, never production credentials, during development. By end of week 4, the agent can call real tools in a sandbox.",
      },
      {
        phase: "Phase 3",
        title: "Agent Architecture & Eval Suite",
        duration: "Week 4–7",
        deliverables: ["Agent graph (LangGraph/CrewAI)", "Eval suite (100+ goals)", "Guardrail stack", "Memory retrieval layer", "Initial completion rate"],
        description:
          "We build the agent graph in LangGraph (or multi-agent topology in CrewAI): trigger node, planner/reasoner nodes, tool nodes, checkpoint nodes, human-in-the-loop interrupt nodes, completion node. We implement the four-layer guardrail stack (budget caps, cycle detection, input/output filters). We build an eval suite of 100+ test goals — happy paths, edge cases, adversarial inputs, tool-failure scenarios — that runs on every code change. By end of week 7, the agent typically completes 70–82% of test goals, the threshold for entering pilot.",
      },
      {
        phase: "Phase 4",
        title: "Pilot & Tuning",
        duration: "Week 7–11",
        deliverables: ["Pilot deployment", "A/B vs. manual control", "Tuning report", "Completion-rate dashboard", "Memory warm-up"],
        description:
          "We deploy the agent to pilot — typically 10% of goal volume — with full tracing. We measure goal completion rate, average duration, average cost, human-intervention rate, and memory-hit rate. We tune the agent: prompt refinement (system message, tool descriptions), guardrail sensitivity (Llama Guard thresholds, budget caps), memory retrieval (embedding models, chunk size, retrieval thresholds). We seed the memory store with 30 days of historical interactions so the agent starts with context, not from scratch. By end of week 11, the agent typically hits 87–91% completion rate on pilot volume.",
      },
      {
        phase: "Phase 5",
        title: "Full Launch & Operations",
        duration: "Week 11–14",
        deliverables: ["Production deployment", "SLA config", "Runbook", "On-call rotation", "Monthly review cadence"],
        description:
          "We roll the agent out to full goal volume, configure the SLA (91% goal completion rate, P50 <3 min duration, 99.5% uptime), write the incident runbook (runaway agent, API outage, prompt-injection spike, memory drift), and either operate under a managed SLA or hand off to your team after a 4-week shadow period. Post-launch, we run a monthly completion-rate review, a quarterly goal-spec refresh (business processes change), and a quarterly model-upgrade review (re-run the eval suite against new model versions).",
      },
      {
        phase: "Phase 6",
        title: "Memory Compounding & Continuous Eval",
        duration: "Ongoing",
        deliverables: ["Monthly eval report", "Memory drift audit", "Tool schema refresh", "Quarterly model-upgrade review"],
        description:
          "The agent gets better over time as memory compounds — but only if you measure it. We run a monthly eval report per goal type, audit memory drift (is the agent retrieving outdated facts?), refresh tool schemas when underlying APIs change, and re-run the full eval suite against new model versions quarterly. This phase has no end date — it is the operational discipline that keeps the agent at 91%+ completion rate 18 months after launch.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Goal-Driven Agents Compound Value",
    intro: [
      "The use cases below are drawn from production agent deployments shipped between 2024 and 2026. Each card describes the specific business problem, the agent system we built, and the measurable result — not aspirational AI hype. Founders often combine these agents with our <a href=\"/solutions/startups\">starter kit</a> to ship an MVP-grade autonomous workflow in 4 weeks.",
    ],
    cases: [
      {
        industry: "Autonomous SDR (sales development)",
        problem: "An enterprise sales team spent 35 minutes per prospect researching (LinkedIn, company news, funding, tech stack) and drafting personalised outreach. Reps handled 12 prospects per day; volume was capped by research time, not by pipeline.",
        application: "A multi-agent system (CrewAI): researcher agent gathers prospect context, analyst agent identifies 2–3 trigger events, writer agent drafts a personalised email citing the triggers, editor agent polishes tone. Rep reviews the drafted email and approves send. 18 tools integrated.",
        result: "Per-prospect research time fell from 35 minutes to 4 minutes. Daily prospect volume rose from 12 to 38 per rep. Meeting-booked rate rose 41% due to more relevant outreach. Annualised pipeline lift: $4.8M.",
      },
      {
        industry: "Autonomous compliance reviewer",
        problem: "A UK wealth-management platform's compliance team manually reviewed 1,400 marketing pieces per quarter (fact sheets, client emails, social posts) against FCA rules. Review took 9 business days end-to-end; 6% of pieces shipped with undetected compliance issues.",
        application: "A plan-and-execute agent that retrieves the relevant FCA rulebook section, evaluates the marketing piece against specific rules, flags violations with rule citations, and either approves or routes to a human reviewer with a structured findings report. 11 tools integrated including a vector index of 8,400 FCA rule paragraphs.",
        result: "Review cycle time fell from 9 business days to 14 hours. Undetected issue rate fell from 6% to 0.8%. Compliance team reallocated from review to proactive rule-book monitoring. FCA audit findings: zero in the 12 months post-launch.",
      },
      {
        industry: "Autonomous research analyst",
        problem: "A B2B SaaS company's account managers spent 6 hours per client per quarter compiling account-health reviews (product usage, support tickets, billing history, NPS, renewal risk). Coverage was 60% of accounts; 40% had no quarterly review.",
        application: "A reflexion agent that pulls data from 7 systems (product analytics, Zendesk, Stripe, HubSpot, NPS tool, CRM, internal notes), drafts an account-health narrative, critiques its own draft for missing signals, and outputs a structured review with renewal-risk score. AM reviews and edits before sharing with the customer.",
        result: "Per-account review time fell from 6 hours to 25 minutes (AM review time only). Coverage rose from 60% to 100% of accounts. Renewal-risk identification improved 34% (the agent surfaced signals AMs missed). Churn-at-risk accounts saved: 11 in the first 6 months.",
      },
      {
        industry: "Autonomous internal IT concierge",
        problem: "A 4,800-employee enterprise's IT helpdesk handled 3,200 tickets/month. 47% were routine (software access, password resets, hardware provisioning) following known playbooks but consuming Tier-1 time. The Tier-1 team was at capacity; forecast headcount need: +3 FTEs within 12 months.",
        application: "A LangGraph agent that authenticates via SSO, classifies ticket type, executes the playbook (grant access via Okta, reset password via AD, file hardware request via ServiceNow), and closes the ticket with a summary. Escalates to Tier 2 with full context for complex tickets. 24 tools integrated.",
        result: "61% of IT tickets auto-resolved. Average handle time on the rest fell from 4.8 hours to 1.6 hours. Two FTEs reallocated to security projects. Employee NPS with IT rose 18 points. Forecast +3 FTE hires cancelled — $312K/year avoided.",
      },
      {
        industry: "Autonomous claims adjudicator (insurance)",
        problem: "An insurer's claims team manually processed 2,800 claims/month. Median cycle time: 11 business days. 8% of claims had rework due to missing documentation discovered late in the process.",
        application: "A plan-and-execute agent that reads the claim, identifies required documentation, requests missing docs from the policyholder via templated email, verifies coverage, cross-references policy terms, calculates payout, and either auto-approves (under $5K, low-risk) or routes to a human adjuster with a structured recommendation. 16 tools integrated.",
        result: "Median cycle time fell from 11 business days to 38 hours. Rework rate fell from 8% to 1.4%. 47% of claims auto-approved. Adjuster capacity freed for complex claims. Customer NPS rose 14 points citing 'faster, more transparent process'.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Goal-Driven Agents vs. Workflow Automation vs. Chatbots",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your goal complexity, reasoning requirement, integration depth, and team size. Many clients run goal-driven agents alongside workflow automation; the two patterns complement each other. See our <a href=\"/services/ai/llm\">large language model deployment</a> page for the inference-layer foundation that powers most production agents.",
    ],
    tables: [
      {
        title: "Goal-driven agents vs. workflow automation vs. chatbots vs. in-house build",
        headers: ["Dimension", "Chatbot + function calling", "Workflow automation", "In-house build", "ClickTake Agent System"],
        rows: [
          ["Goal-driven (not flow-driven)", "partially", "no", "yes", "yes"],
          ["Picks own path through tools", "partially", "no", "yes", "yes"],
          ["Persistent memory across sessions", "no", "no", "maybe", "yes"],
          ["Time to production", "yes:2–4 weeks", "yes:1–3 weeks", "no:6–12 months", "yes:8–16 weeks"],
          ["Handles unstructured input", "yes", "no", "yes", "yes"],
          ["Adapts when tools fail", "no", "no:Breaks silently", "yes", "yes:Agent re-plans"],
          ["Human-in-the-loop checkpoints", "no", "partially", "yes", "yes:LangGraph interrupts"],
          ["Trace observability", "no", "no:Basic logs", "maybe", "yes:LangSmith/Langfuse"],
          ["Cost at 10K goals/mo", "yes:$600–$2K", "yes:$1K–$4K", "yes:$3K + 2 FTEs", "yes:$1.2K–$3.5K"],
          ["Best for", "Q+A with side effects", "Fixed glue, 2–3 step flows", "Teams with 6+ ML engineers", "Open-ended goal pursuit"],
        ],
      },
      {
        title: "Agent pattern selection — when to use what",
        headers: ["Pattern", "Best for", "Typical step count", "Cost per goal"],
        rows: [
          ["ReAct", "Short goals, next step depends on previous result", "3–10 steps", "$0.03–$0.20"],
          ["Plan-and-execute", "Long goals, expensive to replan at every step", "10–40 steps", "$0.10–$0.55"],
          ["Reflexion", "Goals where first attempt is close-but-wrong (code, SQL, drafts)", "Variable (with retries)", "$0.08–$0.40"],
          ["Multi-agent (CrewAI)", "Goals with distinct cognitive phases (research → draft → review)", "Variable", "$0.15–$0.70"],
          ["Single-tool with LLM routing", "Triage/classification goals", "1–2 steps", "$0.01–$0.05"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Goal Completion, Labor, Quality & Velocity",
    intro: [
      "AI agent systems earn their budget back through four mechanisms: goal completion (autonomous resolution of work that would otherwise need a human), labor cost reduction (automating cognitive work humans currently do), quality lift (agents apply rules consistently without fatigue), and velocity (goals complete in minutes instead of days). The numbers below are aggregated across 37 production deployments shipped 2024–2026.",
    ],
    metrics: [
      { value: "91%", label: "Avg. goal completion rate", description: "Goals completed autonomously without human intervention, measured post-pilot." },
      { value: "$0.28", label: "Avg. cost per goal", description: "Blended cost across model calls, tool execution, memory retrieval, and infrastructure." },
      { value: "27h", label: "Avg. hours saved per user per week", description: "Across the automated goal class, measured against pre-deployment baseline." },
      { value: "4.2x", label: "Avg. throughput lift", description: "Goals completed per day vs. manual baseline, driven by 24/7 operation and parallelism." },
    ],
    body: [
      "Goal completion rate is the headline metric and the one we commit to in SLAs. 91% means 91 of every 100 goals complete without a human needing to step in — the agent reads the goal, picks a path, calls tools, handles failures, and delivers the outcome. The 9% that need human intervention are not failures; they are by-design escalations to a human reviewer for irreversible actions, edge cases the eval suite flagged as high-risk, or goals the agent correctly identifies as out of scope. The point is not 'no human in the loop'; the point is 'human in the loop only where human judgement adds value'.",
      "Labor cost reduction is the most measurable impact and typically funds the engagement. A 12-person SDR team spending 18 hours/week on manual prospect research saves 216 hours/week — at $45/hour fully-loaded SDR cost, that is $9,720/week, or $505K/year. The agent system that delivers this costs $140K–$240K to build and $2K–$5K/month to operate. The payback period is 3–6 months. Compliance-review and IT-helpdesk use cases show similar economics: a 10-person Tier-1 team automating 50% of routine goals saves 1,000+ hours/month.",
      "Quality and velocity are the impact categories most often missed in the original business case — until the first quarter-end where the agent ran 24/7 and the team didn't. Compliance review cycle time falling from 9 business days to 14 hours converts to measurable risk reduction: marketing pieces ship on time, fact sheets reach advisors before client meetings, and the compliance team shifts from reactive review to proactive rule-book monitoring. For claims-adjudication use cases, the 11-day to 38-hour cycle-time reduction converts directly to customer NPS lift (14 points) and measurable churn reduction on the policyholder base. Read our 'Measuring Agent ROI: Beyond Cost Savings' guide in /resources for the full framework.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "AI agent systems sit inside your SaaS stack, your identity provider, your data warehouse, and your communication tools. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before. We expose internal tools via MCP servers so they're reusable across agents and models.",
    ],
    categories: [
      {
        name: "CRM & sales",
        items: ["Salesforce (Sales Cloud, Service Cloud)", "HubSpot (CRM, Marketing, Service)", "Pipedrive", "Zoho CRM", "Microsoft Dynamics 365", "Clearbit / ZoomInfo (enrichment)", "LinkedIn Sales Navigator", "Apollo.io / Outreach.io"],
      },
      {
        name: "Communication & collaboration",
        items: ["Gmail / Google Workspace", "Microsoft Outlook / 365", "Slack", "Microsoft Teams", "Intercom", "Zendesk", "Front", "Twilio (SMS, WhatsApp, Voice)"],
      },
      {
        name: "Project, docs & engineering",
        items: ["Jira / Jira Service Management", "Linear", "Asana / Monday.com", "Notion / Confluence", "GitHub / GitLab / Bitbucket", "ServiceNow", "PagerDuty / Opsgenie", "Sentry / Datadog"],
      },
      {
        name: "Finance, data & identity",
        items: ["Stripe / Chargebee / Recurly", "QuickBooks / Xero / NetSuite", "Snowflake / BigQuery / Databricks", "PostgreSQL / MySQL / MongoDB", "Auth0 / Okta / Microsoft Entra ID", "AWS Cognito / Google Identity", "Segment / RudderStack", "Vercel / Cloudflare (deployments)"],
      },
      {
        name: "Memory & observability",
        items: ["Postgres + pgvector (episodic/semantic memory)", "Pinecone / Qdrant (long-term vector)", "Redis (working memory)", "LangSmith / Langfuse (traces + evals)", "Braintrust (eval harness)", "Helicone (model cost monitoring)", "Sentry (application errors)", "Datadog (infrastructure)"],
      },
    ],
    compliance: ["GDPR", "UK GDPR", "EU AI Act readiness assessment", "HIPAA (with BAAs)", "SOC 2 Type II", "ISO 27001", "PCI DSS (scoped)", "FCA-aligned audit trail (financial services)", "Audit trail retention (24+ months)", "Per-tool rate limiting & budget caps"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Agent Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "UK wealth-management platform, £4.2B AUM, regulated by the FCA",
        situation: "The compliance team manually reviewed 1,400 marketing pieces per quarter (fact sheets, client emails, social posts, website updates) against FCA rules including COBS 4, 4.5A, 4.10A and the consumer duty rules. End-to-end review took 9 business days. 6% of pieces shipped with undetected compliance issues, surfaced either by the FCA or by post-distribution customer complaints. The compliance team (8 FTEs) was at capacity; forecast headcount need: +3 FTEs within 18 months to keep pace with marketing volume growth.",
        task: "Build an agent system that pre-reviews every marketing piece against the FCA rulebook, flags violations with specific rule citations, and either approves (low-risk pieces) or routes to a human reviewer with a structured findings report. Target: cut review cycle time to under 3 business days and reduce undetected issue rate to under 2%.",
        action: "ClickTake built a plan-and-execute agent in LangGraph triggered by marketing-piece submission in the content workflow tool. The agent retrieved relevant FCA rulebook paragraphs from a vector index of 8,400 paragraphs (embedded with text-embedding-3-large), evaluated the piece against specific rules, and emitted a structured findings report with rule citations, severity levels, and suggested edits. We integrated 11 tools: content_workflow_fetch_piece, fca_rulebook_semantic_search, fca_rulebook_structured_lookup, internal_policy_search, marketing_team_slack_notify, compliance_team_slack_notify, content_workflow_approve, content_workflow_reject, content_workflow_request_changes, audit_log_append, and memory_retrieve_past_pieces. Llama Guard 3 ran on input to detect prompt-injection attempts in user-submitted marketing copy. The agent operated in shadow mode for 6 weeks (findings reviewed by humans before any action) before going live.",
        result: "Review cycle time fell from 9 business days to 14 hours. Undetected issue rate fell from 6% to 0.8% — the agent surfaced 23 issues in the first 3 months that the human review process had been missing, including 4 consumer-duty disclosures that would have triggered FCA review. 47% of pieces auto-approved (low-risk, standardised templates). Compliance team reallocated 4 FTEs from review to proactive rule-book monitoring and consumer-duty horizon scanning. FCA-skilled-person review (s166) in the 12 months post-launch: zero findings on marketing-distribution controls. Forecast +3 FTE hires cancelled — £412K/year avoided.",
        quote: {
          text: "I expected the agent to flag obvious rule violations. I didn't expect it to surface consumer-duty issues our senior reviewers were missing. The agent reads the rulebook more carefully than we do — and it doesn't get tired on a Friday afternoon.",
          author: "Head of Compliance",
          title: "UK wealth-management platform",
        },
      },
      {
        client: "B2B SaaS company, 8K customers, ~$40M ARR, 22-person SDR team",
        situation: "Inbound leads arrived from 3 sources (Marketo web forms, LinkedIn Lead Gen, Zoom webinar registrations), each in a different tool. SDRs spent 18 hours/week per rep manually exporting, deduplicating, enriching, and uploading to HubSpot, then manually enrolling in the appropriate email sequence. Lead-to-first-touch time averaged 6.2 hours; 14% of leads never made it into the CRM (lost in the export-import gap). SQL conversion rate: 11%.",
        task: "Build an autonomous SDR agent that captures leads from all 3 sources, enriches and qualifies them, drafts personalised outreach citing trigger events, and enrolls in the appropriate sequence — without SDR manual work for routine leads, and with confirmation gates for high-value prospects. Target: cut lead-to-first-touch to under 15 minutes and lift SQL conversion rate to 14%+.",
        action: "ClickTake built a multi-agent system in CrewAI triggered by webhooks from Marketo, LinkedIn Lead Gen, and Zoom. A researcher agent gathered prospect context (LinkedIn, Crunchbase, NewsAPI, company website), an analyst agent identified 2–3 trigger events (funding round, leadership change, product launch, hiring surge), a writer agent drafted a personalised email citing the triggers, an editor agent polished tone. We integrated 18 tools including hubspot_create_contact, hubspot_update_deal, hubspot_enroll_sequence, clearbit_enrich, linkedin_sales navigator_fetch, crunchbase_fetch_company, newsapi_search, gmail_send_email (with confirmation gate for prospects above $50K ACV), slack_notify_rep, and 9 internal lookup tools. Llama Guard 3 ran on input to detect prompt-injection attempts in lead-submitted free-text fields. The agent deployed behind a feature flag with A/B routing (10% agent, 90% manual) for 3 weeks before full rollout.",
        result: "Lead-to-first-touch time fell from 6.2 hours to 4 minutes. CRM capture rate rose from 86% to 99.4%. SDR manual-research time dropped from 18 hours/week to 1.5 hours/week per rep — saving 22 × 16.5 = 363 hours/week across the team, equivalent to 9.1 FTEs. SQL conversion rate rose from 11% to 13.4% due to faster, more consistent, trigger-relevant follow-up. Two SDRs reallocated to enterprise outbound. Annualised labor savings: $1.4M. Annualised pipeline lift from faster follow-up: $3.2M in incremental ARR. Read the <a href=\"/case-studies/autonomous-sdr-agent\">full autonomous SDR agent case study</a>.",
        quote: {
          text: "We were about to hire 4 more SDRs to handle lead volume. Instead we hired zero, reallocated 2 to enterprise, and our SQL conversion went UP. The agent isn't replacing the team — it's letting us grow without growing headcount.",
          author: "VP of Sales",
          title: "B2B SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Foundations",
        questions: [
          {
            q: "What is an AI agent?",
            a: "An AI agent is an autonomous software system built on a large language model that pursues a goal through a self-directed loop of reasoning, tool use, and observation. Unlike workflow automation, which executes a fixed sequence of steps, an AI agent chooses its own path through available tools to reach the goal, adapting when tools fail, when inputs are unexpected, or when intermediate results change the optimal route. The distinction from a chatbot with function calling is memory (agents persist context across sessions) and goal-driven behaviour (agents pick the path; chatbots respond to single turns).",
          },
          {
            q: "What's the difference between an AI agent and AI automation?",
            a: "AI automation is workflow-driven: a fixed trigger fires, the system runs a predefined sequence of steps, the outcome is deterministic. AI agents are goal-driven: the agent is given a goal and picks its own path through tools to reach it, adapting when tools fail or inputs surprise it. Automation is the right choice when the workflow is well-understood and stable; agents are the right choice when the path to the goal varies per case (compliance review, sales outreach, claims adjudication). Many clients run both — agents for the open-ended work, automation for the fixed glue.",
          },
          {
            q: "When is an agent the wrong answer?",
            a: "Three cases: (1) when the workflow is fixed and stable — use automation, not agents, and save 60% on build cost; (2) when the task is single-turn (Q+A, simple lookup) — use a chatbot, not an agent; (3) when the cost of a wrong action is catastrophic and irreversible (life-safety, large financial transfers) — use a deterministic system with human approval, not an autonomous agent. We will tell you honestly if your use case is the wrong fit for an agent — we'd rather lose the engagement than ship a system that shouldn't be an agent.",
          },
        ],
      },
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a production AI agent system cost to build?",
            a: "Build cost ranges from $80K (single-goal agent with 8–12 tools, basic memory, standard guardrails) to $380K (multi-goal multi-agent system, 20+ tools, full memory layer, audit-trail compliance, and 6-month managed SLA). The dominant cost drivers are: number of distinct goal classes, SaaS integration depth (each integration is 1–3 days of work), memory layer complexity, guardrail and audit-trail requirements, and model hosting strategy. We provide a fixed quote after the 2-week discovery phase.",
          },
          {
            q: "What is the typical timeline from kickoff to production?",
            a: "8–16 weeks. Single-goal agents ship in 8–10 weeks. Multi-goal multi-agent systems take 12–16 weeks. The 6-phase lifecycle is: Discovery (2 weeks), Tool Layer + Memory (2 weeks), Agent Architecture + Eval (3 weeks), Pilot + Tuning (4 weeks), Full Launch (2 weeks), Continuous Eval (ongoing). We will not skip pilot — it is where the agent goes from 75% to 91% completion rate.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $1.5K (low-volume single-goal agent on managed APIs) to $11K (high-volume multi-agent system with self-hosted models, full memory layer, and managed SLA). Managed SLA from ClickTake adds $4K–$10K/month depending on goal count, traffic volume, and on-call coverage. Most clients start with managed SLA and migrate to self-operation after 6–12 months.",
          },
        ],
      },
      {
        name: "Technical & Architecture",
        questions: [
          {
            q: "Which agent framework should we use — LangGraph, CrewAI, Claude Agent SDK, or OpenAI Assistants?",
            a: "LangGraph is our default for any agent with 3+ steps, multi-step plans, or human-in-the-loop checkpoints (most production agents). CrewAI for multi-agent role-based goals (research → draft → review). Claude Agent SDK for goals that benefit from Claude's stronger refusal behaviour and 200K context (compliance, legal, long-document analysis). OpenAI Assistants for single-model, simple-state agents on GPT-4o. We are framework-agnostic — we select per goal class based on state requirements, multi-agent needs, model preference, and team familiarity.",
          },
          {
            q: "How does the memory layer actually work?",
            a: "Three memory types. Episodic: past interactions stored as embeddings + structured fields in Postgres + pgvector — retrieved by semantic similarity and filtered by customer, date, topic. Semantic: facts the agent has learned ('Acme uses Salesforce, 480 employees, monthly billing') stored as structured records. Procedural: learned procedures ('to refund a Stripe charge, first verify < 90 days, then issue, then log') stored as templated workflows. The agent retrieves relevant memories at the start of each goal and writes new memories at goal completion. Memory store grows over time — the agent at month 6 is materially better than at month 1 because it has accumulated context.",
          },
          {
            q: "What is your typical goal completion rate?",
            a: "91%+ on production agents after pilot tuning. The exact rate depends on goal complexity: simple routing goals hit 96%+; complex multi-step goals with unstructured input run 85–93%; goals requiring external human systems (e.g. waiting for a prospect to reply) hit 82–90% on the autonomous portion. We commit to a completion-rate target in the engagement letter and measure it monthly. Agents that miss target for 2 consecutive months trigger a free tuning sprint.",
          },
          {
            q: "What happens when an agent fails mid-goal?",
            a: "Three things, in order: (1) LangGraph's checkpoint serialises state at every step, so the goal resumes from the last checkpoint on retry; (2) for tool failures (API timeout, rate limit), the agent retries 3 times with exponential backoff before re-planning; (3) for unrecoverable failures, the goal routes to a human with full trace (what the agent did, where it failed, what it was trying to do next). Mean time to recovery on failed goals: 6 minutes (auto-retry) or 14 minutes (human takeover).",
          },
        ],
      },
      {
        name: "Security & Compliance",
        questions: [
          {
            q: "How do you prevent the agent from doing something destructive?",
            a: "Four layers: (1) confirmation gates on every irreversible action (send email, issue refund, deploy code, grant sensitive access, modify customer record) — the agent drafts the action, a human approves, the agent executes; (2) per-tool rate limiting (max 10 emails per minute, max 5 refunds per hour) prevents runaway agents; (3) per-goal budget caps (max $50 in model + tool cost before pause) prevent a confused agent from burning $500 in 10 minutes; (4) cycle detection breaks loops where the agent calls the same tool with the same arguments 3 times in a row. For compliance-sensitive deployments, we add a fifth layer: a separate 'policy guardrail' LLM that reviews the planned action before execution.",
          },
          {
            q: "Are you GDPR / HIPAA / SOC2 / FCA-compliant?",
            a: "We architect for all four. HIPAA: self-hosted Llama 3.1 agent deployments inside HIPAA-scoped VPCs with BAAs in place with AWS, OpenAI and Anthropic. GDPR / UK GDPR: EU data residency via self-hosted deployments in eu-west regions; right-to-be-forgotten implemented in agent state, memory, and trace storage. SOC2 Type II: ClickTake's operations are SOC2-aligned; the audit trail (every action, every reasoning step, every tool call) is the SOC2 evidence. FCA: we have shipped agent systems into FCA-regulated wealth-management platforms; the audit trail and confirmation-gate pattern are designed to satisfy FCA-skilled-person review (s166).",
          },
          {
            q: "How do you stop prompt-injection attacks in unstructured inputs?",
            a: "Llama Guard 3 on input catches 94% of prompt-injection attempts in our test suite. The agent's system prompt explicitly treats user-supplied data (lead-submitted free text, ticket body, email content, marketing copy) as untrusted data, not instructions. Output guardrails scan the agent's planned action for policy violations before execution. For high-risk deployments (financial workflows, customer-facing actions, compliance review), we add a separate 'injection detector' LLM that flags suspicious user-input patterns the first guardrail might miss.",
          },
          {
            q: "Where is agent state, memory, and trace data stored?",
            a: "Agent state (checkpoints), memory (episodic, semantic, procedural), and trace data (LangSmith or self-hosted Langfuse) are stored in your Postgres or a ClickTake-managed tenancy on AWS RDS, with row-level security. Self-hosted deployments store everything inside your VPC — no data leaves your network. API-based deployments use OpenAI/Anthropic zero-retention contract terms. Retention period is configurable per goal class; default is 24 months for audit purposes, then automatic deletion. PII in traces is redacted at logging time via the input guardrail layer.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Ship an Agent System That Actually Pursues Goals?",
    subtitle:
      "Book a free 30-minute strategy call. We will map one of your existing manual workflows end-to-end, identify which goal classes an agent can take over, and tell you honestly whether an AI agent system is the right answer — or whether a simpler tool (workflow automation, a chatbot, a process fix, a headcount addition) would do the job at lower cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min strategy call",
        description: "Free. No deck. Send us one goal class in advance; we will map it live on the call and identify agent candidates.",
      },
      {
        step: "2",
        title: "2-week discovery phase",
        description: "$8K fixed. We audit your goal classes, prototype the agent in a sandbox, run a 50-case eval, and quote the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, completion-rate SLA — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Strategy Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Agent Eval Framework", href: "/resources", variant: "outline" },
  },
}
