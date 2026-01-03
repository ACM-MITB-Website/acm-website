import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
        <div className="fixed inset-0 z-50 bg-gray-200 flex items-center justify-center">
            <DotLottieReact
                src="https://lottie.host/7c2d1d3b-879a-4095-a011-a6cf9c5a9f8e/IIhObujPvj.lottie"
                loop
                autoplay
            />
        </div>
    );
};

export default Loader;
