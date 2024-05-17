import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                // dir: '~/plugin/assets/',
                entryFileNames: 'ratios.js',
                // assetFileNames: 'plugin.css',
                // chunkFileNames: "chunk.js",
                // manualChunks: undefined,
            }
        }
    },
});
