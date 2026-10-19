// Convert ../README.md into src/content/content.js.
// Run from site/:  npm run convert
// README.md remains the manuscript of record; regenerate with this script
// after editing it. Never edit the generated content directly.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = dirname(dirname(fileURLToPath(import.meta.url)));
const source = readFileSync(join(siteDir, '..', 'README.md'), 'utf8');
const lines = source.replace(/\r\n/g, '\n').split('\n');

const slugify = (s) =>
  s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();

// Fail before generating content if manuscript navigation or structure drifts.
const headings = lines.flatMap((line, index) => {
  const match = line.match(/^(#{1,3}) (.+)$/);
  return match ? [{ level: match[1].length, text: match[2], index }] : [];
});
const anchors = new Set(headings.map(({ text }) => slugify(text)));
for (const [, label, anchor] of source.matchAll(/\[([^\]]+)\]\(#([^)]+)\)/g)) {
  if (!anchors.has(anchor)) throw new Error(`Broken manuscript link: ${label} (#${anchor})`);
}
const tocHeading = headings.find((h) => h.text === 'Table of Contents');
if (!tocHeading) throw new Error('Missing Table of Contents');
const principlesHeading = headings.find((h) => h.text === 'Guiding Principles');
if (!principlesHeading) throw new Error('Missing Guiding Principles');
const chapterHeadings = headings.filter((h) => h.index > tocHeading.index);
const tocEnd = chapterHeadings[0]?.index ?? lines.length;
const actualEntries = [...lines.slice(tocHeading.index + 1, tocEnd).join('\n')
  .matchAll(/^( *)- \[([^\]]+)\]\(#([^)]+)\)$/gm)]
  .map(([, indent, text, anchor]) => ({ indent: indent.length, text, anchor }));
const expectedEntries = [principlesHeading, ...chapterHeadings]
  .map((h) => ({ indent: h.level === 3 ? 2 : 0, text: h.text, anchor: slugify(h.text) }));
if (JSON.stringify(actualEntries) !== JSON.stringify(expectedEntries)) {
  throw new Error('Table of Contents must match every chapter and reflection in manuscript order');
}
let reflectionNumber = 0;
for (const heading of chapterHeadings) {
  const nextLine = lines.slice(heading.index + 1).find((line) => line.trim());
  if (!/^> (?!\[!)\S/.test(nextLine || '')) {
    throw new Error(`Missing opening phrase: ${heading.text}`);
  }
  if (heading.level === 2) reflectionNumber = 0;
  else if (!heading.text.startsWith(`${++reflectionNumber}. `)) {
    throw new Error(`Reflection numbering out of sequence: ${heading.text}`);
  }
}

// ---------- section scan ----------
const sections = []; // { heading, start, end }
let i = 0;
while (i < lines.length) {
  const m = lines[i].match(/^## (.+)$/);
  if (m) {
    if (sections.length) sections[sections.length - 1].end = i;
    sections.push({ heading: m[1], start: i, end: lines.length });
  }
  i++;
}

// ---------- block parsing ----------
function parseBlocks(body) {
  const blocks = [];
  let para = [];
  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: 'p', text: para.join(' ') });
      para = [];
    }
  };
  let j = 0;
  while (j < body.length) {
    const line = body[j];
    if (!line.trim()) { flushPara(); j++; continue; }
    if (line.startsWith('> [!')) {
      flushPara();
      const variant = line.match(/^> \[!(\w+)\]/)?.[1].toLowerCase();
      // gather continuation lines
      const parts = [line.replace(/^> \[!\w+\]\s*/, '')];
      let k = j + 1;
      while (k < body.length && body[k].startsWith('>')) {
        parts.push(body[k].replace(/^>\s?/, ''));
        k++;
      }
      blocks.push({ type: 'callout', variant, text: parts.join(' ').trim() });
      j = k;
      continue;
    }
    if (line.startsWith('|')) {
      flushPara();
      const rows = [];
      let k = j;
      while (k < body.length && body[k].startsWith('|')) {
        rows.push(body[k]);
        k++;
      }
      const cells = (row) => row.replace(/^\|/, '').replace(/\|$/, '')
        .split('|').map((c) => c.trim());
      const align = cells(rows[1]).map((c) =>
        /^:-+:$/.test(c) ? 'center' : /-+:$/.test(c) ? 'right' : 'left');
      blocks.push({
        type: 'table',
        header: cells(rows[0]),
        align,
        rows: rows.slice(2).map(cells),
      });
      j = k;
      continue;
    }
    const boldOnly = line.match(/^\*\*(.+)\*\*$/);
    if (boldOnly && !line.startsWith('**A question')) {
      flushPara();
      blocks.push({ type: 'subtitle', text: boldOnly[1] });
      j++;
      continue;
    }
    para.push(line);
    j++;
  }
  flushPara();
  return blocks;
}

// ---------- top meta ----------
const meta = { title: '', subtitle: '', tip: null };
{
  let k = 0;
  while (k < sections[0].start) {
    const t = lines[k].match(/^# (.+)$/);
    if (t) meta.title = t[1];
    const s = lines[k].match(/^\*(.+)\*$/);
    if (s && !meta.subtitle) meta.subtitle = s[1];
    if (lines[k].startsWith('> [!')) {
      const variant = lines[k].match(/^> \[!(\w+)\]/)[1].toLowerCase();
      const parts = [lines[k].replace(/^> \[!\w+\]\s*/, '')];
      let m = k + 1;
      while (lines[m]?.startsWith('>')) {
        parts.push(lines[m].replace(/^>\s?/, ''));
        m++;
      }
      meta.tip = { variant, text: parts.join(' ').trim() };
      k = m;
      continue;
    }
    k++;
  }
}

// ---------- guiding principles ----------
function parsePrinciples(section) {
  const body = lines.slice(section.start + 1, section.end);
  let phrase = '';
  const intro = [];
  const themes = [];
  let outro = [];
  let current = null;
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const text = para.join(' ');
    para = [];
    if (current) {
      if (/^\*Explore:\*/.test(text)) {
        const links = [];
        const re = /\[([^\]]+)\]\(#([^)]+)\)/g;
        let m;
        while ((m = re.exec(text))) links.push({ label: m[1], target: m[2] });
        current.links = links;
        current = null;
      } else if (current.text) {
        outro.push(text);
      } else {
        current.text = text;
      }
    } else if (!phrase) {
      phrase = text;
    } else if (themes.length === 0) {
      intro.push(text);
    } else {
      outro.push(text);
    }
  };
  for (const line of body) {
    if (!line.trim() || line.trim() === '---') { flush(); continue; }
    const h = line.match(/^### (.+)$/);
    if (h) {
      flush();
      const [first, ...rest] = h[1].split(' ');
      const isEmoji = !/^[\x00-\x7F]+$/.test(first);
      current = { emoji: isEmoji ? first : '', title: (isEmoji ? rest.join(' ') : h[1]) };
      themes.push(current);
      continue;
    }
    if (line.startsWith('>')) { para.push(line.replace(/^>\s?/, '')); continue; }
    para.push(line);
  }
  flush();
  return { phrase, intro, themes, outro };
}
const principles = parsePrinciples(sections.find((s) => s.heading === 'Guiding Principles'));

// ---------- chapters & reflections ----------
const chapters = [];
for (const sec of sections) {
  if (sec.heading === 'Guiding Principles' || sec.heading === 'Table of Contents') continue;
  const body = lines.slice(sec.start + 1, sec.end);
  const chapter = { title: sec.heading, slug: slugify(sec.heading), phrase: '', reflections: [] };
  let refl = null;
  let buf = [];
  const flush = () => {
    if (!refl) return;
    const blocks = parseBlocks(buf);
    if (blocks.length && blocks[0].type === 'p' && !refl.phrase) {
      // phrase was captured separately; nothing to do
    }
    refl.blocks = blocks;
  };
  let phrasePending = false;
  for (const line of body) {
    const h = line.match(/^### (\d+)\. (.+)$/);
    if (h) {
      flush();
      refl = {
        number: Number(h[1]),
        title: h[2],
        slug: `${h[1]}-${slugify(h[2])}`,
        phrase: '',
        blocks: [],
      };
      chapter.reflections.push(refl);
      buf = [];
      phrasePending = true;
      continue;
    }
    if (line.startsWith('> [!')) { buf.push(line); continue; }
    if (line.startsWith('>') && phrasePending && refl) {
      refl.phrase = line.replace(/^>\s?/, '');
      phrasePending = false;
      continue;
    }
    if (!line.startsWith('---')) buf.push(line);
    else if (refl) buf.push('');
  }
  flush();
  // chapter phrase = blockquote before first reflection
  for (let k = 0; k < body.length; k++) {
    if (body[k].match(/^### \d+\./)) break;
    if (body[k].startsWith('>')) {
      chapter.phrase = body[k].replace(/^>\s?/, '');
      break;
    }
  }
  chapters.push(chapter);
}

// ---------- resolve internal links ----------
const bySlug = new Map();
for (const ch of chapters)
  for (const r of ch.reflections) bySlug.set(r.slug, { chapter: ch.slug, reflection: r.slug });
const linkTarget = (slug) => bySlug.get(slug) || null;

// verify every explore link resolves
const unresolved = [];
for (const t of principles.themes)
  for (const l of t.links || []) if (!linkTarget(l.target)) unresolved.push(l.target);

if (unresolved.length) throw new Error(`Unresolved explore links: ${unresolved.join(', ')}`);

const content = { meta, principles, chapters };
const js =
  `// AUTO-GENERATED by scripts/convert-content.mjs from ../README.md — do not edit lightly.\n` +
  `// README.md is the manuscript of record. Edit there, then run: npm run convert\n` +
  `export default ${JSON.stringify(content, null, 2)};\n`;

writeFileSync(join(siteDir, 'src', 'content', 'content.js'), js);
console.log(`chapters: ${chapters.length}`);
for (const ch of chapters) console.log(`  - ${ch.title}: ${ch.reflections.length} reflections`);
console.log(`themes: ${principles.themes.length}`);
console.log(`unresolved explore links: ${unresolved.length ? unresolved.join(', ') : 'none'}`);
