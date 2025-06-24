import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    fs: {
      allow: ['..'], // Permet l'accès aux fichiers hors du répertoire src si nécessaire
    },
    configureServer({ app }) {
      app.get('/terms', (req, res) => {
        const termsPath = resolve(__dirname, 'public/terms.txt');
        try {
          const content = readFileSync(termsPath, 'utf-8');
          res.setHeader('Content-Type', 'text/plain');
          res.send(content);
        } catch (error) {
          res.status(404).send('Terms not found');
        }
      });

      app.get('/privacy', (req, res) => {
        const privacyPath = resolve(__dirname, 'public/privacy.txt');
        try {
          const content = readFileSync(privacyPath, 'utf-8');
          res.setHeader('Content-Type', 'text/plain');
          res.send(content);
        } catch (error) {
          res.status(404).send('Privacy policy not found');
        }
      });
    },
  },
});