import { fonts } from '../../styles/theme';

// Dashed content-warning callout shown above stories that carry one.
export default function ContentWarning({ text }) {
  return (
    <div style={{ margin: '30px 0 8px', border: '1px dashed rgba(123,30,20,.55)', borderRadius: 3, background: 'rgba(123,30,20,.06)', padding: '18px 22px' }}>
      <div style={{ fontFamily: fonts.display, fontSize: 12, letterSpacing: 2, color: '#8a2418', marginBottom: 8, textTransform: 'uppercase' }}>
        ⚠ Content Warning
      </div>
      <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15.5, lineHeight: 1.55, color: '#5a3a26' }}>
        {text}
      </div>
    </div>
  );
}
