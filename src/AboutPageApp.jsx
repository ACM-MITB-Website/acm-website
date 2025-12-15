import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';


const AboutPageApp = () => {
    React.useEffect(() => {
        const loader = document.getElementById('debug-loader');
        if (loader) loader.style.display = 'none';
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-blue-600 selection:text-black">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <AboutSection />
            </div>
            <Footer />
        </div>
    );
};

export default AboutPageApp;
