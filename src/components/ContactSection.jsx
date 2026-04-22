import { CONTACT } from '../constants';

export default function ContactSection({ sectionIndex }) {
    return (
        <section id="contact" className="contact-section">
            <div className="section-header">
                <span className="section-tag">// SECTION_{String(sectionIndex).padStart(2, '0')}</span>
                <h2 className="section-title glitch" data-text="KONTAKT">
                    <span className="title-bracket">&lt;</span> KONTAKT{' '}
                    <span className="title-bracket">/&gt;</span>
                </h2>
                <div className="section-line" />
            </div>

            <div className="contact-panel">
                <div className="contact-header">
                    <span>📡</span>
                    <span>KOMMUNIKATIONSKANÄLE</span>
                </div>
                <div className="contact-body">
                    <p className="contact-intro">{CONTACT.INTRO}</p>
                    <div className="contact-links">
                        {CONTACT.LINKS.map(({ id, icon, label, handle, url }) => (
                            <a
                                key={id}
                                href={url}
                                className="contact-card"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="contact-icon">{icon}</span>
                                <div className="contact-info">
                                    <span className="contact-label">{label}</span>
                                    <span className="contact-handle">{handle}</span>
                                </div>
                                <span className="contact-arrow">▸</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
