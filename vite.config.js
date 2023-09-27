import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';

export default defineConfig(({ mode }) => {
    return {
        build: {
            emptyOutDir: true,
            outDir: 'build',
            rollupOptions: {
                input: ['./public/manifest.json'],
            },
            // minify: false,
            // minifySyntax: false,
        },
        // resolve: {
        //   alias: {
        //     '@': path.resolve(__dirname, './src'),
        //   },
        // },
        // plugins: [crx({ manifest })],
    };
});
