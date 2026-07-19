/**
 * OpenNext config for Cloudflare deployment.
 *
 * Phase 7 trim: pg-cloudflare needs workerd build conditions to resolve.
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
  edgeExternals: ["node:crypto", "cloudflare:sockets", "cloudflare:workers", "pg-cloudflare"],
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
  cloudflare: {
    useWorkerdCondition: true,
    dangerousDisableConfigValidation: true,
  },
} as OpenNextConfig;

export default config;
