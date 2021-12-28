import { GraphConfig } from '@src/config/config'
import { NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'

export interface MarkerConfig {
  markerBoxSize: number
  getMarkerPadding: <
    T extends NodeTypeToken,
    Node extends GraphNode<T>,
    Link extends GraphLink<T, Node>
  >(
    node: Node,
    config: GraphConfig<T, Node, Link>
  ) => number
  markerRef: number
  markerPoints: [number, number][]
  markerPath: string
}

const defaultMarkerBoxSize = 4

export const defaultMarkerConfig: MarkerConfig = {
  markerBoxSize: defaultMarkerBoxSize,
  getMarkerPadding: <
    T extends NodeTypeToken,
    Node extends GraphNode<T>,
    Link extends GraphLink<T, Node>
  >(
    node: Node,
    config: GraphConfig<T, Node, Link>
  ) => config.getNodeRadius(node) + 2 * defaultMarkerBoxSize,
  markerRef: defaultMarkerBoxSize / 2,
  markerPoints: [
    [0, 0],
    [0, defaultMarkerBoxSize],
    [defaultMarkerBoxSize, defaultMarkerBoxSize / 2],
  ] as [number, number][],
  markerPath: [0, 0, defaultMarkerBoxSize, defaultMarkerBoxSize].join(','),
}
