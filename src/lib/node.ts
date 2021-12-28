import { Selection } from 'd3-selection'
import { GraphConfig } from 'src/config/config'
import { Canvas } from 'src/lib/canvas'
import { Drag } from 'src/lib/drag'
import { terminateEvent } from 'src/lib/utils'
import { Graph, NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export type NodeSelection<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = Selection<SVGGElement, Node, SVGGElement, undefined>

export function defineNodeSelection<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
>(canvas: Canvas): NodeSelection<T, Node> {
  return canvas.append('g').classed('nodes', true).selectAll('circle')
}

export interface CreateNodesParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  config: GraphConfig<T, Node, Link>
  drag?: Drag<T, Node> | undefined
  graph: Graph<T, Node, Link>
  onNodeSelected: (node: Node) => void
  selection?: NodeSelection<T, Node> | undefined
  showLabels: boolean
}

export function createNodes<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  config,
  drag,
  graph,
  onNodeSelected,
  selection,
  showLabels,
}: CreateNodesParams<T, Node, Link>): NodeSelection<T, Node> | undefined {
  const result = selection
    ?.data(graph.nodes, (d) => d.id)
    .join((enter) => {
      const nodeGroup = enter.append('g')

      if (drag !== undefined) {
        nodeGroup.call(drag)
      }

      nodeGroup
        .append('circle')
        .classed('node', true)
        .attr('aria-label', (d) => d.label)
        .attr('r', (d) => config.getNodeRadius(d))
        .on('contextmenu', (event, d) => {
          terminateEvent(event)
          onNodeSelected(d)
        })
        .on('pointerdown', (event: PointerEvent, d) =>
          onPointerDown(event, d, onNodeSelected)
        )
        .style('fill', (d) => d.color)

      nodeGroup
        .append('text')
        .classed('node__label', true)
        .attr('dy', `0.33em`)
        .style('fill', (d) => d.labelColor)
        .style('font-size', (d) => d.fontSize)
        .style('stroke', 'none')
        .text((d) => d.label)

      return nodeGroup
    })

  result?.select('.node').classed('focused', (d) => d.isFocused)
  result?.select('.node__label').attr('opacity', showLabels ? 1 : 0)

  return result
}

const DOUBLE_CLICK_INTERVAL_MS = 500

function onPointerDown<T extends NodeTypeToken, Node extends GraphNode<T>>(
  event: PointerEvent,
  node: Node,
  onNodeSelected: (node: Node) => void
): void {
  if (event.button !== undefined && event.button !== 0) {
    return
  }

  const lastInteractionTimestamp = node.lastInteractionTimestamp
  const now = Date.now()
  if (
    lastInteractionTimestamp === undefined ||
    now - lastInteractionTimestamp > DOUBLE_CLICK_INTERVAL_MS
  ) {
    node.lastInteractionTimestamp = now
    return
  }
  node.lastInteractionTimestamp = undefined
  onNodeSelected(node)
}

export function updateNodes<T extends NodeTypeToken, Node extends GraphNode<T>>(
  selection?: NodeSelection<T, Node>
): void {
  selection?.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
}
