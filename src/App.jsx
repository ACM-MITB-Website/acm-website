import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Hub from './components/Hub';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-acm-teal selection:text-black">
            <Navbar />
            <Hero />
            <Hub />
            <Timeline />
            <Footer />
        </div>
    );
};

export default App;
