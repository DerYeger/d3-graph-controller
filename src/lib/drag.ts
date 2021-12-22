import * as d3 from 'd3'
import { D3DragEvent } from 'd3'

import { GraphNode, NodeTypeToken } from 'src/model'

export type Drag<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = d3.DragBehavior<SVGGElement, Node, Node>
export type NodeDragEvent<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = D3DragEvent<SVGCircleElement, Node, Node>

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
  return d3
    .drag<SVGGElement, Node, Node>()
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
      d3.select(event.sourceEvent.target).classed('grabbed', true)
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
      d3.select(event.sourceEvent.target).classed('grabbed', false)
      d.fx = undefined
      d.fy = undefined
    })
}
