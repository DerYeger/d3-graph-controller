import { GraphConfig } from '@src/config/config'
import { Graph, NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  Simulation,
} from 'd3-force'

export type GraphSimulation<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = Simulation<Node, Link>

export interface DefineSimulationParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  config: GraphConfig<T, Node, Link>
  graph: Graph<T, Node, Link>
  height: number
  onTick: () => void
  width: number
}

export function defineSimulation<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  config,
  graph,
  height,
  onTick,
  width,
}: DefineSimulationParams<T, Node, Link>): GraphSimulation<T, Node, Link> {
  const simulation = forceSimulation<Node, Link>(graph.nodes)

  const centeringForce = config.forces.centering
  if (centeringForce && centeringForce.enabled) {
    const strength = centeringForce.strength
    simulation
      .force('x', forceX<Node>(width / 2).strength(strength))
      .force('y', forceY<Node>(height / 2).strength(strength))
  }

  const chargeForce = config.forces.charge
  if (chargeForce && chargeForce.enabled) {
    simulation.force(
      'charge',
      forceManyBody<Node>().strength(chargeForce.strength)
    )
  }

  const collisionForce = config.forces.collision
  if (collisionForce && collisionForce.enabled) {
    simulation.force(
      'collision',
      forceCollide<Node>().radius(
        (d) => (collisionForce.radiusMultiplier ?? 1) * config.getNodeRadius(d)
      )
    )
  }

  const linkForce = config.forces.link
  if (linkForce && linkForce.enabled) {
    simulation.force(
      'link',
      forceLink<Node, Link>(graph.links)
        .id((d) => d.id)
        .distance((d) => config.getLinkLength(d))
        .strength(linkForce.strength)
    )
  }
  return simulation.on('tick', () => onTick())
}
