import { useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const strengths = [
  {
    id: 'STR-01',
    label: 'Quick Learner',
    score: 95,
    desc: 'Rapidly assimilates new technologies and concepts. Adapts mission parameters in real time.',
    icon: '⚡',
    color: 'var(--cyan)',
    tag: 'COGNITIVE AGILITY',
  },
  {
    id: 'STR-02',
    label: 'Disciplined & Goal-Oriented',
    score: 97,
    desc: 'Military-grade focus and execution. NCC training instilled systematic mission planning.',
    icon: '🎯',
    tag: 'OPERATIONAL FOCUS',
    color: '#0080ff',
  },
  {
    id: 'STR-03',
    label: 'Adaptable & Curious',
    score: 92,
    desc: 'Thrives in dynamic environments. Always scanning the horizon for new technologies.',
    icon: '🔭',
    tag: 'SYSTEM FLEXIBILITY',
    color: '#00d4aa',
  },
  {
    id: 'STR-04',
    label: 'Team Player',
    score: 90,
    desc: 'Strong collaborative instinct. Effective in both leadership and support roles.',
    icon: '🤝',
    tag: 'COMMS PROTOCOL',
    color: '#ff6b35',
  },
  {
    id: 'STR-05',
    label: 'Creative Mindset',
    score: 88,
    desc: 'Designs elegant solutions to complex problems. Brings a fresh perspective to every challenge.',
    icon: '💡',
    tag: 'INNOVATION ENGINE',
    color: 'var(--cyan)',
  },
];

function AIAnalysisBar({ score, color, inView, delay }: { score: number; color: string; inView: boolean; delay: number }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(score), delay);
    return () => clearTimeout(t);
  }, [inView, score, delay]);

  return (
    <div className="flex items-center gap-3">
      <div className="progress-bar flex-1">
        <div
          className="progress-fill"
          style={{
            width: `${animated}%`,
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color, minWidth: '2.5rem', textAlign: 'right' }}>{animated}%</span>
    </div>
  );
}

export default function Strengths() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [scanning, setScanning] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (inView && !scanning) {
      setScanning(true);
    }
  }, [inView, scanning]);

  useEffect(() => {
    if (!scanning) return;
    let pos = 0;
    const t = setInterval(() => {
      pos = (pos + 1) % 100;
      setScanLine(pos);
    }, 30);
    return () => clearInterval(t);
  }, [scanning]);

  return (
    <section id="strengths" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">AI ANALYSIS — PERSONALITY MATRIX SCAN</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Core <span style={{ color: 'var(--cyan)' }}>Strengths</span>
          </h2>
        </div>

        <div
          className="glass rounded-sm relative overflow-hidden"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Animated scan line overlay */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${scanLine}%`,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(0,245,255,0.4), rgba(0,245,255,0.2), transparent)',
              zIndex: 1,
            }}
          />

          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          {/* Panel header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(0,245,255,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: 'var(--cyan)' }} />
              <span className="section-tag">NEURAL ANALYSIS PANEL v3.1</span>
            </div>
            <div className="flex items-center gap-2">
              {scanning && <span className="section-tag animate-pulse-glow">SCANNING...</span>}
              <span className="text-xs" style={{ color: 'rgba(0,245,255,0.3)' }}>SUBJECT: NS-01</span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: strength cards */}
              <div className="space-y-5">
                {strengths.slice(0, 3).map((s, i) => (
                  <div
                    key={s.id}
                    className="relative p-4 rounded-sm"
                    style={{
                      background: 'rgba(0,245,255,0.02)',
                      border: '1px solid rgba(0,245,255,0.08)',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center text-sm"
                        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: '#e0f7fa' }}>{s.label}</div>
                        <div className="section-tag">{s.tag}</div>
                      </div>
                      <span className="ml-auto text-xs" style={{ color: s.color, fontWeight: 'bold' }}>{s.id}</span>
                    </div>
                    <AIAnalysisBar score={s.score} color={s.color} inView={inView} delay={400 + i * 150} />
                    <p className="mt-2 text-xs" style={{ color: 'rgba(224,247,250,0.4)', lineHeight: '1.6' }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right */}
              <div className="space-y-5">
                {strengths.slice(3).map((s, i) => (
                  <div
                    key={s.id}
                    className="relative p-4 rounded-sm"
                    style={{
                      background: 'rgba(0,245,255,0.02)',
                      border: '1px solid rgba(0,245,255,0.08)',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center text-sm"
                        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: '#e0f7fa' }}>{s.label}</div>
                        <div className="section-tag">{s.tag}</div>
                      </div>
                      <span className="ml-auto text-xs" style={{ color: s.color, fontWeight: 'bold' }}>{s.id}</span>
                    </div>
                    <AIAnalysisBar score={s.score} color={s.color} inView={inView} delay={550 + i * 150} />
                    <p className="mt-2 text-xs" style={{ color: 'rgba(224,247,250,0.4)', lineHeight: '1.6' }}>{s.desc}</p>
                  </div>
                ))}

                {/* Overall score */}
                <div
                  className="p-5 text-center rounded-sm"
                  style={{
                    background: 'rgba(0,245,255,0.04)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.8s',
                  }}
                >
                  <div className="section-tag mb-2">COMPOSITE SCORE</div>
                  <div
                    className="text-5xl font-bold holo-text mb-2"
                    style={{ fontFamily: 'monospace' }}
                  >
                    92.4
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>EXCEPTIONAL PROFILE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
