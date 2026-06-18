<template lang="pug">
ProseA.prose-title-wrapper(v-if="generate && id" :to="`#${id}`" :underline="false")
  h1.prose-h1(:id="id")
    slot
div.prose-title-wrapper(v-else)
  h1.prose-h1(:id="id")
    slot
  br
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports"

defineProps<{ id: string }>()

const heading = 1
const contentConfig = useRuntimeConfig().public.content as { anchorLinks?: { depth: number } }
const generate = (contentConfig.anchorLinks?.depth ?? 0) >= heading
</script>

<style lang="sass" scoped>

@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

.prose-title-wrapper
  line-height: 5em

.prose-h1
  font-size: typography.font-size(l)
  font-weight: 600
  // letter-spacing: -0.3px
  color: var(--lightest-foreground)
  margin: 0.4em 0 0 0
  padding: 0
  line-height: 0.9em
</style>
