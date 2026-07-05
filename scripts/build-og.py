#!/usr/bin/env python3

"""Generate a 1200x630 Open Graph share image for DR.CPS. Deterministic —
no browser, no fonts fetched over the network. Uses system SF Pro / Helvetica
fallback via PIL default font loading."""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
INK   = (7, 57, 99)         # #073963 primary dark
WHITE = (255, 255, 255)
TINT  = (191, 215, 238)     # #BFD7EE stat blue
LEAF  = (234, 243, 251)     # #EAF3FB tagline
GREEN = (31, 166, 122)      # #1FA67A accent
GOLD  = (244, 166, 35)      # #F4A623 stars

def find_font(family_names, size):
    """Return a truetype ImageFont by trying macOS font paths."""
    candidates = []
    for name in family_names:
        candidates += [
            f'/System/Library/Fonts/Supplemental/{name}.ttf',
            f'/System/Library/Fonts/{name}.ttf',
            f'/System/Library/Fonts/{name}.ttc',
            f'/Library/Fonts/{name}.ttf',
        ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

def solid_bg(img):
    px = img.load()
    for y in range(H):
        for x in range(W):
            px[x, y] = INK

def radial(img, cx, cy, r, color, opacity):
    """Cheap radial: paint a circle with distance-based alpha blend."""
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for rad in range(r, 0, -12):
        alpha = int(opacity * 255 * (1 - rad / r) ** 2)
        draw.ellipse(
            (cx - rad, cy - rad, cx + rad, cy + rad),
            fill=(*color, alpha),
        )
    img.paste(overlay, (0, 0), overlay)

def main():
    img = Image.new('RGB', (W, H), INK)
    solid_bg(img)
    radial(img, 1104, 0, 640, GREEN, 0.32)
    radial(img, 0, 630, 640, (10, 77, 140), 0.7)

    d = ImageDraw.Draw(img)

    # Green accent bar
    d.rounded_rectangle((0, 110, 10, 520), radius=6, fill=GREEN)

    # Fonts
    eyebrow_f = find_font(['HelveticaNeue', 'Helvetica'], 22)
    brand_f   = find_font(['HelveticaNeueBold', 'Helvetica Bold', 'Helvetica'], 168)
    tag_f     = find_font(['HelveticaNeueBold', 'Helvetica Bold', 'Helvetica'], 30)
    foot_f    = find_font(['HelveticaNeue', 'Helvetica'], 17)
    stars_f   = find_font(['Apple Symbols', 'HelveticaNeue', 'Helvetica'], 18)

    def draw_centered(text, font, y, fill):
        w = d.textbbox((0, 0), text, font=font)[2]
        d.text(((W - w) / 2, y), text, font=font, fill=fill)

    # Eyebrow — manually letter-spaced
    eyebrow = 'S P E C I A L I T Y   &   D I A B E T I C   C L I N I C'
    draw_centered(eyebrow, eyebrow_f, 178, TINT)

    # Brand mark
    draw_centered('DR.CPS', brand_f, 220, WHITE)

    # Tagline
    draw_centered('Podanur, Coimbatore', tag_f, 420, LEAF)

    # Footer left
    d.text((80, 574), 'Dr. S. S. Chakravarthi  ·  MD, CPCDM', font=foot_f, fill=TINT)

    # Footer right — stars + rating
    stars = '\u2605\u2605\u2605\u2605\u2605'
    rating = '4.9 · 59 Google reviews'
    rating_w = d.textbbox((0, 0), rating, font=foot_f)[2]
    stars_w = d.textbbox((0, 0), stars, font=stars_f)[2]
    right_edge = W - 80
    d.text((right_edge - rating_w, 574), rating, font=foot_f, fill=TINT)
    d.text((right_edge - rating_w - stars_w - 10, 574), stars, font=stars_f, fill=GOLD)

    out = os.path.join(os.path.dirname(__file__), '..', 'public', 'og.png')
    img.save(out, 'PNG', optimize=True)
    print(f'wrote {out}  ({os.path.getsize(out)} bytes)')

if __name__ == '__main__':
    main()
