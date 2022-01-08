import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

/**
 * Callback configuration.
 */
export interface Callbacks<T extends NodeTypeToken, Node extends GraphNode<T>> {
  /**
   * Callback when a node is double-clicked or double-tapped.
   * @param node - The node.
   */
  nodeClicked?: (node: Node) => void
}
