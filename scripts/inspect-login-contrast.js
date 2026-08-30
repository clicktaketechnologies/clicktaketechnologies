/**
 * Inspect computed text color of every text element on the admin login page,
 * in BOTH light and dark mode, to find the actual root cause of the
 * low-contrast text issue.
 *
 * Run: node /home/z/my-project/scripts/inspect-login-contrast.js
 */

const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const screenshotsDir = "/home/z/my-project/upload";

  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({
      colorScheme: theme,
      viewport: { width: 1280, height: 900 },
    });
    const page = await ctx.newPage();

    // Set theme via localStorage BEFORE first paint
    await page.addInitScript((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch (e) {}
    }, theme);

    await page.goto("https://clicktaketech.com/admin/login", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(1500);

    const htmlClasses = await page.evaluate(() =>
      document.documentElement.className,
    );
    console.log(`\n=== Theme: ${theme} | html classes: "${htmlClasses}" ===`);

    // Inspect every text-bearing element
    const data = await page.evaluate(() => {
      const sels = [
        ["h1", "document.querySelector('h1')"],
        ["subtitle p", 'document.querySelector(".text-muted-foreground p, h1 + p, .rounded-2xl p.text-muted-foreground")'],
        ["email label", 'label[for="email"]'],
        ["password label", 'label[for="password"]'],
        ["remember-me label", 'label:has(input[type="checkbox"])'],
        ["email input", 'input[type="email"]'],
        ["password input", 'input[type="password"]'],
        ["footer text", '.text-center.text-xs.text-muted-foreground'],
        ["trust badge 1", '.flex.flex-wrap.items-center.justify-center > div:nth-child(1)'],
        ["security notice", '.rounded-xl.border.border-border.bg-muted\\/50'],
        ["card", '.rounded-2xl.border.border-border.bg-card'],
        ["page bg", 'body > div:first-child'],
      ];
      const out = [];
      for (const [name, expr] of sels) {
        try {
          const el = eval(expr);
          if (!el) {
            out.push({ name, status: "NOT_FOUND" });
            continue;
          }
          const cs = getComputedStyle(el);
          const color = cs.color;
          const bg = cs.backgroundColor;
          const bgImage = cs.backgroundImage;
          out.push({
            name,
            color,
            background: bg,
            bgImage: bgImage.substring(0, 100),
          });
        } catch (e) {
          out.push({ name, error: String(e) });
        }
      }
      // Also dump --foreground and --muted-foreground computed CSS variable values
      const root = getComputedStyle(document.documentElement);
      out.push({
        name: ":root --foreground",
        value: root.getPropertyValue("--foreground").trim(),
      });
      out.push({
        name: ":root --muted-foreground",
        value: root.getPropertyValue("--muted-foreground").trim(),
      });
      out.push({
        name: ":root --nx-ink",
        value: root.getPropertyValue("--nx-ink").trim(),
      });
      out.push({
        name: ":root --nx-ink-muted",
        value: root.getPropertyValue("--nx-ink-muted").trim(),
      });
      out.push({
        name: ":root --color-muted-foreground",
        value: root.getPropertyValue("--color-muted-foreground").trim(),
      });
      return out;
    });

    for (const row of data) {
      console.log(row);
    }

    await page.screenshot({
      path: `${screenshotsDir}/login-${theme}.png`,
      fullPage: true,
    });
    await ctx.close();
  }

  await browser.close();
})();
