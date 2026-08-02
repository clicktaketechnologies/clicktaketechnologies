import type { Metadata } from "next";
import { Glitch404 } from "@/components/site/enhanced/glitch-404";

/**
 * 404 page — now uses the interactive Glitch404 component.
 *
 * Server component wrapper so we can set metadata (noindex/nofollow)
 * without paying the client-bundle cost. The Glitch404 client component
 * handles all the interactive bits (3D tilt, search, auto-redirect).
 *
 * - `robots: { index: false, follow: false }` overrides the layout's
 *   `index: true, follow: true` so the 404 is never indexed.
 * - `alternates.canonical: ""` — a 404 has no canonical URL.
 */
export const metadata: Metadata = {
  title: "Page not found (404)",
  robots: { index: false, follow: false },
  alternates: { canonical: "" },
};

export default function NotFound() {
  return <Glitch404 />;
}
