<template>
  <GraphView :graph="graph" />
</template>

<script lang="ts" setup>
import { defineNodeWithDefaults, GraphLink } from 'd3-graph-controller'

const a = defineNodeWithDefaults({
  id: 'a',
  type: 'node',
  color: 'var(--c-brand-light)',
  label: {
    color: 'black',
    fontSize: '1rem',
    text: 'A',
  },
})

const graph = {
  nodes: [a],
  links: [] as GraphLink[],
}
</script>

<style>
.theme-default-content {
  max-width: unset !important;
}

.graph {
  border: 1px solid var(--c-border);
  margin-top: 2rem;
}
</style>
