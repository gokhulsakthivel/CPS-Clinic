import { C } from '../constants/colors.js';
import { gpConditions } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Button from '../ui/Button.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// Dedicated /services/general-physician page.

export default function GeneralPhysicianPage() {
  useDocumentHead(pageMeta.generalPhysician);
  return (
    <>
      <PageHero
        eyebrow="General physician"
        title="Your first point of contact for any health concern"
        lead="Not every health issue needs a specialist — most start with an accurate diagnosis from a general physician who knows when to treat, when to test further, and when to refer."
      />

      {/* Conditions treated */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x)' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Conditions commonly treated"
              title="The everyday medical concerns most patients bring in"
              subtitle="Dr. Chakravarthi's MD in General Medicine means broad clinical training sits behind every consultation."
            />
          </FadeIn>

          <FadeIn delay={60}>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                maxWidth: 900,
              }}
            >
              {gpConditions.map((c) => (
                <span
                  key={c}
                  style={{
                    background: C.tint,
                    color: C.primary,
                    fontSize: 13.5,
                    fontWeight: 500,
                    padding: '10px 16px',
                    borderRadius: 999,
                    display: 'inline-block',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why start here */}
      <section style={{ background: C.surface }}>
        <div className="drcps-container" style={{ padding: '64px var(--pad-x) 72px' }}>
          <div className="drcps-2col" style={{ alignItems: 'stretch' }}>
            <FadeIn>
              <div>
                <SectionHead
                  eyebrow="Why start here"
                  title="Fewer specialist visits, faster answers"
                />
                <p
                  style={{
                    marginTop: 16,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: C.muted,
                    maxWidth: 560,
                  }}
                >
                  A general physician consultation is often the fastest, most cost-effective way to
                  get an accurate diagnosis — and the right referral, if one is needed. There&apos;s
                  no guesswork and no unnecessary specialist visits.
                </p>
                <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Button variant="primary" to="/contact#book" icon="calendar">
                    Book a general consultation
                  </Button>
                  <Button variant="outline" to="/services" icon="arrowRight">
                    Back to all services
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div
                style={{
                  background: C.primary,
                  color: C.white,
                  borderRadius: 16,
                  padding: '30px 28px',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  When to walk in
                </div>
                <ul
                  style={{
                    padding: 0,
                    listStyle: 'none',
                    display: 'grid',
                    gap: 10,
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {[
                    'Fever that hasn\u2019t settled in 48 hours',
                    'New chest pain, breathlessness, or persistent cough',
                    'Sudden change in blood pressure or sugar',
                    'Recurring urinary infections',
                    'Unexplained fatigue or weight loss',
                  ].map((line) => (
                    <li key={line} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.85)',
                          flexShrink: 0,
                          marginTop: 9,
                        }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
