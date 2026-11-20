// WhisperInk content plugin.
//
// Stories live as Markdown files in `content/stories/<slug>.md` (YAML
// frontmatter + a Markdown body). This plugin turns them into:
//
//   • `virtual:whisperink-catalogue`: every story's metadata, validated and
//     sorted. Imported eagerly; contains no story text.
//   • each `.md` file → `export default { blocks }`: the story body, loaded
//     lazily via import.meta.glob so each story is its own chunk.
//   • at build time, `stories/<slug>/index.html` per story with that story's
//     title/description/Open Graph tags (link previews), plus a `404.html`
//     SPA fallback for GitHub Pages.
//
// Bodies are parsed here, at build time, into plain data blocks
// ({ type: 'h' | 'p' | 'hr', runs }), so the client ships no Markdown parser
// and story text never goes through innerHTML. Raw HTML in a story fails the
// build.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename, relative, sep } from 'node:path';
import matter from 'gray-matter';
import { Lexer } from 'marked';
import { genreById } from '../src/data/genres.js';
import { deriveCover } from '../src/utils/gradients.js';

const VIRTUAL_ID = 'virtual:whisperink-catalogue';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const META_START = '<!-- wi:meta:start -->';
const META_END = '<!-- wi:meta:end -->';
const SITE_NAME = 'WhisperInk';
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const WORDS_PER_MINUTE = 230;

const FIELDS = new Set([
  'title', 'genre', 'teaser', 'featured', 'published', 'archiveLabel', 'category',
  'cw', 'coda', 'readTime', 'cover', 'foil', 'position', 'driveId',
]);

class ContentError extends Error {}

// ---------- Markdown body → blocks ----------

function pushText(runs, text, marks) {
  if (!text) return;
  const last = runs[runs.length - 1];
  if (last && !last.br && !!last.em === !!marks.em && !!last.strong === !!marks.strong) {
    last.text += text;
  } else {
    runs.push({ text, ...(marks.em && { em: true }), ...(marks.strong && { strong: true }) });
  }
}

function flattenInline(tokens, marks, runs, problems) {
  for (const t of tokens) {
    switch (t.type) {
      case 'text':
        if (t.tokens) flattenInline(t.tokens, marks, runs, problems);
        else pushText(runs, t.text, marks);
        break;
      case 'escape':
      case 'codespan':
        pushText(runs, t.text, marks);
        break;
      case 'em':
        flattenInline(t.tokens, { ...marks, em: true }, runs, problems);
        break;
      case 'strong':
        flattenInline(t.tokens, { ...marks, strong: true }, runs, problems);
        break;
      case 'del':
      case 'link':
        flattenInline(t.tokens, marks, runs, problems);
        break;
      case 'br':
        runs.push({ br: true });
        break;
      case 'html':
        problems.push(`raw HTML is not allowed: ${t.raw.trim().slice(0, 40)}`);
        break;
      case 'image':
        problems.push('images inside stories are not supported');
        break;
      default:
        pushText(runs, t.raw, marks);
    }
  }
  return runs;
}

export function parseBody(markdown) {
  const problems = [];
  const blocks = [];
  const tokens = new Lexer({ gfm: true, breaks: true }).lex(markdown);
  for (const t of tokens) {
    if (t.type === 'space') continue;
    if (t.type === 'hr') blocks.push({ type: 'hr' });
    else if (t.type === 'heading') blocks.push({ type: 'h', runs: flattenInline(t.tokens, {}, [], problems) });
    else if (t.type === 'paragraph') blocks.push({ type: 'p', runs: flattenInline(t.tokens, {}, [], problems) });
    else if (t.type === 'html') problems.push(`raw HTML is not allowed: ${t.raw.trim().slice(0, 40)}`);
    else problems.push(`unsupported Markdown (${t.type}): ${t.raw.trim().slice(0, 40)}`);
  }
  return { blocks, problems };
}

const wordCount = (blocks) =>
  blocks.reduce(
    (n, b) => n + (b.runs || []).reduce((m, r) => m + (r.text ? r.text.split(/\s+/).filter(Boolean).length : 0), 0),
    0
  );

// ---------- frontmatter → catalogue entry ----------

function toIsoDate(v) {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))) return v;
  return null;
}

function readStory(file, root) {
  const rel = relative(root, file);
  const slug = basename(file, '.md');
  const { data, content } = matter(readFileSync(file, 'utf8'));
  const problems = [];
  const str = (k, required = false) => {
    const v = data[k];
    if (v == null || v === '') {
      if (required) problems.push(`missing required field "${k}"`);
      return null;
    }
    if (typeof v !== 'string') {
      problems.push(`"${k}" must be text`);
      return null;
    }
    return v.trim();
  };

  if (!SLUG_RE.test(slug)) problems.push(`file name must be lowercase-words-with-dashes (got "${slug}")`);
  for (const k of Object.keys(data)) {
    if (!FIELDS.has(k)) problems.push(`unknown field "${k}" (allowed: ${[...FIELDS].join(', ')})`);
  }

  const title = str('title', true);
  const teaser = str('teaser', true);
  const genreId = str('genre', true);
  const genre = genreId && genreById[genreId];
  if (genreId && !genre) problems.push(`unknown genre "${genreId}" (use one of: ${Object.keys(genreById).join(', ')})`);

  let published = null;
  if (data.published != null) {
    published = toIsoDate(data.published);
    if (!published) problems.push('"published" must be a date like 2024-09-02');
  }
  if (data.featured != null && typeof data.featured !== 'boolean') problems.push('"featured" must be true or false');
  if (data.position != null && !Number.isFinite(data.position)) problems.push('"position" must be a number');

  let cover = null;
  if (data.cover != null) {
    if (Array.isArray(data.cover) && data.cover.length === 2 && data.cover.every((c) => HEX_RE.test(c))) cover = data.cover;
    else problems.push('"cover" must be two colours like ["#6b1f2a", "#3c1016"]');
  }
  const foil = str('foil');
  if (foil && !HEX_RE.test(foil)) problems.push('"foil" must be a colour like "#e3c489"');

  const { blocks, problems: bodyProblems } = parseBody(content);
  problems.push(...bodyProblems);

  if (problems.length) {
    throw new ContentError(`${rel}:\n  - ${problems.join('\n  - ')}`);
  }

  const words = wordCount(blocks);
  return {
    entry: {
      slug,
      title,
      genre: genreId,
      teaser,
      featured: data.featured === true,
      published,
      archiveLabel: str('archiveLabel'),
      category: str('category'),
      cw: str('cw'),
      coda: str('coda'),
      readTime: str('readTime') || (words ? `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min` : null),
      cover: cover || deriveCover(genre.spine, slug),
      foil: foil || genre.foil,
      position: data.position ?? null,
      hasBody: blocks.length > 0,
    },
    blocks,
  };
}

// Dated stories first (newest → oldest), then undated ones by `position`.
function compareStories(a, b) {
  if (a.published && b.published) return b.published.localeCompare(a.published) || a.title.localeCompare(b.title);
  if (a.published) return -1;
  if (b.published) return 1;
  return (a.position ?? Infinity) - (b.position ?? Infinity) || a.title.localeCompare(b.title);
}

// ---------- per-story HTML (link previews) ----------

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function metaBlock({ title, description, type }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  return [
    META_START,
    `<title>${t} — ${SITE_NAME}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta name="twitter:card" content="summary" />`,
    META_END,
  ].join('\n    ');
}

// ---------- plugin ----------

export default function whisperinkContent() {
  let root = process.cwd();
  let contentDir;

  const listFiles = () =>
    readdirSync(contentDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => join(contentDir, f));

  function loadCatalogue() {
    const errors = [];
    const entries = [];
    for (const file of listFiles()) {
      try {
        entries.push(readStory(file, root).entry);
      } catch (e) {
        if (e instanceof ContentError) errors.push(e.message);
        else throw e;
      }
    }
    if (errors.length) {
      throw new ContentError(`WhisperInk content has ${errors.length} problem file(s):\n\n${errors.join('\n\n')}\n`);
    }
    return entries.sort(compareStories);
  }

  const isStoryFile = (id) => {
    const file = id.split('?')[0];
    return file.endsWith('.md') && file.startsWith(contentDir + sep);
  };

  return {
    name: 'whisperink-content',
    enforce: 'pre',

    configResolved(config) {
      root = config.root;
      contentDir = join(root, 'content', 'stories');
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      try {
        if (id === RESOLVED_ID) {
          return `export default ${JSON.stringify(loadCatalogue())};`;
        }
        if (isStoryFile(id)) {
          const { blocks } = readStory(id.split('?')[0], root);
          return `export default ${JSON.stringify({ blocks })};`;
        }
      } catch (e) {
        if (e instanceof ContentError) this.error(e.message);
        throw e;
      }
    },

    // Dev: adding, editing or deleting a story file refreshes the catalogue.
    configureServer(server) {
      server.watcher.add(contentDir);
      const refresh = (file) => {
        if (!isStoryFile(file)) return;
        const graph = server.environments?.client?.moduleGraph ?? server.moduleGraph;
        const mod = graph.getModuleById(RESOLVED_ID);
        if (mod) graph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('change', refresh);
      server.watcher.on('unlink', refresh);
    },

    // Build: one HTML entry per story (correct link previews) + 404 fallback.
    writeBundle(options) {
      const outDir = options.dir;
      const html = readFileSync(join(outDir, 'index.html'), 'utf8');
      const start = html.indexOf(META_START);
      const end = html.indexOf(META_END);
      if (start === -1 || end === -1) {
        this.error(`index.html must contain ${META_START} … ${META_END} around the <title> and meta tags`);
      }
      const withMeta = (meta) => html.slice(0, start) + meta + html.slice(end + META_END.length);

      const stories = loadCatalogue();
      for (const s of stories) {
        const dir = join(outDir, 'stories', s.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(
          join(dir, 'index.html'),
          withMeta(metaBlock({ title: s.title, description: s.teaser, type: 'article' }))
        );
      }
      writeFileSync(join(outDir, '404.html'), html);
      this.info?.(`wrote ${stories.length} story pages + 404.html`);
    },
  };
}
