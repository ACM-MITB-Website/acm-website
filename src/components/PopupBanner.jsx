import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const PopupBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [eventData, setEventData] = useState(null);
    const bannerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const fetchLatestEvent = async () => {
            try {
                const q = query(collection(db, "events"), where("status", "==", "upcoming"), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setEventData(docData);

                    const hasSeenPopup = sessionStorage.getItem(`hasSeenPopup_${querySnapshot.docs[0].id}`);

                    if (!hasSeenPopup) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, 1500);
                    }
                }
            } catch (error) {
                console.error("Error fetching popup event:", error);
            }
        };

        fetchLatestEvent();
    }, []);

    useEffect(() => {
        if (isVisible && bannerRef.current && overlayRef.current) {
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );
            gsap.fromTo(bannerRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [isVisible]);

    const handleClose = () => {
        if (!eventData) { setIsVisible(false); return; }

        gsap.to(bannerRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        setIsVisible(false);
                        sessionStorage.setItem('hasSeenTuringerPopup', 'true');
                    }
                });
            }
        });
    };

    if (!isVisible || !eventData) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <div
                ref={bannerRef}
                className="relative w-full max-w-lg overflow-hidden rounded-2xl md:border md:border-white/10 bg-black/90 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-linear-to-br from-green-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-green-500/20 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                    <div className="mb-2 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-mono text-green-400">
                        FEATURED EVENT
                    </div>

                    <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] line-clamp-2">
                        {eventData.title}
                    </h2>

                    <div className="my-6 flex items-center justify-center space-x-4">
                        <div className="h-px w-8 bg-white/20"></div>
                        <p className="text-lg font-bold text-white">{eventData.date}</p>
                        <div className="h-px w-8 bg-white/20"></div>
                    </div>

                    {/* Event Image */}
                    {eventData.image && (
                        <div className="mb-6 mx-auto max-w-md overflow-hidden rounded-xl border border-white/10">
                            <img 
                                src={eventData.image} 
                                alt={eventData.title}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    <p className="mb-8 text-gray-400 text-sm max-w-xs mx-auto line-clamp-3">
                        {eventData.description}
                    </p>

                    {/* More Details Button with Link */}
                    {eventData.link ? (
                        <a
                            href={eventData.link.startsWith('http://') || eventData.link.startsWith('https://') ? eventData.link : `https://${eventData.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-bold text-black transition-all hover:bg-green-400 hover:scale-105"
                            onClick={handleClose}
                        >
                            <span className="relative z-10">MORE DETAILS</span>
                            <div className="absolute inset-0 -z-10 bg-linear-to-r from-green-400 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </a>
                    ) : (
                        <button
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-bold text-black transition-all hover:bg-green-400 hover:scale-105"
                            onClick={handleClose}
                        >
                            <span className="relative z-10">CLOSE</span>
                            <div className="absolute inset-0 -z-10 bg-linear-to-r from-green-400 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </button>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default PopupBanner;
