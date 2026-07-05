import { C } from '../constants/colors.js';
import { about, values, doctor } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Button from '../ui/Button.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// About page (Tier 2 merged: About + Doctor).
// Story → Meet the doctor → Mission/Vision → Values → Difference → CTA.

function DoctorPhotoPanel() {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 5',
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <picture>
        <source srcSet={`${base}/doctor.webp`} type="image/webp" />
        <img
          src={`${base}/doctor.jpg`}
          alt={`Portrait of ${doctor.name}, ${doctor.title}`}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // Nudge crop up slightly so the face stays centred at tighter aspects.
            objectPosition: '50% 22%',
            display: 'block',
          }}
        />
      </picture>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span
      style={{
        background: C.tint,
        color: C.primary,
        fontSize: 12.5,
        padding: '7px 13px',
        borderRadius: 16,
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}

function MissionVisionCard({ label, body, bg, color }) {
  return (
    <div
      style={{
        background: bg,
        color,
        borderRadius: 16,
        padding: '28px 26px',
        border: bg === C.white ? `1px solid ${C.border}` : 'none',
        height: '100%',
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: bg === C.white ? C.green : 'rgba(255,255,255,0.75)',
          fontWeight: 600,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

export default function AboutPage() {
  useDocumentHead(pageMeta.about);
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title="Cardio-metabolic and preventive care in Podanur"
        lead="A modern outpatient clinic built on a simple principle: treat the patient, not just the disease."
      />

      {/* Our story */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x) 40px' }}>
          <FadeIn>
            <SectionHead eyebrow="Our story" title="Why this clinic exists" />
          </FadeIn>
          <div style={{ marginTop: 24, maxWidth: 720, display: 'grid', gap: 16 }}>
            {about.story.map((p, i) => (
              <FadeIn key={i} delay={i * 60}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: C.ink }}>{p}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the doctor (folded in from /doctor) */}
      <section id="doctor" style={{ background: C.surface, scrollMarginTop: 80 }}>
        <div className="drcps-container" style={{ padding: '64px var(--pad-x)' }}>
          <div className="drcps-2col drcps-2col--wide-r" style={{ alignItems: 'start' }}>
            <FadeIn>
              <div style={{ maxWidth: 420, marginInline: 'auto', width: '100%' }}>
                <DoctorPhotoPanel />
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div style={{ maxWidth: 620 }}>
                <SectionHead eyebrow="Meet the doctor" title={doctor.name} />
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 14.5,
                    color: C.muted,
                    fontWeight: 500,
                  }}
                >
                  {doctor.degrees} · {doctor.title}
                </div>

                <p
                  style={{
                    marginTop: 18,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: C.muted,
                  }}
                >
                  Dr. S. S. Chakravarthi is a consultant physician and diabetologist with a special
                  clinical interest in cardio-metabolic medicine — the connected management of diabetes,
                  obesity, hypertension, and thyroid disorders. He combines an MD in General Medicine
                  with a CPCDM fellowship in diabetology.
                </p>

                {/* Credential chips */}
                <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {doctor.credentials.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>

                {/* Academic role */}
                <div
                  style={{
                    marginTop: 24,
                    padding: '18px 20px',
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: C.green,
                      fontWeight: 600,
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    Academic role
                  </div>
                  <div style={{ fontSize: 14.5, color: C.ink, lineHeight: 1.6 }}>
                    {doctor.academic}
                  </div>
                </div>

                {/* Philosophy quote */}
                <blockquote
                  style={{
                    marginTop: 24,
                    marginInline: 0,
                    borderLeft: `3px solid ${C.green}`,
                    paddingLeft: 20,
                    fontStyle: 'italic',
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  &ldquo;{doctor.quote}&rdquo;
                </blockquote>

                <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Button variant="primary" to="/contact#book" icon="calendar">
                    Book a consultation
                  </Button>
                  <Button variant="outline" to="/services" icon="arrowRight">
                    View services
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '64px var(--pad-x)' }}>
          <div className="drcps-2col" style={{ alignItems: 'stretch' }}>
            <FadeIn>
              <MissionVisionCard
                label="Mission"
                body={about.mission}
                bg={C.primary}
                color={C.white}
              />
            </FadeIn>
            <FadeIn delay={80}>
              <MissionVisionCard
                label="Vision"
                body={about.vision}
                bg={C.white}
                color={C.ink}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: C.surface }}>
        <div className="drcps-container" style={{ padding: '72px var(--pad-x)' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Core values"
              title="The principles behind every consultation"
              subtitle="Not aspirational posters on the wall — the standard every visit is measured against."
            />
          </FadeIn>
          <div className="drcps-grid-2at800" style={{ marginTop: 40 }}>
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={(i % 2) * 60}>
                <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 18 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>{v.title}</div>
                  <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.65, color: C.muted }}>
                    {v.description}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '72px var(--pad-x) 80px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="What makes us different"
              title="Whole-person care, not siloed conditions"
            />
          </FadeIn>
          <FadeIn delay={60}>
            <p
              style={{
                marginTop: 20,
                maxWidth: 780,
                fontSize: 17,
                lineHeight: 1.65,
                color: C.ink,
              }}
            >
              {about.difference}
            </p>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
