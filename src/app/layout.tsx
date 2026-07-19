import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { SITE } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ClickTake Technologies — AI-Powered Digital Agency | UK · Pakistan · USA · Dubai",
    template: "%s | ClickTake Technologies",
  },
  description:
    "ClickTake Technologies builds AI-powered websites, mobile apps, SaaS platforms and growth systems for ambitious brands across the UK (Birmingham), Pakistan, USA and Dubai. Custom software, intelligent automation and conversion-driven marketing under one roof.",
  keywords: [
    "ClickTake Technologies",
    "AI development agency UK",
    "software company Birmingham",
    "web development Pakistan",
    "mobile app development USA",
    "digital agency Dubai",
    "SaaS development",
    "AI automation agency",
    "SEO services Birmingham",
    "custom software development",
  ],
  authors: [{ name: "ClickTake Technologies" }],
  creator: "ClickTake Technologies",
  publisher: "ClickTake Technologies",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "ClickTake Technologies — AI-Powered Digital Agency",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai. Built by ClickTake Technologies.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — AI-Powered Digital Agency",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
 * JSON-LD structured data (Organization schema) — ported from the original
 * ClickTake Vite project's __root.tsx. Helps Google rich results.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.value).join(", "),
  address: SITE.locations.map((l) => ({
    "@type": "PostalAddress",
    addressLocality: l.city,
    addressCountry: l.country,
  })),
  areaServed: SITE.locations.map((l) => l.country),
  sameAs: SITE.socials.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phones[0].value,
    availableLanguage: ["English"],
  },
};

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
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
