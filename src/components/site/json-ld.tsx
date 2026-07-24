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

/**
 * Build a schema.org FAQPage from a list of {q, a} items.
 *
 * @see https://schema.org/FAQPage
 */
export function buildFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Build a schema.org Article (or BlogPosting) block for a blog post.
 *
 * @see https://schema.org/Article
 * @see https://schema.org/BlogPosting
 */
export function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishedAt: string; // ISO date
  modifiedAt?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}) {
  const url = `${SITE.url}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt || opts.publishedAt,
    articleSection: opts.category || "Blog",
    keywords: (opts.tags || []).join(", "),
    author: {
      "@type": "Organization",
      name: opts.author || SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/clicktake-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: opts.imageUrl
      ? {
          "@type": "ImageObject",
          url: opts.imageUrl,
        }
      : undefined,
  };
}

/**
 * Build a schema.org WebSite block for the root site. Useful as a
 * sitelinks searchbox carrier and for general site-level discovery.
 *
 * @see https://schema.org/WebSite
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description:
      "AI-powered digital agency engineering websites, SaaS platforms, mobile apps and growth systems for ambitious brands across the UK, Pakistan, USA and Dubai.",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
