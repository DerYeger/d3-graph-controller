---
editLink: true
contributors: false
---

# Guide

## Installation

<CodeGroup>
  <CodeGroupItem title="Yarn" active>

```bash:no-line-numbers
yarn add d3-graph-controller
```
  </CodeGroupItem>
  <CodeGroupItem title="npm">

```bash:no-line-numbers
npm install d3-graph-controller
```
  </CodeGroupItem>
</CodeGroup>

## Usage

The data model of a graph can be customized to fit any need.
The following sections show a model with two node types, `primary` and `secondary`, custom node radius and link length as well as dynamic force strength.

### Type tokens

First, define the types of nodes the graph may contain.

```ts
export type CustomType = 'primary' | 'secondary'
```

### Node

Then you can enhance the `GraphNode` interface with custom properties that can be accessed later on.

```ts
import { GraphNode } from 'd3-graph-controller'

export interface CustomNode extends GraphNode<CustomType> {
  radius: number
}
```

### Link

Analogous to nodes, `GraphLink` can be extended.
While not shown in the example below, `GraphLink` can have specific node types for `source` and `target`.

```ts
import { GraphLink } from 'd3-graph-controller'

export interface CustomLink extends GraphLink<CustomType, CustomNode> {
  length: number
}
```

### Config

The config can then use the custom types.

```ts
import { defineGraphConfig } from 'd3-graph-controller'

const config = defineGraphConfig<CustomType, CustomNode, CustomLink>({
  getNodeRadius: (node: CustomNode) => customNode.radius,
  getLinkLength: (link: CustomLink) => link.length,
  forces: {
    centering: {
      strength: (node: CustomNode) => node.type === 'primary' ? 0.5 : 0.1,
    }
  }
})
```

### Model

The actual model can be created using the helper methods seen below.
They are type safe and support custom properties.

```ts
import { Graph, defineLink, defineNode } from 'd3-graph-controller'

const a = defineNode<CustomType, CustomNode>({
  id: 'a',
  type: 'primary',
  fontSize: '1rem',
  isFocused: false,
  color: 'green',
  label: 'A',
  labelColor: 'black',
  radius: 64,
})

const b = defineNode<CustomType, CustomNode>({
  id: 'b',
  type: 'secondary',
  fontSize: '1rem',
  isFocused: false,
  color: 'blue',
  label: 'B',
  labelColor: 'black',
  radius: 32,
})

const aToB = defineLink<CustomType, CustomNode, CustomNode, CustomLink>({
  source: a,
  target: b,
  color: 'red',
  label: '128',
  labelColor: 'black',
  showLabel: true,
  length: 128,
})

const graph: Graph<CustomType, CustomNode, CustomLink> = {
  nodes: [a, b],
  links: [aToB],
}
```

### Controller

The last step is putting it all together and creating the controller.

```ts
import { GraphController } from 'd3-graph-controller'

// Any HtmlDivElement can be used as the container
const container = document.getElementById('graph')

const controller = new GraphController(container, graph, config)
```

::: tip
Do not forget to call `controller.shutdown()` when the graph is no longer required or your component will be destroyed.
:::

## Styling

The library provides default styles, which need to be imported manually.

```ts
import 'd3-graph-controller/default.css'
```

In addition, the properties `color` and `fontSize` of nodes and links accept any valid CSS value.
This allows you to use dynamic colors with CSS variables.

```css
:root {
  --color-primary: 'red';
}
```

```ts
import { defineNodeWithDefaults } from 'd3-graph-controller'

const a = defineNodeWithDefaults({
  type: 'node',
  id: 'a',
  label: 'A',
  color: 'var(--color-primary)',
  fontSize: '2rem',
})
```

For customization of the default theme, the custom CSS property `--color-node-stroke` can be used.
