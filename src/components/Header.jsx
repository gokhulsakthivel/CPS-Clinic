import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { nav, clinic } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';

// Header — mobile-first.
// Base:   [logo]                              [WhatsApp icon]  [hamburger]
// ≥900px: [logo · subtitle]  [nav links]  [WhatsApp btn | Book btn]

const HEIGHT = 62;

const telHref  = () => (clinic.phone    ? `tel:${clinic.phone.replace(/\s+/g, '')}`     : '#');
const waHref   = () => (clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#');

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while menu is open (mobile only — desktop menu is inline)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        className="drcps-container"
        style={{
          height: HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 28,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: C.primary,
            letterSpacing: '-0.3px',
            minHeight: 44,
            lineHeight: '44px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 20 }}>{clinic.shortName}</span>
        </Link>

        {/* Desktop nav — hidden below 900px */}
        <nav
          aria-label="Primary"
          className="drcps-desktop-flex"
          style={{
            alignItems: 'center',
            gap: 16,
            flex: 1,
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          {nav.map((item) => {
            const active =
              item.to === '/'
                ? pathname === '/'
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="drcps-nav-link"
                style={{
                  fontSize: 14,
                  color: active ? C.primary : C.ink,
                  fontWeight: active ? 600 : 500,
                  borderBottom: active ? `2px solid ${C.primary}` : '2px solid transparent',
                  paddingBottom: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.short || item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions — hidden below 900px */}
        <div
          className="drcps-desktop-flex"
          style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}
        >
          <Button variant="outline" href={waHref()} icon="whatsapp" ariaLabel="Chat on WhatsApp">
            WhatsApp
          </Button>
          <Button variant="primary" to="/contact#book" icon="calendar">
            Book appointment
          </Button>
        </div>

        {/* Mobile action cluster — hidden ≥900px */}
        <div
          className="drcps-only-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <a
            href={waHref()}
            aria-label="Chat on WhatsApp"
            className="drcps-tap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 8,
              color: C.green,
            }}
          >
            <Svg name="whatsapp" size={22} color={C.green} />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="drcps-mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="drcps-tap"
            style={{
              width: 44,
              height: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 8,
              color: C.ink,
            }}
          >
            <Svg name={open ? 'x' : 'menu'} size={24} color={C.ink} sw={1.75} />
          </button>
        </div>
      </div>

      {/* Mobile menu — collapses at ≥900px */}
      <div
        id="drcps-mobile-menu"
        className={`drcps-mobile-menu drcps-only-mobile ${open ? 'open' : ''}`}
        style={{
          background: C.white,
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <nav
          aria-label="Mobile"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px var(--pad-x, 20px) 12px',
          }}
        >
          {nav.map((item) => {
            const active =
              item.to === '/'
                ? pathname === '/'
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="drcps-tap"
                style={{
                  fontSize: 16,
                  fontWeight: active ? 600 : 500,
                  color: active ? C.primary : C.ink,
                  padding: '12px 4px',
                  borderBottom: `1px solid ${C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 48,
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
            <Button variant="outline" href={waHref()} icon="whatsapp" ariaLabel="Chat on WhatsApp">
              WhatsApp
            </Button>
            <Button variant="primary" to="/contact#book" icon="calendar">
              Book
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
