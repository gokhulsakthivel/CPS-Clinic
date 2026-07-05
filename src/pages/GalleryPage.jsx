import { C } from '../constants/colors.js';
import { galleryGroups } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import GalleryFrame from '../ui/GalleryFrame.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// /gallery — Airbnb-style photo tour. Groups render as titled editorial
// sections; first item in each group spans 2 cols on desktop for rhythm.

function GroupSection({ group }) {
  return (
    <section id={group.id} style={{ scrollMarginTop: 80 }}>
      <FadeIn>
        <div style={{ marginBottom: 20, maxWidth: 720 }}>
          <h2
            style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              color: C.ink,
              letterSpacing: '-0.3px',
              lineHeight: 1.25,
            }}
          >
            {group.title}
          </h2>
          {group.caption && (
            <p
              style={{
                marginTop: 8,
                fontSize: 15,
                lineHeight: 1.6,
                color: C.muted,
              }}
            >
              {group.caption}
            </p>
          )}
        </div>
      </FadeIn>
      <div className="drcps-gallery-group">
        {group.items.map((item, i) => (
          <FadeIn key={item.label} delay={(i % 3) * 60}>
            <GalleryFrame
              label={item.label}
              aspect={i === 0 ? 'hero' : item.aspect}
              icon={item.icon}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function GroupJumpBar() {
  return (
    <FadeIn delay={80}>
      <div
        role="navigation"
        aria-label="Jump to gallery section"
        className="drcps-jumpbar"
      >
        {galleryGroups.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="drcps-tap"
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: C.primary,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {g.title.replace(/ &.+$/, '')}
          </a>
        ))}
      </div>
    </FadeIn>
  );
}

export default function GalleryPage() {
  useDocumentHead(pageMeta.gallery);

  const totalPhotos = galleryGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Photo tour"
        title="Inside DR.CPS Clinic"
        lead={`A walkthrough of the clinic — reception, consultation, diagnostic bays, pharmacy, and how to find us. ${totalPhotos} photos organised by area.`}
        aside={<GroupJumpBar />}
      />

      <section style={{ background: C.white }}>
        <div
          className="drcps-container"
          style={{
            padding: '48px var(--pad-x) 72px',
            display: 'grid',
            gap: 56,
          }}
        >
          {galleryGroups.map((group) => (
            <GroupSection key={group.id} group={group} />
          ))}

          <FadeIn>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                paddingTop: 8,
              }}
            >
              <a
                href="/contact"
                className="drcps-btn drcps-btn-primary"
                style={{
                  background: C.primary,
                  color: C.white,
                  padding: '13px 22px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: 44,
                }}
              >
                <Svg name="calendar" size={16} color={C.white} sw={1.75} />
                Book a visit to see it yourself
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
