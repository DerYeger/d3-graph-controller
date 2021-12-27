import { SimulationNodeDatum } from 'd3-force'

import { NodeTypeToken } from '@src/model/graph'

export interface GraphNode<T extends NodeTypeToken = NodeTypeToken>
  extends SimulationNodeDatum {
  type: T
  id: string
  color: string
  label: string
  labelColor: string
  isFocused: boolean
  fontSize: string
  x?: number
  y?: number
  fx?: number
  fy?: number
  lastInteractionTimestamp?: number
}

export function defineNode<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>
>(data: Node): Node {
  return data
}

export function defineNodeWithDefaults<T extends NodeTypeToken = NodeTypeToken>(
  data: Partial<GraphNode<T>> & Pick<GraphNode, 'id' | 'type'>
): GraphNode<T> {
  return {
    ...nodeDefaults,
    ...data,
  }
}

const nodeDefaults: Omit<GraphNode, 'id' | 'type'> = {
  color: 'lightgray',
  label: '',
  fontSize: '1rem',
  isFocused: false,
  labelColor: 'black',
}
