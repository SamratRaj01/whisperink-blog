// Builders for the recurring two-stop gradients used on covers and spines.
// Pure functions with no imports — also used at build time by the content
// plugin (scripts/vite-content-plugin.js).

// Zine-cover background: soft top-left sheen over a diagonal colour wash.
export const coverBg = (c) =>
  `radial-gradient(120% 85% at 28% 16%, rgba(255,255,255,.05), transparent 52%), linear-gradient(165deg, ${c[0]}, ${c[1]})`;

// Book-spine background: edge shading over a vertical colour wash.
export const spineBg = (spine) =>
  `linear-gradient(90deg, rgba(0,0,0,.45), transparent 16%, transparent 82%, rgba(0,0,0,.5)), linear-gradient(180deg, ${spine[0]}, ${spine[1]})`;

// ---------- derived covers ----------
// A story without a hand-picked `cover` gets its genre's spine colours,
// darkened slightly (covers sit a shade deeper than spines) and nudged in hue
// and lightness by a hash of its slug, so a shelf of new stories still looks
// hand-varied — and the same story always gets the same cover.

const hash = (s) => {
  let h = 0x811c9dc5; // FNV-1a
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
  return h >>> 0;
};

const hexToHsl = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
};

const hslToHex = (h, s, l) => {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
};

export const deriveCover = (spine, slug) => {
  const h = hash(slug);
  const jitterL = ((h & 0xff) / 255) * 0.025; // 0 … +2.5%
  const jitterH = (((h >> 8) & 0xff) / 255 - 0.5) * 10; // ±5°
  return spine.map((hex) => {
    const [hue, sat, light] = hexToHsl(hex);
    return hslToHex((hue + jitterH + 360) % 360, sat, Math.max(0.04, light - 0.04 + jitterL));
  });
};
