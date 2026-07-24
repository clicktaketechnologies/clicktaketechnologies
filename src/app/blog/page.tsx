import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/site/pages/blog-page";
import { JsonLd, buildBreadcrumbJsonLd, buildWebSiteJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Blog — SEO · Web Dev · AI · Marketing",
  description:
    "Practical, no-fluff articles on SEO, web development, AI automation, e-commerce and growth marketing — written by the ClickTake engineers, marketers and designers who ship this work every day for clients across the UK, Pakistan, USA and Dubai.",
  keywords: [
    "ClickTake blog",
    "SEO blog UK",
    "Next.js blog",
    "AI automation blog",
    "ecommerce blog",
    "growth marketing blog",
  ],
  alternates: { canonical: "https://clicktaketech.com/blog" },
  openGraph: {
    title: "ClickTake Blog — SEO · Web Dev · AI · Marketing",
    description:
      "Practical articles on SEO, web dev, AI automation, e-commerce and growth marketing. By the ClickTake team.",
    url: "https://clicktaketech.com/blog",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Blog",
    description: "Field notes from the ClickTake team across 4 regions.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
  ]);
  const website = buildWebSiteJsonLd();
  return (
    <>
      <JsonLd data={[breadcrumb, website]} />
      <BlogIndexPage />
    </>
  );
}
