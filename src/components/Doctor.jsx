import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { doctor } from '../constants/content.js';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';

function PhotoFrame({ initials }) {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 'clamp(56px, 9vw, 96px)',
          color: '#C9D3DC',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
      <span
        style={{
          fontSize: 12,
          color: C.muted,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
        }}
      >
        Photograph coming soon
      </span>
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
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}

export default function Doctor() {
  return (
    <section style={{ background: C.white }}>
      <div
        className="drcps-container drcps-2col drcps-2col--wide-r"
        style={{
          padding: '64px var(--pad-x) 72px',
          alignItems: 'start',
        }}
      >
        {/* Photo */}
        <FadeIn>
          <div style={{ maxWidth: 420, marginInline: 'auto', width: '100%' }}>
            <PhotoFrame initials={doctor.initials} />
          </div>
        </FadeIn>

        {/* Copy */}
        <FadeIn delay={80}>
          <div style={{ maxWidth: 620 }}>
            <div
              style={{
                fontSize: 12,
                color: C.green,
                fontWeight: 600,
                letterSpacing: '0.4px',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              Meet the doctor
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 3.6vw, 32px)',
                fontWeight: 700,
                color: C.ink,
                letterSpacing: '-0.3px',
                lineHeight: 1.15,
              }}
            >
              {doctor.name}
            </h2>
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

            {/* Credential chips */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {doctor.credentials.slice(0, 5).map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>

            <p
              style={{
                marginTop: 20,
                fontSize: 15.5,
                lineHeight: 1.65,
                color: C.muted,
              }}
            >
              {doctor.homepageIntro}
            </p>

            <blockquote
              style={{
                marginTop: 22,
                marginLeft: 0,
                marginRight: 0,
                borderLeft: `3px solid ${C.green}`,
                paddingLeft: 18,
                fontStyle: 'italic',
                fontSize: 15,
                lineHeight: 1.65,
                color: C.ink,
              }}
            >
              “{doctor.quote}”
            </blockquote>

            <Link
              to="/about#doctor"
              className="drcps-nav-link"
              style={{
                marginTop: 22,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: C.primary,
                fontWeight: 600,
                fontSize: 14.5,
                minHeight: 32,
              }}
            >
              Learn more about Dr. Chakravarthi
              <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
