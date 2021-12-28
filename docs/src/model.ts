import { defineGraphConfig } from 'src/config/config'
import { Graph } from 'src/model/graph'
import { defineLink, GraphLink } from 'src/model/link'
import { defineNode, GraphNode } from 'src/model/node'

export interface DemoNode extends GraphNode {
  radiusMultiplier: number
}

export interface DemoLink extends GraphLink<string, DemoNode> {
  weight: number
}

export type DemoGraph = Graph<string, DemoNode, DemoLink>

const a: DemoNode = defineNode({
  type: 'node',
  id: 'a',
  fontSize: '1rem',
  isFocused: false,
  color: 'var(--color-primary)',
  label: 'A',
  labelColor: 'var(--text-on-primary)',
  radiusMultiplier: 1.25,
})

const b: DemoNode = defineNode({
  type: 'node',
  id: 'b',
  fontSize: '1rem',
  isFocused: false,
  color: 'var(--color-primary)',
  label: 'B',
  labelColor: 'var(--text-on-primary)',
  radiusMultiplier: 1,
})

const c: DemoNode = defineNode({
  type: 'node',
  id: 'c',
  color: 'var(--color-primary)',
  fontSize: '1rem',
  isFocused: false,
  label: 'C',
  labelColor: 'var(--text-on-primary)',
  radiusMultiplier: 0.8,
})

const d: DemoNode = defineNode({
  type: 'node',
  id: 'd',
  color: 'var(--color-primary)',
  fontSize: '1rem',
  isFocused: false,
  label: 'D',
  labelColor: 'var(--text-on-primary)',
  radiusMultiplier: 1,
})

const aToB: DemoLink = defineLink({
  source: a,
  target: b,
  color: 'var(--color-secondary)',
  label: '',
  labelColor: 'var(--text-on-secondary)',
  showLabel: false,
  weight: 1,
})

const bToA: DemoLink = defineLink({
  source: b,
  target: a,
  color: 'var(--color-secondary)',
  label: '',
  labelColor: 'var(--text-on-secondary)',
  showLabel: false,
  weight: 1,
})

const bToC: DemoLink = defineLink({
  source: b,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
  weight: 1.5,
})

const cToC: DemoLink = defineLink({
  source: c,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
  weight: 1,
})

export const demoGraph: DemoGraph = {
  nodes: [a, b, c, d],
  links: [aToB, bToA, bToC, cToC],
}

export const demoGraphConfig = defineGraphConfig<string, DemoNode, DemoLink>({
  getNodeRadius(node: DemoNode): number {
    return node.radiusMultiplier * 32
  },
  getLinkLength(link: DemoLink): number {
    return link.weight * 128
  },
})
