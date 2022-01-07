import { Alphas } from 'src/config/alpha'
import { Callbacks } from 'src/config/callbacks'
import { createDefaultForces, SimulationForceConfig } from 'src/config/forces'
import {
  createDefaultInitialGraphSettings,
  InitialGraphSettings,
} from 'src/config/initial'
import { MarkerConfig, Markers } from 'src/config/marker'
import { Modifiers } from 'src/config/modifiers'
import { PositionInitializer, PositionInitializers } from 'src/config/position'
import { ZoomConfig } from 'src/config/zoom'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'
import merge from 'ts-deepmerge'

export interface GraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  alphas: Alphas<T, Node>
  autoResize: boolean
  callbacks: Callbacks<T, Node>
  forces: SimulationForceConfig<T, Node, Link>
  getNodeRadius(node: Node): number
  getLinkLength(link: Link): number
  initial: InitialGraphSettings<T, Node, Link>
  marker: MarkerConfig
  modifiers: Modifiers<T, Node>
  positionInitializer: PositionInitializer<NodeTypeToken, Node>
  zoom: ZoomConfig
}

function defaultGraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): GraphConfig<T, Node, Link> {
  return {
    alphas: {
      drag: {
        end: 0,
        start: 0.1,
      },
      filter: {
        link: 1,
        type: 0.1,
        unlinked: {
          include: 0.1,
          exclude: 0.1,
        },
      },
      focus: {
        acquire: () => 0.1,
        release: () => 0.1,
      },
      initialize: 1,
      labels: {
        links: {
          hide: 0,
          show: 0,
        },
        nodes: {
          hide: 0,
          show: 0,
        },
      },
      resize: 0.5,
    },
    autoResize: false,
    callbacks: {},
    forces: createDefaultForces(),
    initial: createDefaultInitialGraphSettings(),
    getLinkLength: () => 128,
    getNodeRadius: () => 16,
    marker: Markers.Arrow(4),
    modifiers: {},
    positionInitializer: PositionInitializers.Centered,
    zoom: {
      initial: 1,
      min: 0.1,
      max: 2,
    },
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
  return merge.withOptions(
    { mergeArrays: false },
    defaultGraphConfig<T, Node, Link>(),
    config
  )
}
