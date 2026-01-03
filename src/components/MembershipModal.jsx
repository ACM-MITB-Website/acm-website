import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import membershipImg from '../assets/membership-drive-2024.png';

const MembershipModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const benefits = [
        "Access to a community of like-minded peers",
        "Exclusive workshops and seminars",
        "Networking with industry experts",
        "Participation in hackathons and coding events",
        "Opportunities for research and projects"
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-black/80 transition-all"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                        <img
                            src={membershipImg}
                            alt="Membership Drive"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Become a <span className="text-acm-teal">Member</span>
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Join the ACM chapter at MIT Bengaluru and unlock a world of opportunities in computing and technology.
                        </p>

                        <div className="space-y-3 mb-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-acm-teal flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScwW-WJ8J8J8J8J8J8J8J8J8J8/viewform" // Placeholder or actual link if known, using generic for now implies external action
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-acm-teal text-black font-bold py-3 rounded-xl text-center hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                            >
                                Register Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipModal;
