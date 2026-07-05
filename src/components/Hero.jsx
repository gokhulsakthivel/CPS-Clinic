import { C } from '../constants/colors.js';
import { hero, clinic, doctor } from '../constants/content.js';
import Button from '../ui/Button.jsx';
import FadeIn from '../ui/FadeIn.jsx';

function PhotoFrame({ alt, ratio }) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <picture>
        <source srcSet={`${base}/doctor.webp`} type="image/webp" />
        <img
          src={`${base}/doctor.jpg`}
          alt={alt}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 22%',
            display: 'block',
          }}
        />
      </picture>
    </div>
  );
}

const telHref = () => (clinic.phone ? `tel:${clinic.phone.replace(/\s+/g, '')}` : '#');
const waHref  = () => (clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#');

export default function Hero() {
  return (
    <section style={{ background: C.white }}>
      <div
        className="drcps-container drcps-2col drcps-2col--wide-l"
        style={{
          padding: '48px var(--pad-x) 64px',
          alignItems: 'center',
        }}
      >
        {/* Left column — copy + CTAs */}
        <FadeIn>
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                fontSize: 12,
                color: C.green,
                fontWeight: 600,
                letterSpacing: '0.4px',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              {clinic.location}
            </div>
            <h1
              style={{
                fontSize: 'clamp(30px, 5.2vw, 46px)',
                fontWeight: 700,
                color: C.ink,
                lineHeight: 1.12,
                letterSpacing: '-0.4px',
              }}
            >
              {hero.headline}
            </h1>
            <p
              style={{
                marginTop: 16,
                fontSize: 17,
                lineHeight: 1.55,
                color: C.ink,
                fontWeight: 500,
              }}
            >
              {hero.subheadline}
            </p>
            <p
              style={{
                marginTop: 12,
                fontSize: 15.5,
                lineHeight: 1.65,
                color: C.muted,
                maxWidth: 520,
              }}
            >
              {hero.supporting}
            </p>

            <div
              style={{
                marginTop: 28,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <Button variant="primary" to="/contact#book" icon="calendar">
                Book appointment
              </Button>
              <Button variant="outline" href={telHref()} icon="phone">
                Call now
              </Button>
              <Button variant="green" href={waHref()} icon="whatsapp">
                WhatsApp
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Right column — photo placeholder */}
        <FadeIn delay={80}>
          <div style={{ maxWidth: 460, marginInline: 'auto', width: '100%' }}>
            <PhotoFrame alt={`Portrait of ${doctor.name}, ${doctor.title}`} ratio="4 / 5" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
