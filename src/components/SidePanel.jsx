import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const SidePanel = () => {
    const panelRef = useRef(null);

    useEffect(() => {
        // Simple slide-in animation
        gsap.fromTo(panelRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
        );
    }, []);

    return (
        <div
            ref={panelRef}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
        >
            {/* Vertical Text Label */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
                <span className="text-xs font-mono text-green-500/80 tracking-widest uppercase">Incoming Event</span>
            </div>

            {/* Main Panel */}
            <div className="bg-black/40 backdrop-blur-xl border-l border-y border-white/10 rounded-l-2xl p-6 w-64 shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:bg-black/60 transition-colors duration-300 group">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-50"></div>

                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white leading-none tracking-tighter">
                        TURINGER
                        <span className="block text-green-400">2026</span>
                    </h3>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                        <span className="text-gray-400">Date</span>
                        <span className="font-mono text-white">31 JAN</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                        <span className="text-gray-400">Status</span>
                        <span className="font-mono text-green-400 animate-pulse">OPEN</span>
                    </div>
                </div>

                <button className="w-full group/btn relative overflow-hidden rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-green-500 hover:text-black">
                    <span className="relative z-10 flex items-center justify-center">
                        REGISTER <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SidePanel;
