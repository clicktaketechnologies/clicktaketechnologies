/**
 * Check the subtitle element's actual computed CSS variable values for
 * --foreground, --muted-foreground, etc.
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    colorScheme: "light",
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();

  await page.addInitScript(() => {
    try {
      localStorage.setItem("theme", "light");
    } catch (e) {}
  });

  await page.goto("https://clicktaketech.com/admin/login", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(2000);

  const result = await page.evaluate(() => {
    const subtitle = document.querySelector(
      "h1 + p, .rounded-2xl p.text-muted-foreground",
    );
    if (!subtitle) return { error: "not found" };

    const cs = getComputedStyle(subtitle);
    return {
      color: cs.color,
      foreground: cs.getPropertyValue("--foreground").trim(),
      muted: cs.getPropertyValue("--muted").trim(),
      mutedForeground: cs.getPropertyValue("--muted-foreground").trim(),
      nxInk: cs.getPropertyValue("--nx-ink").trim(),
      nxInkMuted: cs.getPropertyValue("--nx-ink-muted").trim(),
      // Test what rgb(var(--foreground)) actually resolves to via a CSS test
      testRgbaVar: (() => {
        const t = document.createElement("div");
        t.style.color = "rgb(var(--foreground))";
        document.body.appendChild(t);
        const r = getComputedStyle(t).color;
        t.remove();
        return r;
      })(),
      testColorMix: (() => {
        const t = document.createElement("div");
        t.style.color =
          "color-mix(in oklab, rgb(var(--foreground)) 72%, transparent)";
        document.body.appendChild(t);
        const r = getComputedStyle(t).color;
        t.remove();
        return r;
      })(),
    };
  });

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
