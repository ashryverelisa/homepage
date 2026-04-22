import { useState, useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import StarrySky from "./components/StarrySky.jsx";
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import NpcQuotesSection from './components/NpcQuotesSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import SkillsSection from "./components/SkillsSection.jsx";
import ScrollProgressBar from './components/ScrollProgressBar.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import KonamiEffect from './components/KonamiEffect.jsx';

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <ScrollProgressBar />
      <KonamiEffect />
      <StarrySky/>
      <Navbar/>
      <main className="main-content">
          <HeroSection/>
          <AboutSection sectionIndex={2} />
          <SkillsSection sectionIndex={3} />
          <ProjectsSection sectionIndex={4} />
          <NpcQuotesSection sectionIndex={5} />
          <ContactSection sectionIndex={6} />
          <footer className="footer">
              <div className="footer-inner">
                  <span className="footer-code">&lt;/&gt;</span>
                  <span>Built with Love ❤️ and ⚡ React + Vite</span>
                  <span className="footer-tag">// SYSTEM_STATUS: ONLINE</span>
              </div>
              <div className="footer-bar" />
          </footer>
      </main>
    </>
  )
}

export default App