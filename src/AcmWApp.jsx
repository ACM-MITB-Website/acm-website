import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import acmWLogo from './assets/acm-w-logo.png';
import StarBackground from './components/StarBackground';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AcmWHero = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    return (
        <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center pt-32">
            <div className="absolute inset-0 z-0">
                <StarBackground />
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 ref={textRef} className="flex justify-center items-center">
                    <img
                        src={acmWLogo}
                        alt="ACM-W"
                        className="h-24 md:h-32 drop-shadow-[0_0_30px_rgba(217,70,239,0.5)]"
                    />
                </h1>
                <p className="text-xl md:text-2xl text-fuchsia-500 mt-4 font-mono tracking-widest">
                    WOMEN IN COMPUTING
                </p>
            </div>
        </section>
    );
};

const TabNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'about', label: 'About Us' },
        { id: 'team', label: 'Crew Manifest' },
        { id: 'events', label: 'Events Chronicle' },
    ];

    return (
        <div className="flex justify-center gap-2 md:gap-4 px-4 py-6 max-w-4xl mx-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 md:px-8 py-3 font-mono text-sm md:text-base tracking-wider transition-all duration-300 rounded-lg border ${activeTab === tab.id
                        ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

const About = () => {
    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto">
            <h2 className="text-sm font-mono text-fuchsia-500 tracking-widest mb-8">ABOUT US</h2>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                We are the <span className="text-fuchsia-500 font-bold">ACM Women's Chapter</span>.
                Our mission is to support, celebrate, and advocate for women in computing.
                We provide resources, mentorship, and a supportive community for women in technology.
            </p>
        </section>
    );
};

const Team = () => {
    const members = [
        { name: 'Vaishnavi Ashopa', role: 'Chair', image: '/assets/w-vaishnavi.jpg', linkedin: '#' },
        { name: 'Ruchitankshi A', role: 'Vice Chair', image: '/assets/ruchi.jpg', linkedin: '#' },
        { name: 'Varsha Angadi', role: 'General Secretary', image: '/assets/w-varsha.jpg', linkedin: '#' },
        { name: 'Dhruti A', role: 'Executive Secretary', image: '/assets/w-dhruti.jpg', linkedin: '#' },
        { name: 'Tanvi Ghule', role: 'Treasurer', image: '/assets/w-tanvi.jpeg', linkedin: '#' },
        { name: 'Thanmai Chamarthi', role: 'Executive Member', image: '/assets/w-thanmai.jpg', linkedin: '#' },
        { name: 'Koynaa Jain', role: 'Executive Member', image: '/assets/w-koynaa.jpeg', linkedin: '#' },
        { name: 'Venushree Gayatri', role: 'Executive Member', image: '/assets/w-venushree.jpg', linkedin: '#' },
    ];

    useEffect(() => {
        const cards = document.querySelectorAll('.team-card');

        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, []);

    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
                <div>
                    <h2 className="text-sm font-mono text-fuchsia-500 tracking-widest mb-2">CREW MANIFEST</h2>
                    <div className="h-px w-20 bg-fuchsia-500/50"></div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-mono text-gray-500">SECTOR 4F // ADA LOVELACE WING</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="team-card group relative h-[28rem] md:h-80 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]"
                    >
                        {/* Holographic Gradient Overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(217, 70, 239, 0.15), transparent 40%)'
                            }}
                        ></div>

                        {/* Image Container */}
                        <div className="absolute inset-0 p-1">
                            <div className="w-full h-full rounded-lg overflow-hidden relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
                                />
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-500 transition-colors">{member.name}</h3>
                                <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"></div>
                            </div>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{member.role}</p>

                            {/* Tech Decoration & Socials */}
                            <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="flex space-x-1">
                                    <div className="h-1 w-8 bg-fuchsia-500/50 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                </div>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-fuchsia-500 transition-colors transform hover:scale-110"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const AcmWApp = () => {
    const timelineRef = useRef(null);
    const [user, setUser] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'team':
                return <Team />;
            case 'events':
                return (
                    <div ref={timelineRef}>
                        <EventShowcase chapter="acm-w" />
                    </div>
                );
            default:
                return <About />;
        }
    };

    return (
        <div className="bg-black min-h-screen text-white selection:bg-fuchsia-500 selection:text-black">
            {showProfileForm && user && (
                <ProfileCompletion user={user} onComplete={() => setShowProfileForm(false)} />
            )}
            <Navbar />
            <AcmWHero />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="min-h-[50vh]">
                {renderTabContent()}
            </div>
            <Footer />
        </div>
    );
};

export default AcmWApp;
