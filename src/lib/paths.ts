import { GraphConfig } from '@src/config/config'
import { NodeTypeToken } from '@src/model/graph'
import { GraphLink } from '@src/model/link'
import { GraphNode } from '@src/model/node'
import { Matrix } from 'ml-matrix'

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

function rotate(vector: Matrix, radians: number): Matrix {
  const x = vector.get(0, 0)
  const y = vector.get(0, 1)
  return new Matrix([
    [
      x * Math.cos(radians) - y * Math.sin(radians),
      x * Math.sin(radians) + y * Math.cos(radians),
    ],
  ])
}

// ##################################################
// LINE
// ##################################################

function calculateSourceAndTarget<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>) {
  const deltaX = getX(target) - getX(source)
  const deltaY = getY(target) - getY(source)
  const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const normX = deltaX / dist
  const normY = deltaY / dist
  const sourceX = getX(source) + (config.getNodeRadius(source) - 1) * normX
  const sourceY = getY(source) + (config.getNodeRadius(source) - 1) * normY
  const targetX =
    getX(target) - config.marker.getMarkerPadding(target, config) * normX
  const targetY =
    getY(target) - config.marker.getMarkerPadding(target, config) * normY

  return {
    sourceX,
    sourceY,
    targetX,
    targetY,
  }
}

function paddedLinePath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(params: PathParams<T, Node, Link>): string {
  const { sourceX, sourceY, targetX, targetY } =
    calculateSourceAndTarget(params)
  return `M${sourceX},${sourceY}
          L${targetX},${targetY}`
}

function lineLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(params: PathParams<T, Node, Link>): string {
  const { sourceX, sourceY, targetX, targetY } =
    calculateSourceAndTarget(params)

  const start = new Matrix([[sourceX, sourceY]])
  const diff = new Matrix([[targetX - sourceX, targetY - sourceY]]).multiply(
    0.5
  )
  const result = start.add(diff)

  return `translate(${result.get(0, 0) - 8},${result.get(0, 1) - 4})`
}

// ##################################################
// ARC
// ##################################################

function paddedArcPath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>): string {
  const s = new Matrix([[getX(source), getY(source)]])
  const t = new Matrix([[getX(target), getY(target)]])
  const diff = Matrix.subtract(t, s)
  const dist = diff.norm('frobenius')
  const norm = diff.divide(dist)
  const rotation = degreesToRadians(10)
  const start = rotate(norm, -rotation)
    .multiply(config.getNodeRadius(source) - 1)
    .add(s)
  const endNorm = Matrix.multiply(norm, -1)
  const end = rotate(endNorm, rotation)
    .multiply(config.getNodeRadius(target))
    .add(t)
    .add(rotate(endNorm, rotation).multiply(2 * config.marker.markerBoxSize))
  const arcRadius = 1.2 * dist
  return `M${start.get(0, 0)},${start.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${end.get(0, 0)},${end.get(0, 1)}`
}

// ##################################################
// REFLEXIVE
// ##################################################

function calculateCenter<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, node }: ReflexivePathParams<T, Node, Link>) {
  const n = new Matrix([[getX(node), getY(node)]])
  const c = new Matrix([center])
  if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
    // Nodes at the exact center of the Graph should have their reflexive edge above them.
    c.add([[0, 1]])
  }
  return {
    n,
    c,
  }
}

function paddedReflexivePath<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, config, node }: ReflexivePathParams<T, Node, Link>): string {
  const { n, c } = calculateCenter({ center, config, node })
  const radius = config.getNodeRadius(node)
  const diff = Matrix.subtract(n, c)
  const norm = diff.divide(diff.norm('frobenius'))
  const rotation = degreesToRadians(40)
  const start = rotate(norm, rotation)
    .multiply(radius - 1)
    .add(n)
  const end = rotate(norm, -rotation)
    .multiply(radius)
    .add(n)
    .add(rotate(norm, -rotation).multiply(2 * config.marker.markerBoxSize))
  return `M${start.get(0, 0)},${start.get(0, 1)}
          A${radius},${radius},0,1,0,${end.get(0, 0)},${end.get(0, 1)}`
}

function bidirectionalLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ config, source, target }: PathParams<T, Node, Link>): string {
  const s = new Matrix([[getX(source), getY(source)]])
  const t = new Matrix([[getX(target), getY(target)]])
  const maxRadius = Math.max(
    config.getNodeRadius(source),
    config.getNodeRadius(target)
  )
  const diff = Matrix.subtract(t, s)
  const dist = diff.norm('frobenius')
  const norm = diff.divide(dist)
  const rotation = degreesToRadians(10)
  const endNorm = Matrix.multiply(norm, -1)
  const translation = 0.3 * dist > 2 * maxRadius ? 0.3 * dist : 2 * maxRadius
  const end = rotate(endNorm, rotation).multiply(translation).add(t)
  return `translate(${end.get(0, 0)},${end.get(0, 1)})`
}

function reflexiveLinkTextTransform<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({ center, config, node }: ReflexivePathParams<T, Node, Link>): string {
  const { n, c } = calculateCenter({ center, config, node })
  const diff = Matrix.subtract(n, c)
  const offset = diff
    .divide(diff.norm('frobenius'))
    .multiply(3 * config.getNodeRadius(node) + 8)
    .add(n)
  return `translate(${offset.get(0, 0)},${offset.get(0, 1)})`
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
