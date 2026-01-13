import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Galaxy from './ui/Galaxy';
import { MessageSquare } from 'lucide-react';

// Lazy Load Robot
const Robot = React.lazy(() => import('./ui/Robot'));

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
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
            <div className="relative z-10 w-full h-full flex items-center justify-center">

                {/* Robot Centered with Zoom & Fade */}
                <motion.div
                    className="w-full h-full md:w-[80%] md:h-[90%] flex items-center justify-center"
                    style={{ y: smoothYRobot, scale: smoothScaleRobot, opacity: opacityRobot }}
                >
                    <Suspense fallback={<div className="text-white/20 tracking-widest font-mono text-sm">INITIALIZING AI...</div>}>
                        <Robot />
                    </Suspense>
                </motion.div>

                {/* Thought Bubble - Aesthetic Glassmorphism */}
                <motion.div
                    className="absolute top-[15%] right-[5%] md:right-[10%] lg:top-[20%] lg:right-[10%] z-20"
                    style={{ y: smoothYBubble }}
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8, type: "spring" }}
                >
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 opacity-30 blur-lg rounded-2xl group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-sm shadow-2xl max-w-xs md:max-w-sm">
                            <div className="flex items-start space-x-3">
                                <MessageSquare className="text-cyan-400 shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1 font-sans">System Online</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed font-sans font-light">
                                        Welcome to <span className="text-cyan-300 font-medium">ACM MITB</span>.
                                        We are ready to <span className="italic text-white">innovate</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Connector Triangle */}
                            <div className="absolute bottom-[-10px] left-0 w-0 h-0 border-t-[10px] border-t-white/10 border-r-[10px] border-r-transparent"></div>
                        </div>
                    </div>
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
