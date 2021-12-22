import * as d3 from 'd3'

import { Canvas } from './canvas'
import Paths from './paths'
import {
  getLinkId,
  getMarkerUrl,
  Graph,
  GraphConfig,
  GraphLink,
  GraphNode,
  NodeTypeToken,
} from '../model'

export type LinkSelection<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = d3.Selection<SVGGElement, Link, SVGGElement, undefined>

export function defineLinkSelection<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(canvas: Canvas): LinkSelection<T, Node, Link> {
  return canvas.append('g').classed('links', true).selectAll('path')
}

export interface CreateLinksParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  graph: Graph<T, Node, Link>
  selection?: LinkSelection<T, Node, Link>
  showLabels: boolean
}

export function createLinks<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  graph,
  selection,
  showLabels,
}: CreateLinksParams<T, Node, Link>): LinkSelection<T, Node, Link> | undefined {
  const result = selection
    ?.data(graph.links, (d) => getLinkId(d))
    .join((enter) => {
      const linkGroup = enter.append('g')
      linkGroup
        .append('path')
        .classed('link', true)
        .style('marker-end', (d) => getMarkerUrl(d))
        .style('stroke', (d) => d.color)
      linkGroup
        .append('text')
        .classed('link__label', true)
        .style('fill', (d) => d.labelColor)
        .text((d) => d.label.toString())
      return linkGroup
    })

  result
    ?.select('.link__label')
    .attr('opacity', (d) => (d.showLabel && showLabels ? 1 : 0))

  return result
}

export interface UpdateLinksParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  config: GraphConfig<T, Node, Link>
  graph: Graph<T, Node, Link>
  graphWidth: number
  graphHeight: number
  selection?: LinkSelection<T, Node, Link>
}

export function updateLinks<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(params: UpdateLinksParams<T, Node, Link>): void {
  updateLinkPaths(params)
  updateLinkLabels(params)
}

function updateLinkPaths<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  config,
  graph,
  graphHeight,
  graphWidth,
  selection,
}: UpdateLinksParams<T, Node, Link>): void {
  selection?.selectAll<SVGPathElement, Link>('path').attr('d', (d) => {
    if (
      d.source.x === undefined ||
      d.source.y === undefined ||
      d.target.x === undefined ||
      d.target.y === undefined
    ) {
      return ''
    }
    if (d.source.id === d.target.id) {
      return Paths.reflexive.path({
        config,
        node: d.source,
        center: [graphWidth / 2, graphHeight / 2],
      })
    } else if (areBidirectionallyConnected(graph, d.source, d.target)) {
      return Paths.arc.path({ config, source: d.source, target: d.target })
    } else {
      return Paths.line.path({ config, source: d.source, target: d.target })
    }
  })
}

function updateLinkLabels<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  config,
  graph,
  graphHeight,
  graphWidth,
  selection,
}: UpdateLinksParams<T, Node, Link>): void {
  selection?.select('.link__label').attr('transform', (d) => {
    if (
      d.source.x === undefined ||
      d.source.y === undefined ||
      d.target.x === undefined ||
      d.target.y === undefined
    ) {
      return 'translate(0, 0)'
    }
    if (d.source.id === d.target.id) {
      return Paths.reflexive.labelTransform({
        config,
        node: d.source,
        center: [graphWidth / 2, graphHeight / 2],
      })
    } else if (areBidirectionallyConnected(graph, d.source, d.target)) {
      return Paths.arc.labelTransform({
        config,
        source: d.source,
        target: d.target,
      })
    } else {
      return Paths.line.labelTransform({
        config,
        source: d.source,
        target: d.target,
      })
    }
  })
}

function areBidirectionallyConnected<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(graph: Graph<T, Node, Link>, source: Node, target: Node): boolean {
  return (
    source.id !== target.id &&
    graph.links.some(
      (l) => l.target.id === source.id && l.source.id === target.id
    ) &&
    graph.links.some(
      (l) => l.target.id === target.id && l.source.id === source.id
    )
  )
}
