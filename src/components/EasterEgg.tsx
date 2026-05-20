import { useEffect, useState } from 'react';

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'idle' | 'countdown' | 'takeoff' | 'done'>('idle');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) return;
      const next = (typed + e.key).slice(-6);
      setTyped(next);
      if (next === 'pilot') {
        setActive(true);
        setPhase('countdown');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [typed, active]);

  useEffect(() => {
    if (phase === 'countdown') {
      let c = 3;
      setCountdown(c);
      const t = setInterval(() => {
        c--;
        setCountdown(c);
        if (c <= 0) {
          clearInterval(t);
          setPhase('takeoff');
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
              setActive(false);
              setPhase('idle');
              setTyped('');
            }, 800);
          }, 2800);
        }
      }, 800);
      return () => clearInterval(t);
    }
  }, [phase]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'rgba(2,11,24,0.97)',
        animation: phase === 'done' ? 'fadeOut 0.8s ease forwards' : undefined,
      }}
      onClick={() => { setActive(false); setPhase('idle'); setTyped(''); }}
    >
      <div className="grid-bg absolute inset-0" />
      <div className="relative z-10 text-center">
        {phase === 'countdown' && (
          <>
            <div className="section-tag mb-4">EASTER EGG ACTIVATED</div>
            <div className="text-xl mb-6" style={{ color: 'var(--cyan)' }}>INITIATING TAKEOFF SEQUENCE</div>
            <div
              className="text-8xl font-bold"
              style={{ color: 'var(--cyan)', textShadow: '0 0 40px var(--cyan)', fontFamily: 'monospace' }}
            >
              {countdown}
            </div>
          </>
        )}
        {phase === 'takeoff' && (
          <>
            <div className="section-tag mb-6">MISSION: CLEARED FOR TAKEOFF</div>
            <div
              className={`text-8xl jet-takeoff`}
              style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
            >
              ✈
            </div>
            <div className="mt-8 text-sm tracking-widest" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
              THE SKY IS NOT THE LIMIT — IT'S HOME
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-8 text-xs tracking-widest" style={{ color: 'rgba(0,245,255,0.3)' }}>
        Click anywhere to dismiss
      </div>
      <style>{`
        @keyframes fadeOut {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
