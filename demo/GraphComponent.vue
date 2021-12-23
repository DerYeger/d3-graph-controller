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
import { defineNodeWithDefaults } from '@src/model/node'
import { defineLink } from '@src/model/link'

const a = defineNodeWithDefaults({
  type: 'node',
  id: 'a',
  label: 'A',
})

const b = defineNodeWithDefaults({
  type: 'node',
  id: 'b',
  label: 'B',
})

const link = defineLink({
  source: a,
  target: b,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const demoGraph: Graph<string> = {
  nodes: [a, b],
  links: [link],
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
.container {
  flex-grow: 1;
}
</style>
