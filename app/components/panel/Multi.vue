<template lang="pug">
.multi-panel
  slot
</template>

<style lang="sass">
// Non-scoped: these classes are used by child panel components

.multi-panel
  display: flex
  min-height: 100%

.panel
  flex-shrink: 0
  overflow-y: auto

.panel-border
  border-right: 0.5px solid var(--border-color)

// Panel slide transitions
.panel-enter-active
  transition: opacity 0.2s ease, transform 0.2s ease

.panel-leave-active
  transition: opacity 0.15s ease, transform 0.15s ease

.panel-enter-from
  opacity: 0
  transform: translateX(16px)

.panel-leave-to
  opacity: 0
  transform: translateX(16px)
</style>
