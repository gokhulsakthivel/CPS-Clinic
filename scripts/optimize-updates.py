#!/usr/bin/env python3

"""Optimize per-post source photos into web-ready WebP + JPEG pairs.

Walks every `content/updates/<slug>/_raw/` folder and, for each recognised
source image found there, writes a resized/compressed pair alongside the
post's `index.md`:

  content/updates/2026-08-camp/
  ├── index.md
  ├── _raw/                   ← gitignored, raw sources drop in here
  │   ├── cover.png           ← literally named "cover" → becomes the post cover
  │   ├── IMG_1000.jpg
  │   └── IMG_2000.HEIC
  ├── cover.jpg + cover.webp  ← generated
  ├── 01.jpg   + 01.webp      ← generated (non-cover raws, sorted alphabetically)
  └── 02.jpg   + 02.webp

Rules:
  * A raw file whose basename is `cover` (any extension) becomes cover.jpg
    and cover.webp. If no such file exists, no cover output is created —
    the loader will render the post without a cover image.
  * All other raws are numbered 01, 02, … in alphabetical order of the
    source filename. Existing NN.jpg / NN.webp outputs are OVERWRITTEN
    on each run so numbering stays consistent with what's in _raw/.
  * The raw sources are never modified or moved. Users can keep them
    around for later re-crops; git ignores _raw/ entirely.

Usage:
  python3 scripts/optimize-updates.py             # process all posts
  python3 scripts/optimize-updates.py <slug>...   # process specific posts
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "updates"

MAX_LONG_EDGE = 1600
JPEG_QUALITY = 82
WEBP_QUALITY = 80

# Anything Pillow can open. HEIC needs `pillow-heif` installed; we degrade
# gracefully if it isn't available.
RAW_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".heif"}

def maybe_register_heif() -> None:
    try:
        import pillow_heif  # type: ignore
        pillow_heif.register_heif_opener()
    except Exception:
        pass

def optimize_one(source: Path, out_stem: Path) -> tuple[int, int]:
    """Write <out_stem>.jpg + <out_stem>.webp; return their byte sizes."""
    with Image.open(source) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode != "RGB":
            img = img.convert("RGB")

        w, h = img.size
        long_edge = max(w, h)
        if long_edge > MAX_LONG_EDGE:
            scale = MAX_LONG_EDGE / long_edge
            img = img.resize(
                (round(w * scale), round(h * scale)),
                Image.Resampling.LANCZOS,
            )

        jpg = out_stem.with_suffix(".jpg")
        webp = out_stem.with_suffix(".webp")
        img.save(jpg, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        img.save(webp, format="WEBP", quality=WEBP_QUALITY, method=6)

    return jpg.stat().st_size, webp.stat().st_size

def process_post(post_dir: Path) -> None:
    raw_dir = post_dir / "_raw"
    if not raw_dir.is_dir():
        print(f"{post_dir.name}: no _raw/ folder — skipped")
        return

    raws = sorted(
        p for p in raw_dir.iterdir()
        if p.is_file() and p.suffix.lower() in RAW_EXTS
    )
    if not raws:
        print(f"{post_dir.name}: _raw/ is empty — nothing to do")
        return

    cover = next((p for p in raws if p.stem.lower() == "cover"), None)
    others = [p for p in raws if p is not cover]

    # Wipe stale NN.jpg / NN.webp so numbering stays in sync with _raw/.
    for existing in post_dir.iterdir():
        if existing.is_file() and existing.stem.isdigit() and existing.suffix.lower() in {".jpg", ".webp"}:
            existing.unlink()

    print(f"\n{post_dir.name}")
    print("-" * (len(post_dir.name) + 1))

    if cover is not None:
        jpg_b, webp_b = optimize_one(cover, post_dir / "cover")
        print(f"  cover ← {cover.name:32s} {jpg_b/1024:7.1f}K jpg  {webp_b/1024:7.1f}K webp")

    for idx, src in enumerate(others, start=1):
        stem = post_dir / f"{idx:02d}"
        jpg_b, webp_b = optimize_one(src, stem)
        print(f"  {stem.name}   ← {src.name:32s} {jpg_b/1024:7.1f}K jpg  {webp_b/1024:7.1f}K webp")

def main(argv: list[str]) -> int:
    if not CONTENT.is_dir():
        print(f"error: {CONTENT} does not exist", file=sys.stderr)
        return 1

    maybe_register_heif()

    posts = sorted(p for p in CONTENT.iterdir() if p.is_dir() and not p.name.startswith("_"))
    if argv:
        wanted = set(argv)
        posts = [p for p in posts if p.name in wanted]
        missing = wanted - {p.name for p in posts}
        for m in missing:
            print(f"warning: no post named {m!r}", file=sys.stderr)

    if not posts:
        print("no posts to process")
        return 0

    for post_dir in posts:
        process_post(post_dir)

    print()
    return 0

if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
