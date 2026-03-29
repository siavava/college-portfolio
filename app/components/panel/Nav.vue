<template>
  <div class="panel panel-nav panel-border">
    <h1 class="panel-title">{{ title }}</h1>
    <p class="panel-subtitle">{{ subtitle }}</p>
    <div class="panel-nav-items">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-nav
  width: 280px
  padding: 60px 32px

  @media screen and (max-width: 768px)
    width: 100%
    padding: 40px 20px

.panel-title
  font-family: typography.font("serif"), serif
  font-size: 2em
  font-weight: 400
  color: var(--lightest-foreground)
  margin-bottom: 0.2em

.panel-subtitle
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("s")
  color: var(--foreground)
  margin-bottom: 2.5em

.panel-nav-items
  display: flex
  flex-direction: column
</style>
