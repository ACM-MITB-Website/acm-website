import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const PopupBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // Check if popup has been shown in this session
        const hasSeenPopup = sessionStorage.getItem('hasSeenTuringerPopup');

        if (!hasSeenPopup) {
            // Show popup after a small delay
            const timer = setTimeout(() => {
                setIsVisible(true);
                // Animate in
                if (bannerRef.current && overlayRef.current) {
                    gsap.fromTo(overlayRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.5 }
                    );
                    gsap.fromTo(bannerRef.current,
                        { y: 50, opacity: 0, scale: 0.9 },
                        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                    );
                }
            }, 1500); // 1.5s delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        // Animate out
        gsap.to(bannerRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        setIsVisible(false);
                        sessionStorage.setItem('hasSeenTuringerPopup', 'true');
                    }
                });
            }
        });
    };

    if (!isVisible) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <div
                ref={bannerRef}
                className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-green-500/20 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>



                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                    <div className="mb-2 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-mono text-green-400">
                        INCOMING TRANSMISSION
                    </div>

                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        TURINGER 2026
                    </h2>
                    <p className="mt-2 text-xl text-green-400 font-mono">IS HERE</p>

                    <div className="my-8 flex items-center justify-center space-x-4">
                        <div className="h-px w-12 bg-white/20"></div>
                        <p className="text-lg font-bold text-white">31st JAN 2026</p>
                        <div className="h-px w-12 bg-white/20"></div>
                    </div>

                    <p className="mb-8 text-gray-400 text-sm max-w-xs mx-auto">
                        Join the ultimate coding showdown. Prove your skills. Win glory.
                    </p>

                    <button
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-bold text-black transition-all hover:bg-green-400 hover:scale-105"
                        onClick={() => {
                            // Add registration logic here
                            console.log('Register clicked');
                            handleClose();
                        }}
                    >
                        <span className="relative z-10">REGISTER NOW</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default PopupBanner;
