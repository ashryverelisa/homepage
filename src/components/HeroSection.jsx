import { useState, useEffect, useCallback } from 'react';
import { HERO, HERO_CHARACTER } from '../constants';

function StatBar({ label, barClass, fill, val }) {
    return (
        <div className="stat-chip">
            <span className="stat-label">{label}</span>
            <div className={`stat-bar ${barClass}`}>
                <div className="stat-fill" style={{ width: fill }} />
            </div>
            <span className="stat-val">{val}</span>
        </div>
    );
}

export default function HeroSection() {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [charMessage, setCharMessage] = useState(null);
    const [lastIndex, setLastIndex] = useState(-1);

    const handleCharClick = useCallback(() => {
        let next;
        do {
            next = Math.floor(Math.random() * HERO_CHARACTER.MESSAGES.length);
        } while (next === lastIndex && HERO_CHARACTER.MESSAGES.length > 1);
        setLastIndex(next);
        setCharMessage(HERO_CHARACTER.MESSAGES[next]);
    }, [lastIndex]);

    useEffect(() => {
        if (!charMessage) return;
        const t = setTimeout(() => setCharMessage(null), 4000);
        return () => clearTimeout(t);
    }, [charMessage]);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= HERO.FULL_TEXT.length) {
                setDisplayText(HERO.FULL_TEXT.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, HERO.TYPING_SPEED_MS);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setShowCursor(c => !c), HERO.CURSOR_BLINK_MS);
        return () => clearInterval(interval);
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

                    <h1 className="hero-title glitch" data-text="elisa">Elisa</h1>
                    <p className="hero-class">
                        <span className="class-icon">⚔</span> Developer{' '}
                        <span className="hero-level">LVL 99</span>
                    </p>

                    <div className="hero-stats-bar">
                        {HERO.STATS.map((s) => (
                            <StatBar key={s.label} {...s} />
                        ))}
                    </div>

                    <p className="hero-subtitle">
                        Ich erschaffe digitale Welten aus Code. <br />
                        <span className="matrix-accent">Willkommen in der echten Welt.</span>
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">
                            <span className="btn-icon">◆</span> Quests
                        </a>
                    </div>

                    <div className="hero-char-wrap" onClick={handleCharClick}>
                        {charMessage && (
                            <div className="hero-char-speech">
                                <span>{charMessage}</span>
                            </div>
                        )}
                        <div className="hero-char-sprite">⚔</div>
                        <div className="hero-char-label">[ KLICK MICH ]</div>
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
