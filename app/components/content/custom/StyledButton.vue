<template lang="pug">
NuxtLink.styled-button(v-if="href" :to="href")
  slot
.styled-button(v-else)
  slot
</template>

<script lang="ts">
export default {
  name: "StyledButton",
  props: {
    href: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="sass">
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"

.styled-button
  background: rgba(var(--light-background), 0.7)
  font-size: typography.font-size(s)
  display: table
  margin-right: auto
  padding: 0 0.5em
  border-radius: 20px

  &:hover
    cursor: pointer
    color: var(--light-foreground)
</style>
