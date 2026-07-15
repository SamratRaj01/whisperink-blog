// Off-screen SVG filter that gives the ink motifs their scratchy edge.
// Referenced by the motif SVGs via `filter="url(#wi-rough)"`.
export default function RoughFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="wi-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
            result="t"
          />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="2.4" />
        </filter>
      </defs>
    </svg>
  );
}
