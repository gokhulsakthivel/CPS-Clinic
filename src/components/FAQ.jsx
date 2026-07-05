import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { faqs } from '../constants/content.js';
import Accordion from '../ui/Accordion.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import Svg from '../ui/Svg.jsx';

// FAQ preview — first 6 questions. Full list on /faq.

export default function FAQ() {
  const preview = faqs.slice(0, 6);

  return (
    <section style={{ background: C.white }}>
      <div
        className="drcps-container"
        style={{ padding: '72px var(--pad-x) 80px' }}
      >
        <FadeIn>
          <SectionHead
            eyebrow="Frequently asked"
            title="Answers to what patients ask most"
            subtitle="Common questions about consultations, testing, follow-up, and second opinions."
          />
        </FadeIn>

        <FadeIn delay={60}>
          <div
            style={{
              marginTop: 32,
              maxWidth: 820,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: '4px 20px',
            }}
          >
            {preview.map((f, i) => (
              <Accordion
                key={f.q}
                question={f.q}
                answer={f.a}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </FadeIn>

        <div style={{ marginTop: 24 }}>
          <Link
            to="/resources#faq"
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
            See all FAQs
            <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
