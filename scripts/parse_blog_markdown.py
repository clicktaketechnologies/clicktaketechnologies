"""
Parse markdown blog articles into a Python module of structured blog data.

Reads each .md file from /home/z/my-project/blog_src/ and produces:
- /home/z/my-project/scripts/blog_articles_data.py

Each entry: (slug, title, category, read_time, date, author, excerpt, hero_image, body_html)

The body_html is fully-rendered HTML (h2/h3/p/ul/ol/code/strong/em/a/img/blockquote)
styled to drop into the existing ClickTake blog article template.
"""
import os
import re
import glob
import html
from datetime import datetime, timedelta

# Use the markdown library for the heavy lifting (tables, fenced code, etc.)
import markdown as md_lib

BLOG_SRC_DIR = "/home/z/my-project/blog_src"
OUTPUT_FILE = "/home/z/my-project/scripts/blog_articles_data.py"


# ---- Category heuristics ---------------------------------------------------
def derive_category(title: str) -> str:
    t = title.lower()
    if "chatbot" in t or "ai chatbot" in t:
        return "AI / Chatbots"
    if "ai automation" in t or "ai business automation" in t:
        return "AI / Automation"
    if "pagespeed" in t or "next.js" in t:
        return "Engineering"
    if "seo audit" in t:
        return "SEO"
    if "user behaviour analytics" in t or "user behavior analytics" in t:
        return "Analytics"
    if "social media content strategy" in t or "social media content types" in t:
        return "Social Media"
    if "social media for ecommerce" in t:
        return "E-commerce"
    return "Insights"


# ---- Read-time estimate ----------------------------------------------------
def estimate_read_time(text: str) -> str:
    words = len(re.findall(r"\w+", text))
    # 220 wpm is a sensible reading speed for technical/marketing content.
    minutes = max(4, round(words / 220))
    return f"{minutes} min read"


# ---- Date assignment -------------------------------------------------------
# Distribute the 9 articles across Feb–Aug 2026 (most recent first by file mtime
# reversed, so newest content surfaces at the top of the listing).
BASE_DATE = datetime(2026, 8, 5)
DATE_STEP = timedelta(days=9)


def assign_dates(n: int):
    return [(BASE_DATE - DATE_STEP * i).strftime("%b %-d, %Y") for i in range(n)]


# ---- Markdown → HTML conversion -------------------------------------------
def md_to_body_html(md_text: str) -> str:
    """Convert markdown body (after stripping H1/hero/meta line) to styled HTML."""
    # Strip the leading H1 (handled separately as title)
    lines = md_text.split("\n")
    out_lines = []
    seen_nonblank = False
    for ln in lines:
        s = ln.strip()
        # Skip H1 (already captured as title)
        if s.startswith("# ") and not s.startswith("## "):
            continue
        # Skip standalone image line at top (hero — handled separately)
        if not seen_nonblank and s.startswith("![") and s.endswith(")"):
            continue
        # Skip "Meta description:" bold line
        if re.match(r"^\*\*Meta description:\*\*", s, re.IGNORECASE):
            continue
        if s:
            seen_nonblank = True
        out_lines.append(ln)

    body_md = "\n".join(out_lines).strip()

    # Convert via markdown library with sensible extensions.
    # NOTE: do NOT use codehilite — it pulls in Pygments inline styles that clash
    # with the ClickTake design system. The `extra` extension already includes
    # fenced_code blocks, tables, attr_list, def_list, footnotes, and abbr.
    body_html = md_lib.markdown(
        body_md,
        extensions=[
            "extra",
            "toc",
            "sane_lists",
            "nl2br",
        ],
        extension_configs={
            "toc": {
                "anchorlink": False,
                "permalink": False,
            },
        },
    )

    # Post-process: apply ClickTake styling classes to elements.
    # H2 → big section heading with gradient underline
    body_html = re.sub(
        r"<h2([^>]*)>(.*?)</h2>",
        r'<h2 class="ck-h2"\1>\2</h2>',
        body_html,
        flags=re.DOTALL,
    )
    # H3 → subsection heading
    body_html = re.sub(
        r"<h3([^>]*)>(.*?)</h3>",
        r'<h3 class="ck-h3"\1>\2</h3>',
        body_html,
        flags=re.DOTALL,
    )
    # H4 → minor heading
    body_html = re.sub(
        r"<h4([^>]*)>(.*?)</h4>",
        r'<h4 class="ck-h4"\1>\2</h4>',
        body_html,
        flags=re.DOTALL,
    )
    # Paragraphs → prose style
    body_html = body_html.replace("<p>", '<p class="ck-prose-p">')
    # Lists
    body_html = body_html.replace("<ul>", '<ul class="ck-prose-ul">')
    body_html = body_html.replace("<ol>", '<ol class="ck-prose-ol">')
    body_html = body_html.replace("<li>", '<li class="ck-prose-li">')
    # Code blocks — handle <pre><code>...</code></pre> pattern from fenced_code
    body_html = re.sub(
        r'<pre(?![^>]*class=)([^>]*)>',
        r'<pre class="ck-prose-pre"\1>',
        body_html,
    )
    # Inline code (not inside pre)
    body_html = re.sub(
        r'<code(?![^>]*class)([^>]*)>',
        r'<code class="ck-prose-code"\1>',
        body_html,
    )
    # Blockquotes
    body_html = body_html.replace("<blockquote>", '<blockquote class="ck-prose-quote">')
    # Tables
    body_html = body_html.replace("<table>", '<div class="ck-prose-table-wrap"><table class="ck-prose-table">')
    body_html = body_html.replace("</table>", "</table></div>")
    # Images
    body_html = re.sub(
        r'<img([^>]*)/>',
        r'<img\1 class="ck-prose-img" loading="lazy" />',
        body_html,
    )

    return body_html


# ---- Per-file parsing ------------------------------------------------------
def parse_file(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    # Title = first "# " line
    m = re.search(r"^#\s+(.+)$", raw, re.MULTILINE)
    title = m.group(1).strip() if m else os.path.splitext(os.path.basename(path))[0].replace("-", " ").title()

    # Meta description (bold line) if present
    md_match = re.search(r"\*\*Meta description:\*\*\s*(.+)", raw)
    meta_desc = md_match.group(1).strip() if md_match else ""

    # Hero image = first ![alt](url) line
    img_match = re.search(r"!\[([^\]]*)\]\(([^)]+)\)", raw)
    hero_image = img_match.group(2) if img_match else ""

    # Excerpt = first non-empty paragraph after H1 + image + optional meta line
    # Skip the H1, image line, and bold meta line, then take the next paragraph.
    lines = raw.split("\n")
    excerpt_lines = []
    skipping = True
    for ln in lines:
        s = ln.strip()
        if not s:
            if excerpt_lines:
                break
            continue
        if skipping:
            if s.startswith("# ") and not s.startswith("## "):
                continue
            if s.startswith("!["):
                continue
            if s.startswith("**Meta description:**"):
                continue
            skipping = False
        excerpt_lines.append(s)
    excerpt = " ".join(excerpt_lines).strip()
    # Strip markdown bold/italic markers from excerpt for clean display
    excerpt = re.sub(r"\*\*([^*]+)\*\*", r"\1", excerpt)
    excerpt = re.sub(r"\*([^*]+)\*", r"\1", excerpt)
    excerpt = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", excerpt)
    # Cap at ~280 chars at sentence boundary
    if len(excerpt) > 280:
        cut = excerpt[:280].rsplit(" ", 1)[0]
        # Try to end at sentence boundary
        sentence_end = max(cut.rfind(". "), cut.rfind("? "), cut.rfind("! "))
        if sentence_end > 100:
            excerpt = cut[: sentence_end + 1]
        else:
            excerpt = cut + "…"

    # Body HTML (everything after the front-matter)
    body_html = md_to_body_html(raw)

    # Slug from filename
    slug = "blog-" + os.path.splitext(os.path.basename(path))[0]
    # Normalise: strip trailing dashes/duplicates
    slug = re.sub(r"-+", "-", slug).strip("-")
    # Lowercase
    slug = slug.lower()

    return {
        "slug": slug,
        "title": title,
        "meta_desc": meta_desc,
        "hero_image": hero_image,
        "excerpt": excerpt,
        "body_html": body_html,
        "word_count": len(re.findall(r"\w+", raw)),
    }


# ---- Emit Python module ----------------------------------------------------
def emit_module(entries: list, dates: list):
    out = ['"""', "Auto-generated blog article data.", "Source: /home/z/my-project/blog_src/*.md", "Regenerate via: python3 scripts/parse_blog_markdown.py", '"""', ""]
    out.append("BLOG_ARTICLES = [")
    for i, e in enumerate(entries):
        category = derive_category(e["title"])
        read_time = estimate_read_time(e["body_html"])  # body only, but fine
        date = dates[i]
        author = "ClickTake Technologies"
        # Use Python triple-quoted strings for the long HTML to avoid quote-escaping headaches.
        # Replace any triple-double-quotes in body to be safe.
        body_safe = e["body_html"].replace('"""', '\\"\\"\\"')
        out.append("    (")
        out.append(f"        {e['slug']!r},")
        out.append(f"        {e['title']!r},")
        out.append(f"        {category!r},")
        out.append(f"        {read_time!r},")
        out.append(f"        {date!r},")
        out.append(f"        {author!r},")
        out.append(f"        {e['excerpt']!r},")
        out.append(f"        {e['hero_image']!r},")
        out.append('        """' + body_safe + '"""')
        out.append("    ),")
    out.append("]")
    out.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"Wrote {OUTPUT_FILE} ({len(entries)} articles)")


def main():
    files = sorted(glob.glob(os.path.join(BLOG_SRC_DIR, "*.md")))
    if not files:
        raise SystemExit(f"No markdown files found in {BLOG_SRC_DIR}")
    entries = [parse_file(p) for p in files]
    # Sort by filename so dates are deterministic
    entries.sort(key=lambda e: e["slug"])
    dates = assign_dates(len(entries))
    emit_module(entries, dates)
    # Quick stdout summary
    print("\nParsed articles:")
    for e in entries:
        print(f"  - {e['slug']}")
        print(f"      title: {e['title'][:80]}")
        print(f"      words: {e['word_count']}")
        print(f"      hero:  {e['hero_image'][:80] if e['hero_image'] else '(none)'}")
        print(f"      excerpt len: {len(e['excerpt'])}")


if __name__ == "__main__":
    main()
