#!/usr/bin/env python3
"""Generate the default Open Graph / Twitter card image for clicktaketech.com.

Creates /home/z/my-project/public/og-default.png at 1200x630.
Uses brand colors and logo lockup; matches the homepage hero aesthetic.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path("/home/z/my-project/public/og-default.png")
W, H = 1200, 630

# Brand palette — matches the gradient used in globals.css gradient-bg
BG_TOP = (10, 10, 20)      # near-black navy
BG_BOTTOM = (19, 35, 84)   # deep blue
ACCENT_1 = (19, 109, 255)  # #136DFF brand blue
ACCENT_2 = (124, 58, 237)  # purple
TEXT_LIGHT = (245, 247, 255)
TEXT_MUTED = (180, 190, 220)

# Fonts (use what's installed; fall back gracefully)
def load_font(size, bold=True):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def main():
    img = Image.new("RGB", (W, H), BG_TOP)
    draw = ImageDraw.Draw(img)

    # Vertical gradient background
    for y in range(H):
        t = y / H
        color = lerp(BG_TOP, BG_BOTTOM, t)
        draw.line([(0, y), (W, y)], fill=color)

    # Accent bar at top
    draw.rectangle([(0, 0), (W, 8)], fill=ACCENT_1)

    # Diagonal accent stripes (subtle, top-right)
    for i, x in enumerate(range(900, 1300, 40)):
        alpha_color = lerp(ACCENT_1, ACCENT_2, i / 10)
        # Make it semi-transparent-looking by darkening toward bg
        faded = lerp(alpha_color, BG_BOTTOM, 0.6)
        draw.polygon([(x, 0), (x + 80, 0), (x - 200, H), (x - 280, H)], fill=faded)

    # Logo lockup — colored square + wordmark
    logo_size = 72
    logo_x, logo_y = 80, 80
    # Gradient square — approximate with two stacked rectangles
    draw.rectangle(
        [(logo_x, logo_y), (logo_x + logo_size, logo_y + logo_size)],
        fill=ACCENT_1,
    )
    draw.rectangle(
        [(logo_x, logo_y + logo_size // 2), (logo_x + logo_size, logo_y + logo_size)],
        fill=ACCENT_2,
    )
    # "CT" monogram in the square
    mono_font = load_font(36, bold=True)
    draw.text(
        (logo_x + 16, logo_y + 14),
        "CT",
        font=mono_font,
        fill=TEXT_LIGHT,
    )
    # Wordmark
    word_font = load_font(28, bold=True)
    draw.text((logo_x + logo_size + 20, logo_y + 18), "ClickTake Technologies", font=word_font, fill=TEXT_LIGHT)

    # Headline
    h1_font = load_font(72, bold=True)
    draw.text((80, 220), "AI-Powered Digital Agency", font=h1_font, fill=TEXT_LIGHT)

    # Subhead
    sub_font = load_font(32, bold=False)
    draw.text(
        (80, 320),
        "Web · AI · Mobile · SaaS · Growth Marketing",
        font=sub_font,
        fill=TEXT_MUTED,
    )

    # Regions
    regions_font = load_font(24, bold=False)
    draw.text(
        (80, 380),
        "UK — Birmingham    |    Pakistan — Multan    |    USA — Austin    |    UAE — Dubai",
        font=regions_font,
        fill=TEXT_MUTED,
    )

    # CTA pill at bottom-left
    pill_x, pill_y, pill_w, pill_h = 80, 470, 380, 70
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=35,
        fill=ACCENT_1,
    )
    cta_font = load_font(26, bold=True)
    # Center text in pill
    cta_text = "Book a free 30-min consult"
    bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        (pill_x + (pill_w - tw) // 2, pill_y + (pill_h - th) // 2 - 4),
        cta_text,
        font=cta_font,
        fill=TEXT_LIGHT,
    )

    # Bottom-right URL
    url_font = load_font(22, bold=False)
    draw.text(
        (W - 320, H - 50),
        "clicktaketech.com",
        font=url_font,
        fill=TEXT_MUTED,
    )

    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
