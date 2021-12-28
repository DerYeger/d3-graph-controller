import { DemoGraph, DemoGraphConfig, demoGraphConfig } from '@demo/src/model'
import { defineDemoNode, DemoNode } from '@demo/src/node'
import { PositionInitializers } from '@src/config/position'

export const randomGraphConfig: DemoGraphConfig = {
  ...demoGraphConfig,
  initial: {
    showLinkLabels: false,
    showNodeLabels: false,
  },
  getNodeRadius: (node: DemoNode) => node.radiusMultiplier * 4,
  positionInitializer: PositionInitializers.Randomized,
}

export function generateRandomGraph(): DemoGraph {
  const nodeCount = 200
  const nodes: DemoNode[] = [...new Array(nodeCount)].map((_, id) =>
    defineDemoNode(
      id.toString(),
      id % 4 === 0 ? 'secondary' : 'primary',
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

  return {
    nodes,
    links: [],
  }
}

// function randomNodeId(nodeCount: number): string {
//   return Math.floor(Math.random() * nodeCount).toString()
// }
