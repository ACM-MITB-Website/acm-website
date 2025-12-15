import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Trophy, Lightbulb, ChevronDown, ChevronUp, Globe, Shield, Code } from 'lucide-react';
import acmLogoLarge from '../assets/acm-logo-large.png';
import mitbBuilding from '../assets/mitb-building.jpg';

const AboutSection = () => {
    return (
        <section id="about" className="bg-black py-20 px-4 md:px-10 lg:px-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-32">
                {/* 1. About MITB & ACM */}
                <IntroSection />

                {/* 2. Membership Benefits */}
                <BenefitsSection />

                {/* 3. Chapter By-Laws */}
                <ByLawsSection />
            </div>
        </section>
    );
};

const IntroSection = () => {
    return (
        <div className="space-y-32">
            {/* 1. About MITB */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
                        <img
                            src={mitbBuilding}
                            alt="MITB Campus"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="flex items-center space-x-2">
                        <span className="h-px w-8 bg-blue-500"></span>
                        <span className="text-blue-500 font-mono tracking-widest text-sm">INSTITUTION</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        About: <span className="text-blue-600">MITB</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-blue-600/30 pl-6">
                        Manipal Institute of Technology Bengaluru (MITB) is a premier engineering institution under MAHE, known for its cutting-edge curriculum and industry collaborations. It provides a dynamic environment for students to develop technical skills, engage in research, and innovate in fields like AI, cybersecurity, and software engineering.
                    </p>
                </motion.div>
            </div>

            {/* 2. About ACM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 order-2 lg:order-1 relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-xl blur-lg -z-10" />
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="h-px w-8 bg-blue-500"></span>
                                <span className="text-blue-500 font-mono tracking-widest text-sm">GLOBAL SOCIETY</span>
                            </div>
                            <Globe className="text-blue-600 opacity-50" size={32} />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
                            About: <span className="text-cyan-500">ACM</span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            The Association for Computing Machinery (ACM) is the world's largest computing society, dedicated to advancing knowledge and innovation. It connects professionals and students through conferences, research publications, and technical events, fostering excellence in computing and technology.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group order-1 lg:order-2 flex justify-center"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
                    <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-8 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group-hover:border-blue-500/50 transition-colors duration-500">
                        <img
                            src={acmLogoLarge}
                            alt="ACM Logo"
                            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-700"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const BenefitsSection = () => {
    const benefits = [
        {
            title: "Digital Library",
            description: "Access top-tier research papers, journals, and computing insights.",
            icon: <BookOpen size={40} />,
            color: "from-blue-600 to-blue-400"
        },
        {
            title: "Professional Networking",
            description: "Connect with experts, mentors, and tech industry leaders.",
            icon: <Users size={40} />,
            color: "from-cyan-600 to-cyan-400"
        },
        {
            title: "Exclusive Workshops",
            description: "Participate in hands-on tech events, hackathons, and training.",
            icon: <Code size={40} />,
            color: "from-indigo-600 to-indigo-400"
        },
        {
            title: "Career Mentorship",
            description: "Receive personalized career advice from seasoned professionals.",
            icon: <Lightbulb size={40} />,
            color: "from-violet-600 to-violet-400"
        }
    ];

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
            >
                <h2 className="text-3xl md:text-5xl font-bold">
                    <span className="text-orange-500">ACM</span> Membership Benefits
                </h2>
                <p className="text-gray-400 text-lg">Why join ACM? Here's what you get:</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        <div className="relative h-full bg-black/90 p-8 rounded-xl flex flex-col items-center text-center space-y-6 border border-white/10 group-hover:border-transparent transition-colors">
                            <div className={`p-4 rounded-full bg-gradient-to-br ${benefit.color} text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300`}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-blue-100">{benefit.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                                {benefit.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const ByLawsSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const bylaws = [
        {
            id: "I",
            title: "Article I: Name and Purpose",
            content: "This article defines the official name of the chapter and outlines its core mission. It establishes the objectives of the ACM Student Chapter at MITB, including fostering a passion for computing, encouraging research, and providing students with networking opportunities within the tech industry."
        },
        {
            id: "II",
            title: "Article II: Membership",
            content: "This section specifies the eligibility criteria for joining the chapter. It includes different membership types, such as student members, faculty advisors, and honorary members, while also describing the expectations and privileges that come with being a part of the ACM community."
        },
        {
            id: "III",
            title: "Article III: Officers",
            content: "This article details the structure of leadership roles within the ACM chapter. It outlines the responsibilities of officers such as the President, Vice President, Treasurer, and Secretary, and explains the procedures for election, term duration, and leadership transitions."
        },
        {
            id: "IV",
            title: "Article IV: Meetings",
            content: "This section provides guidelines on the frequency, scheduling, and structure of ACM chapter meetings. It covers how meetings should be conducted, the quorum required for decision-making, and the responsibilities of officers in organizing discussions and workshops."
        },
        {
            id: "V",
            title: "Article V: Finances",
            content: "This article governs financial management within the chapter, including the collection of membership fees, budgeting for events, and reporting financial statements. It ensures transparency in handling funds and sets regulations on expenditures and sponsorships."
        },
        {
            id: "VI",
            title: "Article VI: Committees",
            content: "This section outlines the formation of committees to oversee various chapter activities, such as event planning, outreach, and technical projects. It describes the responsibilities of committee members and their role in the smooth functioning of the ACM chapter."
        },
        {
            id: "VII",
            title: "Article VII: Amendments",
            content: "This article explains how modifications to the chapter bylaws can be proposed, reviewed, and enacted. It ensures that bylaws remain relevant by allowing periodic revisions based on the needs and growth of the ACM student community."
        },
        {
            id: "VIII",
            title: "Article VIII: Dissolution",
            content: "This final section defines the circumstances under which the ACM chapter may be dissolved. It includes provisions for handling remaining assets, fulfilling any outstanding obligations, and ensuring a structured process for closure, if ever required."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                    Chapter By-Laws
                </h2>
                <p className="text-gray-400">Guiding principles of our ACM chapter.</p>
            </motion.div>

            <div className="space-y-4">
                {bylaws.map((article, index) => (
                    <motion.div
                        key={article.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                        className={`rounded-lg overflow-hidden border transition-all duration-300 ${activeIndex === index
                            ? 'border-blue-500 bg-blue-900/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                            : 'border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-white/10'
                            }`}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none z-10 relative"
                        >
                            <span className={`text-lg font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-blue-400' : 'text-blue-200'
                                }`}>
                                {article.title}
                            </span>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeIndex === index ? (
                                    <ChevronUp className="text-blue-500" />
                                ) : (
                                    <ChevronDown className="text-gray-500 group-hover:text-blue-400" />
                                )}
                            </motion.div>
                        </button>
                        <AnimatePresence mode='wait'>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-blue-500/20 relative">
                                        {/* Glowing line effect */}
                                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                                        {article.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AboutSection;
