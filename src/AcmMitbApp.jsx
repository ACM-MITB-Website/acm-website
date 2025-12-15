<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
// import Timeline from './components/Timeline'; // Removed
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import acmMitbLogo from './assets/acm-mitb-logo.png';
import Particles from './components/Particles';

import codeAiImg from './assets/code-ai-2025.png';
import hackniteImg from './assets/hacknite-2025.png';
import industryDayImg from './assets/industry-day-2025.jpg';
import posterPresentationImg from './assets/poster-presentation-2025.jpg';
import distinguishedLectureImg from './assets/distinguished-lecture-2025.jpg';
import squidGameImg from './assets/squid-game-2025.jpg';
import hacknovaImg from './assets/hacknova-2024.jpg';
import hourOfCodeImg from './assets/hour-of-code-2024.jpg';
import membershipDriveImg from './assets/membership-drive-2024.png';

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
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    className="absolute inset-0"
                />
            </div>
            {/* 3D Sphere Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#2563eb" />
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Sphere args={[2, 64, 64]}>
                            <MeshDistortMaterial
                                color="#2563eb"
                                emissive="#2563eb"
                                emissiveIntensity={0.2}
                                roughness={0.2}
                                metalness={0.8}
                                distort={0.4}
                                speed={2}
                            />
                        </Sphere>
                    </Float>
                </Canvas>
            </div>
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

const Team = () => {
    const members = [
        { name: 'Dr.Gururaj H L', role: 'Faculty Advisor', image: '/assets/gururaj-hl.jpg', linkedin: 'https://www.linkedin.com/in/dr-gururaj-h-l-92513539/' },
        { name: 'Dr.Shreyas J', role: 'Faculty Advisor', image: '/assets/shreyas-j.jpg', linkedin: 'https://www.linkedin.com/in/dr-shreyas-j-a069a225/' },
        { name: 'Shivansh Gautam', role: 'Chair', image: '/assets/shivansh-gautam.jpg', linkedin: 'https://www.linkedin.com/in/shivansh-gautam-sg/' },
        { name: 'Medha Udupa', role: 'Vice Chair', image: '/assets/medha-udupa.jpg', linkedin: 'https://www.linkedin.com/in/medha-udupa-b55352227' },
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

    const events = [
        {
            id: 1,
            title: "Code AI 2025",
            description: "Bridging research gaps in AI, biometrics, and robotics.",
            date: "Mon Apr 07 2025",
            image: codeAiImg,
            status: "upcoming"
        },
        {
            id: 2,
            title: "HackNite 2025",
            description: "A 24-hour hackathon organized by ACM MITB, fostering innovation and collaboration.",
            date: "Sat Mar 29 2025",
            image: hackniteImg,
            status: "upcoming"
        },
        {
            id: 3,
            title: "Industry Day 2025",
            description: "ACM India Industry Day at MIT Bengaluru on AI and mobile communication.",
            date: "Sat Feb 22 2025",
            image: industryDayImg,
            status: "completed"
        },
        {
            id: 4,
            title: "Research Poster Presentation",
            description: "20+ AI, cybersecurity, and data science posters were presented.",
            date: "Sun Jan 19 2025",
            image: posterPresentationImg,
            status: "completed"
        },
        {
            id: 5,
            title: "Distinguished Lecture",
            description: "Dr. Yogesh Simmhan's talk on distributed systems at MIT Bengaluru.",
            date: "Sun Jan 19 2025",
            image: distinguishedLectureImg,
            status: "completed"
        },
        {
            id: 6,
            title: "Squid Game",
            description: "150 students participated in strategic challenges at MITB ACM's event.",
            date: "Sat Jan 18 2025",
            image: squidGameImg,
            status: "completed"
        },
        {
            id: 7,
            title: "HackNova 2024",
            description: "48-hour Cybersecurity CTF Challenge at MIT Bengaluru with 40+ teams.",
            date: "Mon Dec 16 2024",
            image: hacknovaImg,
            status: "completed"
        },
        {
            id: 8,
            title: "Hour of Code 2024",
            description: "ACM MITB hosted Hour of Code at Muddenahalli, promoting digital literacy.",
            date: "Sun Dec 15 2024",
            image: hourOfCodeImg,
            status: "completed"
        },
        {
            id: 9,
            title: "Membership Drive",
            description: "Promoting ACM benefits with an interactive Theme Board at MAHE Bengaluru.",
            date: "Fri Nov 08 2024",
            image: membershipDriveImg,
            status: "completed"
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white selection:bg-blue-600 selection:text-black">
            <Navbar />
            <AcmMitbHero />
            <About />
            <Team />
            <div ref={timelineRef}>
                <EventShowcase events={events} />
            </div>
            <Footer />
        </div>
    );
};

export default AcmMitbApp;
=======
import React, { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
// import Timeline from './components/Timeline'; // Removed
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import acmMitbLogo from './assets/acm-mitb-logo.png';
import Particles from './components/Particles';

import codeAiImg from './assets/code-ai-2025.png';
import hackniteImg from './assets/hacknite-2025.png';
import industryDayImg from './assets/industry-day-2025.jpg';
import posterPresentationImg from './assets/poster-presentation-2025.jpg';
import distinguishedLectureImg from './assets/distinguished-lecture-2025.jpg';
import squidGameImg from './assets/squid-game-2025.jpg';
import hacknovaImg from './assets/hacknova-2024.jpg';
import hourOfCodeImg from './assets/hour-of-code-2024.jpg';
import membershipDriveImg from './assets/membership-drive-2024.png';

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
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    className="absolute inset-0"
                />
            </div>
            {/* 3D Sphere Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#2563eb" />
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Sphere args={[2, 64, 64]}>
                            <MeshDistortMaterial
                                color="#2563eb"
                                emissive="#2563eb"
                                emissiveIntensity={0.2}
                                roughness={0.2}
                                metalness={0.8}
                                distort={0.4}
                                speed={2}
                            />
                        </Sphere>
                    </Float>
                </Canvas>
            </div>
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

const Team = () => {
    const members = [
        { name: 'Dr.Gururaj H L', role: 'Faculty Advisor', image: '/assets/gururaj-hl.jpg', linkedin: 'https://www.linkedin.com/in/dr-gururaj-h-l-92513539/' },
        { name: 'Dr.Shreyas J', role: 'Faculty Advisor', image: '/assets/shreyas-j.jpg', linkedin: 'https://www.linkedin.com/in/dr-shreyas-j-a069a225/' },
        { name: 'Shivansh Gautam', role: 'Chair', image: '/assets/shivansh-gautam.jpg', linkedin: 'https://www.linkedin.com/in/shivansh-gautam-sg/' },
        { name: 'Medha Udupa', role: 'Vice Chair', image: '/assets/medha-udupa.jpg', linkedin: 'https://www.linkedin.com/in/medha-udupa-b55352227' },
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


import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const AcmMitbApp = () => {
    // const [events, setEvents] = useState([]); // Replaced with static data
    const timelineRef = useRef(null);

    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (data.length > 0) setEvents(data);
            else {
                setEvents([
                    {
                        id: 1,
                        title: "Code AI 2025",
                        description: "Bridging research gaps in AI, biometrics, and robotics.",
                        date: "Mon Apr 07 2025",
                        image: codeAiImg,
                        status: "upcoming"
                    },
                    {
                        id: 2,
                        title: "HackNite 2025",
                        description: "A 24-hour hackathon organized by ACM MITB, fostering innovation and collaboration.",
                        date: "Sat Mar 29 2025",
                        image: hackniteImg,
                        status: "upcoming"
                    },
                    {
                        id: 3,
                        title: "Industry Day 2025",
                        description: "ACM India Industry Day at MIT Bengaluru on AI and mobile communication.",
                        date: "Sat Feb 22 2025",
                        image: industryDayImg,
                        status: "completed"
                    },
                    {
                        id: 4,
                        title: "Research Poster Presentation",
                        description: "20+ AI, cybersecurity, and data science posters were presented.",
                        date: "Sun Jan 19 2025",
                        image: posterPresentationImg,
                        status: "completed"
                    },
                    {
                        id: 5,
                        title: "Distinguished Lecture",
                        description: "Dr. Yogesh Simmhan's talk on distributed systems at MIT Bengaluru.",
                        date: "Sun Jan 19 2025",
                        image: distinguishedLectureImg,
                        status: "completed"
                    },
                    {
                        id: 6,
                        title: "Squid Game",
                        description: "150 students participated in strategic challenges at MITB ACM's event.",
                        date: "Sat Jan 18 2025",
                        image: squidGameImg,
                        status: "completed"
                    },
                    {
                        id: 7,
                        title: "HackNova 2024",
                        description: "48-hour Cybersecurity CTF Challenge at MIT Bengaluru with 40+ teams.",
                        date: "Mon Dec 16 2024",
                        image: hacknovaImg,
                        status: "completed"
                    },
                    {
                        id: 8,
                        title: "Hour of Code 2024",
                        description: "ACM MITB hosted Hour of Code at Muddenahalli, promoting digital literacy.",
                        date: "Sun Dec 15 2024",
                        image: hourOfCodeImg,
                        status: "completed"
                    },
                    {
                        id: 9,
                        title: "Membership Drive",
                        description: "Promoting ACM benefits with an interactive Theme Board at MAHE Bengaluru.",
                        date: "Fri Nov 08 2024",
                        image: membershipDriveImg,
                        status: "completed"
                    }
                ]);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-blue-600 selection:text-black">
            <Navbar />
            <AcmMitbHero />
            <About />
            <Team />
            <div ref={timelineRef}>
                <EventShowcase events={events} />
            </div>
            <Footer />
        </div>
    );
};

export default AcmMitbApp;
>>>>>>> 6ded1bc (Refactor stories feature and add team member photos)
