import { fonts } from '../../styles/theme';

export default function Footer({ onGoHome }) {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 4,
        maxWidth: 1180,
        margin: 'clamp(48px, 9vw, 72px) auto 0',
        padding: '28px clamp(16px, 5vw, 40px) 0',
        borderTop: '1px solid rgba(167,123,63,.18)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <button
        type="button"
        onClick={onGoHome}
        className="wi-navlink wi-reset"
        style={{ fontFamily: fonts.display, fontSize: 15, letterSpacing: 2, color: '#8f7a52' }}
      >
        WhisperInk
      </button>
      <p style={{ margin: 0, fontFamily: fonts.english, fontStyle: 'italic', fontSize: 16, color: '#857c69' }}>
        Some stories were never meant to be preserved. We keep them anyway.
      </p>
    </footer>
  );
}
