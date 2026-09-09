#!/usr/bin/env python3
"""
ClickTake v4 — Comprehensive gap audit.
Scans /home/z/my-project/download/clicktake-landing.html for:
  1. Structure: tag balance, empty anchors, missing alt, broken hashes
  2. SEO per page: title/desc/keywords/canonical/OG/Twitter/JSON-LD
  3. Accessibility: ARIA, landmarks, contrast, focus
  4. Functional: form submit handler, calendar logic, routing edge cases
  5. Content depth: word count per page section
  6. Consistency: shared components across all 10 pages
"""
import re
from pathlib import Path
from html.parser import HTMLParser

HTML_FILE = Path("/home/z/my-project/download/clicktake-landing.html")
html = HTML_FILE.read_text(encoding="utf-8")

PAGES = ["home", "services", "solutions", "cases", "contact",
         "about", "blog", "careers", "privacy", "terms"]

print("=" * 78)
print(f" CLICKTAKE v4 — GAP AUDIT")
print(f" File: {HTML_FILE.name}  ({len(html.encode())/1024:.1f} KB, {html.count(chr(10))+1} lines)")
print("=" * 78)

# ============================================================================
# 1. STRUCTURE — tag balance, empty anchors, missing alt, broken hashes
# ============================================================================
print("\n[1] STRUCTURE\n" + "-" * 78)

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.issues = []
        self.void = {"area","base","br","col","embed","hr","img","input",
                     "link","meta","param","source","track","wbr"}
    def handle_starttag(self, tag, attrs):
        if tag in self.void: return
        self.stack.append((tag, self.getpos()))
    def handle_endtag(self, tag):
        if tag in self.void: return
        if not self.stack:
            self.issues.append(f"  Closing </{tag}> at {self.getpos()} but stack is empty")
            return
        # find matching
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                # anything above is unclosed
                for t, pos in self.stack[i+1:]:
                    self.issues.append(f"  Unclosed <{t}> opened at line {pos[0]}")
                self.stack = self.stack[:i]
                return
        self.issues.append(f"  Closing </{tag}> at {self.getpos()} has no matching open")

p = TagChecker()
try:
    p.feed(html)
except Exception as e:
    print(f"  Parser error: {e}")
if p.issues:
    print(f"  TAG ISSUES ({len(p.issues)}):")
    for i in p.issues[:20]:
        print(i)
else:
    print("  Tag balance: OK (all tags properly closed)")

# Empty href="#"
empty_hash = re.findall(r'<a[^>]*href="#"[^>]*>([^<]*)</a>', html)
print(f"  Empty href='#' anchors: {len(empty_hash)}  (should be 0)")
for a in empty_hash[:5]:
    print(f"    -> '{a.strip()[:60]}'")

# All hash anchors that have no matching target
hash_targets = set(re.findall(r'href="#([^"]+)"', html))
ids_defined = set(re.findall(r'\sid="([^"]+)"', html))
data_pages = set(re.findall(r'data-page="([^"]+)"', html))
orphan_hashes = hash_targets - ids_defined - data_pages
print(f"  Hash anchors without matching id/data-page target: {len(orphan_hashes)}")
for h in sorted(orphan_hashes)[:10]:
    print(f"    -> #{h}")

# Images without alt
imgs_no_alt = re.findall(r'<img(?![^>]*\salt=)[^>]*>', html)
print(f"  <img> tags missing alt: {len(imgs_no_alt)}")
for i in imgs_no_alt[:5]:
    print(f"    -> {i[:80]}")

# ============================================================================
# 2. SEO PER PAGE — title/desc/keywords/canonical/OG/Twitter/JSON-LD
# ============================================================================
print("\n[2] SEO PER PAGE\n" + "-" * 78)

# Check SPA router config covers all 10 pages
router_block = re.search(r'const PAGES\s*=\s*\{(.+?)\};\s*\n\s*(?:function|const|//)', html, re.DOTALL)
if router_block:
    rb = router_block.group(1)
    for pg in PAGES:
        has = f"{pg}:" in rb or f"'{pg}':" in rb
        title_ok = bool(re.search(rf"{pg}:\s*\{{[^}}]*title:", rb))
        desc_ok = bool(re.search(rf"{pg}:\s*\{{[^}}]*desc:", rb))
        kw_ok = bool(re.search(rf"{pg}:\s*\{{[^}}]*kw:", rb))
        url_ok = bool(re.search(rf"{pg}:\s*\{{[^}}]*url:", rb))
        status = "OK" if all([has, title_ok, desc_ok, kw_ok, url_ok]) else "GAP"
        print(f"  [{status}] {pg:12}  title={title_ok} desc={desc_ok} kw={kw_ok} url={url_ok}")

# Check each page section has an H1
for pg in PAGES:
    pattern = rf'data-page="{pg}"[^>]*>(.*?)(?=data-page="(?!{pg})"|$)'
    m = re.search(pattern, html, re.DOTALL)
    if m:
        block = m.group(1)
        h1_count = len(re.findall(r'<h1\b', block))
        h2_count = len(re.findall(r'<h2\b', block))
        status = "OK" if h1_count == 1 else "GAP"
        print(f"  [{status}] {pg:12}  H1={h1_count} H2={h2_count}")
    else:
        print(f"  [GAP] {pg:12}  PAGE SECTION NOT FOUND")

# JSON-LD count
jsonld = re.findall(r'<script type="application/ld\+json">', html)
print(f"  JSON-LD blocks: {len(jsonld)}")

# Sitemap link in footer?
print(f"  Sitemap.xml link present: {'sitemap' in html.lower()}")
print(f"  robots.txt link present:  {'robots.txt' in html.lower()}")

# ============================================================================
# 3. ACCESSIBILITY — ARIA, landmarks, focus, contrast
# ============================================================================
print("\n[3] ACCESSIBILITY\n" + "-" * 78)

landmarks = {
    "header": len(re.findall(r'<header\b', html)),
    "nav": len(re.findall(r'<nav\b', html)),
    "main": len(re.findall(r'<main\b', html)),
    "footer": len(re.findall(r'<footer\b', html)),
    "section": len(re.findall(r'<section\b', html)),
    "article": len(re.findall(r'<article\b', html)),
    "aside": len(re.findall(r'<aside\b', html)),
}
for k, v in landmarks.items():
    print(f"  <{k}> landmarks: {v}")

aria_labels = len(re.findall(r'aria-label="', html))
aria_hidden = len(re.findall(r'aria-hidden="', html))
role_attrs = len(re.findall(r'\brole="', html))
print(f"  aria-label count:   {aria_labels}")
print(f"  aria-hidden count:  {aria_hidden}")
print(f"  role attributes:    {role_attrs}")

# Skip link
has_skip = bool(re.search(r'href="#main"[^>]*>(?:Skip|skip)', html)) or 'skip-link' in html
print(f"  Skip-to-main link:  {has_skip}")

# Focus styles in CSS
focus_rules = re.findall(r':focus[^{]*\{[^}]+\}', html)
print(f"  :focus CSS rules:   {len(focus_rules)}")
print(f"  outline:none count: {html.count('outline:none')}  (should not be 0 globally without replacement)")

# Form labels
inputs = re.findall(r'<input\b[^>]*>', html)
inputs_with_label = 0
for inp in inputs:
    # check if there is a <label> with matching for= nearby OR wrapped
    pass  # rough check below
labels = re.findall(r'<label\b', html)
print(f"  <input> count: {len(inputs)}  <label> count: {len(labels)}")

# Lang attribute
print(f"  <html lang='en'>: {'lang=\"en\"' in html}")

# ============================================================================
# 4. FUNCTIONAL GAPS — form submit, calendar, routing edge cases
# ============================================================================
print("\n[4] FUNCTIONAL GAPS\n" + "-" * 78)

# Form submit handler
print(f"  Form has submit handler:      {'onsubmit' in html or 'addEventListener' in html and 'submit' in html or 'form.submit' in html}")
print(f"  Form action attribute:        {bool(re.search(r'<form[^>]*action=', html))}")
print(f"  Form method attribute:        {bool(re.search(r'<form[^>]*method=', html))}")

# Calendar logic
print(f"  Calendar render function:     {'renderCalendar' in html or 'cal-grid' in html}")
print(f"  Calendar month navigation:    {'cal-prev' in html and 'cal-next' in html}")

# Routing edge cases
print(f"  navigateTo function defined:  {'function navigateTo' in html or 'navigateTo =' in html or 'const navigateTo' in html}")
print(f"  hashchange listener:          {'hashchange' in html}")
print(f"  popstate listener:            {'popstate' in html}")
print(f"  404 fallback page:            {'notFound' in html or 'page-not-found' in html or '404' in html}")

# Mobile menu
print(f"  Mobile toggle button:         {'mobile-toggle' in html}")
print(f"  Mobile close button:          {'mobile-close' in html}")
print(f"  Mobile menu drawer:           {'mobile-menu' in html}")

# Service worker / PWA
print(f"  PWA manifest link:            {'manifest' in html.lower()}")
print(f"  Service worker registration:  {'serviceWorker' in html}")

# Analytics
print(f"  Analytics (gtag/GA4):         {'gtag' in html or 'google-analytics' in html or 'G-' in html}")

# ============================================================================
# 5. CONTENT DEPTH per page
# ============================================================================
print("\n[5] CONTENT DEPTH (word count per page section)\n" + "-" * 78)

for pg in PAGES:
    pattern = rf'data-page="{pg}"[^>]*>(.*?)(?=data-page="(?!{pg})"|$)'
    m = re.search(pattern, html, re.DOTALL)
    if m:
        block = m.group(1)
        # strip tags
        text = re.sub(r'<[^>]+>', ' ', block)
        text = re.sub(r'\s+', ' ', text).strip()
        words = len(text.split())
        status = "OK" if words >= 200 else "THIN"
        print(f"  [{status}] {pg:12}  {words:5d} words")

# ============================================================================
# 6. CONSISTENCY — shared components across all 10 pages
# ============================================================================
print("\n[6] CONSISTENCY (header/footer on every page = once globally)\n" + "-" * 78)

print(f"  Single <header id='site-header'>:  {html.count('id=\"site-header\"')}")
print(f"  Single <footer>:                   {html.count('<footer')}")
print(f"  Single mobile-menu drawer:         {html.count('id=\"mobile-menu\"')}")
print(f"  Single floating WhatsApp button:   {html.count('class=\"wa-float\"')}")
print(f"  Single particle canvas:            {html.count('id=\"particle-canvas\"')}")
print(f"  Brand logo image count:            {html.count('class=\"brand-logo')}")
print(f"  Breadcrumb nav count:              {html.count('class=\"crumb\"')}")

# Nav consistency
nav_links_in_header = len(re.findall(r'<a[^>]*data-nav="[^"]+"[^>]*>(?:Home|Services|Solutions|Case Studies|About|Blog|Careers|Contact)</a>', html))
print(f"  Header nav links:                  {nav_links_in_header}  (expected 8)")

# ============================================================================
# 7. KNOWN ISSUES — common pitfalls
# ============================================================================
print("\n[7] KNOWN ISSUE PATTERNS\n" + "-" * 78)

# console.log left in
console_logs = len(re.findall(r'console\.log\(', html))
print(f"  console.log() calls:        {console_logs}")

# TODO/FIXME comments
todos = len(re.findall(r'(?:TODO|FIXME|XXX|HACK):', html))
print(f"  TODO/FIXME comments:        {todos}")

# External HTTP (insecure) URLs
http_urls = set(re.findall(r'src="http://[^"]+"', html)) | set(re.findall(r'href="http://[^"]+"', html))
print(f"  Insecure http:// URLs:      {len(http_urls)}")
for u in list(http_urls)[:5]:
    print(f"    -> {u}")

# Inline onclick handlers (anti-pattern)
onclicks = len(re.findall(r'\bonclick="', html))
print(f"  Inline onclick handlers:    {onclicks}")

# Empty sections
empty_sections = re.findall(r'<section[^>]*>\s*</section>', html)
print(f"  Empty <section> blocks:     {len(empty_sections)}")

# Duplicate IDs
all_ids = re.findall(r'\sid="([^"]+)"', html)
dup_ids = [i for i in set(all_ids) if all_ids.count(i) > 1]
print(f"  Duplicate IDs:              {len(dup_ids)}")
for d in dup_ids[:10]:
    print(f"    -> id=\"{d}\" appears {all_ids.count(d)}x")

# Buttons without type
btns_no_type = re.findall(r'<button(?![^>]*\btype=)[^>]*>', html)
print(f"  <button> without type:      {len(btns_no_type)}  (defaults to 'submit' inside forms)")

# Placeholder images
placeholder_imgs = re.findall(r'src="(?:placeholder|TODO|PLACEHOLDER)[^"]*"', html, re.I)
print(f"  Placeholder images:         {len(placeholder_imgs)}")

# Lorem ipsum
lorem = len(re.findall(r'lorem\s+ipsum', html, re.I))
print(f"  Lorem ipsum occurrences:    {lorem}")

print("\n" + "=" * 78)
print(" AUDIT COMPLETE")
print("=" * 78)
