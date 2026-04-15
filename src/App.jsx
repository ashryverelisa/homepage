import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <main className="main-content">
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