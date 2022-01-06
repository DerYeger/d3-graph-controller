import { select } from 'd3-selection'
import { D3ZoomEvent } from 'd3-zoom'
import { GraphConfig } from 'src/config/config'
import { LinkFilter } from 'src/config/filter'
import { Canvas, defineCanvas, updateCanvasTransform } from 'src/lib/canvas'
import { defineDrag, Drag } from 'src/lib/drag'
import { filterGraph } from 'src/lib/filter'
import {
  createLinks,
  defineLinkSelection,
  LinkSelection,
  updateLinks,
} from 'src/lib/link'
import {
  createMarkers,
  defineMarkerSelection,
  MarkerSelection,
} from 'src/lib/marker'
import {
  createNodes,
  defineNodeSelection,
  NodeSelection,
  updateNodes,
} from 'src/lib/node'
import { defineSimulation, GraphSimulation } from 'src/lib/simulation'
import { isNumber } from 'src/lib/utils'
import { defineZoom, Zoom } from 'src/lib/zoom'
import { Graph, NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export class GraphController<
  T extends NodeTypeToken = NodeTypeToken,
  Node extends GraphNode<T> = GraphNode<T>,
  Link extends GraphLink<T, Node> = GraphLink<T, Node>
> {
  public readonly nodeTypes: T[]
  private _nodeTypeFilter: T[]
  private _includeUnlinked = true

  private _linkFilter: LinkFilter<T, Node, Link> = () => true

  private _showLinkLabels = true
  private _showNodeLabels = true

  private filteredGraph!: Graph<T, Node, Link>

  private width = 0
  private height = 0

  private simulation: GraphSimulation<T, Node, Link> | undefined

  private canvas: Canvas | undefined
  private linkSelection: LinkSelection<T, Node, Link> | undefined
  private nodeSelection: NodeSelection<T, Node> | undefined
  private markerSelection: MarkerSelection | undefined

  private zoom: Zoom | undefined
  private drag: Drag<T, Node> | undefined

  private xOffset = 0
  private yOffset = 0
  private scale: number

  private focusedNode: Node | undefined = undefined

  public constructor(
    private readonly container: HTMLDivElement,
    private readonly graph: Graph<T, Node, Link>,
    private readonly config: GraphConfig<T, Node, Link>
  ) {
    this.scale = this.config.zoom.initial

    this.resetView()

    this.graph.nodes.forEach((node) => {
      const [x, y] = config.positionInitializer(
        node,
        this.effectiveWidth,
        this.effectiveHeight
      )
      node.x = node.x ?? x
      node.y = node.y ?? y
    })

    this.nodeTypes = [...new Set(graph.nodes.map((d) => d.type))]
    this._nodeTypeFilter = [...this.nodeTypes]

    if (this.config.initial) {
      const {
        includeUnlinked,
        nodeTypeFilter,
        linkFilter,
        showLinkLabels,
        showNodeLabels,
      } = this.config.initial
      this._includeUnlinked = includeUnlinked ?? this._includeUnlinked
      this._showLinkLabels = showLinkLabels ?? this._showLinkLabels
      this._showNodeLabels = showNodeLabels ?? this._showNodeLabels
      this._nodeTypeFilter = nodeTypeFilter ?? this._nodeTypeFilter
      this._linkFilter = linkFilter ?? this._linkFilter
    }

    this.filterGraph(undefined)
    this.initGraph(true)
    this.restart(this.config.alphas.initialize)
  }

  public get nodeTypeFilter(): T[] {
    return this._nodeTypeFilter
  }

  public get includeUnlinked(): boolean {
    return this._includeUnlinked
  }

  public set includeUnlinked(value: boolean) {
    this._includeUnlinked = value
    this.filterGraph(this.focusedNode)
    const { include, exclude } = this.config.alphas.filter.unlinked
    const alpha = value ? include : exclude
    this.restart(alpha)
  }

  public set linkFilter(value: LinkFilter<T, Node, Link>) {
    this._linkFilter = value
    this.filterGraph(this.focusedNode)
    this.restart(this.config.alphas.filter.link)
  }

  public get showNodeLabels(): boolean {
    return this._showNodeLabels
  }

  public set showNodeLabels(value: boolean) {
    this._showNodeLabels = value
    const { hide, show } = this.config.alphas.labels.nodes
    const alpha = value ? show : hide
    this.restart(alpha)
  }

  public get showLinkLabels(): boolean {
    return this._showLinkLabels
  }

  public set showLinkLabels(value: boolean) {
    this._showLinkLabels = value
    const { hide, show } = this.config.alphas.labels.links
    const alpha = value ? show : hide
    this.restart(alpha)
  }

  private get effectiveWidth(): number {
    return this.width / this.scale
  }

  private get effectiveHeight(): number {
    return this.height / this.scale
  }

  public resize(): void {
    const oldWidth = this.width
    const oldHeight = this.height
    const newWidth = this.container.offsetWidth
    const newHeight = this.container.offsetHeight
    const widthDiffers = oldWidth.toFixed() !== newWidth.toFixed()
    const heightDiffers = oldHeight.toFixed() !== newHeight.toFixed()

    if (!widthDiffers && !heightDiffers) {
      return
    }

    this.resetView()
    this.initGraph(false)
    const alpha = this.config.alphas.resize
    this.restart(
      isNumber(alpha)
        ? alpha
        : alpha({ oldWidth, oldHeight, newWidth, newHeight })
    )
  }

  public restart(alpha: number): void {
    this.markerSelection = createMarkers({
      config: this.config,
      graph: this.filteredGraph,
      selection: this.markerSelection,
    })

    this.linkSelection = createLinks({
      graph: this.filteredGraph,
      selection: this.linkSelection,
      showLabels: this._showLinkLabels,
    })

    this.nodeSelection = createNodes({
      config: this.config,
      drag: this.drag,
      graph: this.filteredGraph,
      modifier: this.config.modifiers.node,
      onNodeContext: (d) => this.toggleNodeFocus(d),
      onNodeSelected: this.config.callbacks.nodeClicked,
      selection: this.nodeSelection,
      showLabels: this._showNodeLabels,
    })

    this.simulation?.stop()
    this.simulation = defineSimulation({
      config: this.config,
      graph: this.filteredGraph,
      height: this.effectiveHeight,
      onTick: () => this.onTick(),
      width: this.effectiveWidth,
    })
      .alpha(alpha)
      .restart()
  }

  public filterNodesByType(include: boolean, nodeType: T) {
    if (include) {
      this._nodeTypeFilter.push(nodeType)
    } else {
      this._nodeTypeFilter = this._nodeTypeFilter.filter(
        (type) => type !== nodeType
      )
    }
    this.filterGraph(this.focusedNode)
    this.restart(this.config.alphas.filter.type)
  }

  public shutdown(): void {
    if (this.focusedNode !== undefined) {
      this.focusedNode.isFocused = false
      this.focusedNode = undefined
    }
    this.simulation?.stop()
  }

  private initGraph(isInitial: boolean): void {
    this.zoom = defineZoom({
      canvasContainer: () => select(this.container).select('svg'),
      min: this.config.zoom.min,
      max: this.config.zoom.max,
      onZoom: (event) => this.onZoom(event),
    })
    this.canvas = defineCanvas({
      applyZoom: !isInitial || this.scale !== 1,
      container: select(this.container),
      offset: [this.xOffset, this.yOffset],
      scale: this.scale,
      zoom: this.zoom,
    })
    this.applyZoom()
    this.linkSelection = defineLinkSelection(this.canvas)
    this.nodeSelection = defineNodeSelection(this.canvas)
    this.markerSelection = defineMarkerSelection(this.canvas)
    this.drag = defineDrag({
      onDragStart: () =>
        this.simulation?.alphaTarget(this.config.alphas.drag.start).restart(),
      onDragEnd: () =>
        this.simulation?.alphaTarget(this.config.alphas.drag.end).restart(),
    })
  }

  private onTick(): void {
    updateNodes(this.nodeSelection)

    updateLinks({
      config: this.config,
      graph: this.filteredGraph,
      graphHeight: this.height,
      graphWidth: this.width,
      selection: this.linkSelection,
    })
  }

  private resetView(): void {
    this.simulation?.stop()
    select(this.container).selectChildren().remove()
    this.zoom = undefined
    this.canvas = undefined
    this.linkSelection = undefined
    this.nodeSelection = undefined
    this.markerSelection = undefined
    this.simulation = undefined
    this.width = this.container.getBoundingClientRect().width
    this.height = this.container.getBoundingClientRect().height
  }

  private onZoom(event: D3ZoomEvent<SVGSVGElement, undefined>): void {
    this.xOffset = event.transform.x
    this.yOffset = event.transform.y
    this.scale = event.transform.k
    this.applyZoom()
  }

  private applyZoom() {
    updateCanvasTransform({
      canvas: this.canvas,
      scale: this.scale,
      xOffset: this.xOffset,
      yOffset: this.yOffset,
    })
  }

  private toggleNodeFocus(node: Node): void {
    if (node.isFocused) {
      this.filterGraph(undefined)
      this.restart(this.config.alphas.focus.release(node))
    } else {
      this.focusNode(node)
    }
  }

  private focusNode(node: Node): void {
    this.filterGraph(node)
    this.restart(this.config.alphas.focus.acquire(node))
  }

  private filterGraph(nodeToFocus?: Node): void {
    if (this.focusedNode !== undefined) {
      this.focusedNode.isFocused = false
      this.focusedNode = undefined
    }

    if (
      nodeToFocus !== undefined &&
      this._nodeTypeFilter.includes(nodeToFocus.type)
    ) {
      nodeToFocus.isFocused = true
      this.focusedNode = nodeToFocus
    }

    this.filteredGraph = filterGraph({
      graph: this.graph,
      filter: this._nodeTypeFilter,
      focusedNode: this.focusedNode,
      includeUnlinked: this._includeUnlinked,
      linkFilter: this._linkFilter,
    })
  }
}
