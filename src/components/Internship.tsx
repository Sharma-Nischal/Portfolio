import { useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const modules = [
  { label: 'Frontend Development', progress: 90, color: 'var(--cyan)' },
  { label: 'Backend Architecture', progress: 78, color: '#0080ff' },
  { label: 'Full Stack Integration', progress: 82, color: '#00d4aa' },
  { label: 'API Design & Testing', progress: 70, color: '#ff6b35' },
];

export default function Internship() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [levels, setLevels] = useState(modules.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const timers = modules.map((m, i) =>
      setTimeout(() => {
        setLevels(prev => { const n = [...prev]; n[i] = m.progress; return n; });
      }, 300 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="internship" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">TRAINING SIMULATION — MODULE LOG</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Internship <span style={{ color: 'var(--cyan)' }}>Training</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="glass rounded-sm relative overflow-hidden"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease',
            }}
          >
            {/* Scan line */}
            <div className="scan-line" />
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="section-tag mb-2">TRAINING RECORD — MODULE ZEPHYR</div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#e0f7fa' }}>
                    Full Stack Web Development Intern
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: 'var(--cyan)' }}>Zephyr Technologies</span>
                    <span style={{ color: 'rgba(0,245,255,0.3)' }}>|</span>
                    <span className="text-xs" style={{ color: 'rgba(224,247,250,0.5)' }}>Duration: 1 Month</span>
                  </div>
                </div>

                <div
                  className="px-4 py-2 text-center"
                  style={{
                    border: '1px solid rgba(0,212,170,0.4)',
                    background: 'rgba(0,212,170,0.08)',
                  }}
                >
                  <div className="text-xs" style={{ color: 'rgba(0,212,170,0.6)', letterSpacing: '0.15em' }}>STATUS</div>
                  <div className="text-sm font-bold mt-1" style={{ color: '#00d4aa' }}>COMPLETED</div>
                </div>
              </div>

              {/* Mission objectives */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="section-tag mb-4">MISSION OBJECTIVES</div>
                  <div className="space-y-3">
                    {[
                      'Full stack web development concepts',
                      'Practical implementation of projects',
                      'Frontend and backend development',
                      'Real-world application architecture',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'rgba(224,247,250,0.6)', opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${0.5 + i * 0.1}s` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" style={{ marginTop: 3, flexShrink: 0, opacity: 0.7 }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill upgrade modules */}
                <div>
                  <div className="section-tag mb-4">SKILL UPGRADE — MODULES</div>
                  <div className="space-y-4">
                    {modules.map((m, i) => (
                      <div key={m.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs" style={{ color: 'rgba(224,247,250,0.55)' }}>{m.label}</span>
                          <span className="text-xs font-bold" style={{ color: m.color }}>{levels[i]}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${levels[i]}%`,
                              background: `linear-gradient(90deg, ${m.color}80, ${m.color})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overall progress */}
              <div
                className="rounded-sm p-4"
                style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="section-tag">OVERALL SKILL UPGRADE</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--cyan)' }}>+35% PROFICIENCY GAINED</span>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: inView ? '100%' : '0%',
                      height: '100%',
                      transition: 'width 2s cubic-bezier(0.4,0,0.2,1) 0.5s',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs" style={{ color: 'rgba(0,245,255,0.3)' }}>
                  <span>TRAINEE</span>
                  <span>DEVELOPER</span>
                  <span>ENGINEER</span>
                  <span>ARCHITECT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
