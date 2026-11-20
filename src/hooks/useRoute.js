import { useCallback, useEffect, useState } from 'react';

// A deliberately tiny router: the archive has exactly two kinds of page.
//
//   <base>                      → { name: 'library' }
//   <base>stories/<slug>/       → { name: 'story', slug }
//   anything else               → { name: 'notFound' }
//
// Paths are relative to Vite's BASE_URL (e.g. /whisperink-blog/), so the same
// code works on GitHub Pages and on a custom domain.
const BASE = import.meta.env.BASE_URL;

export function parsePath(pathname) {
  let path;
  if (pathname.startsWith(BASE)) path = pathname.slice(BASE.length);
  else if (pathname + '/' === BASE) path = '';
  else return { name: 'notFound' };

  path = path.replace(/\/+$/, '');
  if (path === '' || path === 'index.html') return { name: 'library' };

  const match = /^stories\/([^/]+?)(?:\/index\.html)?$/.exec(path);
  if (match) return { name: 'story', slug: decodeURIComponent(match[1]) };
  return { name: 'notFound' };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // `path` is relative to BASE ('' for the library, 'stories/<slug>/' …).
  const navigate = useCallback((path, { replace = false, state = null } = {}) => {
    window.history[replace ? 'replaceState' : 'pushState'](state, '', BASE + path);
    setRoute(parsePath(window.location.pathname));
  }, []);

  return { route, navigate };
}
