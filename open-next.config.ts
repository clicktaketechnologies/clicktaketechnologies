/**
 * OpenNext config for Cloudflare Pages deployment.
 *
 * Docs: https://opennext.js.org/cloudflare
 *
 * This file tells @opennextjs/cloudflare how to convert the Next.js build
 * (.next/) into a Cloudflare Worker bundle (.open-next/).
 *
 * Override patterns:
 *   - For ISR / on-demand revalidation, set `incrementalCache: true`
 *   - For image optimization on Cloudflare, install @cloudflare/next-on-pages
 *     and add an `images: { loader: "custom" }` block in next.config.ts
 */

import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  // Override the image optimizer to use Cloudflare's image resizer
  // (much cheaper than running sharp inside the Worker).
  imageOptimizer: {
    loader: "cloudflare",
  },
};

export default config;
