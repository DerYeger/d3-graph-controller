import * as path from 'path'

import { presetAttributify, presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'docs',
  plugins: [
    Components({
      include: [/\.vue/, /\.md/],
      dts: true,
    }),
    UnoCSS({
      shortcuts: [
        [
          'btn',
          'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
      ],
      presets: [
        presetUno({
          dark: 'media',
        }),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],
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
