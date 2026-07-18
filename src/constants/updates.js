// Updates feed — camps, seminars, awareness events, screenings, clinic
// announcements.
//
// Storage model (Phase 2):
//   content/updates/<slug>/index.md   — markdown source + YAML frontmatter
//   content/updates/<slug>/cover.jpg  — required cover (with .webp sibling)
//   content/updates/<slug>/01.jpg     — optional gallery photo(s), numbered
//   content/updates/<slug>/_raw/      — gitignored; source photos before
//                                       running `npm run optimize:updates`
//
// Loading:
//   Vite's `import.meta.glob` reads all markdown + image URLs at build
//   time. Frontmatter is parsed, markdown is rendered to HTML, images are
//   attached by convention (cover = cover.jpg, gallery = NN.jpg sorted).
//
// Consumer API (stable across phases):
//   updates: Update[]         — sorted newest-first
//   updateCategories          — { id, label, hint }[]
//   findUpdate(slug)          — Update | undefined
//   featuredUpdates(n)        — first n items, featured first, then newest

import { parseFrontmatter } from '../lib/frontmatter.js';
import { renderMarkdown }   from '../lib/markdown.js';

export const updateCategories = [
  { id: 'camp',         label: 'Camps',         hint: 'Free & sponsored health camps' },
  { id: 'seminar',      label: 'Seminars',      hint: 'Talks, CMEs, and workshops' },
  { id: 'awareness',    label: 'Awareness',     hint: 'World Diabetes Day, community drives' },
  { id: 'screening',    label: 'Screenings',    hint: 'Blood sugar, BP, and BMI drives' },
  { id: 'announcement', label: 'Announcements', hint: 'Clinic notices and schedule changes' },
];

const VALID_CATEGORIES = new Set(updateCategories.map((c) => c.id));
const DEFAULT_AUTHOR = 'DR.CPS Clinic Team';

// Markdown source per slug.
const mdModules = import.meta.glob('/content/updates/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Bundled image URLs per slug. `?url` keeps the file as an asset, hashed
// for cache-busting, served under /assets/… in production.
const imgModules = import.meta.glob(
  '/content/updates/*/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
);

// Skip anything nested under _raw/ — that's the un-optimized source pile.
const isAssetPath = (p) => !/\/_raw\//.test(p);

function slugFromMdPath(p) {
  const m = p.match(/\/content\/updates\/([^/]+)\/index\.md$/);
  if (!m) return null;
  // Ignore reserved folders like `_template/` — they must never render
  // as a real post.
  return m[1].startsWith('_') ? null : m[1];
}

function slugAndFileFromImgPath(p) {
  const m = p.match(/\/content\/updates\/([^/]+)\/([^/]+)$/);
  return m ? { slug: m[1], file: m[2] } : null;
}

function humanDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

function collectImagesFor(slug, data) {
  /** @type {Record<string, string>} */
  const byFile = {};
  for (const [p, url] of Object.entries(imgModules)) {
    if (!isAssetPath(p)) continue;
    const info = slugAndFileFromImgPath(p);
    if (info && info.slug === slug) byFile[info.file] = url;
  }

  // Filenames that Decap may write with a leading "/updates/…" (its
  // `public_folder`). Strip that so we can look them up by basename.
  const normalise = (v) => String(v || '').replace(/^.*\//, '');
  const webpSibling = (f) => f && byFile[f.replace(/\.(jpg|jpeg|png)$/i, '.webp')];

  // Cover:
  //   1. Explicit `cover:` filename in frontmatter (Decap uploads this way).
  //   2. Convention fallback — cover.{jpg,jpeg,png} in the folder.
  let coverJpg = null;
  let coverWebp = null;
  if (data.cover) {
    const file = normalise(data.cover);
    coverJpg  = byFile[file] || null;
    coverWebp = coverJpg ? (webpSibling(file) || null) : null;
  }
  if (!coverJpg) {
    for (const candidate of ['cover.jpg', 'cover.jpeg', 'cover.png']) {
      if (byFile[candidate]) {
        coverJpg = byFile[candidate];
        coverWebp = byFile['cover.webp'] || null;
        break;
      }
    }
  }

  // Gallery:
  //   1. Explicit `gallery: [...]` list in frontmatter — ordered.
  //   2. Convention fallback — any 01.jpg / 02.jpg / … in the folder.
  let galleryFiles;
  if (Array.isArray(data.gallery) && data.gallery.length > 0) {
    galleryFiles = data.gallery.map(normalise).filter(Boolean);
  } else {
    galleryFiles = Object.keys(byFile)
      .filter((f) => /^\d+\.(jpg|jpeg|png)$/i.test(f))
      .sort();
  }
  const gallery = galleryFiles
    .map((f) => ({
      jpg:  byFile[f] || null,
      webp: webpSibling(f) || null,
    }))
    .filter((g) => g.jpg);

  return { cover: { jpg: coverJpg, webp: coverWebp }, gallery };
}

function buildOne(mdPath, mdSource) {
  const slug = slugFromMdPath(mdPath);
  if (!slug) return null;

  const { data, body } = parseFrontmatter(mdSource);
  const category = VALID_CATEGORIES.has(data.category) ? data.category : 'announcement';
  const { cover, gallery } = collectImagesFor(slug, data);

  return {
    slug,
    title:     String(data.title || slug),
    date:      String(data.date || ''),
    dateLabel: humanDate(data.date),
    category,
    tags:      Array.isArray(data.tags) ? data.tags.map(String) : [],
    location:  data.location ? String(data.location) : null,
    excerpt:   String(data.excerpt || '').trim(),
    author:    String(data.author || DEFAULT_AUTHOR),
    featured:  Boolean(data.featured),
    cover: {
      jpg:  cover.jpg,
      webp: cover.webp,
      alt:  String(data.coverAlt || data.title || slug),
    },
    gallery: gallery.map((g, idx) => ({
      jpg:  g.jpg,
      webp: g.webp,
      alt:  `${data.title || slug} — photo ${idx + 1}`,
    })),
    bodyHtml: renderMarkdown(body),
  };
}

export const updates = Object.entries(mdModules)
  .map(([p, src]) => buildOne(p, src))
  .filter(Boolean)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function findUpdate(slug) {
  return updates.find((u) => u.slug === slug);
}

// Home-page teaser feed. Featured posts come first (in their own
// newest-first order), then non-featured posts fill the remaining
// slots — so the section always shows up to `n` items when that many
// posts exist, rather than dropping to just the featured count.
export function featuredUpdates(n = 3) {
  const featured    = updates.filter((u) => u.featured);
  const nonFeatured = updates.filter((u) => !u.featured);
  return [...featured, ...nonFeatured].slice(0, n);
}
