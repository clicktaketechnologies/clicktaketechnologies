'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowUpRight, CheckCircle2, User, Building2, Globe2, Sparkles, Clock, Calendar } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { SocialIcons } from "./social-icons";
import { SectionReveal } from "./scroll-animations";

type FormState = {
  name: string;
  email: string;
  company: string;
  region: string;
  service: string;
  budget: string;
  message: string;
};

const SERVICES = [
  "AI / LLM Solutions",
  "Web Development",
  "SaaS Platform Engineering",
  "Mobile App Development",
  "SEO & Content Strategy",
  "Paid Advertising (PPC)",
  "Brand & Graphic Design",
  "Video Production",
  "Business Starter Kit",
  "Something else",
];

const BUDGETS = [
  "Under £5,000",
  "£5,000 – £10,000",
  "£10,000 – £25,000",
  "£25,000 – £50,000",
  "£50,000+",
];

const REGIONS = [
  { flag: "🇬🇧", label: "United Kingdom" },
  { flag: "🇵🇰", label: "Pakistan" },
  { flag: "🇺🇸", label: "United States" },
  { flag: "🇦🇪", label: "UAE / Dubai" },
  { flag: "🌍", label: "Other" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    region: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email";
    if (!form.region) next.region = "Select your region";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Tell us a bit more (10+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "inquiry", data: { ...form, service: form.service || "General", budget: form.budget || "Not specified" } }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", company: "", region: "", service: "", budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[32rem] w-[32rem] rounded-full bg-[#136DFF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[#FF53A9]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: info */}
          <div>
            <SectionReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#136DFF]" />
                Get in touch
              </div>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.1}>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Let&apos;s build something{" "}
                <span className="gradient-text">remarkable together.</span>
              </h2>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.2}>
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Tell us about your project. We typically respond within one business day — and the
                first 30 minutes of consultation are always on us.
              </p>
            </SectionReveal>

            {/* Contact methods */}
            <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
              <SectionReveal variant="slideLeft" delay={0}>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-3 sm:gap-4 rounded-2xl glass p-4 sm:p-5 hover:ct-divider transition"
                >
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl gradient-bg shadow-lg">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                    <div className="text-sm font-bold group-hover:text-[#136DFF] transition truncate">
                      {SITE.email}
                    </div>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-foreground transition shrink-0" />
                </a>
              </SectionReveal>

              {SITE.phones.map((p, i) => (
                <SectionReveal key={p.href} variant="slideLeft" delay={(i + 1) * 0.05}>
                  <a
                    href={p.href}
                    className="group flex items-center gap-3 sm:gap-4 rounded-2xl glass p-4 sm:p-5 hover:ct-divider transition"
                  >
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl gradient-bg shadow-lg">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                        Phone · {p.label}
                      </div>
                      <div className="text-sm font-bold group-hover:text-[#136DFF] transition">
                        {p.value}
                      </div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-foreground transition shrink-0" />
                  </a>
                </SectionReveal>
              ))}

              <SectionReveal variant="slideLeft" delay={0.2}>
                <div className="rounded-2xl glass p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl gradient-bg shadow-lg">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                        Global offices
                      </div>
                      <div className="text-sm font-bold">
                        UK · Pakistan · USA · Dubai
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2">
                    {SITE.locations.map((l) => (
                      <div
                        key={l.country}
                        className="rounded-xl border ct-divider ct-surface px-3 py-2"
                      >
                        <div className="text-xs font-bold">
                          {l.flag} {l.city}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{l.country}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Socials */}
            <SectionReveal variant="fadeUp" delay={0.2}>
              <div className="mt-6 sm:mt-8">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Follow ClickTake
                </div>
                <SocialIcons />
              </div>
            </SectionReveal>
          </div>

          {/* Right: Request a Call Back form — modern, two-column, glassmorphism */}
          <SectionReveal variant="zoomIn" delay={0.1}>
            <div className="relative rounded-3xl glass-strong p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
              {/* Decorative gradient blob */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#136DFF]/20 to-[#FF53A9]/20 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start gap-3 mb-1">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-bg shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight">Request a callback</h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      Fill in the form below and we&apos;ll be in touch within one business day.
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3 text-[#136DFF]" /> 24-hour response</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Free 30-min consult</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3 text-[#FF53A9]" /> Book a call slot</span>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center"
                    >
                      <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                      <h4 className="mt-3 text-base font-bold">Thanks — we&apos;ve got it!</h4>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        Your request has been received. A senior team member will call you back within one business day.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-4 text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={onSubmit}
                      className="mt-6 space-y-4"
                      noValidate
                    >
                      {/* Row: Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <Field
                          label="Full name"
                          icon={<User className="h-3.5 w-3.5" />}
                          error={errors.name}
                        >
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Jane Doe"
                            className={inputClass(!!errors.name)}
                          />
                        </Field>
                        <Field
                          label="Email"
                          icon={<Mail className="h-3.5 w-3.5" />}
                          error={errors.email}
                        >
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@company.com"
                            className={inputClass(!!errors.email)}
                          />
                        </Field>
                      </div>

                      {/* Row: Company + Region */}
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <Field
                          label="Company (optional)"
                          icon={<Building2 className="h-3.5 w-3.5" />}
                        >
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="Company Ltd."
                            className={inputClass(false)}
                          />
                        </Field>
                        <Field
                          label="Region"
                          icon={<Globe2 className="h-3.5 w-3.5" />}
                          error={errors.region}
                        >
                          <select
                            required
                            value={form.region}
                            onChange={(e) => update("region", e.target.value)}
                            className={inputClass(!!errors.region)}
                          >
                            <option value="">Select region…</option>
                            {REGIONS.map((r) => (
                              <option key={r.label} value={r.label}>
                                {r.flag} {r.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      {/* Row: Service + Budget */}
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <Field label="Service of interest">
                          <select
                            value={form.service}
                            onChange={(e) => update("service", e.target.value)}
                            className={inputClass(false)}
                          >
                            <option value="">Select service…</option>
                            {SERVICES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Budget range (optional)">
                          <select
                            value={form.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            className={inputClass(false)}
                          >
                            <option value="">Select budget…</option>
                            {BUDGETS.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      {/* Message */}
                      <Field
                        label="What do you need help with?"
                        error={errors.message}
                      >
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Tell us about your project, timeline and budget…"
                          className={`${inputClass(!!errors.message)} resize-none`}
                        />
                      </Field>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-[1.01] transition glow-brand disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <p className="text-xs text-red-500 text-center">
                          Something went wrong. Please try again or email us directly.
                        </p>
                      )}

                      <p className="text-[11px] text-muted-foreground text-center">
                        By submitting you agree to be contacted by ClickTake Technologies. We never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ───────────────────────────────────────────── */

function inputClass(hasError: boolean): string {
  // Theme-aware: uses semantic tokens so the input is visible in BOTH
  // light mode (bg-background, border-border) and dark mode (overridden
  // by .dark in globals.css). Previously used ct-surface which is
  // invisible on a white light-mode background.
  const base =
    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition focus:outline-none focus:ring-2 focus:ring-[#136DFF]/30";
  const border = hasError ? "border-red-500/60" : "border-border focus:border-[#136DFF]";
  return `${base} ${border}`;
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </label>
  );
}
