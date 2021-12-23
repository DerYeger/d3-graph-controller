/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { defineGraphConfig, GraphController } from '@src/main'
import TestData, { TestNodeType } from '@test/test-data'

describe('GraphController', () => {
  it('matches the snapshot', () => {
    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container).toMatchSnapshot()
  })

  it('renders nodes', () => {
    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.node').length).toEqual(
      TestData.graph.nodes.length
    )
  })

  it('renders links', () => {
    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.link').length).toEqual(
      TestData.graph.links.length
    )
  })

  it('respect initial configuration', () => {
    const container = document.createElement('div')
    new GraphController(
      container,
      TestData.graph,
      defineGraphConfig<string>({ initial: { nodeTypeFilter: [] } })
    )

    expect(container.querySelectorAll('.node').length).toEqual(0)
    expect(container.querySelectorAll('.link').length).toEqual(0)
  })

  it('can filter by node type', () => {
    const container = document.createElement('div')
    const controller = new GraphController(
      container,
      TestData.graph,
      defineGraphConfig<string>()
    )

    const currentlyExcluded: TestNodeType[] = []

    const checkIncludedNodes = () => {
      expect(container.querySelectorAll('.node').length).toEqual(
        TestData.graph.nodes.filter(
          (node) => !currentlyExcluded.includes(node.type)
        ).length
      )
    }

    checkIncludedNodes()

    controller.filterNodesByType(false, 'second')
    currentlyExcluded.push('second')
    checkIncludedNodes()

    controller.filterNodesByType(false, 'first')
    currentlyExcluded.push('first')
    checkIncludedNodes()

    controller.filterNodesByType(true, 'first')
    currentlyExcluded.pop()
    checkIncludedNodes()

    controller.filterNodesByType(true, 'second')
    currentlyExcluded.pop()
    checkIncludedNodes()
  })

  it('can exclude unlinked', () => {
    const container = document.createElement('div')
    const controller = new GraphController(
      container,
      TestData.graph,
      defineGraphConfig<string>()
    )

    expect(container.querySelectorAll('.node').length).toEqual(
      TestData.graph.nodes.length
    )

    controller.includeUnlinked = false

    expect(container.querySelectorAll('.node').length).toEqual(3)
  })
})
