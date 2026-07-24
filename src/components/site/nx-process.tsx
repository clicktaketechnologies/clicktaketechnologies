'use client'

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, LineChart, RefreshCw } from "lucide-react";

/* PROCESS — vertical timeline (Vention + Itransition pattern).
 * Dark navy section with 6 numbered steps alternating left/right on desktop,
 * stacked on mobile. Each step has an icon, title, body, and duration tag. */
const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Discovery & Audit",
    duration: "Week 1",
    body: "We map your goals, competitors, and current stack. You leave with a written technical spec, scope, and fixed quote — no NDA-walled sales meetings.",
    color: "#FF53A9",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design & Prototype",
    duration: "Week 1–2",
    body: "Wireframes → Figma → clickable prototype in 5 business days. You sign off on every screen before any code is written.",
    color: "#FF53A9",
  },
  {
    n: "03",
    icon: Code,
    title: "Build Sprint",
    duration: "Week 2–4",
    body: "Senior engineers ship in 2-week sprints. You get a Friday demo every week, access to the GitHub repo, and a dedicated Slack channel.",
    color: "#136DFF",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch & QA",
    duration: "Week 4",
    body: "Staging → UAT → production. We handle DNS, SSL, analytics, and SEO redirects. Zero-downtime deploys via Vercel + Cloudflare.",
    color: "#10B981",
  },
  {
    n: "05",
    icon: LineChart,
    title: "Grow & Optimize",
    duration: "Month 2+",
    body: "Post-launch we move into growth mode — A/B tests, SEO content sprints, paid acquisition, conversion rate optimization. Monthly KPI reviews.",
    color: "#F59E0B",
  },
  {
    n: "06",
    icon: RefreshCw,
    title: "Iterate Forever",
    duration: "Ongoing",
    body: "Most clients stay with us for 12+ months. We do monthly roadmap reviews, quarterly business reviews, and proactive tech-debt cleanup.",
    color: "#8B5CF6",
  },
];

export function NxProcess() {
  return (
    <section className="relative py-24 sm:py-32 nx-navy-gradient overflow-hidden">
      {/* Decorative dot grid + orb */}
      <div className="absolute inset-0 nx-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-[#FF53A9]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 h-96 w-96 rounded-full bg-[#136DFF]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 nx-eyebrow text-[#FF8AC4]"
          >
            <span className="h-1 w-8 rounded-full bg-[#FF53A9]" />
            How we work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            A proven 6-step delivery,{" "}
            <span className="nx-text-orange-grad">from kickoff to scale.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed"
          >
            Same process for a $5k landing page or a $250k SaaS rebuild —
            senior team, weekly demos, fixed scope, written quotes.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="mt-16 sm:mt-20 relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center gap-6 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node on the line */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="h-3 w-3 rounded-full ring-4 ring-[#100820]"
                      style={{ background: s.color }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 pl-12 sm:pl-0 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <div className="nx-card-dark p-6 sm:p-7 inline-block w-full text-left">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="h-11 w-11 rounded-xl grid place-items-center shrink-0"
                          style={{ background: `${s.color}1a`, color: s.color }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="nx-eyebrow text-white/40">Step {s.n}</div>
                          <div className="text-xs font-bold text-white/60 mt-0.5">{s.duration}</div>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">{s.title}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.body}</p>
                    </div>
                  </div>

                  {/* Spacer for the other half */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
