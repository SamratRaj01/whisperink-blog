import { fonts, colors } from '../../styles/theme';

// The breathing hero: overline scrawl, the WhisperInk wordmark (with an
// accent-tinted "ink"), the configurable tagline, and an intro line.
export default function Hero({ tagline, accent }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 4,
        textAlign: 'center',
        margin: '30px auto 0',
        padding: '0 16px',
        animation: 'wi-breathe 7s ease-in-out infinite',
      }}
    >
      <div style={{ fontFamily: fonts.hand, fontSize: 'clamp(19px, 5vw, 22px)', color: '#b6a98c', transform: 'rotate(-2deg)', marginBottom: 4 }}>
        recovered &amp; transcribed, against better judgement
      </div>
      <h1
        className="wi-heading"
        style={{ fontFamily: fonts.display, fontSize: 'clamp(48px, 13vw, 84px)', lineHeight: 'normal', letterSpacing: 'clamp(2px, 0.9vw, 5px)', color: colors.inkBright, textShadow: '0 2px 26px rgba(0,0,0,.5)' }}
      >
        Whisper<span style={{ color: accent }}>ink</span>
      </h1>
      <div style={{ fontFamily: fonts.hand, fontSize: 'clamp(22px, 6vw, 30px)', color: accent, marginTop: 2, transform: 'rotate(-1.5deg)' }}>
        {tagline}
      </div>
      <p
        style={{
          fontFamily: fonts.english,
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 4.6vw, 20px)',
          color: '#8b8472',
          margin: '16px auto 0',
          maxWidth: 540,
          lineHeight: 1.5,
        }}
      >
        An archive of dark fiction, recovered from forgotten places. Choose a volume from the shelf, or open a
        story below.
      </p>
    </div>
  );
}
