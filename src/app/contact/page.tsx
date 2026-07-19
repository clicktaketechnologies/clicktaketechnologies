import type { Metadata } from "next";
import { ContactPage } from "@/components/site/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact ClickTake — Birmingham · Multan · Austin · Dubai | Free 30-min Consult",
  description:
    "Contact ClickTake Technologies. Submit a project inquiry or book a free 30-minute discovery call. Offices in Birmingham (UK HQ), Multan (Pakistan engineering hub), Austin TX (USA desk) and Dubai (UAE/MENA office). Phones: +44 7391 653377 (UK), +92 306 9753003 (PK). Email: Info@clicktaketech.com. We respond within one business day.",
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
  alternates: { canonical: "https://www.clicktaketech.com/contact" },
  openGraph: {
    title: "Contact ClickTake Technologies — Free 30-min Consultation",
    description:
      "Project inquiry form, discovery-call scheduler and full office details across UK, Pakistan, USA and Dubai. 24-hour response guarantee.",
    url: "https://www.clicktaketech.com/contact",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ClickTake Technologies",
    description:
      "Get in touch — offices in Birmingham, Multan, Austin and Dubai. Free 30-min discovery call. 24-hour response.",
  },
  other: {
    "geo.region": "GB-PK-US-AE",
    "geo.placename": "Birmingham, Multan, Austin, Dubai",
  },
};

export default function Page() {
  return <ContactPage />;
}
