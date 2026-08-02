'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

/* FAQ — accordion (Future Processing + Vention pattern).
 * Light section, 2-column grid on desktop with expandable rows. */
const FAQS = [
  {
    q: "What are web design services?",
    a: "Web design services cover everything needed to plan, design, build and launch a website — UX research, UI design, frontend development on Next.js, content, SEO setup, hosting and ongoing maintenance. ClickTake bundles all of these into a single fixed-scope engagement for brands across the UK, Pakistan, USA and Dubai.",
  },
  {
    q: "How much do web design services cost?",
    a: "Most ClickTake web design projects land between £1,500 (Starter landing page) and £25,000+ (custom SaaS site). Small business sites start at £1,500, marketing sites are £6,000-12,000, and custom SaaS sites are £20,000+. Every quote is fixed-scope with a written Statement of Work — no surprises after kickoff.",
  },
  {
    q: "How to choose a web design services agency?",
    a: "Look for: (1) a portfolio of sites in your industry, (2) case studies with measurable outcomes like traffic, conversions and Core Web Vitals, (3) a transparent fixed-scope contract, (4) senior engineers (not juniors) on your project, and (5) post-launch maintenance included. ClickTake meets all five — book a free 30-min consult and we'll show you the receipts.",
  },
  {
    q: "How fast can you start?",
    a: "We typically kick off new projects within 7 days of signing the proposal. For urgent launches we can fast-track to a 48-hour start if a senior team is available. Book a call today and we'll confirm a real start date before you commit.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. About 60% of our clients are seed-to-Series-B startups and 40% are mid-market and enterprise. We adjust the engagement model — startups get sprint-based MVP work, enterprises get dedicated teams and quarterly roadmaps.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — 100%. Everything we build is committed to your GitHub repo under your account from day one. Our contracts include an IP assignment clause so there's no ambiguity. You can take the code to any other agency or hire in-house any time.",
  },
  {
    q: "What's your tech stack?",
    a: "Default stack: Next.js 14+ App Router, TypeScript, Tailwind CSS, Supabase/Postgres, Drizzle ORM, Vercel for hosting, Cloudflare for CDN/edge. For mobile: React Native + Expo. For AI: OpenAI / Anthropic / open-source LLMs via LangChain or LangGraph. We can also work in your existing stack if needed.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. After launch we offer monthly maintenance retainers (£150-4k/mo depending on app complexity) that cover bug fixes, security updates, dependency upgrades, and small feature requests. Most clients stay on maintenance for 12+ months — it's month-to-month, cancel anytime.",
  },
];

export function NxFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 nx-surface">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 nx-eyebrow text-[var(--nx-orange)]"
          >
            <span className="h-1 w-8 rounded-full bg-[var(--nx-orange)]" />
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight nx-text"
          >
            Questions, answered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg nx-text-soft"
          >
            Still unsure?{" "}
            <a
              href="/contact"
              className="font-bold text-[var(--nx-orange)] hover:text-[var(--nx-orange-deep)]"
            >
              Book a call →
            </a>
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`relative p-5 sm:p-6 rounded-2xl border nx-surface overflow-hidden transition-colors ${
                  isOpen ? "border-[#FF53A9]/40" : "nx-bd"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <h3 className="text-base sm:text-lg font-bold nx-text group-hover:text-[#FF53A9] transition">
                    {f.q}
                  </h3>
                  <div
                    className={`h-8 w-8 rounded-full grid place-items-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#FF53A9] text-white"
                        : "nx-surface-muted nx-text-soft"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-2 text-sm sm:text-base nx-text-soft leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
