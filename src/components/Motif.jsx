import { motifs } from '../data/motifs';

// Renders one hand-drawn ink motif in the given colour. The SVG uses
// `currentColor`, so setting `color` tints the whole drawing.
//
// The markup comes only from the static, hand-authored `motifs` table. Never
// route story or other synced content through this innerHTML.
// `as="span"` keeps it valid inside buttons and other phrasing-only parents.
export default function Motif({ name, color, style, as: Tag = 'div' }) {
  return (
    <Tag
      aria-hidden="true"
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
