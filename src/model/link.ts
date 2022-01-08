import { SimulationLinkDatum } from 'd3-force'
import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

/**
 * Link defining an edge from one node to another.
 */
export interface GraphLink<
  T extends NodeTypeToken = NodeTypeToken,
  SourceNode extends GraphNode<T> = GraphNode<T>,
  TargetNode extends GraphNode<T> = SourceNode
> extends SimulationLinkDatum<SourceNode | TargetNode> {
  /**
   * The source node of the link.
   */
  source: SourceNode
  /**
   * The target node of the link
   */
  target: TargetNode
  /**
   * The color of the link.
   * Can be any valid CSS expression.
   */
  color: string
  /**
   * The label of the link.
   */
  label: string
  /**
   * The color of the link's label.
   * Can be any valid CSS expression.
   */
  labelColor: string
  showLabel: boolean
}

/**
 * Define a link with type inference.
 * @param data - The data of the link.
 */
export function defineLink<
  T extends NodeTypeToken = NodeTypeToken,
  SourceNode extends GraphNode<T> = GraphNode<T>,
  TargetNode extends GraphNode<T> = SourceNode,
  Link extends GraphLink<T, SourceNode, TargetNode> = GraphLink<
    T,
    SourceNode,
    TargetNode
  >
>(data: Link): Link {
  return {
    ...data,
  }
}

/**
 * Get the id of a link.
 * @param link - The link.
 */
export function getLinkId<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(link: Link): string {
  return `${link.source.id}-${link.target.id}`
}

/**
 * Get the ID of a marker.
 * @param color - The color of the link.
 */
export function getMarkerId(color: string): string {
  return `link-arrow-${color}`.replace(/[()]/g, '~')
}

/**
 * Get the URL of a marker.
 * @param link - The link of the marker.
 */
export function getMarkerUrl<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(link: Link): string {
  return `url(#${getMarkerId(link.color)})`
}
