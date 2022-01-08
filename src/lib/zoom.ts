import { Selection } from 'd3-selection'
import { D3ZoomEvent, zoom } from 'd3-zoom'
import { Zoom } from 'src/lib/types'

export interface DefineZoomParams {
  readonly canvasContainer: () => Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  >
  readonly min: number
  readonly max: number
  readonly onZoom: (event: D3ZoomEvent<SVGSVGElement, undefined>) => void
}

export function defineZoom({
  canvasContainer,
  min,
  max,
  onZoom,
}: DefineZoomParams): Zoom {
  return zoom<SVGSVGElement, undefined>()
    .scaleExtent([min, max])
    .filter((event) => event.button === 0 || event.touches?.length >= 2)
    .on('start', () => canvasContainer().classed('grabbed', true))
    .on('zoom', (event) => onZoom(event))
    .on('end', () => canvasContainer().classed('grabbed', false))
}
