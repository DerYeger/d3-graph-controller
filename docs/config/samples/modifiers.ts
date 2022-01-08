import { GraphNode, defineGraphConfig } from 'd3-graph-controller'
import type { Selection } from 'd3-selection'

const config = defineGraphConfig({
  modifiers: {
    node: (
      selection: Selection<SVGCircleElement, GraphNode, SVGGElement, undefined>
    ) => {
      // Define custom callbacks or visuals
    },
  },
})
