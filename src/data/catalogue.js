// The story catalogue, built from content/stories/*.md by the content plugin
// (scripts/vite-content-plugin.js). Metadata is loaded up front; each story's
// body is its own lazily-loaded chunk.
import stories from 'virtual:whisperink-catalogue';
import { genreById } from './genres';

const bodies = import.meta.glob('/content/stories/*.md');

export { stories };

export const storyBySlug = (slug) => stories.find((s) => s.slug === slug) ?? null;

// Resolves to the story's blocks, or null if it has no body file.
export const loadBody = (slug) => {
  const load = bodies[`/content/stories/${slug}.md`];
  return load ? load().then((m) => m.default.blocks) : Promise.resolve(null);
};

export const countByGenre = (genreId) => stories.filter((s) => s.genre === genreId).length;

// "collection · 7 stories" / "collection · 1 tale"
export const collectionKicker = (genreId) => {
  const genre = genreById[genreId];
  if (!genre) return '';
  const n = countByGenre(genreId);
  return `collection · ${n} ${genre.noun[n === 1 ? 0 : 1]}`;
};

// Canonical URL path for a story (trailing slash: GitHub Pages serves
// stories/<slug>/index.html there without a redirect).
export const storyPath = (slug) => `stories/${slug}/`;
export const storyHref = (slug) => `${import.meta.env.BASE_URL}${storyPath(slug)}`;
