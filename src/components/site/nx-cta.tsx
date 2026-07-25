'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-data";

/* CTA SECTION — bold orange gradient block (Future Processing pattern).
 * Big headline, subtext, 2 CTAs, and 3 contact channels as cards below.
 * Sits on a vibrant orange gradient that breaks the white/navy rhythm. */
export function NxCta() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Orange gradient bg */}
      <div className="absolute inset-0 nx-orange-gradient" />
      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Top wave divider (subtle) */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/30" />

      <div className="relative mx-auto max-w-5xl px-4 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 nx-eyebrow text-white/80"
        >
          <span className="h-1 w-8 rounded-full bg-white/80" />
          Let&apos;s build something
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]"
        >
          Ready to ship your next
          <br className="hidden sm:block" />{" "}
          big idea?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-5 mx-auto max-w-xl text-base sm:text-lg text-white/85 leading-relaxed"
        >
          Book a free 30-minute consultation. We&apos;ll review your project,
          send a written quote within 48 hours, and you walk away with a
          clear technical spec — whether or not we work together.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm sm:text-base font-black text-[#E0197A] shadow-xl hover:scale-[1.03] transition"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4 nx-arrow" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-white/10 transition"
          >
            View Our Services
          </Link>
        </motion.div>

        {/* Contact channels — 3 cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}` },
            { icon: Phone, label: "Call UK office", value: SITE.phones[1].value, href: SITE.phones[1].href },
            { icon: MessageCircle, label: "Call PK office", value: SITE.phones[0].value, href: SITE.phones[0].href },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 text-left hover:bg-white/15 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="nx-eyebrow text-white/70">{c.label}</div>
                    <div className="mt-1 text-sm font-bold text-white truncate">
                      {c.value}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
