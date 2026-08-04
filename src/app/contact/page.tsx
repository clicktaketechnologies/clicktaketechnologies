import type { Metadata } from "next";
import { ContactPage } from "@/components/site/pages/contact-page";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildAggregateRatingJsonLd,
} from "@/components/site/json-ld";
import { SITE, TESTIMONIALS } from "@/lib/site-data";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { truncateMeta } from "@/lib/seo/meta-helpers";

// /contact?subject=<topic> URLs are anchor-jumps to a pre-filled form section
// on the same /contact page. Mark them noindex so Google keeps only the
// canonical /contact page in the index.
export function generateMetadata({ searchParams }: { searchParams: Promise<{ subject?: string }> }): Promise<Metadata> {
  return searchParams.then((sp) => {
    const hasSubject = Boolean(sp.subject);
    const base: Metadata = {
      title: "Contact — Free 30-min Consult",
      description: truncateMeta(
        "Contact ClickTake Technologies. Submit a project inquiry or book a free 30-minute discovery call. Offices in Birmingham (UK HQ), Multan (Pakistan engineering hub), Austin TX (USA desk) and Dubai (UAE/MENA office). Phones: +44 7391 653377 (UK), +92 306 9753003 (PK). Email: Info@clicktaketech.com. We respond within one business day."
      ),
      keywords: [
        "contact ClickTake Technologies",
        "hire digital agency Birmingham",
        "book discovery call UK",
        "AI development company contact",
        "software development Pakistan contact",
        "Austin Texas web agency contact",
        "Dubai digital agency contact",
        "free consultation AI agency",
        "callback request software agency",
        "ClickTake email phone",
      ],
      alternates: { canonical: "https://clicktaketech.com/contact" },
      openGraph: {
        images: [DEFAULT_OG_IMAGE],
        title: "Contact ClickTake Technologies — Free 30-min Consultation",
        description: truncateMeta(
          "Project inquiry form, discovery-call scheduler and full office details across UK, Pakistan, USA and Dubai. 24-hour response guarantee."
        ),
        url: "https://clicktaketech.com/contact",
        type: "website",
        locale: "en_GB",
      },
      twitter: {
        card: "summary_large_image",
        title: "Contact ClickTake Technologies",
        description: truncateMeta(
          "Get in touch — offices in Birmingham, Multan, Austin and Dubai. Free 30-min discovery call. 24-hour response."
        ),
      },
      other: {
        "geo.region": "GB-PK-US-AE",
        "geo.placename": "Birmingham, Multan, Austin, Dubai",
      },
    };
    if (hasSubject) {
      return {
        ...base,
        robots: { index: false, follow: true },
      };
    }
    return base;
  });
}

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Contact", path: "/contact" },
  ]);

  // ContactPage schema — tells Google this is the contact page for the
  // Organization. Improves knowledge-panel accuracy.
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE.url}/contact`,
    name: "Contact ClickTake Technologies",
    description:
      "Project inquiry form, discovery-call scheduler and full office details across UK, Pakistan, USA and Dubai. 24-hour response guarantee.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phones.map((p) => p.value).join(", "),
      contactPoint: SITE.phones.map((p) => ({
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: p.value,
        areaServed: p.label,
        availableLanguage: ["English"],
      })),
      aggregateRating: buildAggregateRatingJsonLd({
        ratingValue: 4.9,
        reviewCount: Math.max(TESTIMONIALS.length, 4),
      }),
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, contactPageSchema]} />
      <ContactPage />
    </>
  );
}
