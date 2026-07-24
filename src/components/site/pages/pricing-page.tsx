'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, X, Sparkles, ArrowUpRight, HelpCircle, ChevronRight,
  Zap, TrendingUp, Building2, Users,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { PRICING_PLANS, type PricingPlan } from "@/lib/site-data";

const PLAN_ICON: Record<string, any> = {
  starter: Zap,
  growth: TrendingUp,
  scale: Building2,
  custom: Users,
};

const PLAN_GRADIENT: Record<string, string> = {
  starter: "from-emerald-500 to-teal-600",
  growth: "from-brand-blue to-brand-cyan",
  scale: "from-brand-magenta to-brand-pink",
  custom: "from-amber-500 to-orange-500",
};

function PricingCard({ plan }: { plan: PricingPlan }) {
  const Icon = PLAN_ICON[plan.slug] || Sparkles;
  const gradient = PLAN_GRADIENT[plan.slug] || "from-brand-blue to-brand-cyan";
  const isCustom = plan.slug === "custom";

  return (
    <div
      className={`relative rounded-2xl border p-6 sm:p-7 flex flex-col ${
        plan.highlight
          ? "border-brand-blue/40 bg-card/80 backdrop-blur-md shadow-xl shadow-brand-blue/10"
          : "border-border bg-card/40 backdrop-blur-md"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold leading-tight">{plan.name}</h3>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {plan.tagline}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">From</span>
          <span className="text-3xl font-bold tracking-tight">{plan.price_from}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{plan.billing}</div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

      <ul className="mt-5 space-y-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 shrink-0 text-brand-blue mt-0.5" />
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
        {plan.not_included.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm opacity-50">
            <X className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={isCustom ? "/contact?subject=custom-quote" : "/contact"}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition shrink-0 ${
          plan.highlight
            ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:scale-105`
            : "border border-border bg-secondary/50 text-foreground hover:border-primary/40 hover:bg-secondary"
        }`}
      >
        {plan.cta} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

const FAQS = [
  {
    q: "Do you offer payment plans?",
    a: "Yes. For projects over £5,000 we offer milestone-based billing (typically 30% upfront, 30% at midpoint, 40% on launch). For retainers we bill monthly in advance. Talk to us about your cash flow needs and we'll structure a plan that works.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Every plan is fixed-scope with a written Statement of Work. If you request work outside scope we will quote it explicitly in writing before starting — no surprise invoices. Third-party costs (hosting, domains, ad spend, stock) are passed through at cost with no markup.",
  },
  {
    q: "What happens if we go over scope?",
    a: "We flag it immediately. Any scope change is documented in a Change Order with a fixed price and timeline, signed by both parties before work starts. You always know what you're paying for and why.",
  },
  {
    q: "Do you offer discounts for startups or non-profits?",
    a: "Yes. We offer a 15% discount for verified startups (pre-Series A), registered non-profits and educational institutions. We also reserve 5% of our capacity for pro-bono work each quarter — reach out if you have a project that qualifies.",
  },
  {
    q: "Can we start with one plan and upgrade later?",
    a: "Absolutely. Many clients start on Starter, prove ROI and upgrade to Growth. We credit 50% of any unused project fees toward the upgrade. We never lock you into a plan — we'd rather earn the upgrade through results.",
  },
  {
    q: "What currencies do you bill in?",
    a: "GBP (£) by default for UK and international clients. We can also invoice in USD ($) for US clients, PKR (₨) for Pakistan clients and AED (د.إ) for UAE clients. Currency is fixed at contract signing; we don't pass on FX risk.",
  },
];

export function PricingPage() {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Pricing
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Transparent pricing. No universal packages — every engagement is scoped.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              ClickTake Technologies ships four engagement tiers across the UK, Pakistan, USA and Dubai.
              These are starting points — every project is scoped in a free 30-minute discovery call to
              match your specific goals, audience and budget. No fake universal pricing, no hidden fees.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="mt-12 sm:mt-16 grid gap-5 lg:grid-cols-4 items-stretch">
            {PRICING_PLANS.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full"
              >
                <PricingCard plan={p} />
              </motion.div>
            ))}
          </div>

          {/* What's not included */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
              What&apos;s never included — and never will be
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Hidden setup or 'onboarding' fees",
                "Hourly billing surprises (we bill by outcome, not hour)",
                "Lock-in contracts beyond the project scope",
                "Markup on third-party tools, hosting or ad spend",
                "Proprietary CMS or vendor lock-in",
                "Fake 'discounted' pricing that never expires",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/30 backdrop-blur-md p-4"
                >
                  <X className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQs */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <HelpCircle className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 [&_summary]:cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-3 text-sm font-semibold list-none">
                    <span>{faq.q}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 text-brand-blue" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                Still not sure which plan fits?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation. We will scope your project, recommend the right tier,
                and give you a fixed written quote — no obligation.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
