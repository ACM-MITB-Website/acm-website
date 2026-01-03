import React from 'react';
import Lottie from 'lottie-react';

const Loader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [animationData, setAnimationData] = React.useState(null);

    React.useEffect(() => {
        fetch('https://lottie.host/5caef671-b7ea-4a3f-b589-51f7e8ee3797/r5BPfEYFrD.json')
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error('Failed to load animation:', err));
    }, []);

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
            {animationData && (
                <div style={{ filter: 'brightness(0) invert(1)' }}>
                    <Lottie 
                        animationData={animationData} 
                        loop={true} 
                        style={{ width: 150, height: 150 }}
                    />
                </div>
            )}
        </div>
    );
};

export default Loader;
