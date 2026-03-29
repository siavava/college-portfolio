<template lang="pug">
.prose-h2-container
  NuxtLink.prose-title-wrapper(v-if="generate && id" :to="`#${id}`")
    h2.prose-h2(:id="id")
      slot
  .prose-title-wrapper(v-else)
    h2.prose-h2(:id="id")
      slot
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { useRuntimeConfig } from "#imports"

defineProps<{
  id?: string
}>()

const heading = 1
// const { anchorLinks } = useRuntimeConfig().public.content
const generate = false // anchorLinks?.depth >= heading
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

.prose-h2-container
  margin: 2em 0
  border-bottom: 0.5px solid var(--border-color)

.prose-h2
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xl")
  font-weight: 500
  padding-bottom: 0.5em
  line-height: 4

  @media screen and (max-width: 980px)
    font-size: typography.font-size("l")

</style>
