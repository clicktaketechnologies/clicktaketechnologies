'use client'

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { SectionReveal } from "./scroll-animations";

/* Final CTA section — simple, centered, two CTAs.
 * Replaces the previous homepage contact section (which duplicated the
 * full contact form already rendered on /contact). The /contact page route
 * still uses the ContactPage component, so this is purely a homepage CTA. */
export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32">
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[32rem] w-[32rem] rounded-full bg-[#136DFF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[#FF53A9]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        <SectionReveal variant="fadeUp">
          <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[#136DFF]" />
            Let&apos;s talk
          </div>
        </SectionReveal>

        <SectionReveal variant="fadeUp" delay={0.1}>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Ready to Grow{" "}
            <span className="gradient-text">Your Business?</span>
          </h2>
        </SectionReveal>

        <SectionReveal variant="fadeUp" delay={0.2}>
          <p className="mt-5 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            Book a free 30-minute consultation. We&apos;ll audit your current setup and propose a
            growth plan — no obligation, no sales pressure.
          </p>
        </SectionReveal>

        <SectionReveal variant="fadeUp" delay={0.3}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl glow-brand hover:scale-[1.03] transition"
            >
              Book Free Consultation
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/447391653377"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl hover:scale-[1.03] transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </SectionReveal>

        <SectionReveal variant="fadeUp" delay={0.4}>
          <p className="mt-6 text-xs text-muted-foreground">
            Prefer email?{" "}
            <a href="mailto:info@clicktaketech.com" className="text-brand-blue font-semibold hover:underline">
              info@clicktaketech.com
            </a>{" "}
            · UK +44 7391 653377 · PK +92 306 9753003
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
