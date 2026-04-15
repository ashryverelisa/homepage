import { useState, useEffect} from 'react';

export default function Navbar()
{
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(()=> {
        const onScroll = () => {
            setScrolled(window.scrollY > 50)
            const sections = ['hero', 'about','projects'];
            for (const id of sections.reverse()) {
                const element = document.getElementById(id);
                if (element && element.getBoundingClientRect().top <= 200) {
                    setActive(id);
                    break;
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    const links = [
        { id: 'hero', label: '// HOME'},
        { id: 'about', label: '// ABOUT'},
        { id: 'projects', label: '// QUESTS'},
    ];

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
                    <span></span><span></span><span></span>
                </button>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {links.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}
                            className={active === link.id ? 'active' : ''}
                            onClick={() => setActive(link.id)}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li className="nav-status">
                        <span className="status-dot"></span> ONLINE
                    </li>
                </ul>
            </div>
        </nav>
    );
}