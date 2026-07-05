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
const OG_IMAGE = '/og.png'; // TODO(phase 8): drop a 1200×630 og.png in /public

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

    const path = m.path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const url = `${SITE_ORIGIN}${path}`;
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
