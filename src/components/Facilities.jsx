import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { facilities } from '../constants/content.js';
import Svg from '../ui/Svg.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Facilities — data-dense cards, tighter radius (14) per spec §7.2.
// Preview shows the first 9; the full list lives on /facilities.

function FacilityCard({ item }) {
  return (
    <div
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: '22px 20px',
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        minHeight: 108,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Svg name={item.icon} size={18} color={C.primary} sw={1.75} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: C.ink,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: C.muted,
          }}
        >
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default function Facilities() {
  const preview = facilities.slice(0, 9);

  return (
    <section style={{ background: C.surface }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="Clinic facilities"
            title="Modern diagnostics in a clean, patient-friendly clinic"
            subtitle="Point-of-care sugar and HbA1c, ECG, biothesiometry, on-site pharmacy — most of what a diabetes or general consultation needs, without a second stop."
          />
        </FadeIn>

        <div
          className="drcps-grid-cards drcps-grid-cards--dense"
          style={{ marginTop: 40 }}
        >
          {preview.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 60}>
              <FacilityCard item={item} />
            </FadeIn>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <Link
            to="/facilities"
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
            Explore all facilities
            <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
