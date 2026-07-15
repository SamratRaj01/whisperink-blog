import { fonts } from '../../styles/theme';
import { sectionMeta } from '../../data/genres';
import StoryCard from './StoryCard';
import ComingSoon from './ComingSoon';

// The story section beneath the shelf. Its header copy and contents follow the
// current shelf selection: featured stories by default, a filtered collection
// when a spine is chosen, or the ComingSoon panel for "Sitcom Horror".
export default function FeaturedSection({ selectedGenre, stories, onOpenStory, onClearGenre }) {
  const meta = sectionMeta[selectedGenre] || sectionMeta.all;
  const isFiltered = selectedGenre !== 'all';
  const comingSoon = selectedGenre === 'sitcom';

  return (
    <div style={{ position: 'relative', zIndex: 4, maxWidth: 1180, margin: '64px auto 0', padding: '0 40px' }}>
      {/* section header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid rgba(167,123,63,.28)', paddingBottom: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: fonts.hand, fontSize: 21, color: '#b09a6e', marginBottom: 4, transform: 'rotate(-1deg)' }}>
            {meta.kicker}
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 36, color: '#E6DCC6', letterSpacing: 1 }}>
            {meta.title}
          </div>
          <div style={{ fontFamily: fonts.english, fontStyle: 'italic', fontSize: 19, color: '#8b8472', marginTop: 8, maxWidth: 620, lineHeight: 1.45 }}>
            {meta.desc}
          </div>
        </div>
        {isFiltered && (
          <div
            className="wi-link"
            onClick={onClearGenre}
            style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 1, color: '#9a8a6e', whiteSpace: 'nowrap', paddingBottom: 6 }}
          >
            ← All stories
          </div>
        )}
      </div>

      {comingSoon ? (
        <ComingSoon />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '44px 36px', justifyContent: 'flex-start' }}>
          {stories.map((s) => (
            <StoryCard key={s.title} story={s} onOpen={() => onOpenStory(s)} />
          ))}
        </div>
      )}
    </div>
  );
}
