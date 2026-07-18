import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { updateCategories } from '../constants/updates.js';
import Svg from '../ui/Svg.jsx';

// Reusable update card. Renders cover (16:9) + category chip + date +
// title + excerpt + "read update" affordance. The whole card is a single
// anchor so the entire area is clickable + keyboard-focusable.

function categoryLabel(id) {
  const c = updateCategories.find((x) => x.id === id);
  return c ? c.label : id;
}

export default function UpdateCard({ post }) {
  return (
    <article
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Link
        to={`/updates/${post.slug}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          color: 'inherit',
          height: '100%',
        }}
        aria-label={`Read: ${post.title}`}
      >
        {post.cover?.jpg && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: C.surface,
              overflow: 'hidden',
            }}
          >
            <picture>
              {post.cover.webp && <source srcSet={post.cover.webp} type="image/webp" />}
              <img
                src={post.cover.jpg}
                alt={post.cover.alt || post.title}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </picture>
          </div>
        )}
        <div
          style={{
            padding: '18px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 11.5,
              color: C.primary,
              fontWeight: 700,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {categoryLabel(post.category)}
            {post.dateLabel && (
              <span style={{ color: C.muted, fontWeight: 500, marginLeft: 8 }}>
                · {post.dateLabel}
              </span>
            )}
          </div>
          <h3
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontSize: 'clamp(17px, 2vw, 20px)',
              fontWeight: 700,
              color: C.ink,
              letterSpacing: '-0.2px',
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p
              style={{
                marginTop: 8,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: C.muted,
              }}
            >
              {post.excerpt}
            </p>
          )}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: C.primary,
              fontWeight: 600,
              fontSize: 13.5,
            }}
          >
            Read update
            <Svg name="arrowRight" size={14} color={C.primary} sw={1.75} />
          </div>
        </div>
      </Link>
    </article>
  );
}
