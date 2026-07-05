import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll behavior on route change:
//   - No hash → scroll to top.
//   - Hash present → scroll target element into view. Retries for ~500 ms
//     because the destination page may still be loading its lazy() chunk.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0 });

    if (!hash) { scrollToTop(); return; }

    const id = hash.slice(1);
    if (!id) { scrollToTop(); return; }

    // Poll for the target — code-split pages take a few frames to mount.
    let attempts = 0;
    const maxAttempts = 30; // ≈ 500 ms at 60 fps
    let raf = 0;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
      if (++attempts >= maxAttempts) {
        scrollToTop();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
