import { useEffect, useRef, useState } from 'react';

const timeline = [
  {
    year: '2020',
    label: 'CLASS X — KENDRIYA VIDYALAYA DGQA CHENNAI',
    note: 'Foundation mission complete. Academic base established.',
    status: 'COMPLETED',
  },
  {
    year: '2022',
    label: 'CLASS XII — KENDRIYA VIDYALAYA DGQA CHENNAI',
    note: 'Pre-flight education. Physics & Mathematics mastered.',
    status: 'COMPLETED',
  },
  {
    year: '2022–NOW',
    label: 'BSc CS & MATHEMATICS — ST. ALOYSIUS UNIVERSITY',
    note: 'Active mission. Dual-discipline pursuit: tech + science.',
    status: 'ACTIVE',
  },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">PILOT LOGBOOK — MISSION DOSSIER</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            About the <span style={{ color: 'var(--cyan)' }}>Pilot</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Mission brief */}
          <div
            className="glass rounded-sm p-8 relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s ease 0.1s',
            }}
          >
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            <div className="section-tag mb-4">MISSION BRIEF</div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(224,247,250,0.65)', lineHeight: '1.9' }}>
              <p>
                Motivated and disciplined Computer Science and Mathematics student with a relentless drive to build, learn, and lead. I operate at the intersection of technology and aviation — two worlds that demand precision, discipline, and creative problem-solving.
              </p>
              <p>
                My codebase is my cockpit. Whether debugging a backend service or optimizing a front-end interface, I approach every task with the same focus I bring to NCC Air Wing training drills.
              </p>
              <p>
                Aspiring to serve in the <span style={{ color: 'var(--cyan)' }}>Indian Air Force</span> while continuing to build impactful software — because the best pilots are also the best problem solvers.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Projects', value: '2+' },
                { label: 'Internship', value: '1 Mo' },
                { label: 'NCC Wing', value: 'Air' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--cyan)' }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(0,245,255,0.45)', letterSpacing: '0.1em' }}>{stat.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Flight path timeline */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s ease 0.25s',
            }}
          >
            <div className="section-tag mb-6">FLIGHT PATH — EDUCATION LOG</div>

            <div className="relative pl-6">
              {/* Vertical track */}
              <div
                className="absolute left-2 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, var(--cyan), var(--blue), transparent)' }}
              />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative mb-8 last:mb-0"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${0.35 + i * 0.15}s`,
                  }}
                >
                  {/* Node */}
                  <div
                    className="absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      background: item.status === 'ACTIVE' ? 'var(--cyan)' : 'rgba(0,245,255,0.2)',
                      border: '1px solid var(--cyan)',
                      boxShadow: item.status === 'ACTIVE' ? '0 0 12px var(--cyan)' : 'none',
                    }}
                  >
                    {item.status === 'ACTIVE' && (
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse-glow" />
                    )}
                  </div>

                  <div className="glass rounded-sm p-4 ml-2">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="text-xs font-bold" style={{ color: 'var(--cyan)' }}>{item.year}</div>
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          border: `1px solid ${item.status === 'ACTIVE' ? 'var(--cyan)' : 'rgba(0,245,255,0.25)'}`,
                          color: item.status === 'ACTIVE' ? 'var(--cyan)' : 'rgba(0,245,255,0.4)',
                          fontSize: '0.55rem',
                          letterSpacing: '0.15em',
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: '#e0f7fa', letterSpacing: '0.03em' }}>{item.label}</div>
                    <div className="text-xs" style={{ color: 'rgba(224,247,250,0.45)' }}>{item.note}</div>
                  </div>
                </div>
              ))}

              {/* Plane at the end */}
              <div
                className="animate-float ml-2"
                style={{ color: 'var(--cyan)', filter: 'drop-shadow(0 0 6px var(--cyan))' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
