/**
 * Use the Chrome DevTools Protocol directly to get the matched CSS rules
 * for the subtitle element on the admin login page in LIGHT mode.
 * This bypasses getComputedStyle() and tells us exactly which rule is
 * responsible for the color override.
 */

const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    colorScheme: "light",
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();

  // Capture console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("CONSOLE ERROR:", msg.text());
  });

  await page.addInitScript(() => {
    try {
      localStorage.setItem("theme", "light");
    } catch (e) {}
  });

  await page.goto("https://clicktaketech.com/admin/login", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(2000);

  // Get the subtitle element's CSS rules using CDP
  const client = await page.context().newCDPSession(page);
  await client.send("DOM.enable");
  await client.send("CSS.enable");

  // Use document.querySelector via CDP DOM.getDocument + DOM.querySelector
  const { root } = await client.send("DOM.getDocument", { depth: 0 });
  const { nodeId } = await client.send("DOM.querySelector", {
    nodeId: root.nodeId,
    selector: "h1 + p, .rounded-2xl p.text-muted-foreground",
  });
  console.log("subtitle nodeId:", nodeId);

  if (!nodeId) {
    console.log("ERROR: subtitle not found");
    await browser.close();
    return;
  }

  // Get matched CSS rules
  const { matchedCSSRules, inherited, ...rest } = await client.send(
    "CSS.getMatchedStylesForNode",
    { nodeId },
  );

  console.log("=== Matched CSS rules (in cascade order, last wins) ===");
  for (const r of matchedCSSRules) {
    const rule = r.rule;
    const sel = rule.selectorList.text;
    const sheet =
      r.rule.origin === "regular"
        ? (rule.styleSheetId
            ? (await client.send("CSS.getStyleSheetText", {
                styleSheetId: rule.styleSheetId,
              })).text?.substring(0, 80)
            : "(inline)")
        : r.rule.origin;
    // Only show rules that set `color`
    const setsColor = rule.style.cssProperties.find(
      (p) => p.name === "color" && p.text,
    );
    if (setsColor) {
      console.log(
        `  selector: "${sel.trim().substring(0, 100)}" | color: ${setsColor.value}  ${setsColor.important ? "!important" : ""}  | range: ${rule.style.startLine}:${rule.style.startColumn}`,
      );
    }
  }

  console.log("\n=== Inherited rules ===");
  for (const inh of inherited.slice(0, 3)) {
    console.log(`--- inheritance level ---`);
    for (const r of inh.matchedCSSRules) {
      const setsColor = r.rule.style.cssProperties.find(
        (p) => p.name === "color" && p.text,
      );
      if (setsColor) {
        console.log(
          `  selector: "${r.rule.selectorList.text.trim().substring(0, 100)}" | color: ${setsColor.value}`,
        );
      }
    }
  }

  // Also dump computed color property
  const { computedStyle } = await client.send("CSS.getComputedStyleForNode", {
    nodeId,
  });
  const colorProp = computedStyle.find((p) => p.name === "color");
  console.log(`\n=== Final computed color: ${colorProp?.value} ===`);

  // Also dump inline style
  console.log(`\n=== Inline style: ${JSON.stringify(rest)} ===`);

  await browser.close();
})();
