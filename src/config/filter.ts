import type { NodeTypeToken } from 'src/model/graph'
import type { GraphLink } from 'src/model/link'
import type { GraphNode } from 'src/model/node'

/**
 * Link filter.
 * Receives a link and returns whether the link should be included or not.
 */
export type LinkFilter<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> = (link: Link) => boolean
