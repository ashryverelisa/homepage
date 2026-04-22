import { useState } from 'react';
import { PROJECTS } from '../constants';

export default function ProjectsSection({ sectionIndex }) {
    const [selected, setSelected] = useState(null);

    return (
        <section id="projects" className="projects-section">
            <div className="section-header">
                <span className="section-tag">// SECTION_{String(sectionIndex).padStart(2, '0')}</span>
                <h2 className="section-title glitch" data-text="QUEST LOG">
                    <span className="title-bracket">&lt;</span> QUEST LOG{' '}
                    <span className="title-bracket">/&gt;</span>
                </h2>
                <div className="section-line" />
            </div>

            <div className="quest-list">
                {PROJECTS.LIST.map((p) => (
                    <div
                        key={p.id}
                        className={`quest-card ${selected === p.id ? 'expanded' : ''}`}
                        onClick={() => setSelected(selected === p.id ? null : p.id)}
                        style={{ '--rarity-color': PROJECTS.RARITY_COLORS[p.rarity] }}
                    >
                        <div className="quest-card-top">
                            <div className="quest-rarity" style={{ color: PROJECTS.RARITY_COLORS[p.rarity] }}>
                                [{PROJECTS.RARITY_LABELS[p.rarity]}]
                            </div>
                            <div className="quest-status" data-status={p.status}>
                                {PROJECTS.STATUS_LABELS[p.status]}
                            </div>
                        </div>

                        <h3 className="quest-title">{p.title}</h3>
                        <div className="quest-difficulty">{p.difficulty}</div>
                        <p className="quest-desc">{p.description}</p>

                        <div className="quest-tech">
                            {p.tech.map((t, i) => (
                                <span key={i} className="tech-tag">{t}</span>
                            ))}
                        </div>

                        <div className={`quest-details ${selected === p.id ? 'show' : ''}`}>
                            <div className="quest-loot">
                                <span className="loot-header">🏆 LOOT DROPS:</span>
                                <div className="loot-list">
                                    {p.loot.map((l, i) => (
                                        <span key={i} className="loot-item">◆ {l}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="quest-xp">
                                <span>Belohnungs XP:</span>
                                <span className="xp-value">+{p.xpReward.toLocaleString()} XP</span>
                            </div>
                            <div className="quest-actions">
                                <a href={p.github} className="btn btn-small" onClick={e => e.stopPropagation()}>
                                    ◈ Source Code
                                </a>
                                <a href={p.live} className="btn btn-small btn-accent" onClick={e => e.stopPropagation()}>
                                    ▸ Live Demo
                                </a>
                            </div>
                        </div>

                        <div className="quest-expand-hint">
                            {selected === p.id ? '▲ COLLAPSE' : '▼ EXPAND QUEST'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}