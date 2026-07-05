import { C } from '../constants/colors.js';

// All icons: 24x24 viewBox, stroke-based line art, 1.5px default stroke,
// round caps/joins. Per spec §7.11 — inline SVG, no icon font.
export const PATHS = {
  droplet:
    'M12 3c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z',

  heartbeat:
    'M3 12h5l2-4 3 8 2-4h4',

  scale:
    'M12 4v3 M6 7h12 M8 20h8 M12 7v13 M6 7l-3 6a3 3 0 0 0 6 0zM18 7l-3 6a3 3 0 0 0 6 0z',

  activity:
    'M3 12h4l3-8 4 16 3-8h4',

  clipboard:
    'M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z M6 5h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5h1a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M9 12h6 M9 16h4',

  stethoscope:
    'M6 3v5a4 4 0 0 0 8 0V3 M6 3h2 M12 3h2 M10 12v3a4 4 0 0 0 8 0v-2 M18 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',

  message:
    'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-6 4V5z',

  kidney:
    'M15 4c-2 0-3 1-3 2s-1-2-4-2-5 3-5 8 3 8 7 8 7-3 7-8c0-3-1-8-2-8z',

  testpipe:
    'M9 2h6 M10 2v17a2 2 0 0 0 4 0V2 M10 11h4',

  lungs:
    'M12 4v10 M9 8c-2 1-4 3-4 6 0 3 1 5 3 5 1 0 3-1 3-4V8z M15 8c2 1 4 3 4 6 0 3-1 5-3 5-1 0-3-1-3-4V8z',

  pill:
    'M4 12a5 5 0 0 1 5-5h6a5 5 0 0 1 0 10H9a5 5 0 0 1-5-5z M12 7v10',

  shoe:
    'M3 16c0-1 1-2 2-2h2l3-4 4 2 5 1c1 0 2 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z M10 10l1-2',

  body:
    'M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M8 21v-6a4 4 0 0 1 8 0v6',

  file:
    'M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M14 3v5h4 M9 13h6 M9 17h4',

  star: {
    d: 'M12 2l2.9 6.5 7.1.7-5.4 4.8 1.7 7L12 17.6 5.7 21l1.7-7L2 9.2l7.1-.7z',
    filled: true,
  },

  phone:
    'M5 4a1 1 0 0 1 1-1h3l2 5-2.5 1.8a12 12 0 0 0 5.7 5.7L16 13l5 2v3a1 1 0 0 1-1 1c-9 0-16-7-16-15z',

  whatsapp: {
    // Bootstrap Icons `whatsapp` (MIT). Rendered filled at its native 16×16 viewBox.
    d: 'M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z',
    viewBox: '0 0 16 16',
    filled: true,
  },

  calendar:
    'M4 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z M4 11h16 M8 3v4 M16 3v4',

  map:
    'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z M9 3v15 M15 6v15',

  arrowRight:
    'M5 12h14 M13 6l6 6-6 6',

  menu:
    'M4 7h16 M4 12h16 M4 17h16',

  x:
    'M6 6l12 12 M18 6L6 18',
};

/**
 * Inline SVG icon. Each entry in PATHS is either:
 *   - a string `d`               (stroked line-art, 24×24 viewBox), or
 *   - `{ d, viewBox?, filled? }` (for brand marks / non-default variants).
 *
 * @param {object} props
 * @param {keyof typeof PATHS} props.name
 * @param {number} [props.size=20]      — width & height in px
 * @param {string} [props.color]        — stroke color (line-art) or fill color (brand)
 * @param {number} [props.sw=1.5]       — stroke width (line-art only)
 * @param {string} [props.title]        — optional a11y label (icon becomes non-decorative)
 * @param {object} [props.style]        — style override
 */
export default function Svg({
  name,
  size = 20,
  color = C.primary,
  sw = 1.5,
  title,
  style,
  ...rest
}) {
  const entry = PATHS[name];
  if (!entry) return null;

  const isObj    = typeof entry === 'object';
  const d        = isObj ? entry.d : entry;
  const viewBox  = isObj && entry.viewBox ? entry.viewBox : '0 0 24 24';
  const filled   = isObj && entry.filled;
  const decorative = !title;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={filled ? color : 'none'}
      stroke={filled ? 'none' : color}
      strokeWidth={filled ? undefined : sw}
      strokeLinecap={filled ? undefined : 'round'}
      strokeLinejoin={filled ? undefined : 'round'}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={title}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      {...rest}
    >
      {!decorative && <title>{title}</title>}
      <path d={d} />
    </svg>
  );
}
