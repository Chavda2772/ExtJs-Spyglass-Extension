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
        popup: 'src/popup/index.html',
        devpanel: 'src/sidebarPanel/index.html',
        sidebarPanel: 'src/sidebarPanel/sidebarPanel.html',
        extsandbox: 'src/sidebarPanel/app.html',
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
