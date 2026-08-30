/**
 * Place a test element INSIDE .theme-nx to see if var(--foreground)
 * resolves differently inside that scope.
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
    const themeNx = document.querySelector(".theme-nx");
    if (!themeNx) return { error: ".theme-nx not found" };

    // Check --foreground at various levels
    const html = document.documentElement;
    const body = document.body;
    const themeNxStyle = getComputedStyle(themeNx);
    const htmlStyle = getComputedStyle(html);
    const bodyStyle = getComputedStyle(body);

    // Append a test div inside .theme-nx
    const t1 = document.createElement("div");
    t1.style.color = "rgb(var(--foreground))";
    t1.style.background = "white";
    t1.textContent = "TEST1";
    themeNx.appendChild(t1);
    const t1Color = getComputedStyle(t1).color;
    const t1Fg = getComputedStyle(t1).getPropertyValue("--foreground").trim();

    const t2 = document.createElement("div");
    t2.style.color = "color-mix(in oklab, rgb(var(--foreground)) 72%, transparent)";
    t2.style.background = "white";
    t2.textContent = "TEST2";
    themeNx.appendChild(t2);
    const t2Color = getComputedStyle(t2).color;
    const t2Fg = getComputedStyle(t2).getPropertyValue("--foreground").trim();

    const t3 = document.createElement("div");
    t3.style.color = "var(--foreground)";
    t3.style.background = "white";
    t3.textContent = "TEST3";
    themeNx.appendChild(t3);
    const t3Color = getComputedStyle(t3).color;

    const t4 = document.createElement("div");
    t4.style.color = "var(--muted-foreground)";
    t4.style.background = "white";
    t4.textContent = "TEST4";
    themeNx.appendChild(t4);
    const t4Color = getComputedStyle(t4).color;

    // Remove test elements
    t1.remove();
    t2.remove();
    t3.remove();
    t4.remove();

    return {
      htmlForeground: htmlStyle.getPropertyValue("--foreground").trim(),
      bodyForeground: bodyStyle.getPropertyValue("--foreground").trim(),
      themeNxForeground: themeNxStyle.getPropertyValue("--foreground").trim(),
      themeNxColor: themeNxStyle.color,
      test1Color: t1Color, // rgb(var(--foreground)) inside .theme-nx
      test1Foreground: t1Fg,
      test2Color: t2Color, // color-mix(...) inside .theme-nx
      test2Foreground: t2Fg,
      test3Color: t3Color, // var(--foreground) inside .theme-nx
      test4Color: t4Color, // var(--muted-foreground) inside .theme-nx
    };
  });

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
