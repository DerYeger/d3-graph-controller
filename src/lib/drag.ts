import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { Drag, NodeDragEvent } from 'src/lib/types'
import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

export interface DefineDragParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> {
  onDragStart: (event: NodeDragEvent<T, Node>, d: Node) => void
  onDragEnd: (event: NodeDragEvent<T, Node>, d: Node) => void
}

export function defineDrag<T extends NodeTypeToken, Node extends GraphNode<T>>({
  onDragStart,
  onDragEnd,
}: DefineDragParams<T, Node>): Drag<T, Node> {
  return drag<SVGGElement, Node, Node>()
    .filter((event: MouseEvent | TouchEvent) => {
      if (event.type === 'mousedown') {
        return (event as MouseEvent).button === 0 // primary (left) mouse button
      } else if (event.type === 'touchstart') {
        return (event as TouchEvent).touches.length === 1
      }
      return false
    })
    .on('start', (event: NodeDragEvent<T, Node>, d) => {
      if (event.active === 0) {
        onDragStart(event, d)
      }
      select(event.sourceEvent.target).classed('grabbed', true)
      d.fx = d.x
      d.fy = d.y
    })
    .on('drag', (event: NodeDragEvent<T, Node>, d) => {
      d.fx = event.x
      d.fy = event.y
    })
    .on('end', (event: NodeDragEvent<T, Node>, d) => {
      if (event.active === 0) {
        onDragEnd(event, d)
      }
      select(event.sourceEvent.target).classed('grabbed', false)
      d.fx = undefined
      d.fy = undefined
    })
}
