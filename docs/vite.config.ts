import * as path from 'path'

export default defineConfig({
  root: 'docs',
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: 'demo',
        replacement: path.resolve(__dirname, '../demo'),
      },
    ],
  },
  optimizeDeps: {
    include: ['vue'],
  },
})
