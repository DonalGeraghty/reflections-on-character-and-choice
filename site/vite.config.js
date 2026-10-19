import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works on GitHub Pages at any subpath.
export default defineConfig({
  plugins: [react()],
  base: './',
});
