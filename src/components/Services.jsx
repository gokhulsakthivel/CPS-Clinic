import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { featuredServices, servicesPreview } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Featured service card — index 0 = filled blue, index 1 = white with border.
function FeaturedCard({ service, primary }) {
  return (
    <Link
      to={service.href}
      className="drcps-card"
      style={{
        display: 'block',
        background: primary ? C.primary : C.white,
        color: primary ? C.white : C.ink,
        border: primary ? 'none' : `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '30px 28px',
        textDecoration: 'none',
        minHeight: 220,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: primary ? 'rgba(255,255,255,0.14)' : C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <Svg name={service.icon} size={22} color={primary ? C.white : C.primary} sw={1.75} />
      </div>
      <h3
        style={{
          fontSize: primary ? 22 : 20,
          fontWeight: 700,
          color: primary ? C.white : C.ink,
          letterSpacing: '-0.3px',
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          marginTop: 12,
          fontSize: 14.5,
          lineHeight: 1.6,
          color: primary ? 'rgba(255,255,255,0.86)' : C.muted,
        }}
      >
        {service.description}
      </p>
      <span
        style={{
          marginTop: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13.5,
          fontWeight: 600,
          color: primary ? C.white : C.primary,
        }}
      >
        Learn more
        <Svg name="arrowRight" size={14} color={primary ? C.white : C.primary} sw={1.75} />
      </span>
    </Link>
  );
}

// Compact preview card for the 8-tile grid below the featured pair.
function PreviewCard({ item }) {
  return (
    <div
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: '18px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        minHeight: 128,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg name={item.icon} size={18} color={C.primary} sw={1.75} />
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: C.ink,
          lineHeight: 1.35,
        }}
      >
        {item.title}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section style={{ background: C.surface }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="Our specialities"
            title="Comprehensive care, built around your whole health picture"
            subtitle="Diabetes, hypertension, thyroid, heart risk, kidney health — treated as one connected system, not eight isolated conditions."
          />
        </FadeIn>

        {/* Featured pair */}
        <div
          className="drcps-featured"
          style={{ marginTop: 32 }}
        >
          {featuredServices.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60}>
              <FeaturedCard service={s} primary={i === 0} />
            </FadeIn>
          ))}
        </div>

        {/* 8-card preview grid */}
        <div
          className="drcps-grid-cards"
          style={{ marginTop: 24 }}
        >
          {servicesPreview.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 4) * 60}>
              <PreviewCard item={item} />
            </FadeIn>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <Link
            to="/services"
            className="drcps-nav-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: C.primary,
              fontWeight: 600,
              fontSize: 14.5,
              minHeight: 32,
            }}
          >
            View all services
            <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
