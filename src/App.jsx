import AuthButton from './components/AuthButton';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader3D from './components/Loader3D';
import Hub from './components/Hub';



import ErrorBoundary from './components/ErrorBoundary';

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
        <ErrorBoundary>
            <div className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black overflow-x-hidden">


                <Navbar />
                <Hero />
                <About />
                <Hub />
                <Timeline />
                <Sponsors />
                <Footer />
            </div>
        </ErrorBoundary>
    );
};

export default App;
