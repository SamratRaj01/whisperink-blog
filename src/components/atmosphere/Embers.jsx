// Warm embers drifting upward from the base of the page.
const EMBERS = [
  { left: '12%', bottom: '4%', size: 3, duration: '16s', delay: '0s' },
  { left: '31%', bottom: '1%', size: 2, duration: '21s', delay: '4s' },
  { left: '57%', bottom: '6%', size: 3, duration: '19s', delay: '9s' },
  { left: '79%', bottom: '2%', size: 2, duration: '24s', delay: '2s' },
  { left: '90%', bottom: '8%', size: 3, duration: '18s', delay: '12s' },
];

export default function Embers() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {EMBERS.map((e, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            borderRadius: '50%',
            background: '#e8b777',
            boxShadow: `0 0 ${e.size > 2 ? 8 : 7}px 2px rgba(232,183,119,.65)`,
            animation: `wi-ember ${e.duration} linear infinite ${e.delay}`,
          }}
        />
      ))}
    </div>
  );
}
