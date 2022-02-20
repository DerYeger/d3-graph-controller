import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'docs',

  plugins: [
    Components({
      include: [/\.vue/, /\.md/],
      dirs: '.vitepress/components',
      dts: '.vitepress/components.d.ts',
    }),
  ],

  optimizeDeps: {
    include: ['vue'],
  },
  // @ts-expect-error Invalid types can be ignored
  ssr: {
    noExternal: ['d3-drag', 'd3-force', 'd3-selection', 'd3-zoom'],
  },
})
