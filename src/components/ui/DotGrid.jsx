import { useEffect, useRef, useMemo, useCallback } from 'react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

const DotGrid = ({
    dotSize = 16,
    gap = 32,
    baseColor = '#a855f7',
    activeColor = '#ff0000',
    proximity = 150, // Radius of effect
    scaleTrigger = 2.0, // How much to scale up
    viscosity = 0.1,
    maxDisplacement = 30, // Pixels to push out
    className = '',
    style,
    canvasStyle
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    // Pre-calculate pattern avoids arc calls per frame
    const circlePath = useMemo(() => {
        if (typeof window === 'undefined' || !window.Path2D) return null;
        const p = new window.Path2D();
        p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
        return p;
    }, [dotSize]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const extraX = width - gridW;
        const extraY = height - gridH;

        const startX = extraX / 2 + dotSize / 2;
        const startY = extraY / 2 + dotSize / 2;

        const dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                // Origin is fixed. We only calculate offset in draw.
                dots.push({ cx, cy, x: cx, y: cy });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    useEffect(() => {
        buildGrid();
        let ro = null;
        if ('ResizeObserver' in window) {
            ro = new ResizeObserver(buildGrid);
            wrapperRef.current && ro.observe(wrapperRef.current);
        } else {
            window.addEventListener('resize', buildGrid);
        }
        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener('resize', buildGrid);
        };
    }, [buildGrid]);

    useEffect(() => {
        if (!circlePath) return;

        let rafId;

        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            const radius = proximity;

            for (const dot of dotsRef.current) {
                // Calculate distance to mouse
                const dx = dot.cx - mx;
                const dy = dot.cy - my;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                // Default state
                let x = dot.cx;
                let y = dot.cy;
                let scale = 1;
                let r = baseRgb.r;
                let g = baseRgb.g;
                let b = baseRgb.b;

                if (dist < radius) {
                    // Strength 0 to 1 based on distance
                    const t = 1 - (dist / radius);
                    const easeT = t * t; // Non-linear falloff for smoother shape

                    // COLOR: Interpolate
                    r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * easeT);
                    g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * easeT);
                    b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * easeT);

                    // SCALE: Grow significantly
                    scale = 1 + (scaleTrigger * easeT);

                    // POSITION: Bulge Effect
                    const pushFactor = maxDisplacement * Math.sin(easeT * Math.PI / 2); // Sinusoidal bulge

                    if (dist > 0.1) {
                        x += (dx / dist) * pushFactor;
                        y += (dy / dist) * pushFactor;
                    }
                }

                const style = `rgb(${r},${g},${b})`;

                ctx.save();
                ctx.translate(x, y);
                ctx.scale(scale, scale);
                ctx.fillStyle = style;
                ctx.fill(circlePath);
                ctx.restore();
            }

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafId);
    }, [circlePath, proximity, scaleTrigger, maxDisplacement, baseRgb, activeRgb]);

    const handleMouseMove = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
    };

    return (
        <div
            ref={wrapperRef}
            className={`w-full h-full ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <canvas ref={canvasRef} className="block" style={canvasStyle} />
        </div>
    );
};

export default DotGrid;
