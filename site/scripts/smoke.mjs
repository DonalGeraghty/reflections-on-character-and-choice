// Renders every page with react-dom/server and checks that key content appears.
// Run from site/:  npm run smoke
// Catches runtime errors (missing imports, bad data shapes) that the bundler
// will happily compile past.

import { createServer } from 'vite';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});


try {
  const { default: Home } = await server.ssrLoadModule('/src/pages/Home.jsx');
  const { default: ChapterPage } = await server.ssrLoadModule('/src/pages/ChapterPage.jsx');
  const { default: Sidebar } = await server.ssrLoadModule('/src/components/Sidebar.jsx');
  const { chapters, principles, meta } = await server.ssrLoadModule('/src/utils.js');
  const { explorerKeys } = await server.ssrLoadModule('/src/components/ReflectionExplorer.jsx');
  const expectedExplorerKeys = chapters.flatMap(ch => ch.reflections.map(r => `${ch.slug}/${r.slug}`));
  assert.deepEqual([...explorerKeys].sort(), [...expectedExplorerKeys].sort(),
    'every reflection must have exactly one reading aid, with no stale routes');

  const { createElement: h } = React;
  // react-dom/server encodes these characters in its output
  const encode = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/'/g, '&#x27;').replace(/"/g, '&quot;');
  const includes = (html, text) => html.includes(encode(text));
  const render = (element, url) =>
    renderToString(h(StaticRouter, { location: url }, element));

  // --- home ---
  const home = render(h(Home), '/');
  assert.ok(home.includes(meta.title), 'home: book title missing');
  assert.ok(home.includes(principles.phrase), 'home: principles phrase missing');
  assert.equal(
    (home.match(/theme-card/g) || []).length,
    principles.themes.length,
    'home: theme cards missing',
  );
  for (const t of principles.themes) {
    assert.ok(includes(home, t.title), `home: theme "${t.title}" missing`);
  }
  assert.ok(includes(home, 'Chapters'), 'home: chapter index missing');

  // --- sidebar ---
  const sidebar = render(h(Sidebar, { open: false, onClose: () => {} }), '/');
  for (const ch of chapters) {
    assert.ok(includes(sidebar, ch.title), `sidebar: "${ch.title}" missing`);
  }

  // --- every chapter page (through a real Route so useParams is populated) ---
  const routes = h(
    Routes,
    null,
    h(Route, { path: '/:chapterSlug/:reflectionSlug', element: h(ChapterPage) }),
    h(Route, { path: '/:chapterSlug', element: h(ChapterPage) }),
  );
  for (const ch of chapters) {
    const html = render(routes, `/${ch.slug}`);
    assert.ok(includes(html, ch.title), `chapter: "${ch.title}" title missing`);
    const expectedExplorers = ch.reflections.length;
    assert.equal((html.match(/class="reflection-explorer(?: |")/g) || []).length,
      expectedExplorers, `chapter ${ch.slug}: interactive illustrations missing or misplaced`);
    for (const r of ch.reflections) {
      assert.ok(includes(html, r.title), `chapter ${ch.slug}: reflection "${r.title}" missing`);
      assert.ok(includes(html, r.phrase), `chapter ${ch.slug}: phrase of "${r.title}" missing`);
      const section = html.split(`id="${r.slug}"`)[1]?.split('</section>')[0];
      assert.ok(section?.includes('reflection-explorer'), `reflection ${r.slug}: reading aid missing`);
    }
  }

  // --- deep link route renders the same page ---
  const deep = render(routes, '/stoic-wisdom/15-not-everything-that-leaves-is-a-loss');
  assert.ok(includes(deep, 'Not everything that leaves is a loss'), 'deep link target missing');

  console.log(`smoke: home, sidebar and all ${chapters.length} chapter pages render with expected content`);
} finally {
  await server.close();
}
