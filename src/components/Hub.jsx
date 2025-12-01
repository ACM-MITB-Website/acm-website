import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Circle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
    {
        id: 'acm-mitb',
        name: 'ACM MITB',
        link: '/acm-mitb.html',
        color: 'hover:text-acm-teal',
        borderColor: 'group-hover:border-acm-teal',
        logo: '/assets/acm-mitb-logo.png',
    },
    {
        id: 'sigsoft',
        name: 'SIGSOFT',
        link: '/sigsoft.html',
        color: 'hover:text-purple-400',
        borderColor: 'group-hover:border-purple-400',
        logo: '/assets/sigsoft-logo.png',
    },
    {
        id: 'sigai',
        name: 'SIG AI',
        link: '/sigai.html',
        color: 'hover:text-emerald-400',
        borderColor: 'group-hover:border-emerald-400',
        logo: '/assets/sigai-logo.png',
    },
    {
        id: 'acm-w',
        name: 'ACM-W',
        link: '/acm-w.html',
        color: 'hover:text-pink-400',
        borderColor: 'group-hover:border-pink-400',
        logo: '/assets/acm-w-logo.png',
    },
];

const Hub = () => {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(itemsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 relative z-10 min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-left mb-16">
                    <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2">SELECT DESTINATION</h2>
                    <div className="h-px w-20 bg-acm-teal/50"></div>
                </div>

                <div className="flex flex-col space-y-8">
                    {chapters.map((chapter, index) => (
                        <a
                            key={chapter.id}
                            href={chapter.link}
                            ref={(el) => (itemsRef.current[index] = el)}
                            className="group flex items-center space-x-6 cursor-pointer"
                        >
                            {/* Logo Placeholder */}
                            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white/20 ${chapter.borderColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] bg-black/50 backdrop-blur-sm overflow-hidden p-2`}>
                                <img src={chapter.logo} alt={`${chapter.name} Logo`} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Text */}
                            <div className="flex-1 border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors">
                                <h3 className={`text-5xl md:text-8xl font-mono font-bold text-white/80 ${chapter.color} transition-colors duration-300 tracking-tighter`}>
                                    {chapter.name}
                                </h3>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight size={48} className="text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hub;
