#!/usr/bin/env python3
"""
Final QA / Gap Analysis audit for ClickTake landing page.
Reads the final HTML, runs a battery of checks, prints structured findings.
"""
import re
import json
import sys
from pathlib import Path
from html.parser import HTMLParser

HTML_PATH = Path("/home/z/my-project/download/clicktake-landing.html")
SRC = HTML_PATH.read_text(encoding="utf-8")

# Expected pages (SPA page ids)
EXPECTED_PAGES = ["home", "services", "solutions", "cases", "about", "blog", "careers", "contact", "privacy", "terms"]

# Allowed palette colors
PALETTE = {
    "#03000D", "#070018", "#0D0025",
    "#136DFF", "#FF53A9", "#7B2FBE",
    "#F0EBF8", "#9A8CB5",
    "#0a001f", "#03000d", "#070018", "#0D0025",
}
PALETTE_LOWER = {c.lower().lstrip('#') for c in PALETTE}

# Real contact values
EXPECTED_PHONE = "+44 775 155 3879"
EXPECTED_PHONE_TEL = "+447751553879"
EXPECTED_EMAIL = "info@clicktaketech.com"
EXPECTED_WA = "https://wa.link/iqz8eg"

findings = []
def add(severity, area, msg, fix=None):
    findings.append({"severity": severity, "area": area, "msg": msg, "fix": fix or ""})

# ============== 1. PAGE IDS vs NAV TARGETS ==============
# Pages use data-page="..." attribute on <section>
page_ids = set(re.findall(r'data-page="([a-z]+)"', SRC))
nav_targets = set(re.findall(r'data-nav="([a-z]+)"', SRC))
missing_pages = set(EXPECTED_PAGES) - page_ids
orphan_nav = nav_targets - set(EXPECTED_PAGES)
broken_nav = nav_targets - page_ids

if missing_pages:
    add("Critical", "Pages", f"Missing page sections: {missing_pages}")
if orphan_nav:
    add("High", "Navigation", f"Nav targets not in expected page list: {orphan_nav}")
if broken_nav:
    add("Critical", "Navigation", f"Nav targets with no matching page id: {broken_nav}")
else:
    add("Info", "Navigation", f"All {len(nav_targets)} nav targets resolve to existing pages")

# ============== 2. SEO META — per-page metadata stored in SPA router ==============
# Look for the SPA router's per-page SEO swap (usually in a navigateTo function or seo_data object)
seo_data_match = re.search(r'(?:const|var)\s+seo(?:Data|Pages|Map)?\s*=\s*\{(.+?)\};', SRC, re.S | re.I)
if seo_data_match:
    seo_blob = seo_data_match.group(1)
    for page in EXPECTED_PAGES:
        page_meta = re.search(rf'["\']?{page}["\']?\s*:\s*\{{(.+?)\}}', seo_blob, re.S)
        if not page_meta:
            add("High", "SEO", f"Page '{page}' missing from seoData map")
            continue
        body = page_meta.group(1)
        for field in ("title", "description", "keywords", "canonical", "og:image", "twitter:image"):
            if field.lower() not in body.lower():
                add("Medium", "SEO", f"Page '{page}' missing SEO field: {field}")
else:
    # Maybe per-page meta in different structure
    for page in EXPECTED_PAGES:
        # Check if each page is mentioned in some SEO context
        if f'"{page}"' not in SRC and f"'{page}'" not in SRC:
            add("Medium", "SEO", f"Page '{page}' has no SEO metadata references")

# ============== 3. CANONICAL / OG / TWITTER TAGS in HEAD ==============
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
]
for name, pat in required_head_tags:
    if not re.search(pat, head, re.I):
        add("High", "HEAD", f"Missing <head> tag: {name}")

# ============== 4. JSON-LD BLOCKS ==============
jsonld_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', SRC, re.S)
if len(jsonld_blocks) < 1:
    add("High", "JSON-LD", "No JSON-LD blocks found")
else:
    for i, blk in enumerate(jsonld_blocks):
        try:
            data = json.loads(blk.strip())
            if "@type" not in data:
                add("Medium", "JSON-LD", f"Block #{i+1} missing @type")
        except json.JSONDecodeError as e:
            add("High", "JSON-LD", f"Block #{i+1} invalid JSON: {e}")

# ============== 5. IMG ALT TEXT ==============
img_tags = re.findall(r'<img\s+[^>]*?>', SRC, re.I)
imgs_no_alt = []
for tag in img_tags:
    if not re.search(r'\salt=["\']', tag, re.I):
        imgs_no_alt.append(tag[:80])
if imgs_no_alt:
    add("Medium", "A11y", f"{len(imgs_no_alt)} <img> tag(s) missing alt text", "Sample: " + imgs_no_alt[0])

# ============== 6. HEADING HIERARCHY per page ==============
# Extract each page section, count h1 per page
page_sections = re.split(r'<section[^>]*id="page-([a-z]+)"', SRC)
# page_sections[1::2] = page id, [2::2] = section body
for i in range(1, len(page_sections), 2):
    pid = page_sections[i]
    body = page_sections[i+1] if i+1 < len(page_sections) else ""
    # cut at next page-... section start
    nxt = body.find('id="page-')
    if nxt > 0:
        body = body[:nxt]
    h1_count = len(re.findall(r'<h1\b', body, re.I))
    if pid == "home":
        if h1_count == 0:
            add("High", "Headings", f"Home page has no H1")
        elif h1_count > 1:
            add("Medium", "Headings", f"Home page has {h1_count} H1s (should be 1)")
    else:
        # inner pages may use h1 or h2; warn if 0 h1
        if h1_count == 0:
            # check h2 presence
            h2_count = len(re.findall(r'<h2\b', body, re.I))
            if h2_count == 0:
                add("High", "Headings", f"Page '{pid}' has no H1 or H2")

# ============== 7. CONTACT DETAILS COVERAGE ==============
# Phone
phone_count = SRC.count(EXPECTED_PHONE) + SRC.count(EXPECTED_PHONE_TEL)
if phone_count < 3:
    add("High", "Contact", f"Phone '{EXPECTED_PHONE}' appears only {phone_count} times (expected 3+: header/footer/contact)")
# Email
email_count = SRC.lower().count(EXPECTED_EMAIL.lower())
if email_count < 3:
    add("High", "Contact", f"Email '{EXPECTED_EMAIL}' appears only {email_count} times (expected 3+)")
# WhatsApp
wa_count = SRC.count(EXPECTED_WA)
if wa_count < 3:
    add("High", "Contact", f"WhatsApp link appears only {wa_count} times (expected 4+: float/footer/sidebar/home/social)")

# ============== 8. FLOATING WHATSAPP BUTTON ==============
if 'class="wa-float"' not in SRC and "class='wa-float'" not in SRC:
    add("High", "WhatsApp", "Floating WhatsApp button (.wa-float) not found")
elif SRC.count('wa-float') < 2:
    add("Medium", "WhatsApp", "Floating WhatsApp button found but CSS+HTML pairing incomplete")

# ============== 9. OLD PLACEHOLDER VALUES REMAINING ==============
# Strip base64 data URIs and <style>/<script> blocks before searching for placeholder text
SRC_FOR_PLACEHOLDER = re.sub(r'data:[^"\']+', '', SRC)
SRC_FOR_PLACEHOLDER = re.sub(r'<style[^>]*>.*?</style>', '', SRC_FOR_PLACEHOLDER, flags=re.S | re.I)
SRC_FOR_PLACEHOLDER = re.sub(r'<script[^>]*>.*?</script>', '', SRC_FOR_PLACEHOLDER, flags=re.S | re.I)

placeholders = [
    ("+1 (800) 555-0100", "old US phone placeholder"),
    ("hello@clicktake.com", "old placeholder email"),
    ("contact@clicktake.com", "old placeholder email"),
    ("your-email@example.com", "placeholder email"),
    ("+1 234 567 890", "placeholder phone"),
    ("lorem ipsum", "placeholder text"),
    ("TODO", "TODO marker"),
    ("TBD", "TBD marker"),
    ("Coming Soon", "Coming Soon text"),
]
for val, desc in placeholders:
    if val.lower() in SRC_FOR_PLACEHOLDER.lower():
        add("Medium", "Placeholder", f"Found '{val}' ({desc}) still in HTML")

# ============== 10. PALETTE COMPLIANCE ==============
# Find all hex colors used in style
hex_colors = set(re.findall(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', SRC))
off_palette = []
for c in hex_colors:
    cl = c.lower().lstrip('#')
    if cl in ("fff", "ffffff", "000", "000000"):
        continue  # black/white acceptable
    # Accept short-form duplicates of palette (e.g. "fff" vs "ffffff")
    if cl not in PALETTE_LOWER and not any(cl == p[:len(cl)] for p in PALETTE_LOWER if len(p) > len(cl)):
        # also accept rgba/hsl-derived — but flag obvious offenders
        off_palette.append("#" + c)
if off_palette:
    add("Low", "Palette", f"{len(off_palette)} hex colors not in brand palette", "Samples: " + ", ".join(off_palette[:8]))

# ============== 11. MASCOTS (3 SVG/CSS) ==============
mascot_count = SRC.lower().count("mascot")
if mascot_count < 3:
    add("Medium", "Mascots", f"Only {mascot_count} 'mascot' references found (expected 3+)")

# ============== 12. ACCESSIBILITY — focus, aria, reduced-motion ==============
if "prefers-reduced-motion" not in SRC:
    add("Medium", "A11y", "No prefers-reduced-motion media query")
if ":focus-visible" not in SRC and ":focus" not in SRC:
    add("Low", "A11y", "No :focus styles defined")
aria_count = SRC.count("aria-label")
if aria_count < 5:
    add("Medium", "A11y", f"Only {aria_count} aria-label attributes (target 5+)")

# ============== 13. TAG BALANCE for key tags ==============
class TagCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.open_count = {}
        self.close_count = {}
    def handle_starttag(self, tag, attrs):
        # skip self-closing
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

# ============== 14. EXTERNAL RESOURCE HEALTH ==============
ext_links = re.findall(r'(?:src|href)=["\'](https?://[^"\']+)["\']', SRC)
cdn_count = len([l for l in ext_links if "cdn" in l or "unpkg" in l or "jsdelivr" in l or "googleapis" in l or "gstatic" in l])
if cdn_count == 0:
    add("Medium", "Resources", "No CDN resources found — Tailwind/Lucide may not be loaded")

# ============== 15. SCRIPT TYPE=MODULE / DEFER ==============
scripts = re.findall(r'<script\b[^>]*>', SRC)
no_defer = [s for s in scripts if "defer" not in s.lower() and "async" not in s.lower() and "application/ld+json" not in s.lower() and "src=" not in s.lower()]
# inline scripts without defer are fine, but external should have defer
ext_no_defer = [s for s in scripts if "src=" in s and "defer" not in s.lower() and "async" not in s.lower()]
if ext_no_defer:
    add("Low", "Perf", f"{len(ext_no_defer)} external <script> without defer/async")

# ============== REPORT ==============
print("=" * 78)
print("CLICKTAKE LANDING — FINAL QA / GAP ANALYSIS REPORT")
print(f"File: {HTML_PATH}")
print(f"Size: {HTML_PATH.stat().st_size/1024:.1f} KB | Lines: {SRC.count(chr(10))+1}")
print("=" * 78)

severity_order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3, "Info": 4}
findings.sort(key=lambda f: severity_order.get(f["severity"], 99))

# Group by severity
from collections import defaultdict
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
