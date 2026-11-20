import { fonts, colors } from '../../styles/theme';

const navButton = {
  fontFamily: fonts.display,
  fontSize: 14,
  letterSpacing: 1,
  color: colors.muted,
};

// Top utility bar: archive wordmark on the left, navigation on the right.
// Wraps and centres on phones (.wi-topbar).
// (A "Leave a Manuscript" submissions link is future work: the archive holds
// only the author's own stories for now.)
export default function TopBar({ onGoHome, onGoLibrary, onGoAbout }) {
  const nav = [
    ['Library', onGoLibrary],
    ['About', onGoAbout],
  ];

  return (
    <div
      className="wi-topbar"
      style={{
        position: 'relative',
        zIndex: 5,
        padding: 'clamp(16px, 4vw, 26px) clamp(16px, 4vw, 48px)',
        maxWidth: 1320,
        margin: '0 auto',
      }}
    >
      <button
        type="button"
        onClick={onGoHome}
        className="wi-navlink wi-reset"
        style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 3, color: colors.muted }}
      >
        The WhisperInk Archive
      </button>
      <nav aria-label="Main" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px clamp(14px, 4vw, 30px)' }}>
        {nav.map(([label, action]) => (
          <button key={label} type="button" onClick={action} className="wi-navlink wi-reset" style={navButton}>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
