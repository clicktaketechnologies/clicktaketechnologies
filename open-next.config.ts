/**
 * OpenNext config for Cloudflare Pages deployment.
 *
 * Docs: https://opennext.js.org/cloudflare
 *
 * This file tells @opennextjs/cloudflare how to convert the Next.js build
 * (.next/) into a Cloudflare Worker bundle (.open-next/).
 */

import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
};

export default config;
