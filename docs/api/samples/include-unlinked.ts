import {
  defineGraph,
  defineGraphConfig,
  GraphController,
} from 'd3-graph-controller'

const container = document.getElementById('graph') as HTMLDivElement
const graph = defineGraph({
  /* ... */
})
const config = defineGraphConfig({
  /* ... */
})

const controller = new GraphController(container, graph, config)

controller.includeUnlinked = false
