import { C } from '../constants/colors.js';
import { journey } from '../constants/content.js';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Patient Journey — vertical stepper on mobile, horizontal timeline at ≥720px.
// Final step (Follow up) uses C.green fill per spec §7.9 — signals ongoing care.

const CIRCLE = 42;

function Step({ n, label, isLast, total }) {
  const isFinal = n === total;
  const bg = isFinal ? C.green : C.primary;
  return (
    <>
      {/* Circle + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          minWidth: 0,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: CIRCLE,
            height: CIRCLE,
            borderRadius: CIRCLE,
            background: bg,
            color: C.white,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 16,
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(10, 77, 140, 0.14)',
          }}
        >
          {n}
        </div>
        <div
          style={{
            fontSize: 15.5,
            fontWeight: 600,
            color: C.ink,
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>
      </div>
    </>
  );
}

export default function Journey() {
  return (
    <section style={{ background: C.white }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="What to expect"
            title="A clear, unhurried path from first visit to long-term care"
            subtitle="Every consultation follows the same five steps, so you always know what comes next."
          />
        </FadeIn>

        {/* Mobile stepper (vertical) */}
        <ol
          className="drcps-journey-mobile"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '40px 0 0',
            display: 'grid',
            gap: 22,
          }}
        >
          {journey.map((step, i) => (
            <FadeIn as="li" key={step.n} delay={i * 60}>
              <div style={{ position: 'relative', paddingLeft: 0 }}>
                {/* connector line to next item */}
                {i < journey.length - 1 && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: CIRCLE / 2 - 1,
                      top: CIRCLE,
                      bottom: -22,
                      width: 2,
                      background: C.border,
                    }}
                  />
                )}
                <Step n={step.n} label={step.label} total={journey.length} isLast={i === journey.length - 1} />
              </div>
            </FadeIn>
          ))}
        </ol>

        {/* Desktop horizontal timeline */}
        <ol
          className="drcps-journey-desktop"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '40px 0 0',
            display: 'none',
            gridTemplateColumns: `repeat(${journey.length}, 1fr)`,
            gap: 0,
            alignItems: 'start',
          }}
        >
          {journey.map((step, i) => {
            const isFinal = step.n === journey.length;
            const bg = isFinal ? C.green : C.primary;
            return (
              <FadeIn as="li" key={step.n} delay={i * 60}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {/* row of circle + connector to the right */}
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <span style={{ flex: 1, height: 2, background: i === 0 ? 'transparent' : C.green, opacity: i === 0 ? 0 : 1 }} />
                    <span
                      aria-hidden="true"
                      style={{
                        width: CIRCLE,
                        height: CIRCLE,
                        borderRadius: CIRCLE,
                        background: bg,
                        color: C.white,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: 16,
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(10, 77, 140, 0.14)',
                      }}
                    >
                      {step.n}
                    </span>
                    <span style={{ flex: 1, height: 2, background: i === journey.length - 1 ? 'transparent' : C.green, opacity: i === journey.length - 1 ? 0 : 1 }} />
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: C.ink,
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
