import { useEffect, useRef } from 'react';
import { STARRY_SKY as C } from '../constants';

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createStars(width, height) {
    const count = Math.floor((width * height) / C.PIXELS_PER_STAR);
    return Array.from({ length: count }, () => ({
        x:             Math.random() * width,
        y:             Math.random() * height,
        radius:        rand(C.STAR_MIN_RADIUS, C.STAR_MAX_RADIUS),
        opacity:       rand(C.STAR_MIN_OPACITY, C.STAR_MAX_OPACITY),
        twinkleSpeed:  rand(C.TWINKLE_MIN_SPEED, C.TWINKLE_MAX_SPEED),
        twinkleOffset: Math.random() * Math.PI * 2,
        hue:           Math.random() > C.TINT_CHANCE ? (Math.random() > 0.5 ? C.HUE_BLUE : C.HUE_WARM) : 0,
        saturation:    Math.random() > C.TINT_CHANCE ? Math.floor(rand(C.SAT_MIN, C.SAT_MIN + C.SAT_RANGE)) : 0,
    }));
}

function createShootingStar(width, height) {
    return {
        x:       Math.random() * width  * C.SHOOT_SPAWN_X,
        y:       Math.random() * height * C.SHOOT_SPAWN_Y,
        len:     rand(C.SHOOT_MIN_LEN,   C.SHOOT_MIN_LEN   + C.SHOOT_LEN_RANGE),
        speed:   rand(C.SHOOT_MIN_SPEED, C.SHOOT_MIN_SPEED + C.SHOOT_SPEED_RANGE),
        angle:   C.SHOOT_BASE_ANGLE + Math.random() * C.SHOOT_ANGLE_RANGE,
        opacity: 1,
        life:    0,
        maxLife: rand(C.SHOOT_MIN_LIFE, C.SHOOT_MIN_LIFE + C.SHOOT_LIFE_RANGE),
    };
}

function drawSky(ctx, w, h) {
    ctx.fillStyle = C.SKY_COLOR;
    ctx.fillRect(0, 0, w, h);

    const grd = ctx.createRadialGradient(
        w * C.DEPTH_CENTER_X, h * C.DEPTH_CENTER_Y, 0,
        w * C.DEPTH_CENTER_X, h * C.DEPTH_CENTER_Y, w * C.DEPTH_RADIUS,
    );
    grd.addColorStop(0, C.DEPTH_INNER_COLOR);
    grd.addColorStop(1, C.DEPTH_OUTER_COLOR);
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
    for (const n of C.NEBULAE) {
        drawNebula(ctx, w * n.cx, h * n.cy, w * n.r, n.color);
    }
}

function drawStars(ctx, stars, tick) {
    const time = tick * C.FRAME_TIME_SEC;

    for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed * C.TWINKLE_SPEED_MULT + star.twinkleOffset);
        const alpha   = star.opacity + twinkle * C.TWINKLE_AMPLITUDE;
        const clamped = Math.max(C.TWINKLE_MIN_ALPHA, Math.min(1, alpha));

        ctx.fillStyle = star.saturation > 0
            ? `hsla(${star.hue}, ${star.saturation}%, ${C.STAR_LIGHTNESS}%, ${clamped})`
            : `rgba(255,255,255,${clamped})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > C.STAR_GLOW_THRESHOLD) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * C.STAR_GLOW_RADIUS_MULT, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,220,255,${clamped * C.STAR_GLOW_ALPHA})`;
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

        if (s.life >= s.maxLife) { shootingStars.splice(i, 1); continue; }

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0,             'rgba(255,255,255,0)');
        gradient.addColorStop(C.SHOOT_TAIL_MID, `rgba(200,230,255,${s.opacity * C.SHOOT_TAIL_ALPHA})`);
        gradient.addColorStop(1,             `rgba(255,255,255,${s.opacity * C.SHOOT_HEAD_ALPHA})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth   = C.SHOOT_LINE_WIDTH;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, C.SHOOT_HEAD_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
    }
}

export default function StarrySky() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        const state  = { stars: [], shootingStars: [], tick: 0 };
        let animationId;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            state.stars   = createStars(canvas.width, canvas.height);
        };

        const draw = () => {
            const { width: w, height: h } = canvas;
            drawSky(ctx, w, h);
            drawNebulae(ctx, w, h);
            drawStars(ctx, state.stars, state.tick);
            drawShootingStars(ctx, state.shootingStars);

            if (Math.random() < C.SHOOT_SPAWN_PROB && state.shootingStars.length < C.SHOOT_MAX_COUNT) {
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
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        />
    );
}
