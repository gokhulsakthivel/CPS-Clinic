import { C } from '../constants/colors.js';
import { diabetesOfferings, diabetesAudience } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// Dedicated /services/diabetes-clinic page.

function OfferingCard({ item }) {
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
        height: '100%',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: C.tint,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Svg name={item.icon} size={20} color={C.primary} sw={1.75} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.35 }}>
          {item.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default function DiabetesClinicPage() {
  useDocumentHead(pageMeta.diabetesClinic);
  return (
    <>
      <PageHero
        eyebrow="Diabetes clinic"
        title="Diabetes care, built for the long term"
        lead="Diabetes isn't managed in a single visit — it's managed over years. Our diabetes clinic is built around that reality, offering structured, ongoing care rather than one-off prescriptions."
      />

      {/* What we offer */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x)' }}>
          <FadeIn>
            <SectionHead
              eyebrow="What we offer"
              title="Everything a diabetic patient needs, under one roof"
            />
          </FadeIn>
          <div
            className="drcps-grid-cards drcps-grid-cards--dense"
            style={{ marginTop: 32 }}
          >
            {diabetesOfferings.map((item, i) => (
              <FadeIn key={item.title} delay={(i % 3) * 40}>
                <OfferingCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who this clinic is for */}
      <section style={{ background: C.surface }}>
        <div className="drcps-container" style={{ padding: '64px var(--pad-x) 72px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Who this clinic is for"
              title="Whether you're newly diagnosed or have been managing diabetes for years"
              subtitle="If any of the following describes you, this clinic is set up to help."
            />
          </FadeIn>

          <FadeIn delay={60}>
            <ul
              style={{
                marginTop: 32,
                padding: 0,
                listStyle: 'none',
                display: 'grid',
                gap: 14,
                maxWidth: 780,
              }}
            >
              {diabetesAudience.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: '14px 16px',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: C.ink,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      background: C.green,
                      flexShrink: 0,
                      marginTop: 8,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={120}>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="primary" to="/contact#book" icon="calendar">
                Book a diabetes consultation
              </Button>
              <Button variant="outline" to="/services" icon="arrowRight">
                Back to all services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
