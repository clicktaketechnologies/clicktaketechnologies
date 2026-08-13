'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2, Cloud, Brain, ShieldCheck,
  ArrowRight, Check, ArrowUpRight,
} from "lucide-react";
import { NxPageLayout, NxPageHero } from "../nx-page-layout";

/* SERVICES PAGE — "Full-spectrum engineering services" design.
 * Matches user-uploaded screenshot: hero, 4 horizontal-split service cards
 * (numbered icon + title + desc on left, STACK + DELIVERABLES on right),
 * 4-step process timeline, dual CTA banners.
 */
export function ServicesPage() {
  return (
    <NxPageLayout>
      {/* Hero */}
      <NxPageHero
        eyebrow="Engineering Services"
        title={
          <>
            Full-spectrum{" "}
            <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
              engineering
            </span>{" "}
            services.
          </>
        }
        subtitle="From the first whiteboard sketch to a 24/7 production command center, ClickTake owns the entire delivery lifecycle. We embed senior engineers (8+ yrs avg), ship every two weeks, and hand over an architecture your team can actually maintain."
      />

      {/* Service Cards */}
      <section className="py-20 px-4 lg:px-8" style={{ background: "#03000D" }}>
        <div className="mx-auto max-w-6xl space-y-6">
          {SERVICE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 hover:border-white/20 transition-all"
              >
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                  {/* Left: number + icon + title + desc */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl font-black text-white/20 font-mono">
                        {card.number}
                      </div>
                      <div
                        className="grid h-12 w-12 place-items-center rounded-xl"
                        style={{ background: card.iconBg }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{card.desc}</p>
                  </div>

                  {/* Right: STACK + DELIVERABLES */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[2px] text-white/40 mb-3">
                        Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {card.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[2px] text-white/40 mb-3">
                        Deliverables
                      </div>
                      <ul className="space-y-2">
                        {card.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-[13px] text-white/70">
                            <Check className="h-4 w-4 text-[#FF8AC4] shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 lg:px-8" style={{ background: "#03000D" }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Four steps.{" "}
              <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
                Six weeks to live.
              </span>
            </h2>
            <p className="mt-5 text-base text-white/60 leading-relaxed">
              Our delivery cadence is the same on every engagement — it's what lets us hit
              timelines and ship maintainable code. Here's what happens after you sign.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6"
              >
                <div className="text-3xl font-black text-white/20 font-mono mb-3">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-[#FF8AC4] mb-3">
                  {step.weeks}
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 1: Dedicated Engineer */}
      <section className="py-20 px-4 lg:px-8" style={{ background: "#03000D" }}>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 sm:p-12">
            <div className="flex items-start gap-6">
              <div className="hidden sm:block shrink-0">
                <MiniCharacter variant="engineer" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  A dedicated lead engineer owns your project end-to-end.
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  No account managers, no offshore handoffs. The person you talk to in the
                  kickoff is the person writing the architecture decision records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2: Ready to Scope */}
      <section className="py-20 px-4 lg:px-8" style={{ background: "#03000D" }}>
        <div className="mx-auto max-w-5xl">
          <div
            className="rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden relative"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), rgba(255,255,255,0.02)",
            }}
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Ready to scope your first{" "}
                  <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
                    sprint?
                  </span>
                </h2>
                <p className="mt-4 text-base text-white/60 leading-relaxed">
                  Book a 30-minute architecture call. We'll bring a draft technical spec and a
                  6-week roadmap on the call — not a slide deck.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
                    style={{ background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)" }}
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    See client results
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <MiniCharacter variant="robot" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </NxPageLayout>
  );
}

/* ─── DATA ─── */
const SERVICE_CARDS = [
  {
    number: "01",
    icon: Code2,
    iconBg: "#1E3A8A",
    title: "Custom Web & Mobile Apps",
    desc: "Production-grade applications built on Next.js 16, React Native, and Flutter. We don't ship prototypes — we ship products with design systems, observability, CI/CD, and E2E test coverage from day one.",
    stack: ["Next.js 16", "React 19", "TypeScript", "React Native", "Flutter", "Tailwind", "Prisma"],
    deliverables: ["Design system + Storybook", "Playwright E2E suite", "Lighthouse 95+ baseline", "WCAG 2.2 AA compliance"],
  },
  {
    number: "02",
    icon: Cloud,
    iconBg: "#831843",
    title: "Enterprise Cloud DevOps",
    desc: "AWS, GCP, Azure — pick one or all three. We deliver infrastructure-as-code, GitOps pipelines, autoscaling K8s clusters, and observability stacks that surface regressions before your users do.",
    stack: ["AWS", "GCP", "Azure", "Terraform", "ArgoCD", "Kubernetes", "OpenTelemetry", "Grafana"],
    deliverables: ["Terraform modules library", "GitOps release pipeline", "Cost optimization (avg 35%↓)", "24/7 on-call runbook"],
  },
  {
    number: "03",
    icon: Brain,
    iconBg: "#581C87",
    title: "AI / ML Pipelines",
    desc: "From RAG over your internal knowledge base to multi-agent orchestration handling real customer workflows. We move from PoC to production in 6 weeks — with evals, guardrails, and human-in-loop fallbacks.",
    stack: ["LangGraph", "OpenAI", "Anthropic", "Pinecone", "Weaviate", "pgvector", "vLLM", "LangSmith"],
    deliverables: ["Multi-agent orchestration", "Enterprise RAG (10M+ docs)", "Custom LLM fine-tuning", "Eval harness + guardrails"],
  },
  {
    number: "04",
    icon: ShieldCheck,
    iconBg: "#1E3A8A",
    title: "Security Systems",
    desc: "Zero-trust architectures, compliance as code, and pen-test-ready hardening. We've taken 20+ clients through SOC 2 Type II audit prep with zero findings on first attempt.",
    stack: ["Semgrep", "Snyk", "OWASP ZAP", "HashiCorp Vault", "Cloudflare WAF", "Auth0"],
    deliverables: ["SOC 2 / HIPAA / GDPR prep", "SAST + DAST in CI", "Pen-test remediation", "Zero-trust network design"],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery",
    weeks: "Week 1–2",
    desc: "2-week deep dive. Stakeholder interviews, architecture audit, competitive scan. We end with a written engineering roadmap.",
  },
  {
    n: "02",
    title: "3D Prototyping",
    weeks: "Week 3–4",
    desc: "Clickable Figma + design system tokens + component library skeleton. You click through the actual product before we write a line of backend code.",
  },
  {
    n: "03",
    title: "Agile Sprints",
    weeks: "Week 5–10",
    desc: "2-week sprints with live staging URL, demo every Friday, Slack channel with the team. You see code shipping in week 5.",
  },
  {
    n: "04",
    title: "Deploy & Scale",
    weeks: "Week 11+",
    desc: "Production cutover with full observability, on-call runbook, and 30-day hyper-care window. Then we hand over a system your team owns.",
  },
];

/* Mini character variants for CTA sections */
function MiniCharacter({ variant }: { variant: "engineer" | "robot" }) {
  if (variant === "engineer") {
    return (
      <div className="relative" style={{ width: "100px", height: "120px" }}>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[30px] rounded-b-[20px]"
          style={{
            width: "70px",
            height: "70px",
            background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: "0",
            width: "55px",
            height: "50px",
            background: "linear-gradient(180deg, #F5C9A6, #D4A574)",
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-lg"
            style={{ top: "15px", width: "44px", height: "18px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
          >
            <div className="absolute left-1 top-1 w-3 h-3 rounded-full" style={{ background: "#FF8AC4" }} />
            <div className="absolute right-1 top-1 w-3 h-3 rounded-full" style={{ background: "#136DFF" }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative" style={{ width: "140px", height: "170px" }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[40px] rounded-b-[30px]"
        style={{
          width: "85px",
          height: "95px",
          background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full grid place-items-center"
          style={{ background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)" }}
        >
          <span className="text-white text-[8px]">♥</span>
        </div>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "0",
          width: "70px",
          height: "65px",
          background: "linear-gradient(180deg, #F5C9A6, #D4A574)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-xl"
          style={{ top: "20px", width: "56px", height: "22px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
        >
          <div className="absolute left-1 top-1 w-4 h-4 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#FF8AC4" }} />
          </div>
          <div className="absolute right-1 top-1 w-4 h-4 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#136DFF" }} />
          </div>
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute rounded-full"
          style={{
            top: `${10 + i * 30}%`,
            left: i % 2 === 0 ? "-5%" : "auto",
            right: i % 2 === 1 ? "-5%" : "auto",
            width: "5px",
            height: "5px",
            background: ["#FF53A9", "#136DFF", "#9B3DFF"][i],
            boxShadow: `0 0 8px ${["#FF53A9", "#136DFF", "#9B3DFF"][i]}`,
          }}
        />
      ))}
    </div>
  );
}
