<template lang="pug">
footer.site-footer.no-select
  .footer-inner
    span.copyright {{ footer.copyright(new Date().getFullYear()) }}
    .footer-actions
      button.footer-link(@click="toggleColorMode") {{ colorMode.preference === 'dark' ? footer.light : footer.dark }}
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const { footer } = labels()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.site-footer
  border-top: 0.5px solid var(--border-color)
  padding: 16px 40px
  flex-shrink: 0
  position: relative
  z-index: 40
  background: var(--background)

  @media screen and (max-width: 768px)
    padding: 16px 20px

.footer-inner
  display: flex
  justify-content: space-between
  align-items: center

.copyright
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.08em
  color: var(--foreground)
  opacity: 0.5

.footer-actions
  display: flex
  gap: 1em

.footer-link
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.08em
  color: var(--foreground)
  opacity: 0.5
  background: none
  border: none
  cursor: pointer
  transition: opacity 0.2s ease

  &:hover
    opacity: 0.8
</style>
