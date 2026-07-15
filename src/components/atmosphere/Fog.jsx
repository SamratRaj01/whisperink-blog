// Slow-drifting fog wash that adds depth over the backdrop.
export default function Fog() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-20%',
        right: '-20%',
        top: '4%',
        height: '72%',
        pointerEvents: 'none',
        opacity: 0.42,
        mixBlendMode: 'screen',
        filter: 'blur(46px)',
        background:
          'radial-gradient(50% 60% at 32% 50%, rgba(70,78,92,.5), transparent 70%), radial-gradient(46% 50% at 72% 42%, rgba(58,52,46,.5), transparent 72%)',
        animation: 'wi-fog 30s ease-in-out infinite',
      }}
    />
  );
}
