***REMOVED***!/usr/bin/env python3
"""QA — dead component detector v2: exact import-statement matching."""
import os, re

ROOT = "/home/z/my-project"
SITE_DIR = os.path.join(ROOT, "src", "components", "site")

***REMOVED*** import/require/dynamic patterns: from '...X', from "...X", import('...X')
IMPORT_RE = re.compile(
    r"""(?:from\s+|import\s*\(\s*|require\s*\(\s*)["']([^"']+)["']"""
)

sources = {}  ***REMOVED*** file -> [import paths]
for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, "src")):
    for fn in filenames:
        if not fn.endswith((".tsx", ".ts")):
            continue
        path = os.path.join(dirpath, fn)
        try:
            with open(path, encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            continue
        sources[path] = [m.group(1) for m in IMPORT_RE.finditer(content)]

def resolves(import_path: str, importer_path: str, target_stem: str) -> bool:
    """Check if import_path points at components/site/<target_stem>."""
    cands = []
    if import_path.startswith("@/"):
        cands.append(os.path.join(ROOT, "src", import_path[2:]))
    elif import_path.startswith("."):
        base = os.path.dirname(importer_path)
        cands.append(os.path.normpath(os.path.join(base, import_path)))
    for c in cands:
        c = c.replace(os.sep, "/")
        t = os.path.join(SITE_DIR, target_stem).replace(os.sep, "/")
        if c == t or c == t + ".tsx" or c == t + ".ts" or c.startswith(t + "/"):
            return True
    return False

site_components = [fn[:-4] for fn in os.listdir(SITE_DIR) if fn.endswith(".tsx")]
***REMOVED*** also subdirectory index components
subdirs = [d for d in os.listdir(SITE_DIR)
           if os.path.isdir(os.path.join(SITE_DIR, d))
           and os.path.exists(os.path.join(SITE_DIR, d, "index.tsx"))]

dead, alive = [], []
for stem in sorted(site_components + subdirs):
    imported_by = []
    for path, imports in sources.items():
        if os.path.join(SITE_DIR, stem + ".tsx") == path:
            continue  ***REMOVED*** self
        for imp in imports:
            if resolves(imp, path, stem):
                imported_by.append(os.path.relpath(path, ROOT))
                break
    if imported_by:
        alive.append((stem, imported_by[:3]))
    else:
        dead.append(stem)

print("DEAD COMPONENTS (zero imports anywhere in src/):")
for d in dead:
    print(f"  ✗ {d}")
print(f"\nDead: {len(dead)} / {len(dead)+len(alive)}")
print("\n(Alive components omitted — verified imported.)")
