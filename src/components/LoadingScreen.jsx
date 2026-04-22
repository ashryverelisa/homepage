import { useState, useEffect } from 'react';
import { LOADING } from '../constants';

export default function LoadingScreen({ onDone }) {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const [fading, setFading] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const blinkInterval = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(blinkInterval);
    }, []);

    useEffect(() => {
        let mounted = true;
        let lineIndex = 0;

        const showNext = () => {
            if (!mounted) return;
            if (lineIndex < LOADING.LINES.length) {
                const current = lineIndex;
                setLines(prev => [...prev, LOADING.LINES[current]]);
                setProgress(Math.round(((current + 1) / LOADING.LINES.length) * 100));
                lineIndex++;
                setTimeout(showNext, LOADING.LINE_DELAY_MS);
            } else {
                setTimeout(() => {
                    if (!mounted) return;
                    setFading(true);
                    setTimeout(() => mounted && onDone(), 500);
                }, LOADING.DONE_DELAY_MS);
            }
        };

        setTimeout(showNext, LOADING.START_DELAY_MS);
        return () => { mounted = false; };
    }, [onDone]);

    return (
        <div className={`loading-screen${fading ? ' fade-out' : ''}`}>
            <div className="loading-inner">
                <div className="loading-logo">
                    <span className="loading-bracket">[</span>
                    <span className="loading-name">ELISA</span>
                    <span className="loading-bracket">]</span>
                </div>
                <div className="loading-tag">// PORTFOLIO SYSTEM v2.0</div>

                <div className="loading-terminal">
                    {lines.map((line, i) => (
                        <div key={i} className="loading-line">
                            <span className="loading-prompt">{'>'}</span>
                            <span className="loading-text">{line}</span>
                        </div>
                    ))}
                    <span className={`cursor${showCursor ? '' : ' hidden'}`}>█</span>
                </div>

                <div className="loading-bar-wrap">
                    <div className="loading-bar-label">
                        <span>LADE SYSTEM...</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="loading-bar-track">
                        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
