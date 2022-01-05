import { Selection } from 'd3-selection'
import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

export interface Modifiers<T extends NodeTypeToken, Node extends GraphNode<T>> {
  node?: (selection: Selection<SVGCircleElement, Node, any, any>) => void
}
