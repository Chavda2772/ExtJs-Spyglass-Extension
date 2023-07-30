import { defineConfig } from 'vite';
// import { crx } from '@crxjs/vite-plugin';
// import manifest from './src/manifest-dev.js';
// import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: ['public/index.html'],
      },
      outDir: 'build',
    },
    rollupOptions: {
      input: {
        // devtools: resolve(pagesDir, "devtools", "index.html"),
        // panel: resolve(pagesDir, "panel", "index.html"),
        // content: resolve(pagesDir, "content", "index.ts"),
        // background: resolve(pagesDir, "background", "index.ts"),
        // contentStyle: resolve(pagesDir, "content", "style.scss"),
        // popup: resolve(pagesDir, "popup", "index.html"),
        // newtab: resolve(pagesDir, "newtab", "index.html"),
        // options: resolve(pagesDir, "options", "index.html"),
      },
      watch: {
        include: ['public/*'],
        exclude: ['node_modules/**'],
      },
    },
  };
});
