// Fixed film-grain overlay drawn over everything, including the reading view.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function FilmGrain() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        pointerEvents: 'none',
        opacity: 0.09,
        mixBlendMode: 'soft-light',
        backgroundImage: GRAIN,
        backgroundSize: '200px',
      }}
    />
  );
}
