import { defineConfig } from 'vite'

export default defineConfig({
  root: 'docs',
  optimizeDeps: {
    include: ['vue'],
  },
})
