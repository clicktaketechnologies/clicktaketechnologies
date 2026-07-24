'use client'

import { motion } from "framer-motion";
import { TrendingUp, Rocket, Award, Users } from "lucide-react";
import { SITE } from "@/lib/site-data";

/* STATS BANNER — oversized numerals (Index.dev / Vention pattern).
 * Light section with 4 huge stat tiles separated by hairline dividers. */
const STATS = [
  { value: "120+", label: "Projects shipped", sub: "Across 4 continents since 2019", icon: Rocket, color: "#FF53A9" },
  { value: "5.0★", label: "Clutch rating", sub: "From 40+ verified reviews", icon: Award, color: "#136DFF" },
  { value: "30", label: "Day average MVP", sub: "From kickoff to launch", icon: TrendingUp, color: "#10B981" },
  { value: "4", label: "Global offices", sub: "UK · Pakistan · USA · Dubai", icon: Users, color: "#FF53A9" },
];

export function NxStats() {
  return (
    <section className="py-20 sm:py-24 nx-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-6 sm:p-8 rounded-2xl border nx-bd nx-surface-alt hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden group"
              >
                {/* Decorative corner gradient */}
                <div
                  className="absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"
                  style={{ background: s.color }}
                />
                <div
                  className="relative h-11 w-11 rounded-xl grid place-items-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${s.color}1a`, color: s.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div
                  className="relative nx-stat-num text-4xl sm:text-5xl lg:text-6xl"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="relative mt-2 text-sm sm:text-base font-bold nx-text">
                  {s.label}
                </div>
                <div className="relative mt-1 text-xs sm:text-sm nx-text-muted leading-relaxed">
                  {s.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
