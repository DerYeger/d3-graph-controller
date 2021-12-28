import * as path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo',
  plugins: [vue()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: '@demo',
        replacement: path.resolve(__dirname, './'),
      },
    ],
  },
})
