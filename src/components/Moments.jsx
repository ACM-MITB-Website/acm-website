import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, Sparkles } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import TiltCard from './ui/TiltCard';

const Card = ({ icon: Icon, title, description, delay, image }) => {
    return (
        <TiltCard className="h-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-acm-teal/50 hover:bg-zinc-900/80 transition-all group h-full flex flex-col relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={100} strokeWidth={1} />
                </div>

                {image ? (
                    <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden border border-white/5 relative z-10 group-hover:scale-105 transition-transform duration-500">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 relative z-10">
                        <Icon size={32} className="text-white group-hover:text-acm-teal transition-colors" />
                    </div>
                )}

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-acm-teal transition-colors relative z-10">{title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors flex-grow relative z-10">
                    {description}
                </p>
            </motion.div>
        </TiltCard>
    );
};

const Moments = ({ chapter }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chapter) return;

        const q = query(collection(db, "stories"), where("chapters", "array-contains", chapter));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStories(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [chapter]);

    if (loading) return null; // Or a loader, but fail silent is cleaner for section appearing
    if (stories.length === 0) return null; // Don't show section if no stories

    return (
        <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-4">CHAPTER CHRONICLES</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    MOMENTS IN <span className="text-gray-500">TIME</span>
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story, index) => {
                    const Icon = {
                        "Users": Users,
                        "Lightbulb": Lightbulb,
                        "Target": Target
                    }[story.iconName] || Users;

                    return (
                        <Card
                            key={story.id}
                            icon={Icon}
                            title={story.title}
                            description={story.description}
                            image={story.image}
                            delay={index * 0.1}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Moments;
