import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { siteHtml } from './scripts/site-html-plugin.mjs';

export default defineConfig({
  plugins: [react(), siteHtml()],
  resolve: {
    alias: { '@': path.resolve(process.cwd(), './src') },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
