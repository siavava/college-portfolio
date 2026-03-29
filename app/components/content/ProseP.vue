<template lang="pug">
p.prose-p
  slot
</template>

<style lang="sass" scoped>
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/geometry"
@use "@/styles/mixins"

.prose-p
  font-family: typography.font("serif"), sans-serif
  font-size: typography.font-size("m")
  margin-bottom: 1em

  &:first-child
    margin-top: 1em
</style>
