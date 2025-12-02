import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const FloatingBubbles = () => {
    const bubbles = [
        { color: '#22c55e', position: [-4, 2, -2], scale: 1.2 }, // Green (SIGSOFT)
        { color: '#2563eb', position: [4, -2, -3], scale: 1.5 },  // Blue (ACM MITB)
        { color: '#d946ef', position: [-3, -3, -4], scale: 1.3 }, // Fuchsia (ACM-W)
        { color: '#22d3ee', position: [3, 3, -2], scale: 1.4 }    // Cyan (SIG AI)
    ];

    return (
        <group>
            {bubbles.map((bubble, index) => (
                <Float key={index} speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                    <Sphere args={[bubble.scale, 32, 32]} position={bubble.position}>
                        <MeshDistortMaterial
                            color={bubble.color}
                            emissive={bubble.color}
                            emissiveIntensity={0.2}
                            roughness={0.2}
                            metalness={0.8}
                            distort={0.4}
                            speed={2}
                        />
                    </Sphere>
                </Float>
            ))}
        </group>
    );
};

const InteractiveStars = () => {
    const starsRef = useRef();
    useFrame((state) => {
        const { mouse } = state;
        if (starsRef.current) {
            // Smoothly interpolate rotation
            starsRef.current.rotation.x = THREE.MathUtils.lerp(starsRef.current.rotation.x, mouse.y * 0.1, 0.1);
            starsRef.current.rotation.y = THREE.MathUtils.lerp(starsRef.current.rotation.y, mouse.x * 0.1, 0.1);
        }
    });

    return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
};

const Hero = () => {
    const textRef = useRef(null);
    const subTextRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        )
            .fromTo(subTextRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
                '-=1'
            );
    }, []);

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#00D4FF" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#7C3AED" />
                    <InteractiveStars />
                    <FloatingBubbles />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
                <div ref={textRef} className="flex justify-center mb-6">
                    <img
                        src="/assets/acm-mitb-landing-logo.png"
                        alt="ACM MITB"
                        className="h-32 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                    />
                </div>
                <p
                    ref={subTextRef}
                    className="text-xl md:text-2xl text-acm-teal max-w-2xl font-light tracking-widest uppercase"
                >
                    Innovating the Cosmos of Code
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            </div>
        </section>
    );
};

export default Hero;
