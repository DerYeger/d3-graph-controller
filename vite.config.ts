import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: 'src/**',
      outputDir: 'dist/types',
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'umd'],
      name: 'd3-graph-controller',
      fileName: (format) => `d3-graph-controller.${format}.js`,
    },
    rollupOptions: {
      external: ['d3', 'ml-matrix'],
      output: {
        globals: {
          d3: 'd3',
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@test',
        replacement: path.resolve(__dirname, 'test'),
      },
    ],
  },
})
