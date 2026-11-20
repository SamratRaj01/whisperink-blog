import { fonts } from '../../styles/theme';

const squareBtn = {
  fontFamily: fonts.serif,
  color: '#c2ab84',
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(167,123,63,.4)',
  borderRadius: 3,
};

// Sticky reader header: return-to-library link plus the text-size controls.
export default function ReadingToolbar({ onReturn, onDec, onReset, onInc }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '16px clamp(14px, 4vw, 40px)',
        background: 'linear-gradient(180deg, rgba(12,10,11,.96), rgba(12,10,11,.78))',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(167,123,63,.22)',
      }}
    >
      <button
        type="button"
        className="wi-link wi-reset"
        onClick={onReturn}
        aria-label="Return to the Library"
        style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 1, color: '#c2ab84', whiteSpace: 'nowrap' }}
      >
        ← Return<span className="wi-hide-narrow"> to the Library</span>
      </button>
      <div role="group" aria-label="Text size" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span className="wi-hide-narrow" aria-hidden="true" style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 1, color: '#8f7a52', marginRight: 8 }}>
          Text Size
        </span>
        <button type="button" className="wi-btn wi-reset" onClick={onDec} aria-label="Decrease text size" style={{ ...squareBtn, fontSize: 14 }}>
          A−
        </button>
        <button
          type="button"
          className="wi-link wi-reset"
          onClick={onReset}
          aria-label="Reset text size"
          style={{ fontFamily: fonts.display, fontSize: 11, letterSpacing: 1, color: '#9a8a6e', padding: '0 8px', height: 30, display: 'flex', alignItems: 'center' }}
        >
          Reset
        </button>
        <button type="button" className="wi-btn wi-reset" onClick={onInc} aria-label="Increase text size" style={{ ...squareBtn, fontSize: 19 }}>
          A+
        </button>
      </div>
    </div>
  );
}
