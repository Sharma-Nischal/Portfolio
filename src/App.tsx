import { useState, useCallback } from 'react';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Activities from './components/Activities';
import Strengths from './components/Strengths';
import Contact from './components/Contact';
import EasterEgg from './components/EasterEgg';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Cursor />
      <EasterEgg />
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Internship />
          <Activities />
          <Strengths />
          <Contact />
        </main>

        <footer
          className="relative py-8 text-center"
          style={{ borderTop: '1px solid rgba(0,245,255,0.06)' }}
        >
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <div className="section-tag mb-2">MISSION CONTROL — PORTFOLIO OS v1.0</div>
            <p className="text-xs" style={{ color: 'rgba(224,247,250,0.25)' }}>
              Designed & Built by Nischal Sharma — Developer. Problem Solver. Future Air Force Pilot.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(0,245,255,0.2)', letterSpacing: '0.2em' }}>
              <span>ALL SYSTEMS NOMINAL</span>
              <span>|</span>
              <span>UPLINK ACTIVE</span>
              <span>|</span>
              <span>CLEARANCE: GRANTED</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
