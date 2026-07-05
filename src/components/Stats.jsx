import { C } from '../constants/colors.js';
import { stats } from '../constants/content.js';
import FadeIn from '../ui/FadeIn.jsx';

// Stats band — deep-blue break in the page rhythm per spec §6.2.
// Static values for now; scroll-triggered counters are a Phase 6+ enhancement.

export default function Stats() {
  return (
    <section style={{ background: C.dark, color: C.white }}>
      <div
        className="drcps-container drcps-stats-grid"
        style={{ padding: '40px var(--pad-x)' }}
      >
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 60}>
            <div>
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 3.6vw, 34px)',
                  color: C.white,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.05,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13.5,
                  color: C.statBlue,
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
