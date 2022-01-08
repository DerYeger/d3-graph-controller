import {
  defineGraph,
  defineGraphConfig,
  Graph,
  GraphConfig,
  GraphController,
} from 'd3-graph-controller'
import { DemoLink, links } from 'demo/src/link'
import { DemoNode, nodes } from 'demo/src/node'

export type DemoType = 'primary' | 'secondary'

export type DemoGraph = Graph<DemoType, DemoNode, DemoLink>

export const demoGraph: DemoGraph = defineGraph({
  nodes: Object.values(nodes),
  links: Object.values(links),
})

export type DemoGraphController = GraphController<DemoType, DemoNode, DemoLink>

export type DemoGraphConfig = GraphConfig<DemoType, DemoNode, DemoLink>

export const demoGraphConfig: DemoGraphConfig = defineGraphConfig<
  DemoType,
  DemoNode,
  DemoLink
>({
  autoResize: true,
  getLinkLength(link: DemoLink): number {
    return link.weight * 128
  },
  nodeRadius(node: DemoNode): number {
    return node.radiusMultiplier * 32
  },
  simulation: {
    forces: {
      collision: {
        radiusMultiplier: 4,
      },
    },
  },
})
