import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sub-path deploys (like GitHub Pages under /CPS-Clinic/) need a matching
// `base`. Local dev (`vite`) always serves from `/`.
// Override with e.g. VITE_BASE=/ if you self-host later at a domain root.
const base = process.env.VITE_BASE ?? '/CPS-Clinic/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? base : '/',
  plugins: [react()],
  server: { port: 5173, open: true },
}));
