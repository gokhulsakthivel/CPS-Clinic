import { C } from '../constants/colors.js';
import Svg, { PATHS } from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Accordion from '../ui/Accordion.jsx';
import { faqs } from '../constants/content.js';

// Dev-only smoke test for Phase 2 primitives. Not linked from the site nav.
// Visit /dev/primitives to visually check every icon, button variant, fade,
// and accordion behavior.

const H2 = ({ children }) => (
  <h2
    style={{
      fontSize: 22,
      fontWeight: 700,
      color: C.ink,
      marginTop: 48,
      marginBottom: 16,
      letterSpacing: '-0.3px',
    }}
  >
    {children}
  </h2>
);

const Eyebrow = ({ children }) => (
  <div
    style={{
      fontSize: 12,
      color: C.green,
      fontWeight: 600,
      letterSpacing: '0.4px',
      marginBottom: 8,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export default function DevPrimitives() {
  const iconKeys = Object.keys(PATHS);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px 96px' }}>
      <Eyebrow>Phase 2 smoke test</Eyebrow>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: C.ink,
          letterSpacing: '-0.3px',
        }}
      >
        UI primitives
      </h1>

      <H2>Svg — {iconKeys.length} icons</H2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 12,
        }}
      >
        {iconKeys.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 16,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              background: C.white,
            }}
          >
            <Svg name={name} size={26} color={C.primary} />
            <span style={{ fontSize: 12, color: C.muted }}>{name}</span>
          </div>
        ))}
      </div>

      <H2>Button — variants</H2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="primary" icon="calendar">
          Book appointment
        </Button>
        <Button variant="outline" icon="phone">
          Call now
        </Button>
        <Button variant="green" icon="whatsapp">
          Chat on WhatsApp
        </Button>
        <Button variant="primary">Text only</Button>
        <Button variant="primary" to="/">
          Router link
        </Button>
        <Button variant="outline" href="#" ariaLabel="Placeholder anchor">
          Anchor
        </Button>
      </div>
      <div style={{ marginTop: 16, maxWidth: 320 }}>
        <Button variant="primary" fullWidth>
          Full-width submit
        </Button>
      </div>

      <H2>FadeIn — scroll-triggered stagger</H2>
      <div style={{ height: 320 }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {[0, 60, 120, 180, 240].map((delay, i) => (
          <FadeIn key={delay} delay={delay}>
            <div
              className="drcps-card"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: 20,
                minHeight: 96,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>
                Card {i + 1}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
                {delay}ms delay · hover to lift
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <H2>Accordion — sample FAQs</H2>
      <div style={{ background: C.white, borderRadius: 14, padding: '0 16px' }}>
        {faqs.slice(0, 4).map((f, i) => (
          <Accordion key={f.q} question={f.q} answer={f.a} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}
