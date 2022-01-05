import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

export interface Callbacks<T extends NodeTypeToken, Node extends GraphNode<T>> {
  nodeClicked?: (node: Node) => void
}
