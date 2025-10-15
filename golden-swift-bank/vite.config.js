import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Use "/" as base so Vercel serves from the root
  base: '/',
  
  // Add this proxy for local development
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
