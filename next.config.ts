import type { NextConfig } from "next";

/**
 * Hybrid deployment config.
 *
 * - Frontend (public pages): Cloudflare Workers via @opennextjs/cloudflare.
 * - Backend (API + admin): Render (or any Node host) via `next start`.
 *
 * Proxying of /api/* and /admin/* to the Render backend is done at runtime
 * by src/middleware.ts (reads `BACKEND_URL` env var on each request). This
 * lets you change the backend URL without rebuilding the Worker.
 *
 * If `BACKEND_URL` is not set, the Worker serves everything itself (used in
 * dev or when running everything on a single host like Render).
 */
const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // FIX-I (audit): suppress the X-Powered-By: Next.js header at the source.
  // Middleware can't delete it because Next.js sets it AFTER middleware runs.
  poweredByHeader: false,
};

export default nextConfig;
