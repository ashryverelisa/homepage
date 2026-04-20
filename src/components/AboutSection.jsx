import { ABOUT } from '../constants';

function SectionHeader() {
    return (
        <div className="section-header">
            <span className="section-tag">// SECTION_02</span>
            <h2 className="section-title glitch" data-text="Über mich">
                <span className="title-bracket">&lt;</span> Über mich{' '}
                <span className="title-bracket">/&gt;</span>
            </h2>
            <div className="section-line" />
        </div>
    );
}

function SheetRow({ label, value, accent }) {
    return (
        <div className="sheet-row">
            <span className="sheet-label">{label}:</span>
            <span className={`sheet-value${accent ? ' accent' : ''}`}>{value}</span>
        </div>
    );
}

function CharacterSheet() {
    return (
        <div className="about-character-sheet">
            <div className="sheet-header">
                <span>📋</span>
                <span>CHARACTER STATUS</span>
            </div>
            <div className="sheet-body">
                {ABOUT.CHARACTER_STATS.map(({ label, value, accent }) => (
                    <SheetRow key={label} label={label} value={value} accent={accent} />
                ))}
            </div>
        </div>
    );
}

function StorySection() {
    return (
        <div className="about-story">
            <div className="story-header">
                <span>📜</span>
                <span>HINTERGRUND</span>
            </div>
            <div className="story-body">
                <p className="story-text">
                    <span className="first-letter">Ich</span> bin eine begeisterte Entwicklerin,
                    die in die Welt des Programmierens eingetaucht ist und nie wieder zurückgeschaut hat.
                    Von der Erstellung meines ersten "Hello World"-Programms bis hin zu komplexen Backend Anwendungen.
                    Jede Zeile Code ist ein weiterer Schritt auf meinem Abenteuer.
                </p>
                <p className="story-text">
                    Ich habe mich darauf spezialisiert, robuste Backend-Systeme zu entwickeln und komplexe Probleme
                    in elegante Lösungen zu verwandeln. Wenn ich gerade nicht programmiere, beschäftige ich mich mit
                    neuen Technologien, engagiere mich in Open-Source-Projekten oder vertiefe meine Kenntnisse.
                </p>
                <p className="story-text">
                    Abseits vom Code lese ich leidenschaftlich gerne LitRPG und tauche in ihre Welten aus
                    Stats, Quests und Progression ein. Diese Begeisterung möchte ich auch in meine Projekte tragen
                    und eigene Tools entwickeln, die das LitRPG-Erlebnis für Leser*innen und Autor*innen bereichern.
                </p>
                <p className="story-text">
                    Meine Mission? Code zu schreiben, der so sauber ist, dass er die Code-Prüfung eines legendären
                    Entwickler-NPCs bestehen würde. Mein oberstes Ziel: Software zu entwickeln, die etwas bewirkt.
                </p>
            </div>
        </div>
    );
}

function TraitCard({ icon, name, desc }) {
    return (
        <div className="trait-card">
            <span className="trait-icon">{icon}</span>
            <div className="trait-info">
                <span className="trait-name">{name}</span>
                <span className="trait-desc">{desc}</span>
            </div>
        </div>
    );
}

function PassiveTraits() {
    return (
        <div className="about-traits">
            <div className="traits-header">
                <span>✦</span>
                <span>PASSIVE FÄHIGKEITEN</span>
            </div>
            <div className="traits-grid">
                {ABOUT.TRAITS.map((t) => (
                    <TraitCard key={t.name} {...t} />
                ))}
            </div>
        </div>
    );
}

export default function AboutSection() {
    return (
        <section id="about" className="about-section">
            <SectionHeader />
            <div className="about-grid">
                <CharacterSheet />
                <StorySection />
            </div>
            <PassiveTraits />
        </section>
    );
}
