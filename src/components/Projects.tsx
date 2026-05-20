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

const projects = [
  {
    id: 'MISSION-01',
    name: 'Stock Management System',
    stack: ['Python', 'MySQL'],
    status: 'DEPLOYED',
    description: 'Full-featured inventory management system for an electronics shop. Handles stock records, product details, and transaction logging with a robust Python + MySQL backend.',
    features: ['Inventory CRUD operations', 'Product detail management', 'MySQL data persistence', 'Command-line interface'],
    color: 'var(--cyan)',
    preview: (
      <div className="rounded-sm overflow-hidden" style={{ background: 'rgba(0,128,255,0.05)', border: '1px solid rgba(0,128,255,0.15)', fontFamily: 'monospace', fontSize: '0.65rem' }}>
        <div style={{ background: 'rgba(0,128,255,0.15)', padding: '6px 10px', color: 'rgba(0,245,255,0.6)', display: 'flex', gap: 8 }}>
          <span>stock_db</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#4db8ff' }}>inventory</span>
        </div>
        <div style={{ padding: '10px', color: 'rgba(0,245,255,0.5)' }}>
          {[
            { id: '001', name: 'Arduino Uno', qty: 24, status: 'IN_STOCK' },
            { id: '002', name: 'ESP32 Module', qty: 8, status: 'LOW_STOCK' },
            { id: '003', name: 'Resistors 10k', qty: 500, status: 'IN_STOCK' },
          ].map(row => (
            <div key={row.id} className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(0,245,255,0.06)' }}>
              <span style={{ color: 'rgba(0,245,255,0.3)' }}>{row.id}</span>
              <span style={{ color: '#e0f7fa', flex: 1, paddingLeft: 8 }}>{row.name}</span>
              <span style={{ color: row.status === 'LOW_STOCK' ? '#ff6b35' : 'var(--teal)' }}>{row.qty}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'MISSION-02',
    name: 'Profile Card Webpage',
    stack: ['HTML', 'CSS'],
    status: 'LIVE',
    description: 'Beginner-friendly responsive profile card with polished UI design. Features smooth hover effects, proper alignment, and a clean modern aesthetic built purely with HTML & CSS.',
    features: ['Responsive layout', 'Hover animations', 'Custom styling', 'Cross-browser compatible'],
    color: '#00d4aa',
    preview: (
      <div className="rounded-sm overflow-hidden flex items-center justify-center p-4" style={{ background: 'rgba(0,212,170,0.04)', border: '1px solid rgba(0,212,170,0.15)', minHeight: 110 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,128,255,0.1))',
          border: '1px solid rgba(0,212,170,0.2)',
          borderRadius: 8,
          padding: '12px 20px',
          textAlign: 'center',
          minWidth: 160,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4aa, #0080ff)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
            <span style={{ color: '#020b18', fontWeight: 'bold', fontSize: '1rem' }}>NS</span>
          </div>
          <div style={{ color: '#e0f7fa', fontSize: '0.7rem', fontWeight: 'bold' }}>Nischal Sharma</div>
          <div style={{ color: 'rgba(0,212,170,0.6)', fontSize: '0.55rem', marginTop: 3 }}>Full Stack Developer</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
            {['GitHub', 'LinkedIn'].map(s => (
              <span key={s} style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 3, padding: '2px 6px', fontSize: '0.5rem', color: '#00d4aa' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [deployed, setDeployed] = useState<number | null>(null);

  const handleDeploy = (i: number) => {
    setDeployed(i);
    setTimeout(() => setDeployed(null), 2000);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">MISSION CONTROL — ACTIVE DEPLOYMENTS</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Mission <span style={{ color: 'var(--cyan)' }}>Files</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="glass rounded-sm mission-card relative overflow-hidden"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s ease ${i * 0.15}s`,
                borderColor: hoveredProject === i ? `${project.color}44` : 'var(--glass-border)',
              }}
            >
              {/* Scan line on hover */}
              {hoveredProject === i && <div className="scan-line" />}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="section-tag mb-1">{project.id}</div>
                    <h3 className="text-base font-bold" style={{ color: '#e0f7fa' }}>{project.name}</h3>
                  </div>
                  <span
                    className="text-xs px-2 py-1"
                    style={{
                      border: `1px solid ${project.color}55`,
                      color: project.color,
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      background: `${project.color}11`,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Stack tags */}
                <div className="flex gap-2 mb-4">
                  {project.stack.map(s => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1"
                      style={{
                        background: 'rgba(0,245,255,0.06)',
                        border: '1px solid rgba(0,245,255,0.15)',
                        color: 'rgba(0,245,255,0.7)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Preview */}
                <div className="mb-4">{project.preview}</div>

                {/* Description */}
                <p className="text-xs mb-4" style={{ color: 'rgba(224,247,250,0.5)', lineHeight: '1.7' }}>
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-5 grid grid-cols-2 gap-1.5">
                  {project.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(224,247,250,0.4)' }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: project.color, flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Deploy button */}
                <button
                  onClick={() => handleDeploy(i)}
                  className="btn-primary w-full justify-center"
                  style={{
                    borderColor: project.color,
                    color: deployed === i ? '#020b18' : project.color,
                  }}
                >
                  {deployed === i ? (
                    <>
                      <span>DEPLOYED</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      <span>Deploy Project</span>
                    </>
                  )}
                </button>
              </div>

              {/* HUD corners */}
              <div className="hud-corner hud-corner-tl" style={{ borderColor: project.color }} />
              <div className="hud-corner hud-corner-br" style={{ borderColor: project.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
