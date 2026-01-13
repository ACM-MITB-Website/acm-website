import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import sigSoftLogo from './assets/sigsoft-logo.png';
import StarBackground from './components/StarBackground';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const SigSoftHero = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    return (
        <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center pt-20">
            <div className="absolute inset-0 z-0">
                <StarBackground />
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 ref={textRef} className="flex justify-center items-center">
                    <img
                        src={sigSoftLogo}
                        alt="SIGSOFT"
                        className="h-24 md:h-32 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                    />
                </h1>
                <p className="text-xl md:text-2xl text-green-500 mt-4 font-mono tracking-widest">
                    SOFTWARE ENGINEERING
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
                    className={`px-4 md:px-8 py-3 font-mono text-sm md:text-base tracking-wider transition-all duration-300 rounded-lg border ${
                        activeTab === tab.id
                            ? 'bg-green-500/20 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
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
            <h2 className="text-sm font-mono text-green-500 tracking-widest mb-8">ABOUT US</h2>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                We are the <span className="text-green-500 font-bold">Special Interest Group on Software Engineering</span>.
                Our mission is to advance the art and science of software development through workshops, hackathons, and open-source contributions.
                We bridge the gap between academic theory and industrial practice.
            </p>
        </section>
    );
};

const Team = () => {
    const members = [
        { name: 'Shane Chellam', role: 'Chair', image: '/assets/shane-chellam.jpg', linkedin: 'https://www.linkedin.com/in/shane-chellam-sp/' },
        { name: 'Fadil Ahmed', role: 'Vice Chair', image: '/assets/fadil-ahmed.jpg', linkedin: '#' },
        { name: 'Sai Tej Gadiyaram', role: 'General Secretary', image: '/assets/sai-tej-gadiyaram.jpg', linkedin: 'https://www.linkedin.com/in/sai-tej-gadiyaram-481199259/' },
        { name: 'Thushar Maiyya', role: 'Executive Secretary', image: '/assets/thushar-maiyya.jpg', linkedin: 'https://www.linkedin.com/in/thushar-maiya-27a0a3390/' },
        { name: 'Ananya Gupta', role: 'Treasurer', image: '/assets/ananya-gupta.jpg', linkedin: 'https://www.linkedin.com/in/ananya-gupta-001601292/' },
        { name: 'Anchit Goel', role: 'Web Master', image: '/assets/anchit-goel.jpg', linkedin: 'https://www.linkedin.com/in/anchitgoel5/' },
        { name: 'Ashwin S. Gupta', role: 'Executive Member', image: '/assets/ashwin-gupta.jpg', linkedin: '#' },
        { name: 'Naman Aggarwal', role: 'Executive Member', image: '/assets/naman-agarwal.jpg', linkedin: '#' },
        { name: 'Farhad Jaffrey', role: 'Executive Member', image: '/assets/farhad.jpg', linkedin: '#' },
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
                    <h2 className="text-sm font-mono text-green-500 tracking-widest mb-2">CREW MANIFEST</h2>
                    <div className="h-px w-20 bg-green-500/50"></div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-mono text-gray-500">SECTOR 7G // ACTIVE PERSONNEL</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="team-card group relative h-80 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 40%)'
                            }}
                        ></div>

                        <div className="absolute inset-0 p-1">
                            <div className="w-full h-full rounded-lg overflow-hidden relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 pointer-events-none"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors">{member.name}</h3>
                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                            </div>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{member.role}</p>

                            <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="flex space-x-1">
                                    <div className="h-1 w-8 bg-green-500/50 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                </div>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-green-500 transition-colors transform hover:scale-110"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SigSoftApp = () => {
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
                        <EventShowcase chapter="sigsoft" />
                    </div>
                );
            default:
                return <About />;
        }
    };

    return (
        <div className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black">
            {showProfileForm && user && (
                <ProfileCompletion user={user} onComplete={() => setShowProfileForm(false)} />
            )}
            <Navbar />
            <SigSoftHero />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="min-h-[50vh]">
                {renderTabContent()}
            </div>
            <Footer />
        </div>
    );
};

export default SigSoftApp;
