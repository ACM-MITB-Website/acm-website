import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const InteractiveBubble = ({ color, position, scale }) => {
    const meshRef = useRef();
    const initialPos = new THREE.Vector3(...position);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouse = state.mouse;

        // Free roaming movement
        const floatX = Math.sin(t * 0.5 + position[0] * 10) * 2;
        const floatY = Math.cos(t * 0.3 + position[1] * 10) * 1.5;
        const floatZ = Math.sin(t * 0.4 + position[2] * 10) * 1;

        // Mouse interaction
        const targetX = mouse.x * 8;
        const targetY = mouse.y * 8;

        const distToMouse = Math.sqrt(
            Math.pow(targetX - meshRef.current.position.x, 2) +
            Math.pow(targetY - meshRef.current.position.y, 2)
        );

        const mouseInfluence = Math.max(0, 1 - distToMouse / 5);

        if (meshRef.current) {
            meshRef.current.position.x = THREE.MathUtils.lerp(
                meshRef.current.position.x,
                initialPos.x + floatX + (mouse.x * 3 * mouseInfluence),
                0.02
            );
            meshRef.current.position.y = THREE.MathUtils.lerp(
                meshRef.current.position.y,
                initialPos.y + floatY + (mouse.y * 3 * mouseInfluence),
                0.02
            );
            meshRef.current.position.z = THREE.MathUtils.lerp(
                meshRef.current.position.z,
                initialPos.z + floatZ,
                0.02
            );

            meshRef.current.rotation.x = t * 0.1;
            meshRef.current.rotation.y = t * 0.15;
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
                distort={0.4} // Normal distortion
                speed={3} // Normal speed
            />
        </Sphere>
    );
};

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
