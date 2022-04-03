<script lang="ts">
import { demoGraph, demoGraphConfig } from 'demo/src/model'
import { generateRandomGraph, randomGraphConfig } from 'demo/src/random-graph'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      config: demoGraphConfig,
      graph: demoGraph,
    }
  },
  methods: {
    useDemoGraph() {
      this.config = demoGraphConfig
      this.graph = demoGraph
    },
    useRandomGraph() {
      this.config = randomGraphConfig
      this.graph = generateRandomGraph()
    },
  },
})
</script>

<template>
  <div class="graph-select-buttons">
    <button @click="useDemoGraph()">Example</button>
    <button @click="useRandomGraph()">Random</button>
  </div>
  <GraphComponent :config="config" :graph="graph" />
</template>

<style scoped>
.graph-select-buttons {
  display: flex;
  gap: 1rem;
}
</style>
