import { NPCS } from '../constants';

export default function NpcQuotesSection({ sectionIndex }) {
    return (
        <section id="npcs" className="npcs-section">
            <div className="section-header">
                <span className="section-tag">// SECTION_{String(sectionIndex).padStart(2, '0')}</span>
                <h2 className="section-title glitch" data-text="NPC CODEX">
                    <span className="title-bracket">&lt;</span> NPC CODEX{' '}
                    <span className="title-bracket">/&gt;</span>
                </h2>
                <div className="section-line" />
            </div>

            <div className="npcs-panel">
                <div className="npcs-header">
                    <span>💬</span>
                    <span>GILDEN-STIMMEN</span>
                </div>
                <div className="npcs-body">
                    <p className="npcs-intro">{NPCS.INTRO}</p>
                    <div className="npc-list">
                        {NPCS.LIST.map(({ id, name, role, icon, quote }) => (
                            <div key={id} className="npc-card">
                                <header className="npc-head">
                                    <div className="npc-avatar">
                                        <span className="npc-icon">{icon}</span>
                                    </div>
                                    <div className="npc-nameplate">
                                        <span className="npc-name">{name}</span>
                                        <span className="npc-role">{role}</span>
                                    </div>
                                </header>
                                <p className="npc-quote">{quote}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
