import { defineConfig } from 'vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'docs',
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: '@demo',
        replacement: path.resolve(__dirname, '../demo'),
      },
    ],
  },
})
