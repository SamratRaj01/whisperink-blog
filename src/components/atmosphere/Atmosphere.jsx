import Backdrop from './Backdrop';
import Fog from './Fog';
import Embers from './Embers';
import Vignette from './Vignette';

// Composes the non-interactive scene layers that sit behind the page content:
// the mood colour wash, the derelict interior, drifting fog, embers, and the
// edge vignette. FilmGrain sits above everything and is rendered separately.
export default function Atmosphere({ pageBg }) {
  return (
    <>
      {/* mood atmosphere wash (prop-driven) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: pageBg }} />
      <Backdrop />
      <Fog />
      <Embers />
      <Vignette />
    </>
  );
}
