import React, { Suspense, useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Robot() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Aggressive JS to remove watermark
    const removeWatermark = () => {
      const links = document.querySelectorAll('a[href^="https://spline.design"]');
      links.forEach(link => {
        link.style.display = 'none';
        link.style.opacity = '0';
        link.style.pointerEvents = 'none';
        link.remove();
      });
    };

    const intervalId = setInterval(removeWatermark, 100);
    setTimeout(() => clearInterval(intervalId), 5000); // Stop checking after 5s

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show if intersecting. 
        // We use a small buffer or 0 to aggressive unload.
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative" style={{ filter: 'brightness(1.3) sepia(1) hue-rotate(300deg) saturate(4)' }}>
      {isVisible ? (
        <Suspense fallback={<div className="text-white/30 text-xs tracking-widest">LOADING 3D...</div>}>
          <Spline scene="https://prod.spline.design/OIObz2Hkucw6JwXb/scene.splinecode" />
        </Suspense>
      ) : (
        <div className="w-full h-full" /> // Placeholder to maintain layout
      )}

      {/* Watermark Mask */}

    </div>
  );
}
