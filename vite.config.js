import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sigsoft: 'sigsoft.html',
        sigai: 'sigai.html',
        acm_mitb: 'acm-mitb.html',
        acm_w: 'acm-w.html',
        news: 'news.html',
        about: 'about.html',
        admin: 'admin.html',
        membership: 'membership.html',
      },
    },
  },
})
