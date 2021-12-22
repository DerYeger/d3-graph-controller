import * as d3 from 'd3'
import { D3ZoomEvent } from 'd3'

export type Zoom = d3.ZoomBehavior<SVGSVGElement, undefined>

export interface DefineZoomParams {
  canvasContainer: () => d3.Selection<SVGSVGElement, unknown, null, unknown>
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
  return d3
    .zoom<SVGSVGElement, undefined>()
    .scaleExtent([min, max])
    .filter((event) => event.button === 0 || event.touches?.length >= 2)
    .on('start', () => canvasContainer().classed('grabbed', true))
    .on('zoom', (event) => onZoom(event))
    .on('end', () => canvasContainer().classed('grabbed', false))
}
