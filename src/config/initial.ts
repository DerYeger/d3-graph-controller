import type { LinkFilter } from 'src/config/filter'
import type { NodeTypeToken } from 'src/model/graph'
import type { GraphLink } from 'src/model/link'
import type { GraphNode } from 'src/model/node'

/**
 * Initial settings of a controller.
 */
export interface InitialGraphSettings<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  /**
   * Whether nodes without incoming or outgoing links will be shown or not.
   */
  readonly includeUnlinked: boolean
  /**
   * Link filter that decides whether links should be included or not.
   */
  readonly linkFilter: LinkFilter<T, Node, Link>
  /**
   * Node types that should be included.
   * If undefined, all node types will be included.
   */
  readonly nodeTypeFilter?: T[] | undefined
  /**
   * Whether link labels are shown or not.
   */
  readonly showLinkLabels: boolean
  /**
   * Whether node labels are shown or not.
   */
  readonly showNodeLabels: boolean
}

/**
 * Create default initial settings.
 */
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
