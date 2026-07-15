import { motifs } from '../data/motifs';

// Renders one hand-drawn ink motif in the given colour. The SVG uses
// `currentColor`, so setting `color` tints the whole drawing.
export default function Motif({ name, color, style }) {
  return (
    <div
      style={{
        color,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: motifs[name] || '' }}
    />
  );
}
