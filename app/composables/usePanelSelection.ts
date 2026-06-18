/**
 * Shared selection logic for multi-panel pages.
 * Manages a two-level toggle: group (nav) → item (list).
 */
type PanelItem = { path?: string } & Record<string, unknown>

export function usePanelSelection() {
  const activeGroup = ref<string | null>(null)
  const selectedItem = ref<PanelItem | null>(null)

  const selectGroup = (group: string) => {
    if (activeGroup.value === group) {
      activeGroup.value = null
      selectedItem.value = null
    } else {
      activeGroup.value = group
      selectedItem.value = null
    }
  }

  const selectItem = (item: PanelItem) => {
    if (selectedItem.value?.path === item.path) {
      selectedItem.value = null
    } else {
      selectedItem.value = item
    }
  }

  return { activeGroup, selectedItem, selectGroup, selectItem }
}
