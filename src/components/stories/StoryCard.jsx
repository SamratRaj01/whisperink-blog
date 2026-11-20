import { fonts } from '../../styles/theme';
import { coverBg } from '../../utils/gradients';
import { genreById, genreMeta } from '../../data/genres';
import Motif from '../Motif';
import StoryLink from './StoryLink';

// One story presented as an illustrated zine cover with a teaser and an
// "Open Book" action. Cover art is composed from the story's colours plus
// its genre's ink motif and scrawl.
//
// The cover is the card's one keyboard stop (a real link to the story's URL);
// "Open Book" is a mouse-sized duplicate kept out of the tab order.
export default function StoryCard({ story, onOpen }) {
  const meta = genreMeta[story.genre] || genreMeta.horror;
  const genreName = genreById[story.genre]?.name ?? '';

  return (
    <article style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* cover */}
      <StoryLink
        slug={story.slug}
        onOpen={onOpen}
        className="wi-card"
        style={{
          position: 'relative',
          width: '100%',
          height: 332,
          borderRadius: '3px 5px 5px 3px',
          background: coverBg(story.cover),
          boxShadow: '0 18px 34px rgba(0,0,0,.55), inset 0 0 70px rgba(0,0,0,.45)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <div aria-hidden="true">
          {/* spine shading */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 16, background: 'linear-gradient(90deg, rgba(0,0,0,.5), transparent)' }} />
          {/* corner darkening */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 78% 16%, rgba(255,255,255,.06), transparent 50%), radial-gradient(90% 70% at 18% 100%, rgba(0,0,0,.4), transparent 55%)' }} />
          {/* torn tape */}
          <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%) rotate(-3deg)', width: 84, height: 22, background: 'rgba(222,212,184,.16)', boxShadow: '0 2px 5px rgba(0,0,0,.25)', borderLeft: '1px dashed rgba(222,212,184,.3)', borderRight: '1px dashed rgba(222,212,184,.3)' }} />
          {/* sketchy double border */}
          <div style={{ position: 'absolute', inset: 13, border: `1.5px solid ${meta.ink}`, opacity: 0.42, borderRadius: 1, transform: 'rotate(-.5deg)' }} />
          <div style={{ position: 'absolute', inset: 15, border: `1px solid ${meta.ink}`, opacity: 0.22, borderRadius: 1, transform: 'rotate(.6deg)' }} />
          {/* handwritten warning */}
          <div style={{ position: 'absolute', top: 18, left: 22, fontFamily: fonts.hand, fontSize: 19, color: meta.ink, opacity: 0.88, transform: 'rotate(-4deg)' }}>
            {meta.scrawl}
          </div>
          {/* ink doodle */}
          <div style={{ position: 'absolute', left: 30, right: 30, top: 58, height: 150 }}>
            <Motif name={meta.motif} color={meta.ink} />
          </div>
        </div>
        {/* title plate */}
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 28, textAlign: 'center' }}>
          <div aria-hidden="true" style={{ width: 30, height: 1, background: meta.ink, opacity: 0.7, margin: '0 auto 12px' }} />
          <h3 className="wi-heading" style={{ fontFamily: fonts.display, fontSize: 23, lineHeight: 1.16, color: '#f2ebda', letterSpacing: 0.5, textShadow: '0 1px 4px rgba(0,0,0,.55)' }}>
            {story.title}
          </h3>
          <div style={{ fontFamily: fonts.display, fontSize: 11, letterSpacing: 3, color: meta.ink, opacity: 0.85, marginTop: 10, textTransform: 'uppercase' }}>
            {genreName}
          </div>
        </div>
      </StoryLink>

      {/* meta */}
      <div style={{ marginTop: 18 }}>
        <p style={{ margin: 0, fontFamily: fonts.english, fontStyle: 'italic', fontSize: 17, lineHeight: 1.42, color: '#b3a890' }}>
          {story.teaser}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <span style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 1, color: '#8f7a52' }}>
            {story.readTime ? `${story.readTime} read` : ''}
          </span>
          <StoryLink
            slug={story.slug}
            onOpen={onOpen}
            className="wi-btn"
            tabIndex={-1}
            aria-hidden="true"
            style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 1, color: '#d8c9a6', border: '1px solid rgba(167,123,63,.55)', borderRadius: 2, padding: '7px 15px' }}
          >
            Open Book
          </StoryLink>
        </div>
      </div>
    </article>
  );
}
