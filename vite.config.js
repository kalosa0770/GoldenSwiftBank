import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'golden-swift-bank' with your actual repository name if different
const repoName = '/golden-swift-bank/'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🔑 FIX: Set the base path for deployment to a GitHub Pages sub-directory
  base: repoName, 
  
  // The server block is fine for local development
  server: {
     port: 3000,
  },
});