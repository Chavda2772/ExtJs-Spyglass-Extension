import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import watchFiles from './watchFile';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: watchFiles,
      },
      outDir: 'build',
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, './src') + '/ [!.]*', // exclude dotfiles
            dest: './', // copy to the root of the output directory
          },
        ],
      }),
    ],
  };
});
