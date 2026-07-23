import { SITE } from "@/lib/site-data";

/**
 * Renders one or more JSON-LD blocks in a Next.js page.
 *
 * Usage:
 *   <JsonLd data={serviceSchema} />
 *   <JsonLd data={[serviceSchema, breadcrumbSchema]} />
 *
 * Each entry is rendered as its own <script type="application/ld+json"> tag
 * so Rich Results Test / Google Search Console can attribute errors
 * precisely.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}

/**
 * Build a schema.org Service block for a service detail page.
 *
 * @see https://schema.org/Service
 */
export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  category?: string;
  providerName?: string;
}) {
  const url = `${SITE.url}/services/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url,
    serviceType: opts.category || "Service",
    provider: {
      "@type": "Organization",
      name: opts.providerName || SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phones.map((p) => p.value).join(", "),
      areaServed: SITE.locations.map((l) => ({
        "@type": "Place",
        name: `${l.city}, ${l.country}`,
      })),
    },
    areaServed: SITE.locations.map((l) => ({
      "@type": "Place",
      name: `${l.city}, ${l.country}`,
    })),
  };
}

/**
 * Build a schema.org BreadcrumbList from a list of {name, path} items.
 * The first item is implicitly Home and will be prepended automatically
 * unless `prependHome` is false.
 *
 * @see https://schema.org/BreadcrumbList
 */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  opts: { prependHome?: boolean } = {}
) {
  const crumbs =
    opts.prependHome === false
      ? items
      : [{ name: "Home", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}
