export const ABOUT = {
    CHARACTER_STATS: [
        { label: 'NAME',       value: 'Elisa' },
        { label: 'KLASSE',     value: 'Developer' },
        { label: 'VOLK',       value: 'Mensch (koffeinhaltig)' },
        { label: 'LEVEL',      value: '99', accent: true },
        { label: 'GILDE',      value: 'Backend Developer' },
        { label: 'HERKUNFT',   value: 'Die digitale Welt' },
        { label: 'HAUPTWAFFE', value: 'Mechanische Tastatur' },
        { label: 'SPRACHEN',   value: 'C#, VB, PHP' },
        { label: 'GENRE',      value: 'LitRPG' },
        { label: 'BUFF',       value: '☕ Koffein-Aura' },
        { label: 'STATUS',     value: 'VERFÜGBAR', accent: true },
    ],
    TRAITS: [
        { icon: '⚡', name: 'Eigenschaft: Schnelle Auffassungsgabe', desc: 'Erhält +50 % EP durch neue Technologie-Stacks' },
        { icon: '🛡', name: 'Eigenschaft: Bug Schlächter',           desc: 'Kritische Treffer gegen Produktionsfehler' },
        { icon: '🔮', name: 'Eigenschaft: Code Zauberer',            desc: 'Verwandelt Koffein in funktionierende Software' },
        { icon: '🗡', name: "Eigenschaft: Debugger's Auge",          desc: 'Kann „Off-by-One"-Fehler im Handumdrehen aufspüren' },
    ],
};

export const HERO = {
    TYPING_SPEED_MS: 50,
    CURSOR_BLINK_MS: 530,
    FULL_TEXT: '> INITIALIZING DEVELOPER PROFILE...',
    STATS: [
        { label: 'HP', barClass: 'hp', fill: '100%', val: '9999/9999' },
        { label: 'MP', barClass: 'mp', fill: '85%',  val: '8500/9999' },
        { label: 'XP', barClass: 'xp', fill: '72%',  val: '72%' },
    ],
};

export const NAVBAR = {
    SCROLL_THRESHOLD: 50,
    ACTIVE_OFFSET:    200,
    SECTIONS: ['hero', 'about', 'projects', 'npcs', 'contact'],
    NAV_LINKS: [
        { id: 'hero',     label: '// HOME' },
        { id: 'about',    label: '// ÜBER MICH' },
        { id: 'skills', label: '// SKILLS'},
        { id: 'projects', label: '// QUESTS' },
        { id: 'npcs',     label: '// NPCS' },
        { id: 'contact',  label: '// KONTAKT' },
    ],
};

export const NPCS = {
    INTRO: 'Stimmen aus der Gilde — was andere Abenteurer über diese Entwicklerin berichten.',
    LIST: [
        {
            id: 'guildmaster',
            name: 'Die Gildenmeisterin',
            role: 'QUEST-GEBERIN',
            icon: '👑',
            quote: 'Elisa liefert Quests termingerecht ab und hinterlässt den Code sauberer, als sie ihn vorgefunden hat.',
        },
        {
            id: 'blacksmith',
            name: 'Der Schmied',
            role: 'DEVOPS-VETERAN',
            icon: '⚒',
            quote: 'Sie testet ihre Waffen selbst CI-Pipelines, die bei ihr einmal laufen, laufen bei allen.',
        },
        {
            id: 'sage',
            name: 'Der Weise',
            role: 'CODE-MENTOR',
            icon: '🧙',
            quote: 'Debuggt Legacy-Dungeons mit der Ruhe einer Magierin, die weiß, dass jeder Bug eine Geschichte erzählt.',
        },
        {
            id: 'merchant',
            name: 'Die Händlerin',
            role: 'PRODUCT-OWNERIN',
            icon: '📜',
            quote: 'Fragt die richtigen Fragen, bevor sie eine Zeile Code schreibt spart der Gilde ganze Gold-Truhen.',
        },
    ],
};

export const CONTACT = {
    INTRO: 'Finde mich in der digitalen Welt über die folgenden Kanäle.',
    LINKS: [
        {
            id: 'github',
            icon: '◈',
            label: 'GitHub',
            handle: '@ashryverelisa',
            url: 'https://github.com/ashryverelisa',
        },
        {
            id: 'mastodon',
            icon: '✦',
            label: 'Mastodon',
            handle: '@Ashryver@chaos.social',
            url: 'https://chaos.social/@Ashryver',
        },
    ],
};

export const PROJECTS = {
    RARITY_COLORS: {
        COMMON:    '#9ca3af',
        UNCOMMON:  '#22c55e',
        RARE:      '#3b82f6',
        EPIC:      '#a855f7',
        LEGENDARY: '#f59e0b',
        MYTHIC:    '#ef4444',
    },
    RARITY_LABELS: {
        COMMON:    'NORMAL',
        UNCOMMON:  'UNGEWÖHNLICH',
        RARE:      'SELTEN',
        EPIC:      'EPISCH',
        LEGENDARY: 'LEGENDÄR',
        MYTHIC:    'MYTHISCH',
    },
    STATUS_LABELS: {
        COMPLETED:   'BEENDET',
        IN_PROGRESS: 'IN ARBEIT',
    },
    LIST: [
        {
            id: 1,
            title:       'Netmancer',
            difficulty:  '★★★★☆',
            rarity:      'LEGENDARY',
            status:      'COMPLETED',
            xpReward:    5000,
            description: 'Ein Music Player und Media Browser über UPnP/DLNA.',
            tech:        ['.Net', 'Avalonia'],
            loot:        ['Music Player ohne Werbung'],
            github:      'https://github.com/ashryverelisa/Netmancer',
            live:        '#',
        },
        {
            id: 2,
            title:       'Daily-Side-Quest-Generator',
            difficulty:  '★★★☆☆',
            rarity:      'EPIC',
            status:      'COMPLETED',
            xpReward:    7500,
            description: 'Erstellt jeden Tag neue Aufgaben mit Belohungen im LitRPG Style.',
            tech:        ['.Net', 'Blazor'],
            loot:        [],
            github:      'https://github.com/ashryverelisa/Daily-Side-Quest-Generator',
            live:        '#',
        },
        {
            id: 3,
            title:       'LitRPG World & Progression Manager',
            difficulty:  '★★★★★',
            rarity:      'MYTHIC',
            status:      'IN_PROGRESS',
            xpReward:    10000,
            description: 'Ein Tool zum Verwalten von Charakteren, Welten und Fortschritt in LitRPG Geschichten.',
            tech:        ['.Net', 'Avalonia'],
            loot:        [],
            github:      'https://github.com/ashryverelisa/LitRPG-Progression-Manager',
            live:        '#',
        }
    ],
};

export const SKILLS = {
    LIST: [
        { name: 'CSharp',    level: 95, category: 'Sprache', icon: 'C#' },
        { name: 'PHP',       level: 70, category: 'Sprache', icon: 'PH' },
        { name: 'React',       level: 30, category: 'Sprache', icon: 'RE' },
        { name: 'CSS / SCSS',level: 50, category: 'Style',    icon: 'CS' },
        { name: 'SQL',       level: 80, category: 'Datenbank', icon: 'SQ' },
        { name: 'MongoDB',    level: 80, category: 'Datenbank',   icon: 'MO' },
        { name: 'Docker',    level: 80, category: 'DevOps',   icon: 'DK' },
        { name: 'Git',       level: 93, category: 'Tool',     icon: 'GT' },
        { name: 'Azure',     level: 70, category: 'Cloud',    icon: 'AZ' },
    ],
    STAT_POINTS: [
        { label: 'Stärke',           value: 85, desc: 'Backend Stärke' },
        { label: 'Geschicklichkeit', value: 92, desc: 'Coding-Tempo' },
        { label: 'Intelligenz',      value: 95, desc: 'Problemlösung' },
        { label: 'Weisheit',         value: 88, desc: 'Architektur' },
        { label: 'Charisma',         value: 80, desc: 'Kommunikation' },
        { label: 'Glück',            value: 77, desc: 'Fehlerfreie Deploys' },
    ],
};

export const STARRY_SKY = {
    PIXELS_PER_STAR:       2800,
    STAR_MIN_RADIUS:       0.3,
    STAR_MAX_RADIUS:       1.6,
    STAR_MIN_OPACITY:      0.3,
    STAR_MAX_OPACITY:      0.7,
    STAR_GLOW_THRESHOLD:   1.1,
    STAR_GLOW_RADIUS_MULT: 3,
    STAR_GLOW_ALPHA:       0.06,
    STAR_LIGHTNESS:        85,

    TWINKLE_MIN_SPEED:  0.005,
    TWINKLE_MAX_SPEED:  0.02,
    TWINKLE_AMPLITUDE:  0.3,
    TWINKLE_MIN_ALPHA:  0.05,
    TWINKLE_SPEED_MULT: 60,
    FRAME_TIME_SEC:     0.016,

    TINT_CHANCE: 0.8,
    HUE_BLUE:    220,
    HUE_WARM:    35,
    SAT_MIN:     20,
    SAT_RANGE:   40,

    SHOOT_MAX_COUNT:   2,
    SHOOT_SPAWN_X:     0.8,
    SHOOT_SPAWN_Y:     0.4,
    SHOOT_MIN_LEN:     60,
    SHOOT_LEN_RANGE:   80,
    SHOOT_MIN_SPEED:   4,
    SHOOT_SPEED_RANGE: 6,
    SHOOT_BASE_ANGLE:  Math.PI / 6,
    SHOOT_ANGLE_RANGE: Math.PI / 8,
    SHOOT_MIN_LIFE:    60,
    SHOOT_LIFE_RANGE:  40,
    SHOOT_LINE_WIDTH:  1.5,
    SHOOT_HEAD_RADIUS: 1.5,
    SHOOT_TAIL_MID:    0.6,
    SHOOT_TAIL_ALPHA:  0.4,
    SHOOT_HEAD_ALPHA:  0.9,
    SHOOT_SPAWN_PROB:  0.004,

    SKY_COLOR:         '#050508',
    DEPTH_CENTER_X:    0.5,
    DEPTH_CENTER_Y:    0.15,
    DEPTH_RADIUS:      0.7,
    DEPTH_INNER_COLOR: 'rgba(15, 15, 35, 0.45)',
    DEPTH_OUTER_COLOR: 'rgba(5, 5, 8, 0)',

    NEBULAE: [
        { cx: 0.25, cy: 0.3, r: 0.35, color: 'rgba(0,255,65,0.012)' },
        { cx: 0.7,  cy: 0.2, r: 0.3,  color: 'rgba(0,212,255,0.010)' },
        { cx: 0.5,  cy: 0.7, r: 0.4,  color: 'rgba(168,85,247,0.008)' },
    ],
};
