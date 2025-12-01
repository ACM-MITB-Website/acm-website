import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Hub from './components/Hub';
import Sponsors from './components/Sponsors';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader from './components/Loader';

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-acm-teal selection:text-black">
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <Navbar />
            <Hero />
            <Hub />
            <Sponsors />
            <Timeline />
            <Footer />
        </div>
    );
};

export default App;
