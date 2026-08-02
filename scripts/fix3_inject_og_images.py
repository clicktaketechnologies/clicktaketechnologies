#!/usr/bin/env python3
"""
FIX-3a: Inject `images: [DEFAULT_OG_IMAGE]` into every openGraph block
that's missing it. Also adds the import where needed.

FIX-3b: For the 4 Ahrefs-flagged pages without openGraph at all
(/services index, /legal/privacy, /legal/terms, /legal/cookies), add a
complete openGraph block including url + images.
"""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/src/app")
IMPORT_LINE = 'import { DEFAULT_OG_IMAGE } from "@/lib/og-image";'

# Files that need a full openGraph block added (FIX-3b)
# These are the 4 Ahrefs-flagged pages with NO openGraph at all
FIX_3B_FILES = {
    "services/[[...slug]]/page.tsx": None,  # Special: need to add OG to the no-slug branch
    "legal/privacy/page.tsx": 'https://clicktaketech.com/legal/privacy',
    "legal/terms/page.tsx": 'https://clicktaketech.com/legal/terms',
    "legal/cookies/page.tsx": 'https://clicktaketech.com/legal/cookies',
}

def find_og_blocks(text):
    """Find all openGraph: { ... } blocks and return (start, end, content) tuples."""
    blocks = []
    for m in re.finditer(r'openGraph:\s*\{', text):
        start = m.start()
        # Find matching closing brace
        depth = 1
        i = m.end()
        while i < len(text) and depth > 0:
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
            i += 1
        blocks.append((start, i, text[start:i]))
    return blocks

def has_images(block):
    return bool(re.search(r'\bimages:\s*\[', block))

def has_url(block):
    # Match both `url: "..."` and shorthand `url,`
    return bool(re.search(r'\burl\b\s*[:,]', block))

def add_import_if_missing(text):
    """Add the DEFAULT_OG_IMAGE import after the last existing import."""
    if IMPORT_LINE in text:
        return text
    # Find all import lines
    imports = list(re.finditer(r'^import\s.*?;\s*$', text, re.MULTILINE))
    if not imports:
        # No imports — add at top
        return IMPORT_LINE + "\n" + text
    last_import = imports[-1]
    # Insert after the last import
    pos = last_import.end()
    return text[:pos] + "\n" + IMPORT_LINE + text[pos:]

def inject_images_into_block(block):
    """Add `images: [DEFAULT_OG_IMAGE],` as the first property inside the openGraph block."""
    # Find the opening `{` after `openGraph:`
    m = re.match(r'(openGraph:\s*\{)(\s*)(.*)', block, re.DOTALL)
    if not m:
        return block
    prefix = m.group(1)
    whitespace = m.group(2)
    rest = m.group(3)
    # Insert images as first property
    # Use the same indentation as the existing properties
    # Find the indentation of the first property
    first_prop_match = re.match(r'(\s*)(\w)', rest)
    if first_prop_match:
        indent = first_prop_match.group(1)
    else:
        indent = "      "
    return f"{prefix}{whitespace}{indent}images: [DEFAULT_OG_IMAGE],{rest}"

stats = {
    "files_scanned": 0,
    "files_modified": 0,
    "blocks_patched": 0,
    "imports_added": 0,
    "fix3b_blocks_added": 0,
}

# Process all page.tsx files
for page_file in sorted(SRC.rglob("page.tsx")):
    stats["files_scanned"] += 1
    original = page_file.read_text()
    text = original
    rel_path = str(page_file.relative_to(SRC))

    # FIX-3a: Inject images into existing OG blocks
    blocks = find_og_blocks(text)
    blocks_to_patch = []
    for start, end, content in blocks:
        if not has_images(content):
            blocks_to_patch.append((start, end, content))

    if blocks_to_patch:
        # Add import first
        text = add_import_if_missing(text)
        if IMPORT_LINE not in original:
            stats["imports_added"] += 1

        # Re-find blocks (positions may have shifted due to import addition)
        blocks = find_og_blocks(text)
        # Patch from last to first so positions don't shift
        blocks_to_patch = [(s, e, c) for s, e, c in blocks if not has_images(c)]
        for start, end, content in reversed(blocks_to_patch):
            new_block = inject_images_into_block(content)
            text = text[:start] + new_block + text[end:]
            stats["blocks_patched"] += 1

    # FIX-3b: Add full openGraph block to the 4 flagged pages
    if rel_path in FIX_3B_FILES and FIX_3B_FILES[rel_path]:
        # Legal pages: add openGraph to the metadata export
        url = FIX_3B_FILES[rel_path]
        # Check if openGraph already exists
        if "openGraph" not in text:
            og_block = f'''  openGraph: {{
    title: "{{TITLE}}",
    description: "{{DESC}}",
    url: "{url}",
    type: "website",
    locale: "en_GB",
    images: [DEFAULT_OG_IMAGE],
  }},
'''
            # For legal pages, we need to extract title and description from existing metadata
            # and insert openGraph after the description line
            # Pattern: `description: "...",` followed by `alternates:`
            desc_match = re.search(r'(description:\s*")(.*?)("\s*,\s*\n)', text)
            title_match = re.search(r'(title:\s*")(.*?)("\s*,\s*\n)', text)
            if desc_match and title_match:
                title_val = title_match.group(2)
                desc_val = desc_match.group(2)
                og_block = og_block.replace("{{TITLE}}", title_val).replace("{{DESC}}", desc_val)
                # Insert after the description line
                insert_pos = desc_match.end()
                # Find the `alternates:` line and insert before it
                alt_match = re.search(r'\n\s*alternates:', text[insert_pos:])
                if alt_match:
                    insert_pos = insert_pos + alt_match.start()
                text = text[:insert_pos] + og_block + text[insert_pos:]
                # Add import
                text = add_import_if_missing(text)
                if IMPORT_LINE not in original:
                    stats["imports_added"] += 1
                stats["fix3b_blocks_added"] += 1

    # Special case: services/[[...slug]]/page.tsx — add openGraph to the no-slug branch
    if rel_path == "services/[[...slug]]/page.tsx":
        # The no-slug branch has:
        #   alternates: { canonical: "https://clicktaketech.com/services" },
        #   keywords: [...]
        # We need to add openGraph before keywords
        if 'openGraph' not in text.split('if (!slug)')[1].split('}')[0] if 'if (!slug)' in text else True:
            # Check if the no-slug branch already has openGraph
            no_slug_match = re.search(
                r'(if \(!slug\) \{[\s\S]*?alternates:\s*\{\s*canonical:\s*"https://clicktaketech\.com/services"\s*\},\s*\n)(\s*keywords:)',
                text
            )
            if no_slug_match:
                og_block = '''      openGraph: {
        title: "Services — AI · Web · Marketing",
        description:
          "Browse all ClickTake Technologies services across four practice areas: AI & Machine Learning, Web Development, Digital Marketing, and Creative. Custom LLMs, chatbots, SaaS platforms, SEO, paid ads, branding and video — delivered from offices in Birmingham, Multan, Austin and Dubai.",
        url: "https://clicktaketech.com/services",
        type: "website",
        locale: "en_GB",
        images: [DEFAULT_OG_IMAGE],
      },
'''
                text = text[:no_slug_match.end(1)] + og_block + no_slug_match.group(2) + text[no_slug_match.end():]
                text = add_import_if_missing(text)
                if IMPORT_LINE not in original:
                    stats["imports_added"] += 1
                stats["fix3b_blocks_added"] += 1

    if text != original:
        page_file.write_text(text)
        stats["files_modified"] += 1
        print(f"  ✓ {rel_path}")

print()
print("=" * 60)
print("FIX-3 STATS")
print("=" * 60)
for k, v in stats.items():
    print(f"  {k}: {v}")
