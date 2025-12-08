import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const defaultEvents = [
    {
        id: 1,
        date: 'Oct 2024',
        title: 'HackMITB 2024',
        description: 'Our annual flagship hackathon with over 500 participants building solutions for social good.',
        status: 'completed',
        color: 'bg-blue-500',
        glow: 'shadow-blue-500/50'
    },
    {
        id: 2,
        date: 'Nov 2024',
        title: 'AI Workshop',
        description: 'Hands-on session on Generative AI and LLMs featuring industry experts from Google.',
        status: 'completed',
        color: 'bg-purple-500',
        glow: 'shadow-purple-500/50'
    },
    {
        id: 3,
        date: 'Dec 2024',
        title: 'CodeFest Winter',
        description: 'Competitive coding marathon to test algorithmic skills before the winter break.',
        status: 'upcoming',
        color: 'bg-emerald-500',
        glow: 'shadow-emerald-500/50'
    },
    {
        id: 4,
        date: 'Jan 2025',
        title: 'Open Source Summit',
        description: 'A day dedicated to celebrating open source contributions with talks and sprints.',
        status: 'upcoming',
        color: 'bg-orange-500',
        glow: 'shadow-orange-500/50'
    },
    {
        id: 5,
        date: 'Feb 2025',
        title: 'Robotics Expo',
        description: 'Showcasing the latest in robotics and automation from our student research labs.',
        status: 'upcoming',
        color: 'bg-indigo-500',
        glow: 'shadow-indigo-500/50'
    },
];

const EventNode = ({ event, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative flex items-center justify-between w-full mb-24 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
        >
            {/* Content Side */}
            <div className={`w-[45%] ${isEven ? 'text-right' : 'text-left'}`}>
                <div className="inline-block mb-3">
                    <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full border border-white/10 ${event.status === 'upcoming' ? 'text-acm-teal bg-acm-teal/10' : 'text-gray-500 bg-white/5'}`}>
                        {event.date} • {event.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
                    </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-colors">
                    {event.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-sm ml-auto mr-auto lg:mx-0">
                    {event.description}
                </p>
            </div>

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                {/* Glowing Orb */}
                <div className={`w-4 h-4 rounded-full ${event.color} ${event.glow} shadow-[0_0_30px_currentColor] z-20 relative`}>
                    <div className={`absolute inset-0 rounded-full ${event.color} animate-ping opacity-50`}></div>
                </div>
            </div>

            {/* Empty Side (Spacer) */}
            <div className="w-[45%]"></div>
        </motion.div>
    );
};

const Timeline = ({ title = "EVENTS HORIZON" }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} id="timeline" className="relative py-32 min-h-screen overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-4">{title}</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-teal to-blue-600">JOURNEY</span>
                    </h1>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 h-full"></div>

                    {/* Progress Line */}
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-acm-teal via-purple-500 to-transparent -translate-x-1/2 h-full z-10 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                    ></motion.div>

                    <div className="space-y-12">
                        {defaultEvents.map((event, index) => (
                            <EventNode key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Timeline;
