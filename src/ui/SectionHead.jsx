import { C } from '../constants/colors.js';

/**
 * Section eyebrow + heading + optional subtitle. Used by every content
 * section on the home page and inner pages. Per spec §7.4.
 */
export default function SectionHead({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div style={{ maxWidth: 720, textAlign: align }}>
      <div
        style={{
          fontSize: 12,
          color: C.green,
          fontWeight: 600,
          letterSpacing: '0.4px',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)',
          fontWeight: 700,
          color: C.ink,
          letterSpacing: '-0.3px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: 12,
            fontSize: 15.5,
            lineHeight: 1.65,
            color: C.muted,
            maxWidth: 620,
            marginInline: align === 'center' ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
