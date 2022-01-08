import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

/**
 * Simulation force.
 */
export interface Force<Subject> {
  /**
   * Whether the force is enabled.
   */
  enabled: boolean
  /**
   * The strength of the force.
   * Can be a static number or a function receiving the force's subject and returning a number.
   */
  strength: number | ((subject: Subject) => number)
}

/**
 * Simulation force applied to nodes.
 */
export type NodeForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = Force<Node>

/**
 * Simulation force applied to links.
 */
export type LinkForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = Force<Link>

/**
 * Collision force applied to nodes.
 */
export interface CollisionForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> extends NodeForce<T, Node> {
  /**
   * Multiplier of the node radius.
   * Tip: Large values can drastically reduce link intersection.
   */
  radiusMultiplier: number
}

/**
 * Simulation force configuration.
 */
export interface SimulationForceConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  /**
   * Centering force applied to nodes.
   */
  centering: false | NodeForce<T, Node>
  /**
   * Charge force applied to nodes.
   */
  charge: false | NodeForce<T, Node>
  /**
   * Collision force applied to nodes.
   */
  collision: false | CollisionForce<T, Node>
  /**
   * Link force applied to links.
   */
  link: false | LinkForce<T, Node, Link>
}

/**
 * Create the default force configuration.
 */
export function createDefaultForces<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): SimulationForceConfig<T, Node, Link> {
  return {
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
  }
}
