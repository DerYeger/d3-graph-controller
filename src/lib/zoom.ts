import { Selection } from 'd3-selection'
import { D3ZoomEvent, zoom } from 'd3-zoom'
import { GraphConfig } from 'src/config/config'
import { Zoom } from 'src/lib/types'
import { NodeTypeToken } from 'src/model/graph'
import { GraphLink } from 'src/model/link'
import { GraphNode } from 'src/model/node'

export interface DefineZoomParams<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
> {
  readonly canvasContainer: () => Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  >
  readonly config: GraphConfig<T, Node, Link>
  readonly min: number
  readonly max: number
  readonly onZoom: (event: D3ZoomEvent<SVGSVGElement, undefined>) => void
}

export function defineZoom<
  T extends NodeTypeToken,
  Node extends GraphNode<T>,
  Link extends GraphLink<T, Node>
>({
  canvasContainer,
  config,
  min,
  max,
  onZoom,
}: DefineZoomParams<T, Node, Link>): Zoom {
  const z = zoom<SVGSVGElement, undefined>()
    .scaleExtent([min, max])
    .filter((event) => event.button === 0 || event.touches?.length >= 2)
    .on('start', () => canvasContainer().classed('grabbed', true))
    .on('zoom', (event) => onZoom(event))
    .on('end', () => canvasContainer().classed('grabbed', false))

  config.modifiers.zoom?.(z)

  return z
}
