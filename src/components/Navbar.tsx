import { useEffect, useState } from 'react';

const navItems = [
  { id: 'about', label: 'Logbook' },
  { id: 'skills', label: 'Radar' },
  { id: 'projects', label: 'Missions' },
  { id: 'internship', label: 'Training' },
  { id: 'activities', label: 'Ops' },
  { id: 'contact', label: 'Comms' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navItems.map(n => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(2,11,24,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polygon points="14,1 27,24 14,19 1,24" fill="none" stroke="#00f5ff" strokeWidth="1.2" opacity="0.9"/>
            <circle cx="14" cy="14" r="3" fill="#00f5ff" opacity="0.5"/>
          </svg>
          <span className="text-xs tracking-widest font-bold" style={{ color: 'var(--cyan)' }}>NS</span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link ${active === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Resume download */}
        <a
          href="/Nischal_Sharma_Updated_Resume.pdf"
          download
          className="btn-secondary text-xs py-2 px-4"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Resume
        </a>
      </div>
    </nav>
  );
}
