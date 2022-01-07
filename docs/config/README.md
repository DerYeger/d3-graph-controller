---
editLink: true
contributors: false
---

# Config

Both behavior and visuals of graphs can be customized by passing additional parameters to `defineGraphConfig()`.

## Resizing

Graphs can be resized to fit their container.
This can either happen manually by calling a `GraphController`'s `resize` method or automatically by setting `autoResize` to `true`.

```ts
import { defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  autoResize: true,
})
```

## Callbacks

The following callbacks can be configured.

### nodeClicked

The `nodeClicked` callback is called whenever a node is double-clicked (using the primary mouse button) or double-tapped in a short time.
If set, the default behavior of focusing a node is disabled.

```ts
import { GraphNode, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  callbacks: {
    nodeClicked: (node: GraphNode) => console.log(node.id),
  },
})
```

## Node radius

The radius of nodes is used for their visualization as well as the underlying simulation.
It can be configured using the `getNodeRadius` property of the config.
You can use instances to calculate dynamic node radii.

```ts
import { GraphNode, defineGraphConfig } from 'd3-graph-controller'

type CustomNode = GraphNode & { radius: number }

const confi = defineGraphConfig<string, CustomNode>({
  getNodeRadius: (node: CustomNode) => customNode.radius,
})
```

## Initial settings

## Markers

## Modifiers

## Position initialization

## Simulation

The interactivity of the graph is driven by a d3 simulation.

### Alphas

### Forces

Forces can be customized or disabled as required.
Some forces provide additional customizability.
Reference the configuration below, which matches the default values.

::: tip
Settings `forces.collision.radiusMultiplier` to a higher value can drastically reduce the number of intersecting edges.
:::

All `strength` properties can also be functions that receive the subject of the force as a parameter for individual strength.
Except `forces.link`, the subject is always a `GraphNode` (or the custom type used).

```ts
import { GraphNode, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  forces: {
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
  },
})
```

### Link length

Link length is used to determine the length of links for the simulation.
Similar to node radii, link length can be configured on a per-link basis.
Once again, custom link types can be used to provide the required data.

::: warning
This property will be moved to `forces.link` in a future release.
:::

```ts
import { GraphLink, GraphNode, defineGraphConfig } from 'd3-graph-controller'

type CustomLink = GraphLink & { length: number }

const confi = defineGraphConfig<string, GraphNode, CustomLink>({
  getLinkLength: (link: CustomLink) => link.length,
})
```

## Zoom

For the zooming functionality, the initial value as well as its boundaries can be configured as seen below.

::: warning
Currently, there's no validation of the values.
The `min` value must be larger than 0 and the initial value must be withing the range `[min, max]`.
:::

```ts
import { GraphLink, GraphNode, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig<string, GraphNode, CustomLink>({
  zoom: {
    initial: 1,
    max: 2,
    min: 0.1,
  },
})
```
