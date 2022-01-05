export function terminateEvent(event: Event): void {
  event.preventDefault()
  event.stopPropagation()
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
