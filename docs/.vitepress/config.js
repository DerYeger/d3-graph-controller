export default {
  title: 'd3-graph-controller',
  description:
    'A TypeScript library for visualizing and simulating directed, interactive graphs.',
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
  themeConfig: {
    repo: 'DerYeger/d3-graph-controller',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
  },
  nav: [
    { text: 'Guide', link: '/guide/' },
    { text: 'Demo', link: '/demo/' },
  ],
  sidebar: {
    '/guide/': 'auto',
    '/demo/': 'auto',
    '/': [
      {
        text: 'Guide',
        link: '/guide',
      },
      {
        text: 'Demo',
        link: '/demo',
      },
    ],
  },
}
