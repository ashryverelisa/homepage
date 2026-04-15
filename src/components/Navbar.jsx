import { useState, useEffect } from 'react';

const SCROLL_THRESHOLD = 50;
const ACTIVE_OFFSET    = 200;

const SECTIONS = ['hero', 'about', 'projects'];

const NAV_LINKS = [
    { id: 'hero',     label: '// HOME' },
    { id: 'about',    label: '// ABOUT' },
    { id: 'projects', label: '// QUESTS' },
];

function getActiveSection() {
    for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) return id;
    }
    return SECTIONS[0];
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(SECTIONS[0]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > SCROLL_THRESHOLD);
            setActive(getActiveSection());
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <a href="#hero" className="nav-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">Dev</span>
                    <span className="logo-slash">/</span>
                    <span className="logo-bracket">&gt;</span>
                    <span className="logo-level">LVL 99</span>
                </a>

                <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <span /><span /><span />
                </button>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {NAV_LINKS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={active === id ? 'active' : ''}
                                onClick={() => setActive(id)}
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