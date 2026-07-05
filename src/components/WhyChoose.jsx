import { C } from '../constants/colors.js';
import { whyChoose } from '../constants/content.js';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';

// Why Choose Us — left-accent items in a 2-col grid at ≥800px.
// Signature spec pattern per §7.5.

export default function WhyChoose() {
  return (
    <section style={{ background: C.white }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="Why choose us"
            title="The kind of care specialist visits should always feel like"
            subtitle="Ethical, evidence-based, and personal — every consultation built around your history and your goals, not a template."
          />
        </FadeIn>

        <div
          className="drcps-grid-2at800"
          style={{ marginTop: 40 }}
        >
          {whyChoose.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 2) * 60}>
              <div
                style={{
                  borderLeft: `3px solid ${C.green}`,
                  paddingLeft: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: C.ink,
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: C.muted,
                  }}
                >
                  {item.description}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
