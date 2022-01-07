import { DemoType } from 'demo/src/model'
import { defineNode, GraphNode } from 'src/model/node'

export interface DemoNode extends GraphNode<DemoType> {
  radiusMultiplier: number
}

export function defineDemoNode(
  id: string,
  type: DemoType,
  radiusMultiplier: number
): DemoNode {
  return defineNode<DemoType, DemoNode>({
    id,
    type,
    fontSize: '1rem',
    isFocused: false,
    color: `var(--color-${type})`,
    label: id.toUpperCase(),
    labelColor: 'var(--text-on-primary)',
    radiusMultiplier,
  })
}

export const nodes = {
  a: defineDemoNode('a', 'primary', 1.25),
  b: defineDemoNode('b', 'primary', 1),
  c: defineDemoNode('c', 'secondary', 0.8),
  d: defineDemoNode('d', 'primary', 1),
}
