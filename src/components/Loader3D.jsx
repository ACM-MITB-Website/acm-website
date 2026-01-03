import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader3D = ({ onComplete }) => {
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const [displayedText, setDisplayedText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const words = [
        { text: 'HEADS', color: '#3b82f6' },  // Blue
        { text: 'UP!', color: '#22c55e' }     // Green
    ];

    const exitAnimation = () => {
        gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: onComplete
        });
    };

    useEffect(() => {
        const currentWord = words[currentWordIndex];
        const isLastWord = currentWordIndex === words.length - 1;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayedText.length < currentWord.text.length) {
                    setDisplayedText(currentWord.text.substring(0, displayedText.length + 1));
                } else if (!isLastWord) {
                    // Finished typing, start deleting after a pause (but not for the last word)
                    setTimeout(() => setIsDeleting(true), 500);
                } else {
                    // Last word finished typing!
                    // Wait a bit then trigger exit
                    setTimeout(exitAnimation, 1500);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.substring(0, displayedText.length - 1));
                } else {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setCurrentWordIndex(currentWordIndex + 1);
                }
            }
        }, isDeleting ? 50 : 100); // Faster deletion than typing

        return () => clearTimeout(timeout);
    }, [displayedText, currentWordIndex, isDeleting]);

    useEffect(() => {
        // Initial setup
        gsap.set(containerRef.current, { opacity: 1 });
        gsap.set(progressRef.current, { scaleX: 0 });

        // Progress Bar
        gsap.to(progressRef.current, {
            scaleX: 1,
            duration: 3, // Approximate time for typing to complete
            ease: "power1.inOut"
        });
    }, []);

    const currentColor = words[currentWordIndex].color;

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col items-center justify-center overflow-hidden font-sans">

            {/* Text Section with Typing Effect */}
            <div className="relative z-20 text-center px-4">
                <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] font-mono min-h-[1.2em]"
                    style={{ color: currentColor }}
                >
                    {displayedText}
                    <span className="animate-pulse">_</span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-gray-400 font-medium tracking-wide opacity-70">
                    AN INNOVATION ZONE AWAITS.
                </p>
            </div>

            {/* Simple Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-900">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 origin-left"
                ></div>
            </div>
        </div>
    );
};

export default Loader3D;
