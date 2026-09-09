"use client";

/**
 * Root error boundary — catches runtime errors thrown during render of any
 * route segment under /app, replaces the broken subtree with a branded
 * recovery UI, and offers a hard-reset button. This preserves the global
 * navbar/footer (rendered by layout.tsx) so visitors never lose navigation.
 *
 * Next.js requires error.tsx to be a Client Component.
 */
import { useEffect } from "react";
import Link from "next/link";
import { RotateCw, Home, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for now — replace with Sentry/Datadog when wired up.
    // eslint-disable-next-line no-console
    console.error("[ClickTake] route error boundary:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="relative min-h-[70vh] flex items-center justify-center px-4 py-20"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(155,61,255,0.10),transparent_60%)]" />
      <div className="relative max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF8AC4]" />
          Something went wrong
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-foreground bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
          Unexpected error
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          An unexpected error occurred while rendering this page. Our team has
          been notified. Try refreshing — if the problem persists, head back to
          the homepage or use the navigation above.
        </p>
        {error?.digest && (
          <p className="mt-3 text-[11px] text-muted-foreground/70 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(155,61,255,0.35)] hover:scale-[1.02] active:scale-95 transition"
          >
            <RotateCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-foreground hover:bg-white/10 transition"
          >
            <Home className="h-4 w-4" />
            Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
