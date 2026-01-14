import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';
import acmMitbLogo from '../assets/acm-mitb-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT', href: '/about.html' },
        { name: 'ACM MITB', href: '/acm-mitb.html' },
        { name: 'SIG SOFT', href: '/sigsoft.html' },
        { name: 'SIG AI', href: '/sigai.html' },
        { name: 'ACM W', href: '/acm-w.html' },
        { name: 'NEWS ROOM', href: '/news.html' },
    ];



    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Fixed Logo Left Aligned */}
            <a href="/" className="fixed top-6 left-6 z-50 transition-transform duration-300 hover:scale-105">
                <img
                    src={acmMitbLogo}
                    alt="ACM MITB"
                    className="h-10 w-auto md:h-12 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                />
            </a>

            <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto transition-all duration-300">
                <div className={`transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between md:justify-start md:space-x-6 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                    : 'bg-transparent border border-transparent'
                    }`}>

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
                        {navLinks.map((link) => (
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
                        <AuthButton />

                        {/* Become a Member Button */}
                        <a
                            href="/membership.html"
                            className="px-3 py-1.5 bg-transparent border border-acm-teal text-acm-teal text-xs font-bold rounded-full hover:bg-acm-teal hover:text-black transition duration-200 whitespace-nowrap hidden lg:block"
                        >
                            BECOME A MEMBER
                        </a>

                        <a
                            href="#contact"
                            className="text-xs font-medium text-gray-300 hover:text-white whitespace-nowrap hidden lg:block"
                        >
                            GET IN TOUCH
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-white hover:text-acm-teal tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    {/* Mobile Auth/Member Actions */}
                    <a
                        href="/membership.html"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold text-acm-teal border border-acm-teal px-6 py-2 rounded-full hover:bg-acm-teal hover:text-black transition"
                    >
                        BECOME A MEMBER
                    </a>

                    <a
                        href="#join"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-bold bg-white text-black px-8 py-3 rounded-full hover:bg-acm-teal"
                    >
                        JOIN ACM
                    </a>
                </div>
            )}

            {/* Modal Removed */}
        </>
    );
};

export default Navbar;

