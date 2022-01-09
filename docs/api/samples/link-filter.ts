import {
  defineGraph,
  defineGraphConfig,
  GraphController,
  GraphLink,
} from 'd3-graph-controller'

const container = document.getElementById('graph') as HTMLDivElement
const graph = defineGraph({
  /* ... */
})
const config = defineGraphConfig({
  /* ... */
})

const controller = new GraphController(container, graph, config)

// Only include reflexive links
controller.linkFilter = (link: GraphLink) => link.source.id === link.target.id
