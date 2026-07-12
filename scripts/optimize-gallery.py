#!/usr/bin/env python3

"""Optimize gallery source photos into web-ready WebP + JPEG pairs.

For each source under public/gallery/:
  1. Auto-rotate using EXIF orientation.
  2. Resize so the longest edge is <= MAX_LONG_EDGE (letterbox-safe).
  3. Convert to sRGB, strip metadata.
  4. Emit `<slug>.jpg` (quality 82, progressive) and `<slug>.webp` (quality 80).
  5. Delete the source file once both outputs are written.

Idempotent — safe to re-run.
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
GALLERY = ROOT / "public" / "gallery"

# Source filename → canonical slug (no extension).
MAPPING: dict[str, str] = {
    "RECEPTION.png":                    "reception",
    "WAITING AREA.png":                 "waiting-area",
    "Consultation Room without Edit.jpg": "consultation",
    "ECG ROOM.png":                     "ecg-room",
    "DAY CARE ROOM.png":                "day-care",
    "PHARMACY.png":                     "pharmacy",
    "CLINIC ENTRANCE.png":              "facade-night",
    "Entrance.png":                     "entrance-day",
}

MAX_LONG_EDGE = 1600      # px — plenty for a gallery on retina screens
JPEG_QUALITY = 82
WEBP_QUALITY = 80

def optimize(source: Path, slug: str) -> tuple[int, int]:
    """Return (jpg_bytes, webp_bytes)."""
    with Image.open(source) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode not in ("RGB",):
            img = img.convert("RGB")

        w, h = img.size
        long_edge = max(w, h)
        if long_edge > MAX_LONG_EDGE:
            scale = MAX_LONG_EDGE / long_edge
            img = img.resize(
                (round(w * scale), round(h * scale)),
                Image.Resampling.LANCZOS,
            )

        jpg_path = GALLERY / f"{slug}.jpg"
        webp_path = GALLERY / f"{slug}.webp"

        img.save(
            jpg_path,
            format="JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
        img.save(
            webp_path,
            format="WEBP",
            quality=WEBP_QUALITY,
            method=6,          # slowest, best compression
        )

    return jpg_path.stat().st_size, webp_path.stat().st_size

def main() -> int:
    if not GALLERY.is_dir():
        print(f"error: {GALLERY} does not exist", file=sys.stderr)
        return 1

    missing: list[str] = []
    print(f"{'source':40s} → {'output slug':20s} {'jpg':>10s} {'webp':>10s}")
    print("-" * 88)

    for src_name, slug in MAPPING.items():
        source = GALLERY / src_name
        if not source.exists():
            missing.append(src_name)
            print(f"{src_name:40s} → {slug:20s} (SKIP — source not found)")
            continue

        jpg_bytes, webp_bytes = optimize(source, slug)
        source.unlink()
        print(
            f"{src_name:40s} → {slug:20s} "
            f"{jpg_bytes / 1024:>9.1f}K {webp_bytes / 1024:>9.1f}K"
        )

    if missing:
        print(f"\n{len(missing)} source file(s) missing; nothing to do for them.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
