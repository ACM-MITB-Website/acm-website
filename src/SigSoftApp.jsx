import React, { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import EventShowcase from './components/EventShowcase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import sigSoftLogo from './assets/sigsoft-logo.png';
import Particles from './components/Particles';

import flutterFlowImg from './assets/sigsoft-flutterflow-2025.jpg';
import debugMarathonImg from './assets/sigsoft-debug-marathon-2025.jpg';
import hourOfCodeImg from './assets/sigsoft-hour-of-code-2024.jpg';

const SigSoftHero = () => {
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
                    <pointLight position={[10, 10, 10]} intensity={2} color="#22c55e" />
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Sphere args={[2, 64, 64]}>
                            <MeshDistortMaterial
                                color="#22c55e"
                                emissive="#22c55e"
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
        { name: 'Shane Chellam', role: 'Chair', image: '/assets/shane-chellam.jpg', linkedin: '#' },
        { name: 'Fadil Ahmed', role: 'Vice Chair', image: '/assets/fadil-ahmed.jpg', linkedin: '#' },
        { name: 'Sai Tej Gadiyaram', role: 'General Secretary', image: '/assets/sai-tej-gadiyaram.jpg', linkedin: '#' },
        { name: 'Thushar Maiyya', role: 'Executive Secretary', image: '/assets/thushar-maiyya.jpg', linkedin: '#' },
        { name: 'Ananya Gupta', role: 'Treasurer', image: '/assets/ananya-gupta.jpg', linkedin: '#' },
        { name: 'Anchit Goel', role: 'Web Master', image: '/assets/anchit-goel.jpg', linkedin: '#' },
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
                        {/* Holographic Gradient Overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 40%)'
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
                                <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors">{member.name}</h3>
                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                            </div>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{member.role}</p>

                            {/* Tech Decoration & Socials */}
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

                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const sigsoftEvents = [
    {
        id: 1,
        title: "Flutter Flow Workshop",
        description: "MITB ACM SIG-SOFT hosted an App Development Workshop at Turinger’25, teaching FlutterFlow, a no-code platform, with expert guidance from Hasnen Tai, fostering hands-on learning in mobile and web app creation.",
        date: "Sat Jan 18 2025",
        image: flutterFlowImg,
        status: "completed"
    },
    {
        id: 2,
        title: "Debug Marathon",
        description: "MITB ACM SIG-SOFT hosted Debug Marathon at Turinger’25, a competitive debugging challenge fostering problem-solving, technical skills, innovation, collaboration, and skill development in real-time debugging scenarios.",
        date: "Sat Jan 18 2025",
        image: debugMarathonImg,
        status: "completed"
    },
    {
        id: 3,
        title: "Hour of Code",
        description: "MITB ACM SIG-SOFT conducted Hour of Code, introducing young students to computing concepts, promoting digital literacy, and fostering interest in technology.",
        date: "Wed Dec 11 2024",
        image: hourOfCodeImg,
        status: "completed"
    }
];

const SigSoftApp = () => {
    const timelineRef = useRef(null);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-green-500 selection:text-black">
            <Navbar />
            <SigSoftHero />
            <About />
            <Team />
            <div ref={timelineRef}>
                <EventShowcase events={sigsoftEvents} />
            </div>
            <Footer />
        </div>
    );
};

export default SigSoftApp;
