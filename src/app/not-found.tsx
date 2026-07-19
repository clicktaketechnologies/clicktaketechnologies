import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { BackgroundScene } from "@/components/site/background-scene";
import { CustomCursor } from "@/components/site/custom-cursor";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollProgressBar, ScrollToTop } from "@/components/site/scroll-animations";

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
