import { NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'

export interface Force<Subject> {
  enabled: boolean
  strength: number | ((subject: Subject) => number)
}

export type NodeForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = Force<Node>

export type LinkForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = Force<Link>

export interface CollisionForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> extends NodeForce<T, Node> {
  radiusMultiplier: number
}

export interface SimulationForceConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  centering: false | NodeForce<T, Node>
  charge: false | NodeForce<T, Node>
  collision: false | CollisionForce<T, Node>
  link: false | LinkForce<T, Node, Link>
}

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
