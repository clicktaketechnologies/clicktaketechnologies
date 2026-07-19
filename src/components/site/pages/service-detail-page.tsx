'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles, CheckCircle2, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { CATEGORY_STYLES, SITE, type ServiceItem } from "@/lib/site-data";

interface Props { service: ServiceItem; }

// Geo-targeted copy per region — drives local SEO for each service detail
// page. Each region has its own micro-copy that mentions the local city,
// language and time zone, so Google can match long-tail queries like
// "AI development company Birmingham" or "SaaS agency Dubai".
const REGION_COPY = [
  {
    flag: "🇬🇧",
    city: "Birmingham",
    country: "United Kingdom",
    blurb: "Serving Birmingham, London, Manchester and the Midlands from our registered UK HQ. Available Mon–Sat, 09:30–21:00 GMT.",
    phone: "+44 7391 653377",
    hours: "GMT",
  },
  {
    flag: "🇵🇰",
    city: "Multan",
    country: "Pakistan",
    blurb: "Engineering hub serving Lahore, Karachi, Islamabad and across Pakistan. Available Mon–Sat, 09:30–21:00 PKT.",
    phone: "+92 306 9753003",
    hours: "PKT",
  },
  {
    flag: "🇺🇸",
    city: "Austin, TX",
    country: "United States",
    blurb: "North American business desk — coast-to-coast coverage. Available Mon–Fri, 09:00–18:00 CST for clients across the USA.",
    phone: "+1 (by appointment)",
    hours: "CST",
  },
  {
    flag: "🇦🇪",
    city: "Dubai",
    country: "United Arab Emirates",
    blurb: "MENA office serving Dubai, Abu Dhabi, Riyadh and Doha. Available Sat–Thu, 10:00–20:00 GST.",
    phone: "+971 (by appointment)",
    hours: "GST",
  },
];

export function ServiceDetailPage({ service }: Props) {
  const cat = CATEGORY_STYLES[service.category] ||
    // starter-kit falls back to a custom amber/pink style
    {
      eyebrow: "Flagship Offering",
      accentColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
      accentBorder: "border-amber-500/30",
      gradient: "from-amber-500 to-brand-pink",
      title: "Flagship Offering",
      description: "Our all-in-one package for ambitious founders.",
      group: "Flagship",
      glow: "rgba(245,158,11,0.18)",
      borderHover: "hover:border-amber-500/40",
    };

  // Pull the inclusions list — for starter-kit we use a richer one
  const isStarter = service.slug === "starter-kit";
  const inclusions = isStarter
    ? [
        "Brand identity system (logo, typography, color, guidelines)",
        "Production-ready Next.js website (up to 6 pages)",
        "AI assistant for lead qualification & FAQs",
        "Analytics, SEO basics and conversion tracking setup",
        "90-day growth marketing playbook (SEO + paid + content)",
        "Copywriting for all primary pages",
        "2 rounds of revisions per deliverable",
        "Hand-off documentation & training",
      ]
    : [
        "Discovery workshop & success metrics",
        "Dedicated engineering & design team",
        "Weekly demo & async progress notes",
        "Production-ready code with tests",
        "Performance & SEO audit",
        "30-day post-launch support",
      ];

  const deliverables = isStarter
    ? [
        { label: "Time to live", value: "≈ 90 days" },
        { label: "Revision rounds", value: "2 per deliverable" },
        { label: "Handoff", value: "Source + docs + training" },
      ]
    : [
        { label: "Engagement", value: "Sprint-based" },
        { label: "Team", value: "Mixed senior + lead" },
        { label: "Reporting", value: "Weekly demo + Linear" },
      ];

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${cat.accentColor}`}>
              {cat.eyebrow}
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {service.title}
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {service.detailed_description || service.description}
            </p>

            {/* Deliverables strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {deliverables.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-md p-4"
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{d.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Body — what's included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">What&apos;s included</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {inclusions.map((inc) => (
                <div
                  key={inc}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4"
                >
                  <CheckCircle2 className={`h-5 w-5 shrink-0 ${cat.accentColor}`} />
                  <span className="text-sm leading-relaxed">{inc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process for this service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">How we engage</h2>
            <ol className="relative border-l border-border pl-6 space-y-6">
              {[
                { t: "Discovery call", d: "We dig into your goals, constraints, and target market — and tell you honestly if this service is the right fit." },
                { t: "Proposal & scope", d: "A fixed-scope proposal with deliverables, timeline, and price. No surprises mid-engagement." },
                { t: "Build sprints", d: "Weekly sprints with demos. You see progress every 5 business days and steer direction async." },
                { t: "Launch & handoff", d: "We ship to production, set up analytics, and train your team. 30 days of post-launch support included." },
              ].map((step, i) => (
                <li key={step.t} className="relative">
                  <span className={`absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${cat.gradient} text-[10px] font-bold text-white`}>
                    {i + 1}
                  </span>
                  <div className="font-semibold">{step.t}</div>
                  <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.d}</div>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Geo-targeted availability section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {service.title} — available across 4 regions
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              ClickTake Technologies delivers {service.title.toLowerCase()} to clients worldwide from
              our offices in the UK, Pakistan, USA and Dubai. Local team, local hours, local
              understanding — global delivery standards.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {REGION_COPY.map((r) => (
                <div
                  key={r.city}
                  className="rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 hover:border-primary/30 hover:bg-card/60 transition"
                >
                  <div className="text-2xl mb-1.5">{r.flag}</div>
                  <div className="text-sm font-bold leading-tight">{r.city}</div>
                  <div className="text-[11px] text-muted-foreground mb-2">{r.country}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{r.blurb}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span className="truncate">{r.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 shrink-0" />
                    {r.hours}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className={`h-5 w-5 ${cat.accentColor} shrink-0`} />
                Ready to get started?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a consultation and let&apos;s scope it together. Free 30-minute discovery call.
              </div>
            </div>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${cat.gradient} px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0`}
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
