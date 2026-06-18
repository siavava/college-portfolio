interface UseResizablePanelOptions {
  key: string
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
}

export function useResizablePanel(options: UseResizablePanelOptions) {
  const {
    key,
    defaultWidth = 280,
    minWidth = 180,
    maxWidth = 480,
  } = options

  const width = useLocalStorage(key, defaultWidth)
  const isDragging = ref(false)

  function onPointerDown(e: PointerEvent) {
    e.preventDefault()
    isDragging.value = true
    const startX = e.clientX
    const startWidth = width.value

    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX
      width.value = Math.min(maxWidth, Math.max(minWidth, startWidth + delta))
    }

    const onPointerUp = () => {
      isDragging.value = false
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerup", onPointerUp)
    }

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)
  }

  return { width, isDragging, onPointerDown }
}
