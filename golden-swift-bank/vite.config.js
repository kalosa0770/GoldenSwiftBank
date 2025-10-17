// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  // 💡 UNCOMMENT AND USE THIS FOR LOCAL DEVELOPMENT 💡
  server: {
    proxy: {
      // Directs any call starting with /api (e.g., /api/auth) to your local backend
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
      }
    }
  }
});