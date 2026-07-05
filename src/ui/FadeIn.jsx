import { useEffect, useRef, useState } from 'react';

/**
 * useFadeIn — attaches an IntersectionObserver and returns a ref + visibility flag.
 * One-shot: once the element becomes visible, the observer disconnects.
 * Per spec §8.5: threshold 0.08, rootMargin fires slightly before fully in view.
 */
export function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who cannot see the animation anyway — mark visible immediately
    // so nothing stays stuck at opacity 0 if IO fires late or not at all.
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

/**
 * FadeIn — wraps content in a div that fades + slides up on scroll into view.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0]   — stagger delay in ms (0/60/120/180…)
 * @param {'div'|'section'|'span'|'li'} [props.as='div']
 * @param {object} [props.style]
 * @param {string} [props.className]
 */
export default function FadeIn({
  children,
  delay = 0,
  as: Tag = 'div',
  style,
  className = '',
  ...rest
}) {
  const [ref, visible] = useFadeIn();
  const cls = ['drcps-fade', visible && 'drcps-visible', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
