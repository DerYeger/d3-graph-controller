import { AlphaConfig } from 'src/config/alpha'
import { SimulationForceConfig } from 'src/config/forces'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export interface SimulationConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  /**
   * Alpha value configuration.
   */
  alphas: AlphaConfig<T, Node>
  /**
   * Force configuration.
   */
  forces: SimulationForceConfig<T, Node, Link>
}
