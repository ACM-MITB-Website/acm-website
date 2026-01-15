import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Code splitting optimization
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        membership: resolve(__dirname, 'membership.html'),
        news: resolve(__dirname, 'news.html'),
        'acm-mitb': resolve(__dirname, 'acm-mitb.html'),
        'acm-w': resolve(__dirname, 'acm-w.html'),
        sigai: resolve(__dirname, 'sigai.html'),
        sigsoft: resolve(__dirname, 'sigsoft.html'),
        townhall: resolve(__dirname, 'townhall.html'),
      },
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Only drop standard logs, keep warn/error
        drop_debugger: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Source maps for debugging (set to false in production)
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'gsap',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
})
