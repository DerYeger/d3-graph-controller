import { DemoType } from '@demo/src/model'
import { DemoNode, nodes } from '@demo/src/node'
import { defineLink, GraphLink } from '@src/model/link'

export interface DemoLink extends GraphLink<DemoType, DemoNode> {
  weight: number
}

function defineDemoLink(
  source: DemoNode,
  target: DemoNode,
  weight: number
): DemoLink {
  return {
    ...defineLink<DemoType, DemoNode>({
      source,
      target,
      color: `var(--color-secondary)`,
      label: weight.toString(),
      labelColor: 'var(--text-on-secondary)',
      showLabel: true,
    }),
    weight,
  }
}

const aToB: DemoLink = defineDemoLink(nodes.a, nodes.b, 1)

const bToA: DemoLink = defineDemoLink(nodes.b, nodes.a, 5)

const bToC: DemoLink = defineDemoLink(nodes.b, nodes.c, 1.5)

const cToC: DemoLink = defineDemoLink(nodes.c, nodes.c, 1)

export const links = {
  aToB,
  bToA,
  bToC,
  cToC,
}
