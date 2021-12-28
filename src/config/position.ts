import { NodeTypeToken } from '@src/model/graph'
import { GraphNode } from '@src/model/node'

export type PositionInitializer<
  T extends NodeTypeToken,
  Node extends GraphNode<T>
> = (node: Node, width: number, height: number) => [number, number]

const Centered: PositionInitializer<NodeTypeToken, GraphNode> = (
  _,
  width,
  height
) => [width / 2, height / 2]

const Randomized: PositionInitializer<NodeTypeToken, GraphNode> = (
  _,
  width,
  height
) => [randomInRange(0, width), randomInRange(0, height)]

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export const PositionInitializers = {
  Centered,
  Randomized,
}
