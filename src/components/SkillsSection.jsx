import { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';

const { LIST: skills, STAT_POINTS: statPoints } = SKILLS;

function SkillBar({ skill, visible }) {
    const w = visible ? `${skill.level}%` : '0%';
    return (
        <div className="skill-bar-row">
            <div className="skill-icon-box">{skill.icon}</div>
            <div className="skill-info">
                <div className="skill-name-row">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-category">[{skill.category}]</span>
                    <span className="skill-level">{skill.level}/100</span>
                </div>
                <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: w }} />
                    <div className="skill-bar-glow" style={{ width: w }} />
                </div>
            </div>
        </div>
    );
}

function TotalXP({ totalXP, maxXP, visible }) {
    return (
        <div className="total-xp">
            <span>GESAMTMEISTERSCHAFT</span>
            <div className="skill-bar-track total">
                <div
                    className="skill-bar-fill total-fill"
                    style={{ width: visible ? `${(totalXP / maxXP) * 100}%` : '0%' }}
                />
            </div>
            <span className="total-val">{totalXP}/{maxXP} XP</span>
        </div>
    );
}

function StatHex({ stat, visible }) {
    return (
        <div className="stat-hex">
            <div className="stat-hex-value">{stat.value}</div>
            <div className="stat-hex-label">{stat.label}</div>
            <div className="stat-hex-desc">{stat.desc}</div>
            <div className="stat-hex-bar" style={{ width: visible ? `${stat.value}%` : '0%' }} />
        </div>
    );
}

function StatsPanel({ visible }) {
    return (
        <div className="stats-panel">
            <div className="stats-header">
                <span className="stats-icon">⬡</span> KERNATTRIBUTE
            </div>
            <div className="stats-grid">
                {statPoints.map((s, i) => (
                    <StatHex key={i} stat={s} visible={visible} />
                ))}
            </div>
        </div>
    );
}

export default function SkillsSection({ sectionIndex }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const totalXP = skills.reduce((s, sk) => s + sk.level, 0);
    const maxXP = skills.length * 100;

    return (
        <section id="skills" className="skills-section" ref={ref}>
            <div className="section-header">
                <span className="section-tag">// SECTION_{String(sectionIndex).padStart(2, '0')}</span>
                <h2 className="section-title glitch" data-text="FERTIGKEITSBAUM">
                    <span className="title-bracket">&lt;</span> FERTIGKEITSBAUM{' '}
                    <span className="title-bracket">/&gt;</span>
                </h2>
                <div className="section-line" />
            </div>

            <div className="skills-layout">
                <div className="skills-list">
                    {skills.map((sk, i) => (
                        <SkillBar key={i} skill={sk} visible={visible} />
                    ))}
                    <TotalXP totalXP={totalXP} maxXP={maxXP} visible={visible} />
                </div>
                <StatsPanel visible={visible} />
            </div>
        </section>
    );
}
