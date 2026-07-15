import { useState, useCallback } from 'react';

// Owns all interactive state for the archive: which genre is selected, whether
// we're browsing the library or reading a story, and the reader's font scale.
export function useLibrary() {
  const [genre, setGenre] = useState('all');
  const [view, setView] = useState('library'); // 'library' | 'reading'
  const [story, setStory] = useState(null);
  const [fontScale, setFontScale] = useState(1);

  const openStory = useCallback((s) => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    setStory(s);
    setFontScale(1);
    setView('reading');
  }, []);

  const returnToLibrary = useCallback(() => {
    setView('library');
    setStory(null);
  }, []);

  // Clicking the active spine again clears the filter back to "all".
  const toggleGenre = useCallback(
    (id) => setGenre((cur) => (cur === id ? 'all' : id)),
    []
  );
  const clearGenre = useCallback(() => setGenre('all'), []);

  const changeFont = useCallback(
    (d) => setFontScale((f) => Math.max(0.8, Math.min(1.5, +(f + d).toFixed(2)))),
    []
  );
  const resetFont = useCallback(() => setFontScale(1), []);

  return {
    genre,
    view,
    story,
    fontScale,
    openStory,
    returnToLibrary,
    toggleGenre,
    clearGenre,
    changeFont,
    resetFont,
  };
}
