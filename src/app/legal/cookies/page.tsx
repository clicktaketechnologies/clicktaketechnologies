import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import { LegalPage } from "@/components/site/pages/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy — ClickTake Technologies",
  description:
    "How ClickTake Technologies uses cookies and similar technologies on our website, and how you can control them.",
  alternates: { canonical: "https://www.clicktaketech.com/legal/cookies" },
};

export default function Page() {
  return (
    <LegalPage
      icon={<Cookie className="h-6 w-6" />}
      title="Cookie Policy"
      lastUpdated="May 26, 2026"
      badge="EU ePrivacy & PECR Compliant"
      accentClass="bg-amber-500/20"
      sections={[
        {
          num: "01",
          title: "What Are Cookies",
          body: (
            <p>
              Cookies are small text files placed on your device by the websites you visit. They are widely
              used to make websites work more efficiently and to provide information to site owners. Cookies
              may be session cookies (deleted when you close your browser) or persistent cookies (remain until
              they expire or you delete them).
            </p>
          ),
        },
        {
          num: "02",
          title: "How We Use Cookies",
          body: (
            <>
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li><strong className="text-foreground">Essential:</strong> Required for the website to function (e.g. session, theme preference).</li>
                <li><strong className="text-foreground">Analytics:</strong> To understand how visitors use our site (e.g. Google Analytics 4, anonymized).</li>
                <li><strong className="text-foreground">Marketing:</strong> To measure the effectiveness of our campaigns on Meta, LinkedIn, and Google Ads.</li>
                <li><strong className="text-foreground">Functional:</strong> To remember your preferences (e.g. dark mode, language).</li>
              </ul>
            </>
          ),
        },
        {
          num: "03",
          title: "Third-Party Cookies",
          body: (
            <p>
              We use third-party services that may set their own cookies, including Cloudflare Turnstile (bot
              protection), Google Analytics (usage analytics), and Meta Pixel (campaign attribution). Each
              third-party provider manages its own cookies according to its privacy policy.
            </p>
          ),
        },
        {
          num: "04",
          title: "Managing Cookies",
          body: (
            <>
              <p>
                You can control or delete cookies through your browser settings. Note that disabling all
                cookies may affect website functionality — for example, you may not be able to submit the
                contact form or save your theme preference.
              </p>
              <p className="mt-2">
                Most browsers allow you to: (a) accept all cookies, (b) reject all cookies, or (c) accept
                only first-party cookies. See your browser&apos;s help documentation for detailed instructions.
              </p>
            </>
          ),
        },
        {
          num: "05",
          title: "Updates to This Policy",
          body: (
            <p>
              We may update this Cookie Policy from time to time. Changes are effective immediately upon
              posting to this page. We encourage you to review this policy periodically.
            </p>
          ),
        },
      ]}
    />
  );
}
