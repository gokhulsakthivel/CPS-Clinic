import { useEffect } from 'react';

// Small, dependency-free document-head manager for the SPA. Sets:
//   - <title>
//   - meta[name=description]
//   - meta[property=og:title|og:description|og:url|og:type|og:image]
//   - meta[name=twitter:card]
//   - link[rel=canonical]
//
// Runs on mount and whenever any input changes. Not a general-purpose
// react-helmet replacement — just what this site needs.

const SITE_NAME = 'DR.CPS Speciality & Diabetic Clinic';
const SITE_ORIGIN =
  typeof window !== 'undefined' ? window.location.origin : 'https://drcps.clinic';

// Vite's BASE_URL is '/CPS-Clinic/' on GitHub Pages, '/' locally / at a root domain.
// Trim trailing slash so it composes cleanly with page paths like '/about'.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const OG_IMAGE = `${BASE}/og.png`;

function upsertMeta(attr, key, value) {
  if (typeof document === 'undefined' || value == null) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', String(value));
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined' || !href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * @param {object} m
 * @param {string} m.title          — page title (site name appended automatically)
 * @param {string} m.description
 * @param {string} [m.path]         — pathname; defaults to window.location.pathname
 * @param {string} [m.image]        — OG image path (defaults to /og.png)
 * @param {string} [m.ogType='website']
 */
export default function useDocumentHead(m) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Resolve the app-relative path (e.g. '/about'), regardless of whether the
    // caller passed pageMeta.path or we're inferring from window.location.
    let relPath = m.path;
    if (!relPath && typeof window !== 'undefined') {
      const p = window.location.pathname;
      relPath = (BASE && p.startsWith(BASE)) ? (p.slice(BASE.length) || '/') : p;
    }
    if (!relPath) relPath = '/';

    const url = `${SITE_ORIGIN}${BASE}${relPath === '/' ? '/' : relPath}`;
    const fullTitle = m.title === SITE_NAME ? m.title : `${m.title} — ${SITE_NAME}`;
    const image = m.image || OG_IMAGE;
    const ogType = m.ogType || 'website';

    document.title = fullTitle;
    upsertMeta('name', 'description', m.description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', m.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', `${SITE_ORIGIN}${image}`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', m.description);
    upsertLink('canonical', url);
  }, [m.title, m.description, m.path, m.image, m.ogType]);
}
