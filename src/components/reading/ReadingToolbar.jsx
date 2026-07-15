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
        padding: '16px 40px',
        background: 'linear-gradient(180deg, rgba(12,10,11,.96), rgba(12,10,11,.78))',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(167,123,63,.22)',
      }}
    >
      <div
        className="wi-link"
        onClick={onReturn}
        style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 1, color: '#c2ab84' }}
      >
        ← Return to the Library
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 1, color: '#7d6238', marginRight: 8 }}>
          Text Size
        </span>
        <span className="wi-btn" onClick={onDec} style={{ ...squareBtn, fontSize: 14 }}>
          A−
        </span>
        <span
          className="wi-link"
          onClick={onReset}
          style={{ fontFamily: fonts.display, fontSize: 11, letterSpacing: 1, color: '#9a8a6e', padding: '0 8px', height: 30, display: 'flex', alignItems: 'center' }}
        >
          Reset
        </span>
        <span className="wi-btn" onClick={onInc} style={{ ...squareBtn, fontSize: 19 }}>
          A+
        </span>
      </div>
    </div>
  );
}
