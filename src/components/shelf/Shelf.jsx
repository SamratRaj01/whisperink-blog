import { genres } from '../../data/genres';
import GenreSpine from './GenreSpine';
import Lamp from './Lamp';

// Floating dust motes shown above the shelf when `showDust` is enabled.
const DUST = [
  { left: '18%', bottom: 38, size: 3, duration: '12s', delay: '0s' },
  { left: '46%', bottom: 30, size: 4, duration: '15s', delay: '3s' },
  { left: '72%', bottom: 42, size: 3, duration: '13s', delay: '6s' },
];

// The bookshelf: a row of genre spines resting on a wooden plank, optionally
// lit by the lamp and dusted with drifting motes.
export default function Shelf({ selectedGenre, onSelectGenre, showLamp, showDust }) {
  return (
    <div style={{ position: 'relative', zIndex: 4, maxWidth: 1040, margin: '52px auto 0', padding: '0 32px' }}>
      {showDust &&
        DUST.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.left,
              bottom: d.bottom,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: '#cdb37a',
              boxShadow: '0 0 6px #cdb37a',
              animation: `wi-dust ${d.duration} linear infinite ${d.delay}`,
              pointerEvents: 'none',
            }}
          />
        ))}

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 14, height: 232, position: 'relative', zIndex: 2 }}>
        {showLamp && <Lamp />}
        {genres.map((g) => (
          <GenreSpine
            key={g.id}
            genre={g}
            selected={selectedGenre === g.id}
            filtered={selectedGenre !== 'all'}
            onSelect={onSelectGenre}
          />
        ))}
      </div>

      {/* shelf plank + soft shadow */}
      <div
        style={{
          height: 24,
          borderRadius: 3,
          boxShadow: '0 20px 44px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,220,160,.12), inset 0 -3px 6px rgba(0,0,0,.5)',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 1px, transparent 1px 60px), linear-gradient(180deg, #5a3f24, #261a11)',
        }}
      />
      <div style={{ height: 26, margin: '0 14px', borderRadius: '0 0 10px 10px', background: 'linear-gradient(180deg, rgba(0,0,0,.5), transparent)', filter: 'blur(3px)' }} />
    </div>
  );
}
