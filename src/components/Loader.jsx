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
        gsap.set(logoRef.current, { opacity: 0, y: 50, scale: 0.8 });

        // Image carousel effect
        const imageInterval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % teamImages.length);
        }, 400); // Change image every 400ms for dynamic effect

        // Word cycle animation
        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.innerText = word;
            wordSpan.className = "absolute text-4xl md:text-6xl font-mono font-bold text-white tracking-widest opacity-0 z-20";
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

        // Logo Reveal with enhanced animation
        tl.to(logoRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
        })
            .to(logoRef.current, {
                scale: 1.05,
                duration: 1.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: 1
            }, "-=0.5")

            // Curtain Reveal
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.5,
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
            {/* Dynamic Background Images Carousel with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
                {teamImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${currentImage === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            animation: currentImage === index ? 'kenBurns 5s ease-in-out infinite alternate' : 'none'
                        }}
                    >
                        {/* Cinematic gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-acm-teal/20 via-transparent to-acm-teal/20"></div>

                        {/* Scanline effect for tech aesthetic */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none animate-scan"></div>
                    </div>
                ))}
            </div>

            {/* Animated border corners */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-acm-teal opacity-60 animate-pulse"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-acm-teal opacity-60 animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-acm-teal opacity-60 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-acm-teal opacity-60 animate-pulse"></div>

            {/* Text Container */}
            <div ref={textRef} className="relative flex items-center justify-center w-full h-full z-10">
                {/* Words will be injected here */}
            </div>

            {/* Logo with creative text wrapping effect */}
            <div ref={logoRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-10">
                <div className="relative">
                    {/* Main text with glitch effect */}
                    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter relative z-10">
                        ACM MITB
                    </h1>

                    {/* Glowing outline */}
                    <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black text-acm-teal tracking-tighter opacity-50 blur-lg animate-pulse">
                        ACM MITB
                    </h1>

                    {/* Subtitle */}
                    <p className="text-center text-sm md:text-xl font-mono text-acm-teal/80 tracking-[0.3em] mt-4 animate-pulse">
                        POWERED BY INNOVATION
                    </p>
                </div>
            </div>

            {/* Loading bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                <div className="h-full bg-gradient-to-r from-acm-teal via-cyan-400 to-acm-teal animate-loader-bar"></div>
            </div>

            <style jsx>{`
                @keyframes kenBurns {
                    0% {
                        transform: scale(1) translateX(0) translateY(0);
                    }
                    100% {
                        transform: scale(1.1) translateX(-2%) translateY(-2%);
                    }
                }

                @keyframes scan {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }

                @keyframes loader-bar {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-scan {
                    animation: scan 8s linear infinite;
                }

                .animate-loader-bar {
                    animation: loader-bar 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Loader;
