import React, { useState, useEffect } from 'react';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const AboutPageApp = () => {
    const [user, setUser] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                setShowProfileForm(!userDoc.exists());
            } else {
                setShowProfileForm(false);
            }
        });
        return () => unsubscribe();
    }, []);

    React.useEffect(() => {
        const loader = document.getElementById('debug-loader');
        if (loader) loader.style.display = 'none';
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-blue-600 selection:text-black">
            {showProfileForm && user && (
                <ProfileCompletion user={user} onComplete={() => setShowProfileForm(false)} />
            )}
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <AboutSection />
            </div>
            <Footer />
        </div>
    );
};

export default AboutPageApp;
