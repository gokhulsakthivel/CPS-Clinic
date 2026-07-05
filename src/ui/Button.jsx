import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import Svg from './Svg.jsx';

// Three button variants per spec §7.1 — primary (blue fill), outline (blue border),
// green (WhatsApp / secondary CTA). All share the .drcps-btn base class for
// press feedback (scale 0.97) and color-only hover transitions. Border-radius
// is locked at 8px on all CTAs.

const VARIANTS = {
  primary: {
    background: C.primary,
    color: C.white,
    border: 'none',
    padding: '13px 22px',
  },
  outline: {
    background: 'transparent',
    color: C.primary,
    border: `1.5px solid ${C.primary}`,
    padding: '12px 22px',
  },
  green: {
    background: C.green,
    color: C.white,
    border: 'none',
    padding: '12px 22px',
  },
};

/**
 * @param {object} props
 * @param {'primary'|'outline'|'green'} [props.variant='primary']
 * @param {string} [props.to]          — renders react-router <Link>
 * @param {string} [props.href]        — renders <a> (external / tel: / wa.me/)
 * @param {string} [props.icon]        — Svg name key (renders 15px icon at left)
 * @param {string} [props.iconColor]   — explicit icon stroke/fill color (overrides variant default)
 * @param {boolean} [props.fullWidth]  — stretches to 100% (used on form submit)
 * @param {string} [props.ariaLabel]   — required when children is icon-only
 */
export default function Button({
  variant = 'primary',
  to,
  href,
  icon,
  iconColor,
  fullWidth,
  ariaLabel,
  children,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const baseStyle = {
    ...v,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    minHeight: 44,
    width: fullWidth ? '100%' : undefined,
    textDecoration: 'none',
    lineHeight: 1,
    ...style,
  };
  const cls = `drcps-btn drcps-btn-${variant}`;

  const inner = (
    <>
      {icon && (
        <Svg
          name={icon}
          size={16}
          color={iconColor || (variant === 'outline' ? C.primary : C.white)}
          sw={1.75}
        />
      )}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} style={baseStyle} aria-label={ariaLabel} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} style={baseStyle} aria-label={ariaLabel} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      style={baseStyle}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {inner}
    </button>
  );
}
