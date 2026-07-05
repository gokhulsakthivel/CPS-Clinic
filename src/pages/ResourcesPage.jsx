import { C } from '../constants/colors.js';
import { faqs, patientEducation } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import SectionHead from '../ui/SectionHead.jsx';
import Accordion from '../ui/Accordion.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Button from '../ui/Button.jsx';
import Svg from '../ui/Svg.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// Resources (Tier 2 merged: Patient Education + FAQ).
// Anchor tabs at the top jump to either section.

function AnchorTabs() {
  return (
    <div
      role="tablist"
      aria-label="Jump to section"
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: C.tint,
        borderRadius: 999,
        marginTop: 24,
      }}
    >
      <a
        href="#conditions"
        role="tab"
        style={{
          padding: '8px 16px',
          borderRadius: 999,
          fontSize: 13.5,
          fontWeight: 600,
          color: C.primary,
          background: 'transparent',
          textDecoration: 'none',
        }}
      >
        Condition guides
      </a>
      <a
        href="#faq"
        role="tab"
        style={{
          padding: '8px 16px',
          borderRadius: 999,
          fontSize: 13.5,
          fontWeight: 600,
          color: C.primary,
          background: 'transparent',
          textDecoration: 'none',
        }}
      >
        FAQs
      </a>
    </div>
  );
}

function ConditionCard({ item }) {
  return (
    <article
      className="drcps-card"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: '22px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        height: '100%',
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: C.ink,
          letterSpacing: '-0.2px',
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: C.muted }}>{item.body}</p>
    </article>
  );
}

export default function ResourcesPage() {
  useDocumentHead(pageMeta.resources);
  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title="Learn about your condition, in plain language"
        lead="Short guides to the conditions we treat most often, plus honest answers to the questions patients ask before their first visit."
        aside={<AnchorTabs />}
      />

      {/* Condition guides */}
      <section id="conditions" style={{ background: C.surface, scrollMarginTop: 80 }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x) 72px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Condition guides"
              title="Plain-language explanations"
              subtitle="Bookmark this page for quick reference. Missing something you'd like explained? Mention it at your next visit."
            />
          </FadeIn>

          <div className="drcps-grid-cards drcps-grid-cards--dense" style={{ marginTop: 40 }}>
            {patientEducation.map((item, i) => (
              <FadeIn key={item.title} delay={(i % 3) * 40}>
                <ConditionCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" style={{ background: C.white, scrollMarginTop: 80 }}>
        <div className="drcps-container" style={{ padding: '56px var(--pad-x) 32px' }}>
          <FadeIn>
            <SectionHead
              eyebrow="Frequently asked"
              title="Answers to what patients ask most"
              subtitle="Can't find what you're looking for? Call or WhatsApp us — we answer directly."
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
                padding: '4px 22px',
              }}
            >
              {faqs.map((f, i) => (
                <Accordion
                  key={f.q}
                  question={f.q}
                  answer={f.a}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="primary" to="/contact#book" icon="calendar">
                Book an appointment
              </Button>
              <Button variant="outline" to="/contact" icon="phone">
                Contact the clinic
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Coming soon note */}
      <section style={{ background: C.surface }}>
        <div className="drcps-container" style={{ padding: '48px var(--pad-x) 72px' }}>
          <FadeIn>
            <div
              style={{
                background: C.tint,
                borderRadius: 16,
                padding: '24px 24px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                maxWidth: 820,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: C.white,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Svg name="clipboard" size={18} color={C.primary} sw={1.75} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.primary,
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Coming soon
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: C.ink }}>
                  Downloadable diet charts, articles, and short video explainers on diabetes care and
                  lifestyle modification — updated regularly.
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
