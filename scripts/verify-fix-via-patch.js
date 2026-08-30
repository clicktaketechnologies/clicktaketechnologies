/**
 * Apply the CSS patch to the live admin login page (via JS) and verify
 * that the previously-invisible text becomes visible in light mode.
 *
 * The patch:
 *   - Removes the buggy rule: `.theme-nx .text-muted-foreground { color: color-mix(in oklab, rgb(var(--foreground)) 72%, transparent); }`
 *   - Removes the buggy rule: `.theme-nx p:not(...)... { color: rgb(var(--foreground)); }`
 *   - Removes the buggy rule: `.theme-nx h1:not(...)..., .theme-nx h2:not(...)..., etc. { color: rgb(var(--foreground)); }`
 *   - Lets Tailwind's `.text-muted-foreground { color: var(--muted-foreground) }` apply.
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
  await page.waitForTimeout(1500);

  // BEFORE patch — capture computed colors of every text-muted-foreground element
  const before = await page.evaluate(() => {
    const els = document.querySelectorAll(".text-muted-foreground");
    return Array.from(els).map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent.trim().substring(0, 60),
      color: getComputedStyle(el).color,
      bg: getComputedStyle(el.closest(".rounded-2xl") || el.parentElement)
        .backgroundColor,
    }));
  });

  console.log("=== BEFORE PATCH (light mode) ===");
  for (const r of before) {
    console.log(`  ${r.tag} "${r.text}" color=${r.color} bg=${r.bg}`);
  }

  // Apply the patch — find all stylesheets and remove the buggy rules
  await page.evaluate(() => {
    const buggyPatterns = [
      // Rule 3: paragraph + li fallback with rgb(var(--foreground))
      ".theme-nx p:not([class*=\"text-\"])",
      // Rule 4: heading fallback with rgb(var(--foreground))
      ".theme-nx h1:not([class*=\"text-\"])",
      // Rule 5: muted-foreground override
      ".theme-nx .text-muted-foreground",
    ];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = sheet.cssRules || [];
        const toRemove = [];
        for (let i = 0; i < rules.length; i++) {
          const r = rules[i];
          const text = r.cssText || "";
          const isBuggy =
            buggyPatterns.some((p) => text.includes(p)) &&
            (text.includes("rgb(var(--foreground))") ||
              text.includes("color-mix"));
          if (isBuggy) toRemove.push(i);
        }
        // Remove in reverse order to preserve indices
        for (let i = toRemove.length - 1; i >= 0; i--) {
          sheet.deleteRule(toRemove[i]);
        }
      } catch (e) {}
    }
  });

  // AFTER patch — capture the same computed colors
  const after = await page.evaluate(() => {
    const els = document.querySelectorAll(".text-muted-foreground");
    return Array.from(els).map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent.trim().substring(0, 60),
      color: getComputedStyle(el).color,
      bg: getComputedStyle(el.closest(".rounded-2xl") || el.parentElement)
        .backgroundColor,
    }));
  });

  console.log("\n=== AFTER PATCH (light mode) ===");
  for (const r of after) {
    console.log(`  ${r.tag} "${r.text}" color=${r.color} bg=${r.bg}`);
  }

  // Compute contrast ratios for verification
  const hexToRgb = (s) => {
    const m = s.match(/\d+/g);
    if (!m || m.length < 3) return null;
    return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
  };
  const luminance = ([r, g, b]) => {
    const f = (v) => {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (c1, c2) => {
    const l1 = luminance(c1);
    const l2 = luminance(c2);
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  };

  console.log("\n=== Contrast ratio (text vs card bg) ===");
  for (let i = 0; i < before.length; i++) {
    const b = before[i];
    const a = after[i];
    const bgRgb = hexToRgb(a.bg);
    const beforeColor = hexToRgb(b.color);
    const afterColor = hexToRgb(a.color);
    console.log(
      `  "${b.text.substring(0, 40)}..."\n` +
        `    BEFORE: ${b.color} contrast=${contrast(beforeColor, bgRgb).toFixed(2)}:1\n` +
        `    AFTER : ${a.color} contrast=${contrast(afterColor, bgRgb).toFixed(2)}:1`,
    );
  }

  await page.screenshot({
    path: "/home/z/my-project/upload/login-light-after-patch.png",
    fullPage: true,
  });
  console.log(
    "\nScreenshot saved: /home/z/my-project/upload/login-light-after-patch.png",
  );

  await browser.close();
})();
