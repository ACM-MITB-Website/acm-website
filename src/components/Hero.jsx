import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import acmMitbLogo from '../assets/acm-mitb-logo.png';
import { SplitText } from './ui/SplitText';
import Galaxy from './ui/Galaxy';

// Lazy Load Robot to prevent white screen crashes
const Robot = React.lazy(() => import('./ui/Robot'));

const Hero = () => {
    const textRef = useRef(null);
    const [showScroll, setShowScroll] = useState(true);

    const [heroInView, setHeroInView] = useState(true);
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHeroInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
        };
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        // Text fade in
        tl.fromTo(textRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' }
        );

        const handleScroll = () => {
            setShowScroll(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={heroRef} id="home" className="relative h-screen w-full bg-black">
            {/* 3D Background - Extended Height for Overlap */}
            <div className="absolute top-0 left-0 w-full h-[150vh] z-0 bg-black">
                <Galaxy
                    mouseRepulsion={false}
                    mouseInteraction={false}
                    density={1.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={240}
                    disableAnimation={!heroInView}
                />
            </div>

            {/* Contrast Overlay */}
            <div className="absolute inset-0 z-1 bg-black/30 pointer-events-none" />

            {/* Content Overlay - Split Layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full w-full items-center px-4 md:px-12 pointer-events-none">

                {/* Left: Robot Interaction */}
                <div className="h-[50vh] lg:h-full w-full flex items-center justify-center pointer-events-auto order-2 lg:order-1">
                    <Suspense fallback={<div className="text-white/30 text-xs border border-white/10 p-4 rounded bg-black/50 tracking-widest">LOADING 3D...</div>}>
                        <Robot />
                    </Suspense>
                </div>

                {/* Right: Typography */}
                <div ref={textRef} className="flex flex-col items-center lg:items-end text-center lg:text-right drop-shadow-2xl order-1 lg:order-2 lg:pr-32 pt-32 lg:pt-0">
                    <div className="pointer-events-auto">
                        <SplitText
                            className="text-5xl lg:text-[5rem] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 select-none pb-4"
                            delay={0.1}
                        >
                            INNOVATE
                        </SplitText>

                        <SplitText
                            className="text-4xl lg:text-6xl font-bold tracking-tighter text-red-600 mt-2 mb-8 select-none"
                            delay={0.3}
                        >
                            BUILD • LEAD
                        </SplitText>

                        <p className="max-w-xl ml-auto text-gray-200 text-sm md:text-lg mb-10 leading-relaxed font-medium">
                            Collaborate with like-minded peers and industry experts to push the boundaries of technology.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center lg:justify-end gap-6">
                            <Link to="/membership" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-wider overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    JOIN US <span className="transition-transform group-hover:translate-x-1">→</span>
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 z-30 pointer-events-auto transition-all duration-500 ${showScroll ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-4'}`}>
                <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            </div>
        </section>
    );
};

export default Hero;
