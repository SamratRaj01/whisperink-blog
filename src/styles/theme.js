// Shared design tokens — the single source of truth for fonts and the
// recurring colours used across the archive's UI.
export const fonts = {
  serif: "'EB Garamond', serif", // body copy
  display: "'IM Fell English SC', serif", // titles / small-caps display
  english: "'IM Fell English', serif", // italic english
  hand: "'Caveat', cursive", // handwritten scrawls
};

export const colors = {
  bg: '#0b0e12',
  ink: '#E6DCC6', // primary parchment text
  inkBright: '#ECE2CC',
  muted: '#9a8a6e', // muted brass
  mutedHover: '#e3d6ba',
  brass: '#A77B3F', // interactive accent / button fill
  brassLine: 'rgba(167,123,63,.55)',
  parchment: '#ebeacf', // reading-view background
};
