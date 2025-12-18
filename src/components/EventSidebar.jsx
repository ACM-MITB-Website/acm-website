import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, ChevronLeft, X } from 'lucide-react';

const EventSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isInHero, setIsInHero] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide sidebar if scrolled past the hero section (approx 100vh)
            const heroHeight = window.innerHeight * 0.8;
            setIsInHero(window.scrollY < heroHeight);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible || !isInHero) return null;

    return (
        <>
            {/* Collapsed State - Side Tab */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-40"
                    >
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="group flex items-center gap-2 bg-linear-to-r from-red-600 to-purple-600 text-white px-3 py-4 rounded-l-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 hover:px-4"
                        >
                            <ChevronLeft size={18} className="group-hover:animate-pulse" />
                            <div className="writing-vertical-rl rotate-180 text-sm font-bold tracking-wider">
                                NEXT EVENT
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded State - Sidebar Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 w-80"
                    >
                        <div className="relative overflow-hidden rounded-l-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                            {/* Background Effects */}
                            <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-red-500/20 blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white transition-colors z-20 rounded-full hover:bg-white/10"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Dismiss Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-3 left-3 p-1.5 text-gray-400 hover:text-red-400 transition-colors z-20 rounded-full hover:bg-white/10"
                                title="Dismiss"
                            >
                                <X size={16} />
                            </button>

                            {/* Content */}
                            <div className="relative z-10 p-6 pt-10">
                                {/* Event Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
                                        <Calendar size={12} className="text-red-400" />
                                        <span className="text-xs font-mono text-red-400">UPCOMING</span>
                                    </div>
                                </div>

                                {/* Event Title */}
                                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                                    TURINGER 2026
                                </h3>
                                <p className="text-purple-400 font-mono text-sm mb-4">
                                    The Ultimate Coding Showdown
                                </p>

                                {/* Date */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase">Date</span>
                                        <span className="text-white font-semibold">30th Jan - 1st Feb 2026</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-6">
                                    Join the ultimate coding showdown. Prove your skills. Win glory.
                                </p>

                                {/* Register Button */}
                                <a
                                    href="#"
                                    className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-r from-red-600 to-purple-600 px-6 py-3 font-bold text-white transition-all hover:from-red-500 hover:to-purple-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Add registration logic here
                                    }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        REGISTER NOW
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </div>

                            {/* Decorative Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 via-purple-500 to-red-500"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS for vertical text */}
            <style jsx>{`
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                }
            `}</style>
        </>
    );
};

export default EventSidebar;
