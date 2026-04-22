import { useState, useEffect } from 'react';

const SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function KonamiEffect() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        let buffer = [];

        const onKey = (e) => {
            buffer = [...buffer, e.key].slice(-SEQUENCE.length);
            if (buffer.join(',') === SEQUENCE.join(',')) {
                setActive(true);
                document.body.classList.add('konami-active');
                setTimeout(() => {
                    setActive(false);
                    document.body.classList.remove('konami-active');
                }, 3000);
            }
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    if (!active) return null;

    return (
        <div className="konami-notification">
            <div className="konami-header">
                <span className="konami-star">★</span>
                GEHEIMER BUFF FREIGESCHALTET
                <span className="konami-star">★</span>
            </div>
            <div className="konami-body">
                <span className="konami-icon">🌈</span>
                <div>
                    <div className="konami-buff-name">Regenbogen-Aura</div>
                    <div className="konami-buff-desc">Du kennst den Konami-Code. Respekt.</div>
                </div>
            </div>
            <div className="konami-xp">+9999 XP — EASTER EGG GEFUNDEN</div>
        </div>
    );
}
