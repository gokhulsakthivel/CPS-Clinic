import { C } from '../constants/colors.js';
import FadeIn from './FadeIn.jsx';

/**
 * Consistent page-hero header for every inner page.
 * eyebrow + h1 + lead paragraph on a plain white background so it doesn't
 * fight the sticky header. Compact vertical rhythm (mobile-first).
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {React.ReactNode} [props.aside]  — optional right-column content (chips, meta)
 */
export default function PageHero({ eyebrow, title, lead, aside }) {
  return (
    <section style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div
        className="drcps-container"
        style={{
          padding: '40px var(--pad-x) 44px',
          display: 'grid',
          gap: 24,
          gridTemplateColumns: '1fr',
          alignItems: 'end',
        }}
      >
        <FadeIn>
          <div style={{ maxWidth: 760 }}>
            <div
              style={{
                fontSize: 12,
                color: C.green,
                fontWeight: 600,
                letterSpacing: '0.4px',
                marginBottom: 10,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4.6vw, 42px)',
                fontWeight: 700,
                color: C.ink,
                letterSpacing: '-0.4px',
                lineHeight: 1.12,
              }}
            >
              {title}
            </h1>
            {lead && (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: C.muted,
                  maxWidth: 640,
                }}
              >
                {lead}
              </p>
            )}
          </div>
        </FadeIn>
        {aside && (
          <FadeIn delay={80} style={{ minWidth: 0 }}>
            {aside}
          </FadeIn>
        )}
      </div>
    </section>
  );
}
