<template lang="pug">
.main-wrapper
  main.main-content
    slot
  slot(name="footer")
</template>

<style lang="sass" scoped>
.main-wrapper
  margin-left: 256px
  flex: 1
  display: flex
  flex-direction: column
  height: 100svh
  overflow: hidden

  @media screen and (max-width: 768px)
    margin-left: 0
    margin-top: 60px
    height: calc(100svh - 60px)

.main-content
  flex: 1
  overflow-y: auto

:deep(section)
  padding: 0
  margin: 0
</style>
