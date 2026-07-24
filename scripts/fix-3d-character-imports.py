#!/usr/bin/env python3
"""Add Nx3DCharacter import to all page files that use it but don't import it."""
import re
from pathlib import Path

PAGES_DIR = Path("/home/z/my-project/src/components/site/pages")

for path in sorted(PAGES_DIR.glob("*-page.tsx")):
    content = path.read_text()
    if "Nx3DCharacter" not in content:
        continue  # Doesn't use it
    if "import { Nx3DCharacter }" in content or "import{Nx3DCharacter" in content:
        continue  # Already imported
    if "from \"../nx-3d-character\"" in content or "from '../nx-3d-character'" in content:
        continue  # Already imported (any form)
    # Find the nx-page-layout import and add Nx3DCharacter import after it
    m = re.search(r'(import\{[^}]+\}\s*from\s*"[^"]*nx-page-layout";)', content)
    if not m:
        m = re.search(r'(import\s*\{[^}]+\}\s*from\s*"[^"]*nx-page-layout";)', content)
    if m:
        new_import = '\nimport { Nx3DCharacter } from "../nx-3d-character";'
        new_content = content.replace(m.group(0), m.group(0) + new_import, 1)
        path.write_text(new_content)
        print(f"  ✓ Added import to {path.name}")
    else:
        print(f"  ! No import found in {path.name}")
