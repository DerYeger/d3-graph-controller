import { defineNodeWithDefaults } from '@src/model/node'
import { defineLink } from '@src/model/link'
import { Graph } from '@src/model/graph'
import { defineGraphConfig } from '@src/model/config'

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

const c = defineNodeWithDefaults({
  type: 'node',
  id: 'c',
  label: 'C',
})

const aToB = defineLink({
  source: a,
  target: b,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToA = defineLink({
  source: b,
  target: a,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const bToC = defineLink({
  source: b,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const cToC = defineLink({
  source: c,
  target: c,
  color: 'gray',
  label: '',
  labelColor: 'black',
  showLabel: false,
})

const graph: Graph<string> = {
  nodes: [a, b, c],
  links: [aToB, bToA, bToC, cToC],
}

const config = defineGraphConfig()

export default {
  graph,
  config,
}
