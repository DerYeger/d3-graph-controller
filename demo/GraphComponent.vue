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

const c = defineNodeWithDefaults({
  type: 'node',
  id: 'c',
  label: 'C',
})

const aToB = defineLink({
  source: a,
  target: b,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToA = defineLink({
  source: b,
  target: a,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToC = defineLink({
  source: b,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const cToC = defineLink({
  source: c,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const demoGraph: Graph<string> = {
  nodes: [a, b, c],
  links: [aToB, bToA, bToC, cToC],
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
