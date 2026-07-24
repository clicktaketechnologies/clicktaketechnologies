#!/usr/bin/env python3
"""
add-3d-to-inline-heroes.py — For pages that don't use <NxPageHero>, insert
a floating 3D character + scene directly into the first child of <NxPageLayout>.

The 3D character is rendered in an absolutely-positioned container so it floats
in the upper-right of the hero area, only visible on lg+ screens (avoids
cluttering mobile).

The Nx3DScene is added inside the first section, also absolutely positioned.
"""

import re
from pathlib import Path

PAGES_DIR = Path("/home/z/my-project/src/components/site/pages")

VARIANT_MAP = {
    "blog-page.tsx": "blog",
    "blog-post-page.tsx": "blog-post",
    "careers-page.tsx": "careers",
    "case-studies-page.tsx": "case-studies",
    "contact-page.tsx": "contact",
    "legal-page.tsx": "legal",
    "portfolio-page.tsx": "portfolio",
    "pricing-page.tsx": "pricing",
    "resources-page.tsx": "resources",
    "service-detail-page.tsx": "service-detail",
    "solution-detail-page.tsx": "solution-detail",
    "solutions-page.tsx": "solutions",
    "team-page.tsx": "team",
}

# Floating character block — absolute positioned, lg-only, doesn't block clicks
CHAR_BLOCK = '''        {/* 3D character — floats in hero area, lg+ only */}
        <div className="pointer-events-none absolute right-0 top-24 lg:top-32 xl:top-40 z-[5] hidden lg:block" aria-hidden="true">
          <Nx3DCharacter variant="{variant}" size="md" />
        </div>
        {/* 3D floating geometric accents */}
        <Nx3DScene density="low" />
'''


def process_file(path: Path, variant: str) -> bool:
    print(f"Processing {path.name} (variant={variant})...")
    content = path.read_text()
    original = content

    # Skip if already has 3D character
    if "<Nx3DCharacter" in content:
        print(f"  - Already has 3D character")
        return False

    # Find first <NxPageLayout> opening tag
    m = re.search(r'<NxPageLayout(?:\s+[^>]*)?>', content)
    if not m:
        print(f"  ! No <NxPageLayout> found")
        return False

    insert_pos = m.end()
    # Build the block for this variant
    block = CHAR_BLOCK.replace("{variant}", variant)
    new_content = content[:insert_pos] + "\n" + block + content[insert_pos:]

    path.write_text(new_content)
    print(f"  ✓ Inserted 3D character + scene")
    return True


def main():
    changed = 0
    for filename, variant in VARIANT_MAP.items():
        path = PAGES_DIR / filename
        if not path.exists():
            continue
        if process_file(path, variant):
            changed += 1
    print(f"\nDone. {changed} files updated.")


if __name__ == "__main__":
    main()
