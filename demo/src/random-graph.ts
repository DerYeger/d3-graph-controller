import {
  defineGraph,
  defineGraphConfig,
  PositionInitializers,
} from 'd3-graph-controller'
import { DemoGraph, DemoGraphConfig } from 'demo/src/model'
import { defineDemoNode, DemoNode } from 'demo/src/node'

export const randomGraphConfig: DemoGraphConfig = defineGraphConfig({
  autoResize: true,
  getNodeRadius(node: DemoNode): number {
    return node.radiusMultiplier * 4
  },
  initial: {
    showLinkLabels: false,
    showNodeLabels: false,
  },
  positionInitializer: PositionInitializers.Randomized,
  forces: {
    charge: {
      strength: -50,
    },
  },
})

export function generateRandomGraph(): DemoGraph {
  const nodeCount = 200
  const nodes: DemoNode[] = [...new Array(nodeCount)].map((_, id) =>
    defineDemoNode(
      id.toString(),
      id % 4 === 1 ? 'secondary' : 'primary',
      1 + Math.random() * (id % (3 * Math.random()))
    )
  )
  // const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]))
  // const links: DemoLink[] = [...new Array(42)].map(() => {
  //   const source = nodeMap[randomNodeId(nodeCount)]
  //   const target = nodeMap[randomNodeId(nodeCount)]
  //   const weight = Math.random() * 3
  //   return defineDemoLink(source, target, weight)
  // })

  return defineGraph({
    nodes,
  })
}

// function randomNodeId(nodeCount: number): string {
//   return Math.floor(Math.random() * nodeCount).toString()
// }
