// The derelict-interior scene behind the hero: ceiling, walls, floor runner,
// a cold stairwell with a distant figure, a flickering broken light, and a
// legibility scrim. Purely decorative CSS art — no image assets.
export default function Backdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 900,
        pointerEvents: 'none',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(180deg, #000 50%, transparent 94%)',
        maskImage: 'linear-gradient(180deg, #000 50%, transparent 94%)',
        opacity: 0.92,
      }}
    >
      {/* ceiling */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0,100% 0,60% 25%,40% 25%)', background: 'linear-gradient(180deg,#15110f,#0b0908)' }} />

      {/* left wall */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0,40% 25%,40% 60%,0 100%)', background: 'linear-gradient(90deg,#3a2620 0%,#1a1210 100%)' }}>
        <div style={{ position: 'absolute', left: '7%', top: '33%', width: '9%', height: '20%', transform: 'skewY(9deg)', border: '1px solid rgba(86,64,50,.4)', background: 'rgba(18,13,11,.5)', boxShadow: 'inset 0 0 12px rgba(0,0,0,.5)' }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '34%', height: '22%', background: 'linear-gradient(180deg, transparent, rgba(10,7,6,.55))', transform: 'skewY(10deg)' }} />
      </div>

      {/* right wall */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(100% 0,60% 25%,60% 60%,100% 100%)', background: 'linear-gradient(270deg,#3a2620 0%,#1a1210 100%)' }}>
        <div style={{ position: 'absolute', right: '7%', top: '33%', width: '9%', height: '20%', transform: 'skewY(-9deg)', border: '1px solid rgba(86,64,50,.4)', background: 'rgba(18,13,11,.5)', boxShadow: 'inset 0 0 12px rgba(0,0,0,.5)' }} />
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '34%', height: '22%', background: 'linear-gradient(180deg, transparent, rgba(10,7,6,.55))', transform: 'skewY(-10deg)' }} />
      </div>

      {/* floor with faded red runner */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 100%,100% 100%,60% 60%,40% 60%)', background: 'radial-gradient(46% 120% at 50% 100%, rgba(96,30,32,.5) 0%, rgba(40,18,18,.4) 40%, transparent 66%), radial-gradient(70% 130% at 50% 100%, #221512 0%, #120d0b 55%, #0a0807 88%)' }} />

      {/* back wall: cold stairwell light */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(40% 25%,60% 25%,60% 60%,40% 60%)', background: 'radial-gradient(circle at 50% 40%, #5c6878 0%, #313c47 44%, #19222b 78%, #11181f 100%)' }}>
        {/* distant figure */}
        <div style={{ position: 'absolute', left: '48.4%', top: '38%', width: '3.2%', height: '19%', borderRadius: '45% 45% 0 0', background: 'linear-gradient(180deg, rgba(8,10,12,0), rgba(5,7,9,.6))', filter: 'blur(1.6px)' }} />
        {/* steps */}
        <div style={{ position: 'absolute', left: '43%', width: '14%', top: '50%', height: '9%', background: 'repeating-linear-gradient(180deg, rgba(150,165,180,.16) 0 2px, rgba(12,16,20,.5) 2px 7px)', opacity: 0.6 }} />
        {/* banister */}
        <div style={{ position: 'absolute', left: '56%', top: '44%', width: 1, height: '16%', background: 'rgba(150,165,180,.3)', transform: 'skewX(-18deg)' }} />
      </div>

      {/* broken ceiling light glow */}
      <div style={{ position: 'absolute', left: '50%', top: '9%', transform: 'translateX(-50%)', width: 380, height: 240, background: 'radial-gradient(circle at 50% 0%, rgba(168,193,218,.2), transparent 62%)', animation: 'wi-flicker 5.5s steps(1,end) infinite' }} />
      {/* fluorescent tube + wires */}
      <div style={{ position: 'absolute', left: '50%', top: '8%', transform: 'translateX(-50%)', width: 128, height: 7, borderRadius: 3, background: 'linear-gradient(180deg,#cfd6dd,#79818c)', boxShadow: '0 0 28px 9px rgba(176,198,220,.28)', animation: 'wi-flicker 5.5s steps(1,end) infinite' }} />
      <div style={{ position: 'absolute', left: '46%', top: 0, width: 1, height: '8%', background: 'rgba(40,44,50,.7)' }} />
      <div style={{ position: 'absolute', left: '54%', top: 0, width: 1, height: '8%', background: 'rgba(40,44,50,.7)' }} />

      {/* legibility scrim behind hero text */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(58% 40% at 50% 22%, rgba(8,9,11,.64), transparent 70%), linear-gradient(180deg, rgba(8,9,11,.42), transparent 28%)' }} />
    </div>
  );
}
