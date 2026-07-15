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
        animation: 'wi-breathe 7s ease-in-out infinite',
      }}
    >
      <div style={{ fontFamily: fonts.hand, fontSize: 22, color: '#b6a98c', transform: 'rotate(-2deg)', marginBottom: 4 }}>
        recovered &amp; transcribed, against better judgement
      </div>
      <div style={{ fontFamily: fonts.display, fontSize: 84, letterSpacing: 5, color: colors.inkBright, textShadow: '0 2px 26px rgba(0,0,0,.5)' }}>
        Whisper<span style={{ color: accent }}>ink</span>
      </div>
      <div style={{ fontFamily: fonts.hand, fontSize: 30, color: accent, marginTop: 2, transform: 'rotate(-1.5deg)' }}>
        {tagline}
      </div>
      <div
        style={{
          fontFamily: fonts.english,
          fontStyle: 'italic',
          fontSize: 20,
          color: '#8b8472',
          marginTop: 16,
          maxWidth: 540,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.5,
        }}
      >
        An archive of dark fiction, recovered from forgotten places. Choose a volume from the shelf, or open a
        story below.
      </div>
    </div>
  );
}
