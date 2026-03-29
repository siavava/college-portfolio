/**
 * Manages multi-panel layout visibility.
 * Tracks available width and registered menu panels,
 * determines which panels are visible (prioritizing deepest).
 */

export interface PanelRegistration {
  id: string
  depth: number
  width: number
}

export interface MultiPanelContext {
  availableWidth: Ref<number>
  panels: Ref<PanelRegistration[]>
  visibleIds: ComputedRef<Set<string>>
  isStacked: ComputedRef<boolean>
  register: (panel: PanelRegistration) => void
  unregister: (id: string) => void
  updateWidth: (id: string, width: number) => void
}

export const PANEL_LAYOUT_KEY = Symbol('panel-layout') as InjectionKey<MultiPanelContext>

const SIDEBAR_WIDTH = 256
const TWO_PANELS_MIN = 1400
const ONE_PANEL_MIN = 1080

export function useMultiPanelLayout() {
  const availableWidth = ref(9999) // default large so all panels show on SSR
  const panels = ref<PanelRegistration[]>([])

  if (import.meta.client) {
    const update = () => {
      availableWidth.value = window.innerWidth
    }

    onMounted(() => {
      update()
      window.addEventListener('resize', update)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', update)
    })
  }

  const register = (panel: PanelRegistration) => {
    const existing = panels.value.filter(p => p.id !== panel.id)
    panels.value = [...existing, panel].sort((a, b) => a.depth - b.depth)
  }

  const unregister = (id: string) => {
    panels.value = panels.value.filter(p => p.id !== id)
  }

  const updateWidth = (id: string, width: number) => {
    const panel = panels.value.find(p => p.id === id)
    if (panel) {
      panel.width = width
      // Trigger reactivity by replacing the array
      panels.value = [...panels.value]
    }
  }

  const visibleIds = computed(() => {
    const all = panels.value
    const width = availableWidth.value
    const visible = new Set<string>()

    if (width < ONE_PANEL_MIN) {
      // Below 1080px: no inline menus (vertical stacking)
      return visible
    }

    // Sort deepest first — prioritize showing the deepest panels
    const sorted = [...all].sort((a, b) => b.depth - a.depth)
    const maxPanels = width >= TWO_PANELS_MIN ? Infinity : 1

    for (const panel of sorted) {
      if (visible.size >= maxPanels) break
      visible.add(panel.id)
    }

    return visible
  })

  const isStacked = computed(() => availableWidth.value < ONE_PANEL_MIN)

  return { availableWidth, panels, visibleIds, isStacked, register, unregister, updateWidth }
}
