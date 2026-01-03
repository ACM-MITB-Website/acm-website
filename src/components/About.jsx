import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, Lightbulb } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import Particles from './Particles';

const Card = ({ icon: Icon, title, description, delay }) => {
    return (
        <TiltCard
            className="h-full"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay, ease: "easeOut" }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-acm-teal/50 hover:bg-zinc-900/80 transition-all group h-full flex flex-col"
            >
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-zinc-800 to-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    <Icon size={32} className="text-white group-hover:text-acm-teal transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-acm-teal transition-colors">{title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors grow">
                    {description}
                </p>
            </motion.div>
        </TiltCard>
    );
};

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative py-32 min-h-screen flex items-center z-10 overflow-hidden">
            {/* Particles Background */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-70">
                <Particles
                    particleCount={200}
                    particleSpread={10}
                    speed={0.08}
                    particleColors={['#00D9FF', '#A855F7', '#ffffff']}
                    alphaParticles={true}
                    particleBaseSize={120}
                    sizeRandomness={0.6}
                    cameraDistance={20}
                    disableRotation={false}
                />
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-acm-teal/5 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-acm-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-[2]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-4">WHO WE ARE</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                        Innovating for the Future
                    </h3>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
                        ACM MIT Bengaluru is a student chapter dedicated to fostering a community of developers, researchers, and tech enthusiasts. We bridge the gap between academic learning and industry standards.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card
                        icon={Users}
                        title="Community First"
                        description="Building a strong network of like-minded individuals passionate about technology and innovation."
                        delay={0}
                    />
                    <Card
                        icon={Lightbulb}
                        title="Learn & Grow"
                        description="Providing resources, workshops, and mentorship to help students master the latest technologies."
                        delay={0.2}
                    />
                    <Card
                        icon={Target}
                        title="Industry Ready"
                        description="Organizing hackathons and projects that mimic real-world challenges to prepare you for your career."
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
