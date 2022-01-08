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

@[code{2-2}](samples/custom-model.ts)

### Node

Then you can enhance the `GraphNode` interface with custom properties that can be accessed later on.

@[code{4-8}](samples/custom-model.ts)

### Link

Analogous to nodes, `GraphLink` can be extended.
While not shown in the example below, `GraphLink` can have specific node types for `source` and `target`.

@[code{10-14}](samples/custom-model.ts)

### Config

The config can then use the custom types.

@[code{16-26}](samples/custom-model.ts)

### Model

The actual model can be created using the helper methods seen below.
They are type safe and support custom properties.

@[code{28-65}](samples/custom-model.ts)

### Controller

The last step is putting it all together and creating the controller.

@[code{67-72}](samples/custom-model.ts)

::: tip
Do not forget to call `controller.shutdown()` when the graph is no longer required or your component will be destroyed.
:::

## Styling

The library provides default styles, which need to be imported manually.

@[code{2-2}](samples/styling.ts)

In addition, the properties `color` and `fontSize` of nodes and links accept any valid CSS value.
This allows you to use dynamic colors with CSS variables.

@[code](samples/styling.css)

@[code](samples/styling.ts)

For customization of the default theme, the custom CSS property `--color-node-stroke` can be used.
