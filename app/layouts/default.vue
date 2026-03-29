<template lang="pug">
#root
  Aside
  Main
    slot
    template(#footer)
      Footer
  SpeedInsights
</template>

<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
provide(MENU_OPTIONS, { menuOpen, toggleMenu })
</script>

<style lang="sass">
#root
  display: flex
  height: 100svh
  overflow: hidden
</style>
