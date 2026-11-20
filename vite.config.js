import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import whisperinkContent from './scripts/vite-content-plugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  // Keep this an absolute path: the per-story pages written to
  // dist/stories/<slug>/index.html rely on absolute asset URLs.
  base: '/whisperink-blog/',
  plugins: [whisperinkContent(), react()],
});
