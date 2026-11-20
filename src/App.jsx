import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { fonts } from './styles/theme';
import { useLibrary } from './hooks/useLibrary';
import { stories } from './data/catalogue';
import { moodBg } from './data/moods';

import RoughFilter from './components/atmosphere/RoughFilter';
import Atmosphere from './components/atmosphere/Atmosphere';
import FilmGrain from './components/atmosphere/FilmGrain';
import TopBar from './components/layout/TopBar';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import StillBuilding from './components/layout/StillBuilding';
import Shelf from './components/shelf/Shelf';
import FeaturedSection from './components/stories/FeaturedSection';
import ReadingView from './components/reading/ReadingView';

const NOTICES = {
  about: {
    title: 'About the Archive',
    message:
      'This wing is still being catalogued. The archivist keeps misplacing the notes, so the story lives behind a velvet curtain for now.',
  },
  notify: {
    title: 'The Mailing List',
    message:
      'The list of names is still being stitched together. Check back when the first reel arrives. The archivist will leave a light on.',
  },
  missing: {
    title: 'This Manuscript Was Never Recovered',
    message:
      'Whatever this link once pointed to has slipped between the shelves, or was never here at all. The rest of the archive is still waiting.',
  },
};

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

// Root component. Accepts the presentation props (tagline/mood/accent/…),
// owns library state via useLibrary, derives the visible story list from the
// selected genre, and layers the reader / notices over the library.
export default function App({ tagline, mood, accent, showLamp, showDust }) {
  const lib = useLibrary();
  const [notice, setNotice] = useState(null);
  const pageBg = moodBg[mood] || moodBg.moonlit;

  // Default view shows featured stories; a selected spine filters by genre.
  const visibleStories =
    lib.genre === 'all' ? stories.filter((s) => s.featured) : stories.filter((s) => s.genre === lib.genre);

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  }, []);

  const goHome = useCallback(() => {
    setNotice(null);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }, []);

  const closeNotice = useCallback(() => setNotice(null), []);
  const activeNotice = notice ? NOTICES[notice] : lib.missing ? NOTICES.missing : null;
  const onCloseNotice = notice ? closeNotice : lib.returnToLibrary;

  // While the reader or a notice is open, the library behind it is inert
  // (unreachable by Tab or screen reader) and doesn't scroll. On close, focus
  // goes back to whatever opened the overlay. Layout effect: this must run
  // before the overlay's own effects take focus, and un-inert the library
  // before focus is restored to it.
  const overlayOpen = Boolean(lib.story || activeNotice);
  const libraryRef = useRef(null);
  const openerRef = useRef(null);
  useLayoutEffect(() => {
    const library = libraryRef.current;
    if (overlayOpen) {
      openerRef.current = document.activeElement;
      library.inert = true;
      document.documentElement.style.overflow = 'hidden';
      return;
    }
    library.inert = false;
    document.documentElement.style.overflow = '';
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && opener !== document.body && document.contains(opener)) opener.focus({ preventScroll: true });
  }, [overlayOpen]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0b0e12',
        fontFamily: fonts.serif,
        overflowX: 'clip',
        paddingBottom: 80,
      }}
    >
      <RoughFilter />
      <Atmosphere pageBg={pageBg} />

      <div ref={libraryRef}>
        <header id="whisperink-top">
          <TopBar
            onGoHome={goHome}
            onGoLibrary={() => scrollToSection('whisperink-library')}
            onGoAbout={() => setNotice('about')}
          />
          <Hero tagline={tagline} accent={accent} />
        </header>

        <main>
          <div id="whisperink-library">
            <Shelf
              selectedGenre={lib.genre}
              onSelectGenre={lib.toggleGenre}
              showLamp={showLamp}
              showDust={showDust}
            />
          </div>

          <div id="whisperink-featured">
            <FeaturedSection
              selectedGenre={lib.genre}
              stories={visibleStories}
              onOpenStory={lib.openStory}
              onClearGenre={lib.clearGenre}
              onNotify={() => setNotice('notify')}
            />
          </div>
        </main>

        <Footer onGoHome={goHome} />
      </div>

      {lib.story && (
        <ReadingView
          key={lib.story.slug}
          story={lib.story}
          fontScale={lib.fontScale}
          onReturn={lib.returnToLibrary}
          onDec={() => lib.changeFont(-0.1)}
          onInc={() => lib.changeFont(0.1)}
          onReset={lib.resetFont}
        />
      )}

      {activeNotice && !lib.story && (
        <StillBuilding title={activeNotice.title} message={activeNotice.message} onReturnLibrary={onCloseNotice} />
      )}

      <FilmGrain />
    </div>
  );
}
