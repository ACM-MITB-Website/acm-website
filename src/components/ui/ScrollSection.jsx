import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Smooth physics for entry
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // Subtle scale and fade entry
    // As it scrolls into view (0 -> 0.5), it scales up from 0.9 to 1 and fades in
    const scale = useTransform(smoothProgress, [0, 0.3], [0.95, 1]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    // Subtle parallax push as it leaves (optional, keeps it alive)
    const y = useTransform(smoothProgress, [0.8, 1], [0, 50]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                scale,
                opacity,
                y
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollSection;
