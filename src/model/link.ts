import { SimulationLinkDatum } from 'd3'

import { NodeTypeToken } from '@src/model/graph'
import { GraphNode } from '@src/model/node'

export interface GraphLink<
  T extends NodeTypeToken = NodeTypeToken,
  SourceNode extends GraphNode<T> = GraphNode<T>,
  TargetNode extends GraphNode<T> = SourceNode
> extends SimulationLinkDatum<SourceNode | TargetNode> {
  source: SourceNode
  target: TargetNode
  color: string
  label: string
  labelColor: string
  showLabel: boolean
}

export function defineLink<
  T extends NodeTypeToken = NodeTypeToken,
  SourceNode extends GraphNode<T> = GraphNode<T>,
  TargetNode extends GraphNode<T> = SourceNode,
  Link extends GraphLink<T, SourceNode, TargetNode> = GraphLink<
    T,
    SourceNode,
    TargetNode
  >
>(data: Link): Link {
  return {
    ...data,
  }
}

export function getLinkId<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(link: Link): string {
  return `${link.source.id}-${link.target.id}`
}

export function getMarkerId(color: string): string {
  return `link-arrow-${color}`.replace(/[()]/g, '~')
}

export function getMarkerUrl<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(link: Link): string {
  return `url(#${getMarkerId(link.color)})`
}
