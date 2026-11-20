import { useState, useCallback } from 'react';
import { useRoute } from './useRoute';
import { storyBySlug, storyPath } from '../data/catalogue';

const clampScale = (f) => Math.max(0.8, Math.min(1.5, +f.toFixed(2)));

// Owns all interactive state for the archive: which genre is selected, which
// story (if any) is open, and the reader's font scale.
//
// The open story comes from the URL (stories/<slug>/), so stories can be
// linked, refreshed and navigated with Back/Forward. Opening a story never
// scrolls the library, so returning lands the reader where they left off.
export function useLibrary() {
  const { route, navigate } = useRoute();
  const [genre, setGenre] = useState('all');
  // Font scale belongs to the story it was set on; a new story starts at 1.
  const [font, setFont] = useState({ slug: null, scale: 1 });

  const story = route.name === 'story' ? storyBySlug(route.slug) : null;
  const missing = route.name === 'notFound' || (route.name === 'story' && !story);
  const slug = story?.slug ?? null;
  const fontScale = font.slug === slug ? font.scale : 1;

  const openStory = useCallback(
    (s) => navigate(storyPath(s.slug), { state: { fromLibrary: true } }),
    [navigate]
  );

  // Came from the library → step back in history (restores scroll and keeps
  // Back/Forward honest). Arrived by direct link → replace with the library.
  const returnToLibrary = useCallback(() => {
    if (window.history.state?.fromLibrary) window.history.back();
    else navigate('', { replace: true });
  }, [navigate]);

  // Clicking the active spine again clears the filter back to "all".
  const toggleGenre = useCallback(
    (id) => setGenre((cur) => (cur === id ? 'all' : id)),
    []
  );
  const clearGenre = useCallback(() => setGenre('all'), []);

  const changeFont = useCallback(
    (d) => setFont((f) => ({ slug, scale: clampScale((f.slug === slug ? f.scale : 1) + d) })),
    [slug]
  );
  const resetFont = useCallback(() => setFont({ slug, scale: 1 }), [slug]);

  return {
    genre,
    story,
    missing,
    fontScale,
    openStory,
    returnToLibrary,
    toggleGenre,
    clearGenre,
    changeFont,
    resetFont,
  };
}
