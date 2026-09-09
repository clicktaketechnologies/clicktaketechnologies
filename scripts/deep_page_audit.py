#!/usr/bin/env python3
"""
Deep per-page audit for ClickTake site.
For each of 10 pages, extracts the page section from the source HTML
and runs a battery of design-consistency checks.
"""
import re
import json
from pathlib import Path

HTML_PATH = Path("/home/z/my-project/download/clicktake-landing.html")
SRC = HTML_PATH.read_text(encoding="utf-8")

PAGES = ["home", "services", "solutions", "cases", "contact", "about", "blog", "careers", "privacy", "terms"]

# Brand design tokens that should appear consistently
DESIGN_TOKENS = {
    "glass": "glass",                  # Primary Glassmorphism 2.0 card class
    "glass_soft": "glass-soft",        # Softer Glassmorphism variant
    "glass_input": "glass-input",      # Glass form input
    "glow_btn": "glow-btn",            # Radial glow button
    "tilt_card": "tilt-card",          # 3D tilt card
    "tilt_layer": "tilt-layer",        # Tilt card inner layer
    "reveal": "reveal",                # Scroll-reveal animation
    "gradient_text": "gradient-text",  # Gradient text style
    "perspective_grid": "perspective-grid",  # Hero perspective floor
}

# Required global elements on every page (checked against full SRC since they live outside header/footer)
GLOBAL_ELEMENTS = {
    "header_brand": r'<img[^>]*class="[^"]*brand-logo[^"]*"',
    "nav_links": r'data-nav="',
    "wa_float": r'class=["\']wa-float["\']',
    "footer_email": r'info@clicktaketech\.com',
    "footer_phone": r'\+44 775 155 3879',
    "footer_whatsapp": r'wa\.link/iqz8eg',
    "skip_link": r'class=["\']skip-link["\']',
    "main_landmark": r'<main[^>]*id="main-content"',
}

# Split source into per-page sections
def get_page_section(page_id):
    """Extract the <section data-page="X">...</section> for a given page."""
    # Find the section start
    pat = re.compile(rf'<section[^>]*data-page="{page_id}"[^>]*>', re.I)
    m = pat.search(SRC)
    if not m:
        return None
    start = m.start()
    # Find matching </section> — sections are not nested here, just find next </section>
    # But sections may contain nested sections... use depth counting
    depth = 0
    i = start
    end = None
    while i < len(SRC):
        next_open = SRC.find('<section', i)
        next_close = SRC.find('</section>', i)
        if next_close == -1:
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            i = next_open + 1
        else:
            depth -= 1
            i = next_close + 1
            if depth == 0:
                end = i
                break
    if end is None:
        end = len(SRC)
    return SRC[start:end]

# Find the global header + footer (shared)
def get_global_header():
    m = re.search(r'<header[^>]*>.*?</header>', SRC, re.S | re.I)
    return m.group(0) if m else ""

def get_global_footer():
    m = re.search(r'<footer[^>]*>.*?</footer>', SRC, re.S | re.I)
    return m.group(0) if m else ""

HEADER = get_global_header()
FOOTER = get_global_footer()

# Per-page audit
results = {}
for page in PAGES:
    sec = get_page_section(page)
    if sec is None:
        results[page] = {"error": "section not found"}
        continue

    # Combine page + header + footer for global-element checks (since header/footer are shared)
    full = HEADER + sec + FOOTER

    page_checks = {}

    # 1. Design tokens used on this page
    page_checks["design_tokens"] = {}
    for name, token in DESIGN_TOKENS.items():
        cnt = sec.count(token)
        page_checks["design_tokens"][name] = cnt

    # 2. Global elements visible — check against full SRC since they live outside the per-page section
    page_checks["global_elements"] = {}
    for name, pat in GLOBAL_ELEMENTS.items():
        found = bool(re.search(pat, SRC, re.I))
        page_checks["global_elements"][name] = found

    # 3. Heading hierarchy in this page section
    h1 = len(re.findall(r'<h1\b', sec, re.I))
    h2 = len(re.findall(r'<h2\b', sec, re.I))
    h3 = len(re.findall(r'<h3\b', sec, re.I))
    h4 = len(re.findall(r'<h4\b', sec, re.I))
    page_checks["headings"] = {"h1": h1, "h2": h2, "h3": h3, "h4": h4}

    # 4. Images with alt
    imgs = re.findall(r'<img\s+[^>]*?>', sec, re.I)
    imgs_with_alt = [t for t in imgs if re.search(r'\salt=["\']', t, re.I)]
    page_checks["images"] = {"total": len(imgs), "with_alt": len(imgs_with_alt)}

    # 5. CTAs and links
    page_checks["links"] = {
        "internal_nav": len(re.findall(r'data-nav="', sec)),
        "external_https": len(re.findall(r'href="https://', sec)),
        "mailto": len(re.findall(r'href="mailto:', sec)),
        "tel": len(re.findall(r'href="tel:', sec)),
        "whatsapp": len(re.findall(r'wa\.link/iqz8eg', sec)),
    }

    # 6. Page-specific SEO meta (in PAGES map)
    seo_match = re.search(rf'{page}\s*:\s*\{{(.*?)\}}', SRC[4000:6000] + SRC[4150:4250], re.S)
    page_checks["seo_meta_present"] = bool(seo_match)

    # 7. Color usage (count brand color references in style attributes / classes)
    page_checks["brand_colors"] = {
        "ckblue": sec.count("ckblue") + sec.count("136DFF") + sec.count("136dff"),
        "ckpink": sec.count("ckpink") + sec.count("FF53A9") + sec.count("ff53a9"),
        "ckpurple": sec.count("ckpurple") + sec.count("7B2FBE") + sec.count("7b2fbe"),
    }

    # 8. Animations / interactions
    page_checks["interactions"] = {
        "tilt_cards": sec.count("tilt-card"),
        "reveal_elements": sec.count("reveal"),
        "glow_btns": sec.count("glow-btn"),
        "mascots_refs": sec.lower().count("mascot"),
    }

    # 9. Lucide icons used
    lucide_icons = re.findall(r'data-lucide="([^"]+)"', sec)
    page_checks["lucide_icons"] = {
        "total": len(lucide_icons),
        "unique": len(set(lucide_icons)),
        "deprecated_brand": [i for i in lucide_icons if i in ("linkedin", "twitter", "github", "slack")],
    }

    # 10. Section length (rough content richness indicator)
    page_checks["content_size"] = {
        "chars": len(sec),
        "words_visible": len(re.sub(r'<[^>]+>', ' ', sec).split()),
    }

    results[page] = page_checks

# Print report
print("=" * 90)
print("CLICKTAKE — DEEP PER-PAGE AUDIT")
print("=" * 90)
print(f"{'Page':<10} {'glass':>6} {'gsoft':>6} {'ginput':>7} {'glow':>5} {'tilt':>5} {'rev':>4} {'pgrid':>6} {'imgs':>5} {'alt':>4} {'WA':>3} {'lucide':>7} {'chars':>7}")
print("-" * 95)
for page in PAGES:
    r = results[page]
    if "error" in r:
        print(f"{page:<10} ERROR: {r['error']}")
        continue
    h = r["headings"]
    img = r["images"]
    t = r["design_tokens"]
    inter = r["interactions"]
    lnk = r["links"]
    luc = r["lucide_icons"]
    sz = r["content_size"]
    print(f"{page:<10} {t['glass']:>6} {t['glass_soft']:>6} {t['glass_input']:>7} {t['glow_btn']:>5} {t['tilt_card']:>5} {t['reveal']:>4} {t['perspective_grid']:>6} {img['total']:>5} {img['with_alt']:>4} {lnk['whatsapp']:>3} {luc['total']:>7} {sz['chars']:>7}")

print()
print("=" * 90)
print("GLOBAL ELEMENTS PER PAGE (Header + Section + Footer combined)")
print("=" * 90)
print(f"{'Page':<10} {'brand':>6} {'nav':>5} {'WAfloat':>7} {'email':>6} {'phone':>6} {'WAfoot':>6} {'skip':>5} {'main':>5}")
print("-" * 90)
for page in PAGES:
    r = results[page]
    if "error" in r:
        continue
    g = r["global_elements"]
    print(f"{page:<10} {'✓' if g['header_brand'] else '✗':>6} {'✓' if g['nav_links'] else '✗':>5} {'✓' if g['wa_float'] else '✗':>7} {'✓' if g['footer_email'] else '✗':>6} {'✓' if g['footer_phone'] else '✗':>6} {'✓' if g['footer_whatsapp'] else '✗':>6} {'✓' if g['skip_link'] else '✗':>5} {'✓' if g['main_landmark'] else '✗':>5}")

print()
print("=" * 90)
print("DEPRECATED BRAND ICONS PER PAGE (should all be 0)")
print("=" * 90)
any_deprecated = False
for page in PAGES:
    r = results[page]
    if "error" in r:
        continue
    dep = r["lucide_icons"]["deprecated_brand"]
    if dep:
        any_deprecated = True
        print(f"  {page}: {dep}")
if not any_deprecated:
    print("  ✓ None found across all 10 pages")

print()
print("=" * 90)
print("DESIGN TOKEN USAGE PER PAGE")
print("=" * 90)
print(f"{'Page':<10} {'glass':>6} {'gsoft':>6} {'ginput':>7} {'glow':>5} {'tilt':>5} {'tlayer':>7} {'rev':>4} {'pgrid':>6}")
print("-" * 75)
for page in PAGES:
    r = results[page]
    if "error" in r:
        continue
    t = r["design_tokens"]
    print(f"{page:<10} {t['glass']:>6} {t['glass_soft']:>6} {t['glass_input']:>7} {t['glow_btn']:>5} {t['tilt_card']:>5} {t['tilt_layer']:>7} {t['reveal']:>4} {t['perspective_grid']:>6}")

# Save full JSON
out_path = Path("/home/z/my-project/download/qa-per-page-audit.json")
out_path.write_text(json.dumps(results, indent=2), encoding="utf-8")
print(f"\nFull JSON saved to: {out_path}")
