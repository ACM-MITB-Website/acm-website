import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import sigAiLogo from './assets/sigai-logo.png';
import StarBackground from './components/StarBackground';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const SigAiHero = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    return (
        <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center pt-20">
            <div className="absolute inset-0 z-0">
                <StarBackground />
            </div>
            {/* 3D Sphere Overlay Removed for Moving Stars Effect */}

            <div className="relative z-10 text-center px-4">
                <h1 ref={textRef} className="flex justify-center items-center">
                    <img
                        src={sigAiLogo}
                        alt="SIG AI"
                        className="h-24 md:h-32 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                    />
                </h1>
                <p className="text-xl md:text-2xl text-cyan-400 mt-4 font-mono tracking-widest">
                    ARTIFICIAL INTELLIGENCE
                </p>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto">
            <h2 className="text-sm font-mono text-cyan-400 tracking-widest mb-8">ABOUT US</h2>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                We are the <span className="text-cyan-400 font-bold">Special Interest Group on Artificial Intelligence</span>.
                Our mission is to explore the frontiers of machine learning, deep learning, and cognitive computing.
                We aim to demystify AI and foster a community of ethical innovators.
            </p>
        </section>
    );
};

const Team = () => {
    const members = [
        { name: 'K L Vaibhav Jyotish', role: 'Chair', image: '/assets/sigai-vaibhav.jpg', linkedin: '#' },
        { name: 'Divi Jaiwanth', role: 'Vice Chair', image: '/assets/divi.jpg', linkedin: '#' },
        { name: 'Mahek Sethi', role: 'General Secretary', image: '/assets/sigai-mahek.jpg', linkedin: '#' },
        { name: 'Surya R', role: 'Executive Secretary', image: '/assets/sigai-surya.jpg', linkedin: '#' },
        { name: 'Hemang Agarwal', role: 'Treasurer', image: '/assets/sigai-hemang.jpg', linkedin: '#' },
        { name: 'Shouraya Sharma', role: 'Web Master', image: '/assets/sigai-shouraya.jpg', linkedin: 'https://www.linkedin.com/in/shouraya-sharma-71bb2b329/' },

        { name: 'Tejas N', role: 'Executive Member', image: '/assets/tej.jpeg', linkedin: '#' },
        { name: 'Aneesh Srivattsa', role: 'Executive Member', image: '/assets/sigai-aneesh.jpg', linkedin: '#' },
        { name: 'Chitra Singh', role: 'Executive Member', image: '/assets/sigai-chitra.jpg', linkedin: '#' },
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
                    <h2 className="text-sm font-mono text-cyan-400 tracking-widest mb-2">CREW MANIFEST</h2>
                    <div className="h-px w-20 bg-cyan-400/50"></div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-mono text-gray-500">SECTOR 9A // NEURAL NET</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="team-card group relative h-80 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                        {/* Holographic Gradient Overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 40%)'
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
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                                <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></div>
                            </div>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{member.role}</p>

                            {/* Tech Decoration & Socials */}
                            <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="flex space-x-1">
                                    <div className="h-1 w-8 bg-cyan-400/50 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                </div>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SigAiApp = () => {
    const timelineRef = useRef(null);
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

    return (
        <div className="bg-black min-h-screen text-white selection:bg-cyan-400 selection:text-black">
            {showProfileForm && user && (
                <ProfileCompletion user={user} onComplete={() => setShowProfileForm(false)} />
            )}
            <Navbar />
            <SigAiHero />
            <About />
            <Team />
            <div ref={timelineRef}>
                <EventShowcase chapter="sigai" />
            </div>
            <Footer />
        </div>
    );
};

export default SigAiApp;
