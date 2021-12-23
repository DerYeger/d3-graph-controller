import { defineNodeWithDefaults } from '@src/model/node'
import { defineLink } from '@src/model/link'
import { Graph } from '@src/model/graph'
import { defineGraphConfig } from '@src/model/config'

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
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToA = defineLink<TestNodeType>({
  source: b,
  target: a,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToC = defineLink<TestNodeType>({
  source: b,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const cToC = defineLink<TestNodeType>({
  source: c,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const graph: Graph<TestNodeType> = {
  nodes: [a, b, c, d],
  links: [aToB, bToA, bToC, cToC],
}

const config = defineGraphConfig()

export default {
  graph,
  config,
}
