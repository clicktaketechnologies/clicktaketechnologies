import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home } from "lucide-react";
import { BackgroundScene } from "@/components/site/background-scene";
import { CustomCursor } from "@/components/site/custom-cursor";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollProgressBar, ScrollToTop } from "@/components/site/scroll-animations";

/**
 * 404 page metadata.
 *
 * - `robots.index: false` ensures the 404 page itself is never indexed.
 * - `alternates.canonical` is intentionally omitted so no canonical tag is
 *   emitted. Pointing a 404 canonical at the homepage creates a soft-404
 *   signal in Google Search Console (Google treats it as "this URL is
 *   basically the homepage, so don't index it as a separate page" — which
 *   then hides the real 404 from reports).
 * - Title is short and explicit so the 404 is recognizable in SERPs and tabs.
 */
export const metadata: Metadata = {
  title: "Page not found (404)",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 min-h-screen grid place-items-center px-4 pt-32 pb-16">
        <div className="text-center max-w-md">
          <div className="text-[10rem] font-black leading-none gradient-text">404</div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist — or it moved.
            Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
            >
              <Home className="h-4 w-4" /> Go home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-secondary transition"
            >
              <ArrowLeft className="h-4 w-4" /> Browse services
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
