import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const chapters = [
    {
        id: 'acm-mitb',
        name: 'ACM MITB',
        desc: 'The main student chapter.',
        link: '/acm-mitb.html',
        gradient: 'from-blue-500 to-cyan-500',
        image: '/assets/team-1.png',
        logo: '/assets/acm-mitb-logo.png',
    },
    {
        id: 'acm-w',
        name: 'ACM-W',
        desc: 'Women in Computing.',
        link: '/acm-w.html',
        gradient: 'from-pink-500 to-rose-500',
        image: '/assets/team-2.png',
        logo: '/assets/acm-w-logo.png',
    },
    {
        id: 'sigsoft',
        name: 'SIGSOFT',
        desc: 'Software Engineering.',
        link: '/sigsoft.html',
        gradient: 'from-purple-500 to-pink-500',
        image: '/assets/team-3.png',
        logo: '/assets/sigsoft-logo.png',
    },
    {
        id: 'sigai',
        name: 'SIG AI',
        desc: 'Artificial Intelligence.',
        link: '/sigai.html',
        gradient: 'from-emerald-500 to-green-500',
        image: '/assets/team-4.png',
        logo: '/assets/sigai-logo.png',
    },
];

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ chapter }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={chapter.link}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative w-full aspect-square rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden hover:border-white/30 transition-colors will-change-transform"
        >
            {/* Spotlight Gradient Overlay */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${chapter.gradient} blur-3xl -z-10`}
            />

            {/* Logo in Top Left */}
            <div style={{ transform: "translateZ(40px)" }} className="absolute top-6 left-6 z-20">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={chapter.logo} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
                </div>
            </div>

            {/* Full Square Image */}
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                <img
                    src={chapter.image}
                    alt={chapter.name}
                    className="w-full h-full object-contain rounded-2xl md:rounded-3xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                />
            </div>

            {/* Glass Shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/0 pointer-events-none" />
        </motion.a>
    );
};

const Hub = () => {
    return (
        <section className="py-32 relative z-10 min-h-screen flex flex-col justify-center bg-transparent">
            {/* Background Mesh/Glow for section context */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-900/10 rounded-full blur-[120px] -z-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-left mb-16">
                    <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2">EXPLORE DOMAINS</h2>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                        OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">UNIVERSE</span>
                    </h1>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-8 perspective-1000">
                    {chapters.map((chapter) => (
                        <TiltCard key={chapter.id} chapter={chapter} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hub;
