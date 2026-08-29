***REMOVED***!/usr/bin/env python3
"""QA — dead component detector: find site components never imported anywhere."""
import os, re

ROOT = "/home/z/my-project"
SITE_DIR = os.path.join(ROOT, "src", "components", "site")

***REMOVED*** Collect ALL import sources across src/
import_content = ""
for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, "src")):
    for fn in filenames:
        if not fn.endswith((".tsx", ".ts")):
            continue
        path = os.path.join(dirpath, fn)
        try:
            with open(path, encoding="utf-8", errors="ignore") as f:
                import_content += f.read()
        except Exception:
            pass

dead = []
alive = []
for fn in sorted(os.listdir(SITE_DIR)):
    if not fn.endswith(".tsx"):
        continue
    comp_dir = os.path.join(SITE_DIR, fn, "__init__")  ***REMOVED*** placeholder
    name = fn.replace(".tsx", "")
    ***REMOVED*** Check if anything imports this file (by path stem)
    patterns = [
        f'from "./{name}"',
        f'from "../{name}"',
        f'from "@/components/site/{name}"',
        f'from "@/components/site/{name}/{name}"',
        f'site/{name}"',
        f'site/{name}/',
    ]
    ***REMOVED*** Exclude self-references
    self_path = os.path.join(SITE_DIR, fn)
    imported = False
    for p in patterns:
        ***REMOVED*** crude check: count occurrences, subtract self-occurrence
        if p in import_content:
            imported = True
            break
    ***REMOVED*** also dynamic imports
    if f'"{name}"' in import_content and f'components/site/{name}' in import_content:
        imported = True
    ***REMOVED*** enhanced/ and pages/ subdirs
    (dead if not imported else alive).append(name)

print("DEAD COMPONENTS (not imported anywhere):")
for d in dead:
    print(f"  ✗ {d}")
print(f"\nTotal dead: {len(dead)} / {len(dead)+len(alive)}")
