<template>
  <div class="container">
    <div ref="graph" class="graph" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GraphController } from '@src/controller'
import { defineGraphConfig } from '@src/model/config'
import { Graph } from '@src/model/graph'
import { defineNode, nodeDefaults } from '@src/model/node'
import { GraphLink } from '@src/model/link'

const demoGraph: Graph = {
  nodes: [
    defineNode({
      ...nodeDefaults,
      type: 'node',
      id: '0',
      color: 'green',
      label: 'Test',
    }),
  ],
  links: [] as GraphLink[],
}

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
