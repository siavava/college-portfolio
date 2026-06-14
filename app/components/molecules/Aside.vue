<template lang="pug">
aside.sidebar
  .ribbon
  nav.sidebar-nav.no-select
    NuxtLink.nav-item(to="/" :class="{ active: route.path === '/' }") {{ nav.about }}
    NuxtLink.nav-item(to="/projects" :class="{ active: route.path.startsWith('/projects') }") {{ nav.projects }}
    NuxtLink.nav-item(to="/experience" :class="{ active: route.path === '/experience' }") {{ nav.experience }}
    NuxtLink.nav-item(:to="nav.writingUrl" target="_blank" rel="noopener noreferrer") {{ nav.writing }}
    NuxtLink.nav-item(:to="nav.notesUrl" target="_blank" rel="noopener noreferrer") {{ nav.notes }}
</template>

<script lang="ts" setup>
const route = useRoute()
const { nav } = labels()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.sidebar
  width: 256px
  flex-shrink: 0
  position: fixed
  top: 0
  left: 0
  height: 100vh
  display: flex
  flex-direction: column
  z-index: 10
  border-right: double 3px var(--border-color)

  @media screen and (max-width: 768px)
    width: 100%
    height: auto
    position: fixed
    top: 0
    flex-direction: row
    align-items: center
    background: var(--background)
    border-bottom: double 3px var(--border-color)
    border-right: none
    z-index: 100

.ribbon
  width: 32px
  height: 160px
  margin-left: 28px
  flex-shrink: 0
  background: linear-gradient(135deg, oklch(0.42 0.18 25), oklch(0.52 0.18 25) 50%, oklch(0.42 0.18 25))
  border: 1px solid oklch(0.42 0.18 25)
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3), inset -1px -1px 2px rgba(0, 0, 0, 0.2)

  @media screen and (max-width: 768px)
    width: 20px
    height: 80px
    margin-left: 16px

.sidebar-nav
  display: flex
  flex-direction: column
  gap: 1em
  padding: 56px 32px 32px

  @media screen and (max-width: 768px)
    flex-direction: row
    padding: 12px 16px
    gap: 1.5em

.nav-item
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 12px
  text-transform: uppercase
  letter-spacing: 0.06em
  color: var(--foreground)
  opacity: 0.4
  transition: opacity 0.2s ease, color 0.2s ease
  text-decoration: none

  &:hover
    opacity: 0.75

  &.active
    opacity: 1
    color: var(--lightest-foreground)
    font-weight: 400
</style>
