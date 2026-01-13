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
import { Shield } from 'lucide-react';
import ScrollSection from './components/ui/ScrollSection';

const App = () => {
    const { loading, setLoading } = useLoader();
    const [user, setUser] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [hasTownhallAccess, setHasTownhallAccess] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Check if user profile exists
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (!userDoc.exists()) {
                    setShowProfileForm(true);
                } else {
                    setShowProfileForm(false);
                    // Check townhall access
                    setHasTownhallAccess(userDoc.data()?.townhall === true);
                }
            } else {
                setShowProfileForm(false);
                setHasTownhallAccess(false);
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
                    <div key="main-content" className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black overflow-x-hidden">
                        <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
                            <Galaxy
                                mouseRepulsion={false}
                                mouseInteraction={false}
                                density={1.5}
                                glowIntensity={0.5}
                                saturation={0.8}
                                hueShift={240}
                            />
                        </div>
                        {showProfileForm && user && (
                            <ProfileCompletion user={user} onComplete={handleProfileComplete} />
                        )}
                        <PopupBanner />
                        <EventSidebar />
                        <Navbar />
                        <Hero />

                        <ScrollSection>
                            <About />
                        </ScrollSection>

                        <ScrollSection>
                            <Hub />
                        </ScrollSection>

                        <ScrollSection>
                            <Sponsors />
                        </ScrollSection>

                        <ScrollSection>
                            <Footer />
                        </ScrollSection>

                        {/* Townhall Access Button - Only for special users */}
                        {hasTownhallAccess && (
                            <a
                                href="/townhall.html"
                                className="fixed bottom-6 right-6 z-50 group bg-linear-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 animate-pulse hover:animate-none"
                                title="Townhall Admin Access"
                            >
                                <Shield className="text-white" size={28} />
                                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Townhall Admin
                                </span>
                            </a>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
};

export default App;
