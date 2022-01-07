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

The `GraphController` settings that can be changed after initialization can have their initial values configured.
The reference below shows the default configuration.

`linkFilter` receives a link as its parameter.

`nodeTypeFilter` is an array of type tokens.
Only nodes whose type is included in the array will be shown.
If omitted, the graph will include all nodes.

```ts
import { defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  initial: {
    includeUnlinked: true,
    linkFilter: () => true,
    nodeTypeFilter: undefined,
    showLinkLabels: true,
    showNodeLabels: true,
  },
})
```

## Markers

Markers are displayed at the end of links.
Because precise marker dimensions are required for path calculations, it is necessary to provide a lot of data.
Hence, it is recommended to only use the default marker `Markers.Arrow` with customizable size as seen below.

```ts
import { Markers, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  marker:  Markers.Arrow(4),
})
```

## Modifiers

If absolute control is required, `modifiers` can be used to customize the d3-selections.

```ts
import { defineGraphConfig } from 'd3-graph-controller'
import { GraphNode } from 'src/model/node'

const confi = defineGraphConfig({
  modifiers: {
    node: (selection: Selection<SVGCircleElement, GraphNode, SVGGElement, undefined>) => {
      // Define custom callbacks or visuals
    },
  },
})
```

::: warning
Configuring modifiers is generally only required for custom control schemes.
Do not forget to unset `pointerdown` and `contextmenu` if required.
:::

## Position initialization

When a `GraphController` is created, it initializes the positions of nodes that do not have their coordinates set.
The behavior of this initialization can be customized by providing a `PositionInitializer`.
A `PositionInitializer` is a function that receives a `GraphNode` as well as the width and height of a graph and returns two coordinates.
This library provides two `PositionInitializer`s out of the box.

By default, `PositionInitializers.Centered` is used.
Alternatively, `PositionInitializers.Randomized` or custom implementations can be used.

```ts
import { PositionInitializers, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  positionInitializer: PositionInitializers.Randomized,
})
```

## Simulation

The interactivity of the graph is driven by a d3 simulation.
Its forces and behavior can be configured for precise control.

### Alphas

Alpha values determine the *heat* or *activity* of the similation. 
The higher the value, the stronger the simulation will react.
After certain actions, the simulations needs to be restarted.
The alpha values for those restarts can be configured.
Reference the default configuration below for the available options.

```ts
import { GraphNode, defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  alphas: {
    drag: {
      end: 0,
      start: 0.1,
    },
    filter: {
      link: 1,
      type: 0.1,
      unlinked: {
        include: 0.1,
        exclude: 0.1,
      },
    },
    focus: {
      acquire: () => 0.1,
      release: () => 0.1,
    },
    initialize: 1,
    labels: {
      links: {
        hide: 0,
        show: 0,
      },
      nodes: {
        hide: 0,
        show: 0,
      },
    },
    resize: 0.5,
  },
})
```

::: tip
`alphas.focus.acquire` and `alphas.focus.release` receive the (un-)focused node as a parameter.
`alphas.resize` can either be a static `number` or a function receiving a `ResizeContext` as its parameter.
:::

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
import { defineGraphConfig } from 'd3-graph-controller'

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
import { defineGraphConfig } from 'd3-graph-controller'

const confi = defineGraphConfig({
  zoom: {
    initial: 1,
    max: 2,
    min: 0.1,
  },
})
```
