import { useState, useEffect, useRef } from 'react';
import { NAVBAR } from '../constants';

function getActiveSection() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        return NAVBAR.SECTIONS[NAVBAR.SECTIONS.length - 1];
    }
    for (const id of [...NAVBAR.SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAVBAR.ACTIVE_OFFSET) return id;
    }
    return NAVBAR.SECTIONS[0];
}

export default function Navbar() {
    const [scrolled, setScrolled]   = useState(false);
    const [active, setActive]       = useState(NAVBAR.SECTIONS[0]);
    const [menuOpen, setMenuOpen]   = useState(false);
    const lockActiveRef             = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > NAVBAR.SCROLL_THRESHOLD);
            if (!lockActiveRef.current) setActive(getActiveSection());
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (id) => {
        setActive(id);
        setMenuOpen(false);
        lockActiveRef.current = true;
        let timeout;
        const release = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lockActiveRef.current = false;
                window.removeEventListener('scroll', release);
            }, 100);
        };
        window.addEventListener('scroll', release);
        timeout = setTimeout(() => {
            lockActiveRef.current = false;
            window.removeEventListener('scroll', release);
        }, 1200);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <a href="#hero" className="nav-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">DEV</span>
                    <span className="logo-slash">/</span>
                    <span className="logo-bracket">&gt;</span>
                    <span className="logo-level">LVL 99</span>
                </a>

                <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <span /><span /><span />
                </button>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {NAVBAR.NAV_LINKS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={active === id ? 'active' : ''}
                                onClick={() => handleNavClick(id)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li className="nav-status">
                        <span className="status-dot" /> ONLINE
                    </li>
                </ul>
            </div>
        </nav>
    );
}
