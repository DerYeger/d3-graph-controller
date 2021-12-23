/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { defineGraphConfig, GraphController } from '@src/main'
import TestData from '@test/test-data'

describe('GraphController', () => {
  it('renders nodes', () => {
    expect(window).toBeDefined()

    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.node').length).toEqual(
      TestData.graph.nodes.length
    )

    expect(container).toMatchSnapshot()
  })

  it('renders links', () => {
    expect(window).toBeDefined()

    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.link').length).toEqual(
      TestData.graph.links.length
    )

    expect(container).toMatchSnapshot()
  })

  it('respect initial configuration', () => {
    expect(window).toBeDefined()

    const container = document.createElement('div')
    new GraphController(
      container,
      TestData.graph,
      defineGraphConfig<string>({ initial: { nodeTypeFilter: [] } })
    )

    expect(container.querySelectorAll('.node').length).toEqual(0)
    expect(container.querySelectorAll('.link').length).toEqual(0)
  })
})
