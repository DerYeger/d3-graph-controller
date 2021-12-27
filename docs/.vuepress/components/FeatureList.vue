<template>
  <h2 op60 font-normal>Features</h2>
  <ul op80>
    <!-- eslint-disable-next-line vue/no-v-html   -->
    <li v-for="(feature, index) of features" :key="index" v-html="feature" />
  </ul>
</template>

<script setup lang="ts">
const features: string[] = [
  '👉 Fully <b>interactive</b> dragging, panning, zooming and more. Supports <b>touch input</b> and uses multi-touch.',
  '🔎 Allows <b>focusing nodes</b> by double- or right-clicking and long presses via touch. This will only show the subgraph containing the node.',
  '📱 Creating <b>responsive</b> graph components is easy thanks to the <code>resize</code> method.',
  '🔧 Behaviour and appearance are highly <b>configurable</b>.',
]
</script>

<style scoped></style>
