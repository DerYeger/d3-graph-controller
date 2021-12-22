import { NodeTypeToken } from './graph'
import { GraphLink } from './link'
import { GraphNode } from './node'

const markerBoxSize = 4

export const markerConfig = {
  markerBoxSize,
  getMarkerPadding: <
    T extends NodeTypeToken,
    Node extends GraphNode<T>,
    Link extends GraphLink<T, Node>
  >(
    node: Node,
    config: GraphConfig<T, Node, Link>
  ) => config.getNodeRadius(node) + 2 * markerBoxSize,
  markerRef: markerBoxSize / 2,
  arrowPoints: [
    [0, 0],
    [0, markerBoxSize],
    [markerBoxSize, markerBoxSize / 2],
  ] as [number, number][],
  markerPath: [0, 0, markerBoxSize, markerBoxSize].join(','),
}

export type LinkFilter<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = (link: Link) => boolean

export interface InitialGraphSettings<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  includeUnlinked: boolean
  linkFilter: LinkFilter<T, Node, Link>
  nodeTypeFilter: T[]
  showLinkLabels: boolean
  showNodeLabels: boolean
}

export interface Force<
  T extends NodeTypeToken,
  Subject extends GraphNode<T> | GraphLink<T, GraphNode<T>>
> {
  enabled: boolean
  strength: number | ((subject: Subject) => number)
}

export interface SimulationForceConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  centering: Force<T, Node>
  charge: Force<T, Node>
  collision: Force<T, Node>
  link: Force<T, Link>
}

export interface GraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  forces: Partial<SimulationForceConfig<T, Node, Link>>

  getNodeRadius(node: Node): number

  getLinkLength(link: Link): number

  initial?: Partial<InitialGraphSettings<T, Node, Link>>
}

function defaultGraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): GraphConfig<T, Node, Link> {
  return {
    forces: {
      centering: {
        enabled: true,
        strength: 5,
      },
      charge: {
        enabled: true,
        strength: -10,
      },
      collision: {
        enabled: true,
        strength: 1,
      },
      link: {
        enabled: true,
        strength: 1,
      },
    },
    getLinkLength: () => 128,
    getNodeRadius: () => 16,
  }
}

export function defineGraphConfig<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
>(
  config: Partial<GraphConfig<T, Node, Link>> = {}
): GraphConfig<T, Node, Link> {
  return {
    ...defaultGraphConfig(),
    ...config,
  }
}
