import React, { useState, useEffect } from 'react';
import { useLoader } from './context/LoaderContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/NavbarOptimized';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Hub from './components/Hub';
import Galaxy from './components/ui/Galaxy';
import ErrorBoundary from './components/ErrorBoundary';
import PopupBanner from './components/PopupBanner';
import EventSidebar from './components/EventSidebar';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import ScrollSection from './components/ui/ScrollSection';

const App = () => {
    const { loading, setLoading } = useLoader();
    const [user, setUser] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Mobile Detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser);
            if (currentUser) {

                try {
                    // Check if user profile exists
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));

                    if (!userDoc.exists()) {

                        setShowProfileForm(true);
                    } else {

                        setShowProfileForm(false);
                    }
                } catch (error) {
                    console.error('❌ Error checking user document:', error);
                    setShowProfileForm(false);
                }
            } else {

                setShowProfileForm(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleProfileComplete = () => {
        setShowProfileForm(false);
    };

    return (
        <ErrorBoundary>
            <AnimatePresence mode='wait'>
                {loading ? (
                    <Loader key="loader" onComplete={() => {
                        setLoading(false);
                    }} />
                ) : (
                    <div key="main-content" className="relative bg-black min-h-screen text-white selection:bg-green-500 selection:text-black overflow-x-hidden">
                        {/* Black background layer - always visible */}
                        <div className="fixed inset-0 w-screen h-screen bg-black z-0" />

                        {/* Disable Galaxy on mobile for performance */}
                        {!isMobile && (
                            <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none will-change-transform">
                                <Galaxy
                                    mouseRepulsion={false}
                                    mouseInteraction={false}
                                    density={0.8}
                                    glowIntensity={0.2}
                                    saturation={0.5}
                                    hueShift={240}
                                />
                            </div>
                        )}
                        {/* Mobile gradient background */}
                        {isMobile && (
                            <div className="fixed inset-0 w-screen h-screen z-0 bg-linear-to-b from-black via-gray-900 to-black" />
                        )}                        {showProfileForm && user && (
                            <>

                                <ProfileCompletion user={user} onComplete={handleProfileComplete} />
                            </>
                        )}
                        <PopupBanner />
                        <EventSidebar />
                        <Navbar />
                        <Hero />

                        <ScrollSection className="relative z-10">
                            <About />
                        </ScrollSection>

                        <ScrollSection className="relative z-10">
                            <Hub />
                        </ScrollSection>

                        <ScrollSection className="relative z-10">
                            <Sponsors />
                        </ScrollSection>

                        <ScrollSection className="relative z-10">
                            <Footer />
                        </ScrollSection>
                    </div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
};

export default App;
