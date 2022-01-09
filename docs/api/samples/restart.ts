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

const alpha = 0.5

controller.restart(alpha)
