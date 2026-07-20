#!/usr/bin/env python3
"""
Optimize homepage images for LCP / Speed Index.

image1.png is 461 KB (1440x1024 PNG with alpha) — likely the LCP element
on the homepage hero. Convert to WebP (lossless for alpha, but smaller
footprint) + generate a smaller JPEG fallback.

Also produces image2/3/4.webp (smaller than current JPEGs at same quality).

The HTML <Image> components will prefer the smaller file automatically
once we replace the file references in the homepage.
"""

import os
import sys
from PIL import Image

PUBLIC = "/home/z/my-project/public"

files = [
    ("image1.png", "image1.webp", (1200, 853)),  # hero-size, 4:3 crop from 1440x1024
    ("image2.jpg", "image2.webp", (1200, 800)),
    ("image3.jpg", "image3.webp", (1200, 800)),
    ("image4.jpg", "image4.webp", (1200, 800)),
    ("clicktake-logo.png", "clicktake-logo.webp", None),  # keep original size
]

for src_name, dst_name, new_size in files:
    src = os.path.join(PUBLIC, src_name)
    dst = os.path.join(PUBLIC, dst_name)
    if not os.path.exists(src):
        print(f"  SKIP {src_name} (not found)")
        continue

    img = Image.open(src)
    src_size = os.path.getsize(src)

    # Resize if requested
    if new_size:
        # Use LANCZOS for downscaling (best quality)
        img = img.resize(new_size, Image.LANCZOS)

    # Convert to RGB if needed (WebP supports alpha but smaller without)
    has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
    if has_alpha:
        # Keep alpha for WebP (e.g. logo)
        save_kwargs = {"quality": 85, "method": 6, "lossless": False}
    else:
        img = img.convert("RGB")
        save_kwargs = {"quality": 82, "method": 6, "lossless": False}

    img.save(dst, "WEBP", **save_kwargs)
    dst_size = os.path.getsize(dst)
    print(f"  {src_name:30s} {src_size:>8} B  →  {dst_name:30s} {dst_size:>8} B  ({100*dst_size/src_size:.1f}%)")

print("\nDone. To use these, update src to point at .webp variants in:")
print("  - src/app/page.tsx (hero images)")
print("  - src/components/site/navbar.tsx (logo)")
print("  - src/components/site/footer.tsx (logo)")
