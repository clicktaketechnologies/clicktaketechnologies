'use client'

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/* TESTIMONIALS — 3-column card grid (Brocoders + Vention pattern).
 * Each card: 5-star rating, quote, divider, avatar+name+role. */
const TESTIMONIALS = [
  {
    quote:
      "ClickTake rebuilt our SaaS platform in 6 weeks — what our previous agency couldn't ship in 9 months. The new platform handles 3x the traffic at half the cost.",
    name: "Sarah Mitchell",
    role: "CEO, FinTech Startup",
    location: "London, UK",
    avatar: "SM",
    color: "#FF53A9",
    rating: 5,
  },
  {
    quote:
      "The AI automation they built saved us 30 hours a week in manual ops work. The team genuinely understands LLMs — not just slapping a chatbot on top of an API.",
    name: "Ahmed Al-Rashid",
    role: "COO, E-commerce Group",
    location: "Dubai, UAE",
    avatar: "AR",
    color: "#136DFF",
    rating: 5,
  },
  {
    quote:
      "We went from page 4 to page 1 on Google for our top keywords in 90 days. Their SEO content engine is real — every article ranks, not just a few.",
    name: "Mike Chen",
    role: "Founder, B2B SaaS",
    location: "Austin, TX",
    avatar: "MC",
    color: "#10B981",
    rating: 5,
  },
  {
    quote:
      "Best agency we've worked with in 10 years. Senior engineers, weekly demos, fixed price, no scope creep. They actually do what they say they'll do.",
    name: "Fatima Khan",
    role: "CTO, HealthTech",
    location: "Multan, PK",
    avatar: "FK",
    color: "#FF53A9",
    rating: 5,
  },
  {
    quote:
      "Their design team is world-class. They rebuilt our brand identity, website and product UI in one sprint — conversions jumped 47% in the first month.",
    name: "James Patterson",
    role: "VP Marketing, SaaS",
    location: "Manchester, UK",
    avatar: "JP",
    color: "#F59E0B",
    rating: 5,
  },
  {
    quote:
      "The mobile app they shipped hit #4 in App Store productivity within 2 weeks. The team thinks like product people, not just code monkeys.",
    name: "Priya Sharma",
    role: "Product Lead, Startup",
    location: "Remote, USA",
    avatar: "PS",
    color: "#8B5CF6",
    rating: 5,
  },
];

export function NxTestimonials() {
  return (
    <section className="py-24 sm:py-32 nx-surface-muted">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 nx-eyebrow text-[var(--nx-orange)]"
          >
            <span className="h-1 w-8 rounded-full bg-[var(--nx-orange)]" />
            What clients say
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight nx-text"
          >
            Rated{" "}
            <span className="nx-text-orange-grad">5.0 by 120+ founders.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 inline-flex items-center gap-2 text-sm nx-text-muted"
          >
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[#FF53A9] text-[#FF53A9]" />
              ))}
            </div>
            <span>5.0 average on Clutch, GoodFirms &amp; Google</span>
          </motion.div>
        </div>

        {/* Card grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="relative p-6 sm:p-7 rounded-2xl border nx-bd nx-surface hover:shadow-xl hover:-translate-y-1 hover:border-[#FF53A9]/40 transition-all flex flex-col"
            >
              {/* Quote icon + rating */}
              <div className="flex items-center justify-between mb-4">
                <Quote
                  className="h-8 w-8 opacity-30"
                  style={{ color: t.color }}
                />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-[#FF53A9] text-[#FF53A9]"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-[15px] nx-text leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 pt-5 border-t nx-bd flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-full grid place-items-center font-black text-sm text-white shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm nx-text">{t.name}</div>
                  <div className="text-xs nx-text-muted mt-0.5">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
