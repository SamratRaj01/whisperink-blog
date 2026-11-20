# WhisperInk Archive — React

An archive of dark fiction (stories, verse, reflections) by **Megha Bisht**,
migrated from a single-file design export into a component-based React app
(Vite + React 18).

## Run it

```bash
npm install
npm run dev      # start the dev server (Vite prints a local URL)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy to GitHub Pages

This project is configured for GitHub Pages with a repo-relative Vite base path.

1. In GitHub, open the repository settings and set Pages to deploy from GitHub Actions.
2. Push to `main`.
3. The workflow in `.github/workflows/deploy.yml` will build `dist/` and publish it.

If you see a `main.jsx` 404 in the browser, it usually means Pages is serving the source tree instead of the built Vite output. The workflow above prevents that.

> **On "requirements":** JavaScript projects declare their dependencies in
> **`package.json`** (installed with `npm install`) — that file is the React
> equivalent of a Python `requirements.txt`.

## Adding a story

Every story is one Markdown file in `content/stories/`. The file name is the
story's URL, so `content/stories/the-life-we-carry.md` is served at
`/whisperink-blog/stories/the-life-we-carry/`.

```md
---
title: The Life We Carry
genre: verse            # horror | verse | reflections | heart | folklore | sitcom
teaser: The only shoulders that ever caught our tears have always been our own.
featured: true          # optional: show in "Recently Recovered"
published: 2024-09-02   # optional: shown in the reader; newest stories list first
cw: …                   # optional: content warning above the story
---

## A heading

A paragraph with *italics* and **emphasis**.
Single line breaks are kept, so verse keeps its shape.

***

`***` on its own line is a scene break.
```

- **Required:** `title`, `genre`, `teaser`. Everything else is optional.
- **Derived automatically:** read time (≈230 words/min), shelf counts and
  collection headers, and the cover colours (a per-story variation of the
  genre's palette).
- **Optional overrides:** `readTime`, `cover: ["#hex", "#hex"]`, `foil`,
  `category` (the reader's small heading), `archiveLabel` (shown when there's
  no date), `coda` (closing line under the story), and `position` (ordering
  for undated stories).
- **No body yet?** Leave the body empty. The reader shows the teaser and
  "this manuscript is still being recovered…".
- **Never rename a published file.** The file name is the link people have
  shared.

The build checks every file and stops with a plain-language message if
something is wrong: a missing field, an unknown genre or field name, raw HTML,
or unsupported Markdown such as lists or images. In `npm run dev`, adding,
editing or deleting a story file reloads the page.

## Architecture / pattern

The app follows a **data-driven, component-per-concern** structure. Content
lives as Markdown, design data as plain JS, components are presentational, and
one hook owns all interactive state.

```
content/stories/*.md           # ← the stories (one file per story)
scripts/vite-content-plugin.js # builds the catalogue, story bodies & per-story pages

src/
├── main.jsx                 # entry — mounts <App /> with config props
├── App.jsx                  # composition root: library + reader/notice overlays
├── config.js                # editable presentation props (tagline, mood, accent…)
│
├── data/                    # ← content & design data (no JSX)
│   ├── catalogue.js         #   story metadata + lazy body loader + derived counts
│   ├── genres.js            #   genre spines + per-genre & section metadata
│   ├── motifs.js            #   hand-drawn SVG ink motifs
│   └── moods.js             #   mood background washes
│
├── hooks/
│   ├── useLibrary.js        # all interactive state (genre / open story / font size)
│   └── useRoute.js          # tiny URL router: library ↔ stories/<slug>/
│
├── utils/
│   └── gradients.js         # cover & spine gradients, derived cover colours
│
├── styles/
│   ├── theme.js             # shared design tokens (fonts, colours)
│   └── index.css            # reset, keyframes, hover/focus states, responsive switches
│
└── components/              # ← presentation, grouped by concern
    ├── Motif.jsx            #   renders an ink motif tinted via currentColor
    ├── atmosphere/          #   Backdrop, Fog, Embers, Vignette, FilmGrain, RoughFilter
    ├── layout/              #   TopBar, Hero, Footer, StillBuilding (notice dialog)
    ├── shelf/               #   Shelf, GenreSpine, Lamp
    ├── stories/             #   FeaturedSection, StoryCard, StoryLink, ComingSoon
    └── reading/             #   ReadingView, ReadingToolbar, ContentWarning, StoryBlock
```

### How content flows

1. `scripts/vite-content-plugin.js` reads `content/stories/*.md` at build time
   (and on demand in dev). It validates each file and exposes
   `virtual:whisperink-catalogue`, the metadata for every story with no story
   text.
2. Each story body becomes its own lazily-loaded chunk of plain data blocks
   (`{ type: 'h' | 'p' | 'hr', runs }`), fetched only when that story is
   opened. The client ships no Markdown parser, and story text is never
   rendered as HTML.
3. After the build, the plugin writes `dist/stories/<slug>/index.html` for every
   story, with that story's title and teaser in the `<title>` and Open Graph
   tags (link previews on WhatsApp, iMessage, etc.), plus a `404.html` SPA
   fallback. These pages rely on the absolute `base` in `vite.config.js`.

### Conventions

- **Data vs. presentation:** everything editorial lives in `content/` (story
  text and metadata) or `src/data/` (genre copy, colours, motifs).
  `genres.js` and `utils/gradients.js` are also imported by the build plugin,
  so they must stay plain, import-free JS.
- **State:** `useLibrary()` is the single source of interactive truth. The
  open story is derived from the URL, so stories can be shared and refreshed,
  and Back/Forward work. Components receive state and callbacks as props.
- **Styling:** dynamic, per-item values (gradients, motif colours) and fluid
  sizes (`clamp()`) are inline styles built from data. Reusable interaction
  states (hover, focus) and the few layout switches that need media queries are
  CSS classes in `index.css` (`.wi-btn`, `.wi-link`, `.wi-card`, `.wi-spine`,
  `.wi-topbar`, `.wi-card-grid`, …). Shared fonts and colours come from
  `styles/theme.js`.
- **Accessibility:** anything clickable is a real `<button>` or `<a>` (use the
  `.wi-reset` / `.wi-plainlink` classes to strip browser styling). The reader
  and notices are modal dialogs: Escape closes them, focus moves in and comes
  back to the opener, and the library behind is `inert`. Animations stop under
  `prefers-reduced-motion`.
- **Assets:** the artwork is entirely CSS + inline SVG (the ink motifs in
  `data/motifs.js`), so there are **no binary image assets** to bundle. Fonts
  load from Google Fonts in `index.html`. `Motif` is the only place that uses
  `innerHTML`, and only for that static motif table.

## Configuration

Edit `src/config.js` to change the top-level look:

| Prop       | Values                              | Effect                        |
| ---------- | ----------------------------------- | ----------------------------- |
| `tagline`  | any string                          | hero tagline                  |
| `mood`     | `moonlit` \| `charcoal` \| `decay`  | page atmosphere wash          |
| `accent`   | any CSS colour                      | wordmark & tagline accent     |
| `showLamp` | boolean                             | oil lamp on the shelf         |
| `showDust` | boolean                             | drifting dust motes           |
