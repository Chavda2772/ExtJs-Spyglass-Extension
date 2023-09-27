import { defineConfig } from 'vite';
import fg from 'fast-glob';

export default defineConfig(({ mode }) => {
    return {
        build: {
            emptyOutDir: true,
            rollupOptions: {
                input: ['./public/manifest.json'],
            },
            outDir: 'build',
        },
        plugins: [{
            name: 'watch-external',
            async buildStart() {
                const files = await fg('public/**/*');
                for (let file of files) {
                    if (!file.includes('/thidparty/')) {
                        this.addWatchFile(file);
                    }
                }
            }
        }],
    };
});
