import { Selection } from 'd3-selection'
import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

/**
 * Low-level callbacks for modifying the underlying d3-selection.
 */
export interface Modifiers<T extends NodeTypeToken, Node extends GraphNode<T>> {
  /**
   * Modify the node selection.
   * @param selection - The selection of nodes.
   */
  node?: (
    selection: Selection<SVGCircleElement, Node, SVGGElement, undefined>
  ) => void
}
