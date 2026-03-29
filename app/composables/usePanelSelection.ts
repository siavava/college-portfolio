/**
 * Shared selection logic for multi-panel pages.
 * Manages a two-level toggle: group (nav) → item (list).
 */
export function usePanelSelection() {
  const activeGroup = ref<string | null>(null)
  const selectedItem = ref<any>(null)

  const selectGroup = (group: string) => {
    if (activeGroup.value === group) {
      activeGroup.value = null
      selectedItem.value = null
    } else {
      activeGroup.value = group
      selectedItem.value = null
    }
  }

  const selectItem = (item: any) => {
    if (selectedItem.value?.path === item.path) {
      selectedItem.value = null
    } else {
      selectedItem.value = item
    }
  }

  return { activeGroup, selectedItem, selectGroup, selectItem }
}
