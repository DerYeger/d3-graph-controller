import { SimulationNodeDatum } from 'd3-force'
import { NodeTypeToken } from 'src/model/graph'

/**
 * Node representing a datum of a graph.
 */
export interface GraphNode<T extends NodeTypeToken = NodeTypeToken>
  extends SimulationNodeDatum {
  /**
   * The type of the node.
   */
  readonly type: T
  /**
   * The ID of the node.
   */
  readonly id: string
  /**
   * The color of the node.
   * Can be any valid CSS expression.
   */
  readonly color: string
  /**
   * The label of the node.
   */
  readonly label: string
  /**
   * The color of the node's label.
   * Can be any valid CSS expression.
   */
  readonly labelColor: string
  /**
   * The focus state of a node.
   * Warning: Used for internal logic. Should not be set manually!
   */
  isFocused: boolean
  /**
   * The font size of a node.
   * Can be any valid CSS expression.
   */
  readonly fontSize: string
  /**
   * The x-coordinate of a node.
   */
  x?: number | undefined
  /**
   * The y-coordinate of a node.
   */
  y?: number | undefined
  /**
   * The fixed x-coordinate of a node.
   * If set, the node will not be simulated.
   */
  fx?: number | undefined
  /**
   * The fixed y-coordinate of a node.
   * If set, the node will not be simulated.
   */
  fy?: number | undefined
  /**
   * Timestamp of the node's last interaction.
   * Warning: Used for internal logic. Should not be set manually!
   */
  lastInteractionTimestamp?: number | undefined
}

/**
 * Define a node with type inference.
 * @param data - The data of the node.
 */
export function defineNode<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>
>(data: Node): Node {
  return {
    ...data,
    isFocused: false,
    lastInteractionTimestamp: undefined,
  }
}

/**
 * Define a node with type inference and some default values.
 * @param data - The data of the node.
 */
export function defineNodeWithDefaults<T extends NodeTypeToken = NodeTypeToken>(
  data: Partial<GraphNode<T>> & Pick<GraphNode, 'id' | 'type'>
): GraphNode<T> {
  return {
    ...nodeDefaults,
    ...data,
  }
}

const nodeDefaults: Omit<GraphNode, 'id' | 'type'> = {
  color: 'lightgray',
  label: '',
  fontSize: '1rem',
  isFocused: false,
  labelColor: 'black',
}
