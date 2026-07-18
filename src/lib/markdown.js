// Tiny markdown → HTML renderer. Deliberately scoped to the subset the
// clinic team will realistically use:
//
//   Block:  # ## ### #### headings, paragraphs, unordered lists (-, *, +),
//           ordered lists (1.), blockquotes (>), horizontal rule (---),
//           fenced code (```), and image-only lines (![alt](src)).
//   Inline: **bold**, *italic* / _italic_, `code`, [text](url),
//           ![alt](src), and hard line breaks (two trailing spaces).
//
// What it deliberately does NOT do:
//   - Raw HTML passthrough (content is trusted anyway, but we keep the
//     output surface small so we can't accidentally emit broken markup).
//   - Tables, footnotes, task lists, nested lists.
//   - Any auto-linking beyond explicit [text](url).
//
// If a post ever needs richer content, we swap this file for `marked`
// without changing any callers — the public API is `renderMarkdown(src)`.

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/`/g, '&#96;');
}

// Inline rendering — runs on a single line/paragraph of already-known-text.
function renderInline(src) {
  // Placeholder swap so we don't re-process the internals of code spans.
  const codeSpans = [];
  let out = src.replace(/`([^`]+)`/g, (_, code) => {
    codeSpans.push(escapeHtml(code));
    return `\u0000CODE${codeSpans.length - 1}\u0000`;
  });

  out = escapeHtml(out);

  // Images  ![alt](src)
  out = out.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_, alt, url, title) => {
      const t = title ? ` title="${escapeAttr(title)}"` : '';
      return `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async"${t}>`;
    },
  );

  // Links  [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_, text, url, title) => {
      const t = title ? ` title="${escapeAttr(title)}"` : '';
      const isExternal = /^https?:/i.test(url);
      const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeAttr(url)}"${t}${extra}>${text}</a>`;
    },
  );

  // Bold  **text** or __text__
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_]+)__/g,     '<strong>$1</strong>');

  // Italic  *text* or _text_  (single, not adjacent to word chars)
  out = out.replace(/(^|[^\w*])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^\w_])_([^_\n]+)_(?!\w)/g,   '$1<em>$2</em>');

  // Hard line break — two trailing spaces before a newline. We collapse
  // internal newlines to spaces at block time, so this is applied earlier
  // (see block renderer) via a sentinel — nothing to do here.

  // Restore code spans.
  out = out.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => `<code>${codeSpans[Number(i)]}</code>`);

  return out;
}

// Turn a paragraph's raw multi-line text into a single line, honouring
// the "two trailing spaces = <br>" markdown convention.
function paragraphInline(text) {
  const withBreaks = text.replace(/ {2}\r?\n/g, '\u0000BR\u0000');
  const joined = withBreaks.replace(/\r?\n/g, ' ');
  return renderInline(joined).replace(/\u0000BR\u0000/g, '<br>');
}

// Block rendering — line-by-line state machine.
export function renderMarkdown(src) {
  const lines = String(src ?? '').replace(/\r\n/g, '\n').split('\n');
  const out = [];

  let i = 0;
  let paraBuf = [];

  const flushPara = () => {
    if (paraBuf.length === 0) return;
    const text = paraBuf.join('\n');
    paraBuf = [];

    // Image-only paragraph — unwrap to a bare <figure> for nicer styling.
    const onlyImage = /^!\[[^\]]*\]\([^)]+\)$/.test(text.trim());
    if (onlyImage) {
      out.push(`<figure class="drcps-md-figure">${renderInline(text.trim())}</figure>`);
      return;
    }

    out.push(`<p>${paragraphInline(text)}</p>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // Blank line → paragraph boundary.
    if (line.trim() === '') {
      flushPara();
      i++;
      continue;
    }

    // Fenced code  ```lang
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      flushPara();
      const lang = fence[1];
      const code = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // consume closing fence (or run off end)
      const cls = lang ? ` class="language-${escapeAttr(lang)}"` : '';
      out.push(`<pre><code${cls}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    // ATX heading  # .. ######
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      out.push(`<h${level}>${renderInline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule  --- or *** or ___
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      flushPara();
      out.push('<hr>');
      i++;
      continue;
    }

    // Blockquote  > text
    if (/^\s*>\s?/.test(line)) {
      flushPara();
      const collected = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        collected.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      out.push(`<blockquote><p>${paragraphInline(collected.join('\n'))}</p></blockquote>`);
      continue;
    }

    // Unordered list  - / * / +
    if (/^\s*[-*+]\s+/.test(line)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ''));
        i++;
      }
      out.push(`<ul>${items.map((t) => `<li>${renderInline(t)}</li>`).join('')}</ul>`);
      continue;
    }

    // Ordered list  1. 2. 3.
    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      out.push(`<ol>${items.map((t) => `<li>${renderInline(t)}</li>`).join('')}</ol>`);
      continue;
    }

    // Otherwise it's paragraph content.
    paraBuf.push(line);
    i++;
  }

  flushPara();
  return out.join('\n');
}
