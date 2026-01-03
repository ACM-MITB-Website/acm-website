import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import acmMitbLogo from './assets/acm-mitb-logo.png';
import StarBackground from './components/StarBackground';
import ProfileCompletion from './components/ProfileCompletion';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AcmMitbHero = () => {
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
                        src={acmMitbLogo}
                        alt="ACM MITB"
                        className="h-24 md:h-32 drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    />
                </h1>
                <p className="text-xl md:text-2xl text-blue-600 mt-4 font-mono tracking-widest">
                    STUDENT CHAPTER
                </p>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto">
            <h2 className="text-sm font-mono text-blue-600 tracking-widest mb-8">ABOUT US</h2>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                We are the <span className="text-blue-600 font-bold">Association for Computing Machinery</span> Student Chapter at MIT Bengaluru.
                We are a community of students passionate about computing, dedicated to advancing technology and fostering innovation on campus.
            </p>
        </section>
    );
};

import shivanshImg from './assets/shivansh-gautam.jpg';
import medhaImg from './assets/medha-udupa.jpg';

const Team = () => {
    const members = [
        { name: 'Dr.Gururaj H L', role: 'Faculty Advisor', image: '/assets/gururaj-hl.jpg', linkedin: 'https://www.linkedin.com/in/dr-gururaj-h-l-92513539/' },
        { name: 'Dr.Shreyas J', role: 'Faculty Advisor', image: '/assets/shreyas-j.jpg', linkedin: 'https://www.linkedin.com/in/dr-shreyas-j-a069a225/' },
        { name: 'Shivansh Gautam', role: 'Chair', image: shivanshImg, linkedin: 'https://www.linkedin.com/in/shivansh-gautam-sg/' },
        { name: 'Medha Udupa', role: 'Vice Chair', image: medhaImg, linkedin: 'https://www.linkedin.com/in/medha-udupa-b55352227' },
        { name: 'S.P. Bharath', role: 'General Secretary', image: '/assets/sp-bharath.jpg', linkedin: '#' },
        { name: 'Anushka Mishra', role: 'Executive Secretary', image: '/assets/anushka-mishra.jpg', linkedin: 'https://www.linkedin.com/in/anushka-mishra-355049315/' },
        { name: 'Romansh Rathee', role: 'Treasurer', image: '/assets/romansh-rathee.jpg', linkedin: 'https://www.linkedin.com/in/romansh-rathee/' },
        { name: 'Ryan Gupta', role: 'Web Master', image: '/assets/ryan-gupta.jpg', linkedin: 'https://www.linkedin.com/in/ryan-gupta/' },
        { name: 'Ekalvya Sethi', role: 'Media Head', image: '/assets/ekalvya-sethi.jpg', linkedin: 'https://www.linkedin.com/in/eklavya-sethi-565631346/' },
        { name: 'Nidheesh Jakkula', role: 'Graphic Designer', image: '/assets/nidheesh-jakkula.jpg', linkedin: '#' },
        { name: 'Sanvi Sharma', role: 'Executive Member', image: '/assets/sanvi-sharma.jpg', linkedin: 'https://www.linkedin.com/in/sanvi-sharma-ai/' },
        { name: 'Yash Bharadwaj', role: 'Executive Member', image: '/assets/yash-bharadwaj.jpg', linkedin: '#' },
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
                    <h2 className="text-sm font-mono text-blue-600 tracking-widest mb-2">CREW MANIFEST</h2>
                    <div className="h-px w-20 bg-blue-600/50"></div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-mono text-gray-500">SECTOR 1A // CORE TEAM</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="team-card group relative h-80 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                    >
                        {/* Holographic Gradient Overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.15), transparent 40%)'
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
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-600 transition-colors">{member.name}</h3>
                                <div className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_10px_#2563eb]"></div>
                            </div>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{member.role}</p>

                            {/* Tech Decoration & Socials */}
                            <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="flex space-x-1">
                                    <div className="h-1 w-8 bg-blue-600/50 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                    <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                                </div>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110 z-20 pointer-events-auto"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};


const AcmMitbApp = () => {
    // const [events, setEvents] = useState([]); // Replaced with static data
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
        <div className="bg-black min-h-screen text-white selection:bg-blue-600 selection:text-black">
            {showProfileForm && user && (
                <ProfileCompletion user={user} onComplete={() => setShowProfileForm(false)} />
            )}
            <Navbar />
            <AcmMitbHero />
            <About />
            <Team />
            <div ref={timelineRef}>
                <EventShowcase chapter="acm-mitb" />
            </div>
            <Footer />
        </div>
    );
};

export default AcmMitbApp;
