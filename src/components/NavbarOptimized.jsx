import React, { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import acmMitbLogo from '../assets/acm-mitb-logo.png';

const Navbar = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT', href: '/about' },
        { name: 'ACM MITB', href: '/acm-mitb' },
        { name: 'SIG SOFT', href: '/sigsoft' },
        { name: 'SIG AI', href: '/sigai' },
        { name: 'ACM W', href: '/acm-w' },
        { name: 'EVENTS', href: '/events' },
        { name: 'NEWS ROOM', href: '/news' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <a
                href="https://mitb.acm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed top-6 left-6 z-50 transition-transform duration-300 hover:scale-105 hidden xl:block"
                aria-label="ACM MITB Home"
            >
                <img
                    src={acmMitbLogo}
                    alt="ACM MITB"
                    className="h-10 w-auto md:h-12 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    loading="eager"
                    width="auto"
                    height="48"
                />
            </a>

            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto transition-all duration-300">
                <div className={`transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between md:justify-start md:space-x-6 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-xl md:border md:border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                    : 'bg-transparent border border-transparent'
                    }`}>

                    <div className="xl:hidden">
                        <a href="https://mitb.acm.org" target="_blank" rel="noopener noreferrer">
                            <img
                                src={acmMitbLogo}
                                alt="ACM MITB"
                                className="h-8 w-auto object-contain"
                            />
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="group relative text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-acm-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 md:pl-4 md:border-l md:border-white/10">
                        <Link
                            to="/membership"
                            className="px-3 py-1.5 bg-transparent border border-acm-teal text-acm-teal text-xs font-bold rounded-full hover:bg-acm-teal hover:text-black transition duration-200 whitespace-nowrap hidden lg:block"
                        >
                            BECOME A MEMBER
                        </Link>

                        <a
                            href="#contact"
                            className="text-xs font-medium text-gray-300 hover:text-white whitespace-nowrap hidden lg:block"
                        >
                            CONTACT US
                        </a>

                        <AuthButton />

                        <div className="md:hidden pl-2 border-l border-white/10 ml-2">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-300 hover:text-white focus:outline-none flex items-center"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 md:hidden"
                    onClick={closeMenu}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={closeMenu}
                                className="text-2xl font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/membership"
                            onClick={closeMenu}
                            className="mt-8 px-6 py-3 bg-transparent border-2 border-acm-teal text-acm-teal font-bold rounded-full hover:bg-acm-teal hover:text-black transition duration-200"
                        >
                            BECOME A MEMBER
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
