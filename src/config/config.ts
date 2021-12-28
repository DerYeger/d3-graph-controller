import { LinkFilter } from '@src/config/filter'
import { SimulationForceConfig } from '@src/config/forces'
import { defaultMarkerConfig, MarkerConfig } from '@src/config/marker'
import { PositionInitializer, PositionInitializers } from '@src/config/position'
import { NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'

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

export interface GraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  forces: Partial<SimulationForceConfig<T, Node, Link>>
  getNodeRadius(node: Node): number
  getLinkLength(link: Link): number
  initial?: Partial<InitialGraphSettings<T, Node, Link>>
  positionInitializer: PositionInitializer<NodeTypeToken, Node>
  marker: MarkerConfig
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
        strength: 0.1,
      },
      charge: {
        enabled: true,
        strength: -1,
      },
      collision: {
        enabled: true,
        strength: 1,
        radiusMultiplier: 2,
      },
      link: {
        enabled: true,
        strength: 1,
      },
    },
    getLinkLength: () => 128,
    getNodeRadius: () => 16,
    positionInitializer: PositionInitializers.Centered,
    marker: defaultMarkerConfig,
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
