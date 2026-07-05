import { C } from '../constants/colors.js';
import { testimonials, googleReviews } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Testimonials — asymmetric featured (large left) + 2 compact (stacked right)
// at ≥800px. Stacks vertically on mobile. All quotes are real Google reviews.

function Stars({ n = 5, size = 14 }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Svg key={i} name="star" size={size} color={C.gold} sw={0} />
      ))}
    </span>
  );
}

function FeaturedCard({ t }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '30px 28px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Stars n={t.rating} size={16} />
      <blockquote
        style={{
          margin: '18px 0 0',
          fontSize: 17,
          lineHeight: 1.55,
          color: C.ink,
          fontWeight: 500,
        }}
      >
        “{t.quote}”
      </blockquote>
      <div style={{ marginTop: 'auto', paddingTop: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t.name}</div>
        <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>
          {t.source ? `Verified ${t.source} review` : ''}
          {t.date ? ` · ${t.date}` : ''}
        </div>
      </div>
    </div>
  );
}

function CompactCard({ t }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: 22,
      }}
    >
      <Stars n={t.rating} size={13} />
      <blockquote
        style={{
          margin: '12px 0 0',
          fontSize: 14.5,
          lineHeight: 1.6,
          color: C.ink,
        }}
      >
        “{t.quote}”
      </blockquote>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{t.name}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
          {t.source ? `Verified ${t.source} review` : ''}
          {t.date ? ` · ${t.date}` : ''}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const featured = testimonials.find(t => t.featured) || testimonials[0];
  const compact  = testimonials.filter(t => t !== featured).slice(0, 2);

  return (
    <section style={{ background: C.surface }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <FadeIn>
            <SectionHead
              eyebrow="Patient stories"
              title="What people are saying"
            />
          </FadeIn>

          {/* Google rating badge */}
          <FadeIn delay={60}>
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '10px 14px',
                textDecoration: 'none',
              }}
              aria-label={`Google rating ${googleReviews.rating} out of 5 from ${googleReviews.count} reviews — opens in a new tab`}
            >
              <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 20, color: C.ink, lineHeight: 1 }}>
                {googleReviews.rating}
              </span>
              <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
                <Stars n={5} size={12} />
                <span style={{ fontSize: 11.5, color: C.muted }}>
                  {googleReviews.count} Google reviews
                </span>
              </span>
            </a>
          </FadeIn>
        </div>

        {/* Asymmetric grid */}
        <div
          className="drcps-testimonial-grid"
          style={{ marginTop: 32 }}
        >
          <FadeIn>
            <FeaturedCard t={featured} />
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {compact.map((t, i) => (
              <FadeIn key={t.name} delay={80 + i * 60}>
                <CompactCard t={t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
