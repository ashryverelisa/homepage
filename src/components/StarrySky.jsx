import { useEffect, useRef } from 'react';

/* ---- Star field ---- */
const PIXELS_PER_STAR   = 2800;
const STAR_MIN_RADIUS   = 0.3;
const STAR_MAX_RADIUS   = 1.6;
const STAR_MIN_OPACITY  = 0.3;
const STAR_MAX_OPACITY  = 0.7;
const STAR_GLOW_THRESHOLD = 1.1;
const STAR_GLOW_RADIUS_MULT = 3;
const STAR_GLOW_ALPHA   = 0.06;
const STAR_LIGHTNESS    = 85;            // % for coloured stars

/* ---- Twinkle ---- */
const TWINKLE_MIN_SPEED = 0.005;
const TWINKLE_MAX_SPEED = 0.02;
const TWINKLE_AMPLITUDE = 0.3;
const TWINKLE_MIN_ALPHA = 0.05;
const TWINKLE_SPEED_MULT = 60;
const FRAME_TIME_SEC    = 0.016;         // ≈ 1/60 s

/* ---- Star colour tint ---- */
const TINT_CHANCE       = 0.8;           // > this → tinted
const HUE_BLUE          = 220;
const HUE_WARM          = 35;
const SAT_MIN           = 20;
const SAT_RANGE         = 40;

/* ---- Shooting stars ---- */
const SHOOT_MAX_COUNT   = 2;
const SHOOT_SPAWN_X     = 0.8;           // fraction of canvas width
const SHOOT_SPAWN_Y     = 0.4;           // fraction of canvas height
const SHOOT_MIN_LEN     = 60;
const SHOOT_LEN_RANGE   = 80;
const SHOOT_MIN_SPEED   = 4;
const SHOOT_SPEED_RANGE = 6;
const SHOOT_BASE_ANGLE  = Math.PI / 6;
const SHOOT_ANGLE_RANGE = Math.PI / 8;
const SHOOT_MIN_LIFE    = 60;
const SHOOT_LIFE_RANGE  = 40;
const SHOOT_LINE_WIDTH  = 1.5;
const SHOOT_HEAD_RADIUS = 1.5;
const SHOOT_TAIL_MID    = 0.6;
const SHOOT_TAIL_ALPHA  = 0.4;
const SHOOT_HEAD_ALPHA  = 0.9;
const SHOOT_SPAWN_PROB  = 0.004;

/* ---- Sky / depth gradient ---- */
const SKY_COLOR         = '#050508';
const DEPTH_CENTER_X    = 0.5;
const DEPTH_CENTER_Y    = 0.15;
const DEPTH_RADIUS      = 0.7;
const DEPTH_INNER_COLOR = 'rgba(15, 15, 35, 0.45)';
const DEPTH_OUTER_COLOR = 'rgba(5, 5, 8, 0)';

/* ---- Nebulae (position fractions, colour) ---- */
const NEBULAE = [
    { cx: 0.25, cy: 0.3, r: 0.35, color: 'rgba(0,255,65,0.012)' },
    { cx: 0.7,  cy: 0.2, r: 0.3,  color: 'rgba(0,212,255,0.010)' },
    { cx: 0.5,  cy: 0.7, r: 0.4,  color: 'rgba(168,85,247,0.008)' },
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createStars(width, height) {
    const count = Math.floor((width * height) / PIXELS_PER_STAR);
    return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: rand(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
        opacity: rand(STAR_MIN_OPACITY, STAR_MAX_OPACITY),
        twinkleSpeed: rand(TWINKLE_MIN_SPEED, TWINKLE_MAX_SPEED),
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > TINT_CHANCE
            ? (Math.random() > 0.5 ? HUE_BLUE : HUE_WARM)
            : 0,
        saturation: Math.random() > TINT_CHANCE
            ? Math.floor(rand(SAT_MIN, SAT_MIN + SAT_RANGE))
            : 0,
    }));
}

function createShootingStar(width, height) {
    return {
        x: Math.random() * width * SHOOT_SPAWN_X,
        y: Math.random() * height * SHOOT_SPAWN_Y,
        len: rand(SHOOT_MIN_LEN, SHOOT_MIN_LEN + SHOOT_LEN_RANGE),
        speed: rand(SHOOT_MIN_SPEED, SHOOT_MIN_SPEED + SHOOT_SPEED_RANGE),
        angle: SHOOT_BASE_ANGLE + Math.random() * SHOOT_ANGLE_RANGE,
        opacity: 1,
        life: 0,
        maxLife: rand(SHOOT_MIN_LIFE, SHOOT_MIN_LIFE + SHOOT_LIFE_RANGE),
    };
}

function drawSky(ctx, w, h) {
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, w, h);

    const grd = ctx.createRadialGradient(
        w * DEPTH_CENTER_X, h * DEPTH_CENTER_Y, 0,
        w * DEPTH_CENTER_X, h * DEPTH_CENTER_Y, w * DEPTH_RADIUS,
    );
    grd.addColorStop(0, DEPTH_INNER_COLOR);
    grd.addColorStop(1, DEPTH_OUTER_COLOR);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
}

function drawNebula(ctx, cx, cy, r, color) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
}

function drawNebulae(ctx, w, h) {
    for (const n of NEBULAE) {
        drawNebula(ctx, w * n.cx, h * n.cy, w * n.r, n.color);
    }
}

function drawStars(ctx, stars, tick) {
    const time = tick * FRAME_TIME_SEC;

    for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed * TWINKLE_SPEED_MULT + star.twinkleOffset);
        const alpha = star.opacity + twinkle * TWINKLE_AMPLITUDE;
        const clamped = Math.max(TWINKLE_MIN_ALPHA, Math.min(1, alpha));

        ctx.fillStyle = star.saturation > 0
            ? `hsla(${star.hue}, ${star.saturation}%, ${STAR_LIGHTNESS}%, ${clamped})`
            : `rgba(255,255,255,${clamped})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // glow for brighter stars
        if (star.radius > STAR_GLOW_THRESHOLD) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * STAR_GLOW_RADIUS_MULT, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,220,255,${clamped * STAR_GLOW_ALPHA})`;
            ctx.fill();
        }
    }
}

function drawShootingStars(ctx, shootingStars) {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;

        if (s.life >= s.maxLife) {
            shootingStars.splice(i, 1);
            continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(SHOOT_TAIL_MID, `rgba(200,230,255,${s.opacity * SHOOT_TAIL_ALPHA})`);
        gradient.addColorStop(1, `rgba(255,255,255,${s.opacity * SHOOT_HEAD_ALPHA})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = SHOOT_LINE_WIDTH;
        ctx.stroke();

        // bright head
        ctx.beginPath();
        ctx.arc(s.x, s.y, SHOOT_HEAD_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
    }
}

export default function StarrySky() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const state = { stars: [], shootingStars: [], tick: 0 };
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            state.stars = createStars(canvas.width, canvas.height);
        };

        const draw = () => {
            const { width: w, height: h } = canvas;

            drawSky(ctx, w, h);
            drawNebulae(ctx, w, h);
            drawStars(ctx, state.stars, state.tick);
            drawShootingStars(ctx, state.shootingStars);

            if (Math.random() < SHOOT_SPAWN_PROB && state.shootingStars.length < SHOOT_MAX_COUNT) {
                state.shootingStars.push(createShootingStar(w, h));
            }

            state.tick++;
            animationId = requestAnimationFrame(draw);
        };


        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}