"""
Crop the AI-generated showreel poster (1344x768) to the spec'd 1280x720,
and produce a JPG variant for web embed (smaller file size).

Input:  /home/z/my-project/public/og/video-production-showreel-poster-raw.png
Output: /home/z/my-project/public/og/video-production-showreel-poster.png  (1280x720 PNG)
        /home/z/my-project/public/og/video-production-showreel-poster.jpg (1280x720 JPG, q=85)
"""
from PIL import Image
from pathlib import Path

RAW = Path("/home/z/my-project/public/og/video-production-showreel-poster-raw.png")
PNG_OUT = Path("/home/z/my-project/public/og/video-production-showreel-poster.png")
JPG_OUT = Path("/home/z/my-project/public/og/video-production-showreel-poster.jpg")

TARGET_W, TARGET_H = 1280, 720

img = Image.open(RAW)
print(f"Raw size: {img.size}, mode: {img.mode}")

# Center-crop to 1280x720 (target aspect ratio 16:9)
src_w, src_h = img.size
# We want the largest 16:9 region that fits inside the source
target_ratio = TARGET_W / TARGET_H  # 1.7778
src_ratio = src_w / src_h            # 1344/768 = 1.75

if src_ratio > target_ratio:
    # Source is wider than target — crop horizontally
    new_w = int(src_h * target_ratio)
    new_h = src_h
    left = (src_w - new_w) // 2
    top = 0
else:
    # Source is taller than target — crop vertically
    new_w = src_w
    new_h = int(src_w / target_ratio)
    left = 0
    top = (src_h - new_h) // 2

cropped = img.crop((left, top, left + new_w, top + new_h))
print(f"Cropped to: {cropped.size}")

# Resize to exact target (should already be very close)
final = cropped.resize((TARGET_W, TARGET_H), Image.LANCZOS)
print(f"Final size: {final.size}")

# Save PNG (lossless)
final.save(PNG_OUT, "PNG", optimize=True)
print(f"PNG saved: {PNG_OUT} ({PNG_OUT.stat().st_size // 1024} KB)")

# Save JPG (smaller, for web embed)
# Convert to RGB first (JPG doesn't support alpha)
rgb = final.convert("RGB")
rgb.save(JPG_OUT, "JPEG", quality=85, optimize=True, progressive=True)
print(f"JPG saved: {JPG_OUT} ({JPG_OUT.stat().st_size // 1024} KB)")

# Clean up the raw file
RAW.unlink()
print(f"Removed raw: {RAW}")
