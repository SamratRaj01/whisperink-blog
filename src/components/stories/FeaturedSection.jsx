import { fonts } from '../../styles/theme';
import { sectionMeta } from '../../data/genres';
import { collectionKicker } from '../../data/catalogue';
import StoryCard from './StoryCard';
import ComingSoon from './ComingSoon';

// The story section beneath the shelf. Its header copy and contents follow the
// current shelf selection: featured stories by default, a filtered collection
// when a spine is chosen, or the ComingSoon panel for "Sitcom Horror".
export default function FeaturedSection({ selectedGenre, stories, onOpenStory, onClearGenre, onNotify }) {
  const meta = sectionMeta[selectedGenre] || sectionMeta.all;
  const kicker = meta.kicker ?? collectionKicker(selectedGenre);
  const isFiltered = selectedGenre !== 'all';
  const comingSoon = selectedGenre === 'sitcom';

  return (
    <section
      aria-labelledby="wi-section-title"
      style={{ position: 'relative', zIndex: 4, maxWidth: 1180, margin: 'clamp(40px, 8vw, 64px) auto 0', padding: '0 clamp(16px, 5vw, 40px)' }}
    >
      {/* section header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid rgba(167,123,63,.28)', paddingBottom: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: fonts.hand, fontSize: 21, color: '#b09a6e', marginBottom: 4, transform: 'rotate(-1deg)' }}>
            {kicker}
          </div>
          <h2 id="wi-section-title" className="wi-heading" style={{ fontFamily: fonts.display, fontSize: 'clamp(28px, 7vw, 36px)', color: '#E6DCC6', letterSpacing: 1 }}>
            {meta.title}
          </h2>
          <p style={{ margin: '8px 0 0', fontFamily: fonts.english, fontStyle: 'italic', fontSize: 'clamp(17px, 4.4vw, 19px)', color: '#8b8472', maxWidth: 620, lineHeight: 1.45 }}>
            {meta.desc}
          </p>
        </div>
        {isFiltered && (
          <button
            type="button"
            className="wi-link wi-reset"
            onClick={onClearGenre}
            style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 1, color: '#9a8a6e', whiteSpace: 'nowrap', paddingBottom: 6 }}
          >
            ← All stories
          </button>
        )}
      </div>

      {comingSoon ? (
        <ComingSoon onNotify={onNotify} />
      ) : (
        <div className="wi-card-grid">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} onOpen={() => onOpenStory(s)} />
          ))}
        </div>
      )}
    </section>
  );
}
