import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ACM MITB', href: '/acm-mitb.html' },
        { name: 'SIG SOFT', href: '/sigsoft.html' },
        { name: 'SIG AI', href: '/sigai.html' },
        { name: 'ACM W', href: '/acm-w.html' },
        { name: 'NEWS ROOM', href: '/news.html' },
    ];

    const currentPath = window.location.pathname;
    const filteredLinks = navLinks.filter(link => {
        if (link.href === '/' && (currentPath === '/' || currentPath === '/index.html')) return false;
        return link.href !== currentPath;
    });

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showNavbar) {
            gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
            });
        } else {
            gsap.to(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
            });
        }
    }, [showNavbar]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto opacity-0 -translate-y-full">
                <div className="bg-black/20 hover:bg-black/80 transition-all duration-300 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_0_20px_rgba(34,197,94,0.1)] flex items-center justify-between md:justify-start md:space-x-6">

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {filteredLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="group relative text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-acm-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </a>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 md:pl-4 md:border-l md:border-white/10">
                        <a
                            href="#join"
                            className="hidden md:inline-block text-xs font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-acm-teal hover:scale-105 transition-all"
                        >
                            JOIN ACM
                        </a>
                        <a
                            href="#contact"
                            className="text-xs font-medium text-gray-300 hover:text-white whitespace-nowrap"
                        >
                            GET IN TOUCH
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8">
                    {filteredLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-white hover:text-acm-teal tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#join"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-bold bg-white text-black px-8 py-3 rounded-full hover:bg-acm-teal"
                    >
                        JOIN ACM
                    </a>
                </div>
            )}
        </>
    );
};

export default Navbar;
