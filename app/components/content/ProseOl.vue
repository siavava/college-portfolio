<template lang="pug">
ol.prose-ol
  slot
</template>

<style lang="sass">
@use "@/styles/typography"

.prose-ol
  counter-reset: ol-count

  & > li
    counter-increment: ol-count
    position: relative
    padding-left: 1.5em
    margin-bottom: 0.7em

    &::before
      content: counter(ol-count) '.'
      font-family: typography.font("sans-serif"), sans-serif
      position: absolute
      font-size: 0.8em
      line-height: 2
      left: 10px
      color: var(--dark-foreground)
</style>
