'use client'

import { NxNavbar } from "@/components/site/nx-navbar";
import { NxHero } from "@/components/site/nx-hero";
import { NxLogoCloud } from "@/components/site/nx-logo-cloud";
import { NxStats } from "@/components/site/nx-stats";
import { NxServices } from "@/components/site/nx-services";
import { NxWhyChoose } from "@/components/site/nx-why-choose";
import { NxProcess } from "@/components/site/nx-process";
import { NxFaq } from "@/components/site/nx-faq";
import { NxCta } from "@/components/site/nx-cta";
import { NxFooter } from "@/components/site/nx-footer";
import { Nx3DScene } from "@/components/site/nx-3d-scene";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Marquee } from "@/components/site/marquee";
import { CylindricalTestimonials } from "@/components/site/enhanced/cylindrical-testimonials";
import { ScrollToTop } from "@/components/site/scroll-animations";
import dynamic from "next/dynamic";

/* Three.js ambient background — lazy-loaded, client-only.
 * Renders the wireframe torus knot + particle field + icosahedron + mouse
 * parallax from clicktake-3d-v3.html. SSR is disabled (three.js needs window). */
const NxThreeScene = dynamic(
  () => import("@/components/site/nx-three-scene").then((m) => m.NxThreeScene),
  { ssr: false }
);

const MARQUEE_ITEMS = [
  "Digital Marketing",
  "Web Development",
  "SEO & PPC",
  "Brand Identity",
  "Social Media",
  "AI Solutions",
  "Video Production",
  "E-Commerce",
];

/* Testimonial data for the cylindrical carousel — same quotes as
   nx-testimonials.tsx, formatted with avatar initials + brand colors. */
const CYL_TESTIMONIALS = [
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

/* Homepage — NEW competitor-inspired redesign (2024).
 *
 * Design language: Deep navy + pink/blue/purple accent + bento grids + bold heavy type.
 * Inspired by: Vention (split hero, floating cards), Index.dev (navy + orange
 * + bento), Future Processing (orange CTA + split-view panels), Itransition
 * (pill tags, dark stat sections), Brocoders (bold typography).
 *
 * Section order:
 *  1. Hero (split layout, dark navy + 3D floating dashboard card)
 *  2. Logo cloud (tech partners marquee)
 *  3. Stats banner (4 oversized metrics)
 *  4. Services (bento grid with category tabs)
 *  5. Why Choose (interactive split-view panel)
 *  6. Process (vertical timeline on navy)
 *  7. Testimonials (3-column card grid)
 *  8. FAQ (accordion)
 *  9. CTA (orange gradient block + contact channels)
 * 10. Footer (dark navy, multi-column)
 *
 * 3D design: Each major section is wrapped in a relative container with a
 * Nx3DScene background (floating geometric shapes in brand colors) for a
 * cohesive 3D feel across the entire page. The homepage also mounts a
 * full-screen NxThreeScene (Three.js) behind the hero — wireframe torus
 * knot + 1400-particle field + mouse parallax — matching the
 * clicktake-3d-v3.html reference.
 *
 * DARK MODE: The .theme-nx wrapper exposes --nx-* tokens that flip under
 * html.dark. Hero/CTA/Footer are always-dark (intentional). Light-surface
 * sections (Stats, Services, WhyChoose, Testimonials, FAQ) use the new
 * .nx-surface / .nx-text utility classes so they render with proper
 * contrast in both light and dark mode. */
export default function HomeContent() {
  return (
    <div className="theme-nx min-h-screen nx-surface nx-text relative">
      {/* Top scroll-progress bar (gradient pink → purple) */}
      <ScrollProgress />
      {/* Full-screen Three.js ambient background — torus knot + particles + icosahedron */}
      <NxThreeScene />
      <NxNavbar />
      <main id="main-content" className="relative z-10">
        <NxHero />
        {/* Brand marquee band — scrolling services list */}
        <Marquee items={MARQUEE_ITEMS} />
        <NxLogoCloud />
        {/* Stats — with 3D floating accents */}
        <div className="relative overflow-hidden">
          <Nx3DScene density="low" corner="top-right" />
          <div className="relative z-10">
            <NxStats />
          </div>
        </div>
        {/* Services — with 3D floating accents */}
        <div id="services" className="relative overflow-hidden scroll-mt-24">
          <Nx3DScene density="medium" />
          <div className="relative z-10">
            <NxServices />
          </div>
        </div>
        {/* Why Choose — with 3D floating accents */}
        <div className="relative overflow-hidden">
          <Nx3DScene density="low" corner="bottom-left" />
          <div className="relative z-10">
            <NxWhyChoose />
          </div>
        </div>
        {/* Process — with 3D floating accents */}
        <div className="relative overflow-hidden">
          <Nx3DScene density="medium" />
          <div className="relative z-10">
            <NxProcess />
          </div>
        </div>
        {/* Testimonials — NEW 3D cylindrical carousel (replaces grid).
            Auto-rotating, pause-on-hover, navigation dots, animated avatars. */}
        <section id="testimonials" className="relative py-24 sm:py-32 nx-navy-gradient overflow-hidden scroll-mt-24">
          <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#FF53A9]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#136DFF]/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 nx-eyebrow text-[#FF8AC4]">
                <span className="h-1 w-8 rounded-full bg-[#FF53A9]" />
                What clients say
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Rated{" "}
                <span className="nx-text-orange-grad">5.0 by 120+ founders.</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
                Auto-rotating carousel — hover to pause, click dots to navigate.
              </p>
            </div>
            <CylindricalTestimonials items={CYL_TESTIMONIALS} autoMs={14000} />
          </div>
        </section>
        <NxFaq />
        <NxCta />
      </main>
      <NxFooter />
      {/* Scroll-to-top floating button — appears after scrolling down */}
      <ScrollToTop />
    </div>
  );
}
