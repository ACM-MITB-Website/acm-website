import React from 'react';

const Sponsors = () => {
    // Array of sponsors with name and logo paths
    const sponsors = [
        { name: 'Microsoft', logo: '/assets/sponsors/microsoft.png' },
        { name: 'Google', logo: '/assets/sponsors/google.png' },
        { name: 'Amazon', logo: '/assets/sponsors/amazon.png' },
        { name: 'Meta', logo: '/assets/sponsors/meta.png' },
        { name: 'Apple', logo: '/assets/sponsors/apple.png' },
        { name: 'IBM', logo: '/assets/sponsors/ibm.png' },
        { name: 'Oracle', logo: '/assets/sponsors/oracle.png' },
        { name: 'Adobe', logo: '/assets/sponsors/adobe.png' },
    ];

    // Duplicate the sponsors array for seamless infinite scroll
    const allSponsors = [...sponsors, ...sponsors];

    return (
        <section className="py-16 px-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-sm font-mono text-acm-teal tracking-widest mb-2 text-center">
                    OUR PARTNERS & SPONSORS
                </h2>
                <div className="h-px w-40 bg-acm-teal/50 mx-auto"></div>
            </div>

            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <div className="relative">
                <div className="flex animate-scroll">
                    {allSponsors.map((sponsor, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-8 w-48 h-32 flex flex-col items-center justify-center group"
                        >
                            {/* Logo container with hover effect */}
                            <div className="relative w-full h-20 mb-3 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10 group-hover:border-acm-teal/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback placeholder */}
                                <div className="hidden w-full h-full items-center justify-center text-gray-600 text-xs font-mono">
                                    LOGO
                                </div>
                            </div>
                            {/* Sponsor name */}
                            <p className="text-sm font-mono text-gray-400 group-hover:text-acm-teal transition-colors duration-300">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom CSS for animation */}
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
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Sponsors;
