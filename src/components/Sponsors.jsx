import React from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Sponsors = React.memo(() => {
    const [sponsors, setSponsors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Check if Firebase is properly initialized
        if (!db) {
            // Use fallback sponsors if Firebase is not initialized
            setSponsors([
                { id: 1, name: 'IBM', logo: '/assets/ibm-logo.png' },
                { id: 2, name: 'Honeywell', logo: '/assets/Honeywell-Logo.png' },
                { id: 3, name: 'AWS', logo: '/assets/aws.jpg' },
                { id: 4, name: 'Manipal', logo: '/assets/manipal-logo.png' },
            ]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(collection(db, "sponsors"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (data.length > 0) {
                setSponsors(data);
            } else {
                // Fallback if empty db - use available images
                setSponsors([
                    { id: 1, name: 'IBM', logo: '/assets/ibm-logo.png' },
                    { id: 2, name: 'Honeywell', logo: '/assets/Honeywell-Logo.png' },
                    { id: 3, name: 'AWS', logo: '/assets/aws.jpg' },
                    { id: 4, name: 'Manipal', logo: '/assets/manipal-logo.png' },
                ]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Create seamless loop by duplicating the list enough times to fill screen + buffer
    const allSponsors = sponsors.length > 0 ? [...sponsors, ...sponsors, ...sponsors] : [];

    if (loading) {
        return (
            <section className="py-16 px-4 overflow-hidden relative">
                <div className="max-w-7xl mx-auto mb-12">
                    <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2 text-center">
                        OUR SPONSORS
                    </h2>
                    <div className="h-px w-20 bg-acm-teal/50 mx-auto"></div>
                </div>
                <div className="text-center text-gray-500">Loading sponsors...</div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2 text-center">
                    OUR SPONSORS
                </h2>
                <div className="h-px w-20 bg-acm-teal/50 mx-auto"></div>
            </div>

            <div className="relative w-full overflow-hidden min-h-[300px]">
                <div className="flex w-max sponsors-scroll py-10">
                    {/* First set of sponsors */}
                    {allSponsors.map((sponsor, index) => (
                        <div
                            key={`set1-${sponsor.id}-${index}`}
                            className="flex-shrink-0 mx-8 w-52 h-40 flex flex-col items-center justify-center group"
                        >
                            <div className="relative w-full flex-1 flex items-center justify-center bg-white/5 rounded-xl md:border md:border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    loading="lazy"
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
                            className="flex-shrink-0 mx-8 w-52 h-40 flex flex-col items-center justify-center group"
                        >
                            <div className="relative w-full flex-1 flex items-center justify-center bg-white/5 rounded-xl md:border md:border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    loading="lazy"
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

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes sponsorScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .sponsors-scroll {
                    display: flex !important;
                    animation: sponsorScroll 20s linear infinite;
                }

                .sponsors-scroll:hover {
                    animation-play-state: paused;
                }
            `}} />
        </section>
    );
});

export default Sponsors;
