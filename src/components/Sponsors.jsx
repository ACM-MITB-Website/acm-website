import React from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Sponsors = () => {
    const [sponsors, setSponsors] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "sponsors"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (data.length > 0) setSponsors(data);
            else {
                // Fallback if empty db
                setSponsors([
                    { id: 1, name: 'GitHub', logo: '/assets/github.png' },
                    { id: 2, name: 'Google', logo: '/assets/Google.png' },
                    { id: 3, name: 'Microsoft', logo: '/assets/Microsoft.png' },
                    { id: 4, name: 'Amazon', logo: '/assets/Amazon.png' },
                    { id: 5, name: 'Meta', logo: '/assets/meta.png' },
                    { id: 6, name: 'Netflix', logo: '/assets/Netflix.png' },
                ]);
            }
        });
        return () => unsubscribe();
    }, []);

    // Create seamless loop by duplicating the list enough times to fill screen + buffer
    const allSponsors = sponsors.length > 0 ? [...sponsors, ...sponsors] : [];

    return (
        <section className="py-16 px-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2 text-center">
                    OUR SPONSORS
                </h2>
                <div className="h-px w-20 bg-acm-teal/50 mx-auto"></div>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-scroll">
                    {/* First set of sponsors */}
                    {allSponsors.map((sponsor, index) => (
                        <div
                            key={`set1-${sponsor.id}-${index}`}
                            className="flex-shrink-0 mx-8 w-48 h-32 flex flex-col items-center justify-center group"
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                                />
                            </div>
                            <p className="mt-3 text-xs text-gray-400 font-mono tracking-wider">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                    {/* Duplicate set for seamless looping */}
                    {allSponsors.map((sponsor, index) => (
                        <div
                            key={`set2-${sponsor.id}-${index}`}
                            className="flex-shrink-0 mx-8 w-48 h-32 flex flex-col items-center justify-center group"
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                                />
                            </div>
                            <p className="mt-3 text-xs text-gray-400 font-mono tracking-wider">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    display: flex;
                    animation: scroll 20s linear infinite; /* Slower 20s duration */
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Sponsors;
