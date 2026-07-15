import { fonts } from '../../styles/theme';

// Renders one story block. Sizes use `em` so the reader's font-scale control
// (applied to the container) scales headings, paragraphs, and breaks together.
export default function StoryBlock({ block }) {
  if (block.isHead) {
    return (
      <div style={{ fontFamily: fonts.display, fontSize: '1.3em', letterSpacing: 0.5, color: '#6b1f2a', margin: '38px 0 14px' }}>
        {block.text}
      </div>
    );
  }

  if (block.isBreak) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '34px 0' }}>
        <span style={{ width: 60, height: 1, background: 'rgba(120,90,50,.4)' }} />
        <span style={{ fontFamily: fonts.english, color: '#9a6a2e', fontSize: 18 }}>❧</span>
        <span style={{ width: 60, height: 1, background: 'rgba(120,90,50,.4)' }} />
      </div>
    );
  }

  return <p style={{ fontSize: '1em', lineHeight: 1.85, margin: '0 0 18px' }}>{block.text}</p>;
}
