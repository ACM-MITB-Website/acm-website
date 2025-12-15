import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function Robot() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ filter: 'brightness(1.3) sepia(1) hue-rotate(300deg) saturate(4)' }}>
      <Suspense fallback={<div className="text-white/30 text-xs tracking-widest">LOADING 3D...</div>}>
        <Spline scene="https://prod.spline.design/OIObz2Hkucw6JwXb/scene.splinecode" />
      </Suspense>

      {/* Watermark Mask */}
      <div className="absolute bottom-2 right-2 w-48 h-12 bg-black z-50 pointer-events-none" style={{ filter: 'none' }} />
    </div>
  );
}
