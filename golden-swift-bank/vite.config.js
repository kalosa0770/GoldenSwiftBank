import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist' // ✅ This is the default, but explicitly set it
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});