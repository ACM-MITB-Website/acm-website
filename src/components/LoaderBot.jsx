import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Sparkles, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// --- ROBOT COMPONENT ---
const CyberDrone = ({ position }) => {
    const group = useRef();
    const coreRef = useRef();
    const ringRef = useRef();
    const ring2Ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Hover effect
        if (group.current) {
            group.current.position.y = Math.sin(t * 2) * 0.2;
            group.current.rotation.z = Math.sin(t * 1) * 0.1;
        }
        // Core rotation
        if (coreRef.current) {
            coreRef.current.rotation.x = t * 2;
            coreRef.current.rotation.y = t * 3;
        }
        // Rings rotation (opposing)
        if (ringRef.current) {
            ringRef.current.rotation.x = t * 1.5;
            ringRef.current.rotation.y = t * 0.5;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -t * 1;
            ring2Ref.current.rotation.z = t * 2;
        }
    });

    return (
        <group ref={group} position={position} scale={[1.5, 1.5, 1.5]}>
            {/* TRAIL EFFECT */}
            <Trail width={2} length={6} color="#00ff88" attenuation={(t) => t * t}>
                {/* CORE */}
                <Octahedron args={[0.5, 0]} ref={coreRef}>
                    <meshStandardMaterial
                        color="#00ff88"
                        emissive="#00ff88"
                        emissiveIntensity={2}
                        toneMapped={false}
                        wireframe
                    />
                </Octahedron>
            </Trail>

            {/* INNER GLOW SPHERE */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <pointLight distance={3} intensity={5} color="#00ff88" />

            {/* RINGS */}
            <group ref={ringRef}>
                <Torus args={[0.8, 0.05, 16, 100]}>
                    <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={1} />
                </Torus>
            </group>

            <group ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
                <Torus args={[1.1, 0.02, 16, 100]}>
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} wireframe />
                </Torus>
            </group>

            {/* SCANNING BEAM */}
            <spotLight
                position={[0, 0, 0]}
                target-position={[5, -2, 0]}
                angle={0.5}
                penumbra={1}
                intensity={10}
                color="#00ff88"
                distance={10}
            />
        </group>
    );
};

// --- SCENE ---
const LoaderScene = ({ botPosition }) => {
    return (
        <>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 5, 20]} />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00aaff" />

            {/* STARS */}
            <Sparkles count={500} scale={20} size={2} speed={0.5} opacity={0.5} color="#ffffff" />

            {/* THE DRONE */}
            <CyberDrone position={botPosition} />
        </>
    );
};

// --- MAIN COMPONENT ---
const LoaderBot = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    // State to control pure React position passed to Canvas
    // We can animate this value or use a ref inside Canvas, but let's just animate a ref object 
    // and pass props? Actually, GSAP modifying a ref that R3F reads is better.
    // For simplicity, let's use a dummy object for GSAP to tween, and update a state or Ref.

    // Better yet: Just let R3F handle the loop, but we need to coordinate with DOM elements.
    // Let's us a ref for the bot group position inside R3F.
    // But we need to define the scene component inside so we can share the ref?
    // No, let's just pass a ref object.

    const botPosRef = useRef(new THREE.Vector3(-8, 0, 0)); // Start far left
    const [dummy, setDummy] = useState(0); // Force re-render if needed (not really for R3F frame loop)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // 1. Fade In Text
        tl.to(textRef.current, { opacity: 1, duration: 1 });

        // 2. Drone Flyby (Left to Right)
        // We tween the vector3 directly. R3F components usually read refs directly if passed properly, 
        // but react props update on render. 
        // We will make a custom hook or component to read the ref inside canvas.

        // Tweening the ref object properties
        tl.to(botPosRef.current, {
            x: 0, // Center
            duration: 2.5,
            ease: "power2.out",
        });

        // 3. Scan/Idle Pause
        tl.to({}, { duration: 1 }); // Wait

        // 4. Fly Away (Right) & Text Fade
        tl.to(botPosRef.current, {
            x: 8,
            duration: 1.5,
            ease: "power2.in"
        }, "exit");

        tl.to(textRef.current, {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: "power2.in"
        }, "exit");

    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-9999 bg-black overflow-hidden font-sans">

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <BotAnimator botPosRef={botPosRef} />
                </Canvas>
            </div>

            {/* DOM Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-end pr-[10%] pointer-events-none z-10">
                <div ref={textRef} className="text-right opacity-0">
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight drop-shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                        WELCOME TO THE <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-cyan-400 to-blue-500">
                            WORLD OF INNOVATION
                        </span>
                    </h1>
                    <div className="w-full h-1 bg-linear-to-r from-transparent via-green-500 to-transparent mt-4 opacity-50" />
                </div>
            </div>
        </div>
    );
};

// Helper to bridge GSAP ref to R3F
const BotAnimator = ({ botPosRef }) => {
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
            // Apply the GSAP-tweened position to the 3D object
            groupRef.current.position.copy(botPosRef.current);
        }
    });

    return (
        <group ref={groupRef}>
            <CyberDrone />
        </group>
    );

};

// Include CyberDrone and Scene setup inside
// (Code structured above for clarity, combined in file)

export default LoaderBot;
