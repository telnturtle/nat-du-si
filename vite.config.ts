/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: '낮 두 시',
        short_name: 'nat-du-si',
        icons: [
          {
            src: './icon-si.png',
            sizes: '128x128',
            type: 'image/png',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: 'rgb(252 64 183)',
        background_color: 'rgb(26 26 26)',
      },
    }),
  ],
  build: {
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
  },
})
