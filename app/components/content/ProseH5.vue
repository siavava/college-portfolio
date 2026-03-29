<template lang="pug">
h5.prose-h5(:id="id")
  slot
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<style lang="sass" scoped>

@use "../styles/colors"
.prose-h5
  margin-top: 0.5em
  margin-bottom: 0.5em
  font-weight: 600
  font-size: 1rem
  color: var(--lightest-foreground)
</style>
