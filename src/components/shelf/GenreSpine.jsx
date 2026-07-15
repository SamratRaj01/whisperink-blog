import { fonts } from '../../styles/theme';
import { spineBg } from '../../utils/gradients';
import { genreMeta } from '../../data/genres';
import Motif from '../Motif';

// A single book spine on the shelf. Brightness reflects selection state:
// full when active, dimmed when another genre is selected, neutral otherwise.
export default function GenreSpine({ genre, selected, filtered, onSelect }) {
  const meta = genreMeta[genre.id] || genreMeta.horror;
  const bright = selected ? 1.16 : filtered ? 0.74 : 1;

  return (
    <div
      className="wi-spine"
      onClick={() => onSelect(genre.id)}
      style={{
        // exposed to the CSS hover rule for the glow colour
        '--wi-halo': genre.halo,
        position: 'relative',
        width: 64,
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
      <div style={{ width: 32, height: 34, opacity: 0.92 }}>
        <Motif name={meta.motif} color={genre.foil} />
      </div>
      <span
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
      <span style={{ fontFamily: fonts.serif, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
        {genre.count}
      </span>
    </div>
  );
}
