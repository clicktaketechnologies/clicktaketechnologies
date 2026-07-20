import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind v4 config — color tokens live in `src/app/globals.css` under
 * `@theme inline` and the `:root` / `.dark` blocks. This JS config is kept
 * ONLY for the darkMode class strategy, content paths (so Tailwind scans
 * the right files in dev), and the animate plugin.
 *
 * Do NOT redefine colors here — `hsl(var(--x))` references would clash with
 * the raw hex values defined in globals.css (Tailwind v4 already wires
 * `--color-primary` → `bg-primary` via the `@theme inline` block).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
