import type { Metadata } from "next";
import { CitiesIndexPage } from "@/components/site/pages/cities-index-page";
import { composeCitiesIndexContent } from "@/lib/seo/city-service-content";
import { JsonLd } from "@/components/site/json-ld";

export const dynamic = "force-static";
export const revalidate = 86400; // Daily — city list rarely changes.

export function generateMetadata(): Metadata {
  const content = composeCitiesIndexContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.meta.canonical },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: content.meta.canonical,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
    keywords: [
      "ClickTake Technologies",
      "Birmingham UK",
      "Multan Pakistan",
      "Austin Texas",
      "Dubai UAE",
      "AI services UK",
      "web development Pakistan",
      "SEO services USA",
      "marketing services UAE",
    ],
    other: {
      "geo.region": "GB-PK-US-AE",
      "geo.placename": "Birmingham, Multan, Austin, Dubai",
    },
  };
}

export default function Page() {
  const content = composeCitiesIndexContent();
  return (
    <>
      <JsonLd data={content.jsonLd} />
      <CitiesIndexPage content={content} />
    </>
  );
}
