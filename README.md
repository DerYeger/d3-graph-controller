<h1 align="center">d3-graph-controller</h1>

<p align="center">
  <img src="demo/public/logo.png" alt="Logo" width="48px" height="48px">
</p>

<p align="center">
    A TypeScript library for visualizing and simulating directed, interactive graphs.
</p>

<p align="center">
  <a href="https://github.com/DerYeger/d3-graph-controller/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/DerYeger/d3-graph-controller/CI?label=ci&logo=github&color=#4DC71F">
  </a>
  <a href="https://www.npmjs.com/package/d3-graph-controller">
    <img alt="NPM" src="https://img.shields.io/npm/v/d3-graph-controller?logo=npm">
  </a>

[//]: # (  <a href="https://codecov.io/gh/DerYeger/d3-graph-controller">)

[//]: # (    <img alt="Coverage" src="https://codecov.io/gh/DerYeger/d3-graph-controller/branch/master/graph/badge.svg?token=p35W6u2noe">)

[//]: # (  </a>)
  <a href="https://lgtm.com/projects/g/DerYeger/d3-graph-controller">
    <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/DerYeger/d3-graph-controller?logo=lgtm">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="MIT" src="https://img.shields.io/npm/l/d3-graph-controller?color=%234DC71F">
  </a>
  <a href="https://bundlephobia.com/package/d3-graph-controller">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/d3-graph-controller">
  </a>
</p>

## Features

- 👉 Fully **interactive** dragging, panning, zooming and more. Supports **touch input** and uses multi-touch.
- 🔎 Allows **focusing nodes** by double- or right-clicking and long presses via touch. This will only show the subgraph containing the node.
- 📱 Creating **responsive** graph components is easy thanks the `resize` method.
- 🔧 Behaviour and appearance are highly **configurable**.

## Links

- [Demo](https://graph-controller.yeger.eu/)

## Installation

```bash
# yarn
$ yarn add d3-graph-controller

# npm
$ npm install d3-graph-controller
```

## Usage

```typescript
import { defineGraphConfig, defineLink, defineNodeWithDefaults, Graph, GraphController } from 'd3-graph-controller'
import 'd3-graph-controller/default.css'

const a = defineNodeWithDefaults({
  type: 'node',
  id: 'a',
  label: 'A',
})

const b = defineNodeWithDefaults({
  type: 'node',
  id: 'b',
  label: 'B',
})

const link = defineLink({
  source: a,
  target: b,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const graph: Graph<string> = {
  nodes: [a, b],
  links: [link],
}

// A reference to the native host element, e.g., an HTMLDivElement. This is framework agnostic.
// You may use Angular's @ViewChild, Vue's $ref, plain JavaScript or something else entirely.
const container = TODO

const controller = new GraphController(container, graph, defineGraphConfig())
```

### Style

In addition to the default style, that is available by adding `import 'd3-graph-controller/default.css'` to your project, it is possible to configure font-size and color of graph elements.
Both properties of nodes and links accept valid CSS expressions.
This allows you to use dynamic colors with CSS variables:

```css
:root {
  --color-primary: 'red';
}
```

```ts
import { defineGraphConfig, defineLink, defineNodeWithDefaults, Graph, GraphController } from 'd3-graph-controller'

const a = defineNodeWithDefaults({
  type: 'node',
  id: 'a',
  label: 'A',
  color: 'var(--color-primary)'
})
```

## Development

```bash
# install dependencies
$ yarn install

# build for production
$ yarn build

# lint project files
$ yarn lint

# serve demo
$ yarn demo:serve

# build demo for production
$ yarn demo:build
```

## License

[MIT](./LICENSE) - Copyright &copy; Jan Müller
