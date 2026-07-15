// Darkened edges that frame the scene and pull focus toward the hero.
export default function Vignette() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 220px 70px rgba(0,0,0,.62)',
        background: 'radial-gradient(125% 95% at 50% 26%, transparent 56%, rgba(0,0,0,.5) 100%)',
      }}
    />
  );
}
