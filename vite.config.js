import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

import CONFIG from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  build: {
    // distribution directory
    outDir: './../main/allama',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/data',
          dest: '' // copies to the root of the distribution directory
        }
      ]
    })
  ],
  define: {
    // usage: `const CONFIG = process.env.CONFIG;`
    'process.env.CONFIG': JSON.stringify(CONFIG),
  }
})
