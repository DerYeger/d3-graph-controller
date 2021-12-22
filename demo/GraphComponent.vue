<template>
  <div class="container">
    <div ref="graph" class="graph" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { demoGraph } from './model/graph-model'
import { GraphController, defineGraphConfig } from '../src'

export default defineComponent({
  name: 'GraphComponent',
  data() {
    return {
      config: defineGraphConfig(),
      graph: demoGraph,
      controller: undefined as GraphController | undefined,
    }
  },
  mounted() {
    this.resetGraphController()
  },
  methods: {
    resetGraphController(): void {
      this.controller?.shutdown()
      this.controller = new GraphController(
        this.$refs.graph,
        this.graph,
        this.config
      )
    },
  },
})
</script>

<style scoped>
.container {
  flex-grow: 1;
}
</style>
