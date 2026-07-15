import { fonts } from '../../styles/theme';

// Placeholder panel shown for the not-yet-released "Sitcom Horror" collection.
export default function ComingSoon() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '64px 24px 72px',
        border: '1px dashed rgba(167,123,63,.4)',
        borderRadius: 4,
        background: 'linear-gradient(180deg, rgba(90,68,32,.12), transparent)',
      }}
    >
      <div style={{ fontFamily: fonts.hand, fontSize: 26, lineHeight: 1.2, color: '#c8a24a', marginBottom: 22 }}>
        a new series is being recovered…
      </div>
      <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#E6DCC6', letterSpacing: 1, maxWidth: 560, lineHeight: 1.3 }}>
        Familiar living rooms, re-cut into something that should not be funny.
      </div>
      <div style={{ fontFamily: fonts.english, fontStyle: 'italic', fontSize: 19, color: '#8b8472', marginTop: 16, maxWidth: 520, lineHeight: 1.5 }}>
        The laugh track is still playing. No one in the room is laughing. The first reel arrives soon.
      </div>
      <div
        className="wi-btn"
        style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 2, color: '#d8c9a6', border: '1px solid rgba(167,123,63,.55)', borderRadius: 2, padding: '10px 22px', marginTop: 28 }}
      >
        Notify me when it opens
      </div>
    </div>
  );
}
