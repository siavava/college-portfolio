<template lang="pug">
section.not-found
  .container
    .error-code 404
    p.error-message This page does not exist.
</template>

<script lang="ts">
export default {
  name: "404Page",
}
</script>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

section.not-found
  display: flex
  min-height: calc(100vh - 55px)

.container
  display: inline-flex
  margin: auto

  .error-code
    font-size: 24px
    font-weight: 600
    margin: auto
    color: var(--dark-foreground)
    height: 2em
    line-height: 2em
    padding-right: 20px
    margin-right: 20px
    border-right: 1px solid var(--dark-foreground)

  .error-message
    color: var(--foreground)
    line-height: 5rem
</style>
