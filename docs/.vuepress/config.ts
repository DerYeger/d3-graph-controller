import { defineUserConfig, ViteBundlerOptions } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import Package from '../../package.json'

const ogImage = `${Package.homepage}/logo.png`

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // site config
  lang: 'en-US',
  title: Package.name,
  description: Package.description,

  head: [
    ['meta', { property: 'og:title', content: Package.name }],
    [
      'meta',
      {
        property: 'og:description',
        content: Package.description,
      },
    ],
    ['meta', { property: 'og:url', content: Package.homepage }],
    [
      'meta',
      {
        property: 'og:image',
        content: ogImage,
      },
    ],
    ['meta', { name: 'twitter:title', content: Package.name }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: Package.description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: ogImage,
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
  ],

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/logo.png',
    repo: Package.repository.replace('github:', ''),
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Config', link: '/config/' },
      { text: 'Demo', link: 'https://graph-controller.yeger.eu' },
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
})
