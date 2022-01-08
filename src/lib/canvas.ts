import { zoomIdentity } from 'd3-zoom'
import { Canvas, GraphHost, Zoom } from 'src/lib/types'
import { terminateEvent } from 'src/lib/utils'

export interface DefineCanvasParams {
  applyZoom: boolean
  container: GraphHost
  offset: [number, number]
  onDoubleClick?: (event: PointerEvent) => void
  onPointerMoved?: (event: PointerEvent) => void
  onPointerUp?: (event: PointerEvent) => void
  scale: number
  zoom: Zoom
}

export function defineCanvas({
  applyZoom,
  container,
  onDoubleClick,
  onPointerMoved,
  onPointerUp,
  offset: [xOffset, yOffset],
  scale,
  zoom,
}: DefineCanvasParams): Canvas {
  const svg = container
    .classed('graph', true)
    .append('svg')
    .attr('height', '100%')
    .attr('width', '100%')
    .call(zoom)
    .on('contextmenu', (event: MouseEvent) => terminateEvent(event))
    .on('dblclick', (event: PointerEvent) => onDoubleClick?.(event))
    .on('dblclick.zoom', null)
    .on('pointermove', (event: PointerEvent) => onPointerMoved?.(event))
    .on('pointerup', (event: PointerEvent) => onPointerUp?.(event))
    .style('cursor', 'grab')

  if (applyZoom) {
    svg.call(
      zoom.transform,
      zoomIdentity.translate(xOffset, yOffset).scale(scale)
    )
  }

  return svg.append('g')
}

export interface UpdateCanvasParams {
  canvas?: Canvas | undefined
  scale: number
  xOffset: number
  yOffset: number
}

export function updateCanvasTransform({
  canvas,
  scale,
  xOffset,
  yOffset,
}: UpdateCanvasParams): void {
  canvas?.attr('transform', `translate(${xOffset},${yOffset})scale(${scale})`)
}
