import { resolve } from 'node:path';
import process from 'node:process';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    // https://github.com/nonzzz/vite-plugin-compression
    compression(),
    // https://github.com/pd4d10/vite-plugin-svgr
    svgr(),
    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: `${resolve(process.cwd(), '.', 'src')}/`,
      },
    ],
  },
});
