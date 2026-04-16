import { useState, useEffect } from 'react';

const TYPING_SPEED_MS= 50;
const CURSOR_BLINK_MS = 530;

export default function HeroSection() {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const fullText = '> INITIALIZING DEVELOPER PROFILE...';

    useEffect(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i <= fullText.length) {
                setDisplayText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, TYPING_SPEED_MS);
        return () => clearInterval(typeInterval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => setShowCursor(c => !c), CURSOR_BLINK_MS);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div className="hero-content">
                <div className="hero-terminal-line">
                    <span className="terminal-text">{displayText}</span>
                    <span className={`cursor ${showCursor ? '' : 'hidden'}`}>█</span>
                </div>

                <div className="hero-player-card">
                    <div className="card-border-top" />
                    <div className="card-header">
                        <span className="card-tag">[ PLAYER PROFILE ]</span>
                    </div>

                    <h1 className="hero-title glitch" data-text="elisa">
                        Elisa
                    </h1>
                    <p className="hero-class">
                        <span className="class-icon">⚔</span> Developer{' '}
                        <span className="hero-level">LVL 99</span>
                    </p>

                    <div className="hero-stats-bar">
                        <div className="stat-chip">
                            <span className="stat-label">HP</span>
                            <div className="stat-bar hp">
                                <div className="stat-fill" style={{ width: '100%' }} />
                            </div>
                            <span className="stat-val">9999/9999</span>
                        </div>
                        <div className="stat-chip">
                            <span className="stat-label">MP</span>
                            <div className="stat-bar mp">
                                <div className="stat-fill" style={{ width: '85%' }} />
                            </div>
                            <span className="stat-val">8500/9999</span>
                        </div>
                        <div className="stat-chip">
                            <span className="stat-label">XP</span>
                            <div className="stat-bar xp">
                                <div className="stat-fill" style={{ width: '72%' }} />
                            </div>
                            <span className="stat-val">72%</span>
                        </div>
                    </div>

                    <p className="hero-subtitle">
                        I build digital worlds from code. <br />
                        <span className="matrix-accent">Welcome to the real world.</span>
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">
                            <span className="btn-icon">◆</span> View Quest Log
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            <span className="btn-icon">▸</span> Send Message
                        </a>
                    </div>
                    <div className="card-border-bottom" />
                </div>
            </div>

            <div className="scroll-indicator">
                <span>SCROLL TO CONTINUE</span>
                <div className="scroll-arrow">▼</div>
            </div>
        </section>
    );
}
