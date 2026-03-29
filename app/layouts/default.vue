<template>
  <div id="root">
    <aside class="sidebar">
      <div class="ribbon" />
      <nav class="sidebar-nav">
        <NuxtLink
          to="/"
          class="nav-item"
          :class="{ active: route.path === '/' }"
        >
          {{ nav.about }}
        </NuxtLink>
        <NuxtLink
          to="/projects"
          class="nav-item"
          :class="{ active: route.path.startsWith('/projects') }"
        >
          {{ nav.projects }}
        </NuxtLink>
        <NuxtLink
          to="/experience"
          class="nav-item"
          :class="{ active: route.path === '/experience' }"
        >
          {{ nav.experience }}
        </NuxtLink>
        <NuxtLink
          :to="nav.writingUrl"
          class="nav-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ nav.writing }}
        </NuxtLink>
      </nav>
    </aside>
    <div class="main-wrapper">
      <main class="main-content">
        <slot />
      </main>
      <footer class="site-footer">
        <div class="footer-inner">
          <span class="copyright">{{ footer.copyright(new Date().getFullYear()) }}</span>
          <div class="footer-actions">
            <button class="footer-link" @click="toggleColorMode">
              {{ colorMode.preference === 'dark' ? footer.light : footer.dark }}
            </button>
          </div>
        </div>
      </footer>
    </div>
    <SpeedInsights />
  </div>
</template>

<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const route = useRoute()
const colorMode = useColorMode()
const { nav, footer } = labels()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
provide(MENU_OPTIONS, { menuOpen, toggleMenu })
</script>

<style lang="sass">
@use "@/styles/colors"
@use "@/styles/typography"

$sidebar-width: 256px

#root
  display: flex
  height: 100svh
  overflow: hidden

// ── Sidebar ──
.sidebar
  width: $sidebar-width
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

// ── Ribbon ──
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

// ── Navigation ──
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

// ── Main wrapper ──
.main-wrapper
  margin-left: $sidebar-width
  flex: 1
  display: flex
  flex-direction: column
  height: 100svh
  overflow: hidden

  @media screen and (max-width: 768px)
    margin-left: 0
    margin-top: 60px
    height: calc(100svh - 60px)

.main-content
  flex: 1
  overflow-y: auto

main section
  padding: 0
  margin: 0

// ── Footer ──
.site-footer
  border-top: 0.5px solid var(--border-color)
  padding: 16px 40px
  flex-shrink: 0
  position: relative
  z-index: 40
  background: var(--background)

  @media screen and (max-width: 768px)
    padding: 16px 20px

  .footer-inner
    display: flex
    justify-content: space-between
    align-items: center

  .copyright
    font-family: typography.font("sans-serif"), sans-serif
    font-size: 10px
    text-transform: uppercase
    letter-spacing: 0.08em
    color: var(--foreground)
    opacity: 0.5

  .footer-actions
    display: flex
    gap: 1em

  .footer-link
    font-family: typography.font("sans-serif"), sans-serif
    font-size: 10px
    text-transform: uppercase
    letter-spacing: 0.08em
    color: var(--foreground)
    opacity: 0.5
    background: none
    border: none
    cursor: pointer
    transition: opacity 0.2s ease

    &:hover
      opacity: 0.8
</style>
