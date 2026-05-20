import { useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function BasketballIcon() {
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setBounce(b => !b), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontSize: '2rem', animation: 'bounce-ball 1.2s ease infinite', transformOrigin: 'bottom center' }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" fill="rgba(255,107,53,0.2)" stroke="#ff6b35" strokeWidth="1.5"/>
        <path d="M18,2 Q22,18 18,34" stroke="#ff6b35" strokeWidth="1" fill="none"/>
        <path d="M18,2 Q14,18 18,34" stroke="#ff6b35" strokeWidth="1" fill="none"/>
        <path d="M2,18 Q18,14 34,18" stroke="#ff6b35" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}

function CarIcon() {
  const [pos, setPos] = useState(-40);
  useEffect(() => {
    let p = -40;
    const t = setInterval(() => {
      p += 2;
      if (p > 40) p = -40;
      setPos(p);
    }, 30);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', height: 48, overflow: 'hidden', width: '100%' }}>
      <div style={{ position: 'absolute', bottom: 6, left: `calc(50% + ${pos}px)`, transition: 'none' }}>
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <rect x="4" y="10" width="40" height="10" rx="3" fill="rgba(0,128,255,0.2)" stroke="#0080ff" strokeWidth="1"/>
          <path d="M10,10 L14,4 L34,4 L38,10" fill="rgba(0,128,255,0.15)" stroke="#0080ff" strokeWidth="1"/>
          <circle cx="13" cy="20" r="4" fill="rgba(0,128,255,0.3)" stroke="#0080ff" strokeWidth="1"/>
          <circle cx="35" cy="20" r="4" fill="rgba(0,128,255,0.3)" stroke="#0080ff" strokeWidth="1"/>
          <circle cx="13" cy="20" r="2" fill="#0080ff" opacity="0.5"/>
          <circle cx="35" cy="20" r="2" fill="#0080ff" opacity="0.5"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, height: 1, background: 'rgba(0,128,255,0.2)' }} />
    </div>
  );
}

function GalaxyIcon() {
  return (
    <div className="relative" style={{ width: 48, height: 48 }}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: i % 2 === 0 ? 'var(--cyan)' : '#0080ff',
            top: `${50 + 40 * Math.sin(i * 60 * Math.PI / 180)}%`,
            left: `${50 + 40 * Math.cos(i * 60 * Math.PI / 180)}%`,
            animation: `star-twinkle ${1 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', opacity: 0.6 }} />
      </div>
      <style>{`
        @keyframes star-twinkle {
          0%,100% { opacity:0.2; transform:scale(0.8); }
          50% { opacity:1; transform:scale(1.4); }
        }
      `}</style>
    </div>
  );
}

const activities = [
  {
    id: 'ACT-01',
    title: 'NCC Air Wing Cadet',
    category: 'MILITARY TRAINING',
    desc: 'Active NCC Air Wing cadet. Developing aviation skills, discipline, and leadership under structured military training protocol.',
    badge: 'ACTIVE CADET',
    badgeColor: 'var(--cyan)',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,2 34,28 18,22 2,28" fill="rgba(0,245,255,0.1)" stroke="var(--cyan)" strokeWidth="1.5"/>
        <polygon points="18,6 30,26 18,20 6,26" fill="rgba(0,245,255,0.05)" stroke="rgba(0,245,255,0.4)" strokeWidth="1"/>
        <circle cx="18" cy="18" r="3" fill="var(--cyan)" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'ACT-02',
    title: '24-Hour Hackathon',
    category: 'COMPETITIVE CODING',
    desc: 'Participated in an intense 24-hour college hackathon. Built solutions under pressure, showcasing rapid prototyping and teamwork.',
    badge: '24H SPRINT',
    badgeColor: '#ff6b35',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="28" height="20" rx="2" fill="rgba(255,107,53,0.1)" stroke="#ff6b35" strokeWidth="1.5"/>
        <text x="18" y="24" textAnchor="middle" fontSize="12" fill="#ff6b35" fontFamily="monospace" fontWeight="bold">{'{}'}</text>
        <circle cx="28" cy="10" r="5" fill="#ff6b35" opacity="0.8"/>
        <text x="28" y="14" textAnchor="middle" fontSize="7" fill="#020b18" fontFamily="monospace" fontWeight="bold">!</text>
      </svg>
    ),
  },
];

const interests = [
  {
    title: 'Basketball',
    icon: <BasketballIcon />,
    color: '#ff6b35',
    desc: 'On-court strategy and teamwork',
  },
  {
    title: 'Automotive',
    icon: <CarIcon />,
    color: '#0080ff',
    desc: 'Cars & engineering passion',
  },
  {
    title: 'Science Fiction',
    icon: <GalaxyIcon />,
    color: 'var(--cyan)',
    desc: 'Future tech & space exploration',
  },
  {
    title: 'Coding',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M14,10 L8,18 L14,26" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22,10 L28,18 L22,26" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20,8 L16,28" stroke="rgba(0,212,170,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: '#00d4aa',
    desc: 'Continuous learning & building',
  },
];

export default function Activities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  return (
    <section id="activities" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">OPS RECORD — FIELD ACTIVITIES</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Activities & <span style={{ color: 'var(--cyan)' }}>Interests</span>
          </h2>
        </div>

        {/* Activities */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {activities.map((act, i) => (
            <div
              key={act.id}
              className="glass rounded-sm mission-card p-6 relative overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="hud-corner hud-corner-tl" style={{ borderColor: act.badgeColor }} />

              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-sm flex-shrink-0"
                  style={{ background: `${act.badgeColor}11`, border: `1px solid ${act.badgeColor}33` }}
                >
                  {act.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-base font-bold" style={{ color: '#e0f7fa' }}>{act.title}</span>
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{
                        border: `1px solid ${act.badgeColor}44`,
                        color: act.badgeColor,
                        fontSize: '0.5rem',
                        letterSpacing: '0.15em',
                        background: `${act.badgeColor}11`,
                      }}
                    >
                      {act.badge}
                    </span>
                  </div>
                  <div className="section-tag mb-2">{act.category}</div>
                  <p className="text-xs" style={{ color: 'rgba(224,247,250,0.5)', lineHeight: '1.7' }}>{act.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interests grid */}
        <div className="section-tag text-center mb-8">INTERESTS & PASSIONS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest, i) => (
            <div
              key={interest.title}
              className="glass rounded-sm mission-card p-5 text-center relative overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.9)',
                transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
              }}
            >
              <div className="flex justify-center mb-3">
                {interest.icon}
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: '#e0f7fa' }}>{interest.title}</div>
              <div className="text-xs" style={{ color: 'rgba(224,247,250,0.4)' }}>{interest.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
