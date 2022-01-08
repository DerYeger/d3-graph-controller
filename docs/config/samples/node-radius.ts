import { GraphNode, defineGraphConfig } from 'd3-graph-controller'

type CustomNode = GraphNode & { radius: number }

const config = defineGraphConfig<string, CustomNode>({
  getNodeRadius: (node: CustomNode) => node.radius,
})
