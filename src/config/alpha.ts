import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

export interface LabelAlphas {
  hide: number
  show: number
}

export interface Alphas<T extends NodeTypeToken, Node extends GraphNode<T>> {
  drag: {
    start: number
    end: number
  }
  filter: {
    link: number
    type: number
    unlinked: {
      include: number
      exclude: number
    }
  }
  focus: {
    acquire: (node: Node) => number
    release: (node: Node) => number
  }
  initialize: number
  labels: {
    links: LabelAlphas
    nodes: LabelAlphas
  }
}
