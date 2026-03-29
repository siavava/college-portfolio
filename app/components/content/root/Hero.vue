<template lang="pug">
section.hero-section
  .dictionary-entry
    h1.word {{ profile.name }}
    .pronunciation(v-if="profile.pronunciation") {{ profile.pronunciation }}
</template>

<script lang="ts" setup>
const { path } = useRoute()
const { data: profile } = await useAsyncData(
  `hero-data-${path}`,
  async () => {
    return await queryCollection("profile")
      .first()
  },
)
</script>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"

.hero-section
  padding-top: 120px !important
  padding-bottom: 0 !important

.dictionary-entry
  margin-bottom: 2em

  .word
    font-size: 2.5em
    font-weight: 500
    letter-spacing: -1.5px
    color: var(--lightest-foreground)
    margin-bottom: 0.1em
    font-family: typography.font("sans-serif"), sans-serif

  .pronunciation
    font-family: typography.font("serif"), serif
    font-style: italic
    font-size: typography.font-size("m")
    color: var(--foreground)
    margin-bottom: 0.8em

  .definition
    font-family: typography.font("serif"), serif
    font-size: typography.font-size("l")
    color: var(--foreground)
    line-height: 1.6
    max-width: 480px

.role
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  color: var(--foreground)
  line-height: 1.7

  .role-prefix
    color: var(--lightest-foreground)
    font-weight: 500

  .role-previous
    display: block
    margin-top: 0.2em
</style>
