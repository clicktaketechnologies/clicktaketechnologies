import type { Metadata } from "next";
import { ContactPage } from "@/components/site/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact Us & Book a Discovery Call | ClickTake Technologies",
  description:
    "Reach ClickTake Technologies. Submit a project inquiry form or book a discovery session on our calendar. Offices in Birmingham, Multan, Austin and Dubai.",
  alternates: { canonical: "https://www.clicktaketech.com/contact" },
  openGraph: {
    title: "Contact — ClickTake Technologies",
    description: "Project inquiry form, discovery call scheduler, and office details.",
    url: "https://www.clicktaketech.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
