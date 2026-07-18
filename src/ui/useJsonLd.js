import { useEffect } from 'react';

// Injects a <script type="application/ld+json"> block into <head>. Each
// call is tagged with a stable `id` so the same page can register more
// than one schema (e.g. Article + BreadcrumbList) without collisions.
//
// Passing null/undefined clears any previously-registered block under
// that id — useful when a page can render either "found" or "not found".

const PREFIX = 'drcps-jsonld-';

function stringify(data) {
  // Escape "</script>" to be safe if any post title / description contains it.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * @param {string} id      — stable identifier for this schema block
 * @param {object|null} data — JSON-LD object, or null to remove
 */
export default function useJsonLd(id, data) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const elId = PREFIX + id;
    let el = document.getElementById(elId);

    if (!data) {
      if (el) el.remove();
      return undefined;
    }

    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = elId;
      document.head.appendChild(el);
    }
    el.textContent = stringify(data);

    return () => {
      const cur = document.getElementById(elId);
      if (cur) cur.remove();
    };
  }, [id, data]);
}
