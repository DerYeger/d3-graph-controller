import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  Simulation,
} from 'd3-force'
import { GraphConfig } from 'src/config/config'
import { Graph, NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'
import { Vector } from 'vecti'

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
  center: () => Vector
  config: GraphConfig<T, Node, Link>
  graph: Graph<T, Node, Link>
  onTick: () => void
}

export function defineSimulation<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  center,
  config,
  graph,
  onTick,
}: DefineSimulationParams<T, Node, Link>): GraphSimulation<T, Node, Link> {
  const simulation = forceSimulation<Node, Link>(graph.nodes)

  const centeringForce = config.forces.centering
  if (centeringForce && centeringForce.enabled) {
    const strength = centeringForce.strength
    simulation
      .force('x', forceX<Node>(() => center().x).strength(strength))
      .force('y', forceY<Node>(() => center().y).strength(strength))
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
