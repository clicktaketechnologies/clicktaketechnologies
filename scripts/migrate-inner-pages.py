#!/usr/bin/env python3
"""
Bulk-migrate inner pages from old design wrapper (Navbar, Footer,
BackgroundScene, CustomCursor, ScrollProgressBar, ScrollToTop) to the
new NxPageLayout system.

For each page in src/components/site/pages/:
  1. Remove old imports:
       - `import { Navbar } from "../navbar";`
       - `import { Footer } from "../footer";`
       - `import { BackgroundScene } from "../background-scene";`
       - `import { CustomCursor } from "../custom-cursor";`
       - `import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";`
  2. Add new import for NxPageLayout (after the lucide-react import block)
  3. Replace the wrapper JSX:
       <>
         <BackgroundScene />
         <CustomCursor />
         <ScrollProgressBar />
         <Navbar />
         <main className="...">{body}</main>
         <Footer />
         <ScrollToTop />
       </>
     With:
       <NxPageLayout>
         {body}
       </NxPageLayout>

The body content is preserved as-is. Old theme tokens (bg-card, text-muted-foreground,
ct-divider, etc.) still work because the .theme-nx wrapper overrides the underlying
CSS variables for both light and dark modes.
"""
import re
import sys
from pathlib import Path

PAGES_DIR = Path("/home/z/my-project/src/components/site/pages")
SKIP_FILES = {"about-page.tsx", "services-page.tsx"}  # Already migrated manually


def migrate_file(path: Path) -> tuple[bool, str]:
    """Migrate a single page file. Returns (changed, message)."""
    name = path.name
    if name in SKIP_FILES:
        return False, f"SKIP (already migrated): {name}"

    src = path.read_text(encoding="utf-8")
    original = src

    # 1. Remove old imports (one per line, possibly with varying whitespace)
    old_imports = [
        r'import \{ Navbar \} from "\.\./navbar";\n',
        r'import \{ Footer \} from "\.\./footer";\n',
        r'import \{ BackgroundScene \} from "\.\./background-scene";\n',
        r'import \{ CustomCursor \} from "\.\./custom-cursor";\n',
        r'import \{ ScrollProgressBar, ScrollToTop \} from "\.\./scroll-animations";\n',
        r'import \{ ScrollProgressBar \} from "\.\./scroll-animations";\n',
        r'import \{ ScrollToTop \} from "\.\./scroll-animations";\n',
    ]
    for pat in old_imports:
        src = re.sub(pat, "", src)

    # 2. Add NxPageLayout import (after the last `from "lucide-react"` or
    #    `from "next/link"` line — whichever comes first in the file)
    nx_import = (
        'import {\n'
        '  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton,\n'
        '} from "../nx-page-layout";\n'
    )
    # Only add if not already present
    if "nx-page-layout" not in src:
        # Find a good insertion point — after the last `from "lucide-react"` or
        # `from "next/link"` block
        insert_after = None
        # Try `from "next/link";\n`
        m = re.search(r'import Link from "next/link";\n', src)
        if m:
            insert_after = m.end()
        else:
            # Try the last `from "lucide-react";` import
            matches = list(re.finditer(r'from "lucide-react";\n', src))
            if matches:
                insert_after = matches[-1].end()
            else:
                # Fall back to after the first `from "..."` import
                m = re.search(r'^import [^\n]+from "[^"]+";\n', src, re.MULTILINE)
                if m:
                    insert_after = m.end()

        if insert_after is None:
            return False, f"FAIL: could not find insertion point for {name}"
        src = src[:insert_after] + nx_import + src[insert_after:]

    # 3. Replace wrapper JSX.
    #
    # Pattern: `<>` ... `<BackgroundScene />` ... `<Footer />` ... `</>`
    # We want to extract the body content between <main ...> and </main>
    # (or whatever the body is) and wrap it in <NxPageLayout>...</NxPageLayout>.

    # Most common pattern: extract content between <main ...> and </main>
    # but some pages have different structures. Let's handle the common case.

    # Remove the leading wrapper lines:
    #   <>
    #     <BackgroundScene />
    #     <CustomCursor />
    #     <ScrollProgressBar />
    #     <Navbar />
    #
    # And the trailing:
    #     <Footer />
    #     <ScrollToTop />
    #   </>

    # Strip the BackgroundScene/CustomCursor/ScrollProgressBar/Navbar lines (in any order)
    # at the start of the return body
    src = re.sub(
        r'(\breturn\s*\(\s*\n\s*)<>\s*\n'
        r'(\s*<BackgroundScene\s*/>\s*\n)?'
        r'(\s*<CustomCursor\s*/>\s*\n)?'
        r'(\s*<ScrollProgressBar\s*/>\s*\n)?'
        r'(\s*<ScrollToTop\s*/>\s*\n)?'
        r'(\s*<ScrollProgressBar\s*/>\s*\n)?'
        r'(\s*<Navbar\s*/>\s*\n)',
        r'\1<NxPageLayout>\n',
        src,
    )

    # Strip the <main ...> opening tag — keep its children
    # Replace:  <main className="...">  →  (nothing, the body content stays)
    # But we need to be careful — some main tags have content we want to keep.
    # Strategy: replace <main className="..."> with empty, and </main> with empty,
    # since NxPageLayout already provides its own <main>.
    src = re.sub(
        r'<main className="[^"]*">\s*\n',
        '',
        src,
    )
    src = re.sub(
        r'\s*</main>',
        '',
        src,
    )

    # Strip the trailing Footer + ScrollToTop + </>  →  </NxPageLayout>
    src = re.sub(
        r'\n\s*<Footer\s*/>\s*\n\s*<ScrollToTop\s*/>\s*\n\s*</>',
        '\n    </NxPageLayout>',
        src,
    )
    # Also handle pattern where ScrollToTop was already removed at top
    src = re.sub(
        r'\n\s*<Footer\s*/>\s*\n\s*</>',
        '\n    </NxPageLayout>',
        src,
    )

    if src == original:
        return False, f"NO-CHANGE: {name}"

    path.write_text(src, encoding="utf-8")
    return True, f"MIGRATED: {name}"


def main():
    pages = sorted(PAGES_DIR.glob("*.tsx"))
    if not pages:
        print("No page files found", file=sys.stderr)
        sys.exit(1)

    print(f"Migrating {len(pages)} pages in {PAGES_DIR}\n")
    changed_count = 0
    for p in pages:
        changed, msg = migrate_file(p)
        print(msg)
        if changed:
            changed_count += 1
    print(f"\nDone: {changed_count} files migrated")


if __name__ == "__main__":
    main()
