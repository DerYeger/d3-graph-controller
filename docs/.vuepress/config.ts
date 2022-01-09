import { defineUserConfig, ViteBundlerOptions } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'
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
    contributors: false, // Would always show the release bot
    docsBranch: 'master',
    docsDir: 'docs',
    editLink: true,
    editLinkText: 'Suggest changes',
    lastUpdated: false,
    logo: '/logo.svg',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
      { text: 'Demo', link: '/demo/' },
    ],
    repo: Package.repository.replace('github:', ''),
  },

  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      configFile: 'docs/vite.config.ts',
    },
  },

  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
})
