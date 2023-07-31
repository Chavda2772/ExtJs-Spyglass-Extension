import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest.js';
// import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input: ['public/popup/index.html'],
      },
      // minify: false,
      // minifySyntax: false,
    },
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, './src'),
    //   },
    // },
    plugins: [crx({ manifest })],
  };
});
