# Updates — how to add a new post

Each post is one folder under `content/updates/`. Naming convention:

    content/updates/<yyyy>-<mm>-<short-title-in-kebab-case>/

The folder name **is** the slug and appears in the URL as
`drcps.clinic/updates/<slug>`.

## Files inside a post folder

    content/updates/2026-08-diabetes-screening-camp/
    ├── index.md          ← required — the write-up + frontmatter
    ├── cover.jpg         ← optional — hero image (generated)
    ├── cover.webp        ← optional — WebP sibling (generated)
    ├── 01.jpg / 01.webp  ← optional — gallery photo (generated)
    ├── 02.jpg / 02.webp  ← optional — gallery photo (generated)
    └── _raw/             ← gitignored — drop raw source photos here
        ├── cover.png
        ├── IMG_0001.jpg
        └── IMG_0002.HEIC

## Five-step recipe

1. **Copy the template** — duplicate `content/updates/_template/` and rename
   the copy using the `<yyyy>-<mm>-<slug>` convention.
2. **Fill in `index.md`** — edit the frontmatter and write the body.
3. **Drop raw photos into `_raw/`** — any resolution, any format
   (JPEG, PNG, HEIC, TIFF). Name one of them `cover.png` (or `cover.jpg`)
   if you want it used as the hero image; everything else becomes a
   sequential gallery photo.
4. **Run `npm run optimize:updates`** — the script resizes, converts, and
   writes optimized `cover.jpg + cover.webp` and `NN.jpg + NN.webp`
   pairs next to `index.md`. The originals in `_raw/` are left alone.
5. **Preview and commit** —
   ```bash
   npm run dev
   git add content/updates/<slug>
   git commit -m "Add update: <title>"
   git push
   ```

## Frontmatter reference

```yaml
---
title:      "Free diabetes awareness camp — Podanur"
date:       2026-08-10                # ISO date; drives newest-first sort
category:   camp                      # camp | seminar | awareness | screening | announcement
tags:       [diabetes, community]     # optional
location:   Karuparayan Kovil Grounds # optional
author:     DR.CPS Clinic Team        # optional; defaults to team name
excerpt: >                            # ~200 chars — used on cards + meta description
  One-paragraph summary that shows up on the listing cards and in the
  Google search snippet.
coverAlt:   "Volunteers checking BP at the camp."   # accessibility text for cover.jpg
featured:   true                      # optional; surfaces on the home teaser (Phase 3)
---
```

Only `title`, `date`, `category`, and `excerpt` are strictly required.

## Body — what you can use

The write-up is standard markdown:

- `##`, `###`, `####` — subheadings
- `**bold**`, `*italic*`, `` `inline code` ``
- `[link text](https://example.com)`
- `- bullet lists` and `1. numbered lists`
- `> blockquote`
- `![alt](image-url)` — inline images (see below)

If you want to embed an inline photo in the body, reference it by its
final filename (after running the optimizer):

```markdown
![Camp volunteers checking BP](./01.jpg)
```

Everything is rendered inside a `drcps-prose` container that inherits the
site's typography.
