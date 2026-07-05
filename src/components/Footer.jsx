import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { clinic, nav } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';

// Footer — mobile-first. Base: stacked columns. ≥700px: 3-column grid.
// Legal bar wraps beneath a subtle divider.

const linkStyle = {
  fontSize: 14,
  color: C.footerLink,
  padding: '6px 0',
  display: 'inline-block',
  minHeight: 32, // comfortable tap target while still tight visually
};

export default function Footer() {
  const year = new Date().getFullYear();
  const telHref = clinic.phone    ? `tel:${clinic.phone.replace(/\s+/g, '')}`             : '#';
  const waHref  = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#';

  return (
    <footer
      style={{
        background: C.footerBg,
        color: C.footerMid,
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
    >
      <div
        className="drcps-container"
        style={{
          paddingTop: 56,
          paddingBottom: 40,
          display: 'grid',
          gap: 40,
          gridTemplateColumns: '1fr',
        }}
      >
        {/* Column 1 — Identity */}
        <div>
          <div
            style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: 20,
              color: C.white,
              letterSpacing: '-0.3px',
              marginBottom: 12,
            }}
          >
            {clinic.shortName}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: C.footerMid, maxWidth: 360 }}>
            {clinic.tagline}. Trusted physician and diabetologist care in Podanur, Coimbatore.
          </p>
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <h3
            style={{
              fontFamily: 'Inter',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: C.white,
              marginBottom: 12,
            }}
          >
            Quick links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="drcps-tap" style={linkStyle}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <h3
            style={{
              fontFamily: 'Inter',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: C.white,
              marginBottom: 12,
            }}
          >
            Contact
          </h3>
          <address style={{ fontStyle: 'normal', fontSize: 14, lineHeight: 1.7, color: C.footerMid }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <Svg name="map" size={16} color={C.footerLink} />
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.footerMid }}
              >
                {clinic.address}
              </a>
            </div>
            {clinic.phone && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <Svg name="phone" size={16} color={C.footerLink} />
                <a href={telHref} style={{ color: C.footerMid }}>{clinic.phone}</a>
              </div>
            )}
            {clinic.whatsapp && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <Svg name="whatsapp" size={16} color={C.footerLink} />
                <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ color: C.footerMid }}>
                  WhatsApp
                </a>
              </div>
            )}
            {clinic.email && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <Svg name="message" size={16} color={C.footerLink} />
                <a href={`mailto:${clinic.email}`} style={{ color: C.footerMid }}>
                  {clinic.email}
                </a>
              </div>
            )}
            {clinic.hours && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Svg name="calendar" size={16} color={C.footerLink} />
                <span>{clinic.hours}</span>
              </div>
            )}
          </address>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{ borderTop: '0.5px solid #2C3B47' }}>
        <div
          className="drcps-container"
          style={{
            padding: '18px var(--pad-x) 22px',
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            fontSize: 12.5,
            color: C.footerMid,
          }}
        >
          <span>© {year} {clinic.name}</span>
          <span>Privacy policy · Terms of service</span>
        </div>
      </div>

      {/* Inline media query — activates 3-col at ≥700px per spec §5 */}
      <style>{`
        @media (min-width: 700px) {
          footer > .drcps-container:first-of-type {
            grid-template-columns: 1.4fr 1fr 1.4fr;
            gap: 48px;
            padding-top: 72px;
            padding-bottom: 48px;
          }
        }
      `}</style>
    </footer>
  );
}
