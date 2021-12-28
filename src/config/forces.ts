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
  centering: NodeForce<T, Node>
  charge: NodeForce<T, Node>
  collision: CollisionForce<T, Node>
  link: LinkForce<T, Node, Link>
}
