import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const bootLines = [
  'INITIALIZING MISSION CONTROL SYSTEMS...',
  'LOADING PILOT PROFILE: NISCHAL SHARMA',
  'CALIBRATING RADAR SYSTEMS...',
  'ESTABLISHING SECURE UPLINK...',
  'MOUNTING FLIGHT SYSTEMS v2.6.0',
  'RUNNING DIAGNOSTICS...',
  'ALL SYSTEMS NOMINAL',
  'CLEARANCE GRANTED. LAUNCHING PORTFOLIO...',
];

export default function LoadingScreen({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < bootLines.length) {
        setLines(prev => [...prev, bootLines[idx]]);
        setProgress(Math.round(((idx + 1) / bootLines.length) * 100));
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: '#020b18',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div className="grid-bg absolute inset-0" />

      <div className="relative z-10 w-full max-w-xl px-8">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <polygon points="24,2 46,40 24,32 2,40" fill="none" stroke="#00f5ff" strokeWidth="1.5" opacity="0.8"/>
              <polygon points="24,8 40,38 24,30 8,38" fill="rgba(0,245,255,0.1)" stroke="#0080ff" strokeWidth="1"/>
              <circle cx="24" cy="24" r="4" fill="#00f5ff" opacity="0.6"/>
            </svg>
            <div>
              <div className="text-xs tracking-widest" style={{ color: 'var(--cyan)', opacity: 0.6 }}>MISSION CONTROL</div>
              <div className="text-lg font-bold tracking-wider" style={{ color: 'var(--cyan)' }}>PORTFOLIO OS</div>
            </div>
          </div>
        </div>

        {/* Boot lines */}
        <div className="font-mono text-xs space-y-1.5 mb-8 h-48 overflow-hidden">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                color: i === lines.length - 1 ? 'var(--cyan)' : 'rgba(0,245,255,0.45)',
                animation: 'fadeInUp 0.3s ease forwards',
              }}
            >
              <span style={{ color: 'var(--teal)', opacity: 0.6 }}>{'>'}</span>
              <span>{line}</span>
              {i === lines.length - 1 && !done && (
                <span className="animate-blink" style={{ color: 'var(--cyan)' }}>_</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>
            <span>SYSTEM LOAD</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Corner decorations */}
        <div className="hud-corner hud-corner-tl" style={{ top: -20, left: -20 }} />
        <div className="hud-corner hud-corner-tr" style={{ top: -20, right: -20 }} />
        <div className="hud-corner hud-corner-bl" style={{ bottom: -20, left: -20 }} />
        <div className="hud-corner hud-corner-br" style={{ bottom: -20, right: -20 }} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
