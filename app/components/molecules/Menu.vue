<template lang="pug">
nav(ref="menu" :class="{ 'app-menu': tryUseNuxtApp, 'active': menuOpen }")
  .menu-item.top
    ProseH4.title Links
    NuxtLink.router-link(v-if="route.path == '/'" to="/archive")
      h2 Archive
    NuxtLink.router-link(v-else to="/")
      h2 Home
    NuxtLink.router-link(to="https://amittai.space" target="_blank" rel="noopener noreferrer")
      h2 Blog
    NuxtLink.router-link(to="https://amittai.art" target="_blank" rel="noopener noreferrer")
      h2 Generative Art
    NuxtLink.router-link(to="https://www.instagram.com/amittai.art" target="_blank" rel="noopener noreferrer")
      h2 Photography
    NuxtLink.router-link(to="https://slides.amittai.studio" target="_blank" rel="noopener noreferrer")
      h2 Presentations
    NuxtLink.router-link(to="https://entendr.life" target="_blank" rel="noopener noreferrer")
      h2 entendr.
  .menu-item.bottom
    ProseH4.title Current Page
    template(v-if="route.path == '/'")
      NuxtLink.router-link(to="/")
        h2 About
      NuxtLink.router-link(to="#education")
        h2 Education
      NuxtLink.router-link(to="#work")
        h2 Work Experience
      NuxtLink.router-link(to="#projects")
        h2 Featured Projects
      NuxtLink.router-link(to="#contact")
        h2 Contact
    template(v-else)
      NuxtLink.router-link(to="#featured")
        h2 Featured
      template(v-for="category in categories")
        NuxtLink.router-link(:to="`#${category.replace(' ', '-')}`")
          h2 {{ toTitleCase(category) }}
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core"

const menu = ref<HTMLElement | null>(null)
const route = useRoute()

const { menuOpen, toggleMenu } = inject(MENU_OPTIONS)

onMounted(() => {
  const menuButton = document.getElementById("menu-button")
  const colorModeButton = document.getElementById("color-mode-button")

  onClickOutside(menu, () => {
    if (menuOpen.value) {
      toggleMenu()
    }
  }, {
    ignore: [menuButton, colorModeButton],
  })
})

const { data } = await useAsyncData(
  'menu-featured-projects',
  async () => {
    return await queryCollection("projects")
      .order("date", "DESC")
      .all()
  },
)

const categories = []

data.value.forEach((project) => {
  if (!categories.includes(project.tag)) {
    categories.push(project.tag)
  }
})

const toTitleCase = (str) => {
  return str.replace(
    /(^|\b(?!(and?|at?|the|for|to|but|by)\b))\w+/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.app-menu
  position: fixed
  top: 0
  left: -360px
  width: 360px
  height: 100vh
  backdrop-filter: blur(10px)

  z-index: 99
  border-right: 0.5px solid var(--border-color)

  display: flex
  flex-direction: column
  justify-content: space-between

  padding: 100px 0 50px 0

  transition: left 0.3s ease

  background: var(--border-color)

  font-size: typography.font-size(xs)

  &.active
    left: 0

  .menu-item
    display: flex
    flex-direction: column
    gap: 1em
    padding: 1.5em 1.9em

    &.bottom
      text-align: right

    &:hover .router-link

      & > *
        color: var(--border-color)

    .router-link > *
      transition: all 0.5s ease

      &:hover
        cursor: pointer
        color: var(--lightest-foreground) !important

.router-link
  font-size: 1.2em
  line-height: 0.5em
  margin: 0
  padding: 0

  & > *
    font-weight: 300

  &:hover > *
    color: var(--lightest-foreground) !important

.title
  margin-bottom: 0.5em

</style>
