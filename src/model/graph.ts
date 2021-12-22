import { GraphLink } from './link'
import { GraphNode } from './node'

export type NodeTypeToken = string

export interface Graph<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
> {
  nodes: Node[]
  links: Link[]
}
