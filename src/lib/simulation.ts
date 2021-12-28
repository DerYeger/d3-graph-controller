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
  if (config.forces.centering?.enabled) {
    const strength = config.forces.centering.strength
    simulation
      .force('x', forceX<Node>(width / 2).strength(strength))
      .force('y', forceY<Node>(height / 2).strength(strength))
  }
  if (config.forces.charge?.enabled) {
    simulation.force(
      'charge',
      forceManyBody<Node>().strength(config.forces.charge.strength)
    )
  }
  if (config.forces.collision?.enabled) {
    simulation.force(
      'collision',
      forceCollide<Node>().radius(
        (d) =>
          (config.forces.collision?.radiusMultiplier ?? 1) *
          config.getNodeRadius(d)
      )
    )
  }
  if (config.forces.link?.enabled) {
    simulation.force(
      'link',
      forceLink<Node, Link>(graph.links)
        .id((d) => d.id)
        .distance((d) => config.getLinkLength(d))
        .strength(config.forces.link.strength)
    )
  }
  return simulation.on('tick', () => onTick())
}
