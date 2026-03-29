<template lang="pug">
.panel.panel-menu.panel-border.no-select(
  v-show="visible"
  :class="{ dragging: resizable?.isDragging.value, stacked: isStacked }"
  :style="panelStyle"
)
  .resize-handle(
    v-if="resizable"
    @pointerdown="resizable.onPointerDown"
  )
  button.panel-menu-close.no-select(v-if="showClose" @click="$emit('back')") &times;
  .panel-menu-header
    span.panel-menu-label(v-if="label") {{ label }}
    h2.panel-menu-title {{ title }}
  .panel-menu-items
    slot
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string
  label?: string
  depth?: number
  storageKey?: string
}>(), {
  depth: 0,
})

defineEmits<{
  back: []
}>()

const panelId = props.storageKey || `panel-depth-${props.depth}`
const DEFAULT_WIDTH = 280

const resizable = props.storageKey
  ? useResizablePanel({ key: props.storageKey })
  : null

const currentWidth = computed(() => resizable ? resizable.width.value : DEFAULT_WIDTH)

// Register with Multi.vue layout context
const context = inject(PANEL_LAYOUT_KEY, null)

onMounted(() => {
  context?.register({ id: panelId, depth: props.depth, width: currentWidth.value })
})

// Keep registration width in sync when user resizes
if (resizable) {
  watch(() => resizable.width.value, (newWidth) => {
    context?.updateWidth(panelId, newWidth)
  })
}

onUnmounted(() => {
  context?.unregister(panelId)
})

const isStacked = computed(() => context?.isStacked.value ?? false)

const visible = computed(() => {
  if (!context) return true
  if (isStacked.value) {
    // In stacked mode, only show the deepest registered menu
    const all = context.panels.value
    const maxDepth = Math.max(...all.map(p => p.depth))
    return props.depth === maxDepth
  }
  return context.visibleIds.value.has(panelId)
})

const showClose = computed(() => {
  if (!context || props.depth === 0) return false
  // Show close button when parent is hidden (collapsed) or in stacked mode
  if (isStacked.value) return true
  return context.panels.value.some(
    p => p.depth < props.depth && !context.visibleIds.value.has(p.id)
  )
})

const mounted = ref(false)
onMounted(() => { mounted.value = true })

const panelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (resizable && mounted.value) {
    style.width = `${resizable.width.value}px`
  }
  // Each depth level gets a higher z-index so deeper panels paint on top
  style['z-index'] = String(10 + props.depth)
  return style
})
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-menu
  width: 280px
  padding: 40px 32px
  position: relative
  background: var(--background)

  &.stacked
    width: 100% !important
    padding: 40px 20px

  @media screen and (max-width: 768px)
    width: 100% !important
    padding: 40px 20px

.panel-menu-close
  position: absolute
  top: 40px
  right: 20px
  background: none
  border: none
  font-size: 22px
  color: var(--foreground)
  cursor: pointer
  opacity: 0.4
  transition: opacity 0.2s ease
  line-height: 1
  padding: 8px
  z-index: 1

  &:hover
    opacity: 1

.resize-handle
  position: absolute
  top: 0
  right: -3px
  width: 6px
  height: 100%
  cursor: col-resize
  z-index: 10
  opacity: 0
  transition: opacity 0.15s ease
  border-right: 2px dotted var(--foreground)

  .panel-menu:hover &,
  .panel-menu.dragging &
    opacity: 0.3

  &:hover,
  .panel-menu.dragging &
    opacity: 0.5

.panel-menu-header
  margin-bottom: 2em

.panel-menu-label
  display: block
  width: fit-content
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.08em
  color: var(--foreground)
  opacity: 0.5
  margin-bottom: 4px

.panel-menu-title
  font-family: typography.font("serif"), serif
  font-size: 1.6em
  font-weight: 400
  color: var(--lightest-foreground)

.panel-menu-items
  display: flex
  flex-direction: column
</style>
