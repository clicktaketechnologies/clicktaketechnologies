'use client'

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowUpRight, Briefcase, MapPin, Clock, Users, Globe,
  TrendingUp, Heart, Laptop, Plane, Award, Send, CheckCircle2,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { CAREER_ROLES, CAREERS_PERKS, CAREERS_DEPARTMENTS, type CareerRole } from "@/lib/site-data";

const ICONS: Record<string, any> = {
  Globe, TrendingUp, Heart, Laptop, Plane, Award, Briefcase, MapPin, Clock, Users, Sparkles, Send, CheckCircle2,
};

function RoleCard({ role, onApply }: { role: CareerRole; onApply: (slug: string) => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 hover:border-primary/40 hover:bg-card/60 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold leading-tight">{role.title}</h3>
          <div className="text-[11px] uppercase tracking-widest text-brand-blue mt-1">
            {role.department}
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[10px] font-medium">
          {role.type}
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {role.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {role.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" /> {role.type}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/careers/${role.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-semibold hover:border-primary/40 hover:bg-secondary transition"
        >
          View details <ArrowUpRight className="h-3 w-3" />
        </Link>
        <button
          onClick={() => onApply(role.slug)}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-3 py-1.5 text-xs font-semibold text-white hover:scale-105 transition"
        >
          Apply now <Send className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function CareersPage() {
  const [activeDept, setActiveDept] = useState<string | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    portfolio: "",
    experience: "",
    why: "",
    resumeUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const filtered = activeDept === "all"
    ? CAREER_ROLES
    : CAREER_ROLES.filter((r) => r.department === activeDept);

  const openForm = (slug: string) => {
    setSelectedRole(slug);
    setForm((f) => ({ ...f, role: slug }));
    setShowForm(true);
    setSubmitted(false);
    setError("");
    if (typeof window !== "undefined") {
      setTimeout(() => {
        document.getElementById("careers-application-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "career", data: form }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
      setForm({
        name: "", email: "", phone: "", role: "", location: "",
        portfolio: "", experience: "", why: "", resumeUrl: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again or email careers@clicktaketech.com");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20";

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
              Careers
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Build the future of AI, web and growth — with us.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              ClickTake Technologies ships AI-powered websites, SaaS platforms and growth systems for
              ambitious brands across the UK, Pakistan, USA and Dubai. We are senior-only, remote-first,
              and obsessed with quality. If that sounds like you, we want to talk.
            </p>
          </motion.div>

          {/* Perks */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS_PERKS.map((p, i) => {
              const Icon = ICONS[p.icon] || Sparkles;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                  className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-5"
                >
                  <Icon className="h-5 w-5 text-brand-blue mb-3" />
                  <div className="text-sm font-semibold mb-1.5">{p.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Open roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Open roles</h2>
            </div>

            {/* Department filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveDept("all")}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeDept === "all"
                    ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                    : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                }`}
              >
                All ({CAREER_ROLES.length})
              </button>
              {CAREERS_DEPARTMENTS.map((dept) => {
                const count = CAREER_ROLES.filter((r) => r.department === dept).length;
                if (count === 0) return null;
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      activeDept === dept
                        ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                        : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                    }`}
                  >
                    {dept} ({count})
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((r) => (
                <RoleCard key={r.slug} role={r} onApply={openForm} />
              ))}
            </div>
          </motion.div>

          {/* Internships callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <Award className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-base font-bold">Internships & graduate programmes</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  We run paid internships and graduate programmes in our Multan engineering hub every
                  quarter. If you are a final-year student or recent graduate in CS, AI or design,
                  we would love to hear from you — even if no role is listed above. Apply through the
                  form below with &quot;Internship&quot; in the role field.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Application form */}
          <motion.section
            id="careers-application-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Send className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {showForm ? "Apply now" : "Submit an open application"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
              {showForm
                ? "Fill out the form below. We respond to every qualified application within 5 business days. All applications are confidential."
                : "Don't see the right role? Submit an open application with your CV and a short note — we are always looking for exceptional senior engineers, AI specialists, designers and growth marketers."}
            </p>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-base font-bold">Application received</div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Thank you for applying to ClickTake Technologies. We will review your application
                    and respond within 5 business days. If you don&apos;t hear from us by then, please
                    email <a href="mailto:careers@clicktaketech.com" className="text-brand-blue hover:underline">careers@clicktaketech.com</a>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setShowForm(false); }}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-xs font-semibold hover:border-primary/40 hover:bg-secondary transition"
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 sm:p-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass + " mt-1.5"}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass + " mt-1.5"}
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass + " mt-1.5"}
                      placeholder="+44 ..."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Role you&apos;re applying for *</label>
                    <select
                      required
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={inputClass + " mt-1.5"}
                    >
                      <option value="">Select a role…</option>
                      {CAREER_ROLES.map((r) => (
                        <option key={r.slug} value={r.slug}>{r.title} — {r.location}</option>
                      ))}
                      <option value="open-application">Open application</option>
                      <option value="internship">Internship / graduate programme</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className={inputClass + " mt-1.5"}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portfolio / GitHub / LinkedIn</label>
                    <input
                      value={form.portfolio}
                      onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                      className={inputClass + " mt-1.5"}
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Resume / CV URL *</label>
                  <input
                    required
                    value={form.resumeUrl}
                    onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    className={inputClass + " mt-1.5"}
                    placeholder="Link to your CV (Google Drive, Dropbox, Notion, personal site)"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Upload your CV to Google Drive / Dropbox and paste the public link here. We do not
                    accept email attachments.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Brief summary of your experience *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className={inputClass + " mt-1.5 resize-none"}
                    placeholder="3-5 sentences on your most relevant experience."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why ClickTake? *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.why}
                    onChange={(e) => setForm({ ...form, why: e.target.value })}
                    className={inputClass + " mt-1.5 resize-none"}
                    placeholder="Why this role? Why us? What do you want to build?"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {submitting ? "Submitting…" : "Submit application"} <Send className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link href="/legal/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
                    We review every application — no AI screening, no auto-rejects.
                  </p>
                </div>
              </form>
            )}
          </motion.section>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
