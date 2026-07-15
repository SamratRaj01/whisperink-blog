// A small oil lamp at the left end of the shelf, casting a flickering pool of
// warm light. Shown when the `showLamp` prop is enabled.
export default function Lamp() {
  return (
    <div style={{ position: 'relative', width: 78, height: 150, marginRight: 6, alignSelf: 'flex-end' }}>
      {/* light pool + flame core */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 230,
          height: 250,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,196,110,.4), rgba(255,160,70,.08) 46%, transparent 70%)',
          animation: 'wi-lamp 4.5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 115,
            transform: 'translateX(-50%)',
            width: 14,
            height: 22,
            borderRadius: '50% 50% 46% 46%',
            background: 'radial-gradient(circle at 50% 70%, #fff1c2, #ffb347 56%, #ff8a2e 84%)',
            boxShadow: '0 0 20px 6px rgba(255,160,70,.6)',
            animation: 'wi-lampcore 1.6s ease-in-out infinite',
            transformOrigin: 'bottom center',
            top: 165,
          }}
        />
      </div>
      {/* glass shade */}
      <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', width: 46, height: 40, borderRadius: '6px 6px 22px 22px', background: 'linear-gradient(180deg, rgba(255,210,150,.28), rgba(120,80,40,.25))', border: '1px solid rgba(180,140,80,.4)', boxShadow: 'inset 0 6px 14px rgba(255,200,140,.3)' }} />
      {/* brass body */}
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', width: 56, height: 44, borderRadius: '8px 8px 26px 26px', background: 'linear-gradient(180deg, #7a5a2c, #3c2a14)', boxShadow: 'inset -6px 0 10px rgba(0,0,0,.4), inset 4px 0 8px rgba(255,200,120,.18)' }} />
      {/* base */}
      <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 64, height: 12, borderRadius: '0 0 8px 8px', background: 'linear-gradient(180deg, #5a4220, #2a1c0c)' }} />
    </div>
  );
}
