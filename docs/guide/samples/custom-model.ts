/* eslint-disable import/no-duplicates */
export type CustomType = 'primary' | 'secondary'

import { GraphNode } from 'd3-graph-controller'

export interface CustomNode extends GraphNode<CustomType> {
  radius: number
}

import { GraphLink } from 'd3-graph-controller'

export interface CustomLink extends GraphLink<CustomType, CustomNode> {
  length: number
}

import { defineGraphConfig } from 'd3-graph-controller'

const config = defineGraphConfig<CustomType, CustomNode, CustomLink>({
  getNodeRadius: (node: CustomNode) => node.radius,
  getLinkLength: (link: CustomLink) => link.length,
  forces: {
    centering: {
      strength: (node: CustomNode) => (node.type === 'primary' ? 0.5 : 0.1),
    },
  },
})

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

import { GraphController } from 'd3-graph-controller'

// Any HTMLDivElement can be used as the container
const container = document.getElementById('graph') as HTMLDivElement

const controller = new GraphController(container, graph, config)
