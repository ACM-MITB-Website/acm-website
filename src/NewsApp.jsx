import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ArrowRight, Calendar, Tag, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NewsHero = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
        );
    }, []);

    return (
        <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center pt-20">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Sphere args={[2, 64, 64]}>
                            <MeshDistortMaterial
                                color="#8b5cf6"
                                emissive="#8b5cf6"
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
                <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                    NEWS <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">ROOM</span>
                </h1>
                <p className="text-xl md:text-2xl text-violet-300 font-mono tracking-widest">
                    LATEST UPDATES & INSIGHTS
                </p>
            </div>
        </section>
    );
};

const FeaturedPost = () => {
    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto">
            <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="h-64 lg:h-auto overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                            alt="Featured"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-violet-900/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 text-sm text-violet-400 font-mono mb-4">
                            <span className="flex items-center"><Calendar size={14} className="mr-1" /> Dec 12, 2025</span>
                            <span className="flex items-center"><Tag size={14} className="mr-1" /> AI & Future</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-violet-400 transition-colors">
                            The Future of Generative AI in Education
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Exploring how Large Language Models are reshaping the landscape of learning, from personalized tutoring systems to automated content generation. We dive deep into the ethical implications and the exciting possibilities that lie ahead.
                        </p>
                        <button className="flex items-center space-x-2 text-white font-bold tracking-wide group/btn w-max">
                            <span>READ ARTICLE</span>
                            <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const NewsGrid = () => {
    const posts = [
        {
            id: 1,
            title: "Hackathon 2025 Winners Announced",
            excerpt: "Team 'Neural Ninjas' takes the top prize with their innovative accessibility tool.",
            date: "Nov 28, 2025",
            category: "Events",
            image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1974&auto=format&fit=crop",
            author: "Sarah Lee"
        },
        {
            id: 2,
            title: "Workshop: Intro to Rust",
            excerpt: "Join us for a hands-on session learning the basics of Rust programming language.",
            date: "Nov 15, 2025",
            category: "Workshops",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
            author: "Mike Chen"
        },
        {
            id: 3,
            title: "New SIG AI Chapter Leads",
            excerpt: "Welcoming our new core committee members for the upcoming academic year.",
            date: "Oct 30, 2025",
            category: "Announcements",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
            author: "Admin"
        },
        {
            id: 4,
            title: "Tech Talk: Quantum Computing",
            excerpt: "Dr. Smith explains the fundamentals of qubits and superposition.",
            date: "Oct 12, 2025",
            category: "Tech Talks",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
            author: "Jane Doe"
        },
        {
            id: 5,
            title: "Community Coding Night",
            excerpt: "A fun evening of coding, pizza, and networking with fellow students.",
            date: "Sep 25, 2025",
            category: "Community",
            image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=2070&auto=format&fit=crop",
            author: "Events Team"
        },
        {
            id: 6,
            title: "Open Source Contribution Guide",
            excerpt: "How to make your first pull request and start contributing to open source projects.",
            date: "Sep 10, 2025",
            category: "Guides",
            image: "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=2070&auto=format&fit=crop",
            author: "Dev Team"
        }
    ];

    useEffect(() => {
        const cards = document.querySelectorAll('.news-card');

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".news-grid",
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section className="py-10 px-4 md:px-20 max-w-7xl mx-auto mb-20">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="w-2 h-8 bg-violet-500 mr-4 rounded-full"></span>
                    RECENT STORIES
                </h2>
                <button className="text-violet-400 hover:text-white transition-colors text-sm font-mono">VIEW ARCHIVE</button>
            </div>

            <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="news-card group bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                <span className="text-xs font-mono text-violet-300">{post.category}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                                <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                                <span className="flex items-center"><User size={12} className="mr-1" /> {post.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <a href="#" className="inline-flex items-center text-violet-400 text-sm font-bold hover:text-white transition-colors">
                                READ MORE <ArrowRight size={14} className="ml-1" />
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

const NewsApp = () => {
    const newsRef = useRef(null);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-violet-500 selection:text-white">
            <Navbar />
            <NewsHero />
            <div ref={newsRef}>
                <FeaturedPost />
            </div>
            <NewsGrid />
            <Footer />
        </div>
    );
};

export default NewsApp;
