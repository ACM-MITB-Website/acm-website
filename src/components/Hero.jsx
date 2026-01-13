import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Galaxy from './ui/Galaxy';

// Lazy Load Robot
const Robot = React.lazy(() => import('./ui/Robot'));

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Fetch Next Event
        const fetchNextEvent = async () => {
            try {
                const docSnap = await getDoc(doc(db, "settings", "nextEvent"));
                if (docSnap.exists()) {
                    setNextEvent(docSnap.data());
                }
            } catch (e) {
                console.error("Error fetching next event:", e);
            }
        };
        fetchNextEvent();

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cinematic Zoom & Parallax Effects (Reduced for Mobile)
    const yRobot = useTransform(scrollY, [0, 1000], [0, isMobile ? 50 : 400]);
    const scaleRobot = useTransform(scrollY, [0, 500], [1, isMobile ? 1.1 : 1.6]); // Reduced Zoom on Mobile
    const opacityRobot = useTransform(scrollY, [300, 600], [1, 0]);

    // Bubble moves faster out of view
    const yBubble = useTransform(scrollY, [0, 500], [0, isMobile ? -200 : -500]);

    // Background deep space zoom
    const scaleGalaxy = useTransform(scrollY, [0, 1000], [1, isMobile ? 1.1 : 1.5]);

    // Smooth physics (Softer on mobile to prevent jitter)
    const smoothYRobot = useSpring(yRobot, { stiffness: isMobile ? 40 : 60, damping: 20 });
    const smoothScaleRobot = useSpring(scaleRobot, { stiffness: isMobile ? 40 : 60, damping: 20 });
    const smoothYBubble = useSpring(yBubble, { stiffness: 50, damping: 20 });

    return (
        <section ref={heroRef} id="home" className="relative h-screen w-full bg-black overflow-hidden">
            {/* Background with Slow Zoom */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ scale: scaleGalaxy }}
            >
                <Galaxy density={0.4} glowIntensity={0.2} />
            </motion.div>

            {/* Parallax Container */}
            <div className="relative z-10 w-full h-full pointer-events-none">

                {/* Robot Left-Aligned (Force Shift) */}
                <motion.div
                    className="absolute inset-0 md:w-[70%] md:right-auto flex items-center justify-center md:justify-start pointer-events-auto"
                    style={{
                        y: smoothYRobot,
                        scale: smoothScaleRobot,
                        opacity: opacityRobot,
                        x: isMobile ? 0 : -50 // Slight extra push left on desktop
                    }}
                >
                    <Suspense fallback={<div className="text-white/20 tracking-widest font-mono text-sm">INITIALIZING AI...</div>}>
                        <Robot />
                    </Suspense>
                </motion.div>

                {/* Minimalist Right-Aligned Label */}
                <motion.div
                    className="absolute top-[30%] right-[5%] md:top-[35%] md:right-[10%] z-20 text-right"
                    style={{ y: smoothYBubble }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                >
                    <div className="flex flex-col items-center">
                        <p className="text-cyan-400 font-mono text-xl md:text-3xl tracking-[0.2em] mb-3 animate-pulse text-center font-bold">
                            WELCOME TO
                        </p>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-sans tracking-tighter text-white mb-4 drop-shadow-2xl text-center">
                            ACM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">MITB</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-cyan-500 to-transparent"></div>
                            <p className="text-gray-300 font-mono text-base md:text-xl tracking-[0.3em] uppercase text-center">
                                Student Chapter
                            </p>
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Next Event Widget - Middle Right */}
                    {nextEvent && (
                        <div className="mt-12 hidden md:block">
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-sm ml-auto hover:border-acm-teal/50 transition-all group">
                                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">UPCOMING TRANSMISSION</span>
                                </div>
                                <div className="flex gap-4">
                                    {nextEvent.image && (
                                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
                                            <img src={nextEvent.image} alt={nextEvent.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-white font-bold leading-tight mb-1 group-hover:text-acm-teal transition-colors">
                                            {nextEvent.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-acm-teal font-mono mb-2">
                                            <Calendar size={12} />
                                            <span>{nextEvent.date}</span>
                                        </div>
                                        {nextEvent.link && (
                                            <a href={nextEvent.link} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center gap-1 text-gray-400 hover:text-white transition-colors border border-white/10 px-2 py-1 rounded w-fit">
                                                REGISTER <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Aesthetic Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="w-[1px] h-12 bg-linear-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
                    <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-500/50 uppercase">Scroll to Explore</span>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
