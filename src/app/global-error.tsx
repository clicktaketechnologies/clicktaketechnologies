"use client";

/**
 * Global error boundary — catches errors that error.tsx CANNOT, namely
 * errors thrown by root layout.tsx itself. Per Next.js docs, this component
 * replaces the entire document (including <html> and <body>) so it must
 * bring its own document shell.
 *
 * Keep this file dependency-free (no UI library imports) so a broken
 * layout/chunk can never take this fallback down with it.
 */
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[ClickTake] global error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#03000D",
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(155,61,255,0.12), transparent 60%)",
          color: "#F4F0FF",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              padding: "0.25rem 0.75rem",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "9999px",
                background: "#FF8AC4",
              }}
            />
            Critical error
          </div>
          <h1
            style={{
              marginTop: "1.5rem",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              backgroundImage:
                "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              margin: "1.5rem 0 0",
            }}
          >
            Application error
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "rgba(244,240,255,0.7)",
            }}
          >
            A critical error prevented the page from loading. Try refreshing —
            if the problem persists, the issue has been logged and our team
            will investigate shortly.
          </p>
          {error?.digest && (
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "11px",
                color: "rgba(244,240,255,0.5)",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "9999px",
                backgroundImage:
                  "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(155,61,255,0.35)",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#F4F0FF",
                textDecoration: "none",
              }}
            >
              Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
