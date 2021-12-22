import { defineNode, nodeDefaults, Graph } from 'd3-graph-controller'

export const demoGraph: Graph = {
  nodes: [
    defineNode({
      ...nodeDefaults,
      type: 'node',
      id: '0',
      color: 'green',
      label: 'Test',
    }),
  ],
  links: [],
}
