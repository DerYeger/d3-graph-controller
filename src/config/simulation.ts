import type { AlphaConfig } from 'src/config/alpha'
import type { SimulationForceConfig } from 'src/config/forces'
import type { NodeTypeToken } from 'src/model/graph'
import type { GraphLink } from 'src/model/link'
import type { GraphNode } from 'src/model/node'

export interface SimulationConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  /**
   * Alpha value configuration.
   */
  readonly alphas: AlphaConfig<T, Node>
  /**
   * Force configuration.
   */
  readonly forces: SimulationForceConfig<T, Node, Link>
}
