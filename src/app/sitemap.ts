import type { MetadataRoute } from "next";
import { SERVICES, SOLUTIONS, BLOG_POSTS, CASE_STUDIES, RESOURCES, CAREER_ROLES, SITE } from "@/lib/site-data";
import { CITIES } from "@/lib/seo/cities";

/**
 * Sitemap.
 *
 * Canonical host is the apex domain (https://clicktaketech.com). The www
 * subdomain 308-redirects to apex via middleware, so emitting www URLs in
 * the sitemap would force Googlebot through a redirect on every page —
 * wasting crawl budget and diluting canonical signals.
 *
 * Phase 3 #4 (Programmatic SEO) adds:
 *   - 1 /cities index page
 *   - CITIES.length city hub pages  (/cities/[city])
 *   - CITIES.length × SERVICES.length city × service pages
 *     (/cities/[city]/[service-slug])
 *
 * City × service priority is set by the city's searchTier (3=high, 2=med, 1=low)
 * to bias Googlebot's crawl budget toward the highest-intent markets first.
 *
 * Phase 5 #1 (Audit fixes) adds:
 *   - /services/[category] parent index pages (creative, web, ai, digital-marketing)
 *   - /careers/[slug] detail pages for each open role
 *   - /resources/[slug] detail pages for each playbook/guide
 */
const BASE = SITE.url; // https://clicktaketech.com

// Tier → sitemap priority mapping
const TIER_PRIORITY: Record<1 | 2 | 3, number> = {
  3: 0.8, // High search-volume cities (Birmingham, London, Austin, SF, Dubai, etc.)
  2: 0.6, // Medium (Manchester, Leeds, Islamabad, Abu Dhabi)
  1: 0.5, // Low — kept for completeness
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/solutions`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/portfolio`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/case-studies`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/pricing`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/team`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/careers`, priority: 0.7, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/resources`, priority: 0.7, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/cities`, priority: 0.9, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/legal/privacy`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
    { url: `${BASE}/legal/terms`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
    { url: `${BASE}/legal/cookies`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: now },
  ];

  // Detail pages for each service (e.g. /services/web/wordpress)
  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  // Parent service category index pages (e.g. /services/web, /services/ai)
  // The catch-all /services/[[...slug]] route auto-renders these from the
  // SERVICES array — they were missing from the sitemap, causing an audit
  // "Indexable page not in sitemap" notice for 4 parent pages.
  const serviceCategoryRoutes = Array.from(
    new Set(SERVICES.map((s) => s.category))
  ).map((category) => ({
    url: `${BASE}/services/${category}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: new Date(p.publishedAt),
  }));

  const caseStudyRoutes = CASE_STUDIES.map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  // Resource detail pages — were missing from sitemap, causing 6 "Indexable
  // page not in sitemap" notices for /resources/[slug] pages.
  const resourceRoutes = RESOURCES.map((r) => ({
    url: `${BASE}/resources/${r.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  // Career detail pages — were missing from sitemap, causing 5 "Indexable
  // page not in sitemap" notices for /careers/[slug] pages.
  const careerRoutes = CAREER_ROLES.map((r) => ({
    url: `${BASE}/careers/${r.slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
    lastModified: now,
  }));

  // ─── Phase 3 #4 — Programmatic SEO routes ──────────────────────────────
  const programmaticCityHubRoutes = CITIES.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    priority: c.hasOffice ? 0.9 : 0.7, // Office cities get a small boost
    changeFrequency: "weekly" as const,
    lastModified: now,
  }));

  const programmaticCityServiceRoutes = CITIES.flatMap((city) =>
    SERVICES.filter((s) => s.category !== "starter-kit").map((service) => ({
      url: `${BASE}/cities/${city.slug}/${service.slug}`,
      priority: TIER_PRIORITY[city.searchTier],
      changeFrequency: "monthly" as const,
      lastModified: now,
    }))
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...serviceCategoryRoutes,
    ...solutionRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...resourceRoutes,
    ...careerRoutes,
    ...programmaticCityHubRoutes,
    ...programmaticCityServiceRoutes,
  ];
}
