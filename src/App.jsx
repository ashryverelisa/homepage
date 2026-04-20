import './App.css'
import Navbar from './components/Navbar'
import StarrySky from "./components/StarrySky.jsx";
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import ContactSection from './components/ContactSection.jsx'

function App() {
  return (
    <>
      <StarrySky/>
      <Navbar/>
      <main className="main-content">
          <HeroSection/>
          <AboutSection/>
          <ProjectsSection/>
          <ContactSection/>
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