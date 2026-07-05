import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { services } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// /services overview — full 18-item list rendered as a dense card grid,
// plus two prominent links into the dedicated sub-pages.

function ServiceCard({ item }) {
  return (
    <div
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: '20px 20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.35 }}>
        {item.title}
      </div>
      <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>
        {item.description}
      </div>
    </div>
  );
}

function SubPageLink({ to, icon, title, body }) {
  return (
    <Link
      to={to}
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '26px 24px',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Svg name={icon} size={22} color={C.primary} sw={1.75} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: '-0.2px' }}>
          {title}
        </div>
        <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: C.muted }}>
          {body}
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: C.primary,
            fontWeight: 600,
            fontSize: 13.5,
          }}
        >
          Explore
          <Svg name="arrowRight" size={14} color={C.primary} sw={1.75} />
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  useDocumentHead(pageMeta.services);
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Comprehensive care across diabetes, heart, kidney, and internal medicine"
        lead="From single-visit fever evaluations to long-term diabetes and hypertension management — treated with the same evidence-based rigour."
      />

      {/* Dedicated sub-page links */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '48px var(--pad-x) 24px' }}>
          <div className="drcps-2col" style={{ alignItems: 'stretch' }}>
            <FadeIn>
              <SubPageLink
                to="/services/diabetes-clinic"
                icon="droplet"
                title="Diabetes Clinic"
                body="Structured, long-term care for Type 1, Type 2, and gestational diabetes — testing, foot care, and complication monitoring under one roof."
              />
            </FadeIn>
            <FadeIn delay={80}>
              <SubPageLink
                to="/services/general-physician"
                icon="stethoscope"
                title="General Physician"
                body="Your first point of contact for any health concern — accurate diagnosis, clear explanation, and the right referral when needed."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Full service list */}
      <section style={{ background: C.surface }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x) 80px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="All specialities"
              title="Every condition treated at the clinic"
              subtitle="Not every visit needs a specialist — but when it does, you shouldn't need to look elsewhere first."
            />
          </FadeIn>

          <div className="drcps-grid-cards drcps-grid-cards--dense" style={{ marginTop: 32 }}>
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={(i % 3) * 40}>
                <ServiceCard item={s} />
              </FadeIn>
            ))}
          </div>

          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" to="/contact#book" icon="calendar">
              Book an appointment
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
