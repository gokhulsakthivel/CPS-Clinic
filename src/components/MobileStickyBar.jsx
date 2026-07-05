import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { clinic } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';

// MobileStickyBar — fixed bottom bar visible only <900px (hidden by
// .drcps-sticky CSS rule). Three equal columns: Call · WhatsApp · Book.
// Respects iOS safe-area via the .drcps-sticky class in global.css.

const CELL = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  height: 60,
  color: C.white,
  fontSize: 11.5,
  fontWeight: 500,
  fontFamily: 'Inter',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'transparent',
};

export default function MobileStickyBar() {
  const telHref = clinic.phone    ? `tel:${clinic.phone.replace(/\s+/g, '')}`             : '#';
  const waHref  = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#';

  return (
    <div
      className="drcps-sticky"
      role="navigation"
      aria-label="Quick actions"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        zIndex: 40,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
      }}
    >
      <a
        href={telHref}
        aria-label="Call DR.CPS clinic"
        style={{ ...CELL, background: C.primary }}
      >
        <Svg name="phone" size={20} color={C.white} sw={1.75} />
        <span>Call</span>
      </a>
      <a
        href={waHref}
        aria-label="Chat on WhatsApp"
        style={{ ...CELL, background: C.green }}
      >
        <Svg name="whatsapp" size={20} color={C.white} sw={1.75} />
        <span>WhatsApp</span>
      </a>
      <Link
        to="/contact#book"
        aria-label="Book appointment"
        style={{ ...CELL, background: C.dark }}
      >
        <Svg name="calendar" size={20} color={C.white} sw={1.75} />
        <span>Book</span>
      </Link>
    </div>
  );
}
