import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // 🔑 CRITICAL FIX: Base path must match your GitHub repository name (case-sensitive)
  base: '/GoldenSwiftBank/', 
  
});