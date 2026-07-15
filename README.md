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

## Architecture / pattern

The app follows a **data-driven, component-per-concern** structure. Content
lives as plain data; components are presentational and reusable; one hook owns
all interactive state.

```
src/
├── main.jsx                 # entry — mounts <App /> with config props
├── App.jsx                  # composition root + view switching
├── config.js                # editable presentation props (tagline, mood, accent…)
│
├── data/                    # ← content & design data (no JSX)
│   ├── stories.js           #   the catalogue
│   ├── storyBodies.js       #   full transcriptions, keyed by story.bodyKey
│   ├── genres.js            #   genre spines + per-genre & section metadata
│   ├── motifs.js            #   hand-drawn SVG ink motifs
│   └── moods.js             #   mood background washes
│
├── hooks/
│   └── useLibrary.js        # all interactive state (genre / view / font size)
│
├── utils/
│   └── gradients.js         # cover & spine gradient builders
│
├── styles/
│   ├── theme.js             # shared design tokens (fonts, colours)
│   └── index.css            # reset, keyframes, hover interactions
│
└── components/              # ← presentation, grouped by concern
    ├── Motif.jsx            #   renders an ink motif tinted via currentColor
    ├── atmosphere/          #   Backdrop, Fog, Embers, Vignette, FilmGrain, RoughFilter
    ├── layout/              #   TopBar, Hero, Footer
    ├── shelf/               #   Shelf, GenreSpine, Lamp
    ├── stories/             #   FeaturedSection, StoryCard, ComingSoon
    └── reading/             #   ReadingView, ReadingToolbar, ContentWarning, StoryBlock
```

### Conventions

- **Data vs. presentation** — everything editorial (story text, teasers,
  colours, section copy) lives in `src/data/`. To add a story, append to
  `stories.js`; to publish its full text, add an entry to `storyBodies.js`
  keyed by the story's `bodyKey`.
- **State** — `useLibrary()` is the single source of interactive truth
  (selected genre, library vs. reading view, reader font scale). Components
  receive state and callbacks as props and stay stateless.
- **Styling** — dynamic, per-item values (gradients, motif colours) are inline
  styles built from data; reusable *interaction* states (hovers, the shelf
  lift) are CSS classes in `index.css` (`.wi-navlink`, `.wi-spine`, `.wi-card`,
  `.wi-btn`, `.wi-link`). Shared fonts/colours come from `styles/theme.js`.
- **Assets** — the artwork is entirely CSS + inline SVG (the ink motifs in
  `data/motifs.js`), so there are **no binary image assets** to bundle. Fonts
  load from Google Fonts in `index.html`. The original design references
  (`../screenshots`, `../uploads`) are not used at runtime.

## Configuration

Edit `src/config.js` to change the top-level look:

| Prop       | Values                              | Effect                        |
| ---------- | ----------------------------------- | ----------------------------- |
| `tagline`  | any string                          | hero tagline                  |
| `mood`     | `moonlit` \| `charcoal` \| `decay`  | page atmosphere wash          |
| `accent`   | any CSS colour                      | wordmark & tagline accent     |
| `showLamp` | boolean                             | oil lamp on the shelf         |
| `showDust` | boolean                             | drifting dust motes           |
```
