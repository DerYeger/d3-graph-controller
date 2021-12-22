export function terminateEvent(event: Event): void {
  event.preventDefault()
  event.stopPropagation()
}
