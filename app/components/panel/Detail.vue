<template>
  <div class="panel panel-detail">
    <button class="close-btn" @click="$emit('close')">&times;</button>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  close: []
}>()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-detail
  flex: 1
  padding: 60px 48px
  overflow-y: auto
  max-height: 100vh
  position: sticky
  top: 0
  max-width: 720px
  min-width: 400px

  @media screen and (max-width: 1100px)
    position: fixed
    top: 0
    left: 256px
    right: 0
    bottom: 45px
    background: var(--background)
    z-index: 30
    overflow-y: auto
    max-width: none
    min-width: 0

  @media screen and (max-width: 768px)
    left: 0
    top: 60px
    padding: 48px 24px

.close-btn
  position: absolute
  top: 40px
  right: 30px
  background: none
  border: none
  font-size: 22px
  color: var(--foreground)
  cursor: pointer
  opacity: 0.4
  transition: opacity 0.2s ease
  line-height: 1
  padding: 8px

  &:hover
    opacity: 1

// Shared detail content styles (applied to slot content via :deep)
:deep(.detail-date)
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.06em
  color: var(--foreground)
  opacity: 0.5
  margin-bottom: 6px

:deep(.detail-title)
  font-family: typography.font("serif"), serif
  font-size: 1.8em
  font-weight: 400
  color: var(--lightest-foreground)
  line-height: 1.2
  margin-bottom: 0.3em

:deep(.detail-body)
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  line-height: 1.7
  color: var(--light-foreground)
</style>
