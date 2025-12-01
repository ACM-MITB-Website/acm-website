import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="relative bg-black text-white py-10 overflow-hidden">
            {/* 3D Globe Background */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <Sphere args={[2.5, 32, 32]} position={[1, -1, 0]}>
                        <meshStandardMaterial color="#3b0764" wireframe />
                    </Sphere>
                </Canvas>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-3xl font-bold mb-6 tracking-tighter">ACM MITB</h3>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Fostering a community of innovators, thinkers, and creators. Join us in shaping the future of technology.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-acm-teal transition-colors"><Github size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-acm-teal transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-acm-teal transition-colors"><Linkedin size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-acm-teal transition-colors"><Mail size={24} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#home" className="text-gray-400 hover:text-acm-teal transition-colors">Home</a></li>
                            <li><a href="/acm-mitb.html" className="text-gray-400 hover:text-acm-teal transition-colors">ACM MITB</a></li>
                            <li><a href="/sigsoft.html" className="text-gray-400 hover:text-acm-teal transition-colors">SIGSOFT</a></li>
                            <li><a href="/sigai.html" className="text-gray-400 hover:text-acm-teal transition-colors">SIG AI</a></li>
                            <li><a href="/acm-w.html" className="text-gray-400 hover:text-acm-teal transition-colors">ACM-W</a></li>
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
                <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} ACM MITB. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
