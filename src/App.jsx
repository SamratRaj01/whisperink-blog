import { useCallback, useState } from 'react';
import { fonts } from './styles/theme';
import { useLibrary } from './hooks/useLibrary';
import { stories } from './data/stories';
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

// Root component. Accepts the presentation props (tagline/mood/accent/…),
// owns library state via useLibrary, derives the visible story list from the
// selected genre, and switches between the library and reading views.
export default function App({
  tagline = 'Stories for Sleepless Nights',
  mood = 'moonlit',
  accent = '#c9a24a',
  showLamp = true,
  showDust = true,
}) {
  const lib = useLibrary();
  const [constructionNotice, setConstructionNotice] = useState(null);
  const pageBg = moodBg[mood] || moodBg.moonlit;

  // Default view shows featured stories; a selected spine filters by genre.
  const visibleStories =
    lib.genre === 'all'
      ? stories.filter((s) => s.featured)
      : stories.filter((s) => s.genres.includes(lib.genre));

  const scrollToSection = useCallback((sectionId) => {
    if (typeof document === 'undefined') return;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const goHome = useCallback(() => {
    setConstructionNotice(null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openConstructionNotice = useCallback((title, message) => {
    setConstructionNotice({ title, message });
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0b0e12',
        fontFamily: fonts.serif,
        overflow: 'hidden',
        paddingBottom: 80,
      }}
    >
      <RoughFilter />
      <Atmosphere pageBg={pageBg} />

      <div id="whisperink-top">
        <TopBar
          onGoHome={goHome}
          onGoLibrary={() => scrollToSection('whisperink-library')}
          onGoAbout={() =>
            openConstructionNotice(
              'About the Archive',
              'This wing is still being catalogued. The archivist keeps misplacing the notes, so the story lives behind a velvet curtain for now.'
            )
          }
          onGoManuscript={() =>
            openConstructionNotice(
              'Leave a Manuscript',
              'The submission desk is still being built from salvaged oak and bad decisions. Bring your draft back once the ink dries on the landing page.'
            )
          }
        />
        <Hero tagline={tagline} accent={accent} />
      </div>

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
        />
      </div>

      <Footer
        onGoHome={goHome}
        onGoFeatured={() => scrollToSection('whisperink-featured')}
        onGoConstruction={() =>
          openConstructionNotice(
            'Still Building',
            'This lower passage is not ready yet. The lanterns are up, but the floorboards are still being written.'
          )
        }
      />

      {lib.view === 'reading' && lib.story && (
        <ReadingView
          story={lib.story}
          fontScale={lib.fontScale}
          onReturn={lib.returnToLibrary}
          onDec={() => lib.changeFont(-0.1)}
          onInc={() => lib.changeFont(0.1)}
          onReset={lib.resetFont}
        />
      )}

      {constructionNotice && (
        <StillBuilding
          title={constructionNotice.title}
          message={constructionNotice.message}
          onReturnHome={goHome}
          onReturnLibrary={() => scrollToSection('whisperink-library')}
        />
      )}

      <FilmGrain />
    </div>
  );
}
