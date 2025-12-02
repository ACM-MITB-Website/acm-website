import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultEvents = [
    {
        id: 1,
        date: 'Oct 2024',
        title: 'HackMITB 2024',
        description: 'Our annual flagship hackathon with over 500 participants building solutions for social good.',
        status: 'completed',
        type: 'Hackathon'
    },
    {
        id: 2,
        date: 'Nov 2024',
        title: 'AI Workshop',
        description: 'Hands-on session on Generative AI and LLMs featuring industry experts from Google.',
        status: 'completed',
        type: 'Workshop'
    },
    {
        id: 3,
        date: 'Dec 2024',
        title: 'CodeFest Winter',
        description: 'Competitive coding marathon to test algorithmic skills before the winter break.',
        status: 'upcoming',
        type: 'Competition'
    },
    {
        id: 4,
        date: 'Jan 2025',
        title: 'Open Source Summit',
        description: 'A day dedicated to celebrating open source contributions with talks and sprints.',
        status: 'upcoming',
        type: 'Conference'
    },
    {
        id: 5,
        date: 'Feb 2025',
        title: 'Robotics Expo',
        description: 'Showcasing the latest in robotics and automation from our student research labs.',
        status: 'upcoming',
        type: 'Exhibition'
    },
];

const Timeline = ({ title = "EVENTS HORIZON", data = defaultEvents }) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalWidth = sectionRef.current.scrollWidth - window.innerWidth;

            gsap.to(sectionRef.current, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: `+=${totalWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        }, triggerRef);

        return () => ctx.revert();
    }, [data]);

    return (
        <section ref={triggerRef} id="timeline" className="relative h-[70vh] overflow-hidden">
            <div className="absolute top-10 left-10 z-10">
                <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2">{title}</h2>
                <div className="h-px w-20 bg-acm-teal/50"></div>
            </div>

            <div ref={sectionRef} className="flex h-full items-center pl-20 pr-20 w-max">
                {data.map((event, index) => (
                    <div key={index} className="w-[60vw] md:w-[30vw] flex-shrink-0 px-8">
                        <div className="relative group">
                            {/* Status Line */}
                            <div className={`h-1 w-20 mb-6 ${event.status === 'upcoming' ? 'bg-acm-teal shadow-[0_0_15px_rgba(0,212,255,0.8)]' : 'bg-white/20'}`}></div>

                            {/* Date */}
                            <h3 className={`text-2xl md:text-3xl font-mono mb-2 ${event.status === 'upcoming' ? 'text-acm-teal' : 'text-gray-500'}`}>
                                {event.date}
                            </h3>

                            {/* Title */}
                            <h4 className={`text-4xl md:text-6xl font-bold tracking-tighter transition-colors duration-300 ${event.status === 'upcoming' ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-acm-teal group-hover:to-acm-purple' : 'text-gray-600'}`}>
                                {event.title}
                            </h4>

                            {/* Type Badge */}
                            <div className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-mono border ${event.status === 'upcoming' ? 'border-acm-teal/30 text-acm-teal' : 'border-white/10 text-gray-600'}`}>
                                {event.type}
                            </div>

                            {/* Description */}
                            <p className={`mt-4 text-sm leading-relaxed ${event.status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
