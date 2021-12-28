import * as path from 'path'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo',
  plugins: [
    Components({
      dirs: 'components',
      dts: true,
    }),
    vue(),
  ],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: 'demo',
        replacement: path.resolve(__dirname, './'),
      },
    ],
  },
})
