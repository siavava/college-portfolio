<template>
  <div class="panel panel-list panel-border">
    <div class="panel-list-header">
      <span class="panel-list-count">{{ count }}</span>
      <h2 class="panel-list-title">{{ title }}</h2>
    </div>
    <div class="panel-list-items">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  count: string
}>()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-list
  width: 300px
  padding: 60px 32px

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

.panel-list-header
  margin-bottom: 2em

.panel-list-count
  display: block
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.08em
  color: var(--foreground)
  opacity: 0.5
  margin-bottom: 4px

.panel-list-title
  display: block
  font-family: typography.font("serif"), serif
  font-size: 1.6em
  font-weight: 400
  color: var(--lightest-foreground)

.panel-list-items
  display: flex
  flex-direction: column
</style>
