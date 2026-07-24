#!/usr/bin/env python3
"""
add-3d-characters.py — Add a 3D character variant to every NxPageHero call
in src/components/site/pages/*.tsx, plus add Nx3DScene accents to one
section per page.

Strategy:
  1. For each page file, map its filename to a 3D character variant:
       about-page.tsx          → "about"
       services-page.tsx       → "services"
       service-detail-page.tsx → "service-detail"
       solutions-page.tsx      → "solutions"
       solution-detail-page.tsx→ "solution-detail"
       careers-page.tsx        → "careers"
       case-studies-page.tsx   → "case-studies"
       blog-page.tsx           → "blog"
       blog-post-page.tsx      → "blog-post"
       contact-page.tsx        → "contact"
       pricing-page.tsx        → "pricing"
       portfolio-page.tsx      → "portfolio"
       team-page.tsx           → "team"
       resources-page.tsx      → "resources"
       legal-page.tsx          → "legal"
  2. Insert `character="..."` prop on the FIRST <NxPageHero ...> opening tag.
     We do this by finding the first occurrence of `<NxPageHero` and inserting
     the prop immediately after the tag name on its own line.
  3. Also add Nx3DScene import + render one floating scene inside the FIRST
     <NxPageSection ...> for that page (so every page gets one section-level
     3D accent).
"""

import re
import sys
from pathlib import Path

PAGES_DIR = Path("/home/z/my-project/src/components/site/pages")

VARIANT_MAP = {
    "about-page.tsx": "about",
    "services-page.tsx": "services",
    "service-detail-page.tsx": "service-detail",
    "solutions-page.tsx": "solutions",
    "solution-detail-page.tsx": "solution-detail",
    "careers-page.tsx": "careers",
    "case-studies-page.tsx": "case-studies",
    "blog-page.tsx": "blog",
    "blog-post-page.tsx": "blog-post",
    "contact-page.tsx": "contact",
    "pricing-page.tsx": "pricing",
    "portfolio-page.tsx": "portfolio",
    "team-page.tsx": "team",
    "resources-page.tsx": "resources",
    "legal-page.tsx": "legal",
}


def add_character_prop(content: str, variant: str) -> str:
    """Insert `character="<variant>"` prop on first <NxPageHero> tag.

    Looks for the first `<NxPageHero` opening, then inserts a new line
    `character="..."` immediately after that tag name (before the next
    attribute that follows). If the prop is already present, do nothing.
    """
    if 'character="' in content:
        # Already has a character prop somewhere — skip (avoid double-add)
        # But only skip if it's on the FIRST NxPageHero. For safety, just skip.
        return content

    # Find first <NxPageHero occurrence
    m = re.search(r'<NxPageHero\s*\n', content)
    if not m:
        # Try same-line variant
        m = re.search(r'<NxPageHero\s', content)
        if not m:
            print(f"  ! No <NxPageHero> found — skipping")
            return content

    insert_pos = m.end()
    # We want to insert after the tag name. m.end() is right after `<NxPageHero\n` or `<NxPageHero `
    # Insert the character prop on its own line, preserving indentation by looking at next line
    next_line_end = content.find('\n', insert_pos)
    if next_line_end == -1:
        next_line_end = len(content)
    next_line = content[insert_pos:next_line_end]
    # Detect indentation from the next attribute (typically 8 spaces)
    indent_match = re.match(r'^(\s*)', next_line)
    indent = indent_match.group(1) if indent_match else "        "

    prop_line = f'{indent}character="{variant}"\n'
    new_content = content[:insert_pos] + prop_line + content[insert_pos:]
    return new_content


def add_scene_to_first_section(content: str) -> str:
    """Add Nx3DScene inside the first <NxPageSection ...> in the file.

    We make the section `relative` (if it isn't already) and insert a
    <Nx3DScene density="low" /> as the first child, plus a z-10 wrapper
    div around existing children for proper stacking.

    To keep this safe, we only do this if the file doesn't already contain
    <Nx3DScene.
    """
    if "<Nx3DScene" in content:
        return content

    # Find first <NxPageSection ... > opening tag and its closing >
    # Then find its matching children and closing </NxPageSection>
    m = re.search(r'<NxPageSection\b([^>]*)>', content)
    if not m:
        return content

    attrs = m.group(1)
    # Make sure 'relative' is in className — if not, add it
    if 'className=' in attrs:
        # Append " relative" before the closing quote
        # Handle both ' and "
        if '"' in attrs.split('className=')[1][:1] or True:
            # Try double-quote style
            new_attrs = re.sub(
                r'(className=")([^"]*)(")',
                r'\1\2 relative\3',
                attrs,
                count=1,
            )
            # If no change happened (className uses single quote), fall through
            if new_attrs == attrs:
                new_attrs = re.sub(
                    r"(className=')([^']*)(')",
                    r"\1\2 relative\3",
                    attrs,
                    count=1,
                )
        else:
            new_attrs = attrs
    else:
        # Add className="relative" before the final >
        new_attrs = attrs.rstrip() + ' className="relative"'

    # Rebuild the opening tag
    new_opening = f'<NxPageSection{new_attrs}>'
    content_after_open = content[m.end():]

    # Insert Nx3DScene + opening wrapper div as first children
    scene_block = (
        '\n        {/* 3D floating accents */}\n'
        '        <Nx3DScene density="low" />\n'
        '        <div className="relative z-10">\n'
    )
    # Find matching </NxPageSection>
    # Note: sections don't nest in these files (verified), so first close = match
    close_match = re.search(r'</NxPageSection>', content_after_open)
    if not close_match:
        return content  # malformed; skip

    children = content_after_open[:close_match.start()]
    after_close = content_after_open[close_match.start():]

    # Indent existing children by 2 spaces to fit inside wrapper div
    # Actually — they're already at 8-space indent. Adding wrapper at 8 spaces
    # means children should be at 10 spaces. But to keep things simple and not
    # break JSX text, we'll just close the wrapper before </NxPageSection>.
    new_section = new_opening + scene_block + children + '        </div>\n      ' + after_close

    new_content = content[:m.start()] + new_section
    return new_content


def add_import(content: str) -> str:
    """Add Nx3DScene to the existing nx-page-layout import line.

    If no such import exists, add a new import line after the last `import` statement.
    """
    if "Nx3DScene" in content:
        return content
    # Find the nx-page-layout import block
    m = re.search(
        r'import\s*\{([^}]+)\}\s*from\s*"../nx-page-layout"',
        content,
    )
    if m:
        # Add Nx3DScene to the named imports
        imports = m.group(1)
        if "Nx3DScene" not in imports:
            new_imports = imports.rstrip() + ", Nx3DScene"
            # Tidy up: ensure comma + space
            new_imports = re.sub(r',\s*,', ', ', new_imports)
            new_import_block = f'import{{{new_imports}}} from "../nx-page-layout"'
            # The regex match captured `import{...}from "..."` without spaces —
            # but the actual source has spaces. We need to do a direct
            # string replacement of the original match instead.
            return content.replace(m.group(0), new_import_block, 1)
        return content

    # No nx-page-layout import — add standalone import after last import line
    lines = content.split('\n')
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
    if last_import_idx >= 0:
        lines.insert(last_import_idx + 1, 'import { Nx3DScene } from "../nx-3d-scene";')
        return '\n'.join(lines)
    return content


def process_file(path: Path, variant: str) -> bool:
    print(f"Processing {path.name} (variant={variant})...")
    content = path.read_text()
    original = content

    content = add_import(content)
    content = add_character_prop(content, variant)
    # Skip add_scene_to_first_section for now — many sections have
    # conditional layouts that would break with a wrapper div. The hero
    # already has the scene via NxPageHero's scene prop.
    # content = add_scene_to_first_section(content)

    if content != original:
        path.write_text(content)
        print(f"  ✓ Updated")
        return True
    else:
        print(f"  - No changes")
        return False


def main():
    total = 0
    changed = 0
    for filename, variant in VARIANT_MAP.items():
        path = PAGES_DIR / filename
        if not path.exists():
            print(f"  ! {filename} not found — skipping")
            continue
        total += 1
        if process_file(path, variant):
            changed += 1
    print(f"\nDone. {changed}/{total} files updated.")


if __name__ == "__main__":
    main()
