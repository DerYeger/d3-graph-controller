import {
  GraphNode,
  defineGraphConfig,
  GraphLink,
  GraphSimulation,
} from 'd3-graph-controller'

const config = defineGraphConfig({
  modifiers: {
    simulation: (simulation: GraphSimulation<string, GraphNode, GraphLink>) => {
      // Customize simulation
    },
  },
})
