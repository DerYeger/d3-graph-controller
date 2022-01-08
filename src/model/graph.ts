import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export type NodeTypeToken = string

export interface Graph<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
> {
  nodes: Node[]
  links: Link[]
}

export function defineGraph<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
>({ nodes, links }: Partial<Graph<T, Node, Link>>): Graph<T, Node, Link> {
  return {
    nodes: nodes ?? ([] as Node[]),
    links: links ?? ([] as Link[]),
  }
}
