import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { galleryGroups } from '../constants/content.js';
import SectionHead from '../ui/SectionHead.jsx';
import GalleryFrame from '../ui/GalleryFrame.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';

// Gallery preview — used on Home and Facilities pages. Shows the first 4
// items across groups (variety), links to the full /gallery route.
//
// Two visual variants:
//   layout="preview" (default) → 4-tile equal-height strip (Home)
//   layout="strip"             → 6-tile 3-col grid (Facilities)

// Vite base — required when the site is served under a sub-path.
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const toSrc = (src) => (src ? `${base}/${src.replace(/^\/+/, '')}` : undefined);

// Flatten groups into a single list. When `preferPhotos` is true, items
// that have a real `src` are returned first, so preview strips populate
// with real content before any placeholders.
function firstN(n, { preferPhotos = true } = {}) {
  const flat = [];
  for (const g of galleryGroups) {
    for (const item of g.items) {
      flat.push({ ...item, groupTitle: g.title });
    }
  }
  const ordered = preferPhotos
    ? [...flat.filter((i) => i.src), ...flat.filter((i) => !i.src)]
    : flat;
  return ordered.slice(0, n);
}

export default function Gallery({ layout = 'preview', background = C.white }) {
  const isStrip = layout === 'strip';
  const items = firstN(isStrip ? 6 : 4);
  // Force uniform aspect on the compact preview so the strip aligns; strip
  // uses each item's natural aspect for a more editorial feel.
  const uniformAspect = isStrip ? null : 'wide';

  return (
    <section style={{ background }}>
      <div
        className="drcps-container"
        style={{ padding: '64px var(--pad-x) 72px' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <FadeIn>
            <SectionHead
              eyebrow="Inside the clinic"
              title={isStrip ? 'A quick look around' : 'A calm space, built for unrushed care'}
              subtitle={
                isStrip
                  ? 'Reception, consultation, diagnostic bays, pharmacy — how the space is set up matters.'
                  : 'Reception, consultation room, diagnostic bays, and pharmacy — all under one roof.'
              }
            />
          </FadeIn>
          <FadeIn delay={60}>
            <Link
              to="/gallery"
              className="drcps-nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: C.primary,
                fontWeight: 600,
                fontSize: 14.5,
                minHeight: 32,
              }}
            >
              Take the full tour
              <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
            </Link>
          </FadeIn>
        </div>

        <div
          className={isStrip ? 'drcps-gallery-strip' : 'drcps-gallery-preview'}
          style={{ marginTop: 32 }}
        >
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={(i % 3) * 60}>
              <GalleryFrame
                label={item.label}
                aspect={uniformAspect || item.aspect}
                icon={item.icon}
                src={toSrc(item.src)}
                alt={item.alt}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
