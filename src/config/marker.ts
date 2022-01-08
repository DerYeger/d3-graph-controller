import { GraphConfig } from 'src/config/config'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

/**
 * Marker configuration.
 */
export interface MarkerConfig {
  /**
   * Size of the marker's box.
   */
  markerBoxSize: number
  /**
   * Get padding of the marker for calculating link paths.
   * @param node - The node the marker is pointing at.
   * @param config - The current config.
   * @returns The padding of the marker.
   */
  getMarkerPadding: <
    T extends NodeTypeToken,
    Node extends GraphNode<T>,
    Link extends GraphLink<T, Node>
  >(
    node: Node,
    config: GraphConfig<T, Node, Link>
  ) => number
  /**
   * The ref of the marker.
   */
  markerRef: [number, number]
  // TODO: rename to path
  /**
   * The path of the marker.
   */
  markerPoints: [number, number][]
  // TODO: Rename to viewBox
  /**
   * The ViewBox of the marker.
   */
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

/**
 * Collection of built-in markers.
 */
export const Markers = {
  /**
   * Create an arrow marker configuration.
   * @param size - The size of the arrow
   */
  Arrow: (size: number): MarkerConfig => defaultMarkerConfig(size),
}
