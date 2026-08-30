/**
 * Check the actual html element class attribute and all data-* attributes,
 * plus the computed value of --nx-ink at the .theme-nx wrapper level.
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
    const html = document.documentElement;
    const themeNxWrap = document.querySelector(".theme-nx");

    return {
      htmlClasses: html.className,
      htmlDataAttrs: Object.keys(html.dataset),
      htmlStyleAttr: html.getAttribute("style"),
      htmlMatchesDark: html.matches(".dark"),
      htmlMatchesLight: html.matches(".light"),
      htmlInheritedForeground: getComputedStyle(html).getPropertyValue(
        "--foreground",
      ),
      htmlInheritedNxInk: getComputedStyle(html).getPropertyValue("--nx-ink"),
      themeNxStyleAttr: themeNxWrap?.getAttribute("style"),
      themeNxForeground: getComputedStyle(themeNxWrap).getPropertyValue(
        "--foreground",
      ),
      themeNxNxInk: getComputedStyle(themeNxWrap).getPropertyValue("--nx-ink"),
      themeNxColor: getComputedStyle(themeNxWrap).color,
      bodyClasses: document.body.className,
      localStorageTheme: localStorage.getItem("theme"),
      localStorageCustomDark: localStorage.getItem("theme-custom-dark"),
      localStorageCustomVars: localStorage.getItem("theme-custom-vars"),
    };
  });

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
