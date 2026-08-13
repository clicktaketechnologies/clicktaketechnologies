'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail, Phone, MapPin, ArrowRight, Check, MessageCircle,
} from "lucide-react";
import { NxPageLayout, NxPageHero } from "../nx-page-layout";

/* CONTACT PAGE — "Let's build something extraordinary" design.
 * Matches user-uploaded screenshot: hero, multi-step form (1-2-3),
 * direct-contact sidebar, "What happens next" numbered list.
 */
export function ContactPage() {
  return (
    <NxPageLayout>
      <NxPageHero
        eyebrow="Book a Demo"
        title={
          <>
            Let's build something{" "}
            <span className="bg-gradient-to-r from-[#EC4899] via-[#9B3DFF] to-[#6366F1] bg-clip-text text-transparent">
              extraordinary.
            </span>
          </>
        }
        subtitle="Three short steps. Pick a slot. A senior engineer (not a salesperson) joins the call with a draft architecture for your use case. Average response time: under 4 hours during business days."
      />

      {/* Main content: Form + Sidebar */}
      <section className="py-16 px-4 lg:px-8" style={{ background: "#050510" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Multi-step form (3 cols) */}
            <div className="lg:col-span-3">
              <MultiStepForm />
            </div>

            {/* Right: Direct contact sidebar (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <DirectContactSidebar />
              <WhatHappensNext />
            </div>
          </div>
        </div>
      </section>
    </NxPageLayout>
  );
}

/* ─── MULTI-STEP FORM ─── Step 1 of 3: Project information */
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    needs: [] as string[],
  });

  const NEEDS_OPTIONS = [
    "Custom Web/Mobile App",
    "Cloud / DevOps",
    "AI / ML Pipeline",
    "Security Audit",
  ];

  const toggleNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8">
      {/* Form title */}
      <h2 className="text-xl font-bold text-white mb-1">Tell us about your project</h2>
      <p className="text-sm text-white/50 mb-6">
        Step {step} of 3: {step === 1 ? "Project information" : step === 2 ? "Project details" : "Schedule"}
      </p>

      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition-all ${
                s <= step
                  ? "bg-gradient-to-br from-[#3B82F6] to-[#EC4899] text-white"
                  : "border border-white/20 text-white/40"
              }`}
            >
              {s < step ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`h-px w-12 ${s < step ? "bg-[#EC4899]" : "bg-white/20"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Project information */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#EC4899]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              placeholder="alex@yourcompany.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#EC4899]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              placeholder="+447751553879"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#EC4899]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Company *
            </label>
            <input
              type="text"
              placeholder="Your Company Inc."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#EC4899]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              What do you need? *
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {NEEDS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleNeed(opt)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm text-left transition-all ${
                    formData.needs.includes(opt)
                      ? "border-[#EC4899]/50 bg-[#EC4899]/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`grid h-4 w-4 place-items-center rounded border ${
                      formData.needs.includes(opt)
                        ? "border-[#EC4899] bg-[#EC4899]"
                        : "border-white/30"
                    }`}
                  >
                    {formData.needs.includes(opt) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)" }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Project details (placeholder for now) */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Project Budget
            </label>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#EC4899]/50 focus:outline-none">
              <option className="bg-[#0A0A14]">&lt; $10K</option>
              <option className="bg-[#0A0A14]">$10K – $50K</option>
              <option className="bg-[#0A0A14]">$50K – $100K</option>
              <option className="bg-[#0A0A14]">$100K+</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Timeline
            </label>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#EC4899]/50 focus:outline-none">
              <option className="bg-[#0A0A14]">ASAP (Rush)</option>
              <option className="bg-[#0A0A14]">1–3 months</option>
              <option className="bg-[#0A0A14]">3–6 months</option>
              <option className="bg-[#0A0A14]">6+ months</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Project Description
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your project goals, current stack, and any specific requirements..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#EC4899]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all resize-none"
            />
          </div>
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)" }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Schedule (placeholder for now) */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#EC4899]/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-white/50 mb-2">
              Preferred Time
            </label>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#EC4899]/50 focus:outline-none">
              <option className="bg-[#0A0A14]">09:00 – 10:00 GMT</option>
              <option className="bg-[#0A0A14]">10:00 – 11:00 GMT</option>
              <option className="bg-[#0A0A14]">14:00 – 15:00 GMT</option>
              <option className="bg-[#0A0A14]">15:00 – 16:00 GMT</option>
              <option className="bg-[#0A0A14]">16:00 – 17:00 GMT</option>
            </select>
          </div>
          <div className="rounded-xl border border-[#EC4899]/20 bg-[#EC4899]/5 p-4">
            <p className="text-sm text-white/70">
              <strong className="text-white">Summary:</strong> {formData.name || "—"} from{" "}
              {formData.company || "—"} wants to discuss{" "}
              {formData.needs.length > 0 ? formData.needs.join(", ") : "—"}.
            </p>
          </div>
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)" }}
            >
              Book Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── DIRECT CONTACT SIDEBAR ─── */
function DirectContactSidebar() {
  const contacts = [
    {
      icon: Mail,
      iconColor: "#3B82F6",
      iconBg: "rgba(59,130,246,0.15)",
      label: "EMAIL",
      value: "info@clicktaketech.com",
      href: "mailto:info@clicktaketech.com",
    },
    {
      icon: Phone,
      iconColor: "#EC4899",
      iconBg: "rgba(236,72,153,0.15)",
      label: "PHONE · WHATSAPP",
      value: "+447751553879",
      href: "tel:+447751553879",
    },
    {
      icon: MessageCircle,
      iconColor: "#25D366",
      iconBg: "rgba(37,211,102,0.15)",
      label: "WHATSAPP",
      value: "wa.link/iqz8eg",
      href: "https://wa.link/iqz8eg",
    },
    {
      icon: MapPin,
      iconColor: "#3B82F6",
      iconBg: "rgba(59,130,246,0.15)",
      label: "HQ",
      value: "Remote-first · Global team",
      href: null,
    },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6">
      <h3 className="text-lg font-bold text-white mb-1">Direct contact</h3>
      <p className="text-sm text-white/50 mb-5">
        Prefer email? Reach out directly — we read every message.
      </p>
      <div className="space-y-3">
        {contacts.map((c, i) => {
          const Icon = c.icon;
          const content = (
            <div className="flex items-center gap-3 group">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl shrink-0"
                style={{ background: c.iconBg }}
              >
                <Icon className="h-5 w-5" style={{ color: c.iconColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/40">
                  {c.label}
                </div>
                <div className="text-sm text-white group-hover:text-[#EC4899] transition-colors truncate">
                  {c.value}
                </div>
              </div>
              {c.href && (
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-[#EC4899] transition-colors" />
              )}
            </div>
          );
          return c.href ? (
            <a key={i} href={c.href} className="block">
              {content}
            </a>
          ) : (
            <div key={i}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── WHAT HAPPENS NEXT ─── */
function WhatHappensNext() {
  const steps = [
    {
      n: "1",
      title: "Senior engineer reviews your brief",
      desc: "Within 4 hours during business days.",
    },
    {
      n: "2",
      title: "30-minute architecture call",
      desc: "We bring a draft architecture + ballpark estimate.",
    },
    {
      n: "3",
      title: "Working PoC in 6 weeks",
      desc: "Fixed-scope, fixed-fee. No long-term contract required.",
    },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6">
      <h3 className="text-lg font-bold text-white mb-5">What happens next?</h3>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#EC4899] text-sm font-bold text-white shrink-0">
              {s.n}
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">{s.title}</div>
              <div className="text-xs text-white/50 leading-relaxed">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
