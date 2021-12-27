import { defineUserConfig, ViteBundlerOptions } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import Package from '../../package.json'
import * as path from 'path'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // site config
  lang: 'en-US',
  title: Package.name,
  description: Package.description,

  head: [
    ['meta', { property: 'og:title', content: 'd3-graph-controller' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A TypeScript library for visualizing and simulating directed, interactive graphs.',
      },
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://graph-controller.yeger.eu' },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://graph-controller.yeger.eu/logo.png',
      },
    ],
    ['meta', { name: 'twitter:title', content: 'd3-graph-controller' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'A TypeScript library for visualizing and simulating directed, interactive graphs.',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://graph-controller.yeger.eu/logo.png',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500&display=swap',
        rel: 'stylesheet',
      },
    ],
  ],

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/logo.png',
    repo: 'DerYeger/d3-graph-controller',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Demo', link: '/demo/' },
    ],
    docsBranch: 'master',
    docsDir: 'docs',
  },

  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      configFile: 'docs/vite.config.ts',
    },
  },

  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
})
