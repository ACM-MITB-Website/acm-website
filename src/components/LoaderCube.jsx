import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CubeVisual from './CubeVisual';

const LoaderCube = ({ onComplete }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000); // 2 seconds as requested

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode='wait' onExitComplete={onComplete}>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-0 m-0 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 5,
                        filter: "blur(10px)",
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                >
                    <CubeVisual />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderCube;
