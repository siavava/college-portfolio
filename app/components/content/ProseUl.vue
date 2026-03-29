<template lang="pug">
ul.prose-ul
  slot
</template>

<style lang="sass">
@use "@/styles/mixins"
@use "@/styles/typography"
.prose-ul
  font-family: typography.font("serif"), sans-serif
  font-size: inherit
  line-height: 22px
  margin: 1em 0 1em 0.5em

.prose-ul

  .prose-li
    position: relative
    padding-left: 0.7em
    line-height: inherit
    color: inherit
    padding-left: 1.5em

    &::before
      content: "\2013"
      position: absolute
      left: 0

    & + .prose-li
      margin-top: 0.7em

</style>
