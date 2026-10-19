# Site

A React (Vite) reading site for *Reflections on Character and Choice*.

## How the content works

The manuscript of record is the repository's top-level `README.md`. The site
renders a generated copy of it:

- `scripts/convert-content.mjs` parses `../README.md` into
  `src/content/content.js` (chapters, reflections, phrases, tables and callouts
  as structured data).
- After editing the manuscript, run `npm run convert` and commit the updated
  `content.js` so the site stays in step.
- Starting the dev server, building, or running smoke checks also regenerates
  content automatically. Restart the dev server after manuscript edits.
- The deploy workflow regenerates content from `README.md` on every push, so
  what is published always matches the manuscript.

## Commands

| Command | Purpose |
| :--- | :--- |
| `npm install` | Install dependencies (first run only) |
| `npm run convert` | Regenerate `src/content/content.js` from `../README.md` |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run smoke` | Render every page server-side and check expected content |
| `npm run preview` | Serve the production build locally |

Conversion validates manuscript links, contents entries, reflection numbering,
and opening phrases. An invalid manuscript stops the build with an error.

## Design notes

- Every reflection includes an optional reading aid: a short sequence, comparison,
  set of considerations, reveal or scenario selector. The budget reflection has
  a clearly illustrative account showing how small entries affect the total.
- Content for the reading aids lives in `src/content/explorers.js`; components
  live in `src/components/ReflectionExplorer.jsx` and `GuidedExplorer.jsx`.
  These supplement the manuscript. Selections last only while the component is
  mounted; they are not saved as personal records or completion scores.
- Calm, book-like styling: warm paper tones, serif type, one restrained accent.
- Dark mode uses charcoal surfaces, soft white text and a muted blue accent.
- Light and dark themes, remembered per visitor, defaulting to the system
  preference.
- Sidebar navigation with expandable chapters; reflection deep links use
  `#/chapter/reflection` routes.
- Hash routing and a relative asset base, so the build works on GitHub Pages
  without server configuration.
