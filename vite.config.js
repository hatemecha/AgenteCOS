import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'bundle.js'
      }
    },
    outDir: 'dist',
    assetsDir: '.',
    emptyOutDir: true
  }
});
