import { useId, useState } from 'react';
import { C } from '../constants/colors.js';

/**
 * Single-item accordion (FAQ row). Per spec §7.7 — max-height transition
 * (200–400ms) with a `+` glyph that rotates 45° to become `×` when open.
 * Consumers map an array of FAQs through this component.
 *
 * @param {object} props
 * @param {string} props.question
 * @param {React.ReactNode} props.answer
 * @param {boolean} [props.defaultOpen=false]
 */
export default function Accordion({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <div
      style={{
        borderBottom: `1px solid ${C.border}`,
        padding: '4px 0',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          width: '100%',
          padding: '18px 4px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: C.ink,
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>{question}</span>
        <span
          className={`drcps-accordion-toggle ${open ? 'open' : ''}`}
          aria-hidden="true"
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: C.primary,
            lineHeight: 1,
            display: 'inline-block',
            width: 22,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        id={bodyId}
        role="region"
        className={`drcps-accordion-body ${open ? 'open' : ''}`}
      >
        <div
          style={{
            padding: '0 4px 18px',
            color: C.muted,
            fontSize: 14.5,
            lineHeight: 1.65,
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}
