<template>
  <div class="settings card">
    <button @click="resetGraphController()">Reset</button>
  </div>
  <div ref="graph" class="graph card" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GraphController } from '@src/controller'
import { demoGraph, demoGraphConfig } from '@demo/model'

export default defineComponent({
  name: 'GraphComponent',
  data() {
    return {
      config: demoGraphConfig,
      graph: demoGraph,
      controller: undefined as GraphController | undefined,
    }
  },
  computed: {
    resizeObserver(): ResizeObserver {
      return new ResizeObserver(() => this.controller?.resize())
    },
  },
  mounted() {
    this.resetGraphController()
    this.resizeObserver.observe(this.$refs.graph)
  },
  beforeUnmount() {
    this.resizeObserver.unobserve(this.$refs.graph)
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
.settings {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.graph {
  flex-grow: 1;
  margin: 1rem;
  max-height: 960px;
  max-width: 960px;
  width: calc(100% - 2rem);
}
</style>
