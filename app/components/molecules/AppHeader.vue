<template lang="pug">
header.app-header
  nav.nav-links
    NuxtLink.nav-link(to="/" :class="{ active: route.path === '/' }") About
    NuxtLink.nav-link(to="/archive" :class="{ active: route.path === '/archive' }") Projects
    NuxtLink.nav-link(to="https://amittai.space" target="_blank" rel="noopener noreferrer") Writing
  .nav-actions
    Actions
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.app-header
  display: flex
  justify-content: space-between
  align-items: center
  max-width: 640px
  margin: 0 auto
  padding: 1.5em 0

  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 100

  &::before
    content: ""
    position: absolute
    top: 0
    left: -5000px
    height: 100%
    width: 10000px
    backdrop-filter: blur(2px)
    z-index: -1
    mask: linear-gradient(black, rgba(black, 0.5), transparent)

.nav-links
  display: flex
  gap: 1.5em
  z-index: 101

.nav-link
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xs")
  color: var(--foreground)
  transition: color 0.2s ease

  &:hover,
  &.active
    color: var(--lightest-foreground)

.nav-actions
  z-index: 101
</style>
