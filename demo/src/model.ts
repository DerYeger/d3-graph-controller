import { DemoLink, links } from '@demo/src/link'
import { DemoNode, nodes } from '@demo/src/node'
import { defineGraphConfig } from '@src/config/config'
import { Graph } from '@src/model/graph'

export type DemoType = 'primary' | 'secondary'

export type DemoGraph = Graph<DemoType, DemoNode, DemoLink>

export const demoGraph: DemoGraph = {
  nodes: Object.values(nodes),
  links: Object.values(links),
}

export const demoGraphConfig = defineGraphConfig<DemoType, DemoNode, DemoLink>({
  getNodeRadius(node: DemoNode): number {
    return node.radiusMultiplier * 32
  },
  getLinkLength(link: DemoLink): number {
    return link.weight * 128
  },
})
