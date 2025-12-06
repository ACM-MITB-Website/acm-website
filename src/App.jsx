import AuthButton from './components/AuthButton';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader3D from './components/Loader3D';
import Hub from './components/Hub';
import SidePanel from './components/SidePanel';
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
        <div className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black overflow-x-hidden">
            <PopupBanner />
            <SidePanel />
            <Navbar />
            <AuthButton />
            <Hero />
            <Hub />
            <Timeline />
            <Sponsors />
            <Footer />
        </div>
    );
};

export default App;
