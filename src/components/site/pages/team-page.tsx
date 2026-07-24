'use client'

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowUpRight, Users, Code2, Megaphone, Palette, Settings,
  MapPin, Mail, Globe,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { TEAM, TEAM_DEPARTMENTS, SITE, type TeamMember } from "@/lib/site-data";

const DEPT_ICON: Record<string, any> = {
  Leadership: Sparkles,
  Development: Code2,
  Marketing: Megaphone,
  Creative: Palette,
  Operations: Settings,
};

const DEPT_GRADIENT: Record<string, string> = {
  Leadership: "from-amber-500 to-brand-pink",
  Development: "from-brand-blue to-brand-cyan",
  Marketing: "from-emerald-500 to-teal-600",
  Creative: "from-brand-pink to-orange-500",
  Operations: "from-brand-magenta to-brand-blue",
};

function TeamCard({ member }: { member: TeamMember }) {
  const Icon = DEPT_ICON[member.department] || Users;
  const gradient = DEPT_GRADIENT[member.department] || "from-brand-blue to-brand-cyan";

  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 hover:border-primary/40 hover:bg-card/60 transition">
      <div className="flex items-start gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold leading-tight">{member.role}</div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">
            {member.department}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-4">
        {member.bio}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {member.focus.map((f) => (
          <span
            key={f}
            className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-medium"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TeamPage() {
  const [activeDept, setActiveDept] = useState<string | "all">("all");

  const filtered = activeDept === "all"
    ? TEAM
    : TEAM.filter((m) => m.department === activeDept);

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
              Team
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              One team. Four regions. Forty-two specialists.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              ClickTake Technologies was founded in {SITE.founded} with a simple thesis: ambitious brands
              deserve a partner that ships across brand, web, AI and growth — not a fragmented agency
              that outsources half the work. Our team spans the UK, Pakistan, USA and Dubai, coordinated
              across four time zones, shipping as one.
            </p>
          </motion.div>

          {/* Region strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {SITE.locations.map((l) => (
              <div
                key={l.country}
                className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-4"
              >
                <div className="text-2xl mb-1">{l.flag}</div>
                <div className="text-sm font-bold leading-tight">{l.city}</div>
                <div className="text-[11px] text-muted-foreground">{l.country}</div>
                <div className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                  {l.note}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Department filter */}
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Departments</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveDept("all")}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeDept === "all"
                    ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                    : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                }`}
              >
                All ({TEAM.length})
              </button>
              {TEAM_DEPARTMENTS.map((dept) => {
                const count = TEAM.filter((m) => m.department === dept).length;
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
          </div>

          {/* Team grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <motion.div
                key={`${m.role}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              >
                <TeamCard member={m} />
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
              How we work
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "Globe",
                  title: "Multi-region by default",
                  desc: "We coordinate across UK, Pakistan, USA and Dubai — 18-hour coverage, single Slack channel, weekly demos. Your work moves while you sleep.",
                },
                {
                  icon: "Code2",
                  title: "Senior-only engineering",
                  desc: "No juniors on critical paths. Every engineer has 5+ years of production experience. Every AI engineer has shipped production LLMs.",
                },
                {
                  icon: "Users",
                  title: "Named team, not tickets",
                  desc: "You know your engineers, designers and PM by name. You have a dedicated Slack channel. No ticket system, no rotating support reps.",
                },
                {
                  icon: "Sparkles",
                  title: "Quality over speed",
                  desc: "We ship weekly demos, but we will not ship a feature that doesn't meet our bar. We'd rather be a week late than ship something broken.",
                },
                {
                  icon: "Settings",
                  title: "Ownable IP",
                  desc: "All code, models, designs and documentation handed over. No vendor lock-in. Your future team can extend the work without us.",
                },
                {
                  icon: "Mail",
                  title: "Radical transparency",
                  desc: "Live dashboards, weekly demos, honest status. If something is behind, you hear it from us first — not from a missed deadline.",
                },
              ].map((v) => {
                const Icon = { Globe, Code2, Users, Sparkles, Settings, Mail }[v.icon] || Users;
                return (
                  <div
                    key={v.title}
                    className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-5"
                  >
                    <Icon className="h-5 w-5 text-brand-blue mb-3" />
                    <div className="text-sm font-semibold mb-1.5">{v.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{v.desc}</div>
                  </div>
                );
              })}
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
                Want to join the team?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                We are hiring across engineering, AI, marketing, creative and operations. Browse open roles
                and internships across the UK, Pakistan, USA and Dubai.
              </div>
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Browse Careers <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
