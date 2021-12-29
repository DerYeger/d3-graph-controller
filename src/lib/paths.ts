import { GraphConfig } from 'src/config/config'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'
import { Vector } from 'ts-matrix'

// ##################################################
// COMMON
// ##################################################

export interface PathParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  config: GraphConfig<T, Node, Link>
  source: Node
  target: Node
}

export interface ReflexivePathParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  config: GraphConfig<T, Node, Link>
  node: Node
  center: [number, number]
}

function getX<T extends NodeTypeToken, Node extends GraphNode<T>>(
  node: Node
): number {
  return node.x ?? 0
}

function getY<T extends NodeTypeToken, Node extends GraphNode<T>>(
  node: Node
): number {
  return node.y ?? 0
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function rotate(vector: Vector, radians: number): Vector {
  const x = vector.at(0)
  const y = vector.at(1)
  return new Vector([
    x * Math.cos(radians) - y * Math.sin(radians),
    x * Math.sin(radians) + y * Math.cos(radians),
  ])
}

interface VectorData {
  s: Vector
  t: Vector
  dist: number
  norm: Vector
  endNorm: Vector
}

function calculateVectorData<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ source, target }: PathParams<T, Node, Link>): VectorData {
  const s = new Vector([getX(source), getY(source)])
  const t = new Vector([getX(target), getY(target)])
  const diff = copy(t).substract(s)
  const dist = diff.length()
  const norm = diff.scale(1 / dist)
  const endNorm = copy(norm).scale(-1)
  return {
    s,
    t,
    dist,
    norm,
    endNorm,
  }
}

function calculateCenter<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, node }: ReflexivePathParams<T, Node, Link>) {
  const n = new Vector([getX(node), getY(node)])
  const c = new Vector(center)
  if (n.at(0) === c.at(0) && n.at(1) === c.at(1)) {
    // Nodes at the exact center of the Graph should have their reflexive edge above them.
    c.add(new Vector([0, 1]))
  }
  return {
    n,
    c,
  }
}

function calculateSourceAndTarget<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>) {
  const { s, t, norm } = calculateVectorData({ config, source, target })
  const start = s.add(copy(norm).scale(config.getNodeRadius(source) - 1))
  const end = t.substract(
    copy(norm).scale(config.marker.getMarkerPadding(target, config))
  )
  return {
    start,
    end,
  }
}

// ##################################################
// LINE
// ##################################################

function paddedLinePath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(params: PathParams<T, Node, Link>): string {
  const { start, end } = calculateSourceAndTarget(params)
  return `M${start.at(0)},${start.at(1)}
          L${end.at(0)},${end.at(1)}`
}

function lineLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(params: PathParams<T, Node, Link>): string {
  const { start, end } = calculateSourceAndTarget(params)

  const midpoint = end.substract(start).scale(0.5)
  const result = start.add(midpoint)

  return `translate(${result.at(0) - 8},${result.at(1) - 4})`
}

// ##################################################
// ARC
// ##################################################

function paddedArcPath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>): string {
  const { s, t, dist, norm, endNorm } = calculateVectorData({
    config,
    source,
    target,
  })
  const rotation = degreesToRadians(10)
  const start = rotate(norm, -rotation)
    .scale(config.getNodeRadius(source) - 1)
    .add(s)
  const end = rotate(endNorm, rotation)
    .scale(config.getNodeRadius(target))
    .add(t)
    .add(rotate(endNorm, rotation).scale(2 * config.marker.markerBoxSize))
  const arcRadius = 1.2 * dist
  return `M${start.at(0)},${start.at(1)}
          A${arcRadius},${arcRadius},0,0,1,${end.at(0)},${end.at(1)}`
}

// ##################################################
// REFLEXIVE
// ##################################################

function paddedReflexivePath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, config, node }: ReflexivePathParams<T, Node, Link>): string {
  const { n, c } = calculateCenter({ center, config, node })
  const radius = config.getNodeRadius(node)
  const diff = copy(n).substract(c)
  const norm = diff.scale(1 / diff.length())
  const rotation = degreesToRadians(40)
  const start = rotate(norm, rotation)
    .scale(radius - 1)
    .add(n)
  const end = rotate(norm, -rotation)
    .scale(radius)
    .add(n)
    .add(rotate(norm, -rotation).scale(2 * config.marker.markerBoxSize))
  return `M${start.at(0)},${start.at(1)}
          A${radius},${radius},0,1,0,${end.at(0)},${end.at(1)}`
}

function bidirectionalLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>): string {
  const { t, dist, endNorm } = calculateVectorData({ config, source, target })
  const rotation = degreesToRadians(10)
  const end = rotate(endNorm, rotation)
    .scale(0.5 * dist)
    .add(t)
  return `translate(${end.at(0)},${end.at(1)})`
}

function reflexiveLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, config, node }: ReflexivePathParams<T, Node, Link>): string {
  const { n, c } = calculateCenter({ center, config, node })
  const diff = copy(n).substract(c)
  const offset = diff
    .scale(1 / diff.length())
    .scale(3 * config.getNodeRadius(node) + 8)
    .add(n)
  return `translate(${offset.at(0)},${offset.at(1)})`
}

// ##################################################
// EXPORT
// ##################################################

export default {
  line: {
    labelTransform: lineLinkTextTransform,
    path: paddedLinePath,
  },
  arc: {
    labelTransform: bidirectionalLinkTextTransform,
    path: paddedArcPath,
  },
  reflexive: {
    labelTransform: reflexiveLinkTextTransform,
    path: paddedReflexivePath,
  },
}

function copy(vector: Vector): Vector {
  return new Vector(vector.values)
}
