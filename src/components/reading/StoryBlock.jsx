import { Fragment } from 'react';
import { fonts } from '../../styles/theme';

// Inline text runs ({ text, em?, strong? } or { br }) → React elements.
// Story text is always rendered as text, never as HTML.
function Runs({ runs }) {
  return runs.map((r, i) => {
    if (r.br) return <br key={i} />;
    let node = r.text;
    if (r.em) node = <em>{node}</em>;
    if (r.strong) node = <strong style={{ fontWeight: 500 }}>{node}</strong>;
    return <Fragment key={i}>{node}</Fragment>;
  });
}

// Renders one story block: { type: 'h' | 'p' | 'hr', runs }. Sizes use `em`
// so the reader's font-scale control (applied to the container) scales
// headings, paragraphs, and breaks together.
export default function StoryBlock({ block }) {
  if (block.type === 'h') {
    return (
      <h2 className="wi-heading" style={{ fontFamily: fonts.display, fontSize: '1.3em', letterSpacing: 0.5, color: '#6b1f2a', margin: '38px 0 14px' }}>
        <Runs runs={block.runs} />
      </h2>
    );
  }

  if (block.type === 'hr') {
    return (
      <div role="separator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '34px 0' }}>
        <span style={{ width: 60, height: 1, background: 'rgba(120,90,50,.4)' }} />
        <span aria-hidden="true" style={{ fontFamily: fonts.english, color: '#9a6a2e', fontSize: 18 }}>❧</span>
        <span style={{ width: 60, height: 1, background: 'rgba(120,90,50,.4)' }} />
      </div>
    );
  }

  return (
    <p style={{ fontSize: '1em', lineHeight: 1.85, margin: '0 0 18px' }}>
      <Runs runs={block.runs} />
    </p>
  );
}
