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

/* Homepage — NEW competitor-inspired redesign (2024).
 *
 * Design language: Deep navy + orange accent + bento grids + bold heavy type.
 * Inspired by: Vention (split hero, floating cards), Index.dev (navy + orange
 * + bento), Future Processing (orange CTA + split-view panels), Itransition
 * (pill tags, dark stat sections), Brocoders (bold typography).
 *
 * Section order:
 *  1. Hero (split layout, dark navy)
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
 * DARK MODE: The .theme-nx wrapper exposes --nx-* tokens that flip under
 * html.dark. Hero/CTA/Footer are always-dark (intentional). Light-surface
 * sections (Stats, Services, WhyChoose, Testimonials, FAQ) use the new
 * .nx-surface / .nx-text utility classes so they render with proper
 * contrast in both light and dark mode. */
export default function Home() {
  return (
    <div className="theme-nx min-h-screen nx-surface nx-text">
      <NxNavbar />
      <main>
        <NxHero />
        <NxLogoCloud />
        <NxStats />
        <NxServices />
        <NxWhyChoose />
        <NxProcess />
        <NxTestimonials />
        <NxFaq />
        <NxCta />
      </main>
      <NxFooter />
    </div>
  );
}
