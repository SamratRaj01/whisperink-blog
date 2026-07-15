import { fonts } from '../../styles/theme';

export default function Footer({ onGoHome, onGoFeatured }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 4,
        maxWidth: 1180,
        margin: '72px auto 0',
        padding: '28px 40px 0',
        borderTop: '1px solid rgba(167,123,63,.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <button
        type="button"
        onClick={onGoHome}
        className="wi-navlink"
        style={{
          appearance: 'none',
          background: 'transparent',
          border: 'none',
          padding: 0,
          fontFamily: fonts.display,
          fontSize: 15,
          letterSpacing: 2,
          color: '#6f5a38',
          textAlign: 'left',
        }}
      >
        WhisperInk
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onGoFeatured}
          className="wi-btn"
          style={{
            appearance: 'none',
            background: 'transparent',
            border: '1px solid rgba(167,123,63,.4)',
            padding: '10px 14px',
            borderRadius: 999,
            fontFamily: fonts.display,
            fontSize: 12,
            letterSpacing: 1,
            color: '#c2ab84',
          }}
        >
          Featured Stories
        </button>
        <div style={{ fontFamily: fonts.english, fontStyle: 'italic', fontSize: 16, color: '#6a6354' }}>
          Some stories were never meant to be preserved. We keep them anyway.
        </div>
      </div>
    </div>
  );
}
