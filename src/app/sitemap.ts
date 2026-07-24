import type { MetadataRoute } from "next";
import { SERVICES, SOLUTIONS, BLOG_POSTS, CASE_STUDIES, SITE } from "@/lib/site-data";

/**
 * Sitemap.
 *
 * Canonical host is the apex domain (https://clicktaketech.com). The www
 * subdomain 308-redirects to apex via middleware, so emitting www URLs in
 * the sitemap would force Googlebot through a redirect on every page —
 * wasting crawl budget and diluting canonical signals.
 */
const BASE = SITE.url; // https://clicktaketech.com

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

  return [...staticRoutes, ...serviceRoutes, ...solutionRoutes, ...blogRoutes, ...caseStudyRoutes];
}
