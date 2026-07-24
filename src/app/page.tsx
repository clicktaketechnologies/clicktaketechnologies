import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { WhyChoose } from "@/components/site/why-choose";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { BackgroundScene } from "@/components/site/background-scene";
import { CustomCursor } from "@/components/site/custom-cursor";
import {
  ScrollProvider,
  ScrollProgressBar,
  ScrollToTop,
  SectionDivider,
} from "@/components/site/scroll-animations";

/* Homepage — new design (Task ID: new-design-rebuild).
 * Section order: Hero → Services (category tabs) → Why Choose (NEW) →
 * Process (6-step) → Testimonials (kept) → FAQ (NEW) → Final CTA (simplified).
 * Work + About sections removed; their content is now reachable via the
 * Resources + Company mega menus in the navbar. */
export default function Home() {
  return (
    <ScrollProvider>
      {/* Fixed full-screen animated canvas (tech grid, data streams, ripples) */}
      <BackgroundScene />

      {/* Custom aperture cursor with comet trail */}
      <CustomCursor />

      {/* Top scroll progress bar */}
      <ScrollProgressBar />

      <div className="relative z-10 min-h-screen bg-transparent">
        <Navbar />
        <main>
          <Hero />

          <SectionDivider />

          <Services />

          <SectionDivider flip />

          <WhyChoose />

          <SectionDivider />

          <Process />

          <SectionDivider flip />

          <Testimonials />

          <SectionDivider />

          <Faq />

          <SectionDivider flip />

          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating scroll-to-top button */}
      <ScrollToTop />
    </ScrollProvider>
  );
}
