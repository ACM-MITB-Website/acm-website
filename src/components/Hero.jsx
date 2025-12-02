import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const InteractiveBubble = ({ color, position, scale }) => {
    const meshRef = useRef();
    const initialPos = new THREE.Vector3(...position);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouse = state.mouse;

        // Random floating movement
        const floatX = Math.sin(t * 0.5 + position[0]) * 0.5;
        const floatY = Math.cos(t * 0.3 + position[1]) * 0.5;
        const floatZ = Math.sin(t * 0.4 + position[2]) * 0.5;

        // Mouse interaction (move towards mouse with delay)
        // Convert mouse (normalized -1 to 1) to world space roughly
        const targetX = mouse.x * 5;
        const targetY = mouse.y * 5;

        if (meshRef.current) {
            // Lerp current position towards target (initial + float + mouse influence)
            meshRef.current.position.x = THREE.MathUtils.lerp(
                meshRef.current.position.x,
                initialPos.x + floatX + (mouse.x * 2),
                0.05
            );
            meshRef.current.position.y = THREE.MathUtils.lerp(
                meshRef.current.position.y,
                initialPos.y + floatY + (mouse.y * 2),
                0.05
            );
            meshRef.current.position.z = THREE.MathUtils.lerp(
                meshRef.current.position.z,
                initialPos.z + floatZ,
                0.05
            );
        }
    });

    return (
        <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
            <MeshDistortMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                roughness={0.1}
                metalness={0.9}
                distort={0.6}
                speed={3}
            />
        </Sphere>
    );
};

const FloatingBubbles = () => {
    const bubbles = [
        { color: '#22c55e', position: [-3, 1, -2], scale: 1.4 }, // Green (SIGSOFT)
        { color: '#2563eb', position: [3, -1, -3], scale: 1.8 },  // Blue (ACM MITB)
        { color: '#d946ef', position: [0, -3, -4], scale: 1.5 }, // Fuchsia (ACM-W)
    ];

    return (
        <group>
            {bubbles.map((bubble, index) => (
                <InteractiveBubble key={index} {...bubble} />
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

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            </div>
        </section>
    );
};

export default Hero;
