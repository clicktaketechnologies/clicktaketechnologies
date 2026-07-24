'use client'

import { NxNavbar } from "@/components/site/nx-navbar";
import { NxHero } from "@/components/site/nx-hero";
import { NxLogoCloud } from "@/components/site/nx-logo-cloud";
import { NxStats } from "@/components/site/nx-stats";
import { NxServices } from "@/components/site/nx-services";
import { NxWhyChoose } from "@/components/site/nx-why-choose";
import { NxProcess } from "@/components/site/nx-process";
import { NxTestimonials } from "@/components/site/nx-testimonials";
import { NxFaq } from "@/components/site/nx-faq";
import { NxCta } from "@/components/site/nx-cta";
import { NxFooter } from "@/components/site/nx-footer";
import { Nx3DScene } from "@/components/site/nx-3d-scene";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Marquee } from "@/components/site/marquee";
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
export default function Home() {
  return (
    <div className="theme-nx min-h-screen nx-surface nx-text relative">
      {/* Top scroll-progress bar (gradient pink → purple) */}
      <ScrollProgress />
      {/* Full-screen Three.js ambient background — torus knot + particles + icosahedron */}
      <NxThreeScene />
      <NxNavbar />
      <main className="relative z-10">
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
        <div className="relative overflow-hidden">
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
        {/* Testimonials — with 3D floating accents */}
        <div className="relative overflow-hidden">
          <Nx3DScene density="low" corner="top-left" />
          <div className="relative z-10">
            <NxTestimonials />
          </div>
        </div>
        <NxFaq />
        <NxCta />
      </main>
      <NxFooter />
    </div>
  );
}
