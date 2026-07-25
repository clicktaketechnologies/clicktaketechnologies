/**
 * City × Service content composer — deterministic template that injects
 * city-specific hero, intro, FAQ, and LocalBusiness JSON-LD into every
 * city × service permutation. NO runtime LLM calls.
 *
 * Phase 3 #4 — Programmatic SEO.
 *
 * The composer pulls service content from the existing static SERVICES
 * array (and optionally from the deepDive JSON column for services
 * authored via Phase 3 #2's LLM flow). City context comes from
 * /src/lib/seo/cities.ts.
 *
 * Content uniqueness strategy (avoids Google's thin-content penalty):
 *   1. City-specific H1 + hero subtitle (180 words unique)
 *   2. City-specific intro paragraph (220-280 words, references local
 *      economy, industries, compliance, nearby regions)
 *   3. City-specific FAQ (5 questions, generated deterministically
 *      from city + service metadata)
 *   4. Service description (canonical) — same across cities but
 *      embedded in unique surrounding content
 *   5. City-specific LocalBusiness JSON-LD with geo coordinates
 *   6. Internal links: sibling cities for same service, sibling
 *      services in same city, canonical service page, city hub
 *
 * Pricing display uses the city's currency. Internal links reinforce
 * the Hub & Spoke architecture (Pillar 2).
 */

import type { City, Country } from "@/lib/seo/cities";
import { CITIES, COUNTRY_META, COUNTRY_ORDER, getNearbyCities } from "@/lib/seo/cities";
import type { ServiceItem } from "@/lib/site-data";
import { CATEGORY_STYLES, SERVICES, SITE } from "@/lib/site-data";

// ─── Types ──────────────────────────────────────────────────────────────

export type CityServiceContent = {
  city: City;
  service: ServiceItem;
  // Composed content
  hero: {
    h1: string;
    subtitle: string;
    eyebrow: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
  };
  localFaq: { q: string; a: string }[];
  // Canonical service content (re-used but wrapped in unique city content)
  serviceContent: {
    title: string;
    description: string;
    detailedDescription: string;
  };
  // Internal links
  links: {
    canonicalService: { label: string; href: string };
    cityHub: { label: string; href: string };
    siblingServices: { label: string; href: string; blurb: string }[];
    siblingCities: { label: string; href: string }[];
    nearbyCities: { label: string; href: string }[];
  };
  // SEO metadata
  meta: {
    title: string;
    description: string;
    canonical: string;
    keywords: string[];
  };
  // JSON-LD
  jsonLd: Record<string, unknown>[];
};

// ─── Composer ───────────────────────────────────────────────────────────

/**
 * Deterministically compose the city × service page content.
 *
 * Pure function — same (city, service) inputs always yield identical
 * output. Safe to call at build time inside generateStaticParams.
 */
export function composeCityServiceContent(city: City, service: ServiceItem): CityServiceContent {
  const cat = CATEGORY_STYLES[service.category];
  const cityCountry = COUNTRY_META[city.country];
  const nearbyCities = getNearbyCities(city.slug, 4);

  // ── Hero ──────────────────────────────────────────────────────────────
  const h1 = `${service.title} in ${city.name}`;
  const eyebrow = `${cat?.eyebrow || "Service"} · ${city.name}, ${cityCountry.name}`;

  const subtitle = `Production-grade ${service.title.toLowerCase()} for ${city.name} businesses across ${city.context.keyIndustries
    .slice(0, 3)
    .join(", ")
    .toLowerCase()} and the wider ${cityCountry.name} market. ${service.detailed_description || service.description} ClickTake Technologies ships from ${city.hasOffice ? `our ${city.name} office` : `our nearest delivery hub`} with ${city.context.complianceNotes ? `${city.context.complianceNotes}, ` : ""}and pricing from ${city.context.startingPriceFrom}. Book a free 30-minute consultation today.`;

  // ── Intro (220-280 words unique city-specific content) ────────────────
  const introHeading = `${service.title} tailored for ${city.name}'s ${city.context.keyIndustries[0]?.toLowerCase() || "business"} ecosystem`;
  const introParagraphs = [
    `${city.name} is ${city.context.economy} ${city.context.localContext}`,
    `For ${city.name} businesses, ${service.title.toLowerCase()} means moving beyond off-the-shelf tools. Our engagements target ${city.context.keyIndustries
      .slice(0, 4)
      .map((i) => i.toLowerCase())
      .join(", ")} — sectors where ${service.description.toLowerCase().replace(/\.$/, "")} translates directly into measurable revenue, operational efficiency, or compliance posture. ${city.context.complianceNotes ? `We engineer every deliverable to satisfy ${city.context.complianceNotes}.` : ""}`,
    `ClickTake Technologies delivers ${service.title.toLowerCase()} to ${city.name} ${city.hasOffice ? `from our local office at ${SITE.name}` : `remotely from our nearest delivery hub`}, with senior engineers in ${cityCountry.name} and a global delivery network spanning Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE). The result: enterprise-grade work at a meaningfully lower total cost of ownership than ${cityCountry.name}-only agencies, without compromising on quality, security, or speed.`,
  ];

  // ── Local FAQ (5 questions — deterministic, not LLM) ──────────────────
  const localFaq = buildLocalFaq(city, service);

  // ── Canonical service content (re-used) ───────────────────────────────
  const serviceContent = {
    title: service.title,
    description: service.description,
    detailedDescription: service.detailed_description || service.description,
  };

  // ── Internal links ────────────────────────────────────────────────────
  // Sibling services in same city — pick 4 most-relevant (same category first)
  const siblingServices = buildSiblingServiceLinks(city, service);

  // Sibling cities for same service — 4 nearest
  const siblingCities = nearbyCities.slice(0, 4).map((c) => ({
    label: `${service.title} in ${c.name}`,
    href: `/cities/${c.slug}/${service.slug}`,
  }));

  // Nearby cities (generic — without service suffix)
  const nearbyCityLinks = nearbyCities.map((c) => ({
    label: c.name,
    href: `/cities/${c.slug}`,
  }));

  const links: CityServiceContent["links"] = {
    canonicalService: {
      label: `View the full ${service.title} guide`,
      href: `/services/${service.slug}`,
    },
    cityHub: {
      label: `All ClickTake services in ${city.name}`,
      href: `/cities/${city.slug}`,
    },
    siblingServices,
    siblingCities,
    nearbyCities: nearbyCityLinks,
  };

  // ── SEO metadata ──────────────────────────────────────────────────────
  const metaTitle = `${service.title} ${city.name} | ${cat?.eyebrow || "ClickTake"}`;
  const metaDescription = `${service.title} in ${city.name}, ${cityCountry.name}. ${service.description} From ${city.context.startingPriceFrom}. ${city.hasOffice ? "Local office" : "Remote delivery"} with senior engineers across UK, Pakistan, USA, UAE. Book a free 30-minute consultation.`;
  const canonical = `${SITE.url}/cities/${city.slug}/${service.slug}`;
  const keywords = [
    `${service.title.toLowerCase()} ${city.name}`,
    `${service.title.toLowerCase()} ${cityCountry.name}`,
    `${service.title.toLowerCase()} ${city.regionCode}`,
    `${cat?.eyebrow?.toLowerCase()} ${city.name}`,
    `${service.title.toLowerCase()} agency ${city.name}`,
    `${service.title.toLowerCase()} company ${city.name}`,
    city.context.keyIndustries[0]?.toLowerCase(),
    `ClickTake ${city.name}`,
  ].filter(Boolean) as string[];

  // ── JSON-LD (LocalBusiness + Service + FAQ + Breadcrumb) ──────────────
  const jsonLd = buildJsonLd(city, service, canonical, localFaq);

  return {
    city,
    service,
    hero: { h1, subtitle, eyebrow },
    intro: { heading: introHeading, paragraphs: introParagraphs },
    localFaq,
    serviceContent,
    links,
    meta: {
      title: metaTitle,
      description: metaDescription,
      canonical,
      keywords,
    },
    jsonLd,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────

function buildLocalFaq(city: City, service: ServiceItem): { q: string; a: string }[] {
  const currency = city.context.currency;
  const country = COUNTRY_META[city.country].name;
  const cat = CATEGORY_STYLES[service.category];

  return [
    {
      q: `How much does ${service.title.toLowerCase()} cost in ${city.name}?`,
      a: `Pricing for ${service.title.toLowerCase()} in ${city.name} starts from ${city.context.startingPriceFrom} for MVP-scope engagements and scales with team size, integration complexity, and SLA requirements. Enterprise retainers typically range from ${currency}15,000 to ${currency}80,000 per month. We provide fixed-scope quotes after a free 30-minute consultation. All pricing is transparent — no hidden line items, no surprise overruns.`,
    },
    {
      q: `Does ClickTake have a physical office in ${city.name}?`,
      a: city.hasOffice
        ? `Yes. ClickTake Technologies has a ${city.name} office serving as our ${city.country === "GB" ? "registered headquarters" : city.country === "PK" ? "engineering & delivery hub" : city.country === "US" ? "North American business desk" : "MENA office"}. We deliver on-site discovery workshops, weekly check-ins for active engagements, and quarterly business reviews for retainer clients. For new enquiries, book a 30-minute consultation and we will arrange a same-week on-site visit if needed.`
        : `ClickTake does not have a physical office in ${city.name}, but we deliver ${service.title.toLowerCase()} remotely to ${city.name} businesses from our nearest ${country === "United Kingdom" ? "Birmingham" : country === "Pakistan" ? "Multan" : country === "United States" ? "Austin" : "Dubai"} hub. Our remote-first delivery model includes weekly video standups, shared Linear/Jira boards, and quarterly on-site visits for enterprise accounts. Most ${city.name} clients report zero friction with remote delivery after the first sprint.`,
    },
    {
      q: `Can you serve ${city.context.keyIndustries[0]?.toLowerCase() || "enterprise"} clients in ${city.name}?`,
      a: `Yes. ${city.name}'s ${city.context.keyIndustries.slice(0, 3).join(", ")} sectors are core to our ${country} practice. We have delivered ${service.title.toLowerCase()} engagements for clients ranging from ${city.context.keyIndustries[0]?.toLowerCase()} startups to regulated enterprises. ${city.context.complianceNotes ? `Every engagement satisfies ${city.context.complianceNotes}.` : ""} Book a consultation to discuss your specific use case — we will share relevant case studies under NDA.`,
    },
    {
      q: `How long does a typical ${service.title.toLowerCase()} engagement take in ${city.name}?`,
      a: `Discovery typically takes 1-2 weeks, MVP delivery 4-8 weeks, and production rollout 8-16 weeks depending on scope. ${cat?.eyebrow || "Service"} engagements in ${city.name} follow our standard delivery model: kickoff workshop (week 1), weekly demos (weeks 2-N), staging deployment (penultimate week), production launch (final week), and 30-day hypercare. Enterprise retainers run 6-24 months with monthly OKR reviews.`,
    },
    {
      q: `Do you work with ${city.name} businesses remotely?`,
      a: `Yes. Over 70% of our ${country} clients engage us in a remote-first model with on-site visits as needed. Our delivery model — honed across ${SITE.founded}-present engagements in ${country} and 14 other markets — uses Slack Connect, Linear, Figma, and weekly demos. We overlap with ${city.timezone} business hours for at least 4 hours per day. For ${city.name} specifically, ${city.hasOffice ? "on-site visits are available same-week" : "we visit quarterly for enterprise accounts"} and we provide local ${currency} invoicing.`,
    },
  ];
}

function buildSiblingServiceLinks(city: City, currentService: ServiceItem): { label: string; href: string; blurb: string }[] {
  // Same-category siblings first, then top services from other categories
  const sameCategory = SERVICES.filter(
    (s) => s.category === currentService.category && s.slug !== currentService.slug
  );
  const otherCategory = SERVICES.filter(
    (s) => s.category !== currentService.category && s.category !== "starter-kit"
  ).slice(0, 8);

  const picks = [...sameCategory.slice(0, 2), ...otherCategory.slice(0, 2)].slice(0, 4);

  return picks.map((s) => ({
    label: `${s.title} in ${city.name}`,
    href: `/cities/${city.slug}/${s.slug}`,
    blurb: s.description,
  }));
}

function buildJsonLd(
  city: City,
  service: ServiceItem,
  canonical: string,
  localFaq: { q: string; a: string }[],
): Record<string, unknown>[] {
  const country = COUNTRY_META[city.country];
  const cat = CATEGORY_STYLES[service.category];

  // 1. LocalBusiness — ClickTake serving this city
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/cities/${city.slug}#business`,
    name: `${SITE.name} — ${city.name}`,
    description: `${service.title} in ${city.name}, ${country.name}. ${service.description}`,
    url: canonical,
    telephone: SITE.phones[0].value,
    email: SITE.email,
    image: `${SITE.url}/og-image.png`,
    priceRange: `${city.context.currency}$$-$$$$`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.regionCode,
      addressCountry: city.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    areaServed: [
      { "@type": "City", name: city.name },
      ...getNearbyCities(city.slug, 3).map((c) => ({ "@type": "City", name: c.name })),
    ],
    parentOrganization: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  // 2. Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in ${city.name}`,
    serviceType: cat?.eyebrow || "Service",
    provider: { "@id": `${SITE.url}/cities/${city.slug}#business` },
    areaServed: { "@type": "City", name: city.name },
    description: service.detailed_description || service.description,
    url: canonical,
    offers: {
      "@type": "Offer",
      priceCurrency: city.context.currency,
      price: "0",
      availability: "https://schema.org/InStock",
      description: `Free 30-minute consultation. Engagements from ${city.context.startingPriceFrom}.`,
    },
  };

  // 3. FAQ schema
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // 4. Breadcrumb
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Cities", item: `${SITE.url}/cities` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${SITE.url}/cities/${city.slug}` },
      {
        "@type": "ListItem",
        position: 4,
        name: `${service.title} in ${city.name}`,
        item: canonical,
      },
    ],
  };

  return [localBusiness, serviceSchema, faq, breadcrumb];
}

// ─── City hub content (used by /cities/[city] index pages) ──────────────

export type CityHubContent = {
  city: City;
  hero: {
    h1: string;
    subtitle: string;
  };
  intro: string[];
  servicesForCity: { service: ServiceItem; href: string; blurb: string }[];
  nearbyCities: { name: string; href: string; country: string }[];
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  jsonLd: Record<string, unknown>[];
};

export function composeCityHubContent(city: City): CityHubContent {
  const country = COUNTRY_META[city.country];

  const h1 = `ClickTake Technologies — ${city.name}`;
  const subtitle = `Production-grade AI, web, marketing and creative services for ${city.name} businesses. From ${city.context.startingPriceFrom}. ${city.hasOffice ? "Local office" : "Remote delivery"} across ${country.name}.`;

  const intro = [
    `${city.name} is ${city.context.economy} ${city.context.localContext}`,
    `ClickTake Technologies has been delivering ${city.country === "GB" ? "across the UK" : city.country === "PK" ? "across Pakistan" : city.country === "US" ? "across the United States" : "across the UAE"} since ${SITE.founded}. Our ${city.hasOffice ? `${city.name} office` : `delivery team for ${city.name}`} ships production-grade AI applications, web platforms, marketing engines and creative systems to ${city.context.keyIndustries.slice(0, 3).join(", ").toLowerCase()} clients and the broader ${country.name} market.`,
    `Browse our ${SERVICES.filter((s) => s.category !== "starter-kit").length} services below — each available in ${city.name} with ${city.context.currency} pricing, ${city.context.complianceNotes ? `${city.context.complianceNotes}, ` : ""}and a free 30-minute consultation. Or jump to ${city.context.keyIndustries[0]?.toLowerCase() || "your"} use case directly.`,
  ];

  const servicesForCity = SERVICES.filter((s) => s.category !== "starter-kit").map((service) => ({
    service,
    href: `/cities/${city.slug}/${service.slug}`,
    blurb: service.description,
  }));

  const nearby = getNearbyCities(city.slug, 4).map((c) => ({
    name: c.name,
    href: `/cities/${c.slug}`,
    country: COUNTRY_META[c.country].name,
  }));

  // JSON-LD: ItemList of all services in this city + LocalBusiness
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/cities/${city.slug}#business`,
      name: `${SITE.name} — ${city.name}`,
      description: `AI, web, marketing and creative services in ${city.name}, ${country.name}.`,
      url: `${SITE.url}/cities/${city.slug}`,
      telephone: SITE.phones[0].value,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.regionCode,
        addressCountry: city.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
      areaServed: { "@type": "City", name: city.name },
      parentOrganization: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Cities", item: `${SITE.url}/cities` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${SITE.url}/cities/${city.slug}` },
      ],
    },
  ];

  return {
    city,
    hero: { h1, subtitle },
    intro,
    servicesForCity,
    nearbyCities: nearby,
    meta: {
      title: `${city.name} ${country.name} — ClickTake Technologies | AI · Web · Marketing`,
      description: `${city.name} ${country.name} services: AI, web development, SEO, paid ads, branding and video. From ${city.context.startingPriceFrom}. ${city.hasOffice ? "Local office" : "Remote delivery"}. Book a free consultation.`,
      canonical: `${SITE.url}/cities/${city.slug}`,
    },
    jsonLd,
  };
}

// ─── Cities index page content ──────────────────────────────────────────

export type CitiesIndexContent = {
  hero: { h1: string; subtitle: string };
  citiesByCountry: { country: (typeof COUNTRY_META)[Country]; cities: City[] }[];
  meta: { title: string; description: string; canonical: string };
  jsonLd: Record<string, unknown>[];
};

export function composeCitiesIndexContent(): CitiesIndexContent {
  const citiesByCountry = COUNTRY_ORDER.map((countryCode) => ({
    country: COUNTRY_META[countryCode],
    cities: CITIES.filter((c) => c.country === countryCode),
  })).filter((g) => g.cities.length > 0);

  return {
    hero: {
      h1: "ClickTake Technologies — Serving Cities Worldwide",
      subtitle:
        "Production-grade AI, web, marketing and creative services delivered across the UK, Pakistan, USA and UAE. Find your city below — or contact us if yours is not listed and we will serve you remotely.",
    },
    citiesByCountry,
    meta: {
      title: "Cities We Serve — ClickTake Technologies | UK · Pakistan · USA · UAE",
      description:
        "ClickTake Technologies serves businesses across Birmingham, London, Manchester, Multan, Lahore, Karachi, Islamabad, Austin, New York, San Francisco, Dubai and Abu Dhabi. Find local AI, web, marketing and creative services.",
      canonical: `${SITE.url}/cities`,
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Cities", item: `${SITE.url}/cities` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cities served by ClickTake Technologies",
        itemListElement: CITIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${c.name}, ${COUNTRY_META[c.country].name}`,
          url: `${SITE.url}/cities/${c.slug}`,
        })),
      },
    ],
  };
}
