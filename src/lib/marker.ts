import * as d3 from 'd3'

import { Canvas } from '@src/lib/canvas'
import { Graph, NodeTypeToken } from '@src/model/graph'
import { GraphNode } from '@src/model/node'
import { getMarkerId, GraphLink } from '@src/model/link'
import { markerConfig } from '@src/model/config'

export type MarkerSelection = d3.Selection<
  SVGMarkerElement,
  string,
  SVGGElement,
  undefined
>

export function defineMarkerSelection(canvas: Canvas): MarkerSelection {
  return canvas.append('defs').selectAll('marker')
}

export interface CreateMarkerParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  selection?: MarkerSelection
  graph: Graph<T, Node, Link>
}

export function createMarkers<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  graph,
  selection,
}: CreateMarkerParams<T, Node, Link>): MarkerSelection | undefined {
  return selection
    ?.data(getUniqueColors(graph), (d) => d)
    .join((enter) => {
      const marker = enter
        .append('marker')
        .attr('id', (d) => getMarkerId(d))
        .attr('markerHeight', markerConfig.markerBoxSize)
        .attr('markerWidth', markerConfig.markerBoxSize)
        .attr('orient', 'auto')
        .attr('refX', markerConfig.markerRef)
        .attr('refY', markerConfig.markerRef)
        .attr('viewBox', markerConfig.markerPath)
        .style('fill', (d) => d)
      marker.append('path').attr('d', `${d3.line()(markerConfig.arrowPoints)}`)
      return marker
    })
}

function getUniqueColors<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(graph: Graph<T, Node, Link>): string[] {
  return [...new Set(graph.links.map((link) => link.color))]
}
