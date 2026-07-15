import { fonts, colors } from '../../styles/theme';

const NAV = ['Library', 'About', 'Leave a Manuscript'];

// Top utility bar: archive wordmark on the left, navigation on the right.
export default function TopBar({ onGoHome, onGoLibrary, onGoAbout, onGoManuscript }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '26px 48px',
        maxWidth: 1320,
        margin: '0 auto',
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
          fontSize: 14,
          letterSpacing: 3,
          color: colors.muted,
          textAlign: 'left',
        }}
      >
        The WhisperInk Archive
      </button>
      <div style={{ display: 'flex', gap: 30, fontFamily: fonts.display, fontSize: 14, letterSpacing: 1 }}>
        {NAV.map((item) => {
          const action = item === 'Library' ? onGoLibrary : item === 'About' ? onGoAbout : onGoManuscript;

          return (
            <button
              key={item}
              type="button"
              onClick={action}
              className="wi-navlink"
              style={{
                appearance: 'none',
                background: 'transparent',
                border: 'none',
                padding: 0,
                fontFamily: fonts.display,
                fontSize: 14,
                letterSpacing: 1,
                color: colors.muted,
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
