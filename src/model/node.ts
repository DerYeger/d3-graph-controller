import { SimulationNodeDatum } from 'd3'

import { NodeTypeToken } from 'src/model/graph'

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

export function defineNode<T extends NodeTypeToken = NodeTypeToken>(
  data: GraphNode<T>
): GraphNode<T> {
  return data
}

export const nodeDefaults = {
  fontSize: '1rem',
  isFocused: false,
  labelColor: 'black',
}
