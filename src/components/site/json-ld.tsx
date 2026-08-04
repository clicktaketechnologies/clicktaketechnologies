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
    // Google Article rich result REQUIRES an `image` field. Previously
    // this emitted `image: undefined` when no imageUrl was supplied, which
    // JSON.stringify strips — leaving the Article schema without any image
    // and forfeiting rich-result eligibility. Fall back to the site-wide
    // default OG image so the field is always populated.
    image: {
      "@type": "ImageObject",
      url: opts.imageUrl || `${SITE.url}/og-default.png`,
      width: 1200,
      height: 630,
    },
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

/**
 * Build a schema.org Product block with nested Offers, suitable for a
 * pricing page. Each "plan" becomes a Product with one Offer.
 *
 * @see https://schema.org/Product
 * @see https://schema.org/Offer
 *
 * Example:
 *   buildProductJsonLd({
 *     name: "Starter",
 *     description: "5-page mobile-first Next.js site + foundational SEO",
 *     slug: "starter",
 *     priceFrom: "£1,500",
 *     billing: "one-off project",
 *   })
 */
export function buildProductJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  priceFrom: string;
  billing: string;
  category?: string;
}) {
  // Extract numeric value + currency from "£1,500" / "$3,000" / "£20,000"
  const m = opts.priceFrom.match(/([£$€₨])\s*([\d,]+)/);
  const currencyMap: Record<string, string> = {
    "£": "GBP",
    "$": "USD",
    "€": "EUR",
    "₨": "PKR",
  };
  const currency = m ? currencyMap[m[1]] || "GBP" : "GBP";
  const price = m ? Number(m[2].replace(/,/g, "")) : 0;

  // Schema.org correctness: when `priceFrom` is a non-numeric string like
  // "Let's talk" or "Custom", emitting `price: "0"` causes Google Merchant
  // to display a fake £0 price tag. Instead, omit the Offer entirely — the
  // Product schema is still valid without an Offer, and we surface the
  // human-readable price string via the `description` field so the info is
  // not lost.
  const hasParseablePrice = price > 0;
  const offer = hasParseablePrice
    ? {
        "@type": "Offer",
        price: String(price),
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(price),
          priceCurrency: currency,
          description: `${opts.priceFrom} — ${opts.billing}`,
        },
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        url: `${SITE.url}/contact`,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${opts.name} — ${SITE.name}`,
    // Append the human-readable price string to the description so the
    // pricing info is still surfaced in AI search / rich snippets even
    // when we can't emit a numeric Offer.
    description: hasParseablePrice
      ? opts.description
      : `${opts.description} — Pricing: ${opts.priceFrom} (${opts.billing}). Contact us for a fixed-scope quote.`,
    category: opts.category || "Professional Services",
    url: `${SITE.url}/pricing#${opts.slug}`,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    ...(offer ? { offers: offer } : {}),
  };
}

/**
 * Build a schema.org Review block. Useful for testimonial sections.
 *
 * @see https://schema.org/Review
 */
export function buildReviewJsonLd(opts: {
  author: string;
  rating: number; // 1-5
  body: string;
  datePublished?: string;
}) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: opts.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(opts.rating),
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: opts.datePublished,
    reviewBody: opts.body,
  };
}

/**
 * Build a schema.org AggregateRating block — typically merged into a
 * Product or Organization schema.
 *
 * @see https://schema.org/AggregateRating
 */
export function buildAggregateRatingJsonLd(opts: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@type": "AggregateRating",
    ratingValue: String(opts.ratingValue),
    reviewCount: String(opts.reviewCount),
    bestRating: String(opts.bestRating || 5),
    worstRating: "1",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ProfessionalService + VideoObject — used by the B2B Video Production page
// (/services/creative/video-production). These helpers emit the richer
// schema.org types needed for Google Rich Results eligibility (multi-offer
// catalog, video rich result, areaServed, audience).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single offer in the ProfessionalService catalog.
 */
export type ServiceCatalogOffer = {
  serviceName: string;
  serviceDescription: string;
  minPrice: number;
  maxPrice?: number;
  currency?: string; // ISO 4217, defaults to GBP
};

/**
 * Build a schema.org ProfessionalService block with an OfferCatalog,
 * suitable for a B2B service landing page that lists multiple service
 * tiers (e.g. explainer video, brand film, performance ad).
 *
 * The `description` field should replicate the on-page GEO answer block
 * verbatim — this maximises LLM citation consistency between the visible
 * page content and the structured data.
 *
 * @see https://schema.org/ProfessionalService
 * @see https://schema.org/OfferCatalog
 */
export function buildProfessionalServiceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
  priceRange?: string; // e.g. "£££"
  serviceType: string;
  audienceType?: string; // e.g. "B2B SaaS / Enterprise"
  offers?: ServiceCatalogOffer[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
}) {
  const url = `${SITE.url}/services/${opts.slug}`;
  const currency = "GBP"; // default for UK-targeted pages

  const offerCatalog =
    opts.offers && opts.offers.length > 0
      ? {
          "@type": "OfferCatalog",
          name: opts.name,
          itemListElement: opts.offers.map((o) => {
            // Schema.org correctness: when a service has a genuine price
            // range (maxPrice !== minPrice), emitting BOTH `price` (fixed)
            // AND `priceSpecification.minPrice/maxPrice` is contradictory
            // and Google flags it. Use `price` only when the offer is a
            // single fixed price; for ranges, rely on `priceSpecification`
            // alone.
            const hasRange =
              typeof o.maxPrice === "number" && o.maxPrice !== o.minPrice;
            const offerCurrency = o.currency || currency;
            const priceSpec = {
              "@type": "PriceSpecification",
              minPrice: o.minPrice,
              maxPrice: o.maxPrice ?? o.minPrice,
              priceCurrency: offerCurrency,
            };
            return {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.serviceName,
                description: o.serviceDescription,
              },
              priceCurrency: offerCurrency,
              ...(hasRange
                ? {} // range — omit fixed `price`, use priceSpecification only
                : { price: String(o.minPrice) }),
              priceSpecification: priceSpec,
            };
          }),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: opts.name,
    description: opts.description,
    url,
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
    ...(opts.priceRange ? { priceRange: opts.priceRange } : {}),
    serviceType: opts.serviceType,
    ...(opts.audienceType
      ? {
          audience: {
            "@type": "BusinessAudience",
            audienceType: opts.audienceType,
          },
        }
      : {}),
    provider: {
      "@type": "Organization",
      name: SITE.name,
      legalName: "ClickTake Technologies Ltd",
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phones.map((p) => p.value).join(", "),
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/clicktake-logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/company/click-take-technologies",
        "https://github.com/clicktaketechnologies",
      ],
    },
    areaServed: SITE.locations.map((l) => ({
      "@type": "Place",
      name: `${l.city}, ${l.country}`,
    })),
    ...(offerCatalog ? { hasOfferCatalog: offerCatalog } : {}),
    ...(opts.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(opts.aggregateRating.ratingValue),
            reviewCount: String(opts.aggregateRating.reviewCount),
            bestRating: String(opts.aggregateRating.bestRating || 5),
            worstRating: "1",
          },
        }
      : {}),
  };
}

/**
 * Build a schema.org VideoObject block for a video embedded on a page.
 *
 * Required for Google Video rich results and for AI Overview citation
 * of video content. The `transcript` field is the single highest-leverage
 * field for AI search eligibility — populate it verbatim from the
 * showreel voiceover.
 *
 * @see https://schema.org/VideoObject
 * @see https://developers.google.com/search/docs/appearance/structured-data/video
 */
export function buildVideoObjectJsonLd(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601, e.g. "2026-08-04T00:00:00+01:00"
  contentUrl?: string; // direct MP4 URL
  embedUrl?: string; // Vimeo/YouTube player URL
  duration: string; // ISO 8601 duration, e.g. "PT1M30S"
  transcript?: string; // verbatim voiceover, [timecode] format
  regionsAllowed?: string[]; // ISO 3166-1 alpha-2
  watchCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.embedUrl ? { embedUrl: opts.embedUrl } : {}),
    duration: opts.duration,
    ...(opts.transcript ? { transcript: opts.transcript } : {}),
    ...(opts.regionsAllowed ? { regionsAllowed: opts.regionsAllowed } : {}),
    ...(typeof opts.watchCount === "number"
      ? { watchCount: opts.watchCount }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/clicktake-logo.png`,
        // Google Video rich result spec requires publisher.logo to be an
        // ImageObject with explicit width + height (in pixels). Omitting
        // these causes Google Rich Results Test to flag the VideoObject
        // as invalid.
        width: 512,
        height: 512,
      },
    },
  };
}
