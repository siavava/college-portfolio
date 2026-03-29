<template lang="pug">
.panel.panel-menu.panel-border(:class="{ overlay }")
  .panel-menu-header
    span.panel-menu-label(v-if="label") {{ label }}
    h2.panel-menu-title {{ title }}
  .panel-menu-items
    slot
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title: string
  label?: string
  overlay?: boolean
}>(), {
  overlay: false,
})
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-menu
  width: 280px
  padding: 40px 32px

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
    width: 100%
    padding: 40px 20px

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
