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
  readonly source: SourceNode
  /**
   * The target node of the link
   */
  readonly target: TargetNode
  /**
   * The color of the link.
   * Can be any valid CSS expression.
   */
  readonly color: string
  /**
   * The label of the link.
   */
  readonly label: string
  /**
   * The color of the link's label.
   * Can be any valid CSS expression.
   */
  readonly labelColor: string
  readonly showLabel: boolean
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
