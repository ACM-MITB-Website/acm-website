import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const logoRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);

    const teamImages = [
        '/assets/team-1.png',
        '/assets/team-2.png',
        '/assets/team-3.png',
        '/assets/team-4.png'
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        const words = ["HELLO", "WELCOME", "TO"];

        // Initial state
        gsap.set(containerRef.current, { yPercent: 0 });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.5 });

        // Image carousel effect
        const imageInterval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % teamImages.length);
        }, 800); // Change image every 800ms

        // Word cycle animation
        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.innerText = word;
            wordSpan.className = "absolute text-4xl md:text-6xl font-mono font-bold text-white tracking-widest opacity-0";
            textRef.current.appendChild(wordSpan);

            tl.to(wordSpan, {
                opacity: 1,
                duration: 0.1,
                ease: "power2.inOut"
            })
                .to(wordSpan, {
                    opacity: 0,
                    duration: 0.1,
                    delay: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (textRef.current.contains(wordSpan)) {
                            textRef.current.removeChild(wordSpan);
                        }
                    }
                });
        });

        // Logo Reveal with text clipping effect
        tl.to(logoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)"
        })
            .to(logoRef.current, {
                scale: 1.02,
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: 1
            }, "-=0.5")

            // Curtain Reveal
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.3,
                onComplete: () => {
                    clearInterval(imageInterval);
                }
            });

        return () => {
            tl.kill();
            clearInterval(imageInterval);
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-acm-teal/30 via-transparent to-cyan-500/30 animate-pulse"></div>
                </div>
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>

            {/* Text Container for HELLO/WELCOME/TO */}
            <div ref={textRef} className="relative flex items-center justify-center w-full h-full z-10">
                {/* Words will be injected here */}
            </div>

            {/* Logo with image clipping effect */}
            <div ref={logoRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-10">
                {/* Main text with team photos clipped inside */}
                <div className="relative">
                    {/* The actual text with image clipping */}
                    <div className="relative">
                        <h1
                            className="text-7xl md:text-[12rem] font-black tracking-tighter select-none"
                            style={{
                                backgroundImage: `url(${teamImages[currentImage]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent',
                                filter: 'brightness(1.2) contrast(1.1)',
                                transition: 'background-image 0.8s ease-in-out'
                            }}
                        >
                            ACM MITB
                        </h1>
                    </div>

                    {/* Glowing outline for depth */}
                    <h1
                        className="absolute top-0 left-0 text-7xl md:text-[12rem] font-black tracking-tighter select-none pointer-events-none"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '2px rgba(6, 182, 212, 0.5)',
                            filter: 'blur(4px)'
                        }}
                    >
                        ACM MITB
                    </h1>

                    {/* Sharp outline */}
                    <h1
                        className="absolute top-0 left-0 text-7xl md:text-[12rem] font-black tracking-tighter select-none pointer-events-none"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(6, 182, 212, 0.8)'
                        }}
                    >
                        ACM MITB
                    </h1>
                </div>

                {/* Subtitle with animation */}
                <div className="mt-6 overflow-hidden">
                    <p className="text-sm md:text-xl font-mono text-acm-teal/90 tracking-[0.4em] uppercase animate-fade-in">
                        Innovate • Connect • Excel
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-acm-teal animate-pulse"></div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-acm-teal to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-acm-teal animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-acm-teal to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-acm-teal animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out 0.5s both;
                }
            `}</style>
        </div>
    );
};

export default Loader;
