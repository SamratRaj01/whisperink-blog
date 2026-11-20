import { Fragment, useEffect, useRef, useState } from 'react';
import { fonts } from '../../styles/theme';
import { coverBg } from '../../utils/gradients';
import { genreById, genreMeta } from '../../data/genres';
import { loadBody } from '../../data/catalogue';
import Motif from '../Motif';
import ReadingToolbar from './ReadingToolbar';
import ContentWarning from './ContentWarning';
import StoryBlock from './StoryBlock';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// Full-screen reading experience for a single story, presented as a modal
// dialog over the library (Escape or "Return" closes it). The story's body is
// fetched lazily; stories without a transcription show a
// "still being recovered" note instead.
export default function ReadingView({ story, fontScale, onReturn, onDec, onInc, onReset }) {
  const dialogRef = useRef(null);
  const meta = genreMeta[story.genre] || genreMeta.horror;
  const genreName = genreById[story.genre]?.name ?? '';

  // { slug, blocks, failed } for the most recently loaded story.
  const [body, setBody] = useState({ slug: null, blocks: null, failed: false });
  useEffect(() => {
    if (!story.hasBody) return undefined;
    let live = true;
    loadBody(story.slug)
      .then((blocks) => live && setBody({ slug: story.slug, blocks, failed: false }))
      // Typically a stale chunk after a redeploy; a reload fetches the new one.
      .catch(() => live && setBody({ slug: story.slug, blocks: null, failed: true }));
    return () => {
      live = false;
    };
  }, [story.slug, story.hasBody]);
  const current = body.slug === story.slug ? body : null;
  const loading = story.hasBody && !current;

  // Dialog behaviour: take focus on open, close on Escape, title the tab.
  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onReturn();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onReturn]);

  useEffect(() => {
    const previous = document.title;
    document.title = `${story.title} — WhisperInk`;
    return () => {
      document.title = previous;
    };
  }, [story.title]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wi-reader-title"
      tabIndex={-1}
      style={{ position: 'fixed', inset: 0, zIndex: 60, overflowY: 'auto', backgroundColor: '#ebeacf' }}
    >
      <ReadingToolbar onReturn={onReturn} onDec={onDec} onReset={onReset} onInc={onInc} />

      {/* cover banner with motif */}
      <div aria-hidden="true" style={{ maxWidth: 760, margin: 'clamp(24px, 6vw, 48px) auto 0', padding: '0 clamp(12px, 4vw, 32px)' }}>
        <div
          style={{
            position: 'relative',
            height: 'clamp(170px, 45vw, 220px)',
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
          <div style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 3, color: '#f0e7d2', textTransform: 'uppercase', textAlign: 'center', padding: '0 24px' }}>
            {genreName} · from the archive
          </div>
        </div>
      </div>

      {/* manuscript */}
      <article style={{ maxWidth: 760, margin: '0 auto 90px', padding: '0 clamp(12px, 4vw, 32px)' }}>
        <div
          style={{
            background: 'linear-gradient(180deg, #efe6d2, #e7dabf)',
            borderRadius: '0 0 4px 4px',
            padding: 'clamp(32px, 8vw, 64px) clamp(20px, 7vw, 72px) clamp(40px, 8vw, 72px)',
            boxShadow: '0 30px 60px rgba(0,0,0,.5)',
            backgroundImage:
              'radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,.4), transparent 60%), radial-gradient(80% 50% at 90% 100%, rgba(120,90,50,.12), transparent 55%)',
          }}
        >
          {/* title block */}
          <header style={{ textAlign: 'center', borderBottom: '1px solid rgba(120,90,50,.28)', paddingBottom: 28, marginBottom: 8 }}>
            <div style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 3, color: '#9a6a2e', marginBottom: 16, textTransform: 'uppercase' }}>
              {story.category || genreName}
            </div>
            <h1 id="wi-reader-title" className="wi-heading" style={{ fontFamily: fonts.display, fontSize: 'clamp(30px, 8vw, 44px)', lineHeight: 1.1, color: '#2b1c0d', letterSpacing: 0.5 }}>
              {story.title}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4px 14px', marginTop: 18, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: '#6a4f2c' }}>
              {[
                story.published ? formatDate(story.published) : story.archiveLabel,
                story.readTime && `${story.readTime} read`,
                'Megha Bisht',
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>}
                    <span>{item}</span>
                  </Fragment>
                ))}
            </div>
          </header>

          {story.cw && <ContentWarning text={story.cw} />}

          {/* body — font-scale is applied here so em-based blocks scale */}
          <div style={{ fontFamily: fonts.serif, color: '#2c2015', fontSize: `calc(${fontScale} * clamp(18px, 4.8vw, 20px))`, marginTop: 30 }}>
            {current?.blocks?.map((b, i) => (
              <StoryBlock key={i} block={b} />
            ))}

            {current?.blocks && story.coda && (
              <p style={{ fontFamily: fonts.display, fontSize: '.92em', letterSpacing: 0.5, lineHeight: 1.7, color: '#6b1f2a', textAlign: 'center', margin: '8px 0 0' }}>
                {story.coda}
              </p>
            )}

            {loading && (
              <p role="status" style={{ fontFamily: fonts.hand, fontSize: 22, color: '#9a6a2e', textAlign: 'center', margin: '24px 0' }}>
                unrolling the manuscript…
              </p>
            )}

            {current?.failed && (
              <div role="alert" style={{ textAlign: 'center', margin: '24px 0' }}>
                <div style={{ fontFamily: fonts.hand, fontSize: 22, color: '#9a6a2e' }}>the ink smudged on the way here…</div>
                <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: '#6a4f2c', marginTop: 6 }}>
                  Please refresh the page to unroll this manuscript again.
                </div>
              </div>
            )}

            {!story.hasBody && (
              <>
                <p style={{ fontSize: '1em', lineHeight: 1.8, margin: '0 0 22px' }}>{story.teaser}</p>
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
          <button
            type="button"
            className="wi-btn wi-reset"
            onClick={onReturn}
            style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 2, color: '#2b1c0d', border: '1px solid rgba(12,7,0,.45)', borderRadius: 2, padding: '12px 26px' }}
          >
            ← Return to the Library
          </button>
        </div>
      </article>
    </div>
  );
}
