import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader3D from './components/Loader3D';
import Hub from './components/Hub';
import PopupBanner from './components/PopupBanner';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading for 3D assets
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader3D />;
    }

    return (
        <div className="bg-black min-h-screen text-white selection:bg-acm-teal selection:text-black">
            <PopupBanner />
            <Navbar />
            <Hero />
            <Sponsors />
            <Hub />
            <Timeline />
            <Footer />
        </div>
    );
};

export default App;
