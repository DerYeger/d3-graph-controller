import { NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'

export interface Force<
  T extends NodeTypeToken,
  Subject extends GraphNode<T> | GraphLink<T, GraphNode<T>>
> {
  enabled: boolean
  strength: number | ((subject: Subject) => number)
}

export interface CollisionForce<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> extends Force<T, Node> {
  radiusMultiplier: number
}

export interface SimulationForceConfig<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  centering: Force<T, Node>
  charge: Force<T, Node>
  collision: CollisionForce<T, Node>
  link: Force<T, Link>
}
