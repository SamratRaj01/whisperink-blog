import { useEffect, useRef } from 'react';
import { fonts, colors } from '../../styles/theme';

// "Still being built" notice, shown as a modal dialog (Escape or the button
// closes it). Also used for links to stories that don't exist.
export default function StillBuilding({ title, message, onReturnLibrary }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onReturnLibrary();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onReturnLibrary]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'grid',
        placeItems: 'center',
        padding: 'clamp(16px, 4vw, 24px)',
        background: 'radial-gradient(circle at top, rgba(21,17,13,.78), rgba(6,7,9,.94))',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wi-notice-title"
        aria-describedby="wi-notice-message"
        tabIndex={-1}
        style={{
          width: 'min(720px, 100%)',
          border: '1px solid rgba(167,123,63,.3)',
          borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(30,24,18,.98), rgba(16,13,10,.98))',
          boxShadow: '0 36px 80px rgba(0,0,0,.7)',
          padding: 'clamp(24px, 6vw, 34px) clamp(20px, 6vw, 34px) clamp(22px, 5vw, 30px)',
          color: colors.ink,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
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
        <h2 id="wi-notice-title" className="wi-heading" style={{ fontFamily: fonts.display, fontSize: 'clamp(28px, 7vw, 38px)', lineHeight: 1.05, color: colors.inkBright, marginBottom: 14 }}>
          {title}
        </h2>
        <p id="wi-notice-message" style={{ margin: 0, fontFamily: fonts.english, fontStyle: 'italic', fontSize: 'clamp(17px, 4.4vw, 19px)', lineHeight: 1.7, color: '#d5c8ad', maxWidth: 600 }}>
          {message}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <button
            type="button"
            className="wi-btn wi-reset"
            onClick={onReturnLibrary}
            style={{
              border: '1px solid rgba(167,123,63,.55)',
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
