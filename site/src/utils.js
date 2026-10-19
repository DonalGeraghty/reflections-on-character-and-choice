import content from './content/content.js';

export const { meta, principles, chapters } = content;

// Reflection slug -> { chapter, reflection } for resolving internal links.
export const reflectionIndex = (() => {
  const map = new Map();
  for (const ch of chapters) {
    for (const r of ch.reflections) {
      map.set(r.slug, { chapter: ch.slug, reflection: r.slug });
    }
  }
  return map;
})();

export function reflectionUrl(target) {
  const loc = reflectionIndex.get(target.replace(/^#/, ''));
  return loc ? `/${loc.chapter}/${loc.reflection}` : null;
}

// Minimal inline markdown: **bold**, *italic*, [text](#anchor).
export function parseInline(text) {
  const parts = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push({ t: 'b', text: m[1] });
    else if (m[2] !== undefined) parts.push({ t: 'i', text: m[2] });
    else if (m[3] !== undefined) parts.push({ t: 'a', text: m[3], target: m[4] });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
