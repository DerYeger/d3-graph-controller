import { GraphConfig } from 'src/config/config'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

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
  markerRef: [number, number]
  // TODO: rename to path
  markerPoints: [number, number][]
  // TODO: Rename to viewBox
  markerPath: string
}

function defaultMarkerConfig(size: number): MarkerConfig {
  return {
    markerBoxSize: size,
    getMarkerPadding: <
      T extends NodeTypeToken,
      Node extends GraphNode<T>,
      Link extends GraphLink<T, Node>
    >(
      node: Node,
      config: GraphConfig<T, Node, Link>
    ) => config.getNodeRadius(node) + 2 * size,
    markerRef: [size / 2, size / 2],
    markerPoints: [
      [0, 0],
      [0, size],
      [size, size / 2],
    ] as [number, number][],
    markerPath: [0, 0, size, size].join(','),
  }
}

export const Markers = {
  Arrow: (size: number): MarkerConfig => defaultMarkerConfig(size),
}
