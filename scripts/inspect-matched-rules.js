/**
 * Use CDP to dump the matched CSS rules for the subtitle element on the
 * admin login page in LIGHT mode. This will tell us exactly which rule
 * is forcing the color to ***REMOVED***F4F0FF.
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

  // Walk the DOM tree from html down to the subtitle, dumping computed color
  // and matched CSS rules for each ancestor.
  const result = await page.evaluate(() => {
    const out = [];

    // The subtitle selector: it's the <p> right after the H1
    const subtitle = document.querySelector(
      "h1 + p, .rounded-2xl p.text-muted-foreground",
    );
    if (!subtitle) return { error: "subtitle not found" };

    // Walk up the DOM tree
    let el = subtitle;
    const chain = [];
    while (el && el !== document.documentElement) {
      const cs = getComputedStyle(el);
      const classes = el.className && el.className.toString
        ? el.className.toString().split(/\s+/).slice(0, 5).join(" ")
        : "";
      const id = el.id || "";
      const tag = el.tagName.toLowerCase();
      const inheritedColor = cs.color;
      const directColor = cs.getPropertyValue("color");

      chain.push({
        tag,
        id,
        classes,
        computedColor: inheritedColor,
        directColorProp: directColor,
      });

      // Get matched CSS rules from window.getMatchedCSSRules (deprecated but
      // sometimes available) or from the CSSOM API
      el = el.parentElement;
    }

    // Also dump all CSS rules that contain ".text-muted-foreground" from all
    // stylesheets, sorted by source order
    const rules = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const sheetHref = sheet.href || "(inline)";
        const cssRules = sheet.cssRules || [];
        for (let i = 0; i < cssRules.length; i++) {
          const r = cssRules[i];
          if (r.cssText && r.cssText.includes("text-muted-foreground")) {
            rules.push({
              sheet: sheetHref ? sheetHref.split("/").pop() : "(inline)",
              cssText: r.cssText.substring(0, 300),
            });
          }
        }
      } catch (e) {}
    }

    return { chain, rules };
  });

  console.log("=== DOM walk (subtitle → root) ===");
  for (const node of result.chain) {
    console.log(
      `  <${node.tag}${node.id ? " ***REMOVED***" + node.id : ""}${
        node.classes ? " ." + node.classes : ""
      }>  color=${node.computedColor}`,
    );
  }

  console.log(`\n=== CSS rules containing "text-muted-foreground" (${result.rules.length} total) ===`);
  for (const r of result.rules.slice(0, 30)) {
    console.log(`  [${r.sheet}] ${r.cssText}`);
  }

  await page.screenshot({
    path: "/home/z/my-project/upload/login-light-inspection.png",
    fullPage: true,
  });

  await browser.close();
})();
