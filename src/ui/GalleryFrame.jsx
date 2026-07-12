import { C } from '../constants/colors.js';
import Svg from './Svg.jsx';

// Aspect ratio keywords → CSS aspect-ratio values.
const RATIOS = {
  hero:     '16 / 9',
  wide:     '4 / 3',
  square:   '1 / 1',
  portrait: '3 / 4',
};

// Derive a WebP sibling URL from a JPG/PNG/JPEG source. Returns null when
// the input isn't a recognised extension so the caller can skip <source>.
function toWebp(src) {
  if (!src) return null;
  const m = src.match(/\.(jpe?g|png)(\?.*)?$/i);
  return m ? src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2') : null;
}

/**
 * Single gallery frame. Renders the image when `src` is provided; otherwise
 * shows a labelled placeholder in the same brand style as the doctor photo
 * panel. Swap-in-later without any component change.
 *
 * When `src` points to a `.jpg`/`.png`, a sibling `.webp` is served
 * automatically via <picture> for browsers that support it.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {'hero'|'wide'|'square'|'portrait'} [props.aspect='wide']
 * @param {string} [props.icon]
 * @param {string} [props.src]   — real photo URL (public/… or /gallery/…)
 * @param {string} [props.alt]   — required when `src` is provided
 */
export default function GalleryFrame({ label, aspect = 'wide', icon, src, alt }) {
  const ratio = RATIOS[aspect] || RATIOS.wide;
  const webpSrc = toWebp(src);

  return (
    <figure
      className="drcps-card"
      style={{
        margin: 0,
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        background: C.surface,
      }}
    >
      {src ? (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={src}
            alt={alt || label}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </picture>
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 20,
            background:
              'linear-gradient(180deg, rgba(234,243,251,0.55) 0%, rgba(246,248,250,1) 100%)',
          }}
        >
          {icon && (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: C.white,
                border: `1px solid ${C.border}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Svg name={icon} size={22} color={C.primary} sw={1.5} />
            </div>
          )}
          <div
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: aspect === 'square' ? 14 : 15,
              color: C.ink,
              letterSpacing: '-0.2px',
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: C.muted,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Photo coming soon
          </div>
        </div>
      )}

      {/* Caption strip visible when a real photo is loaded */}
      {src && label && (
        <figcaption
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '12px 14px 10px',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
            color: C.white,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.1px',
          }}
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}
