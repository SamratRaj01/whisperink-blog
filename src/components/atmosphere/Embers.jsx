// Warm embers drifting upward from the base of the page.
//
// Each ember climbs at a steady rate (the "rise"), but its path is noisy:
// three nested sine oscillators with unrelated periods (a slow sway, a quick
// sideways jitter and a small vertical bob) are summed on top of the climb, and
// the spark itself flickers. Because the periods never line up, the path
// never visibly repeats. Everything is CSS transforms, run on the compositor.
// Keyframes live in styles/index.css (wi-ember-*).

// Global speed multiplier for the climb: 1 = original pace, 2 = twice as fast.
const SPEED = 1;

// Where each ember starts, how big it is, and how long one climb takes (s).
// `offset` (s) staggers the embers: they start that far into their climb, so
// nothing sits frozen on screen at page load.
const BASE = [
  { left: '12%', bottom: '4%', size: 3, rise: 16, offset: 0 },
  { left: '31%', bottom: '1%', size: 2, rise: 21, offset: 4 },
  { left: '57%', bottom: '6%', size: 3, rise: 19, offset: 9 },
  { left: '79%', bottom: '2%', size: 2, rise: 24, offset: 2 },
  { left: '90%', bottom: '8%', size: 3, rise: 18, offset: 12 },
];

// Noise ranges: [min, max]. Amplitudes in px, half-periods in seconds.
const NOISE = {
  drift: [18, 56], // net sideways travel over the whole climb
  swayAmp: [10, 22],
  swayPeriod: [5.5, 9.5],
  jitterAmp: [3, 7],
  jitterPeriod: [1.6, 2.9],
  bobAmp: [3, 8], // vertical wobble: the ember briefly speeds up / slows down
  bobPeriod: [2.1, 3.9],
  flicker: [1.2, 2.6],
};

// Small seeded PRNG (mulberry32) so the embers look the same on every visit.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(0xe4be5);
const pick = ([min, max]) => min + rand() * (max - min);

const EMBERS = BASE.map((e) => {
  const osc = (amp, period) => {
    const duration = pick(period);
    // Random phase: start somewhere inside the cycle (negative delay).
    return { amp: pick(amp), duration, delay: -rand() * duration };
  };
  const flicker = pick(NOISE.flicker);
  return {
    ...e,
    drift: pick(NOISE.drift),
    sway: osc(NOISE.swayAmp, NOISE.swayPeriod),
    jitter: osc(NOISE.jitterAmp, NOISE.jitterPeriod),
    bob: osc(NOISE.bobAmp, NOISE.bobPeriod),
    flicker: { duration: flicker, delay: -rand() * flicker },
  };
});

const oscillate = (name, o) => ({
  '--wi-a': `${o.amp.toFixed(1)}px`,
  animation: `${name} ${o.duration.toFixed(2)}s ease-in-out ${o.delay.toFixed(2)}s infinite alternate`,
});

export default function Embers() {
  return (
    <div className="wi-embers" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {EMBERS.map((e, i) => (
        // rise: the steady climb + fade envelope (unchanged pace)
        <div
          key={i}
          style={{
            position: 'absolute',
            left: e.left,
            bottom: e.bottom,
            '--wi-drift': `${e.drift.toFixed(1)}px`,
            animation: `wi-ember-rise ${(e.rise / SPEED).toFixed(2)}s linear ${(-e.offset / SPEED).toFixed(2)}s infinite`,
          }}
        >
          <div style={oscillate('wi-ember-sway', e.sway)}>
            <div style={oscillate('wi-ember-sway', e.jitter)}>
              <div style={oscillate('wi-ember-bob', e.bob)}>
                <div
                  style={{
                    width: e.size,
                    height: e.size,
                    borderRadius: '50%',
                    background: '#e8b777',
                    boxShadow: `0 0 ${e.size > 2 ? 8 : 7}px 2px rgba(232,183,119,.65)`,
                    animation: `wi-ember-flicker ${e.flicker.duration.toFixed(2)}s ease-in-out ${e.flicker.delay.toFixed(2)}s infinite`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
