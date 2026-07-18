import { C } from '../constants/colors.js';

/**
 * Render a pre-rendered HTML string (from src/lib/markdown.js) inside a
 * styled prose container. Content is trusted — it comes from markdown
 * files committed to the repo by clinic staff, not from user input — so
 * we render it via dangerouslySetInnerHTML without runtime sanitisation.
 *
 * The wrapping div gets a `drcps-prose` class; typography rules live in
 * global.css so posts share styling with any other markdown surface we
 * add later (e.g. resource guides).
 *
 * @param {object} props
 * @param {string} props.html   — HTML string returned by renderMarkdown()
 */
export default function Markdown({ html }) {
  if (!html) return null;
  return (
    <div
      className="drcps-prose"
      style={{ color: C.ink }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
