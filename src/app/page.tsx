import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Work } from "@/components/site/work";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { About } from "@/components/site/about";
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

          <Work />

          <SectionDivider />

          <Process />

          <SectionDivider flip />

          <Testimonials />

          <SectionDivider />

          <About />

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
