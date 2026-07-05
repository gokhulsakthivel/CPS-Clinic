import { C } from '../constants/colors.js';
import { clinic } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Contact preview — address / phone / hours + a static map thumbnail (Google
// Maps iframe embed). Full contact form lives on /contact.

const telHref = clinic.phone    ? `tel:${clinic.phone.replace(/\s+/g, '')}`             : '#';
const waHref  = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#';

// Standard Google Maps place embed URL for the clinic coordinates.
// Uses lat/lng — no API key required, zero JS cost.
const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=DR.CPS+SPECIALITY+AND+DIABETIC+CLINIC,+Podanur+Main+Road,+Coimbatore&output=embed';

function Row({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Svg name={icon} size={18} color={C.primary} sw={1.75} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            color: C.muted,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14.5, color: C.ink, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactPreview() {
  return (
    <section style={{ background: C.surface }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="Visit us"
            title="Podanur, Coimbatore — easy to reach, easy to find"
            subtitle="Near Karuparayan Kovil bus stop on Podanur Main Road, with plenty of parking on the street."
          />
        </FadeIn>

        <div
          className="drcps-2col"
          style={{ marginTop: 40, alignItems: 'stretch' }}
        >
          {/* Details */}
          <FadeIn>
            <div
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                height: '100%',
              }}
            >
              <Row icon="map" label="Address">
                {clinic.address}
              </Row>
              {clinic.phone && (
                <Row icon="phone" label="Phone">
                  <a href={telHref} style={{ color: C.ink, borderBottom: `1px dotted ${C.border}` }}>
                    {clinic.phone}
                  </a>
                </Row>
              )}
              <Row icon="calendar" label="Consultation hours">
                {clinic.hours || 'Days & timings to be confirmed'}
              </Row>

              <div style={{ marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button variant="primary" to="/contact#book" icon="calendar">
                  Book appointment
                </Button>
                <Button variant="green" href={waHref} icon="whatsapp">
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  href={clinic.mapsUrl}
                  icon="arrowRight"
                  ariaLabel="Get directions on Google Maps — opens in a new tab"
                >
                  Get directions
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Map embed */}
          <FadeIn delay={80}>
            <div
              className="drcps-map"
              style={{
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: C.surface,
                height: '100%',
              }}
            >
              <iframe
                title={`Map showing ${clinic.name} in Podanur, Coimbatore`}
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
