/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { GraphController } from '@src/main'
import TestData from '@test/test-data'

describe('GraphController', () => {
  it('renders nodes', () => {
    expect(window).toBeDefined()

    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.node').length).toEqual(2)

    expect(container).toMatchSnapshot()
  })

  it('renders links', () => {
    expect(window).toBeDefined()

    const container = document.createElement('div')
    new GraphController(container, TestData.graph, TestData.config)

    expect(container.querySelectorAll('.link').length).toEqual(1)

    expect(container).toMatchSnapshot()
  })
})
