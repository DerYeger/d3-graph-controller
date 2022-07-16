<script lang="ts" setup>
import Package from '../../../package.json'
const packageName = Package.name
const repo = Package.repository.replace('github:', '')

interface Badge {
  href: string
  alt: string
  src: string
}

const badges: Badge[] = [
  {
    href: `https://github.com/${repo}/actions/workflows/ci.yml`,
    alt: 'CI',
    src: `https://img.shields.io/github/workflow/status/${repo}/CI?label=ci&logo=github&color=#4DC71F`,
  },
  {
    href: `https://www.npmjs.com/package/${packageName}`,
    alt: 'NPM',
    src: `https://img.shields.io/npm/v/${packageName}?logo=npm`,
  },
  {
    href: `https://codecov.io/gh/${repo}`,
    alt: 'Codecov',
    src: `https://codecov.io/gh/${repo}/branch/master/graph/badge.svg?token=p35W6u2noe`,
  },
  {
    href: `https://lgtm.com/projects/g/${repo}`,
    alt: 'LGTM Grade',
    src: `https://img.shields.io/lgtm/grade/javascript/github/${repo}?logo=lgtm`,
  },
  {
    href: 'https://opensource.org/licenses/MIT',
    alt: 'MIT',
    src: `https://img.shields.io/npm/l/${packageName}?color=%234DC71F`,
  },
  {
    href: `https://bundlephobia.com/package/${packageName}`,
    alt: 'NPM Bundle Size',
    src: `https://img.shields.io/bundlephobia/minzip/${packageName}`,
  },
]
</script>

<template>
  <div id="status">
    <h2>Status</h2>
    <div id="badges">
      <a v-for="badge of badges" :key="badge.src" :href="badge.href">
        <img :alt="badge.alt" :src="badge.src" />
      </a>
    </div>
  </div>
</template>

<style scoped>
#status {
  margin-top: 40px;
}

#status > h2 {
  text-align: center;
  border-bottom: none;
  border-top: 1px solid var(--c-border);
  padding-top: 2.5rem;
}

#badges {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 19.2px;
}
</style>
