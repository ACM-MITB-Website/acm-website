import React from 'react';

const Loader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <svg 
                width="150" 
                height="150" 
                viewBox="0 0 100 100" 
                className="infinity-loader"
            >
                <path
                    d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="205.271142578125"
                    strokeDashoffset="0"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        values="0;410.542285156250"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
            <style>{`
                .infinity-loader {
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};

export default Loader;
