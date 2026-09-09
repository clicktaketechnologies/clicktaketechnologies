#!/usr/bin/env python3
"""
v5 FINAL QA / GAP ANALYSIS audit for ClickTake 100-page SPA.
Comprehensive cross-check of every page for new-design compliance + bug detection.
"""
import re
import json
import sys
from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict

HTML_PATH = Path("/home/z/my-project/download/clicktake-landing.html")
SRC = HTML_PATH.read_text(encoding="utf-8")
LINES = SRC.split("\n")

findings = []
def add(severity, area, msg, fix=None, page=None):
    findings.append({"severity": severity, "area": area, "msg": msg, "fix": fix or "", "page": page or ""})

# ============== 1. DISCOVER ALL PAGES ==============
# data-page="..." on <section> tags (not inside JS template strings)
# Match: <section ... data-page="..."
section_pages = set()
for m in re.finditer(r'<section[^>]*\sdata-page="([^"]+)"', SRC):
    section_pages.add(m.group(1))

print(f"Discovered {len(section_pages)} page sections")

# ============== 2. PAGES MAP in SPA router ==============
# Look for: const PAGES = { ... }; (closing brace may be indented)
pages_map_match = re.search(r'(?:const|var)\s+PAGES\s*=\s*\{(.+?)\n\s*\};', SRC, re.S)
if not pages_map_match:
    add("Critical", "Router", "PAGES map not found in SPA router")
    pages_map_pages = set()
else:
    pages_blob = pages_map_match.group(1)
    # Each entry is like: 'slug': { title: '...', ... },
    pages_map_pages = set(re.findall(r"['\"]([a-z0-9-]+)['\"]\s*:\s*\{", pages_blob))
    print(f"PAGES map has {len(pages_map_pages)} entries")

# Cross-check section pages vs PAGES map
sections_not_in_map = section_pages - pages_map_pages
map_not_in_sections = pages_map_pages - section_pages
if sections_not_in_map:
    add("Critical", "Router", f"{len(sections_not_in_map)} page sections missing from PAGES map: {sorted(sections_not_in_map)[:10]}")
if map_not_in_sections:
    add("Critical", "Router", f"{len(map_not_in_sections)} PAGES map entries have no <section>: {sorted(map_not_in_sections)[:10]}")

# ============== 3. PER-PAGE SEO METADATA IN PAGES MAP ==============
if pages_map_match:
    # Parse each entry to verify it has title, desc, kw, url (PAGES map field names)
    # Split on top-level entries
    entries = re.findall(r"['\"]([a-z0-9-]+)['\"]\s*:\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", pages_blob)
    missing_seo = []
    for slug, body in entries:
        for field in ("title", "desc", "kw", "url"):
            if not re.search(rf'\b{field}\s*:', body):
                missing_seo.append(f"{slug}.{field}")
    if missing_seo:
        add("High", "SEO", f"{len(missing_seo)} pages missing SEO fields in PAGES map", "Samples: " + ", ".join(missing_seo[:10]))

# ============== 4. INTERNAL LINKS — every internal href resolves to a page ==============
# href="#page-slug" or onclick="navigateTo('slug')"
hash_links = re.findall(r'href="#([^"]+)"', SRC)
nav_calls = re.findall(r"navigateTo\(['\"]([^'\"]+)['\"]\)", SRC)
all_internal = set(hash_links + nav_calls)
# Exclude skip-link target and empty strings
broken = all_internal - section_pages - {"", "top", "main-content"}
if broken:
    add("High", "Links", f"{len(broken)} internal links point to non-existent pages", "Samples: " + ", ".join(sorted(broken)[:15]))

# ============== 5. GLOBAL ELEMENTS PRESENT ONCE ==============
global_checks = [
    ("Floating WhatsApp button", r'class="wa-float"', "High"),
    ("Brand logo in header", r'class="[^"]*brand-logo[^"]*"', "High"),
    ("Skip link", r'class="skip-link"', "Medium"),
    ("Main landmark", r'<main\b', "Medium"),
    ("JSON-LD Organization", r'"@type"\s*:\s*"Organization"', "High"),
    ("JSON-LD SoftwareApplication", r'"@type"\s*:\s*"SoftwareApplication"', "High"),
    ("Reveal safety net", r'revealSafetyNet', "High"),
    ("Counter safety net", r'counterSafetyNet', "High"),
    ("Particle canvas", r'<canvas[^>]*id="particle-canvas"', "Medium"),
    ("Tailwind CDN", r'cdn\.tailwindcss\.com', "Medium"),
    ("Lucide CDN", r'unpkg\.com/lucide', "Medium"),
    ("Space Grotesk font", r'Space\+Grotesk', "Medium"),
    ("Plus Jakarta Sans font", r'Plus\+Jakarta\+Sans', "Medium"),
]
for name, pat, sev in global_checks:
    if not re.search(pat, SRC, re.I):
        add(sev, "Global", f"Missing global element: {name}")

# ============== 6. PER-PAGE STRUCTURAL CHECKS ==============
# For each page section, check it has: hero, breadcrumb (except home), CTA section, glass tokens
page_section_pattern = re.compile(
    r'<section[^>]*\sdata-page="([^"]+)"[^>]*>(.*?)</section>\s*(?=<section[^>]*\sdata-page="|<!--\s*END\s+PAGES\s*-->|<footer)',
    re.S
)

# Better: split by data-page attribute and capture until next section
# Use simpler approach: find each section's body
page_bodies = {}
for m in re.finditer(r'<section[^>]*\sdata-page="([^"]+)"[^>]*>', SRC):
    slug = m.group(1)
    start = m.end()
    # Find next <section data-page= or end marker
    next_section = SRC.find('<section', start)
    end_marker = SRC.find('<!-- END PAGES', start)
    footer_pos = SRC.find('<footer', start)
    candidates = [p for p in [next_section, end_marker, footer_pos] if p > 0]
    end = min(candidates) if candidates else len(SRC)
    page_bodies[slug] = SRC[start:end]

print(f"Extracted bodies for {len(page_bodies)} pages")

# Per-page checks
pages_missing_hero = []
pages_missing_breadcrumb = []
pages_missing_glass = []
pages_missing_reveal = []
pages_no_h1_or_h2 = []
pages_with_legacy_markup = []

for slug, body in page_bodies.items():
    # Hero = presence of H1 (sub-pages) or hero class (home)
    has_h1 = bool(re.search(r'<h1\b', body, re.I))
    if slug == "home":
        if not has_h1 and not re.search(r'class="[^"]*hero[^"]*"', body, re.I):
            pages_missing_hero.append(slug)
    else:
        # Sub-pages: hero is the pt-32 lg:pt-40 region with h1
        if not has_h1:
            pages_missing_hero.append(slug)
        # Sub-pages should have breadcrumb
        if "breadcrumb" not in body.lower() and "crumb" not in body.lower():
            pages_missing_breadcrumb.append(slug)
    # Glass tokens
    if "glass" not in body.lower():
        pages_missing_glass.append(slug)
    # Headings
    h1 = len(re.findall(r'<h1\b', body, re.I))
    h2 = len(re.findall(r'<h2\b', body, re.I))
    if h1 == 0 and h2 == 0:
        pages_no_h1_or_h2.append(slug)
    # Legacy markup checks (old classes from v3/v4)
    if "card-old" in body or "old-hero" in body:
        pages_with_legacy_markup.append(slug)

if pages_missing_hero:
    add("Medium", "Structure", f"{len(pages_missing_hero)} pages missing hero section", "Samples: " + ", ".join(pages_missing_hero[:10]))
if pages_missing_breadcrumb:
    add("Medium", "Structure", f"{len(pages_missing_breadcrumb)} sub-pages missing breadcrumb", "Samples: " + ", ".join(pages_missing_breadcrumb[:10]))
if pages_missing_glass:
    add("High", "Design", f"{len(pages_missing_glass)} pages missing glassmorphism tokens", "Samples: " + ", ".join(pages_missing_glass[:10]))
if pages_no_h1_or_h2:
    add("High", "Headings", f"{len(pages_no_h1_or_h2)} pages with no H1 or H2", "Samples: " + ", ".join(pages_no_h1_or_h2[:10]))
if pages_with_legacy_markup:
    add("High", "Design", f"{len(pages_with_legacy_markup)} pages with legacy markup classes", "Samples: " + ", ".join(pages_with_legacy_markup[:10]))

# ============== 7. CONTACT DETAILS ==============
EXPECTED_PHONE_DISPLAY = "+44 775 155 3879"
EXPECTED_PHONE_TEL = "+447751553879"
EXPECTED_EMAIL = "info@clicktaketech.com"
EXPECTED_WA = "https://wa.link/iqz8eg"

phone_count = SRC.count(EXPECTED_PHONE_DISPLAY) + SRC.count(EXPECTED_PHONE_TEL)
email_count = SRC.lower().count(EXPECTED_EMAIL.lower())
wa_count = SRC.count(EXPECTED_WA)

if phone_count < 3:
    add("High", "Contact", f"Phone appears only {phone_count} times (expected 3+)")
if email_count < 3:
    add("High", "Contact", f"Email appears only {email_count} times (expected 3+)")
if wa_count < 3:
    add("High", "Contact", f"WhatsApp link appears only {wa_count} times (expected 4+)")

# ============== 8. PLACEHOLDERS ==============
SRC_FOR_PLACEHOLDER = re.sub(r'data:[^"\'\\]+', '', SRC)
SRC_FOR_PLACEHOLDER = re.sub(r'<style[^>]*>.*?</style>', '', SRC_FOR_PLACEHOLDER, flags=re.S | re.I)
SRC_FOR_PLACEHOLDER = re.sub(r'<script[^>]*>.*?</script>', '', SRC_FOR_PLACEHOLDER, flags=re.S | re.I)

placeholders = [
    ("+1 (800) 555-0100", "old US phone"),
    ("hello@clicktake.com", "old placeholder email"),
    ("contact@clicktake.com", "old placeholder email"),
    ("your-email@example.com", "placeholder email"),
    ("lorem ipsum", "placeholder text"),
    ("TODO", "TODO marker"),
    ("TBD", "TBD marker"),
    ("Coming Soon", "Coming Soon text"),
    ("placeholder.com", "placeholder image service"),
    ("via.placeholder", "placeholder image service"),
    ("example.com", "example domain (excluding brand)"),
]
for val, desc in placeholders:
    if val.lower() == "example.com":
        # skip clicktaketech.com etc
        if any(s in SRC_FOR_PLACEHOLDER.lower() for s in ["//example.com", "http://example.com", "https://example.com", " href=\"https://example.com"]):
            add("Medium", "Placeholder", f"Found '{val}' ({desc}) still in HTML")
    elif val.lower() in SRC_FOR_PLACEHOLDER.lower():
        add("Medium", "Placeholder", f"Found '{val}' ({desc}) still in HTML")

# ============== 9. HEAD META TAGS ==============
head_match = re.search(r'<head[^>]*>(.*?)</head>', SRC, re.S | re.I)
head = head_match.group(1) if head_match else SRC[:5000]
required_head_tags = [
    ("title", r'<title[^>]*>[^<]+</title>'),
    ("meta description", r'<meta\s+name=["\']description["\'][^>]*content=["\'][^"\']+["\']'),
    ("meta keywords", r'<meta\s+name=["\']keywords["\'][^>]*content=["\'][^"\']+["\']'),
    ("canonical", r'<link\s+rel=["\']canonical["\'][^>]*href=["\'][^"\']+["\']'),
    ("og:title", r'<meta\s+property=["\']og:title["\'][^>]*'),
    ("og:description", r'<meta\s+property=["\']og:description["\'][^>]*'),
    ("og:image", r'<meta\s+property=["\']og:image["\'][^>]*'),
    ("og:url", r'<meta\s+property=["\']og:url["\'][^>]*'),
    ("og:type", r'<meta\s+property=["\']og:type["\'][^>]*'),
    ("twitter:card", r'<meta\s+name=["\']twitter:card["\'][^>]*'),
    ("twitter:title", r'<meta\s+name=["\']twitter:title["\'][^>]*'),
    ("twitter:image", r'<meta\s+name=["\']twitter:image["\'][^>]*'),
    ("viewport", r'<meta\s+name=["\']viewport["\'][^>]*'),
    ("charset", r'<meta\s+charset=["\']?utf-8'),
    ("favicon", r'<link[^>]*rel=["\']icon["\'][^>]*'),
    ("apple-touch-icon", r'<link[^>]*rel=["\']apple-touch-icon["\'][^>]*'),
]
for name, pat in required_head_tags:
    if not re.search(pat, head, re.I):
        add("High", "HEAD", f"Missing <head> tag: {name}")

# ============== 10. JSON-LD VALIDITY ==============
jsonld_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', SRC, re.S)
if not jsonld_blocks:
    add("High", "JSON-LD", "No JSON-LD blocks found")
else:
    for i, blk in enumerate(jsonld_blocks):
        try:
            data = json.loads(blk.strip())
            if "@type" not in data:
                add("Medium", "JSON-LD", f"Block #{i+1} missing @type")
        except json.JSONDecodeError as e:
            add("High", "JSON-LD", f"Block #{i+1} invalid JSON: {e}")

# ============== 11. IMG ALT TEXT ==============
img_tags = re.findall(r'<img\s+[^>]*?>', SRC, re.I)
imgs_no_alt = []
for tag in img_tags:
    if not re.search(r'\salt=["\']', tag, re.I):
        imgs_no_alt.append(tag[:80])
if imgs_no_alt:
    add("Medium", "A11y", f"{len(imgs_no_alt)} <img> tag(s) missing alt text", "Sample: " + imgs_no_alt[0])

# ============== 12. A11Y ==============
if "prefers-reduced-motion" not in SRC:
    add("Medium", "A11y", "No prefers-reduced-motion media query")
if ":focus-visible" not in SRC and ":focus" not in SRC:
    add("Low", "A11y", "No :focus styles defined")
aria_count = SRC.count("aria-label")
if aria_count < 5:
    add("Medium", "A11y", f"Only {aria_count} aria-label attributes (target 5+)")

# ============== 13. TAG BALANCE ==============
class TagCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.open_count = {}
        self.close_count = {}
    def handle_starttag(self, tag, attrs):
        if tag in ("img", "br", "hr", "meta", "link", "input", "source", "area", "base", "col", "embed", "param", "track", "wbr", "path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "stop", "use"):
            return
        self.open_count[tag] = self.open_count.get(tag, 0) + 1
    def handle_endtag(self, tag):
        self.close_count[tag] = self.close_count.get(tag, 0) + 1

p = TagCounter()
try:
    p.feed(SRC)
except Exception as e:
    add("Low", "TagBalance", f"HTMLParser error: {e}")

for tag in ("div", "section", "header", "footer", "main", "nav", "article", "p", "a", "span", "ul", "li", "h1", "h2", "h3", "h4"):
    o = p.open_count.get(tag, 0)
    c = p.close_count.get(tag, 0)
    if o != c:
        add("High", "TagBalance", f"<{tag}> unbalanced: {o} open vs {c} close")

# ============== 14. PALETTE COMPLIANCE ==============
PALETTE = {"#03000D", "#070018", "#0D0025", "#136DFF", "#FF53A9", "#7B2FBE", "#F0EBF8", "#9A8CB5"}
PALETTE_LOWER = {c.lower().lstrip('#') for c in PALETTE}
# Acceptable off-palette: WhatsApp brand greens, skin tones for mascots, tints/shades for subtle gradients
ACCEPTABLE_OFF_PALETTE = {
    "128c7e", "25d366",  # WhatsApp brand greens
    "c98a66", "e8a884", "ffb4dc", "ffe0c2",  # mascot skin tones / illustration tints
    "0a0118", "0a1746",  # darker background variants for depth
    "e0197a",  # pink accent variant
    "f4eefb", "d4b4ff", "b4d1ff",  # light tints of brand colors used for subtle backgrounds
}
hex_colors = set(re.findall(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', SRC))
off_palette = []
for c in hex_colors:
    cl = c.lower().lstrip('#')
    if cl in ("fff", "ffffff", "000", "000000"):
        continue
    if cl in ACCEPTABLE_OFF_PALETTE:
        continue
    if cl not in PALETTE_LOWER and not any(cl == p[:len(cl)] for p in PALETTE_LOWER if len(p) > len(cl)):
        off_palette.append("#" + c)
if off_palette:
    add("Low", "Palette", f"{len(off_palette)} hex colors not in brand palette", "Samples: " + ", ".join(off_palette[:8]))

# ============== 15. EXTERNAL RESOURCE HEALTH ==============
ext_links = re.findall(r'(?:src|href)=["\'](https?://[^"\']+)["\']', SRC)
cdn_count = len([l for l in ext_links if any(x in l for x in ["cdn", "unpkg", "jsdelivr", "googleapis", "gstatic"])])
if cdn_count == 0:
    add("Medium", "Resources", "No CDN resources found — Tailwind/Lucide may not be loaded")

# External scripts should have defer/async
scripts = re.findall(r'<script\b[^>]*>', SRC)
ext_no_defer = [s for s in scripts if "src=" in s and "defer" not in s.lower() and "async" not in s.lower() and "application/ld+json" not in s.lower()]
if ext_no_defer:
    add("Low", "Perf", f"{len(ext_no_defer)} external <script> without defer/async")

# ============== 16. DUPLICATE PAGE SLUGS ==============
slug_occurrences = defaultdict(int)
for m in re.finditer(r'<section[^>]*\sdata-page="([^"]+)"', SRC):
    slug_occurrences[m.group(1)] += 1
duplicates = {s: c for s, c in slug_occurrences.items() if c > 1}
if duplicates:
    add("Critical", "Duplicates", f"{len(duplicates)} page slugs have duplicate <section>: {duplicates}")

# ============== REPORT ==============
print("\n" + "=" * 78)
print("CLICKTAKE LANDING — v5 FINAL QA / GAP ANALYSIS REPORT")
print(f"File: {HTML_PATH}")
print(f"Size: {HTML_PATH.stat().st_size/1024:.1f} KB | Lines: {len(LINES)}")
print(f"Pages discovered: {len(section_pages)}")
print(f"PAGES map entries: {len(pages_map_pages)}")
print("=" * 78)

severity_order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3, "Info": 4}
findings.sort(key=lambda f: severity_order.get(f["severity"], 99))

by_sev = defaultdict(list)
for f in findings:
    by_sev[f["severity"]].append(f)

print("\nSUMMARY")
print("-" * 78)
for sev in ("Critical", "High", "Medium", "Low", "Info"):
    print(f"  {sev:9s}: {len(by_sev[sev])}")
print(f"  {'TOTAL':9s}: {len(findings)}")
print()

if not findings:
    print("✅ NO GAPS FOUND — site is production-ready.")
    sys.exit(0)

for sev in ("Critical", "High", "Medium", "Low", "Info"):
    items = by_sev[sev]
    if not items:
        continue
    print(f"\n{sev.upper()} ({len(items)})")
    print("-" * 78)
    for f in items:
        print(f"[{f['area']}] {f['msg']}")
        if f["fix"]:
            print(f"    → {f['fix']}")

print("\n" + "=" * 78)
print("END OF REPORT")
print("=" * 78)

# Save JSON report
report = {
    "file": str(HTML_PATH),
    "size_kb": round(HTML_PATH.stat().st_size/1024, 1),
    "lines": len(LINES),
    "pages_discovered": len(section_pages),
    "pages_map_entries": len(pages_map_pages),
    "findings": findings,
    "summary": {sev: len(by_sev[sev]) for sev in ("Critical", "High", "Medium", "Low", "Info")},
}
Path("/home/z/my-project/download/qa-v5-audit.json").write_text(json.dumps(report, indent=2))
print(f"\nJSON report saved: /home/z/my-project/download/qa-v5-audit.json")
