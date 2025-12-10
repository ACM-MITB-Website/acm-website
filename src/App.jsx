import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import LoaderBot from './components/LoaderBot';
import Hub from './components/Hub';
import ErrorBoundary from './components/ErrorBoundary';
import SplashCursor from './components/SplashCursor';

const App = () => {
    // Debug: Keep loading disabled for now to ensure stability
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(false);
    const timelineRef = useRef(null);

    useEffect(() => {
        // Remove debug loader if it exists
        const loader = document.getElementById('debug-loader');
        if (loader) loader.style.display = 'none';

        const handleScroll = () => {
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                // Show splash when Timeline is approaching (fade in slightly before it arrives)
                const triggerPoint = window.innerHeight;
                setShowSplash(rect.top < triggerPoint);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // LoaderBot handles its own timer based on Spline load, so we don't need a timeout here
    // but we need a failsafe in case Spline never loads? 
    // Actually LoaderBot calls onComplete. We just need to pass setLoading(false) to it.

    // We can remove the timer effect for loading, or keep it as a fallback.
    // Let's rely on LoaderBot's onComplete.

    return (
        <ErrorBoundary>
            <AnimatePresence mode='wait'>
                {loading ? (
                    <LoaderBot key="loader" onComplete={() => setLoading(false)} />
                ) : (
                    <div key="main-content" className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black overflow-x-hidden">
                        <SplashCursor
                            isPaused={!showSplash}
                            className={`transition-opacity duration-1000 ${showSplash ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {/* <SidePanel /> REMOVED as per user request */}
                        <Navbar />
                        <Hero />
                        <About />
                        <Hub />

                        <div ref={timelineRef}>
                            <Timeline />
                        </div>

                        <Sponsors />
                        <Footer />
                    </div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
};

export default App;
