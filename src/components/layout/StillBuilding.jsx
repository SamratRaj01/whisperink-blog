import { fonts, colors } from '../../styles/theme';

export default function StillBuilding({ title, message, onReturnLibrary }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'radial-gradient(circle at top, rgba(21,17,13,.78), rgba(6,7,9,.94))',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: 'min(720px, 100%)',
          border: '1px solid rgba(167,123,63,.3)',
          borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(30,24,18,.98), rgba(16,13,10,.98))',
          boxShadow: '0 36px 80px rgba(0,0,0,.7)',
          padding: '34px 34px 30px',
          color: colors.ink,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 'auto -8% -58% auto',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(199,162,74,.18), transparent 66%)',
            filter: 'blur(10px)',
          }}
        />
        <div style={{ fontFamily: fonts.display, fontSize: 13, letterSpacing: 3, color: colors.muted, marginBottom: 14 }}>
          ARCHIVE ERROR / STILL BUILDING
        </div>
        <div style={{ fontFamily: fonts.display, fontSize: 38, lineHeight: 1.05, color: colors.inkBright, marginBottom: 14 }}>
          {title}
        </div>
        <div style={{ fontFamily: fonts.english, fontStyle: 'italic', fontSize: 19, lineHeight: 1.7, color: '#d5c8ad', maxWidth: 600 }}>
          {message}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <button
            type="button"
            className="wi-btn"
            onClick={onReturnLibrary}
            style={{
              appearance: 'none',
              border: '1px solid rgba(167,123,63,.55)',
              background: 'transparent',
              color: colors.ink,
              padding: '12px 18px',
              borderRadius: 999,
              fontFamily: fonts.display,
              letterSpacing: 1,
            }}
          >
            Return to the Library
          </button>
        </div>
      </div>
    </div>
  );
}