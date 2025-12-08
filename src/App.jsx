import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader3D from './components/Loader3D';
import Hub from './components/Hub';
import ErrorBoundary from './components/ErrorBoundary';
import SplashCursor from './components/SplashCursor';

const App = () => {
    // Debug: Keep loading disabled for now to ensure stability
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(false);
    const timelineRef = useRef(null);

    useEffect(() => {
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

    useEffect(() => {
        // Simulate initial loading for 3D assets
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ErrorBoundary>
            <AnimatePresence mode='wait'>
                {loading ? (
                    <Loader3D key="loader" />
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
