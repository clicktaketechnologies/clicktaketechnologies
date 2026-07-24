// Server-side helper: fetch the NX design config from the DB and return as
// a CSS string ready to inject into a <style> tag in the page <head>.
//
// Used by app/layout.tsx to apply admin-set design tokens globally.
//
// Returns an empty string if no overrides have been saved (so the default
// tokens from globals.css apply).

import { prisma } from "@/lib/db";
import { NX_DEFAULTS, NX_DESIGN_KEY } from "@/app/api/admin/design-system/route";

type NxConfig = typeof NX_DEFAULTS;

export async function getNxDesignCss(): Promise<string> {
  let config: NxConfig = NX_DEFAULTS;

  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: NX_DESIGN_KEY } });
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      config = {
        ...NX_DEFAULTS,
        ...parsed,
        light: { ...NX_DEFAULTS.light, ...(parsed.light || {}) },
        dark: { ...NX_DEFAULTS.dark, ...(parsed.dark || {}) },
      };
    }
  } catch {
    return ""; // DB not available or parse error — fall back to defaults
  }

  // Build CSS — root vars + .dark overrides + .theme-nx overrides
  const rootVars: string[] = [];
  for (const [k, v] of Object.entries(config)) {
    if (k === "light" || k === "dark") continue;
    rootVars.push(`  ${k}: ${v};`);
  }

  const lightVars: string[] = [];
  for (const [k, v] of Object.entries(config.light)) {
    lightVars.push(`  ${k}: ${v};`);
  }

  const darkVars: string[] = [];
  for (const [k, v] of Object.entries(config.dark)) {
    darkVars.push(`  ${k}: ${v};`);
  }

  // Only emit if there are overrides (always emit since we have defaults)
  return `
<style id="nx-design-tokens">
:root {
${rootVars.join("\n")}
}
.theme-nx {
${lightVars.join("\n")}
}
html.dark .theme-nx, html.dark.theme-nx {
${darkVars.join("\n")}
}
</style>`.trim();
}
