import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  plugins: [vue()]
  // build: {
  //   outDir: '../dist',
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       popup: 'src/popup/index.html'
  //     }
  //   }
  // }
});
