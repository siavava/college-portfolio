<template lang="pug">
.panel.panel-menu.panel-border.no-select(
  :class="{ overlay, dragging: resizable?.isDragging.value }"
  :style="panelStyle"
)
  .resize-handle(
    v-if="resizable"
    @pointerdown="resizable.onPointerDown"
  )
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
  overlay?: boolean
  storageKey?: string
}>(), {
  overlay: false,
})

const resizable = props.storageKey
  ? useResizablePanel({ key: props.storageKey })
  : null

const mounted = ref(false)
onMounted(() => { mounted.value = true })

const panelStyle = computed(() => {
  if (!resizable || !mounted.value) return undefined
  return { width: `${resizable.width.value}px` }
})
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-menu
  width: 280px
  padding: 40px 32px
  position: relative

  &.overlay
    @media screen and (max-width: 1100px)
      position: fixed
      top: 0
      left: 256px
      bottom: 45px
      background: var(--background)
      z-index: 20
      overflow-y: auto

    @media screen and (max-width: 768px)
      left: 0
      top: 60px

  @media screen and (max-width: 768px)
    width: 100% !important
    padding: 40px 20px

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
