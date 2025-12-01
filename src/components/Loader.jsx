import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        const words = ["HELLO", "WELCOME", "TO"];

        // Initial state
        gsap.set(containerRef.current, { yPercent: 0 });
        gsap.set(logoRef.current, { opacity: 0, y: 50 });

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

        // Logo Reveal
        tl.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        })
            .to(logoRef.current, {
                scale: 1.1,
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
                delay: 0.5
            });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            <div ref={textRef} className="relative flex items-center justify-center w-full h-full">
                {/* Words will be injected here */}
            </div>
            <div ref={logoRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mix-blend-difference">
                    ACM MITB
                </h1>
            </div>
        </div>
    );
};

export default Loader;
