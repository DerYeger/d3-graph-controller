import { defineGraphConfig } from 'src/config/config'
import { defineGraph, Graph } from 'src/model/graph'
import { defineLink } from 'src/model/link'
import { defineNodeWithDefaults } from 'src/model/node'

export type TestNodeType = 'first' | 'second'

const a = defineNodeWithDefaults<TestNodeType>({
  type: 'first',
  id: 'a',
  label: 'A',
})

const b = defineNodeWithDefaults<TestNodeType>({
  type: 'first',
  id: 'b',
  label: 'B',
})

const c = defineNodeWithDefaults<TestNodeType>({
  type: 'first',
  id: 'c',
  label: 'C',
})

const d = defineNodeWithDefaults<TestNodeType>({
  type: 'second',
  id: 'd',
  label: 'D',
})

const aToB = defineLink<TestNodeType>({
  source: a,
  target: b,
  color: 'gray',
  label: 'aToB',
  labelColor: 'black',
  showLabel: false,
})

const bToA = defineLink<TestNodeType>({
  source: b,
  target: a,
  color: 'gray',
  label: 'bToA',
  labelColor: 'black',
  showLabel: false,
})

const bToC = defineLink<TestNodeType>({
  source: b,
  target: c,
  color: 'gray',
  label: 'bToC',
  labelColor: 'black',
  showLabel: false,
})

const cToC = defineLink<TestNodeType>({
  source: c,
  target: c,
  color: 'gray',
  label: 'cToC',
  labelColor: 'black',
  showLabel: false,
})

const graph: Graph<TestNodeType> = defineGraph<TestNodeType>({
  nodes: [a, b, c, d],
  links: [aToB, bToA, bToC, cToC],
})

const config = defineGraphConfig<TestNodeType>()

export default {
  graph,
  config,
}
