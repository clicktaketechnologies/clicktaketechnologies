import type { MetadataRoute } from "next";
import { SERVICES, SITE } from "@/lib/site-data";

/**
 * Sitemap.
 *
 * Canonical host is the apex domain (https://clicktaketech.com). The www
 * subdomain 308-redirects to apex via middleware, so emitting www URLs in
 * the sitemap would force Googlebot through a redirect on every page —
 * wasting crawl budget and diluting canonical signals.
 *
 * Resource article URLs (/resources/<slug>) are intentionally omitted
 * because no /resources/[slug]/page.tsx route exists yet — the RESOURCES
 * array only feeds the listing card on /resources. Including them would
 * produce 7 sitemap 404s in GSC. When the article route is built, re-enable
 * the resourceRoutes block below.
 */
const BASE = SITE.url; // https://clicktaketech.com

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/portfolio`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/resources`, priority: 0.7, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/legal/privacy`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
    { url: `${BASE}/legal/terms`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
    { url: `${BASE}/legal/cookies`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
  ];

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  // NOTE: /resources/<slug> routes omitted — see comment at top of file.
  // When /resources/[slug]/page.tsx ships, uncomment this block:
  //
  //   const resourceRoutes = RESOURCES.map((r) => ({
  //     url: `${BASE}/resources/${r.slug}`,
  //     priority: 0.5,
  //     changeFrequency: "monthly" as const,
  //     lastModified: now,
  //   }));

  return [...staticRoutes, ...serviceRoutes];
}
