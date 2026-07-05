import { C } from '../constants/colors.js';
import { clinic } from '../constants/content.js';
import Button from '../ui/Button.jsx';
import FadeIn from '../ui/FadeIn.jsx';

// CTA band — dark full-width close per spec §6.2.
// Two CTAs: primary Book, secondary WhatsApp.

const waHref = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#';

export default function CTA() {
  return (
    <section style={{ background: C.dark, color: C.white }}>
      <div
        className="drcps-container"
        style={{
          padding: '64px var(--pad-x) 72px',
          textAlign: 'center',
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.8vw, 34px)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.3px',
              lineHeight: 1.2,
              maxWidth: 720,
              marginInline: 'auto',
            }}
          >
            Start your health journey today
          </h2>
          <p
            style={{
              marginTop: 14,
              maxWidth: 560,
              marginInline: 'auto',
              fontSize: 16,
              lineHeight: 1.6,
              color: C.statBlue,
            }}
          >
            Whether it&apos;s your first diabetes diagnosis or your tenth year managing it, you deserve a doctor who listens.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div
            style={{
              marginTop: 28,
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            <Button
              variant="primary"
              to="/contact#book"
              icon="calendar"
              iconColor={C.primary}
              style={{ background: C.white, color: C.primary }}
            >
              Book appointment
            </Button>
            <Button variant="green" href={waHref} icon="whatsapp">
              Chat on WhatsApp
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
