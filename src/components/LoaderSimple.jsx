import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoaderSimple = ({ onComplete }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2200); // Animation duration approx 2.2s

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode='wait' onExitComplete={onComplete}>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
                                WELCOME TO THE
                            </h1>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                                    className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-green-400 via-cyan-400 to-blue-500"
                                >
                                    WORLD OF INNOVATION
                                </motion.h1>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "200px", opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-transparent via-acm-teal to-transparent mt-6 rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderSimple;
