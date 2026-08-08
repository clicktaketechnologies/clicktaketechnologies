# Next.js PageSpeed optimisation: how to hit 90+ scores

![Next.js PageSpeed optimisation: how to hit 90+ scores](https://composeo-article-images.s3.us-east-1.amazonaws.com/next-js-pagespeed-optimisation-how-to-hit-90-scores-1785659045382.webp)

Most Next.js sites commonly score in the 60, 80 range on PageSpeed Insights before any optimisation work begins. That surprises people, because Next.js is a modern framework with performance baked into its architecture. The issue is rarely the framework itself. It is the decisions made during development: which components run on the client, how images are delivered, whether server responses are cached, and how third-party scripts are loaded. This guide covers the full Next.js PageSpeed optimisation process, what causes low scores, which levers move the needle most, and the exact sequence to apply them.

Next.js ships powerful optimisation tools out of the box, yet many teams under-utilise features such as next/image, next/font, server components, and built-in caching primitives. In our audits across scaling e-commerce and SaaS projects, the same five bottleneck layers appear consistently. Fix them in the right order and sites commonly move from the 60, 80 range into the 90+ band. This article covers exactly that sequence, with configuration examples drawn directly from those production audits.

## Why most Next.js builds miss 90+ PageSpeed

Four root causes account for the majority of low PageSpeed scores in Next.js projects. Understanding which one is hurting you most is the starting point, not the code fixes themselves.

### The four root causes behind low Lighthouse scores

The first is excess client-side JavaScript, usually caused by overusing "use client" throughout the App Router. Every component marked as a client component gets shipped to the browser and evaluated during page load, which drives up Total Blocking Time (TBT) and Interaction to Next Paint (INP). The second is unoptimised images, particularly hero images that are either too large, served as CSS backgrounds (which Next.js cannot optimise), or missing the priority prop. This directly delays Largest Contentful Paint (LCP).

The third cause is a slow Time to First Byte (TTFB) from uncached SSR responses. If every page request hits a database or an external API without caching, the server latency cascades into the LCP score. The fourth is third-party scripts: analytics, tag managers, chat widgets, and consent tools that inject long tasks during the critical render window, pushing up TBT and triggering Cumulative Layout Shift (CLS) when their content loads late.

### How to read a PageSpeed Insights report before you fix anything

[PageSpeed Insights](https://nextjs.org/learn/seo/nextjs-speed-insights) shows two data layers. The top section displays field data from the Chrome User Experience Report (CrUX): real user measurements aggregated over 28 days. The lower section is lab data from a Lighthouse run: a controlled, simulated load. Both matter. Lighthouse tells you what is technically broken; CrUX tells you whether real users are actually experiencing the problem.

Within the Lighthouse section, focus on the Opportunities tab first. These are changes with a direct, estimated impact on load time. Diagnostics surfaces configuration issues that may not carry a score penalty yet but create future risk. Fix Opportunities in order of estimated saving before touching Diagnostics. Commit to a fix priority based on what the field data confirms, not just what looks bad in the lab run.

## Next.js PageSpeed optimisation: image strategies for faster LCP

Images are the most common LCP failure point in Next.js projects. A hero image that is not preloaded, not served in a modern format, or rendered without explicit sizing will delay LCP regardless of how well the rest of the page performs.

### Configuring next/image for AVIF, WebP, and responsive sizing

The [next/image](https://nextjs.org/docs/app/api-reference/components/image) component handles format negotiation automatically when you configure it correctly in next.config.js. By listing ['image/avif', 'image/webp'] in the formats array, Next.js inspects the browser's Accept header on each request. It then returns AVIF where supported, WebP as the fallback, and the original format where neither is available. AVIF is typically 45 to 65 per cent smaller than JPEG; WebP is around 25 to 35 per cent smaller. That size reduction translates directly into faster LCP.

// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

The deviceSizes and imageSizes arrays control which responsive variants Next.js generates. Tuning these to match your actual design breakpoints prevents the framework from generating unnecessary sizes and ensures the browser always has a close match available in the srcset. You do not need to build manual  elements with separate  tags; the component handles all of that.

### The priority and sizes props most developers skip

The priority prop on the LCP image is one of the highest-value, lowest-effort fixes available. Adding it causes Next.js to inject a  tag for that image into the document , which tells the browser to fetch it before it would normally discover it in the markup. A commonly observed issue in ClickTake Technologies audits is an omitted priority prop on the hero image, a small oversight with a measurable impact on LCP.

The sizes prop is equally important and equally neglected. It tells the browser how wide the image will actually render at different viewport widths, so it can select the smallest appropriate candidate from the srcset rather than defaulting to the largest. A value of "(max-width: 768px) 100vw, 50vw" instructs the browser to load the full-width image only on small screens and a half-width variant on larger ones. Getting this wrong means users download a far larger image than the layout requires.

## Server components and bundle splitting: cut what the browser does not need

Moving components server-side is the single most impactful change for reducing TBT and INP. In one recent ClickTake Technologies audit, the JavaScript bundle dropped from 245 KB to 87 KB after switching from an all-client-component approach to a proper server and client split, a 64 per cent reduction in shipped JavaScript.

### Running @next/bundle-analyzer to find the real culprits

Install [@next/bundle-analyzer](https://nextjs.org/docs/14/pages/building-your-application/optimizing/bundle-analyzer), configure it in next.config.js with an environment flag, and run ANALYZE=true npm run build. The output is an interactive treemap where larger boxes mean larger bundle contributions. Look for heavy third-party libraries that could be replaced with smaller alternatives, duplicate library versions appearing across multiple chunks, and large client-only imports caused by unnecessary "use client" usage.

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
})

### Moving components server-side and lazy-loading the rest

In the App Router, all components are server components by default. The common mistake is adding "use client" to an entire component tree just to access one interactive element, which pulls everything in that tree into the client bundle. The correct pattern is to isolate the interactive part into its own small client component and keep the surrounding UI server-rendered.

For heavy client-only components such as maps, charts, and carousels, use dynamic() with { ssr: false }. This defers both the download and the execution of that component until after the initial page load, reducing the JavaScript evaluated during the critical window and improving TBT directly. The key distinction is that dynamic() is not just a code-splitting tool; it is a TBT and INP optimisation when the deferred component contains meaningful execution work.

## Next.js PageSpeed optimisation, caching and rendering strategy

A slow TTFB collapses LCP regardless of how well images are optimised. If the server takes 800 milliseconds to respond, the browser cannot begin rendering until that time has passed. The fix is choosing the right rendering mode for each page type and caching aggressively where freshness requirements allow.

### When to use SSG, ISR, and SSR for each page type

Marketing pages, blog posts, and documentation pages should always be statically generated. The HTML is ready at request time, served from a CDN edge, and imposes no server-side rendering cost per visit. Product pages and category pages suit Incremental Static Regeneration: set revalidate to a window that reflects how often the content changes (an hour for most catalogues), and Next.js regenerates the page in the background after that window expires without blocking the user request.

Dashboards and account pages genuinely require per-request rendering. Use export const dynamic = 'force-dynamic' and cache: 'no-store' for these routes. The important discipline is limiting force-dynamic to pages that actually need it. Applying it globally across a site is the fastest way to turn a fast Next.js app into a slow one.

### Cache-Control headers, CDN asset prefixing, and on-demand revalidation

Next.js automatically applies public, max-age=31536000, immutable to hashed assets under /_next/static/. For API route responses with short freshness requirements, use public, max-age=300, stale-while-revalidate=86400: users get a cached response instantly while the CDN refreshes in the background. User-specific data should always carry no-store to prevent shared-cache leaks.

For CMS-driven content, the revalidateTag pattern is cleaner than setting aggressive revalidation windows. Tag each fetch with a cache key, then call [revalidateTag('post:slug')](https://nextjs.org/docs/app/guides/caching-without-cache-components) from a server action when an editor publishes an update. This keeps pages fast between updates without requiring a full rebuild. If your static assets are served from a CDN, configure assetPrefix in next.config.js to point asset URLs to the CDN hostname, which serves files from the geographically closest edge node.

## Font loading and third-party script control

Fonts and third-party scripts are responsible for more CLS and TBT than most developers realise, and both have clean solutions in Next.js that require almost no custom code.

### Using next/font to eliminate CLS from font swaps

The [next/font](https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts) module self-hosts Google Fonts at build time, injects preload tags automatically, and prevents external network requests to Google's font servers. The adjustFontFallback option generates a metric-matched fallback using CSS size-adjust, so the fallback font occupies almost the same space as the real font before the swap. This is what makes the CLS improvement meaningful. Manual WOFF2 preloading speeds up when the font arrives, but it does not eliminate the layout shift if the fallback and final font have different metrics.

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

Use display: 'swap' for primary UI fonts so text is visible immediately with a fallback. For decorative typefaces that are not part of the core reading experience, use display: 'optional' instead: the browser renders the fallback permanently on slow connections, which means zero layout shift at the cost of occasional custom font absence.

### Deferring analytics, consent tools, and chat widgets without losing data

Third-party scripts are among the most consistent TBT contributors in the sites the ClickTake Technologies team audits. The Next.js `Script` component's `strategy` prop handles the deferral correctly without manual script manipulation. Use `afterInteractive` for analytics and tag managers: these load after the page becomes interactive, which keeps them out of the critical render window while still firing early enough to capture user behaviour accurately. Use `lazyOnload` for chat widgets and low-priority embeds that do not need to initialise until the user scrolls or interacts.

Consent management scripts present a specific challenge because they often need to run before other scripts can fire. If a consent tool must use `beforeInteractive`, keep the script as lightweight as possible and audit it for any inline evaluation work. A heavy consent script loaded synchronously will undo a significant portion of the TBT gains made elsewhere on the page.

## Measuring gains: what production-grade audits actually deliver

Optimisation without measurement is guesswork. Tracking improvement requires both lab data and field data, used together, across a consistent measurement window.

### Tools to track PageSpeed and Core Web Vitals over time

PageSpeed Insights gives you a useful one-off snapshot, but Lighthouse CI integrated into your deployment pipeline catches regressions before they reach production. The CrUX dashboard in Google Search Console provides 28-day field trends: this is the data Google uses for ranking signals, and it reflects real network conditions rather than the throttled simulation used in Lighthouse. For custom real-user monitoring, the `web-vitals` library sends Core Web Vitals directly from users' browsers to whatever analytics endpoint you configure.

The important discipline is tracking both. A Lighthouse score improvement that does not show up in CrUX field data after 28 days usually indicates the fix addressed a synthetic test condition rather than a real user experience problem. Use lab data to validate your work; use field data to confirm it.

### Before and after: what a production Next.js performance audit looks like

In our experience across production Next.js audits, starting scores often fall in the 60, 80 range on PageSpeed Insights, with mobile LCP frequently above the 2.5, 3 second thresholds that Google flags as needing improvement. After applying the five layers in sequence, images first for an immediate LCP gain, then server component migration and bundle reduction for TBT and INP improvement, then caching and rendering strategy for TTFB reduction, then font and script control for CLS resolution, scores consistently land in the 90 to 97 range. In one recent project, the mobile PageSpeed score moved from 48 to 94 and LCP dropped from 4.2 seconds to 1.3 seconds after a structured six-week engagement.

The sequence matters because each layer compounds the previous one. Fixing images on a page with a 700-millisecond TTFB leaves substantial LCP time on the table. The layered approach, applied in priority order, is what produces results that hold in field data rather than just in the lab.

## Next.js PageSpeed optimisation checklist: the order that works

Five layers, applied in sequence: images (LCP), bundle and server components (TBT and INP), rendering strategy and caching (TTFB), fonts (CLS), measurement. Each layer compounds the last, which is why order matters as much as the fixes themselves. Next.js provides the core tooling, image optimisation, font handling, server components, caching primitives, and script loading controls, that, when applied correctly, enables sites to reach 90+ PageSpeed scores consistently.

If your audit reveals deeper architectural issues, if your bundle analysis uncovers structural problems with how client and server components are divided, or if you simply want a second pair of eyes on a production build before a major release, the ClickTake Technologies team runs structured Next.js performance audits as a standalone engagement. Every audit produces a prioritised fix list tied to specific Core Web Vitals metrics and estimated score impact, grounded in the same process described throughout this article. [Book a free 30-minute consultation](https://clicktake.co.uk) to scope the work before committing.