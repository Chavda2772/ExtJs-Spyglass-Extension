import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest.js';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      minify: false,
      minifySyntax: false,
    },
    rollupOptions: {
      input: {
        sidebarPanel: 'src/sidebarPanel/sidebarPanel.html',
      },
    },
    plugins: [
      crx({ manifest }),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: './src/sidebarPanel/sidebarPanel.html',
      //       dest: 'src/sidebarPanel',
      //     },
      //     {
      //       src: './src/sidebarPanel/sidebarPanel.js',
      //       dest: 'src/sidebarPanel',
      //     },
      //   ],
      // }),
    ],
  };
});
