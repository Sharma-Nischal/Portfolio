import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Python', level: 82, category: 'BACKEND', angle: 0 },
  { name: 'HTML & CSS', level: 90, category: 'FRONTEND', angle: 51 },
  { name: 'Full Stack Dev', level: 75, category: 'FULLSTACK', angle: 102 },
  { name: 'MySQL', level: 78, category: 'DATABASE', angle: 153 },
  { name: 'C Programming', level: 72, category: 'SYSTEMS', angle: 204 },
  { name: 'Debugging', level: 88, category: 'DEVOPS', angle: 255 },
  { name: 'Turbo C', level: 65, category: 'SYSTEMS', angle: 306 },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

type Skill = { name: string; level: number; category: string; angle: number };

function RadarChart({ skills, active }: { skills: Skill[], active: number | null }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 20;
  const rings = [0.25, 0.5, 0.75, 1];

  const skillPoints = skills.map(s => {
    const rad = (s.angle - 90) * (Math.PI / 180);
    const r = (s.level / 100) * maxR;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  const polygon = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Rings */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r * maxR}
          fill="none"
          stroke="rgba(0,245,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      ))}

      {/* Axes */}
      {skills.map((s, i) => {
        const rad = (s.angle - 90) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(rad)}
            y2={cy + maxR * Math.sin(rad)}
            stroke="rgba(0,245,255,0.12)"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled polygon */}
      <polygon
        points={polygon}
        fill="rgba(0,245,255,0.07)"
        stroke="rgba(0,245,255,0.6)"
        strokeWidth="1.5"
      />

      {/* Skill dots */}
      {skillPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={active === i ? 6 : 4}
          fill={active === i ? '#00f5ff' : 'rgba(0,245,255,0.6)'}
          stroke={active === i ? '#00f5ff' : 'transparent'}
          strokeWidth="2"
          style={{ transition: 'all 0.2s ease', filter: active === i ? 'drop-shadow(0 0 6px #00f5ff)' : 'none' }}
        />
      ))}

      {/* Rotating sweep */}
      <line
        cx={cx}
        cy={cy}
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - maxR}
        stroke="rgba(0,245,255,0.25)"
        strokeWidth="1"
        style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'radar-sweep 5s linear infinite' }}
      />

      {/* Center */}
      <circle cx={cx} cy={cy} r={3} fill="var(--cyan)" opacity="0.5" />
    </svg>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [active, setActive] = useState<number | null>(null);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const timers = skills.map((s, i) =>
      setTimeout(() => {
        setAnimatedLevels(prev => {
          const next = [...prev];
          next[i] = s.level;
          return next;
        });
      }, i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">RADAR SYSTEMS — SKILL SCAN</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Tech <span style={{ color: 'var(--cyan)' }}>Arsenal</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Radar */}
          <div
            className="flex flex-col items-center"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.7s ease' }}
          >
            <div className="relative">
              <div
                className="rounded-full"
                style={{
                  padding: 24,
                  background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, rgba(2,11,24,0.8) 70%)',
                  border: '1px solid rgba(0,245,255,0.12)',
                  boxShadow: '0 0 40px rgba(0,245,255,0.08), inset 0 0 40px rgba(0,245,255,0.02)',
                }}
              >
                <RadarChart skills={skills} active={active} />
              </div>

              {/* Corner labels */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 section-tag text-center">SIGNAL MAP</div>
            </div>

            <div className="mt-4 text-xs" style={{ color: 'rgba(0,245,255,0.3)' }}>
              Hover skill cards to highlight on radar
            </div>
          </div>

          {/* Skill bars */}
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="glass rounded-sm p-4 mission-card"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                data-hover
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(30px)',
                  transition: `all 0.6s ease ${0.1 + i * 0.08}s`,
                  borderColor: active === i ? 'rgba(0,245,255,0.4)' : 'var(--glass-border)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'var(--cyan)',
                        boxShadow: active === i ? '0 0 8px var(--cyan)' : 'none',
                      }}
                    />
                    <span className="text-sm font-semibold" style={{ color: active === i ? 'var(--cyan)' : '#e0f7fa' }}>
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="section-tag">{skill.category}</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--cyan)', minWidth: '2.5rem', textAlign: 'right' }}>
                      {animatedLevels[i]}%
                    </span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${animatedLevels[i]}%` }} />
                </div>
                {active === i && (
                  <div className="mt-2 text-xs" style={{ color: 'rgba(0,245,255,0.4)' }}>
                    Signal strength: {animatedLevels[i] >= 85 ? 'STRONG' : animatedLevels[i] >= 70 ? 'NOMINAL' : 'DEVELOPING'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
