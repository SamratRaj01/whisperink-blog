// Hand-drawn ink motifs — one small SVG per genre, rendered through the
// `wi-rough` displacement filter for a scratchy, inked feel.
// Consumed by <Motif />, which sets `currentColor` per usage.

const open =
  'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';

export const motifs = {
  eye: `<svg viewBox="0 0 120 88" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <path d="M8 44 C40 9 80 9 112 44 C80 79 40 79 8 44 Z"/>
    <circle cx="60" cy="44" r="17"/>
    <circle cx="60" cy="44" r="6.5" fill="currentColor" stroke="none"/>
    <path d="M60 61 C57 71 56 80 60 86 C64 80 63 71 60 61 Z" fill="currentColor" stroke="none" opacity=".7"/>
    <path d="M14 31 L6 23 M34 19 L30 9 M60 15 L60 4 M86 19 L90 9 M106 31 L114 23" stroke-width="1.6"/>
  </g></svg>`,
  flower: `<svg viewBox="0 0 90 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <path d="M48 116 C46 92 52 78 48 62"/>
    <path d="M48 62 C40 56 30 58 25 50"/>
    <path d="M25 50 C15 44 11 33 18 27 C22 35 28 40 30 48"/>
    <path d="M25 50 C29 39 40 35 48 39 C40 44 33 50 30 52"/>
    <path d="M25 50 C19 53 11 51 9 44"/>
    <circle cx="24" cy="46" r="3.6"/>
    <path d="M48 86 C60 82 68 86 70 95 C59 97 51 92 48 86 Z"/>
    <path d="M66 70 C72 66 78 70 76 76 C72 79 67 76 66 70 Z"/>
  </g></svg>`,
  mirror: `<svg viewBox="0 0 90 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <ellipse cx="45" cy="46" rx="31" ry="37"/>
    <ellipse cx="45" cy="46" rx="23" ry="29"/>
    <path d="M38 81 L40 110 Q45 117 50 110 L52 81"/>
    <path d="M30 30 L48 50 L40 64 L58 60" stroke-width="1.4"/>
    <circle cx="40" cy="42" r="1.7" fill="currentColor" stroke="none"/>
    <circle cx="52" cy="42" r="1.7" fill="currentColor" stroke="none"/>
    <path d="M40 56 Q46 60 52 56" stroke-width="1.4" opacity=".7"/>
  </g></svg>`,
  heartstitch: `<svg viewBox="0 0 110 108" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <path d="M55 92 C20 66 10 42 22 28 C32 16 48 22 55 36 C62 22 78 16 88 28 C100 42 90 66 55 92 Z"/>
    <path d="M55 36 L55 86" stroke-dasharray="5 6" stroke-width="1.6"/>
    <path d="M50 48 L60 54 M60 48 L50 54" stroke-width="1.4"/>
    <path d="M50 64 L60 70 M60 64 L50 70" stroke-width="1.4"/>
    <path d="M51 78 L59 82 M59 78 L51 82" stroke-width="1.4"/>
  </g></svg>`,
  moth: `<svg viewBox="0 0 120 108" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <path d="M60 30 C57 50 57 72 60 88 C63 72 63 50 60 30 Z" fill="currentColor" stroke="none" opacity=".85"/>
    <path d="M60 30 C54 20 48 16 42 16 M60 30 C66 20 72 16 78 16"/>
    <path d="M60 36 C40 18 14 18 8 40 C12 58 36 60 58 52"/>
    <path d="M60 36 C80 18 106 18 112 40 C108 58 84 60 62 52"/>
    <path d="M60 56 C46 56 30 64 30 82 C44 90 56 78 60 70"/>
    <path d="M60 56 C74 56 90 64 90 82 C76 90 64 78 60 70"/>
    <circle cx="30" cy="40" r="4"/><circle cx="90" cy="40" r="4"/>
  </g></svg>`,
  tv: `<svg viewBox="0 0 120 104" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ${open}><g filter="url(#wi-rough)">
    <path d="M48 26 L34 8 M72 26 L86 8"/>
    <rect x="20" y="26" width="80" height="62" rx="6"/>
    <rect x="28" y="34" width="50" height="46" rx="3"/>
    <circle cx="89" cy="42" r="3.5"/><circle cx="89" cy="56" r="3.5"/>
    <path d="M36 58 C44 73 62 73 70 58"/>
    <path d="M41 60 L43 67 M49 62 L49 70 M57 62 L57 70 M64 60 L62 67" stroke-width="1.3"/>
    <circle cx="44" cy="46" r="2.2" fill="currentColor" stroke="none"/><circle cx="62" cy="46" r="2.2" fill="currentColor" stroke="none"/>
    <path d="M31 50 L41 50 M58 52 L74 52 M33 71 L52 71" stroke-width="0.9" opacity=".5"/>
  </g></svg>`,
};
