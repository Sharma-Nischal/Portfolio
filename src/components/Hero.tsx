import { useEffect, useState, useRef } from 'react';

const phrases = [
  'Developer.',
  'Problem Solver.',
  'Future Air Force Pilot.',
  'Full Stack Engineer.',
  'NCC Air Wing Cadet.',
];

function useTypewriter(phrases: string[], speed = 80, pauseMs = 1600) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases, speed, pauseMs]);

  return text;
}

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random(),
      speed: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.opacity += s.speed * 0.02;
        if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${s.opacity * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function Hero() {
  const typedText = useTypewriter(phrases);
  const [launched, setLaunched] = useState(false);

  const handleLaunch = () => {
    setLaunched(true);
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      setLaunched(false);
    }, 800);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020b18 0%, #041428 40%, #071e33 70%, #020b18 100%)',
      }}
    >
      {/* Grid */}
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Stars */}
      <Stars />

      {/* Horizon glow */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: '30%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(0,128,255,0.5), rgba(0,245,255,0.3), transparent)',
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: '30%',
          height: '60px',
          background: 'linear-gradient(180deg, transparent, rgba(0,128,255,0.04))',
        }}
      />

      {/* Flying jet */}
      <div
        className="animate-fly absolute"
        style={{ top: '25%', fontSize: '2rem', zIndex: 2, filter: 'drop-shadow(0 0 8px #00f5ff)' }}
      >
        <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
          <path d="M55,14 L8,4 L12,14 L8,24 Z" fill="rgba(0,245,255,0.8)" stroke="#00f5ff" strokeWidth="0.5"/>
          <path d="M20,10 L8,4 L10,14 Z" fill="rgba(0,128,255,0.5)"/>
          <path d="M20,18 L8,24 L10,14 Z" fill="rgba(0,128,255,0.5)"/>
          <path d="M30,13 L24,8 L24,14 Z" fill="rgba(0,245,255,0.4)"/>
          <circle cx="52" cy="14" r="1.5" fill="#00f5ff" opacity="0.6"/>
          {/* Exhaust trail */}
          <line x1="8" y1="14" x2="0" y2="14" stroke="rgba(0,245,255,0.4)" strokeWidth="1.5" strokeDasharray="3,3"/>
        </svg>
      </div>

      {/* HUD elements */}
      <div className="absolute top-24 right-8 text-right hidden lg:block" style={{ color: 'rgba(0,245,255,0.25)', fontSize: '0.6rem', fontFamily: 'monospace' }}>
        <div>ALT: 35000 FT</div>
        <div>SPD: MACH 1.8</div>
        <div>HDG: 090°</div>
        <div>FUEL: FULL</div>
      </div>
      <div className="absolute top-24 left-8 hidden lg:block" style={{ color: 'rgba(0,245,255,0.25)', fontSize: '0.6rem', fontFamily: 'monospace' }}>
        <div>LAT: 12.9716° N</div>
        <div>LON: 79.1588° E</div>
        <div>SYS: NOMINAL</div>
        <div>PILOT: NS-01</div>
      </div>

      {/* Data streams (decorative vertical lines) */}
      {[15, 30, 55, 72, 88].map((left, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${left}%`,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.06), transparent)',
            animation: `data-stream ${3 + i * 0.7}s linear infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="section-tag mb-6">PILOT ID: NS-2024 | STATUS: ACTIVE</div>

        <h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          <span style={{ color: '#e0f7fa', display: 'block', marginBottom: '0.1em' }}>Nischal</span>
          <span className="holo-text" style={{ fontSize: '1.1em' }}>Sharma</span>
        </h1>

        <div className="flex items-center justify-center gap-3 mb-8 h-8">
          <span style={{ color: 'rgba(0,245,255,0.4)', fontSize: '0.9rem' }}>// </span>
          <span
            className="text-lg md:text-xl font-mono"
            style={{ color: 'var(--cyan)', minWidth: '260px', textAlign: 'left' }}
          >
            {typedText}
            <span className="animate-blink" style={{ color: 'var(--cyan)' }}>|</span>
          </span>
        </div>

        <p className="text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(224,247,250,0.55)', lineHeight: '1.8' }}>
          BSc Computer Science & Mathematics student building the future through code — and the skies through discipline. Dual mission. Singular focus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleLaunch}
            className="btn-primary"
            style={{ minWidth: 200 }}
          >
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease',
                transform: launched ? 'translateY(-40px) rotate(-20deg)' : 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </span>
            <span>Launch Mission</span>
          </button>
          <a href="/Nischal_Sharma_Updated_Resume.pdf" download className="btn-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(0,245,255,0.3)' }}>
        <div className="text-xs tracking-widest">SCROLL</div>
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(180deg, rgba(0,245,255,0.4), transparent)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
