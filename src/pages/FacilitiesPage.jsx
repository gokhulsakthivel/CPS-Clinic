import { C } from '../constants/colors.js';
import { facilityGroups } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import CTA from '../components/CTA.jsx';
import Gallery from '../components/Gallery.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// /facilities — full page: diagnostic group + support group + environment.

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
        height: '100%',
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
        <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.3 }}>
          {item.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.55, color: C.muted }}>
          {item.description}
        </div>
      </div>
    </div>
  );
}

const environment = [
  { title: 'Clean waiting area',    description: 'A comfortable, hygienic space for you and your family.' },
  { title: 'Hygienic consultation rooms', description: 'Maintained to the highest cleanliness standards, disinfected between visits.' },
  { title: 'Friendly, trained staff',    description: 'Courteous support from the moment you walk in.' },
];

export default function FacilitiesPage() {
  useDocumentHead(pageMeta.facilities);
  return (
    <>
      <PageHero
        eyebrow="Clinic facilities"
        title="Modern diagnostics in a clean, patient-friendly clinic"
        lead="Point-of-care sugar and HbA1c, ECG, biothesiometry, an on-site pharmacy, and a partner-lab collection centre — most of what a diabetes or general consultation needs, without a second stop."
      />

      {facilityGroups.map((group, gi) => (
        <section
          key={group.title}
          style={{ background: gi % 2 === 0 ? C.white : C.surface }}
        >
          <div className="drcps-container" style={{ padding: '56px var(--pad-x)' }}>
            <FadeIn>
              <SectionHead
                eyebrow={gi === 0 ? 'Diagnostics' : 'Support services'}
                title={group.title}
                subtitle={group.subtitle}
              />
            </FadeIn>

            <div
              className="drcps-grid-cards drcps-grid-cards--dense"
              style={{ marginTop: 32 }}
            >
              {group.items.map((item, i) => (
                <FadeIn key={item.title} delay={(i % 3) * 40}>
                  <FacilityCard item={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Environment strip */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x) 72px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Clinic environment"
              title="A calm, unrushed space for your visit"
            />
          </FadeIn>

          <div className="drcps-grid-2at800" style={{ marginTop: 32 }}>
            {environment.map((e, i) => (
              <FadeIn key={e.title} delay={(i % 2) * 60}>
                <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 18 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>{e.title}</div>
                  <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.65, color: C.muted }}>
                    {e.description}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Button variant="primary" to="/contact#book" icon="calendar">
              Book an appointment
            </Button>
          </div>
        </div>
      </section>

      <Gallery layout="strip" background={C.surface} />

      <CTA />
    </>
  );
}
