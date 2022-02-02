<template>
  <GraphView v-if="graph" :graph="graph" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const graph = ref(null)
async function setGraph() {
  const { defineGraph, defineGraphConfig, defineLink, defineNodeWithDefaults } =
    await import('d3-graph-controller')
  const a = defineNodeWithDefaults({
    type: 'node',
    id: 'a',
    label: { color: 'black', fontSize: '1rem', text: 'A' },
  })
  const b = defineNodeWithDefaults({
    type: 'node',
    id: 'b',
    label: { color: 'black', fontSize: '1rem', text: 'B' },
  })
  const link = defineLink({ source: a, target: b, color: 'gray', label: false })
  graph.value = defineGraph({ nodes: [a, b], links: [link] })
}

onMounted(setGraph)
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
