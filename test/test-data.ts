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

const config = defineGraphConfig()

export default {
  graph,
  config,
}
