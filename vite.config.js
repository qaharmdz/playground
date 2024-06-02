import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

import fs from 'fs';
import path from 'path';

import CONFIG from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  build: {
    // distribution directory
    outDir: './../main/allama',
    emptyOutDir: true,
  },
  define: {
    // usage: `const CONFIG = process.env.CONFIG;`
    'process.env.CONFIG': JSON.stringify(CONFIG),
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './../localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './../localhost.pem')),
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/public/data',
          dest: '' // copies to the root of the distribution directory
        }
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Allama',
        short_name: 'allama',
        description: 'Khairukum man ta\'allamal Quraana wa \'allamahu (HR. Bukhari)',
        theme_color: '#e0f2f1',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
