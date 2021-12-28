import { createDefaultForces, SimulationForceConfig } from 'src/config/forces'
import {
  createDefaultInitialGraphSettings,
  InitialGraphSettings,
} from 'src/config/initial'
import { defaultMarkerConfig, MarkerConfig } from 'src/config/marker'
import { PositionInitializer, PositionInitializers } from 'src/config/position'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'
import merge from 'ts-deepmerge'

export interface GraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  forces: SimulationForceConfig<T, Node, Link>
  getNodeRadius(node: Node): number
  getLinkLength(link: Link): number
  initial: InitialGraphSettings<T, Node, Link>
  positionInitializer: PositionInitializer<NodeTypeToken, Node>
  marker: MarkerConfig
}

function defaultGraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): GraphConfig<T, Node, Link> {
  return {
    forces: createDefaultForces(),
    initial: createDefaultInitialGraphSettings(),
    getLinkLength: () => 128,
    getNodeRadius: () => 16,
    positionInitializer: PositionInitializers.Centered,
    marker: defaultMarkerConfig,
  }
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export function defineGraphConfig<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
>(
  config: DeepPartial<GraphConfig<T, Node, Link>> = {}
): GraphConfig<T, Node, Link> {
  return merge(defaultGraphConfig<T, Node, Link>(), config)
}
