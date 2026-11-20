import { fonts } from '../../styles/theme';
import { spineBg } from '../../utils/gradients';
import { genreMeta } from '../../data/genres';
import Motif from '../Motif';

// A single book spine on the shelf: a toggle button for that genre's
// collection. Brightness reflects selection state: full when active, dimmed
// when another genre is selected, neutral otherwise.
export default function GenreSpine({ genre, count, selected, filtered, onSelect }) {
  const meta = genreMeta[genre.id] || genreMeta.horror;
  const bright = selected ? 1.16 : filtered ? 0.74 : 1;
  const label = genre.soon
    ? `${genre.name} — coming soon`
    : `${genre.name} — ${count} ${genre.noun[count === 1 ? 0 : 1]}`;

  return (
    <button
      type="button"
      className="wi-spine wi-reset"
      onClick={() => onSelect(genre.id)}
      aria-pressed={selected}
      aria-label={label}
      style={{
        // exposed to the CSS hover rule for the glow colour
        '--wi-halo': genre.halo,
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(40px, 11vw, 64px)',
        height: genre.height,
        borderRadius: '2px 5px 5px 2px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '13px 0',
        background: spineBg(genre.spine),
        boxShadow: '5px 9px 20px rgba(0,0,0,.5), inset 0 0 1px rgba(255,255,255,.1)',
        filter: `brightness(${bright})`,
      }}
    >
      <span aria-hidden="true" style={{ display: 'block', width: 32, maxWidth: '80%', height: 34, opacity: 0.92 }}>
        <Motif as="span" name={meta.motif} color={genre.foil} />
      </span>
      <span
        aria-hidden="true"
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontFamily: fonts.display,
          fontSize: 15,
          letterSpacing: 1,
          color: genre.foil,
          textShadow: '0 1px 1px rgba(0,0,0,.55)',
        }}
      >
        {genre.name}
      </span>
      <span aria-hidden="true" style={{ fontFamily: fonts.serif, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
        {genre.soon ? 'soon' : count}
      </span>
    </button>
  );
}
