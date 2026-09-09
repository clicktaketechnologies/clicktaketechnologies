/**
 * Render the homepage in a real browser, capture screenshots of both
 * light + dark mode, and extract computed values from the live-stat
 * badges to verify they're populated.
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const theme of ["dark", "light"]) {
    const ctx = await browser.newContext({
      colorScheme: theme,
      viewport: { width: 1440, height: 900 },
    });
    const page = await ctx.newPage();

    const consoleErrors = [];
    page.on("pageerror", (err) =>
      consoleErrors.push(`pageerror: ${err.message}`),
    );
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`console.error: ${msg.text()}`);
      }
    });

    await page.addInitScript((t) => {
      localStorage.setItem("theme", t);
    }, theme);

    await page.goto("http://localhost:3000/", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(3500);

    // Probe the live-stat badges — find both widget containers.
    const badges = await page.evaluate(() => {
      const out = [];
      // The badges are inside the hero, positioned absolutely with
      // classes containing "absolute top-4 -right-4" and "absolute bottom-8 -left-4".
      const els = document.querySelectorAll("[class*='absolute'][class*='-right-4'], [class*='absolute'][class*='-left-4']");
      for (const el of els) {
        // Find the headline number (text-2xl font-black text-white)
        const numEl = el.querySelector(".text-2xl");
        const labelEl = el.querySelector(".text-\\[10px\\].font-mono");
        const captionEl = el.querySelector(".flex.items-center.gap-1\\.5");
        const skeletonEl = el.querySelector("[data-slot='skeleton']");
        out.push({
          hasNumber: !!numEl && numEl.textContent.trim().length > 0,
          numberText: numEl?.textContent?.trim() ?? null,
          labelText: labelEl?.textContent?.trim() ?? null,
          captionText: captionEl?.textContent?.trim() ?? null,
          isSkeleton: !!skeletonEl,
        });
      }
      return out;
    });

    // Probe hero subtext — make sure the metric values are interpolated.
    const heroSubtext = await page.evaluate(() => {
      const p = document.querySelector("h1 + p, .max-w-xl.text-base");
      return p?.textContent?.trim() ?? null;
    });

    // Probe stats bar — make sure values are present
    const statsBar = await page.evaluate(() => {
      const nums = document.querySelectorAll(".text-3xl.sm\\:text-4xl, .text-3xl");
      return Array.from(nums).map((n) => n.textContent?.trim() ?? "");
    });

    // Probe footer tagline
    const footerTagline = await page.evaluate(() => {
      const p = document.querySelector("footer p");
      return p?.textContent?.trim() ?? null;
    });

    console.log(`\n=== Theme: ${theme} ===`);
    console.log("Console errors:", consoleErrors.length === 0 ? "NONE ✅" : consoleErrors);
    console.log("Live-stat badges:", JSON.stringify(badges, null, 2));
    console.log("Hero subtext:", heroSubtext?.substring(0, 200));
    console.log("StatsBar values:", statsBar);
    console.log("Footer tagline:", footerTagline?.substring(0, 200));

    await page.screenshot({
      path: `/home/z/my-project/upload/homepage-refactor-${theme}.png`,
      fullPage: false,
    });

    await ctx.close();
  }

  await browser.close();
})();
