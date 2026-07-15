import { fonts } from '../../styles/theme';
import { coverBg } from '../../utils/gradients';
import { genreMeta } from '../../data/genres';
import { storyBodies } from '../../data/storyBodies';
import Motif from '../Motif';
import ReadingToolbar from './ReadingToolbar';
import ContentWarning from './ContentWarning';
import StoryBlock from './StoryBlock';

// Full-screen reading experience for a single story. Falls back to a
// "still being recovered" note when a story has no full transcription yet.
export default function ReadingView({ story, fontScale, onReturn, onDec, onInc, onReset }) {
  const full = story.bodyKey ? storyBodies[story.bodyKey] : null;
  const meta = genreMeta[story.genres[0]] || genreMeta.horror;

  const blocks = full
    ? full.body.map((b) => ({ isHead: !!b.h, isBreak: !!b.hr, text: b.h || b.p || '' }))
    : [];

  const teaser = full ? full.teaser : story.teaser;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, overflowY: 'auto', backgroundColor: '#ebeacf' }}>
      <ReadingToolbar onReturn={onReturn} onDec={onDec} onReset={onReset} onInc={onInc} />

      {/* cover banner with motif */}
      <div style={{ maxWidth: 760, margin: '48px auto 0', padding: '0 32px' }}>
        <div
          style={{
            position: 'relative',
            height: 220,
            borderRadius: 4,
            background: coverBg(story.cover),
            boxShadow: '0 24px 50px rgba(0,0,0,.55), inset 0 0 80px rgba(0,0,0,.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', inset: 14, border: `1.5px solid ${story.foil}`, opacity: 0.45, borderRadius: 2, transform: 'rotate(-.4deg)' }} />
          <div style={{ position: 'absolute', top: 16, left: 24, fontFamily: fonts.hand, fontSize: 20, color: story.foil, opacity: 0.85, transform: 'rotate(-4deg)' }}>
            {meta.scrawl}
          </div>
          <div style={{ width: 84, height: 84, marginBottom: 8, color: story.foil }}>
            <Motif name={meta.motif} color={story.foil} />
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 3, color: '#f0e7d2', textTransform: 'uppercase' }}>
            {story.glabel} · from the archive
          </div>
        </div>
      </div>

      {/* manuscript */}
      <div style={{ maxWidth: 760, margin: '0 auto 90px', padding: '0 32px' }}>
        <div
          style={{
            background: 'linear-gradient(180deg, #efe6d2, #e7dabf)',
            borderRadius: '0 0 4px 4px',
            padding: '64px 72px 72px',
            boxShadow: '0 30px 60px rgba(0,0,0,.5)',
            backgroundImage:
              'radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,.4), transparent 60%), radial-gradient(80% 50% at 90% 100%, rgba(120,90,50,.12), transparent 55%)',
          }}
        >
          {/* title block */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(120,90,50,.28)', paddingBottom: 28, marginBottom: 8 }}>
            <div style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 3, color: '#9a6a2e', marginBottom: 16, textTransform: 'uppercase' }}>
              {full ? full.category : story.glabel}
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 44, lineHeight: 1.1, color: '#2b1c0d', letterSpacing: 0.5 }}>
              {story.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 18, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: '#6a4f2c' }}>
              <span>{full ? full.date : story.archive}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{story.time} read</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>Megha Bisht</span>
            </div>
          </div>

          {full?.cw && <ContentWarning text={full.cw} />}

          {/* body — font-scale is applied here so em-based blocks scale */}
          <div style={{ fontFamily: fonts.serif, color: '#2c2015', fontSize: `${(fontScale * 20).toFixed(1)}px`, marginTop: 30 }}>
            {blocks.map((b, i) => (
              <StoryBlock key={i} block={b} />
            ))}

            {full ? (
              <p style={{ fontFamily: fonts.display, fontSize: '.92em', letterSpacing: 0.5, lineHeight: 1.7, color: '#6b1f2a', textAlign: 'center', margin: '8px 0 0' }}>
                {teaser}
              </p>
            ) : (
              <>
                <p style={{ fontSize: '1em', lineHeight: 1.8, margin: '0 0 22px' }}>{teaser}</p>
                <div style={{ textAlign: 'center', borderTop: '1px solid rgba(120,90,50,.28)', paddingTop: 26, marginTop: 30 }}>
                  <div style={{ fontFamily: fonts.hand, fontSize: 22, color: '#9a6a2e' }}>
                    this manuscript is still being recovered…
                  </div>
                  <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: '#6a4f2c', marginTop: 6 }}>
                    The full text will be transcribed to the archive soon.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 36 }}>
          <span
            className="wi-btn"
            onClick={onReturn}
            style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 2, color: '#2b1c0d', border: '1px solid rgba(12,7,0,.45)', borderRadius: 2, padding: '12px 26px' }}
          >
            ← Return to the Library
          </span>
        </div>
      </div>
    </div>
  );
}
