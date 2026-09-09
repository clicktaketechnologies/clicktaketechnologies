import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityHubPage } from "@/components/site/pages/city-hub-page";
import { CityServicePage } from "@/components/site/pages/city-service-page";
import {
  composeCityHubContent,
  composeCityServiceContent,
} from "@/lib/seo/city-service-content";
import { CITIES, getCity } from "@/lib/seo/cities";
import { SERVICES } from "@/lib/site-data";
import { JsonLd } from "@/components/site/json-ld";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
/**
 * /cities/[city]            → city hub (lists all services in that city)
 * /cities/[city]/[service]  → city × service landing page
 *
 * Phase 3 #4 — Programmatic SEO.
 *
 * Both paths are statically generated at build time via generateStaticParams
 * — no runtime DB or LLM calls. With 12 cities × 25 services this emits
 * 312 unique URLs + 1 cities index = 313 programmatic SEO pages.
 */

export const dynamic = "force-static";
export const revalidate = 86400; // Daily revalidation.

interface Params {
  params: Promise<{ city: string; service?: string[] }>;
}

// ─── Static params: enumerate every (city) and (city, service) combo ──────

export async function generateStaticParams() {
  // City hubs: /cities/[city]
  const cityHubs = CITIES.map((c) => ({ city: c.slug, service: [] }));

  // City × service: /cities/[city]/[...service]
  const cityServices: { city: string; service: string[] }[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      // Skip the starter-kit on city pages — it's a flagship bundle, not a per-city service
      if (service.category === "starter-kit") continue;
      // Service slugs like "ai/llm" → split into ["ai", "llm"]
      cityServices.push({ city: city.slug, service: service.slug.split("/") });
    }
  }

  return [...cityHubs, ...cityServices];
}

// ─── Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: citySlug, service: serviceSegments } = await params;
  const city = getCity(citySlug);
  if (!city) return { title: "City not found" };

  // City hub page
  if (!serviceSegments || serviceSegments.length === 0) {
    const content = composeCityHubContent(city);
    return {
      title: content.meta.title,
      description: content.meta.description,
      alternates: { canonical: content.meta.canonical },
      openGraph: {
        images: [DEFAULT_OG_IMAGE],
    title: content.meta.title,
        description: content.meta.description,
        url: content.meta.canonical,
        type: "website",
        locale: city.context.languages[0] || "en_GB",
      },
      twitter: {
        card: "summary_large_image",
        title: content.meta.title,
        description: content.meta.description,
      },
      keywords: [
        `ClickTake ${city.name}`,
        `${city.name} services`,
        `${city.name} web design services`,
        `web design services ${city.name}`,
        `${city.name} AI`,
        `${city.name} web development`,
        `${city.name} SEO`,
        `${city.name} marketing`,
        `${city.name} creative agency`,
      ],
      other: {
        "geo.region": city.regionCode,
        "geo.placename": city.name,
        "geo.position": `${city.lat};${city.lng}`,
        ICBM: `${city.lat}, ${city.lng}`,
      },
    };
  }

  // City × service page
  const serviceSlug = serviceSegments.join("/");
  const service = SERVICES.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Service not found" };

  const content = composeCityServiceContent(city, service);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.meta.canonical },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],
    title: content.meta.title,
      description: content.meta.description,
      url: content.meta.canonical,
      type: "article",
      locale: city.context.languages[0] || "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
    keywords: content.meta.keywords,
    other: {
      "geo.region": city.regionCode,
      "geo.placename": city.name,
      "geo.position": `${city.lat};${city.lng}`,
      ICBM: `${city.lat}, ${city.lng}`,
    },
  };
}

// ─── Page render ──────────────────────────────────────────────────────────

export default async function Page({ params }: Params) {
  const { city: citySlug, service: serviceSegments } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  // City hub page
  if (!serviceSegments || serviceSegments.length === 0) {
    const content = composeCityHubContent(city);
    return (
      <>
        <JsonLd data={content.jsonLd} />
        <CityHubPage content={content} />
      </>
    );
  }

  // City × service page
  const serviceSlug = serviceSegments.join("/");
  const service = SERVICES.find((s) => s.slug === serviceSlug);
  if (!service) notFound();

  const content = composeCityServiceContent(city, service);
  return (
    <>
      <JsonLd data={content.jsonLd} />
      <CityServicePage content={content} />
    </>
  );
}
