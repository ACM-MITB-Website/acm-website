import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="relative bg-transparent text-white py-10 overflow-hidden">
            {/* 3D Globe Background - DISABLED FOR STABILITY */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Info & Links */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-4xl font-bold mb-6 tracking-tighter">ACM MITB</h3>
                            <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
                                Fostering a community of innovators, thinkers, and creators. Join us in shaping the future of technology.
                            </p>
                            <div className="flex space-x-6">
                                <a
                                    href="https://www.linkedin.com/company/mitb-acm-student-chapter/posts/?feedView=all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-acm-teal transition-colors"
                                >
                                    <Linkedin size={24} />
                                </a>
                                <a
                                    href="https://www.instagram.com/acm_mitb/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-acm-teal transition-colors"
                                >
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                                <ul className="space-y-4">
                                    <li><Link to="/" className="text-gray-400 hover:text-acm-teal transition-colors">Home</Link></li>
                                    <li><Link to="/acm-mitb" className="text-gray-400 hover:text-acm-teal transition-colors">ACM MITB</Link></li>
                                    <li><Link to="/sigsoft" className="text-gray-400 hover:text-acm-teal transition-colors">SIGSOFT</Link></li>
                                    <li><Link to="/sigai" className="text-gray-400 hover:text-acm-teal transition-colors">SIG AI</Link></li>
                                    <li><Link to="/acm-w" className="text-gray-400 hover:text-acm-teal transition-colors">ACM-W</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
                                <ul className="space-y-4 text-gray-400">
                                    <li>MIT Bengaluru</li>
                                    <li>Govindapura, Gollahalli</li>
                                    <li>Yelahanka, Bengaluru</li>
                                    <li>Karnataka 560064</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 z-20">
                        <h4 className="text-2xl font-bold mb-6">Get in Touch</h4>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-acm-teal text-white transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-acm-teal text-white transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-acm-teal text-white transition-colors resize-none" placeholder="Your message here..."></textarea>
                            </div>
                            <button type="button" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} ACM MITB. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
