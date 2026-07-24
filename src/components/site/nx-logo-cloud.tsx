'use client'

import { motion } from "framer-motion";
import { SITE } from "@/lib/site-data";

/* LOGO CLOUD — competitor-inspired (Index.dev / Vention pattern).
 * Marquee of trusted client / partner brands on a thin band. */
const PARTNERS = [
  "Microsoft", "AWS", "Google Cloud", "Stripe", "Vercel",
  "Shopify", "OpenAI", "Supabase", "Cloudflare", "Next.js",
  "Figma", "Notion",
];

export function NxLogoCloud() {
  return (
    <section className="border-y border-[#E2E8F0] bg-[#F8FAFC] py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-center text-xs nx-eyebrow text-[#94A3B8]">
          Technologies &amp; platforms we work with
        </p>

        <div className="mt-6 relative overflow-hidden">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none" />

          <div className="flex nx-marquee gap-12 whitespace-nowrap w-max">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="text-xl sm:text-2xl font-black tracking-tight text-[#94A3B8] opacity-60 hover:opacity-100 hover:text-[#0A1124] transition"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
