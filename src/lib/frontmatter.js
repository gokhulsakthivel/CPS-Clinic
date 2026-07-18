// Tiny YAML frontmatter parser — deliberately restricted to the schema we
// document for `content/updates/<slug>/index.md`. Handles:
//
//   key: value            → string (quotes stripped)
//   key: 42               → number
//   key: 2026-07-18       → string (kept as-is; ISO date is a string here)
//   key: true / false     → boolean
//   key: [a, "b c", d]    → string[]
//   key: >                → folded scalar (join on space)
//     multi
//     line text
//   key: |                → literal scalar (join on newline)
//     line 1
//     line 2
//   # comment             → ignored
//
// Anything outside this shape is returned verbatim as a string; the loader
// decides whether to warn. Missing frontmatter returns `{ data: {}, body }`.

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function stripQuotes(s) {
  const m = s.match(/^(['"])(.*)\1$/);
  return m ? m[2] : s;
}

function parseScalar(raw) {
  const v = raw.trim();
  if (v === '' || v === '~' || v === 'null') return null;
  if (v === 'true')  return true;
  if (v === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return stripQuotes(v);
}

function parseInlineArray(raw) {
  // "[a, \"b c\", d]" → ["a", "b c", "d"]
  const inner = raw.trim().replace(/^\[|\]$/g, '');
  if (!inner.trim()) return [];
  const out = [];
  let buf = '';
  let quote = null;
  for (const ch of inner) {
    if (quote) {
      if (ch === quote) { quote = null; continue; }
      buf += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ',') {
      out.push(parseScalar(buf));
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.trim() !== '') out.push(parseScalar(buf));
  return out;
}

export function parseFrontmatter(source) {
  const match = source.match(FM_RE);
  if (!match) return { data: {}, body: source };

  const yaml = match[1];
  const body = source.slice(match[0].length);
  const data = {};

  const lines = yaml.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) { i++; continue; }

    const kv = line.match(/^([\w-]+)\s*:\s*(.*)$/);
    if (!kv) { i++; continue; }

    const key = kv[1];
    let value = kv[2];

    if (value === '>' || value === '|') {
      const folded = value === '>';
      const collected = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
        collected.push(lines[i].replace(/^ {2}/, ''));
        i++;
      }
      const joined = folded
        ? collected.join(' ').replace(/\s+/g, ' ').trim()
        : collected.join('\n').trim();
      data[key] = joined;
      continue;
    }

    if (value.startsWith('[')) {
      data[key] = parseInlineArray(value);
      i++;
      continue;
    }

    data[key] = parseScalar(value);
    i++;
  }

  return { data, body };
}
