import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If you had a custom port in CRA, you can set it here
  server: {
     port: 3000,
   },
});