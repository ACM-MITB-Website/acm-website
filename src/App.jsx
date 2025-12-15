<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import LoaderBot from './components/LoaderBot';
import Hub from './components/Hub';
import ErrorBoundary from './components/ErrorBoundary';
import PopupBanner from './components/PopupBanner';
import EventSidebar from './components/EventSidebar';

const App = () => {
    // Debug: Keep loading disabled for now to ensure stability
    const [loading, setLoading] = useState(true);
    const timelineRef = useRef(null);

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
                        {/* Event Popup Banner */}
                        <PopupBanner />
                        {/* Event Sidebar Notification */}
                        <EventSidebar />
                        {/* <SidePanel /> REMOVED as per user request */}
                        <Navbar />
                        <Hero />
                        <About />
                        <Hub />

                        {/* Journey Section (Timeline) Removed */}

                        <Sponsors />
                        <Footer />
                    </div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
};

export default App;

=======
import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import LoaderBot from './components/LoaderBot';
import Hub from './components/Hub';
import ErrorBoundary from './components/ErrorBoundary';
import PopupBanner from './components/PopupBanner';
import EventSidebar from './components/EventSidebar';

const App = () => {
    // Debug: Keep loading disabled for now to ensure stability
    const [loading, setLoading] = useState(true);
    const timelineRef = useRef(null);

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
                        {/* Event Popup Banner */}
                        <PopupBanner />
                        {/* Event Sidebar Notification */}
                        <EventSidebar />
                        {/* <SidePanel /> REMOVED as per user request */}
                        <Navbar />
                        <Hero />
                        <About />
                        <Hub />

                        {/* Journey Section (Timeline) Removed */}

                        <Sponsors />
                        <Footer />
                    </div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
};

export default App;

>>>>>>> 6ded1bc (Refactor stories feature and add team member photos)
