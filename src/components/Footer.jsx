import React from 'react';
import { Linkedin, Instagram, MapPin, Mail, Terminal } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="relative pt-20 pb-10 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

                    {/* Brand Section */}
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-3 group cursor-default">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                                <Terminal className="text-cyan-400" size={24} />
                            </div>
                            <h3 className="text-4xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300">
                                ACM <span className="font-light text-gray-400">MITB</span>
                            </h3>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                            Fostering the next generation of computing professionals. We are a community of innovators, builders, and dreamers exploring the digital frontier.
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-5">
                            <SocialLink href="https://www.linkedin.com/company/mitb-acm-student-chapter/posts/?feedView=all" icon={<Linkedin size={20} />} label="LinkedIn" />
                            <SocialLink href="https://www.instagram.com/acm_mitb/" icon={<Instagram size={20} />} label="Instagram" />
                            <SocialLink href="mailto:acm.mitb@manipal.edu" icon={<Mail size={20} />} label="Email" />
                        </div>
                    </div>

                    {/* Coordinates / Contact Info */}
                    <div className="md:w-1/3 space-y-8 text-center md:text-right">
                        <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-6 flex items-center justify-center md:justify-end">
                            Coordinates
                            <span className="w-2 h-2 bg-cyan-400 rounded-full ml-2 animate-pulse"></span>
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex flex-col md:flex-row items-center md:items-start md:justify-end gap-3 text-gray-400 group">
                                <span className="group-hover:text-gray-300 transition-colors order-2 md:order-1">
                                    MIT Bengaluru<br />
                                    Govindapura, Gollahalli<br />
                                    Yelahanka, Bengaluru 560064
                                </span>
                                <MapPin className="mt-1 text-cyan-600 group-hover:text-cyan-400 transition-colors order-1 md:order-2" size={24} />
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-center md:justify-end gap-3 text-gray-400 group">
                                <a href="mailto:acm.mitb@manipal.edu" className="group-hover:text-cyan-400 transition-colors hover:underline order-2 md:order-1 text-lg">
                                    acm.mitb@manipal.edu
                                </a>
                                <Mail className="text-cyan-600 group-hover:text-cyan-400 transition-colors order-1 md:order-2" size={24} />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
                    <p>&copy; {new Date().getFullYear()} ACM MITB. SYSTEM ONLINE.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-cyan-400 transition-colors">PRIVACY_PROTOCOL</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 border border-white/5 hover:border-white/20 transition-all duration-300"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
