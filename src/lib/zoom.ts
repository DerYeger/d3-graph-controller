import { Selection } from 'd3-selection'
import { D3ZoomEvent, zoom, ZoomBehavior } from 'd3-zoom'

export type Zoom = ZoomBehavior<SVGSVGElement, undefined>

export interface DefineZoomParams {
  canvasContainer: () => Selection<SVGSVGElement, unknown, null, undefined>
  min: number
  max: number
  onZoom: (event: D3ZoomEvent<SVGSVGElement, undefined>) => void
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
