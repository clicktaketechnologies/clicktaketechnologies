import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { SITE } from "@/lib/site-data";
import { WebMCPProvider } from "@/components/webmcp/webmcp-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mobile-optimized viewport — viewport-fit=cover enables safe-area-inset
// CSS env vars for iOS notch / Dynamic Island. maximumScale=5 allows
// accessibility zoom while preventing iOS auto-zoom on input focus.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ClickTake Technologies — AI-Powered Digital Agency | UK · Pakistan · USA · Dubai",
    template: "%s | ClickTake Technologies",
  },
  description:
    "ClickTake Technologies builds AI-powered websites, SaaS platforms, mobile apps and growth systems for brands across the UK, Pakistan, USA and Dubai. 120+ projects shipped.",
  keywords: [
    "ClickTake Technologies",
    "AI development agency UK",
    "software company Birmingham",
    "web development Pakistan Multan",
    "mobile app development USA Austin",
    "digital agency Dubai UAE",
    "SaaS development company",
    "AI automation agency",
    "custom LLM development",
    "SEO services Birmingham",
    "custom software development",
    "Next.js agency UK",
    "PPC management Austin",
    "brand design Dubai",
    "ChatGPT chatbots for business",
    "starter kit for startups",
  ],
  authors: [{ name: "ClickTake Technologies", url: SITE.url }],
  creator: "ClickTake Technologies",
  publisher: "ClickTake Technologies",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "ClickTake Technologies — AI-Powered Digital Agency | UK · PK · USA · Dubai",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai. 120+ projects shipped. Free 30-min consult. Built by ClickTake Technologies.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ClickTake Technologies — AI-Powered Digital Agency. Web · AI · Mobile · SaaS · Growth Marketing. Offices in Birmingham, Multan, Austin and Dubai.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — AI-Powered Digital Agency",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  other: {
    "geo.region": "GB-PK-US-AE",
    "geo.placename": "Birmingham, Multan, Austin, Dubai",
    "geo.position": "52.4862;-1.8904",
    ICB: "Technology / Software / AI",
  },
};

/**
 * FOUC-prevention: runs before React hydrates. Reads the saved theme from
 * localStorage (written by next-themes under the "theme" key) and applies
 * the .dark class to <html> immediately, so the very first paint matches
 * what the user previously chose. Defaults to dark.
 */
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored ? stored === 'dark' : true;
    var root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

/**
 * JSON-LD structured data — multi-location Organization + LocalBusiness
 * schemas for each regional office. Ported & enriched from the original
 * ClickTake Vite project's __root.tsx. Helps Google rich results and
 * local SEO across UK, Pakistan, USA and Dubai.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description:
    "AI-powered digital agency engineering websites, SaaS platforms, mobile apps and growth systems for ambitious brands across the UK, Pakistan, USA and Dubai.",
  foundingDate: "2020",
  slogan: SITE.tagline,
  telephone: SITE.phones.map((p) => p.value).join(", "),
  contactPoint: SITE.phones.map((p) => ({
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: p.value,
    areaServed: p.label,
    availableLanguage: ["English"],
  })),
  address: SITE.locations.map((l) => ({
    "@type": "PostalAddress",
    addressLocality: l.city,
    addressCountry: l.country,
    streetAddress: l.address,
  })),
  areaServed: SITE.locations.map((l) => ({
    "@type": "Place",
    name: l.country,
  })),
  sameAs: SITE.socials.map((s) => s.href),
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "SaaS Development",
    "Web Development",
    "Search Engine Optimization",
    "Digital Marketing",
    "Brand Design",
    "Video Production",
  ],
};

// LocalBusiness sub-schema per regional office — Google uses these for
// local-pack results in each market (Birmingham, Multan, Austin, Dubai).
const localBusinessJsonLd = SITE.locations.map((l) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${SITE.name} — ${l.city}`,
  parentOrganization: { "@type": "Organization", name: SITE.name },
  url: SITE.url,
  telephone: l.phone,
  image: `${SITE.url}/clicktake-logo.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: l.address,
    addressLocality: l.city,
    addressCountry: l.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: parseFloat(l.coords.split("°")[0]),
    longitude: parseFloat(l.coords.split(",")[1]?.split("°")[0] || "0"),
  },
  openingHours: l.hours,
  areaServed: l.country,
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {localBusinessJsonLd.map((lb, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster />
            {/* Expose site tools to AI agents via the WebMCP browser API
                (experimental, Chrome only). No-ops in unsupported browsers. */}
            <WebMCPProvider />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
