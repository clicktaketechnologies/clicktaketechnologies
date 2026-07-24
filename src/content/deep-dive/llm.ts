import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/ai/llm — Custom LLM Solutions
 *
 * The pilot page for the 12-section "Ultimate Guide" blueprint.
 * ~3,200 words of dense, technical, anti-fluff content. Every paragraph
 * adds a specification, a benefit, or a logical transition — no
 * "cutting-edge" / "revolutionary" / "world-class" filler.
 */
export const llmDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "AI & Automation",
    title: "Custom LLM Solutions: Production-Grade Language Models Tuned to Your Domain",
    subtitle:
      "We design, fine-tune, evaluate and operate private LLM systems — built on GPT-4o, Claude 3.5, Llama 3.1 and Mistral — that run inside your security perimeter and meet your accuracy, latency and cost targets.",
    geoDefinition:
      "A custom LLM solution is a language-model system adapted to a specific business domain through fine-tuning, retrieval-augmented generation (RAG), prompt engineering, and evaluation harnesses. Unlike off-the-shelf API calls, a custom LLM is trained or conditioned on proprietary data, governed by access controls, and continuously measured against domain-specific accuracy benchmarks. ClickTake Technologies delivers custom LLM systems to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in PyTorch, vLLM, LangGraph and production MLOps.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free LLM Strategy Call", href: "/contact", variant: "orange" },
      { label: "Download the LLM Architecture Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "47", label: "LLM systems shipped" },
      { value: "92%", label: "Avg. eval accuracy" },
      { value: "<800ms", label: "P50 latency target" },
      { value: "SOC2", label: "Compliant hosting" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "AI & Automation", href: "/services/ai/llm" },
      { label: "Custom LLM Solutions" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Off-the-Shelf LLM APIs Fail in Production",
    intro: [
      "Most enterprises hit the same wall six to twelve weeks after their first ChatGPT API integration. The demo impressed the board, the prototype handled three test prompts correctly, and then production traffic exposed the gap between a general-purpose model and a domain-trained system. The failures follow predictable patterns — patterns that no amount of prompt tweaking or system-message engineering will close.",
      "The root cause is structural: public APIs are tuned for breadth, not depth. They have never seen your private contracts, your product SKUs, your compliance playbooks, or your customer history. They hallucinate not because they are broken, but because they are answering questions using a distribution that does not include your data.",
    ],
    painPoints: [
      {
        title: "Hallucinations on domain-specific facts",
        description:
          "Public models fabricate product specs, policy clauses and pricing because their training distribution does not include your proprietary corpus. Prompt-engineering workarounds push accuracy from ~70% to ~80% and then plateau; the remaining 20% requires actual grounding in your data.",
      },
      {
        title: "Data residency & privacy walls",
        description:
          "Sending customer PII, patient records or regulated financial data to a third-party API is a non-starter under GDPR, HIPAA, SOC2 and most enterprise procurement policies. You need a model that runs inside your VPC or a contractually-bounded tenancy — not a public endpoint.",
      },
      {
        title: "Unpredictable cost at scale",
        description:
          "Per-token pricing that looks trivial at 1K requests/day becomes the second-largest line item on your cloud bill at 1M requests/day. Without caching, routing and model-tiering, LLM spend grows faster than the revenue it generates.",
      },
      {
        title: "No eval harness, no improvement loop",
        description:
          "Teams ship prompts based on three vibe-checked examples, then have no way to know whether next week's model update regressed accuracy. Without an evaluation suite of 200+ domain-specific test cases, you are flying blind.",
      },
    ],
    paradigmShift: [
      "A custom LLM is not a single model — it is a system. The model is one component alongside a retrieval layer, a guardrail layer, an eval harness, an observability stack and a routing policy. We engineer all six as a coherent whole, then operate it under an SLA. The deliverable is not a prompt; it is a measurable, monitorable, cost-bounded production service that improves month over month.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Custom LLM Solution?",
    intro: [
      "A custom LLM solution is a stack of cooperating components, not a single fine-tuned model. Understanding each layer — and choosing the right one for your use case — is the difference between a system that ships in 8 weeks and one that bleeds budget for 18 months without reaching production.",
    ],
    subsections: [
      {
        heading: "The base model: choosing the right starting point",
        body: [
          "Base model selection is the highest-leverage decision in any LLM project. We start from the model family whose strengths match the task: GPT-4o and Claude 3.5 Sonnet for general reasoning and long-context synthesis; Llama 3.1 70B and Mistral Large for self-hosted deployments where data residency is non-negotiable; specialized models like Qwen2.5-Coder for code generation and DeepSeek-R1 for chain-of-thought reasoning at lower cost.",
          "The choice is rarely binary. Production systems use 2–4 models simultaneously, routing each request to the cheapest model that meets the accuracy bar for that query type. A typical routing policy sends 60% of traffic to a small fast model, 30% to a mid-tier model, and 10% to a frontier model — cutting cost by 4–7x versus a single-model deployment.",
        ],
        jargon: [
          { term: "Context window", def: "The maximum number of tokens (roughly ¾ of a word) a model can ingest in a single request. GPT-4o and Claude 3.5 support 128K–200K tokens; Llama 3.1 supports up to 128K; smaller open models often cap at 8K–32K." },
          { term: "Temperature", def: "Sampling parameter (0.0–2.0) controlling randomness. 0 = deterministic, 1 = default, >1 = increasingly random. Production systems typically run 0.0–0.3 for factual tasks and 0.7–0.9 for creative tasks." },
          { term: "Function calling / tool use", def: "A model's ability to emit structured JSON that triggers external APIs (database queries, calculators, search). Enables LLMs to act, not just talk." },
        ],
      },
      {
        heading: "Fine-tuning vs. RAG vs. prompt engineering",
        body: [
          "These are not competing approaches — they are complementary layers that solve different failure modes. Prompt engineering handles structure and tone: 'respond in this JSON schema, cite your sources, refuse politely.' It is cheap, fast, and reverses instantly. RAG handles knowledge: it retrieves the right documents from your corpus and grounds the model's response in them. It is the correct fix for hallucinations on facts the model has never seen.",
          "Fine-tuning handles behavior and style: it teaches the model to respond in your brand voice, follow your internal procedures, or emit code in your team's preferred patterns. It is the heaviest investment — requires 500–10,000 labeled examples, a training run, and an evaluation pipeline — but it produces the largest quality lift for tasks where the model must do something the base model cannot do.",
          "Most production systems use all three. Prompt engineering gets you 70% of the way in a week. RAG gets you to 90% in a month. Fine-tuning closes the final 10% for tasks where the gap is behavioral, not informational.",
        ],
        jargon: [
          { term: "LoRA", def: "Low-Rank Adaptation — a fine-tuning technique that trains only a small adapter (typically 0.1–2% of model parameters) instead of the full model. Cuts training cost 10x and lets you hot-swap behavior at inference time." },
          { term: "Embedding", def: "A vector representation of text (typically 768–3072 dimensions) that captures semantic meaning. Used to retrieve relevant documents from a vector store before the LLM generates a response." },
          { term: "Reranking", def: "A second-stage model that re-scores the top 20–50 retrieved documents for relevance, typically lifting retrieval precision by 15–25% over raw vector search." },
        ],
      },
      {
        heading: "Inference: serving the model in production",
        body: [
          "An LLM that runs in a Jupyter notebook is not the same as an LLM that serves 200 concurrent users under a 1.5-second latency SLA. Production inference requires vLLM or TGI for batched KV-cache sharing across requests, continuous batching to keep GPU utilization above 70%, and quantization (FP8 or AWQ) to fit a 70B model on a single 80GB A100 instead of two.",
          "Self-hosted deployments run on NVIDIA A10G, L4, A100 or H100 GPUs — either in your own VPC, in a ClickTake-managed tenancy on AWS/GCP/Azure, or on Cloudflare Workers AI for edge inference. API-based deployments use OpenAI, Anthropic, Google Vertex AI or AWS Bedrock, with fallback routing across providers to eliminate single-vendor risk.",
        ],
      },
      {
        heading: "Evaluation: the missing discipline",
        body: [
          "An LLM without an evaluation harness is unmeasurable software. We build every custom LLM with a minimum of 200 domain-specific test cases — drawn from real production logs, synthetic edge cases, and adversarial red-team prompts. Each test case asserts on factual accuracy (does the answer match the source document?), refusal behavior (does the model correctly decline out-of-scope questions?), format compliance (does the JSON validate?), and latency (P50 and P95).",
          "The eval suite runs on every model upgrade, every prompt change, and every fine-tune iteration. A change that scores 89.2% on the suite ships; a change that scores 88.7% does not. This is the difference between LLM systems that improve over time and LLM systems that drift silently.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our LLM stack is opinionated and battle-tested across 47 production deployments. Every component below has been selected because it survived a real production incident — not because it was the newest release on Hacker News.",
    ],
    categories: [
      {
        name: "Models",
        items: [
          { name: "GPT-4o / GPT-4 Turbo", description: "OpenAI frontier models for highest-quality reasoning, multimodal vision tasks, and 128K-context synthesis." },
          { name: "Claude 3.5 Sonnet / Opus", description: "Anthropic models for long-document reasoning, code generation, and 200K-context use cases. Best-in-class for refusals and safety." },
          { name: "Llama 3.1 70B / 405B", description: "Meta's open-weights models for self-hosted deployments. Run on your GPUs inside your VPC under your data residency rules." },
          { name: "Mistral Large / Mixtral 8x22B", description: "European open-weights models with strong multilingual support — preferred for GDPR-heavy EU deployments." },
          { name: "Qwen2.5-Coder / DeepSeek-R1", description: "Specialized models for code generation and chain-of-thought reasoning at 3–5x lower cost than frontier alternatives." },
        ],
      },
      {
        name: "Frameworks",
        items: [
          { name: "LangGraph", description: "Stateful, cyclic agent orchestration. Used for multi-step workflows where the LLM decides the next action." },
          { name: "LlamaIndex", description: "RAG-focused framework with best-in-class chunking, retrieval and citation primitives." },
          { name: "Instructor / Outlines", description: "Structured-output libraries that guarantee JSON schema compliance using constrained decoding." },
          { name: "DSPy", description: "Programmatic prompt optimization — compiles declarative signatures into tested prompts via automated search." },
          { name: "vLLM / TGI", description: "High-throughput inference servers with PagedAttention for 5–15x baseline throughput on the same GPU." },
        ],
      },
      {
        name: "Infrastructure",
        items: [
          { name: "Vector stores: pgvector / Qdrant / Pinecone", description: "Postgres-native (pgvector) for <10M vectors; Qdrant for 10M–1B; Pinecone for fully-managed scale-out." },
          { name: "NVIDIA A100 / H100 / L4", description: "GPU SKUs sized per model. 70B models need 2× A100 80GB; 8B models run on a single L4 for ~$0.50/hour." },
          { name: "Ray / Modal / Replicate", description: "Compute platforms for distributed training, batch inference, and elastic scale-out without managing Kubernetes." },
          { name: "LangSmith / Langfuse / Phoenix", description: "Observability platforms for tracing, evals and cost monitoring. We instrument every request end-to-end." },
          { name: "Cloudflare Workers AI / AWS Bedrock", description: "Serverless inference options for edge-deployed or fully-managed deployments without GPU ops." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Off-the-shelf API", "ClickTake Custom LLM"],
      rows: [
        ["Domain accuracy", "yes:~70% out of the box", "yes:90%+ after eval-driven tuning"],
        ["Data residency", "no:Vendor servers", "yes:Your VPC or contractually-bounded tenancy"],
        ["Cost predictability", "no:Per-token, unbounded", "yes:Routing + caching + budget caps"],
        ["Evaluation harness", "no:Manual spot-checks", "yes:200+ automated test cases"],
        ["Hallucination control", "no:Prompt-only", "yes:RAG + guardrails + citations"],
        ["Latency SLA", "no:Best-effort", "yes:<800ms P50, <2s P95"],
        ["Audit logging", "no:Limited", "yes:Every request + response logged"],
        ["Compliance", "no:Variable", "yes:GDPR, HIPAA, SOC2 ready"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship custom LLM systems in 8–14 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint reviews' where the team shows a Jupyter notebook.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Success Criteria",
        duration: "Week 1–2",
        deliverables: ["Use case brief", "Eval rubric (200+ cases)", "Architecture proposal", "Cost model"],
        description:
          "We map the specific decision the LLM must make, the data it must ground on, the failure modes that are acceptable and those that are not. We draft the evaluation rubric before writing a line of code — because the rubric defines 'done' for the entire engagement. We model cost per 1K requests, monthly run-rate at projected volume, and the break-even point versus your current solution.",
      },
      {
        phase: "Phase 2",
        title: "Data Engineering & Corpus Build",
        duration: "Week 2–4",
        deliverables: ["Cleaned corpus", "Chunking strategy", "Vector index", "Synthetic eval set"],
        description:
          "We ingest your documents (PDFs, Notion, Confluence, Slack history, ticketing system, product database), clean them (OCR, dedup, PII redaction), chunk them with a strategy matched to your query patterns (recursive, semantic, or sentence-window chunking), and embed them into a vector store. We also generate synthetic test cases from your corpus to bootstrap the eval suite.",
      },
      {
        phase: "Phase 3",
        title: "RAG + Prompt Architecture",
        duration: "Week 4–7",
        deliverables: ["Retrieval pipeline", "Prompt system", "Guardrail layer", "Eval scores"],
        description:
          "We build the retrieval pipeline (hybrid search + reranker), the prompt system (system message, few-shot examples, tool definitions), and the guardrail layer (PII detection, jailbreak refusal, output schema validation). The eval suite runs daily. By end of week 7, the system typically scores 85–90% on the rubric — the threshold for entering production hardening.",
      },
      {
        phase: "Phase 4",
        title: "Fine-Tuning (If Required)",
        duration: "Week 7–10",
        deliverables: ["LoRA adapter", "Fine-tune report", "Regression eval", "A/B test plan"],
        description:
          "Fine-tuning is engaged only if the gap between RAG-only accuracy and the target accuracy is behavioral (style, format, procedure) rather than informational. We use LoRA for efficiency: training a 70B model costs ~$200 in GPU hours on a single A100, versus $5K–$20K for a full fine-tune. The fine-tuned adapter is A/B tested against the base model on production traffic before promotion.",
      },
      {
        phase: "Phase 5",
        title: "Production Deploy & Operations",
        duration: "Week 10–14",
        deliverables: ["Deployed service", "SLA config", "Dashboards", "Runbook", "On-call rotation"],
        description:
          "We deploy behind a load balancer with autoscaling, set up latency and cost dashboards in LangSmith/Langfuse, write the incident runbook, and either operate the system under a managed SLA or hand off to your team with a 4-week shadow-operations period. Post-launch, we run a monthly eval review and a quarterly model-upgrade review.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Custom LLMs Compound Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2023 and 2026. Each card describes the specific business problem, the application we built, and the measurable result — not aspirational AI hype.",
    ],
    cases: [
      {
        industry: "Healthcare & Telemedicine",
        problem: "Clinicians spend 90+ minutes per day writing visit notes, delaying chart updates and burning out staff.",
        application: "A HIPAA-compliant LLM that ingests the consultation transcript (with patient consent) and drafts a structured SOAP note grounded in the patient's chart, ICD-10 codes and the clinic's documentation policy.",
        result: "Note-writing time dropped from 11 minutes to 2.5 minutes per visit; clinician satisfaction scores rose 38%.",
      },
      {
        industry: "B2B SaaS Support",
        problem: "Tier-1 support tickets take 4–6 hours to resolve because agents must read docs, reproduce the issue, and draft a reply — most of which is repetitive.",
        application: "A RAG-grounded assistant that reads the ticket, retrieves the relevant docs and past ticket resolutions, and drafts a reply the agent approves. Resolved-without-human rate is tracked as the primary KPI.",
        result: "42% of tickets auto-resolved; average handle time on the rest fell from 4.2h to 1.1h.",
      },
      {
        industry: "Legal & Compliance",
        problem: "Contract review by junior associates takes 6–14 hours per contract; miss-rate on non-standard clauses runs 8–12%.",
        application: "A private LLM (Llama 3.1 70B, self-hosted in the firm's VPC) fine-tuned on the firm's clause library. Reviews NDA, MSA and SOW contracts against a 47-point checklist with citations to the source clause.",
        result: "First-pass review time dropped to 22 minutes; miss-rate on flagged clauses fell to under 2%.",
      },
      {
        industry: "E-commerce Operations",
        problem: "Merchandisers spend hours writing product descriptions for 200+ SKUs per week; quality is inconsistent and SEO performance varies 5x across the catalog.",
        application: "A fine-tuned model that ingests the product spec sheet, brand voice guide and top-ranking competitor copy, then emits a description optimized for the brand's target keyword cluster. Every output is grounded in the spec sheet to prevent hallucinated features.",
        result: "Catalog enrichment throughput 6x higher; organic search impressions up 73% across enriched SKUs.",
      },
      {
        industry: "Financial Services",
        problem: "Analysts compile quarterly market briefings by reading 200+ research reports; the briefing takes 3 days and is stale by the time it lands.",
        application: "A RAG system that ingests subscribed research feeds, news and internal notes, then synthesizes a 4-page briefing with citations. Each section is grounded in specific source documents the analyst can click through to verify.",
        result: "Briefing turnaround fell from 3 days to 4 hours; analysts shifted from compilation to analysis.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Custom LLM vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your data sensitivity, accuracy requirement, volume, and team size.",
    ],
    tables: [
      {
        title: "Custom LLM (ClickTake) vs. Off-the-shelf API vs. No-code LLM builder vs. In-house build",
        headers: ["Dimension", "Off-the-shelf API", "No-code builder", "In-house build", "ClickTake Custom LLM"],
        rows: [
          ["Time to production", "yes:1–2 weeks", "yes:2–4 weeks", "no:6–12 months", "yes:8–14 weeks"],
          ["Domain accuracy", "no:~70%", "no:~75%", "yes:90%+", "yes:90%+"],
          ["Data residency", "no", "no", "yes", "yes"],
          ["Eval harness included", "no", "no", "maybe", "yes"],
          ["Ongoing ops burden", "yes:Low", "yes:Low", "no:High", "yes:Optional managed SLA"],
          ["Cost at 1M req/mo", "yes:$8K–$30K", "yes:$5K–$20K", "yes:$3K–$10K + 2 FTEs", "yes:$2K–$8K"],
          ["Vendor lock-in", "no:High", "no:High", "yes:None", "yes:Low (open-weights option)"],
          ["Best for", "Demos, low-volume, low-stakes", "Internal tools, small teams", "Enterprises with 10+ ML engineers", "Production systems, 1–10M req/mo"],
        ],
      },
      {
        title: "RAG vs. Fine-tuning vs. Both — when to use what",
        headers: ["Failure mode", "RAG fixes it", "Fine-tuning fixes it", "Prompt engineering fixes it"],
        rows: [
          ["Hallucinated facts about your products", "yes", "no", "no"],
          ["Wrong tone or voice", "no", "yes", "partially"],
          ["Wrong output format (JSON schema)", "no", "yes", "yes"],
          ["Refuses queries it should answer", "no", "yes", "yes"],
          ["Does not follow internal procedures", "no", "yes", "partially"],
          ["Too slow (latency)", "no", "yes (smaller fine-tuned model)", "no"],
          ["Too expensive per request", "no", "yes (smaller model)", "yes (caching)"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROI, Cost Savings & Revenue Lift",
    intro: [
      "Custom LLM systems earn their budget back through one of three mechanisms: labor cost reduction (automating cognitive work that humans currently do), revenue lift (enabling a product feature that drives sales), or risk reduction (cutting the error rate on a regulated workflow). The numbers below are aggregated across 47 production deployments shipped 2023–2026.",
    ],
    metrics: [
      { value: "73%", label: "Avg. labor cost reduction", description: "On the automated workflow, measured against pre-deployment baseline." },
      { value: "4.2×", label: "Avg. throughput lift", description: "Workloads per FTE per day, after automation of the cognitive step." },
      { value: "<8mo", label: "Typical payback period", description: "Time to recover build + first-year run cost from realized savings." },
      { value: "$0.04", label: "Avg. cost per request", description: "Blended cost across model routing, caching and self-hosted tiers." },
    ],
    body: [
      "Labor cost reduction is the most measurable impact and typically funds the engagement. A 200-seat support team automating 40% of tier-1 tickets saves ~$1.4M per year in fully-loaded agent cost; the LLM system that delivers this costs $180K–$350K to build and $4K–$12K/month to operate. The payback period is 4–7 months.",
      "Revenue lift is harder to attribute but often larger. E-commerce clients deploying fine-tuned catalog enrichment models see 40–80% organic traffic growth on enriched SKUs over 6 months, which translates to revenue impact an order of magnitude larger than the cost savings. SaaS clients deploying in-product AI features (smart search, content generation, automated insights) consistently see expansion-revenue lift — features ship faster, win rates on demos rise, and net revenue retention improves.",
      "Risk reduction is the impact category most often ignored in the business case — until the first avoided incident. A legal-tech client's 2% miss-rate reduction on contract review translates to ~$3M/year in avoided liability exposure on their typical contract volume. A healthcare client's 95% ICD-10 coding accuracy (versus 78% pre-deployment) avoids denied claims worth ~$400K/year. These savings rarely appear on the original ROI spreadsheet; they show up in the year-two review.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Custom LLM systems do not live in isolation. They sit inside your existing data, application and security stack. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Data sources (RAG corpus)",
        items: ["PostgreSQL / MySQL / SQL Server", "Snowflake / BigQuery / Databricks", "SharePoint / OneDrive / Google Drive", "Confluence / Notion / Slack", "Zendesk / Intercom / Salesforce", "Jira / Linear / GitHub", "S3 / Azure Blob / GCS"],
      },
      {
        name: "Application integration",
        items: ["REST API (OpenAPI 3.1)", "GraphQL", "Webhook (Slack, Teams, Email)", "Zapier / Make.com", "n8n / Tray.io", "Native SDKs (JS, Python, Go)", "Salesforce Apex / HubSpot Workflows"],
      },
      {
        name: "Identity & access",
        items: ["OAuth 2.0 / OIDC", "SAML 2.0 SSO", "Auth0 / Okta / Clerk", "Microsoft Entra ID", "AWS IAM / Cognito", "Row-level security via Postgres RLS"],
      },
      {
        name: "Observability & ops",
        items: ["LangSmith / Langfuse / Phoenix", "Datadog / New Relic / Honeycomb", "OpenTelemetry", "Grafana / Prometheus", "PagerDuty / Opsgenie", "Cloudflare Workers Analytics"],
      },
    ],
    compliance: ["GDPR", "HIPAA", "SOC 2 Type II", "ISO 27001", "PCI DSS (scoped)", "EU AI Act readiness assessment"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Mid-sized UK healthcare provider (~180 clinicians)",
        situation: "Clinicians were spending 90+ minutes per day writing visit notes after hours, contributing to a 31% burnout rate and a 6-week backlog on chart updates. Existing EHR-integrated scribe tools were rejected by clinicians for inaccuracy on UK-specific clinical terminology.",
        task: "Build a private, HIPAA-compliant LLM scribe that drafts structured SOAP notes from consultation transcripts, grounded in the patient's chart and ICD-10 codes, with a clinician-approval workflow.",
        action: "ClickTake deployed a self-hosted Llama 3.1 70B model on AWS p4d instances inside a HIPAA-scoped VPC. We built a RAG pipeline over the EHR's FHIR API, fine-tuned the model on 3,400 de-identified historical notes, and integrated the approval workflow into the existing EHR via SMART-on-FHIR. The eval suite of 312 test cases ran nightly.",
        result: "Average note-writing time fell from 11 minutes to 2.5 minutes per visit. Chart-update backlog cleared in 4 weeks. Clinician satisfaction scores rose 38%. Denied-claims rate fell 22% due to more accurate ICD-10 coding. The system now processes 4,200 consultations per week.",
        quote: {
          text: "The first AI tool our clinicians actually thank us for. The notes are good enough to approve with minor edits — which I never expected from an LLM.",
          author: "Clinical Operations Director",
          title: "NHS-adjacent healthcare network",
        },
      },
      {
        client: "B2B SaaS company, 8K customers, ~$40M ARR",
        situation: "Tier-1 support handled 14,000 tickets/month with a 6.2-hour first-response time and 4.2-hour average handle time. CSAT was 78%. The product surface area was growing faster than the support team could scale.",
        task: "Reduce first-response time to under 30 minutes and lift CSAT to 85%+ without growing headcount — using an LLM assistant that agents collaborate with rather than a customer-facing chatbot.",
        action: "ClickTake built a RAG-grounded assistant on GPT-4o with fallback to Claude 3.5 for long-context tickets. The system reads the ticket, retrieves relevant docs and past resolutions, and drafts a reply the agent reviews. We deployed behind the existing Zendesk interface with a 4-week agent shadow period before full rollout. The eval suite tracked 247 ticket categories.",
        result: "42% of tickets auto-resolved without human action. Average handle time on the remaining tickets fell from 4.2 hours to 1.1 hours. First-response time dropped to 14 minutes. CSAT rose to 89%. The support team grew 0% while ticket volume grew 31% — the LLM absorbed the increase.",
        quote: {
          text: "We thought we'd need to hire 8 more agents this year. We hired zero. The assistant isn't replacing anyone — it's making everyone 3x faster.",
          author: "VP of Customer Experience",
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
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a custom LLM system cost to build?",
            a: "Build cost ranges from $80K (single-use-case RAG system on managed APIs) to $450K (multi-model, self-hosted, fine-tuned system with full observability stack and 6-month managed SLA). The dominant cost drivers are: model hosting strategy (API vs. self-hosted), fine-tuning requirement (none vs. LoRA vs. full), and integration depth into your existing stack. We provide a fixed quote after the 2-week discovery phase.",
          },
          {
            q: "What is the typical timeline from kickoff to production?",
            a: "8–14 weeks for most engagements. The 5-phase lifecycle is: Discovery (2 weeks), Data Engineering (3 weeks), RAG + Prompt Architecture (3 weeks), Fine-Tuning (3 weeks, if required), Production Deploy & Operations (4 weeks). Simple RAG-only systems ship in 8 weeks; fine-tuned self-hosted systems take the full 14.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $2K (low-volume API-based system with caching) to $18K (high-volume self-hosted system on 2× A100s with managed SLA). Managed SLA from ClickTake adds $4K–$10K/month depending on required response time and on-call coverage. We hand over to your team if you prefer to self-operate after the 4-week shadow period.",
          },
          {
            q: "Do you offer a free proof-of-concept?",
            a: "No — but the 2-week discovery phase ($8K fixed) produces an eval-scored RAG prototype on your data, an architecture proposal, and a fixed quote for the full engagement. Most clients treat discovery as a low-risk way to validate both the technical approach and our working relationship before committing to the full build.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "Which models do you support?",
            a: "OpenAI GPT-4o, GPT-4 Turbo, o1, o3-mini; Anthropic Claude 3.5 Sonnet, Opus, Haiku; Meta Llama 3.1 8B/70B/405B; Mistral Large, Mixtral 8x22B; Google Gemini 1.5 Pro/Flash; Qwen2.5-Coder; DeepSeek-R1. We are model-agnostic and route across multiple providers in production for resilience.",
          },
          {
            q: "Can the LLM run inside our own VPC?",
            a: "Yes. We deploy self-hosted Llama 3.1, Mistral or Qwen models on your AWS, GCP, Azure or on-prem GPU infrastructure. Data never leaves your network. We support NVIDIA A10G, L4, A100, H100 and AMD MI300X GPUs. API-based deployments (OpenAI, Anthropic, Bedrock) are used when data residency allows and cost/scale favors them.",
          },
          {
            q: "What is your typical latency profile?",
            a: "API-based deployments: P50 600–900ms, P95 1.5–2.5s. Self-hosted vLLM deployments on A100: P50 400–700ms, P95 1.0–1.8s. Latency depends on context length, output length and model size. We set and monitor explicit latency SLAs and tune via model routing (small model for fast queries, large model for complex queries).",
          },
          {
            q: "How do you handle context windows longer than the model supports?",
            a: "Three techniques, used in combination: (1) RAG retrieves only the relevant chunks instead of stuffing the entire context; (2) hierarchical summarization compresses long documents into a summary the model can reason over; (3) model routing sends long-context queries to models with larger windows (Claude 3.5 supports 200K tokens).",
          },
        ],
      },
      {
        name: "Security & Compliance",
        questions: [
          {
            q: "How do you prevent the LLM from leaking sensitive data?",
            a: "Four layers: (1) PII detection and redaction at ingestion and at inference time; (2) row-level security on the vector store, so the LLM only retrieves documents the requesting user is authorized to see; (3) output guardrails that scan the model's response for PII and policy violations; (4) full audit logging of every request and response for incident investigation.",
          },
          {
            q: "Are you GDPR / HIPAA / SOC2 compliant?",
            a: "We architect for all three. HIPAA: self-hosted deployments inside HIPAA-scoped VPCs with BAAs in place with AWS, OpenAI and Anthropic. GDPR: EU data residency via Mistral on EU GPU providers, or self-hosted in your EU region; DPAs available. SOC2 Type II: ClickTake's own operations are SOC2-aligned; we provide architecture documentation to support your SOC2 audit.",
          },
          {
            q: "What happens if a model vendor has an outage?",
            a: "Production systems deploy with multi-provider routing — typically OpenAI as primary, Anthropic as secondary, and a self-hosted Llama model as tertiary fallback. The router fails over automatically on 5xx errors or latency spikes. We have shipped systems with 99.9% uptime SLAs using this pattern.",
          },
          {
            q: "Do you train models on our data?",
            a: "Never. Your data is used only for retrieval (RAG) and for fine-tuning your private model. We do not share your data with base-model vendors for training — when using API providers, we enable their zero-retention contract terms. Your fine-tuned weights are your IP, deliverable as a LoRA adapter on request.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most client engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before discovery begins. All custom code, fine-tuned weights, prompts and evaluation suites built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the system under a managed SLA ($4K–$10K/month); (2) ClickTake hands off to your team after a 4-week shadow-operations period; (3) Hybrid — ClickTake handles escalations and quarterly model upgrades, your team handles day-to-day ops. Most clients start with option 1 and migrate to option 3 after 6–12 months.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Your Custom LLM?",
    subtitle:
      "Book a free 30-minute strategy call. We will diagnose your use case, sketch the architecture on a whiteboard with you, and tell you honestly whether a custom LLM is the right answer — or whether a simpler tool would do the job.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min strategy call",
        description: "Free. No deck. We diagnose your use case and tell you whether custom LLM is the right call.",
      },
      {
        step: "2",
        title: "2-week discovery phase",
        description: "$8K fixed. We build a scored RAG prototype on your data, write the eval rubric, and quote the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, and SLA — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Strategy Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the LLM Architecture Brief", href: "/resources", variant: "outline" },
  },
}
