import type { MetadataRoute } from "next";
import { SERVICES, RESOURCES } from "@/lib/site-data";

const BASE = "https://www.clicktaketech.com";

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

  const resourceRoutes = RESOURCES.map((r) => ({
    url: `${BASE}/resources/${r.slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes, ...resourceRoutes];
}
