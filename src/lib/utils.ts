export function terminateEvent(event: Event): void {
  event.preventDefault()
  event.stopPropagation()
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function debounce(cb: () => void) {
  let h = 0
  return () => {
    window.clearTimeout(h)
    h = window.setTimeout(() => cb())
  }
}
