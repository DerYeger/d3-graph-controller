import { LinkFilter } from 'src/config/filter'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export interface InitialGraphSettings<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  includeUnlinked: boolean
  linkFilter: LinkFilter<T, Node, Link>
  nodeTypeFilter?: T[] | undefined
  showLinkLabels: boolean
  showNodeLabels: boolean
}

export function createDefaultInitialGraphSettings<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>(): InitialGraphSettings<T, Node, Link> {
  return {
    includeUnlinked: true,
    linkFilter: () => true,
    nodeTypeFilter: undefined,
    showLinkLabels: true,
    showNodeLabels: true,
  }
}
