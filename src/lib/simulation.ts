import * as d3 from 'd3'
import { Graph, NodeTypeToken } from '@src/model/graph'
import { GraphNode } from '@src/model/node'
import { GraphLink } from '@src/model/link'
import { GraphConfig } from '@src/model/config'

export type Simulation<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = d3.Simulation<Node, Link>

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
}: DefineSimulationParams<T, Node, Link>): Simulation<T, Node, Link> {
  const simulation = d3.forceSimulation<Node, Link>(graph.nodes)
  if (config.forces.centering?.enabled) {
    const strength = config.forces.centering.strength
    simulation
      .force('x', d3.forceX<Node>(width / 2).strength(strength))
      .force('y', d3.forceY<Node>(height / 2).strength(strength))
  }
  if (config.forces.charge?.enabled) {
    simulation.force(
      'charge',
      d3.forceManyBody<Node>().strength(config.forces.charge.strength)
    )
  }
  if (config.forces.collision?.enabled) {
    simulation.force(
      'collision',
      d3
        .forceCollide<Node>()
        .radius(
          (d) =>
            (config.forces.collision?.radiusMultiplier ?? 1) *
            config.getNodeRadius(d)
        )
    )
  }
  if (config.forces.link?.enabled) {
    simulation.force(
      'link',
      d3
        .forceLink<Node, Link>(graph.links)
        .id((d) => d.id)
        .distance((d) => config.getLinkLength(d))
        .strength(config.forces.link.strength)
    )
  }
  return simulation.on('tick', () => onTick())
}
