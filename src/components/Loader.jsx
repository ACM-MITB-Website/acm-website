import React from 'react';

const Loader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 2000); // Set duration to 2.5 seconds or as preferred

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-b-white border-l-white rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
        </div>
    );
};

export default Loader;
