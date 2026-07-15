// Builders for the recurring two-stop gradients used on covers and spines.

// Zine-cover background: soft top-left sheen over a diagonal colour wash.
export const coverBg = (c) =>
  `radial-gradient(120% 85% at 28% 16%, rgba(255,255,255,.05), transparent 52%), linear-gradient(165deg, ${c[0]}, ${c[1]})`;

// Book-spine background: edge shading over a vertical colour wash.
export const spineBg = (spine) =>
  `linear-gradient(90deg, rgba(0,0,0,.45), transparent 16%, transparent 82%, rgba(0,0,0,.5)), linear-gradient(180deg, ${spine[0]}, ${spine[1]})`;
