import type { Metadata } from "next";
import { CaseStudiesIndexPage } from "@/components/site/pages/case-studies-page";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildReviewJsonLd,
  buildAggregateRatingJsonLd,
} from "@/components/site/json-ld";
import { SITE, TESTIMONIALS } from "@/lib/site-data";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { truncateMeta } from "@/lib/seo/meta-helpers";
export const metadata: Metadata = {
  title: "Case Studies — Real Engagements, Real Metrics",
  description: truncateMeta(
    "ClickTake Technologies case studies — SEO growth, website redesign, e-commerce, social media, custom SaaS, and branding/video editing engagements across the UK, Pakistan, USA and Dubai. Real metrics, no fake results. Engagements in progress are labeled as such."
  ),
  keywords: [
    "ClickTake case studies",
    "SEO case study UK",
    "website redesign case study",
    "ecommerce case study",
    "SaaS case study",
    "branding case study",
  ],
  alternates: { canonical: "https://clicktaketech.com/case-studies" },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "ClickTake Case Studies — Real Engagements, Real Metrics",
    description:
      "Real case studies with verifiable metrics across SEO, web, e-commerce, SaaS, branding and social. No fake results.",
    url: "https://clicktaketech.com/case-studies",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Case Studies",
    description: "Real engagements, real metrics, no fake case studies.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Case Studies", path: "/case-studies" },
  ]);

  // AggregateRating + Reviews — uses the same testimonials as the homepage.
  // Renders as a rich result on Google for "ClickTake case studies" queries.
  const reviews = TESTIMONIALS.slice(0, 6).map((t) =>
    buildReviewJsonLd({
      author: t.name,
      rating: t.rating || 5,
      body: t.quote,
      datePublished: "2024-09-01",
    }),
  );
  const aggRating = buildAggregateRatingJsonLd({
    ratingValue: 4.9,
    reviewCount: reviews.length,
  });
  // Wrap as an Organization schema with reviews — Google rich results
  // require the rating to be attached to a Product, Organization, or
  // LocalBusiness. We use Organization here so the rating applies to the
  // agency itself, not to any single case study.
  const orgWithReviews = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    aggregateRating: aggRating,
    review: reviews,
  };

  return (
    <>
      <JsonLd data={[breadcrumb, orgWithReviews]} />
      <CaseStudiesIndexPage />
    </>
  );
}
