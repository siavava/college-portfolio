<template lang="pug">
ProseA.prose-title-wrapper(v-if="generate && (id !== '')" :to="`#${id}`" :underline="false")
  h1(:id="id" :class="{ 'prose-h2': true, 'bold': bold }")
    slot
div.prose-title-wrapper(v-else)
  h2(:id="id" :class="{ 'prose-h2': true, 'bold': bold }")
    slot
  br
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports"

defineProps({
  id: {
    type: String,
    default: "",
  },
  bold: {
    type: Boolean,
    default: false,
  },
})
// defineProps<{ id: string }>()
const heading = 1
const contentConfig = useRuntimeConfig().public.content as { anchorLinks?: { depth: number } }
const generate = (contentConfig.anchorLinks?.depth ?? 0) >= heading
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"
@use "@/styles/mixins"

.prose-h2
  font-size: typography.font-size(m)
  color: var(--lightest-foreground)
  margin: 0.3em 0 -1.3em 0
  padding: 0
  line-height: 0.9em
  font-family: typography.font("sans-serif")
  font-weight: 500

  @include mixins.underline


  &.bold
    font-weight: 600
    // font-size: 1em

</style>
