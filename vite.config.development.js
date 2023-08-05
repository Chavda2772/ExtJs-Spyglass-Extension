import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    minify: false,
    minifySyntax: false,
    rollupOptions: {
      input: {
        sidebarPanel: 'src/devtools/sidebarPanel.html',
        sandbox: 'src/devtools/sandbox/sandbox.html',
      },
    },
  },
  plugins: [crx({ manifest })],
});
