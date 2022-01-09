import { createDefaultAlphaConfig } from 'src/config/alpha'
import { Callbacks } from 'src/config/callbacks'
import { createDefaultForceConfig } from 'src/config/forces'
import {
  createDefaultInitialGraphSettings,
  InitialGraphSettings,
} from 'src/config/initial'
import { MarkerConfig, Markers } from 'src/config/marker'
import { Modifiers } from 'src/config/modifiers'
import { PositionInitializer, PositionInitializers } from 'src/config/position'
import { SimulationConfig } from 'src/config/simulation'
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
  /**
   * Set to true to enable automatic resizing.
   * Warning: Do call shutdown(), once the controller is no longer required.
   */
  readonly autoResize: boolean
  /**
   * Callback configuration.
   */
  readonly callbacks: Callbacks<T, Node>
  /**
   * Initial settings of a controller.
   */
  readonly initial: InitialGraphSettings<T, Node, Link>
  /**
   * Marker configuration.
   */
  readonly marker: MarkerConfig
  /**
   * Low-level callbacks for modifying the underlying d3-selection.
   */
  readonly modifiers: Modifiers<T, Node, Link>
  /**
   * Define the radius of a node for the simulation and visualization.
   * Can be a static number or a function receiving a node as its parameter.
   */
  readonly nodeRadius: number | ((node: Node) => number)
  /**
   * Initializes a node's position in context of a graph's width and height.
   */
  readonly positionInitializer: PositionInitializer<T, Node>
  /**
   * Simulation configuration.
   */
  readonly simulation: SimulationConfig<T, Node, Link>
  /**
   * Zoom configuration.
   */
  readonly zoom: ZoomConfig
}

function defaultGraphConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): GraphConfig<T, Node, Link> {
  return {
    autoResize: false,
    callbacks: {},
    initial: createDefaultInitialGraphSettings(),
    nodeRadius: 16,
    marker: Markers.Arrow(4),
    modifiers: {},
    positionInitializer: PositionInitializers.Centered,
    simulation: {
      alphas: createDefaultAlphaConfig(),
      forces: createDefaultForceConfig(),
    },
    zoom: {
      initial: 1,
      min: 0.1,
      max: 2,
    },
  }
}

/**
 * Utility type for deeply partial objects.
 */
export type DeepPartial<T> = {
  readonly [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * Define the configuration of a controller.
 * Will be merged with the default configuration.
 * @param config - The partial configuration.
 * @returns The merged configuration.
 */
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
