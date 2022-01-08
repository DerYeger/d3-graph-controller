import { NodeTypeToken } from 'src/model/graph'
import { GraphNode } from 'src/model/node'

/**
 * Alpha values when label display changes.
 */
export interface LabelAlphas {
  /**
   * Alpha value when labels are turned off.
   */
  hide: number
  /**
   * Alpha value when labels are turned on.
   */
  show: number
}

/**
 * Context of a resize.
 */
export interface ResizeContext {
  /**
   * The old height.
   */
  oldHeight: number
  /**
   * The old width.
   */
  oldWidth: number
  /**
   * The new height.
   */
  newHeight: number
  /**
   * The new width.
   */
  newWidth: number
}

/**
 * Alpha value configuration for controlling simulation activity.
 */
export interface Alphas<T extends NodeTypeToken, Node extends GraphNode<T>> {
  /**
   * Target alpha values for dragging.
   */
  drag: {
    /**
     * Target alpha when a drag starts.
     * Should be larger than 0.
     */
    start: number
    /**
     * Target alpha when a drag stops.
     * Should generally be 0.
     */
    end: number
  }
  /**
   * Alpha values for filter changes.
   */
  filter: {
    /**
     * Alpha value when the link filter changes.
     */
    link: number
    /**
     * Alpha value when the node type filter changes.
     */
    type: number
    /**
     * Alpha values when the inclusion of unlinked nodes changes.
     */
    unlinked: {
      /**
       * Alpha value when unlinked nodes are included.
       */
      include: number
      /**
       * Alpha value when unlinked nodes are excluded.
       */
      exclude: number
    }
  }
  /**
   * Alpha values when node focus changes.
   */
  focus: {
    /**
     * Alpha value when a node is focused.
     * @param node - The focused node.
     * @returns The alpha value.
     */
    acquire: (node: Node) => number
    /**
     * Alpha value when a node is unfocused.
     * @param node - The unfocused node.
     * @returns The alpha value.
     */
    release: (node: Node) => number
  }
  /**
   * Alpha value when the graph is initialized.
   */
  initialize: number
  /**
   * Alpha values when label display changes.
   */
  labels: {
    /**
     * Alpha values when link label display changes.
     */
    links: LabelAlphas
    /**
     * Alpha values when node label display changes.
     */
    nodes: LabelAlphas
  }
  /**
   * Alpha values when the graph is resized.
   */
  resize: number | ((context: ResizeContext) => number)
}
